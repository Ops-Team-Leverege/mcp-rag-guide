import React, { useState } from 'react';
import { Box, CheckCircle, AlertTriangle, XCircle, Database, Zap, Code, Search } from 'lucide-react';
import { Card, Callout } from '../components/ui';
import { NextSectionNav } from '../index';

export const PitCrewCaseStudy = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="space-y-10">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Box className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-semibold">PitCrew Sauce: A Real-World Case Study</h1>
                        <p className="text-blue-200 mt-2">Meeting intelligence bot for Leverege · Production since Feb 2026 · Slack-native</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="text-2xl font-semibold">8</div>
                        <div className="text-sm text-blue-200">Intent Types</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="text-2xl font-semibold">30+</div>
                        <div className="text-sm text-blue-200">Contracts</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="text-2xl font-semibold">4-15s</div>
                        <div className="text-sm text-blue-200">Response Time</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="text-2xl font-semibold">10</div>
                        <div className="text-sm text-blue-200">Active Users</div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-slate-200">
                <div className="flex gap-1">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-3 font-medium text-sm transition-all ${activeTab === 'overview'
                            ? 'text-indigo-600 border-b-2 border-indigo-600'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        High-Level Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('ops')}
                        className={`px-6 py-3 font-medium text-sm transition-all ${activeTab === 'ops'
                            ? 'text-indigo-600 border-b-2 border-indigo-600'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Ops Reference
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' ? <HighLevelOverview /> : <OpsReference />}

            <NextSectionNav currentId="pitcrew" />
        </div>
    );
};

// High-Level Overview Tab
const HighLevelOverview = () => (
    <div className="space-y-10">
        <Callout type="info" title="What This Section Covers">
            {"Strategic lessons from building PitCrew: architecture decisions, design principles, and why certain patterns were chosen over others."}
        </Callout>

        {/* What PitCrew Does */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">What PitCrew Does</h2>
            <p className="text-slate-600 mb-4">
                PitCrew helps sales teams get answers from their meeting transcripts without digging through recordings.
                A rep can ask "What did the Costco team say about their IT infrastructure timeline?" or "Draft a follow-up
                email for the MegaCorp call" and get a grounded, cited answer in seconds — accessible via a web dashboard
                or directly in Slack (PitCrew Sauce).
            </p>
            <p className="text-slate-600">
                The system processes uploaded meeting transcripts, extracts structured intelligence at ingestion time
                (Q&A pairs, action items, product insights), and surfaces that information through a conversational
                interface backed by RAG and intent-aware routing.
            </p>
        </div>

        {/* Why They Built It */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Why They Built It</h2>
            <p className="text-slate-600 mb-4">
                The team started with a concrete problem: sales reps were spending significant time re-listening to
                meeting recordings before follow-up calls. The answer was buried in transcripts — the challenge was
                retrieval and synthesis at speed.
            </p>

            <p className="text-slate-600 mb-4">
                Before building, they asked three questions that shaped every downstream decision:
            </p>
            <div className="space-y-3">
                <Card className="p-4 border-l-4 border-blue-500">
                    <p className="font-semibold text-blue-900 mb-2">What specific problem are we solving?</p>
                    <p className="text-sm text-slate-600">
                        Fast access to specific details from past customer conversations: questions asked, next steps
                        committed to, competitive mentions, buying signals.
                    </p>
                </Card>
                <Card className="p-4 border-l-4 border-purple-500">
                    <p className="font-semibold text-purple-900 mb-2">How will we measure success?</p>
                    <p className="text-sm text-slate-600">
                        Time-to-answer for meeting-specific queries; accuracy of extracted action items; reduction in
                        re-listening to recordings.
                    </p>
                </Card>
                <Card className="p-4 border-l-4 border-amber-500">
                    <p className="font-semibold text-amber-900 mb-2">What's the cost of being wrong?</p>
                    <p className="text-sm text-slate-600">
                        High. A fabricated customer commitment could damage a deal. This ruled out any approach that
                        tolerated hallucination on factual recall queries and drove the grounding-first architecture.
                    </p>
                </Card>
            </div>
        </div>

        {/* The Hallucination Problem */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">The Hallucination Problem</h2>
            <p className="text-slate-600 mb-4">
                The team audited their extraction pipeline ("Ketchup") across 120 transcripts and 999 product insights
                before building the conversational layer on top of it. The results were instructive:
            </p>
            <div className="space-y-3">
                <Card className="p-4 bg-rose-50 border-l-4 border-rose-500">
                    <p className="text-sm text-slate-700">
                        <strong>Only 6.9% of extracted quotes were verbatim</strong> — the LLM was paraphrasing 93% of
                        the time, silently losing customer tone and nuance.
                    </p>
                </Card>
                <Card className="p-4 bg-rose-50 border-l-4 border-rose-500">
                    <p className="text-sm text-slate-700">
                        <strong>Only 22% of Q&A answers were strongly grounded</strong> in the transcript. The rest
                        synthesized across multiple parts of the conversation.
                    </p>
                </Card>
                <Card className="p-4 bg-rose-50 border-l-4 border-rose-500">
                    <p className="text-sm text-slate-700">
                        <strong>Several high-value categories were systematically missed:</strong> competitive mentions,
                        buying signals, decision process signals.
                    </p>
                </Card>
            </div>
            <p className="text-slate-600 mt-4">
                The failure mode wasn't fabrication — it was distortion. "We need this fixed before renewal or we're
                walking" became "customer mentioned the renewal timeline." The fix was extractive prompting over raw
                transcripts, with explicit instructions to preserve original tone.
            </p>
            <Callout type="warning" title="The Most Valuable Thing They Did">
                Build your golden set and evaluate before you build the conversational layer on top.
            </Callout>
        </div>

        {/* How the System Works: The Full Pipeline */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">How the System Works: The Full Pipeline</h2>
            <p className="text-slate-600 mb-4">
                Every user message flows through four layers:
            </p>
            <Card className="p-6 bg-slate-50 font-mono text-sm">
                <pre className="whitespace-pre overflow-x-auto">
                    {`User question (Slack @mention or DM)
          |
          v
+---------------------+
|  Slack Integration  |
|  Validates, deduplicates, acknowledges, resolves thread context
+---------------------+
          |
          v
+---------------------+
|   Decision Layer    |
|  The single source of truth for all routing decisions
|                     |
|  1. Classify intent |  LLM-only, deterministic (temp=0)
|  2. Gate data access|  Boolean flags: which sources are allowed
|  3. Select contract |  LLM proposes execution strategy
+---------------------+
          |
          v
(only for SINGLE_MEETING or MULTI_MEETING -- skipped for ~60% of requests)
+---------------------+
| Meeting Resolution  |
|  Thread context -> temporal detection -> DB lookup -> clarify
+---------------------+
          |
          v
+---------------------+
|  Execution Layer    |
|  Runs the contract. Never re-classifies intent.
|                     |
|  SINGLE_MEETING  -> |  Structured artifacts -> semantic search -> full transcript
|  MULTI_MEETING   -> |  Q&A pairs fallback or full cross-transcript search + synthesis
|  PRODUCT_KNOWLEDGE->|  PostgreSQL product tables (synced daily from Airtable)
|  EXTERNAL_RESEARCH->|  Gemini web search with citations
|  SLACK_SEARCH    -> |  Slack search.messages API
|  GENERAL_HELP    -> |  Direct to gemini-2.5-flash (primary), no retrieval
|  CLARIFY         -> |  Returns clarification message, no execution
+---------------------+
          |
          v
+---------------------+
| Response Delivery   |
|  Streaming, document generation, source attribution, feedback
+---------------------+`}
                </pre>
            </Card>
            <div className="mt-4">
                <h3 className="font-semibold text-slate-900 mb-3">Typical Timing</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">Stage</th>
                                <th className="px-4 py-2 text-left font-semibold">Duration</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr><td className="px-4 py-2">Acknowledgment ("thinking...")</td><td className="px-4 py-2">{"< 1 second"}</td></tr>
                            <tr><td className="px-4 py-2">Decision Layer</td><td className="px-4 py-2">1–2 seconds</td></tr>
                            <tr><td className="px-4 py-2">Meeting Resolution (when needed)</td><td className="px-4 py-2">~1.5 seconds</td></tr>
                            <tr><td className="px-4 py-2">Q&A pairs fallback (when triggered)</td><td className="px-4 py-2">~0.5 seconds</td></tr>
                            <tr><td className="px-4 py-2">Response generation</td><td className="px-4 py-2">2–10 seconds</td></tr>
                            <tr className="bg-slate-50 font-semibold"><td className="px-4 py-2">Total</td><td className="px-4 py-2">4–15 seconds</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* Intent Classification */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Intent Classification</h2>
            <p className="text-slate-600 mb-4">
                PitCrew classifies every message into one of seven intents using an LLM call (gpt-4o, temperature=0).
                There are no keyword fast-paths — they were removed because they degraded accuracy on edge cases and
                created maintenance burden as user language varied.
            </p>
            <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold border-b border-slate-200">Intent</th>
                            <th className="px-4 py-3 text-left font-semibold border-b border-slate-200">What It Does</th>
                            <th className="px-4 py-3 text-left font-semibold border-b border-slate-200">Example</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        <tr>
                            <td className="px-4 py-3 font-medium">SINGLE_MEETING</td>
                            <td className="px-4 py-3">Answers questions about one specific meeting</td>
                            <td className="px-4 py-3 text-slate-600">"What action items came out of the Costco call?"</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">MULTI_MEETING</td>
                            <td className="px-4 py-3">Searches and synthesizes across multiple meetings</td>
                            <td className="px-4 py-3 text-slate-600">"What have customers said about competitors?"</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">PRODUCT_KNOWLEDGE</td>
                            <td className="px-4 py-3">Answers from the Airtable product database</td>
                            <td className="px-4 py-3 text-slate-600">"Does PitCrew integrate with Square?"</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">EXTERNAL_RESEARCH</td>
                            <td className="px-4 py-3">Searches the web via Gemini</td>
                            <td className="px-4 py-3 text-slate-600">"Research Costco's recent IT initiatives"</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">SLACK_SEARCH</td>
                            <td className="px-4 py-3">Searches internal Slack messages</td>
                            <td className="px-4 py-3 text-slate-600">"What did we discuss about the renewal internally?"</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">GENERAL_HELP</td>
                            <td className="px-4 py-3">gemini-2.5-flash (primary), no retrieval</td>
                            <td className="px-4 py-3 text-slate-600">"Help me draft a follow-up email"</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">CLARIFY</td>
                            <td className="px-4 py-3">Asks for clarification before doing anything</td>
                            <td className="px-4 py-3 text-slate-600">"Tell me about the meeting" (no company specified)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-6 space-y-3">
                <Card className="p-4 bg-blue-50 border-l-4 border-blue-500">
                    <p className="font-semibold text-blue-900 mb-2">No REFUSE intent</p>
                    <p className="text-sm text-slate-600">
                        Out-of-scope questions don't hit a dead end. They route to EXTERNAL_RESEARCH (Gemini web search
                        with citations) or GENERAL_HELP (gemini-2.5-flash directly). The user is always told which source
                        was used. The system stays useful at its boundaries.
                    </p>
                </Card>
                <Card className="p-4 bg-purple-50 border-l-4 border-purple-500">
                    <p className="font-semibold text-purple-900 mb-2">GENERAL_HELP bypasses retrieval</p>
                    <p className="text-sm text-slate-600">
                        For all other intents, the system retrieves data and constrains what the LLM can claim. GENERAL_HELP
                        sends the question directly to gemini-2.5-flash with no retrieval scaffolding — because drafting
                        emails, brainstorming, and creative tasks genuinely don't need it.
                    </p>
                </Card>
                <Card className="p-4 bg-green-50 border-l-4 border-green-500">
                    <p className="font-semibold text-green-900 mb-2">Intent is immutable</p>
                    <p className="text-sm text-slate-600">
                        Once the Decision Layer classifies a message, nothing downstream overrides it. This makes failures
                        traceable to a single decision and makes the system debuggable.
                    </p>
                </Card>
            </div>
        </div>

        {/* How Context Is Controlled */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">How Context Is Controlled</h2>
            <p className="text-slate-600 mb-4">
                The Decision Layer doesn't just decide what to do — it decides what data the execution layer is allowed
                to use. This is implemented as a set of boolean flags (context layers) computed from the classified intent.
            </p>
            <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold border-b">Intent</th>
                            <th className="px-4 py-3 text-center font-semibold border-b">product_identity</th>
                            <th className="px-4 py-3 text-center font-semibold border-b">product_ssot</th>
                            <th className="px-4 py-3 text-center font-semibold border-b">single_meeting</th>
                            <th className="px-4 py-3 text-center font-semibold border-b">multi_meeting</th>
                            <th className="px-4 py-3 text-center font-semibold border-b">slack_search</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        <tr>
                            <td className="px-4 py-3 font-medium">SINGLE_MEETING</td>
                            <td className="px-4 py-3 text-center">✅</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">✅</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">MULTI_MEETING</td>
                            <td className="px-4 py-3 text-center">✅</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">✅</td>
                            <td className="px-4 py-3 text-center">❌</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">PRODUCT_KNOWLEDGE</td>
                            <td className="px-4 py-3 text-center">✅</td>
                            <td className="px-4 py-3 text-center">✅</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">EXTERNAL_RESEARCH</td>
                            <td className="px-4 py-3 text-center">✅</td>
                            <td className="px-4 py-3 text-center">✅</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">SLACK_SEARCH</td>
                            <td className="px-4 py-3 text-center">✅</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">✅</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">GENERAL_HELP</td>
                            <td className="px-4 py-3 text-center">✅</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">CLARIFY</td>
                            <td className="px-4 py-3 text-center">✅</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                            <td className="px-4 py-3 text-center">❌</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="text-slate-600 mt-4">
                When coverage is limited, responses are explicitly qualified — "Based on 2 meetings..." — rather than
                presenting partial data as a general finding.
            </p>
        </div>

        {/* How Retrieval Works */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">How Retrieval Works</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-slate-900 mb-3">For Single-Meeting Queries</h3>
                    <p className="text-slate-600 mb-3">Data is accessed in strict priority order:</p>
                    <div className="space-y-2">
                        <Card className="p-4 border-l-4 border-blue-500">
                            <p className="font-semibold text-blue-900 mb-1">1. Structured artifacts (pre-extracted at ingestion)</p>
                            <p className="text-sm text-slate-600">
                                Q&A pairs, action items, attendees. Fast, high-confidence, no LLM extraction at query time.
                            </p>
                        </Card>
                        <Card className="p-4 border-l-4 border-purple-500">
                            <p className="font-semibold text-purple-900 mb-1">2. Semantic search over transcript chunks</p>
                            <p className="text-sm text-slate-600">
                                Vector embeddings. Used when artifacts are insufficient or the question requires it.
                            </p>
                        </Card>
                        <Card className="p-4 border-l-4 border-green-500">
                            <p className="font-semibold text-green-900 mb-1">3. Full transcript</p>
                            <p className="text-sm text-slate-600">
                                Fallback for broad questions like summaries.
                            </p>
                        </Card>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-slate-900 mb-3">For Multi-Meeting Queries</h3>
                    <p className="text-slate-600 mb-3">
                        Without a time range, the system first searches the pre-extracted Q&A pairs table by keyword (~0.5s),
                        re-ranks by relevance, and returns those results if good — only escalating to a full cross-transcript
                        search when the user provides a time range. This keeps broad queries fast and avoids expensive
                        open-ended scans.
                    </p>
                </div>
            </div>
        </div>

        {/* Key Design Decisions */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key Design Decisions</h2>
            <div className="space-y-3">
                <Card className="p-5 bg-blue-50 border-l-4 border-blue-500">
                    <h3 className="font-semibold text-blue-900 mb-2">Artifact-first retrieval</h3>
                    <p className="text-sm text-slate-600">
                        Pre-extracting Q&A pairs and action items at ingestion time and checking them before semantic
                        search was one of the highest-leverage decisions in the system. Structured artifacts are faster,
                        more reliable, and easier to attribute. Semantic search is the second choice, not the first.
                    </p>
                </Card>
                <Card className="p-5 bg-purple-50 border-l-4 border-purple-500">
                    <h3 className="font-semibold text-purple-900 mb-2">Retrieval quality was the ceiling</h3>
                    <p className="text-sm text-slate-600">
                        The team spent time on prompts before realizing the real problem was chunking strategy. Answers
                        existed in the transcripts — they just weren't being surfaced because chunks were split at wrong
                        boundaries. Getting chunking right mattered more than any prompt change.
                    </p>
                </Card>
                <Card className="p-5 bg-green-50 border-l-4 border-green-500">
                    <h3 className="font-semibold text-green-900 mb-2">CLARIFY is a feature, not a failure</h3>
                    <p className="text-sm text-slate-600">
                        Guessing intent and retrieving from the wrong scope produces confident wrong answers that are
                        harder to catch than an honest "which company did you mean?". Explicit ambiguity handling builds
                        trust over time.
                    </p>
                </Card>
                <Card className="p-5 bg-amber-50 border-l-4 border-amber-500">
                    <h3 className="font-semibold text-amber-900 mb-2">Gemini for graceful out-of-scope handling</h3>
                    <p className="text-sm text-slate-600">
                        Rather than refusing questions about competitors or market context, the system routes them to
                        Gemini web search. A sales team that gets a web-grounded answer with citations for an out-of-scope
                        question has a better experience than one that hits a dead end.
                    </p>
                </Card>
            </div>
        </div>

        {/* Architecture Decision Table */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Architecture Decisions</h2>
            <p className="text-slate-500 mb-6">
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
                                        <h3 className="font-semibold text-lg text-slate-900">{item.paradigm}</h3>
                                        <span className="text-sm font-medium text-slate-500">{item.decision}</span>
                                    </div>
                                    <p className="text-sm text-slate-500">{item.reasoning}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>

        {/* Design Principles That Held Up */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Design Principles That Held Up</h2>
            <p className="text-slate-500 mb-6">
                Five principles that guided every architectural decision in PitCrew.
            </p>

            <div className="space-y-4">
                <Card className="p-5 border-l-4 border-blue-500">
                    <h3 className="font-semibold text-blue-900 mb-2">1. Trust {"> "}Verbosity</h3>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Principle:</strong> Short and accurate beats long and uncertain.
                    </p>
                    <p className="text-sm text-slate-500 mb-2">
                        Every extractive query has an explicit fallback. If we can't find the answer with high confidence,
                        we say "I couldn't find that" instead of generating a plausible-sounding answer.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg text-sm">
                        <p className="text-blue-900"><strong>Implementation:</strong> REFUSE intent fires when confidence {"<"} threshold.
                            Better to admit uncertainty than hallucinate.</p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-purple-500">
                    <h3 className="font-semibold text-purple-900 mb-2">2. Extraction {"> "}Summarization</h3>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Principle:</strong> Pulling exact quotes is more reliable than generating summaries.
                    </p>
                    <p className="text-sm text-slate-500 mb-2">
                        When users ask "What did the customer say about X?", we return verbatim quotes with citations,
                        not LLM-generated summaries. Summaries invite hallucination.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg text-sm">
                        <p className="text-purple-900"><strong>Implementation:</strong> Retrieval returns raw chunks.
                            LLM formats them with citations but doesn't paraphrase.</p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-green-500">
                    <h3 className="font-semibold text-green-900 mb-2">3. Bounded Capabilities {"> "}Open-Ended Chat</h3>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Principle:</strong> Every response maps to a defined capability with known behavior.
                    </p>
                    <p className="text-sm text-slate-500 mb-2">
                        PitCrew isn't a chatbot. It's a Q&A system with 8 intent types and 30+ contracts.
                        Users know what it can do, and we can test every capability independently.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg text-sm">
                        <p className="text-green-900"><strong>Implementation:</strong> Router classifies to intent → contract → handler.
                            No "freestyle" generation.</p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-amber-500">
                    <h3 className="font-semibold text-amber-900 mb-2">4. Canonical Data is Authoritative</h3>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Principle:</strong> Product features come from SSOT. LLM never invents them.
                    </p>
                    <p className="text-sm text-slate-500 mb-2">
                        When users ask about product capabilities, we query the product database (SSOT).
                        The LLM formats the response but doesn't generate feature descriptions from memory.
                    </p>
                    <div className="bg-amber-50 p-3 rounded-lg text-sm">
                        <p className="text-amber-900"><strong>Implementation:</strong> PRODUCT_FEATURE intent → SQL query → format response.
                            Zero hallucination risk.</p>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-red-500">
                    <h3 className="font-semibold text-red-900 mb-2">5. Fewer, High-Quality Capabilities {"> "}Many Fuzzy Ones</h3>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Principle:</strong> Delayed cross-meeting analysis until single-meeting was solid.
                    </p>
                    <p className="text-sm text-slate-500 mb-2">
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

        {/* Key Takeaways */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key Takeaways</h2>

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
                                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    </div>
);


// Ops Reference Tab
const OpsReference = () => (
    <div className="space-y-10">
        <Callout type="warning" title="Ops Reference - Detailed Technical Guide">
            {"This section contains detailed implementation notes, common mistakes, and maintenance guidance. It's more technical and verbose than the overview — intended for the team maintaining PitCrew."}
        </Callout>

        {/* File Map */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">File Map</h2>
            <Card className="p-6 bg-slate-50 font-mono text-xs">
                <pre className="whitespace-pre overflow-x-auto">
                    {`server/
  slack/
    events.ts                    Entry point. Webhook handler, response delivery, streaming.
  decisionLayer/
    index.ts                     runDecisionLayer() -- orchestrates all three stages
    intent.ts                    Stage 1: LLM intent classification + semantic extraction
    contextLayers.ts             Stage 2: Context layer flag computation
    answerContracts.ts           Stage 3: Contract selection and constraint definition
  meetingResolver.ts             Meeting resolution (SINGLE_MEETING + MULTI_MEETING only)
  singleMeeting/
    index.ts                     executeSingleMeetingContract()
  openAssistant/
    openAssistantHandler.ts      handleOpenAssistant() -- MULTI_MEETING, GENERAL_HELP, SLACK_SEARCH
                                 handleProductKnowledgeIntent() -- PRODUCT_KNOWLEDGE
  externalResearch.ts            handleExternalResearch() -- Gemini web search
  slackSearchHandler.ts          handleSlackSearch() -- Slack search.messages API
  threadResolver.ts              Thread context resolution
  routes.ts                      processTranscriptInBackground() -- ingestion pipeline`}
                </pre>
            </Card>
        </div>

        {/* Layer 1: Slack Integration */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Layer 1: Slack Integration</h2>
            <p className="text-slate-600 mb-4">
                <strong>Entry point:</strong> <code className="bg-slate-100 px-2 py-1 rounded">slackEventsHandler()</code> in <code className="bg-slate-100 px-2 py-1 rounded">server/slack/events.ts</code>
            </p>
            <p className="text-slate-600 mb-4">Every event passes through this sequence in order:</p>
            <div className="space-y-3">
                <Card className="p-4 border-l-4 border-blue-500">
                    <p className="font-semibold text-blue-900 mb-1">1. Signature verification</p>
                    <p className="text-sm text-slate-600">
                        Validates the Slack signing secret on every request. Rejects anything that fails. This is SSRF protection.
                    </p>
                </Card>
                <Card className="p-4 border-l-4 border-purple-500">
                    <p className="font-semibold text-purple-900 mb-1">2. Deduplication</p>
                    <p className="text-sm text-slate-600">
                        Composite key: event_id + client_msg_id + message timestamp. If the key exists, the event is dropped
                        silently and 200 is returned. Do not remove this.
                    </p>
                </Card>
                <Card className="p-4 border-l-4 border-green-500">
                    <p className="font-semibold text-green-900 mb-1">3. Bot/edit filtering</p>
                    <p className="text-sm text-slate-600">
                        Drops messages from bot users and message edit events. Prevents the bot from responding to itself.
                    </p>
                </Card>
                <Card className="p-4 border-l-4 border-amber-500">
                    <p className="font-semibold text-amber-900 mb-1">4. Immediate 200 ACK</p>
                    <p className="text-sm text-slate-600">
                        Returns 200 before any processing starts. All downstream work is async. If your handler fails to
                        return 200 within 3 seconds, Slack marks delivery failed and retries.
                    </p>
                </Card>
                <Card className="p-4 border-l-4 border-red-500">
                    <p className="font-semibold text-red-900 mb-1">5. "Thinking..." acknowledgment</p>
                    <p className="text-sm text-slate-600">
                        Posts a placeholder to the thread within ~1 second. A progress timer updates it every 2–3 seconds
                        if generation is slow.
                    </p>
                </Card>
                <Card className="p-4 border-l-4 border-indigo-500">
                    <p className="font-semibold text-indigo-900 mb-1">6. Thread context resolution</p>
                    <p className="text-sm text-slate-600">
                        Fetches full thread history for replies, enabling follow-up questions to inherit context from
                        earlier in the conversation.
                    </p>
                </Card>
            </div>

            <div className="mt-6">
                <h3 className="font-semibold text-slate-900 mb-3">Ops Failure Modes</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-slate-200">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold border-b">Symptom</th>
                                <th className="px-4 py-3 text-left font-semibold border-b">Cause</th>
                                <th className="px-4 py-3 text-left font-semibold border-b">Fix</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr>
                                <td className="px-4 py-3">Bot responds twice</td>
                                <td className="px-4 py-3">Deduplication key mismatch or store reset</td>
                                <td className="px-4 py-3">Check key construction in events.ts</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">Bot doesn't respond at all</td>
                                <td className="px-4 py-3">Handler not returning 200 within 3s, or event lost</td>
                                <td className="px-4 py-3">Check webhook logs; verify async processing is firing</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">"Thinking..." never updates</td>
                                <td className="px-4 py-3">Placeholder message_ts not passed through to delivery</td>
                                <td className="px-4 py-3">Trace message_ts from acknowledgment to delivery step</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* Layer 2: Decision Layer */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Layer 2: Decision Layer</h2>
            <p className="text-slate-600 mb-4">
                <strong>Entry point:</strong> <code className="bg-slate-100 px-2 py-1 rounded">runDecisionLayer(question, threadContext)</code> in <code className="bg-slate-100 px-2 py-1 rounded">server/decisionLayer/index.ts</code>
            </p>
            <p className="text-slate-600 mb-4">
                <strong>Returns:</strong> DecisionLayerResult — immutable for all downstream execution
            </p>

            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Stage 1: Intent Classification</h3>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Model:</strong> gpt-4o | <strong>Temperature:</strong> 0 | <strong>Method:</strong> LLM-only
                    </p>
                    <p className="text-sm text-slate-600 mb-3">
                        The classifier returns an intent enum plus semantic metadata in a single call. Crucially, it also
                        proposes the execution contract in this same call — so intent and strategy are always coherent.
                    </p>
                    <Card className="p-4 bg-slate-50">
                        <p className="text-xs font-mono mb-2">Semantic metadata extracted alongside intent:</p>
                        <pre className="text-xs overflow-x-auto">
                            {`{
  extractedCompany: string
  extractedCompanies: string[]
  keyTopics: string[]
  searchKeywords: string[]
  isAmbiguous: boolean
  requiresSemantic: boolean
  requiresProductKnowledge: boolean
  aggregateFallback?: "qa_pairs_first"
  userExplicitlyRequestedMeetings?: boolean
  proposedInterpretation?: {
    intent: string
    contracts: string[]
    summary: string
  }
}`}
                        </pre>
                    </Card>
                </div>

                <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Stage 2: Context Layers</h3>
                    <p className="text-sm text-slate-600 mb-3">
                        Boolean flags controlling which data sources the execution layer may access. Deterministic — same
                        intent always produces the same flags.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Stage 3: Contract Selection</h3>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Primary method:</strong> LLM-proposed (from Stage 1 — same call)<br />
                        <strong>Fallback:</strong> Keyword patterns → separate LLM call
                    </p>
                    <Callout type="warning" title="Debugging Tip">
                        When contractSelectionMethod === "keyword" or "llm_fallback" in logs, the system fell through from
                        the primary path. These fallback contracts are more likely to be wrong — this field is your first
                        signal for misrouted executions.
                    </Callout>
                </div>
            </div>
        </div>

        {/* Mistakes We Made And Fixed */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Mistakes We Made (And Fixed)</h2>
            <p className="text-slate-500 mb-6">
                Four real mistakes from PitCrew development, with before/after fixes.
            </p>

            <div className="space-y-4">
                <Card className="p-5 bg-rose-50 border-l-4 border-rose-500">
                    <h3 className="font-semibold text-rose-900 mb-3">❌ Mistake 1: LLM in the Retrieval Path</h3>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-slate-600 mb-1">What we did wrong:</p>
                        <p className="text-sm text-slate-500">
                            Early version asked the LLM to "find the relevant meeting" based on the user's question.
                            The LLM hallucinated meeting dates that didn't exist.
                        </p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-slate-600 mb-1">The fix:</p>
                        <p className="text-sm text-slate-500">
                            Company resolution and transcript selection are now pure SQL.
                            LLM only sees data that actually exists in the database.
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-green-700"><strong>Lesson:</strong> Never let the LLM choose what data to retrieve.
                            Use deterministic code for retrieval, LLM for generation.</p>
                    </div>
                </Card>

                <Card className="p-5 bg-rose-50 border-l-4 border-rose-500">
                    <h3 className="font-semibold text-rose-900 mb-3">❌ Mistake 2: Aggressive Speaker Role Inference</h3>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-slate-600 mb-1">What we did wrong:</p>
                        <p className="text-sm text-slate-500">
                            LLM guessed speaker roles when names didn't match exactly. 20% of guesses were wrong,
                            leading to misattributed quotes.
                        </p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-slate-600 mb-1">The fix:</p>
                        <p className="text-sm text-slate-500">
                            Conservative role assignment with fuzzy matching. If we can't match with high confidence,
                            role = 'unknown'. Users can filter by 'unknown' and improve matching logic.
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-green-700"><strong>Lesson:</strong> Explicit 'unknown' state {"> "}wrong guess.
                            Users trust "I don't know" more than wrong attribution.</p>
                    </div>
                </Card>

                <Card className="p-5 bg-rose-50 border-l-4 border-rose-500">
                    <h3 className="font-semibold text-rose-900 mb-3">❌ Mistake 3: Token-Based Chunking</h3>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-slate-600 mb-1">What we did wrong:</p>
                        <p className="text-sm text-slate-500">
                            500-token chunks broke speaker turns mid-sentence. Context was lost, citations were confusing.
                        </p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-slate-600 mb-1">The fix:</p>
                        <p className="text-sm text-slate-500">
                            Speaker-turn chunking preserving context. Each chunk = one speaker's complete turn.
                            Metadata includes previous/next speaker for context.
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-green-700"><strong>Lesson:</strong> Chunk boundaries matter.
                            Respect natural document structure (speaker turns, paragraphs, sections).</p>
                    </div>
                </Card>

                <Card className="p-5 bg-rose-50 border-l-4 border-rose-500">
                    <h3 className="font-semibold text-rose-900 mb-3">❌ Mistake 4: Returning [object Object] to Slack</h3>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-slate-600 mb-1">What we did wrong:</p>
                        <p className="text-sm text-slate-500">
                            Handler stringified the entire response object instead of extracting result.answer.
                            Users saw "[object Object]" in Slack.
                        </p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-slate-600 mb-1">The fix:</p>
                        <p className="text-sm text-slate-500">
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
