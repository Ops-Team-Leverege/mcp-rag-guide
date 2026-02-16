import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox, QuizQuestion } from '../components/ui';
import BeforeYouBuildDiagram from '../components/diagrams/BeforeYouBuildDiagram';
import GroundingDiagram from '../components/diagrams/GroundingDiagram';

export const MindsetSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-900">The Most Important Lesson</h2>

        {/* Before You Build Decision Check */}
        <Callout type="danger" title="THE RULE: The best architecture is the one you don't need to build">
            Make sure you actually need a custom agent before investing weeks of work.
        </Callout>

        <BeforeYouBuildDiagram />

        <Callout type="warning" title="The Consumer AI Illusion">
            You've used ChatGPT, Gems, GPTs. You drop in files, ask questions, get answers.
            <strong> It feels like magic.</strong> This creates a dangerous expectation that you can "just ask the AI" anything.
        </Callout>

        <ProgressiveSection number="1" title="What You Think Happens vs Reality" subtitle="The gap that causes most failures" defaultOpen={true}>
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 border-red-200 bg-red-50">
                    <h3 className="font-bold text-red-600 mb-3">❌ What You Think</h3>
                    <DiagramBox>
                        {`Files → AI → Answer

"The AI read my files and 
knows the answer"`}
                    </DiagramBox>
                </Card>

                <Card className="p-4 border-green-200 bg-green-50">
                    <h3 className="font-bold text-green-600 mb-3">✓ What Actually Happens</h3>
                    <DiagramBox>
                        {`Files → Chunking → Embeddings → 
Vector DB → Retrieval → 
Prompt Assembly → LLM → 
(Hope It Doesn't Hallucinate) → 
Answer`}
                    </DiagramBox>
                </Card>
            </div>

            <p className="mt-4 text-gray-600">
                Consumer products hide this complexity. They make tradeoffs you don't see: generic chunking,
                no metadata filtering, no source verification.
            </p>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="The Hallucination Problem" subtitle="Why AI makes things up">
            <Callout type="danger" title="Critical Understanding">
                <strong>Hallucinations aren't bugs — they're the default behavior.</strong> LLMs generate
                statistically likely text. Without guardrails, they will confidently state things that
                aren't in your data.
            </Callout>

            <h4 className="font-bold mt-4 mb-2">Example of Hallucination</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">You ask:</p>
                    <p className="italic">"What did TPI say about delivery timelines?"</p>
                </Card>
                <Card className="p-4 border-red-200">
                    <p className="text-sm font-medium text-red-500 mb-2">AI might respond (hallucination):</p>
                    <p className="italic">"TPI expressed concerns about the Q2 delivery timeline and requested expedited shipping for the camera equipment."</p>
                    <p className="text-xs text-red-600 mt-2">← Sounds confident. Might be completely fabricated.</p>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="The Mindset Shift" subtitle="Consumer vs Production thinking">
            <ComparisonTable
                headers={["Consumer AI Mindset", "Production AI Mindset"]}
                rows={[
                    ['"AI knows the answer"', '"AI generates text based on what we retrieve"'],
                    ['"Just upload and ask"', '"Structure, tag, chunk, embed, then ask"'],
                    ['"It\'s usually right"', '"It\'s only as right as our retrieval + grounding"'],
                    ['"Trust the output"', '"Verify the output has citations"'],
                    ['"Magic"', '"Engineering"'],
                ]}
            />
        </ProgressiveSection>

        <ProgressiveSection number="4" title="The Solution: Grounding" subtitle="How to prevent hallucinations">

            <GroundingDiagram />

            <Card className="p-4 bg-amber-50 border-amber-200 mt-4">
                <p className="font-bold text-amber-800">The Cite or Abstain Rule</p>
                <p className="mt-2">If the AI cannot cite a specific source for a claim, it should not make the claim.</p>
            </Card>
        </ProgressiveSection>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <h3 className="font-bold text-lg mb-4">🎯 The Bottom Line</h3>
            <p className="text-gray-700 mb-4">
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
    </div>
);
