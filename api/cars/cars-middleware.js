const Car = require('./cars-model');
const db = require("../../data/db-config");
var vinValidator = require('vin-validator');



exports.checkCarId = async (req, res, next) => {
  try {
    const car  = await Car.getById(req.params.id);
    if(!car) {
      next({status: 404, message: `car with id ${req.params.id} is not found`});
    } else {
      req.car = car;
      next();
    }
  }
  catch(err) {
    next(err)
  }
}


exports.checkCarPayload = (req, res, next) => {
  let emptyField = ""
  if (!req.body.vin){
    emptyField = "vin"}
  if (!req.body.make){
    emptyField = "make"}
  if (!req.body.model){
    emptyField = "model"}
  if (!req.body.mileage){
    emptyField = "mileage"}
  
  if (!emptyField){
    next();
  }
  else{
    res.status(400).json({ message: `${emptyField} is missing`})
  }
  
}

exports.checkVinNumberValid = async (req, res, next) => {
  try {
    if (vinValidator.validate(req.body.vin)) {
      next()
      
    } else {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid`})
    }
  }

  catch (err) {
    next(err);
  }

}


exports.checkVinNumberUnique = async (req, res, next) => {
  try {
    const existingVin = await db("cars")
    .where("vin", req.body.vin.trim()).first()

    if (existingVin) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists`})
    } else {
      next()
    }
  }

  catch (err) {
    next(err);
  }
}



