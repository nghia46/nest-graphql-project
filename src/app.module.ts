import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './Services/app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './Resolvers/app.resolver';
import { UserModule } from './Modules/user.module';
import { PrismaModule } from './Modules/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Tự động tạo schema
      sortSchema: true,
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
