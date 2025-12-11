'use client';

import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types';
import styles from './ChatMessage.module.scss';

interface Props {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`${styles.messageWrapper} ${isUser ? styles.user : styles.assistant}`}>
      <div className={`${styles.messageBubble} ${isUser ? styles.user : styles.assistant}`}>

        <div className={styles.senderName}>
          {isUser ? 'Vous' : 'K.I.N.O'}
        </div>

        <div className={styles.messageContent}>
          {message.content}
        </div>

        {message.fileUrl && (
          <a
            href={message.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fileLink}
            style={{
              marginTop: "10px",
              display: "inline-block",
              color: "#2563eb",
              textDecoration: "underline",
              fontWeight: 600
            }}
          >
            👉 Cliquez ici pour ouvrir votre fichier Google Drive
          </a>
        )}

      </div>
    </div>
  );
};
