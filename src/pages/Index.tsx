import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles } from 'lucide-react';
import { JarvisLayout } from '@/components/jarvis/JarvisLayout';
import { MessageBubble } from '@/components/jarvis/MessageBubble';
import { ThinkingIndicator } from '@/components/jarvis/ThinkingIndicator';
import { ChatInput } from '@/components/jarvis/ChatInput';
import { AgentPanel } from '@/components/jarvis/AgentPanel';
import { useJarvisChat } from '@/hooks/useJarvisChat';

const Index = () => {
  const { messages, isLoading, currentStage, stages, sendMessage } = useJarvisChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <JarvisLayout>
      <div className="flex h-screen">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="p-4 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-accent to-neural-cyan flex items-center justify-center animate-pulse-glow">
                  <Cpu className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-neural-green border-2 border-background animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">JARVIS</h1>
                <p className="text-sm text-muted-foreground">
                  Just A Rather Very Intelligent System
                </p>
              </div>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-neural-cyan/20 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-3xl border border-primary/30"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to JARVIS</h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  I'm your advanced AI assistant powered by a cognitive architecture 
                  with multiple specialized micro-agents working together to provide 
                  intelligent responses.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Cognitive Router', 'Retriever Agent', 'Reasoner Agent', 'Verifier Agent'].map((agent, i) => (
                    <motion.div
                      key={agent}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="glass-panel rounded-xl px-3 py-2 text-xs text-muted-foreground"
                    >
                      {agent}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {isLoading && (
              <ThinkingIndicator currentStage={currentStage} stages={stages} />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>

        {/* Right Panel - Agent Status */}
        <div className="hidden lg:block w-80 border-l border-border/50 p-4 bg-background/50">
          <AgentPanel stages={stages} isProcessing={isLoading} />
        </div>
      </div>
    </JarvisLayout>
  );
};

export default Index;
