# Conceitos do Nest

- **Controller** -> Quem vai receber a request e vai lidar com ela. Usa o sistema de `decorators`.

- **Services** -> Camada em que colocamos as regras de negócio da aplicação, que podem ser entendido como os useCases.

- **Modules** -> Cada funcionalidade/entidade (ou até feature) é separado, sendo usado para organizar e segregar a aplicação. Além disso o `Nest Module` é o responsável por **instanciar e gerenciar as injeções de dependência do módulo**.

- **Decorators** -> O Nest usa a arquitetura de decorators, que são funções e classes especiais que recebem as classes que estão abaixo dele para injetalo em uma função expecífica. Usado principalmente para conectar a funcionalidade que criamos com a arquitetura Nest.

- **Injeção de dependências** -> Ao invés da classe que quer usar um recurso precisar criar uma instância do recurso que ela quer é declarado que a classe precisa que uma instância do recurso seja passada para ele, isso é feito no `constructor`. Com isso temos um **desacoplamento entre a classe e suas dependências** (classes que ele usa).

# ORM (Object Relational Mapping)

Técnica usada para lidar com bancos de dados de uma forma mais alto nível. Dessa forma ao invés de usarmos SQL usamos objetos e suas propriedades de forma abstraída.

A diferença entre uma Consulta SQL, um query builder e um ORM é o **nível de abstração**.

É importante notar que o grande downside de usar ORM é que sua query final pode ser pouco performática, então podemos ter casos em que as consultas usando ORM se tornam um gargalo da aplicação. **Porém não se esqueça, somente pense em otimização caso o problema realmente existir**.

_A OTIMIZAÇÃO PREMATURA É A RAIZ DE TODO MAL._

- Sobre uso do **Prisma**: é uma ótima ferramente, porém por conta da sua engine (arquivo binário que roda por baixo) em alguns ambientes pode causar problemas. Como por exemplo `Edge Functions`.

Request -> UsersController.create -> UsersService.create -> ...
Request -> `ValidationPipe` -> UsersController.create -> UsersService.create -> ...
