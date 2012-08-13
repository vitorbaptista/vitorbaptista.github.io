---
layout: post
title: "Descobrindo qual é a operadora de um telefone"
permalink: /descobrindo-qual-e-a-operadora-de-um-telefone
description: ""
category: 
tags: []
---
{% include JB/setup %}

**24/09/2011** – _Há alguns meses a ABR Telecom trocou o captcha por outro bem
mais forte. Logo, o site não funciona mais. Se alguém precisar dessa
funcionalidade, basta comprar o acesso por meros [R$ 4.372,21
mensais](/assets/media/ABRTelecom-20110413-v1.4.pdf)._

Desde março de 2009, há no Brasil a portabilidade numérica para telefones fixos
e celulares. Isto quer dizer que podemos trocar de operadora de telefonia sem
trocar de número. Assim, se outra empresa oferecer um plano mais vantajoso,
podemos migrar para ela sem precisar avisar a todos nossos contatos que
trocamos de número.

Mas isso também gera um problema: antes, cada operadora tinha uma faixa de
números. Na Paraíba, a gente sabia que um celular era da Oi se começasse com
88, da Claro se fosse com 93, etc. Com a portabilidade não dá mais pra saber
assim, é preciso consultar o número no site da [ABR
Telecom](http://consultanumero.abr.net.br:8080/consultanumero).

Até aí tudo bem. Mas eu tenho quase 500 contatos no meu celular, toda vez que
eu quiser saber se posso ligar para um número sem ter que pagar minutos extra
(tenho bônus pra Oi), vou ter que consultar nessa página? Preciso de uma
maneira melhor.

Eu tenho um celular com Android, o Nexus One. De cara, pensei em fazer um
aplicativo que consultasse os dados da ABR Telecom e me mostrasse qual é a
operadora de cada contato, quem sabe com um ícone ao lado da foto. Não deve ser
muito complexo. Mas, quando fui ver, me deparei com o primeiro problema: o
[CAPTCHA](http://pt.wikipedia.org/wiki/Captcha).

![Captcha da ABR Telecom](/assets/media/captcha-abr.png)

CAPTCHA são aquelas letras distorcidas que a gente tem que digitar em alguns
sites. Ele serve para evitar que uma pessoa automatize uma determinada tarefa,
como tentar logar em um site, criar contas no orkut. Desta forma, ele evita que
alguém crie um programa para testar todas as possibilidades de sua senha no
GMail, por exemplo. Idealmente, as letras são muito difíceis de um computador
detectar, mas fáceis para um humano.

O site da ABR Telecom tem um CAPTCHA. Do jeito que ele está, eu não consigo
fazer um programa para checar a operadora dos meus 500 contatos. A não ser que
eu consiga quebrar esse CAPTCHA. Hum…

![qualeaoperadora.de](/assets/media/qualeaoperadora.png)

Foi isso que eu fiz (explico em outro post). Não foi difícil, eles usam um
CAPTCHA muito simples. Daí nasceu o http://qualeaoperadora.de, um site que tem
a mesma funcionalidade que o ABR Telecom (inclusive usa ele por baixo dos
panos), mas sem o CAPTCHA. Assim, você pode criar novos softwares e sites
usando as informações do meu.

Eu não parei por aí. Além de você poder acessar as informações digitando no
site, ou adicionando diretamente o telefone na URL (como em
http://qualeaoperadora.de/6132160000), você também pode pegar em dois formatos
diferentes: YAML e JSONP. Para o primeiro, basta adicionar .yml ao final
(http://qualeaoperadora.de/6132160000.yml); para o segundo, adicione .json
(http://qualeaoperadora.de/6132160000.json). Se quiser especificar a função pra
callback, também pode fazer
http://qualeaoperadora.de/6132160000.json?callback=minhaFuncao. Em JSONP, eu
também retorno uma URL para o logotipo da operadora e a UF do Estado.

Ainda não fiz o software para buscar isso no meu Android, nem sei se vou fazer.
Mas, com esse site, você mesmo pode fazê-lo. Esteja à vontade, mashups são
divertidas. Se fizer algo, não deixe de me avisar 

Ah! Se você quiser dar uma olhada no código do http://qualeaoperadora.de, ele é
livre e está disponível em
http://www.gitorious.com/vitorbaptista/qualeaoperadora-de
