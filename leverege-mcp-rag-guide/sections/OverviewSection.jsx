import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card } from '../components/ui';

export const OverviewSection = () => (
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

    <Card className="p-6">
      <h2 className="font-bold text-lg mb-4">📚 Learning Path</h2>
      <p className="text-gray-600 mb-4">Follow these sections in order for the best learning experience:</p>
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
          <div key={item.num} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
              {item.num}
            </div>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

export default OverviewSection;
