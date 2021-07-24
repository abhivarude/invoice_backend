const express=require("express");
const app=express();
const cors=require("cors");
const mongo=require("./shared/mongo");
const studentRoute=require("./routes/students");

async function LoadApp()
{
    app.use(cors());
try{

await mongo.connect(); 

app.use(express.json());
app.use("/login",studentRoute);
app.use("/signup",studentRoute);
app.use("/students",studentRoute);
app.use("/entryi",studentRoute);


app.listen(3002,()=>{console.log("starting port at 3002")})


}
catch(err){
    console.log(err);
}



}

LoadApp();