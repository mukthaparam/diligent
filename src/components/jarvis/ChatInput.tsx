import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Paperclip, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const suggestions = [
    "Analyze the cognitive architecture",
    "Explain neural processing",
    "How do micro-agents work?",
  ];

  return (
    <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur-xl">
      {/* Quick Suggestions */}
      {!input && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInput(suggestion)}
              className="flex-shrink-0 px-3 py-1.5 text-xs rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              {suggestion}
            </button>
          ))}
        </motion.div>
      )}

      {/* Input Container */}
      <div className={cn(
        "relative glass-panel rounded-2xl transition-all duration-300",
        isFocused && "neural-glow border-primary/50"
      )}>
        <div className="flex items-end gap-2 p-2">
          {/* Attachment Button */}
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask JARVIS anything..."
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground min-h-[40px] py-2.5 px-1"
          />

          {/* Voice Button */}
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Mic className="w-5 h-5" />
          </button>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className={cn(
              "p-2.5 rounded-xl transition-all duration-200",
              input.trim() && !disabled
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground neural-glow"
                : "bg-secondary text-muted-foreground"
            )}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground text-center mt-2">
        JARVIS uses a cognitive architecture with 5 micro-agents for processing
      </p>
    </div>
  );
};
