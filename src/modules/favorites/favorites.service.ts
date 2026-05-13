import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { FavoritesRequestDTO } from './favorites.dto'

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.favorite.findMany()
  }

  findById(id: string) {
    return this.prisma.favorite.findFirst({
      where: {
        id,
      },
    })
  }

  create(data: FavoritesRequestDTO) {
    return this.prisma.favorite.create({
      data,
    })
  }

  update(id: string, data: FavoritesRequestDTO) {
    return this.prisma.favorite.update({
      where: {
        id,
      },
      data,
    })
  }

  remove(id: string) {
    this.prisma.favorite.delete({
      where: {
        id,
      },
    })
  }
}