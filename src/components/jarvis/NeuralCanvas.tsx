import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { AgentType } from '@/types/jarvis';

interface NeuralCanvasProps {
  activeAgents: AgentType[];
  isProcessing: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const agentPositions: Record<AgentType | 'input' | 'output', { x: number; y: number; color: string }> = {
  input: { x: 100, y: 200, color: '#3b82f6' },
  router: { x: 250, y: 200, color: '#0ea5e9' },
  retriever: { x: 400, y: 100, color: '#06b6d4' },
  reasoner: { x: 400, y: 200, color: '#8b5cf6' },
  actioner: { x: 400, y: 300, color: '#f97316' },
  verifier: { x: 550, y: 200, color: '#22c55e' },
  output: { x: 700, y: 200, color: '#ec4899' },
};

export const NeuralCanvas = ({ activeAgents, isProcessing }: NeuralCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connections
      drawConnections(ctx, activeAgents, isProcessing);

      // Draw nodes
      Object.entries(agentPositions).forEach(([key, pos]) => {
        const isActive = key === 'input' || key === 'output' || activeAgents.includes(key as AgentType);
        drawNode(ctx, pos.x, pos.y, pos.color, isActive, key);
      });

      // Draw particles
      if (isProcessing) {
        updateAndDrawParticles(ctx);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeAgents, isProcessing]);

  // Generate particles when processing
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setParticles(prev => {
          const newParticles = [...prev];
          
          // Add new particle from input
          if (Math.random() > 0.7) {
            const startPos = agentPositions.input;
            const targetPos = agentPositions.router;
            const angle = Math.atan2(targetPos.y - startPos.y, targetPos.x - startPos.x);
            
            newParticles.push({
              id: Date.now() + Math.random(),
              x: startPos.x,
              y: startPos.y,
              vx: Math.cos(angle) * 3,
              vy: Math.sin(angle) * 3,
              life: 100,
              color: startPos.color,
            });
          }

          // Update particles
          return newParticles
            .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life - 1 }))
            .filter(p => p.life > 0);
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const drawConnections = (ctx: CanvasRenderingContext2D, agents: AgentType[], processing: boolean) => {
    const connections = [
      ['input', 'router'],
      ['router', 'retriever'],
      ['router', 'reasoner'],
      ['router', 'actioner'],
      ['retriever', 'verifier'],
      ['reasoner', 'verifier'],
      ['actioner', 'verifier'],
      ['verifier', 'output'],
    ];

    connections.forEach(([from, to]) => {
      const fromPos = agentPositions[from as keyof typeof agentPositions];
      const toPos = agentPositions[to as keyof typeof agentPositions];
      
      const isActive = processing && 
        (from === 'input' || from === 'output' || agents.includes(from as AgentType)) &&
        (to === 'input' || to === 'output' || agents.includes(to as AgentType));

      ctx.beginPath();
      ctx.moveTo(fromPos.x, fromPos.y);
      
      // Curved line
      const midX = (fromPos.x + toPos.x) / 2;
      const midY = (fromPos.y + toPos.y) / 2 + (Math.random() - 0.5) * 20;
      ctx.quadraticCurveTo(midX, midY, toPos.x, toPos.y);
      
      ctx.strokeStyle = isActive ? `${fromPos.color}80` : '#ffffff15';
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.stroke();
    });
  };

  const drawNode = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    color: string, 
    active: boolean,
    label: string
  ) => {
    const radius = active ? 25 : 20;

    // Glow effect
    if (active) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
      gradient.addColorStop(0, `${color}40`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Node circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = active ? color : '#1e293b';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label
    ctx.fillStyle = active ? '#ffffff' : '#94a3b8';
    ctx.font = '11px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText(label.toUpperCase(), x, y + radius + 18);
  };

  const updateAndDrawParticles = (ctx: CanvasRenderingContext2D) => {
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${Math.floor((p.life / 100) * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
    });
  };

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-panel rounded-xl p-3">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Agent Legend</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          {Object.entries(agentPositions)
            .filter(([key]) => !['input', 'output'].includes(key))
            .map(([key, { color }]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="capitalize text-muted-foreground">{key}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Status */}
      <div className="absolute top-4 right-4 glass-panel rounded-xl px-4 py-2">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isProcessing ? "bg-neural-green animate-pulse" : "bg-muted-foreground"
          )} />
          <span className="text-sm">
            {isProcessing ? 'Processing Active' : 'Standby'}
          </span>
        </div>
      </div>
    </div>
  );
};
