import { Module } from '@nestjs/common';

// Controller responsável pelas rotas do carrinho
import { CartsController } from './carts.controller';

// Service responsável pelas operações do carrinho
import { CartsService } from './carts.service';

// Serviço que fornece acesso ao banco de dados
import { PrismaService } from '../../prisma/prisma.service';

// Serviço que identifica o usuário autenticado
import { RequestContextService } from '../../common/services/request-context/request-context.service';

@Module({
  // Registra o Controller para disponibilizar as rotas
  controllers: [CartsController],

  // Registra os serviços que podem ser injetados
  providers: [
    CartsService,
    PrismaService,
    RequestContextService,
  ],

  // Permite que outros módulos utilizem o CartsService, se necessário
  exports: [CartsService],
})
export class CartsModule {}
