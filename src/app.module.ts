import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaModule } from './prisma/prisma.module'
import { StoresModule } from './modules/stores/stores.module';

@Module({
  imports: [UsersModule, PrismaModule, StoresModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
