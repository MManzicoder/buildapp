import Joi from 'joi';

export const Validate = (req) =>{
    const Schema = Joi.object().keys({
        username: Joi.string().min(3).max(15).required(),
        email: Joi.string().max(35).email().required(),
        password: Joi.string().min(6).max(25).required()
    })

  const result = Schema.validate(req);
  return result;
}

export const ValidateLogin = (req) =>{
  const Schema = Joi.object().keys({
      email: Joi.string().max(35).email().required(),
      password: Joi.string().min(6).max(25).required()
  })

const result = Schema.validate(req);
return result;
}