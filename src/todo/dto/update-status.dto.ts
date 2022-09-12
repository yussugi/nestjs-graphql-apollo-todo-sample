import { Field, ID, InputType } from '@nestjs/graphql';
import { TodoStatus } from '../models/todo.models';

@InputType()
export class UpdateStatusDto {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  status: TodoStatus;
}
