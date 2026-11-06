
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { RequestContextService } from '../../common/services/request-context/request-context.service';
import { FavoritesRequestDTO } from './favorites.dto';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly requestContext: RequestContextService,
  ) {}

  // Lista somente os favoritos do usuário autenticado
  findAll() {
    const userId = this.requestContext.getUserId();

    return this.prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });
  }

  // Busca um favorito pertencente ao usuário autenticado
  async findById(id: string) {
    const userId = this.requestContext.getUserId();

    const favorite = await this.prisma.favorite.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorito não encontrado.');
    }

    return favorite;
  }

  // Adiciona um produto aos favoritos
  async create(data: FavoritesRequestDTO) {
    const userId = this.requestContext.getUserId();

    // Verifica se o produto existe e está ativo
    const product = await this.prisma.product.findFirst({
      where: {
        id: data.productId,
        active: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado ou indisponível.');
    }

    // Verifica se o produto já está nos favoritos
    const existingFavorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        productId: data.productId,
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Este produto já está nos favoritos.');
    }

    // Cria o favorito e trata duplicidade no banco de dados
    try {
      return await this.prisma.favorite.create({
        data: {
          userId,
          productId: data.productId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Este produto já está nos favoritos.');
      }

      throw error;
    }
  }

  // Atualiza um favorito pertencente ao usuário autenticado
  async update(id: string, data: FavoritesRequestDTO) {
    const userId = this.requestContext.getUserId();

    const favorite = await this.prisma.favorite.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorito não encontrado.');
    }

    const product = await this.prisma.product.findFirst({
      where: {
        id: data.productId,
        active: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado ou indisponível.');
    }

    const existingFavorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        productId: data.productId,
        NOT: {
          id,
        },
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Este produto já está nos favoritos.');
    }

    return this.prisma.favorite.update({
      where: {
        id,
      },
      data: {
        productId: data.productId,
      },
    });
  }

  // Remove um favorito pertencente ao usuário autenticado
  async remove(id: string) {
    const userId = this.requestContext.getUserId();

    const favorite = await this.prisma.favorite.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorito não encontrado.');
    }

    return this.prisma.favorite.delete({
      where: {
        id,
      },
    });
  }
}
