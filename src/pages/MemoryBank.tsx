import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Database, Trash2, Plus, Hash, Layers, Clock, Zap } from 'lucide-react';
import { JarvisLayout } from '@/components/jarvis/JarvisLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { MemoryEntry } from '@/types/jarvis';

const mockMemories: MemoryEntry[] = [
  {
    id: '1',
    content: 'JARVIS cognitive architecture uses a multi-agent system with specialized processors for routing, retrieval, reasoning, action, and verification.',
    relevance: 0.95,
    timestamp: new Date(Date.now() - 3600000),
    type: 'knowledge',
    embedding: [0.234, -0.567, 0.891, 0.123, -0.456, 0.789, -0.234, 0.567],
  },
  {
    id: '2',
    content: 'User inquiry about neural network visualization and real-time processing capabilities of the system.',
    relevance: 0.87,
    timestamp: new Date(Date.now() - 7200000),
    type: 'conversation',
    embedding: [0.456, -0.123, 0.789, -0.234, 0.567, -0.891, 0.345, -0.678],
  },
  {
    id: '3',
    content: 'The Retriever Agent specializes in semantic search across vector embeddings to find contextually relevant information.',
    relevance: 0.82,
    timestamp: new Date(Date.now() - 10800000),
    type: 'knowledge',
    embedding: [-0.345, 0.678, -0.123, 0.456, -0.789, 0.234, -0.567, 0.891],
  },
  {
    id: '4',
    content: 'Context about implementing cognitive routers for intelligent query distribution across specialized AI agents.',
    relevance: 0.76,
    timestamp: new Date(Date.now() - 14400000),
    type: 'context',
    embedding: [0.567, -0.234, 0.891, -0.456, 0.123, -0.678, 0.345, -0.789],
  },
  {
    id: '5',
    content: 'Discussion on verification mechanisms to ensure response accuracy and coherence in multi-agent AI systems.',
    relevance: 0.71,
    timestamp: new Date(Date.now() - 18000000),
    type: 'conversation',
    embedding: [-0.678, 0.345, -0.789, 0.234, -0.567, 0.891, -0.123, 0.456],
  },
];

const MemoryBankPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [memories, setMemories] = useState<MemoryEntry[]>(mockMemories);
  const [selectedMemory, setSelectedMemory] = useState<MemoryEntry | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter memories (in real app, this would be vector similarity search)
    const filtered = mockMemories.filter(m => 
      m.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMemories(filtered.length > 0 ? filtered : mockMemories);
    setIsSearching(false);
  };

  const stats = {
    totalVectors: 1247,
    dimensions: 768,
    avgRelevance: 0.82,
    lastUpdated: '2 min ago',
  };

  return (
    <JarvisLayout>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="p-4 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Memory Bank</h1>
              <p className="text-sm text-muted-foreground">
                Vector knowledge storage & semantic retrieval
              </p>
            </div>
            <Button size="sm" className="bg-gradient-to-r from-neural-cyan to-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Memory
            </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            {/* Search */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search memories with semantic similarity..."
                  className="pl-10 bg-secondary/50"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              <StatCard icon={Hash} label="Total Vectors" value={stats.totalVectors.toLocaleString()} />
              <StatCard icon={Layers} label="Dimensions" value={stats.dimensions.toString()} />
              <StatCard icon={Zap} label="Avg Relevance" value={`${(stats.avgRelevance * 100).toFixed(0)}%`} />
              <StatCard icon={Clock} label="Last Updated" value={stats.lastUpdated} />
            </div>

            {/* Memory List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {memories.map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  index={index}
                  isSelected={selectedMemory?.id === memory.id}
                  onClick={() => setSelectedMemory(memory)}
                />
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="w-96 border-l border-border/50 p-4 bg-background/50 overflow-y-auto">
            {selectedMemory ? (
              <MemoryDetail memory={selectedMemory} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Database className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Select a memory to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </JarvisLayout>
  );
};

const StatCard = ({ icon: Icon, label, value }: { icon: typeof Hash; label: string; value: string }) => (
  <div className="glass-panel rounded-xl p-3">
    <div className="flex items-center gap-2 mb-1">
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <p className="text-lg font-bold">{value}</p>
  </div>
);

const MemoryCard = ({ 
  memory, 
  index, 
  isSelected, 
  onClick 
}: { 
  memory: MemoryEntry; 
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const typeColors = {
    conversation: 'bg-primary/10 text-primary border-primary/20',
    knowledge: 'bg-neural-purple/10 text-neural-purple border-neural-purple/20',
    context: 'bg-neural-cyan/10 text-neural-cyan border-neural-cyan/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "glass-panel rounded-xl p-4 cursor-pointer transition-all",
        isSelected ? "border-primary/50 neural-glow" : "hover:border-primary/30"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <span className={cn(
          "text-xs px-2 py-0.5 rounded-full border",
          typeColors[memory.type]
        )}>
          {memory.type}
        </span>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs font-mono",
            memory.relevance > 0.8 ? "text-neural-green" : 
            memory.relevance > 0.5 ? "text-neural-orange" : "text-muted-foreground"
          )}>
            {(memory.relevance * 100).toFixed(0)}% match
          </span>
          <button className="p-1 hover:bg-destructive/10 rounded transition-colors">
            <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      </div>
      <p className="text-sm line-clamp-2">{memory.content}</p>
      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
        <Clock className="w-3 h-3" />
        {formatTimeAgo(memory.timestamp)}
      </div>
    </motion.div>
  );
};

const MemoryDetail = ({ memory }: { memory: MemoryEntry }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-4"
  >
    <div>
      <h3 className="font-semibold mb-2">Memory Content</h3>
      <p className="text-sm text-muted-foreground">{memory.content}</p>
    </div>

    <div className="glass-panel rounded-xl p-4">
      <h4 className="text-sm font-medium mb-2">Metadata</h4>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">ID</span>
          <code className="font-mono text-primary">{memory.id}</code>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Type</span>
          <span className="capitalize">{memory.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Relevance Score</span>
          <span className="text-neural-green">{(memory.relevance * 100).toFixed(1)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Created</span>
          <span>{formatTimeAgo(memory.timestamp)}</span>
        </div>
      </div>
    </div>

    {memory.embedding && (
      <div className="glass-panel rounded-xl p-4">
        <h4 className="text-sm font-medium mb-2">Embedding Vector</h4>
        <div className="grid grid-cols-4 gap-1">
          {memory.embedding.map((val, i) => (
            <div key={i} className="text-center">
              <div 
                className="h-12 rounded bg-gradient-to-t from-primary/20 to-primary/60 mb-1"
                style={{ 
                  height: `${Math.abs(val) * 48}px`,
                  opacity: Math.abs(val) * 0.8 + 0.2 
                }}
              />
              <span className="text-xs font-mono text-muted-foreground">
                {val.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Showing first 8 of 768 dimensions
        </p>
      </div>
    )}
  </motion.div>
);

const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
};

export default MemoryBankPage;
