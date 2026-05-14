import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { PrismaService } from '../../prisma/prisma.service'
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [StoresController],
  providers: [StoresService, PrismaService, ProductsService],
})
export class StoresModule {}
