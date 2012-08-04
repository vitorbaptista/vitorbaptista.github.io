---
layout: post
title: "Transferindo o áudio do microfone via SSH"
description: ""
category: 
tags: []
---
{% include JB/setup %}

Estamos a 2 dias do [III ENSOL](http://www.ensol.org.br). Na palestra do
Richard Stallman haverá tradução e transmissão simultânea. Com a tradução eu
não preciso me preocupar, pois contratamos uma empresa para isto. Já a
transmissão é um pouco mais complicada.

O [LAViD](http://www.lavid.ufpb.br/) está nos apoiando nisto. Vamos ter uma
câmera HD para gravar algumas palestras e transmitir a do RMS para as outras 2
salas. Só que, pensando com o pessoal, decidimos que o áudio a ser transmitido
não vai ser o do Stallman, mas o do tradutor. Aí vem o problema: como
transmitir o áudio da cabine de trasmissão para as outras duas salas? Lembrava
que dava pra fazer isso com o
SSH, então fui testar.

Fazer localmente é fácil. Basta executar:

> dd if=/dev/dsp of=/dev/dsp

O que isto faz? Simples. Lembre-se que nos sistemas POSIX tudo é um arquivo. E
/dev/dsp é o arquivo que representa a placa de som. Numa linguagem natural, o
comando acima quer dizer “Copie o que tem em /dev/dsp para /dev/dsp.”

Como assim? Se eu copiar um arquivo para ele mesmo, o resultado não deveria
ser… o mesmo arquivo? Depende. Neste caso, por exemplo, ler da placa de som
(/dev/dsp) significa “capturar o audio que vem do microfone.” E escrever
significa “tocar.” Juntando, você está “capturando o audio que vem do microfone
e tocando.”

Fácil. Agora, como fazer isso em dois computadores diferentes? Eu sei que vou
ter que ler do /dev/dsp de um computador e escrever no /dev/dsp do outro, mas
como?

Vamos por partes. Primeiro, para ler o /dev/dsp, usamos:

> dd if=/dev/dsp

O dd vai ler o arquivo e escrever na saída padrão. Neste caso, a tela. Então,
precisamos redirecionar isso para o outro computador. É aí que entra o SSH. Se
fizermos:

> ssh [destino]

Ele vai abrir um shell no destino. Não é o que queremos. Temos a opção de usar:

> ssh [destino] dd of=/dev/dsp

Ao invés de abrir um shell, o SSH vai executar o comando que passamos (dd
of=/dev/dsp). Neste caso, o dd escreve tudo que receber da entrada padrão
(teclado) para o arquivo /dev/dsp. Se você escrever algumas coisas aleatórias,
vai ouvir uns barulhos na caixa de som. Ele está interpretando o que você está
escrevendo como som. Ótimo! Estamos chegando perto. Agora só precisamos ligar a
saída do primeiro comando, que lê do /dev/dsp de uma máquina, a entrada do ssh.
Como? Usando pipes, é claro!

> dd if=/dev/dsp | ssh [destino] dd of=/dev/dsp

O que essa barrinha discreta aí faz é conectar a saída padrão do comando a
esquerda com a entrada padrão do da direita. Pronto! Executando isso, já
conectamos o microfone de um PC com a caixa de som de outro. Para melhorar um
pouco, podemos pedir pro SSH comprimir o tráfego, adicionando a opção -C.

> dd if=/dev/dsp | ssh -C [destino] dd of=/dev/dsp

Mesmo assim, ainda não fica muito bom. Aqui, apesar dele usar só 5 KB/s de
banda e as máquinas estarem na mesma rede wifi, fica uma latência muito grande.
Talvez seja culpa do SSH ou do dd, e não da velocidade da conexão. Não sei.

Mas pode dizer. Muito foda, não é? :D
