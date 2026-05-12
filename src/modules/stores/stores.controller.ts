import { Body, Controller, Get, Post } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresRequestDTO } from './stores.dto';
import { ApiOAuth2, ApiResponse } from '@nestjs/swagger';

@Controller({
    path: 'stores',
    version: '1'
})
export class StoresController {
    constructor(private readonly storesService: StoresService){}

    @Get()
    @ApiResponse({
        
    })
    findAll(){
        return this.storesService.findAll()
    }




    @Post(':userId')
    @ApiResponse({
        type: 
    })
        create(@Body() data: StoresRequestDTO){
            return this.storesService.create(data);
        
    }
}
