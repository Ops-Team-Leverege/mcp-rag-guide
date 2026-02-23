import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, Brain, Zap } from 'lucide-react';
import { Card, Callout, ProgressiveSection } from '../components/ui';
import { NextSectionNav } from '../index';

const PromptEngineeringSection = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-slate-900">Prompt Engineering</h2>

            <Callout type="success" title="THE RULE: Prompt engineering solves 70% of AI output problems — for free, instantly.">
                {"Master this before building anything complex."}
            </Callout>

            <ProgressiveSection number="1" title="The 70% Rule" subtitle="Exhaust these options in order before reaching for complex infrastructure" defaultOpen={true}>
                <div className="space-y-2">
                    {[
                        { technique: "Better Prompts", impact: "70%", cost: "Free, instant", color: "emerald" },
                        { technique: "Few-Shot Examples", impact: "15%", cost: "Free, minutes", color: "sky" },
                        { technique: "Chain-of-Thought", impact: "10%", cost: "Free, minutes", color: "violet" },
                        { technique: "RAG", impact: "4%", cost: "Setup cost", color: "amber" },
                        { technique: "Fine-Tuning", impact: "1%", cost: "$$, days", color: "rose" }
                    ].map((item, i) => {
                        const bgColors = {
                            emerald: "bg-emerald-50 border-emerald-200",
                            sky: "bg-sky-50 border-sky-200",
                            violet: "bg-violet-50 border-violet-200",
                            amber: "bg-amber-50 border-amber-200",
                            rose: "bg-rose-50 border-rose-200"
                        };
                        return (
                            <div key={i} className={`${bgColors[item.color]} border rounded-xl p-4 flex items-center justify-between`}>
                                <div>
                                    <span className="font-semibold text-slate-800">{item.technique}</span>
                                    <span className="text-sm text-slate-500 ml-2">({item.cost})</span>
                                </div>
                                <div className="text-2xl font-semibold text-slate-800">{item.impact}</div>
                            </div>
                        );
                    })}
                </div>

                <Callout type="warning" title="Don't skip ahead">
                    {"Most teams skip straight to RAG or fine-tuning. Don't. A well-written system prompt with few-shot examples will outperform a poorly prompted RAG pipeline every time."}
                </Callout>
            </ProgressiveSection>

            <ProgressiveSection number="2" title="Prompt Engineering vs. Context Engineering" subtitle="The 2025 shift in thinking">
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-sky-50 border-sky-200">
                        <h4 className="font-semibold text-sky-800 mb-2">Prompt Engineering (2023 thinking)</h4>
                        <p className="text-slate-600">{"\"How do I word this instruction?\""}</p>
                        <ul className="mt-2 text-slate-600 space-y-1">
                            <li>{"• Focus on instruction wording"}</li>
                            <li>{"• Static across requests"}</li>
                            <li>{"• The \"what to do\""}</li>
                        </ul>
                    </Card>

                    <Card className="bg-violet-50 border-violet-200">
                        <h4 className="font-semibold text-violet-800 mb-2">Context Engineering (2025 thinking)</h4>
                        <p className="text-slate-600">{"\"What information goes into the context window?\""}</p>
                        <ul className="mt-2 text-slate-600 space-y-1">
                            <li>{"• Focus on data orchestration"}</li>
                            <li>{"• Dynamic per request"}</li>
                            <li>{"• The \"what to reference\""}</li>
                        </ul>
                    </Card>
                </div>

                <Callout type="insight" title="The shift matters">
                    {"In production systems, the prompt (instruction) stays relatively stable. What changes per request is the context — which documents get injected, which knowledge base rows get retrieved. Getting the right data into the window matters more than wordsmithing the instructions."}
                </Callout>
            </ProgressiveSection>

            <ProgressiveSection number="3" title="The Prompt Engineering Stack" subtitle="Every prompt your system sends has these layers">
                <div className="space-y-2">
                    {[
                        { layer: "SYSTEM PROMPT", desc: "Who you are, what you can/can't do", color: "violet" },
                        { layer: "CONTEXT (Retrieved Data)", desc: "Meeting transcripts, product KB, etc.", color: "sky" },
                        { layer: "FEW-SHOT EXAMPLES", desc: "\"Here's what good output looks like\"", color: "emerald" },
                        { layer: "USER QUERY", desc: "The actual question (you can't control this)", color: "amber" },
                        { layer: "OUTPUT FORMAT", desc: "JSON schema, length, structure", color: "rose" }
                    ].map((item, i) => {
                        const bgColors = {
                            violet: "bg-violet-50 border-violet-200 text-violet-800",
                            sky: "bg-sky-50 border-sky-200 text-sky-800",
                            emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
                            amber: "bg-amber-50 border-amber-200 text-amber-800",
                            rose: "bg-rose-50 border-rose-200 text-rose-800"
                        };
                        return (
                            <div key={i} className={`${bgColors[item.color]} border rounded-xl p-4`}>
                                <div className="font-semibold">{item.layer}</div>
                                <div className="text-sm mt-1 opacity-80">{item.desc}</div>
                            </div>
                        );
                    })}
                </div>
            </ProgressiveSection>

            <ProgressiveSection number="4" title="Before/After Examples" subtitle="See the difference good prompting makes">
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Example 1: Meeting Summary</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Card className="bg-rose-50 border-rose-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-rose-600 font-semibold">{"\u274C Bad"}</span>
                                </div>
                                <pre className="text-xs font-mono text-rose-800 whitespace-pre-wrap">
                                    Summarize the meeting.
                                </pre>
                                <p className="text-sm text-rose-700 mt-2">{"Problem: No constraints on length, format, or source. AI will summarize from imagination if context is thin."}</p>
                            </Card>

                            <Card className="bg-emerald-50 border-emerald-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-emerald-600 font-semibold">{"\u2713 Good"}</span>
                                </div>
                                <pre className="text-xs font-mono text-emerald-800 whitespace-pre-wrap">
                                    {`You are a meeting analyst for a sales ops team. Using ONLY the transcript provided below, create a summary with:

1. Key topics discussed (max 5, one sentence each)
2. Action items with owners and deadlines
3. Customer concerns or objections raised

If a section has no relevant content in the transcript, write "None identified." Do NOT fabricate topics that were not discussed.

<transcript>
{retrieved_meeting_chunks}
</transcript>`}
                                </pre>
                            </Card>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Example 2: Product Question (SSOT Authority)</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Card className="bg-rose-50 border-rose-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-rose-600 font-semibold">{"\u274C Bad"}</span>
                                </div>
                                <pre className="text-xs font-mono text-rose-800 whitespace-pre-wrap">
                                    Answer this question about our product.
                                </pre>
                                <p className="text-sm text-rose-700 mt-2">{"Problem: AI will answer from training data, not your actual product specs."}</p>
                            </Card>

                            <Card className="bg-emerald-50 border-emerald-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-emerald-600 font-semibold">{"\u2713 Good"}</span>
                                </div>
                                <pre className="text-xs font-mono text-emerald-800 whitespace-pre-wrap">
                                    {`You are answering a question about PitCrew's product features.

AUTHORITY RULES:
- If the answer exists in the <product_knowledge> section below, use it VERBATIM. This is the Single Source of Truth. Do not rephrase or add interpretation.
- If the answer is NOT in <product_knowledge>, say: "I don't have verified information about that feature. Let me connect you with the product team."
- NEVER guess about pricing, capabilities, or availability.

<product_knowledge>
{retrieved_product_rows}
</product_knowledge>`}
                                </pre>
                            </Card>
                        </div>
                    </div>
                </div>
            </ProgressiveSection>

            <ProgressiveSection number="5" title="Common Prompt Engineering Mistakes" subtitle="And how to fix them">
                <div className="space-y-3">
                    {[
                        { mistake: "No refusal instruction", why: "AI guesses instead of admitting uncertainty", fix: "Add: \"If the answer is not in the context, say so\"" },
                        { mistake: "Putting instructions in the middle", why: "Lost-in-the-middle effect — AI ignores them", fix: "Move critical instructions to top or bottom" },
                        { mistake: "\"Be helpful\" as persona", why: "Too vague — AI defaults to generic chatbot behavior", fix: "Specify exact role, domain, and constraints" },
                        { mistake: "No output format spec", why: "AI picks a random format each time", fix: "Define exact structure with example" },
                        { mistake: "Mixing multiple tasks", why: "AI does all of them poorly", fix: "One prompt = one task (this is why contracts exist)" },
                        { mistake: "Including irrelevant context", why: "AI uses it anyway, diluting answer quality", fix: "Only retrieve and inject what's relevant to this query" },
                        { mistake: "No examples", why: "AI interprets instructions differently than intended", fix: "Add 1-2 few-shot examples for critical prompts" }
                    ].map((item, i) => (
                        <Card key={i} className="bg-slate-50 border-slate-200">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <div className="font-semibold text-slate-800">{item.mistake}</div>
                                    <div className="text-sm text-slate-500 mt-1">{"Why it fails: "}{item.why}</div>
                                    <div className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>{"Fix: "}{item.fix}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </ProgressiveSection>

            <ProgressiveSection number="6" title="Temperature and Sampling" subtitle="Controls randomness in AI output">
                <p className="text-slate-600 mb-4">Temperature controls randomness. Most no-code tools and APIs expose this as a setting.</p>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Temperature</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Behavior</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Use For</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100"><td className="px-5 py-3 font-mono text-slate-700">0</td><td className="px-5 py-3 text-slate-600">{"Deterministic — same input always gives same output"}</td><td className="px-5 py-3 text-slate-600">{"Intent classification, data extraction, factual Q&A"}</td></tr>
                            <tr className="border-b border-slate-100"><td className="px-5 py-3 font-mono text-slate-700">{"0.3\u20130.7"}</td><td className="px-5 py-3 text-slate-600">{"Slight variation — natural-sounding but controlled"}</td><td className="px-5 py-3 text-slate-600">Drafting emails, summaries, creative suggestions</td></tr>
                            <tr><td className="px-5 py-3 font-mono text-slate-700">1.0+</td><td className="px-5 py-3 text-slate-600">High creativity, high hallucination risk</td><td className="px-5 py-3 text-slate-600">{"Brainstorming only — never for factual work"}</td></tr>
                        </tbody>
                    </table>
                </div>

                <Callout type="info" title="In practice">
                    {"Use temperature=0 for intent classification and data extraction (where accuracy matters most), and slightly higher (0.3-0.7) for drafting tasks like email composition."}
                </Callout>
            </ProgressiveSection>

            <ProgressiveSection number="8" title="Anthropic's Technique Order" subtitle="The sequence matters — apply these in order">
                <p className="text-slate-600 mb-4">
                    Anthropic's research shows that prompt engineering techniques work best when applied in a specific order.
                    Start simple, add complexity only when needed.
                </p>

                <div className="space-y-3">
                    {[
                        {
                            step: 1,
                            technique: "Clear and Direct Instructions",
                            desc: "Write explicit, unambiguous instructions. Most problems are solved here.",
                            example: "\"Extract the customer name from this email. Return only the name, nothing else.\"",
                            color: "emerald"
                        },
                        {
                            step: 2,
                            technique: "Examples (Few-Shot)",
                            desc: "Show 1-3 examples of correct input/output pairs.",
                            example: "\"Input: 'Hi, I'm Sarah from Acme Corp' → Output: 'Sarah'\"",
                            color: "sky"
                        },
                        {
                            step: 3,
                            technique: "Let the Model Think (Chain-of-Thought)",
                            desc: "Add \"Think step-by-step\" or \"Explain your reasoning\" for complex tasks.",
                            example: "\"Before answering, list the key facts from the context that support your answer.\"",
                            color: "violet"
                        },
                        {
                            step: 4,
                            technique: "Use Tools and External Knowledge",
                            desc: "Provide retrieved context, enable function calling, or use RAG.",
                            example: "Inject relevant meeting transcripts before asking the question.",
                            color: "amber"
                        },
                        {
                            step: 5,
                            technique: "Agentic Workflows",
                            desc: "Multi-step reasoning where the model decides which tools to use.",
                            example: "\"Research this topic by searching the knowledge base, then draft a summary.\"",
                            color: "rose"
                        },
                    ].map((item) => {
                        const bgColors = {
                            emerald: "bg-emerald-50 border-emerald-300",
                            sky: "bg-sky-50 border-sky-300",
                            violet: "bg-violet-50 border-violet-300",
                            amber: "bg-amber-50 border-amber-300",
                            rose: "bg-rose-50 border-rose-300"
                        };
                        const dotColors = {
                            emerald: "bg-emerald-500",
                            sky: "bg-sky-500",
                            violet: "bg-violet-500",
                            amber: "bg-amber-500",
                            rose: "bg-rose-500"
                        };
                        return (
                            <Card key={item.step} className={`${bgColors[item.color]} border-l-4`}>
                                <div className="flex items-start gap-3">
                                    <div className={`w-7 h-7 rounded-full ${dotColors[item.color]} text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold`}>
                                        {item.step}
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-semibold text-slate-800">{item.technique}</h5>
                                        <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                                        <div className="mt-2 bg-white/60 p-2 rounded text-xs font-mono text-slate-700">
                                            {item.example}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                <Callout type="success" title="The key insight">
                    {"Don't jump to step 5 (agentic workflows) when step 1 (clear instructions) would solve the problem. Each step adds complexity and cost. Start simple, add complexity only when the simpler approach fails."}
                </Callout>
            </ProgressiveSection>

            <ProgressiveSection number="9" title="Adapt Your Prompt to the Model You're Using" subtitle="The most critical production lesson: prompts don't transfer between models">
                <Callout type="danger" title="The hard truth">
                    A prompt that works perfectly on one model will not reliably work on another. This isn't a quirk — it's a fundamental property of how different models were trained and aligned.
                </Callout>

                <p className="text-slate-600 mb-4">
                    When you switch models (to save cost, increase speed, or improve quality), your prompts need re-testing and likely re-tuning.
                    Don't assume your prompts transfer. Benchmark scores don't predict task-specific performance with your data and your prompts.
                </p>

                <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 border-l-4">
                    <h4 className="font-semibold text-amber-900 mb-3">Real Production Example: Claude vs Gemini</h4>
                    <p className="text-slate-700 mb-3">
                        In direct side-by-side comparisons on a complex document generation task with identical prompts and context:
                    </p>
                    <div className="space-y-3">
                        <div className="bg-white/60 p-4 rounded-lg">
                            <p className="font-semibold text-slate-800 mb-1">Claude Opus</p>
                            <p className="text-sm text-slate-600">
                                Consistently incorporated all enumerated instructions, including late-conversation refinements and scope constraints.
                                Treated the prompt as a complete spec and executed against every line.
                            </p>
                        </div>
                        <div className="bg-white/60 p-4 rounded-lg">
                            <p className="font-semibold text-slate-800 mb-1">Gemini Pro</p>
                            <p className="text-sm text-slate-600">
                                Followed the primary instruction well but dropped several secondary refinements — not because it couldn't execute them,
                                but because its defaults weight primary intent more heavily than enumerated sub-requirements.
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-amber-800 mt-3 italic">
                        Neither is wrong. They reflect different training choices. The implication: a prompt with 12 explicit sub-requirements
                        engineered for Claude may need restructuring for Gemini — fewer items, integrated as prose rather than a numbered list.
                    </p>
                </Card>

                <h4 className="font-semibold text-slate-800 mt-6 mb-3">Model Behavior at a Glance</h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Dimension</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">GPT-4o</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Claude</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Gemini</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100">
                                <td className="px-5 py-3 font-semibold text-slate-700">Instruction following</td>
                                <td className="px-5 py-3 text-slate-600">Literal — does exactly what you say, nothing more</td>
                                <td className="px-5 py-3 text-slate-600">Inferential — fills gaps with judgment</td>
                                <td className="px-5 py-3 text-slate-600">Intent-first — primary ask over sub-requirements</td>
                            </tr>
                            <tr className="border-b border-slate-100">
                                <td className="px-5 py-3 font-semibold text-slate-700">Chain-of-thought</td>
                                <td className="px-5 py-3 text-slate-600">Responds well to explicit step instructions</td>
                                <td className="px-5 py-3 text-slate-600">Reasons extensively by default</td>
                                <td className="px-5 py-3 text-slate-600">Moderate</td>
                            </tr>
                            <tr className="border-b border-slate-100">
                                <td className="px-5 py-3 font-semibold text-slate-700">Context window</td>
                                <td className="px-5 py-3 text-slate-600">128K</td>
                                <td className="px-5 py-3 text-slate-600">200K</td>
                                <td className="px-5 py-3 text-slate-600">1M+</td>
                            </tr>
                            <tr className="border-b border-slate-100">
                                <td className="px-5 py-3 font-semibold text-slate-700">Refusal behavior</td>
                                <td className="px-5 py-3 text-slate-600">Conservative on edge cases</td>
                                <td className="px-5 py-3 text-slate-600">Nuanced, context-sensitive</td>
                                <td className="px-5 py-3 text-slate-600">Variable</td>
                            </tr>
                            <tr className="border-b border-slate-100">
                                <td className="px-5 py-3 font-semibold text-slate-700">JSON output reliability</td>
                                <td className="px-5 py-3 text-slate-600">Strong with function calling</td>
                                <td className="px-5 py-3 text-slate-600">Strong with direct instruction</td>
                                <td className="px-5 py-3 text-slate-600">Moderate</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-3 font-semibold text-slate-700">Long context recall</td>
                                <td className="px-5 py-3 text-slate-600">Degrades at high utilization</td>
                                <td className="px-5 py-3 text-slate-600">Degrades at high utilization</td>
                                <td className="px-5 py-3 text-slate-600">Degrades at high utilization</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4 className="font-semibold text-slate-800 mt-6 mb-3">How to Adapt When Switching Models</h4>
                <div className="space-y-3">
                    <Card className="p-5 border-l-4 border-blue-500">
                        <h5 className="font-semibold text-blue-900 mb-2">GPT-4o → Claude</h5>
                        <p className="text-slate-600 text-sm mb-2">
                            You can be less exhaustively explicit. Claude infers reasonable behavior from context.
                        </p>
                        <div className="bg-blue-50 p-3 rounded text-xs">
                            <p className="text-blue-800">
                                <strong>Warning:</strong> Over-specifying can produce rigid, unnatural outputs with Claude.
                            </p>
                        </div>
                    </Card>

                    <Card className="p-5 border-l-4 border-emerald-500">
                        <h5 className="font-semibold text-emerald-900 mb-2">Claude → GPT-4o</h5>
                        <p className="text-slate-600 text-sm mb-2">
                            Be more literal. State every requirement explicitly. GPT-4o will do exactly what you say and nothing more.
                        </p>
                        <div className="bg-emerald-50 p-3 rounded text-xs">
                            <p className="text-emerald-800">
                                <strong>Key insight:</strong> This is a feature, not a bug — but it requires complete instructions.
                            </p>
                        </div>
                    </Card>

                    <Card className="p-5 border-l-4 border-purple-500">
                        <h5 className="font-semibold text-purple-900 mb-2">Either → Gemini</h5>
                        <p className="text-slate-600 text-sm mb-2">
                            Reduce the number of numbered sub-requirements. Gemini handles primary intent well but can drop secondary constraints on long lists.
                        </p>
                        <div className="bg-purple-50 p-3 rounded text-xs">
                            <p className="text-purple-800">
                                <strong>Best practice:</strong> Reduce to the 3–5 most critical requirements and integrate the rest as prose.
                            </p>
                        </div>
                    </Card>

                    <Card className="p-5 border-l-4 border-rose-500">
                        <h5 className="font-semibold text-rose-900 mb-2">Any Switch</h5>
                        <p className="text-slate-600 text-sm">
                            Re-run your golden set before deploying a prompt developed on a different model. Never assume transfer.
                        </p>
                    </Card>
                </div>

                <Callout type="success" title="The production rule">
                    Treat model switching like a deployment event. Test your prompts on the new model with your golden set before going live.
                    Budget time for prompt re-tuning — it's not optional.
                </Callout>
            </ProgressiveSection>

            <ProgressiveSection number="10" title="The Fine-Tuning Trap" subtitle="Why most teams don't need it">
                <Callout type="warning" title="Common misconception">
                    {"Teams hear \"fine-tuning\" and think it's how you make AI better. For most use cases, it's not."}
                </Callout>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <Card className="bg-emerald-50 border-emerald-200">
                        <h4 className="font-semibold text-emerald-800 mb-2">Prompt Engineering</h4>
                        <p className="text-slate-600">{"Writing better instructions for an existing model. The model stays the same; you change what you ask it."}</p>
                        <p className="text-sm text-emerald-600 mt-2">{"\u2713 Free, instant iteration"}</p>
                    </Card>

                    <Card className="bg-rose-50 border-rose-200">
                        <h4 className="font-semibold text-rose-800 mb-2">Fine-Tuning</h4>
                        <p className="text-slate-600">{"Training a new version of the model on your specific data. Creates a custom model that behaves differently."}</p>
                        <p className="text-sm text-rose-600 mt-2">{"\u2717 Expensive, slow, hard to iterate"}</p>
                    </Card>
                </div>

                <Callout type="insight" title="As Chip Huyen puts it">
                    {"\"Fine-tuning is for form, and RAG is for facts.\" If you need the AI to know your data, use RAG. If you need it to write in a very specific style that prompting can't achieve, then consider fine-tuning."}
                </Callout>

                <Card className="bg-rose-50 border-rose-200 mt-4">
                    <p className="font-semibold text-rose-800">
                        {"Rule of thumb: If you haven't spent 40+ hours iterating on prompts, you haven't earned the right to consider fine-tuning."}
                    </p>
                </Card>
            </ProgressiveSection>

            <NextSectionNav currentId="promptengineering" />
        </div>
    );
};

export { PromptEngineeringSection };
