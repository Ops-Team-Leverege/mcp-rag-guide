import React from 'react';
import { Brain, Settings, Database, FileText, CheckCircle, Eye, Lightbulb, Search, Play } from 'lucide-react';
import { Card, Callout, ProgressiveSection } from '../components/ui';
import AIPatternComparison from '../components/diagrams/AIPatternComparison';
import { KnowledgeTiersDiagram } from '../components/diagrams';
import { NextSectionNav } from '../index';

// Inline diagram components
const MCPArchitectureDiagram = () => (
    <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-x-auto">
        <div className="hidden md:flex items-center justify-center gap-3 min-w-max">
            <div className="px-4 py-3 rounded-lg border bg-blue-50 border-blue-200 text-blue-800 text-center">
                <div className="flex items-center justify-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span className="font-semibold text-sm">AI Host</span>
                </div>
                <p className="text-xs opacity-75 mt-1">Claude, Cursor, etc.</p>
            </div>
            <div className="w-6 h-6 text-slate-400">→</div>
            <div className="px-4 py-3 rounded-lg border bg-purple-50 border-purple-200 text-purple-800 text-center">
                <span className="font-semibold text-sm">MCP Client</span>
                <p className="text-xs opacity-75 mt-1">Connects host to server</p>
            </div>
            <div className="w-6 h-6 text-slate-400">→</div>
            <div className="px-4 py-3 rounded-lg border bg-green-50 border-green-200 text-green-800 text-center">
                <div className="flex items-center justify-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span className="font-semibold text-sm">MCP Server</span>
                </div>
                <p className="text-xs opacity-75 mt-1">Your tools & logic</p>
            </div>
            <div className="w-6 h-6 text-slate-400">→</div>
            <div className="px-4 py-3 rounded-lg border bg-amber-50 border-amber-200 text-amber-800 text-center">
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
        <h2 className="text-2xl font-semibold text-slate-900">Core Concepts</h2>

        <Callout type="info" title="The building blocks">
            {"Understanding the core AI paradigms, protocols, and the mental model that ties them together."}
        </Callout>

        {/* AI Architecture Patterns Introduction */}
        <div className="my-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Understanding AI Architecture Patterns</h3>
            <p className="text-slate-600 mb-4">
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

        {/* Pattern Deep Dives */}
        <div className="my-8 space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Understanding Each Pattern</h3>

            <Card className="p-5 border-l-4 border-sky-400">
                <h4 className="font-semibold text-sky-900 mb-2">1. RAG (Retrieval Augmented Generation)</h4>
                <p className="text-sm text-slate-600 mb-3">
                    Retrieve relevant context from your knowledge base, then generate a response grounded in that context.
                    The model doesn't memorize your data — it reads what you give it, on-demand.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="font-semibold text-emerald-800 mb-1">When to use:</p>
                        <ul className="text-emerald-700 space-y-1 text-xs">
                            <li>{"• Large, changing knowledge base"}</li>
                            <li>{"• Need citations and sources"}</li>
                            <li>{"• Semantic search over documents"}</li>
                            <li>{"• Data updates frequently"}</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="font-semibold text-amber-800 mb-1">Tradeoffs:</p>
                        <ul className="text-amber-700 space-y-1 text-xs">
                            <li>{"• Retrieval quality = answer quality"}</li>
                            <li>{"• Requires good chunking strategy"}</li>
                            <li>{"• Latency from retrieval step"}</li>
                            <li>{"• Context window limits"}</li>
                        </ul>
                    </div>
                </div>
            </Card>

            <Card className="p-5 border-l-4 border-indigo-400">
                <h4 className="font-semibold text-indigo-900 mb-2">2. MCP (Model Context Protocol)</h4>
                <p className="text-sm text-slate-600 mb-3">
                    A standardized way for AI to connect to external systems — databases, APIs, tools.
                    Think USB-C for AI: one protocol, many connections.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="font-semibold text-emerald-800 mb-1">When to use:</p>
                        <ul className="text-emerald-700 space-y-1 text-xs">
                            <li>{"• Need to expose tools/APIs to AI"}</li>
                            <li>{"• Want standardized integration"}</li>
                            <li>{"• Building reusable capabilities"}</li>
                            <li>{"• Multiple AI hosts (Claude, Cursor, etc.)"}</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="font-semibold text-amber-800 mb-1">Tradeoffs:</p>
                        <ul className="text-amber-700 space-y-1 text-xs">
                            <li>{"• Requires MCP server implementation"}</li>
                            <li>{"• Host must support MCP protocol"}</li>
                            <li>{"• Additional abstraction layer"}</li>
                            <li>{"• Tool design matters for usability"}</li>
                        </ul>
                    </div>
                </div>
            </Card>

            <Card className="p-5 border-l-4 border-violet-400">
                <h4 className="font-semibold text-violet-900 mb-2">3. Fine-Tuning</h4>
                <p className="text-sm text-slate-600 mb-3">
                    Update the model's weights with your domain-specific data. The knowledge becomes embedded in the model itself,
                    not retrieved at runtime.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="font-semibold text-emerald-800 mb-1">When to use:</p>
                        <ul className="text-emerald-700 space-y-1 text-xs">
                            <li>{"• Specialized domain language/jargon"}</li>
                            <li>{"• Consistent output format/style"}</li>
                            <li>{"• Small, stable knowledge set"}</li>
                            <li>{"• Need faster inference (no retrieval)"}</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="font-semibold text-amber-800 mb-1">Tradeoffs:</p>
                        <ul className="text-amber-700 space-y-1 text-xs">
                            <li>{"• Expensive to train and update"}</li>
                            <li>{"• Knowledge becomes stale"}</li>
                            <li>{"• No citations (knowledge is embedded)"}</li>
                            <li>{"• Requires quality training data"}</li>
                        </ul>
                    </div>
                </div>
            </Card>

            <Card className="p-5 border-l-4 border-amber-400">
                <h4 className="font-semibold text-amber-900 mb-2">4. Agentic AI</h4>
                <p className="text-sm text-slate-600 mb-3">
                    The AI decides which tools to use and in what order to accomplish a goal. Multi-step reasoning
                    with autonomous tool execution.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="font-semibold text-emerald-800 mb-1">When to use:</p>
                        <ul className="text-emerald-700 space-y-1 text-xs">
                            <li>{"• Complex, multi-step workflows"}</li>
                            <li>{"• Unpredictable task sequences"}</li>
                            <li>{"• Need autonomous decision-making"}</li>
                            <li>{"• Tasks require tool composition"}</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="font-semibold text-amber-800 mb-1">Tradeoffs:</p>
                        <ul className="text-amber-700 space-y-1 text-xs">
                            <li>{"• Unpredictable behavior"}</li>
                            <li>{"• Higher latency (multiple LLM calls)"}</li>
                            <li>{"• Harder to debug and audit"}</li>
                            <li>{"• Can get stuck in loops"}</li>
                        </ul>
                    </div>
                </div>
            </Card>

            <Card className="p-5 border-l-4 border-purple-400">
                <h4 className="font-semibold text-purple-900 mb-2">5. A2A (Agent-to-Agent)</h4>
                <p className="text-sm text-slate-600 mb-3">
                    Agents communicate with other agents through a standardized protocol. Enables distributed AI systems
                    where specialized agents collaborate.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="font-semibold text-emerald-800 mb-1">When to use:</p>
                        <ul className="text-emerald-700 space-y-1 text-xs">
                            <li>{"• Need specialized agent expertise"}</li>
                            <li>{"• Distributed AI architecture"}</li>
                            <li>{"• Agent orchestration workflows"}</li>
                            <li>{"• Cross-organization AI collaboration"}</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="font-semibold text-amber-800 mb-1">Tradeoffs:</p>
                        <ul className="text-amber-700 space-y-1 text-xs">
                            <li>{"• Complex coordination logic"}</li>
                            <li>{"• Network latency between agents"}</li>
                            <li>{"• Harder to debug distributed systems"}</li>
                            <li>{"• Protocol compatibility required"}</li>
                        </ul>
                    </div>
                </div>
            </Card>

            <Card className="p-5 border-l-4 border-green-400">
                <h4 className="font-semibold text-green-900 mb-2">6. Context Engineering</h4>
                <p className="text-sm text-slate-600 mb-3">
                    Shape model behavior through carefully crafted prompts, examples, instructions, and output formatting.
                    No external data, no tools — just prompt design.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="font-semibold text-emerald-800 mb-1">When to use:</p>
                        <ul className="text-emerald-700 space-y-1 text-xs">
                            <li>{"• Need specific output format"}</li>
                            <li>{"• Consistent tone/style required"}</li>
                            <li>{"• Few-shot learning scenarios"}</li>
                            <li>{"• Simple tasks, no external data"}</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="font-semibold text-amber-800 mb-1">Tradeoffs:</p>
                        <ul className="text-amber-700 space-y-1 text-xs">
                            <li>{"• Limited by context window size"}</li>
                            <li>{"• No access to external knowledge"}</li>
                            <li>{"• Prompt engineering is iterative"}</li>
                            <li>{"• Model-specific behavior"}</li>
                        </ul>
                    </div>
                </div>
            </Card>

            <Card className="p-5 border-l-4 border-slate-400">
                <h4 className="font-semibold text-slate-900 mb-2">7. Router Pattern</h4>
                <p className="text-sm text-slate-600 mb-3">
                    Use the LLM once to classify intent, then route to deterministic code handlers. Combines AI flexibility
                    with code reliability.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="font-semibold text-emerald-800 mb-1">When to use:</p>
                        <ul className="text-emerald-700 space-y-1 text-xs">
                            <li>{"• Predictable set of query types"}</li>
                            <li>{"• Need audit trail and consistency"}</li>
                            <li>{"• Want to avoid agentic unpredictability"}</li>
                            <li>{"• Starting point for most systems"}</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="font-semibold text-amber-800 mb-1">Tradeoffs:</p>
                        <ul className="text-amber-700 space-y-1 text-xs">
                            <li>{"• Requires defining intent categories"}</li>
                            <li>{"• Less flexible than pure agentic"}</li>
                            <li>{"• Need to build handlers for each route"}</li>
                            <li>{"• Classification can fail on edge cases"}</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>

        <ProgressiveSection number="1" title="The Abstraction Layer" subtitle="What the AI sees vs. what exists" defaultOpen={true}>
            <p className="text-slate-600 mb-4">
                Regardless of which pattern you use (Router, MCP, Agentic), a key principle applies:
                <strong> the AI should interact with high-level abstractions, not raw infrastructure</strong>.
            </p>

            <p className="text-slate-600 mb-4">
                Think of it like a restaurant menu. The menu shows "Grilled Salmon with Seasonal Vegetables" —
                not "Walk to freezer, retrieve fish, set oven to 425°F, chop carrots..." The abstraction hides
                implementation details and presents a clear interface.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="p-5 border border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <Eye className="w-5 h-5 text-red-600" />
                        </div>
                        <h4 className="font-semibold text-red-700">The AI Should NOT See:</h4>
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
                <Card className="p-5 border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-green-700">The AI Should See:</h4>
                    </div>
                    <div className="space-y-2">
                        {["Business concepts (company, feedback)", "Available operations", "Input/output formats", "Domain language", "How to ask questions"].map((item, i) => (
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

            <Card className="p-5 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-200 rounded-lg">
                        <Lightbulb className="w-6 h-6 text-amber-700" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-amber-800 mb-1">The Golden Rule</h4>
                        <p className="text-amber-900">
                            <strong>Design interfaces around what users need, not what your database has.</strong>
                        </p>
                        <p className="text-amber-700 text-sm mt-2">
                            Whether you're building MCP tools, RAG queries, or agentic workflows — expose operations
                            that solve business problems, not raw data access.
                        </p>
                    </div>
                </div>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="Knowledge Tiers Pattern" subtitle="Different sources, different trust levels">
            <KnowledgeTiersDiagram />
        </ProgressiveSection>

        <NextSectionNav currentId="concepts" />
    </div>
);
