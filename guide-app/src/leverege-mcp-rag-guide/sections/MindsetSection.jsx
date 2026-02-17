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
            {"Before writing a single line of code, you need to understand why building production AI is fundamentally different from using consumer AI tools."}
        </Callout>

        <ProgressiveSection number="1" title="Before You Build: Do You Actually Need This?" subtitle="The best architecture is the one you don't need to build" defaultOpen={true}>
            <p className="text-slate-500 mb-4">
                Run through this checklist honestly. Many teams invest weeks building custom AI systems
                when simpler solutions would work better.
            </p>
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

        <ProgressiveSection number="3" title="The Hallucination Problem" subtitle="Why AI makes things up — and how it manifests">
            <Card className="p-5 bg-amber-50 border-amber-200 mb-4">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold text-amber-900">Hallucinations aren't bugs — they're the default behavior.</p>
                        <p className="text-sm text-amber-800 mt-1">
                            LLMs generate statistically likely text. Without guardrails, they will confidently
                            state things that aren't in your data. This is by design — the model optimizes for
                            helpfulness, not accuracy.
                        </p>
                    </div>
                </div>
            </Card>

            <h4 className="font-semibold mb-3">Common Hallucination Patterns</h4>
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
                <strong>You're not building a chatbot. You're building a system that can be trusted.</strong>
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
