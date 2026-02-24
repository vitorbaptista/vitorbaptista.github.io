---
layout: post
title: "Agrupando intervalos de datas no PostgreSQL"
description: "Como agrupar e consolidar intervalos de datas sobrepostos no PostgreSQL. O problema gaps and islands."
category:
tags: []
---

Imagine que você tenha uma tabela com as datas de início e fim de uma pessoa em
um cargo. Considere que é possível que uma pessoa esteja em mais de um cargo
simultaneamente. A tabela poderia ser definida como:

| user_id | cargo_id | data_inicio | data_fim   |
| ------- | -------- | ----------- | ---------- |
| 1       | 1        | 2024-01-01  | 2024-03-15 |
| 1       | 2        | 2024-02-10  | 2024-04-30 |
| 2       | 3        | 2024-01-01  | 2024-01-31 |
| 2       | 4        | 2024-02-01  | 2024-03-31 |
| 3       | 5        | 2024-01-01  | 2024-01-31 |
| 3       | 6        | 2024-03-01  | 2024-03-31 |
| 4       | 7        | 2024-06-01  | 2024-06-30 |
| 4       | 8        | 2024-06-01  | 2024-06-30 |

Como fazer uma consulta SQL que me mostre os períodos em que cada pessoa esteve empregada?

Este problema é conhecido como o Gaps and Islands (Lacunas e Ilhas em
português). Dado uma lista de valores em uma sequência, como `1, 2, 3, 7, 8, 10`,
os gaps (ou lacunas) são os valores faltantes (no nosso exemplo, `4, 5, 6 e 9`) e
as ilhas são os valores contíguos (no nosso exemplo, `1, 2, 3`, `7 e 8`, e `10`).

No nosso exemplo temos quatro casos:

1. Períodos sobrepostos: Exemplo o user_id 1, que teve dois cargos no mesmo período
2. Períodos adjacentes: Exemplo o user_id 2, que começou um novo cargo um dia depois de finalizar o anterior
3. Períodos com intervalo entre eles: Exemplo o user_id 3, que passou um tempo desempregado entre um cargo e outro
4. Períodos duplicados: Exemplo o user_id 4, que teve dois cargos no mesmo período

Com o PostgreSQL 14+, essa consulta é simples usando o `daterange()` e
`range_agg()`. Assumimos que a tabela acima se chama `sample_data`. A consulta final é simplesmente:

```sql
SELECT
    user_id
    , UNNEST(
        RANGE_AGG(
            DATERANGE(data_inicio, data_fim, '[]')
        )
    ) AS periodo
FROM sample_data
GROUP BY 1
```

O resultado será:

| user_id | periodo                 |
| ------- | ----------------------- |
| 1       | [2024-01-01,2024-05-01) |
| 2       | [2024-01-01,2024-04-01) |
| 3       | [2024-01-01,2024-02-01) |
| 3       | [2024-03-01,2024-04-01) |
| 4       | [2024-06-01,2024-07-01) |

Como funciona?

1. O `DATERANGE(data_inicio, data_fim, '[]')` cria um intervalo fechado do período entre as datas
2. O `RANGE_AGG()` agrupa os intervalos em um array, já fazendo a deduplicação caso os intervalos sejam contíguos ou duplicados.
3. O `UNNEST()` desmembra o array em linhas, uma para cada intervalo

No nosso exemplo o período é um intervalo de datas, mas o Postgres possui
funções para sequências de outros tipos (como números). A ideia é a mesma, só
mudam as funções usadas.