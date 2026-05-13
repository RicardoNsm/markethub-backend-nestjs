import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common'
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger'
import { StoresListItemDTO, StoresRequestDTO, UpdateStoresDTO } from './stores.dto'
import { StoresService } from './stores.service'

@Controller({
  path: 'stores',
  version: '1',
})
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  @ApiResponse({
    type: [StoresListItemDTO],
  })
  findAll() {
    return this.storesService.findAll()
  }

  @Get(':storeId')
  @ApiResponse({
    type: StoresListItemDTO,
  })
  findById(@Param('storeId', ParseUUIDPipe) storeId: string){
    return this.storesService.findById(storeId)
  }

  @Post()
  @ApiCreatedResponse({
    type: StoresListItemDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: StoresRequestDTO) {
    return this.storesService.create(data)
  }

  @Put(':storeId')
  @ApiOkResponse({
    type: StoresListItemDTO
  })
  update(
    @Param('storeId', ParseUUIDPipe) storeId: string,
    @Body() data: UpdateStoresDTO,
  ){
    return this.storesService.update(storeId,data)
  }

  @Delete(':storeId')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('storeId', ParseUUIDPipe) storeId : string
  ){
    return this.storesService.remove(storeId)
  }

}
