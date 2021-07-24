const { MongoClient,connect } = require("mongodb");
var url="mongodb+srv://abhi:admin@cluster0.ujn56.mongodb.net/user?retryWrites=true&w=majority";

const mongo={
db:null,
async connect(){
try{
    const client=await MongoClient.connect(url,{useUnifiedTopology:true})
console.log("mongoDb connected at 3002");

this.db=client.db("user");
const data=await mongo.db.collection("entry").find().toArray();
console.log(data);
}
catch(err)
{
    console.log(err);
    console.log("error connnection mongo");
}
}

}

module.exports=mongo;