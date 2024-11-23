import { Router } from "express";
import { getEmails, subscribe } from "../controllers/email.js";
const router = Router()

router.route("/subscribe").post(subscribe);
export default router;