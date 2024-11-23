import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import {Testimonial,Email, Event} from "./models/eventDB.js"
import methodOverride  from "method-override"
import fileUpload from 'express-fileupload';
import eventRouter from "./router/eventRoute.js"
import testimonialRouter from "./router/testimonialRoute.js"
import emailRouter from "./router/emailRoute.js"
import authRouter from "./router/authRoute.js"
import authMiddleWare from './middleware/authMiddleware.js';
import cookieParser from "cookie-parser";
import { getEvents } from './controllers/event.js';

config(); // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(methodOverride("_method"))
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true })
app.use(fileUpload({ useTempFiles: true }));


app.get('/', async(req, res) => {
  try{
    const testimonials = await Testimonial.find()
    res.render('index',{ testimonial: testimonials});
  }catch(e){
    console.log(e.message)
  }
});

app.get('/about', (req, res) => {
    res.render('about');
});
  
app.get('/login', (req, res) => {
      res.render("login");
  });

app.get("/events",async (req, res)=> {
  try {
    const event = await Event.find();
    res.render("events", { event: event });
  } catch (err) {
    console.log(err.message);
  }
})
app.use("",authRouter);
app.use("/",authMiddleWare, eventRouter);
app.use("/",authMiddleWare, testimonialRouter);
app.use("/",emailRouter);
app.get("/admin",(req,res) => {
  res.render("admin");
})

// Connect to MongoDB
const start = async() => {
  try {
      await mongoose.connect("mongodb://0.0.0.0:27017/Orkids")
      .then(() => console.log("connected"))
      app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
      });
  }
  catch(e){
      console.log(e.message)
  }
}
start()



