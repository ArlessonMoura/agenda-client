# Sistema de Agendamento Telefônico

![Angular](https://img.shields.io/badge/Angular-17+-DD0031?logo=angular)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?logo=spring)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?logo=postgresql)

## ✨ Funcionalidades

- **Cadastro de Contatos**
  - Validação de número único
  - Campos obrigatórios com feedback visual
- **Consulta Inteligente**
  - Busca por nome, celular ou email
  - Filtragem em tempo real
  - Paginação responsiva
- **Gestão de Contatos**
  - Edição detalhada
  - Inativação com confirmação
  - Marcar como favorito
- **UI Moderna**
  - Design responsivo baseado no Angular Material

## 🛠 Tecnologias Utilizadas

- **Frontend:** Angular 17+, Angular Material
- **Backend:** Spring Boot 3.x
- **Banco de Dados:** PostgreSQL 15+
- **Bibliotecas Extras:** NativeWind para estilização

## 👤 Estrutura do Projeto

```
/src
  |-- app
      |-- components
      |   |-- cadastro-contato
      |   |-- consulta-contato
      |   |-- contato-detalhe
      |
      |-- directives
      |   |-- phone-mask.directive.ts
      |
      |-- models
      |   |-- contato.ts
      |
      |-- pipes
      |   |-- phone.pipes.ts
      |
      |-- services
      |   |-- contato.service.ts
      |
      |-- shared
          |-- confirm-dialog
              |-- confirm-dialog.component.ts
              |-- confirm-dialog.component.html
              |-- confirm-dialog.component.css
```

## 🛠️ Instalação e Execução

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/seu-usuario/sistema-agendamento.git
   cd sistema-agendamento
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Execute o projeto:**

   ```sh
   ng serve
   ```

4. **Acesse no navegador:**

   ```
   http://localhost:4200
   ```

## 🛡️ API de Contatos

O frontend consome os seguintes endpoints do backend:

- `GET /api/contatos` - Lista todos os contatos
- `POST /api/contatos` - Cadastra um novo contato
- `GET /api/contatos/id/{id}` - Busca contato por ID
- `PUT /api/contatos/{id}` - Atualiza um contato
- `DELETE /api/contatos/{id}` - Remove um contato
- `PATCH /api/contatos/{id}/inativar` - Inativa um contato
- `GET /api/contatos/celular/{celular}` - Busca por celular
- `GET /api/contatos/nome/{nome}` - Busca por nome
- `GET /api/contatos/email/{email}` - Busca por email

## 👨‍💻 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o repositório
2. Crie uma branch com sua funcionalidade: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Adicionando nova feature'`
4. Push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

## 🛡️ Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
