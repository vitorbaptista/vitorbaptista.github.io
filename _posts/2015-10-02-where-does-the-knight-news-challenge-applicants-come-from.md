---
layout: post
title: "Where does the 2015 Knight News Challenge applicants come from?"
description: ""
category: 
tags: []
---

The [Knight News Challenge][1] is a grant by the [Knight Foundation][2] for
"breakthrough ideas in news and information". Between September 8th and 30th of
this year, [1.023 entries][3] were submitted by 960 teams or individuals
([myself included][4]).

I wrote a scraper that gathers the data from these submissions. Its code and the
resulting dataset are [available on GitHub][5]. My first curiosity was where
the applicants come from. On the submission form there's a "Location" field,
but it's not clear if it's related to where the team lives or where the project
is going to be applied. It also is a simple textarea, so the data is messy.

To answer this question, I had to go through every entry and figure out what's
the actual location. I used the team's location, and not where the project will
be applied. For example, if a team from the USA submits a proposal for a
project about Kenya, I still considered their country as the USA. If the team
is distributed, a single proposal can have multiple countries.

I tried to be careful when cleaning the data, but there might have been some
mistakes, so take these results with a grain of salt. I also couldn't determine
the location of 7 projects (around 0,7% of the total).

First, let's see a choropleth map:

<iframe width="100%" height="520" frameborder="0"
src="https://vitorbaptista.cartodb.com/viz/e1c3dcca-6df9-11e5-b5b7-0ecfd53eb7d3/embed_map"
allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen
msallowfullscreen></iframe>

The 7 colors are divided by quantiles. As the data is heavily skewed, the
values and the colors don't have a linear relation. Only the USA, with 687
projects, is on the darker band. The following band has 4 countries: UK (51),
Germany (30), Brazil (29) and Canada (25). The top 11 countries are:

| Country   | Count  | %        |
| --------- | ------ | -------- |
| USA       | 687    | 58.17%   |
| UK        | 51     |  4.32%   |
| Germany   | 30     |  2.54%   |
| Brazil    | 29     |  2.45%   |
| Canada    | 25     |  2.12%   |
| Mexico    | 17     |  1.44%   |
| Kenya     | 16     |  1.34%   |
| India     | 16     |  1.34%   |
| Argentina | 15     |  1.27%   |
| Spain     | 11     |  0.93%   |
| Chile     | 11     |  0.93%   |
|           |        |          |
| *Others*  | *284*  | *25.08%* |
| *Total*   | *1181* | *100%*   |

There are 98 countries in total.

Remember that these numbers represent the number of projects that have at least
one team member based in that country, so the total here can be different from
the total number of entries (and it is 1181 vs 1023). 

I don't know how the countries' distribution was in the previous News
Challenges, so I don't have a baseline to compare. Still, it's interesting to
see that, even though more than half of the entries had someone based in the
USA in the team, almost every continent is represented in the top 11 countries.
The only exception is Oceania, that is quite near, with 10 projects having
someone based in Australia.

The data used here is available on GitHub [here][5] (unmodified, straight from
the News Challenge page), and [here][6] (teams' countries added).

[1]: https://www.newschallenge.org "Knight News Challenge"
[2]: http://www.knightfoundation.org/ "Knight Foundation"
[3]: https://www.newschallenge.org/challenge/data/entries "2015 Knight News Challenge submissions"
[4]: https://www.newschallenge.org/challenge/data/entries/unified-api-for-brazilian-states-legislative-data "Unified API for Brazilian states' legislative data"
[5]: https://github.com/vitorbaptista/newschallenge.org-scraper "NewsChallenge.org scraper"
[6]: https://gist.github.com/vitorbaptista/93695033cc7187eb1e94 "2015 NewsChallenge.org list of countries"
