import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, Brain, Zap } from 'lucide-react';

const PromptEngineeringSection = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Prompt Engineering</h2>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-6 h-6 text-purple-600" />
                    <h3 className="text-lg font-bold text-purple-900">THE RULE: Prompt engineering solves 70% of AI output problems — for free, instantly.</h3>
                </div>
                <p className="text-purple-800">Master this before building anything complex.</p>
            </div>

            {/* The 70% Rule */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">The 70% Rule</h3>
                <p className="text-gray-700 mb-4">Before reaching for complex infrastructure, exhaust these options in order:</p>

                <div className="space-y-3">
                    {[
                        { technique: "Better Prompts", impact: "70%", cost: "Free, instant", color: "green" },
                        { technique: "Few-Shot Examples", impact: "15%", cost: "Free, minutes", color: "blue" },
                        { technique: "Chain-of-Thought", impact: "10%", cost: "Free, minutes", color: "purple" },
                        { technique: "RAG", impact: "4%", cost: "Setup cost", color: "amber" },
                        { technique: "Fine-Tuning", impact: "1%", cost: "$$$, days", color: "red" }
                    ].map((item, i) => {
                        const bgColors = {
                            green: "bg-green-50 border-green-300",
                            blue: "bg-blue-50 border-blue-300",
                            purple: "bg-purple-50 border-purple-300",
                            amber: "bg-amber-50 border-amber-300",
                            red: "bg-red-50 border-red-300"
                        };
                        return (
                            <div key={i} className={`${bgColors[item.color]} border-2 rounded-lg p-4 flex items-center justify-between`}>
                                <div>
                                    <span className="font-bold">{item.technique}</span>
                                    <span className="text-sm text-gray-600 ml-2">({item.cost})</span>
                                </div>
                                <div className="text-2xl font-bold">{item.impact}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded-lg">
                    <p className="text-sm text-amber-900">
                        <strong>Most teams skip straight to RAG or fine-tuning.</strong> Don't. A well-written system prompt with few-shot examples will outperform a poorly prompted RAG pipeline every time.
                    </p>
                </div>
            </div>

            {/* Prompt vs Context Engineering */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Prompt Engineering vs. Context Engineering</h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg border border-blue-200 p-4">
                        <h4 className="font-bold text-blue-800 mb-2">Prompt Engineering (2023 thinking)</h4>
                        <p className="text-sm text-gray-700">"How do I word this instruction?"</p>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                            <li>• Focus on instruction wording</li>
                            <li>• Static across requests</li>
                            <li>• The "what to do"</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg border border-cyan-200 p-4">
                        <h4 className="font-bold text-cyan-800 mb-2">Context Engineering (2025 thinking)</h4>
                        <p className="text-sm text-gray-700">"What information goes into the context window?"</p>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                            <li>• Focus on data orchestration</li>
                            <li>• Dynamic per request</li>
                            <li>• The "what to reference"</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-4 p-3 bg-cyan-100 border border-cyan-300 rounded-lg">
                    <p className="text-sm text-cyan-900">
                        <strong>The shift matters:</strong> In production systems, the prompt (instruction) stays relatively stable. What changes per request is the context — which documents get injected, which knowledge base rows get retrieved. Getting the right data into the window matters more than wordsmithing the instructions.
                    </p>
                </div>
            </div>

            {/* The Prompt Engineering Stack */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">The Prompt Engineering Stack</h3>
                <p className="text-gray-700 mb-4">Every prompt your system sends to an LLM has these layers:</p>

                <div className="space-y-2">
                    {[
                        { layer: "SYSTEM PROMPT", desc: "Who you are, what you can/can't do", color: "purple" },
                        { layer: "CONTEXT (Retrieved Data)", desc: "Meeting transcripts, product KB, etc.", color: "blue" },
                        { layer: "FEW-SHOT EXAMPLES", desc: "\"Here's what good output looks like\"", color: "green" },
                        { layer: "USER QUERY", desc: "The actual question (you can't control this)", color: "amber" },
                        { layer: "OUTPUT FORMAT", desc: "JSON schema, length, structure", color: "red" }
                    ].map((item, i) => {
                        const bgColors = {
                            purple: "bg-purple-100 border-purple-300 text-purple-800",
                            blue: "bg-blue-100 border-blue-300 text-blue-800",
                            green: "bg-green-100 border-green-300 text-green-800",
                            amber: "bg-amber-100 border-amber-300 text-amber-800",
                            red: "bg-red-100 border-red-300 text-red-800"
                        };
                        return (
                            <div key={i} className={`${bgColors[item.color]} border-2 rounded-lg p-3`}>
                                <div className="font-bold text-sm">{item.layer}</div>
                                <div className="text-xs mt-1">{item.desc}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Before/After Examples */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Before/After Examples</h3>

                <div className="space-y-6">
                    {/* Example 1: Meeting Summary */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-3">Example 1: Meeting Summary</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-red-600 font-bold">❌ Bad</span>
                                </div>
                                <pre className="text-xs font-mono text-red-800 whitespace-pre-wrap">
                                    Summarize the meeting.
                                </pre>
                                <p className="text-xs text-red-700 mt-2">Problem: No constraints on length, format, or source. AI will summarize from imagination if context is thin.</p>
                            </div>

                            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-green-600 font-bold">✓ Good</span>
                                </div>
                                <pre className="text-xs font-mono text-green-800 whitespace-pre-wrap">
                                    {`You are a meeting analyst for a sales ops team. Using ONLY the transcript provided below, create a summary with:

1. Key topics discussed (max 5, one sentence each)
2. Action items with owners and deadlines
3. Customer concerns or objections raised

If a section has no relevant content in the transcript, write "None identified." Do NOT fabricate topics that were not discussed.

<transcript>
{retrieved_meeting_chunks}
</transcript>`}
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Example 2: Product Question */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-3">Example 2: Product Question (SSOT Authority)</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-red-600 font-bold">❌ Bad</span>
                                </div>
                                <pre className="text-xs font-mono text-red-800 whitespace-pre-wrap">
                                    Answer this question about our product.
                                </pre>
                                <p className="text-xs text-red-700 mt-2">Problem: AI will answer from training data, not your actual product specs.</p>
                            </div>

                            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-green-600 font-bold">✓ Good</span>
                                </div>
                                <pre className="text-xs font-mono text-green-800 whitespace-pre-wrap">
                                    {`You are answering a question about PitCrew's product features.

AUTHORITY RULES:
- If the answer exists in the <product_knowledge> section below, use it VERBATIM. This is the Single Source of Truth. Do not rephrase or add interpretation.
- If the answer is NOT in <product_knowledge>, say: "I don't have verified information about that feature. Let me connect you with the product team."
- NEVER guess about pricing, capabilities, or availability.

<product_knowledge>
{retrieved_product_rows}
</product_knowledge>`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Common Prompt Engineering Mistakes</h3>

                <div className="space-y-3">
                    {[
                        {
                            mistake: "No refusal instruction",
                            why: "AI guesses instead of admitting uncertainty",
                            fix: "Add: \"If the answer is not in the context, say so\""
                        },
                        {
                            mistake: "Putting instructions in the middle",
                            why: "Lost-in-the-middle effect — AI ignores them",
                            fix: "Move critical instructions to top or bottom"
                        },
                        {
                            mistake: "\"Be helpful\" as persona",
                            why: "Too vague — AI defaults to generic chatbot behavior",
                            fix: "Specify exact role, domain, and constraints"
                        },
                        {
                            mistake: "No output format spec",
                            why: "AI picks a random format each time",
                            fix: "Define exact structure with example"
                        },
                        {
                            mistake: "Mixing multiple tasks",
                            why: "AI does all of them poorly",
                            fix: "One prompt = one task (this is why contracts exist)"
                        },
                        {
                            mistake: "Including irrelevant context",
                            why: "AI uses it anyway, diluting answer quality",
                            fix: "Only retrieve and inject what's relevant to this query"
                        },
                        {
                            mistake: "No examples",
                            why: "AI interprets instructions differently than intended",
                            fix: "Add 1-2 few-shot examples for critical prompts"
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <div className="font-bold text-gray-900">{item.mistake}</div>
                                    <div className="text-sm text-gray-600 mt-1">Why it fails: {item.why}</div>
                                    <div className="text-sm text-green-700 mt-1 flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Fix: {item.fix}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Temperature and Sampling */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Temperature and Sampling</h3>
                <p className="text-gray-700 mb-4">Temperature controls randomness. Most no-code tools and APIs expose this as a setting.</p>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Temperature</th>
                                <th className="px-4 py-2 text-left">Behavior</th>
                                <th className="px-4 py-2 text-left">Use For</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2 font-mono">0</td>
                                <td className="px-4 py-2">Deterministic — same input always gives same output</td>
                                <td className="px-4 py-2">Intent classification, data extraction, factual Q&A</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2 font-mono">0.3–0.7</td>
                                <td className="px-4 py-2">Slight variation — natural-sounding but controlled</td>
                                <td className="px-4 py-2">Drafting emails, summaries, creative suggestions</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-mono">1.0+</td>
                                <td className="px-4 py-2">High creativity, high hallucination risk</td>
                                <td className="px-4 py-2">Brainstorming only — never for factual work</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                    <p className="text-sm text-blue-900">
                        <strong>In practice:</strong> Use temperature=0 for intent classification and data extraction (where accuracy matters most), and slightly higher (0.3-0.7) for drafting tasks like email composition.
                    </p>
                </div>
            </div>

            {/* The Fine-Tuning Trap */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-xl font-bold text-amber-900 mb-2">The Fine-Tuning Trap</h3>
                        <p className="text-amber-800 mb-3">
                            Teams hear "fine-tuning" and think it's how you make AI better. For most use cases, it's not.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg border border-amber-200 p-3">
                                <h4 className="font-bold text-amber-900 mb-2">Prompt Engineering</h4>
                                <p className="text-sm text-gray-700">Writing better instructions for an existing model. The model stays the same; you change what you ask it.</p>
                                <p className="text-xs text-green-700 mt-2">✓ Free, instant iteration</p>
                            </div>

                            <div className="bg-white rounded-lg border border-amber-200 p-3">
                                <h4 className="font-bold text-amber-900 mb-2">Fine-Tuning</h4>
                                <p className="text-sm text-gray-700">Training a new version of the model on your specific data. Creates a custom model that behaves differently.</p>
                                <p className="text-xs text-red-700 mt-2">✗ Expensive, slow, hard to iterate</p>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-amber-100 border border-amber-200 rounded-lg">
                            <p className="text-sm text-amber-900">
                                <strong>As Chip Huyen puts it:</strong> "Fine-tuning is for form, and RAG is for facts." If you need the AI to know your data, use RAG. If you need it to write in a very specific style that prompting can't achieve, then consider fine-tuning.
                            </p>
                        </div>

                        <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
                            <p className="text-sm text-red-900 font-medium">
                                Rule of thumb: If you haven't spent 40+ hours iterating on prompts, you haven't earned the right to consider fine-tuning.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromptEngineeringSection;
