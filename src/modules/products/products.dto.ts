import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductsRequestDTO {
  @ApiProperty({ description: 'product Url'})
  @IsString()
  @IsNotEmpty()
  productUrl!: string

  @ApiProperty({ description: 'product name' })
  @IsString()
  @IsNotEmpty()
  name!: string
  @ApiProperty({ description: 'product price' })
  @IsNumber()
  @IsNotEmpty()
  price!: number

  @ApiProperty({ description: 'product stock' })
  @IsNumber()
  @IsNotEmpty()
  stock!: number

  @ApiProperty({ description: 'product description', required: false })
  @IsString()
  @IsOptional()
  description!: string

  @ApiProperty({ description: 'product categoryId'})
  @IsString()
  @IsOptional() 
  categoryId?: string;
}

export class ProductsListItemDTO{
    @ApiProperty() id!: string
    @ApiProperty() UserId!: string
    @ApiProperty() name!: string
    @ApiProperty() price!: number
    @ApiProperty() description!: string
    @ApiProperty() imageUrl!: string
    @ApiProperty({ format: 'date-time'}) createdAT!: string
    @ApiProperty({ format: 'date-time'}) updatedAT!: string
  }