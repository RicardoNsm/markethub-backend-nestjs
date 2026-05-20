import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { ProductsRequestDTO } from './products.dto'
import { RequestContextService } from '../../common/services/request-context/request-context.service'

//falta finalizar

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService,
    private readonly requestContext: RequestContextService,
  ) {}

  findAll() {
    return this.prisma.product.findMany()
  }

  findById(id: string) {
    const product = this.prisma.product.findFirst({
      where: {
        id,
      },
    })
     
    if(!product){
      throw new NotFoundException('product not fount')
    }

    return product
  }

  create(data: ProductsRequestDTO) {
    const userId = this.requestContext.getUserId()

    return this.prisma.product.create({
      data: {
        ...data,
      storeId: '123',
      userId: userId,
      categoryId: '123'
      }
    })
  }

  async update(id: string, data: ProductsRequestDTO) {
    await this.findById(id)

    return this.prisma.product.update({
      where: {
        id,
      },
      data,
    })
  }

  async remove(id: string) {
    await this.findById(id)

    return this.prisma.product.delete({
      where: {
        id,
      },
    })
  }
}
