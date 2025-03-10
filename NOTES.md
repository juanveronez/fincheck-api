# Conceitos do Nest

- **Controller** -> Quem vai receber a request e vai lidar com ela. Usa o sistema de `decorators`.

- **Services** -> Camada em que colocamos as regras de negócio da aplicação, que podem ser entendido como os useCases.

- **Modules** -> Cada funcionalidade/entidade (ou até feature) é separado, sendo usado para organizar e segregar a aplicação. Além disso o `Nest Module` é o responsável por **instanciar e gerenciar as injeções de dependência do módulo**.

- **Decorators** -> O Nest usa a arquitetura de decorators, que são funções e classes especiais que recebem as classes que estão abaixo dele para injetalo em uma função expecífica. Usado principalmente para conectar a funcionalidade que criamos com a arquitetura Nest.

- **Injeção de dependências** -> Ao invés da classe que quer usar um recurso precisar criar uma instância do recurso que ela quer é declarado que a classe precisa que uma instância do recurso seja passada para ele, isso é feito no `constructor`. Com isso temos um **desacoplamento entre a classe e suas dependências** (classes que ele usa).
