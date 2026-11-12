import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FavoritesRequestDTO {
  @ApiProperty({ description: 'ID do produto' })
  @IsUUID()
  @IsNotEmpty()
  productId!: string;
}

export class FavoritesListItemDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  productId!: string;

  @ApiProperty({ format: 'date-time' })
  createdAt!: string;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: string;
}
