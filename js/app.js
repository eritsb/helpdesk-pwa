document.addEventListener("DOMContentLoaded", () => {
    inicializarAplicacao();
});


function inicializarAplicacao() {
    
    configurarMenuMobile();
    
    configurarFormulario();
   
    configurarAcoesRapidas();
    
    configurarPesquisa();
    
    configurarCep();

    configurarCamera();
   
    renderizarChamados();
    
    atualizarEstatisticas();
}


function configurarMenuMobile() {
    const menuButton = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const navItems = document.querySelectorAll(".nav-item");

    if (!menuButton || !sidebar) {
        return;
    }

    menuButton.addEventListener("click", (event) => {
        event.stopPropagation();
        sidebar.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
        const clicouNoMenu = sidebar.contains(event.target);
        const clicouNoBotao = menuButton.contains(event.target);

        if (!clicouNoMenu && !clicouNoBotao) {
            sidebar.classList.remove("active");
        }
    });

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            sidebar.classList.remove("active");
        });
    });
}

function configurarFormulario() {

    const form =
        document.getElementById("new-ticket-form");


    if (!form) {
        return;
    }


    form.addEventListener("submit", event => {

        event.preventDefault();


        const novoChamado = {
    titulo: document.getElementById("titulo").value.trim(),
    descricao: document.getElementById("descricao").value.trim(),
    categoria: document.getElementById("categoria").value,
    prioridade: document.getElementById("prioridade").value,
    cep: document.getElementById("cep").value.trim(),
    rua: document.getElementById("rua").value.trim(),
    bairro: document.getElementById("bairro").value.trim(),
    cidade: document.getElementById("cidade").value.trim(),
    estado: document.getElementById("estado").value.trim(),
    foto: fotoCapturada
};

        if (
            !novoChamado.titulo ||
            !novoChamado.descricao ||
            !novoChamado.categoria ||
            !novoChamado.prioridade
        ) {

            return;

        }


        adicionarChamado(novoChamado);


        form.reset();


        esconderFormulario();


        renderizarChamados();

        atualizarEstatisticas();

    });


    const cancelarButton =
        document.getElementById(
            "btn-cancelar-chamado"
        );


    if (cancelarButton) {

        cancelarButton.addEventListener(
            "click",
            () => {

                form.reset();

                esconderFormulario();

            }
        );

    }
}


function configurarAcoesRapidas() {

    const botoesNovoChamado =
        document.querySelectorAll(
            "#btn-novo-chamado, #btn-abrir-chamado, #nav-novo-chamado"
        );


    botoesNovoChamado.forEach(botao => {

        botao.addEventListener(
            "click",
            event => {

                event.preventDefault();

                mostrarFormulario();

            }
        );

    });


    const verChamados =
        document.getElementById(
            "btn-ver-chamados"
        );


    if (verChamados) {

        verChamados.addEventListener(
            "click",
            () => {

                const lista =
                    document.getElementById(
                        "tickets-list"
                    );


                if (lista) {

                    lista.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    const abrirLista =
        document.getElementById(
            "btn-abrir-lista"
        );


    if (abrirLista) {

        abrirLista.addEventListener(
            "click",
            () => {

                const lista =
                    document.getElementById(
                        "tickets-list"
                    );


                if (lista) {

                    lista.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }
}


function configurarPesquisa() {

    const campoPesquisa =
        document.querySelector(
            ".search-box input"
        );


    if (!campoPesquisa) {
        return;
    }


    campoPesquisa.addEventListener(
        "input",
        event => {

            renderizarChamados(
                event.target.value
            );

        }
    );
}


function mostrarFormulario() {

    const secao =
        document.getElementById(
            "new-ticket-section"
        );


    if (!secao) {
        return;
    }


    secao.classList.remove("hidden");


    secao.scrollIntoView({
        behavior: "smooth"
    });


    const titulo =
        document.getElementById("titulo");


    if (titulo) {
        titulo.focus();
    }
}


function esconderFormulario() {

    const secao =
        document.getElementById(
            "new-ticket-section"
        );


    if (!secao) {
        return;
    }


    secao.classList.add("hidden");
}


function renderizarChamados(termo = "") {

    const lista =
        document.getElementById(
            "tickets-list"
        );


    if (!lista) {
        return;
    }


    const chamadosFiltrados =
        buscarChamados(termo);


    if (chamadosFiltrados.length === 0) {

        lista.innerHTML = `
            <div class="empty-state">
                <h3>Nenhum chamado encontrado</h3>
                <p>
                    Tente pesquisar por outro termo.
                </p>
            </div>
        `;

        return;
    }


    lista.innerHTML =
        chamadosFiltrados
            .slice()
            .reverse()
            .map(chamado =>
                criarCardChamado(chamado)
            )
            .join("");
}


function criarCardChamado(chamado) {
    return `
        <article class="ticket-card" onclick="alternarDetalhesChamado(${chamado.id})">

            <div class="ticket-main">

                <div class="ticket-header">

                    <span class="ticket-id">
                        #${String(chamado.id).padStart(3, "0")}
                    </span>

                    <span class="status status-${normalizarClasse(chamado.status)}">
                        ${chamado.status}
                    </span>

                </div>

                <div class="ticket-title-row">
                    <h3>${chamado.titulo}</h3>
                    <span class="ticket-expand-icon">⌄</span>
                </div>

                <div class="ticket-meta">

                    <span>
                        ${chamado.categoria}
                    </span>

                    <span class="priority priority-${normalizarClasse(chamado.prioridade)}">
                        ${chamado.prioridade}
                    </span>

                </div>

                <div class="ticket-details" id="detalhes-${chamado.id}">

    ${
        chamado.foto
            ? `
                <div class="ticket-photo">
                    <strong>Foto do chamado</strong>
                    <img
                        src="${chamado.foto}"
                        alt="Foto do chamado"
                    >
                </div>
            `
            : ""
    }

    <div class="ticket-description">
                        <strong>Descrição</strong>
                        <p>${chamado.descricao}</p>
                    </div>

                    <div class="ticket-address">

                        <strong>Endereço</strong>

                        <p>
                            ${chamado.rua || "Não informado"},
                            ${chamado.bairro || "Não informado"}
                        </p>

                        <p>
                            ${chamado.cidade || "Não informado"} -
                            ${chamado.estado || "Não informado"}
                        </p>

                        <p>
                            CEP: ${chamado.cep || "Não informado"}
                        </p>

                    </div>

                </div>

            </div>

        </article>
    `;
}

function alternarDetalhesChamado(id) {
    const detalhes = document.getElementById(`detalhes-${id}`);
    const card = detalhes?.closest(".ticket-card");

    if (!detalhes || !card) {
        return;
    }

    detalhes.classList.toggle("expanded");
    card.classList.toggle("expanded");
}

let fotoCapturada = null;

function configurarCamera() {
    const video = document.getElementById("camera-preview");
    const foto = document.getElementById("camera-photo");
    const abrirCamera = document.getElementById("btn-abrir-camera");
    const capturar = document.getElementById("btn-capturar-foto");
    const fecharCamera = document.getElementById("btn-fechar-camera");

    if (!video || !foto || !abrirCamera || !capturar || !fecharCamera) {
        return;
    }

    abrirCamera.addEventListener("click", async () => {
        const cameraIniciada = await iniciarCamera(video);

        if (!cameraIniciada) {
            alert("Não foi possível acessar a câmera.");
        }
    });

    capturar.addEventListener("click", () => {
        const imagem = capturarFoto(video);

        if (!imagem) {
            alert("Abra a câmera antes de capturar uma foto.");
            return;
        }

        fotoCapturada = imagem;
        foto.src = imagem;
        foto.style.display = "block";
    });

    fecharCamera.addEventListener("click", () => {
        pararCamera();
        video.srcObject = null;
    });
}


function atualizarEstatisticas() {

    const estatisticas =
        obterEstatisticas();


    const total =
        document.getElementById(
            "total-chamados"
        );


    const abertos =
        document.getElementById(
            "chamados-abertos"
        );


    const andamento =
        document.getElementById(
            "chamados-andamento"
        );


    const concluidos =
        document.getElementById(
            "chamados-concluidos"
        );


    if (total) {
        total.textContent =
            estatisticas.total;
    }


    if (abertos) {
        abertos.textContent =
            estatisticas.abertos;
    }


    if (andamento) {
        andamento.textContent =
            estatisticas.andamento;
    }


    if (concluidos) {
        concluidos.textContent =
            estatisticas.concluidos;
    }
}


function normalizarClasse(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .replace(
            /\s+/g,
            "-"
        );
}

function configurarCep() {
    const campoCep = document.getElementById("cep");

    if (!campoCep) {
        return;
    }

    campoCep.addEventListener("blur", async () => {
        const cep = campoCep.value.trim();

        if (!cep) {
            return;
        }

        try {
            const endereco = await buscarEnderecoPorCep(cep);

            document.getElementById("estado").value = endereco.estado;
            document.getElementById("rua").value = endereco.rua;
            document.getElementById("bairro").value = endereco.bairro;
            document.getElementById("cidade").value = endereco.cidade;
        } catch (erro) {
            alert(erro.message);
        }
    });
}