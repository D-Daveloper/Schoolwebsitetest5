import { Router } from "express";
import { getTestimonial, goToTestimonials, addTestimonial, viewTestimonial, editTestimonial,deleteTestimonial} from "../controllers/testimonial.js";
const router = Router()

// router.get("/testimonials",getTestimonials);
router.route("/admin/addTestimonial").get(goToTestimonials).post(addTestimonial);
router.get("/admin/viewTestimonial",viewTestimonial);
router.route('/editTestimonial/:testimonialId').get(getTestimonial).put(editTestimonial).delete(deleteTestimonial);
router.route('/deleteTestimonial/:testimonialId').get(deleteTestimonial);
export default router;