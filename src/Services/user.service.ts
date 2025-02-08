import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/Dtos/user.input';
import { User } from 'src/Model/user.model';
import { PrismaService } from './prisma.service';
import { GraphQLException } from 'src/common/errors/custom-exception';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new GraphQLException(`User with ID ${id} not found`, 404);
      }
      return user;
    } catch (error) {
      throw new GraphQLException(`User with ID ${id} not found`, 404);
    }
  }

  async createUser(input: CreateUserInput): Promise<User> {
    try {
      // Kiểm tra email có tồn tại chưa
      const existingUser = await this.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new GraphQLException('Email already exists', 400);
      }

      // Nếu không có user thì tạo mới
      return await this.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    } catch (error) {
      throw new GraphQLException(error.message || 'User not created', 500);
    }
  }
  async updateUser(id: string, input: CreateUserInput): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new GraphQLException(`User with ID ${id} not found`, 404);
      }

      return await this.prisma.user.update({
        where: { id },
        data: {
          name: input.name,
          email: input.email,
        },
      });
    } catch (error) {
      throw new GraphQLException(error.message || 'User not updated', 500);
    }
  }
  async deleteUser(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new GraphQLException(`User with ID ${id} not found`, 404);
      }

      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new GraphQLException(error.message || 'User not deleted', 500);
    }
  }
}
