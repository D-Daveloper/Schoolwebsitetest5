import { Router } from "express";
import { getEvent, goToAddEvents, addEvents, viewEvent, editEvents,deleteEvent} from "../controllers/event.js";
import { getEmails, gotoSendEmail, SendGroupEmail } from "../controllers/email.js";
const router = Router()

router.get("/admin/viewEmails",getEmails);
router.get("/admin/messageEmails",gotoSendEmail);
router.post("/admin/send/Emails",SendGroupEmail);
router.route("/addEvent").get(goToAddEvents).post(addEvents);
router.get("/admin/viewEvents",viewEvent);
router.route('/editEvent/:eventId').get(getEvent).post(editEvents).delete(deleteEvent);
router.route('/deleteEvent/:eventId').get(deleteEvent);
export default router;  