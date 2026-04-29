import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { UsersListItemDTO, UsersRequestDTO } from './users.dto'
import { UsersService } from './users.service'

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiResponse({
    type: [UsersListItemDTO],
  })
  findAll() {
    return this.usersService.findAll()
  }
  @Get(':id')
  @ApiResponse({
    type: UsersListItemDTO,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findById(id)

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }

    return user
  }
  @Post()
  @ApiResponse({
    type: UsersListItemDTO,
  })
  create(@Body() data: UsersRequestDTO) {
    return this.usersService.create(data)
  }
  @Put(':id')
  @ApiResponse({
    type: UsersListItemDTO,
  })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UsersRequestDTO) {
    const user = await this.usersService.findById(id)

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }


    return this.usersService.update(id,data)
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findById(id)

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }

    return this.usersService.remove
  }
}
