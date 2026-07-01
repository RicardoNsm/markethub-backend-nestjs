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
import { CategorysService } from './modules/categorys/categorys.service';
import { CategorysController } from './modules/categorys/categorys.controller';
import { CategorysModule } from './modules/categorys/categorys.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'


@Module({
  imports: [ ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads', // Prefixo da URL
    }),
    UsersModule, PrismaModule, StoresModule, ProductsModule, FavoritesModule, CartsModule, AuthModule, CategorysModule],
  controllers: [AppController, CategorysController],
  providers: [AppService, PrismaService, RequestContextService, CategorysService],
})
export class AppModule {}
