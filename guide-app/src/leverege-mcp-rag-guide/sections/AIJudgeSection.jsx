import React from 'react';
import { Scale, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, Callout, ProgressiveSection, ComparisonTable } from '../components/ui';
import { NextSectionNav } from '../index';

export const AIJudgeSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-semibold text-slate-900">Evaluating at Scale: AI-as-a-Judge</h2>

        <Callout type="insight" title="The Scaling Problem">
            {"You can't manually review every answer your system generates. AI-as-a-Judge lets you evaluate quality automatically, at scale."}
        </Callout>

        <ProgressiveSection number="1" title="Why Manual Evaluation Doesn't Scale" subtitle="The limits of human review" defaultOpen={true}>
            <p className="text-slate-600 mb-4">
                Manual evaluation is the gold standard, but it has serious limitations:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="p-4 border-l-4 border-rose-400">
                    <h5 className="font-semibold text-rose-900 mb-2">Slow</h5>
                    <p className="text-sm text-slate-600">
                        A human can review maybe 20-50 answers per hour. If you're generating thousands of answers
                        per day, manual review is impossible.
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-amber-400">
                    <h5 className="font-semibold text-amber-900 mb-2">Expensive</h5>
                    <p className="text-sm text-slate-600">
                        Domain experts are expensive. Paying them to review AI outputs is not sustainable at scale.
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-purple-400">
                    <h5 className="font-semibold text-purple-900 mb-2">Inconsistent</h5>
                    <p className="text-sm text-slate-600">
                        Different reviewers have different standards. The same reviewer might rate the same answer
                        differently on different days.
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-blue-400">
                    <h5 className="font-semibold text-blue-900 mb-2">Not Real-Time</h5>
                    <p className="text-sm text-slate-600">
                        You can't get instant feedback. By the time humans review, the bad answers have already
                        been sent to users.
                    </p>
                </Card>
            </div>

            <Callout type="success" title="The Solution">
                {"Use an LLM to evaluate another LLM's outputs. It's fast, cheap, and consistent. Not perfect, but good enough for continuous monitoring."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="How AI-as-a-Judge Works" subtitle="The evaluation loop">
            <div className="space-y-3 mb-6">
                <Card className="p-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">1</div>
                        <div>
                            <p className="font-semibold text-slate-800">Your System Generates an Answer</p>
                            <p className="text-sm text-slate-600 mt-1">
                                User asks a question, your RAG system retrieves chunks and generates an answer
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-purple-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">2</div>
                        <div>
                            <p className="font-semibold text-slate-800">Send to Judge LLM</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Pass the question, retrieved context, and generated answer to a judge LLM
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-green-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">3</div>
                        <div>
                            <p className="font-semibold text-slate-800">Judge Evaluates</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Judge scores the answer on faithfulness, relevance, completeness, citation quality
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-amber-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">4</div>
                        <div>
                            <p className="font-semibold text-slate-800">Log and Alert</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Store scores, alert if quality drops below threshold, aggregate for trends
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>


        <ProgressiveSection number="3" title="Building an Effective Judge Prompt" subtitle="The most critical component">
            <p className="text-slate-600 mb-4">
                The judge prompt determines everything. A bad prompt gives unreliable scores. Here's how to build a good one:
            </p>

            <h4 className="font-semibold mb-3">Template Structure</h4>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto font-mono mb-4">
                {`You are an expert evaluator for a RAG system that answers questions about customer meetings.

Your task: Evaluate if the AI's answer is faithful to the retrieved context.

## Inputs

Question: {question}

Retrieved Context:
{context_chunks}

AI Answer:
{answer}

## Evaluation Criteria

Faithfulness: Can every claim in the answer be traced to the retrieved context?

For each claim in the answer:
1. Identify the claim
2. Find supporting evidence in context (quote the relevant part)
3. Mark as SUPPORTED or UNSUPPORTED

## Output Format

Return JSON:
{
  "claims": [
    {
      "claim": "exact text from answer",
      "supported": true/false,
      "evidence": "quote from context or 'NOT FOUND'"
    }
  ],
  "faithfulness_score": 0.0-1.0,
  "unsupported_count": number,
  "explanation": "brief summary of findings"
}

## Rules

- Be strict: If you can't find clear evidence, mark as UNSUPPORTED
- Ignore minor paraphrasing (exact wording doesn't need to match)
- Dates, names, and numbers must match exactly
- If answer says "I don't know", that's always faithful (score: 1.0)`}
            </pre>

            <h4 className="font-semibold mb-3">Key Elements of a Good Judge Prompt</h4>
            <div className="space-y-3">
                {[
                    { element: "Clear Role", desc: "Define what the judge is evaluating and why", example: "\"You are an expert evaluator for a RAG system...\"" },
                    { element: "Explicit Criteria", desc: "Spell out exactly what makes an answer good or bad", example: "\"Can every claim be traced to context?\"" },
                    { element: "Step-by-Step Process", desc: "Break evaluation into concrete steps", example: "\"1. Identify claim, 2. Find evidence, 3. Mark supported/unsupported\"" },
                    { element: "Output Format", desc: "Specify exact JSON structure for consistency", example: "\"Return JSON with claims array and faithfulness_score\"" },
                    { element: "Edge Case Handling", desc: "Tell judge how to handle special cases", example: "\"If answer says 'I don't know', score 1.0\"" },
                ].map((item, i) => (
                    <Card key={i} className="p-4 bg-slate-50">
                        <p className="font-semibold text-slate-800">{item.element}</p>
                        <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                        <div className="mt-2 bg-white p-2 rounded text-xs font-mono text-slate-700">
                            {item.example}
                        </div>
                    </Card>
                ))}
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="Judge Biases and How to Fix Them" subtitle="AI judges aren't perfect">
            <p className="text-slate-600 mb-4">
                AI judges have systematic biases. Understanding them helps you build more reliable evaluation.
            </p>

            <div className="space-y-4">
                <Card className="p-5 border-l-4 border-rose-400">
                    <h5 className="font-semibold text-rose-900 mb-2">1. Length Bias</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Problem:</strong> Judges favor longer, more detailed answers even when shorter ones are better
                    </p>
                    <div className="bg-rose-50 p-3 rounded-lg text-xs mb-2">
                        <p className="text-rose-800">
                            <strong>Example:</strong> {"\"When was the meeting?\" → \"March 15\" (good) gets lower score than \"The meeting occurred on March 15, 2024, which was a Friday...\" (verbose)"}
                        </p>
                    </div>
                    <p className="text-xs text-emerald-600">
                        <strong>Fix:</strong> Add to prompt: "Prefer concise answers. Penalize unnecessary verbosity."
                    </p>
                </Card>

                <Card className="p-5 border-l-4 border-amber-400">
                    <h5 className="font-semibold text-amber-900 mb-2">2. Position Bias</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Problem:</strong> Judges favor information that appears first in the context
                    </p>
                    <div className="bg-amber-50 p-3 rounded-lg text-xs mb-2">
                        <p className="text-amber-800">
                            <strong>Example:</strong> If the answer is in chunk 10 of 10, judge might miss it and mark unsupported
                        </p>
                    </div>
                    <p className="text-xs text-emerald-600">
                        <strong>Fix:</strong> Shuffle context order in test cases, or explicitly instruct: "Search ALL context chunks, not just the first few"
                    </p>
                </Card>

                <Card className="p-5 border-l-4 border-purple-400">
                    <h5 className="font-semibold text-purple-900 mb-2">3. Self-Preference Bias</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Problem:</strong> If judge and generator are the same model, judge favors its own style
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg text-xs mb-2">
                        <p className="text-purple-800">
                            <strong>Example:</strong> GPT-4 judging GPT-4 outputs gives higher scores than GPT-4 judging Claude outputs
                        </p>
                    </div>
                    <p className="text-xs text-emerald-600">
                        <strong>Fix:</strong> Use different models for generation and judging (e.g., Claude generates, GPT-4 judges)
                    </p>
                </Card>

                <Card className="p-5 border-l-4 border-blue-400">
                    <h5 className="font-semibold text-blue-900 mb-2">4. Leniency Bias</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Problem:</strong> Judges are too generous, giving high scores to mediocre answers
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg text-xs mb-2">
                        <p className="text-blue-800">
                            <strong>Example:</strong> Answer with minor hallucinations gets 0.9 instead of 0.6
                        </p>
                    </div>
                    <p className="text-xs text-emerald-600">
                        <strong>Fix:</strong> Calibrate with human-labeled examples. Add to prompt: "Be strict. Minor unsupported claims should significantly lower the score."
                    </p>
                </Card>

                <Card className="p-5 border-l-4 border-green-400">
                    <h5 className="font-semibold text-green-900 mb-2">5. Verbatim Matching Bias</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Problem:</strong> Judge expects exact wording, marks valid paraphrases as unsupported
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg text-xs mb-2">
                        <p className="text-green-800">
                            <strong>Example:</strong> {"Context: \"cameras malfunction\" → Answer: \"cameras fail\" → Judge marks unsupported"}
                        </p>
                    </div>
                    <p className="text-xs text-emerald-600">
                        <strong>Fix:</strong> Add to prompt: "Allow reasonable paraphrasing. Focus on semantic equivalence, not exact wording."
                    </p>
                </Card>
            </div>

            <Callout type="warning" title="Always Validate">
                {"Never trust judge scores blindly. Spot-check a sample of evaluations manually to ensure the judge is behaving correctly."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="Calibration: Validating Your Judge" subtitle="Making sure the judge is accurate">
            <p className="text-slate-600 mb-4">
                Before deploying AI-as-a-Judge, you need to calibrate: compare judge scores to human scores.
            </p>

            <h4 className="font-semibold mb-3">The Calibration Process</h4>
            <div className="space-y-3 mb-6">
                <Card className="p-4 bg-blue-50 border-l-4 border-blue-500">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">1</div>
                        <div>
                            <p className="font-semibold text-blue-900">Create Calibration Set</p>
                            <p className="text-sm text-blue-800 mt-1">
                                Take 50-100 question/answer pairs from your system. Include good, mediocre, and bad answers.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-purple-50 border-l-4 border-purple-500">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-purple-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">2</div>
                        <div>
                            <p className="font-semibold text-purple-900">Get Human Scores</p>
                            <p className="text-sm text-purple-800 mt-1">
                                Have 2-3 domain experts rate each answer on faithfulness (1-5 scale). Average their scores.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-green-50 border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-green-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">3</div>
                        <div>
                            <p className="font-semibold text-green-900">Get Judge Scores</p>
                            <p className="text-sm text-green-800 mt-1">
                                Run the same pairs through your AI judge. Collect faithfulness scores.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-amber-50 border-l-4 border-amber-500">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-amber-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">4</div>
                        <div>
                            <p className="font-semibold text-amber-900">Calculate Correlation</p>
                            <p className="text-sm text-amber-800 mt-1">
                                Compute Pearson correlation between human and judge scores. Target: r {">"} 0.7
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 bg-rose-50 border-l-4 border-rose-500">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-rose-500 text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">5</div>
                        <div>
                            <p className="font-semibold text-rose-900">Adjust and Repeat</p>
                            <p className="text-sm text-rose-800 mt-1">
                                If correlation is low, adjust judge prompt or try a different model. Re-calibrate.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <ComparisonTable
                headers={["Correlation", "Interpretation", "Action"]}
                rows={[
                    ["r > 0.8", "Excellent agreement", "Deploy with confidence"],
                    ["0.7 < r < 0.8", "Good agreement", "Deploy with spot-checking"],
                    ["0.6 < r < 0.7", "Moderate agreement", "Use for trends, not individual decisions"],
                    ["r < 0.6", "Poor agreement", "Don't deploy — fix judge prompt or model"],
                ]}
            />

            <Callout type="success" title="Re-Calibrate Periodically">
                {"Judge accuracy can drift over time as your system evolves. Re-calibrate every 3-6 months."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="Practical Implementation" subtitle="How to integrate AI-as-a-Judge">
            <p className="text-slate-600 mb-4">
                Here's how to add AI-as-a-Judge to your existing system:
            </p>

            <h4 className="font-semibold mb-3">Option 1: Synchronous Evaluation (Real-Time)</h4>
            <div className="bg-slate-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-slate-600 mb-2">
                    Evaluate every answer before returning it to the user. Block if quality is too low.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                        <p className="font-semibold text-green-800 mb-1">Pros:</p>
                        <ul className="text-green-700 space-y-1">
                            <li>{"• Catch bad answers before users see them"}</li>
                            <li>{"• Can retry or escalate to human"}</li>
                        </ul>
                    </div>
                    <div className="bg-rose-50 p-3 rounded border border-rose-200">
                        <p className="font-semibold text-rose-800 mb-1">Cons:</p>
                        <ul className="text-rose-700 space-y-1">
                            <li>{"• Adds 1-3 seconds latency"}</li>
                            <li>{"• Doubles LLM costs"}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h4 className="font-semibold mb-3">Option 2: Asynchronous Evaluation (Post-Hoc)</h4>
            <div className="bg-slate-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-slate-600 mb-2">
                    Return answer to user immediately, evaluate in background. Log scores for monitoring.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                        <p className="font-semibold text-green-800 mb-1">Pros:</p>
                        <ul className="text-green-700 space-y-1">
                            <li>{"• No added latency"}</li>
                            <li>{"• Can evaluate 100% of answers"}</li>
                            <li>{"• Good for trend monitoring"}</li>
                        </ul>
                    </div>
                    <div className="bg-rose-50 p-3 rounded border border-rose-200">
                        <p className="font-semibold text-rose-800 mb-1">Cons:</p>
                        <ul className="text-rose-700 space-y-1">
                            <li>{"• Bad answers reach users"}</li>
                            <li>{"• Can only alert, not prevent"}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h4 className="font-semibold mb-3">Option 3: Sampling (Cost-Effective)</h4>
            <div className="bg-slate-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-slate-600 mb-2">
                    Evaluate a random sample (10-20%) of answers. Use for quality monitoring and alerting.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                        <p className="font-semibold text-green-800 mb-1">Pros:</p>
                        <ul className="text-green-700 space-y-1">
                            <li>{"• Low cost (10-20% of full evaluation)"}</li>
                            <li>{"• Still catches quality trends"}</li>
                            <li>{"• No latency impact"}</li>
                        </ul>
                    </div>
                    <div className="bg-rose-50 p-3 rounded border border-rose-200">
                        <p className="font-semibold text-rose-800 mb-1">Cons:</p>
                        <ul className="text-rose-700 space-y-1">
                            <li>{"• Misses some bad answers"}</li>
                            <li>{"• Less precise metrics"}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Callout type="info" title="Recommendation">
                {"Start with Option 3 (sampling) for cost-effective monitoring. Move to Option 2 (async) if you need full coverage. Only use Option 1 (sync) for high-stakes applications where bad answers are unacceptable."}
            </Callout>
        </ProgressiveSection>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 mt-8">
            <h3 className="font-semibold text-lg mb-4">🎯 The Bottom Line</h3>
            <div className="space-y-2 text-sm text-slate-600">
                <p>
                    <strong>Manual evaluation doesn't scale.</strong> AI-as-a-Judge lets you evaluate thousands of answers automatically.
                </p>
                <p>
                    <strong>Judge prompts matter more than models.</strong> A well-crafted prompt with clear criteria beats a better model with a vague prompt.
                </p>
                <p>
                    <strong>Judges have biases.</strong> Length bias, position bias, self-preference — know them and mitigate them.
                </p>
                <p>
                    <strong>Always calibrate.</strong> Compare judge scores to human scores. Target correlation {">"} 0.7.
                </p>
                <p>
                    <strong>Start with sampling.</strong> Evaluate 10-20% of answers for cost-effective quality monitoring.
                </p>
            </div>
            <p className="text-xs text-purple-700 mt-4">
                AI-as-a-Judge isn't perfect, but it's the only way to monitor quality at scale. Combine it with periodic human review for best results.
            </p>
        </Card>

        <NextSectionNav currentId="aijudge" />
    </div>
);
