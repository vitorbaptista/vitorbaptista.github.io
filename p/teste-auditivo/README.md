# Teste auditivo

Site estático em pt-BR para comparar rodadas simples de reconhecimento de palavras
ou frases curtas. Ele não usa servidor: a rodada atual, configurações e histórico são
salvos no `localStorage` do aparelho.

## Como usar

Sirva a pasta com:

```bash
make dev
```

Depois acesse `http://localhost:4173`. No celular, use o endereço IP do computador
na mesma rede, por exemplo `http://192.168.0.10:4173`.

Comandos uteis:

```bash
make check  # verifica a sintaxe do JavaScript
make url    # mostra a URL para abrir no celular
make qr     # mostra um QR code para abrir no celular
```

## Áudio

Por padrão o app usa a voz pt-BR do próprio navegador. No celular conectado a uma
caixa Bluetooth, o som deve sair pela saída de áudio ativa do sistema.

Se quiser usar gravações próprias em MP3, selecione `Arquivos MP3 locais` e coloque
os arquivos na pasta `audio/` com o mesmo identificador do item. Exemplos:

- `audio/palavras-curtas-p-pato.mp3`
- `audio/palavras-curtas-g-gola.mp3`
- `audio/frases-curtas-ch-chave-nova.mp3`

Se um MP3 não existir, o app volta para a voz do navegador.

## Rodadas comparáveis

Cada rodada tem 10 posições equivalentes. O app sorteia uma palavra ou frase para
cada som-alvo, evitando repetir itens usados recentemente quando ainda há alternativa
no banco local. Assim, as rodadas continuam comparáveis por fonema, mas fica mais
difícil decorar a sequência.

Use `Nova rodada` para zerar acertos e erros mantendo os mesmos itens. Use
`Trocar palavras` antes de marcar qualquer resposta para sortear outros itens com os
mesmos sons-alvo. Depois que a rodada começou, a troca fica bloqueada para preservar
o resultado.

No modo `Frases curtas`, as opções foram escolhidas para soar bem em TTS: frases
curtas, comuns e concretas, geralmente com duas palavras, como `casa verde`,
`cavalo branco` e `porta aberta`.

As posições mantêm sempre a mesma ordem de sons-alvo:

1. P
2. B
3. T
4. D
5. C/K
6. G
7. F
8. V
9. S
10. CH/X

Isso ajuda a comparar uma rodada contra outra depois de ajustar o aparelho auditivo.

## Limite

Esta ferramenta é caseira e serve para comparação prática entre ajustes. Ela não
substitui avaliação com fonoaudiólogo ou otorrinolaringologista.
