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
import { ApiResponse } from '@nestjs/swagger'
import { UsersListItemDTO, UsersRequestDTO } from './users.dto'

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  @Get()
  @ApiResponse({
    type: [UsersListItemDTO],
  })
  findAll() {}
  @Get(':id')
  @ApiResponse({
    type: UsersListItemDTO,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {}
  @Post()
  @ApiResponse({
    type: UsersListItemDTO,
  })
  create(@Body() data: UsersRequestDTO) {}
  @Put(':id')
  @ApiResponse({
    type: UsersListItemDTO,
  })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UsersRequestDTO) {}
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {}
}
