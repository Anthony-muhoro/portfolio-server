const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewaree 
app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Access email from environment variables
    pass: process.env.EMAIL_PASS, // Access password from environment variables
  },
});

// Endpoint to handle form submission
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // WhatsApp link and phone number
    const whatsappLink = "https://wa.me/254706471469"; // Replace with your WhatsApp number
    const phoneNumber = "+254 706 4714 69"; // Replace with your phone number

    // HTML email template with embedded SVG
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center; margin-bottom: 20px;">Thank You for Contacting Me!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to me. I have received your message and will get back to you as soon as possible.</p>
        <p>In the meantime, feel free to contact me directly via WhatsApp or phone if you have any urgent inquiries.</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="${whatsappLink}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
           
            Chat on WhatsApp
          </a>
        </div>

        <p style="text-align: center; font-size: 14px; color: #777;">
          Or call me directly at: <strong> <a>${phoneNumber}</a></strong>
        </p>

        <p>Best regards,</p>
        <p><strong>Anthony Muhoro</strong></p>
        <p style="font-size: 14px; color: #777;">Fullstack developer</p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

        <p style="text-align: center; font-size: 12px; color: #777;">
          <a href="https://github.com/Anthony-muhoro" style="color: #4CAF50; text-decoration: none;">Visit My Github</a> | 
          <a href="https://x.com/mahrezlaszsch?t=1pLM6zALQnfShWNFSBoszQ&s=09" style="color: #4CAF50; text-decoration: none;">Follow Me on Twitter</a>
        </p>
      </div>
    `;

    // Send an email to the user
    await transporter.sendMail({
      from: `Anthony Muhoro <${process.env.EMAIL_USER}>`, // Sender address with name
      to: email, // Recipient address (user's email)
      subject: "Let's Talk ....", // Email subject
      html: htmlTemplate, // Use HTML for the email body
    });

    // Send a response back to the frontend
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});