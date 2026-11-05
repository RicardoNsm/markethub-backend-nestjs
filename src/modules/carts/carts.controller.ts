
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
  UseGuards,
} from '@nestjs/common';

// Decoradores usados para documentar as rotas no Swagger
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';

// DTOs responsáveis por validar os dados recebidos
import { AddToCartDTO, UpdateCartDTO } from './carts.dto';

// Service que contém a lógica do carrinho
import { CartsService } from './carts.service';

// Guard responsável por verificar se o usuário está autenticado
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard';

// Define o nome e a versão das rotas: /v1/carts
@ApiTags('Carts')
@Controller({
  path: 'carts',
  version: '1',
})
// Todas as rotas do carrinho exigem autenticação
@UseGuards(JwtAuthGuard)
export class CartsController {
  // Injeta o CartsService para utilizar seus métodos
  constructor(private readonly cartsService: CartsService) {}

  // GET /v1/carts
  // Retorna todos os produtos do carrinho do usuário autenticado
  @Get()
  @ApiOkResponse({ description: 'Carrinho listado com sucesso.' })
  findAll() {
    return this.cartsService.findAll();
  }

  // POST /v1/carts
  // Adiciona um produto ao carrinho
  @Post()
  @ApiCreatedResponse({ description: 'Produto adicionado ao carrinho.' })
  @HttpCode(HttpStatus.CREATED)
  add(@Body() data: AddToCartDTO) {
    return this.cartsService.add(data.productId);
  }

  // PUT /v1/carts/:productId
  // Atualiza a quantidade de um produto específico
  @Put(':productId')
  @ApiOkResponse({ description: 'Quantidade atualizada com sucesso.' })
  update(
    // Valida se o parâmetro recebido é um UUID válido
    @Param('productId', ParseUUIDPipe) productId: string,

    // Recebe a nova quantidade enviada no corpo da requisição
    @Body() data: UpdateCartDTO,
  ) {
    return this.cartsService.update(productId, data.quantity);
  }

  // DELETE /v1/carts/:productId
  // Remove um produto específico do carrinho
  @Delete(':productId')
  @ApiNoContentResponse({ description: 'Produto removido do carrinho.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.cartsService.remove(productId);
  }

  // DELETE /v1/carts
  // Remove todos os produtos do carrinho do usuário
  @Delete()
  @ApiNoContentResponse({ description: 'Carrinho esvaziado com sucesso.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  clear() {
    return this.cartsService.clear();
  }
}
