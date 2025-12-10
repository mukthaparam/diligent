export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  agentStages?: AgentStage[];
}

export interface AgentStage {
  agent: AgentType;
  status: 'idle' | 'processing' | 'complete' | 'error';
  output?: string;
  confidence?: number;
  duration?: number;
}

export type AgentType = 'router' | 'retriever' | 'reasoner' | 'actioner' | 'verifier';

export interface Agent {
  id: AgentType;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: 'idle' | 'processing' | 'complete' | 'error';
}

export interface MemoryEntry {
  id: string;
  content: string;
  embedding?: number[];
  relevance: number;
  timestamp: Date;
  type: 'conversation' | 'knowledge' | 'context';
}

export interface NeuralNode {
  id: string;
  x: number;
  y: number;
  type: AgentType | 'input' | 'output';
  active: boolean;
  connections: string[];
}
