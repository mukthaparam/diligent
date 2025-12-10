import { motion } from 'framer-motion';
import { Cpu, Loader2 } from 'lucide-react';
import { AgentCard } from './AgentCard';
import type { AgentType } from '@/types/jarvis';

interface ThinkingIndicatorProps {
  currentStage: AgentType;
  stages: Array<{ agent: AgentType; status: 'idle' | 'processing' | 'complete' }>;
}

export const ThinkingIndicator = ({ currentStage, stages }: ThinkingIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-3"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-neural-cyan flex items-center justify-center">
        <Cpu className="w-4 h-4 text-accent-foreground" />
      </div>

      {/* Thinking Content */}
      <div className="flex-1">
        <div className="glass-panel rounded-2xl rounded-tl-sm p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <Loader2 className="w-4 h-4 text-primary animate-spin" />
            <span className="text-sm font-medium text-primary">Processing Query</span>
          </div>

          {/* Agent Pipeline */}
          <div className="grid grid-cols-5 gap-2">
            {stages.map((stage) => (
              <AgentCard 
                key={stage.agent}
                type={stage.agent}
                status={stage.status}
                compact
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-primary via-accent to-neural-cyan"
            />
          </div>

          {/* Current Action */}
          <motion.p
            key={currentStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground mt-2 font-mono"
          >
            {getStageMessage(currentStage)}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const getStageMessage = (stage: AgentType): string => {
  const messages: Record<AgentType, string> = {
    router: '→ Analyzing query intent and routing to appropriate agents...',
    retriever: '→ Searching knowledge base for relevant context...',
    reasoner: '→ Applying logical reasoning and inference chains...',
    actioner: '→ Formulating comprehensive response...',
    verifier: '→ Validating output accuracy and coherence...',
  };
  return messages[stage];
};
