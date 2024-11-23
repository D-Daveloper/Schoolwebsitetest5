import { Router } from "express";
import { login, register } from "../controllers/auth.js";
const router = Router()

router.post("/register",register);
router.post("/login",login);
// router.route("/addEvent").get(goToAddEvents).post(addEvents);
// router.get("/admin/viewEvents",viewEvent);
// router.route('/editEvent/:eventId').get(getEvent).post(editEvents).delete(deleteEvent);
export default router;