<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## This repository is GraphQL with Apollo and NestJS example

For setting NestJS, GraphQL, Apollo, see the following description.

## Install GraphQL and Apollo

```bash
$ npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

After installation is complete, start the server.

```bash
$ npm run start:dev
```

NOTICE : See [latest](https://docs.nestjs.com/graphql/quick-start#installation) documents.

After installation, check the package.json file. The dependencies `@nestjs/apollo`, `@nestjs/graphql`, `apollo-server-express`, and `graphql` are automatically added.

Next, fix `src/app.module.ts`.

```typescript
// src/app.module.ts
@Module({
  imports: [
    GraphQLModule.forRoot({
      // shema???????????????????????????
      autoSchemaFile: join(process.cwd(), 'src/shema.gql'),
      // ???????????????shema????????????sort????????????????????????on
      sortSchema: true,
      // v10~ new required cofiguration property called "driver"
      driver: ApolloDriver,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
```

## Define the model(entity)

First, create `todo` files(module, service, resolver). Next, to define the `todo` model, create `todo.models.ts` file.

```bash
# g ??? generate ??????????????????
# src/todo/todo.module.ts?????????
nest g module todo
# src/todo/todo.service.ts?????????
nest g service todo
# src/todo/todo.resolver.ts?????????
nest g resolver todo
```

```typescript
// src/todo/models/todo.models.ts
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum TodoStatus {
  NEW,
  IN_PROGRESS,
  COMPLETE,
}

// enum????????????????????????registerEnumType???enum?????????
// https://docs.nestjs.com/graphql/unions-and-enums#enums
registerEnumType(TodoStatus, {
  name: 'TodoStatus',
});

// Objectable??????????????????????????????????????????????????????model?????????schema????????????????????????
@ObjectType()
export class Todo {
  // schema??????ID?????????????????????ReturnTyepFunc?????????????????????
  // ReturnTypeFunc?????????????????????????????????id?????????string?????????
  @Field((type) => ID)
  id: string;

  // string?????????????????????ReturnTypeFunc????????????????????????
  @Field()
  title: string;

  // null??????????????????????????????
  // ??????????????????????????????????????????null?????????????????????string!????????????
  @Field({ nullable: true })
  description: string;

  // GraphQL?????????????????????(TodoStatus)????????????????????????ReturnTypeFunc?????????????????????
  @Field((type) => TodoStatus)
  status: TodoStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
```

## Implement service and resolver.

### --- code first approach ---

Once the model is defined, the service and resolver are implemented. If the server is running, `src/schema.gql` will be generated automatically. If it is not generated automatically, make sure that the server is running and that the file `src/app.module.ts` contains `sortSchema: true,`.

```typescript
// src/app.module.ts
@Module({
  imports: [
    GraphQLModule.forRoot({
      // shema???????????????????????????
      autoSchemaFile: join(process.cwd(), 'src/shema.gql'),
      // ???????????????shema????????????sort????????????????????????on
      sortSchema: true,
...
```

## Execute GraphQL command

Access `http://localhost:11888/graphql`. If the Apollo Server does not start, execute the following command to start the Apollo Server. _-Notice-_ Define port number at `main.ts` file.

```bash
$ npm run start:dev
```

Run following command on [Playground](http://localhost:3000/graphql).

```bash
# query example #1
query {
  findAll {
    id
  }
}

# query example #2
query {
  findOneById(id: "hoge") {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
}
```

```bash
# mutation example
mutation {
  create(todo: { title: "hoge", description: "fuga" }) {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
}
```

---

If you are cloning this repository, execute the following command.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil My??liwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
