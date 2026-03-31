import { Injectable } from '@nestjs/common'
import { UsersRequestDTO } from './users.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersService {

  constructor( private readonly prisma: PrismaService){}

  findAll() {
    return this.prisma.user.findMany()
  }
  findById(id: string) {

    return this.prisma.user.findFirst({
      where: {
        id
      }
    })
  }
  create(data: UsersRequestDTO) {
    return this.prisma.user.create({
      data
    })
  }
  update(id: string, data: UsersRequestDTO) {
    return this.prisma.user.update({
      where: {
        id
      },
      data
    })
  }
  remove(id: string) {
    this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
