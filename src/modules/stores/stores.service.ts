import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { RequestContextService } from '../../common/services/request-context/request-context.service'
import { PrismaService } from '../../prisma/prisma.service'
import { ProductsService } from '../products/products.service'
import { UsersService } from '../users/users.service'
import { StoresRequestDTO, UpdateStoresDTO } from './stores.dto'

@Injectable()
export class StoresService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
    private readonly requestContext: RequestContextService,
    private readonly userService: UsersService,
  ) {}

  findAll() {
    return this.prisma.store.findMany()
  }

  async create(data: StoresRequestDTO) {
    const userId = this.requestContext.getUserId()

    return this.prisma.store.create({
      data: {
        ...data,
        createdBy: userId,
      },
    })
  }

  async findById() {
    const userId = this.requestContext.getUserId()

    const user = await this.userService.findById(userId)

    if (!user) {
      throw new UnauthorizedException('user not found')
    }

    if (!user.stores || user.stores.length === 0) {
      throw new NotFoundException('This user does not have any linked store.')
    }

    const storeId = user?.stores[0].id

    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
        createdBy: userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        products: {
          select: {
            id: true,
            productUrl: true,
            name: true,
            price: true,
            description: true,
            active: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    })

    if (!store) {
      throw new NotFoundException('store not found')
    }

    return store
  }

  async update(data: UpdateStoresDTO) {
    const store = await this.findById()

    const storeId = store.id

    return this.prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    })
  }

  async remove() {
    const store = await this.findById()

    const storeId = store.id

    await this.prisma.product.deleteMany({
      where: {
        storeId: storeId,
      },
    })

    return this.prisma.store.delete({
      where: {
        id: storeId,
      },
    })
  }
}
