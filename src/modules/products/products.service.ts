import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { ProductsRequestDTO } from './products.dto'

//falta finalizar

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.product.create({
      data: {
        ...data,
      storeId: '123',
      userId: '123',
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
