import React from 'react';
import { CheckCircle, AlertTriangle, Brain, Shield, Lightbulb } from 'lucide-react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox, QuizQuestion } from '../components/ui';
import BeforeYouBuildDiagram from '../components/diagrams/BeforeYouBuildDiagram';
import GroundingDiagram from '../components/diagrams/GroundingDiagram';
import { NextSectionNav } from '../index';

export const MindsetSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-semibold text-slate-900">The Most Important Lesson</h2>

        <Callout type="insight" title="The mindset shift">
            {"Before you start creating anything, you need to understand why building production AI is fundamentally different from using consumer AI tools."}
        </Callout>

        <ProgressiveSection number="1" title="Before You Build: Do You Actually Need This?" subtitle="The best architecture is the one you don't need to build" defaultOpen={true}>
            <Callout type="warning" title="The most expensive AI mistakes happen before development starts">
                When the use case is wrong, not the implementation.
            </Callout>

            <h4 className="font-semibold mb-3 mt-4">Don't Build If:</h4>
            <div className="space-y-3">
                <Card className="p-5 border-l-4 border-rose-500">
                    <h5 className="font-semibold text-rose-900 mb-2">The data is static and fits in a document</h5>
                    <p className="text-sm text-slate-600">
                        A well-organized wiki, FAQ page, or dashboard is faster, cheaper, and more reliable than an AI system.
                        If the answer never changes, AI adds no value and introduces unnecessary failure modes.
                    </p>
                </Card>

                <Card className="p-5 border-l-4 border-rose-500">
                    <h5 className="font-semibold text-rose-900 mb-2">There's no ambiguity or reasoning needed</h5>
                    <p className="text-sm text-slate-600">
                        If the logic is deterministic — look up a value, run a calculation, filter a list — write code.
                        AI is for tasks where the answer requires interpretation, synthesis, or judgment that can't be hardcoded.
                    </p>
                </Card>

                <Card className="p-5 border-l-4 border-rose-500">
                    <h5 className="font-semibold text-rose-900 mb-2">You don't know the use cases yet</h5>
                    <p className="text-sm text-slate-600">
                        Building before you understand the problem leads to systems that answer the wrong questions well.
                        Do product discovery first. Talk to the people who will use it. Map the actual questions they ask.
                    </p>
                </Card>

                <Card className="p-5 border-l-4 border-rose-500">
                    <h5 className="font-semibold text-rose-900 mb-2">You have no accuracy requirements</h5>
                    <p className="text-sm text-slate-600">
                        If you can't define what "correct" looks like, you can't evaluate, improve, or trust the system.
                        "It seems good" is not a success criterion.
                    </p>
                </Card>

                <Card className="p-5 border-l-4 border-rose-500">
                    <h5 className="font-semibold text-rose-900 mb-2">You need critical accuracy without human review</h5>
                    <p className="text-sm text-slate-600">
                        AI systems make mistakes — always. For high-stakes decisions in medical, legal, financial, or safety-critical contexts,
                        always design a human review step into the workflow. AI can augment these decisions; it should not make them autonomously.
                    </p>
                </Card>
            </div>

            <Card className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300 mt-6">
                <h5 className="font-semibold text-emerald-900 mb-4 text-lg">The Right Question</h5>
                <p className="text-slate-700 text-base leading-relaxed">
                    The right question isn't "can we use AI?" — it's "does AI make this meaningfully better than the alternative,
                    and are we prepared to own what happens when it's wrong?"
                </p>
            </Card>

            <BeforeYouBuildDiagram />
        </ProgressiveSection>

        <ProgressiveSection number="2" title="The Consumer AI Illusion" subtitle="Why ChatGPT demos are misleading">
            <Card className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-4">
                <div className="flex items-start gap-3">
                    <Brain className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold text-blue-900">The Illusion</p>
                        <p className="text-sm text-blue-800 mt-1">
                            You've used ChatGPT, Claude, Gemini. You drop in files, ask questions, get answers.
                            It feels like magic. This creates a dangerous expectation that you can "just ask the AI" anything
                            and get reliable answers.
                        </p>
                    </div>
                </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 border-slate-300 bg-slate-50">
                    <h3 className="font-semibold text-slate-600 mb-3">What You Think Happens</h3>
                    <DiagramBox>
                        {`Files → AI → Answer

"The AI read my files and 
knows the answer"`}
                    </DiagramBox>
                </Card>
                <Card className="p-4 border-blue-200 bg-blue-50">
                    <h3 className="font-semibold text-blue-700 mb-3">What Actually Happens</h3>
                    <DiagramBox>
                        {`Files → Chunking → Embeddings → 
Vector DB → Retrieval → 
Prompt Assembly → LLM → 
Validation → Answer`}
                    </DiagramBox>
                </Card>
            </div>

            <p className="mt-4 text-slate-500">
                Consumer products hide this complexity. They make tradeoffs you don't see: generic chunking,
                no metadata filtering, no source verification. These tradeoffs are fine for casual use
                but dangerous for business-critical applications.
            </p>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="The Hallucination Problem" subtitle="Why AI makes things up — and how to prevent it">
            <Callout type="danger" title="The fundamental truth">
                AI models don't retrieve facts — they generate plausible text. A model that sounds confident is not a model that is correct. Understanding how hallucination happens is the first step to preventing it.
            </Callout>

            <h4 className="font-semibold mb-3 mt-6">Three Hallucination Mechanisms</h4>
            <div className="space-y-3 mb-6">
                <Card className="p-5 border-l-4 border-rose-500">
                    <h5 className="font-semibold text-rose-900 mb-2">1. Gap Filling</h5>
                    <p className="text-sm text-slate-600 mb-3">
                        When context is incomplete, models fill the gap with the most statistically plausible continuation.
                        There is no signal that information is missing — the model simply generates what should be there.
                    </p>
                    <div className="bg-rose-50 p-3 rounded-lg text-sm">
                        <p className="text-slate-700 mb-1"><strong>Example:</strong></p>
                        <p className="text-slate-600">
                            Prompt: "What were Q3 results for the Asia-Pacific region?" — If Asia-Pacific data is absent from context,
                            the model may generate plausible-sounding numbers rather than reporting that the data isn't available.
                            The output looks identical to a grounded response.
                        </p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-rose-500">
                    <h5 className="font-semibold text-rose-900 mb-2">2. Confabulation</h5>
                    <p className="text-sm text-slate-600 mb-3">
                        The model invents specific details — names, dates, citations, statistics — with no source material at all,
                        and expresses them with full confidence. Most dangerous for requests that imply facts should exist.
                    </p>
                    <div className="bg-rose-50 p-3 rounded-lg text-sm">
                        <p className="text-slate-700 mb-1"><strong>Example:</strong></p>
                        <p className="text-slate-600">
                            Prompt: "Cite three studies on customer churn in SaaS." Without real studies in context,
                            the model will generate plausible-sounding fake citations. Author names, journal names,
                            and publication years will all look real.
                        </p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-rose-500">
                    <h5 className="font-semibold text-rose-900 mb-2">3. Selective Omission and Distortion</h5>
                    <p className="text-sm text-slate-600 mb-3">
                        The model softens negatives, loses critical nuance, or drops signals that feel uncomfortable —
                        particularly in summarization. This is the most insidious form because the output isn't wrong — it's just misleading.
                    </p>
                    <div className="bg-rose-50 p-3 rounded-lg text-sm">
                        <p className="text-slate-700 mb-1"><strong>Example:</strong></p>
                        <p className="text-slate-600">
                            Source text: "We need this fixed before renewal or we're walking."
                            Summarized as: "Customer mentioned the renewal timeline."
                            The sentiment and urgency are gone.
                        </p>
                    </div>
                </Card>
            </div>

            <h4 className="font-semibold mb-3 mt-6">Prevention Techniques</h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Technique</th>
                            <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">How to Apply</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-100">
                            <td className="px-5 py-3 font-semibold text-slate-700">Extractive prompting</td>
                            <td className="px-5 py-3 text-slate-600">"Answer only using information explicitly stated in the context below."</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="px-5 py-3 font-semibold text-slate-700">Citation requirements</td>
                            <td className="px-5 py-3 text-slate-600">"For every claim, include a direct quote from the source."</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="px-5 py-3 font-semibold text-slate-700">Null state instructions</td>
                            <td className="px-5 py-3 text-slate-600">"If the answer is not present in the context, respond: 'I don't have that information.'"</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="px-5 py-3 font-semibold text-slate-700">Temperature = 0</td>
                            <td className="px-5 py-3 text-slate-600">Reduces randomness for factual retrieval tasks. Not a cure, but reduces variance.</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="px-5 py-3 font-semibold text-slate-700">Negative framing protection</td>
                            <td className="px-5 py-3 text-slate-600">"Do not soften, reframe, or generalize negative statements. Preserve the original tone."</td>
                        </tr>
                        <tr>
                            <td className="px-5 py-3 font-semibold text-slate-700">Self-consistency sampling</td>
                            <td className="px-5 py-3 text-slate-600">Run the same prompt 3 times with temperature {">"} 0. Flag answers that diverge across runs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4 className="font-semibold mb-3">How Hallucinations Manifest: Common Patterns</h4>
            <div className="space-y-3">
                <Card className="p-4 border-l-4 border-amber-400">
                    <h5 className="font-semibold text-slate-800 mb-1">1. Fake Specificity</h5>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-slate-400 text-xs mb-1">You ask:</p>
                            <p>"What TV model did the customer mention?"</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                            <p className="text-amber-600 text-xs mb-1">AI fabricates:</p>
                            <p>"55-inch TCL Google TV" <span className="text-xs text-slate-400">(transcript said "I don't see a brand")</span></p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-amber-400">
                    <h5 className="font-semibold text-slate-800 mb-1">2. Confident Gap-Filling</h5>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-slate-400 text-xs mb-1">You ask:</p>
                            <p>"What's our contract renewal date with Acme Corp?"</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                            <p className="text-amber-600 text-xs mb-1">AI fabricates:</p>
                            <p>"March 15, 2026" <span className="text-xs text-slate-400">(no date exists in any document)</span></p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-amber-400">
                    <h5 className="font-semibold text-slate-800 mb-1">3. Context Collapse</h5>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-slate-400 text-xs mb-1">Source says:</p>
                            <p>"Alice raised the issue. Bob will fix it."</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                            <p className="text-amber-600 text-xs mb-1">AI merges:</p>
                            <p>"Alice is fixing the issue" <span className="text-xs text-slate-400">(wrong person assigned)</span></p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-amber-400">
                    <h5 className="font-semibold text-slate-800 mb-1">4. Selective Content Dropping</h5>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-slate-400 text-xs mb-1">Source says:</p>
                            <p>"Revenue grew 12% but margins declined 3% due to increased costs"</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                            <p className="text-amber-600 text-xs mb-1">AI summarizes:</p>
                            <p>"Revenue grew 12%" <span className="text-xs text-slate-400">(drops the negative part)</span></p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-amber-400">
                    <h5 className="font-semibold text-slate-800 mb-1">5. Ghost Content Generation</h5>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-slate-400 text-xs mb-1">You ask:</p>
                            <p>"Extract all Q&A pairs from this meeting"</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                            <p className="text-amber-600 text-xs mb-1">AI invents:</p>
                            <p>"Q: When will it ship? A: August 15th" <span className="text-xs text-slate-400">(neither existed in transcript)</span></p>
                        </div>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="The Mindset Shift" subtitle="From consumer thinking to production thinking">
            <p className="text-slate-500 mb-4">
                The shift isn't about using better models — it's about engineering for reliability.
                This applies whether you're building RAG systems, agentic workflows, fine-tuned models, or any AI application.
            </p>

            <ComparisonTable
                headers={["Consumer AI Mindset", "Production AI Mindset"]}
                rows={[
                    ['"AI knows the answer"', '"AI generates text based on what we retrieve and how we prompt"'],
                    ['"Just upload and ask"', '"Structure, tag, validate, then ask with constraints"'],
                    ['"It\'s usually right"', '"It\'s only as right as our data pipeline + grounding"'],
                    ['"Trust the output"', '"Verify the output has citations and sources"'],
                    ['"One model does everything"', '"Route to the right model for each task"'],
                    ['"Prompt engineering is enough"', '"Architecture, data quality, and evaluation matter more"'],
                    ['"Magic"', '"Engineering"'],
                ]}
            />

            <h4 className="font-semibold mt-6 mb-3">The Four Levers You Control</h4>
            <p className="text-slate-500 mb-4">
                In production AI, you don't control the model's internal behavior. But you do control four critical levers
                that determine whether your system is reliable or not.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 border-l-4 border-blue-500">
                    <h5 className="font-semibold text-blue-900 mb-1">1. What Context You Provide</h5>
                    <p className="text-sm text-slate-600">
                        The model only knows what you give it. Retrieval quality, metadata filtering, and chunk relevance
                        determine whether the model has the right information to work with.
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-purple-500">
                    <h5 className="font-semibold text-purple-900 mb-1">2. How You Prompt</h5>
                    <p className="text-sm text-slate-600">
                        Instructions, examples, constraints, and output format shape the model's behavior. A well-crafted
                        prompt can enforce grounding, citations, and {"\"I don't know\""} responses.
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-green-500">
                    <h5 className="font-semibold text-green-900 mb-1">3. What Constraints You Enforce</h5>
                    <p className="text-sm text-slate-600">
                        Structured outputs (JSON schemas), validation rules, and post-processing checks prevent the model
                        from generating invalid or unsupported responses.
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-amber-500">
                    <h5 className="font-semibold text-amber-900 mb-1">4. How You Verify</h5>
                    <p className="text-sm text-slate-600">
                        Evaluation, testing, and monitoring catch failures before they reach users. Golden sets, AI-as-a-judge,
                        and human review loops ensure quality over time.
                    </p>
                </Card>
            </div>

            <Card className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 border-blue-200 mt-6">
                <h5 className="font-semibold text-slate-800 mb-2">Probabilistic vs. Deterministic Thinking</h5>
                <p className="text-sm text-slate-600 mb-3">
                    Traditional software is deterministic: same input → same output, every time. AI systems are probabilistic:
                    same input → similar output, most of the time.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <p className="font-semibold text-slate-700 mb-1">Deterministic (Traditional Code)</p>
                        <p className="text-slate-500">{"if (x > 10) return \"high\""}</p>
                        <p className="text-xs text-slate-400 mt-1">Always returns the same result</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <p className="font-semibold text-blue-700 mb-1">Probabilistic (AI)</p>
                        <p className="text-slate-500">{"LLM(\"Is this feedback positive?\")"}</p>
                        <p className="text-xs text-slate-400 mt-1">Might vary slightly across runs</p>
                    </div>
                </div>
                <p className="text-sm text-slate-600 mt-3">
                    This means you can't test AI systems the same way you test traditional code. You need statistical evaluation,
                    golden sets, and continuous monitoring — not just unit tests.
                </p>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="The Solution: Grounding & Guardrails" subtitle="A toolkit for preventing hallucinations">
            <p className="text-slate-500 mb-4">
                Grounding is the most important technique, but it's not the only one. Here's the full toolkit
                for building AI systems you can trust.
            </p>

            <GroundingDiagram />

            <h4 className="font-semibold mt-6 mb-3">The Anti-Hallucination Toolkit</h4>
            <div className="space-y-3">
                <Card className="p-4 border-l-4 border-green-500">
                    <h5 className="font-semibold text-green-900">1. Grounding — Tie every claim to source data</h5>
                    <p className="text-sm text-slate-500 mt-1">
                        Every answer must reference specific chunks from your data. If the system can't find
                        supporting evidence, it should say "I don't know" instead of guessing.
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-blue-500">
                    <h5 className="font-semibold text-blue-900">2. Citations — Show your work</h5>
                    <p className="text-sm text-slate-500 mt-1">
                        Include source references (document name, date, speaker) with every claim.
                        Users can verify, and you can audit when things go wrong.
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-purple-500">
                    <h5 className="font-semibold text-purple-900">3. Constrained Generation — Limit the output space</h5>
                    <p className="text-sm text-slate-500 mt-1">
                        Use structured outputs (JSON schemas), enum fields, and bounded response formats.
                        The less freedom the model has to improvise, the fewer hallucinations.
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-amber-500">
                    <h5 className="font-semibold text-amber-900">4. Extraction over Summarization — Quote, don't paraphrase</h5>
                    <p className="text-sm text-slate-500 mt-1">
                        Returning exact quotes from source data is more reliable than asking the LLM to summarize.
                        Summaries invite creative gap-filling.
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-indigo-500">
                    <h5 className="font-semibold text-indigo-900">5. Multi-step Verification — Check the answer</h5>
                    <p className="text-sm text-slate-500 mt-1">
                        Use a second LLM call to verify claims against retrieved chunks. Ask: "Is every claim
                        in this answer supported by the provided context?" This catches many hallucinations.
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-teal-500">
                    <h5 className="font-semibold text-teal-900">6. Deterministic Routing — Use code where possible</h5>
                    <p className="text-sm text-slate-500 mt-1">
                        For lookups, counts, and structured queries, use SQL or code instead of LLM generation.
                        Reserve the LLM for tasks that genuinely require language understanding.
                    </p>
                </Card>
            </div>

            <Card className="p-4 bg-amber-50 border-amber-200 mt-4">
                <p className="font-semibold text-amber-800">The Cite or Abstain Rule</p>
                <p className="mt-2 text-sm text-slate-600">If the AI cannot cite a specific source for a claim, it should not make the claim. This single rule prevents more hallucinations than any other technique.</p>
            </Card>
        </ProgressiveSection>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <h3 className="font-semibold text-lg mb-4">🎯 The Bottom Line</h3>
            <p className="text-slate-600 mb-4">
                <strong>You're not building a chatbot. You're engineering a system that can be trusted.</strong>
            </p>
            <p className="text-slate-600 mb-4">
                The mindset shift is from "AI is magic" to "AI needs engineering for trustworthiness."
            </p>
            <div className="grid md:grid-cols-2 gap-2">
                {[
                    "Structured data (not just files)",
                    "Metadata tags (not just content)",
                    "Filtered retrieval (not just similarity)",
                    "Grounded responses (not just generation)",
                    "Citations (not just answers)",
                    '"I don\'t know" (not confident guessing)'
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{item}</span>
                    </div>
                ))}
            </div>
        </Card>

        <QuizQuestion
            question="What is the main difference between consumer AI and production AI?"
            options={[
                "Production AI uses better models",
                "Production AI is faster",
                "Production AI has engineering for accuracy and trust",
                "Production AI costs more"
            ]}
            correctIndex={2}
            explanation="The key difference is that production AI requires engineering for accuracy, grounding, citations, and the ability to say 'I don't know' — not just generating plausible-sounding text."
        />

        <NextSectionNav currentId="mindset" />
    </div>
);
