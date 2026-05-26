import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CategorysRequestDTO{
    @ApiProperty({ description: 'category name'})
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ description: 'category description'})
    @IsString()
    @IsOptional()
    description?: string
}

export class CreateCategoryDTO{
    @ApiProperty({ description: 'category name'})
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ description: 'category description'})
    @IsString()
    @IsOptional()
    description?: string
}

export class UpdateCategoryDTO {
    @ApiProperty({ description: 'category name'})
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ description: 'category description'})
    @IsString()
    @IsOptional()
    description?: string
}