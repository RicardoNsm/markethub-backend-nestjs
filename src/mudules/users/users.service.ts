import { Injectable } from '@nestjs/common'
import { UsersRequestDTO } from './users.dto';

@Injectable()
export class UsersService {
  findAll() {}
  findById(id: string) {}
  create(data: UsersRequestDTO) {}
  update(id: string, data: UsersRequestDTO) {}
  remove(id: string) {}
}
