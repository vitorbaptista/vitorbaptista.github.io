"use strict";

const STORAGE_KEYS = {
  rodada: "teste-auditivo.rodada",
  historico: "teste-auditivo.historico",
  configuracao: "teste-auditivo.configuracao",
  usoRecente: "teste-auditivo.uso-recente",
};

const MAX_RECENTES_POR_PERFIL = 50;

const SONS_ALVO = [
  { id: "p", nome: "P" },
  { id: "b", nome: "B" },
  { id: "t", nome: "T" },
  { id: "d", nome: "D" },
  { id: "k", nome: "C/K" },
  { id: "g", nome: "G" },
  { id: "f", nome: "F" },
  { id: "v", nome: "V" },
  { id: "s", nome: "S" },
  { id: "ch", nome: "CH/X" },
];

const PERFIS_RODADA = [
  {
    id: "palavras-curtas",
    nome: "Palavras curtas",
    descricao: "10 palavras sorteadas, uma por som-alvo",
    banco: {
      p: ["pato", "pote", "pipa", "pano", "pulo", "pena", "pino", "pico"],
      b: ["bola", "bala", "boca", "bolo", "bico", "bota", "bule", "bode"],
      t: ["tela", "teto", "tubo", "tatu", "toca", "taco", "tapa", "talo"],
      d: ["dedo", "dado", "dama", "dono", "duna", "data", "doce", "dote"],
      k: ["casa", "copo", "cola", "cama", "cubo", "capa", "coco", "cuca"],
      g: ["gato", "galo", "gola", "gota", "goma", "gula", "gude", "ganso"],
      f: ["faca", "fogo", "fita", "foto", "foca", "fada", "fila", "furo"],
      v: ["vela", "vaso", "vida", "vaca", "voto", "vila", "vale", "vinho"],
      s: ["sapo", "sino", "seta", "selo", "sala", "suco", "sopa", "seda"],
      ch: ["chave", "chuva", "choro", "chefe", "cheiro", "chute", "xale", "xarope"],
    },
  },
  {
    id: "frases-curtas",
    nome: "Frases curtas",
    descricao: "10 frases sorteadas, uma por som-alvo",
    banco: {
      p: [
        "porta aberta",
        "pano limpo",
        "prato cheio",
        "pote vazio",
        "pipa colorida",
        "papel branco",
        "parede azul",
        "pão quente",
        "pé direito",
        "peixe fresco",
      ],
      b: [
        "bola azul",
        "bolo quente",
        "banco baixo",
        "boca fechada",
        "bota preta",
        "bolsa nova",
        "balde cheio",
        "berço pequeno",
        "blusa branca",
        "braço direito",
      ],
      t: [
        "tela limpa",
        "teto branco",
        "toalha seca",
        "tampa aberta",
        "tapete novo",
        "telefone tocando",
        "tesoura grande",
        "tigela cheia",
        "tomate vermelho",
        "travesseiro macio",
      ],
      d: [
        "dedo frio",
        "dente limpo",
        "dinheiro trocado",
        "doce pequeno",
        "ducha quente",
        "documento novo",
        "data certa",
        "dia claro",
        "dono calmo",
        "dado vermelho",
      ],
      k: [
        "casa verde",
        "cavalo branco",
        "copo cheio",
        "cama macia",
        "cadeira nova",
        "carro parado",
        "camisa limpa",
        "cozinha clara",
        "caderno aberto",
        "café quente",
      ],
      g: [
        "garrafa cheia",
        "gato preto",
        "gaveta aberta",
        "galinha branca",
        "garfo limpo",
        "goiaba madura",
        "gelo frio",
        "gola alta",
        "gente calma",
        "grama verde",
      ],
      f: [
        "faca limpa",
        "fogo baixo",
        "fita vermelha",
        "foto antiga",
        "folha verde",
        "feijão quente",
        "fruta doce",
        "farinha branca",
        "família reunida",
        "ferro quente",
      ],
      v: [
        "vela acesa",
        "vaso grande",
        "vidro limpo",
        "vaca branca",
        "vestido azul",
        "vento forte",
        "vizinho novo",
        "violão velho",
        "viagem curta",
        "varanda aberta",
      ],
      s: [
        "sala clara",
        "sopa quente",
        "sapato preto",
        "sino alto",
        "suco frio",
        "sacola cheia",
        "sofá novo",
        "sol forte",
        "sabonete cheiroso",
        "sinal verde",
      ],
      ch: [
        "chave nova",
        "chuva forte",
        "chão limpo",
        "chapéu velho",
        "chaleira quente",
        "cheiro bom",
        "chinelo azul",
        "chocolate doce",
        "xícara cheia",
        "xale branco",
      ],
    },
  },
];

const estadoInicial = {
  perfilId: "palavras-curtas",
  listaId: "palavras-curtas",
  listaNome: "Palavras curtas",
  indiceAtual: 0,
  respostas: {},
  itens: [],
  iniciadoEm: null,
};

const configuracaoInicial = {
  ajuste: "",
  observacoes: "",
  audio: "voz",
  voz: "",
  velocidade: 0.9,
  volume: 0.8,
  ocultarDuranteAudio: false,
};

const elementos = {
  botaoReiniciar: document.querySelector("#botaoReiniciar"),
  botaoTrocarPalavras: document.querySelector("#botaoTrocarPalavras"),
  statusAudio: document.querySelector("#statusAudio"),
  seletorLista: document.querySelector("#seletorLista"),
  campoAjuste: document.querySelector("#campoAjuste"),
  seletorAudio: document.querySelector("#seletorAudio"),
  seletorVoz: document.querySelector("#seletorVoz"),
  controleVelocidade: document.querySelector("#controleVelocidade"),
  valorVelocidade: document.querySelector("#valorVelocidade"),
  controleVolume: document.querySelector("#controleVolume"),
  valorVolume: document.querySelector("#valorVolume"),
  alternadorOcultar: document.querySelector("#alternadorOcultar"),
  campoObservacoes: document.querySelector("#campoObservacoes"),
  textoProgresso: document.querySelector("#textoProgresso"),
  barraProgresso: document.querySelector("#barraProgresso"),
  grupoFonema: document.querySelector("#grupoFonema"),
  tituloRodada: document.querySelector("#tituloRodada"),
  placarAtual: document.querySelector("#placarAtual"),
  termoAtual: document.querySelector("#termoAtual"),
  botaoTocar: document.querySelector("#botaoTocar"),
  botaoAcertou: document.querySelector("#botaoAcertou"),
  botaoErrou: document.querySelector("#botaoErrou"),
  botaoAnterior: document.querySelector("#botaoAnterior"),
  botaoProximo: document.querySelector("#botaoProximo"),
  botaoLimparItem: document.querySelector("#botaoLimparItem"),
  listaItens: document.querySelector("#listaItens"),
  resumoLista: document.querySelector("#resumoLista"),
  statusRodada: document.querySelector("#statusRodada"),
  resultadoAcertos: document.querySelector("#resultadoAcertos"),
  resultadoErros: document.querySelector("#resultadoErros"),
  resultadoTaxa: document.querySelector("#resultadoTaxa"),
  listaErrosFonema: document.querySelector("#listaErrosFonema"),
  botaoSalvarResultado: document.querySelector("#botaoSalvarResultado"),
  botaoExportar: document.querySelector("#botaoExportar"),
  botaoApagarHistorico: document.querySelector("#botaoApagarHistorico"),
  comparacaoHistorico: document.querySelector("#comparacaoHistorico"),
  listaHistorico: document.querySelector("#listaHistorico"),
};

let estado = carregar(STORAGE_KEYS.rodada, estadoInicial);
let configuracao = carregar(STORAGE_KEYS.configuracao, configuracaoInicial);
let historico = carregar(STORAGE_KEYS.historico, []);
let usoRecente = carregar(STORAGE_KEYS.usoRecente, {});
let vozes = [];
let audioAtual = null;

function carregar(chave, fallback) {
  try {
    const salvo = localStorage.getItem(chave);
    const base = clonar(fallback);
    if (!salvo) {
      return base;
    }

    const valor = JSON.parse(salvo);
    if (Array.isArray(base)) {
      return Array.isArray(valor) ? valor : base;
    }

    if (base && typeof base === "object" && valor && typeof valor === "object") {
      return { ...base, ...valor };
    }

    return valor ?? base;
  } catch {
    return clonar(fallback);
  }
}

function clonar(valor) {
  return typeof structuredClone === "function"
    ? structuredClone(valor)
    : JSON.parse(JSON.stringify(valor));
}

function salvar(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function listaAtual() {
  const perfil = perfilAtual();
  return {
    id: perfil.id,
    nome: estado.listaNome || perfil.nome,
    descricao: perfil.descricao,
    itens: estado.itens,
  };
}

function perfilAtual() {
  return (
    PERFIS_RODADA.find((perfil) => perfil.id === normalizarPerfilId(estado.perfilId ?? estado.listaId)) ??
    PERFIS_RODADA[0]
  );
}

function normalizarPerfilId(id) {
  if (id === "frases-a" || id === "frases-curtas") {
    return "frases-curtas";
  }

  if (id === "lista-a" || id === "lista-b" || id === "lista-c" || id === "palavras-curtas") {
    return "palavras-curtas";
  }

  return PERFIS_RODADA.some((perfil) => perfil.id === id) ? id : PERFIS_RODADA[0].id;
}

function criarRodada(perfilId = estadoInicial.perfilId) {
  const perfil = PERFIS_RODADA.find((opcao) => opcao.id === normalizarPerfilId(perfilId)) ?? PERFIS_RODADA[0];
  const itens = sortearItens(perfil);
  registrarUsoRecente(perfil.id, itens);

  return {
    perfilId: perfil.id,
    listaId: perfil.id,
    listaNome: perfil.nome,
    indiceAtual: 0,
    respostas: {},
    itens,
    iniciadoEm: new Date().toISOString(),
  };
}

function sortearItens(perfil) {
  const recentes = Array.isArray(usoRecente[perfil.id]) ? usoRecente[perfil.id] : [];

  return SONS_ALVO.map((som, indice) => {
    const candidatos = perfil.banco[som.id] ?? [];
    const candidatosComId = candidatos.map((texto) => criarItemDaRodada(perfil.id, som, texto, indice));
    const naoRecentes = candidatosComId.filter((candidato) => !recentes.includes(candidato.id));
    const fonte = naoRecentes.length > 0 ? naoRecentes : candidatosComId;
    return fonte[Math.floor(Math.random() * fonte.length)];
  });
}

function criarItemDaRodada(perfilId, som, texto, indice) {
  return {
    id: `${perfilId}-${som.id}-${slug(texto)}`,
    texto,
    som: som.nome,
    somId: som.id,
    posicao: indice + 1,
  };
}

function registrarUsoRecente(perfilId, itens) {
  const idsNovos = itens.map((itemDaLista) => itemDaLista.id);
  const anteriores = Array.isArray(usoRecente[perfilId]) ? usoRecente[perfilId] : [];
  usoRecente = {
    ...usoRecente,
    [perfilId]: [...idsNovos, ...anteriores.filter((id) => !idsNovos.includes(id))].slice(
      0,
      MAX_RECENTES_POR_PERFIL,
    ),
  };
  salvar(STORAGE_KEYS.usoRecente, usoRecente);
}

function slug(valor) {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function itemAtual() {
  return listaAtual().itens[estado.indiceAtual];
}

function resultadoAtual() {
  const itens = listaAtual().itens;
  const respostas = itens.map((itemDaLista) => estado.respostas[itemDaLista.id]);
  const acertos = respostas.filter((resposta) => resposta === "acerto").length;
  const erros = respostas.filter((resposta) => resposta === "erro").length;
  const respondidos = acertos + erros;
  const taxa = respondidos === 0 ? 0 : Math.round((acertos / respondidos) * 100);
  return { acertos, erros, respondidos, total: itens.length, taxa };
}

function rodadaComecou() {
  return resultadoAtual().respondidos > 0;
}

function iniciar() {
  preencherListas();
  aplicarConfiguracaoNosCampos();
  carregarVozes();
  conectarEventos();
  garantirEstadoValido();
  renderizar();
}

function preencherListas() {
  elementos.seletorLista.innerHTML = "";
  PERFIS_RODADA.forEach((perfil) => {
    const option = document.createElement("option");
    option.value = perfil.id;
    option.textContent = `${perfil.nome} · ${perfil.descricao}`;
    elementos.seletorLista.append(option);
  });
}

function aplicarConfiguracaoNosCampos() {
  elementos.seletorLista.value = normalizarPerfilId(estado.perfilId ?? estado.listaId);
  elementos.campoAjuste.value = configuracao.ajuste;
  elementos.seletorAudio.value = configuracao.audio;
  elementos.controleVelocidade.value = String(configuracao.velocidade);
  elementos.controleVolume.value = String(configuracao.volume);
  elementos.alternadorOcultar.checked = configuracao.ocultarDuranteAudio;
  elementos.campoObservacoes.value = configuracao.observacoes;
}

function conectarEventos() {
  elementos.seletorLista.addEventListener("change", () => {
    estado = criarRodada(elementos.seletorLista.value);
    salvar(STORAGE_KEYS.rodada, estado);
    renderizar();
  });

  elementos.campoAjuste.addEventListener("input", atualizarConfiguracao);
  elementos.seletorAudio.addEventListener("change", atualizarConfiguracao);
  elementos.seletorVoz.addEventListener("change", atualizarConfiguracao);
  elementos.controleVelocidade.addEventListener("input", atualizarConfiguracao);
  elementos.controleVolume.addEventListener("input", atualizarConfiguracao);
  elementos.alternadorOcultar.addEventListener("change", atualizarConfiguracao);
  elementos.campoObservacoes.addEventListener("input", atualizarConfiguracao);

  elementos.botaoTocar.addEventListener("click", tocarItemAtual);
  elementos.botaoAcertou.addEventListener("click", () => registrarResposta("acerto"));
  elementos.botaoErrou.addEventListener("click", () => registrarResposta("erro"));
  elementos.botaoAnterior.addEventListener("click", irParaAnterior);
  elementos.botaoProximo.addEventListener("click", irParaProximo);
  elementos.botaoLimparItem.addEventListener("click", limparItemAtual);
  elementos.botaoReiniciar.addEventListener("click", reiniciarRodada);
  elementos.botaoTrocarPalavras.addEventListener("click", trocarPalavrasDaRodada);
  elementos.botaoSalvarResultado.addEventListener("click", salvarResultado);
  elementos.botaoExportar.addEventListener("click", exportarCsv);
  elementos.botaoApagarHistorico.addEventListener("click", apagarHistorico);

  if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener("voiceschanged", carregarVozes);
  }
}

function atualizarConfiguracao() {
  configuracao = {
    ajuste: elementos.campoAjuste.value.trim(),
    observacoes: elementos.campoObservacoes.value.trim(),
    audio: elementos.seletorAudio.value,
    voz: elementos.seletorVoz.value,
    velocidade: Number(elementos.controleVelocidade.value),
    volume: Number(elementos.controleVolume.value),
    ocultarDuranteAudio: elementos.alternadorOcultar.checked,
  };

  salvar(STORAGE_KEYS.configuracao, configuracao);
  renderizarValoresConfiguracao();
}

function carregarVozes() {
  if (!("speechSynthesis" in window)) {
    vozes = [];
    elementos.seletorVoz.innerHTML = '<option value="">Voz indisponível neste navegador</option>';
    elementos.statusAudio.textContent = "Sem voz";
    return;
  }

  vozes = window.speechSynthesis
    .getVoices()
    .sort((a, b) => {
      const aPt = a.lang.toLowerCase().startsWith("pt") ? 0 : 1;
      const bPt = b.lang.toLowerCase().startsWith("pt") ? 0 : 1;
      return aPt - bPt || a.name.localeCompare(b.name, "pt-BR");
    });

  const vozesPt = vozes.filter((voz) => voz.lang.toLowerCase().startsWith("pt"));
  const opcoes = vozesPt.length > 0 ? vozesPt : vozes;
  elementos.seletorVoz.innerHTML = "";

  if (opcoes.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Voz padrão do aparelho";
    elementos.seletorVoz.append(option);
    elementos.statusAudio.textContent = "Voz padrão";
    return;
  }

  opcoes.forEach((voz) => {
    const option = document.createElement("option");
    option.value = voz.voiceURI;
    option.textContent = `${voz.name} · ${voz.lang}`;
    elementos.seletorVoz.append(option);
  });

  const preferida =
    opcoes.find((voz) => voz.voiceURI === configuracao.voz) ??
    opcoes.find((voz) => voz.lang.toLowerCase() === "pt-br") ??
    opcoes[0];

  configuracao.voz = preferida.voiceURI;
  elementos.seletorVoz.value = preferida.voiceURI;
  salvar(STORAGE_KEYS.configuracao, configuracao);
  elementos.statusAudio.textContent = preferida.lang.toLowerCase().startsWith("pt")
    ? "Voz pt-BR"
    : "Voz disponível";
}

function garantirEstadoValido() {
  const perfilId = normalizarPerfilId(estado.perfilId ?? estado.listaId);
  const perfil = PERFIS_RODADA.find((opcao) => opcao.id === perfilId) ?? PERFIS_RODADA[0];
  estado.perfilId = perfilId;
  estado.listaId = perfilId;
  estado.listaNome = perfil.nome;

  if (!estado.respostas || typeof estado.respostas !== "object") {
    estado.respostas = {};
  }

  if (!Array.isArray(estado.itens) || estado.itens.length !== SONS_ALVO.length) {
    estado = criarRodada(perfilId);
  }

  const limite = listaAtual().itens.length - 1;
  estado.indiceAtual = Math.min(Math.max(estado.indiceAtual, 0), limite);
  estado.iniciadoEm = estado.iniciadoEm ?? new Date().toISOString();
  salvar(STORAGE_KEYS.rodada, estado);
}

function renderizar() {
  const lista = listaAtual();
  const itemDaVez = itemAtual();
  const resultado = resultadoAtual();

  elementos.seletorLista.value = lista.id;
  elementos.textoProgresso.textContent = `Item ${estado.indiceAtual + 1} de ${lista.itens.length}`;
  elementos.barraProgresso.value = estado.indiceAtual + 1;
  elementos.barraProgresso.max = lista.itens.length;
  elementos.grupoFonema.textContent = `Som-alvo: ${itemDaVez.som}`;
  elementos.tituloRodada.textContent = lista.nome;
  elementos.placarAtual.textContent = `${resultado.acertos}/${lista.itens.length}`;
  elementos.termoAtual.textContent = itemDaVez.texto;
  elementos.termoAtual.classList.remove("oculto");
  elementos.resumoLista.textContent = lista.nome;
  elementos.botaoAnterior.disabled = estado.indiceAtual === 0;
  elementos.botaoProximo.disabled = estado.indiceAtual === lista.itens.length - 1;
  elementos.botaoTrocarPalavras.disabled = resultado.respondidos > 0;
  elementos.botaoTrocarPalavras.title =
    resultado.respondidos > 0
      ? "Disponível apenas antes de marcar acertos ou erros."
      : "Sortear outros itens para esta rodada.";
  elementos.seletorLista.disabled = resultado.respondidos > 0;
  elementos.seletorLista.title =
    resultado.respondidos > 0
      ? "Inicie uma nova rodada antes de trocar o tipo."
      : "Escolha palavras ou frases curtas.";

  renderizarValoresConfiguracao();
  renderizarItens();
  renderizarResultado();
  renderizarHistorico();
}

function renderizarValoresConfiguracao() {
  elementos.valorVelocidade.textContent = `${Math.round(configuracao.velocidade * 100)}%`;
  elementos.valorVolume.textContent = `${Math.round(configuracao.volume * 100)}%`;
}

function renderizarItens() {
  const lista = listaAtual();
  elementos.listaItens.innerHTML = "";

  lista.itens.forEach((itemDaLista, indice) => {
    const resposta = estado.respostas[itemDaLista.id];
    const li = document.createElement("li");
    li.className = ["item-lista", indice === estado.indiceAtual ? "atual" : "", resposta ?? ""]
      .filter(Boolean)
      .join(" ");

    const botao = document.createElement("button");
    botao.type = "button";
    botao.innerHTML = `<strong>${itemDaLista.texto}</strong><span>Som ${itemDaLista.som}</span>`;
    botao.addEventListener("click", () => {
      estado.indiceAtual = indice;
      salvar(STORAGE_KEYS.rodada, estado);
      renderizar();
    });

    const marcacao = document.createElement("span");
    marcacao.className = "marcacao";
    marcacao.textContent = resposta === "acerto" ? "Acerto" : resposta === "erro" ? "Erro" : "Aberto";

    li.append(botao, marcacao);
    elementos.listaItens.append(li);
  });
}

function renderizarResultado() {
  const lista = listaAtual();
  const resultado = resultadoAtual();
  elementos.resultadoAcertos.textContent = String(resultado.acertos);
  elementos.resultadoErros.textContent = String(resultado.erros);
  elementos.resultadoTaxa.textContent = `${resultado.taxa}%`;
  elementos.statusRodada.textContent =
    resultado.respondidos === lista.itens.length ? "Completa" : "Em andamento";

  const errosPorSom = lista.itens.reduce((acc, itemDaLista) => {
    if (estado.respostas[itemDaLista.id] === "erro") {
      acc[itemDaLista.som] = (acc[itemDaLista.som] ?? 0) + 1;
    }
    return acc;
  }, {});

  elementos.listaErrosFonema.innerHTML = "";
  const entradas = Object.entries(errosPorSom);
  if (entradas.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Nenhum erro marcado.";
    elementos.listaErrosFonema.append(li);
  } else {
    entradas.forEach(([som, quantidade]) => {
      const li = document.createElement("li");
      li.textContent = `${som}: ${quantidade} erro${quantidade > 1 ? "s" : ""}`;
      elementos.listaErrosFonema.append(li);
    });
  }
}

function renderizarHistorico() {
  elementos.listaHistorico.innerHTML = "";

  if (historico.length === 0) {
    elementos.comparacaoHistorico.textContent = "Nenhuma rodada salva ainda.";
    return;
  }

  const ordenado = [...historico].sort((a, b) => b.salvoEm.localeCompare(a.salvoEm));
  const ultimo = ordenado[0];
  const anteriorMesmaLista = ordenado.find(
    (registro) => registro.id !== ultimo.id && registro.listaId === ultimo.listaId,
  );

  if (anteriorMesmaLista) {
    const diferenca = ultimo.taxa - anteriorMesmaLista.taxa;
    const sinal = diferenca > 0 ? "+" : "";
    elementos.comparacaoHistorico.textContent = `${ultimo.listaNome}: ${ultimo.taxa}% na última rodada (${sinal}${diferenca} p.p. vs. rodada salva anterior da mesma lista).`;
  } else {
    elementos.comparacaoHistorico.textContent = `${ultimo.listaNome}: ${ultimo.taxa}% na última rodada salva.`;
  }

  ordenado.slice(0, 8).forEach((registro) => {
    const li = document.createElement("li");
    li.className = "item-historico";

    const placar = document.createElement("strong");
    placar.textContent = `${registro.taxa}% · ${registro.acertos}/${registro.total}`;

    const contexto = document.createElement("span");
    contexto.textContent = `${registro.listaNome} · ${formatarData(registro.salvoEm)}`;

    const ajuste = document.createElement("span");
    ajuste.textContent = registro.ajuste || "Sem nome de ajuste";

    li.append(placar, contexto, ajuste);
    elementos.listaHistorico.append(li);
  });
}

function tocarItemAtual() {
  const itemDaVez = itemAtual();
  pararAudio();

  if (configuracao.ocultarDuranteAudio) {
    elementos.termoAtual.classList.add("oculto");
  }

  if (configuracao.audio === "mp3") {
    tocarMp3(itemDaVez).catch(() => {
      if (configuracao.ocultarDuranteAudio) {
        elementos.termoAtual.classList.add("oculto");
      }
      falar(itemDaVez.texto);
    });
    return;
  }

  falar(itemDaVez.texto);
}

function tocarMp3(itemDaVez) {
  return new Promise((resolve, reject) => {
    audioAtual = new Audio(`audio/${itemDaVez.id}.mp3`);
    audioAtual.volume = configuracao.volume;
    audioAtual.addEventListener("ended", () => {
      elementos.statusAudio.textContent = "Áudio pronto";
      elementos.termoAtual.classList.remove("oculto");
      resolve();
    });
    audioAtual.addEventListener("error", () => {
      elementos.statusAudio.textContent = "MP3 ausente, usando voz";
      elementos.termoAtual.classList.remove("oculto");
      reject(new Error("MP3 ausente"));
    });
    audioAtual.play().catch((erro) => {
      elementos.termoAtual.classList.remove("oculto");
      reject(erro);
    });
  });
}

function falar(texto) {
  if (!("speechSynthesis" in window)) {
    elementos.statusAudio.textContent = "Voz indisponível";
    elementos.termoAtual.classList.remove("oculto");
    return;
  }

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = configuracao.velocidade;
  fala.volume = configuracao.volume;
  fala.pitch = 1;

  const voz = vozes.find((opcao) => opcao.voiceURI === configuracao.voz);
  if (voz) {
    fala.voice = voz;
  }

  fala.onend = () => {
    elementos.statusAudio.textContent = "Áudio pronto";
    elementos.termoAtual.classList.remove("oculto");
  };
  fala.onerror = () => {
    elementos.statusAudio.textContent = "Falha ao tocar";
    elementos.termoAtual.classList.remove("oculto");
  };

  elementos.statusAudio.textContent = "Tocando";
  window.speechSynthesis.speak(fala);
  window.setTimeout(() => {
    if (!window.speechSynthesis.speaking) {
      elementos.statusAudio.textContent = "Áudio pronto";
    }
  }, 400);
}

function pararAudio() {
  if (audioAtual) {
    audioAtual.pause();
    audioAtual.currentTime = 0;
    audioAtual = null;
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  elementos.statusAudio.textContent = "Áudio pronto";
}

function registrarResposta(resposta) {
  const itemDaVez = itemAtual();
  estado.respostas[itemDaVez.id] = resposta;

  if (estado.indiceAtual < listaAtual().itens.length - 1) {
    estado.indiceAtual += 1;
  }

  salvar(STORAGE_KEYS.rodada, estado);
  renderizar();
}

function limparItemAtual() {
  delete estado.respostas[itemAtual().id];
  salvar(STORAGE_KEYS.rodada, estado);
  renderizar();
}

function irParaAnterior() {
  estado.indiceAtual = Math.max(0, estado.indiceAtual - 1);
  salvar(STORAGE_KEYS.rodada, estado);
  renderizar();
}

function irParaProximo() {
  estado.indiceAtual = Math.min(listaAtual().itens.length - 1, estado.indiceAtual + 1);
  salvar(STORAGE_KEYS.rodada, estado);
  renderizar();
}

function reiniciarRodada() {
  pararAudio();
  estado = {
    ...estado,
    indiceAtual: 0,
    respostas: {},
    iniciadoEm: new Date().toISOString(),
  };
  salvar(STORAGE_KEYS.rodada, estado);
  renderizar();
}

function trocarPalavrasDaRodada() {
  if (rodadaComecou()) {
    return;
  }

  pararAudio();
  estado = criarRodada(estado.perfilId ?? estado.listaId);
  salvar(STORAGE_KEYS.rodada, estado);
  renderizar();
}

function salvarResultado() {
  const lista = listaAtual();
  const resultado = resultadoAtual();
  const registro = {
    id: globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now()),
    listaId: lista.id,
    listaNome: lista.nome,
    ajuste: configuracao.ajuste,
    observacoes: configuracao.observacoes,
    audio: configuracao.audio,
    velocidade: configuracao.velocidade,
    volume: configuracao.volume,
    iniciadoEm: estado.iniciadoEm,
    salvoEm: new Date().toISOString(),
    acertos: resultado.acertos,
    erros: resultado.erros,
    respondidos: resultado.respondidos,
    total: resultado.total,
    taxa: resultado.taxa,
    itens: lista.itens.map((itemDaLista) => ({
      texto: itemDaLista.texto,
      som: itemDaLista.som,
      resposta: estado.respostas[itemDaLista.id] ?? "aberto",
    })),
  };

  historico = [registro, ...historico].slice(0, 80);
  salvar(STORAGE_KEYS.historico, historico);
  renderizarHistorico();
  elementos.statusRodada.textContent = "Resultado salvo";
}

function apagarHistorico() {
  const confirmou = window.confirm("Apagar todas as rodadas salvas neste aparelho?");
  if (!confirmou) {
    return;
  }

  historico = [];
  salvar(STORAGE_KEYS.historico, historico);
  renderizarHistorico();
}

function exportarCsv() {
  const registros = historico.length > 0 ? historico : [registroTemporario()];
  const linhas = [
    [
      "data",
      "lista",
      "ajuste",
      "acertos",
      "erros",
      "respondidos",
      "total",
      "taxa",
      "audio",
      "velocidade",
      "volume",
      "observacoes",
    ],
    ...registros.map((registro) => [
      registro.salvoEm,
      registro.listaNome,
      registro.ajuste,
      registro.acertos,
      registro.erros,
      registro.respondidos,
      registro.total,
      `${registro.taxa}%`,
      registro.audio,
      `${Math.round(registro.velocidade * 100)}%`,
      `${Math.round(registro.volume * 100)}%`,
      registro.observacoes,
    ]),
  ];

  const csv = linhas.map((linha) => linha.map(campoCsv).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `teste-auditivo-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function registroTemporario() {
  const lista = listaAtual();
  const resultado = resultadoAtual();
  return {
    listaNome: lista.nome,
    ajuste: configuracao.ajuste,
    observacoes: configuracao.observacoes,
    audio: configuracao.audio,
    velocidade: configuracao.velocidade,
    volume: configuracao.volume,
    salvoEm: new Date().toISOString(),
    ...resultado,
  };
}

function campoCsv(valor) {
  return `"${String(valor ?? "").replaceAll('"', '""')}"`;
}

function formatarData(valor) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(valor));
}

iniciar();
