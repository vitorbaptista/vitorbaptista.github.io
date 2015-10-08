---
layout: post
title: "Erro com o system tools backends no Ubuntu 8.10"
description: ""
category: 
tags: []
---

Há algumas semanas que sempre que instalo/removo/atualizo algum pacote usando o aptitude dá o erro:

> Erros foram encontrados durante o processamento de:
> system-tools-backends
> E: Sub-process /usr/bin/dpkg returned an error code (1)
> A instalação de um pacote falhou. Tentando recuperar:
> Configurando system-tools-backends (2.6.0-1ubuntu1.1) …
> * Starting System Tools Backends system-tools-backends invoke-rc.d:
> initscript system-tools-backends, action “start” failed.  dpkg: erro
> processando system-tools-backends (–configure):
> sub-processo post-installation script retornou estado de saída de erro 1
> Erros foram encontrados durante o processamento de:
> system-tools-backends

Como não encontrei nenhum problema além dessa chateação, não tentei resolver.
Mas hoje abusei e fui atrás da solução, que é muito simples. Na verdade é só um
workaround(leia gambiarra), mas funciona. Simplesmente vá no shell e digite:

> sudo invoke-rc.d system-tools-backends stop
> sudo dpkg –configure -a

Resolvido.
