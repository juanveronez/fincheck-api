import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../shared/databases/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  getUserById(id: string) {
    return { userId: id };
  }
}
