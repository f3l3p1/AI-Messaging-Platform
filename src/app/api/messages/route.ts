import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://www.backup-backend.readychatai.com/messages_json');
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Unable to fetch messages' }, { status: 500 });
  }
}
