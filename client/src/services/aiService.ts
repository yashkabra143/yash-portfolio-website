import { GoogleGenerativeAI } from '@google/generative-ai';
import { apiRequest } from '@/lib/queryClient';

// We'll initialize the API with the key from our backend
let genAI: GoogleGenerativeAI | null = null;

// Function to initialize the Google AI client
async function initializeAIClient() {
  if (genAI) return; // Already initialized
  
  try {
    // Fetch API key from backend
    const config = await apiRequest<{ googleAiApiKey: string }>('/api/config');
    if (config?.googleAiApiKey) {
      genAI = new GoogleGenerativeAI(config.googleAiApiKey);
    } else {
      console.error('No Google AI API key available');
    }
  } catch (error) {
    console.error('Failed to initialize Google AI client:', error);
  }
}

// Function to generate welcome message based on user input
export const generateWelcomeMessage = async (
  visitorName: string,
  companyName?: string,
  position?: string,
  industry?: string
): Promise<string> => {
  try {
    // Make sure we have at least a name
    if (!visitorName?.trim()) {
      return 'Welcome to Yash Kabra\'s portfolio!';
    }
    
    // Initialize the AI client if not already done
    await initializeAIClient();
    
    // Check if initialization was successful
    if (!genAI) {
      console.error('Google AI client not initialized');
      return `Welcome, ${visitorName}! Thank you for visiting Yash Kabra's portfolio.`;
    }

    // Create a proper prompt for the AI
    const prompt = `Generate a warm, professional, and personalized welcome message for a visitor named ${visitorName} 
      ${companyName ? `from ${companyName}` : ''} 
      ${position ? `who works as a ${position}` : ''} 
      ${industry ? `in the ${industry} industry` : ''} 
      visiting Yash Kabra's portfolio website. Yash is a QA Engineer with expertise in automation testing and quality assurance. 
      Keep it brief (maximum 2 sentences), warm, and professional. Focus on creating a personal connection.
      Don't use placeholder variables in your response.`;

    // Use the generative model to create a text response
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error generating welcome message:', error);
    return `Welcome, ${visitorName}! Thank you for visiting Yash Kabra's portfolio.`;
  }
};
