import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StoresRequestDTO } from './stores.dto';

@Injectable()
export class StoresService {
    constructor(private readonly prisma: PrismaService){}

    create(data: StoresRequestDTO, userId: string) {
        return this.prisma.store.create({
            data: {
                ...data,
                userId
            }
        })
    }
}
