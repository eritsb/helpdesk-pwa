let chamados = carregarChamados();

if (!chamados) {
    chamados = [
        {
            id: 1,
            titulo: "Computador não liga",
            descricao: "Computador do setor administrativo não está ligando.",
            categoria: "Hardware",
            prioridade: "Alta",
            status: "Aberto"
        },
        {
            id: 2,
            titulo: "Impressora sem conexão",
            descricao: "A impressora não está sendo reconhecida pela rede.",
            categoria: "Redes",
            prioridade: "Média",
            status: "Em andamento"
        },
        {
            id: 3,
            titulo: "Acesso ao sistema",
            descricao: "Usuário não consegue acessar o sistema interno.",
            categoria: "Software",
            prioridade: "Baixa",
            status: "Concluído"
        }
    ];

    salvarChamados(chamados);
}

function adicionarChamado(chamado) {
    const novoChamado = {
    id: gerarNovoId(),
    titulo: chamado.titulo,
    descricao: chamado.descricao,
    categoria: chamado.categoria,
    prioridade: chamado.prioridade,
    cep: chamado.cep,
    rua: chamado.rua,
    bairro: chamado.bairro,
    cidade: chamado.cidade,
    estado: chamado.estado,
    foto: chamado.foto,
    status: "Aberto"
};

    chamados.push(novoChamado);

    salvarChamados(chamados);

    return novoChamado;
}

function gerarNovoId() {
    if (chamados.length === 0) {
        return 1;
    }

    return Math.max(...chamados.map(chamado => chamado.id)) + 1;
}

function buscarChamados(termo = "") {
    const pesquisa = termo.toLowerCase().trim();

    if (!pesquisa) {
        return chamados;
    }

    return chamados.filter(chamado =>
        chamado.titulo.toLowerCase().includes(pesquisa) ||
        chamado.descricao.toLowerCase().includes(pesquisa) ||
        chamado.categoria.toLowerCase().includes(pesquisa)
    );
}

function obterEstatisticas() {
    return {
        total: chamados.length,
        abertos: chamados.filter(chamado => chamado.status === "Aberto").length,
        andamento: chamados.filter(chamado => chamado.status === "Em andamento").length,
        concluidos: chamados.filter(chamado => chamado.status === "Concluído").length
    };
}