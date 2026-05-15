import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaModule } from './prisma/prisma.module'
import { StoresModule } from './modules/stores/stores.module';
import { ProductsModule } from './modules/products/products.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { CartsModule } from './modules/carts/carts.module';
import { AuthModule } from './modules/auth/auth.module';
import { RequestContextService } from './common/services/request-context/request-context.service';

@Module({
  imports: [UsersModule, PrismaModule, StoresModule, ProductsModule, FavoritesModule, CartsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, RequestContextService],
})
export class AppModule {}
