import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor} from '@nestjs/platform-express'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger'
import { randomUUID } from 'crypto'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard'
import { StoresListItemDTO, StoresRequestDTO, UpdateStoresDTO } from './stores.dto'
import { StoresService } from './stores.service'

@ApiBearerAuth()
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

  @Get(':storeId')
  @ApiResponse({
    type: StoresListItemDTO,
  })
  findStoreById(
    @Param('storeId', ParseUUIDPipe)
    storeId: string,
  ) {
    return this.storesService.findByStoreId(storeId)
  }

  @Get('/me')
  @ApiResponse({
    type: StoresListItemDTO,
  })
  findById() {
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
    type: StoresListItemDTO,
  })
  update(@Body() data: UpdateStoresDTO) {
    return this.storesService.update(data)
  }

  @Post('/me/upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: join(process.cwd(), 'uploads', 'stores'),
          filename: (_req, file, cb) => {
            const uniqueName = `${randomUUID()}${extname(file.originalname)}`;
            cb(null, uniqueName);
          },
        }),
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: { type: 'string', format: 'binary' },
        banner: { type: 'string', format: 'binary' },
      },
    },
  })
  async uploadMedia(
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    if (!files || (!files.logo && !files.banner)) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    // Criamos um objeto apenas com as mídias enviadas
    const updateData: { logo?: string; banner?: string } = {};

    if (files.logo && files.logo[0]) {
      updateData.logo = `/uploads/stores/${files.logo[0].filename}`;
    }

    if (files.banner && files.banner[0]) {
      updateData.banner = `/uploads/stores/${files.banner[0].filename}`;
    }

    // Supondo que você consiga pegar o id do usuário/loja pelo Request/Token
    // Aqui passei de forma conceitual, mude conforme seu sistema de auth
    const updatedStore = await this.storesService.updateMedia(updateData);

    return {
      message: 'Mídias atualizadas com sucesso',
      data: updatedStore,
    };
  }

  @Delete('/me')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove() {
    return this.storesService.remove()
  }
}
