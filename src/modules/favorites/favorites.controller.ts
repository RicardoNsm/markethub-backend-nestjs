import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { FavoritesListItemDTO, FavoritesRequestDTO } from './favorites.dto'
import { FavoritesService } from './favorites.service'

@Controller({
  version: '1',
  path: 'favorites',
})
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiResponse({
    type: [FavoritesListItemDTO],
  })
  findAll() {
    return this.favoritesService.findAll()
  }

  @Get(':favoriteId')
  @ApiResponse({
    type: FavoritesListItemDTO,
  })
  async findOne(@Param('favoriteId', ParseUUIDPipe) favoriteId: string) {
    const favorite = await this.favoritesService.findById(favoriteId)

    if (!favorite) {
      throw new HttpException('favorite not found', HttpStatus.NOT_FOUND)
    }

    return favorite
  }

  @Post()
  @ApiResponse({
    type: FavoritesListItemDTO,
  })
  create(@Body() data: FavoritesRequestDTO) {
    return this.favoritesService.create(data)
  }

  @Put(':favoriteId')
  @ApiResponse({
    type: FavoritesListItemDTO,
  })
  async update(@Param('favoriteId', ParseUUIDPipe) favoriteId: string, @Body() data: FavoritesRequestDTO) {
    const favorite = await this.favoritesService.findById(favoriteId)

    if (!favorite) {
      throw new HttpException('favorite not found', HttpStatus.NOT_FOUND)
    }

    return this.favoritesService.update(favoriteId, data)
  }
  
  @Delete(':favoriteId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('favoriteId', ParseUUIDPipe) favoriteId: string) {
    const favorite = await this.favoritesService.findById(favoriteId)

    if (!favorite) {
      throw new HttpException('favorite not found', HttpStatus.NOT_FOUND)
    }

    return this.favoritesService.remove(favoriteId)
  }
}