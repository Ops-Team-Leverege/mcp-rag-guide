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
          What You'll Learn
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Core AI paradigms and when to use each", sub: "RAG, MCP, Fine-tuning, Agentic AI, A2A, Context Engineering, Router Pattern" },
            { title: "Systems that don't hallucinate", sub: "Grounding, citations, and the \"cite or abstain\" rule" },
            { title: "Choosing and combining patterns", sub: "When to use code-driven routing vs. letting LLMs decide" },
            { title: "Debug, evaluate, and improve", sub: "Systematic debugging, RAGAS evaluation, intent accuracy testing" },
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
        <h2 className="text-lg font-semibold mb-3 text-slate-900">How to Navigate</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          This guide is organized progressively, starting with mindset and fundamentals, moving through implementation
          patterns and techniques, and ending with a real-world case study.
        </p>
        <div className="flex items-start gap-3 text-sm">
          <div className="flex-1">
            <p className="text-slate-700 mb-2">
              <strong>First time here?</strong> Read sequentially to build a complete mental model.
            </p>
            <p className="text-slate-700">
              <strong>Looking for something specific?</strong> Use the sidebar to jump directly to any topic.
            </p>
          </div>
        </div>
      </Card>

      <NextSectionNav currentId="overview" />
    </div>
  );
};
