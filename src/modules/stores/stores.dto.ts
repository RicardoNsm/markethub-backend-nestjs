import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

 export class StoresRequestDTO {
    @ApiProperty({ description: 'store name' })
    @IsString()
    @IsNotEmpty()
    name!: string
  }