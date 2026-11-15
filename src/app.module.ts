import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RequestContextService } from './common/services/request-context/request-context.service'
import { ShopeeModule } from './modules/affiliates/integrations/shopee/shopee.module'
import { ShopeeService } from './modules/affiliates/integrations/shopee/shopee.service'
import { AuthModule } from './modules/auth/auth.module'
import { CartsModule } from './modules/carts/carts.module'
import { CategorysController } from './modules/categorys/categorys.controller'
import { CategorysModule } from './modules/categorys/categorys.module'
import { CategorysService } from './modules/categorys/categorys.service'
import { FavoritesModule } from './modules/favorites/favorites.module'
import { FinanceModule } from './modules/finance/finance.module'
import { TransactionService } from './modules/finance/transaction.service'
import { WalletService } from './modules/finance/wallet.service'
import { ProductsModule } from './modules/products/products.module'
import { SalesModule } from './modules/sales/sales.module'
import { StoresModule } from './modules/stores/stores.module'
import { UsersModule } from './modules/users/users.module'
import { PrismaModule } from './prisma/prisma.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads', // Prefixo da URL
    }),
    UsersModule,
    PrismaModule,
    StoresModule,
    ProductsModule,
    FavoritesModule,
    CartsModule,
    AuthModule,
    CategorysModule,
    ShopeeModule,
    SalesModule,
    FinanceModule,
  ],
  controllers: [AppController, CategorysController],
  providers: [
    AppService,
    PrismaService,
    RequestContextService,
    CategorysService,
    ShopeeService,
    WalletService,
    TransactionService,
  ],
})
export class AppModule {}
