const CHAVE_STORAGE = "helpdesk_chamados";

function salvarChamados(chamados) {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(chamados));
}

function carregarChamados() {
    const dados = localStorage.getItem(CHAVE_STORAGE);

    if (!dados) {
        return null;
    }

    try {
        return JSON.parse(dados);
    } catch (erro) {
        console.error("Erro ao carregar chamados:", erro);
        return null;
    }
}