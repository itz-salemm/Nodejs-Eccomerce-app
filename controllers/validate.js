const Joi = require('joi');


const signupValidation = (data) => {
    const schema = Joi.object({
    first_name: Joi.string()
        .min(3)
        .required(),
    last_name: Joi.string()
        .min(3)
        .required(),
    email: Joi.string()
      .min(3)
        .email()
        .required(),
    password: Joi.string()
        .min(4)
        .required(),

})
    return schema.validate(data)
}


const signinValidation = (data) => {
    const schema = Joi.object({
    email: Joi.string()
       .min(3)
        .email()
        .required(),
    password: Joi.string()
        .min(4)
        .required(),

})
    return schema.validate(data)
}

module.exports.signupValidation = signupValidation
module.exports.signinValidation = signinValidation