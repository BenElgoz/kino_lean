'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ChatMessage as ChatMessageType } from '@/types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { sendDriveRequest } from '@/lib/api';
import styles from './ChatBot.module.scss';

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const initialQueryProcessed = useRef(false);
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

  useEffect(() => {
    if (isMounted && !initialQueryProcessed.current) {
      const query = searchParams.get('q');
      if (query) {
        initialQueryProcessed.current = true;
        handleSendMessage(query);
      }
    }
  }, [isMounted, searchParams]);

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
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <a href="/">
            <Image src="/images/kino-logo.svg" alt="Kino Logo" width={100} height={40} />
          </a>
        </div>

        <nav className={styles.sidebarLinks}>
          <a href="#">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Nouvelle discussion
          </a>
          <a href="#">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
            Fichiers récents
          </a>
          <a href="#">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Historique conversations
          </a>
        </nav>
      </aside>

      {/* Main Chat Area */}
      <div className={styles.mainChat}>
        <div className={styles.chatbotMessages}>
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className={styles.loadingIndicator}>
              <span>Kino recherche vos fichiers</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};
