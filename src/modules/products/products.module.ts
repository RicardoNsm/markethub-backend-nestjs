import { Module } from '@nestjs/common'
import { RequestContextService } from '../../common/services/request-context/request-context.service'
import { PrismaService } from '../../prisma/prisma.service'
import { ShopeeModule } from '../shopee/shopee.module'
import { UsersModule } from '../users/users.module'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  imports: [UsersModule, ShopeeModule],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, RequestContextService],
})
export class ProductsModule {}
