import React from 'react';
import { CheckCircle, Target, Zap, AlertTriangle } from 'lucide-react';
import { Card, Callout, ProgressiveSection, ComparisonTable } from '../components/ui';
import { NextSectionNav } from '../index';

export const GoldenSetSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-semibold text-slate-900">Building Your Golden Set</h2>

        <Callout type="success" title="The Foundation of Quality">
            {"A golden set is your benchmark for quality. It's a curated collection of test cases that represent real usage patterns. Without it, you're flying blind."}
        </Callout>

        <ProgressiveSection number="1" title="What Is a Golden Set?" subtitle="Your quality benchmark" defaultOpen={true}>
            <p className="text-slate-600 mb-4">
                A golden set is a collection of test cases where you know the correct answer. Each test case includes:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: Target, label: "Question", desc: "The user query", example: "\"What did TPI say about cameras?\"" },
                    { icon: CheckCircle, label: "Expected Answer", desc: "What a good response looks like", example: "\"Alan mentioned cameras go offline during peak hours [March 28]\"" },
                    { icon: Zap, label: "Context", desc: "Which data should be retrieved", example: "Meeting ID abc123, chunks 5-7" },
                    { icon: AlertTriangle, label: "Edge Cases", desc: "What should NOT happen", example: "\"Don't cite internal team discussions\"" },
                ].map((item, i) => (
                    <Card key={i} className="p-4 border-l-4 border-indigo-400">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <item.icon className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                                <h5 className="font-semibold text-slate-800">{item.label}</h5>
                                <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                                <div className="mt-2 bg-slate-50 p-2 rounded text-xs text-slate-700">
                                    {item.example}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Callout type="info" title="Why It Matters">
                {"Every time you change your system (new chunking strategy, different prompt, model upgrade), you run the golden set to see if quality improved or degraded. It's your regression test suite."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="The Two-Layer Approach" subtitle="Start small, grow strategically">
            <p className="text-slate-600 mb-4">
                Don't try to build a perfect golden set on day one. Use a two-layer approach:
            </p>

            <div className="space-y-4 mb-6">
                <Card className="p-5 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-2">Layer 1: Core Set (10-20 questions)</h4>
                    <p className="text-sm text-slate-600 mb-3">
                        The most common, critical questions your users ask. These should ALWAYS work.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-green-800 mb-2">Examples:</p>
                        <ul className="text-xs text-green-700 space-y-1">
                            <li>{"• \"When was our last meeting with [company]?\""}</li>
                            <li>{"• \"What did [company] say about [topic]?\""}</li>
                            <li>{"• \"List all meetings with [company] in Q4\""}</li>
                            <li>{"• \"What concerns did customers raise?\""}</li>
                        </ul>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        <strong>Run frequency:</strong> After every change, before every deploy
                    </p>
                </Card>

                <Card className="p-5 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-2">Layer 2: Extended Set (50-100 questions)</h4>
                    <p className="text-sm text-slate-600 mb-3">
                        Edge cases, complex queries, and failure scenarios. These test system limits.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-blue-800 mb-2">Examples:</p>
                        <ul className="text-xs text-blue-700 space-y-1">
                            <li>{"• \"Compare feedback from tire companies vs retail\""}</li>
                            <li>{"• \"What did we promise to follow up on?\""}</li>
                            <li>{"• \"Find meetings where pricing AND integration were discussed\""}</li>
                            <li>{"• \"What's the sentiment trend over the last 6 months?\""}</li>
                        </ul>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        <strong>Run frequency:</strong> Weekly or before major releases
                    </p>
                </Card>
            </div>

            <Callout type="warning" title="Start Small">
                {"Don't build 100 test cases on day one. Start with 10 core questions, validate they work, then expand. Quality over quantity."}
            </Callout>
        </ProgressiveSection>


        <ProgressiveSection number="3" title="Synthetic Data Generation" subtitle="Using AI to create test cases">
            <p className="text-slate-600 mb-4">
                You can use AI to help generate golden set test cases. This is especially useful for creating
                variations and edge cases.
            </p>

            <h4 className="font-semibold mb-3">The Process</h4>
            <div className="space-y-3 mb-4">
                <Card className="p-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">1</div>
                        <div>
                            <p className="font-semibold text-slate-800">Start with real data</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Take actual meeting transcripts or documents from your system
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-purple-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">2</div>
                        <div>
                            <p className="font-semibold text-slate-800">Generate questions</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Use an LLM to generate questions that could be answered from that data
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-green-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">3</div>
                        <div>
                            <p className="font-semibold text-slate-800">Generate expected answers</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Have the LLM provide the answer with citations to specific chunks
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-amber-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">4</div>
                        <div>
                            <p className="font-semibold text-slate-800">Human review</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Validate that questions and answers are correct. Fix any hallucinations.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <h4 className="font-semibold mb-3">Example Prompt for Generation</h4>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto font-mono mb-4">
                {`You are creating test cases for a RAG system that answers questions about customer meetings.

Given this meeting transcript:
<transcript>
{meeting_text}
</transcript>

Generate 5 test cases in this format:
{
  "question": "What did [speaker] say about [topic]?",
  "expected_answer": "Quote from transcript with [date/speaker]",
  "relevant_chunks": ["chunk_id_1", "chunk_id_2"],
  "difficulty": "easy|medium|hard"
}

Requirements:
- Questions should be realistic (what a BD person would actually ask)
- Answers must be grounded in the transcript (no hallucinations)
- Include a mix of easy (fact lookup) and hard (synthesis) questions
- Mark which chunks contain the answer`}
            </pre>

            <Callout type="warning" title="Critical: Human Validation">
                {"AI-generated test cases MUST be human-reviewed. LLMs can hallucinate expected answers, creating a golden set that's actually wrong. Always validate before adding to your set."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="Golden Set Infrastructure" subtitle="How to store and run tests">
            <p className="text-slate-600 mb-4">
                Your golden set needs infrastructure to be useful. Here's the minimal setup:
            </p>

            <h4 className="font-semibold mb-3">Storage Format</h4>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl mb-4">
                <pre className="text-xs font-mono">
                    {`// golden_set.json
[
  {
    "id": "test_001",
    "question": "What did TPI say about cameras?",
    "expected_answer": "Alan mentioned cameras go offline during peak hours",
    "expected_chunks": ["meeting_abc123_chunk_5"],
    "metadata": {
      "company": "TPI",
      "difficulty": "medium",
      "category": "customer_feedback"
    }
  },
  // ... more test cases
]`}
                </pre>
            </div>

            <h4 className="font-semibold mb-3">Test Runner</h4>
            <p className="text-slate-600 mb-3">
                A script that runs each test case through your system and compares results:
            </p>
            <div className="space-y-2 mb-4">
                {[
                    "Load golden set from JSON",
                    "For each test case, send question to your system",
                    "Compare actual answer to expected answer",
                    "Check if expected chunks were retrieved",
                    "Calculate RAGAS metrics (faithfulness, relevance, etc.)",
                    "Generate report with pass/fail for each test",
                ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{step}</span>
                    </div>
                ))}
            </div>

            <h4 className="font-semibold mb-3">Continuous Monitoring</h4>
            <ComparisonTable
                headers={["When to Run", "What to Check", "Action on Failure"]}
                rows={[
                    ["Before every deploy", "Core set (10-20 tests)", "Block deploy if failures"],
                    ["After prompt changes", "Core + extended set", "Review and fix before merging"],
                    ["After data pipeline changes", "Full set", "Validate retrieval quality"],
                    ["Weekly scheduled", "Full set", "Track quality trends over time"],
                ]}
            />
        </ProgressiveSection>

        <ProgressiveSection number="5" title="What Makes a Good Test Case?" subtitle="Quality over quantity">
            <div className="space-y-4">
                <Card className="p-4 border-l-4 border-green-400">
                    <h5 className="font-semibold text-green-900 mb-2">✓ Good Test Cases</h5>
                    <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Realistic:</strong> Questions users actually ask, not contrived examples</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Specific:</strong> Clear expected answer, not vague or subjective</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Verifiable:</strong> You can objectively determine if the answer is correct</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Representative:</strong> Covers different query types and difficulty levels</span>
                        </li>
                    </ul>
                </Card>

                <Card className="p-4 border-l-4 border-rose-400">
                    <h5 className="font-semibold text-rose-900 mb-2">✗ Bad Test Cases</h5>
                    <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Too vague:</strong> {"\"Tell me about TPI\" (what aspect? what timeframe?)"}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Subjective:</strong> {"\"Is TPI happy with us?\" (requires interpretation)"}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Unrealistic:</strong> Questions no one would actually ask</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Unanswerable:</strong> Data doesn't exist to answer the question</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </ProgressiveSection>

        <Card className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 mt-8">
            <h3 className="font-semibold text-lg mb-4">🎯 The Bottom Line</h3>
            <div className="space-y-2 text-sm text-slate-600">
                <p>
                    <strong>Start small:</strong> 10 core test cases that cover your most common queries
                </p>
                <p>
                    <strong>Grow strategically:</strong> Add edge cases and complex queries as you encounter them
                </p>
                <p>
                    <strong>Run continuously:</strong> Before every deploy, after every change
                </p>
                <p>
                    <strong>Track trends:</strong> Is quality improving or degrading over time?
                </p>
            </div>
            <p className="text-xs text-indigo-700 mt-4">
                Your golden set is your quality insurance. Without it, you're guessing whether your system works.
            </p>
        </Card>

        <NextSectionNav currentId="goldenset" />
    </div>
);
