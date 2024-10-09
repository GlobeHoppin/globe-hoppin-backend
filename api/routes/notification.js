const express = require("express");
const NotificationService = require("../controller/notification");

const NotificationRouter = express.Router();
const notificationService = new NotificationService();

// Route handler

NotificationRouter.post("/email", async (req, res) => {
  const {
    email = "",
    subject = "No Subject",
    message = "No Message",
  } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).send("Please provide a valid email address.");
  }

  if (typeof subject !== "string" || subject.trim() === "") {
    return res.status(400).send("Subject must be a non-empty string.");
  }

  if (typeof message !== "string" || message.trim() === "") {
    return res.status(400).send("Message must be a non-empty string.");
  }

  try {
    const response = await notificationService.sendEmail({
      email,
      subject,
      message,
    });

    if (response.success) {
      return res.status(200).send(response.message);
    } else {
      return res.status(500).send(response.error);
    }
  } catch (error) {
    console.error("Error in email route: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = NotificationRouter;