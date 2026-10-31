
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { RequestContextService } from '../../common/services/request-context/request-context.service';

@Injectable()
export class CartsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly requestContext: RequestContextService,
  ) {}

  // Listar os produtos do carrinho
  async findAll() {
    const userId = this.requestContext.getUserId();

    return this.prisma.cart.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });
  }

  // Adicionar produto ao carrinho
  async add(productId: string) {
    const userId = this.requestContext.getUserId();

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.active) {
      throw new NotFoundException(
        'Produto não encontrado ou indisponível.',
      );
    }

    const cartItem = await this.prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    const currentQuantity = cartItem?.quantity ?? 0;

    if (currentQuantity + 1 > product.stock) {
      throw new BadRequestException('Estoque insuficiente.');
    }

    return this.prisma.cart.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      create: {
        userId,
        productId,
        quantity: 1,
      },
      update: {
        quantity: {
          increment: 1,
        },
      },
    });
  }

  // Atualizar quantidade de um produto
  async update(productId: string, quantity: number) {
    const userId = this.requestContext.getUserId();

    const cartItem = await this.prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      include: {
        product: true,
      },
    });

    if (!cartItem) {
      throw new NotFoundException(
        'Produto não encontrado no carrinho.',
      );
    }

    if (quantity < 1 || quantity > cartItem.product.stock) {
      throw new BadRequestException(
        'Quantidade inválida ou estoque insuficiente.',
      );
    }

    return this.prisma.cart.update({
      where: { id: cartItem.id },
      data: { quantity },
    });
  }

  // Remover um produto do carrinho
  async remove(productId: string) {
    const userId = this.requestContext.getUserId();

    return this.prisma.cart.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }

  // Esvaziar o carrinho
  async clear() {
    const userId = this.requestContext.getUserId();

    return this.prisma.cart.deleteMany({
      where: { userId },
    });
  }
}
