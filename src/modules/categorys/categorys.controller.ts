import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard'
import { CategoryListemDTO, CategorysRequestDTO, UpdateCategoryDTO } from './category.dto'
import { CategorysService } from './categorys.service'
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger'

@Controller({
  path: 'categories',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class CategorysController {
  constructor(private readonly categoryService: CategorysService) {}

   
  @Post()
  @ApiCreatedResponse({
      type: CategoryListemDTO,
    })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDto: CategorysRequestDTO) {
    return this.categoryService.create(createCategoryDto)
  }

  // 🟢 Aberto: Clientes e Vendedores precisam listar as categorias
   
  @Get()
  @ApiResponse({
      type: [CategoryListemDTO],
    })
  findAll() {
    return this.categoryService.findAll()
  }

  // 🟢 Aberto: Buscar os detalhes de uma categoria específica
  
  @Get(':categoryId')
   @ApiResponse({
      type: CategoryListemDTO,
    })
  findOne(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.categoryService.findById(categoryId)
  }

  // 🔴 Apenas administradores podem atualizar o nome ou descrição de uma categoria
  @Patch(':categoryId')
  @ApiOkResponse({
      type: [CategoryListemDTO],
    })
  update(@Param('categoryId', ParseUUIDPipe) categoryId: string, @Body() data: UpdateCategoryDTO) {
    return this.categoryService.update(categoryId, data)
  }

  // 🔴 Apenas administradores podem deletar uma categoria
  @Delete(':categoryId')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.categoryService.remove(categoryId)
  }
}
