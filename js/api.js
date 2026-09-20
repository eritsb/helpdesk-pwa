async function buscarEnderecoPorCep(cep) {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        throw new Error("CEP inválido.");
    }

    const resposta = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${cepLimpo}`
    );

    if (!resposta.ok) {
        throw new Error("CEP não encontrado.");
    }

    const dados = await resposta.json();

    return {
        cep: dados.cep || "",
        rua: dados.street || "",
        bairro: dados.neighborhood || "",
        cidade: dados.city || "",
        estado: dados.state || ""
    };
}