import { Email } from "../models/eventDB.js";
import sendEmail from "../mail/sendMail.js";

async function subscribe(req, res) {
  const { email } = req.body;
  const newEmail = email.toLowerCase().trim();

  if (await Email.findOne({ email: newEmail })) {
    return res.sendStatus(403);
  }
  const saveEmail = new Email({
    email: newEmail,
  });

  try {
    await saveEmail.save();
    res.sendStatus(201);
    console.log("done");
  } catch (e) {
    res.sendStatus(500);
  }
}
async function getEmails(req, res) {
  try {
    const emails = await Email.find();
    res.render("emails", { email: emails });
  } catch (e) {
    console.log(e.message);
  }
}
async function gotoSendEmail(req, res) {
  try {
    res.render("messageEmails");
  } catch (e) {
    console.log(e.message);
  }
}

async function SendGroupEmail(req, res) {
  const emails = await Email.find();
  console.log(req.files);
  console.log(emails);
  try {
    for (let i = 0; i < emails.length; i++) {
      await sendEmail(
        `${emails[i].email}`,
        `${req.body.title}`,
        req.files ? req.files.emailImage : "",
        `
          
          <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Orkids Newsletter</title>
  </head>
  <body style="
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;">
    <div class="email-container" style="
        max-width: 600px;
        margin: 20px auto;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
    ">
      <div class="header" style="
      display:flex; 
      justify-content:center; 
      align-items:center;
      background: #1eaaf1;
      color: #fff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
      " >
      <img style="
      width:30px;
      height:30px;
      margin-right:10px;
      " src="http://res.cloudinary.com/dxiqrdmzu/image/upload/v1732376676/Testimonial%20folder/badge-removebg-preview%20%281%29.png" alt="Orkids School Banner"/> Orkids </div>
      <div class="body" style="
        padding: 20px;
        line-height: 1.6;
      ">
      <p>
        ${req.body.first}
      </p>
      <p>
        ${req.body.second}
      </p>
      <p>
        ${req.body.third}
      </p>
        <p>
          <a href="#" class="btn" aria-label="Learn more about Orkids"
            style="
              display: inline-block;
              background: rgba(30, 170, 241, 0.8);
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
              transition: background 0.3s ease;
              
              "
            onmouseover="this.style.background='rgba(30, 170, 241, 1)'" 
            onmouseout="this.style.background='rgba(30, 170, 241, 0.8)'">
            Learn More
          </a>
        </p>
        <p>
          Stay connected and let’s continue making learning an exciting adventure
          for your little ones.
        </p>
      </div>
      <div class="footer" style="
        background: #f0f0f0;
        text-align: center;
        padding: 20px;
        font-size: 14px;
      ">
        <p>
          Connect with us on Facebook: 
          <a href="https://web.facebook.com/profile.php?id=100063568420666" rel="noopener noreferrer" target="_blank" style="
              color: #1eaaf1;
              text-decoration: none;
          ">
            facebook.com/orkidsschool
          </a>
        </p>
        <p>Orkids School, Inspiring Young Minds</p>
      </div>
    </div>
  </body>
</html>

              `
      );
    }

    res.render("messageEmails", { email: emails, message: "Success" });
  } catch (error) {
    console.log(error);
    res.render("messageEmails", {
      email: emails,
      error: "Something went wrong. Try again later",
    });
  }
}

async function deleteEmail(req, res){
  const emailId = req.params.emailId;
  try {
    const email = await Email.findByIdAndDelete(emailId);
    let allEmails;
    if (!email) {
      allEmails = await Email.find();
      return res.render("emails",{error:"This email does not Exist!",email:allEmails})
    }
    allEvents = await Email.find();
    return res.render("emails",{message:"Success!",email:allEmails})
  } catch (err) {
    console.error(err.message);
    return res.render("emails",{error:"Something went wrong.!",email:allEmails})
  }
};

export { subscribe, getEmails, gotoSendEmail, SendGroupEmail,deleteEmail };
//res.sendStatus(200); // equivalent to res.status(200).send('OK') res.sendStatus(403); // equivalent to res.status(403).send('Forbidden') res.sendStatus(404); // equivalent to res.status(404).send('Not Found') res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
