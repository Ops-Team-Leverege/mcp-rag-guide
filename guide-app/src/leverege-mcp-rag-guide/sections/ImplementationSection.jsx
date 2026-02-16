import React from 'react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox } from '../components/ui';

export const ImplementationSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-900">Implementation Details</h2>

        <ProgressiveSection number="1" title="Chunking: The Art of Splitting Documents" subtitle="The foundation of good retrieval" defaultOpen={true}>
            <Callout type="warning" title="The Tradeoff">
                Chunk too small → lose context. Chunk too large → retrieve irrelevant content.
            </Callout>

            <h4 className="font-bold mt-4 mb-3">Chunking by Speaker Turn (Best for Transcripts)</h4>
            <p className="text-gray-700 mb-3">
                Each time someone speaks becomes one chunk. This preserves:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li><strong>Attribution</strong> - You know WHO said it</li>
                <li><strong>Context</strong> - Complete thoughts, not mid-sentence cuts</li>
                <li><strong>Metadata</strong> - Speaker role, company, date all stay attached</li>
            </ul>
            <p className="text-gray-700 mb-4">
                <strong>Example:</strong> "Alan from TPI mentioned cameras going offline" is one chunk.
                It's complete, attributable, and searchable.
            </p>

            <h4 className="font-bold mt-6 mb-3">Chunking by Paragraph (Best for Documents)</h4>
            <p className="text-gray-700 mb-3">
                Each paragraph becomes one chunk. This preserves:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li><strong>Topic coherence</strong> - Paragraphs discuss one idea</li>
                <li><strong>Natural boundaries</strong> - Writers already chunked for you</li>
                <li><strong>Readability</strong> - Citations point to complete thoughts</li>
            </ul>

            <h4 className="font-bold mt-6 mb-3">The Overlap Strategy</h4>
            <p className="text-gray-700">
                Include 1-2 sentences of overlap between chunks to preserve context across boundaries.
                This prevents losing information that spans chunk edges.
            </p>

            <Callout type="info" title="Research Finding">
                Studies show <strong>200-500 token chunks</strong> with <strong>10-20% overlap</strong> work well
                for most use cases.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="Embeddings: Turning Text Into Searchable Vectors" subtitle="How semantic search works">
            <p className="text-gray-700 mb-4">
                <strong>What they are:</strong> Mathematical representations of meaning. Similar meanings = similar vectors.
            </p>
            <p className="text-gray-700 mb-4">
                <strong>Why they matter:</strong> They enable semantic search. You can search for "pricing concerns"
                and find chunks that say "worried about cost" even though the words don't match.
            </p>

            <h4 className="font-bold mt-4 mb-3">The Key Decision: Which Embedding Model?</h4>
            <ComparisonTable
                headers={["Model Type", "Dimensions", "Speed", "Best For"]}
                rows={[
                    ["Smaller models", "384-768", "Faster, cheaper", "Good enough for most cases"],
                    ["Larger models", "1536-3072", "Slower, more expensive", "Higher accuracy needs"],
                ]}
            />

            <Callout type="success" title="Recommendation">
                Start small. Only upgrade if retrieval quality is poor. OpenAI text-embedding-3-small
                (1536 dimensions) is the sweet spot for most use cases.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="Retrieval: Finding the Right Chunks" subtitle="Two powerful patterns">
            <h4 className="font-bold mb-3">Pattern 1: Metadata Pre-filter + Vector Search (Recommended)</h4>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="font-semibold text-blue-900 mb-2">Step 1: Use SQL to filter by metadata</p>
                <p className="text-sm text-blue-800">
                    Filter by company, date, speaker role. This is fast and precise.
                    Reduces 13,000 chunks to ~200.
                </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
                <p className="font-semibold text-purple-900 mb-2">Step 2: Use vector search within that filtered set</p>
                <p className="text-sm text-purple-800">
                    Find semantic matches. Returns the 10 most relevant chunks.
                </p>
            </div>

            <Callout type="insight" title="Why This Works">
                You get the speed of SQL filtering with the intelligence of semantic search.
            </Callout>

            <h4 className="font-bold mt-6 mb-3">Pattern 2: Hybrid Search (Vector + Keywords)</h4>
            <p className="text-gray-700 mb-3">Combine two types of search:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li><strong>Vector search</strong> - Finds semantic matches ("pricing concerns" matches "worried about cost")</li>
                <li><strong>Keyword search</strong> - Finds exact matches (catches specific product names, acronyms)</li>
            </ul>
            <p className="text-gray-700">
                <strong>Why this works:</strong> Some queries need exact matches (product codes),
                others need semantic understanding (concepts).
            </p>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="Error Handling: When Things Go Wrong" subtitle="Graceful degradation">
            <h4 className="font-bold mb-3">Graceful Degradation</h4>
            <p className="text-gray-700 mb-3">If the fancy hybrid search fails, fall back to simpler approaches:</p>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">1</div>
                    <span className="text-gray-700">Try hybrid search first</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">2</div>
                    <span className="text-gray-700">If that fails, try vector-only search</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">3</div>
                    <span className="text-gray-700">If that fails, try SQL-only search</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">4</div>
                    <span className="text-gray-700">If that fails, return "I don't know"</span>
                </div>
            </div>

            <Callout type="success" title="The Principle">
                A simple answer is better than an error message.
            </Callout>

            <h4 className="font-bold mt-6 mb-3">Empty Results</h4>
            <p className="text-gray-700 mb-3">When no chunks are found:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li><strong>Don't hallucinate</strong> - Say "I don't have information about that"</li>
                <li><strong>Suggest alternatives</strong> - "Try broadening your search" or "Check if the data has been ingested"</li>
                <li><strong>Log it</strong> - Empty results indicate missing data or bad queries</li>
            </ul>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="Vector Database Options" subtitle="Where embeddings live">
            <ComparisonTable
                headers={["Option", "Best For", "Pros", "Cons"]}
                rows={[
                    ["pgvector (Postgres)", "Already using Postgres", "SQL + vectors together, no new infra", "DIY indexing"],
                    ["Pinecone", "Zero-ops needed", "Fully managed, fast", "Vendor lock-in, cost at scale"],
                    ["Qdrant", "Self-hosted + cost conscious", "Free tier, good performance", "Self-managed"],
                ]}
            />

            <Callout type="info" title="For Leverege">
                Since you're already on GCP with Postgres, <strong>pgvector</strong> is the natural choice.
                You get SQL joins + vector search in one query.
            </Callout>
        </ProgressiveSection>
    </div>
);
