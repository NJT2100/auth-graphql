const dotenv = require('dotenv')

dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 9001,
    jwtSecret: process.env.JWT_SECRET || 'Mp})/N|h=Cll.EY',
    mongoUri: process.env.MONGODB_URI || 
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') + 
        '/OAuth',
    session: {
        secret: 'sample secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true
        }
    }
}

export default config