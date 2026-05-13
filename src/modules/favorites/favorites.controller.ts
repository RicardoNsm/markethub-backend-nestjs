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

  @Get(':id')
  @ApiResponse({
    type: FavoritesListItemDTO,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const favorite = await this.favoritesService.findById(id)

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

  @Put(':id')
  @ApiResponse({
    type: FavoritesListItemDTO,
  })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: FavoritesRequestDTO) {
    const favorite = await this.favoritesService.findById(id)

    if (!favorite) {
      throw new HttpException('favorite not found', HttpStatus.NOT_FOUND)
    }

    return this.favoritesService.update(id, data)
  }
  
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const favorite = await this.favoritesService.findById(id)

    if (!favorite) {
      throw new HttpException('favorite not found', HttpStatus.NOT_FOUND)
    }

    return this.favoritesService.remove(id)
  }
}