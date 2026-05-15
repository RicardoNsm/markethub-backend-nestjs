import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { PrismaService } from '../../prisma/prisma.service'
import { ProductsService } from '../products/products.service';
import { RequestContextService } from '../../common/services/request-context/request-context.service';

@Module({
  controllers: [StoresController],
  providers: [StoresService, PrismaService, ProductsService,RequestContextService],
})
export class StoresModule {}
