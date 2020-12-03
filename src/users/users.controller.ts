import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUser(id);
  }

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    this.usersService.addUser(createUserDto);
    return await 'User added';
  }

  @Put(':id')
  async updateUser(
    @Body() createUserDto: CreateUserDto,
    @Param('id') id: number,
  ): Promise<string> {
    this.usersService.updateUser(createUserDto, id);
    return await 'User edited';
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    this.usersService.deleteUser(id);
    return await 'User deleted';
  }
}
