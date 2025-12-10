export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  fileUrl?: string;
}

export interface DriveFileRequest {
  query: string;
  userId?: string;
  timestamp: string;
}

export interface DriveFileResponse {
  success: boolean;
  message: string;
  fileUrl?: string;
  fileName?: string;
  error?: string;
}

export interface N8nWebhookPayload {
  query: string;
  userId: string;
  timestamp: string;
}