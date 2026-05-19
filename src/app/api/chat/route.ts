import { NextRequest, NextResponse } from 'next/server';

// AI configuration loaded from environment variables
const AI_CONFIG: {
  baseUrl: string;
  apiKey: string;
  model: string;
  token?: string;
  chatId?: string;
  userId?: string;
} = {
  baseUrl: process.env.GROQ_BASE_URL || process.env.ZAI_BASE_URL || 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY || process.env.ZAI_API_KEY || '',
  model: process.env.GROQ_MODEL || process.env.ZAI_MODEL || 'llama-3.3-70b-versatile',
  token: process.env.ZAI_TOKEN || '',
  chatId: process.env.ZAI_CHAT_ID || '',
  userId: process.env.ZAI_USER_ID || '',
};

const SYSTEM_PROMPT = `You are EDGE CONNECT's AI assistant — a friendly, knowledgeable chatbot for a digital marketing agency based in Australia.

You help visitors with questions about:
- SEO (Search Engine Optimization) services
- Performance Marketing & paid advertising
- Digital Marketing strategies
- Web Design & Development services
- General inquiries about EDGE CONNECT

Guidelines:
- Be concise, professional, and helpful
- Use a warm but business-appropriate tone
- If asked about pricing, suggest they contact the team via the contact page or call +61 432 887 457
- If asked about something outside your expertise, politely redirect to relevant services
- Keep responses focused and actionable
- When appropriate, mention specific benefits of EDGE CONNECT's services
- Never make up specific statistics or case study details`;

// Default model for each provider (auto-detected from baseUrl)
const DEFAULT_MODELS: Record<string, string> = {
  'api.groq.com': 'llama-3.3-70b-versatile',
  'api.together.xyz': 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
  'openrouter.ai': 'meta-llama/llama-3.3-70b-instruct:free',
};

function getDefaultModel(baseUrl: string): string {
  for (const [domain, model] of Object.entries(DEFAULT_MODELS)) {
    if (baseUrl.includes(domain)) return model;
  }
  // Generic fallback for any OpenAI-compatible API
  return 'gpt-3.5-turbo';
}

// Helper: get AI config - uses hardcoded config for deployment
function getAIConfig() {
  return AI_CONFIG;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required and must not be empty' },
        { status: 400 }
      );
    }

    // Validate message format
    const validMessages = messages.every(
      (msg: any) =>
        typeof msg.role === 'string' &&
        typeof msg.content === 'string' &&
        ['user', 'assistant'].includes(msg.role)
    );

    if (!validMessages) {
      return NextResponse.json(
        { error: 'Invalid message format. Each message must have role and content.' },
        { status: 400 }
      );
    }

    // Get AI configuration
    const config = getAIConfig();

    // Determine which model to use
    const model = config.model || getDefaultModel(config.baseUrl);

    // Prepare the request messages
    const requestMessages = [
      {
        role: 'system' as const,
        content: SYSTEM_PROMPT,
      },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    // Make direct API call using the config
    // Uses OpenAI-compatible format (works with Groq, Together AI, OpenRouter, etc.)
    const url = `${config.baseUrl}/chat/completions`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    };

    // Add Z-AI specific headers only if using Z-AI service
    if (config.token || config.chatId) {
      headers['X-Z-AI-From'] = 'Z';
      if (config.chatId) headers['X-Chat-Id'] = config.chatId;
      if (config.userId) headers['X-User-Id'] = config.userId;
      if (config.token) headers['X-Token'] = config.token;
    }

    // Add OpenRouter specific headers if using OpenRouter
    if (config.baseUrl.includes('openrouter.ai')) {
      headers['HTTP-Referer'] = 'https://edge-connect.com';
      headers['X-Title'] = 'EDGE CONNECT Chatbot';
    }

    const requestBody: Record<string, any> = {
      model,
      messages: requestMessages,
      max_tokens: 500,
      temperature: 0.7,
    };

    // Only add thinking param for Z-AI service
    if (config.token || config.chatId) {
      requestBody.thinking = { type: 'disabled' };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Chat API: AI request failed with status ${response.status}:`, errorBody);
      return NextResponse.json(
        { error: 'AI service returned an error. Please try again later.' },
        { status: 502 }
      );
    }

    const completion = await response.json();

    const reply =
      completion.choices?.[0]?.message?.content ||
      'I apologize, but I could not generate a response. Please try again or contact our team directly.';

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API error:', error.message);
    return NextResponse.json(
      { error: 'Failed to generate response. Please try again later.' },
      { status: 500 }
    );
  }
}
