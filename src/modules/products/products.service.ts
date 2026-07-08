import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { RequestContextService } from '../../common/services/request-context/request-context.service'
import { PrismaService } from '../../prisma/prisma.service'
import { UsersService } from '../users/users.service'
import { ProductsRequestDTO } from './products.dto'

//falta finalizar

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly requestContext: RequestContextService,
    private readonly userService: UsersService,
  ) {}

  findAll() {
    return this.prisma.product.findMany({
      include: {
        images: true,
      },
    })
  }

  findById(id: string) {
    return this.prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        images: true,
      },
    })
  }

  async findMeProduct(){
    const userId = this.requestContext.getUserId()

    return this.prisma.product.findMany({
      where: {
        userId: userId
      },
       include: {
        images: true,
      },
    })
  }


  async create(data: ProductsRequestDTO) {
    const userId = this.requestContext.getUserId()
    const user = await this.userService.findById(userId)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    if (!user.stores || user.stores.length === 0) {
      throw new NotFoundException(
        'Este usuário não possui uma loja cadastrada para associar ao produto.',
      )
    }

    const storeId = user.stores[0].id

    return this.prisma.product.create({
      data: {
        productUrl: data.productUrl,
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        userId: userId,
        storeId: storeId,
        categoryId: data.categoryId ?? null,

        images: data.images
          ? {
              create: data.images.map((url) => ({
                imageUrl: url,
              })),
            }
          : undefined,
      } as Prisma.ProductUncheckedCreateInput,
      include: {
        images: true,
      },
    })
  }

  update(id: string, data: ProductsRequestDTO) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,

        ...(data.categoryId && {
          category: { 
            connect: { id: data.categoryId },
          },
        }),
      },
      include:{
        images: true
      }
    })
  }

  async remove(id: string) {
    try {
      return await this.prisma.product.delete({
        where: { id },
      })
    } catch (error) {
      // Verifica se o erro veio do Prisma e se é o erro de requisição conhecida
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Produto com o ID ${id} não foi encontrado.`)
        }
      }

      // Se for qualquer outro erro desconhecido, lança ele adiante
      throw error
    }
  }
}
