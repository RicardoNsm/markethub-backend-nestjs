import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductsRequestDTO {
  @ApiProperty({ description: 'product name' })
  @IsString()
  @IsNotEmpty()
  name!: string
  @ApiProperty({ description: 'product price' })
  @IsNumber()
  @IsNotEmpty()
  price!: number
  @ApiProperty({ description: 'product description', required: false })
  @IsString()
  @IsOptional()
  description!: string
}

export class ProductListDTO{
    @ApiProperty() id!: string
    @ApiProperty() UserId!: string
    @ApiProperty() name!: string
    @ApiProperty() price!: number
    @ApiProperty() description!: string
    @ApiProperty() imageUrl!: string
    @ApiProperty({ format: 'date-time'}) createdAT!: string
    @ApiProperty({ format: 'date-time'}) updatedAT!: string
  }