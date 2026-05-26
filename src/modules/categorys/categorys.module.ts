import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CategorysController } from './categorys.controller';
import { CategorysService } from './categorys.service';

@Module({
    
    controllers:[CategorysController],
    providers: [PrismaService, CategorysService],
})
export class CategorysModule {}
