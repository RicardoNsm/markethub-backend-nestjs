import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class FavoritesRequestDTO {
  @ApiProperty({ description: 'user id' })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId!: string

  @ApiProperty({ description: 'product id' })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  productId!: string
}

export class FavoritesListItemDTO {
  @ApiProperty() id!: string
  @ApiProperty() userId!: string
  @ApiProperty() productId!: string
  @ApiProperty({ format: 'date-time' }) createdAT!: string
  @ApiProperty({ format: 'date-time' }) updatedAT!: string
}