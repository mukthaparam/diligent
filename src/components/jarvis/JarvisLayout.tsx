import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Brain, 
  Database, 
  Settings,
  Menu,
  X,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface JarvisLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', icon: MessageSquare, label: 'Chat', description: 'Converse with JARVIS' },
  { path: '/neural-canvas', icon: Brain, label: 'Neural Canvas', description: 'Visualize cognition' },
  { path: '/memory-bank', icon: Database, label: 'Memory Bank', description: 'Knowledge storage' },
];

export const JarvisLayout = ({ children }: JarvisLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 72 }}
        className="fixed left-0 top-0 h-full z-50 glass-panel border-r border-border/50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center gap-3"
                animate={{ opacity: sidebarOpen ? 1 : 0 }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-neural-green animate-pulse" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h1 className="font-bold text-lg text-gradient">JARVIS</h1>
                    <p className="text-xs text-muted-foreground">AI Assistant v1.0</p>
                  </div>
                )}
              </motion.div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary neural-glow" 
                      : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive && "text-primary"
                  )} />
                  {sidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col"
                    >
                      <span className="font-medium text-sm">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border/50">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel rounded-xl p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-neural-green animate-pulse" />
                  <span className="text-xs font-medium text-neural-green">System Online</span>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Cognitive Load</span>
                    <span className="text-primary">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory Usage</span>
                    <span className="text-primary">1.2 GB</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 280 : 72 }}
      >
        {children}
      </main>
    </div>
  );
};
