---
layout: post
title: "SIM/Smart Cards no Linux"
description: ""
category: 
tags: []
---
{% include JB/setup %}

Há algumas semanas, no [IV Natal Java
Day](http://www.jeebrasil.com.br/nataljavaday/), assisti a excelente palestra
“Java e a próxima geração de smart cards” do [Igor
Medeiros](http://www.igormedeiros.com.br/) e me impressionei. Já tinha ouvido
falar que os smartcards eram computadores completos mas nem dei muita bola, até
que, com ele falando isso, me toquei do quão impressionante era. Sabe aquela
parte metálica dourada de um chip GSM, ou no cartão do banco? Pois é, AQUILO é
um computador, com CPU, memória e tudo mais.

Fiquei encucado e resolvi comprar um leitor para brincar um pouco. Procurando
pelo São Google, encontrei um na loja da [Brando](http://usb.brando.com.hk/)
que me interessou:

[![iMONO 43 in 1 + Sim + Smart Card
Reader](/assets/media/imono43in1.jpg)](http://usb.brando.com.hk/prod_detail.php?prod_id=00570)

43 cartões, além de ler SIM e Smart Card (que eu saiba, a única diferença é no
formato (um SIM acho que todo mundo conhece (o chip de celular), e o Smart Card
é um cartão como de banco)) por US$ 19 com frete grátis. O dólar subiu bastante
nos últimos meses mas, mesmo assim, é tentador. Comprei. Umas 3 semanas depois,
chega o pacote vindo de Hong Kong, sem imposto, custando pouco mais de R$ 42,
ótimo!

Conectei ele no notebook e coloquei o chip do meu celular para testar (esqueci
do pequeno detalhe que teria que comprar um smart card), nada… procurando no
Google, encontrei diversos sites ensinando mas nenhum falando do meu leitor.
Então entrei na lista do [MUSCLE](http://www.linuxnet.com/) (Movement for the Use of Smart Cards in a Linux
Environment) e enviei um e-mail perguntando. Poucas horas depois, o próprio
cara que fez a maioria dos softwares/drivers de smart cards pra linux, Ludovic
Rousseau, me respondeu.

A solução foi extremamente simples. Pelos logs que passei, ele chutou (e
acertou) que meu leitor era compatível com o USB CCID (Chip/Smart Card
Interface Devices) e me pediu que fosse [nesse
site](http://pcsclite.alioth.debian.org/ccid.html#CCID_compliant) e seguisse as
instruções para pegar mais informações dele. Fui e, no final, eu só precisaria
compilar o driver libccid que baixei neste site e modificar o arquivo
ccid/readers/supported_readers.txt adicionando a linha 0x0BDA:0×0169:iMONO no
final. Resolvido.

Para testar, segui as instruções [desta
página](http://www.barrydegraaff.tk/index.html?files/Archive/Linux%20Sim%20Card%20reader/index.html)
para instalar o [MonoSIM](http://www.integrazioneweb.com/monosim/), um leitor
simples da agenda de SIM cards, e tudo ocorreu sem problemas. No final, o
Ludovic adicionou o meu leitor na página dele como “Should work but untested by
me”, uma pequena contribuição para quem comprar o mesmo leitor 

Agora, comprar um smart card em branco e ver o que consigo fazer.
