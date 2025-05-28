# API Restaurante 🍽️

Bem-vindo à API do Restaurante! Este projeto foi desenvolvido para fornecer um backend robusto e eficiente para o gerenciamento de pedidos em um restaurante. Com esta API, é possível controlar produtos, mesas, pedidos e muito mais, otimizando o fluxo de trabalho e a organização do estabelecimento.

---

## ✨ Funcionalidades Principais

* **Gerenciamento de Produtos:**
    * Crie, visualize, atualize e remova produtos do cardápio.
    * Defina nomes, descrições, preços e categorias para cada item.
* **Gerenciamento de Mesas:**
    * Cadastre e controle as mesas disponíveis no restaurante.
    * Verifique o status de cada mesa (livre, ocupada).
* **Gerenciamento de Pedidos:**
    * Crie novos pedidos associados a uma mesa.
    * Adicione produtos a um pedido, especificando a quantidade.
    * Visualize todos os pedidos de uma mesa.
    * Atualize o status de um pedido (ex: Em preparo, Pronto, Entregue).
* **Cálculo de Total:**
    * Calcule automaticamente o valor total de um pedido com base nos produtos e quantidades.
    * Obtenha o valor total da conta de uma mesa.
* **(Possível) Autenticação e Autorização:**
    * Controle de acesso para diferentes tipos de usuários (garçom, cozinha, gerente).

*(Observação: A lista completa de funcionalidades pode ser maior. Verifique o código-fonte para mais detalhes).*

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias modernas para garantir performance e escalabilidade.

* **Backend:** Node.js
* **Framework:** Express
* **Banco de Dados:** SQLite
* **Query Builder**: Knex
* **Linguagem:** TypeScript


---

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/DanielVieiraFernandes/api-restaurant.git](https://github.com/DanielVieiraFernandes/api-restaurant.git)
    cd api-restaurant
    ```

2.  **Instale as dependências:**
    *(Verifique se usa `npm`, `yarn` ou `pnpm`)*
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  ** Execute as migrações do banco de dados:**
    ```bash
    yarn knex migrate:latest # ou comando equivalente
    ```

4.  **Inicie o servidor:**
    ```bash
    yarn dev # ou npm start
    ```

Após iniciar, a API estará acessível em `http://localhost:PORTA` (verifique a contante **PORT** no arquivo principal **server.ts**).

---

## Endpoints da API (Exemplos)

Aqui estão alguns exemplos dos endpoints que você pode encontrar nesta API. Consulte o código (rotas/controllers) para a lista completa e detalhada.

* **Produtos:**
    * `GET /products` - Lista todos os produtos.
    * `POST /products` - Cria um novo produto.
    * `PUT /products/{id}` - Atualiza um produto.
    * `DELETE /products/{id}` - Remove um produto.
* **Mesas:**
    * `GET /tables` - Lista todas as mesas.

* **Sessões da mesa:**
    * `GET /tables-sessions` - Lista todas as sessões
    * `POST /tables-sessions` - Cria uma nova mesa e inicia uma nova sessão
    * `PATCH /tables-sessions/:id` - Marca a mesa como disponível ou fechada

* **Pedidos:**
    * `POST /orders` - Cria um novo pedido para uma mesa.
    * `GET /order/table-session/:table_session_id` - Lista os pedidos de uma mesa.
    * `GET /order/table-session/:table_session_id/total` - Mostra o valor total dos pedidos da mesa

---

## 💡 Como Usar

Para interagir com a API, você pode utilizar ferramentas como [Insomnia](https://insomnia.rest/) e importar o arquivo `requests_insomnia.json` que esta na raiz do projeto.

---

Feito com ❤️ por Daniel Vieira Fernandes.