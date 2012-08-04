---
layout: post
title: "Como funciona um emulador?"
description: ""
category: 
tags: []
---
{% include JB/setup %}

Sempre achei muito interessante a idéia de emular jogos antigos, de video-games
da minha infância, acho que todo mundo que joga e programa também acha, e, com
as aulas de Arquitetura de Computadores que venho tendo na faculdade, o
interesse voltou. Pesquisando sobre o assunto, descobri que criar um emulador
de um console dos mais antigos não é nada de outro mundo, como sempre imaginei,
então resolvi tentar. Aproveitando o embalo, pretendo escrever uma série de
artigos explicando passo a passo como criar um emulador de
[Chip-8](http://en.wikipedia.org/wiki/CHIP-8), que é um dos mais simples que
você pode criar.

Certo, mas o que é um emulador mesmo?
=====================================

É um programa que simula o funcionamento de algum sistema. Nele vão existir
partes que simulam uma CPU, a memória, os periféricos de entrada, o vídeo.
Enfim, todo o hardware que se deseja simular. Além do sistema, você precisará
de uma [ROM](http://pt.wikipedia.org/wiki/Imagem_ROM), que é uma cópia exata do
conteúdo do cartucho do video-game. É nela que está o jogo.

E como eu faço isso?
====================

Primeiro, você precisa conhecer muito bem o sistema que quer emular. Depois
você precisa identificar e interpretar todos os comandos do sistema, os
[opcodes](http://pt.wikipedia.org/wiki/Opcode) (operation codes). Por exemplo,
um comum a diversas máquinas é:

> ADD x,n

que significa:

> x = x + n

Então, onde você encontrar esse opcode, deve executar este comando. Fazendo
isso com todos, você terminará com um emulador completo. Simples, não?
