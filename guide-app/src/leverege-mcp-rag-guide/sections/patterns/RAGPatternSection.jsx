import React from 'react';
import { Search, AlertTriangle, CheckCircle, Database, Zap } from 'lucide-react';
import { Card, Callout, ProgressiveSection, DiagramBox } from '../../components/ui';
import { NextSectionNav } from '../../index';

export const RAGPatternSection = () => (
    <div className="space-y-12">
        <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">RAG — Retrieval-Augmented Generation</h2>
            <p className="text-xl text-gray-600">
                Retrieve relevant context from a knowledge base at query time, then generate a response grounded in that context.
            </p>
        </div>

        <Callout type="info" title="What RAG Is">
            <p className="text-lg leading-relaxed">
                The user's question is embedded into a vector representation and compared against a pre-indexed knowledge base.
                The most semantically similar chunks are retrieved and injected into the LLM prompt as grounding context.
            </p>
        </Callout>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                    <h4 className="font-semibold text-lg text-amber-800 mb-2">The Problem</h4>
                    <p className="text-amber-700">
                        AI models can generate fluent text, but they <strong>make things up</strong>.
                        They don't know your data.
                    </p>
                </div>
                <div className="text-4xl">→</div>
                <div className="flex-1">
                    <h4 className="font-semibold text-lg text-green-800 mb-2">The Solution: RAG</h4>
                    <p className="text-green-700">
                        <strong>Retrieve</strong> relevant context first, then <strong>generate</strong>
                        a response grounded in that context.
                    </p>
                </div>
            </div>
        </div>

        <h4 className="font-semibold mb-3">Your Data Has Two Natures:</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="p-4 border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <h5 className="font-semibold text-blue-800">Structurally Stored</h5>
                </div>
                <p className="text-sm text-slate-500">Rows in a table, columns with types, foreign keys</p>
                <div className="mt-2 font-mono text-xs bg-blue-50 p-2 rounded">
                    id | speaker | company | text
                </div>
            </Card>
            <Card className="p-4 border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-purple-600" />
                    <h5 className="font-semibold text-purple-800">Semantically Unstructured</h5>
                </div>
                <p className="text-sm text-slate-500">Meaning is in natural language, not in schema</p>
                <div className="mt-2 font-mono text-xs bg-purple-50 p-2 rounded">
                    "We're worried about camera reliability..."
                </div>
            </Card>
        </div>

        <Callout type="insight" title="The Core Problem">
            A table can store text, but it cannot <em>understand</em> text. RAG gives us semantic indexing —
            embeddings capture <strong>meaning</strong>, not just words.
        </Callout>

        <h4 className="font-semibold mt-6 mb-3">RAG is a Cache, Not a Database</h4>
        <div className="bg-slate-100 rounded-xl p-4 mb-6">
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

        <ProgressiveSection number="1" title="How RAG Works" subtitle="The retrieval-augmentation pipeline" defaultOpen={true}>
            <DiagramBox title="RAG Flow">
                {`Question → [Retriever] → Relevant Chunks → [LLM + Context] → Response
              ↑
         Retrieves context on-the-fly`}
            </DiagramBox>

            <div className="space-y-4 mt-6">
                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Step 1: Embed the Query</h4>
                    <p className="text-gray-600">
                        The user's question is converted into a vector embedding using the same model that embedded your documents.
                    </p>
                </Card>

                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Step 2: Search the Vector Database</h4>
                    <p className="text-gray-600">
                        Find the chunks whose embeddings are most similar (cosine similarity) to the query embedding.
                        Typically retrieve 3-10 chunks.
                    </p>
                </Card>

                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Step 3: Inject as Context</h4>
                    <p className="text-gray-600">
                        The retrieved chunks are added to the LLM prompt as grounding context, along with instructions
                        to answer only from the provided information.
                    </p>
                </Card>

                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Step 4: Generate Response</h4>
                    <p className="text-gray-600">
                        The LLM generates an answer based on the retrieved context. Ideally with citations pointing
                        back to specific chunks.
                    </p>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="When to Use RAG" subtitle="The right use cases">
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-emerald-50 border-emerald-200">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        <h4 className="font-semibold text-emerald-900">Use RAG When:</h4>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You have a knowledge base the model doesn't have in training data (internal documents, customer conversations, proprietary data)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You need responses grounded in specific, attributable sources</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>Data changes frequently enough that fine-tuning would become stale</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You need semantic search over documents</span>
                        </li>
                    </ul>
                </Card>

                <Card className="p-6 bg-rose-50 border-rose-200">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-rose-600" />
                        <h4 className="font-semibold text-rose-900">Avoid RAG When:</h4>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>The data fits in the model's context window and you can just include it all</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>Your retrieval quality is too low to trust — bad retrieval produces confidently wrong answers</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>Latency is critical — retrieval adds 200–800ms before generation even starts</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>You need deterministic lookups (use SQL instead)</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="The Critical Risk" subtitle="Retrieval quality is the ceiling">
            <Callout type="danger" title="Garbage In, Garbage Out">
                <p className="text-lg leading-relaxed">
                    If the wrong chunks are retrieved, the LLM generates a grounded-sounding wrong answer.
                    This is more dangerous than hallucination because the output looks correct — it has citations,
                    it references your data, but it's answering from the wrong context.
                </p>
            </Callout>

            <div className="mt-6 space-y-4">
                <Card className="p-6 border-l-4 border-amber-500">
                    <h4 className="font-semibold text-amber-900 mb-2">Example: The Wrong Meeting</h4>
                    <div className="space-y-3 text-sm">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 mb-1"><strong>Question:</strong></p>
                            <p className="text-gray-800">"What did Acme Corp say about pricing?"</p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg">
                            <p className="text-amber-700 mb-1"><strong>Retrieval returns:</strong></p>
                            <p className="text-amber-900">Chunks from the wrong Acme meeting (6 months old)</p>
                        </div>
                        <div className="bg-rose-50 p-4 rounded-lg">
                            <p className="text-rose-700 mb-1"><strong>LLM generates:</strong></p>
                            <p className="text-rose-900">"Acme said pricing is too high" (with citation to old meeting)</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 mb-1"><strong>Reality:</strong></p>
                            <p className="text-gray-800">In the most recent meeting, they said pricing is acceptable</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="p-6 bg-blue-50 border-blue-200 mt-6">
                <h4 className="font-semibold text-blue-900 mb-3">How to Improve Retrieval Quality</h4>
                <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                        <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Better chunking:</strong> Chunk by semantic boundaries, not fixed sizes</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Rich metadata:</strong> Store date, company, speaker, topic for filtering</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Hybrid search:</strong> Combine vector search with keyword (BM25) search</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Reranking:</strong> Use a reranker model to re-score retrieved chunks</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Relevance thresholds:</strong> Discard chunks below 0.75 similarity</span>
                    </li>
                </ul>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="RAG vs. Fine-Tuning" subtitle="When to use which">
            <Callout type="insight" title="The Key Distinction">
                <p className="text-lg leading-relaxed">
                    <strong>Fine-tuning is for behavior.</strong> RAG is for knowledge. This distinction matters deeply.
                </p>
            </Callout>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Fine-Tuning</h4>
                    <p className="text-gray-600 mb-4">
                        Teaches the model <em>how</em> to respond — tone, format, domain-specific reasoning style, specialized task patterns
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg text-sm">
                        <p className="text-purple-900"><strong>Example:</strong></p>
                        <p className="text-purple-800 mt-1">
                            "Always respond in a formal legal tone with numbered sections and citations in Bluebook format"
                        </p>
                    </div>
                </Card>

                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">RAG</h4>
                    <p className="text-gray-600 mb-4">
                        Gives the model <em>what</em> to respond with — specific facts, recent data, proprietary content
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg text-sm">
                        <p className="text-blue-900"><strong>Example:</strong></p>
                        <p className="text-blue-800 mt-1">
                            "What did the customer say in the meeting on Jan 15?" — needs specific transcript data
                        </p>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <div className="rounded-xl bg-gradient-to-r from-slate-800 to-indigo-900 text-white p-8">
            <h3 className="font-semibold text-xl mb-4">🎯 The Bottom Line</h3>
            <div className="space-y-3 text-lg leading-relaxed">
                <p>
                    RAG is the most common pattern for production AI systems because it solves the fundamental problem:
                    how do you give an LLM access to information it wasn't trained on?
                </p>
                <p>
                    But RAG is only as good as your retrieval. Invest in chunking strategy, metadata, and hybrid search
                    before you invest in prompt engineering.
                </p>
            </div>
        </div>

        <NextSectionNav currentId="pattern-rag" />
    </div>
);
