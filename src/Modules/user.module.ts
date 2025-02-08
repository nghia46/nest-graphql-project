import { Module } from '@nestjs/common';
import { UserResolver } from 'src/Resolvers/user.resolver';
import { UserService } from 'src/Services/user.service';
@Module({
  providers: [UserService, UserResolver],
})
export class UserModule {}
