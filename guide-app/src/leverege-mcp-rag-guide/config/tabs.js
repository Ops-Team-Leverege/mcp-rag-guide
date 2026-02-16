import { Target, Brain, Users, BookOpen, Database, Layers, GitBranch, Code, Cloud, Zap, Settings, Gauge, FileText, Sparkles, Bug, DollarSign } from 'lucide-react';

export const tabs = [
  { id: 'overview', label: 'Overview', icon: Target },
  { id: 'mindset', label: 'Mindset', icon: Brain },
  { id: 'businesscase', label: 'Business Case', icon: Users },
  { id: 'concepts', label: 'Core Concepts', icon: BookOpen },
  { id: 'data', label: 'Data Shape', icon: Database },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'decisions', label: 'When to Use What', icon: GitBranch },
  { id: 'promptengineering', label: 'Prompt Engineering', icon: Sparkles },
  { id: 'modelselection', label: 'Model Selection', icon: DollarSign },
  { id: 'implementation', label: 'Implementation', icon: Code },
  { id: 'debugging', label: 'Debugging', icon: Bug },
  { id: 'hosting', label: 'Hosting', icon: Cloud },
  { id: 'zapier', label: 'Zapier MCP', icon: Zap },
  { id: 'planning', label: 'Planning', icon: Settings },
  { id: 'evaluation', label: 'Evaluation', icon: Gauge },
  { id: 'resources', label: 'Resources', icon: FileText },
];

export default tabs;
