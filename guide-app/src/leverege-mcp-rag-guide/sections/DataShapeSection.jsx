import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox } from '../components/ui';

// Inline diagram component
const DataQualityPyramid = () => (
    <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <div className="flex flex-col items-center gap-1">
            {[
                { label: "AI Output", desc: "Only as good as what's below", color: "bg-red-100 border-red-300 text-red-800", width: "w-40" },
                { label: "Retrieval", desc: "Can only find what's indexed", color: "bg-orange-100 border-orange-300 text-orange-800", width: "w-48" },
                { label: "Embeddings", desc: "Can only represent what's chunked", color: "bg-amber-100 border-amber-300 text-amber-800", width: "w-56" },
                { label: "Chunking", desc: "Can only chunk what's structured", color: "bg-yellow-100 border-yellow-300 text-yellow-800", width: "w-64" },
                { label: "Clean Data", desc: "FOUNDATION", color: "bg-green-100 border-green-400 text-green-800 font-bold", width: "w-72" },
            ].map((layer, i) => (
                <div key={i} className="flex flex-col items-center">
                    {i > 0 && <div className="w-0.5 h-3 bg-gray-300" />}
                    <div className={`${layer.width} ${layer.color} border-2 rounded-lg px-4 py-2 text-center`}>
                        <div className="font-semibold text-sm">{layer.label}</div>
                        <div className="text-xs opacity-75">{layer.desc}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const DataShapeSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-900">Data Shape: Garbage In, Garbage Out</h2>

        <Callout type="danger" title="THE RULE: AI quality is capped by data quality">
            No amount of prompt engineering or model selection can fix bad data.
        </Callout>

        <div className="my-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Why Data Shape Matters More Than You Think</h3>
            <p className="text-gray-700 mb-4">
                Most teams focus on the AI model first. This is backwards. The model is the LAST thing that matters.
            </p>
            <p className="text-gray-700 mb-4">What actually matters:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li><strong>What data you have</strong> - Is it complete? Accurate? Up-to-date?</li>
                <li><strong>How it's structured</strong> - Can you filter by metadata? Is it chunked properly?</li>
                <li><strong>What metadata you capture</strong> - Speaker role? Date? Company? Topic?</li>
            </ul>

            <p className="text-gray-700 mt-4">
                Think of it this way: if you ask "What did TPI's customer say about cameras?" but your data doesn't
                track speaker roles or companies, the AI can't answer accurately no matter how smart the model is.
            </p>
        </div>

        <Callout type="warning" title="This is the Foundation">
            Your AI is only as good as the data it can access. Before thinking about RAG,
            embeddings, or LLMs, you must understand and shape your data.
        </Callout>

        <ProgressiveSection number="1" title="The Data Quality Pyramid" subtitle="Everything depends on clean data" defaultOpen={true}>
            <DataQualityPyramid />
            <Callout type="danger" title="Critical">
                If your data is messy, your AI will confidently give you messy answers.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="The Five Questions" subtitle="Ask these for every data source">
            <div className="space-y-4">
                <Card className="p-4">
                    <h4 className="font-bold text-blue-600">1. What is the atomic unit?</h4>
                    <p className="text-sm text-gray-600 mt-1">What's the smallest meaningful piece you want to retrieve?</p>
                    <ComparisonTable
                        headers={["Data Type", "Atomic Unit", "Why"]}
                        rows={[
                            ["Transcripts", "Speaker turn", "Need speaker-level for 'what did customer say?'"],
                            ["Documentation", "Section/paragraph", "Need topic-level for 'how do I configure X?'"],
                            ["CRM records", "Row", "Structured lookup, no chunking needed"],
                        ]}
                    />
                </Card>

                <Card className="p-4">
                    <h4 className="font-bold text-blue-600">2. What metadata travels with each unit?</h4>
                    <p className="text-sm text-gray-600 mt-1">If you might filter by it or display it, store it.</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {["speaker_name", "speaker_role", "meeting_date", "company_id", "transcript_id", "chunk_index"].map(m => (
                            <div key={m} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <code className="bg-gray-100 px-1 rounded">{m}</code>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-4">
                    <h4 className="font-bold text-blue-600">3. What's the source of truth?</h4>
                    <p className="text-sm text-gray-600 mt-1">Where does this data come from? Can it be wrong?</p>
                </Card>

                <Card className="p-4">
                    <h4 className="font-bold text-blue-600">4. What's missing that you wish you had?</h4>
                    <p className="text-sm text-gray-600 mt-1">Don't boil the ocean — start with what you have, add enrichment later.</p>
                </Card>

                <Card className="p-4">
                    <h4 className="font-bold text-blue-600">5. How does this data change over time?</h4>
                    <p className="text-sm text-gray-600 mt-1">Append-only? Frequent updates? This affects your sync strategy.</p>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="The Attribution Problem" subtitle="When your AI can't tell WHO said WHAT">
            <Card className="p-4 bg-amber-50 border-amber-200 mb-4">
                <p className="text-amber-900">
                    If your data doesn't clearly mark <strong>WHO</strong> created it, <strong>WHEN</strong> it was created,
                    and <strong>WHETHER</strong> it's still current, your AI will mix sources and erode trust.
                </p>
            </Card>

            <h4 className="font-bold mb-3">Attribution Challenges Across Data Types</h4>

            <div className="space-y-4 mb-6">
                <Card className="p-4 border-l-4 border-blue-500">
                    <h5 className="font-bold text-blue-900 mb-2">Example 1: Meeting Transcripts</h5>
                    <p className="text-sm text-gray-700 mb-2">
                        <strong>Challenge:</strong> Speaker roles (customer vs internal), name matching, transcription errors
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        <strong>Risk:</strong> Misattributed quotes → wrong follow-ups, damaged trust
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
                    <p className="text-sm text-gray-600 mt-2">
                        Common issues: "Jon Smith" vs "John Smith", first name only, transcription errors
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-purple-500">
                    <h5 className="font-bold text-purple-900 mb-2">Example 2: Support Tickets / CRM Notes</h5>
                    <p className="text-sm text-gray-700 mb-2">
                        <strong>Challenge:</strong> Multiple agents touch one ticket, customer vs agent vs system messages
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        <strong>Risk:</strong> AI attributes agent's summary as customer's words
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        Example: "Customer is frustrated with billing" (agent note) → AI says "Customer said they're frustrated with billing" (wrong)
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-green-500">
                    <h5 className="font-bold text-green-900 mb-2">Example 3: Product Documentation / Knowledge Base</h5>
                    <p className="text-sm text-gray-700 mb-2">
                        <strong>Challenge:</strong> Multiple authors, multiple versions, deprecated vs current content
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        <strong>Risk:</strong> AI cites outdated information as authoritative
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        Example: Old doc says "Feature X requires manual setup" but current version is automated → AI gives wrong instructions
                    </p>
                </Card>
            </div>

            <Callout type="success" title="Universal Solution">
                Use fuzzy matching with fallback to 'unknown'. Tag content with author, role, timestamp, and status.
                Review 'unknown' or untagged chunks periodically to improve matching logic.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="How Metadata Prevents Hallucination" subtitle="Tags enable filtering, filtering enables accuracy">
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 border-red-200">
                    <h4 className="font-bold text-red-600 mb-2">Without Metadata</h4>
                    <p className="text-sm">
                        System retrieves 5 chunks mentioning "pricing" — some from Leverege,
                        some from customers. LLM mixes them up.
                    </p>
                </Card>
                <Card className="p-4 border-green-200">
                    <h4 className="font-bold text-green-600 mb-2">With Metadata</h4>
                    <p className="text-sm">
                        System retrieves 5 chunks WHERE speaker_role = 'customer'.
                        LLM only sees customer statements with attribution.
                    </p>
                </Card>
            </div>

            <Card className="p-4 mt-4 bg-emerald-50 border-emerald-200">
                <p className="font-semibold text-emerald-800">
                    Metadata enables filtering → Filtering enables accuracy → Accuracy enables trust
                </p>
            </Card>
        </ProgressiveSection>
    </div>
);
