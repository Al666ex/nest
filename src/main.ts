import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {AppModule} from './app.module'
import { AuthGuard } from "./auth/jwt-auth.guard";

async function start() {
    const PORT = process.env.PORT || 5000    
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
    .setTitle('Backend для продвинутых')
    .setDescription('Documentation')
    .addTag('ULBI TV')
    .setVersion('v1.0.0.0')
    .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('/api/docs',app,document) 
    
    await app.listen(PORT, () => console.log(`App started at port = ${PORT}`))
}

start()