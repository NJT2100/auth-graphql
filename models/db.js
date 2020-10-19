import mongoose from 'mongoose'
import dotenv from 'dotenv'
import config from '../config/config'

dotenv.config()

mongoose.connect(config.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${config.mongoUri}`)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconected')
})

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`)
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through app termination')
        process.exit(0)
    })
})