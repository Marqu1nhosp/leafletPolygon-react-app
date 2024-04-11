# Gerenciamentos de estabelecimentos

Este é um aplicativo de gerenciamento de estabelecimentos que permite aos usuários se cadastrar e se autenticar na aplicação. Criar, visualizar e editar Estabelecimentos em um mapa interativo. Os usuários podem adicionar novos locais, editar os existentes e visualizar uma lista dos locais cadastrados.

## Funcionalidades

- **Visualização de Estabelecimentos**: Os usuários podem visualizar os estabelecimentos existentes em um mapa interativo.
- **Criação de Estabelecimentos**: Os usuários podem criar novos estabelecimentos clicando no mapa e preenchendo um formulário com informações sobre o local.
- **Edição de Estabelecimentos**: Os usuários podem editar os estabelecimentos existentes, alterando seu nome, status e coordenadas.
**Exclusão de Estabelecimentos**: Os usuários podem excluir os estabelecimentos existentes que não são mais necessários.
- **Lista de Locais**: Os usuários podem visualizar uma lista dos locais cadastrados, com opção de edição e exclusão.
- **Autenticação de Usuário**: Os usuários podem fazer login e logout para acessar as funcionalidades do aplicativo.
- **Notificações de Toast**: O aplicativo exibe notificações de toast para informar o usuário sobre o resultado das operações.
- **Criação de Usuário**: Os usuários podem se registrar no aplicativo fornecendo informações de usuário como nome de usuário, senha, etc.
- **Validação de Formulários**: Os formulários de criação e edição de estabelecimentos e de criação de usuário são validados para garantir dados consistentes e corretos.


## Tecnologias Utilizadas

- **React**: O frontend do aplicativo foi desenvolvido utilizando o framework React para criar interfaces de usuário interativas e responsivas.
- **React Router DOM**: Para gerenciamento de rotas no frontend, foi utilizada a biblioteca React Router DOM, que permite criar aplicativos de página única com navegação entre componentes.
- **React-Leaflet**: O mapa interativo foi implementado utilizando a biblioteca React-Leaflet, que fornece uma integração fácil com a Leaflet.js.
- **Tailwind CSS**: O estilo da aplicação foi construído utilizando o framework Tailwind CSS, que permite criar interfaces de usuário bonitas e responsivas com pouco esforço.
- **Node.js e Fastify**: O backend do aplicativo foi desenvolvido utilizando Node.js e Fastify para criar uma API RESTful que lida com as operações de CRUD dos Estabelecimentos e autenticação de usuários.
- **MySQL**: O banco de dados utilizado foi o MySQL, um sistema de gerenciamento de banco de dados relacional de código aberto.
- **JWT**: A autenticação de usuário foi implementada utilizando JSON Web Tokens (JWT) para gerar tokens de acesso seguros.
- **Zod**: Para validação de esquema de dados, foi utilizada a biblioteca Zod, que permite definir, validar e manipular esquemas de forma simples e eficiente.
- **Sonner**: Para exibir notificações visuais de feedback ao usuário, foi utilizada a biblioteca Sonner, que oferece uma maneira fácil de mostrar mensagens temporárias na interface do usuário com opções de personalização.



## Instalação e Uso

1. Clone este repositório: `git clone https://github.com/Marqu1nhosp/leafletPolygon-react-app.git`
2. Instale as dependências do frontend: `npm install`
3. Instale as dependências do backend
4. Inicie o servidor backend: `npm run dev`
5. Inicie o servidor frontend: `npm run dev`
6. Acesse o aplicativo em `http://localhost:5173`

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue se encontrar um bug ou tiver uma sugestão de melhoria. Você também pode enviar um pull request com suas próprias contribuições.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.
