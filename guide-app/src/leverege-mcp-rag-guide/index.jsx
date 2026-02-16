import React, { useState } from 'react';
import { BookOpen, Database, Layers, Brain, AlertTriangle, CheckCircle, Search, Settings, ChevronRight, ChevronDown, Lightbulb, Target, Zap, Shield, Eye, RefreshCw, HelpCircle, ArrowRight, Box, GitBranch, Server, Cloud, Code, FileText, Users, Gauge, ExternalLink, Play, Pause, RotateCcw, Wrench, Bot } from 'lucide-react';
import AIPatternComparison from './components/diagrams/AIPatternComparison';
import RouterPatternDiagram from './components/diagrams/RouterPatternDiagram';
import GroundingDiagram from './components/diagrams/GroundingDiagram';
import IngestionPipelineDiagram from './components/diagrams/IngestionPipelineDiagram';
import BeforeYouBuildDiagram from './components/diagrams/BeforeYouBuildDiagram';
import ThreadContextDiagram from './components/diagrams/ThreadContextDiagram';
import KnowledgeTiersDiagram from './components/diagrams/KnowledgeTiersDiagram';
import PromptEngineeringSection from './sections/PromptEngineeringSection';
import DebuggingSection from './sections/DebuggingSection';
import ModelSelectionSection from './sections/ModelSelectionSection';

// ============================================
// REUSABLE COMPONENTS
// ============================================

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const Callout = ({ type = "info", title, children }) => {
  const styles = {
    info: "bg-blue-100 border-blue-300 text-blue-900",
    warning: "bg-amber-100 border-amber-300 text-amber-900",
    success: "bg-emerald-100 border-emerald-300 text-emerald-900",
    insight: "bg-purple-100 border-purple-300 text-purple-900",
    danger: "bg-red-100 border-red-300 text-red-900"
  };
  const icons = {
    info: <Lightbulb className="w-6 h-6" />,
    warning: <AlertTriangle className="w-6 h-6" />,
    success: <CheckCircle className="w-6 h-6" />,
    insight: <Brain className="w-6 h-6" />,
    danger: <Shield className="w-6 h-6" />
  };
  return (
    <div className={`p-6 rounded-xl border-2 border-l-4 ${styles[type]} my-6`}>
      <div className="flex items-center gap-3 font-bold text-lg mb-3">
        {icons[type]}
        {title}
      </div>
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  );
};

const ProgressiveSection = ({ number, title, subtitle, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-2 border-gray-200 rounded-xl my-6 overflow-hidden hover:border-gray-300 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
          {number}
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          {subtitle && <p className="text-base text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </button>
      {isOpen && <div className="px-8 pb-8 border-t-2 border-gray-100 pt-6 bg-gray-50">{children}</div>}
    </div>
  );
};

const ComparisonTable = ({ headers, rows }) => (
  <div className="overflow-x-auto my-6 rounded-xl border-2 border-gray-200 shadow-sm">
    <table className="w-full">
      <thead>
        <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
          {headers.map((h, i) => (
            <th key={i} className="px-6 py-4 text-left font-bold text-gray-900 border-b-2 border-gray-200">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}>
            {row.map((cell, j) => (
              <td key={j} className="px-6 py-4 border-b border-gray-200 text-gray-700">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DiagramBox = ({ children, title }) => (
  <div className="my-6">
    {title && <p className="text-base font-semibold text-gray-700 mb-3">{title}</p>}
    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl text-sm overflow-x-auto font-mono leading-relaxed shadow-lg">
      {children}
    </pre>
  </div>
);

// Visual diagram components
const FlowArrow = ({ direction = "down" }) => (
  <div className={`flex ${direction === "down" ? "justify-center py-2" : "items-center px-2"}`}>
    {direction === "down" ? (
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-4 bg-gray-300" />
        <ChevronDown className="w-5 h-5 text-gray-400 -mt-1" />
      </div>
    ) : (
      <div className="flex items-center">
        <div className="w-4 h-0.5 bg-gray-300" />
        <ChevronRight className="w-5 h-5 text-gray-400 -ml-1" />
      </div>
    )}
  </div>
);

const DiagramNode = ({ children, color = "blue", icon: Icon, subtitle }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    green: "bg-green-50 border-green-200 text-green-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    gray: "bg-gray-100 border-gray-300 text-gray-700",
    dark: "bg-gray-800 border-gray-700 text-white",
  };
  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${colors[color]} text-center`}>
      <div className="flex items-center justify-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        <span className="font-semibold text-sm">{children}</span>
      </div>
      {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
    </div>
  );
};

const MCPArchitectureDiagram = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-x-auto">
    {/* Desktop: Horizontal flow */}
    <div className="hidden md:flex items-center justify-center gap-3 min-w-max">
      <DiagramNode color="blue" icon={Brain} subtitle="Claude, Cursor, etc.">AI Host</DiagramNode>
      <ChevronRight className="w-6 h-6 text-gray-400" />
      <DiagramNode color="purple" subtitle="Connects host to server">MCP Client</DiagramNode>
      <ChevronRight className="w-6 h-6 text-gray-400" />
      <DiagramNode color="green" icon={Server} subtitle="Your tools & logic">MCP Server</DiagramNode>
      <ChevronRight className="w-6 h-6 text-gray-400" />
      <DiagramNode color="amber" icon={Database} subtitle="Databases, APIs, Services">External Systems</DiagramNode>
    </div>

    {/* Mobile: Vertical flow */}
    <div className="md:hidden flex flex-col items-center gap-2">
      <DiagramNode color="blue" icon={Brain} subtitle="Claude, Cursor, etc.">AI Host</DiagramNode>
      <ChevronDown className="w-5 h-5 text-gray-400" />
      <DiagramNode color="purple" subtitle="Connects host to server">MCP Client</DiagramNode>
      <ChevronDown className="w-5 h-5 text-gray-400" />
      <DiagramNode color="green" icon={Server} subtitle="Your tools & logic">MCP Server</DiagramNode>
      <ChevronDown className="w-5 h-5 text-gray-400" />
      <DiagramNode color="amber" icon={Database} subtitle="Databases, APIs, Services">External Systems</DiagramNode>
    </div>
  </div>
);

const DataQualityPyramid = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
    <div className="flex flex-col items-center gap-1">
      {[
        { label: "AI Output", desc: "Only as good as what's below", color: "bg-red-100 border-red-300 text-red-800", width: "w-40" },
        { label: "Retrieval", desc: "Can only find what's indexed", color: "bg-orange-100 border-orange-300 text-orange-800", width: "w-48" },
        { label: "Embeddings", desc: "Can only represent what's chunked", color: "bg-amber-100 border-amber-300 text-amber-800", width: "w-56" },
        { label: "Chunking", desc: "Can only chunk what's structured", color: "bg-yellow-100 border-yellow-300 text-yellow-800", width: "w-64" },
        { label: "Clean Data", desc: "FOUNDATION", color: "bg-green-100 border-green-400 text-green-800 font-bold", width: "w-72" },
      ].map((layer, i) => (
        <div key={i} className="flex flex-col items-center">
          {i > 0 && <div className="w-0.5 h-3 bg-gray-300" />}
          <div className={`${layer.width} ${layer.color} border-2 rounded-lg px-4 py-2 text-center`}>
            <div className="font-semibold text-sm">{layer.label}</div>
            <div className="text-xs opacity-75">{layer.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SixLayerArchitecture = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
    <div className="flex flex-col items-center gap-1">
      {[
        { num: 6, label: "MCP", desc: "Interface Layer — Exposes capabilities", color: "purple" },
        { num: 5, label: "RAG Core", desc: "Orchestration — Routes queries", color: "blue" },
        { num: "3-4", label: "Retriever + Composer", desc: "Find chunks + Build prompts", color: "green" },
        { num: 2, label: "Ingestion", desc: "ETL — Parse, chunk, embed", color: "amber" },
        { num: 1, label: "Database", desc: "Storage — Postgres + pgvector", color: "gray" },
      ].map((layer, i) => {
        const colors = {
          purple: "bg-purple-100 border-purple-300 text-purple-800",
          blue: "bg-blue-100 border-blue-300 text-blue-800",
          green: "bg-green-100 border-green-300 text-green-800",
          amber: "bg-amber-100 border-amber-300 text-amber-800",
          gray: "bg-gray-200 border-gray-400 text-gray-800",
        };
        return (
          <div key={i} className="flex flex-col items-center w-full max-w-md">
            {i > 0 && <div className="w-0.5 h-3 bg-gray-300" />}
            <div className={`w-full ${colors[layer.color]} border-2 rounded-lg px-4 py-3 flex items-center gap-3`}>
              <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center font-bold text-sm">
                {layer.num}
              </div>
              <div>
                <div className="font-semibold">{layer.label}</div>
                <div className="text-xs opacity-75">{layer.desc}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    <p className="text-center text-sm text-gray-500 mt-4">↑ Build from bottom up</p>
  </div>
);

const SQLRagFlowDiagram = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
    <p className="text-sm text-gray-600 mb-4 text-center font-medium">
      "What did TPI's customer say about cameras?"
    </p>
    <div className="flex flex-col items-center gap-1">
      <div className="w-full max-w-sm bg-blue-100 border-2 border-blue-300 rounded-lg p-3">
        <div className="font-semibold text-blue-800 text-sm">1. SQL Filter (fast, precise)</div>
        <div className="text-xs text-blue-700 mt-1 font-mono">WHERE company='TPI' AND role='customer'</div>
        <div className="text-xs text-blue-600 mt-1">→ Narrows 13k chunks to ~200</div>
      </div>
      <FlowArrow direction="down" />
      <div className="w-full max-w-sm bg-purple-100 border-2 border-purple-300 rounded-lg p-3">
        <div className="font-semibold text-purple-800 text-sm">2. Vector Search (semantic)</div>
        <div className="text-xs text-purple-700 mt-1 font-mono">ORDER BY embedding similarity</div>
        <div className="text-xs text-purple-600 mt-1">→ Finds 10 most relevant about "cameras"</div>
      </div>
      <FlowArrow direction="down" />
      <div className="w-full max-w-sm bg-green-100 border-2 border-green-300 rounded-lg p-3 text-center">
        <div className="font-semibold text-green-800 text-sm">Return chunks with citations</div>
      </div>
    </div>
  </div>
);

const ComplexitySpectrum = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-x-auto">
    <div className="flex items-end justify-between gap-2 min-w-max md:min-w-0">
      {[
        { label: "SQL Only", examples: "Lookups, Counts, Lists", speed: "Fastest", cost: "Cheapest", color: "green", height: "h-20" },
        { label: "SQL + RAG", examples: "Search + Filter", speed: "Fast", cost: "Cheap", color: "blue", height: "h-28" },
        { label: "RAG + LLM", examples: "Analysis, Synthesis", speed: "Medium", cost: "Medium", color: "purple", height: "h-36" },
        { label: "Agentic AI", examples: "Multi-step, Tools", speed: "Slowest", cost: "Most $$$", color: "amber", height: "h-44" },
      ].map((item, i) => {
        const colors = {
          green: "bg-green-500",
          blue: "bg-blue-500",
          purple: "bg-purple-500",
          amber: "bg-amber-500",
        };
        return (
          <div key={i} className="flex flex-col items-center flex-1 min-w-24">
            <div className={`w-full ${item.height} ${colors[item.color]} rounded-t-lg flex items-end justify-center pb-2`}>
              <span className="text-white font-bold text-xs text-center px-1">{item.label}</span>
            </div>
            <div className="w-full bg-white border border-gray-200 rounded-b-lg p-2 text-center">
              <div className="text-xs text-gray-600">{item.examples}</div>
              <div className="text-xs text-gray-400 mt-1">{item.speed} • {item.cost}</div>
            </div>
          </div>
        );
      })}
    </div>
    <div className="flex justify-between mt-3 text-xs text-gray-500">
      <span>← Simpler</span>
      <span>More Complex →</span>
    </div>
  </div>
);

const AgenticFlowDiagram = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
    <p className="text-sm text-gray-600 mb-4 text-center font-medium">
      "Compare TPI and Les Schwab on cameras, then draft follow-up"
    </p>
    <div className="flex flex-col items-center gap-1">
      <div className="w-full max-w-md bg-amber-100 border-2 border-amber-300 rounded-lg p-3 text-center">
        <div className="font-semibold text-amber-800 text-sm flex items-center justify-center gap-2">
          <Brain className="w-4 h-4" /> Router (LLM decides plan)
        </div>
      </div>
      <FlowArrow direction="down" />
      <div className="flex gap-3 flex-wrap justify-center">
        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-2">
          <div className="font-semibold text-blue-800 text-xs">Search TPI</div>
        </div>
        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-2">
          <div className="font-semibold text-blue-800 text-xs">Search LS</div>
        </div>
        <div className="bg-purple-100 border-2 border-purple-300 rounded-lg px-4 py-2">
          <div className="font-semibold text-purple-800 text-xs">Draft Email</div>
        </div>
      </div>
      <FlowArrow direction="down" />
      <div className="w-full max-w-md bg-green-100 border-2 border-green-300 rounded-lg p-3 text-center">
        <div className="font-semibold text-green-800 text-sm">Synthesizer (combines results)</div>
      </div>
    </div>
  </div>
);

const ResourceLink = ({ title, url, description }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors my-2">
    <div className="flex items-center gap-2">
      <ExternalLink className="w-4 h-4 text-blue-600" />
      <span className="font-medium text-blue-600">{title}</span>
    </div>
    {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
  </a>
);

const QuizQuestion = ({ question, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  return (
    <Card className="p-4 my-4">
      <p className="font-medium mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => { setSelected(i); setShowResult(true); }}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${showResult
              ? i === correctIndex
                ? 'bg-green-100 border-green-300'
                : i === selected
                  ? 'bg-red-100 border-red-300'
                  : 'border-gray-200'
              : selected === i
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {showResult && (
        <div className={`mt-3 p-3 rounded-lg ${selected === correctIndex ? 'bg-green-50' : 'bg-amber-50'}`}>
          <p className="text-sm">{explanation}</p>
        </div>
      )}
    </Card>
  );
};

// ============================================
// MAIN NAVIGATION
// ============================================

const tabs = [
  { id: 'overview', label: 'Overview', icon: Target },
  { id: 'mindset', label: 'Mindset', icon: Brain },
  { id: 'businesscase', label: 'Business Case', icon: Users },
  { id: 'concepts', label: 'Core Concepts', icon: BookOpen },
  { id: 'data', label: 'Data Shape', icon: Database },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'decisions', label: 'When to Use What', icon: GitBranch },
  { id: 'implementation', label: 'Implementation', icon: Code },
  { id: 'hosting', label: 'Hosting', icon: Cloud },
  { id: 'zapier', label: 'Zapier MCP', icon: Zap },
  { id: 'planning', label: 'Planning', icon: Settings },
  { id: 'evaluation', label: 'Evaluation', icon: Gauge },
  { id: 'resources', label: 'Resources', icon: FileText },
];

// ============================================
// CONTENT SECTIONS
// ============================================

const OverviewSection = () => (
  <div className="space-y-10">
    <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <h2 className="font-bold text-2xl mb-6 flex items-center gap-3">
        <Target className="w-8 h-8 text-blue-600" />
        What This Guide Will Help You Do
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium">Understand MCP Architecture</p>
            <p className="text-sm text-gray-600">How AI agents connect to external tools and data</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium">Design RAG Systems</p>
            <p className="text-sm text-gray-600">Ground AI responses in your actual data</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium">Make Build vs Buy Decisions</p>
            <p className="text-sm text-gray-600">When to use Zapier MCP vs custom solutions</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium">Plan Production Deployments</p>
            <p className="text-sm text-gray-600">Hosting, security, and monitoring strategies</p>
          </div>
        </div>
      </div>
    </Card>

    <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Learning Path</h2>
    <p className="text-gray-600 mb-6">This guide is organized progressively. Each section builds on the previous one.</p>

    <div className="space-y-3">
      {[
        { num: 1, title: "Mindset Shift", desc: "Why production AI is different from ChatGPT. Before You Build checklist." },
        { num: 2, title: "Business Case", desc: "Start here — what questions need answers? Define success metrics." },
        { num: 3, title: "Core Concepts", desc: "MCP, RAG, capabilities, contracts, and the mental model." },
        { num: 4, title: "Data Shape", desc: "The foundation — garbage in, garbage out. Metadata matters." },
        { num: 5, title: "Architecture", desc: "The six layers and how they connect. Router pattern explained." },
        { num: 6, title: "When to Use What", desc: "SQL vs RAG vs Agentic AI decision framework." },
        { num: 7, title: "Prompt Engineering", desc: "The 70% rule. System prompts, few-shot examples, temperature." },
        { num: 8, title: "Model Selection", desc: "Route cheap, generate smart. Multi-model pattern, cost optimization." },
        { num: 9, title: "Implementation", desc: "Chunking, embeddings, retrieval patterns, ingestion pipeline." },
        { num: 10, title: "Debugging", desc: "The 5-minute debug protocol. What to log, when to escalate." },
        { num: 11, title: "Hosting", desc: "Where to run your MCP server (Cloud Run, security, OAuth)." },
        { num: 12, title: "Zapier MCP", desc: "When managed solutions make sense. Build vs buy." },
        { num: 13, title: "Planning", desc: "Timeline, costs, and phased rollout. 6-11 week reality." },
        { num: 14, title: "Evaluation", desc: "How to know if it's working. RAGAS, golden test sets." },
        { num: 15, title: "Resources", desc: "External links, documentation, and quick reference." },
      ].map(item => (
        <div key={item.num} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
            {item.num}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900">{item.title}</p>
            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <Callout type="insight" title="How to Use This Guide">
      Read through the sections in order on your first pass. Use the tabs to jump back to specific topics when you need reference material. The expandable sections let you go deep when you're ready.
    </Callout>
  </div>
);

const MindsetSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">The Most Important Lesson</h2>

    {/* Before You Build Decision Check */}
    <Callout type="danger" title="THE RULE: The best architecture is the one you don't need to build">
      Make sure you actually need a custom agent before investing weeks of work.
    </Callout>

    <BeforeYouBuildDiagram />

    <Callout type="warning" title="The Consumer AI Illusion">
      You've used ChatGPT, Gems, GPTs. You drop in files, ask questions, get answers.
      <strong> It feels like magic.</strong> This creates a dangerous expectation that you can "just ask the AI" anything.
    </Callout>

    <ProgressiveSection number="1" title="What You Think Happens vs Reality" subtitle="The gap that causes most failures" defaultOpen={true}>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 border-red-200 bg-red-50">
          <h3 className="font-bold text-red-600 mb-3">❌ What You Think</h3>
          <DiagramBox>
            {`Files → AI → Answer

"The AI read my files and 
knows the answer"`}
          </DiagramBox>
        </Card>

        <Card className="p-4 border-green-200 bg-green-50">
          <h3 className="font-bold text-green-600 mb-3">✓ What Actually Happens</h3>
          <DiagramBox>
            {`Files → Chunking → Embeddings → 
Vector DB → Retrieval → 
Prompt Assembly → LLM → 
(Hope It Doesn't Hallucinate) → 
Answer`}
          </DiagramBox>
        </Card>
      </div>

      <p className="mt-4 text-gray-600">
        Consumer products hide this complexity. They make tradeoffs you don't see: generic chunking,
        no metadata filtering, no source verification.
      </p>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="The Hallucination Problem" subtitle="Why AI makes things up">
      <Callout type="danger" title="Critical Understanding">
        <strong>Hallucinations aren't bugs — they're the default behavior.</strong> LLMs generate
        statistically likely text. Without guardrails, they will confidently state things that
        aren't in your data.
      </Callout>

      <h4 className="font-bold mt-4 mb-2">Example of Hallucination</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <p className="text-sm font-medium text-gray-500 mb-2">You ask:</p>
          <p className="italic">"What did TPI say about delivery timelines?"</p>
        </Card>
        <Card className="p-4 border-red-200">
          <p className="text-sm font-medium text-red-500 mb-2">AI might respond (hallucination):</p>
          <p className="italic">"TPI expressed concerns about the Q2 delivery timeline and requested expedited shipping for the camera equipment."</p>
          <p className="text-xs text-red-600 mt-2">← Sounds confident. Might be completely fabricated.</p>
        </Card>
      </div>
    </ProgressiveSection>

    <ProgressiveSection number="3" title="The Mindset Shift" subtitle="Consumer vs Production thinking">
      <ComparisonTable
        headers={["Consumer AI Mindset", "Production AI Mindset"]}
        rows={[
          ['"AI knows the answer"', '"AI generates text based on what we retrieve"'],
          ['"Just upload and ask"', '"Structure, tag, chunk, embed, then ask"'],
          ['"It\'s usually right"', '"It\'s only as right as our retrieval + grounding"'],
          ['"Trust the output"', '"Verify the output has citations"'],
          ['"Magic"', '"Engineering"'],
        ]}
      />
    </ProgressiveSection>

    <ProgressiveSection number="4" title="The Solution: Grounding" subtitle="How to prevent hallucinations">

      <GroundingDiagram />

      <Card className="p-4 bg-amber-50 border-amber-200 mt-4">
        <p className="font-bold text-amber-800">The Cite or Abstain Rule</p>
        <p className="mt-2">If the AI cannot cite a specific source for a claim, it should not make the claim.</p>
      </Card>
    </ProgressiveSection>

    <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <h3 className="font-bold text-lg mb-4">🎯 The Bottom Line</h3>
      <p className="text-gray-700 mb-4">
        <strong>You're not building a chatbot. You're building a system that can be trusted.</strong>
      </p>
      <div className="grid md:grid-cols-2 gap-2">
        {[
          "Structured data (not just files)",
          "Metadata tags (not just content)",
          "Filtered retrieval (not just similarity)",
          "Grounded responses (not just generation)",
          "Citations (not just answers)",
          '"I don\'t know" (not confident guessing)'
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    </Card>

    <QuizQuestion
      question="What is the main difference between consumer AI and production AI?"
      options={[
        "Production AI uses better models",
        "Production AI is faster",
        "Production AI has engineering for accuracy and trust",
        "Production AI costs more"
      ]}
      correctIndex={2}
      explanation="The key difference is that production AI requires engineering for accuracy, grounding, citations, and the ability to say 'I don't know' — not just generating plausible-sounding text."
    />
  </div>
);

const BusinessCaseSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">Start With the Business Case</h2>

    <Callout type="danger" title="The Most Common Mistake">
      Building AI solutions without knowing what questions you need answered.
      Without a clear business case, you're just building a <strong>commercial AI wrapper</strong> —
      expensive, unfocused, and unlikely to deliver value.
    </Callout>

    <ProgressiveSection number="1" title="Why Business Case First?" subtitle="Technology serves the question, not the other way around" defaultOpen={true}>
      <Card className="p-4 bg-red-50 border-red-200 mb-4">
        <h4 className="font-bold text-red-800">Without a Business Case:</h4>
        <ul className="mt-2 space-y-1 text-sm text-red-700">
          <li>• You build a "chat with your data" interface</li>
          <li>• Users don't know what to ask</li>
          <li>• Answers are generic and unhelpful</li>
          <li>• Nobody uses it after the first week</li>
          <li>• You've built an expensive ChatGPT wrapper</li>
        </ul>
      </Card>

      <Card className="p-4 bg-green-50 border-green-200">
        <h4 className="font-bold text-green-800">With a Business Case:</h4>
        <ul className="mt-2 space-y-1 text-sm text-green-700">
          <li>• You know exactly what questions to answer</li>
          <li>• You design data shape around those questions</li>
          <li>• You choose the right approach (SQL/RAG/Agent)</li>
          <li>• Answers are specific and actionable</li>
          <li>• Users get real value from day one</li>
        </ul>
      </Card>

      <Callout type="insight" title="The Key Insight">
        <strong>The business case determines everything:</strong> what data you need, how to chunk it,
        what metadata to store, which approach to use, and how to evaluate success.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="The Three Questions" subtitle="Answer these BEFORE any technology decisions">
      <div className="space-y-4">
        <Card className="p-5 border-l-4 border-blue-500">
          <h4 className="font-bold text-lg text-blue-800">1. What questions does the business need answered?</h4>
          <p className="text-gray-600 mt-2">Not "what can AI do?" but "what do we need to know?"</p>
          <div className="mt-3 bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Examples for Leverege:</p>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• "What concerns did customers raise in recent meetings?"</li>
              <li>• "What did we promise to follow up on?"</li>
              <li>• "What's the sentiment around our pricing?"</li>
              <li>• "Which customers mentioned competitors?"</li>
            </ul>
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-purple-500">
          <h4 className="font-bold text-lg text-purple-800">2. Who needs these answers and why?</h4>
          <p className="text-gray-600 mt-2">Different users need different things from the same data.</p>
          <div className="mt-3 bg-purple-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-purple-800">User → Need → Implication:</p>
            <ul className="text-sm text-purple-700 mt-1 space-y-1">
              <li>• <strong>BD team</strong> → Prep for calls → Need recent context, fast</li>
              <li>• <strong>Product team</strong> → Feature requests → Need to aggregate across customers</li>
              <li>• <strong>Leadership</strong> → Strategic trends → Need high-level synthesis</li>
            </ul>
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-amber-500">
          <h4 className="font-bold text-lg text-amber-800">3. What does a good answer look like?</h4>
          <p className="text-gray-600 mt-2">Define success before building. What format? What level of detail? What sources?</p>
          <div className="mt-3 bg-amber-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-amber-800">Answer Requirements:</p>
            <ul className="text-sm text-amber-700 mt-1 space-y-1">
              <li>• Must cite specific meetings and speakers</li>
              <li>• Must distinguish customer vs. internal statements</li>
              <li>• Must indicate confidence/uncertainty</li>
              <li>• Must be actionable, not just informative</li>
            </ul>
          </div>
        </Card>
      </div>
    </ProgressiveSection>

    <ProgressiveSection number="3" title="Business Case → Technical Decisions" subtitle="How business needs drive architecture">
      <ComparisonTable
        headers={["Business Need", "Implies", "Technical Decision"]}
        rows={[
          ['"What did the customer say?"', "Need speaker attribution", "Store speaker_role metadata"],
          ['"Last meeting with X"', "Need temporal queries", "Index by company + date"],
          ['"Concerns across all customers"', "Need aggregation", "SQL + vector pre-filter"],
          ['"Summarize the discussion"', "Need synthesis", "RAG + LLM"],
          ['"What did we promise?"', "Need to identify commitments", "Train for action item extraction"],
        ]}
      />

      <DiagramBox title="Business Case Drives Everything">
        {`BUSINESS CASE: "BD needs to prep for customer calls quickly"
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  QUESTIONS THAT IMPLIES:                                    │
│  • "What was our last meeting about?"                       │
│  • "What did they say about our product?"                   │
│  • "What concerns did they raise?"                          │
│  • "What did we promise to follow up on?"                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  DATA SHAPE THAT IMPLIES:                                   │
│  • Chunk by speaker turn (for attribution)                  │
│  • Store speaker_role (customer vs. Leverege)               │
│  • Store meeting_date (for "last meeting")                  │
│  • Store company_id (for filtering)                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  APPROACH THAT IMPLIES:                                     │
│  • "Last meeting" → SQL (temporal query)                    │
│  • "What did they say about X" → SQL + RAG                  │
│  • "Summarize concerns" → RAG + LLM                         │
└─────────────────────────────────────────────────────────────┘`}
      </DiagramBox>
    </ProgressiveSection>

    <ProgressiveSection number="4" title="Write Down Your Business Case" subtitle="A template to fill out before building">
      <Card className="p-6 bg-gray-50 border-gray-300">
        <h4 className="font-bold mb-4">📝 Business Case Template</h4>

        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700">1. Primary Users:</p>
            <p className="text-sm text-gray-500 italic">Who will use this system? (e.g., BD team, Product team)</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">2. Core Problem:</p>
            <p className="text-sm text-gray-500 italic">What problem are we solving? (e.g., "BD spends 30 min prepping for each call")</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">3. Top 5 Questions Users Need Answered:</p>
            <p className="text-sm text-gray-500 italic">Be specific. Not "ask anything" but actual questions.</p>
            <ol className="list-decimal ml-6 text-sm text-gray-500 mt-1">
              <li>_______________</li>
              <li>_______________</li>
              <li>_______________</li>
              <li>_______________</li>
              <li>_______________</li>
            </ol>
          </div>

          <div>
            <p className="font-medium text-gray-700">4. What Does a Good Answer Look Like?</p>
            <p className="text-sm text-gray-500 italic">Format, detail level, must-haves (e.g., "must cite sources")</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">5. Success Metric:</p>
            <p className="text-sm text-gray-500 italic">How will we know it's working? (e.g., "BD prep time drops to 5 min")</p>
          </div>
        </div>
      </Card>

      <Callout type="success" title="Pro Tip">
        Fill out this template with actual users. Their answers will surprise you —
        and save you from building the wrong thing.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="5" title="Anti-Patterns to Avoid" subtitle="Signs you don't have a real business case">
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            bad: '"Let users ask anything about the data"',
            why: "Too vague. Users won't know what to ask.",
            better: "Define the 10 questions users actually need"
          },
          {
            bad: '"We\'ll figure out use cases after launch"',
            why: "You'll build generic infrastructure that fits nothing well.",
            better: "Start with one specific use case, nail it, then expand"
          },
          {
            bad: '"AI will understand what they mean"',
            why: "AI needs structure. Garbage in = garbage out.",
            better: "Design prompts and capabilities around specific patterns"
          },
          {
            bad: '"It\'s like ChatGPT but for our data"',
            why: "That's a feature, not a business case.",
            better: "What decisions will this help people make?"
          },
        ].map((item, i) => (
          <Card key={i} className="p-4">
            <p className="text-red-600 font-medium">❌ {item.bad}</p>
            <p className="text-sm text-gray-500 mt-1">{item.why}</p>
            <p className="text-green-600 text-sm mt-2">✓ {item.better}</p>
          </Card>
        ))}
      </div>
    </ProgressiveSection>

    <Card className="p-6 bg-gradient-to-r from-blue-900 to-purple-900 text-white mt-6">
      <h3 className="font-bold text-lg mb-4">🎯 The Bottom Line</h3>
      <div className="space-y-3">
        <p>
          <strong>Without a business case:</strong> You build a ChatGPT wrapper.
          Expensive to run, vague answers, nobody uses it.
        </p>
        <p>
          <strong>With a business case:</strong> You build a tool that answers
          specific questions, saves real time, and becomes indispensable.
        </p>
        <p className="text-blue-200 mt-4 text-sm">
          The business case is not a formality. It's the foundation that determines
          whether your AI investment succeeds or fails.
        </p>
      </div>
    </Card>
  </div>
);

const ConceptsSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">Core Concepts</h2>

    {/* Redesigned Mental Model Card */}
    <Card className="overflow-hidden mb-8">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">The Mental Model</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { text: "Prompts explain.", desc: "Natural language instructions" },
            { text: "Capabilities execute.", desc: "Actions the AI can take" },
            { text: "Contracts constrain.", desc: "Rules & boundaries" },
            { text: "MCP orchestrates.", desc: "Connects everything" },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="font-bold text-xl text-white mb-2">
                {item.text}
              </p>
              <p className="text-blue-100 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>

    {/* AI Architecture Patterns Introduction */}
    <div className="my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-3">Understanding AI Architecture Patterns</h3>
      <p className="text-gray-700 mb-4">
        Before diving into MCP and RAG specifically, it's important to understand how they fit into the broader
        landscape of AI architecture patterns. Each pattern solves different problems and has different tradeoffs.
      </p>
      <Callout type="insight" title="Why This Matters">
        Many teams jump straight to building without understanding which pattern fits their use case.
        This comparison helps you choose the right approach — or combination of approaches — for your needs.
      </Callout>
    </div>

    {/* AI Architecture Patterns Comparison */}
    <AIPatternComparison />

    <div className="my-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
      <p className="text-sm text-blue-900">
        <strong>Key Takeaway:</strong> Most production systems combine multiple patterns. For example,
        you might use <strong>MCP</strong> to connect to tools, <strong>RAG</strong> to retrieve knowledge,
        <strong>Context Engineering</strong> to shape outputs, and <strong>Agentic AI</strong> for complex workflows.
      </p>
    </div>

    <ProgressiveSection number="1" title="What is MCP?" subtitle="Model Context Protocol - the USB-C for AI" defaultOpen={true}>
      <p className="mb-4">
        <strong>MCP (Model Context Protocol)</strong> is an open standard that enables AI applications to connect
        to external systems — databases, APIs, tools — in a standardized way. Think of it like USB-C for AI:
        one protocol that works with many different systems.
      </p>

      <MCPArchitectureDiagram />

      <h4 className="font-bold mt-6 mb-3">MCP Servers Expose Three Types of Capabilities:</h4>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Settings,
            title: "Tools",
            desc: "Functions the AI can invoke",
            examples: ["create_task()", "search_database()", "send_email()"],
            color: "blue"
          },
          {
            icon: Database,
            title: "Resources",
            desc: "Data the AI can read",
            examples: ["File contents", "Database schemas", "API responses"],
            color: "purple"
          },
          {
            icon: FileText,
            title: "Prompts",
            desc: "Pre-built templates",
            examples: ["Summarize meeting", "Extract action items", "Analyze feedback"],
            color: "green"
          },
        ].map((item, i) => {
          const colors = {
            blue: "border-blue-200 bg-blue-50",
            purple: "border-purple-200 bg-purple-50",
            green: "border-green-200 bg-green-50"
          };
          const iconColors = {
            blue: "text-blue-600 bg-blue-100",
            purple: "text-purple-600 bg-purple-100",
            green: "text-green-600 bg-green-100"
          };
          return (
            <Card key={i} className={`p-4 ${colors[item.color]}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-lg ${iconColors[item.color]}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <h5 className="font-bold">{item.title}</h5>
              </div>
              <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
              <div className="space-y-1">
                {item.examples.map((ex, j) => (
                  <div key={j} className="text-xs font-mono bg-white/50 px-2 py-1 rounded">{ex}</div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      <Callout type="info" title="Key Insight">
        <strong>HTTP is how MCP is accessed, not what MCP is.</strong> MCP defines the contract
        between AI and tools. The transport (HTTP, stdio) is just plumbing.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="What is RAG?" subtitle="Retrieval Augmented Generation">
      {/* Visual RAG Explanation */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h4 className="font-bold text-lg text-amber-800 mb-2">The Problem</h4>
            <p className="text-amber-700">
              AI models can generate fluent text, but they <strong>make things up</strong>.
              They don't know your data.
            </p>
          </div>
          <div className="text-4xl">→</div>
          <div className="flex-1">
            <h4 className="font-bold text-lg text-green-800 mb-2">The Solution: RAG</h4>
            <p className="text-green-700">
              <strong>Retrieve</strong> relevant context first, then <strong>generate</strong>
              a response grounded in that context.
            </p>
          </div>
        </div>
      </div>

      <h4 className="font-bold mb-3">Your Data Has Two Natures:</h4>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card className="p-4 border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-blue-600" />
            <h5 className="font-bold text-blue-800">Structurally Stored</h5>
          </div>
          <p className="text-sm text-gray-600">Rows in a table, columns with types, foreign keys</p>
          <div className="mt-2 font-mono text-xs bg-blue-50 p-2 rounded">
            id | speaker | company | text
          </div>
        </Card>
        <Card className="p-4 border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <h5 className="font-bold text-purple-800">Semantically Unstructured</h5>
          </div>
          <p className="text-sm text-gray-600">Meaning is in natural language, not in schema</p>
          <div className="mt-2 font-mono text-xs bg-purple-50 p-2 rounded">
            "We're worried about camera reliability..."
          </div>
        </Card>
      </div>

      <Callout type="insight" title="The Core Problem">
        A table can store text, but it cannot <em>understand</em> text. RAG gives us semantic indexing —
        embeddings capture <strong>meaning</strong>, not just words.
      </Callout>

      <h4 className="font-bold mt-6 mb-3">RAG is a Cache, Not a Database</h4>
      <div className="bg-gray-100 rounded-xl p-4">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "Stores", value: "Precomputed embeddings (vectors)" },
            { label: "Derived from", value: "Source data (transcripts, docs)" },
            { label: "Optimized for", value: "Recall, relevance, grounding" },
            { label: "Can be", value: "Regenerated when data changes" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-sm"><strong>{item.label}:</strong> {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </ProgressiveSection>

    <ProgressiveSection number="3" title="The Layer Cake" subtitle="How the pieces fit together">
      {/* Visual Layer Cake */}
      <div className="my-6">
        <div className="flex flex-col items-center gap-2">
          {[
            { layer: "MCP", desc: "Reasoning + Orchestration", tech: "Tools, capabilities, contracts", color: "purple", icon: Brain },
            { layer: "RAG", desc: "Meaning + Language", tech: "Embeddings, vector search", color: "blue", icon: Search },
            { layer: "Postgres", desc: "Facts + Relationships", tech: "SQL, joins, indexes", color: "green", icon: Database },
          ].map((item, i) => {
            const colors = {
              purple: "bg-purple-100 border-purple-300 text-purple-800",
              blue: "bg-blue-100 border-blue-300 text-blue-800",
              green: "bg-green-100 border-green-300 text-green-800"
            };
            const widths = ["w-full max-w-lg", "w-full max-w-xl", "w-full max-w-2xl"];
            return (
              <div key={i} className="flex flex-col items-center w-full">
                {i > 0 && <div className="w-0.5 h-4 bg-gray-300" />}
                <div className={`${widths[i]} ${colors[item.color]} border-2 rounded-xl p-4 flex items-center gap-4`}>
                  <div className="p-2 bg-white/50 rounded-lg">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{item.layer}</div>
                    <div className="text-sm opacity-75">{item.desc}</div>
                  </div>
                  <div className="text-xs font-mono bg-white/50 px-2 py-1 rounded hidden md:block">
                    {item.tech}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flow Example */}
      <Card className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          <Play className="w-4 h-4 text-blue-600" />
          Example Flow: "What did TPI's customer say about cameras?"
        </h4>
        <div className="space-y-3">
          {[
            { step: 1, layer: "MCP", action: "Receives question, chooses 'search_customer_feedback' capability", color: "purple" },
            { step: 2, layer: "RAG", action: "Vector search + SQL filter: WHERE company='TPI' AND role='customer'", color: "blue" },
            { step: 3, layer: "Postgres", action: "Returns matching chunks with metadata", color: "green" },
            { step: 4, layer: "Composer", action: "Builds grounded prompt with citations", color: "amber" },
            { step: 5, layer: "Output", action: '"Alan mentioned cameras go offline [March 28 meeting]"', color: "gray" },
          ].map((item, i) => {
            const dotColors = {
              purple: "bg-purple-500",
              blue: "bg-blue-500",
              green: "bg-green-500",
              amber: "bg-amber-500",
              gray: "bg-gray-500"
            };
            return (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${dotColors[item.color]} text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  {item.step}
                </div>
                <div>
                  <span className="font-semibold">{item.layer}:</span>
                  <span className="text-gray-600 ml-1">{item.action}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </ProgressiveSection>

    <ProgressiveSection number="4" title="What the AI Sees" subtitle="Capabilities, not infrastructure">
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card className="p-5 border-2 border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Eye className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="font-bold text-red-700">The AI Does NOT Know:</h4>
          </div>
          <div className="space-y-2">
            {["Tables & columns", "SQL syntax", "Join operations", "Vector databases", "Embedding dimensions"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center">
                  <span className="text-red-600 text-xs">✕</span>
                </div>
                <span className="text-red-700">{item}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-bold text-green-700">The AI Only Knows:</h4>
          </div>
          <div className="space-y-2">
            {["Concepts (company, feedback)", "Available capabilities", "Input/output contracts", "Domain language", "How to ask questions"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span className="text-green-700">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-200 rounded-lg">
            <Lightbulb className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <h4 className="font-bold text-amber-800 mb-1">The Golden Rule</h4>
            <p className="text-amber-900">
              <strong>Capabilities represent questions the business asks — not tables that exist.</strong>
            </p>
            <p className="text-amber-700 text-sm mt-2">
              A capability must never return a raw database object. It must return an intentional,
              user-facing response with citations.
            </p>
          </div>
        </div>
      </Card>
    </ProgressiveSection>

    <ProgressiveSection number="5" title="How Models Actually Work (Simplified)" subtitle="Understanding the foundation">
      <Callout type="warning" title="THE RULE: LLMs are prediction machines, not knowledge databases">
        Everything else in this guide follows from understanding this.
      </Callout>

      <h4 className="font-bold mt-4 mb-3">What LLMs Are (And Aren't)</h4>
      <p className="text-gray-700 mb-4">
        An LLM (Large Language Model) is a statistical pattern matcher trained on massive amounts of text.
        Given some input text, it predicts what text is most likely to come next. That's it.
        It doesn't "understand" anything. It doesn't "know" facts. It generates text that looks like
        a plausible continuation of what you gave it.
      </p>

      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-4">
        <h5 className="font-bold text-red-800 mb-2">Why this matters for everything you build:</h5>
        <ul className="space-y-1 text-sm text-red-700">
          <li>• It WILL make things up (hallucination) because plausible-sounding text is its entire job</li>
          <li>• It doesn't know YOUR data — it was trained on the public internet, not your meeting transcripts</li>
          <li>• "Grounding" (giving it your data as context) is how you make it useful</li>
        </ul>
      </div>

      <h4 className="font-bold mt-6 mb-3">Tokens, Not Words</h4>
      <p className="text-gray-700 mb-4">
        LLMs don't process words — they process <strong>tokens</strong> (roughly 4 characters, or about ¾ of a word).
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Why Tokens Matter</th>
              <th className="px-4 py-2 text-left">Practical Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold">Context window</td>
              <td className="px-4 py-2">Every model has a token limit (e.g., 128K tokens for GPT-4o). That's the maximum input + output per request. Exceed it and your data gets truncated silently.</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold">Cost</td>
              <td className="px-4 py-2">You pay per token — both input (what you send) and output (what the AI writes back). A 1-hour meeting transcript ≈ 15,000 tokens.</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Chunking</td>
              <td className="px-4 py-2">When documents exceed the context window, you must split them into chunks and retrieve only the relevant ones. This is why RAG exists.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Rule of thumb:</strong> 1 page of text ≈ 500 tokens. A 30-page document ≈ 15,000 tokens.
        </p>
      </div>

      <h4 className="font-bold mt-6 mb-3">The Context Window Is Short-Term Memory</h4>
      <p className="text-gray-700 mb-4">
        The context window is everything the model can "see" for a single request. Think of it as
        short-term memory that's completely erased between requests.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-300 rounded-lg p-4">
          <h5 className="font-bold text-green-800 mb-2">✓ What's IN the context window:</h5>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Your system prompt</li>
            <li>• Retrieved data you injected</li>
            <li>• The user's current question</li>
            <li>• Any examples you included</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
          <h5 className="font-bold text-red-800 mb-2">✗ What's NOT:</h5>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Previous conversations</li>
            <li>• Your database (unless retrieved)</li>
            <li>• What it said 5 minutes ago</li>
            <li>• Anything you didn't explicitly include</li>
          </ul>
        </div>
      </div>

      <Callout type="insight" title="The Implication">
        The AI doesn't remember anything between requests. Every single request must contain ALL the
        information the AI needs to answer correctly. This is why context engineering (what you put in
        the window) matters more than prompt wording.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="6" title="When NOT to Use an LLM" subtitle="The most important decision">
      <Callout type="danger" title="Critical Understanding">
        LLMs are expensive, slow, and probabilistic. Many tasks are better handled by deterministic code.
      </Callout>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Task</th>
              <th className="px-4 py-2 text-center">Use LLM?</th>
              <th className="px-4 py-2 text-left">Better Alternative</th>
              <th className="px-4 py-2 text-left">Why</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">Look up a customer's employee count</td>
              <td className="px-4 py-2 text-center text-red-600 font-bold">❌</td>
              <td className="px-4 py-2 font-mono text-sm">SQL query</td>
              <td className="px-4 py-2">Exact answer, instant, free</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Check if a meeting exists</td>
              <td className="px-4 py-2 text-center text-red-600 font-bold">❌</td>
              <td className="px-4 py-2 font-mono text-sm">Database query</td>
              <td className="px-4 py-2">Boolean result, no interpretation needed</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Summarize a meeting transcript</td>
              <td className="px-4 py-2 text-center text-green-600 font-bold">✓</td>
              <td className="px-4 py-2">—</td>
              <td className="px-4 py-2">Requires understanding and synthesis</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Extract action items from a discussion</td>
              <td className="px-4 py-2 text-center text-green-600 font-bold">✓</td>
              <td className="px-4 py-2">—</td>
              <td className="px-4 py-2">Requires judgment about what constitutes an action</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Format a date or calculate a number</td>
              <td className="px-4 py-2 text-center text-red-600 font-bold">❌</td>
              <td className="px-4 py-2 font-mono text-sm">Code</td>
              <td className="px-4 py-2">Deterministic, no room for error</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Search for meetings about "pricing"</td>
              <td className="px-4 py-2 text-center text-amber-600 font-bold">⚠️</td>
              <td className="px-4 py-2">Hybrid: vector search + LLM</td>
              <td className="px-4 py-2">Search is retrieval (deterministic), interpretation is generation (LLM)</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Route a user's question to the right handler</td>
              <td className="px-4 py-2 text-center text-amber-600 font-bold">⚠️</td>
              <td className="px-4 py-2">Hybrid: keywords + LLM fallback</td>
              <td className="px-4 py-2">Don't use a $0.01 LLM call for what a regex can do</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg">
        <h5 className="font-bold text-blue-900 mb-2">The Principle:</h5>
        <p className="text-blue-800">
          Use deterministic code for anything that has a single correct answer. Use an LLM only when
          the task requires interpretation, synthesis, or generation.
        </p>
        <p className="text-blue-700 text-sm mt-2">
          Many production systems use LLMs for less than 30% of their total processing — the rest is
          SQL, code, and retrieval.
        </p>
      </div>
    </ProgressiveSection>

    <ProgressiveSection number="7" title="Knowledge Tiers Pattern" subtitle="Different sources, different trust levels">
      <KnowledgeTiersDiagram />
    </ProgressiveSection>
  </div>
);


const DataShapeSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">Data Shape: Garbage In, Garbage Out</h2>

    <Callout type="danger" title="THE RULE: AI quality is capped by data quality">
      No amount of prompt engineering or model selection can fix bad data.
    </Callout>

    <div className="my-6">
      <h3 className="text-xl font-bold text-gray-900 mb-3">Why Data Shape Matters More Than You Think</h3>
      <p className="text-gray-700 mb-4">
        Most teams focus on the AI model first. This is backwards. The model is the LAST thing that matters.
      </p>
      <p className="text-gray-700 mb-4">What actually matters:</p>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li><strong>What data you have</strong> - Is it complete? Accurate? Up-to-date?</li>
        <li><strong>How it's structured</strong> - Can you filter by metadata? Is it chunked properly?</li>
        <li><strong>What metadata you capture</strong> - Speaker role? Date? Company? Topic?</li>
      </ul>
      <p className="text-gray-700 mt-4">
        Think of it this way: if you ask "What did TPI's customer say about cameras?" but your data doesn't
        track speaker roles or companies, the AI can't answer accurately no matter how smart the model is.
      </p>
    </div>

    <Callout type="warning" title="This is the Foundation">
      Your AI is only as good as the data it can access. Before thinking about RAG,
      embeddings, or LLMs, you must understand and shape your data.
    </Callout>

    <ProgressiveSection number="1" title="The Data Quality Pyramid" subtitle="Everything depends on clean data" defaultOpen={true}>
      <DataQualityPyramid />

      <Callout type="danger" title="Critical">
        If your data is messy, your AI will confidently give you messy answers.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="The Five Questions" subtitle="Ask these for every data source">
      <div className="space-y-4">
        <Card className="p-4">
          <h4 className="font-bold text-blue-600">1. What is the atomic unit?</h4>
          <p className="text-sm text-gray-600 mt-1">What's the smallest meaningful piece you want to retrieve?</p>
          <ComparisonTable
            headers={["Data Type", "Atomic Unit", "Why"]}
            rows={[
              ["Transcripts", "Speaker turn", "Need speaker-level for 'what did customer say?'"],
              ["Documentation", "Section/paragraph", "Need topic-level for 'how do I configure X?'"],
              ["CRM records", "Row", "Structured lookup, no chunking needed"],
            ]}
          />
        </Card>

        <Card className="p-4">
          <h4 className="font-bold text-blue-600">2. What metadata travels with each unit?</h4>
          <p className="text-sm text-gray-600 mt-1">If you might filter by it or display it, store it.</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["speaker_name", "speaker_role", "meeting_date", "company_id", "transcript_id", "chunk_index"].map(m => (
              <div key={m} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <code className="bg-gray-100 px-1 rounded">{m}</code>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-bold text-blue-600">3. What's the source of truth?</h4>
          <p className="text-sm text-gray-600 mt-1">Where does this data come from? Can it be wrong?</p>
        </Card>

        <Card className="p-4">
          <h4 className="font-bold text-blue-600">4. What's missing that you wish you had?</h4>
          <p className="text-sm text-gray-600 mt-1">Don't boil the ocean — start with what you have, add enrichment later.</p>
        </Card>

        <Card className="p-4">
          <h4 className="font-bold text-blue-600">5. How does this data change over time?</h4>
          <p className="text-sm text-gray-600 mt-1">Append-only? Frequent updates? This affects your sync strategy.</p>
        </Card>
      </div>
    </ProgressiveSection>

    <ProgressiveSection number="3" title="The Speaker Attribution Problem" subtitle="Your biggest risk with transcripts">
      <Card className="p-4 bg-red-50 border-red-200">
        <p className="text-red-800">
          Your entire "what did the customer say?" capability depends on correct <code>speaker_role</code> assignment.
        </p>
      </Card>

      <DiagramBox title="The Chain of Trust">
        {`Transcription outputs: "John Smith: We're concerned..."
                              │
Your DB has:          "John Smith, Jane Doe" (leverage_team)
                              │
Matching determines:  speaker_role = 'customer' or 'leverege'
                              │
Retrieval filters:    WHERE speaker_role = 'customer'
                              │
User gets:            Only customer statements (hopefully)`}
      </DiagramBox>

      <h4 className="font-bold mt-4 mb-2">What Can Go Wrong</h4>
      <ComparisonTable
        headers={["Problem", "Example", "Result"]}
        rows={[
          ["Name mismatch", '"Jon Smith" vs "John Smith"', "Role = 'unknown'"],
          ["First name only", '"Julia" vs "Julia Conn"', "Need fuzzy matching"],
          ["Transcription error", '"Eric Con" vs "Eric Conn"', "Role = 'unknown'"],
          ["Guest speaker", "External consultant", "Not in either list"],
        ]}
      />

      <Callout type="success" title="Mitigation">
        Use fuzzy matching with a fallback to 'unknown'. Review 'unknown' chunks periodically
        to improve matching logic.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="4" title="How Metadata Prevents Hallucination" subtitle="Tags enable filtering, filtering enables accuracy">
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 border-red-200">
          <h4 className="font-bold text-red-600 mb-2">Without Metadata</h4>
          <p className="text-sm">
            System retrieves 5 chunks mentioning "pricing" — some from Leverege,
            some from customers. LLM mixes them up.
          </p>
        </Card>
        <Card className="p-4 border-green-200">
          <h4 className="font-bold text-green-600 mb-2">With Metadata</h4>
          <p className="text-sm">
            System retrieves 5 chunks WHERE speaker_role = 'customer'.
            LLM only sees customer statements with attribution.
          </p>
        </Card>
      </div>

      <Card className="p-4 mt-4 bg-emerald-50 border-emerald-200">
        <p className="font-semibold text-emerald-800">
          Metadata enables filtering → Filtering enables accuracy → Accuracy enables trust
        </p>
      </Card>
    </ProgressiveSection>
  </div>
);

const ArchitectureSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">Architecture: The Six Layers</h2>

    <Callout type="info" title="Before You Build">
      Building an agent isn't about picking tools first. Answer these questions BEFORE
      deciding on RAG, SQL, or any technology.
    </Callout>

    <div className="my-6">
      <h3 className="text-xl font-bold text-gray-900 mb-3">The Router Pattern: Decision Before Execution</h3>
      <p className="text-gray-700 mb-4">
        The core of any AI system is the router - it decides WHAT to do before doing it. This separates
        intent classification from execution, making the system predictable and debuggable.
      </p>
      <p className="text-gray-700">
        Think of it like a restaurant: the host decides which section you sit in based on your party size,
        BEFORE the waiter takes your order. The router is the host, the execution layer is the waiter.
      </p>
    </div>

    {/* Router Pattern Diagram */}
    <RouterPatternDiagram />

    <Card className="p-6 mb-6">
      <h3 className="font-bold mb-4">The Three Questions</h3>
      <ol className="list-decimal ml-6 space-y-2">
        <li className="font-semibold">What is my business need?</li>
        <li className="font-semibold">What is the shape of my data?</li>
        <li className="font-semibold">What are the constraints on my answers?</li>
      </ol>
    </Card>

    <h3 className="text-lg font-bold mb-2">The Six-Layer Stack (Build Bottom-Up)</h3>
    <SixLayerArchitecture />

    <div className="my-6">
      <h3 className="text-xl font-bold text-gray-900 mb-3">The Ingestion Pipeline: From Raw Data to Searchable Knowledge</h3>
      <p className="text-gray-700 mb-4">
        Before you can retrieve anything, you need to ingest it. This is where raw transcripts and documents
        become searchable, semantically-indexed knowledge.
      </p>
      <Callout type="warning" title="The Critical Principle">
        You can only retrieve what you've properly ingested. Bad ingestion = bad retrieval = bad answers.
        This is why ingestion is Layer 2 in the six-layer architecture - it's foundational.
      </Callout>
    </div>

    {/* Ingestion Pipeline Diagram */}
    <IngestionPipelineDiagram />

    <h3 className="text-xl font-bold mt-8 mb-4">Each Layer Explained</h3>

    {[
      {
        num: "1",
        title: "Database",
        subtitle: "The foundation everything builds on",
        content: (
          <>
            <p className="mb-4"><strong>What:</strong> Enable pgvector, create transcript_chunks table, add indexes.</p>
            <p className="mb-4"><strong>Why first:</strong> Everything else depends on this schema. Get it wrong, and you'll fight your data model forever.</p>
            <h5 className="font-bold mb-2">Decisions at this layer:</h5>
            <ul className="list-disc ml-6">
              <li>Chunk granularity (speaker turns)</li>
              <li>Metadata fields (speaker_role, meeting_date)</li>
              <li>Index strategy (ivfflat vs hnsw)</li>
            </ul>
          </>
        )
      },
      {
        num: "2",
        title: "Ingestion",
        subtitle: "Defines what's searchable",
        content: (
          <>
            <p className="mb-4"><strong>What:</strong> Convert transcripts → speaker turns → embeddings → DB rows.</p>
            <p className="mb-4"><strong>Why:</strong> You can't retrieve what you haven't stored.</p>
            <h5 className="font-bold mb-2">Decisions at this layer:</h5>
            <ul className="list-disc ml-6">
              <li>How to parse speaker turns</li>
              <li>How to assign speaker_role</li>
              <li>When to re-embed (new data, model upgrade)</li>
            </ul>
          </>
        )
      },
      {
        num: "3",
        title: "Retriever",
        subtitle: "Finding relevant chunks",
        content: (
          <>
            <p className="mb-4"><strong>What:</strong> Fetch relevant chunks based on query type.</p>
            <h5 className="font-bold mb-2">Key patterns:</h5>
            <ul className="list-disc ml-6 font-mono text-sm">
              <li>getLastMeetingChunks(companyId) → Pure SQL</li>
              <li>searchChunks(query, filters) → SQL + Vector</li>
              <li>countCompaniesWithTopic(embedding) → Aggregation</li>
            </ul>
            <Callout type="info" title="Contract">
              The retriever returns Chunk[], not raw database rows. This is the contract.
            </Callout>
          </>
        )
      },
      {
        num: "4",
        title: "Composer",
        subtitle: "Presenting with citations",
        content: (
          <>
            <p className="mb-4"><strong>What:</strong> Build a grounded prompt from retrieved chunks.</p>
            <h5 className="font-bold mb-2">Responsibilities:</h5>
            <ul className="list-disc ml-6">
              <li>Assemble context for LLM</li>
              <li>Enforce "cite or abstain" rule</li>
              <li>Format citations consistently</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              <strong>Why separate from retriever:</strong> Retrieval is about finding.
              Composition is about presenting. Different concerns.
            </p>
          </>
        )
      },
      {
        num: "5",
        title: "RAG Core",
        subtitle: "Orchestration and routing",
        content: (
          <>
            <p className="mb-4"><strong>What:</strong> Orchestrate retriever + composer based on query mode.</p>
            <ComparisonTable
              headers={["Mode", "Retriever Strategy", "Composer Strategy"]}
              rows={[
                ["last_meeting", "SQL temporal query", "Summarize chunks"],
                ["search", "Vector similarity", "Cite matching chunks"],
                ["concern", "Vector + role filter", "Extract concerns"],
              ]}
            />
            <p className="mt-4 text-sm text-gray-600">
              <strong>Why this layer:</strong> The caller (MCP) shouldn't know which retrieval
              strategy to use. RAG Core decides.
            </p>
          </>
        )
      },
      {
        num: "6",
        title: "MCP",
        subtitle: "The interface layer",
        content: (
          <>
            <p className="mb-4"><strong>What:</strong> Expose capabilities to Slack/LLM.</p>
            <p className="mb-4"><strong>Key principle:</strong> MCP knows what capabilities exist, not how they work.</p>
            <h5 className="font-bold mb-2">The capability absorbs:</h5>
            <ul className="list-disc ml-6">
              <li>Which retrieval strategy to use</li>
              <li>How to format the response</li>
              <li>Where the data comes from</li>
            </ul>
          </>
        )
      }
    ].map(layer => (
      <ProgressiveSection
        key={layer.num}
        number={layer.num}
        title={`Layer ${layer.num}: ${layer.title}`}
        subtitle={layer.subtitle}
      >
        {layer.content}
      </ProgressiveSection>
    ))}

    <Card className="p-6 mt-8 bg-amber-50 border-amber-200">
      <h3 className="font-bold text-amber-800 mb-4">Why Order Matters</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-red-600 mb-2">❌ Wrong Order</h4>
          <ol className="list-decimal ml-6 text-sm">
            <li>Build Slack bot</li>
            <li>Realize you need data</li>
            <li>Hack together retrieval</li>
            <li>Fight your schema</li>
            <li>Rewrite everything</li>
          </ol>
        </div>
        <div>
          <h4 className="font-bold text-green-600 mb-2">✓ Right Order</h4>
          <ol className="list-decimal ml-6 text-sm">
            <li>Define business questions</li>
            <li>Analyze data shape</li>
            <li>Design schema</li>
            <li>Build ingestion</li>
            <li>Build retriever → composer → MCP</li>
          </ol>
        </div>
      </div>
    </Card>

    {/* Thread Context Pattern */}
    <h3 className="text-xl font-bold mt-8 mb-4">Thread Context Pattern</h3>
    <ThreadContextDiagram />
  </div>
);

const DecisionsSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">When to Use What: SQL vs RAG vs Agentic AI</h2>

    <Callout type="insight" title="The Key Question">
      Not every question needs AI. The right approach depends on <strong>what you're asking</strong>
      and <strong>what kind of answer you need</strong>. Over-engineering is as bad as under-engineering.
    </Callout>

    <ProgressiveSection number="1" title="The Complexity Spectrum" subtitle="From simple to sophisticated" defaultOpen={true}>
      <p className="text-sm text-gray-600 mb-2">Choose the Simplest Approach That Works</p>
      <ComplexitySpectrum />

      <Callout type="warning" title="Golden Rule">
        <strong>Start with the simplest approach that answers the question.</strong>
        Only add complexity when simpler approaches fail.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="SQL Only" subtitle="When you need facts, not interpretation">
      <Card className="p-4 bg-blue-50 border-blue-200 mb-4">
        <h4 className="font-bold text-blue-800">Use SQL When:</h4>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• The answer is a <strong>fact</strong> that exists in a column</li>
          <li>• You need <strong>counts, lists, or aggregations</strong></li>
          <li>• The question maps directly to a <strong>database query</strong></li>
          <li>• <strong>No interpretation</strong> is needed</li>
        </ul>
      </Card>

      <ComparisonTable
        headers={["Question", "Why SQL", "Query Pattern"]}
        rows={[
          ['"When was our last meeting with TPI?"', "Date lookup", "ORDER BY date DESC LIMIT 1"],
          ['"How many meetings with Les Schwab?"', "Count", "COUNT(*) WHERE company = 'Les Schwab'"],
          ['"List all companies we met in Q4"', "Filtered list", "WHERE date BETWEEN ... GROUP BY company"],
          ['"Who attended the March 15 call?"', "Fact lookup", "SELECT participants WHERE date = ..."],
          ['"What products does Canadian Tire use?"', "Relationship lookup", "JOIN products ON ..."],
        ]}
      />

      <Callout type="success" title="SQL Advantages">
        <strong>Fast</strong> (milliseconds), <strong>deterministic</strong> (same query = same answer),
        <strong>no hallucination risk</strong>, <strong>cheapest</strong> (no LLM calls).
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="3" title="SQL + RAG (Hybrid)" subtitle="When you need to find AND filter">
      <Card className="p-4 bg-green-50 border-green-200 mb-4">
        <h4 className="font-bold text-green-800">Use SQL + RAG When:</h4>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• You need to <strong>search by meaning</strong> (semantic search)</li>
          <li>• AND <strong>filter by metadata</strong> (company, date, speaker role)</li>
          <li>• The answer is in the text but needs to be <strong>found first</strong></li>
        </ul>
      </Card>

      <ComparisonTable
        headers={["Question", "SQL Part", "RAG Part"]}
        rows={[
          ['"What did TPI\'s customer say about cameras?"', "WHERE company='TPI' AND role='customer'", "Vector search for 'cameras'"],
          ['"Find pricing discussions from last month"', "WHERE date > '2024-12-01'", "Vector search for 'pricing'"],
          ['"What concerns did customers raise in Q4?"', "WHERE role='customer' AND date IN Q4", "Vector search for 'concerns'"],
          ['"Show me what Les Schwab said about integration"', "WHERE company='Les Schwab'", "Vector search for 'integration'"],
        ]}
      />

      <SQLRagFlowDiagram />
    </ProgressiveSection>

    <ProgressiveSection number="4" title="RAG + LLM" subtitle="When you need interpretation or synthesis">
      <Card className="p-4 bg-purple-50 border-purple-200 mb-4">
        <h4 className="font-bold text-purple-800">Use RAG + LLM When:</h4>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• You need to <strong>summarize</strong> multiple chunks</li>
          <li>• You need to <strong>interpret</strong> or <strong>analyze</strong> content</li>
          <li>• The answer requires <strong>synthesis</strong> across sources</li>
          <li>• You need <strong>natural language output</strong></li>
        </ul>
      </Card>

      <ComparisonTable
        headers={["Question", "Why LLM Needed", "What LLM Does"]}
        rows={[
          ['"What is TPI\'s main concern?"', "Requires interpretation", "Analyzes chunks, identifies themes"],
          ['"Summarize our last meeting with Les Schwab"', "Requires summarization", "Condenses 50 chunks into summary"],
          ['"What\'s the sentiment around our pricing?"', "Requires judgment", "Assesses tone across mentions"],
          ['"Compare concerns across tire companies"', "Requires synthesis", "Finds patterns across multiple sources"],
        ]}
      />

      <Callout type="warning" title="LLM Adds Risk">
        Every LLM call adds: <strong>latency</strong> (1-5 seconds), <strong>cost</strong> ($0.01-0.10),
        and <strong>hallucination risk</strong>. Use grounding (cite or abstain) to mitigate.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="5" title="Agentic AI with Router" subtitle="When you need multi-step reasoning">
      <Card className="p-4 bg-amber-50 border-amber-200 mb-4">
        <h4 className="font-bold text-amber-800">Use Agentic AI When:</h4>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• The question requires <strong>multiple steps</strong> to answer</li>
          <li>• You need to <strong>chain tools together</strong></li>
          <li>• The AI needs to <strong>decide which tool to use</strong></li>
          <li>• You need <strong>autonomous decision-making</strong></li>
        </ul>
      </Card>

      <AgenticFlowDiagram />

      <h4 className="font-bold mt-4 mb-2">When You Need a Router</h4>
      <ComparisonTable
        headers={["Scenario", "Why Router", "Tools Chained"]}
        rows={[
          ["Complex research questions", "Multiple searches needed", "Search → Search → Compare"],
          ["Questions that span data sources", "Need to query multiple systems", "CRM → Transcripts → Combine"],
          ["Action + Information", "Need to do something with findings", "Search → Analyze → Send Email"],
          ["Ambiguous questions", "AI must interpret intent", "Classify → Route → Execute"],
        ]}
      />

      <Callout type="danger" title="Agentic AI is Complex">
        Agentic systems are <strong>harder to debug</strong>, <strong>more expensive</strong>,
        and <strong>less predictable</strong>. Only use when simpler approaches genuinely can't work.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="6" title="Decision Flowchart" subtitle="How to choose">
      <DiagramBox title="Follow This Decision Tree">
        {`START: What kind of question is it?
           │
           ▼
┌──────────────────────────────────────┐
│ Is the answer a fact in a column?    │
│ (date, count, list, lookup)          │
└──────────────────────────────────────┘
           │
     Yes ──┴── No
      │        │
      ▼        ▼
   ┌─────┐  ┌──────────────────────────────────────┐
   │ SQL │  │ Does it need semantic search?        │
   └─────┘  │ (find by meaning, not exact match)   │
            └──────────────────────────────────────┘
                       │
                 Yes ──┴── No
                  │        │
                  ▼        ▼
      ┌─────────────────┐  │
      │ Does it also    │  │
      │ need filtering? │  │
      │ (by company,    │  │
      │  date, role)    │  │
      └─────────────────┘  │
           │               │
     Yes ──┴── No          │
      │        │           │
      ▼        ▼           │
 ┌─────────┐ ┌─────┐       │
 │SQL + RAG│ │ RAG │       │
 └─────────┘ └─────┘       │
                           ▼
            ┌──────────────────────────────────────┐
            │ Does it need interpretation,         │
            │ summarization, or synthesis?         │
            └──────────────────────────────────────┘
                       │
                 Yes ──┴── No
                  │        │
                  ▼        ▼
            ┌───────────┐  │
            │ RAG + LLM │  │
            └───────────┘  │
                           ▼
            ┌──────────────────────────────────────┐
            │ Does it need multiple steps,         │
            │ tool chaining, or actions?           │
            └──────────────────────────────────────┘
                       │
                 Yes ──┴── No
                  │        │
                  ▼        ▼
            ┌───────────┐ ┌────────────────────────┐
            │ AGENTIC   │ │ Probably SQL or simple │
            │ + ROUTER  │ │ RAG — revisit question │
            └───────────┘ └────────────────────────┘`}
      </DiagramBox>
    </ProgressiveSection>

    <ProgressiveSection number="7" title="Real Examples from Leverege" subtitle="Mapping questions to approaches">
      <ComparisonTable
        headers={["Question", "Approach", "Why"]}
        rows={[
          ['"When was our last meeting with TPI?"', "SQL Only", "Date lookup, no interpretation"],
          ['"What did TPI say about cameras?"', "SQL + RAG", "Filter (TPI) + Search (cameras)"],
          ['"What\'s TPI\'s biggest concern?"', "RAG + LLM", "Needs interpretation of concerns"],
          ['"Summarize last meeting with TPI"', "RAG + LLM", "Needs summarization"],
          ['"How many companies mentioned pricing?"', "SQL + RAG", "Count + semantic filter"],
          ['"Compare tire companies\' feedback"', "RAG + LLM", "Multi-source synthesis"],
          ['"Find concerns and draft follow-up"', "Agentic", "Search + compose action chain"],
        ]}
      />
    </ProgressiveSection>

    <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 mt-6">
      <h3 className="font-bold text-lg mb-4">📋 Quick Reference</h3>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-bold text-blue-600 mb-2">Use SQL When:</h4>
          <ul className="space-y-1">
            <li>• Facts, dates, counts, lists</li>
            <li>• No interpretation needed</li>
            <li>• Speed and reliability critical</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-green-600 mb-2">Use SQL + RAG When:</h4>
          <ul className="space-y-1">
            <li>• Search by meaning + filter by metadata</li>
            <li>• "What did X say about Y?"</li>
            <li>• Need both precision and recall</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-purple-600 mb-2">Use RAG + LLM When:</h4>
          <ul className="space-y-1">
            <li>• Summarization or synthesis</li>
            <li>• Interpretation or analysis</li>
            <li>• Natural language output</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-amber-600 mb-2">Use Agentic + Router When:</h4>
          <ul className="space-y-1">
            <li>• Multi-step reasoning</li>
            <li>• Tool chaining required</li>
            <li>• Actions beyond just answering</li>
          </ul>
        </div>
      </div>
    </Card>
  </div>
);

const ImplementationSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">Implementation Details</h2>

    <ProgressiveSection number="1" title="Chunking: The Art of Splitting Documents" subtitle="The foundation of good retrieval" defaultOpen={true}>
      <Callout type="warning" title="The Tradeoff">
        Chunk too small → lose context. Chunk too large → retrieve irrelevant content.
      </Callout>

      <h4 className="font-bold mt-4 mb-3">Chunking by Speaker Turn (Best for Transcripts)</h4>
      <p className="text-gray-700 mb-3">
        Each time someone speaks becomes one chunk. This preserves:
      </p>
      <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
        <li><strong>Attribution</strong> - You know WHO said it</li>
        <li><strong>Context</strong> - Complete thoughts, not mid-sentence cuts</li>
        <li><strong>Metadata</strong> - Speaker role, company, date all stay attached</li>
      </ul>
      <p className="text-gray-700 mb-4">
        <strong>Example:</strong> "Alan from TPI mentioned cameras going offline" is one chunk.
        It's complete, attributable, and searchable.
      </p>

      <h4 className="font-bold mt-6 mb-3">Chunking by Paragraph (Best for Documents)</h4>
      <p className="text-gray-700 mb-3">
        Each paragraph becomes one chunk. This preserves:
      </p>
      <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
        <li><strong>Topic coherence</strong> - Paragraphs discuss one idea</li>
        <li><strong>Natural boundaries</strong> - Writers already chunked for you</li>
        <li><strong>Readability</strong> - Citations point to complete thoughts</li>
      </ul>

      <h4 className="font-bold mt-6 mb-3">The Overlap Strategy</h4>
      <p className="text-gray-700">
        Include 1-2 sentences of overlap between chunks to preserve context across boundaries.
        This prevents losing information that spans chunk edges.
      </p>

      <Callout type="info" title="Research Finding">
        Studies show <strong>200-500 token chunks</strong> with <strong>10-20% overlap</strong> work well
        for most use cases.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="Embeddings: Turning Text Into Searchable Vectors" subtitle="How semantic search works">
      <p className="text-gray-700 mb-4">
        <strong>What they are:</strong> Mathematical representations of meaning. Similar meanings = similar vectors.
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Why they matter:</strong> They enable semantic search. You can search for "pricing concerns"
        and find chunks that say "worried about cost" even though the words don't match.
      </p>

      <h4 className="font-bold mt-4 mb-3">The Key Decision: Which Embedding Model?</h4>
      <ComparisonTable
        headers={["Model Type", "Dimensions", "Speed", "Best For"]}
        rows={[
          ["Smaller models", "384-768", "Faster, cheaper", "Good enough for most cases"],
          ["Larger models", "1536-3072", "Slower, more expensive", "Higher accuracy needs"],
        ]}
      />

      <Callout type="success" title="Recommendation">
        Start small. Only upgrade if retrieval quality is poor. OpenAI text-embedding-3-small
        (1536 dimensions) is the sweet spot for most use cases.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="3" title="Retrieval: Finding the Right Chunks" subtitle="Two powerful patterns">
      <h4 className="font-bold mb-3">Pattern 1: Metadata Pre-filter + Vector Search (Recommended)</h4>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
        <p className="font-semibold text-blue-900 mb-2">Step 1: Use SQL to filter by metadata</p>
        <p className="text-sm text-blue-800">
          Filter by company, date, speaker role. This is fast and precise.
          Reduces 13,000 chunks to ~200.
        </p>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
        <p className="font-semibold text-purple-900 mb-2">Step 2: Use vector search within that filtered set</p>
        <p className="text-sm text-purple-800">
          Find semantic matches. Returns the 10 most relevant chunks.
        </p>
      </div>

      <Callout type="insight" title="Why This Works">
        You get the speed of SQL filtering with the intelligence of semantic search.
      </Callout>

      <h4 className="font-bold mt-6 mb-3">Pattern 2: Hybrid Search (Vector + Keywords)</h4>
      <p className="text-gray-700 mb-3">Combine two types of search:</p>
      <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
        <li><strong>Vector search</strong> - Finds semantic matches ("pricing concerns" matches "worried about cost")</li>
        <li><strong>Keyword search</strong> - Finds exact matches (catches specific product names, acronyms)</li>
      </ul>
      <p className="text-gray-700">
        <strong>Why this works:</strong> Some queries need exact matches (product codes),
        others need semantic understanding (concepts).
      </p>
    </ProgressiveSection>

    <ProgressiveSection number="4" title="Error Handling: When Things Go Wrong" subtitle="Graceful degradation">
      <h4 className="font-bold mb-3">Graceful Degradation</h4>
      <p className="text-gray-700 mb-3">If the fancy hybrid search fails, fall back to simpler approaches:</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">1</div>
          <span className="text-gray-700">Try hybrid search first</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">2</div>
          <span className="text-gray-700">If that fails, try vector-only search</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">3</div>
          <span className="text-gray-700">If that fails, try SQL-only search</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">4</div>
          <span className="text-gray-700">If that fails, return "I don't know"</span>
        </div>
      </div>

      <Callout type="success" title="The Principle">
        A simple answer is better than an error message.
      </Callout>

      <h4 className="font-bold mt-6 mb-3">Empty Results</h4>
      <p className="text-gray-700 mb-3">When no chunks are found:</p>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li><strong>Don't hallucinate</strong> - Say "I don't have information about that"</li>
        <li><strong>Suggest alternatives</strong> - "Try broadening your search" or "Check if the data has been ingested"</li>
        <li><strong>Log it</strong> - Empty results indicate missing data or bad queries</li>
      </ul>
    </ProgressiveSection>

    <ProgressiveSection number="5" title="Vector Database Options" subtitle="Where embeddings live">
      <ComparisonTable
        headers={["Option", "Best For", "Pros", "Cons"]}
        rows={[
          ["pgvector (Postgres)", "Already using Postgres", "SQL + vectors together, no new infra", "DIY indexing"],
          ["Pinecone", "Zero-ops needed", "Fully managed, fast", "Vendor lock-in, cost at scale"],
          ["Qdrant", "Self-hosted + cost conscious", "Free tier, good performance", "Self-managed"],
        ]}
      />

      <Callout type="info" title="For Leverege">
        Since you're already on GCP with Postgres, <strong>pgvector</strong> is the natural choice.
        You get SQL joins + vector search in one query.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="4" title="Hybrid Search & Reranking" subtitle="Improving retrieval quality">
      <p className="mb-4">
        Pure vector search can miss exact keyword matches. <strong>Hybrid search</strong> combines:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Dense retrieval</strong> (vector similarity) — finds semantically similar content</li>
        <li><strong>Sparse retrieval</strong> (BM25/keywords) — finds exact term matches</li>
      </ul>

      <DiagramBox title="Recommended Pipeline">
        {`Query → Hybrid Retrieval (Vector + BM25)
      → Reciprocal Rank Fusion
      → Reranking (optional)
      → Top-k Context to LLM`}
      </DiagramBox>

      <Callout type="warning" title="When to Add Reranking">
        Add reranking when you notice relevant chunks appearing at positions 8-15 instead of top-5.
        Don't add it prematurely — it adds latency and cost.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="5" title="Query Patterns" subtitle="Common retrieval patterns">
      <h4 className="font-bold mb-2">Decision Framework</h4>
      <ComparisonTable
        headers={["Question Type", "Strategy", "Example"]}
        rows={[
          ["Fact lookup", "Pure SQL", '"Last meeting" = ORDER BY date LIMIT 1'],
          ["Search/recall", "SQL + Vector", '"What did they say about X?"'],
          ["Insight/analysis", "Vector + LLM", '"What\'s their main concern?"'],
          ["Aggregation", "SQL", '"How many companies mentioned X?"'],
        ]}
      />
    </ProgressiveSection>
  </div>
);

const HostingSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">Hosting Your MCP Server</h2>

    <Callout type="info" title="Transport Protocol">
      Use <strong>Streamable HTTP</strong> for production deployments. It's stateless (enables serverless),
      replaced the deprecated SSE transport in March 2025, and works with all major cloud platforms.
    </Callout>

    <ProgressiveSection number="1" title="Cloud Run (Recommended for GCP)" subtitle="Serverless container hosting" defaultOpen={true}>
      <p className="mb-4">
        <strong>Google Cloud Run</strong> is ideal for MCP servers because:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Scale to zero when idle (cost efficient)</li>
        <li>Automatic HTTPS</li>
        <li>Native GCP IAM integration</li>
        <li>Supports Streamable HTTP transport</li>
      </ul>

      <ComparisonTable
        headers={["Configuration", "Recommendation", "Why"]}
        rows={[
          ["Min instances", "0 or 1", "0 = cheapest, 1 = no cold starts (~$8/mo)"],
          ["Startup CPU Boost", "Enable", "Reduces cold start by ~50% (free)"],
          ["Concurrency", "80 (default)", "Adjust based on memory usage"],
        ]}
      />

      <h4 className="font-bold mt-4 mb-2">Estimated Costs</h4>
      <p className="text-gray-600 text-sm">
        A workload handling 10M requests/month at 400ms average: ~$14/month
      </p>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="Other GCP Options" subtitle="When to use alternatives">
      <ComparisonTable
        headers={["Service", "When to Use", "Trade-offs"]}
        rows={[
          ["Cloud Run", "Most MCP servers", "Easy, serverless, cost-effective"],
          ["GKE Autopilot", "Complex, stateful, high-volume", "More control, more management"],
          ["Cloud Functions", "Simple, single-purpose tools", "Limited runtime, simpler"],
          ["Compute Engine", "Full control needed", "You manage everything"],
        ]}
      />
    </ProgressiveSection>

    <ProgressiveSection number="3" title="Cloud-Agnostic Options" subtitle="Non-GCP alternatives">
      <ComparisonTable
        headers={["Platform", "Strengths", "Best For"]}
        rows={[
          ["Railway", "Simple deployment, good DX", "Rapid prototyping"],
          ["Render", "Easy from GitHub", "Small teams"],
          ["Fly.io", "Edge deployment, low latency", "Global distribution"],
          ["AWS Lambda + API Gateway", "AWS ecosystem", "AWS-native shops"],
        ]}
      />
    </ProgressiveSection>

    <ProgressiveSection number="4" title="Security Requirements" subtitle="OAuth 2.1 is mandatory">
      <Callout type="danger" title="Required for Production">
        Production MCP deployments <strong>must implement OAuth 2.1 with PKCE</strong> for HTTP-based
        transports. This became mandatory in the March 2025 specification.
      </Callout>

      <h4 className="font-bold mt-4 mb-2">Key Security Practices</h4>
      <ul className="list-disc ml-6">
        <li><strong>Never store secrets in environment variables</strong> — use Secret Manager</li>
        <li>Delegate authentication to Auth0, Okta, or Keycloak</li>
        <li>Validate token issuer, audience, and expiration on every request</li>
        <li>Implement audit logging for all authentication failures</li>
      </ul>
    </ProgressiveSection>
  </div>
);

const ZapierSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">Zapier MCP: When to Use It</h2>

    <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
      <h3 className="font-bold text-lg mb-2">What is Zapier MCP?</h3>
      <p className="text-gray-700">
        Zapier MCP is a <strong>fully-managed cloud MCP server</strong> that connects AI assistants
        to 8,000+ apps and 30,000+ actions. Setup takes minutes instead of months.
      </p>
    </Card>

    <ProgressiveSection number="1" title="How It Works" subtitle="Natural language to API calls" defaultOpen={true}>
      <DiagramBox>
        {`User: "Create a task in Asana for reviewing Q3 report"
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│  Zapier's Prompt Resolution Engine                  │
│  → Understands intent                               │
│  → Maps to correct API call                         │
│  → Handles authentication                           │
└─────────────────────────────────────────────────────┘
                    │
                    ▼
            Asana API: Task Created`}
      </DiagramBox>

      <h4 className="font-bold mt-4 mb-2">Pricing</h4>
      <p className="text-gray-600">
        Each MCP tool call = <strong>2 Zapier tasks</strong>. On Free tier (100 tasks/month),
        that's ~50 MCP calls. Team plans ($69/month) include 2,000+ tasks (~1,000 MCP calls).
      </p>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="Zapier MCP Strengths" subtitle="When it makes sense">
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { title: "8,000+ App Integrations", desc: "Pre-built connections to everything" },
          { title: "Zero Backend Code", desc: "Setup in minutes, not months" },
          { title: "Built-in Security", desc: "OAuth, rate limits, SOC 2 compliance" },
          { title: "Great for Ops Teams", desc: "No developers required" },
        ].map((item, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
          </Card>
        ))}
      </div>
    </ProgressiveSection>

    <ProgressiveSection number="3" title="Zapier MCP Limitations" subtitle="When to build custom">
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { title: "No Semantic Search", desc: "Actions only, not vector search" },
          { title: "No Direct SQL", desc: "Can't write custom database queries" },
          { title: "Can't Tune AI Prompts", desc: "Zapier controls the prompt logic" },
          { title: "Cost at Scale", desc: "2 tasks per call adds up" },
        ].map((item, i) => (
          <Card key={i} className="p-4 border-red-200">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
          </Card>
        ))}
      </div>
    </ProgressiveSection>

    <ProgressiveSection number="4" title="Decision Matrix" subtitle="Build vs Buy">
      <ComparisonTable
        headers={["Requirement", "Zapier MCP", "Custom MCP"]}
        rows={[
          ["Standard SaaS integrations (Slack, Gmail, CRMs)", "✅ Perfect", "Overkill"],
          ["Semantic search over documents", "❌ Not supported", "✅ Required"],
          ["Complex SQL queries", "❌ Not supported", "✅ Required"],
          ["Custom AI prompt behavior", "❌ Limited", "✅ Full control"],
          ["Proprietary systems", "❌ Unless Zapier has integration", "✅ Build your own"],
          ["Rapid prototyping", "✅ Minutes to deploy", "Days/weeks"],
          ["High volume (1000s of calls/day)", "💰 Expensive", "✅ More economical"],
        ]}
      />

      <Callout type="success" title="The Hybrid Approach">
        Many organizations use <strong>both</strong>: Zapier MCP for standard SaaS automation,
        custom MCP servers for semantic search and proprietary systems.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="5" title="Good Use Cases for Zapier MCP" subtitle="When it shines">
      <ul className="space-y-2">
        {[
          "Create tasks in project management tools (Asana, Trello, Jira)",
          "Send messages to Slack or Teams",
          "Create calendar events and send invites",
          "Add rows to Google Sheets or Airtable",
          "Create or update CRM records (Salesforce, HubSpot)",
          "Send emails via Gmail or Outlook"
        ].map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            {item}
          </li>
        ))}
      </ul>
    </ProgressiveSection>
  </div>
);

const PlanningSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">Planning & Estimates</h2>

    <Callout type="warning" title="About Costs">
      Specific prices change frequently (OpenAI has dropped embedding prices 5x since 2023).
      This section focuses on <strong>cost structure</strong> and <strong>order of magnitude</strong>.
      Always check current pricing before budgeting.
    </Callout>

    <ProgressiveSection number="1" title="Timeline by Layer" subtitle="Rough effort estimates" defaultOpen={true}>
      <p className="mb-4 text-gray-600">
        These estimates assume a small team (1-2 people) with some technical experience,
        using AI assistance for implementation. Your mileage may vary.
      </p>

      <ComparisonTable
        headers={["Layer", "First Time", "With Experience", "What Takes Time"]}
        rows={[
          ["1. Database Schema", "2-3 days", "1 day", "Deciding on metadata fields, indexes"],
          ["2. Ingestion Pipeline", "1-2 weeks", "3-5 days", "Parsing, speaker attribution, edge cases"],
          ["3. Retriever", "1 week", "2-3 days", "Query patterns, testing retrieval quality"],
          ["4. Composer", "3-5 days", "1-2 days", "Prompt engineering, citation formatting"],
          ["5. RAG Core", "1 week", "3-5 days", "Mode routing, orchestration logic"],
          ["6. MCP Interface", "1 week", "2-3 days", "API design, auth, deployment"],
        ]}
      />

      <Card className="p-4 bg-blue-50 border-blue-200 mt-4">
        <h4 className="font-bold text-blue-800">Total Estimate: 6-10 weeks (first time) → 3-4 weeks (experienced)</h4>
        <p className="text-sm text-blue-700 mt-1">
          This is for a complete, production-ready system. A rough prototype can be done in 1-2 weeks,
          but don't confuse a prototype with production-ready.
        </p>
      </Card>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="Cost Structure" subtitle="What costs money and how to think about it">
      <p className="mb-4 text-gray-600">
        Understanding the cost structure helps you make trade-offs and avoid surprises.
      </p>

      <div className="space-y-4">
        <Card className="p-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Database (Fixed Monthly)
          </h4>
          <p className="text-sm text-gray-600 mt-2">
            Your Postgres instance runs whether you use it or not. Cost depends on size, not usage.
          </p>
          <div className="mt-2 text-sm">
            <p><strong>Order of magnitude:</strong> $10-50/month for small, $100-500/month for production</p>
            <p className="text-gray-500">Check: Cloud SQL pricing, Supabase pricing, or your existing infra</p>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <Box className="w-5 h-5 text-purple-600" />
            Embeddings (One-Time + Incremental)
          </h4>
          <p className="text-sm text-gray-600 mt-2">
            You pay to convert text → vectors. Pay once for initial data, then only for new data.
          </p>
          <div className="mt-2 text-sm">
            <p><strong>Order of magnitude:</strong> Cents to embed thousands of chunks, dollars for millions</p>
            <p className="text-gray-500">Check: OpenAI embeddings pricing, Vertex AI pricing</p>
          </div>
          <Callout type="success" title="Good News">
            For ~13k transcript chunks, embedding costs are negligible — likely under $1.
          </Callout>
        </Card>

        <Card className="p-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <Brain className="w-5 h-5 text-amber-600" />
            LLM Calls (Per Query)
          </h4>
          <p className="text-sm text-gray-600 mt-2">
            Every time you ask the AI to summarize, analyze, or synthesize, you pay for tokens.
          </p>
          <div className="mt-2 text-sm">
            <p><strong>Order of magnitude:</strong> $0.01-0.10 per query (depending on context size and model)</p>
            <p className="text-gray-500">Check: OpenAI API pricing, Anthropic pricing, Vertex AI pricing</p>
          </div>
          <Callout type="warning" title="This Scales with Usage">
            100 queries/day × $0.05 = $5/day = $150/month. Plan accordingly.
          </Callout>
        </Card>

        <Card className="p-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-green-600" />
            Hosting (Fixed or Usage-Based)
          </h4>
          <p className="text-sm text-gray-600 mt-2">
            Where your MCP server runs. Serverless = pay per request. Always-on = fixed monthly.
          </p>
          <div className="mt-2 text-sm">
            <p><strong>Order of magnitude:</strong> $0-20/month for low traffic, $50-200/month for production</p>
            <p className="text-gray-500">Check: Cloud Run pricing, your GCP billing dashboard</p>
          </div>
        </Card>
      </div>
    </ProgressiveSection>

    <ProgressiveSection number="3" title="Cost Optimization Strategies" subtitle="How to keep costs down">
      <div className="space-y-3">
        {[
          {
            strategy: "Use SQL when possible",
            why: "SQL queries are essentially free. Only use LLM when you need interpretation.",
            savings: "Can reduce LLM calls by 50-70%"
          },
          {
            strategy: "Cache common queries",
            why: "If many users ask similar questions, cache the answers.",
            savings: "Depends on query patterns — can be significant"
          },
          {
            strategy: "Use smaller models for simple tasks",
            why: "Don't use GPT-4 for formatting. Use cheaper models for simple extraction.",
            savings: "10-50x cost difference between models"
          },
          {
            strategy: "Limit context size",
            why: "More tokens = more cost. Retrieve fewer, more relevant chunks.",
            savings: "Linear with context reduction"
          },
          {
            strategy: "Batch embedding updates",
            why: "Re-embed weekly, not on every new transcript.",
            savings: "Reduces API calls, minimal impact on freshness"
          },
        ].map((item, i) => (
          <Card key={i} className="p-4">
            <h4 className="font-bold text-gray-800">{item.strategy}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.why}</p>
            <p className="text-sm text-green-600 mt-1">💰 {item.savings}</p>
          </Card>
        ))}
      </div>
    </ProgressiveSection>

    <ProgressiveSection number="4" title="Phased Rollout" subtitle="How to de-risk the project">
      <p className="mb-4 text-gray-600">
        Don't try to build everything at once. Here's a sensible phasing:
      </p>

      <div className="space-y-4">
        <Card className="p-4 border-l-4 border-blue-500">
          <h4 className="font-bold">Phase 1: Prove the Value (2-3 weeks)</h4>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            <li>• Pick ONE high-value question (e.g., "Summarize last meeting with X")</li>
            <li>• Build minimal pipeline: ingest → embed → retrieve → answer</li>
            <li>• Test with real users, get feedback</li>
            <li>• <strong>Goal:</strong> Prove the approach works before investing more</li>
          </ul>
        </Card>

        <Card className="p-4 border-l-4 border-purple-500">
          <h4 className="font-bold">Phase 2: Expand Coverage (3-4 weeks)</h4>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            <li>• Add more question types from your business case</li>
            <li>• Improve retrieval quality based on Phase 1 learnings</li>
            <li>• Add metadata filtering (speaker role, date ranges)</li>
            <li>• <strong>Goal:</strong> Cover the top 5 questions from business case</li>
          </ul>
        </Card>

        <Card className="p-4 border-l-4 border-amber-500">
          <h4 className="font-bold">Phase 3: Production Hardening (2-3 weeks)</h4>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            <li>• Add authentication, rate limiting</li>
            <li>• Set up monitoring and logging</li>
            <li>• Create golden test set, run evaluations</li>
            <li>• <strong>Goal:</strong> Ready for broader team usage</li>
          </ul>
        </Card>

        <Card className="p-4 border-l-4 border-green-500">
          <h4 className="font-bold">Phase 4: Scale & Iterate (Ongoing)</h4>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            <li>• Roll out to more users</li>
            <li>• Add new capabilities based on feedback</li>
            <li>• Optimize costs based on usage patterns</li>
            <li>• <strong>Goal:</strong> Continuous improvement</li>
          </ul>
        </Card>
      </div>
    </ProgressiveSection>

    <ProgressiveSection number="5" title="Where to Check Current Prices" subtitle="Bookmark these">
      <div className="grid md:grid-cols-2 gap-3">
        {[
          { name: "OpenAI API Pricing", url: "https://openai.com/pricing", for: "Embeddings, GPT models" },
          { name: "Anthropic Pricing", url: "https://www.anthropic.com/pricing", for: "Claude models" },
          { name: "Google Cloud Run", url: "https://cloud.google.com/run/pricing", for: "Serverless hosting" },
          { name: "Cloud SQL Pricing", url: "https://cloud.google.com/sql/pricing", for: "Managed Postgres" },
          { name: "Vertex AI Pricing", url: "https://cloud.google.com/vertex-ai/pricing", for: "Google embeddings/models" },
          { name: "Zapier Pricing", url: "https://zapier.com/pricing", for: "Zapier MCP tasks" },
        ].map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-600">{item.name}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{item.for}</p>
          </a>
        ))}
      </div>
    </ProgressiveSection>

    <Card className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 mt-6">
      <h3 className="font-bold text-lg mb-4">📋 Quick Planning Checklist</h3>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-bold text-gray-700 mb-2">Before Starting:</h4>
          <ul className="space-y-1">
            {[
              "Business case documented",
              "Top 5 questions defined",
              "Success metrics agreed",
              "Data access confirmed",
              "Budget range approved"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 border border-gray-400 rounded" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-700 mb-2">Phase 1 Exit Criteria:</h4>
          <ul className="space-y-1">
            {[
              "One question working end-to-end",
              "3+ users have tested it",
              "Feedback collected",
              "Costs measured (not estimated)",
              "Go/no-go decision made"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 border border-gray-400 rounded" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  </div>
);

const EvaluationSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">Evaluation: How to Know It's Working</h2>

    <Callout type="warning" title="Key Stat">
      Stanford's 2024 legal AI study found even purpose-built RAG tools hallucinate
      <strong> 17-33% of the time</strong>. Evaluation is essential, not optional.
    </Callout>

    <ProgressiveSection number="1" title="The RAGAS Framework: Measuring RAG Quality" subtitle="Industry-standard evaluation metrics" defaultOpen={true}>
      <p className="mb-4 text-gray-700">
        RAGAS provides four metrics for evaluating RAG systems. Think of them as a health check.
      </p>

      <div className="space-y-4 mb-6">
        <Card className="p-5 border-l-4 border-blue-500">
          <h4 className="font-bold text-blue-900 mb-2">1. Context Precision: Did we retrieve the RIGHT chunks?</h4>
          <p className="text-sm text-gray-700 mb-3">
            <strong>The question:</strong> Of the chunks we retrieved, how many were actually relevant?
          </p>
          <p className="text-sm text-gray-700 mb-3">
            <strong>Why it matters:</strong> Low precision means you're wasting context window space on irrelevant chunks.
            The LLM has to sift through noise.
          </p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-900"><strong>Target:</strong> &gt;80% of retrieved chunks should be relevant</p>
            <p className="text-sm text-red-700 mt-1"><strong>Red flag:</strong> Retrieving chunks from the wrong company or time period</p>
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-purple-500">
          <h4 className="font-bold text-purple-900 mb-2">2. Context Recall: Did we retrieve ALL the relevant chunks?</h4>
          <p className="text-sm text-gray-700 mb-3">
            <strong>The question:</strong> Of all the relevant chunks that exist, how many did we find?
          </p>
          <p className="text-sm text-gray-700 mb-3">
            <strong>Why it matters:</strong> Low recall means you're missing information. The answer will be incomplete.
          </p>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm text-purple-900"><strong>Target:</strong> &gt;70% of relevant chunks should be retrieved</p>
            <p className="text-sm text-red-700 mt-1"><strong>Red flag:</strong> User asks about a topic you know exists in the data, but nothing is retrieved</p>
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-green-500">
          <h4 className="font-bold text-green-900 mb-2">3. Faithfulness: Is the answer grounded in the retrieved chunks?</h4>
          <p className="text-sm text-gray-700 mb-3">
            <strong>The question:</strong> Can every claim in the answer be traced back to a retrieved chunk?
          </p>
          <p className="text-sm text-gray-700 mb-3">
            <strong>Why it matters:</strong> This measures hallucination. If the answer includes information not in the chunks, it's made up.
          </p>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-900"><strong>Target:</strong> &gt;90% of claims should be supported by chunks</p>
            <p className="text-sm text-red-700 mt-1"><strong>Red flag:</strong> Answer includes specific details (dates, names, numbers) not in any chunk</p>
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-amber-500">
          <h4 className="font-bold text-amber-900 mb-2">4. Answer Relevance: Does the answer actually address the question?</h4>
          <p className="text-sm text-gray-700 mb-3">
            <strong>The question:</strong> Is the answer on-topic and helpful?
          </p>
          <p className="text-sm text-gray-700 mb-3">
            <strong>Why it matters:</strong> You can retrieve the right chunks but still generate an unhelpful answer.
          </p>
          <div className="bg-amber-50 p-3 rounded-lg">
            <p className="text-sm text-amber-900"><strong>Target:</strong> High semantic similarity between question and answer</p>
            <p className="text-sm text-red-700 mt-1"><strong>Red flag:</strong> User asks about pricing, answer talks about features</p>
          </div>
        </Card>
      </div>

      <Callout type="info" title="Key Insight">
        <strong>Faithfulness</strong> is your most important metric. A low faithfulness score
        means the AI is making claims not supported by your data — hallucinations.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="Creating a Golden Test Set" subtitle="Your benchmark for quality">
      <p className="mb-4 text-gray-700">
        A golden test set is a curated collection of questions with known correct answers. It's your benchmark.
      </p>

      <h4 className="font-bold mb-3">What to Include:</h4>
      <div className="space-y-3 mb-6">
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="font-semibold text-green-900">Easy questions - Should always work</p>
          <ul className="text-sm text-green-800 mt-2 space-y-1">
            <li>• "When was our last meeting with TPI?"</li>
            <li>• "How many meetings with Les Schwab?"</li>
          </ul>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="font-semibold text-blue-900">Medium questions - Should work most of the time</p>
          <ul className="text-sm text-blue-800 mt-2 space-y-1">
            <li>• "What did TPI say about cameras?"</li>
            <li>• "What concerns did customers raise in Q4?"</li>
          </ul>
        </Card>

        <Card className="p-4 bg-purple-50 border-purple-200">
          <p className="font-semibold text-purple-900">Hard questions - Stretch goals</p>
          <ul className="text-sm text-purple-800 mt-2 space-y-1">
            <li>• "Compare TPI and Les Schwab's feedback on integration"</li>
            <li>• "What patterns do you see in customer concerns?"</li>
          </ul>
        </Card>
      </div>

      <h4 className="font-bold mb-3">How to Use It:</h4>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">1</div>
          <span className="text-gray-700"><strong>Baseline</strong> - Run the test set, record scores</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">2</div>
          <span className="text-gray-700"><strong>Make changes</strong> - Improve chunking, prompts, retrieval</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">3</div>
          <span className="text-gray-700"><strong>Re-test</strong> - Did scores improve or degrade?</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">4</div>
          <span className="text-gray-700"><strong>Track over time</strong> - Are you getting better?</span>
        </div>
      </div>

      <Callout type="success" title="The Principle">
        You can't improve what you don't measure. Run these tests after every major change.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="3" title="Three Validation Types" subtitle="Retrieval, Grounding, and Trust">
      <div className="space-y-4">
        <Card className="p-4">
          <h4 className="font-bold text-blue-600">1. Retrieval Quality</h4>
          <p className="text-sm text-gray-600">"Did the system find the right chunks?"</p>
          <p className="text-sm mt-2">Ask a question, look at what chunks were retrieved. Are they relevant?</p>
        </Card>

        <Card className="p-4">
          <h4 className="font-bold text-blue-600">2. Grounding Quality</h4>
          <p className="text-sm text-gray-600">"Did the answer actually come from the chunks?"</p>
          <p className="text-sm mt-2">Compare the answer to retrieved chunks. Can you trace every claim?</p>
        </Card>

        <Card className="p-4">
          <h4 className="font-bold text-blue-600">3. User Trust</h4>
          <p className="text-sm text-gray-600">"Does BD/Product believe the answers?"</p>
          <p className="text-sm mt-2">This is the real metric. If they don't trust it, the system failed.</p>
        </Card>
      </div>
    </ProgressiveSection>

    <ProgressiveSection number="4" title="When Things Go Wrong" subtitle="Debug flow">
      <ol className="space-y-3">
        {[
          { step: "What question was asked?", check: "Check MCP logs" },
          { step: "What mode did RAG Core choose?", check: "Should it have been 'last_meeting' vs 'search'?" },
          { step: "What chunks were retrieved?", check: "Wrong chunks = retrieval problem" },
          { step: "What prompt was sent to the LLM?", check: "Was grounding clear? Citations enforced?" },
          { step: "What did the LLM return?", check: "Did it ignore grounding?" },
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {i + 1}
            </span>
            <div>
              <p className="font-medium">{item.step}</p>
              <p className="text-sm text-gray-600">{item.check}</p>
            </div>
          </li>
        ))}
      </ol>

      <Callout type="insight" title="Key Insight">
        Most "AI errors" are actually <strong>retrieval errors</strong> or <strong>prompt errors</strong>,
        not LLM errors. Debug those first.
      </Callout>
    </ProgressiveSection>
  </div>
);

const ResourcesSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>

    <ProgressiveSection number="1" title="Official Documentation" subtitle="Start here" defaultOpen={true}>
      <ResourceLink
        title="Model Context Protocol Official Docs"
        url="https://modelcontextprotocol.io/"
        description="The canonical specification and getting started guides"
      />
      <ResourceLink
        title="Anthropic MCP Course"
        url="https://anthropic.skilljar.com/introduction-to-model-context-protocol"
        description="Free official course on building MCP servers and clients"
      />
      <ResourceLink
        title="Hugging Face MCP Course"
        url="https://huggingface.co/learn/mcp-course"
        description="Community course with hands-on assignments"
      />
    </ProgressiveSection>

    <ProgressiveSection number="2" title="Tutorials & Guides" subtitle="Learn by building">
      <ResourceLink
        title="Microsoft MCP for Beginners"
        url="https://github.com/microsoft/mcp-for-beginners"
        description="Structured curriculum with examples in Python, TypeScript, and more"
      />
      <ResourceLink
        title="DataCamp MCP Tutorial"
        url="https://www.datacamp.com/tutorial/mcp-model-context-protocol"
        description="Build a PR review system with MCP"
      />
      <ResourceLink
        title="15 Best Practices for MCP Servers"
        url="https://thenewstack.io/15-best-practices-for-building-mcp-servers-in-production/"
        description="Production-ready patterns and practices"
      />
    </ProgressiveSection>

    <ProgressiveSection number="3" title="RAG & Evaluation" subtitle="Grounding and testing">
      <ResourceLink
        title="RAGAS Documentation"
        url="https://docs.ragas.io"
        description="Official docs for RAG evaluation metrics"
      />
      <ResourceLink
        title="Qdrant RAG Evaluation Guide"
        url="https://qdrant.tech/blog/rag-evaluation-guide/"
        description="Comprehensive guide to evaluating RAG systems"
      />
      <ResourceLink
        title="DeepEval Framework"
        url="https://github.com/confident-ai/deepeval"
        description="Open-source LLM evaluation framework"
      />
    </ProgressiveSection>

    <ProgressiveSection number="4" title="Zapier MCP" subtitle="Managed MCP solution">
      <ResourceLink
        title="Zapier MCP Documentation"
        url="https://docs.zapier.com/mcp/home"
        description="Official Zapier MCP setup and usage guides"
      />
      <ResourceLink
        title="Zapier MCP Blog Guide"
        url="https://zapier.com/blog/zapier-mcp-guide/"
        description="Detailed walkthrough of Zapier MCP capabilities"
      />
    </ProgressiveSection>

    <Card className="overflow-hidden mt-8">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-400" />
          Quick Reference: One-Page Summary
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Mental Model */}
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-purple-400 font-bold text-sm mb-3">THE MENTAL MODEL</h4>
            <div className="space-y-1 text-sm">
              <p className="text-gray-300">Prompts <span className="text-purple-300">explain</span></p>
              <p className="text-gray-300">Capabilities <span className="text-blue-300">execute</span></p>
              <p className="text-gray-300">Contracts <span className="text-cyan-300">constrain</span></p>
              <p className="text-gray-300">MCP <span className="text-emerald-300">orchestrates</span></p>
            </div>
          </div>

          {/* Three Questions */}
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-blue-400 font-bold text-sm mb-3">THE THREE QUESTIONS</h4>
            <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
              <li>What is my business need?</li>
              <li>What is the shape of my data?</li>
              <li>What are the constraints?</li>
            </ol>
          </div>

          {/* Six Layers */}
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-green-400 font-bold text-sm mb-3">THE SIX LAYERS (build bottom-up)</h4>
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between text-gray-300">
                <span>6. MCP</span><span className="text-gray-500">Capabilities, contracts</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>5. RAG Core</span><span className="text-gray-500">Orchestration, modes</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>4. Composer</span><span className="text-gray-500">Prompts, citations</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>3. Retriever</span><span className="text-gray-500">SQL + vector</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>2. Ingestion</span><span className="text-gray-500">Chunking, embeddings</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>1. Database</span><span className="text-gray-500">Schema, indexes</span>
              </div>
            </div>
          </div>

          {/* Golden Rules */}
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-amber-400 font-bold text-sm mb-3">THE GOLDEN RULES</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-amber-400">•</span> Cite or abstain (never hallucinate)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">•</span> Capabilities return responses, not objects
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">•</span> RAG is a cache, not a database
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">•</span> The AI knows concepts, not tables
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">•</span> Debug retrieval before blaming LLM
              </li>
            </ul>
          </div>

          {/* Decision Framework */}
          <div className="md:col-span-2 bg-white/5 rounded-lg p-4">
            <h4 className="text-cyan-400 font-bold text-sm mb-3">WHEN TO USE WHAT</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-green-500/20 rounded p-2 text-center">
                <div className="font-bold text-green-300">SQL Only</div>
                <div className="text-gray-400">Facts, counts, lookups</div>
              </div>
              <div className="bg-blue-500/20 rounded p-2 text-center">
                <div className="font-bold text-blue-300">SQL + RAG</div>
                <div className="text-gray-400">Search + filter</div>
              </div>
              <div className="bg-purple-500/20 rounded p-2 text-center">
                <div className="font-bold text-purple-300">RAG + LLM</div>
                <div className="text-gray-400">Analysis, synthesis</div>
              </div>
              <div className="bg-amber-500/20 rounded p-2 text-center">
                <div className="font-bold text-amber-300">Agentic</div>
                <div className="text-gray-400">Multi-step, tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

// ============================================
// MAIN APP
// ============================================

export default function AgenticAIGuide() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewSection />;
      case 'mindset': return <MindsetSection />;
      case 'businesscase': return <BusinessCaseSection />;
      case 'concepts': return <ConceptsSection />;
      case 'data': return <DataShapeSection />;
      case 'architecture': return <ArchitectureSection />;
      case 'decisions': return <DecisionsSection />;
      case 'promptengineering': return <PromptEngineeringSection />;
      case 'modelselection': return <ModelSelectionSection />;
      case 'implementation': return <ImplementationSection />;
      case 'debugging': return <DebuggingSection />;
      case 'hosting': return <HostingSection />;
      case 'zapier': return <ZapierSection />;
      case 'planning': return <PlanningSection />;
      case 'evaluation': return <EvaluationSection />;
      case 'resources': return <ResourcesSection />;
      default: return <OverviewSection />;
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:relative lg:flex-shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div
          className="h-full lg:sticky lg:top-0 overflow-y-auto flex flex-col"
          style={{
            background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          }}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-xl">LEVEREGE</span>
                <span className="text-purple-400 font-bold text-lg">AI</span>
              </div>
              {/* Close button for mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-3">MCP & RAG Implementation Guide</p>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 flex-1 overflow-y-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-base font-medium
                  transition-all duration-200 mb-2
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white hover:translate-x-1'
                  }
                `}
              >
                <tab.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate text-left">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-gray-400 text-center">
              Built for Ops Teams
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        {/* Mobile Header with Hamburger */}
        <div
          className="lg:hidden sticky top-0 z-30 px-4 py-3 flex items-center gap-3"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Open navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">LEVEREGE</span>
            <span className="text-purple-400 font-bold text-sm">AI</span>
          </div>
        </div>

        {/* Desktop Header */}
        <div
          className="hidden lg:block relative text-white py-8 px-8"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(100, 100, 255, 0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(100, 100, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">MCP & RAG Implementation Guide</h1>
            <p className="text-blue-200">
              Understand what you're building and why — then use AI to help with how.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-12 max-w-6xl mx-auto bg-gray-50 min-h-screen">
          <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
            {renderContent()}
          </div>
        </div>

        {/* Footer */}
        <div
          className="py-6 px-4 mt-8"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-blue-200 text-sm">Built for Leverege Ops Teams</p>
            <p className="text-slate-400 text-xs mt-1">
              Understand what you're building and why — then use AI to help with how.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
