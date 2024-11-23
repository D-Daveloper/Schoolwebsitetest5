import { Event } from "../models/eventDB.js";
import uploadImage  from "../uploads/cloudinary.js";

async function goToAddEvents(req, res) {
  res.render("add");
};

async function getEvents(req, res) {
  try {
    const event = await Event.find();
    res.render("events", { event: event });
  } catch (err) {
    console.log(err.message);
  }
};

async function getEvent(req, res) {
  try {
    const id = req.params.eventId;
    const event = await Event.findById(id);
    if (!event) {
      return res.render("viewEvents",{error:"The selected Event does not exist"})
    }
    res.render('editEvents', { event: event });
  } catch (err) {
    console.log(err.message);
    res.redirect('/admin/viewEvents');
  }
};

async function addEvents(req, res) {
    try {
        const { title, description, date } = req.body;
        const oldTitle = await Event.findOne({title: title.trim()})
        if (oldTitle){
          return res.render("add",{error:"An Event with this title exists."})
        }
        console.log(req.files);
        
        const image = await uploadImage(req.files.eventImage, "event");
        if (image){
            const newEvent = new Event({
            title: title.trim(),
            description: description.trim(),
            date: date,
            image: image.url,
            });
            await newEvent.save();
          return res.render("add",{message:"success.!"})
        }
        else{
          return res.render("add",{error:"Error uploading image try again later."})
        }
    } catch (e) {
      console.log(e)
      return res.render("add",{error:"Something went wrong.!"})
    }
};

async function viewEvent(req, res) {
  const events = await Event.find();
  res.render("viewEvent", { event: events });
};

async function editEvents(req, res) {
  console.log(req.body);
  
    const eventId = req.params.eventId;
    const { title, description, date} = req.body;
    const allEvents = await Event.find();
    const checkTitle =  await Event.find({title:title});
    if ( checkTitle.length > 1){
      res.render('viewEvent',{error:"An Event with this title exists already.",event:allEvents})
    }
    let event;
    try {
      if(req.files){
        console.log("if");
        const image = await uploadImage(req.files.eventImage, "event");
        event = await Event.findByIdAndUpdate({_id: eventId},{
          title: title,
          description:description,
          date:date,
          image: image.url
        },
        { new: true });
      }else{
        console.log("else")
        event = await Event.findByIdAndUpdate({_id: eventId},{
          title: title,
          description:description,
          date:date,
        },
        { new: true });
      };
      if (!event){
        return res.render("viewEvent",{error:"This Event does not Exist!",event:allEvents});
      }
        return res.render("viewEvent",{message:"Success!",event:allEvents});
      } catch (err) {
        console.log(err);
        return res.render("viewEvent",{error:"Something went wrong.!",event:allEvents})
      }
  };
async function deleteEvent(req, res){
    const eventId = req.params.eventId;
    try {
      const event = await Event.findByIdAndDelete(eventId);
      let allEvents;
      if (!event) {
        allEvents = await Event.find();
        return res.render("viewEvent",{error:"This Event does not Exist!",event:allEvents})
      }
      allEvents = await Event.find();
      return res.render("viewEvent",{message:"Success!",event:allEvents})
    } catch (err) {
      console.error(err.message);
      return res.render("viewEvent",{error:"Something went wrong.!",event:allEvents})
    }
  };

export { getEvents, getEvent, goToAddEvents, addEvents, viewEvent, editEvents,deleteEvent};
