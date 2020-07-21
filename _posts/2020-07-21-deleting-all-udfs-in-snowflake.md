---
layout: post
title: "Deleting all user-defined functions (UDFs) in Snowflake"
description: ""
category:
tags: []
---

To drop [user-defined functions (UDF)](udfs) in Snowflake, we need the function name
and list of parameters. Depending on how many UDFs you have, this can become boring quickly.  

Instead of going one by one, run the SQL command below:

```sql
SHOW USER FUNCTIONS IN ACCOUNT;
SELECT
  CONCAT(
    'DROP FUNCTION ',
    "catalog_name",
    '.',
    "schema_name",
    '.',
    REGEXP_REPLACE("arguments", ' RETURN .*$', ''),
    ';'
  ) AS drop_command
FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
```

This will return a table like:

| DROP_COMMAND |
| --- |
| DROP FUNCTION MY_DATABASE.PUBLIC.MY_UDF_1(VARCHAR); |
| DROP FUNCTION MY_DATABASE.OTHER_SCHEMA.MY_UDF_2(ARRAY, ARRAY); |
| DROP FUNCTION OTHER_DATABASE.PUBLIC.MY_UDF_3(VARIANT); |

Now you just need to review these results and run them. If you want to delete
UDFs from a single database or schema, add a `WHERE` filter on `"catalog_name"`
(for the database) and/or `"schema_name"` for the schema.

[udfs]: https://docs.snowflake.com/en/sql-reference/user-defined-functions.html
