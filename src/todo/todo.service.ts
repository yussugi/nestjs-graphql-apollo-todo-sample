import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo, TodoStatus } from './models/todo.models';
import { v4 as uuidv4 } from 'uuid';
import { UpdateStatusDto } from './dto/update-status.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';

@Injectable()
export class TodoService {
  // メモリ上にTODO保存
  private todos: Todo[] = [];

  // 全件取得メソッド
  findAll(): Todo[] {
    return this.todos;
  }

  // idを元に一件取得
  findOneById(id: string): Todo {
    const result = this.todos.find((todo) => id === todo.id);
    if (!result) {
      // 取得できない場合:404エラーを返却
      // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
      throw new NotFoundException();
    }
    return result;
  }

  // TODOを作成
  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      ...createTodoDto,
      id: uuidv4(),
      status: TodoStatus.NEW,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  // TODOステータスを更新
  updateStatus(updateStatusDto: UpdateStatusDto): Todo {
    const targetTodo = this.todos.find(
      (todo) => todo.id === updateStatusDto.id,
    );
    if (!targetTodo) {
      throw new NotFoundException();
    }
    const newTodo = {
      ...targetTodo,
      status: updateStatusDto.status,
      updatedAt: new Date(),
    };
    this.todos = this.todos.map((todo) =>
      todo.id === newTodo.id ? newTodo : todo,
    );
    return newTodo;
  }

  // TODOステータスを削除
  delete({ id }: DeleteTodoDto): Todo {
    const targetTodo = this.todos.find((todo) => todo.id === id);
    if (!targetTodo) {
      throw new NotFoundException();
    }
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return targetTodo;
  }
}
