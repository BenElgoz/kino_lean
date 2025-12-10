import { NextRequest, NextResponse } from 'next/server';
import { DriveFileRequest } from '@/types';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  try {
    const body: DriveFileRequest = await request.json();

    if (!body.query || body.query.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'La requête ne peut pas être vide' },
        { status: 400 }
      );
    }

    if (!N8N_WEBHOOK_URL) {
      throw new Error('N8N_WEBHOOK_URL is not defined');
    }

    const requestId = `req-${Date.now()}`;
    console.log(`[${requestId}] Sending to n8n: ${body.query}`);

    // Call n8n Synchronous Webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ID: requestId,
        message: body.query
      })
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n Webhook Error: ${n8nResponse.statusText}`);
    }

    // Read as text first to handle empty or non-JSON responses safely
    const responseText = await n8nResponse.text();
    console.log(`[${requestId}] Status: ${n8nResponse.status}, Raw response: '${responseText}'`);

    let result;
    if (!responseText || responseText.trim() === '') {
      // Handle empty response (e.g. 204 No Content or just empty body)
      console.warn(`[${requestId}] Empty response from n8n`);
      result = { message: "Le traitement a été effectué, mais aucune réponse n'a été renvoyée par l'assistant." };
    } else {
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        // If parsing fails, treat the text as the message itself
        console.warn(`[${requestId}] Failed to parse JSON, using raw text.`);
        result = { message: responseText };
      }
    }

    return NextResponse.json({
      success: true,
      message: result.message || JSON.stringify(result),
      fileUrl: result.fileUrl
    });

  } catch (error) {
    console.error('Error in API:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Erreur de communication avec l\'assistant',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
