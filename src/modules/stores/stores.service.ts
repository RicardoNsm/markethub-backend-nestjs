import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StoresRequestDTO, UpdateStoresDTO } from './stores.dto';

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

   async findById(id: string){
        const store = await this.prisma.store.findUnique({
            where: {
                id
            }
        })

        if(!store){
            throw new NotFoundException('store not found')
        }

        return store

    }

   async update(id: string, data: UpdateStoresDTO){
        await this.findById(id)

        return this.prisma.store.update({
            where: {
                id
            },
            data: {
                name: data.name,
                description: data.description
            }
        })
    }

    async remove(id: string){
       await this.findById(id)


        return this.prisma.store.delete({
            where: {
                id
            }
        })
    }
   
}
