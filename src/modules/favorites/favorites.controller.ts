import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  FavoritesListItemDTO,
  FavoritesRequestDTO,
} from './favorites.dto';

import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard';

@ApiTags('Favorites')
@Controller({
  version: '1',
  path: 'favorites',
})
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
  ) {}

  // GET /v1/favorites
  @Get()
  @ApiOkResponse({ type: [FavoritesListItemDTO] })
  findAll() {
    return this.favoritesService.findAll();
  }

  // GET /v1/favorites/:favoriteId
  @Get(':favoriteId')
  @ApiOkResponse({ type: FavoritesListItemDTO })
  findOne(
    @Param('favoriteId', ParseUUIDPipe) favoriteId: string,
  ) {
    return this.favoritesService.findById(favoriteId);
  }

  // POST /v1/favorites
  @Post()
  @ApiCreatedResponse({ type: FavoritesListItemDTO })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: FavoritesRequestDTO) {
    return this.favoritesService.create(data);
  }

  // PUT /v1/favorites/:favoriteId
  @Put(':favoriteId')
  @ApiOkResponse({ type: FavoritesListItemDTO })
  update(
    @Param('favoriteId', ParseUUIDPipe) favoriteId: string,
    @Body() data: FavoritesRequestDTO,
  ) {
    return this.favoritesService.update(favoriteId, data);
  }

  // DELETE /v1/favorites/:favoriteId
  @Delete(':favoriteId')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('favoriteId', ParseUUIDPipe) favoriteId: string,
  ) {
    return this.favoritesService.remove(favoriteId);
  }
}
