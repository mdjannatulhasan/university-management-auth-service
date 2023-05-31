import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrap() {
    try {
        await mongoose.connect(config.database_url as string)
        console.log('DB is connected')

        app.listen(config.port, () => {
            console.log('Port is listening')
        })
    } catch (er) {
        console.log('DB connection failed')
    }

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
bootstrap()
