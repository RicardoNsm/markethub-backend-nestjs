import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class StoresRequestDTO {
  @ApiProperty({ description: 'store name' })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ description: 'store description' })
  @IsString()
  @IsOptional()
  description!: string

  @ApiProperty({ description: 'store logo URL', required: false })
  @IsString()
  @IsOptional()
  logo?: string

  @ApiProperty({ description: 'store banner URL', required: false })
  @IsString()
  @IsOptional()
  banner?: string
}

export class StoresListItemDTO {
  @ApiProperty() id!: string
  @ApiProperty() userId!: string
  @ApiProperty() name!: string
  @ApiProperty() description!: string
  @ApiProperty({ required: false }) logo?: string
  @ApiProperty({ required: false }) banner?: string
  @ApiProperty({ format: 'date-time' }) createdAT!: string
  @ApiProperty({ format: 'date-time' }) updatedAT!: string
}

export class UpdateStoresDTO {
  @ApiProperty({ description: 'store name' })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ description: 'store description' })
  @IsString()
  @IsOptional()
  description!: string

  @ApiProperty({ description: 'store logo URL', required: false })
  @IsString()
  @IsOptional()
  logo?: string

  @ApiProperty({ description: 'store banner URL', required: false })
  @IsString()
  @IsOptional()
  banner?: string
}
