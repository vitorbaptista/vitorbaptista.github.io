---
layout: post
title: "Redirecionando emails do seu domínio para o mailinator"
permalink: /redirecionando-emails-do-seu-dominio-para-o-mailinator
description: ""
category: 
tags: []
---
{% include JB/setup %}

Há algumas semanas fiz um sistema para detectar a operadora de um telefone
(motivo de um próximo post). Fiquei empolgado por finalmente começar a brincar
com JavaScript e registrei um domínio pra ele: http://qualeaoperadora.de.
Então, hoje vi uma propaganda no meu Gmail:

> English Speaking – EffortlessEnglishClub.com?learn – 7 Rules You Must Know To
> Speak English Fast

Hum. 7 regras? OK, vamos ver. Quando entrei no site, encontrei um monte de
propagandas e **5** caixas do tipo “Coloque seu e-mail aqui para que possamos te
mandar <del>SPAM</del> o eBook”.

![Effortless English](/assets/media/effortlessenglish.png)

Já recebo e-mails o suficiente me dizendo que sou broxa e/ou tenho pinto
pequeno. Então fui tentar usar o [Mailinator](http://www.mailinator.com).

> **FAIL!**

Eles bloqueiam e-mails @mailinator.com. Tentei um outro domínio do pessoal do
Mailinator, @safetymail.info, e mesma coisa. Provavelmente há em algum lugar
pela web uma lista dos domínios deles.

A solução? Usar meu próprio domínio!

O Mailinator tem uma funcionalidade muito engenhosa: ele aceita e-mails vindos
de qualquer domínio. Assim, basta mudar o [do seu domínio pra
mail.mailinator.com e pronto](http://en.wikipedia.org/wiki/MX_record).

Como fazer isto depende da onde você hospeda seu domínio, mas não é algo difícil.

Agora você também pode usar os e-mails @qualeaoperadora.de. Espero que, por
este post estar em português, os spammers não consigam adicionar meu domínio à
blacklist do Mailinator 
