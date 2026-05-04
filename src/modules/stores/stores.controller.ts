import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresRequestDTO } from './stores.dto';

@Controller({
    path: 'stores',
    version: '1'
})
export class StoresController {
    constructor(private readonly storesService: StoresService){}

        @Post(':userId')
        create(@Body() data: StoresRequestDTO,
            @Param('userId', ParseUUIDPipe) userId: string){
            return this.storesService.create(data, userId);
        
    }
}
