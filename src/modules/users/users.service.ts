import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UsersRequestDTO } from './users.dto'
import { StoresService } from '../stores/stores.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService,
    private readonly storesService : StoresService,
  ) {}

  findAll() {
    return this.prisma.user.findMany()
  }
  findById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        stores: {
          select: {
            id: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          }
        }
      }
    })
  }

  async findByEmail(email: string){
    return await this.prisma.user.findUnique({
      where: {
        email,
      }
    })
  }
  create(data: UsersRequestDTO) {
    return this.prisma.user.create({
      data,
    })
  }
  update(id: string, data: UsersRequestDTO) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    })
  }
  remove(id: string) {
    

    this.prisma.user.delete({
      where: {
        id,
        
      },
    })
  }
}