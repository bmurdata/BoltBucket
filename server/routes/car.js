import express from 'express'
// Import data from DB
import customcarController from '../controllers/car.js'

const carRouter= express.Router();
// Get all events
carRouter.get('/', customcarController.getCustomCar);
// Get specific event by ID
carRouter.get('/:carID',customcarController.getCustomCarById);
// Create new event
carRouter.post('/', customcarController.createCustomCar);
// Edit (update) an event by ID
carRouter.put('/:carID', customcarController.updateCustomCar);
//Delete an event by ID
carRouter.put('/:carID', customcarController.deleteCustomCar);
console.log('Router exported')
export default carRouter;