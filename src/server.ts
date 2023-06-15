import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'

async function bootstrap() {
    try {
        await mongoose.connect(config.database_url as string)
        logger.info('DB is connected')

        app.listen(config.port, () => {
            logger.info('Port is listening')
        })
    } catch (er) {
        errorLogger.error('DB connection failed')
    }

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
bootstrap()
