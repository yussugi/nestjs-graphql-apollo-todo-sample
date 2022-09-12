import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // shemaファイルのパス指定
      autoSchemaFile: join(process.cwd(), 'src/shema.gql'),
      // 生成されたshemaを自動でsortするオプション：on
      sortSchema: true,
      // v10~ new required cofiguration property called "driver"
      driver: ApolloDriver,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
