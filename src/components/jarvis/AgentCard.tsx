import { motion } from 'framer-motion';
import { 
  Router, 
  Search, 
  Brain, 
  Zap, 
  CheckCircle,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AgentType } from '@/types/jarvis';

interface AgentCardProps {
  type: AgentType;
  status: 'idle' | 'processing' | 'complete' | 'error';
  compact?: boolean;
}

const agentConfig: Record<AgentType, { 
  name: string; 
  icon: typeof Router; 
  color: string; 
  bgColor: string;
  description: string;
}> = {
  router: {
    name: 'Cognitive Router',
    icon: Router,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    description: 'Query analysis & routing',
  },
  retriever: {
    name: 'Retriever',
    icon: Search,
    color: 'text-neural-cyan',
    bgColor: 'bg-neural-cyan/10',
    description: 'Knowledge retrieval',
  },
  reasoner: {
    name: 'Reasoner',
    icon: Brain,
    color: 'text-neural-purple',
    bgColor: 'bg-neural-purple/10',
    description: 'Logic & inference',
  },
  actioner: {
    name: 'Actioner',
    icon: Zap,
    color: 'text-neural-orange',
    bgColor: 'bg-neural-orange/10',
    description: 'Response generation',
  },
  verifier: {
    name: 'Verifier',
    icon: CheckCircle,
    color: 'text-neural-green',
    bgColor: 'bg-neural-green/10',
    description: 'Output validation',
  },
};

export const AgentCard = ({ type, status, compact = false }: AgentCardProps) => {
  const config = agentConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "glass-panel rounded-xl transition-all duration-300",
        compact ? "p-2" : "p-4",
        status === 'processing' && "neural-glow border-primary/50",
        status === 'complete' && "border-neural-green/50",
        status === 'error' && "border-destructive/50"
      )}
    >
      <div className={cn("flex items-center", compact ? "gap-2" : "gap-3")}>
        <div className={cn(
          "rounded-lg flex items-center justify-center",
          config.bgColor,
          compact ? "w-8 h-8" : "w-10 h-10"
        )}>
          {status === 'processing' ? (
            <Loader2 className={cn(
              "animate-spin",
              config.color,
              compact ? "w-4 h-4" : "w-5 h-5"
            )} />
          ) : (
            <Icon className={cn(
              config.color,
              compact ? "w-4 h-4" : "w-5 h-5"
            )} />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={cn(
              "font-medium truncate",
              compact ? "text-xs" : "text-sm"
            )}>
              {config.name}
            </h3>
            <StatusIndicator status={status} />
          </div>
          {!compact && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {config.description}
            </p>
          )}
        </div>
      </div>

      {status === 'processing' && !compact && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-0.5 bg-gradient-to-r from-primary to-accent rounded-full mt-3"
        />
      )}
    </motion.div>
  );
};

const StatusIndicator = ({ status }: { status: string }) => {
  const statusConfig = {
    idle: { color: 'bg-muted-foreground', label: 'Idle' },
    processing: { color: 'bg-primary animate-pulse', label: 'Active' },
    complete: { color: 'bg-neural-green', label: 'Done' },
    error: { color: 'bg-destructive', label: 'Error' },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("w-1.5 h-1.5 rounded-full", config.color)} />
      <span className="text-xs text-muted-foreground">{config.label}</span>
    </div>
  );
};
