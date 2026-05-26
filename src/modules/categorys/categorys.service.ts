import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { NotFoundError } from 'rxjs'
import { PrismaService } from '../../prisma/prisma.service'
import { CategorysRequestDTO, CreateCategoryDTO, UpdateCategoryDTO } from './category.dto'

@Injectable()
export class CategorysService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDTO) {
    const categoryExist = await this.prisma.category.findUnique({
      where: {
        name: CategorysRequestDTO.name,
      },
    })

    if (categoryExist) {
      throw new ConflictException('Já existe uma categoria cadastrada com este nome.')
    }

    return await this.prisma.category.create({
      data: {
        name: data.name,
        description: data.description
      },
    })
  }

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })
  }

  async findById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },select:{
        id:true,
        name:true,
        description:true,
        createdAt:true,
        _count:true,
        products:{
          select: {
            id:true,
            storeId:true,
            userId:true,
            name: true,
            description: true,
            price: true,
            stock: true,
            productUrl: true,            
          }
        }
      }
    })

    if (!category) {
      throw new NotFoundError('category not found')
    }

    return category
  }

  async update(id: string, updateCategory: UpdateCategoryDTO) {
    await this.findById(id)

    if (updateCategory.name) {
      const nameExist = await this.prisma.category.findFirst({
        where: {
          name: updateCategory.name,
          NOT: { id },
        },
      })

      if (nameExist) {
        throw new ConflictException('ja existe categoria com esse nome')
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategory,
    })
  }

  async remove(id: string) {
    await this.findById(id)

    const hasProducts = await this.prisma.product.findFirst({
      where: {
        categoryId: id,
      },
    })

    if (hasProducts) {
      throw new BadRequestException(
        'Não é possível deletar esta categoria pois existem produtos vinculados a ela.'
      )
    }

    return await this.prisma.category.delete({
        where: {
            id
        }
    })
  }
}
