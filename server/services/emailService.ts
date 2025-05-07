import { MailService } from '@sendgrid/mail';
import { MessageInsert } from '@shared/schema';

// This will be initialized when the API key is available
let mailService: MailService | null = null;

// Initialize the mail service with the API key
export function initializeMailService() {
  if (process.env.SENDGRID_API_KEY) {
    mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('SendGrid mail service initialized');
    return true;
  } else {
    console.log('SendGrid API key not found, email functionality will be disabled');
    return false;
  }
}

// Call this on server startup
initializeMailService();

export interface EmailData {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Send an email using SendGrid
 */
export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    if (!mailService) {
      console.log('Mail service not initialized, skipping email send');
      return false;
    }
    
    await mailService.send(emailData);
    console.log(`Email sent to ${emailData.to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Send a contact form notification email
 */
export async function sendContactFormEmail(message: MessageInsert): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid API key not found, skipping contact form email');
    return false;
  }
  
  // Recipient would typically be the website owner
  const to = 'yashkabra143@gmail.com'; // Site owner's email
  const from = 'noreply@yourportfolio.com'; // Verified sender in SendGrid
  
  const emailData: EmailData = {
    to,
    from,
    subject: `New Contact Form Submission: ${message.subject}`,
    text: `
      New message from your portfolio website contact form:\n\n
      Name: ${message.name}\n
      Email: ${message.email}\n
      Subject: ${message.subject}\n
      Message: ${message.message}\n

      This message was sent from your portfolio website contact form.
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${message.name}</p>
      <p><strong>Email:</strong> ${message.email}</p>
      <p><strong>Subject:</strong> ${message.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>This message was sent from your portfolio website contact form.</small></p>
    `
  };
  
  return await sendEmail(emailData);
}
