const { response } = require("express");
const express=require("express");
var mongo=require("../shared/mongo");
var {loginValidation,signupValidation}=require("../shared/validate");
const router=express.Router();

const bcrypt=require("bcrypt");
const { db } = require("../shared/mongo");





router.get("/",async(req,res)=>{

const data=await mongo.db.collection("cheak").find().toArray();
res.send(data);

})


router.post("/",async (req,res)=>{

    
    const data=await mongo.db.collection("cheak").insertOne(req.body);
    res.send(data);
    
    })
    
    
router.post("/signup",async(req,res)=>{
const {error}=await signupValidation(req.body);

if(error){
   
    res.status(400).send({msg:error.details[0].message})
}


    const datac=await mongo.db.collection("cheak").findOne({Email:req.body.Email})
    console.log(datac)
    if(datac){
       return res.status(400).send({msg:"email alerady exists"})
    }


const salt=await bcrypt.genSalt(10);
req.body.password=await bcrypt.hash(req.body.password,salt);
console.log(req.body.password);
    const data=await mongo.db.collection("cheak").insertOne(req.body)
  if(data){
    return res.status(200).send({msg:"email registerd"})
  }
    res.send(data);

// console.log(data);

})    
    


router.post("/login",async (req,res)=>{

const {error}=await loginValidation(req.body);

if(error){return res.status(400).send({msg:error.details[0].message})}

const data=await mongo.db.collection("cheak").findOne({Email:req.body.Email })
console.log(data)
if(!data) return res.status(400).send({msg:'Email dosent exists'})

const isValid=await bcrypt.compare(req.body.password,data.password);
if(!isValid) {return res.status(400).send({msg:'wrong password'})}
else{
  
res.status(200).send("log in")
res.send("logged in")
}

})



router.get("/entryi",async(req,res)=>{


  const data=await mongo.db.collection("entry").find().toArray();

  res.send(data);



  // const data=await mongo.db.collection("cheak").find().toArray();

  // // const data=await mongo.db.collection("entry").find();
  // console.log(data)
  // res.send(data);

})




router.post("/billentry",async (req,res)=>{


const data=await mongo.db.collection("bills").insertOne(req.body);
res.send(data);


})

router.post("/newelement",async (req,res)=>{
  const data=await mongo.db.collection("entry").insertOne(req.body)
  res.send(data);

})



router.delete("/deleteEntry",async(req,res)=>{


const data=await mongo.db.collection("entry").deleteOne(req.body)
res.send(data); 




})


router.get("/entryid",async(req,res)=>{


  const data=await mongo.db.collection("entry").findOne(req.body);
console.log(data);
  res.send(data);




})


router.get("/getbiils",async(req,res)=>{

const data=await mongo.db.collection("bills").find().toArray();
res.send(data);

// const data1=await mongo.db.collection("entry").find().toArray();

// res.send(data);

data.map((ele)=>{

  ele
})

})
module.exports=router;