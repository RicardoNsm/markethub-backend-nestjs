import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { ProductsRequestDTO } from './products.dto'
import { RequestContextService } from '../../common/services/request-context/request-context.service'
import { UsersService } from '../users/users.service'
import { Prisma } from '@prisma/client'

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
        categoryId:  null
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

  async remove(id: string) {
   try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      // Verifica se o erro veio do Prisma e se é o erro de requisição conhecida
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Produto com o ID ${id} não foi encontrado.`);
        }
      }
      
      // Se for qualquer outro erro desconhecido, lança ele adiante
      throw error;
    }
  }
}