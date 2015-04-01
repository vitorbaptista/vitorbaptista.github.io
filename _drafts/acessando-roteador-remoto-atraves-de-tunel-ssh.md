---
layout: post
title: "Acessando roteador remoto através de túnel SSH"
description: "Acessando roteador em rede remota através de túnel SSH usando um
              Raspberry Pi"
category:
tags: []
---

Antes de me mudar para a Inglaterra, configurei o Asterisk num Raspberry Pi na
casa de um primo no Brasil, para que eu possa ligar para minha família usando
VoIP. Ele está funcionando muito bem, mas precisei acessar a página de
configurações do roteador dele para modificar algumas configurações.

Por questões de segurança, eu não ativei o "Remote Management" do roteador, que
me permitiria acessar essa página da Internet. Ela só é acessível pela rede
local. Como resolver?

Como eu consigo acessar o Raspberry Pi por SSH, posso criar um túnel.

# Túnel SSH

O SSH permite você redirecionar o tráfego de uma porta X na máquina local para
um outro servidor, passando através de um host SSH. Ele funciona assim:

MÁQUINA-LOCAL ----SSH----> MÁQUINA-INTERMEDIÁRIA ---------> MÁQUINA-DESTINO

Basicamente, a máquina intermediária cria um túnel entre você e o destino. A
primeira vantagem disso é que, como estamos usando SSH, todo o tráfico sai da
sua máquina criptografado. Entretanto, o principal uso é para quando você não
consegue acessar a máquina destino diretamente, mas a máquina intermediária
consegue. No meu caso, o esquema seria:

Meu notebook -----------> Raspberry Pi -----------> Roteador

Para criar esse túnel, você precisa executar o comando:

> ssh -L 3000:IP-ROTEADOR:80 IP-RASPBERRY-PI

Considerando que o IP do roteador é 192.168.0.1, esse comando se tornaria:

> ssh -L 3000:192.168.0.1:80 IP-RASPBERRY-PI

O que isso faz é abrir a porta 3000 no meu notebook e, passando pelo Raspberry
Pi, chega em 192.168.0.1:80. Como o túnel passa pelo Raspberry Pi, eu consigo
usar um IP da rede local dele. Assim, se eu abrir http://localhost:3000, já
devo ver a página do roteador.

Até aqui tudo ótimo, mas quando tento fazer login aparece o primeiro problema:
o roteador tenta me redirecionar para 192.168.0.1, que fica fora do túnel.

Para resolver isso, tive uma ideia simples: modificar o IP da minha máquina
para 192.168.0.1 e criar o túnel na porta local 80 ao invés de 3000. Basta
executar:

> sudo ifconfig eth0 192.168.0.1

> sudo -E ssh -L 80:192.168.0.1:80 IP-RASPBERRY-PI

Precisei usar `sudo` no SSH porque o Linux restringe as portas menores que 1024
para o `root`, e precisei usar `sudo -E` porque conecto ao meu Raspberry usando
chaves SSH. Elas estão no meu usuário (e não no root), assim uso o `sudo -E`
que preserva o environment do meu shell (mais especificamente, o `$HOME`) e
continua usando minhas chaves SSH.

Infelizmente nosso problema ainda não está resolvido. O problema é que, por
segurança, o SSH cria os túneis só em `localhost` por padrão. Para fazer com
que ele crie o túnel na nossa interface de rede `eth0`, precisamos executar:

> sudo -E ssh -L 192.168.0.1:80:192.168.0.1:80 IP-RASPBERRY-PI

O que isto faz é criar um túnel na interface local 192.168.0.1:80 para a
interface remota 192.168.0.1:80 através do Raspberry Pi.

Pronto! Agora já podemos acessar normalmente a página do roteador e fazer
quaisquer modificações necessárias, como se estivéssemos na rede local.
Resumindo, os comandos necessários para criar um túnel para acessar um roteador
com IP 192.168.0.1 na porta 80 através do Raspberry Pi são:

> sudo ifconfig eth0 192.168.0.1

> sudo -E ssh -L 192.168.0.1:80:192.168.0.1:80 IP-RASPBERRY-PI
