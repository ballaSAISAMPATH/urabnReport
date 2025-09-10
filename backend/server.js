import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
    console.log();
    
  const { issueId, reportedBy, newStatus } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jayasrimunnaluri@gmail.com", 
        pass: "wtuexwqcttlrpsfv", 
      },
    });

    const mailOptions = {
      from: "jayasrimunnaluri@gmail.com",
      to: "jayasrimunnaluri@gmail.com",
      subject: `Status Update for Issue #${issueId}`,
      text: `Hello, issue reported by ${reportedBy} is now updated to: ${newStatus}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email sending failed", error });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
