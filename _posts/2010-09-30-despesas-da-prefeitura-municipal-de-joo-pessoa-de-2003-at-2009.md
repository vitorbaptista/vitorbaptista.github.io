---
layout: post
title: "Despesas da Prefeitura Municipal de João Pessoa de 2003 até 2009"
description: ""
category: 
tags: []
---
{% include JB/setup %}

![PMJP 2003~2009](/assets/media/pmjp2003-2009.png)

Nas últimas 2 horas estive brincando com o [SAGRES do
TCU/PB](http://sagres.tce.pb.gov.br/), vendo que
informações eu conseguiria extrair de lá. Para começar, resolvi pegar as
despesas da [PMJP](http://www.joaopessoa.pb.gov.br/) e, com a ajuda do [Google
Charts](http://code.google.com/apis/chart/) e o
[gchartrb](http://gchartrb.rubyforge.org/), consegui montar o
gráfico acima (que preciso melhorar).

Mesmo com o gráfico em um formato longe do ideal, difícil de analisar, a gente
consegue já detectar uma coisa estranha: o gasto com saúde vinha subindo desde
2003, até que atingiu um pico de **R$ 241.988.558,22** em 2006, então teve um
pequeno decréscimo em 2007 para **R$ 237.756.865,33** e, em, 2008, despencou
para **R$ 109.935.777,73**, caindo ainda mais um pouco em 2009, chegando em
**R$ 103.841.384,21**. Comparando o valor de 2006 com o de 2009, houve uma queda
de **~ 54,57%** em 3 anos. O que aconteceu nesta época para justificar essa diferença?

Vou melhorar o código e, em breve, vou disponibilizá-lo aqui. Com o mesmo código
dá para pegar as despesas de qualquer município paraibano. E, possivelmente,
pernambucano e piauiense também (pois ambos usam o SAGRES). Também vou procurar
uma forma melhor de visualizar esses (e outros) dados.
