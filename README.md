# HelpDesk PWA

Sistema web de gerenciamento de chamados de suporte técnico desenvolvido como uma Progressive Web App (PWA), utilizando HTML, CSS e JavaScript.

## Sobre o projeto

O HelpDesk PWA foi desenvolvido para facilitar o registro e o acompanhamento de chamados de suporte técnico.

A aplicação permite cadastrar chamados, definir categoria, prioridade e status, consultar endereços automaticamente por CEP e registrar fotografias utilizando a câmera do dispositivo.

Por ser uma Progressive Web App, a aplicação também pode ser instalada no dispositivo e executada como um aplicativo.

## Funcionalidades

* Cadastro de chamados de suporte.
* Definição de categoria e prioridade.
* Gerenciamento de status dos chamados.
* Dashboard com estatísticas dos chamados.
* Pesquisa de chamados.
* Visualização detalhada dos chamados.
* Persistência dos dados utilizando `localStorage`.
* Consulta automática de endereço através do CEP.
* Integração com a BrasilAPI.
* Captura de fotografias utilizando a câmera do dispositivo.
* Aplicação responsiva para diferentes tamanhos de tela.
* Instalação como Progressive Web App.
* Funcionamento com Service Worker.
* Interface adaptada para dispositivos móveis e desktop.

## Tecnologias utilizadas

### Front-end

* HTML5
* CSS3
* JavaScript

### APIs e recursos do navegador

* BrasilAPI
* MediaDevices API
* Service Worker API
* Web App Manifest
* LocalStorage API

### Ferramentas

* Git
* GitHub
* Visual Studio Code
* Live Server

## Integração com a BrasilAPI

A aplicação utiliza a BrasilAPI para consultar informações de endereço a partir de um CEP.

Quando o usuário informa um CEP válido, a aplicação consulta a API e preenche automaticamente os campos de:

* Rua
* Bairro
* Cidade
* Estado
* CEP

A integração está implementada no arquivo:

```text
js/api.js
```

## Captura de imagens

O sistema utiliza a câmera do dispositivo para registrar uma fotografia relacionada ao chamado.

A funcionalidade utiliza a API `MediaDevices.getUserMedia()` do navegador.

A implementação está localizada em:

```text
js/camera.js
```

As imagens capturadas são associadas ao chamado e armazenadas juntamente com os demais dados.

## Persistência dos dados

Os chamados são armazenados localmente no navegador utilizando `localStorage`.

A implementação da persistência está localizada em:

```text
js/storage.js
```

Como não existe um servidor ou banco de dados remoto nesta versão, os dados permanecem armazenados no dispositivo e no navegador utilizado pelo usuário.

## Progressive Web App

O projeto possui recursos necessários para funcionamento como PWA:

```text
manifest.json
sw.js
assets/icons/
```

O `manifest.json` define as informações da aplicação, como nome, cores, orientação, ícones e modo de exibição.

O `sw.js` implementa o Service Worker responsável pelo cache dos principais arquivos da aplicação e pelo funcionamento da aplicação como PWA.

A aplicação pode ser instalada pelo navegador quando executada em um ambiente compatível, como `localhost` ou HTTPS.

## Estrutura do projeto

```text
helpdesk-pwa/
│
├── index.html
├── manifest.json
├── README.md
├── sw.js
│
├── assets/
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
│
├── css/
│   └── style.css
│
└── js/
    ├── api.js
    ├── app.js
    ├── camera.js
    ├── chamados.js
    └── storage.js
```

## Responsabilidade dos arquivos

| Arquivo         | Responsabilidade                       |
| --------------- | -------------------------------------- |
| `index.html`    | Estrutura da interface da aplicação    |
| `style.css`     | Estilos e responsividade               |
| `app.js`        | Inicialização e interação da aplicação |
| `chamados.js`   | Gerenciamento dos chamados             |
| `storage.js`    | Persistência dos dados                 |
| `api.js`        | Integração com a BrasilAPI             |
| `camera.js`     | Acesso à câmera e captura de imagens   |
| `manifest.json` | Configuração do PWA                    |
| `sw.js`         | Service Worker e cache                 |
| `README.md`     | Documentação do projeto                |

## Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/eritsb/helpdesk-pwa.git
```

### 2. Abrir o projeto

Entre na pasta:

```bash
cd helpdesk-pwa
```

### 3. Executar com um servidor local

O projeto deve ser executado através de um servidor local para que recursos como Service Worker e câmera funcionem corretamente.

No Visual Studio Code, pode ser utilizada a extensão Live Server.

Abra o arquivo `index.html` e selecione:

```text
Open with Live Server
```

A aplicação será disponibilizada em um endereço semelhante a:

```text
http://127.0.0.1:5500/
```

## Instalação como PWA

Com a aplicação aberta em um ambiente compatível, o navegador poderá disponibilizar a opção de instalação do HelpDesk.

Após a instalação, a aplicação poderá ser aberta em uma janela própria, funcionando de maneira semelhante a um aplicativo instalado.

## Git e versionamento

O projeto utiliza Git para controle de versão.

As principais etapas de desenvolvimento foram organizadas em commits:

```text
feat: cria interface inicial responsiva
feat: implementa gerenciamento de chamados
feat: adiciona persistencia local dos chamados
feat: integra consulta de endereco por cep
feat: adiciona captura de imagens aos chamados
feat: configura aplicacao como pwa
docs: atualiza documentacao do projeto
```

## Objetivo acadêmico

O projeto foi desenvolvido com o objetivo de aplicar conceitos de desenvolvimento web, responsividade, consumo de APIs, utilização de recursos do dispositivo, armazenamento local, Progressive Web Apps e controle de versão com Git e GitHub.

## Autor

Projeto desenvolvido por Ericha.

Estudante de Análise e Desenvolvimento de Sistemas.