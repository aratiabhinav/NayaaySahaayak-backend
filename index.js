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

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name:{
        type:String,
        required: true,
    }
  });
  
  const Users = new mongoose.model('User', userSchema);
  
  app.post('/login', async (request, response) => {
    const { email, password,name } = request.body;
  
    try {
      // Find user by email
      const user = await Users.findOne({ email });
      
      if (user) {
        // Compare hashed password
        //const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (password === user.password) {
          response.json({ success: true, message: 'Login successful' });
        } else {
          response.status(401).json({ success: false, message: 'Invalid ' });
        }
      } else {
        response.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      response.status(500).send(error.message);
    }
  });
  
  

  app.post('/signup',async(request, response)=>{
    const { email, password,name } = request.body;
    try{
        const user = await Users.findOne({ email });
        if(user){
            response.status(401).json({ success: false, message: 'Email is already in use.' });
        }else{
            const user=new Users({email,password,name});
            await user.save();
            response.send({ success: true, message: 'Login successful' });
        }
    }catch (error) {
        response.status(500).send(error.message);
      }
  });






const Q_A = new mongoose.Schema({question:String,answer:[String]});
const criminalSchema = new mongoose.Schema({
    constitutional_related_faqs:[Q_A],
});

const Criminal = new mongoose.model("criminal", criminalSchema)

app.get('/crime',async (request,response) => { 
    const allconst = await Criminal.find();
    try {
      response.send(allconst[0]);   
    } catch (error) {       
      response.status(500).send(error);
    }
});

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

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nyaaysahaayak', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start the server after successfully connecting to MongoDB
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

// Define mongoose schema
const submissionSchema = new mongoose.Schema({
  fullName: String,
  mobileNumber: String,
  appointmentDate: Date,
  message: String,
});

// Create mongoose model
const Submission = mongoose.model('Submission', submissionSchema);

// Endpoint to handle form submissions
app.post('/submissions', async (req, res) => {
  try {
    const { fullName, mobileNumber, appointmentDate, message } = req.body;
    
    // Create a new submission instance
    const submission = new Submission({
      fullName,
      mobileNumber,
      appointmentDate,
      message,
    });

    // Save the submission to the database
    await submission.save();

    res.status(201).json({ message: 'Submission successful' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.listen(5000, () => console.log("listening at port 5000"));

  