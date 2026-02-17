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
