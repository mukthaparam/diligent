import { motion } from 'framer-motion';
import { Activity, Clock, Cpu } from 'lucide-react';
import { AgentCard } from './AgentCard';
import type { AgentType } from '@/types/jarvis';

interface AgentPanelProps {
  stages: Array<{ agent: AgentType; status: 'idle' | 'processing' | 'complete' }>;
  isProcessing: boolean;
}

const agentOrder: AgentType[] = ['router', 'retriever', 'reasoner', 'actioner', 'verifier'];

export const AgentPanel = ({ stages, isProcessing }: AgentPanelProps) => {
  const completedCount = stages.filter(s => s.status === 'complete').length;
  const processingAgent = stages.find(s => s.status === 'processing');

  return (
    <div className="glass-panel rounded-2xl p-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Cpu className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Cognitive Pipeline</h3>
            <p className="text-xs text-muted-foreground">Multi-agent processing</p>
          </div>
        </div>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 text-xs text-neural-green"
          >
            <Activity className="w-3 h-3 animate-pulse" />
            Active
          </motion.div>
        )}
      </div>

      {/* Progress Overview */}
      <div className="glass-panel rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Pipeline Progress</span>
          <span className="text-xs font-mono text-primary">
            {completedCount}/{agentOrder.length}
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / agentOrder.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Agent Cards */}
      <div className="space-y-2">
        {agentOrder.map((agent, index) => {
          const stage = stages.find(s => s.agent === agent) || { agent, status: 'idle' as const };
          return (
            <motion.div
              key={agent}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AgentCard type={agent} status={stage.status} />
            </motion.div>
          );
        })}
      </div>

      {/* Current Action */}
      {processingAgent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20"
        >
          <div className="flex items-center gap-2 text-xs text-primary mb-1">
            <Clock className="w-3 h-3" />
            Current Operation
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            {getActionDescription(processingAgent.agent)}
          </p>
        </motion.div>
      )}
    </div>
  );
};

const getActionDescription = (agent: AgentType): string => {
  const descriptions: Record<AgentType, string> = {
    router: 'Parsing query semantics and determining optimal routing path...',
    retriever: 'Querying vector database for contextually relevant embeddings...',
    reasoner: 'Constructing logical inference chains from retrieved context...',
    actioner: 'Synthesizing actionable response from reasoning output...',
    verifier: 'Validating response coherence and factual accuracy...',
  };
  return descriptions[agent];
};
