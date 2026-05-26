import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard'
import { CategorysRequestDTO, UpdateCategoryDTO } from './category.dto'
import { CategorysService } from './categorys.service'

@Controller({
  path: 'categories',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class CategorysController {
  constructor(private readonly categoryService: CategorysService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDto: CategorysRequestDTO) {
    return this.categoryService.create(createCategoryDto)
  }

  // 🟢 Aberto: Clientes e Vendedores precisam listar as categorias
  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  // 🟢 Aberto: Buscar os detalhes de uma categoria específica
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findById(id)
  }

  // 🔴 Apenas administradores podem atualizar o nome ou descrição de uma categoria
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDTO) {
    return this.categoryService.update(id, updateCategoryDto)
  }

  // 🔴 Apenas administradores podem deletar uma categoria
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id)
  }
}
