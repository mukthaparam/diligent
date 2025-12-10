import { useState, useCallback } from 'react';
import type { Message, AgentType, MemoryEntry } from '@/types/jarvis';

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/jarvis-chat`;

const agentSequence: AgentType[] = ['router', 'retriever', 'reasoner', 'actioner', 'verifier'];

export const useJarvisChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState<AgentType>('router');
  const [stages, setStages] = useState<Array<{ agent: AgentType; status: 'idle' | 'processing' | 'complete' }>>(() =>
    agentSequence.map(agent => ({ agent, status: 'idle' }))
  );
  const [memories, setMemories] = useState<MemoryEntry[]>([]);

  const simulateAgentProcessing = useCallback(async () => {
    for (let i = 0; i < agentSequence.length; i++) {
      const agent = agentSequence[i];
      setCurrentStage(agent);
      setStages(prev => prev.map((s, idx) => ({
        ...s,
        status: idx < i ? 'complete' : idx === i ? 'processing' : 'idle'
      })));

      // Add mock memory during retriever phase
      if (agent === 'retriever') {
        setMemories([
          {
            id: crypto.randomUUID(),
            content: 'Previous context about cognitive architecture and neural processing patterns.',
            relevance: 0.92,
            timestamp: new Date(),
            type: 'knowledge',
            embedding: [0.23, -0.45, 0.78, 0.12, -0.34],
          },
          {
            id: crypto.randomUUID(),
            content: 'Related conversation about AI assistant capabilities and multi-agent systems.',
            relevance: 0.85,
            timestamp: new Date(),
            type: 'conversation',
            embedding: [0.56, -0.12, 0.89, -0.23, 0.45],
          },
          {
            id: crypto.randomUUID(),
            content: 'Contextual information about reasoning engines and inference chains.',
            relevance: 0.67,
            timestamp: new Date(),
            type: 'context',
            embedding: [-0.34, 0.67, 0.12, 0.89, -0.56],
          },
        ]);
      }

      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));
    }

    // Mark all as complete
    setStages(prev => prev.map(s => ({ ...s, status: 'complete' })));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setStages(agentSequence.map(agent => ({ agent, status: 'idle' })));
    setMemories([]);

    // Start agent simulation
    const agentSimulation = simulateAgentProcessing();

    let assistantContent = '';

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get response');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      // Create assistant message placeholder
      const assistantId = crypto.randomUUID();
      setMessages(prev => [...prev, {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process SSE lines
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              setMessages(prev => prev.map(m =>
                m.id === assistantId ? { ...m, content: assistantContent } : m
              ));
            }
          } catch {
            // Incomplete JSON, continue
          }
        }
      }

      await agentSimulation;

    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `I apologize, but I encountered an error processing your request. ${error instanceof Error ? error.message : 'Please try again.'}`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setStages(agentSequence.map(agent => ({ agent, status: 'idle' })));
      }, 1000);
    }
  }, [messages, simulateAgentProcessing]);

  return {
    messages,
    isLoading,
    currentStage,
    stages,
    memories,
    sendMessage,
  };
};
