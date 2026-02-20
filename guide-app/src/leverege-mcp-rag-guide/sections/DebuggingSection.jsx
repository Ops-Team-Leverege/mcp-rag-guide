import React from 'react';
import { Bug, AlertTriangle, CheckCircle, Terminal } from 'lucide-react';
import { Card, Callout, ProgressiveSection } from '../components/ui';
import DebugFlowDiagram from '../components/diagrams/DebugFlowDiagram';
import { NextSectionNav } from '../index';

export const DebuggingSection = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-slate-900">Debugging AI Systems</h2>

        <Callout type="danger" title="When things go wrong (they will)">
            {"AI systems fail in ways that are harder to debug than traditional software. This section gives you a systematic approach."}
        </Callout>

        <ProgressiveSection number="1" title="The 5-Minute Debug Protocol" subtitle="A systematic approach to diagnosing AI failures" defaultOpen={true}>
            <DebugFlowDiagram />
        </ProgressiveSection>

        <ProgressiveSection number="2" title="Answer Shaping (Often Missed)" subtitle="Different question types need different response shapes">
            <p className="text-slate-600 mb-4">
                {"Most systems treat every query the same — they always return a summary. This frustrates users."}
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Question Type</th>
                            <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Expected Shape</th>
                            <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Common Mistake</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-100"><td className="px-5 py-3 text-slate-700">{"\"Did Acme mention a timeline?\""}</td><td className="px-5 py-3 font-semibold text-emerald-700">Yes/no + quote if yes</td><td className="px-5 py-3 text-rose-600">Returns a 3-paragraph summary</td></tr>
                        <tr className="border-b border-slate-100"><td className="px-5 py-3 text-slate-700">{"\"Who asked about pricing?\""}</td><td className="px-5 py-3 font-semibold text-emerald-700">Name + quote</td><td className="px-5 py-3 text-rose-600">Returns a meeting summary mentioning pricing</td></tr>
                        <tr className="border-b border-slate-100"><td className="px-5 py-3 text-slate-700">{"\"What were the action items?\""}</td><td className="px-5 py-3 font-semibold text-emerald-700">Bulleted list with owners</td><td className="px-5 py-3 text-rose-600">Returns a narrative paragraph</td></tr>
                        <tr><td className="px-5 py-3 text-slate-700">{"\"Draft a follow-up email\""}</td><td className="px-5 py-3 font-semibold text-emerald-700">Ready-to-send email</td><td className="px-5 py-3 text-rose-600">Returns bullet points of topics</td></tr>
                    </tbody>
                </table>
            </div>

            <Callout type="info" title="The Fix: Detect Question Type">
                {"Pass the question type to the LLM as part of the contract. Add to your system prompt:"}
            </Callout>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto font-mono">
                {`Detect the question type and shape your answer accordingly:
- Yes/No questions → Answer yes or no first, then provide supporting evidence
- "Who" questions → Name the person first, then provide context
- "What" questions → State the answer first, then elaborate if needed
- List requests → Use bullet points with one item per line
- Draft requests → Write ready-to-use text, not a summary of what to write`}
            </pre>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="The Logging Imperative" subtitle="Without logs, debugging is guesswork">
            <p className="text-slate-600 mb-4">
                Every request should log structured data at every decision point.
            </p>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl mb-4">
                <div className="text-xs font-mono space-y-1">
                    <div className="text-sky-400">[DecisionLayer]</div>
                    <div className="ml-4">Intent: SINGLE_MEETING (keyword_fast_path)</div>
                    <div className="ml-4">Contract: CUSTOMER_QUESTIONS</div>
                    <div className="text-emerald-400 mt-2">[ContractExecutor]</div>
                    <div className="ml-4">Evidence found: 3 chunks from meeting abc123</div>
                    <div className="ml-4">Authority check: PASS (ssotMode=none)</div>
                    <div className="text-violet-400 mt-2">[Composer]</div>
                    <div className="ml-4">Response generated: 245 tokens, 2 citations</div>
                </div>
            </div>

            <Callout type="insight" title="Best practice">
                {"Component-prefixed logging. Every module logs with a prefix so you can filter and trace. This ensures end-to-end traceability. No \"LLM vibes\" behavior — every decision is logged and auditable."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="What to Log (Minimum)" subtitle="Essential data points for every request">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <Card className="bg-sky-50 border-sky-200">
                        <div className="font-semibold text-sky-900 mb-1">Intent detected</div>
                        <div className="text-sm text-sky-700">And method: keyword or LLM</div>
                    </Card>
                    <Card className="bg-violet-50 border-violet-200">
                        <div className="font-semibold text-violet-900 mb-1">Scope resolved</div>
                        <div className="text-sm text-violet-700">Company ID, meeting ID, filters</div>
                    </Card>
                    <Card className="bg-emerald-50 border-emerald-200">
                        <div className="font-semibold text-emerald-900 mb-1">Data retrieved</div>
                        <div className="text-sm text-emerald-700">With IDs and chunk count</div>
                    </Card>
                </div>
                <div className="space-y-3">
                    <Card className="bg-amber-50 border-amber-200">
                        <div className="font-semibold text-amber-900 mb-1">Prompt sent</div>
                        <div className="text-sm text-amber-700">Or hash for privacy</div>
                    </Card>
                    <Card className="bg-rose-50 border-rose-200">
                        <div className="font-semibold text-rose-900 mb-1">Response received</div>
                        <div className="text-sm text-rose-700">Token count, citations</div>
                    </Card>
                    <Card className="bg-slate-50 border-slate-200">
                        <div className="font-semibold text-slate-900 mb-1">Latency per step</div>
                        <div className="text-sm text-slate-600">For performance optimization</div>
                    </Card>
                </div>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="Common Failure Patterns" subtitle="And how to fix them">
            <p className="text-slate-600 mb-4">
                Most AI system failures fall into predictable categories. Recognizing the pattern helps you fix it faster.
            </p>

            <div className="space-y-4">
                <Card className="p-4 border-l-4 border-rose-400">
                    <h5 className="font-semibold text-rose-900 mb-2">1. Wrong Retrieval (Most Common)</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Symptom:</strong> AI gives plausible but wrong answer, or says "I don't know" when data exists
                    </p>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Root Cause:</strong> Retrieved chunks don't contain the answer
                    </p>
                    <div className="bg-rose-50 p-3 rounded-lg text-xs">
                        <p className="font-semibold text-rose-800 mb-1">Debug Steps:</p>
                        <ul className="text-rose-700 space-y-1">
                            <li>{"• Check what chunks were retrieved (log them)"}</li>
                            <li>{"• Verify the answer exists in your database"}</li>
                            <li>{"• Test your embedding similarity (is the query embedding close to the answer embedding?)"}</li>
                            <li>{"• Check metadata filters (are you filtering out the right data?)"}</li>
                        </ul>
                    </div>
                    <p className="text-xs text-emerald-600 mt-2">
                        <strong>Fix:</strong> Adjust chunking strategy, improve metadata tagging, or tune similarity threshold
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-amber-400">
                    <h5 className="font-semibold text-amber-900 mb-2">2. Context Overload</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Symptom:</strong> AI gives generic answers or misses key details despite having the data
                    </p>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Root Cause:</strong> Too many chunks in context, model loses focus (lost-in-the-middle effect)
                    </p>
                    <div className="bg-amber-50 p-3 rounded-lg text-xs">
                        <p className="font-semibold text-amber-800 mb-1">Debug Steps:</p>
                        <ul className="text-amber-700 space-y-1">
                            <li>{"• Count how many chunks you're sending (log it)"}</li>
                            <li>{"• Check if answer is in the middle of a long context"}</li>
                            <li>{"• Test with fewer, more relevant chunks"}</li>
                        </ul>
                    </div>
                    <p className="text-xs text-emerald-600 mt-2">
                        <strong>Fix:</strong> Reduce chunk count (top 5-10), rerank by relevance, or put critical info at start/end
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-purple-400">
                    <h5 className="font-semibold text-purple-900 mb-2">3. Prompt Instruction Ignored</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Symptom:</strong> AI doesn't follow your instructions (e.g., still hallucinates despite "cite or abstain")
                    </p>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Root Cause:</strong> Instructions buried in middle of prompt, or conflicting instructions
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg text-xs">
                        <p className="font-semibold text-purple-800 mb-1">Debug Steps:</p>
                        <ul className="text-purple-700 space-y-1">
                            <li>{"• Check prompt structure (where are critical instructions?)"}</li>
                            <li>{"• Look for conflicting instructions (\"be helpful\" vs \"say I don't know\")"}</li>
                            <li>{"• Test with instructions at the very end of prompt"}</li>
                        </ul>
                    </div>
                    <p className="text-xs text-emerald-600 mt-2">
                        <strong>Fix:</strong> Move critical instructions to end, remove conflicting guidance, add examples
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-blue-400">
                    <h5 className="font-semibold text-blue-900 mb-2">4. Metadata Mismatch</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Symptom:</strong> {"Query for \"TPI\" returns nothing, but you know TPI data exists"}
                    </p>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Root Cause:</strong> Metadata values don't match (e.g., "TPI" vs "TPI Inc" vs "tpi")
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg text-xs">
                        <p className="font-semibold text-blue-800 mb-1">Debug Steps:</p>
                        <ul className="text-blue-700 space-y-1">
                            <li>{"• Check exact metadata values in database"}</li>
                            <li>{"• Test with LIKE or case-insensitive matching"}</li>
                            <li>{"• Look for whitespace or special characters"}</li>
                        </ul>
                    </div>
                    <p className="text-xs text-emerald-600 mt-2">
                        <strong>Fix:</strong> Normalize metadata during ingestion, use fuzzy matching, or maintain a company alias table
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-green-400">
                    <h5 className="font-semibold text-green-900 mb-2">5. Stale Embeddings</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Symptom:</strong> New data exists in database but isn't being retrieved
                    </p>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Root Cause:</strong> Data was added but embeddings weren't regenerated
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg text-xs">
                        <p className="font-semibold text-green-800 mb-1">Debug Steps:</p>
                        <ul className="text-green-700 space-y-1">
                            <li>{"• Check if embedding column is NULL for new rows"}</li>
                            <li>{"• Verify ingestion pipeline ran successfully"}</li>
                            <li>{"• Test with SQL-only query (does data exist?)"}</li>
                        </ul>
                    </div>
                    <p className="text-xs text-emerald-600 mt-2">
                        <strong>Fix:</strong> Trigger embedding generation, check ingestion logs, add monitoring for NULL embeddings
                    </p>
                </Card>

                <Card className="p-4 border-l-4 border-indigo-400">
                    <h5 className="font-semibold text-indigo-900 mb-2">6. Model Behavior Change</h5>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Symptom:</strong> System worked yesterday, fails today with same inputs
                    </p>
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Root Cause:</strong> LLM provider updated model, changed behavior
                    </p>
                    <div className="bg-indigo-50 p-3 rounded-lg text-xs">
                        <p className="font-semibold text-indigo-800 mb-1">Debug Steps:</p>
                        <ul className="text-indigo-700 space-y-1">
                            <li>{"• Check provider's changelog or status page"}</li>
                            <li>{"• Test with temperature=0 (more deterministic)"}</li>
                            <li>{"• Compare responses from different model versions"}</li>
                        </ul>
                    </div>
                    <p className="text-xs text-emerald-600 mt-2">
                        <strong>Fix:</strong> Pin to specific model version, adjust prompts for new behavior, or switch providers
                    </p>
                </Card>
            </div>

            <Callout type="success" title="The Debug Checklist">
                {"When something fails: 1) Check retrieval logs, 2) Verify data exists, 3) Test embeddings, 4) Review prompt, 5) Check metadata, 6) Confirm model version. Most issues are in steps 1-3."}
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="7" title="When to Escalate to Humans" subtitle="Not every problem should be solved by the AI">
            <div className="space-y-2">
                {[
                    "User asks for something outside your defined scope",
                    "Confidence score is below threshold (e.g., <0.7)",
                    "No relevant data found after retrieval",
                    "User explicitly requests human help",
                    "Query involves sensitive data or high-stakes decisions",
                    "System detects potential hallucination (no citations available)"
                ].map((item, i) => (
                    <Card key={i} className="bg-amber-50/50 border-amber-100">
                        <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{item}</span>
                        </div>
                    </Card>
                ))}
            </div>

            <Callout type="warning" title="Remember">
                {"\"I don't know, let me connect you with someone who does\" is always better than a confident wrong answer."}
            </Callout>
        </ProgressiveSection>

        <NextSectionNav currentId="debugging" />
    </div>
);
