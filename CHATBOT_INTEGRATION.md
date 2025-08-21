# n8n Chat Integration Documentation

## Overview
This portfolio website now includes the official n8n Chat widget that integrates with your n8n workflow. The chatbot provides visitors with an interactive way to get information about Yash and his work using the official n8n Chat component.

## Features

### Official n8n Chat Widget
- **Floating Chat Button**: A circular chat button appears in the bottom-right corner of the website
- **Expandable Chat Window**: Click the button to open a chat interface
- **Real-time Messaging**: Send messages and receive responses from your n8n workflow
- **Responsive Design**: Works on both desktop and mobile devices
- **Session Management**: Maintains chat history and session context
- **Customizable UI**: Styled to match your portfolio's design theme
- **Official Integration**: Uses the official @n8n/chat package for reliable functionality

### Technical Implementation

#### Components
1. **N8nChatWidget.tsx** - Main component that initializes the official n8n Chat widget
2. **Custom CSS Styling** - Tailored styling to match your portfolio's design system

#### Key Features
- **Official n8n Integration**: Uses the official @n8n/chat package
- **Session Persistence**: Maintains conversation history across page reloads
- **Custom Branding**: Personalized welcome messages and styling
- **Theme Integration**: Automatically adapts to light/dark mode
- **Error Handling**: Built-in error handling from the official package

## Configuration

### Webhook URL
The chatbot is configured to use your n8n webhook:
```
https://triggerandflow.in/webhook/16b35e59-8e87-4bdd-aa59-e6609e16599f/chat
```

### n8n Workflow Requirements
Your n8n workflow must include:
1. **Chat Trigger Node**: To handle incoming chat requests
2. **Proper CORS Configuration**: Add your domain to Allowed Origins
3. **Active Workflow**: Ensure the workflow is published and active

### Request Format
The official n8n Chat widget automatically handles:
- `loadPreviousSession` - When loading previous chat history
- `sendMessage` - When sending new messages

## Usage

### For Visitors
1. Look for the chat icon in the bottom-right corner
2. Click to open the chat window
3. Type your message and press Enter or click Send
4. Wait for the AI assistant to respond
5. Continue the conversation as needed

### For Developers
The chatbot is automatically included on all pages through the main App component. To modify:

1. **Update Webhook URL**: Edit `client/src/components/N8nChatWidget.tsx`
2. **Customize Styling**: Modify the CSS variables in `client/src/index.css`
3. **Add Features**: Extend the configuration options as needed

## Styling

The chatbot uses custom CSS variables to match your portfolio's design:
- **Primary Colors**: Uses your portfolio's primary color scheme
- **Dark/Light Mode**: Automatically adapts to theme changes
- **Consistent Typography**: Matches your portfolio's font styles
- **Responsive Design**: Works seamlessly across all devices

## Configuration Options

The n8n Chat widget is configured with the following options:

```typescript
createChat({
  webhookUrl: 'https://triggerandflow.in/webhook/16b35e59-8e87-4bdd-aa59-e6609e16599f/chat',
  mode: 'window',
  showWelcomeScreen: false,
  initialMessages: [
    'Hi there! 👋',
    "I'm Yash's AI assistant. How can I help you today?"
  ],
  i18n: {
    en: {
      title: "Chat with Yash's AI",
      subtitle: "Ask me anything about Yash's experience, skills, or projects!",
      inputPlaceholder: 'Type your question...',
    },
  },
  enableStreaming: false,
});
```

## n8n Workflow Setup

### Prerequisites
1. **Create n8n Workflow**: Set up a workflow with a Chat Trigger node
2. **Configure CORS**: Add your domain to the Allowed Origins field
3. **Activate Workflow**: Ensure the workflow is published and active

### Workflow Structure
```
Chat Trigger → [Your AI/Logic Nodes] → Response
```

### CORS Configuration
In your Chat Trigger node, add your domain to the "Allowed Origins (CORS)" field:
- For development: `http://localhost:5001`
- For production: `https://yourdomain.com`

## Troubleshooting

### Common Issues
1. **Chatbot not responding**: Check if your n8n workflow is active
2. **CORS errors**: Verify your domain is in the Allowed Origins list
3. **Webhook errors**: Check the n8n workflow execution logs

### Debug Steps
1. **Check n8n Workflow Status**: Ensure the workflow is active
2. **Verify Webhook URL**: Confirm the webhook URL is correct
3. **Test Workflow**: Try testing the workflow directly in n8n
4. **Check Browser Console**: Look for any JavaScript errors

## Performance

- **Optimized Bundle**: Uses the official n8n Chat package
- **Lazy Loading**: Chat widget loads only when needed
- **Efficient Rendering**: Optimized for smooth performance
- **Minimal Impact**: Lightweight integration with your portfolio

## Future Enhancements

Potential improvements:
- **Streaming Responses**: Enable real-time streaming from n8n
- **File Uploads**: Add support for file sharing
- **Custom Actions**: Integrate with portfolio-specific actions
- **Analytics**: Track chat interactions and user engagement
- **Multi-language**: Add support for multiple languages

## Security Considerations

- **CORS Protection**: Only requests from allowed origins are accepted
- **Session Management**: Secure session handling through n8n
- **Input Validation**: Built-in validation from the official package
- **Rate Limiting**: Configure rate limiting in your n8n workflow

## Migration from Custom Implementation

This implementation replaces the previous custom chatbot with the official n8n Chat widget, providing:
- **Better Reliability**: Official package with regular updates
- **Enhanced Features**: Built-in session management and error handling
- **Improved UX**: Professional chat interface
- **Easier Maintenance**: Standardized implementation
