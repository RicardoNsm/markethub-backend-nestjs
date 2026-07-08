import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { AppModule } from './app.module'

const express = require('express')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const cors = require('cors')

  app.use(
    cors({
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )

  // versionamento

  app.enableVersioning({
    type: VersioningType.URI,
  })

  //documentação

  const config = new DocumentBuilder()
    .setTitle('API do projeto MarketHub')
    .setDescription('API desenvolvida durante curso superior TSI 3 periodo')
    .setVersion('1')
    .addBearerAuth()
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  const uploadDir = join(process.cwd(), 'uploads', 'stores')
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true })
  }

  app.use('/uploads', express.static(uploadDir))

  // validação

  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true, // <--- ISSO faz o backend converter o texto do FormData para Number automaticamente
  }),
);

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
