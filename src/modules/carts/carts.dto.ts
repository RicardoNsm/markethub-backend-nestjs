import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class AddToCartDTO {
  @ApiProperty({ description: 'ID do produto' })
  @IsUUID()
  @IsNotEmpty()
  productId!: string;
}

export class UpdateCartDTO {
  @ApiProperty({
    description: 'Quantidade desejada do produto',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity!: number;
}
