import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'

// import the router from your routes file
import optionRouter from './routes/options.js'
import carRouter from './routes/car.js'
import cors from 'cors'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())
// Serve options at the options endpoint

app.use('/options',optionRouter)
// get car info
app.use('/cars',carRouter)
if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})