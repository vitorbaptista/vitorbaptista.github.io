---
layout: post
title: "Gastos dos deputados paraibanos com Telefonia, Combustíveis e Lubrificantes"
permalink: /gastos-dos-deputados-paraibanos-com-telefonia-combustiveis-e-lubrificantes
description: ""
category: 
tags: []
---
{% include JB/setup %}

Hoje, conversando com o [Fernando Brito](http://fernandobrito.com), ele me
mostrou um site muito interessante: o da [Câmara dos
Deputados](http://www.camara.gov.br/). Mais especificamente, a parte de [Cota
para Exercício da Atividade
Parlamentar](http://www2.camara.gov.br/transparencia/cota-para-exercicio-da-atividade-parlamentar/verba_indenizatoria_index)
([mais
detalhes](http://www.direito2.com.br/acam/2009/mai/21/mesa-divulga-ato-que-cria-cota-unica-para-atividade-parlamentar)).
Nele, podemos ver onde os deputados estão gastando dinheiro, em um nível de
detalhamento muito grande. Podemos ver quanto foi gasto, pra quem foi pago,
quando e a categoria.

Por curiosidade, fui ver os gastos do [Efraim
Filho](http://www.efraimfilho.com.br/) (DEM). Daí que me deparo com:

![Gastos de Efraim Filho](/assets/media/efraim-filho.png)

Como assim? **R$ 4.125,06** em combustível?! **R$ 2.850,84** de telefone?! Em um
mês?!?! Como ele conseguiu? Fui ver de outros deputados e me deparei com números
parecidos. Aparentemente, é normal gastar alguns milhares de reais por mês
comprando gasolina e pagando a conta de telefone.

Para variar, lá vou eu fazer o scrapping dessa página. Duas horas depois,
consegui montar estas tabelas:

<table border="1">
  <tbody>
  <tr>
    <th>Deputado</th>
    <th>Combust. e Lubrific.</th>
    <th>Telefonia</th>
  </tr>
  <tr>
    <td>ARMANDO ABÍLIO (PTB)</td>
    <td>R$ 3.924,46</td>
    <td><strong>R$ 2.876,46</strong></td>
  </tr>
  <tr>
    <td>DAMIÃO FELICIANO (PDT)</td>
    <td>R$ 3.424,78</td>
    <td>R$ 1.144,66</td>
  </tr>
  <tr>
    <td>EFRAIM FILHO (DEM)</td>
    <td>R$ 2.950,66</td>
    <td>R$ 1.006,01</td>
  </tr>
  <tr>
    <td>LUIZ COUTO (PT)</td>
    <td>R$ 1.271,95</td>
    <td>R$ 1.406,68</td>
  </tr>
  <tr>
    <td>MAJOR FÁBIO (DEM)</td>
    <td>R$ 2.043,00</td>
    <td>R$ 827,82</td>
  </tr>
  <tr>
    <td>MANOEL JUNIOR (PMDB)</td>
    <td><strong>R$ 4.235,14</strong></td>
    <td>R$ 2.128,04</td>
  </tr>
  <tr>
    <td>MARCONDES GADELHA (PSC)</td>
    <td>R$ 2.942,35</td>
    <td>R$ 1.893,33</td>
  </tr>
  <tr>
    <td>RÔMULO GOUVEIA (PSDB)</td>
    <td>R$ 3.135,14</td>
    <td>R$ 1.636,98</td>
  </tr>
  <tr>
    <td>RONALDO CUNHA LIMA (PSDB)</td>
    <td>R$ 734,13</td>
    <td>—</td>
  </tr>
  <tr>
    <td>VITAL DO RÊGO FILHO (PMDB)</td>
    <td>R$ 2.870,52</td>
    <td>R$ 2.045,92</td>
  </tr>
  <tr>
    <td>WALTER BRITO NETO (PRB)</td>
    <td>R$ 1.124,44</td>
    <td>—</td>
  </tr>
  <tr>
    <td>WELLINGTON ROBERTO (PR)</td>
    <td>R$ 3.700</td>
    <td>R$ 1.271,12</td>
  </tr>
  <tr>
    <td>WILSON BRAGA (PMDB)</td>
    <td>R$ 4.212,07</td>
    <td>R$ 1.562,76</td>
  </tr>
  <tr>
    <td>WILSON SANTIAGO (PMDB)</td>
    <td>R$ 3.911,33</td>
    <td>R$ 2.339,48</td>
  </tr>
  </tbody>
</table>

Estes dados refletem a média de gastos entre 01/2007 até 09/2010, 45 meses. Se
pegarmos quem gastou mais com combustível, [Manoel
Júnior](http://www.manoeljunior.net/), que ficou com uma média de R$ 4.235,14, e
multiplicarmos isso por 45 meses, são **R$ 190.581,30**. Vamos considerar que
ele usou 70% dinheiro pra comprar gasolina e o resto pra lubrificantes, e que
tenha pago, em média, R$ 3 por litro. São **44.468,97 litros**. Digamos que ele
tenha um carro que consome bastante, fazendo 5 km/l. Daria pra rodar
**222.344,85 km**.

Para comparação, a costa brasileira tem 7.408 km. Com essa quantidade de
combustível, ele poderia ter ido do **cabo Orange até o arroio Chuí mais de 30
vezes**. Dá mais ou menos uma vez a cada mês e meio, durante aos 3 anos e 9
meses os quais temos acesso aos dados.

Mas, pela pouca pesquisa que fiz até agora, esses gastos são normais. Ele não
gasta muito mais do que os outros deputados. Isso me faz chegar a conclusão que
ou há algo de muito estranho nesses gastos, ou há algo que eu não saiba. Quem
sabe esse combustível não é para carro, mas para seus jatinhos particulares?

Alguém sabe quanto consome um Legacy?

**P.S.:** _Quem quiser ver os dados que consegui extrair e, quem sabe, descobrir
outras coisas, é só clicar [aqui](/assets/media/deputados-pb.db.zip). Ele é um
banco de dados [sqlite3](http://www.sqlite.org/). Por enquanto só tem os
deputados paraibanos, mas estou baixando todos os outros e publicarei aqui._
