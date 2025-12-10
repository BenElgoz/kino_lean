'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '@/types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { sendDriveRequest } from '@/lib/api';
import styles from './ChatBot.module.scss';

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setMessages([
      {
        id: 'initial-1',
        role: 'assistant',
        content: 'Bonjour ! Je suis Kino, votre assistant de recherche. Dites-moi quel fichier vous recherchez, et je le trouverai pour vous.',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isMounted) {
      scrollToBottom();
    }
  }, [messages, isMounted, isLoading]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendDriveRequest(content);

      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',

        // 👉 Phrase imposée pour les fichiers
        content: response.fileUrl
          ? "Bonjour, voici le fichier que j'ai récupéré pour vous :"
          : response.message,

        timestamp: new Date(),
        fileUrl: response.fileUrl,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessageType = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Désolé, une erreur est survenue lors de la communication avec le serveur.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className={styles.chatbotContainer}>
      <header className={styles.chatbotHeader}>
        <h1>K.I.N.O Search</h1>
        <p>Recherche intelligente de fichiers</p>
      </header>

      <div className={styles.chatbotMessages}>
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className={styles.loadingIndicator}>
            <span>Kino recherche vos fichiers...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
};
