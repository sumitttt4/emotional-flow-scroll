# AI Chatbot Setup Guide

## Overview
Your project now includes a comprehensive AI-powered chatbot that can:
- Answer questions about the transformation journey
- Provide daily insights and motivation
- Help users navigate the website
- Offer guidance on personal growth
- Respond to general queries

## Features

### 🤖 AI Chatbot Component
- **Modern Chat Interface**: Clean, responsive design with message history
- **Quick Actions**: Pre-defined buttons for common questions
- **Typing Indicators**: Shows when AI is processing responses
- **Message Timestamps**: Tracks conversation timing
- **Error Handling**: Graceful fallbacks for connection issues

### 🧠 AI Capabilities
- **Journey Guidance**: Explains the descent/pause/ascent transformation process
- **Daily Insights**: Provides motivational quotes and wisdom
- **Site Navigation**: Helps users understand website features
- **Personal Growth**: Offers advice on transformation challenges
- **General Support**: Answers questions about the platform

## Setup Instructions

### 1. OpenAI API Key
You need an OpenAI API key for the chatbot to work:

1. Sign up at [OpenAI Platform](https://platform.openai.com/)
2. Get your API key from the dashboard
3. Add it to your Supabase environment variables

### 2. Supabase Environment Variables
Add your OpenAI API key to Supabase:

```bash
# In your Supabase dashboard or CLI
supabase secrets set OPENAI_API_KEY=your_api_key_here
```

### 3. Deploy Edge Function
Deploy the AI transformation function:

```bash
supabase functions deploy ai-transformation
```

### 4. Test the Chatbot
1. Start your development server: `npm run dev`
2. Navigate to your site
3. Click the AI chatbot button (bottom-right corner)
4. Try asking questions like:
   - "What is this site about?"
   - "Tell me about the transformation journey"
   - "Give me today's insight"
   - "How can I start my transformation?"

## Usage

### For Users
- Click the floating AI button to open the chat
- Type questions or use quick action buttons
- The AI will respond with helpful guidance
- Close the chat when done

### For Developers
The chatbot integrates with your existing AI hook system:
- Uses `useAI` hook for API calls
- Supports multiple response types
- Handles errors gracefully
- Maintains conversation history

## Customization

### Adding New Quick Actions
Edit the `getQuickActions()` function in `AIChatbot.tsx`:

```typescript
const getQuickActions = () => [
  { text: "Your new action", icon: YourIcon },
  // ... existing actions
];
```

### Modifying AI Responses
Update the system prompts in `supabase/functions/ai-transformation/index.ts`:

```typescript
case 'chatbot':
  systemContent = `Your custom system prompt here`;
  break;
```

### Styling
The chatbot uses your existing design system:
- Glass morphism effects
- Primary color scheme
- Responsive design
- Dark/light mode support

## Troubleshooting

### Common Issues
1. **"Connection Error"**: Check your OpenAI API key and Supabase function deployment
2. **No Response**: Verify the Edge Function is deployed and accessible
3. **Slow Responses**: Check your OpenAI API quota and rate limits

### Debug Steps
1. Check browser console for errors
2. Verify Supabase function logs
3. Test API key validity
4. Check network connectivity

## Security Notes
- API keys are stored securely in Supabase environment variables
- All requests go through your Supabase Edge Function
- No sensitive data is exposed to the frontend
- Rate limiting is handled by OpenAI

## Next Steps
Consider adding:
- Message persistence (database storage)
- User authentication
- Conversation analytics
- Custom AI models
- Voice input/output 