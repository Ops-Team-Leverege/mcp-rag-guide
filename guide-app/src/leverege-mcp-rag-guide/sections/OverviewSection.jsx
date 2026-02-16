import React from 'react';
import { Target, CheckCircle } from 'lucide-react';
import { Card, Callout } from '../components/ui';

export const OverviewSection = () => (
  <div className="space-y-10">
    {/* Hero Section */}
    <div className="text-center mb-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
        AI Architecture Guide
      </h1>
      <p className="text-xl text-gray-600">
        Building Production AI Systems
      </p>
      <p className="text-base text-gray-500 mt-2">
        From paradigm selection to production deployment, with PitCrew Sauce as a real-world case study
      </p>
    </div>

    <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <h2 className="font-bold text-2xl mb-6 flex items-center gap-3">
        <Target className="w-8 h-8 text-blue-600" />
        What This Guide Will Help You Do
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium">Understand the 7 AI paradigms and when to use each</p>
            <p className="text-sm text-gray-600">RAG, MCP, Fine-tuning, Agentic AI, A2A, Context Engineering, Router Pattern</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium">Design systems that don't hallucinate critical information</p>
            <p className="text-sm text-gray-600">Grounding, citations, and the "cite or abstain" rule</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium">Choose and combine the right architecture patterns</p>
            <p className="text-sm text-gray-600">When to use code-driven routing, when to let LLMs decide, and how patterns combine</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium">Debug, evaluate, and improve production AI</p>
            <p className="text-sm text-gray-600">5-minute debug protocol, RAGAS, intent accuracy testing</p>
          </div>
        </div>
      </div>
    </Card>

    <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Learning Path</h2>
    <p className="text-gray-600 mb-6">This guide is organized progressively. Each section builds on the previous one.</p>

    {/* Visual Learning Path - will be enhanced with framer-motion later */}
    <div className="space-y-3">
      {[
        { num: 1, title: "Mindset Shift", desc: "Why production AI is different from ChatGPT. Before You Build checklist." },
        { num: 2, title: "Business Case", desc: "Start here — what questions need answers? Define success metrics." },
        { num: 3, title: "Core Concepts", desc: "The 7 AI paradigms, protocols (MCP, A2A, ACP), and the mental model." },
        { num: 4, title: "Prompt Engineering", desc: "The 70% rule. System prompts, few-shot examples, temperature." },
        { num: 5, title: "Model Selection", desc: "Route cheap, generate smart. Multi-model pattern, cost optimization." },
        { num: 6, title: "Data Shape", desc: "The foundation — garbage in, garbage out. Metadata matters." },
        { num: 7, title: "Architecture Patterns", desc: "The six layers and how they connect. Router pattern explained." },
        { num: 8, title: "When to Use What", desc: "Decision framework for choosing paradigms and patterns." },
        { num: 9, title: "The MVP Path", desc: "Off-the-shelf before custom. When Zapier MCP makes sense." },
        { num: 10, title: "Implementation", desc: "Chunking, embeddings, retrieval patterns, ingestion pipeline." },
        { num: 11, title: "Debugging", desc: "The 5-minute debug protocol. What to log, when to escalate." },
        { num: 12, title: "Evaluation", desc: "RAG quality, intent accuracy, end-to-end testing, user trust signals." },
        { num: 13, title: "Deployment", desc: "Hosting options from Replit to Cloud Run. Security essentials." },
        { num: 14, title: "PitCrew Sauce", desc: "Real-world case study: meeting intelligence bot in production." },
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
