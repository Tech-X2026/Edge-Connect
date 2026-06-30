import { NextRequest, NextResponse } from 'next/server';
import { findBestAnswer } from '@/lib/chat-knowledge';

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

    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user');
    const query = lastUserMessage?.content || '';

    const { answer } = findBestAnswer(query);

    return NextResponse.json({ reply: answer });
  } catch (error: any) {
    console.error('Chat API error:', error.message);
    return NextResponse.json(
      { error: 'Failed to generate response. Please leave a message to call Anand Kamani on +61432887457 or email info@edgeconnect.au' },
      { status: 500 }
    );
  }
}
