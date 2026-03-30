import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // versionamento

  app.enableVersioning({
    type: VersioningType.URI,
  })

  //documentação

  const config = new DocumentBuilder()
    .setTitle('API do projeto MarketHub')
    .setDescription('API desenvolvida durante curso superior TSI 3 periodo')
    .setVersion('1')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  // validação

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
