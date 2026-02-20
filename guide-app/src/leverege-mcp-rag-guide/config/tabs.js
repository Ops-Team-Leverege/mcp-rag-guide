import { Target, Brain, Users, BookOpen, Database, Layers, GitBranch, Code, Cloud, Zap, Settings, Gauge, FileText, Sparkles, Bug, DollarSign, Box, TestTube, Search, Scale } from 'lucide-react';

export const tabGroups = [
  {
    title: "Foundation",
    tabs: [
      { id: 'overview', label: 'Overview', icon: Target },
      { id: 'mindset', label: 'Mindset', icon: Brain },
      { id: 'businesscase', label: 'Business Case', icon: Users },
    ]
  },
  {
    title: "Concepts",
    tabs: [
      { id: 'concepts', label: 'Core Concepts', icon: BookOpen },
      { id: 'promptengineering', label: 'Prompt Engineering', icon: Sparkles },
      { id: 'modelselection', label: 'Model Selection', icon: DollarSign },
      { id: 'data', label: 'Data Shape', icon: Database },
    ]
  },
  {
    title: "Architecture",
    tabs: [
      { id: 'architecture', label: 'Architecture Patterns', icon: Layers },
      { id: 'decisions', label: 'When to Use What', icon: GitBranch },
      { id: 'mvppath', label: 'The MVP Path', icon: Zap },
      { id: 'implementation', label: 'Implementation', icon: Code },
    ]
  },
  {
    title: "Operations",
    tabs: [
      { id: 'debugging', label: 'Debugging', icon: Bug },
      { id: 'evaluation', label: 'Evaluation', icon: Gauge },
      { id: 'goldenset', label: 'Golden Set', icon: TestTube },
      { id: 'hybridsearch', label: 'Hybrid Search', icon: Search },
      { id: 'aijudge', label: 'AI-as-a-Judge', icon: Scale },
      { id: 'deployment', label: 'Deployment', icon: Cloud },
    ]
  },
  {
    title: "Case Study",
    tabs: [
      { id: 'pitcrew', label: 'PitCrew Sauce', icon: Box },
    ]
  },
];

// Flatten for backward compatibility
export const tabs = tabGroups.flatMap(group => group.tabs);

export default tabGroups;
