import React from 'react';
import { DollarSign, Zap, Brain, TrendingUp, AlertTriangle } from 'lucide-react';

const ModelSelectionSection = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Model Selection & Cost</h2>

            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-bold text-green-900">THE RULE: Route cheap, generate smart</h3>
                </div>
                <p className="text-green-800">
                    Use fast/cheap models for decisions and expensive/smart models only for the final response.
                </p>
            </div>

            {/* Choosing a Model Provider */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Choosing a Model Provider</h3>
                <p className="text-gray-700 mb-4">
                    Your first decision is which LLM provider(s) to use. This isn't a permanent choice —
                    most systems can swap providers by changing an API call.
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Provider</th>
                                <th className="px-4 py-2 text-left">Models</th>
                                <th className="px-4 py-2 text-left">Strengths</th>
                                <th className="px-4 py-2 text-left">Considerations</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2 font-semibold">OpenAI</td>
                                <td className="px-4 py-2 font-mono text-xs">GPT-4o, GPT-4o-mini, GPT-5</td>
                                <td className="px-4 py-2">Broadest ecosystem, fast iteration, strong function calling</td>
                                <td className="px-4 py-2 text-gray-600">Closed-source, usage-based pricing</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2 font-semibold">Anthropic</td>
                                <td className="px-4 py-2 font-mono text-xs">Claude Opus, Sonnet, Haiku</td>
                                <td className="px-4 py-2">Strong reasoning, long context (200K tokens), safety-focused</td>
                                <td className="px-4 py-2 text-gray-600">Smaller ecosystem</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2 font-semibold">Google</td>
                                <td className="px-4 py-2 font-mono text-xs">Gemini Pro, Flash</td>
                                <td className="px-4 py-2">Long context (1M+ tokens), multimodal, competitive pricing</td>
                                <td className="px-4 py-2 text-gray-600">Newer in the space</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold">Open Source</td>
                                <td className="px-4 py-2 font-mono text-xs">Llama, Mistral, Qwen</td>
                                <td className="px-4 py-2">Self-hosted, no per-token cost, full control</td>
                                <td className="px-4 py-2 text-gray-600">Requires infrastructure, lower capability ceiling</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                    <p className="text-sm text-blue-900">
                        <strong>How to decide:</strong> Start with a hosted provider (OpenAI or Anthropic) for speed of development.
                        Consider open-source only if you have specific data privacy requirements or very high volume that makes
                        per-token pricing prohibitive.
                    </p>
                </div>
            </div>

            {/* The Multi-Model Pattern */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">The Multi-Model Pattern</h3>
                <p className="text-gray-700 mb-4">
                    Most production systems don't use a single model. They use different models for different steps:
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Step</th>
                                <th className="px-4 py-2 text-left">Model Tier</th>
                                <th className="px-4 py-2 text-left">Why</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b bg-green-50">
                                <td className="px-4 py-2">Intent classification</td>
                                <td className="px-4 py-2 font-mono text-xs">Small/fast (GPT-4o-mini, Haiku, Gemini Flash)</td>
                                <td className="px-4 py-2">Classification is a simple task — doesn't need the smartest model</td>
                            </tr>
                            <tr className="border-b bg-green-50">
                                <td className="px-4 py-2">Routing decisions</td>
                                <td className="px-4 py-2 font-mono text-xs">Small/fast</td>
                                <td className="px-4 py-2">Same — routing decisions are lightweight</td>
                            </tr>
                            <tr className="border-b bg-blue-50">
                                <td className="px-4 py-2">Response generation</td>
                                <td className="px-4 py-2 font-mono text-xs">Medium-large (GPT-4o, Sonnet, Gemini Pro)</td>
                                <td className="px-4 py-2">This is where quality matters — summarization, drafting, analysis</td>
                            </tr>
                            <tr className="border-b bg-amber-50">
                                <td className="px-4 py-2">High-trust extraction</td>
                                <td className="px-4 py-2 font-mono text-xs">Medium at temp=0</td>
                                <td className="px-4 py-2">Determinism matters more than creativity</td>
                            </tr>
                            <tr className="bg-purple-50">
                                <td className="px-4 py-2">Complex reasoning</td>
                                <td className="px-4 py-2 font-mono text-xs">Large (GPT-5, Opus)</td>
                                <td className="px-4 py-2">Only when the task genuinely needs it</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg">
                    <p className="text-sm text-purple-900 font-medium">
                        This is the "route cheap, generate smart" pattern. It saves both cost and latency.
                    </p>
                </div>
            </div>

            {/* Token Economics */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Token Economics</h3>
                <p className="text-gray-700 mb-4">
                    AI costs are measured in tokens (roughly 4 characters or ~¾ of a word). Every piece of text you
                    send to the model costs input tokens, and everything it writes back costs output tokens.
                </p>

                <div className="mb-4 p-3 bg-amber-100 border border-amber-300 rounded-lg">
                    <p className="text-sm text-amber-900">
                        <strong>Rough costs across providers (as of early 2026):</strong>
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Tier</th>
                                <th className="px-4 py-2 text-left">Examples</th>
                                <th className="px-4 py-2 text-left">Input Cost</th>
                                <th className="px-4 py-2 text-left">Output Cost</th>
                                <th className="px-4 py-2 text-left">Speed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2 font-semibold">Small/fast</td>
                                <td className="px-4 py-2 font-mono text-xs">GPT-4o-mini, Haiku, Gemini Flash</td>
                                <td className="px-4 py-2">~$0.10-0.25/1M tokens</td>
                                <td className="px-4 py-2">~$0.40-1.00/1M tokens</td>
                                <td className="px-4 py-2">Fast (&lt;1s)</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2 font-semibold">Medium</td>
                                <td className="px-4 py-2 font-mono text-xs">GPT-4o, Claude Sonnet, Gemini Pro</td>
                                <td className="px-4 py-2">~$2-5/1M tokens</td>
                                <td className="px-4 py-2">~$8-15/1M tokens</td>
                                <td className="px-4 py-2">Medium (2-5s)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold">Large</td>
                                <td className="px-4 py-2 font-mono text-xs">GPT-5, Claude Opus</td>
                                <td className="px-4 py-2">~$10-15/1M tokens</td>
                                <td className="px-4 py-2">~$40-75/1M tokens</td>
                                <td className="px-4 py-2">Slower (5-15s)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded-lg">
                    <h5 className="font-bold text-blue-900 mb-2">Real Example:</h5>
                    <p className="text-sm text-blue-800">
                        A 1-hour meeting transcript ≈ 15,000 tokens. At medium-tier rates (~$3/1M input tokens),
                        that's ~$0.05 per query against that transcript. At 100 queries/day across the team = ~$5/day.
                    </p>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• Use a large model for everything = ~$25/day</li>
                        <li>• Use multi-model routing = back to ~$5-7/day</li>
                    </ul>
                </div>
            </div>

            {/* Real-World Cost Projections */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Real-World Cost Projections</h3>
                <p className="text-gray-700 mb-4">
                    Abstract token pricing doesn't help with budgeting. Here's what a system actually costs at different scales:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Low Volume */}
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
                        <h4 className="font-bold text-green-900 mb-3">Low Volume (100 queries/day)</h4>
                        <p className="text-sm text-green-800 mb-3">Typical early deployment</p>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-green-700">Intent classification (small model)</span>
                                <span className="font-mono text-green-900">~$0.05</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-700">Retrieval (embeddings)</span>
                                <span className="font-mono text-green-900">~$0.01</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-700">Response generation (medium model)</span>
                                <span className="font-mono text-green-900">~$27</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-700">Hosting (always-on server)</span>
                                <span className="font-mono text-green-900">$5-20</span>
                            </div>
                            <div className="border-t-2 border-green-400 pt-2 mt-2 flex justify-between font-bold">
                                <span className="text-green-900">Total</span>
                                <span className="font-mono text-green-900">~$30-50/month</span>
                            </div>
                        </div>
                    </div>

                    {/* High Volume */}
                    <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-5">
                        <h4 className="font-bold text-amber-900 mb-3">High Volume (10K queries/day)</h4>
                        <p className="text-sm text-amber-800 mb-3">Scaled deployment</p>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-amber-700">Intent classification</span>
                                <span className="font-mono text-amber-900">~$5</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-amber-700">Retrieval</span>
                                <span className="font-mono text-amber-900">~$1</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-amber-700">Response generation</span>
                                <span className="font-mono text-amber-900">~$2,700</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-amber-700">Hosting</span>
                                <span className="font-mono text-amber-900">$50-200</span>
                            </div>
                            <div className="border-t-2 border-amber-400 pt-2 mt-2 flex justify-between font-bold">
                                <span className="text-amber-900">Total</span>
                                <span className="font-mono text-amber-900">~$2,800-3,000/month</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The 80/20 Optimization Rules */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    The 80/20 Optimization Rules (in priority order)
                </h3>

                <div className="space-y-3">
                    {[
                        {
                            rule: "Cache product knowledge",
                            desc: "It changes weekly, not per-query",
                            impact: "30-50% cost reduction on SSOT queries",
                            priority: 1
                        },
                        {
                            rule: "Use small models for classification",
                            desc: "GPT-4o-mini costs 20x less than GPT-4o",
                            impact: "95% savings on routing",
                            priority: 1
                        },
                        {
                            rule: "Reduce context size",
                            desc: "Send top 5 relevant chunks (2K tokens), not the whole transcript (15K tokens)",
                            impact: "80% savings on input tokens",
                            priority: 2
                        },
                        {
                            rule: "Skip the LLM when possible",
                            desc: "SQL for exact lookups, code for formatting",
                            impact: "Eliminates the LLM call entirely for Tier 1 queries",
                            priority: 1
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-300 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                    {item.priority}
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-bold text-blue-900">{item.rule}</h5>
                                    <p className="text-sm text-blue-700 mt-1">{item.desc}</p>
                                    <p className="text-sm text-green-700 mt-1 font-medium">💰 Impact: {item.impact}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Targets */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-600" />
                    Performance Targets
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Step</th>
                                <th className="px-4 py-2 text-left">Target</th>
                                <th className="px-4 py-2 text-left">Why</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2">Intent classification</td>
                                <td className="px-4 py-2 font-mono">&lt;500ms</td>
                                <td className="px-4 py-2">User expects instant routing</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2">Entity resolution</td>
                                <td className="px-4 py-2 font-mono">&lt;200ms</td>
                                <td className="px-4 py-2">Database lookup, should be fast</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2">Retrieval</td>
                                <td className="px-4 py-2 font-mono">&lt;1 second</td>
                                <td className="px-4 py-2">Vector/SQL search should be fast</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2">LLM generation</td>
                                <td className="px-4 py-2 font-mono">&lt;3 seconds</td>
                                <td className="px-4 py-2">Acceptable for a thoughtful response</td>
                            </tr>
                            <tr className="bg-green-50">
                                <td className="px-4 py-2 font-bold">Total end-to-end</td>
                                <td className="px-4 py-2 font-mono font-bold">&lt;5 seconds</td>
                                <td className="px-4 py-2 font-bold">The Slack/chat UX threshold</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                    <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-900">
                            <strong>If your total exceeds 10 seconds,</strong> look at the step breakdown — the bottleneck
                            is almost always retrieval or context assembly, not the LLM.
                        </p>
                    </div>
                </div>
            </div>

            {/* Latency Strategies */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Latency Strategies</h3>
                <p className="text-purple-800 mb-4">
                    Users expect fast responses, especially in chat interfaces. Strategies that apply regardless of your stack:
                </p>

                <div className="grid md:grid-cols-2 gap-3">
                    {[
                        "Parallelize retrieval where possible (fetch from multiple data sources simultaneously)",
                        "Cache slow-changing data (product knowledge, company profiles)",
                        "Chunk smartly — retrieve the 5 most relevant chunks, not the entire document",
                        "Stream responses so users see text appearing rather than waiting for the full answer",
                        "Use the right model for each step — a 50ms classification call on a small model beats a 3-second call on a large one",
                        "Pre-compute embeddings during ingestion, not at query time"
                    ].map((strategy, i) => (
                        <div key={i} className="flex items-start gap-2 bg-white rounded p-3 border border-purple-200">
                            <Zap className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-purple-900">{strategy}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModelSelectionSection;
