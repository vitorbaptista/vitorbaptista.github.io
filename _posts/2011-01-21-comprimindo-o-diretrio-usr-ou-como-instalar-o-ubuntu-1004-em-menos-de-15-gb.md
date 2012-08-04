---
layout: post
title: "Comprimindo o diretório /usr (Ou como instalar o Ubuntu 10.04 em menos de 1.5 GB)"
description: ""
category: 
tags: []
---
{% include JB/setup %}

No natal passado dei para minha namorada,
[Samara](http://twitter.com/sam_guimaraes), um netbook: o [Asus EeePC 2G
Surf](http://www.asus.com/product.aspx?P_ID=wKYj8iaGqPwNPJVF). Ele foi o
primeiro netbook lançado, com processador de 800 MHz, 512 MB de RAM e 2 GB de
SSD. Infelizmente, para diferenciá-lo de modelos mais caros, alguém na Asus
teve a ideia <s>imbecil</s> genial de soldar a memória RAM e o SSD. Ou seja, é
impossível fazer um upgrade nele.

Passei meus dias antes do natal de 2009 pesquisando como instalar um Sistema
Operacional usável com essa limitação de espaço. A instalação do Ubuntu,
pelada, gastava mais de 4 GB. Depois de algumas noites mal dormidas, consegui
instalar o [Xubuntu 9.04](http://www.xubuntu.org/) capado, com um browser
minimalista ([Midori](http://en.wikipedia.org/wiki/Midori_(web_browser))) e
algumas coisas mais.  Ficou usável, mas longe de bom. Mais de um ano depois,
finalmente tomei vergonha na cara de fazer direito.

Comprei um cartão MicroSD de 8 GB e fui instalar o Ubuntu 10.10 nele. Consegui
sem muito esforço, simplesmente colocando o / no SSD de 2 GB e o /usr e o /home
em duas partições no cartão de memória. Ficou legal, gostei da interface
[Unity](http://unity.ubuntu.com/), e tava tudo funcionando. Quando mostrei para
ela, depois de brincar por uns 30 segundos, ela disse: "Tá muito lento!".

![Ubuntu Unity - Lindo, mas muito lento](/assets/media/ubuntu-unity.jpg)

Ok, segunda tentativa. Levei o netbook para casa e fui falar com
[Deus](http://www.google.com.br/). Descobri que a Unity é realmente mais
pesada, e era melhor usar o Ubuntu 10.04 Netbook Edition. Mas, se o problema
dela era velocidade, pesquisei mais um pouco sobre como otimizar. Foi aí que
encontrei o ótimo blog do [Steve
Hanov](http://stevehanov.ca/blog/index.php?id=48), onde ele dá 4 dicas para
otimizar o Ubuntu quando ele for usado em de um drive USB. Neste post só vou
falar da terceira dica (a mais importante para mim): comprimindo os arquivos.

O diretório /usr é normalmente o maior diretório de uma instalação do Linux.
Nele ficam todos os binários dos programas instalados, bibliotecas,
códigos-fonte, etc.. Para se ter uma ideia, quando instalei o Ubuntu 10.10 no
netbook da Samara, o /usr tinha cerca de 1.8 GB, enquanto todas as outras
pastas juntas não chegavam a 700 MB. Então, se queremos diminuir o tamanho de
uma instalação, nada mais lógico que começar com o maior culpado.

A ideia é comprimir a /usr. Para isso usamos o
[squashfs](http://squashfs.sourceforge.net/). Com ele, criaremos um sistema de
arquivos comprimido, virtual, somente leitura. Conseguimos diminuir a pasta
para cerca de 700 MB. Mas, para não ficarmos com a /usr somente leitura, usamos
também o [aufs2](http://aufs.sourceforge.net/). O que ele faz é simular uma
partição de leitura e escrita em cima da criada pelo squashfs. Ele faz isso
criando uma “camada” em cima da partição /usr. Quando tentarmos ler um arquivo
de lá, o aufs2 vai nos mostrar o que foi comprimido com o squashfs. Se
tentarmos criar um arquivo, ele o cria em uma outra pasta (que vamos definir),
mas nos mostra como se tivesse criado na /usr, nos dando a ilusão que essa
partição é de leitura e escrita, quando não é.  Não se preocupe com esses
detalhes técnicos. Tudo vai ficar mais claro conforme fomos fazendo (espero).

Antes de tudo, instale o pacote squashfs-tools:

    sudo apt-get install squashfs-tools

Depois adicione as seguintes linhas ao arquivo /etc/modules:

    squashfs
    loop

Crie as pastas onde irão ficar as partições virtuais squashfs e aufs2:

    sudo mkdir -p /squashed/usr /squashed/usr/ro /squashed/usr/rw

Comprima a pasta /usr em uma imagem dentro de /squashed/usr:

    sudo mksquashfs /usr /squashed/usr/usr.sqfs

Adicione as seguintes linhas ao arquivo /etc/fstab:

    /squashed/usr/usr.sfs /squashed/usr/ro squashfs loop,ro 0 0
    usr /usr aufs udba=reval,br:/squashed/usr/rw:/squashed/usr/ro 0 0

Reinicie o computador. Tudo deve funcionar normalmente, então você pode apagar o
diretório /usr, fazendo:

    sudo umount /usr
    sudo rm -rf /usr

Se houve algum problema, tente voltar para os passos anteriores e descobrir o
que deu errado. Qualquer coisa mande um comentário que tentarei ajudar.

Um bônus de comprimir seu /usr é que, além de ocupar bem menos espaço, o
computador ficará mais rápido. As máquinas de hoje em dia têm processadores
muito mais velozes que os discos, então um tempo maior é gasto lendo um programa
no HD do que executando-o. Como os programas estão comprimidos, precisa-se ler
menos dados, tornando o computador mais rápido.

![Ubuntu 10,04 Netbook Edition - Lindo e muito rápido](/assets/media/ubuntu-10.04.png)

No final, o Ubuntu 10.04 está ocupando menos de 1.5 GB do SSD do netbook, que
ganhou mais uns anos de vida útil com a Samara. Eu não fiz benchmarks, mas a
diferença é visível. Ele está levando 1m30s para iniciar, mais 10s para abrir o
Chrome e 30s para abrir o OpenOffice.org. Nada mal para um netbook de 2007 

Este post foi baseado no [Optimizing Ubuntu to run from a USB key or SD
card](http://stevehanov.ca/blog/index.php?id=48) e
[Speed up system with aufs +
squashfs](http://forums.gentoo.org/viewtopic-t-646289.html).
