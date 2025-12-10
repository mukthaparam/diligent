import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';
import { JarvisLayout } from '@/components/jarvis/JarvisLayout';
import { NeuralCanvas as Canvas } from '@/components/jarvis/NeuralCanvas';
import { Button } from '@/components/ui/button';
import type { AgentType } from '@/types/jarvis';

const NeuralCanvasPage = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeAgents, setActiveAgents] = useState<AgentType[]>([]);

  const runSimulation = async () => {
    setIsSimulating(true);
    const sequence: AgentType[] = ['router', 'retriever', 'reasoner', 'actioner', 'verifier'];
    
    for (let i = 0; i < sequence.length; i++) {
      setActiveAgents(sequence.slice(0, i + 1));
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSimulating(false);
    setActiveAgents([]);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setActiveAgents([]);
  };

  return (
    <JarvisLayout>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="p-4 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Neural Canvas</h1>
              <p className="text-sm text-muted-foreground">
                Visualize the cognitive architecture in real-time
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetSimulation}
                disabled={!isSimulating && activeAgents.length === 0}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={runSimulation}
                disabled={isSimulating}
                className="bg-gradient-to-r from-primary to-accent"
              >
                {isSimulating ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Canvas Area */}
        <div className="flex-1 relative">
          <Canvas activeAgents={activeAgents} isProcessing={isSimulating} />
          
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 left-4 glass-panel rounded-2xl p-4 max-w-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">How It Works</h3>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <span className="text-primary font-medium">Input →</span> Your query enters the system
              </p>
              <p>
                <span className="text-neural-cyan font-medium">Router →</span> Analyzes intent and routes to appropriate agents
              </p>
              <p>
                <span className="text-neural-purple font-medium">Parallel Processing →</span> Retriever, Reasoner, and Actioner work simultaneously
              </p>
              <p>
                <span className="text-neural-green font-medium">Verifier →</span> Validates and ensures response quality
              </p>
              <p>
                <span className="text-neural-pink font-medium">Output →</span> Final response delivered to you
              </p>
            </div>
          </motion.div>

          {/* Architecture Stats */}
          <div className="absolute bottom-4 right-4 glass-panel rounded-2xl p-4">
            <h4 className="font-semibold text-sm mb-3">Architecture Metrics</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Total Agents</span>
                <p className="text-lg font-bold text-primary">5</p>
              </div>
              <div>
                <span className="text-muted-foreground">Active Connections</span>
                <p className="text-lg font-bold text-neural-cyan">{activeAgents.length > 0 ? 8 : 0}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Parallel Paths</span>
                <p className="text-lg font-bold text-neural-purple">3</p>
              </div>
              <div>
                <span className="text-muted-foreground">Processing Time</span>
                <p className="text-lg font-bold text-neural-green">~2.5s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </JarvisLayout>
  );
};

export default NeuralCanvasPage;
