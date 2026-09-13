import { Module } from '@nestjs/common'
import { RequestContextService } from '../../common/services/request-context/request-context.service'
import { PrismaService } from '../../prisma/prisma.service'
import { UsersModule } from '../users/users.module'
import { StoresController } from './stores.controller'
import { StoresService } from './stores.service'

@Module({
  imports: [UsersModule],
  controllers: [StoresController],
  providers: [StoresService, PrismaService, RequestContextService],
})
export class StoresModule {}
