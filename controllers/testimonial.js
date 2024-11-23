import { Testimonial } from "../models/eventDB.js";
import uploadImage  from "../uploads/cloudinary.js";

async function goToTestimonials(req, res) {
  res.render("addTestimonial");
};

// async function getTestimonials(req, res) {
//   try {
//     const event = await Event.find();
//     res.render("Testimonial", { event: event });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

async function getTestimonial(req, res) {
  try {
    const id = req.params.testimonialId;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.render("viewTestimonial",{error:"The selected Testimonial does not exist"})
    }
    res.render('editTestimonial', { testimonial: testimonial });
  } catch (err) {
    console.log(err.message);
    res.redirect('/admin/viewTestimonial');
  }
};

async function addTestimonial(req, res) {
    try {
        const { name, description } = req.body;
        const oldName = await Testimonial.findOne({name: name.trim()})
        if (oldName){
          return res.render("addTestimonial",{error:"A Person with this name exists."})
        }
        const image = await uploadImage(req.files.testimonialImage, "testimonial");
        if (image){
            const newTestimonial = new Testimonial({
            name: name.trim(),
            description: description.trim(),
            image: image.url,
            });
            await newTestimonial.save();
          return res.render("addTestimonial",{message:"success.!"})
        }
        else{
          return res.render("addTestimonial",{error:"Error uploading image try again later."})
        }
    } catch (e) {
      console.log(e)
      return res.render("addTestimonial",{error:"Something went wrong.!"})
    }
};

async function viewTestimonial(req, res) {
  const testimonials = await Testimonial.find();
  res.render("viewTestimonial", { testimonial: testimonials });
};

async function editTestimonial(req, res) {
  console.log(req.body);
  
    const testimonialId = req.params.testimonialId;
    const { name, description} = req.body;
    const allTestimonials = await Testimonial.find();
    const checkName =  await Testimonial.find({name:name.trim()});
    console.log(checkName)
    if ( checkName.length > 1){
      return res.render('viewTestimonial',{error:"A Person with this Name exists already.",testimonial:allTestimonials})
    }
    let testimonial;
    try {
      if(req.files){
        console.log("if");
        const image = await uploadImage(req.files.testimonialImage, "testimonial");
        testimonial = await Testimonial.findByIdAndUpdate({_id: testimonialId},{
          name: name.trim(),
          description:description.trim(),
          image: image.url
        },
        { new: true });
      }else{
        console.log("else")
        testimonial = await Testimonial.findByIdAndUpdate({_id: testimonialId},{
          name: name.trim(),
          description:description.trim(),
        },
        { new: true });
      };
      if (!testimonial){
        return res.render("viewTestimonial",{error:"This testimonial does not Exist!",testimonial:allTestimonials});
      }
        return res.render("viewTestimonial",{message:"Success!",testimonial:allTestimonials});
      } catch (err) {
        console.log(err);
        return res.render("viewTestimonial",{error:"Something went wrong.!",testimonial:allTestimonials})
      }
  };
async function deleteTestimonial(req, res){
    const testimonialId = req.params.testimonialId;
    try {
      const testimonial = await Testimonial.findByIdAndDelete(testimonialId);
      let allTestimonial;
      if (!testimonial) {
        allTestimonial = await Testimonial.find();
        return res.render("viewTestimonial",{error:"This testimonial does not Exist!",testimonial:allTestimonial})
      }
      allTestimonial = await Testimonial.find();
      return res.render("viewTestimonial",{message:"Success!",testimonial:allTestimonial})
    } catch (err) {
      console.error(err.message);
      return res.render("viewTestimonial",{error:"Something went wrong.!",testimonial:allTestimonial})
    }
  };

export { getTestimonial, goToTestimonials, addTestimonial, viewTestimonial, editTestimonial,deleteTestimonial};
