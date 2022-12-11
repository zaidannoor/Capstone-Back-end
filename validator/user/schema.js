const Joi = require("joi");

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(),
  phoneNumber: Joi.string().min(8).required(),
  kecamatan: Joi.string().required(),
  kelurahan: Joi.string().required(),
  kota: Joi.string().required(),
  provinsi: Joi.string().required(),
}).unknown();

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).unknown();


module.exports = { createUserSchema, loginUserSchema };