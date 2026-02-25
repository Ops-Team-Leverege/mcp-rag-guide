import React from 'react';
import { Box, CheckCircle, AlertTriangle, XCircle, Database, Zap, Code, Search } from 'lucide-react';
import { Card, Callout } from '../components/ui';
import { NextSectionNav } from '../index';

export const PitCrewCaseStudy = () => {
    return (
        <div className="space-y-10">{/* PitCrew Case Study */}
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Box className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-semibold">PitCrew Sauce</h1>
                        <p className="text-blue-200 mt-2">Meeting intelligence bot for Leverege · Production since Feb 2026 · Slack-native</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="text-2xl font-semibold">7</div>
                        <div className="text-sm text-blue-200">Intent Types</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="text-2xl font-semibold">22</div>
                        <div className="text-sm text-blue-200">Contracts</div>
                    </div>
                </div>
            </div>

            <HighLevelOverview />

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
            <Callout type="info" title="Note: This case study covers the Slack bot only">
                PitCrew Sauce is the Slack bot interface for meeting intelligence. Sales teams interact with it through
                @mentions in channels or direct messages to get instant answers from their meeting transcripts.
            </Callout>
            <p className="text-slate-600 mb-4 mt-4">
                PitCrew helps sales teams get answers from their meeting transcripts without digging through recordings.
                A rep can ask "What did the Costco team say about their IT infrastructure timeline?" or "Draft a follow-up
                email for the MegaCorp call" and get a grounded, cited answer in seconds — without leaving the Slack channel
                where their work already happens.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-sm font-semibold text-slate-900 mb-2">How it works:</p>
                <ul className="text-sm text-slate-600 space-y-1">
                    <li>• @mention the bot in any Slack channel or send a DM</li>
                    <li>• Ask questions about specific meetings or across multiple conversations</li>
                    <li>• Get streaming responses with citations and source attribution</li>
                    <li>• Receive generated Word documents for longer summaries</li>
                    <li>• Thread conversations maintain context for follow-up questions</li>
                </ul>
            </div>
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

        {/* How the System Works */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">PitCrew Sauce: High-Level Overview</h2>
            <Callout type="info" title="What this case study covers">
                This section shows how every concept in this guide appears in a real production system. Use it as a
                reference template for your own architecture decisions.
            </Callout>

            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Full Pipeline</h3>
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
|  /api/slack/events webhook
|  - Signature verification & deduplication
|  - Immediate 200 ACK (< 1s)
|  - "Thinking..." acknowledgment with progress updates
|  - Thread context resolution
+---------------------+
          |
          v
+---------------------+
|   Decision Layer    |
|  Single source of truth for routing (immutable once set)
|                     |
|  1. Classify intent |  gpt-4o at temp=0 (deterministic)
|  2. Gate data access|  Boolean context layer flags
|  3. Select contract |  LLM proposes execution strategy (22 contracts)
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
|  SINGLE_MEETING  -> |  Single Meeting Orchestrator (helpers/handlers/index)
|                     |  Structured artifacts -> semantic search -> full transcript
|  MULTI_MEETING   -> |  Open Assistant Handler
|                     |  Q&A pairs fallback or full cross-transcript search + synthesis
|  PRODUCT_KNOWLEDGE->|  PostgreSQL product tables (synced from Airtable)
|  EXTERNAL_RESEARCH->|  Gemini web search -> chains to SALES_DOCS_PREP
|  SLACK_SEARCH    -> |  Slack search.messages API
|  GENERAL_HELP    -> |  Direct to gemini-2.5-flash, no retrieval
|  CLARIFY         -> |  Returns clarification message, no execution
+---------------------+
          |
          v
+---------------------+
| Response Delivery   |
|  - Streaming responses with citations
|  - Markdown formatter (Slack/Word compatible)
|  - Document generation (Word files)
|  - Source attribution & feedback
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
                            <tr><td className="px-4 py-2">Decision Layer (intent + contract)</td><td className="px-4 py-2">1–2 seconds</td></tr>
                            <tr><td className="px-4 py-2">Meeting Resolution (when needed)</td><td className="px-4 py-2">~1.5 seconds</td></tr>
                            <tr><td className="px-4 py-2">Q&A pairs fallback (when triggered)</td><td className="px-4 py-2">~0.5 seconds</td></tr>
                            <tr><td className="px-4 py-2">Response generation + streaming</td><td className="px-4 py-2">4–8 seconds</td></tr>
                            <tr className="bg-slate-50 font-semibold"><td className="px-4 py-2">Total (Average)</td><td className="px-4 py-2">8–10 seconds</td></tr>
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
                created maintenance burden as user language varied. The classifier also extracts semantic metadata
                and proposes the execution contract in the same call for coherence.
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
                <Card className="p-5 bg-indigo-50 border-l-4 border-indigo-500">
                    <h3 className="font-semibold text-indigo-900 mb-2">Contract chaining for complex workflows</h3>
                    <p className="text-sm text-slate-600">
                        Some intents chain contracts together. EXTERNAL_RESEARCH must chain to SALES_DOCS_PREP to format
                        findings for sales use. MEETING_SUMMARY can chain to GENERAL_RESPONSE for follow-up synthesis.
                        This keeps individual contracts focused while enabling complex workflows.
                    </p>
                </Card>
            </div>
        </div>

        {/* Contract Breakdown */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Contract Breakdown (22 Total)</h2>
            <p className="text-slate-600 mb-4">
                Each contract defines a specific execution strategy with clear constraints and expected outputs.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="p-4 bg-blue-50 border-l-4 border-blue-500">
                    <p className="font-semibold text-blue-900 mb-2">Single Meeting (6)</p>
                    <p className="text-sm text-slate-600">MEETING_SUMMARY, NEXT_STEPS, ATTENDEES, CUSTOMER_QUESTIONS, EXTRACTIVE_FACT, MEETING_HELP</p>
                </Card>
                <Card className="p-4 bg-purple-50 border-l-4 border-purple-500">
                    <p className="font-semibold text-purple-900 mb-2">Multi-Meeting (5)</p>
                    <p className="text-sm text-slate-600">PATTERN_ANALYSIS, COMPARISON, TREND_SUMMARY, CROSS_MEETING_QUESTIONS, MULTI_MEETING_HELP</p>
                </Card>
                <Card className="p-4 bg-green-50 border-l-4 border-green-500">
                    <p className="font-semibold text-green-900 mb-2">Product Knowledge (4)</p>
                    <p className="text-sm text-slate-600">PRODUCT_EXPLANATION, PRODUCT_HELP, FEATURE_VERIFICATION, FAQ_ANSWER</p>
                </Card>
                <Card className="p-4 bg-amber-50 border-l-4 border-amber-500">
                    <p className="font-semibold text-amber-900 mb-2">External & Slack (3)</p>
                    <p className="text-sm text-slate-600">EXTERNAL_RESEARCH, SALES_DOCS_PREP, SLACK_MESSAGE_SEARCH</p>
                </Card>
                <Card className="p-4 bg-red-50 border-l-4 border-red-500">
                    <p className="font-semibold text-red-900 mb-2">General & Terminal (4)</p>
                    <p className="text-sm text-slate-600">GENERAL_RESPONSE, NOT_FOUND, REFUSE, CLARIFY</p>
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

                <Card className="p-5 border-l-4 border-indigo-500">
                    <h3 className="font-semibold text-indigo-900 mb-2">6. Per-Contract Model Selection</h3>
                    <p className="text-sm text-slate-600 mb-3">
                        <strong>Principle:</strong> Different contracts need different models for optimal cost/quality.
                    </p>
                    <p className="text-sm text-slate-500 mb-2">
                        Single-meeting extractive contracts use gemini-2.5-flash (fast, cheap). External research uses
                        gemini-3-pro-preview (better web reasoning). Each contract specifies its optimal model via
                        CONTRACT_MODELS registry.
                    </p>
                    <div className="bg-indigo-50 p-3 rounded-lg text-sm">
                        <p className="text-indigo-900"><strong>Implementation:</strong> Unified LLM client routes to OpenAI,
                            Google, or Anthropic based on model name. No vendor lock-in.</p>
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

        {/* Implementation Details & Ops Reference */}
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Implementation Details</h2>
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex items-start gap-4">
                    <Code className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold text-blue-900 mb-3">Full Technical Documentation</h3>
                        <p className="text-slate-700 mb-4">
                            For detailed implementation notes, architecture decisions, debugging guides, and operational
                            reference, see the Mustard GitHub repository. The README and documentation provide comprehensive
                            coverage of:
                        </p>
                        <ul className="text-sm text-slate-600 space-y-2 mb-4">
                            <li>• Complete file structure and module organization</li>
                            <li>• Layer-by-layer implementation details (Slack, Decision, Execution, Delivery)</li>
                            <li>• Debugging workflows and troubleshooting guides</li>
                            <li>• Model selection rationale and per-contract configuration</li>
                            <li>• Data ingestion pipeline and background processing</li>
                            <li>• Production deployment and monitoring setup</li>
                        </ul>
                        <a
                            href="https://github.com/Ops-Team-Leverege/Mustard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            View on GitHub
                        </a>
                    </div>
                </div>
            </Card>
        </div>
    </div>
);
