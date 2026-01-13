import React, { useState } from 'react';
import { BookOpen, Database, Layers, Brain, AlertTriangle, CheckCircle, Search, Settings, ChevronRight, ChevronDown, Lightbulb, Target, Zap, Shield, Eye, RefreshCw, HelpCircle, ArrowRight, Box, GitBranch, Server, Cloud, Code, FileText, Users, Gauge, ExternalLink, Play, Pause, RotateCcw } from 'lucide-react';

// ============================================
// REUSABLE COMPONENTS
// ============================================

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const Callout = ({ type = "info", title, children }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    insight: "bg-purple-50 border-purple-200 text-purple-800",
    danger: "bg-red-50 border-red-200 text-red-800"
  };
  const icons = {
    info: <Lightbulb className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    insight: <Brain className="w-5 h-5" />,
    danger: <Shield className="w-5 h-5" />
  };
  return (
    <div className={`p-4 rounded-xl border-l-4 ${styles[type]} my-4`}>
      <div className="flex items-center gap-2 font-semibold mb-2">
        {icons[type]}
        {title}
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
};

const ProgressiveSection = ({ number, title, subtitle, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl my-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold">
          {number}
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {isOpen ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && <div className="px-6 pb-6 border-t border-gray-100 pt-4">{children}</div>}
    </div>
  );
};

const ComparisonTable = ({ headers, rows }) => (
  <div className="overflow-x-auto my-4 rounded-lg border border-gray-200">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50">
          {headers.map((h, i) => (
            <th key={i} className="px-4 py-3 text-left font-semibold border-b">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 border-b">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DiagramBox = ({ children, title }) => (
  <div className="my-4">
    {title && <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>}
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed">
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
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              showResult 
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
  <div className="space-y-6">
    <div className="text-center py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">MCP & RAG Implementation Guide</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        A comprehensive guide for ops teams to understand, plan, and implement AI agent infrastructure.
        <strong> Understand what you're building and why — then use AI to help with how.</strong>
      </p>
    </div>

    <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <h2 className="font-bold text-lg mb-4">🎯 What This Guide Will Help You Do</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
          <div>
            <p className="font-medium">Understand MCP Architecture</p>
            <p className="text-sm text-gray-600">How AI agents connect to external tools and data</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
          <div>
            <p className="font-medium">Design RAG Systems</p>
            <p className="text-sm text-gray-600">Ground AI responses in your actual data</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
          <div>
            <p className="font-medium">Make Build vs Buy Decisions</p>
            <p className="text-sm text-gray-600">When to use Zapier MCP vs custom solutions</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
          <div>
            <p className="font-medium">Plan Production Deployments</p>
            <p className="text-sm text-gray-600">Hosting, security, and monitoring strategies</p>
          </div>
        </div>
      </div>
    </Card>

    <h2 className="text-xl font-bold mt-8 mb-4">Learning Path</h2>
    <p className="text-gray-600 mb-4">This guide is organized progressively. Each section builds on the previous one.</p>

    <div className="space-y-3">
      {[
        { num: 1, title: "Mindset Shift", desc: "Why production AI is different from ChatGPT" },
        { num: 2, title: "Business Case", desc: "Start here — what questions need answers?" },
        { num: 3, title: "Core Concepts", desc: "MCP, RAG, capabilities, and the mental model" },
        { num: 4, title: "Data Shape", desc: "The foundation — garbage in, garbage out" },
        { num: 5, title: "Architecture", desc: "The six layers and how they connect" },
        { num: 6, title: "When to Use What", desc: "SQL vs RAG vs Agentic AI decision framework" },
        { num: 7, title: "Implementation", desc: "Chunking, embeddings, retrieval patterns" },
        { num: 8, title: "Hosting", desc: "Where to run your MCP server (Cloud Run, etc.)" },
        { num: 9, title: "Zapier MCP", desc: "When managed solutions make sense" },
        { num: 10, title: "Planning", desc: "Timeline, costs, and phased rollout" },
        { num: 11, title: "Evaluation", desc: "How to know if it's working" },
      ].map(item => (
        <div key={item.num} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
            {item.num}
          </div>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">{item.desc}</p>
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
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">The Most Important Lesson</h2>
    
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
      <Card className="p-4 bg-amber-50 border-amber-200">
        <p className="font-bold text-amber-800">The Cite or Abstain Rule</p>
        <p className="mt-2">If the AI cannot cite a specific source for a claim, it should not make the claim.</p>
      </Card>

      <h4 className="font-bold mt-4 mb-2">Grounded vs Ungrounded Response</h4>
      <div className="space-y-3">
        <Card className="p-4 border-red-200">
          <p className="text-sm font-medium text-red-600 mb-2">❌ Ungrounded:</p>
          <p className="italic text-sm">"TPI has been having ongoing issues with their camera systems and network infrastructure, leading to significant downtime."</p>
        </Card>
        <Card className="p-4 border-green-200">
          <p className="text-sm font-medium text-green-600 mb-2">✓ Grounded:</p>
          <p className="italic text-sm">"In the March 28 meeting, Alan from TPI mentioned that 'they keep having cameras go offline' and there's 'finger pointing' about whether it's the network, camera, or code. <strong>[Source: TPI transcript, March 28, 2024]</strong>"</p>
        </Card>
      </div>
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
  <div className="space-y-6">
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
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Core Concepts</h2>
    
    {/* Redesigned Mental Model Card */}
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">The Mental Model</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { text: "Prompts explain.", color: "from-purple-400 to-purple-500", desc: "Natural language instructions" },
            { text: "Capabilities execute.", color: "from-blue-400 to-blue-500", desc: "Actions the AI can take" },
            { text: "Contracts constrain.", color: "from-cyan-400 to-cyan-500", desc: "Rules & boundaries" },
            { text: "MCP orchestrates.", color: "from-emerald-400 to-emerald-500", desc: "Connects everything" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 group">
              <div className={`w-2 h-12 rounded-full bg-gradient-to-b ${item.color}`} />
              <div>
                <p className={`font-mono text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.text}
                </p>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>

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
  </div>
);


const DataShapeSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Data Shape: Garbage In, Garbage Out</h2>
    
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
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Architecture: The Six Layers</h2>
    
    <Callout type="info" title="Before You Build">
      Building an agent isn't about picking tools first. Answer these questions BEFORE 
      deciding on RAG, SQL, or any technology.
    </Callout>

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
  </div>
);

const DecisionsSection = () => (
  <div className="space-y-6">
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
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Implementation Details</h2>

    <ProgressiveSection number="1" title="Chunking Strategy" subtitle="How to split your data" defaultOpen={true}>
      <Callout type="info" title="Research Finding">
        Studies show <strong>200-500 token chunks</strong> with <strong>10-20% overlap</strong> work well 
        for most use cases. For conversational data like transcripts, chunk by speaker turn.
      </Callout>

      <ComparisonTable
        headers={["Content Type", "Chunk Size", "Overlap", "Strategy"]}
        rows={[
          ["Transcripts", "200-300 tokens", "10%", "By speaker turn"],
          ["Documentation", "500 tokens", "10%", "Recursive character split"],
          ["Legal documents", "1000 tokens", "20%", "By clause/section"],
        ]}
      />

      <h4 className="font-bold mt-4 mb-2">For Your Transcripts (Speaker Turns)</h4>
      <p className="text-gray-600 mb-4">Your transcripts follow "Speaker Name: content" format. This is ideal for chunking:</p>
      <DiagramBox>
{`[Customer] "We're worried about the camera integration..."
[Leverege] "Can you tell me more about that?"
[Customer] "Our current POS doesn't support it..."

→ 3 chunks, each with speaker_role metadata`}
      </DiagramBox>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="Embedding Models" subtitle="Converting text to vectors">
      <ComparisonTable
        headers={["Model", "Dimensions", "Cost (per 1M tokens)", "Quality"]}
        rows={[
          ["OpenAI text-embedding-3-small", "1536", "$0.02", "Best value"],
          ["OpenAI text-embedding-3-large", "3072", "$0.13", "Highest quality"],
          ["Vertex AI text-embedding-004", "768", "~$0.10", "Good, GCP native"],
        ]}
      />

      <Callout type="success" title="Recommendation">
        Start with <strong>OpenAI text-embedding-3-small</strong>. At ~$0.01 for 13k chunks, 
        cost is negligible. Quality is excellent.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="3" title="Vector Database Options" subtitle="Where embeddings live">
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
  <div className="space-y-6">
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
  <div className="space-y-6">
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
  <div className="space-y-6">
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
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Evaluation: How to Know It's Working</h2>

    <Callout type="warning" title="Key Stat">
      Stanford's 2024 legal AI study found even purpose-built RAG tools hallucinate 
      <strong> 17-33% of the time</strong>. Evaluation is essential, not optional.
    </Callout>

    <ProgressiveSection number="1" title="RAGAS Framework" subtitle="Industry-standard RAG evaluation" defaultOpen={true}>
      <p className="mb-4">
        <strong>RAGAS</strong> (Retrieval Augmented Generation Assessment) provides metrics to 
        evaluate both retrieval and generation quality.
      </p>

      <ComparisonTable
        headers={["Metric", "What It Measures", "Target"]}
        rows={[
          ["Faithfulness", "Is the answer grounded in retrieved context?", "> 0.9"],
          ["Answer Relevancy", "Is the response relevant to the question?", "> 0.8"],
          ["Context Precision", "Are relevant chunks ranked higher?", "> 0.8"],
          ["Context Recall", "Does retrieved context contain needed info?", "> 0.8"],
        ]}
      />

      <Callout type="info" title="Key Insight">
        <strong>Faithfulness</strong> is your most important metric. A low faithfulness score 
        means the AI is making claims not supported by your data — hallucinations.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="2" title="Create a Golden Test Set" subtitle="Before launch, validate with known answers">
      <p className="mb-4">Create 20-30 questions with known answers:</p>

      <ComparisonTable
        headers={["Question", "Expected Source", "Expected Answer Contains"]}
        rows={[
          ['"What was our last meeting with TPI about?"', "March 28 transcript", "cycle time, cameras"],
          ['"What concerns did Canadian Tire raise?"', "Canadian Tire transcripts", "in-shop flow"],
          ['"Who mentioned Proxedo?"', "East Bay Tire transcript", "John Hulsey"],
        ]}
      />

      <Callout type="success" title="Run Periodically">
        Run these tests after every major change. If answers change unexpectedly, something broke.
      </Callout>
    </ProgressiveSection>

    <ProgressiveSection number="3" title="Three Things to Validate" subtitle="Retrieval, Grounding, Trust">
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
  <div className="space-y-6">
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
      case 'implementation': return <ImplementationSection />;
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
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">LEVEREGE</span>
                <span className="text-purple-400 font-bold">AI</span>
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
            <p className="text-blue-200 text-xs mt-2">MCP & RAG Implementation Guide</p>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 flex-1 overflow-y-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200 mb-1
                  ${activeTab === tab.id
                    ? 'bg-purple-500/30 text-white border-l-2 border-purple-400'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white border-l-2 border-transparent'
                  }
                `}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{tab.label}</span>
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
          className="hidden lg:block relative text-white py-6 px-8"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          }}
        >
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(100, 100, 255, 0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(100, 100, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-1">MCP & RAG Implementation Guide</h1>
            <p className="text-blue-200 text-sm">
              Understand what you're building and why — then use AI to help with how.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-8 max-w-4xl mx-auto">
          {renderContent()}
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
