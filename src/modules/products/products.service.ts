import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { ProductsRequestDTO } from './products.dto'
import { privateDecrypt } from 'crypto'
import { RequestContextService } from '../../common/services/request-context/request-context.service'
import { UsersService } from '../users/users.service'

//falta finalizar

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly requestContext: RequestContextService,
    private readonly userService: UsersService
  ) {}

  findAll() {
    return this.prisma.product.findMany()
  }

  findById(id: string) {
    return this.prisma.product.findFirst({
      where: {
        id,
      },
    })
  }

  async create(data: ProductsRequestDTO) {
   const userId = this.requestContext.getUserId()
   const user = await this.userService.findById(userId)

     if (!user) {
      throw new Error('Usuário não encontrado')
    }

     const storeId = user.stores[0].id

     return this.prisma.product.create({
      data:{
        ...data, 
        userId: userId,
        storeId: storeId,
        categoryId: undefined
      }
     })
  }

  update(id: string, data: ProductsRequestDTO) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data,
    })
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    })
  }
}