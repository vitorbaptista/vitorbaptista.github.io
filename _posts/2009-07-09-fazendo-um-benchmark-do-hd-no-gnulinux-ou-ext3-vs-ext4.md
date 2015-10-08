---
layout: post
title: "Fazendo um benchmark do HD no GNU/Linux (ou ext3 VS ext4)"
description: ""
category: 
tags: []
---

Sempre li que os SSDs são infinitamente mais velozes que os atuais HDs. Usar um
computador com um drive desses dá um belo ganho de performance. Por
curiosidade, fui testar a velocidade do meu HD.

Usando:

    $ udevadm info –query=all –path /sys/block/sda

achei o serial do meu HD. Com uma rápida busca, descobri que ele é o Seagate
Momentus 7200.3, com 320gb, 7200rpm e 16mb de cache. Nada mal. Ok, vamos ao
benchmark.

Para gerá-lo, usei o bonnie++ v1.03c. No Ubuntu, basta:

    $ sudo aptitude install bonnie
    $ bonnie++

Por curiosidade, rodei ele em uma partição ext3 e em uma ext4. Sempre com um
arquivo de 6 GB.

<table>
  <tbody>
  <tr>
    <th></th>
    <th colspan="6">——Sequential Output——</th>
    <th colspan="4">–Sequential Input-</th>
  </tr>
  <tr>
    <th></th>
    <th colspan="2">-Per Chr-</th>
    <th colspan="2">–Block–</th>
    <th colspan="2">-Rewrite-</th>
    <th colspan="2">-Per Chr-</th>
    <th colspan="2">–Block–</th>
  </tr>
  <tr>
    <th>FS</th>
    <th>K/sec</th>
    <th>%CP</th>
    <th>K/sec</th>
    <th>%CP</th>
    <th>K/sec</th>
    <th>%CP</th>
    <th>K/sec</th>
    <th>%CP</th>
    <th>K/sec</th>
    <th>%CP</th>
  </tr>
  <tr>
    <td>ext3</td>
    <td>40421</td>
    <td>89</td>
    <td>48745</td>
    <td>25</td>
    <td>28304</td>
    <td>16</td>
    <td>47321</td>
    <td>90</td>
    <td>66517</td>
    <td>22</td>
  </tr>
  <tr>
    <td>ext4</td>
    <td>46671</td>
    <td>96</td>
    <td>72506</td>
    <td>24</td>
    <td>32927</td>
    <td>15</td>
    <td>49627</td>
    <td>91</td>
    <td>78888</td>
    <td>23</td>
  </tr>
  </tbody>
</table>

Impressionante. Não tinha procurado nenhum benchmark ext3 VS ext4. Sabia que
este era mais rápido, mas não tanto. Agora entendo o porquê das versões novas
das distros (ao menos Ubuntu e Fedora) terem acelerado tanto o boot. Chegaram a
incríveis 20 segundos.

Mesmo assim, reza a lenda que os SSDs chegam a 150 MB/s de leitura, o que é
mais que o dobro do ext4. Talvez valha a pena comprar um SSD de 16gb para
deixar só o SO e aplicativos.

Daqui a alguns anos, quando fizer um upgrade no notebook, certamente será esse.
