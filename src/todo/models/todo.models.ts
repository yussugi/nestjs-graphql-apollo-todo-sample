import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum TodoStatus {
  NEW,
  IN_PROGRESS,
  COMPLETE,
}

// enumを使用する場合、registerEnumTypeでenumを登録
// https://docs.nestjs.com/graphql/unions-and-enums#enums
registerEnumType(TodoStatus, {
  name: 'TodoStatus',
});

// Objectableデコレーターを使用することで定義したmodelを元にschemaが自動生成される
@ObjectType()
export class Todo {
  // schema上、ID型にしたいためReturnTyepFuncを引数に与える
  // ReturnTypeFuncを引数に与えない場合、idの型はstringになる
  @Field((type) => ID)
  id: string;

  // string型でいい場合はReturnTypeFuncを引数に与えない
  @Field()
  title: string;

  // null許容オプションを指定
  // オプションを指定しない限り、nullは許容されないstring!型になる
  @Field({ nullable: true })
  description: string;

  // GraphQLに存在しない型(TodoStatus)を指定する場合はReturnTypeFuncを引数に与える
  @Field((type) => TodoStatus)
  status: TodoStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
