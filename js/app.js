document.addEventListener("DOMContentLoaded", () => {
    inicializarAplicacao();
});


function inicializarAplicacao() {

    configurarMenuMobile();

    configurarFormulario();

    configurarAcoesRapidas();

    configurarPesquisa();

    renderizarChamados();

    atualizarEstatisticas();
}


function configurarMenuMobile() {

    const menuButton =
        document.querySelector(".menu-toggle");

    const sidebar =
        document.querySelector(".sidebar");


    if (!menuButton || !sidebar) {
        return;
    }


    menuButton.addEventListener("click", () => {

        sidebar.classList.toggle("active");

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

            titulo:
                document
                    .getElementById("titulo")
                    .value
                    .trim(),

            descricao:
                document
                    .getElementById("descricao")
                    .value
                    .trim(),

            categoria:
                document
                    .getElementById("categoria")
                    .value,

            prioridade:
                document
                    .getElementById("prioridade")
                    .value
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
        <article class="ticket-card">

            <div class="ticket-main">

                <div class="ticket-header">

                    <span class="ticket-id">
                        #${String(chamado.id).padStart(3, "0")}
                    </span>

                    <span
                        class="status status-${normalizarClasse(
                            chamado.status
                        )}"
                    >
                        ${chamado.status}
                    </span>

                </div>


                <h3>
                    ${chamado.titulo}
                </h3>


                <p>
                    ${chamado.descricao}
                </p>


                <div class="ticket-meta">

                    <span>
                        ${chamado.categoria}
                    </span>

                    <span
                        class="priority priority-${normalizarClasse(
                            chamado.prioridade
                        )}"
                    >
                        ${chamado.prioridade}
                    </span>

                </div>

            </div>

        </article>
    `;
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