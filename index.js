// get mongo mongoose
// connect to mongo DB
// use express


let express = require('express');
let mongoose = require('mongoose');
const multer=require('multer');
const cors=require('cors')

let getFields=multer();

let app = express();
app.use(cors());
app.use(express.json());

let db = async() => {
    try{ 
    // await mongoose.connect('mongodb+srv://ruyyadisathwikreddy:6rDUUYNILeyCIr45@cluster0.mwcsryu.mongodb.net/NYAAYSAHAYAK');
    await mongoose.connect('mongodb://localhost:27017/nyaaysahaayak');
    console.log('mongo db connected!');
    }
    catch(error) {
        console.log(error);
    }
}
db();

app.get('/',(req,res) => {  
    console.log(" A new request has been raised on  " + new Date(Date.now())); 
    res.writeHead(200,{ 'Content-Type':"text/plain"})  
    res.write(' hey');
    res.end();
});
const userSchema = new mongoose.Schema({ 
    Name: { 
        type: String, 
        require: true
    }, 
    value: {
        type: String,
        require:true
    }
}) 
  
const Users = new mongoose.model("user", userSchema)

app.get('/users',async (request,response) => { 
    const allUsers = await Users.find({});
    try {
      response.send(allUsers);
    } catch (error) {
      response.status(500).send(error);
    }
});
//
const Q_A = new mongoose.Schema({question:String,answer:[String]});
const userSchema001 = new mongoose.Schema({
    theft_or_robbery_faqs:[Q_A],
});

const Criminal = new mongoose.model("criminal", userSchema001)

const database = mongoose.connection;

app.get('/crime',async (request,response) => { 
    try {
    const criminalCollection = database.collection('criminal')
    const criminaldata = await criminalCollection.find({}).toArray();
    console.log(criminaldata)
      response.json(criminaldata);
    } catch (error) {
      response.status(500).send(error);
    }
});
//
//To check the user
app.post("/login", getFields.none(), async (request, response) => {
    console.log(request.body);
    let user=await Users.findOne({username:request.body.username,password:request.body.password})
   
    try {
        if(user)
            response.send(user);
        else
            response.send('Authentication Failed')
    } catch (error) {
        response.status(500).send(error);
    }
});





app.listen(5000, () => console.log("listening at port 5000"));

  