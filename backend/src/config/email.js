// Email configuration for Zoho SMTP
import nodemailer from 'nodemailer';

// Create transporter for Zoho SMTP
export const createTransporter = () => {
  const password = process.env.ZOHO_APP_PASSWORD;
  if (!password) {
    throw new Error('Email service configuration error. Please contact support.');
  }
  
  return nodemailer.createTransport({
    host: 'smtppro.zoho.eu',  // EU data center
    port: 465,
    secure: true,
    auth: {
      user: 'info@dnsworth.com',
      pass: password
    }
  });
};

// Email templates
export const emailTemplates = {
  contactForm: (data) => ({
    subject: `New Contact Message from ${data.name}`,
    text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Sent from DNSWorth Contact Form
    `.trim(),
    html: `
      <h3>New Contact Message from ${data.name}</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>Sent from DNSWorth Contact Form</em></p>
      <p><strong>Reply to:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    `.trim()
  })
};

// Send email function
export const sendEmail = async (transporter, mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};
