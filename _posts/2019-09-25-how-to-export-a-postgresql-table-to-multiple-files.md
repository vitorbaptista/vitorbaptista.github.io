---
layout: post
title: "How to export a PostgreSQL table to multiple files"
description: ""
category: 
tags: []
---
{% include JB/setup %}

You can use the `\COPY` command in Postgres to export the result of a SELECT to
a file (CSV, TSV, etc.). However, what if the table is huge? I faced this
problem where the resulting CSV had more than 50 GB. Thankfully, the `\COPY`
command also allows passing the result to a regular program, so we'll use the
CLI program `split` and `gzip` to not only split the resulting file, but also
compress it with GZIP.

```sql
\COPY (
  SELECT * FROM my_table
) TO PROGRAM 'split --lines 10000 --filter "gzip > /tmp/data_\$FILE.csv.gz"'
  WITH CSV
```

_Note: The SQL was split in multiple lines for readability, but to run it needs to be in a single line._

This will generate the files `data_xaa.csv.gz`, `data_xab.csv.gz`, and so on,
each with 10.000 lines, compressed using `gzip`.
