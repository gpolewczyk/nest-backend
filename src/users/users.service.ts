import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers() {
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find((u) => u.id === Number(id));
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  addUser(newUser: CreateUserDto) {
    const newId = Math.random();
    return this.users.push({ id: newId, name: newUser.name });
  }

  updateUser(newUser: CreateUserDto, id: number) {
    const user = this.users.find((u) => u.id === Number(id));
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    this.users = this.users.map((u) => {
      return u.id === Number(id) ? { ...u, name: newUser.name } : { ...u };
    });

    return this.users;
  }

  deleteUser(id: number) {
    const user = this.users.find((u) => u.id === Number(id));
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    this.users = this.users.filter((u) => u.id !== Number(id));

    return this.users;
  }
}
