import nodemailer from "nodemailer";

export async function sendApplicationConfirmation(
  applicantName: string,
  applicantEmail: string,
  jobTitle: string,
) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return {
      sent: false,
      warning:
        "SMTP is not configured. Required environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.",
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });

  const text = `Dear ${applicantName},

Thank you for your interest in joining Vithal Vision.

We have successfully received your application for the position of ${jobTitle}.

Our recruitment team will review your profile. If your qualifications and experience match our requirements, we will get back to you regarding the next steps in the recruitment process.

We appreciate your interest in becoming a part of Vithal Vision.

Best Regards,

HR Team
Vithal Vision
https://vithalvision.in`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"Vithal Vision Careers" <${user}>`,
    to: applicantEmail,
    subject: "Application Received Successfully – Vithal Vision",
    text,
  });

  return { sent: true };
}
