import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY!,
    })
  }

  async validate( payload: { sub: string }){
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub
      }
    })

    if(!user){
      return null
    }
    return user
  }
}