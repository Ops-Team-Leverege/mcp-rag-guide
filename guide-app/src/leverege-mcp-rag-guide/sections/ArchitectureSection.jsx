import React from 'react';
import { Card, Callout, ProgressiveSection, ComparisonTable } from '../components/ui';
import RouterPatternDiagram from '../components/diagrams/RouterPatternDiagram';
import IngestionPipelineDiagram from '../components/diagrams/IngestionPipelineDiagram';
import ThreadContextDiagram from '../components/diagrams/ThreadContextDiagram';
import { NextSectionNav } from '../index';

// Inline diagram component
const SixLayerArchitecture = () => (
    <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
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
                    gray: "bg-slate-200 border-slate-400 text-slate-800",
                };
                return (
                    <div key={i} className="flex flex-col items-center w-full max-w-md">
                        {i > 0 && <div className="w-0.5 h-3 bg-slate-300" />}
                        <div className={`w-full ${colors[layer.color]} border rounded-lg px-4 py-3 flex items-center gap-3`}>
                            <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center font-semibold text-sm">
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
        <p className="text-center text-sm text-slate-400 mt-4">↑ Build from bottom up</p>
    </div>
);

export const ArchitectureSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-semibold text-slate-900">Architecture: The Six Layers</h2>

        <Callout type="info" title="Before You Build">
            Building an agent isn't about picking tools first. Answer these questions BEFORE
            deciding on RAG, SQL, or any technology.
        </Callout>

        <ProgressiveSection number="1" title="Architecture Follows Business Need" subtitle="Start with the problem, not the solution" defaultOpen={true}>
            <p className="text-slate-600 mb-4">
                The biggest mistake teams make is starting with "We need RAG" or "We need agents" instead of
                starting with the business questions they need to answer.
            </p>

            <Card className="p-5 bg-rose-50 border-rose-200 mb-4">
                <h4 className="font-semibold text-rose-800 mb-2">❌ Solution-First Thinking (Wrong)</h4>
                <div className="space-y-2 text-sm text-slate-600">
                    <p>{"\"We need to build a RAG system for our customer data.\""}</p>
                    <p>{"\"Let's implement an agentic workflow.\""}</p>
                    <p>{"\"We should fine-tune a model on our documents.\""}</p>
                </div>
                <p className="text-xs text-rose-700 mt-3">
                    Problem: You've chosen a solution without understanding the problem. This leads to over-engineering
                    or building the wrong thing entirely.
                </p>
            </Card>

            <Card className="p-5 bg-emerald-50 border-emerald-200 mb-4">
                <h4 className="font-semibold text-emerald-800 mb-2">✓ Problem-First Thinking (Right)</h4>
                <div className="space-y-2 text-sm text-slate-600">
                    <p>{"\"BD team needs to quickly find what customers said in recent meetings.\""}</p>
                    <p>{"\"Product team needs to aggregate feature requests across all customers.\""}</p>
                    <p>{"\"Support needs to know if we've discussed a topic with a specific customer before.\""}</p>
                </div>
                <p className="text-xs text-emerald-700 mt-3">
                    These questions reveal what architecture you need. The first needs temporal SQL + RAG. The second
                    needs aggregation. The third needs filtered search.
                </p>
            </Card>

            <h4 className="font-semibold mb-3">How Business Needs Drive Architecture</h4>
            <ComparisonTable
                headers={["Business Question", "Implies Architecture", "Why"]}
                rows={[
                    ['"What did customer X say in our last meeting?"', "SQL (temporal query) + RAG", "Need exact meeting lookup, then semantic search within it"],
                    ['"How many customers mentioned pricing concerns?"', "SQL aggregation + vector filter", "Need to count across all data with semantic matching"],
                    ['"Summarize all feedback about feature Y"', "RAG with metadata filtering", "Need semantic search across all customers, filtered by topic"],
                    ['"What should we follow up on with customer X?"', "SQL + RAG + LLM synthesis", "Need recent context + action item extraction + prioritization"],
                    ['"Is this support ticket similar to past issues?"', "Pure vector similarity", "Need semantic matching, no temporal or metadata constraints"],
                ]}
            />

            <Callout type="success" title="The Golden Rule">
                {"Let the business questions dictate the architecture. Don't force every question through the same pattern just because you built it first."}
            </Callout>
        </ProgressiveSection>

        <div className="my-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">The Router Pattern: Decision Before Execution</h3>
            <p className="text-slate-600 mb-4">
                The core of any AI system is the router - it decides WHAT to do before doing it. This separates
                intent classification from execution, making the system predictable and debuggable.
            </p>
            <p className="text-slate-600">
                Think of it like a restaurant: the host decides which section you sit in based on your party size,
                BEFORE the waiter takes your order. The router is the host, the execution layer is the waiter.
            </p>
        </div>

        <RouterPatternDiagram />

        <Card className="p-6 mb-6">
            <h3 className="font-semibold mb-4">The Three Questions</h3>
            <ol className="list-decimal ml-6 space-y-2">
                <li className="font-semibold">What is my business need?</li>
                <li className="font-semibold">What is the shape of my data?</li>
                <li className="font-semibold">What are the constraints on my answers?</li>
            </ol>
        </Card>

        <h3 className="text-lg font-semibold mb-2">The Six-Layer Stack (Build Bottom-Up)</h3>
        <SixLayerArchitecture />

        <div className="my-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">The Ingestion Pipeline: From Raw Data to Searchable Knowledge</h3>
            <p className="text-slate-600 mb-4">
                Before you can retrieve anything, you need to ingest it. This is where raw transcripts and documents
                become searchable, semantically-indexed knowledge.
            </p>
            <Callout type="warning" title="The Critical Principle">
                You can only retrieve what you've properly ingested. Bad ingestion = bad retrieval = bad answers.
                This is why ingestion is Layer 2 in the six-layer architecture - it's foundational.
            </Callout>
        </div>

        <IngestionPipelineDiagram />

        <h3 className="text-xl font-semibold mt-8 mb-4">Each Layer Explained</h3>

        <ProgressiveSection number="1" title="Layer 1: Database" subtitle="The foundation everything builds on">
            <p className="mb-4"><strong>What:</strong> Enable pgvector, create transcript_chunks table, add indexes.</p>
            <p className="mb-4"><strong>Why first:</strong> Everything else depends on this schema. Get it wrong, and you'll fight your data model forever.</p>
            <h5 className="font-semibold mb-2">Decisions at this layer:</h5>
            <ul className="list-disc ml-6">
                <li>Chunk granularity (speaker turns)</li>
                <li>Metadata fields (speaker_role, meeting_date)</li>
                <li>Index strategy (ivfflat vs hnsw)</li>
            </ul>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="Layer 2: Ingestion" subtitle="Defines what's searchable">
            <p className="mb-4"><strong>What:</strong> Convert transcripts → speaker turns → embeddings → DB rows.</p>
            <p className="mb-4"><strong>Why:</strong> You can't retrieve what you haven't stored.</p>
            <h5 className="font-semibold mb-2">Decisions at this layer:</h5>
            <ul className="list-disc ml-6">
                <li>How to parse speaker turns</li>
                <li>How to assign speaker_role</li>
                <li>When to re-embed (new data, model upgrade)</li>
            </ul>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="Layer 3: Retriever" subtitle="Finding relevant chunks">
            <p className="mb-4"><strong>What:</strong> Fetch relevant chunks based on query type.</p>
            <h5 className="font-semibold mb-2">Key patterns:</h5>
            <ul className="list-disc ml-6 font-mono text-sm">
                <li>getLastMeetingChunks(companyId) → Pure SQL</li>
                <li>searchChunks(query, filters) → SQL + Vector</li>
                <li>countCompaniesWithTopic(embedding) → Aggregation</li>
            </ul>
            <Callout type="info" title="Contract">
                The retriever returns Chunk[], not raw database rows. This is the contract.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="Layer 4: Composer" subtitle="Presenting with citations">
            <p className="mb-4"><strong>What:</strong> Build a grounded prompt from retrieved chunks.</p>
            <h5 className="font-semibold mb-2">Responsibilities:</h5>
            <ul className="list-disc ml-6">
                <li>Assemble context for LLM</li>
                <li>Enforce "cite or abstain" rule</li>
                <li>Format citations consistently</li>
            </ul>
            <p className="mt-4 text-sm text-slate-500">
                <strong>Why separate from retriever:</strong> Retrieval is about finding.
                Composition is about presenting. Different concerns.
            </p>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="Layer 5: RAG Core" subtitle="Orchestration and routing">
            <p className="mb-4"><strong>What:</strong> Orchestrate retriever + composer based on query mode.</p>
            <ComparisonTable
                headers={["Mode", "Retriever Strategy", "Composer Strategy"]}
                rows={[
                    ["last_meeting", "SQL temporal query", "Summarize chunks"],
                    ["search", "Vector similarity", "Cite matching chunks"],
                    ["concern", "Vector + role filter", "Extract concerns"],
                ]}
            />
            <p className="mt-4 text-sm text-slate-500">
                <strong>Why this layer:</strong> The caller (MCP) shouldn't know which retrieval
                strategy to use. RAG Core decides.
            </p>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="Layer 6: MCP" subtitle="The interface layer">
            <p className="mb-4"><strong>What:</strong> Expose capabilities to Slack/LLM.</p>
            <p className="mb-4"><strong>Key principle:</strong> MCP knows what capabilities exist, not how they work.</p>
            <h5 className="font-semibold mb-2">The capability absorbs:</h5>
            <ul className="list-disc ml-6">
                <li>Which retrieval strategy to use</li>
                <li>How to format the response</li>
                <li>Where the data comes from</li>
            </ul>
        </ProgressiveSection>

        <ProgressiveSection number="7" title="How Context Is Controlled" subtitle="Each layer shapes what the LLM sees">
            <p className="text-slate-600 mb-4">
                The LLM only knows what you put in its context window. Understanding how each layer controls
                what gets included is critical for building reliable systems.
            </p>

            <div className="space-y-4">
                <Card className="p-4 border-l-4 border-slate-400">
                    <h5 className="font-semibold text-slate-800 mb-2">Layer 1: Database (Storage Control)</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        Controls what data exists and how it's structured. If you didn't store speaker_role,
                        you can't filter by it later.
                    </p>
                    <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-700">
                        {"Schema design → What's queryable"}
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-amber-400">
                    <h5 className="font-semibold text-amber-800 mb-2">Layer 2: Ingestion (Content Control)</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        Controls what gets indexed and how it's chunked. Chunking by speaker turn vs by paragraph
                        fundamentally changes what can be retrieved.
                    </p>
                    <div className="bg-amber-50 p-2 rounded text-xs font-mono text-amber-700">
                        {"Chunking strategy → Retrieval granularity"}
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-green-400">
                    <h5 className="font-semibold text-green-800 mb-2">Layer 3: Retriever (Selection Control)</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        Controls which chunks get retrieved based on filters and similarity. This is where
                        metadata filtering happens (company_id, speaker_role, date range).
                    </p>
                    <div className="bg-green-50 p-2 rounded text-xs font-mono text-green-700">
                        {"SQL filters + vector similarity → Which chunks"}
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-blue-400">
                    <h5 className="font-semibold text-blue-800 mb-2">Layer 4: Composer (Presentation Control)</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        Controls how chunks are formatted and presented to the LLM. Adds instructions like
                        "cite or abstain" and structures the context with XML tags or markdown.
                    </p>
                    <div className="bg-blue-50 p-2 rounded text-xs font-mono text-blue-700">
                        {"Prompt assembly → How chunks are presented"}
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-violet-400">
                    <h5 className="font-semibold text-violet-800 mb-2">Layer 5: RAG Core (Orchestration Control)</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        Controls which retrieval and composition strategy to use based on query type.
                        Routes "last meeting" queries differently than "search all" queries.
                    </p>
                    <div className="bg-violet-50 p-2 rounded text-xs font-mono text-violet-700">
                        {"Query classification → Which strategy"}
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-purple-400">
                    <h5 className="font-semibold text-purple-800 mb-2">Layer 6: MCP (Interface Control)</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        Controls what capabilities are exposed and how they're described to the AI host.
                        The capability description shapes how the AI decides to use it.
                    </p>
                    <div className="bg-purple-50 p-2 rounded text-xs font-mono text-purple-700">
                        {"Capability contracts → What AI can do"}
                    </div>
                </Card>
            </div>

            <Card className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 mt-6">
                <h5 className="font-semibold text-indigo-900 mb-2">The Context Control Flow</h5>
                <div className="space-y-2 text-sm text-slate-600">
                    <p><strong>1. Database:</strong> Stores 10,000 chunks with metadata</p>
                    <p><strong>2. Ingestion:</strong> Chunks by speaker turn, embeds text</p>
                    <p><strong>3. Retriever:</strong> Filters to company=TPI, role=customer, returns 50 chunks</p>
                    <p><strong>4. Composer:</strong> Ranks by relevance, takes top 5, formats with citations</p>
                    <p><strong>5. RAG Core:</strong> Adds system prompt with "cite or abstain" instruction</p>
                    <p><strong>6. MCP:</strong> Returns grounded response to AI host</p>
                </div>
                <p className="text-xs text-indigo-700 mt-3">
                    At each layer, the context gets more focused and intentional. By the time it reaches the LLM,
                    it's exactly what's needed — no more, no less.
                </p>
            </Card>

            <Callout type="insight" title="Why This Matters">
                {"If your AI gives bad answers, you need to know which layer failed. Did retrieval get the wrong chunks? Did composition format them poorly? Did the database not have the right metadata? Each layer is a control point you can debug and improve."}
            </Callout>
        </ProgressiveSection>

        <Card className="p-6 mt-8 bg-amber-50 border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-4">Why Order Matters</h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold text-red-600 mb-2">❌ Wrong Order</h4>
                    <ol className="list-decimal ml-6 text-sm">
                        <li>Build Slack bot</li>
                        <li>Realize you need data</li>
                        <li>Hack together retrieval</li>
                        <li>Fight your schema</li>
                        <li>Rewrite everything</li>
                    </ol>
                </div>
                <div>
                    <h4 className="font-semibold text-green-600 mb-2">✓ Right Order</h4>
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

        <h3 className="text-xl font-semibold mt-8 mb-4">Thread Context Pattern</h3>
        <ThreadContextDiagram />

        <NextSectionNav currentId="architecture" />
    </div>
);
