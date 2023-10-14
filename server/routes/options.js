import express from 'express'
import path from 'path'

import { fileURLToPath } from 'url'
// Import data
import exterOptions from '../data/exterOptions.js'
import interiorOptions from '../data/interior.js'
import roofOptions from '../data/roof.js'
import wheelOptions from '../data/wheels.js'

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
// Setup routes for the gift endpoint

const optionRouter=express.Router()
optionRouter.get('/exterior',(req,res)=> {
    res.status(200).json(exterOptions)
})

optionRouter.get('/interior',(req,res)=> {
    res.status(200).json(interiorOptions)
})

optionRouter.get('/roof',(req,res)=> {
    res.status(200).json(roofOptions)
})

optionRouter.get('/wheel',(req,res)=> {
    res.status(200).json(wheelOptions)
})
export default optionRouter