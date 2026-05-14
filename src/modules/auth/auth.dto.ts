import { ApiProperty } from "@nestjs/swagger"
import { UserRole } from "@prisma/client"
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class SingUpDTO {
  @ApiProperty({description: 'User name'})
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ description: 'User email'})
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @ApiProperty({ description: 'User password', minLength: 6})
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    default: UserRole.ADMIN,
    required: false
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole = UserRole.ADMIN
}

 export class SingInDTO{
    @ApiProperty({description: 'User e-mail'})
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @ApiProperty({description: 'User password'})
    @IsNotEmpty()
    @IsString()
    password!: string
  }

  export class ForgotPasswordDTO {
    @ApiProperty({ description: 'User e-mail'})
    @IsEmail()
    @IsNotEmpty()
    email!: string
  }

  export class ResetPasswordDTO {
    @ApiProperty({ description: 'Reset token'})
    @IsString()
    @IsNotEmpty()
    token!:  string

    @ApiProperty({ description: 'New Password', minLength : 6})
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    newPassword!: string
  }
