import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UsersRequestDTO {
  @ApiProperty({ description: 'user name' })
  @IsString()
  @IsNotEmpty()
  name: string
  @ApiProperty({ description: 'user email' })
  @IsString()
  @IsNotEmpty()
  email: string
  @ApiProperty({ description: 'user password' })
  @IsString()
  @IsNotEmpty()
  password: string
}

export class UsersListItemDTO{
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() email: string
  @ApiProperty() password: string
  @ApiProperty({ format: 'date-time'}) createdAT: string
  @ApiProperty({ format: 'date-time'}) updatedAT: string
}
