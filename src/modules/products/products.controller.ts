import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'


//precisa passar pela limpa de Ricardo

import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger'

import {
  ProductsListItemDTO,
  ProductsRequestDTO,
} from './products.dto'

import { ProductsService } from './products.service'

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({
    type: [ProductsListItemDTO],
  })
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':productId')
  @ApiResponse({
    type: ProductsListItemDTO,
  })
  findById(
    @Param('productId', ParseUUIDPipe)
    productId: string,
  ) {
    return this.productsService.findById(productId)
  }

  @Post()
  @ApiCreatedResponse({
    type: ProductsListItemDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: ProductsRequestDTO) {
    return this.productsService.create(data)
  }

  @Put(':productId')
  @ApiOkResponse({
    type: ProductsListItemDTO,
  })
  update(
    @Param('productId', ParseUUIDPipe)
    productId: string,
    @Body() data: ProductsRequestDTO,
  ) {
    return this.productsService.update(productId, data)
  }

  @Delete(':productId')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('productId', ParseUUIDPipe)
    productId: string,
  ) {
    return this.productsService.remove(productId)
  }
}