import { motion } from 'framer-motion';
import { User, Cpu, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Message } from '@/types/jarvis';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
        isUser 
          ? "bg-gradient-to-br from-primary to-primary/70" 
          : "bg-gradient-to-br from-accent to-neural-cyan"
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Cpu className="w-4 h-4 text-accent-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        "flex flex-col max-w-[80%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-3 relative group",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-sm" 
            : "glass-panel rounded-tl-sm"
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          
          {/* Copy button */}
          {!isUser && (
            <button
              onClick={handleCopy}
              className="absolute -right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-secondary hover:bg-secondary/80"
            >
              {copied ? (
                <Check className="w-3 h-3 text-neural-green" />
              ) : (
                <Copy className="w-3 h-3 text-muted-foreground" />
              )}
            </button>
          )}
        </div>

        {/* Timestamp */}
        <span className="text-xs text-muted-foreground mt-1 px-2">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
