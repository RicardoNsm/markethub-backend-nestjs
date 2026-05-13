import { Injectable } from '@nestjs/common'
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
    return this.prisma.product.findFirst({
      where: {
        id,
      },
    })
  }

  create(data: ProductsRequestDTO) {
    return this.prisma.product.create({
      data,
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