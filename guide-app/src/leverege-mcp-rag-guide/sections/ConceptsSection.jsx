import React from 'react';
import { Brain, Settings, Database, FileText, CheckCircle, Eye, Lightbulb, Search, Play } from 'lucide-react';
import { Card, Callout, ProgressiveSection } from '../components/ui';
import AIPatternComparison from '../components/diagrams/AIPatternComparison';
import KnowledgeTiersDiagram from '../components/diagrams/KnowledgeTiersDiagram';

// Inline diagram components
const MCPArchitectureDiagram = () => (
    <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-x-auto">
        <div className="hidden md:flex items-center justify-center gap-3 min-w-max">
            <div className="px-4 py-3 rounded-lg border-2 bg-blue-50 border-blue-200 text-blue-800 text-center">
                <div className="flex items-center justify-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span className="font-semibold text-sm">AI Host</span>
                </div>
                <p className="text-xs opacity-75 mt-1">Claude, Cursor, etc.</p>
            </div>
            <div className="w-6 h-6 text-gray-400">→</div>
            <div className="px-4 py-3 rounded-lg border-2 bg-purple-50 border-purple-200 text-purple-800 text-center">
                <span className="font-semibold text-sm">MCP Client</span>
                <p className="text-xs opacity-75 mt-1">Connects host to server</p>
            </div>
            <div className="w-6 h-6 text-gray-400">→</div>
            <div className="px-4 py-3 rounded-lg border-2 bg-green-50 border-green-200 text-green-800 text-center">
                <div className="flex items-center justify-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span className="font-semibold text-sm">MCP Server</span>
                </div>
                <p className="text-xs opacity-75 mt-1">Your tools & logic</p>
            </div>
            <div className="w-6 h-6 text-gray-400">→</div>
            <div className="px-4 py-3 rounded-lg border-2 bg-amber-50 border-amber-200 text-amber-800 text-center">
                <div className="flex items-center justify-center gap-2">
                    <Database className="w-4 h-4" />
                    <span className="font-semibold text-sm">External Systems</span>
                </div>
                <p className="text-xs opacity-75 mt-1">Databases, APIs, Services</p>
            </div>
        </div>
    </div>
);

export const ConceptsSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-900">Core Concepts</h2>

        {/* Mental Model Card */}
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
                        { text: "Protocols connect.", desc: "MCP, A2A, ACP — standardized interfaces" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                            <p className="font-bold text-xl text-white mb-2">{item.text}</p>
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

        <ProgressiveSection number="3" title="The Query Stack" subtitle="How the layers fit together">
            <div className="my-6">
                <div className="flex flex-col items-center gap-2">
                    {[
                        { layer: "Orchestration", desc: "Routes + orchestrates", tech: "Router Pattern or MCP", color: "purple", icon: Brain },
                        { layer: "Semantic", desc: "Meaning-based retrieval", tech: "RAG, embeddings, vector search", color: "blue", icon: Search },
                        { layer: "Data", desc: "Structured facts", tech: "SQL, databases, APIs", color: "green", icon: Database },
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

            <Card className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Play className="w-4 h-4 text-blue-600" />
                    Example Flow: "What did TPI's customer say about cameras?"
                </h4>
                <div className="space-y-3">
                    {[
                        { step: 1, layer: "Router", action: "Classifies intent: SINGLE_MEETING → customer feedback search", color: "purple" },
                        { step: 2, layer: "Retrieval", action: "SQL filter: WHERE company='TPI' AND role='customer' + vector search for 'cameras'", color: "blue" },
                        { step: 3, layer: "Data", action: "Returns matching chunks with metadata (speaker, date, meeting)", color: "green" },
                        { step: 4, layer: "Generation", action: "Builds grounded prompt with citations — cite or abstain", color: "amber" },
                        { step: 5, layer: "Output", action: '"Alan mentioned cameras go offline during peak hours [March 28 meeting]"', color: "gray" },
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
            <p className="text-gray-600 mb-4">
                Regardless of which pattern you use (Router, MCP, Agentic), the AI should see
                <strong> capabilities and contracts</strong>, never raw infrastructure.
            </p>
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

        <ProgressiveSection number="5" title="Knowledge Tiers Pattern" subtitle="Different sources, different trust levels">
            <KnowledgeTiersDiagram />
        </ProgressiveSection>
    </div>
);
