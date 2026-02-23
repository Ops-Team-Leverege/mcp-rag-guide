import React from 'react';
import { Layers, Database, Clock, FileText } from 'lucide-react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox } from '../components/ui';
import { NextSectionNav } from '../index';

export const ContextEngineeringSection = () => (
    <div className="space-y-12">
        <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">Context Engineering</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
                Context engineering is the evolution of prompt engineering. Where prompt engineering asks "what should I write?",
                context engineering asks "what should I include — and what should I leave out?"
            </p>
        </div>

        <Callout type="insight" title="The paradigm shift">
            <p className="text-lg leading-relaxed">
                "Building with language models is becoming less about finding the right words for your prompts, and more about
                answering the broader question of 'what configuration of context is most likely to generate our model's desired behavior?'"
                — Anthropic Engineering Blog
            </p>
        </Callout>

        <ProgressiveSection number="1" title="The Attention Budget" subtitle="Why more context isn't always better" defaultOpen={true}>
            <p className="text-gray-700 mb-4 text-lg">
                Models don't read context the way humans read documents. The transformer architecture creates n² pairwise
                relationships across all tokens in the context. As context grows, the model's ability to maintain all those
                relationships degrades — a phenomenon called context rot.
            </p>

            <Card className="bg-amber-50 border-amber-200">
                <h4 className="font-bold text-amber-900 mb-3 text-lg">Every token costs attention</h4>
                <p className="text-gray-700 mb-4">
                    Irrelevant tokens don't just fail to help — they actively compete with relevant tokens for the model's
                    limited focus. More context is frequently worse context.
                </p>
                <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-amber-800 mb-2">The guiding principle:</p>
                    <p className="text-gray-700">
                        Find the smallest set of high-signal tokens that maximizes the likelihood of your desired output.
                    </p>
                </div>
            </Card>

            <DiagramBox title="Context Rot Visualization">
                {`Context Size vs. Model Performance

Quality
   â"‚
100%â"‚     â—â—â—â—â—
    â"‚    â—      â—â—
 75%â"‚   â—          â—â—
    â"‚  â—              â—â—
 50%â"‚ â—                  â—â—
    â"‚â—                      â—â—â—
    â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
     0    50K   100K  150K  200K+
              Context Window Size

Sweet spot: High-signal content that fits
Too little: Missing critical context
Too much: Attention diluted, performance drops`}
            </DiagramBox>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="Sessions vs. Memory" subtitle="Two different problems, two different architectures">
            <p className="text-gray-700 mb-6 text-lg">
                One of the most important distinctions in context engineering — and one that gets collapsed too often —
                is the difference between session context and memory.
            </p>

            <ComparisonTable
                headers={["Dimension", "Session", "Memory"]}
                rows={[
                    ["Scope", "One conversation", "Across all conversations"],
                    ["Lifespan", "Ends when conversation ends", "Persists indefinitely"],
                    ["Primary problem", "Context growth / rot", "Staleness, conflicts, retrieval"],
                    ["Storage", "In-memory or fast session store", "Persistent database"],
                    ["Analogy", "Workbench", "Filing cabinet"]
                ]}
            />

            <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Card className="bg-blue-50 border-blue-200">
                    <div className="flex items-start gap-3">
                        <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-blue-900 mb-2 text-lg">Session Context</h4>
                            <p className="text-gray-700 mb-3">
                                The per-conversation context: the chronological log of what has been said, what tools were called,
                                what was returned. It's scoped to a single interaction.
                            </p>
                            <div className="bg-white p-3 rounded text-sm">
                                <p className="text-gray-600">
                                    <strong>Use for:</strong> Current conversation flow, immediate context, tool results,
                                    recent exchanges
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="bg-violet-50 border-violet-200">
                    <div className="flex items-start gap-3">
                        <Database className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-violet-900 mb-2 text-lg">Memory</h4>
                            <p className="text-gray-700 mb-3">
                                Cross-session persistence: information that survives after the conversation ends and should be
                                available to future conversations. User preferences, accumulated facts.
                            </p>
                            <div className="bg-white p-3 rounded text-sm">
                                <p className="text-gray-600">
                                    <strong>Use for:</strong> User preferences, learned patterns, historical context,
                                    personalization data
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <Callout type="warning" title="Most systems only implement sessions">
                <p className="text-lg leading-relaxed">
                    If your use case requires continuity across conversations — remembering what a customer discussed last month,
                    personalizing based on accumulated history — you need memory as a separate layer. If you're building for
                    single-turn or self-contained queries, sessions are sufficient.
                </p>
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="RAG vs. Memory" subtitle="Not the same thing">
            <p className="text-gray-700 mb-6 text-lg">
                RAG and memory are often confused because both involve "retrieving information." They serve fundamentally
                different purposes:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-emerald-500">
                    <h4 className="font-bold text-emerald-900 mb-3 text-lg">RAG (Retrieval-Augmented Generation)</h4>
                    <p className="text-gray-700 mb-4">
                        Retrieves from a shared knowledge base — facts that are the same for every user. Product documentation,
                        meeting transcripts, company policies.
                    </p>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                        <p className="font-semibold text-emerald-800 mb-2">Think of it as:</p>
                        <p className="text-sm text-emerald-700">
                            A research librarian: it knows where everything is, but it doesn't know you.
                        </p>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <h4 className="font-bold text-purple-900 mb-3 text-lg">Memory</h4>
                    <p className="text-gray-700 mb-4">
                        Retrieves user-specific knowledge that has accumulated over time — preferences, history, patterns
                        specific to one person or account.
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="font-semibold text-purple-800 mb-2">Think of it as:</p>
                        <p className="text-sm text-purple-700">
                            A personal assistant: it knows you, but not necessarily the general world.
                        </p>
                    </div>
                </Card>
            </div>

            <Callout type="insight" title="Both are necessary">
                <p className="text-lg leading-relaxed">
                    They are complementary, not competing. A system that only has RAG treats every user identically.
                    A system that only has memory can't answer general questions reliably. Sophisticated systems need both.
                </p>
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="System Prompt Design" subtitle="Writing prompts at the right altitude">
            <p className="text-gray-700 mb-6 text-lg">
                Write system prompts at the right altitude — specific enough to guide behavior, general enough to handle variation.
            </p>

            <div className="space-y-6">
                <Card className="bg-rose-50 border-rose-200">
                    <h4 className="font-bold text-rose-900 mb-3 text-lg">❌ Too Brittle (hardcoded logic)</h4>
                    <pre className="bg-white p-4 rounded text-xs font-mono text-rose-800 overflow-x-auto">
                        {`If the user asks about pricing, check if they mentioned a specific tier.
If tier = "Enterprise", respond with enterprise_pricing.txt content.
If tier = "Startup", respond with startup_pricing.txt content.
If tier is unspecified, ask for clarification before proceeding.`}
                    </pre>
                    <p className="text-sm text-rose-700 mt-3">
                        This breaks whenever reality doesn't match your enumeration. Every edge case requires a code change.
                    </p>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                    <h4 className="font-bold text-amber-900 mb-3 text-lg">❌ Too Vague (false shared context)</h4>
                    <pre className="bg-white p-4 rounded text-xs font-mono text-amber-800 overflow-x-auto">
                        {`Be helpful and accurate when answering questions about pricing.`}
                    </pre>
                    <p className="text-sm text-amber-700 mt-3">
                        The model has no signal about what "helpful" means in your context.
                    </p>
                </Card>

                <Card className="bg-emerald-50 border-emerald-200">
                    <h4 className="font-bold text-emerald-900 mb-3 text-lg">✓ Right Altitude (behavioral heuristics with examples)</h4>
                    <pre className="bg-white p-4 rounded text-xs font-mono text-emerald-800 overflow-x-auto">
                        {`You are a pricing specialist. When asked about pricing:
- Ask about company size if not mentioned (this determines which tier applies)
- Always cite the specific tier and what it includes
- If a price isn't in your context, say so rather than estimating
- See examples below for tone and format

<examples>
[2-5 demonstrations of desired behavior]
</examples>`}
                    </pre>
                    <p className="text-sm text-emerald-700 mt-3">
                        Specific enough to guide, flexible enough to handle variation.
                    </p>
                </Card>
            </div>

            <Card className="bg-blue-50 border-blue-200 mt-6">
                <h4 className="font-bold text-blue-900 mb-3 text-lg">Recommended Structure</h4>
                <div className="space-y-3 text-sm">
                    <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-blue-800 mb-1">{"<background>"}</p>
                        <p className="text-gray-600">What is this system, who uses it, what is the goal</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-blue-800 mb-1">{"<instructions>"}</p>
                        <p className="text-gray-600">What to do, what not to do</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-blue-800 mb-1">{"<examples>"}</p>
                        <p className="text-gray-600">2—5 demonstrations of desired behavior</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-blue-800 mb-1">{"<output_format>"}</p>
                        <p className="text-gray-600">Exactly how the response should be structured</p>
                    </div>
                </div>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="Just-in-Time Retrieval" subtitle="Load data when needed, not upfront">
            <p className="text-gray-700 mb-6 text-lg">
                Rather than loading all potentially relevant data upfront, agents can maintain lightweight references —
                file paths, query templates, stored IDs — and pull data into context only when needed.
            </p>

            <ComparisonTable
                headers={["Approach", "How It Works", "Best For"]}
                rows={[
                    [
                        "Upfront loading (traditional RAG)",
                        "Index everything, retrieve at query time",
                        "Fast for known queries, but may surface stale or irrelevant content"
                    ],
                    [
                        "Just-in-time retrieval",
                        "Agent maintains references and fetches exactly what it needs at each step",
                        "Context stays small and focused. Agent can adapt based on what it finds"
                    ],
                    [
                        "Hybrid (recommended)",
                        "Load high-confidence, always-relevant context upfront. Let agent fetch the rest when needed",
                        "Most production systems — balance speed and precision"
                    ]
                ]}
            />

            <Card className="bg-violet-50 border-violet-200 mt-6">
                <h4 className="font-bold text-violet-900 mb-3 text-lg">Example: Claude Code</h4>
                <p className="text-gray-700 mb-3">
                    CLAUDE.md files load upfront (system instructions, key reference data). Source files load just-in-time
                    via grep and glob when the agent determines it needs them.
                </p>
                <div className="bg-white p-4 rounded text-sm">
                    <p className="text-gray-600">
                        This keeps the context window clean while giving the agent access to everything it might need.
                        The agent decides what to load based on the task at hand.
                    </p>
                </div>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="Managing Long-Horizon Tasks" subtitle="Strategies for keeping context clean">
            <p className="text-gray-700 mb-6 text-lg">
                When tasks span many turns or the session grows too large, context rot becomes a real performance risk.
                You need explicit strategies to keep the context window clean.
            </p>

            <h4 className="font-bold text-gray-800 mb-4 text-lg">Compaction Strategies</h4>
            <div className="space-y-4 mb-6">
                <Card className="border-l-4 border-l-blue-500">
                    <h5 className="font-bold text-blue-900 mb-2">Sliding Window</h5>
                    <p className="text-gray-700 mb-2">
                        Keep only the last N turns; discard everything older.
                    </p>
                    <div className="bg-blue-50 p-3 rounded text-sm">
                        <p className="text-blue-800">
                            <strong>Best for:</strong> Short-memory tasks where recent context is all that matters
                        </p>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-violet-500">
                    <h5 className="font-bold text-violet-900 mb-2">Token-Based Truncation</h5>
                    <p className="text-gray-700 mb-2">
                        Include as many messages as fit within a token budget, oldest first to drop.
                    </p>
                    <div className="bg-violet-50 p-3 rounded text-sm">
                        <p className="text-violet-800">
                            <strong>Best for:</strong> General-purpose, simple to implement
                        </p>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-emerald-500">
                    <h5 className="font-bold text-emerald-900 mb-2">Recursive Summarization</h5>
                    <p className="text-gray-700 mb-2">
                        Periodically replace older conversation segments with an LLM-generated summary.
                    </p>
                    <div className="bg-emerald-50 p-3 rounded text-sm">
                        <p className="text-emerald-800">
                            <strong>Best for:</strong> Long conversations where historical context still matters
                        </p>
                    </div>
                </Card>
            </div>

            <Callout type="warning" title="The calibration challenge">
                <p className="text-lg leading-relaxed">
                    Aggressive compaction loses subtle context whose importance only becomes apparent later. Start by
                    maximizing recall (keep everything that could matter), then iterate to improve precision (remove what
                    definitely doesn't). Overly aggressive compression causes information loss that is hard to diagnose
                    because the system won't know what it's missing.
                </p>
            </Callout>

            <h4 className="font-bold text-gray-800 mb-4 text-lg mt-8">Alternative Strategies</h4>
            <div className="space-y-4">
                <Card className="bg-amber-50 border-amber-200">
                    <h5 className="font-bold text-amber-900 mb-2 text-lg">Structured Note-Taking</h5>
                    <p className="text-gray-700 mb-3">
                        The agent writes persistent notes outside the context window that are reloaded at later turns.
                        A NOTES.md file, a structured memory store, a to-do list.
                    </p>
                    <div className="bg-white p-3 rounded text-sm">
                        <p className="text-gray-600">
                            This gives the agent continuity across context resets without keeping everything in the window.
                        </p>
                    </div>
                </Card>

                <Card className="bg-sky-50 border-sky-200">
                    <h5 className="font-bold text-sky-900 mb-2 text-lg">Sub-Agent Architecture</h5>
                    <p className="text-gray-700 mb-3">
                        A coordinator agent delegates focused subtasks to specialized sub-agents, each with clean context windows.
                        Sub-agents may use tens of thousands of tokens exploring but return only a condensed summary to the coordinator.
                    </p>
                    <div className="bg-white p-3 rounded text-sm">
                        <p className="text-gray-600">
                            Each agent stays focused; the coordinator synthesizes. Best for complex research or parallel work streams.
                        </p>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <div className="rounded-xl bg-gradient-to-r from-slate-800 to-indigo-900 text-white p-8">
            <div className="flex items-start gap-4">
                <Layers className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-xl mb-4">The Context Engineering Mindset</h3>
                    <p className="text-lg leading-relaxed mb-4">
                        Context is not just "what you send to the model" — it's a designed artifact that determines what
                        the model can do.
                    </p>
                    <p className="text-indigo-200 leading-relaxed">
                        Every token is a choice. Every piece of information you include competes for attention with every
                        other piece. The goal is not to maximize context — it's to maximize signal-to-noise ratio. Small,
                        focused, high-quality context beats large, unfocused, noisy context every time.
                    </p>
                </div>
            </div>
        </div>

        <NextSectionNav currentId="contextengineering" />
    </div>
);
