import React from 'react';
import { Box, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Card, Callout } from '../components/ui';

export const PitCrewCaseStudy = () => (
    <div className="space-y-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Box className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold">PitCrew Sauce: A Real-World Case Study</h1>
                    <p className="text-blue-200 mt-2">Meeting intelligence bot for Leverege · Production since Feb 2026 · Slack-native</p>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-blue-200">Intent Types</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold">30+</div>
                    <div className="text-sm text-blue-200">Contracts</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold">8-20s</div>
                    <div className="text-sm text-blue-200">Response Time</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold">10</div>
                    <div className="text-sm text-blue-200">Active Users</div>
                </div>
            </div>
        </div>

        {/* Architecture Decision Table */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Architecture Decisions</h2>
            <p className="text-gray-600 mb-6">
                How PitCrew combines multiple AI paradigms to solve real business problems.
            </p>

            <div className="space-y-3">
                {[
                    {
                        paradigm: "Context Engineering",
                        decision: "✅ Used everywhere",
                        reasoning: "Foundation — system prompts, contracts, few-shot examples shape every request",
                        color: "green"
                    },
                    {
                        paradigm: "Router Pattern",
                        decision: "✅ Primary",
                        reasoning: "Team-wide Slack access, audit trail required, pricing questions can't be wrong",
                        color: "green"
                    },
                    {
                        paradigm: "RAG",
                        decision: "✅ Primary data",
                        reasoning: "Meeting data changes weekly, must cite specific transcripts, search 100+ meetings",
                        color: "green"
                    },
                    {
                        paradigm: "Agentic AI",
                        decision: "⚠️ One intent only",
                        reasoning: "EXTERNAL_RESEARCH needs web search. All others are deterministic — predictability > flexibility",
                        color: "amber"
                    },
                    {
                        paradigm: "MCP",
                        decision: "⚠️ Exposure only",
                        reasoning: "Available for Claude Desktop / Cursor. Slack uses Router — can't have LLM picking random tools for customers",
                        color: "amber"
                    },
                    {
                        paradigm: "Fine-tuning",
                        decision: "❌ Not used",
                        reasoning: "Data changes weekly. Can't cite 'baked in' knowledge. Wrong trade-off for our use case.",
                        color: "red"
                    },
                    {
                        paradigm: "A2A",
                        decision: "❌ Not used",
                        reasoning: "Single-agent system. No partner agents to talk to.",
                        color: "red"
                    },
                ].map((item, i) => {
                    const borderColors = {
                        green: "border-l-green-500",
                        amber: "border-l-amber-500",
                        red: "border-l-red-500"
                    };
                    return (
                        <Card key={i} className={`p-5 border-l-4 ${borderColors[item.color]}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-lg text-gray-900">{item.paradigm}</h3>
                                        <span className="text-sm font-medium text-gray-600">{item.decision}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{item.reasoning}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>

        {/* Design Principles That Held Up */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Principles That Held Up</h2>
            <p className="text-gray-600 mb-6">
                Five principles that guided every architectural decision in PitCrew.
            </p>

            <div className="space-y-4">
                <Card className="p-5 border-l-4 border-blue-500">
                    <h3 className="font-bold text-blue-900 mb-2">1. Trust &gt; Verbosity</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        <strong>Principle:</strong> Short and accurate beats long and uncertain.
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        Every extractive query has an explicit fallback. If we can't find the answer with high confidence,
                        we say "I couldn't find that" instead of generating a plausible-sounding answer.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg text-sm">
                        <p className="text-blue-900"><strong>Implementation:</strong> REFUSE intent fires when confidence &lt; threshold.
                            Better to admit uncertainty than hallucinate.</p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-purple-500">
                    <h3 className="font-bold text-purple-900 mb-2">2. Extraction &gt; Summarization</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        <strong>Principle:</strong> Pulling exact quotes is more reliable than generating summaries.
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        When users ask "What did the customer say about X?", we return verbatim quotes with citations,
                        not LLM-generated summaries. Summaries invite hallucination.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg text-sm">
                        <p className="text-purple-900"><strong>Implementation:</strong> Retrieval returns raw chunks.
                            LLM formats them with citations but doesn't paraphrase.</p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-green-500">
                    <h3 className="font-bold text-green-900 mb-2">3. Bounded Capabilities &gt; Open-Ended Chat</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        <strong>Principle:</strong> Every response maps to a defined capability with known behavior.
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        PitCrew isn't a chatbot. It's a Q&A system with 8 intent types and 30+ contracts.
                        Users know what it can do, and we can test every capability independently.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg text-sm">
                        <p className="text-green-900"><strong>Implementation:</strong> Router classifies to intent → contract → handler.
                            No "freestyle" generation.</p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-amber-500">
                    <h3 className="font-bold text-amber-900 mb-2">4. Canonical Data is Authoritative</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        <strong>Principle:</strong> Product features come from SSOT. LLM never invents them.
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        When users ask about product capabilities, we query the product database (SSOT).
                        The LLM formats the response but doesn't generate feature descriptions from memory.
                    </p>
                    <div className="bg-amber-50 p-3 rounded-lg text-sm">
                        <p className="text-amber-900"><strong>Implementation:</strong> PRODUCT_FEATURE intent → SQL query → format response.
                            Zero hallucination risk.</p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-red-500">
                    <h3 className="font-bold text-red-900 mb-2">5. Fewer, High-Quality Capabilities &gt; Many Fuzzy Ones</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        <strong>Principle:</strong> Delayed cross-meeting analysis until single-meeting was solid.
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        We shipped with 5 intents, not 20. Each one was tested thoroughly.
                        Adding new capabilities is easy once the foundation is solid.
                    </p>
                    <div className="bg-red-50 p-3 rounded-lg text-sm">
                        <p className="text-red-900"><strong>Implementation:</strong> MVP focused on SINGLE_MEETING and LAST_MEETING.
                            Cross-meeting came later.</p>
                    </div>
                </Card>
            </div>
        </div>

        {/* Mistakes We Made And Fixed */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mistakes We Made (And Fixed)</h2>
            <p className="text-gray-600 mb-6">
                Four real mistakes from PitCrew development, with before/after fixes.
            </p>

            <div className="space-y-4">
                <Card className="p-5 bg-red-50 border-l-4 border-red-500">
                    <h3 className="font-bold text-red-900 mb-3">❌ Mistake 1: LLM in the Retrieval Path</h3>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">What we did wrong:</p>
                        <p className="text-sm text-gray-600">
                            Early version asked the LLM to "find the relevant meeting" based on the user's question.
                            The LLM hallucinated meeting dates that didn't exist.
                        </p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">The fix:</p>
                        <p className="text-sm text-gray-600">
                            Company resolution and transcript selection are now pure SQL.
                            LLM only sees data that actually exists in the database.
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-green-700"><strong>Lesson:</strong> Never let the LLM choose what data to retrieve.
                            Use deterministic code for retrieval, LLM for generation.</p>
                    </div>
                </Card>

                <Card className="p-5 bg-red-50 border-l-4 border-red-500">
                    <h3 className="font-bold text-red-900 mb-3">❌ Mistake 2: Aggressive Speaker Role Inference</h3>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">What we did wrong:</p>
                        <p className="text-sm text-gray-600">
                            LLM guessed speaker roles when names didn't match exactly. 20% of guesses were wrong,
                            leading to misattributed quotes.
                        </p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">The fix:</p>
                        <p className="text-sm text-gray-600">
                            Conservative role assignment with fuzzy matching. If we can't match with high confidence,
                            role = 'unknown'. Users can filter by 'unknown' and improve matching logic.
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-green-700"><strong>Lesson:</strong> Explicit 'unknown' state &gt; wrong guess.
                            Users trust "I don't know" more than wrong attribution.</p>
                    </div>
                </Card>

                <Card className="p-5 bg-red-50 border-l-4 border-red-500">
                    <h3 className="font-bold text-red-900 mb-3">❌ Mistake 3: Token-Based Chunking</h3>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">What we did wrong:</p>
                        <p className="text-sm text-gray-600">
                            500-token chunks broke speaker turns mid-sentence. Context was lost, citations were confusing.
                        </p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">The fix:</p>
                        <p className="text-sm text-gray-600">
                            Speaker-turn chunking preserving context. Each chunk = one speaker's complete turn.
                            Metadata includes previous/next speaker for context.
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-green-700"><strong>Lesson:</strong> Chunk boundaries matter.
                            Respect natural document structure (speaker turns, paragraphs, sections).</p>
                    </div>
                </Card>

                <Card className="p-5 bg-red-50 border-l-4 border-red-500">
                    <h3 className="font-bold text-red-900 mb-3">❌ Mistake 4: Returning [object Object] to Slack</h3>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">What we did wrong:</p>
                        <p className="text-sm text-gray-600">
                            Handler stringified the entire response object instead of extracting result.answer.
                            Users saw "[object Object]" in Slack.
                        </p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">The fix:</p>
                        <p className="text-sm text-gray-600">
                            Explicit result.answer extraction with type safety. TypeScript interfaces enforce correct structure.
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-green-700"><strong>Lesson:</strong> Type safety prevents runtime surprises.
                            Test the full integration path, not just the handler.</p>
                    </div>
                </Card>
            </div>
        </div>

        {/* Why GPT Wrappers Fail */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Case Study: Why GPT Wrappers Fail</h2>
            <p className="text-gray-600 mb-6">
                Three real hallucination patterns from actual PitCrew Q&A extraction attempts, and why "just prompt better" doesn't fix them.
            </p>

            <div className="space-y-4">
                <Card className="p-5 bg-red-50 border-l-4 border-red-500">
                    <h3 className="font-bold text-red-900 mb-3">Pattern 1: Fake Specificity</h3>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">What happened:</p>
                        <p className="text-sm text-gray-600 mb-2">
                            User asked: "What TV model did the customer mention?"
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            Transcript said: "I don't see a brand on the TV"
                        </p>
                        <p className="text-sm text-gray-600">
                            LLM returned: "55-inch TCL Google TV"
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-red-700"><strong>Why it happened:</strong> LLM filled in "reasonable" details
                            from training data when the transcript was vague. The answer sounds plausible but is completely fabricated.</p>
                    </div>
                </Card>

                <Card className="p-5 bg-red-50 border-l-4 border-red-500">
                    <h3 className="font-bold text-red-900 mb-3">Pattern 2: Context Collapse</h3>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">What happened:</p>
                        <p className="text-sm text-gray-600 mb-2">
                            Transcript: "Calum mentioned the integration issue. Corey will handle the technical side."
                        </p>
                        <p className="text-sm text-gray-600">
                            LLM returned: "Calum is handling the technical integration" (wrong — Corey is the tech lead)
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-red-700"><strong>Why it happened:</strong> LLM collapsed two separate statements
                            into one, assigning tech ownership to the wrong person. Subtle but dangerous for follow-ups.</p>
                    </div>
                </Card>

                <Card className="p-5 bg-red-50 border-l-4 border-red-500">
                    <h3 className="font-bold text-red-900 mb-3">Pattern 3: Ghost Questions</h3>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">What happened:</p>
                        <p className="text-sm text-gray-600 mb-2">
                            Prompt: "Extract all Q&A pairs from this meeting"
                        </p>
                        <p className="text-sm text-gray-600">
                            LLM returned: "Q: When will the feature ship? A: August 15th" (neither question nor date appeared in transcript)
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-red-700"><strong>Why it happened:</strong> "Summarize Q&A" prompt → LLM invents
                            Socratic dialogue. It creates questions that "should have been asked" based on context.</p>
                    </div>
                </Card>
            </div>

            <Callout type="warning" title="Root Cause">
                All three patterns share the same root cause: <strong>the LLM is trained to be helpful, not accurate</strong>.
                When asked to summarize or extract, it fills gaps with plausible content from training data.
                "Prompt engineering" can reduce this but never eliminates it.
            </Callout>

            <Card className="p-5 bg-green-50 border-l-4 border-green-500 mt-4">
                <h3 className="font-bold text-green-900 mb-3">✅ The Fix: Evidence-First Architecture</h3>
                <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>1. Extractive citation:</strong> Return exact quotes with line numbers, not summaries</p>
                    <p><strong>2. Strict quoting:</strong> LLM formats but doesn't paraphrase. Quotes are verbatim.</p>
                    <p><strong>3. Null states:</strong> "I couldn't find that" is a valid answer. No guessing.</p>
                    <p><strong>4. Attribution:</strong> Every claim traces to a specific chunk with metadata (speaker, timestamp, meeting)</p>
                </div>
                <div className="bg-white p-3 rounded-lg mt-3">
                    <p className="text-sm text-green-700"><strong>Result:</strong> Zero hallucinations on extractive queries.
                        Users trust the system because every answer is grounded in retrievable evidence.</p>
                </div>
            </Card>
        </div>

        {/* Lessons Summary */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>

            <div className="grid md:grid-cols-2 gap-4">
                {[
                    {
                        title: "90% of bad answers are retrieval problems",
                        desc: "Not the LLM. Check what data was retrieved before blaming the model.",
                        icon: CheckCircle,
                        color: "blue"
                    },
                    {
                        title: "REFUSE and CLARIFY are first-class intents",
                        desc: "Not afterthoughts. If you can't answer well, say so. If the question is ambiguous, ask.",
                        icon: AlertTriangle,
                        color: "amber"
                    },
                    {
                        title: "Contract distribution reveals design flaws",
                        desc: "Early testing showed GENERAL_RESPONSE fired for 32% of queries — too broad. Tightening intents fixed it.",
                        icon: XCircle,
                        color: "red"
                    },
                    {
                        title: "The ingestion pipeline takes longer than the AI code",
                        desc: "Data preparation consistently takes the largest share of effort — cleaning, ingestion, metadata mapping. Plan for the boring stuff.",
                        icon: CheckCircle,
                        color: "green"
                    },
                ].map((item, i) => {
                    const bgColors = {
                        blue: "bg-blue-50 border-blue-200",
                        amber: "bg-amber-50 border-amber-200",
                        red: "bg-red-50 border-red-200",
                        green: "bg-green-50 border-green-200"
                    };
                    const iconColors = {
                        blue: "text-blue-600",
                        amber: "text-amber-600",
                        red: "text-red-600",
                        green: "text-green-600"
                    };
                    return (
                        <Card key={i} className={`p-5 ${bgColors[item.color]}`}>
                            <div className="flex items-start gap-3">
                                <item.icon className={`w-6 h-6 ${iconColors[item.color]} flex-shrink-0 mt-1`} />
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    </div>
);
