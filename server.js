import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

// Enable CORS for your frontend
app.use(cors());
// 50mb limit is required for the large base64 PDF attachments
app.use(express.json({ limit: '50mb' }));

// Set up Nodemailer with Environment Variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, attachments = [] } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, html',
      });
    }

    const info = await transporter.sendMail({
      from: `"Ask Geo System" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      attachments,
    });

    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Error sending email:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Unknown email error',
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Email backend running on port ${PORT}`);
});
