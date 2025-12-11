import { Suspense } from 'react';
import { ChatBot } from '@/components/ChatBot';

export default function ChatPage() {
    return (
        <div className="main-container">
            <Suspense fallback={<div>Chargement...</div>}>
                <ChatBot />
            </Suspense>
        </div>
    );
}
