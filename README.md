#Projeto de ChatBot com Gemini

Este projeto consiste em um chatbot integrado com a API do Google Gemini. Ele possui um backend em Node.js puro e um frontend desenvolvido com Next.js + React.

#🚀 Como Rodar o Projeto

##📦 1. Configurar e Rodar o Backend

###Requisitos:

- Node.js instalado (versão recomendada: 18 ou superior)

- Um arquivo .env com a chave da API do Gemini

###Passos:

Navegue até a pasta do backend:

```cd backend```

Instale as dependências:

```npm install```

Crie um arquivo .env na raiz do backend e adicione sua chave da API:

```GEMINI_API_KEY=SUA_CHAVE_AQUI```

Inicie o servidor:

```node server.js ```

O backend estará rodando na porta 5001.

###💻 2. Configurar e Rodar o Frontend

Requisitos:

- Node.js instalado (versão recomendada: 18 ou superior)

Passos:

Navegue até a pasta do frontend:

```cd frontend```

Instale as dependências:

```npm install```

Inicie o frontend em modo de desenvolvimento:

```npm run dev```

O frontend estará acessível em http://localhost:3000.

###🛠 Tecnologias Utilizadas

Backend:

-Node.js puro

-WebSockets (ws)

-Google Gemini API (@google/generative-ai)

-dotenv para variáveis de ambiente

-cors para requisições entre diferentes domínios

Frontend:

-Next.js 15

-React 19

-Styled Components

-React Icons

##📌 Observações

Certifique-se de que o backend está rodando antes de iniciar o frontend.

Caso o backend rode em uma porta diferente de 5001, ajuste a URL da requisição no frontend.

Se tiver problemas de conexão, verifique se a chave da API do Gemini está correta.
