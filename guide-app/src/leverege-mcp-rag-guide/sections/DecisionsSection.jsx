import React from 'react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox } from '../components/ui';
import { NextSectionNav } from '../index';

// Inline diagram components
const ComplexitySpectrum = () => (
    <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-x-auto">
        <div className="flex items-end justify-between gap-2 min-w-max md:min-w-0">
            {[
                { label: "SQL Only", examples: "Lookups, Counts, Lists", speed: "Fastest", cost: "Cheapest", color: "green", height: "h-20" },
                { label: "SQL + RAG", examples: "Search + Filter", speed: "Fast", cost: "Cheap", color: "blue", height: "h-28" },
                { label: "RAG + LLM", examples: "Analysis, Synthesis", speed: "Medium", cost: "Medium", color: "purple", height: "h-36" },
                { label: "Agentic AI", examples: "Multi-step, Tools", speed: "Slowest", cost: "Most $$", color: "amber", height: "h-44" },
            ].map((item, i) => {
                const colors = {
                    green: "bg-green-500",
                    blue: "bg-blue-500",
                    purple: "bg-purple-500",
                    amber: "bg-amber-500",
                };
                return (
                    <div key={i} className="flex flex-col items-center flex-1 min-w-24">
                        <div className={`w-full ${item.height} ${colors[item.color]} rounded-t-lg flex items-end justify-center pb-2`}>
                            <span className="text-white font-semibold text-xs text-center px-1">{item.label}</span>
                        </div>
                        <div className="w-full bg-white border border-slate-200 rounded-b-lg p-2 text-center">
                            <div className="text-xs text-slate-500">{item.examples}</div>
                            <div className="text-xs text-slate-400 mt-1">{item.speed} • {item.cost}</div>
                        </div>
                    </div>
                );
            })}
        </div>
        <div className="flex justify-between mt-3 text-xs text-slate-400">
            <span>← Simpler</span>
            <span>More Complex →</span>
        </div>
    </div>
);

const SQLRagFlowDiagram = () => (
    <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
        <p className="text-sm text-slate-500 mb-4 text-center font-medium">
            "What did TPI's customer say about cameras?"
        </p>
        <div className="flex flex-col items-center gap-1">
            <div className="w-full max-w-sm bg-blue-100 border border-blue-300 rounded-lg p-3">
                <div className="font-semibold text-blue-800 text-sm">1. SQL Filter (fast, precise)</div>
                <div className="text-xs text-blue-700 mt-1 font-mono">WHERE company='TPI' AND role='customer'</div>
                <div className="text-xs text-blue-600 mt-1">→ Narrows 13k chunks to ~200</div>
            </div>
            <div className="w-0.5 h-3 bg-slate-300" />
            <div className="w-full max-w-sm bg-purple-100 border border-purple-300 rounded-lg p-3">
                <div className="font-semibold text-purple-800 text-sm">2. Vector Search (semantic)</div>
                <div className="text-xs text-purple-700 mt-1 font-mono">ORDER BY embedding similarity</div>
                <div className="text-xs text-purple-600 mt-1">→ Finds 10 most relevant about "cameras"</div>
            </div>

            <div className="w-0.5 h-3 bg-slate-300" />
            <div className="w-full max-w-sm bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                <div className="font-semibold text-green-800 text-sm">Return chunks with citations</div>
            </div>
        </div>
    </div>
);

const AgenticFlowDiagram = () => (
    <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
        <p className="text-sm text-slate-500 mb-4 text-center font-medium">
            "Compare TPI and Les Schwab on cameras, then draft follow-up"
        </p>
        <div className="flex flex-col items-center gap-1">
            <div className="w-full max-w-md bg-amber-100 border border-amber-300 rounded-lg p-3 text-center">
                <div className="font-semibold text-amber-800 text-sm flex items-center justify-center gap-2">
                    Router (LLM decides plan)
                </div>
            </div>
            <div className="w-0.5 h-3 bg-slate-300" />
            <div className="flex gap-3 flex-wrap justify-center">
                <div className="bg-blue-100 border border-blue-300 rounded-lg px-4 py-2">
                    <div className="font-semibold text-blue-800 text-xs">Search TPI</div>
                </div>
                <div className="bg-blue-100 border border-blue-300 rounded-lg px-4 py-2">
                    <div className="font-semibold text-blue-800 text-xs">Search LS</div>
                </div>
                <div className="bg-purple-100 border border-purple-300 rounded-lg px-4 py-2">
                    <div className="font-semibold text-purple-800 text-xs">Draft Email</div>
                </div>
            </div>
            <div className="w-0.5 h-3 bg-slate-300" />
            <div className="w-full max-w-md bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                <div className="font-semibold text-green-800 text-sm">Synthesizer (combines results)</div>
            </div>
        </div>
    </div>
);

export const DecisionsSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-semibold text-slate-900">{"When to Use What: Choosing Your Architecture"}</h2>

        <Callout type="insight" title="The Key Question">
            Not every question needs AI. The right approach depends on <strong>what you're asking</strong>
            and <strong>what kind of answer you need</strong>. Over-engineering is as bad as under-engineering.
        </Callout>

        <ProgressiveSection number="1" title="The Complexity Spectrum" subtitle="From simple to sophisticated" defaultOpen={true}>
            <p className="text-sm text-slate-500 mb-2">Choose the Simplest Approach That Works</p>
            <ComplexitySpectrum />

            <Callout type="warning" title="Golden Rule">
                <strong>Start with the simplest approach that answers the question.</strong>
                Only add complexity when simpler approaches fail.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="SQL Only" subtitle="When you need facts, not interpretation">
            <Card className="p-4 bg-blue-50 border-blue-200 mb-4">
                <h4 className="font-semibold text-blue-800">Use SQL When:</h4>
                <ul className="mt-2 space-y-1 text-sm">
                    <li>• The answer is a <strong>fact</strong> that exists in a column</li>
                    <li>• You need <strong>counts, lists, or aggregations</strong></li>
                    <li>• The question maps directly to a <strong>database query</strong></li>
                    <li>• <strong>No interpretation</strong> is needed</li>
                </ul>
            </Card>

            <ComparisonTable
                headers={["Question", "Why SQL", "Query Pattern"]}
                rows={[
                    ['"When was our last meeting with TPI?"', "Date lookup", "ORDER BY date DESC LIMIT 1"],
                    ['"How many meetings with Les Schwab?"', "Count", "COUNT(*) WHERE company = 'Les Schwab'"],
                    ['"List all companies we met in Q4"', "Filtered list", "WHERE date BETWEEN ... GROUP BY company"],
                    ['"Who attended the March 15 call?"', "Fact lookup", "SELECT participants WHERE date = ..."],
                    ['"What products does Canadian Tire use?"', "Relationship lookup", "JOIN products ON ..."],
                ]}
            />

            <Callout type="success" title="SQL Advantages">
                <strong>Fast</strong> (milliseconds), <strong>deterministic</strong> (same query = same answer),
                <strong>no hallucination risk</strong>, <strong>cheapest</strong> (no LLM calls).
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="SQL + RAG (Hybrid)" subtitle="When you need to find AND filter">
            <Card className="p-4 bg-green-50 border-green-200 mb-4">
                <h4 className="font-semibold text-green-800">Use SQL + RAG When:</h4>
                <ul className="mt-2 space-y-1 text-sm">
                    <li>• You need to <strong>search by meaning</strong> (semantic search)</li>
                    <li>• AND <strong>filter by metadata</strong> (company, date, speaker role)</li>
                    <li>• The answer is in the text but needs to be <strong>found first</strong></li>
                </ul>
            </Card>

            <ComparisonTable
                headers={["Question", "SQL Part", "RAG Part"]}
                rows={[
                    ['"What did TPI\'s customer say about cameras?"', "WHERE company='TPI' AND role='customer'", "Vector search for 'cameras'"],
                    ['"Find pricing discussions from last month"', "WHERE date > '2024-12-01'", "Vector search for 'pricing'"],
                    ['"What concerns did customers raise in Q4?"', "WHERE role='customer' AND date IN Q4", "Vector search for 'concerns'"],
                    ['"Show me what Les Schwab said about integration"', "WHERE company='Les Schwab'", "Vector search for 'integration'"],
                ]}
            />

            <SQLRagFlowDiagram />
        </ProgressiveSection>

        <ProgressiveSection number="4" title="RAG + LLM" subtitle="When you need interpretation or synthesis">
            <Card className="p-4 bg-purple-50 border-purple-200 mb-4">
                <h4 className="font-semibold text-purple-800">Use RAG + LLM When:</h4>
                <ul className="mt-2 space-y-1 text-sm">
                    <li>• You need to <strong>summarize</strong> multiple chunks</li>
                    <li>• You need to <strong>interpret</strong> or <strong>analyze</strong> content</li>
                    <li>• The answer requires <strong>synthesis</strong> across sources</li>
                    <li>• You need <strong>natural language output</strong></li>
                </ul>
            </Card>

            <ComparisonTable
                headers={["Question", "Why LLM Needed", "What LLM Does"]}
                rows={[
                    ['"What is TPI\'s main concern?"', "Requires interpretation", "Analyzes chunks, identifies themes"],
                    ['"Summarize our last meeting with Les Schwab"', "Requires summarization", "Condenses 50 chunks into summary"],
                    ['"What\'s the sentiment around our pricing?"', "Requires judgment", "Assesses tone across mentions"],
                    ['"Compare concerns across tire companies"', "Requires synthesis", "Finds patterns across multiple sources"],
                ]}
            />

            <Callout type="warning" title="LLM Adds Risk">
                Every LLM call adds: <strong>latency</strong> (1-5 seconds), <strong>cost</strong> ($0.01-0.10),
                and <strong>hallucination risk</strong>. Use grounding (cite or abstain) to mitigate.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="Agentic AI with Router" subtitle="When you need multi-step reasoning">
            <Card className="p-4 bg-amber-50 border-amber-200 mb-4">
                <h4 className="font-semibold text-amber-800">Use Agentic AI When:</h4>
                <ul className="mt-2 space-y-1 text-sm">
                    <li>• The question requires <strong>multiple steps</strong> to answer</li>
                    <li>• You need to <strong>chain tools together</strong></li>
                    <li>• The AI needs to <strong>decide which tool to use</strong></li>
                    <li>• You need <strong>autonomous decision-making</strong></li>
                </ul>
            </Card>

            <AgenticFlowDiagram />

            <h4 className="font-semibold mt-4 mb-2">When You Need a Router</h4>
            <ComparisonTable
                headers={["Scenario", "Why Router", "Tools Chained"]}
                rows={[
                    ["Complex research questions", "Multiple searches needed", "Search → Search → Compare"],
                    ["Questions that span data sources", "Need to query multiple systems", "CRM → Transcripts → Combine"],
                    ["Action + Information", "Need to do something with findings", "Search → Analyze → Send Email"],
                    ["Ambiguous questions", "AI must interpret intent", "Classify → Route → Execute"],
                ]}
            />

            <Callout type="danger" title="Agentic AI is Complex">
                Agentic systems are <strong>harder to debug</strong>, <strong>more expensive</strong>,
                and <strong>less predictable</strong>. Only use when simpler approaches genuinely can't work.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="Real Examples from Leverege" subtitle="Mapping questions to approaches">
            <ComparisonTable
                headers={["Question", "Approach", "Why"]}
                rows={[
                    ['"When was our last meeting with TPI?"', "SQL Only", "Date lookup, no interpretation"],
                    ['"What did TPI say about cameras?"', "SQL + RAG", "Filter (TPI) + Search (cameras)"],
                    ['"What\'s TPI\'s biggest concern?"', "RAG + LLM", "Needs interpretation of concerns"],
                    ['"Summarize last meeting with TPI"', "RAG + LLM", "Needs summarization"],
                    ['"How many companies mentioned pricing?"', "SQL + RAG", "Count + semantic filter"],
                    ['"Compare tire companies\' feedback"', "RAG + LLM", "Multi-source synthesis"],
                    ['"Find concerns and draft follow-up"', "Agentic", "Search + compose action chain"],
                ]}
            />
        </ProgressiveSection>

        <ProgressiveSection number="7" title="The Control Decision" subtitle="Code-driven vs LLM-driven routing">
            <p className="text-slate-500 mb-4">
                Beyond choosing SQL vs RAG vs Agentic, you need to decide <strong>who controls the routing</strong>.
                This is the most consequential architectural decision you'll make.
            </p>

            <ComparisonTable
                headers={["", "Code-Driven (Router Pattern)", "LLM-Driven (MCP / Agentic)"]}
                rows={[
                    ["Who decides?", "LLM classifies intent → code routes deterministically", "LLM picks tools and decides flow autonomously"],
                    ["Predictability", "✅ Same input → same route every time", "⚠️ LLM may choose differently each time"],
                    ["Audit trail", "✅ Every decision logged with contract ID", "⚠️ Harder to trace why a tool was chosen"],
                    ["Debugging", "✅ Check intent classification → check handler", "⚠️ Multi-step reasoning harder to debug"],
                    ["Team access", "✅ Safe for non-technical users (Slack, etc.)", "⚠️ Better for developer tools (Cursor, Claude)"],
                    ["Flexibility", "⚠️ New intents require code changes", "✅ LLM adapts to novel questions"],
                    ["Cost", "$$ (one LLM call for classification)", "$$$ (multiple LLM calls for reasoning)"],
                    ["Best for", "Production systems, team-wide access, high-stakes", "Developer tools, exploration, prototyping"],
                ]}
            />

            <Callout type="insight" title="PitCrew's Choice">
                PitCrew uses the <strong>Router Pattern</strong> for Slack (team-wide, high-stakes) and exposes
                <strong> MCP</strong> for Claude Desktop / Cursor (developer exploration). Same capabilities,
                different control models. You don't have to choose one — you can offer both.
            </Callout>
        </ProgressiveSection>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 mt-6">
            <h3 className="font-semibold text-lg mb-4">📋 Quick Reference</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                    <h4 className="font-semibold text-blue-600 mb-2">Use SQL When:</h4>
                    <ul className="space-y-1">
                        <li>• Facts, dates, counts, lists</li>
                        <li>• No interpretation needed</li>
                        <li>• Speed and reliability critical</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-green-600 mb-2">Use SQL + RAG When:</h4>
                    <ul className="space-y-1">
                        <li>• Search by meaning + filter by metadata</li>
                        <li>• "What did X say about Y?"</li>
                        <li>• Need both precision and recall</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-purple-600 mb-2">Use RAG + LLM When:</h4>
                    <ul className="space-y-1">
                        <li>• Summarization or synthesis</li>
                        <li>• Interpretation or analysis</li>
                        <li>• Natural language output</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-amber-600 mb-2">Use Agentic + Router When:</h4>
                    <ul className="space-y-1">
                        <li>• Multi-step reasoning</li>
                        <li>• Tool chaining required</li>
                        <li>• Actions beyond just answering</li>
                    </ul>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
                <h4 className="font-semibold text-indigo-600 mb-2">The Control Decision:</h4>
                <p className="text-sm text-slate-500">
                    <strong>Router Pattern</strong> (code routes) for production, team-wide, high-stakes.
                    <strong> MCP/Agentic</strong> (LLM routes) for developer tools, exploration, prototyping.
                    Many systems offer both.
                </p>
            </div>
        </Card>

        <NextSectionNav currentId="decisions" />
    </div>
);
