import React from 'react';
import { Card, Callout, ProgressiveSection } from '../components/ui';
import { NextSectionNav } from '../index';

export const EvaluationSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-semibold text-slate-900">{"Evaluation: How to Know It's Working"}</h2>

        <Callout type="warning" title="Key Stat">
            Stanford's 2024 legal AI study found even purpose-built RAG tools hallucinate
            <strong> 17-33% of the time</strong>. Evaluation is essential, not optional.
        </Callout>

        <ProgressiveSection number="1" title="The RAGAS Framework: Measuring RAG Quality" subtitle="Industry-standard evaluation metrics" defaultOpen={true}>
            <p className="mb-4 text-slate-600">
                RAGAS provides four metrics for evaluating RAG systems. Think of them as a health check.
            </p>

            <div className="space-y-4 mb-6">
                <Card className="p-5 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-2">1. Context Precision: Did we retrieve the RIGHT chunks?</h4>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>The question:</strong> Of the chunks we retrieved, how many were actually relevant?
                    </p>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Why it matters:</strong> Low precision means you're wasting context window space on irrelevant chunks.
                        The LLM has to sift through noise.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-900"><strong>Target:</strong> &gt;80% of retrieved chunks should be relevant</p>
                        <p className="text-sm text-red-700 mt-1"><strong>Red flag:</strong> Retrieving chunks from the wrong company or time period</p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900 mb-2">2. Context Recall: Did we retrieve ALL the relevant chunks?</h4>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>The question:</strong> Of all the relevant chunks that exist, how many did we find?
                    </p>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Why it matters:</strong> Low recall means you're missing information. The answer will be incomplete.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm text-purple-900"><strong>Target:</strong> &gt;70% of relevant chunks should be retrieved</p>
                        <p className="text-sm text-red-700 mt-1"><strong>Red flag:</strong> User asks about a topic you know exists in the data, but nothing is retrieved</p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-2">3. Faithfulness: Is the answer grounded in the retrieved chunks?</h4>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>The question:</strong> Can every claim in the answer be traced back to a retrieved chunk?
                    </p>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Why it matters:</strong> This measures hallucination. If the answer includes information not in the chunks, it's made up.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-900"><strong>Target:</strong> &gt;90% of claims should be supported by chunks</p>
                        <p className="text-sm text-red-700 mt-1"><strong>Red flag:</strong> Answer includes specific details (dates, names, numbers) not in any chunk</p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-amber-500">
                    <h4 className="font-semibold text-amber-900 mb-2">4. Answer Relevance: Does the answer actually address the question?</h4>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>The question:</strong> Is the answer on-topic and helpful?
                    </p>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Why it matters:</strong> You can retrieve the right chunks but still generate an unhelpful answer.
                    </p>
                    <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-sm text-amber-900"><strong>Target:</strong> High semantic similarity between question and answer</p>
                        <p className="text-sm text-red-700 mt-1"><strong>Red flag:</strong> User asks about pricing, answer talks about features</p>
                    </div>
                </Card>
            </div>

            <Callout type="info" title="Key Insight">
                <strong>Faithfulness</strong> is your most important metric. A low faithfulness score
                means the AI is making claims not supported by your data — hallucinations.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="Creating a Golden Test Set" subtitle="Your benchmark for quality">
            <p className="mb-4 text-slate-600">
                A golden test set is a curated collection of questions with known correct answers. It's your benchmark.
            </p>

            <h4 className="font-semibold mb-3">What to Include:</h4>
            <div className="space-y-3 mb-6">
                <Card className="p-4 bg-green-50 border-green-200">
                    <p className="font-semibold text-green-900">Easy questions - Should always work</p>
                    <ul className="text-sm text-green-800 mt-2 space-y-1">
                        <li>• "When was our last meeting with TPI?"</li>
                        <li>• "How many meetings with Les Schwab?"</li>
                    </ul>
                </Card>

                <Card className="p-4 bg-blue-50 border-blue-200">
                    <p className="font-semibold text-blue-900">Medium questions - Should work most of the time</p>
                    <ul className="text-sm text-blue-800 mt-2 space-y-1">
                        <li>• "What did TPI say about cameras?"</li>
                        <li>• "What concerns did customers raise in Q4?"</li>
                    </ul>
                </Card>

                <Card className="p-4 bg-purple-50 border-purple-200">
                    <p className="font-semibold text-purple-900">Hard questions - Stretch goals</p>
                    <ul className="text-sm text-purple-800 mt-2 space-y-1">
                        <li>• "Compare TPI and Les Schwab's feedback on integration"</li>
                        <li>• "What patterns do you see in customer concerns?"</li>
                    </ul>
                </Card>
            </div>

            <h4 className="font-semibold mb-3">How to Use It:</h4>
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">1</div>
                    <span className="text-slate-600"><strong>Baseline</strong> - Run the test set, record scores</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold text-sm">2</div>
                    <span className="text-slate-600"><strong>Make changes</strong> - Improve chunking, prompts, retrieval</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold text-sm">3</div>
                    <span className="text-slate-600"><strong>Re-test</strong> - Did scores improve or degrade?</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-semibold text-sm">4</div>
                    <span className="text-slate-600"><strong>Track over time</strong> - Are you getting better?</span>
                </div>
            </div>

            <Callout type="success" title="The Principle">
                You can't improve what you don't measure. Run these tests after every major change.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="Three Validation Types" subtitle="Retrieval, Grounding, and Trust">
            <div className="space-y-4">
                <Card className="p-4">
                    <h4 className="font-semibold text-blue-600">1. Retrieval Quality</h4>
                    <p className="text-sm text-slate-500">"Did the system find the right chunks?"</p>
                    <p className="text-sm mt-2">Ask a question, look at what chunks were retrieved. Are they relevant?</p>
                </Card>

                <Card className="p-4">
                    <h4 className="font-semibold text-blue-600">2. Grounding Quality</h4>
                    <p className="text-sm text-slate-500">"Did the answer actually come from the chunks?"</p>
                    <p className="text-sm mt-2">Compare the answer to retrieved chunks. Can you trace every claim?</p>
                </Card>

                <Card className="p-4">
                    <h4 className="font-semibold text-blue-600">3. User Trust</h4>
                    <p className="text-sm text-slate-500">"Does BD/Product believe the answers?"</p>
                    <p className="text-sm mt-2">This is the real metric. If they don't trust it, the system failed.</p>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="When Things Go Wrong" subtitle="Debug flow">
            <ol className="space-y-3">
                {[
                    { step: "What question was asked?", check: "Check MCP logs" },
                    { step: "What mode did RAG Core choose?", check: "Should it have been 'last_meeting' vs 'search'?" },
                    { step: "What chunks were retrieved?", check: "Wrong chunks = retrieval problem" },
                    { step: "What prompt was sent to the LLM?", check: "Was grounding clear? Citations enforced?" },
                    { step: "What did the LLM return?", check: "Did it ignore grounding?" },
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <span className="bg-slate-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {i + 1}
                        </span>
                        <div>
                            <p className="font-medium">{item.step}</p>
                            <p className="text-sm text-slate-500">{item.check}</p>
                        </div>
                    </li>
                ))}
            </ol>

            <Callout type="insight" title="Key Insight">
                Most "AI errors" are actually <strong>retrieval errors</strong> or <strong>prompt errors</strong>,
                not LLM errors. Debug those first.
            </Callout>
        </ProgressiveSection>

        <NextSectionNav currentId="evaluation" />
    </div>
);
