import React from 'react';
import { Search, Zap, Target, TrendingUp } from 'lucide-react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox } from '../components/ui';
import { NextSectionNav } from '../index';

export const HybridSearchSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-semibold text-slate-900">Fixing Retrieval: Hybrid Search and Reranking</h2>

        <Callout type="danger" title="The Retrieval Problem">
            {"Most RAG failures aren't LLM failures — they're retrieval failures. If you retrieve the wrong chunks, even the best LLM can't save you."}
        </Callout>

        <ProgressiveSection number="1" title="Why Vector Search Alone Isn't Enough" subtitle="The limitations of pure semantic search" defaultOpen={true}>
            <p className="text-slate-600 mb-4">
                Vector search (semantic similarity) is powerful, but it has blind spots:
            </p>

            <div className="space-y-3 mb-6">
                <Card className="p-4 border-l-4 border-rose-400">
                    <h5 className="font-semibold text-rose-900 mb-2">Problem 1: Exact Match Failures</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        Vector search can miss exact keyword matches. If someone asks about "Model X-500",
                        semantic search might return results about "Model X-400" because they're semantically similar.
                    </p>
                    <div className="bg-rose-50 p-3 rounded-lg text-xs">
                        <p className="text-rose-800">
                            <strong>Example:</strong> Query for "TPI" might return results about "tire companies"
                            but miss chunks that literally say "TPI"
                        </p>
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-amber-400">
                    <h5 className="font-semibold text-amber-900 mb-2">Problem 2: Rare Term Dilution</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        Embeddings average meaning across all words. Rare but important terms (product codes,
                        acronyms, names) get diluted by common words.
                    </p>
                    <div className="bg-amber-50 p-3 rounded-lg text-xs">
                        <p className="text-amber-800">
                            <strong>Example:</strong> {"\"Issues with SKU-12345\" → embedding focuses on \"issues\", misses the specific SKU"}
                        </p>
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-purple-400">
                    <h5 className="font-semibold text-purple-900 mb-2">Problem 3: Synonym Confusion</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        Embeddings treat synonyms as similar, which is usually good but can cause false positives.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg text-xs">
                        <p className="text-purple-800">
                            <strong>Example:</strong> {"Query about \"pricing\" returns chunks about \"cost\", \"fees\", \"charges\" — some relevant, some not"}
                        </p>
                    </div>
                </Card>
            </div>

            <Callout type="insight" title="The Solution">
                {"Combine vector search (semantic understanding) with keyword search (exact matching). This is called hybrid search."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="BM25: The Keyword Search Algorithm" subtitle="Understanding the other half of hybrid search">
            <p className="text-slate-600 mb-4">
                BM25 (Best Match 25) is a keyword-based ranking algorithm. It's the "traditional search" component
                of hybrid search.
            </p>

            <h4 className="font-semibold mb-3">How BM25 Works</h4>
            <div className="space-y-3 mb-4">
                <Card className="p-4 bg-blue-50">
                    <p className="font-semibold text-blue-900 mb-2">1. Term Frequency (TF)</p>
                    <p className="text-sm text-slate-600">
                        How often does the query term appear in the document? More appearances = higher score.
                    </p>
                </Card>

                <Card className="p-4 bg-purple-50">
                    <p className="font-semibold text-purple-900 mb-2">2. Inverse Document Frequency (IDF)</p>
                    <p className="text-sm text-slate-600">
                        How rare is the term across all documents? Rare terms (like "TPI") get higher weight
                        than common terms (like "the").
                    </p>
                </Card>

                <Card className="p-4 bg-green-50">
                    <p className="font-semibold text-green-900 mb-2">3. Document Length Normalization</p>
                    <p className="text-sm text-slate-600">
                        Longer documents naturally have more term matches. BM25 normalizes for length to avoid bias.
                    </p>
                </Card>
            </div>

            <ComparisonTable
                headers={["Search Type", "Good At", "Bad At"]}
                rows={[
                    ["Vector (Semantic)", "Understanding meaning, synonyms, concepts", "Exact matches, rare terms, product codes"],
                    ["BM25 (Keyword)", "Exact matches, rare terms, specific names", "Understanding meaning, handling synonyms"],
                ]}
            />

            <Callout type="success" title="The Power of Combination">
                {"Vector search finds semantically similar content. BM25 ensures exact matches aren't missed. Together, they cover each other's weaknesses."}
            </Callout>
        </ProgressiveSection>


        <ProgressiveSection number="3" title="Reciprocal Rank Fusion (RRF)" subtitle="Combining vector and keyword results">
            <p className="text-slate-600 mb-4">
                You now have two ranked lists: one from vector search, one from BM25. How do you combine them?
                Reciprocal Rank Fusion (RRF) is the standard approach.
            </p>

            <h4 className="font-semibold mb-3">How RRF Works</h4>
            <DiagramBox title="RRF Example">
                {`Vector Search Results:          BM25 Results:
1. Chunk A (score: 0.95)       1. Chunk C (score: 8.2)
2. Chunk B (score: 0.89)       2. Chunk A (score: 7.1)
3. Chunk C (score: 0.82)       3. Chunk D (score: 6.5)
4. Chunk D (score: 0.75)       4. Chunk B (score: 5.9)

RRF Score Calculation (k=60):
Chunk A: 1/(60+1) + 1/(60+2) = 0.0161 + 0.0161 = 0.0322
Chunk B: 1/(60+2) + 1/(60+4) = 0.0161 + 0.0156 = 0.0317
Chunk C: 1/(60+3) + 1/(60+1) = 0.0159 + 0.0164 = 0.0323
Chunk D: 1/(60+4) + 1/(60+3) = 0.0156 + 0.0159 = 0.0315

Final Ranking:
1. Chunk C (0.0323) ← Balanced across both methods
2. Chunk A (0.0322)
3. Chunk B (0.0317)
4. Chunk D (0.0315)`}
            </DiagramBox>

            <Card className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 mt-4">
                <h5 className="font-semibold text-indigo-900 mb-2">Why RRF Works</h5>
                <p className="text-sm text-slate-600 mb-3">
                    RRF doesn't care about the actual scores from each method (which aren't comparable anyway).
                    It only cares about rank position. A chunk that ranks high in both methods gets a high RRF score.
                </p>
                <p className="text-xs text-indigo-700">
                    The constant k=60 is standard. It controls how much weight to give to lower-ranked results.
                    Higher k = more weight to lower ranks.
                </p>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="Reranking: The Second Pass" subtitle="Refining results with a specialized model">
            <p className="text-slate-600 mb-4">
                Hybrid search gives you better candidates, but you can do one more pass: reranking.
                A reranker is a specialized model that scores query-document pairs more accurately than
                initial retrieval.
            </p>

            <h4 className="font-semibold mb-3">The Reranking Flow</h4>
            <div className="space-y-3 mb-6">
                <Card className="p-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">1</div>
                        <div>
                            <p className="font-semibold text-slate-800">Initial Retrieval (Hybrid Search)</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Get top 50-100 candidates using vector + BM25 + RRF
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-purple-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">2</div>
                        <div>
                            <p className="font-semibold text-slate-800">Reranking</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Pass each candidate through a reranker model that scores query-document relevance
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-green-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">3</div>
                        <div>
                            <p className="font-semibold text-slate-800">Final Selection</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Take top 5-10 reranked results and send to LLM
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <h4 className="font-semibold mb-3">Popular Reranker Models</h4>
            <ComparisonTable
                headers={["Model", "Provider", "Speed", "Quality"]}
                rows={[
                    ["Cohere Rerank", "Cohere API", "Fast", "Excellent"],
                    ["bge-reranker", "Open source (HuggingFace)", "Medium", "Good"],
                    ["cross-encoder", "Open source", "Slow", "Excellent"],
                ]}
            />

            <Callout type="info" title="When to Use Reranking">
                {"Reranking adds latency and cost. Use it when: 1) Initial retrieval quality is poor, 2) You need very high precision, 3) You can afford the extra 100-500ms latency."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="Implementation: Hybrid Search in Practice" subtitle="How to build it">
            <p className="text-slate-600 mb-4">
                Here's how to implement hybrid search with your existing stack:
            </p>

            <h4 className="font-semibold mb-3">Option 1: PostgreSQL with pgvector + pg_trgm</h4>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl mb-4">
                <pre className="text-xs font-mono">
                    {`-- Enable extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create GIN index for keyword search
CREATE INDEX idx_chunks_text_gin ON chunks USING GIN (text gin_trgm_ops);

-- Hybrid search query
WITH vector_results AS (
  SELECT id, text, embedding <-> query_embedding AS vector_distance
  FROM chunks
  WHERE company_id = 'TPI'
  ORDER BY vector_distance
  LIMIT 50
),
keyword_results AS (
  SELECT id, text, ts_rank(to_tsvector('english', text), query) AS keyword_score
  FROM chunks
  WHERE company_id = 'TPI' AND text ILIKE '%cameras%'
  ORDER BY keyword_score DESC
  LIMIT 50
)
-- Combine with RRF
SELECT DISTINCT ON (id) id, text
FROM (
  SELECT id, text, 1.0 / (60 + row_number() OVER (ORDER BY vector_distance)) AS rrf_score
  FROM vector_results
  UNION ALL
  SELECT id, text, 1.0 / (60 + row_number() OVER (ORDER BY keyword_score DESC)) AS rrf_score
  FROM keyword_results
) combined
GROUP BY id, text
ORDER BY SUM(rrf_score) DESC
LIMIT 10;`}
                </pre>
            </div>

            <h4 className="font-semibold mb-3">Option 2: Dedicated Vector DB with Hybrid Support</h4>
            <p className="text-slate-600 mb-3">
                Many vector databases now support hybrid search natively:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Pinecone:</strong> Built-in sparse-dense hybrid search</li>
                <li><strong>Weaviate:</strong> Hybrid search with BM25 + vector</li>
                <li><strong>Qdrant:</strong> Supports hybrid search with custom scoring</li>
            </ul>

            <Callout type="success" title="Recommendation">
                {"If you're already on PostgreSQL, use pgvector + pg_trgm. It's simpler than adding a new database. If you're starting fresh and need scale, consider a dedicated vector DB with hybrid support."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="Measuring Retrieval Quality" subtitle="How to know if it's working">
            <p className="text-slate-600 mb-4">
                Use your golden set to measure retrieval quality before and after implementing hybrid search.
            </p>

            <h4 className="font-semibold mb-3">Key Metrics</h4>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <Card className="p-4 border-l-4 border-blue-400">
                    <h5 className="font-semibold text-blue-900 mb-2">Recall@K</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        Of all relevant chunks, what percentage are in the top K results?
                    </p>
                    <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                        <strong>Target:</strong> Recall@10 {">"}70%
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-green-400">
                    <h5 className="font-semibold text-green-900 mb-2">Precision@K</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        Of the top K results, what percentage are actually relevant?
                    </p>
                    <div className="bg-green-50 p-2 rounded text-xs text-green-800">
                        <strong>Target:</strong> Precision@10 {">"}80%
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-purple-400">
                    <h5 className="font-semibold text-purple-900 mb-2">MRR (Mean Reciprocal Rank)</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        On average, what position is the first relevant result?
                    </p>
                    <div className="bg-purple-50 p-2 rounded text-xs text-purple-800">
                        <strong>Target:</strong> MRR {">"}0.7 (first relevant in top 3)
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-amber-400">
                    <h5 className="font-semibold text-amber-900 mb-2">NDCG (Normalized Discounted Cumulative Gain)</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        How well-ranked are the results? (considers position)
                    </p>
                    <div className="bg-amber-50 p-2 rounded text-xs text-amber-800">
                        <strong>Target:</strong> NDCG@10 {">"}0.8
                    </div>
                </Card>
            </div>

            <Card className="p-5 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
                <h5 className="font-semibold text-emerald-900 mb-2">Expected Improvements</h5>
                <p className="text-sm text-slate-600 mb-3">
                    When you add hybrid search + reranking, you should see:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                    <li>{"• Recall@10: +10-20% improvement"}</li>
                    <li>{"• Precision@10: +5-15% improvement"}</li>
                    <li>{"• MRR: +0.1-0.2 improvement"}</li>
                    <li>{"• Fewer \"I don't know\" responses"}</li>
                    <li>{"• Better handling of exact match queries"}</li>
                </ul>
            </Card>
        </ProgressiveSection>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mt-8">
            <h3 className="font-semibold text-lg mb-4">🎯 The Bottom Line</h3>
            <div className="space-y-2 text-sm text-slate-600">
                <p>
                    <strong>Vector search alone misses exact matches.</strong> Hybrid search (vector + BM25) covers both semantic and keyword matching.
                </p>
                <p>
                    <strong>RRF combines rankings</strong> from both methods without needing to normalize scores.
                </p>
                <p>
                    <strong>Reranking refines results</strong> but adds latency. Use it when precision matters more than speed.
                </p>
                <p>
                    <strong>Measure with your golden set.</strong> Track recall, precision, and MRR before and after changes.
                </p>
            </div>
            <p className="text-xs text-indigo-700 mt-4">
                Most RAG quality issues are retrieval issues. Fix retrieval first, then worry about prompts and models.
            </p>
        </Card>

        <NextSectionNav currentId="hybridsearch" />
    </div>
);
