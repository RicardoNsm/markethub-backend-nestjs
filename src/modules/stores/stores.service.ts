import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StoresRequestDTO, UpdateStoresDTO } from './stores.dto';
import { ProductsService } from '../products/products.service';
import { RequestContextService } from '../../common/services/request-context/request-context.service';

@Injectable()
export class StoresService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly productsService: ProductsService,
        private readonly requestContext: RequestContextService,
    ){}

    findAll(){
        return this.prisma.store.findMany()
    }

    async create(data: StoresRequestDTO){
        const userId = this.requestContext.getUserId()

        return this.prisma.store.create({
            data: {
                ...data,
                createdBy: userId,
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
       await this.productsService.remove(id)


        return this.prisma.store.delete({
            where: {
                id
            }
        })
    }
   
}
