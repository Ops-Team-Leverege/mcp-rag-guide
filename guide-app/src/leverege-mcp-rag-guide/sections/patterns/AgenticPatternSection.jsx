import React from 'react';
import { Workflow, AlertTriangle, CheckCircle, Brain, Zap, Bug } from 'lucide-react';
import { Card, Callout, ProgressiveSection, DiagramBox } from '../../components/ui';
import { NextSectionNav } from '../../index';

export const AgenticPatternSection = () => (
    <div className="space-y-12">
        <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">Agentic AI</h2>
            <p className="text-xl text-gray-600">
                The model autonomously plans and executes a multi-step workflow, deciding which tools to use and in what order based on intermediate results.
            </p>
        </div>

        <Callout type="warning" title="Your Last Choice, Not Your First">
            <p className="text-lg leading-relaxed">
                Agentic systems fail in ways that are difficult to anticipate and hard to reproduce.
                They should be your last choice, not your first. Use them only when simpler patterns genuinely can't solve the problem.
            </p>
        </Callout>

        <ProgressiveSection number="1" title="How Agentic AI Works" subtitle="Autonomous multi-step reasoning" defaultOpen={true}>
            <DiagramBox title="Agentic Flow">
                {`Goal → [LLM decides] → Tool 1 (search)
                     → Tool 2 (calc)
                     → Tool N (API)
              ↓
         [LLM synthesizes] → Response
         
Multi-step reasoning with tool execution`}
            </DiagramBox>

            <div className="mt-6 space-y-4">
                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">The Key Difference</h4>
                    <p className="text-gray-600 mb-4">
                        Rather than a fixed pipeline, the LLM is given a goal and a set of tools. It plans actions,
                        executes them, observes results, and adjusts its plan. The path from input to output is not
                        predetermined — it emerges from the model's reasoning at runtime.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-900 mb-2"><strong>Example:</strong></p>
                        <p className="text-blue-800">
                            "Research our competitor's pricing and draft a comparison" → The agent decides:
                            (1) search web for competitor, (2) extract pricing, (3) query our database for our pricing,
                            (4) compare, (5) draft document. Each step depends on the previous result.
                        </p>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="When to Use Agentic AI" subtitle="The right (rare) use cases">
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-emerald-50 border-emerald-200">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        <h4 className="font-semibold text-emerald-900">Use Agentic AI When:</h4>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>The task requires multiple steps and the right path isn't known upfront</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You need to chain tools dynamically based on intermediate results</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You're automating a workflow that a human would need to reason through</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>The task has ambiguity that requires judgment to navigate</span>
                        </li>
                    </ul>
                </Card>

                <Card className="p-6 bg-rose-50 border-rose-200">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-rose-600" />
                        <h4 className="font-semibold text-rose-900">Avoid Agentic AI When:</h4>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>You need predictable, auditable execution — agents are hard to debug and test</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>The task can be decomposed into a fixed sequence (use a chain instead)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>Errors are costly — agents can take wrong turns confidently and repeatedly</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>You need fast responses — agentic loops are slow (multiple LLM calls)</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="The Hard Truth About Agents" subtitle="Why they're difficult">
            <div className="space-y-4">
                <Card className="p-6 border-l-4 border-rose-500">
                    <div className="flex items-start gap-3">
                        <Bug className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-rose-900 mb-2">Unpredictable Failure Modes</h4>
                            <p className="text-gray-700 mb-3">
                                Agents can fail in ways you didn't anticipate. They might call the wrong tool,
                                misinterpret results, get stuck in loops, or confidently execute a completely wrong plan.
                            </p>
                            <div className="bg-rose-50 p-4 rounded-lg text-sm">
                                <p className="text-rose-900 mb-2"><strong>Example:</strong></p>
                                <p className="text-rose-800">
                                    Agent tasked with "research competitor pricing" searches for the wrong company,
                                    extracts data from an outdated page, and confidently reports incorrect numbers.
                                    No error was thrown — the agent just made bad decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-l-4 border-amber-500">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-amber-900 mb-2">Difficult to Debug</h4>
                            <p className="text-gray-700 mb-3">
                                When an agent fails, you have to trace through multiple LLM calls, tool invocations,
                                and decision points. The failure might be in step 7 of a 10-step plan, and reproducing
                                it requires the exact same context and intermediate results.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-l-4 border-purple-500">
                    <div className="flex items-start gap-3">
                        <Zap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-purple-900 mb-2">High Latency</h4>
                            <p className="text-gray-700">
                                Each decision point requires an LLM call. A 5-step agentic workflow might take 15-30 seconds
                                and cost 10x more than a fixed pipeline that accomplishes the same thing.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="Agentic vs. Router Pattern" subtitle="When to use which">
            <Callout type="insight" title="The Key Question">
                <p className="text-lg leading-relaxed">
                    Can you enumerate the possible paths upfront? If yes, use the Router Pattern.
                    If no — if the path genuinely depends on runtime discoveries — then consider Agentic AI.
                </p>
            </Callout>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Card className="p-6 bg-blue-50 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3">Router Pattern</h4>
                    <p className="text-gray-700 mb-4">
                        LLM classifies intent once, then deterministic code executes the path.
                        Predictable, fast, auditable.
                    </p>
                    <div className="bg-white p-4 rounded-lg text-sm">
                        <p className="text-gray-600 mb-2"><strong>Example:</strong></p>
                        <p className="text-gray-800">
                            "What did Acme say about pricing?" → Classify as SINGLE_MEETING →
                            Execute meeting retrieval handler → Return answer
                        </p>
                    </div>
                </Card>

                <Card className="p-6 bg-purple-50 border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-3">Agentic Pattern</h4>
                    <p className="text-gray-700 mb-4">
                        LLM decides each step based on what it learned in previous steps.
                        Flexible, slow, unpredictable.
                    </p>
                    <div className="bg-white p-4 rounded-lg text-sm">
                        <p className="text-gray-600 mb-2"><strong>Example:</strong></p>
                        <p className="text-gray-800">
                            "Research our top 3 competitors and compare features" → Agent searches web →
                            Discovers competitors → Extracts features → Queries our database → Compares → Drafts report
                        </p>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="Making Agents More Reliable" subtitle="Guardrails and constraints">
            <p className="text-gray-600 mb-6">
                If you must use agentic AI, add these guardrails to reduce unpredictability:
            </p>

            <div className="space-y-4">
                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">1. Limit Tool Access</h4>
                    <p className="text-gray-600">
                        Don't give the agent access to every tool. Provide only the tools relevant to the task.
                        Fewer options = fewer ways to go wrong.
                    </p>
                </Card>

                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">2. Set Step Limits</h4>
                    <p className="text-gray-600">
                        Cap the maximum number of steps (e.g., 10). If the agent hasn't completed the task by then,
                        it's probably stuck in a loop or pursuing the wrong path.
                    </p>
                </Card>

                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">3. Require Explicit Planning</h4>
                    <p className="text-gray-600">
                        Ask the agent to output a plan before executing. Review the plan (manually or programmatically)
                        before allowing execution. This catches obviously wrong approaches early.
                    </p>
                </Card>

                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">4. Log Everything</h4>
                    <p className="text-gray-600">
                        Log every decision, every tool call, every intermediate result. When (not if) the agent fails,
                        you need a complete trace to understand what went wrong.
                    </p>
                </Card>

                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">5. Human-in-the-Loop for High-Stakes Actions</h4>
                    <p className="text-gray-600">
                        For actions with real consequences (sending emails, making purchases, modifying databases),
                        require human approval before execution.
                    </p>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="Real-World Example" subtitle="When agentic AI makes sense">
            <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-4">Competitive Intelligence Research</h4>
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2"><strong>Task:</strong></p>
                        <p className="text-gray-800">
                            "Research our top 3 competitors in the CRM space, extract their pricing models,
                            compare to ours, and draft a competitive analysis report"
                        </p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-sm text-indigo-900 mb-3"><strong>Why Agentic Works Here:</strong></p>
                        <ul className="space-y-2 text-sm text-indigo-800">
                            <li>• Can't enumerate competitors upfront — needs to discover them</li>
                            <li>• Each competitor's website has different structure — needs adaptive extraction</li>
                            <li>• Comparison depends on what features were found — can't predefine the structure</li>
                            <li>• Multi-step reasoning required at each stage</li>
                        </ul>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-900 mb-3"><strong>Agent Execution:</strong></p>
                        <ol className="space-y-2 text-sm text-purple-800">
                            <li>1. Search: "top CRM competitors 2026"</li>
                            <li>2. Extract: Company names from search results</li>
                            <li>3. For each competitor: Visit website, find pricing page, extract model</li>
                            <li>4. Query internal database: Our pricing structure</li>
                            <li>5. Compare: Build comparison table</li>
                            <li>6. Draft: Generate analysis report with insights</li>
                        </ol>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                        <p className="text-sm text-emerald-900 mb-2"><strong>Result:</strong></p>
                        <p className="text-emerald-800">
                            A task that would take a human 2-3 hours is completed in 5 minutes.
                            The path couldn't be hardcoded because each step depends on discoveries from the previous step.
                        </p>
                    </div>
                </div>
            </Card>
        </ProgressiveSection>

        <div className="rounded-xl bg-gradient-to-r from-slate-800 to-purple-900 text-white p-8">
            <h3 className="font-semibold text-xl mb-4">🎯 The Bottom Line</h3>
            <div className="space-y-3 text-lg leading-relaxed">
                <p>
                    Agentic AI is powerful for tasks that genuinely require multi-step reasoning with runtime adaptation.
                    But it's also unpredictable, slow, and hard to debug.
                </p>
                <p>
                    Use it only when simpler patterns (Router, RAG, MCP with fixed chains) can't solve the problem.
                    And when you do use it, add guardrails: step limits, explicit planning, comprehensive logging,
                    and human review for high-stakes actions.
                </p>
            </div>
        </div>

        <NextSectionNav currentId="pattern-agentic" />
    </div>
);
