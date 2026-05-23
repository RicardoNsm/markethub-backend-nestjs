import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger'
import { StoresListItemDTO, StoresRequestDTO, UpdateStoresDTO } from './stores.dto'
import { StoresService } from './stores.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard'

@Controller({
  path: 'stores',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  @ApiResponse({
    type: [StoresListItemDTO],
  })
  findAll() {
    return this.storesService.findAll()
  }

  @Get('/me')
  @ApiResponse({
    type: StoresListItemDTO,
  })
  findById(){
    return this.storesService.findById()
  }

  @Post()
  @ApiCreatedResponse({
    type: StoresListItemDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: StoresRequestDTO) {
    return this.storesService.create(data)
  }

  @Put('/me')
  @ApiOkResponse({
    type: StoresListItemDTO
  })
  update(
    @Body() data: UpdateStoresDTO,
  ){
    return this.storesService.update(data)
  }

  @Delete('/me')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(){
    return this.storesService.remove()
  }

}
