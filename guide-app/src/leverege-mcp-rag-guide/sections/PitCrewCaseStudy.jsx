import React from 'react';
import { Box, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Card, Callout } from '../components/ui';

export const PitCrewCaseStudy = () => (
    <div className="space-y-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Box className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold">PitCrew Sauce: A Real-World Case Study</h1>
                    <p className="text-blue-200 mt-2">Meeting intelligence bot for Leverege · Production since Feb 2026 · Slack-native</p>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-blue-200">Intent Types</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold">30+</div>
                    <div className="text-sm text-blue-200">Contracts</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold">8-20s</div>
                    <div className="text-sm text-blue-200">Response Time</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold">10</div>
                    <div className="text-sm text-blue-200">Active Users</div>
                </div>
            </div>
        </div>

        {/* Architecture Decision Table */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Architecture Decisions</h2>
            <p className="text-gray-600 mb-6">
                How PitCrew combines multiple AI paradigms to solve real business problems.
            </p>

            <div className="space-y-3">
                {[
                    {
                        paradigm: "Context Engineering",
                        decision: "✅ Used everywhere",
                        reasoning: "Foundation — system prompts, contracts, few-shot examples shape every request",
                        color: "green"
                    },
                    {
                        paradigm: "Router Pattern",
                        decision: "✅ Primary",
                        reasoning: "Team-wide Slack access, audit trail required, pricing questions can't be wrong",
                        color: "green"
                    },
                    {
                        paradigm: "RAG",
                        decision: "✅ Primary data",
                        reasoning: "Meeting data changes weekly, must cite specific transcripts, search 100+ meetings",
                        color: "green"
                    },
                    {
                        paradigm: "Agentic AI",
                        decision: "⚠️ One intent only",
                        reasoning: "EXTERNAL_RESEARCH needs web search. All others are deterministic — predictability > flexibility",
                        color: "amber"
                    },
                    {
                        paradigm: "MCP",
                        decision: "⚠️ Exposure only",
                        reasoning: "Available for Claude Desktop / Cursor. Slack uses Router — can't have LLM picking random tools for customers",
                        color: "amber"
                    },
                    {
                        paradigm: "Fine-tuning",
                        decision: "❌ Not used",
                        reasoning: "Data changes weekly. Can't cite 'baked in' knowledge. Wrong trade-off for our use case.",
                        color: "red"
                    },
                    {
                        paradigm: "A2A",
                        decision: "❌ Not used",
                        reasoning: "Single-agent system. No partner agents to talk to.",
                        color: "red"
                    },
                ].map((item, i) => {
                    const borderColors = {
                        green: "border-l-green-500",
                        amber: "border-l-amber-500",
                        red: "border-l-red-500"
                    };
                    return (
                        <Card key={i} className={`p-5 border-l-4 ${borderColors[item.color]}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-lg text-gray-900">{item.paradigm}</h3>
                                        <span className="text-sm font-medium text-gray-600">{item.decision}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{item.reasoning}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>

        {/* Lessons Learned */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lessons Learned</h2>

            <div className="grid md:grid-cols-2 gap-4">
                {[
                    {
                        title: "90% of bad answers are retrieval problems",
                        desc: "Not the LLM. Check what data was retrieved before blaming the model.",
                        icon: CheckCircle,
                        color: "blue"
                    },
                    {
                        title: "REFUSE and CLARIFY are first-class intents",
                        desc: "Not afterthoughts. If you can't answer well, say so. If the question is ambiguous, ask.",
                        icon: AlertTriangle,
                        color: "amber"
                    },
                    {
                        title: "Contract distribution reveals design flaws",
                        desc: "Early testing showed GENERAL_RESPONSE fired for 32% of queries — too broad. Tightening intents fixed it.",
                        icon: XCircle,
                        color: "red"
                    },
                    {
                        title: "The ingestion pipeline takes longer than the AI code",
                        desc: "Data prep: 2-4 weeks. Core architecture: 2-3 weeks. Plan for the boring stuff.",
                        icon: CheckCircle,
                        color: "green"
                    },
                ].map((item, i) => {
                    const bgColors = {
                        blue: "bg-blue-50 border-blue-200",
                        amber: "bg-amber-50 border-amber-200",
                        red: "bg-red-50 border-red-200",
                        green: "bg-green-50 border-green-200"
                    };
                    const iconColors = {
                        blue: "text-blue-600",
                        amber: "text-amber-600",
                        red: "text-red-600",
                        green: "text-green-600"
                    };
                    return (
                        <Card key={i} className={`p-5 ${bgColors[item.color]}`}>
                            <div className="flex items-start gap-3">
                                <item.icon className={`w-6 h-6 ${iconColors[item.color]} flex-shrink-0 mt-1`} />
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>

        <Callout type="insight" title="Coming Soon">
            Full interactive flow diagram, model selection details, and end-to-end query examples will be added in the next update.
        </Callout>
    </div>
);
