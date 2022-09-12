import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoDto } from './dto/create-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Todo } from './models/todo.models';
import { TodoService } from './todo.service';

// Resolverデコレーターでresolverを定義
// https://docs.nestjs.com/graphql/resolvers#code-first-resolver
@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}
  // QueryデコレーターでQueryを定義
  // 第一引数にReturnTypeFuncを指定して型を定義.ここではTodoの配列を指定.
  // 第二引数にオプションとして{ nullable: 'items' }を与えることで配列を許容.[Todo]!と同義
  // デフォルトでは[Todo!]!になる
  @Query(() => [Todo], { nullable: 'items' })
  findAll() {
    return this.todoService.findAll();
  }

  @Query(() => Todo)
  // Queryに引数がある場合はArgsデコレーターで定義
  // 第一引数に引数の名前、第二引数に型を指定
  // schema上の型定義はfindOneById(id: ID!): Todo!となる
  findOneById(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.findOneById(id);
  }

  @Mutation((returns) => Todo)
  create(@Args('todo') todo: CreateTodoDto): Todo {
    return this.todoService.create(todo);
  }

  @Mutation((returns) => Todo)
  updateStatus(@Args('todo') todo: UpdateStatusDto): Todo {
    return this.todoService.updateStatus(todo);
  }

  @Mutation((returns) => Todo)
  delete(@Args('todo') todoId: DeleteTodoDto): Todo {
    return this.todoService.delete(todoId);
  }
}
