import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox } from '../components/ui';
import { NextSectionNav } from '../index';

const DataQualityPyramid = () => (
    <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
        <div className="flex flex-col items-center gap-1">
            {[
                { label: "AI Output", desc: "Only as good as what's below", color: "bg-rose-50 border-rose-200 text-rose-800", width: "w-40" },
                { label: "Retrieval", desc: "Can only find what's indexed", color: "bg-amber-50 border-amber-200 text-amber-800", width: "w-48" },
                { label: "Embeddings", desc: "Can only represent what's chunked", color: "bg-sky-50 border-sky-200 text-sky-800", width: "w-56" },
                { label: "Chunking", desc: "Can only chunk what's structured", color: "bg-violet-50 border-violet-200 text-violet-800", width: "w-64" },
                { label: "Clean Data", desc: "FOUNDATION", color: "bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold", width: "w-72" },
            ].map((layer, i) => (
                <div key={i} className="flex flex-col items-center">
                    {i > 0 && <div className="w-0.5 h-3 bg-slate-300" />}
                    <div className={`${layer.width} ${layer.color} border rounded-lg px-4 py-2 text-center`}>
                        <div className="font-semibold text-sm">{layer.label}</div>
                        <div className="text-xs opacity-75">{layer.desc}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const DataShapeSection = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-slate-900">{"Data Shape: Garbage In, Garbage Out"}</h2>

        <Callout type="danger" title="THE RULE: AI quality is capped by data quality">
            No amount of prompt engineering or model selection can fix bad data.
        </Callout>

        <div className="my-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Why Data Shape Matters More Than You Think</h3>
            <p className="text-slate-600 mb-4">
                Most teams focus on the AI model first. This is backwards. The model is the LAST thing that matters.
            </p>
            <p className="text-slate-600 mb-4">What actually matters:</p>
            <ul className="list-disc ml-6 space-y-2 text-slate-600">
                <li><span className="font-semibold">What data you have</span> - Is it complete? Accurate? Up-to-date?</li>
                <li><span className="font-semibold">How it's structured</span> - Can you filter by metadata? Is it chunked properly?</li>
                <li><span className="font-semibold">What metadata you capture</span> - Speaker role? Date? Company? Topic?</li>
            </ul>
            <p className="text-slate-600 mt-4">
                {"Think of it this way: if you ask \"What did TPI's customer say about cameras?\" but your data doesn't track speaker roles or companies, the AI can't answer accurately no matter how smart the model is."}
            </p>
        </div>

        <Callout type="warning" title="This is the Foundation">
            {"Your AI is only as good as the data it can access. Before thinking about RAG, embeddings, or LLMs, you must understand and shape your data."}
        </Callout>

        <ProgressiveSection number="1" title="The Data Quality Pyramid" subtitle="Everything depends on clean data" defaultOpen={true}>
            <DataQualityPyramid />
            <Callout type="danger" title="Critical">
                If your data is messy, your AI will confidently give you messy answers.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="The Five Questions" subtitle="Ask these for every data source">
            <div className="space-y-4">
                <Card className="border-l-4 border-l-sky-400">
                    <h4 className="font-semibold text-sky-700">1. What is the atomic unit?</h4>
                    <p className="text-slate-500 mt-1">{"What's the smallest meaningful piece you want to retrieve?"}</p>
                    <ComparisonTable
                        headers={["Data Type", "Atomic Unit", "Why"]}
                        rows={[
                            ["Transcripts", "Speaker turn", "Need speaker-level for 'what did customer say?'"],
                            ["Documentation", "Section/paragraph", "Need topic-level for 'how do I configure X?'"],
                            ["CRM records", "Row", "Structured lookup, no chunking needed"],
                        ]}
                    />
                </Card>

                <Card className="border-l-4 border-l-sky-400">
                    <h4 className="font-semibold text-sky-700">2. What metadata travels with each unit?</h4>
                    <p className="text-slate-500 mt-1">If you might filter by it or display it, store it.</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {["speaker_name", "speaker_role", "meeting_date", "company_id", "transcript_id", "chunk_index"].map(m => (
                            <div key={m} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <code className="bg-slate-100 px-1 rounded text-sm">{m}</code>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="border-l-4 border-l-sky-400">
                    <h4 className="font-semibold text-sky-700">{"3. What's the source of truth?"}</h4>
                    <p className="text-slate-500 mt-1">Where does this data come from? Can it be wrong?</p>
                </Card>

                <Card className="border-l-4 border-l-sky-400">
                    <h4 className="font-semibold text-sky-700">{"4. What's missing that you wish you had?"}</h4>
                    <p className="text-slate-500 mt-1">{"Don't boil the ocean — start with what you have, add enrichment later."}</p>
                </Card>

                <Card className="border-l-4 border-l-sky-400">
                    <h4 className="font-semibold text-sky-700">5. How does this data change over time?</h4>
                    <p className="text-slate-500 mt-1">{"Append-only? Frequent updates? This affects your sync strategy."}</p>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="The Attribution Problem" subtitle="When your AI can't tell WHO said WHAT">
            <Card className="bg-amber-50 border-amber-200 mb-4">
                <p className="text-amber-900">
                    {"If your data doesn't clearly mark WHO created it, WHEN it was created, and WHETHER it's still current, your AI will mix sources and erode trust."}
                </p>
            </Card>

            <h4 className="font-semibold text-slate-800 mb-3">Attribution Challenges Across Data Types</h4>

            <div className="space-y-4 mb-6">
                <Card className="border-l-4 border-l-sky-500">
                    <h5 className="font-semibold text-sky-900 mb-2">Example 1: Meeting Transcripts</h5>
                    <p className="text-slate-600 mb-2">
                        <span className="font-semibold">Challenge:</span> Speaker roles (customer vs internal), name matching, transcription errors
                    </p>
                    <p className="text-slate-600 mb-2">
                        <span className="font-semibold">Risk:</span> {"Misattributed quotes \u2192 wrong follow-ups, damaged trust"}
                    </p>
                    <DiagramBox>
                        {`Transcription: "John Smith: We're concerned..."
                      │
Your DB has:  "John Smith, Jane Doe" (leverage_team)
                      │
Matching:     speaker_role = 'customer' or 'leverege'
                      │
Retrieval:    WHERE speaker_role = 'customer'
                      │
Result:       Only customer statements (hopefully)`}
                    </DiagramBox>
                    <p className="text-sm text-slate-500 mt-2">
                        {"Common issues: \"Jon Smith\" vs \"John Smith\", first name only, transcription errors"}
                    </p>
                </Card>

                <Card className="border-l-4 border-l-violet-500">
                    <h5 className="font-semibold text-violet-900 mb-2">Example 2: Support Tickets / CRM Notes</h5>
                    <p className="text-slate-600 mb-2">
                        <span className="font-semibold">Challenge:</span> Multiple agents touch one ticket, customer vs agent vs system messages
                    </p>
                    <p className="text-slate-600 mb-2">
                        <span className="font-semibold">Risk:</span> {"AI attributes agent's summary as customer's words"}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                        {"Example: \"Customer is frustrated with billing\" (agent note) \u2192 AI says \"Customer said they're frustrated with billing\" (wrong)"}
                    </p>
                </Card>

                <Card className="border-l-4 border-l-emerald-500">
                    <h5 className="font-semibold text-emerald-900 mb-2">Example 3: Product Documentation / Knowledge Base</h5>
                    <p className="text-slate-600 mb-2">
                        <span className="font-semibold">Challenge:</span> Multiple authors, multiple versions, deprecated vs current content
                    </p>
                    <p className="text-slate-600 mb-2">
                        <span className="font-semibold">Risk:</span> AI cites outdated information as authoritative
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                        {"Example: Old doc says \"Feature X requires manual setup\" but current version is automated \u2192 AI gives wrong instructions"}
                    </p>
                </Card>
            </div>

            <Callout type="success" title="Universal Solution">
                {"Use fuzzy matching with fallback to 'unknown'. Tag content with author, role, timestamp, and status. Review 'unknown' or untagged chunks periodically to improve matching logic."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="How Metadata Prevents Hallucination" subtitle="Tags enable filtering, filtering enables accuracy">
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-rose-200 bg-rose-50">
                    <h4 className="font-semibold text-rose-700 mb-2">Without Metadata</h4>
                    <p className="text-slate-600">
                        {"System retrieves 5 chunks mentioning \"pricing\" — some from Leverege, some from customers. LLM mixes them up."}
                    </p>
                </Card>
                <Card className="border-emerald-200 bg-emerald-50">
                    <h4 className="font-semibold text-emerald-700 mb-2">With Metadata</h4>
                    <p className="text-slate-600">
                        {"System retrieves 5 chunks WHERE speaker_role = 'customer'. LLM only sees customer statements with attribution."}
                    </p>
                </Card>
            </div>

            <Card className="mt-4 bg-emerald-50 border-emerald-200">
                <p className="font-semibold text-emerald-800">
                    {"Metadata enables filtering \u2192 Filtering enables accuracy \u2192 Accuracy enables trust"}
                </p>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="Structured vs. Unstructured Data" subtitle="Your data has two natures — and you need both">
            <p className="text-slate-600 mb-4">
                Most AI systems need to work with data that is both structurally stored (in tables) and semantically
                unstructured (natural language). Understanding this duality is critical.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="p-5 border-l-4 border-blue-400">
                    <h5 className="font-semibold text-blue-900 mb-2">Structurally Stored</h5>
                    <p className="text-sm text-slate-600 mb-3">
                        Data organized in tables with columns, types, and relationships. Queryable with SQL.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg mb-3">
                        <pre className="text-xs font-mono text-blue-800">
                            {`meeting_chunks
├─ id (int)
├─ meeting_id (int)
├─ speaker_name (text)
├─ speaker_role (text)
├─ text (text)
└─ timestamp (datetime)`}
                        </pre>
                    </div>
                    <p className="text-xs text-slate-500">
                        <strong>Good for:</strong> Filtering, counting, temporal queries, exact lookups
                    </p>
                </Card>

                <Card className="p-5 border-l-4 border-purple-400">
                    <h5 className="font-semibold text-purple-900 mb-2">Semantically Unstructured</h5>
                    <p className="text-sm text-slate-600 mb-3">
                        Meaning is in natural language, not in schema. Requires embeddings for semantic search.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg mb-3">
                        <pre className="text-xs font-mono text-purple-800">
                            {`"We're worried about camera 
reliability during peak hours. 
The system goes offline and 
we lose footage."`}
                        </pre>
                    </div>
                    <p className="text-xs text-slate-500">
                        <strong>Good for:</strong> Semantic search, finding similar concepts, understanding intent
                    </p>
                </Card>
            </div>

            <Card className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <h5 className="font-semibold text-indigo-900 mb-2">The Hybrid Approach (What You Actually Need)</h5>
                <p className="text-sm text-slate-600 mb-3">
                    Store data in a structured database (PostgreSQL, MySQL) with proper metadata columns.
                    Generate embeddings for the text content and store them alongside the structured data.
                    Query with SQL for filtering, then use vector similarity for semantic ranking.
                </p>
                <div className="bg-white/60 p-3 rounded-lg text-xs font-mono text-slate-700">
                    {`SELECT * FROM meeting_chunks
WHERE company_id = 'TPI' 
  AND speaker_role = 'customer'
  AND meeting_date > '2024-01-01'
ORDER BY embedding <-> query_embedding
LIMIT 5`}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                    SQL filters by metadata (company, role, date), vector similarity ranks by semantic relevance.
                </p>
            </Card>

            <Callout type="insight" title="Key Insight">
                {"A table can store text, but it cannot understand text. That's why you need both: SQL for structure, embeddings for semantics."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="The Data Pipeline" subtitle="From raw data to AI-ready knowledge">
            <p className="text-slate-600 mb-4">
                Getting data into a shape that AI can use requires a pipeline. Here's the typical flow:
            </p>

            <div className="space-y-3 mb-6">
                {[
                    {
                        step: 1,
                        title: "Ingestion",
                        desc: "Pull raw data from source systems (APIs, databases, files)",
                        example: "Fetch meeting transcripts from Zoom, Gong, or your CRM",
                        color: "blue"
                    },
                    {
                        step: 2,
                        title: "Cleaning & Normalization",
                        desc: "Fix formatting, remove duplicates, standardize fields",
                        example: "Convert timestamps to UTC, normalize speaker names, remove system messages",
                        color: "sky"
                    },
                    {
                        step: 3,
                        title: "Enrichment",
                        desc: "Add metadata, classify content, extract entities",
                        example: "Tag speaker_role (customer vs internal), extract company_id, classify topic",
                        color: "violet"
                    },
                    {
                        step: 4,
                        title: "Chunking",
                        desc: "Split into atomic units based on your retrieval needs",
                        example: "Split by speaker turn for transcripts, by section for docs",
                        color: "purple"
                    },
                    {
                        step: 5,
                        title: "Embedding Generation",
                        desc: "Convert text chunks into vector representations",
                        example: "Use OpenAI embeddings, Cohere, or open-source models",
                        color: "indigo"
                    },
                    {
                        step: 6,
                        title: "Storage",
                        desc: "Store structured data + embeddings in database",
                        example: "PostgreSQL with pgvector, or dedicated vector DB",
                        color: "emerald"
                    },
                ].map((item) => {
                    const bgColors = {
                        blue: "bg-blue-50 border-blue-300",
                        sky: "bg-sky-50 border-sky-300",
                        violet: "bg-violet-50 border-violet-300",
                        purple: "bg-purple-50 border-purple-300",
                        indigo: "bg-indigo-50 border-indigo-300",
                        emerald: "bg-emerald-50 border-emerald-300"
                    };
                    const dotColors = {
                        blue: "bg-blue-500",
                        sky: "bg-sky-500",
                        violet: "bg-violet-500",
                        purple: "bg-purple-500",
                        indigo: "bg-indigo-500",
                        emerald: "bg-emerald-500"
                    };
                    return (
                        <Card key={item.step} className={`${bgColors[item.color]} border-l-4`}>
                            <div className="flex items-start gap-3">
                                <div className={`w-7 h-7 rounded-full ${dotColors[item.color]} text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold`}>
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-semibold text-slate-800">{item.title}</h5>
                                    <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                                    <div className="mt-2 bg-white/60 p-2 rounded text-xs text-slate-700">
                                        <strong>Example:</strong> {item.example}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <Card className="p-5 bg-amber-50 border-amber-200">
                <h5 className="font-semibold text-amber-900 mb-2">Pipeline Considerations</h5>
                <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p><strong>Incremental updates:</strong> Can you process only new/changed data, or do you need to reprocess everything?</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p><strong>Error handling:</strong> What happens when ingestion fails? Do you retry, skip, or alert?</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p><strong>Versioning:</strong> If your chunking strategy changes, can you regenerate embeddings without losing data?</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p><strong>Monitoring:</strong> How do you know if data quality degrades over time?</p>
                    </div>
                </div>
            </Card>

            <Callout type="warning" title="Don't Underestimate This">
                {"The data pipeline is often 70% of the work in a production AI system. Get this right before worrying about model selection or prompt engineering."}
            </Callout>
        </ProgressiveSection>

        <NextSectionNav currentId="data" />
    </div>
);
