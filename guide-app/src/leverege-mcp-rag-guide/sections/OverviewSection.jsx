import React, { useContext } from 'react';
import { Target, CheckCircle, ChevronRight } from 'lucide-react';
import { Card, Callout } from '../components/ui';
import { NavigationContext, NextSectionNav } from '../index';

export const OverviewSection = () => {
  const nav = useContext(NavigationContext);

  const learningPath = [
    { num: 1, title: "Mindset Shift", desc: "Why production AI is different from ChatGPT. Before You Build checklist.", tab: "mindset" },
    { num: 2, title: "Business Case", desc: "Start here — what questions need answers? Define success metrics.", tab: "businesscase" },
    { num: 3, title: "Core Concepts", desc: "The 7 AI paradigms, protocols, and the mental model.", tab: "concepts" },
    { num: 4, title: "Prompt Engineering", desc: "The 70% rule. System prompts, few-shot examples, temperature.", tab: "promptengineering" },
    { num: 5, title: "Model Selection", desc: "Route cheap, generate smart. Multi-model pattern, cost optimization.", tab: "modelselection" },
    { num: 6, title: "Data Shape", desc: "The foundation — garbage in, garbage out. Metadata matters.", tab: "data" },
    { num: 7, title: "Architecture Patterns", desc: "How components connect. Router pattern, layered architecture.", tab: "architecture" },
    { num: 8, title: "When to Use What", desc: "Decision framework for choosing and combining patterns.", tab: "decisions" },
    { num: 9, title: "The MVP Path", desc: "Off-the-shelf before custom. When managed solutions make sense.", tab: "mvppath" },
    { num: 10, title: "Implementation", desc: "Chunking, embeddings, retrieval patterns, ingestion pipeline.", tab: "implementation" },
    { num: 11, title: "Debugging", desc: "Systematic debugging for AI systems. What to log, when to escalate.", tab: "debugging" },
    { num: 12, title: "Evaluation", desc: "RAGAS metrics, measuring quality, intent accuracy, end-to-end testing.", tab: "evaluation" },
    { num: 13, title: "Golden Set", desc: "Building test sets, synthetic data generation, quality benchmarks.", tab: "goldenset" },
    { num: 14, title: "Hybrid Search", desc: "Vector + BM25, RRF, reranking for better retrieval quality.", tab: "hybridsearch" },
    { num: 15, title: "AI-as-a-Judge", desc: "Automated evaluation at scale, judge prompts, calibration.", tab: "aijudge" },
    { num: 16, title: "Deployment", desc: "Hosting options from serverless to dedicated. Security essentials.", tab: "deployment" },
    { num: 17, title: "PitCrew Sauce", desc: "Real-world case study: meeting intelligence bot in production.", tab: "pitcrew" },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
          AI Architecture Guide
        </h1>
        <p className="text-lg text-slate-500">Building Production AI Systems</p>
        <p className="text-sm text-slate-400 mt-1">
          From paradigm selection to production deployment, with PitCrew Sauce as a real-world case study
        </p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200">
        <h2 className="font-semibold text-lg mb-5 flex items-center gap-2.5">
          <Target className="w-6 h-6 text-indigo-500" />
          What This Guide Will Help You Do
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Understand the 7 AI paradigms and when to use each", sub: "RAG, MCP, Fine-tuning, Agentic AI, A2A, Context Engineering, Router Pattern" },
            { title: "Design systems that don't hallucinate critical information", sub: "Grounding, citations, and the \"cite or abstain\" rule" },
            { title: "Choose and combine the right architecture patterns", sub: "When to use code-driven routing, when to let LLMs decide, and how patterns combine" },
            { title: "Debug, evaluate, and improve production AI", sub: "Systematic debugging, RAGAS evaluation, intent accuracy testing" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-slate-900">Learning Path</h2>
      <p className="text-sm text-slate-500 mb-5">Click any section to jump directly to it. The guide is organized progressively.</p>

      <div className="space-y-1.5">
        {learningPath.map(item => (
          <button
            key={item.num}
            onClick={() => nav?.navigateTo(item.tab)}
            className="w-full flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold text-xs">
              {item.num}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-slate-800 group-hover:text-indigo-700 transition-colors">{item.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
          </button>
        ))}
      </div>

      <Callout type="insight" title="How to Use This Guide">
        Read through the sections in order on your first pass. Use the sidebar or click any section above to jump directly to a topic.
      </Callout>

      <NextSectionNav currentId="overview" />
    </div>
  );
};
