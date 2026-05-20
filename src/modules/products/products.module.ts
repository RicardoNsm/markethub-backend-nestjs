import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { RequestContextService } from '../../common/services/request-context/request-context.service';

@Module({
  imports:[UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, RequestContextService]
})
export class ProductsModule {}
