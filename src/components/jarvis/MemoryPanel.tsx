import { motion } from 'framer-motion';
import { Database, Search, Clock, Sparkles, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MemoryEntry } from '@/types/jarvis';

interface MemoryPanelProps {
  entries: MemoryEntry[];
  isSearching?: boolean;
}

export const MemoryPanel = ({ entries, isSearching }: MemoryPanelProps) => {
  return (
    <div className="glass-panel rounded-2xl p-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-neural-cyan/10">
            <Database className="w-4 h-4 text-neural-cyan" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Memory Bank</h3>
            <p className="text-xs text-muted-foreground">Vector knowledge storage</p>
          </div>
        </div>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 text-xs text-neural-cyan"
          >
            <Search className="w-3 h-3 animate-pulse" />
            Searching
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <StatCard label="Vectors" value="1,247" icon={Hash} />
        <StatCard label="Retrieved" value={entries.length.toString()} icon={Search} />
        <StatCard label="Latency" value="23ms" icon={Clock} />
      </div>

      {/* Memory Entries */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <MemoryEntryCard key={entry.id} entry={entry} index={index} />
          ))
        ) : (
          <div className="text-center py-8">
            <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No memories retrieved yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Start a conversation to see contextual retrieval
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Database }) => (
  <div className="glass-panel rounded-lg p-2 text-center">
    <Icon className="w-3 h-3 text-muted-foreground mx-auto mb-1" />
    <div className="text-sm font-semibold text-primary">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

const MemoryEntryCard = ({ entry, index }: { entry: MemoryEntry; index: number }) => {
  const relevanceColor = entry.relevance > 0.8 
    ? 'text-neural-green' 
    : entry.relevance > 0.5 
      ? 'text-neural-orange' 
      : 'text-muted-foreground';

  const typeColors = {
    conversation: 'bg-primary/10 text-primary',
    knowledge: 'bg-neural-purple/10 text-neural-purple',
    context: 'bg-neural-cyan/10 text-neural-cyan',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-panel rounded-xl p-3 hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={cn(
          "text-xs px-2 py-0.5 rounded-full",
          typeColors[entry.type]
        )}>
          {entry.type}
        </span>
        <span className={cn("text-xs font-mono", relevanceColor)}>
          {(entry.relevance * 100).toFixed(0)}%
        </span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">
        {entry.content}
      </p>
      {entry.embedding && (
        <div className="mt-2 flex items-center gap-1">
          <span className="text-xs text-muted-foreground">Embedding:</span>
          <code className="text-xs font-mono text-primary/70">
            [{entry.embedding.slice(0, 3).map(v => v.toFixed(2)).join(', ')}...]
          </code>
        </div>
      )}
    </motion.div>
  );
};
