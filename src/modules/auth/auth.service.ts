import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service';
import { SingInDTO, SingUpDTO } from './auth.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma : PrismaService,
        private readonly jwtService: JwtService, 
        private readonly userService: UsersService,   
    ){}

    async singup(data: SingUpDTO){
        // criptografar senha

        const hash = await bcrypt.hash(data.password, 12)
        //salvar usuario no banco de dados
        const newUser = await this.userService.create({
            ...data,
            password: hash,
        })
         //retornar o token jwt de acesso
         return{
            token: this.jwtService.sign({
                sub: newUser.id,
            })
         }
    }

    async singin(data: SingInDTO){
        const user = await this.userService.findByEmail(data.email)

        if(user && await bcrypt.compare(data.password, user.password)){
            return {
                token: this.jwtService.sign({
                    sub: user.id
                })
            }
        }
        throw new UnauthorizedException()
    }
}
