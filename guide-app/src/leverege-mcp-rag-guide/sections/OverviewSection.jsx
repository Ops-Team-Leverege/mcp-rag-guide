import React from 'react';
import { Target, CheckCircle } from 'lucide-react';
import { Card, Callout } from '../components/ui';
import { NextSectionNav } from '../index';

export const OverviewSection = () => {
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
            { title: "Understand the core AI paradigms and when to use each", sub: "RAG, MCP, Fine-tuning, Agentic AI, A2A, Context Engineering, Router Pattern" },
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

      <Card className="p-6 bg-slate-50 border-slate-200">
        <h2 className="text-xl font-semibold mb-3 text-slate-900">How This Guide Is Organized</h2>
        <p className="text-slate-600 leading-relaxed">
          This guide walks you through building production AI systems from first principles. We start with the mindset shift
          from consumer AI to production AI, then cover the business case and core concepts. You'll learn prompt engineering
          fundamentals, model selection strategies, and data preparation. The middle sections dive into implementation patterns
          (RAG, MCP, Router, Agentic, A2A), followed by debugging, evaluation, and testing techniques. We close with deployment
          considerations and a real-world case study (PitCrew Sauce) showing these concepts in action. Use the sidebar to navigate
          directly to any topic, or read sequentially for a complete understanding.
        </p>
      </Card>

      <Callout type="insight" title="How to Use This Guide">
        Read through the sections in order on your first pass. Use the sidebar to jump directly to specific topics as needed.
      </Callout>

      <NextSectionNav currentId="overview" />
    </div>
  );
};
