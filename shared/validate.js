const joi=require("joi");

const jwt=require("jsonwebtoken"); 
const signupValidation=(data)=>{


    const schema=joi.object({
cname:joi.string().min(4).required(),
Email:joi.string().min(6).email().required(),
password:joi.string().min(8).max(12).required()

});

return schema.validate(data);
}




const loginValidation=(data)=>{
    const schema=joi.object({
      
    Email:joi.string().min(6).email().required(),
        password:joi.string().min(8).max(12).required()
    })
    return schema.validate(data);
}



module.exports= {loginValidation,signupValidation};
