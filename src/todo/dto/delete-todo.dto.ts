import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteTodoDto {
  @Field((type) => ID)
  id: string;
}
