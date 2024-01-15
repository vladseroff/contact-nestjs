import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function start() {
    const PORT = process.env.PORT || 4000
    const app = await NestFactory.create(AppModule)

    app.enableCors({
        origin: 'http://localhost:3000',
        // methods: 'GET, PUT, POST, DELETE',
        // allowedHeaders: 'Content-Type, Authorization',
    });

    await app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}

start()