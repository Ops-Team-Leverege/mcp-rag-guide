import React from 'react';
import { Bug, Search, AlertTriangle, CheckCircle, Terminal } from 'lucide-react';
import DebugFlowDiagram from '../components/diagrams/DebugFlowDiagram';

const DebuggingSection = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Debugging AI Systems</h2>

            <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                    <Bug className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-bold text-red-900">When things go wrong (they will)</h3>
                </div>
                <p className="text-red-800">
                    AI systems fail in ways that are harder to debug than traditional software.
                    This section gives you a systematic approach.
                </p>
            </div>

            {/* The 5-Minute Debug Protocol */}
            <DebugFlowDiagram />

            {/* Answer Shaping (Often Missed) */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Answer Shaping (Often Missed)</h3>
                <p className="text-gray-700 mb-4">
                    Different question types need different response shapes. Most systems treat every query the same —
                    they always return a summary. This frustrates users.
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Question Type</th>
                                <th className="px-4 py-2 text-left">Expected Shape</th>
                                <th className="px-4 py-2 text-left">Common Mistake</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2">"Did Acme mention a timeline?"</td>
                                <td className="px-4 py-2 font-semibold text-green-700">Yes/no + quote if yes</td>
                                <td className="px-4 py-2 text-red-600">Returns a 3-paragraph summary</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2">"Who asked about pricing?"</td>
                                <td className="px-4 py-2 font-semibold text-green-700">Name + quote</td>
                                <td className="px-4 py-2 text-red-600">Returns a meeting summary mentioning pricing</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2">"What were the action items?"</td>
                                <td className="px-4 py-2 font-semibold text-green-700">Bulleted list with owners</td>
                                <td className="px-4 py-2 text-red-600">Returns a narrative paragraph</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">"Draft a follow-up email"</td>
                                <td className="px-4 py-2 font-semibold text-green-700">Ready-to-send email</td>
                                <td className="px-4 py-2 text-red-600">Returns bullet points of topics</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded-lg">
                    <h5 className="font-bold text-blue-900 mb-2">The Fix: Detect Question Type</h5>
                    <p className="text-sm text-blue-800 mb-3">
                        Pass the question type to the LLM as part of the contract. Add to your system prompt:
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto font-mono">
                        {`Detect the question type and shape your answer accordingly:
- Yes/No questions → Answer yes or no first, then provide supporting evidence
- "Who" questions → Name the person first, then provide context
- "What" questions → State the answer first, then elaborate if needed
- List requests → Use bullet points with one item per line
- Draft requests → Write ready-to-use text, not a summary of what to write`}
                    </pre>
                </div>
            </div>

            {/* The Logging Imperative */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-purple-600" />
                    The Logging Imperative
                </h3>
                <p className="text-gray-700 mb-4">
                    Without logs, debugging is guesswork. Every request should log structured data at every decision point.
                </p>

                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
                    <div className="text-xs font-mono space-y-1">
                        <div className="text-blue-400">[DecisionLayer]</div>
                        <div className="ml-4">Intent: SINGLE_MEETING (keyword_fast_path)</div>
                        <div className="ml-4">Contract: CUSTOMER_QUESTIONS</div>

                        <div className="text-green-400 mt-2">[ContractExecutor]</div>
                        <div className="ml-4">Evidence found: 3 chunks from meeting abc123</div>
                        <div className="ml-4">Authority check: PASS (ssotMode=none)</div>

                        <div className="text-purple-400 mt-2">[Composer]</div>
                        <div className="ml-4">Response generated: 245 tokens, 2 citations</div>
                    </div>
                </div>

                <div className="p-3 bg-purple-100 border border-purple-300 rounded-lg">
                    <p className="text-sm text-purple-900">
                        <strong>Best practice:</strong> Component-prefixed logging. Every module logs with a prefix
                        so you can filter and trace. This ensures end-to-end traceability. No "LLM vibes" behavior —
                        every decision is logged and auditable.
                    </p>
                </div>
            </div>

            {/* What to Log */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">What to Log (Minimum)</h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <div className="font-semibold text-blue-900 mb-1">Intent detected</div>
                            <div className="text-xs text-blue-700">And method: keyword or LLM</div>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded p-3">
                            <div className="font-semibold text-purple-900 mb-1">Scope resolved</div>
                            <div className="text-xs text-purple-700">Company ID, meeting ID, filters</div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                            <div className="font-semibold text-green-900 mb-1">Data retrieved</div>
                            <div className="text-xs text-green-700">With IDs and chunk count</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-amber-50 border border-amber-200 rounded p-3">
                            <div className="font-semibold text-amber-900 mb-1">Prompt sent</div>
                            <div className="text-xs text-amber-700">Or hash for privacy</div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded p-3">
                            <div className="font-semibold text-red-900 mb-1">Response received</div>
                            <div className="text-xs text-red-700">Token count, citations</div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded p-3">
                            <div className="font-semibold text-gray-900 mb-1">Latency per step</div>
                            <div className="text-xs text-gray-700">For performance optimization</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* When to Escalate to Humans */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-xl font-bold text-amber-900 mb-2">When to Escalate to Humans</h3>
                        <p className="text-amber-800 mb-4">
                            Not every problem should be solved by the AI. Know when to hand off:
                        </p>

                        <div className="space-y-2">
                            {[
                                "User asks for something outside your defined scope",
                                "Confidence score is below threshold (e.g., <0.7)",
                                "No relevant data found after retrieval",
                                "User explicitly requests human help",
                                "Query involves sensitive data or high-stakes decisions",
                                "System detects potential hallucination (no citations available)"
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 bg-white rounded p-2 border border-amber-200">
                                    <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-amber-900">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 p-3 bg-amber-100 border border-amber-200 rounded">
                            <p className="text-sm text-amber-900 font-medium">
                                <strong>Remember:</strong> "I don't know, let me connect you with someone who does"
                                is always better than a confident wrong answer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebuggingSection;
