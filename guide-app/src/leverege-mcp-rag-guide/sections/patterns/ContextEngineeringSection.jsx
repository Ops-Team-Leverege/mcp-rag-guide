import React from 'react';
import { MessageSquare, Brain, Database, FileText, AlertTriangle, Lightbulb } from 'lucide-react';
import { Card, Callout, ProgressiveSection, DiagramBox, ComparisonTable } from '../../components/ui';
import { NextSectionNav } from '../../index';

export const ContextEngineeringSection = () => (
    <div className="space-y-12">
        <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">Context Engineering</h2>
            <p className="text-xl text-gray-600">
                Deliberately architect what information is in the model's context window at the moment of generation.
            </p>
        </div>

        <Callout type="insight" title="The Evolution of Prompt Engineering">
            <p className="text-lg leading-relaxed">
                Building with language models is becoming less about finding the right words for your prompts,
                and more about answering the broader question of "what configuration of context is most likely
                to generate our model's desired behavior?" — Anthropic Engineering Blog
            </p>
        </Callout>

        <ProgressiveSection number="1" title="Context Engineering vs. Prompt Engineering" subtitle="The 2025 shift in thinking" defaultOpen={true}>
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-sky-50 border-sky-200">
                    <h4 className="font-semibold text-sky-900 mb-3">Prompt Engineering (2023 thinking)</h4>
                    <p className="text-gray-700 mb-3">"How do I word this instruction?"</p>
                    <ul className="space-y-2 text-gray-600">
                        <li>• Focus on instruction wording</li>
                        <li>• Static across requests</li>
                        <li>• The "what to do"</li>
                    </ul>
                </Card>

                <Card className="p-6 bg-violet-50 border-violet-200">
                    <h4 className="font-semibold text-violet-900 mb-3">Context Engineering (2025 thinking)</h4>
                    <p className="text-gray-700 mb-3">"What information goes into the context window?"</p>
                    <ul className="space-y-2 text-gray-600">
                        <li>• Focus on data orchestration</li>
                        <li>• Dynamic per request</li>
                        <li>• The "what to reference"</li>
                    </ul>
                </Card>
            </div>

            <Callout type="info" title="Why This Matters">
                <p className="text-lg leading-relaxed">
                    In production systems, the prompt (instruction) stays relatively stable. What changes per request
                    is the context — which documents get injected, which knowledge base rows get retrieved.
                    Getting the right data into the window matters more than wordsmithing the instructions.
                </p>
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="The Attention Budget" subtitle="Every token costs attention">
            <Callout type="warning" title="Context Rot">
                <p className="text-lg leading-relaxed">
                    Models don't read context the way humans read documents. The transformer architecture creates n²
                    pairwise relationships across all tokens in the context. As context grows, the model's ability
                    to maintain all those relationships degrades — a phenomenon called context rot.
                </p>
            </Callout>

            <Card className="p-6 bg-amber-50 border-amber-200 mt-6">
                <h4 className="font-semibold text-amber-900 mb-3">The Core Principle</h4>
                <p className="text-gray-700 text-lg">
                    Every token you include costs attention. Irrelevant tokens don't just fail to help —
                    they actively compete with relevant tokens for the model's limited focus.
                    <strong> More context is frequently worse context.</strong>
                </p>
            </Card>

            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">The Guiding Principle</h4>
                <p className="text-blue-800 text-lg">
                    Find the smallest set of high-signal tokens that maximizes the likelihood of your desired output.
                </p>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="Sessions vs. Memory" subtitle="Two different problems">
            <Callout type="insight" title="The Critical Distinction">
                <p className="text-lg leading-relaxed">
                    One of the most important distinctions in context engineering — and one that gets collapsed too often —
                    is the difference between session context and memory.
                </p>
            </Callout>

            <div className="space-y-6 mt-6">
                <Card className="p-6 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-3">Session Context</h4>
                    <p className="text-gray-700 mb-4">
                        The per-conversation context: the chronological log of what has been said, what tools were called,
                        what was returned. It's scoped to a single interaction. It grows as the conversation progresses,
                        which is exactly why context rot is a problem.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-900"><strong>Analogy:</strong> Workbench</p>
                        <p className="text-sm text-blue-800 mt-1">Everything you're actively working with right now</p>
                    </div>
                </Card>

                <Card className="p-6 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900 mb-3">Memory</h4>
                    <p className="text-gray-700 mb-4">
                        Cross-session persistence: information that survives after the conversation ends and should be
                        available to future conversations. User preferences, accumulated facts about a customer,
                        learned workflow patterns.
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-900"><strong>Analogy:</strong> Filing Cabinet</p>
                        <p className="text-sm text-purple-800 mt-1">Information stored for long-term retrieval</p>
                    </div>
                </Card>
            </div>

            <div className="mt-6">
                <ComparisonTable
                    headers={["Dimension", "Session", "Memory"]}
                    rows={[
                        ["Scope", "One conversation", "Across all conversations"],
                        ["Lifespan", "Ends when conversation ends", "Persists indefinitely"],
                        ["Primary problem", "Context growth / rot", "Staleness, conflicts, retrieval"],
                        ["Storage", "In-memory or fast session store", "Persistent database"],
                    ]}
                />
            </div>

            <Card className="p-6 bg-yellow-50 border-yellow-200 mt-6">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold text-yellow-900 mb-2">Most Systems Only Implement Sessions</h4>
                        <p className="text-gray-700">
                            If your use case requires continuity across conversations — remembering what a customer discussed
                            last month, personalizing based on accumulated history — you need memory as a separate layer.
                            If you're building for single-turn or self-contained queries, sessions are sufficient.
                        </p>
                    </div>
                </div>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="RAG vs. Memory" subtitle="Not the same thing">
            <p className="text-gray-600 mb-6">
                RAG and memory are often confused because both involve "retrieving information."
                They serve fundamentally different purposes:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-green-50 border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                        <Database className="w-6 h-6 text-green-600" />
                        <h4 className="font-semibold text-green-900">RAG</h4>
                    </div>
                    <p className="text-gray-700 mb-3">
                        Retrieves from a <strong>shared knowledge base</strong> — facts that are the same for every user.
                    </p>
                    <div className="bg-white p-4 rounded-lg text-sm">
                        <p className="text-gray-600 mb-2"><strong>Examples:</strong></p>
                        <ul className="space-y-1 text-gray-600">
                            <li>• Product documentation</li>
                            <li>• Meeting transcripts</li>
                            <li>• Company policies</li>
                        </ul>
                    </div>
                    <p className="text-sm text-green-800 mt-3 italic">
                        Think: Research librarian — knows where everything is, but doesn't know you
                    </p>
                </Card>

                <Card className="p-6 bg-purple-50 border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                        <Brain className="w-6 h-6 text-purple-600" />
                        <h4 className="font-semibold text-purple-900">Memory</h4>
                    </div>
                    <p className="text-gray-700 mb-3">
                        Retrieves <strong>user-specific knowledge</strong> that has accumulated over time — preferences,
                        history, patterns specific to one person or account.
                    </p>
                    <div className="bg-white p-4 rounded-lg text-sm">
                        <p className="text-gray-600 mb-2"><strong>Examples:</strong></p>
                        <ul className="space-y-1 text-gray-600">
                            <li>• User preferences</li>
                            <li>• Conversation history</li>
                            <li>• Learned patterns</li>
                        </ul>
                    </div>
                    <p className="text-sm text-purple-800 mt-3 italic">
                        Think: Personal assistant — knows you, but not necessarily the general world
                    </p>
                </Card>
            </div>

            <Callout type="success" title="Both Are Necessary">
                <p className="text-lg leading-relaxed">
                    Both are necessary in sophisticated systems. They are complementary, not competing.
                    A system that only has RAG treats every user identically. A system that only has memory
                    can't answer general questions reliably.
                </p>
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="System Prompt Design" subtitle="Writing at the right altitude">
            <p className="text-gray-600 mb-6">
                Write system prompts at the right altitude — specific enough to guide behavior,
                general enough to handle variation.
            </p>

            <div className="space-y-6">
                <Card className="p-6 border-l-4 border-rose-500">
                    <h4 className="font-semibold text-rose-900 mb-3">❌ Too Brittle (Hardcoded Logic)</h4>
                    <div className="bg-rose-50 p-4 rounded-lg font-mono text-sm">
                        <p className="text-rose-900">
                            If the user asks about pricing, check if they mentioned a specific tier.
                            If tier = "Enterprise", respond with enterprise_pricing.txt content.
                            If tier = "Startup", respond with startup_pricing.txt content.
                            If tier is unspecified, ask for clarification before proceeding.
                        </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                        This breaks whenever reality doesn't match your enumeration. Every edge case requires a code change.
                    </p>
                </Card>

                <Card className="p-6 border-l-4 border-amber-500">
                    <h4 className="font-semibold text-amber-900 mb-3">⚠️ Too Vague (False Shared Context)</h4>
                    <div className="bg-amber-50 p-4 rounded-lg font-mono text-sm">
                        <p className="text-amber-900">
                            Be helpful and accurate when answering questions about pricing.
                        </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                        The model has no signal about what "helpful" means in your context.
                    </p>
                </Card>

                <Card className="p-6 border-l-4 border-emerald-500">
                    <h4 className="font-semibold text-emerald-900 mb-3">✅ Right Altitude (Behavioral Heuristics)</h4>
                    <div className="bg-emerald-50 p-4 rounded-lg font-mono text-sm">
                        <p className="text-emerald-900">
                            You are a pricing specialist. When asked about pricing:<br />
                            - Ask about company size if not mentioned (this determines which tier applies)<br />
                            - Always cite the specific tier and what it includes<br />
                            - If a price isn't in your context, say so rather than estimating<br />
                            - See examples below for tone and format
                        </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                        Specific enough to guide behavior, general enough to handle variation.
                    </p>
                </Card>
            </div>

            <Card className="p-6 bg-blue-50 border-blue-200 mt-6">
                <h4 className="font-semibold text-blue-900 mb-3">Recommended Structure</h4>
                <div className="space-y-3 text-sm">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="font-mono text-blue-900">&lt;background&gt;</p>
                        <p className="text-gray-600 mt-1">What is this system, who uses it, what is the goal</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <p className="font-mono text-blue-900">&lt;instructions&gt;</p>
                        <p className="text-gray-600 mt-1">What to do, what not to do</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <p className="font-mono text-blue-900">&lt;examples&gt;</p>
                        <p className="text-gray-600 mt-1">2—5 demonstrations of desired behavior</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <p className="font-mono text-blue-900">&lt;output_format&gt;</p>
                        <p className="text-gray-600 mt-1">Exactly how the response should be structured</p>
                    </div>
                </div>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="Just-in-Time Retrieval" subtitle="Load what you need, when you need it">
            <p className="text-gray-600 mb-6">
                Rather than loading all potentially relevant data upfront, agents can maintain lightweight references —
                file paths, query templates, stored IDs — and pull data into context only when needed.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Upfront Loading (Traditional RAG)</h4>
                    <p className="text-gray-600 mb-3">
                        Index everything, retrieve at query time. Fast for known queries, but may surface stale or irrelevant content.
                    </p>
                </Card>

                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Just-in-Time Retrieval</h4>
                    <p className="text-gray-600 mb-3">
                        Agent maintains references and fetches exactly what it needs at each step. Context stays small and focused.
                        Agent can adapt based on what it finds.
                    </p>
                </Card>
            </div>

            <Card className="p-6 bg-indigo-50 border-indigo-200 mt-6">
                <h4 className="font-semibold text-indigo-900 mb-3">Hybrid Approach (Recommended)</h4>
                <p className="text-gray-700">
                    Load high-confidence, always-relevant context upfront (system instructions, key reference data).
                    Let the agent fetch the rest when it determines it's needed. This is what Claude Code does —
                    CLAUDE.md files load upfront, source files load just-in-time via grep and glob.
                </p>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="7" title="Managing Long-Horizon Tasks" subtitle="When sessions grow too large">
            <Callout type="warning" title="The Problem">
                <p className="text-lg leading-relaxed">
                    When tasks span many turns or the session grows too large, context rot becomes a real performance risk.
                    You need explicit strategies to keep the context window clean.
                </p>
            </Callout>

            <h4 className="font-semibold text-gray-900 mb-4 mt-6">Compaction Strategies</h4>
            <div className="space-y-4">
                <Card className="p-6 border-l-4 border-blue-500">
                    <h5 className="font-semibold text-blue-900 mb-2">Sliding Window</h5>
                    <p className="text-gray-600 mb-2">Keep only the last N turns; discard everything older</p>
                    <p className="text-sm text-gray-500"><strong>Best for:</strong> Short-memory tasks where recent context is all that matters</p>
                </Card>

                <Card className="p-6 border-l-4 border-purple-500">
                    <h5 className="font-semibold text-purple-900 mb-2">Token-Based Truncation</h5>
                    <p className="text-gray-600 mb-2">Include as many messages as fit within a token budget, oldest first to drop</p>
                    <p className="text-sm text-gray-500"><strong>Best for:</strong> General-purpose, simple to implement</p>
                </Card>

                <Card className="p-6 border-l-4 border-green-500">
                    <h5 className="font-semibold text-green-900 mb-2">Recursive Summarization</h5>
                    <p className="text-gray-600 mb-2">Periodically replace older conversation segments with an LLM-generated summary</p>
                    <p className="text-sm text-gray-500"><strong>Best for:</strong> Long conversations where historical context still matters</p>
                </Card>
            </div>

            <Card className="p-6 bg-amber-50 border-amber-200 mt-6">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold text-amber-900 mb-2">The Art of Calibration</h4>
                        <p className="text-gray-700">
                            Aggressive compaction loses subtle context whose importance only becomes apparent later.
                            Start by maximizing recall (keep everything that could matter), then iterate to improve precision
                            (remove what definitely doesn't). Overly aggressive compression causes information loss that is
                            hard to diagnose because the system won't know what it's missing.
                        </p>
                    </div>
                </div>
            </Card>

            <h4 className="font-semibold text-gray-900 mb-4 mt-8">Alternative Strategies</h4>
            <div className="space-y-4">
                <Card className="p-6">
                    <h5 className="font-semibold text-gray-900 mb-2">Structured Note-Taking</h5>
                    <p className="text-gray-600">
                        The agent writes persistent notes outside the context window that are reloaded at later turns.
                        A NOTES.md file, a structured memory store, a to-do list. This gives the agent continuity across
                        context resets without keeping everything in the window.
                    </p>
                </Card>

                <Card className="p-6">
                    <h5 className="font-semibold text-gray-900 mb-2">Sub-Agent Architecture</h5>
                    <p className="text-gray-600">
                        A coordinator agent delegates focused subtasks to specialized sub-agents, each with clean context windows.
                        Sub-agents may use tens of thousands of tokens exploring but return only a condensed summary
                        (1,000—2,000 tokens) to the coordinator. Each agent stays focused; the coordinator synthesizes.
                    </p>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="8" title="Memory Provenance" subtitle="Track where memories come from">
            <Callout type="danger" title="Non-Negotiable for Cross-Session Memory">
                <p className="text-lg leading-relaxed">
                    If you implement cross-session memory, provenance is non-negotiable. Provenance is the record of
                    where a memory came from, how confident you are in it, and when it was last reinforced.
                </p>
            </Callout>

            <Card className="p-6 bg-rose-50 border-rose-200 mt-6">
                <h4 className="font-semibold text-rose-900 mb-3">Without Provenance</h4>
                <p className="text-gray-700">
                    Memory is a black box. You can't tell whether a stored fact came from something the user said once
                    in passing or something they confirmed across multiple conversations. You can't resolve conflicts when
                    two sources say different things. You can't know when to trust a memory vs. when to question it.
                </p>
            </Card>

            <Card className="p-6 bg-emerald-50 border-emerald-200 mt-6">
                <h4 className="font-semibold text-emerald-900 mb-3">Track at Minimum</h4>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <div>
                            <strong>Source:</strong> Where did this come from? (user statement, tool output, inferred pattern)
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <div>
                            <strong>Confidence:</strong> How certain? (mentioned once vs. repeated and confirmed)
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <div>
                            <strong>Age:</strong> When was this stored, and when was it last reinforced?
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <div>
                            <strong>Recency decay:</strong> Reduce the weight of old, unreinforced memories over time
                        </div>
                    </li>
                </ul>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200 mt-6">
                <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                        <p className="text-gray-700">
                            <strong>Tool output is generally a poor memory source</strong> — it tends to be brittle and stale quickly.
                            User-stated preferences and patterns are the most durable.
                        </p>
                    </div>
                </div>
            </Card>
        </ProgressiveSection>

        <div className="rounded-xl bg-gradient-to-r from-slate-800 to-purple-900 text-white p-8">
            <h3 className="font-semibold text-xl mb-4">🎯 The Bottom Line</h3>
            <div className="space-y-3 text-lg leading-relaxed">
                <p>
                    Context engineering is about being deliberate with what goes into the model's attention window.
                    Every token costs attention. More is not better.
                </p>
                <p>
                    The shift from prompt engineering to context engineering reflects a maturation of the field:
                    we're moving from "what should I say?" to "what should I include?"
                </p>
            </div>
        </div>

        <NextSectionNav currentId="pattern-context" />
    </div>
);
