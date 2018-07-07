---
layout: post
title: "Code analysis: How the Diario Oficial project extracts data from gazettes' PDFs"
description: ""
category: 
tags: []
---

The [Diário Oficial][do] is a project by the [Serenata de Amor
Operation][serenata] to extract the government purchases that had bidding
exemption (because they are below a certain value) published in the official
gazettes. Their intent is to get this data in a machine readable format, so we
can look for suspicious purchases. In this post, we'll walk through the code to
understand how the gazette is parsed and its bidding exemptions are extracted.

Ther code is available on [GitHub][do-gh]. The application is split in two main
areas: web and processing. The web, written in NodeJS, is responsible for the
API and website to visualize the data. The processing component deals with
scraping the gazettes, extracting their data, and saving it to the database.
We'll focus on the processing component.

The processing component uses Celery to run its tasks periodically. The
tasks are defined in [diario-oficial/processing/tasks.py][tasks.py]. It defines
two periodic tasks: `parse_sections` and `run_spiders`. The `run_spiders` runs
every day at 13:00 UTC, finding the gazette's PDF and saving its text into the
database (using [PdfParsingPipeline][scrapy/pipelines.py]). The `parse_sections`
then go over these records, extracting the data from their text.

In this post, we'll look into the `parse_sections` task, walking through the
process of extracting the data of a gazette from Porto Alegre.

## The initial state

We're looking into how the `parse_sections` task behaves when there's already a
gazette PDF's text in the database (extracted by the `run_spiders` task). We'll
use the [gazette 4.955][do-poa-sample] from Porto Alegre in 2/March/2015,
extracting its bidding exemptions. This is how they look like in the source PDF:

![Page in Porto Alegre's gazette with bidding exemptions][do-poa-sample:png]

We also have it in textual form extracted from this PDF. In the end, the data in
each bidding exemption (i.e. "dispensa de licitação") section will be parsed and
saved into our database.

## Step 1: Extract the sections with bidding exemptions

The [parse_sections][tasks.py] task is defined as:

```python
@app.task
def parse_sections():
    # Instantiate object that will update the Gazette model
    row_update = RowUpdate(Gazette)
    # Run the parsing using SectionParsing and update the model
    row_update(SectionParsing)
    # Schedule parsing of the bidding exemptions' text
    parse_bidding_exemptions.delay()
```

The [RowUpdate][row-update] class abstracts updating rows in the database. It's
instantiated by passing a model (`Gazette` in this case), and then called with
an "executor" class, [SectionParsing][section-parsing]. Let's take a look:

```python
class SectionParsing:
    def __init__(self, session):
        self.session = session

    def condition(self):
        return 'is_parsed = FALSE'

    def update(self, gazettes):
        for gazette in gazettes:
            territory = PARSABLE_TERRITORIES.get(gazette.territory_id)
            if territory:
                parsing_cls = getattr(locations, territory)
                parser = parsing_cls(gazette.source_text)
                self.update_bidding_exemptions(gazette, parser)
                gazette.is_parsed = True

    def update_bidding_exemptions(self, gazette, parser):
        parsed_exemptions = parser.bidding_exemptions()
        if parsed_exemptions:
            for record in gazette.bidding_exemptions:
                self.session.delete(record)
            for attributes in parsed_exemptions:
                record = BiddingExemption(**attributes)
                record.date = gazette.date
                gazette.bidding_exemptions.append(record)
```

This class manages filtering the gazettes to be updated, replacing their
existing bidding exemptions (if any) with the ones just parsed, and then marking
the gazette by setting `is_parsed = True`, so it won't be parsed again.

The only gazettes that will be parsed are the ones that:

* Weren't parsed yet (i.e. `is_parsed == False`), and;
* We have a parser for its `territory_id` (defined in the [PARSABLE_TERRITORIES][parsable_territories] dictionary)

The parsers themselves are defined in
[diario-oficial/processing/gazette/locations][gazette/locations]. Let's check
the [RsPortoAlegre][processing/rs-porto-alegre] parser:

```python
class RsPortoAlegre(BaseParser):
    def bidding_exemptions(self):
        items = []
        for section in self.bidding_exemption_sections():
            items.append(
                {'data': self.bidding_exemption(section), 'source_text': section}
            )
        return items

    # other methods omitted for brevity...
```

This class goes over the PDF's text, looking for the bidding exemption sections,
and returns a list with their data as:

```python
{
    'data': {
        'CONTRATANTE': 'Município de Porto Alegre.',
        'CONTRATADO': 'Classul Indústria e Comércio de Placas e Brindes Ltda.',
        'OBJETO': 'Confecção de 50 medalhas Cidade de Porto Alegre.',
        'VALOR': 'R$ 5.535,00.',
        'DOTAÇÃO ORÇAMENTÁRIA': '201-2524-339031050000-1',
        'BASE LEGAL': 'Artigo 24, inciso II, da Lei Federal 8.666/93.',
    },
    'source_text': '...'  # The original text
}
```

This is saved into the `gazettes.bidding_exemptions` attribute.

## Step 2: Parse the bidding exemptions

Notice that all attributes in the the bidding exemptions' `data` are strings.
For example, the "VALOR" attribute is "R$ 5.535,00.", instead of a number 5535.
In this step, we'll clean and parse these values into their specific data types
via the `parse_bidding_exemptions` task.

```python
@app.task
def parse_bidding_exemptions():
    row_update = RowUpdate(BiddingExemption)
    row_update(BiddingExemptionParsing)
```

Here we have `RowUpdate`, as in the `parse_sections` task, but this time we're
updating the `BiddingExemption` model using the
[BiddingExemptionParsing][bidding-exemption-parsing] class. Let's see how it
looks like:

```python
class BiddingExemptionParsing:
    def condition(self):
        return 'is_parsed = FALSE'

    def update(self, records):
        for record in records:
            territory = PARSABLE_TERRITORIES.get(record.gazette.territory_id)
            if territory:
                self.update_object(record)
                self.update_value(record)
                self.update_contracted(record)
                self.update_contracted_code(record)
                record.is_parsed = True

    # other methods omitted for brevity...
```

It is similar to the [SectionParsing][section-parsing] we saw in the last step.
It also uses the condition as `is_parsed = False`, but instead of getting the
gazettes, it gets each of their bidding exemptions. It loops over each of the
exemptions, and if they are from a territory we have a parser for (e.g. Porto
Alegre), it'll parse its data.

The parsing is straightforward. For example, the `update_value()` method simply
turns values like "R$ 5.312,94" into the number 5312.94.

Notice that, unlike the [SectionParsing][section-parsing] class, the parsing is
implemented directly in [BiddingExemptionParsing][bidding-exemption-parsing].
This means that the same code is used by all territories (currently only Goiânia
and Porto Alegre). This code will probably need to change in the future, as more
and more territories are added, each with their own differences. In the
meantime, it's a good example of not adding complexity before you actually need
to.

After this code finishes, the database will contain the data properly cleaned
and parsed in their respective data types (e.g. numbers instead of strings),
which can then be displayed via the web interface and API.

[do]: https://diario.serenata.ai/
[serenata]: https://serenata.ai/
[do-gh]: https://github.com/okfn-brasil/diario-oficial
[tasks.py]: https://github.com/okfn-brasil/diario-oficial/blob/e52bd12ccac9b8a8812a238a129324305fc7fa27/processing/tasks.py
[scrapy/pipelines.py]: https://github.com/okfn-brasil/diario-oficial/blob/e52bd12ccac9b8a8812a238a129324305fc7fa27/processing/data_collection/gazette/pipelines.py
[processing/gazette]: https://github.com/okfn-brasil/diario-oficial/tree/e52bd12ccac9b8a8812a238a129324305fc7fa27/processing/gazette
[processing/rs-porto-alegre]: https://github.com/okfn-brasil/diario-oficial/blob/e52bd12ccac9b8a8812a238a129324305fc7fa27/processing/gazette/locations/rs_porto_alegre.py
[parsable_territories]: https://github.com/okfn-brasil/diario-oficial/blob/e52bd12ccac9b8a8812a238a129324305fc7fa27/processing/database/__init__.py
[gazette/locations]: https://github.com/okfn-brasil/diario-oficial/tree/e52bd12ccac9b8a8812a238a129324305fc7fa27/processing/gazette/locations
[bidding-exemption-parsing]: https://github.com/okfn-brasil/diario-oficial/blob/e52bd12ccac9b8a8812a238a129324305fc7fa27/processing/gazette/data/bidding_exemption_parsing.py
[section-parsing]: https://github.com/okfn-brasil/diario-oficial/blob/e52bd12ccac9b8a8812a238a129324305fc7fa27/processing/gazette/data/section_parsing.py
[row-update]: https://github.com/okfn-brasil/diario-oficial/blob/e52bd12ccac9b8a8812a238a129324305fc7fa27/processing/gazette/data/row_update.py

[do-poa]: http://www2.portoalegre.rs.gov.br/dopa/
[do-poa-sample]: http://dopaonlineupload.procempa.com.br/dopaonlineupload/1351_ce_20150302_executivo.pdf
[do-poa-sample:png]: /assets/images/do-dispensa-licitacao.png
