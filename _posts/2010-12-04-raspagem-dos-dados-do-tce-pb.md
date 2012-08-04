---
layout: post
title: "Raspagem dos dados do TCE PB"
description: ""
category: 
tags: []
---
{% include JB/setup %}

Esta é minha proposta conjunta com o [Fernando Brito](http://fernandobrito.com/)
para as [Microbolsas Hacker](http://blog.esfera.mobi/microbolsas-hacker-nov11/)
do pessoal da [Transparência Hacker](http://www.thacker.com.br/).

Quem somos nós?
---------------

Eu, o Vítor, sou quase (espero) bacharel em Computação. Estou no último período
do curso na UFPB, faltando só defender a monografia. Acompanho a lista do
thacker desde a cópia do Blog do Planalto, mas nunca participei ativamente.
[Fiz](http://vitorbaptista.com/descobrindo-qual-e-a-operadora-de-um-telefone/)
[alguns](http://vitorbaptista.com/bingo-do-ze-parte-1/)
[pequenos](http://vitorbaptista.com/despesas-da-prefeitura-municipal-de-joao-pessoa-de-2003-ate-2009/)
[hacks](http://vitorbaptista.com/gastos-dos-deputados-paraibanos-com-telefonia-combustiveis-e-lubrificantes/) e nada mais.

O Fernando é graduando em Estatística, mas amanhã vai prestar vestibular para
Computação. Entrou na lista do thacker também há algum tempo e está
desenvolvendo um [hack](https://github.com/thacker/devedores-pgfz) que lista os
devedores da previdência social.

O que vocês vão fazer?
----------------------

O Tribunal de Contas da Paraíba disponibiliza os dados de todos os municípios (e
do governo) do estado em http://sagres.tce.pb.gov.br. Os dados estão
relativamente bem organizados, mas falta uma API e visualizações mais amigáveis,
gráficos, etc..

Estão disponíveis receita, despesas, empenhos, licitações, folha de pessoal,
obras, veículos entre outros. A maioria dessas informações até que estão bem
detalhadas, mas outras apresentam certas inconsistências que certamente serão
repassadas ao orgão responsável.

Queremos raspar esses dados e disponibilizá-los em uma API. Após isto, iremos
criar uma página semelhante ao http://cmsp.topical.com.br/, com gráficos que
facilitem seu entendimento e que possibilitem cidadãos comuns obterem mais
informações sobre a prestação de contas de orgãos de municípios e do estado da
Paraíba.

Qual o retorno para a comunidade THacker?
-----------------------------------------

Estamos documentando todo o processo e achamos que o know-how adquirido irá
ajudar e encorajar outras equipes que desejem fazer algo semelhante em estados
diferentes do nosso.

Além disso iremos disponibilizar todo o código fonte do projeto. A parte do
código que raspa os dados do site do TCE-PB é bem específica para o nosso caso,
mas o site e as visualizações com certeza ajudarão outros projetos.

O resultado final poderá ser usado como case de sucesso e será mais um argumento
ao nosso favor, mostrando o poder e a necessidade da adoção de políticas de
dados abertos.

Quando concluído, o projeto irá também chamar um pouco mais da atenção da mídia
e principalmente dos hackers do Nordeste. Diferentemente do eixo Rio-São Paulo,
aqui existe uma grande falta de interesse pelo tema e há uma enorme escassez de
comunidades que lidem com o movimento de dados abertos.

Nós organizamos uma instância do Open Data Day aqui na Paraíba justamente com
este objetivo: agregar pessoas, até conseguimos espaço para [uma
entrevista](http://vitorbaptista.com/reportagem-sobre-a-maratona-internacional-de-dados-abertos-no-jpb2/)
na associada local da Globo. Todavia sabemos que ainda há muito mais a ser feito
e que essa pode ser justamente a oportunidade que estava nos faltando.
