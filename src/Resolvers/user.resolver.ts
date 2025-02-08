import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { CreateUserInput } from 'src/Dtos/user.input';
import { User } from 'src/Model/user.model';
import { UserService } from 'src/Services/user.service';


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  user(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }
  @Mutation(() => User)
  updateUser(@Args('id') id: string, @Args('input') input: CreateUserInput) {
    return this.userService.updateUser(id, input);
  }
  @Mutation(() => User)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
