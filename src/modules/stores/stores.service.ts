import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StoresRequestDTO } from './stores.dto';

@Injectable()
export class StoresService {
    constructor(private readonly prisma: PrismaService){}

    findAll(){
        return this.prisma.store.findMany()
    }

    create(data: StoresRequestDTO){
        return this.prisma.store.create({
            data: {
                ...data,
                userId: '123',
            }
        })
    }

    findById(id: string){
        return this.prisma.store.findFirst({
            where: {
                id
            }
        })
    }

    update(id: string, data: StoresRequestDTO){
        return this.prisma.store.update({
            where: {
                id
            },
            data
        })
    }

    remove(id: string){
        return this.prisma.store.delete({
            where: {
                id
            }
        })
    }
   
}
