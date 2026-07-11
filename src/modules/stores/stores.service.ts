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

  async findByStoreId(storeId: string) {
    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
      },
      select: {
        id: true,
        userId: true,
        name: true,
        description: true,
        logo: true,
        banner: true,
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
            images: {
              select: {
                id: true,
                imageUrl: true,
                productId: true,
                createdAt: true,
              },
            },
          },
        },
      },
    })

    if (!store) {
      throw new NotFoundException('store not found')
    }

    return store
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
            images: {
              select: {
                id: true,
                imageUrl: true,
                productId: true,
                createdAt: true,
              },
            },
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
        logo: data.logo,
        banner: data.banner,
      },
    })
  }

  async remove() {
  const store = await this.findById();
  const storeId = store.id;

  // 1. Descobrir todos os produtos vinculados a essa loja
  const products = await this.prisma.product.findMany({
    where: { storeId: storeId },
    select: { id: true }
  });
  
  const productIds = products.map(p => p.id);

  // 2. Apagar primeiro todas as imagens que pertencem a esses produtos 🌟
  await this.prisma.productImage.deleteMany({
    where: {
      productId: { in: productIds }
    }
  });

  // 3. Agora sim, apagar os produtos da loja
  await this.prisma.product.deleteMany({
    where: { storeId: storeId }
  });

  // 4. Por fim, apagar a loja em si (se for o que a função finaliza)
  return await this.prisma.store.delete({
    where: { id: storeId }
  });
}


  async updateMedia(data: { logo?: string; banner?: string }) {
    // Exemplo: buscando a loja cadastrada pelo usuário logado.
    // Adapte o "createdBy" para pegar o ID real vindo do JWT Guard do seu request.
    const userId = this.requestContext.getUserId()

    const store = await this.prisma.store.findFirst({
      where: { createdBy: userId }, 
    });

    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }

    // Atualiza apenas os campos que foram enviados no upload
    return this.prisma.store.update({
      where: { id: store.id },
      data,
    });
  }
}
