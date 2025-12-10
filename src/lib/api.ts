import axios from 'axios';
import { DriveFileRequest, DriveFileResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function sendDriveRequest(query: string): Promise<DriveFileResponse> {
  try {
    const response = await axios.post<DriveFileResponse>(
      `${API_BASE_URL}/api/n8n`,
      {
        query,
        timestamp: new Date().toISOString(),
      } as DriveFileRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: 'Erreur lors de la communication avec le serveur',
        error: error.message,
      };
    }

    return {
      success: false,
      message: 'Erreur inconnue',
      error: String(error),
    };
  }
}
