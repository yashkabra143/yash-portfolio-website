import { MessageInsert } from '@shared/schema';

export interface EmailData {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}

// SendGrid disabled: no-op implementations
export function initializeMailService(): boolean {
  return false;
}

export async function sendEmail(_emailData: EmailData): Promise<boolean> {
  return false;
}

export async function sendContactFormEmail(_message: MessageInsert): Promise<boolean> {
  return false;
}
