import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!process.env.NOTION_SECRET) {
      console.error('NOTION_SECRET is not set');
      return NextResponse.json(
        { error: 'Server configuration error - NOTION_SECRET missing' },
        { status: 500 }
      );
    }

    if (!process.env.NOTION_DATABASE_ID) {
      console.error('NOTION_DATABASE_ID is not set');
      return NextResponse.json(
        { error: 'Server configuration error - NOTION_DATABASE_ID missing' },
        { status: 500 }
      );
    }

    console.log('Making request to Notion with:', {
      databaseId: process.env.NOTION_DATABASE_ID,
      email
    });

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_SECRET}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: {
          database_id: process.env.NOTION_DATABASE_ID
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: email
                }
              }
            ]
          }
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Notion API error:', {
        status: response.status,
        statusText: response.statusText,
        error: data
      });
      return NextResponse.json(
        { error: `Notion API error: ${data.message || response.statusText}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in waitlist route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 