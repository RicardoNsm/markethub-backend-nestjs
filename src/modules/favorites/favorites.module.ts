import { Module } from '@nestjs/common';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

import { RequestContextService } from '../../common/services/request-context/request-context.service';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    RequestContextService,
  ],
})
export class FavoritesModule {}