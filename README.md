*Projeto Tabela Periódica Interativa*

Este é um projeto front-end completo construído com Vue.js 3 e Vite, simulando uma aplicação SPA (Single Page Application) para gerenciar uma tabela periódica de elementos.

O projeto implementa um sistema de autenticação completo (Cadastro, Login, JWT) e um CRUD (Criar, Ler, Atualizar, Deletar) para a entidade principal (Elementos). O estado da aplicação é gerenciado globalmente pela Pinia, e o backend é simulado usando json-server-auth.

*Funcionalidades Principais*

- Autenticação JWT: Sistema de Cadastro (/register) e Login (/login) que se comunica com um backend e gera um Token JWT.

- Gerenciamento de Sessão (Pinia): O estado do usuário (token, dados) é salvo no localStorage e gerenciado centralmente pela authStore.

- Proteção de Rotas (Guards): O router/index.js implementa "Guards de Roteamento" que protegem rotas (ex: /tabela) de usuários não      logados e impedem usuários logados de verem a página de login.

- CRUD de Entidades: O usuário pode Criar, Ler, Atualizar e Deletar elementos da tabela.

- Gerenciamento de Estado (Pinia): Duas stores (cofres) são usadas:

- authStore: Gerencia o login, logout e dados do usuário.

- elementosStore: Gerencia toda a lógica de API (CRUD) para os elementos.

- Experiência do Usuário (UX):

- Modo Escuro: Um botão no cabeçalho alterna o tema do site (salvo no localStorage).

- Feedback Visual: O sistema usa Spinners (Item 4.2.2) durante o carregamento e Toasts (Item 4.2.1) para notificações de sucesso e erro.

- Responsividade: O layout se adapta a telas de desktop, tablet e mobile (Item 4.1).

- Navegação: O site usa Breadcrumbs (ex: Tabela > Detalhe) para localização (Item 4.3.3).

 *Tecnologias Utilizadas*

 --- Frontend ---

Vue.js 3 (usando Options API e setup() script)
Vite (Como servidor de desenvolvimento)
Vue Router (Para navegação e guardas)
Pinia (Para gerenciamento de estado global)
Axios (Para chamadas de API)

--- Backend (Simulado) ---

json-server
json-server-auth (Para criptografia de senha e geração de JWT)

 *Instruções de Instalação*

Clone este repositório (ou baixe os arquivos).
Navegue até a pasta raiz do projeto.
Execute o comando abaixo para instalar todas as dependências (Vue, Vite, Axios, Pinia, etc.): npm install

*Como Rodar o Projeto*

Este projeto requer dois terminais rodando simultaneamente: um para o Backend (API/Banco de Dados) e um para o Frontend (Vue/Vite).

1. Terminal 1: Rodando o Backend (json-server-auth)

Este servidor "assiste" o seu arquivo db.json e fornece a API de login e dos elementos.

Abra um terminal na raiz do projeto.

Execute o script auth configurado no package.json: npm run auth

Você deve ver uma mensagem \{^_^}/ hi! indicando que o servidor está rodando em: http://localhost:3000

2. Terminal 2: Rodando o Frontend (Vite)

Este é o seu aplicativo Vue.
Abra um segundo terminal na raiz do projeto.
Execute o script dev: npm run dev

O terminal mostrará a URL para acessar o site: http://localhost:5173

Abra http://localhost:5173 no seu navegador.

 *Arquivos de Ambiente (.env)*

O projeto usa um arquivo .env para gerenciar a URL da API.

Crie um arquivo chamado .env na raiz do projeto.

Copie o conteúdo do env.example para dentro dele:

VITE_API_URL=http://localhost:3000


(O servidor npm run dev deve ser reiniciado se este arquivo for criado ou alterado).

 *Credenciais de Teste*

O sistema não possui credenciais de teste padrão.

Para testar a aplicação, você deve primeiro usar o fluxo de cadastro:

1. Clique em "Criar Conta".
2. Cadastre um novo usuário.
3. O sistema irá redirecioná-lo para a página de Login.
4. Use as credenciais que você acabou de criar para acessar a página principal da tabela.