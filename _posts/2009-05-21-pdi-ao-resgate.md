---
layout: post
title: "PDI ao resgate!"
description: ""
category: 
tags: []
---

Hoje tive um problema com uma imagem. Estou organizando junto com alguns amigos
o [III ENSOL](http://www.ensol.org.br), e a [UEPB](http://www.uepb.edu.br) nos
apoiou pagando 75 inscrições para seus alunos. Então, precisei encontrar o logo
deles para colocar no site do evento. A melhor que encontrei foi esta:

![Logo da UEPB](/assets/media/uepb.png)

Como dá pra ver, ela tem o fundo branco. O do site do ENSOL é laranja. E agora?

Tentei usar o GIMP para resolver, usando a Magic Wand, mas ele não consegue
pegar tudo, pois parte do fundo não é 100% branco. Colocando sobre um fundo
preto, ficou assim:

![Logo da UEPB com fundo preto](/assets/media/uepb-fundopreto.png)

Como resolver? Sei que, se eu diminuísse a precisão da Magic Wand, fazendo ela
pegar não só 100% branco, mas entre 90% e 100%, por exemplo, melhoraria. Quiçá,
resolvesse. Mas, como? Não encontrei essa configuração. Sei que poderia criar
um plugin em Python pro GIMP que resolveria, mas como nunca fiz isso, iria
demorar.

Então eu vi a luz.

Relembrando as aulas de PDI – Processamento Digital de Imagens -, que paguei
semestre passado. Uma das cadeiras mais interessantes até agora, uma pena que,
por uma razão qualquer, não aproveitei tanto. Mas aprendi a programar usando o
Octave.

O GNU Octave é uma linguagem para fazer cálculos matemáticos, muito parecida
com o MatLab. Nela a gente consegue trabalhar com matrizes sem problema algum.
Por exemplo, se você tiver uma matriz 3×3 e quer somar com uma outra de mesmo
tamanho o que faz? Um for por cada elemento da matriz somando um com o outro?
Não! Simplesmente matrizA + matrizB. E o que são imagens que não grandes
matrizes de pixels?

A idéia é: passar por cada pixel da imagem e, se ele for mais claro que um
determinado valor, transformo ele em magenta. Daí nasceu o Magentinizator!

Fazer isto em Octave é trivial. O código comentado é:

{% highlight octave %}
    # Magentinizator v 0.42 - 2009
    # ----------------------------------------------------------------------------
    # "THE BEER-WARE LICENSE" (Revisão 42):
    # <vitor@vitorbaptista.com> escreveu este arquivo. Contanto que mantenha este 
    # texto, você pode fazer o que quiser com esse software. Se nos conhecermos
    # algum dia, e você achar que esse programa vale, você pode me pagar uma cerveja
    # em troca.
    #                                                               Vitor Baptista
    # ----------------------------------------------------------------------------
     
    path = "uepb.png";                # Caminho para a imagem
    threshold = 0xB4;                 # Pixels com cor maior que 0xB4B4B4
                                      # se tornarão 0xFF00FF
     
    im = imread(path);                # Lê a imagem. im agora tem uma matriz
                                      # Largura x Altura x 3 (RGB)
     
    tam = size(im);                   # Pega o tamanho da imagem
     
    for i = 1:tam(1)                  # De 1 até a largura
      for j = 1:tam(2)                # De 1 até a altura
     
        if (im(i, j, 1) > threshold   # Se o R for maior que o threshold, e
            && im(i,j,2) > threshold  # se o G for maior, e
            && im(i,j,3) > threshold) # se o B for maior.
     
          im(i,j,1) = 255;            # Torna aquele pixel
          im(i,j,2) = 0;              # em
          im(i,j,3) = 255;            # magenta!
        end
      end
    end
     
    imwrite([path, ".magentinized"], # Concatena strings
            im(:,:,1),               # R
            im(:,:,2),               # G
            im(:,:,3));              # B
{% endhighlight %}

O resultado ficou ótimo. Não perfeito, mas bem melhor que usando o GIMP e mais
que o suficiente pro site do ENSOL.

![Logo da UEPB com fundo magenta](/assets/media/uepbmagentinized.png)

Se precisar tirar mais o branco, só diminuir o threshold. Lembrando que vai
chegar um momento que vai tornar outras partes da imagem também magenta.
