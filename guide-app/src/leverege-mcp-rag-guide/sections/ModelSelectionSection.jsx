import React from 'react';
import { DollarSign, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, Callout } from '../components/ui';
import { NextSectionNav } from '../index';

const ModelSelectionSection = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-slate-900">{"Model Selection & Cost"}</h2>

            <Callout type="success" title="THE RULE: Route cheap, generate smart">
                {"Use fast/cheap models for decisions and expensive/smart models only for the final response."}
            </Callout>

            <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Choosing a Model Provider</h3>
                <p className="text-slate-600 mb-4">
                    {"Your first decision is which LLM provider(s) to use. This isn't a permanent choice — most systems can swap providers by changing an API call. Pricing verified February 2026."}
                </p>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Provider</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Current Models</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Strengths</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Considerations</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100 hover:bg-indigo-50/30">
                                <td className="px-5 py-3 font-medium text-slate-800">OpenAI</td>
                                <td className="px-5 py-3 font-mono text-sm text-slate-600">GPT-5, GPT-5 mini, GPT-5 nano, GPT-4o-mini</td>
                                <td className="px-5 py-3 text-slate-600">Broadest ecosystem, fast iteration, strong function calling, GPT-5 nano is among the cheapest available</td>
                                <td className="px-5 py-3 text-slate-500">Closed-source, usage-based pricing</td>
                            </tr>
                            <tr className="border-b border-slate-100 hover:bg-indigo-50/30">
                                <td className="px-5 py-3 font-medium text-slate-800">Anthropic</td>
                                <td className="px-5 py-3 font-mono text-sm text-slate-600">Claude Opus 4.6, Sonnet 4.6, Haiku 4.5</td>
                                <td className="px-5 py-3 text-slate-600">Strong reasoning, 200K context standard (1M beta), safety-focused, significant price drop vs previous Opus generation</td>
                                <td className="px-5 py-3 text-slate-500">Smaller ecosystem</td>
                            </tr>
                            <tr className="border-b border-slate-100 hover:bg-indigo-50/30">
                                <td className="px-5 py-3 font-medium text-slate-800">Google</td>
                                <td className="px-5 py-3 font-mono text-sm text-slate-600">Gemini 2.5 Pro, Gemini 2.5 Flash, Gemini 2.5 Flash-Lite</td>
                                <td className="px-5 py-3 text-slate-600">1M token context window, multimodal (text/image/video/audio), competitive pricing, generous free tier for development</td>
                                <td className="px-5 py-3 text-slate-500">Gemini 3 in preview; pricing may shift as models move to GA</td>
                            </tr>
                            <tr className="hover:bg-indigo-50/30">
                                <td className="px-5 py-3 font-medium text-slate-800">Open Source</td>
                                <td className="px-5 py-3 font-mono text-sm text-slate-600">Llama, Mistral, Qwen</td>
                                <td className="px-5 py-3 text-slate-600">Self-hosted, no per-token cost, full control</td>
                                <td className="px-5 py-3 text-slate-500">Requires infrastructure, lower capability ceiling</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Callout type="info" title="How to decide">
                    {"Start with a hosted provider (OpenAI or Anthropic) for speed of development. Consider open-source only if you have specific data privacy requirements or very high volume that makes per-token pricing prohibitive."}
                </Callout>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">The Multi-Model Pattern</h3>
                <p className="text-slate-600 mb-4">
                    {"Most production systems don't use a single model. They use different models for different steps:"}
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Step</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Model Tier</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Examples</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Why</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100 bg-emerald-50/40"><td className="px-5 py-3 text-slate-700">Intent classification</td><td className="px-5 py-3 font-mono text-sm text-slate-600">Small/fast</td><td className="px-5 py-3 font-mono text-sm text-slate-600">GPT-4o-mini, Haiku 4.5, Gemini 2.5 Flash-Lite</td><td className="px-5 py-3 text-slate-600">{"Classification is simple — doesn't need the smartest model"}</td></tr>
                            <tr className="border-b border-slate-100 bg-emerald-50/40"><td className="px-5 py-3 text-slate-700">Routing decisions</td><td className="px-5 py-3 font-mono text-sm text-slate-600">Small/fast</td><td className="px-5 py-3 font-mono text-sm text-slate-600">GPT-5 nano, Haiku 4.5</td><td className="px-5 py-3 text-slate-600">Routing decisions are lightweight</td></tr>
                            <tr className="border-b border-slate-100 bg-sky-50/40"><td className="px-5 py-3 text-slate-700">Response generation</td><td className="px-5 py-3 font-mono text-sm text-slate-600">Medium</td><td className="px-5 py-3 font-mono text-sm text-slate-600">Claude Sonnet 4.6, GPT-5 mini, Gemini 2.5 Flash</td><td className="px-5 py-3 text-slate-600">{"Quality matters — summarization, drafting, analysis"}</td></tr>
                            <tr className="border-b border-slate-100 bg-amber-50/40"><td className="px-5 py-3 text-slate-700">High-trust extraction</td><td className="px-5 py-3 font-mono text-sm text-slate-600">Medium at temp=0</td><td className="px-5 py-3 font-mono text-sm text-slate-600">Claude Sonnet 4.6, GPT-5 mini</td><td className="px-5 py-3 text-slate-600">Determinism matters more than creativity</td></tr>
                            <tr className="bg-violet-50/40"><td className="px-5 py-3 text-slate-700">Complex reasoning</td><td className="px-5 py-3 font-mono text-sm text-slate-600">Large</td><td className="px-5 py-3 font-mono text-sm text-slate-600">GPT-5, Claude Opus 4.6, Gemini 2.5 Pro</td><td className="px-5 py-3 text-slate-600">Only when the task genuinely needs it</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 p-4 bg-violet-50 border border-violet-200 rounded-xl">
                    <p className="text-violet-800 font-medium">
                        {"This is the \"route cheap, generate smart\" pattern. It saves both cost and latency."}
                    </p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Token Economics</h3>
                <p className="text-slate-600 mb-4">
                    {"AI costs are measured in tokens (roughly 4 characters or ~¾ of a word). Every piece of text you send to the model costs input tokens, and everything it writes back costs output tokens. Pricing verified February 2026."}
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Tier</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Examples</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Input Cost</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Output Cost</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Speed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100"><td className="px-5 py-3 font-medium text-slate-800">Small/fast</td><td className="px-5 py-3 font-mono text-sm text-slate-600">GPT-4o-mini, GPT-5 nano, Haiku 4.5, Gemini 2.5 Flash-Lite</td><td className="px-5 py-3 text-slate-600">$0.05–1.00/1M</td><td className="px-5 py-3 text-slate-600">$0.40–5.00/1M</td><td className="px-5 py-3 text-slate-600">{"Fast (<1s)"}</td></tr>
                            <tr className="border-b border-slate-100"><td className="px-5 py-3 font-medium text-slate-800">Medium</td><td className="px-5 py-3 font-mono text-sm text-slate-600">GPT-5 mini, Claude Sonnet 4.6, Gemini 2.5 Flash</td><td className="px-5 py-3 text-slate-600">$0.30–3.00/1M</td><td className="px-5 py-3 text-slate-600">$2.50–15.00/1M</td><td className="px-5 py-3 text-slate-600">Medium (1–3s)</td></tr>
                            <tr><td className="px-5 py-3 font-medium text-slate-800">Large</td><td className="px-5 py-3 font-mono text-sm text-slate-600">GPT-5, Claude Opus 4.6, Gemini 2.5 Pro</td><td className="px-5 py-3 text-slate-600">$1.25–5.00/1M</td><td className="px-5 py-3 text-slate-600">$10–25.00/1M</td><td className="px-5 py-3 text-slate-600">Slower (3–10s)</td></tr>
                        </tbody>
                    </table>
                </div>
                <Card className="mt-4 bg-blue-50 border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-2">Why large models got cheaper</h5>
                    <p className="text-blue-800 text-sm">
                        The previous generation of flagship models (Claude Opus 4.1, GPT-4 Turbo) cost $15/$75 per million tokens.
                        Current flagship models have dropped to $1.25–5/$10–25. The "route cheap, generate smart" principle still applies —
                        but the penalty for using a large model on everything is now lower than it used to be. The bigger cost driver today
                        is output token volume, not model tier selection alone.
                    </p>
                </Card>
                <Card className="mt-4 bg-sky-50 border-sky-200">
                    <h5 className="font-semibold text-sky-900 mb-2">Real Example</h5>
                    <p className="text-sky-800">
                        {"A 1-hour meeting transcript ≈ 15,000 tokens. At medium-tier rates (~$3/1M input), that's ~$0.05 per query. At 100 queries/day = ~$5/day."}
                    </p>
                    <ul className="text-sky-700 mt-2 space-y-1">
                        <li>{"\u2022 Use a large model for everything (GPT-5 at $1.25 input / $10 output) = ~$8–10/day"}</li>
                        <li>{"\u2022 Use multi-model routing (classify with Haiku, generate with Sonnet) = ~$5–6/day"}</li>
                    </ul>
                    <p className="text-sky-700 text-sm mt-2">
                        The cost gap between tiers has narrowed significantly compared to a year ago. The multi-model pattern still saves money,
                        but the more important reason to use it now is latency and predictability — routing cheap keeps intent classification
                        under 500ms regardless of what the generation model is doing.
                    </p>
                </Card>
                <Card className="mt-4 bg-amber-50 border-amber-200">
                    <p className="font-semibold text-amber-800 mb-2">Pricing Disclaimer</p>
                    <p className="text-sm text-amber-700">
                        Prices verified February 2026. LLM pricing changes frequently — often downward. Before committing to a cost model, verify current rates at:
                    </p>
                    <ul className="text-sm text-amber-700 mt-2 space-y-1">
                        <li>• OpenAI: <a href="https://openai.com/api/pricing" target="_blank" rel="noopener noreferrer" className="underline">openai.com/api/pricing</a></li>
                        <li>• Anthropic: <a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener noreferrer" className="underline">platform.claude.com/docs/en/about-claude/pricing</a></li>
                        <li>• Google: <a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noopener noreferrer" className="underline">ai.google.dev/gemini-api/docs/pricing</a></li>
                    </ul>
                </Card>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Real-World Cost Projections</h3>
                <p className="text-slate-600 mb-4">{"Here's what a system actually costs at different scales:"}</p>
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-emerald-50 border-emerald-200">
                        <h4 className="font-semibold text-emerald-900 mb-1">Low Volume (100 queries/day)</h4>
                        <p className="text-sm text-emerald-700 mb-3">Typical early deployment</p>
                        <div className="space-y-2">
                            <div className="flex justify-between"><span className="text-emerald-700">Intent classification</span><span className="font-mono text-emerald-900">~$0.05</span></div>
                            <div className="flex justify-between"><span className="text-emerald-700">Retrieval</span><span className="font-mono text-emerald-900">~$0.01</span></div>
                            <div className="flex justify-between"><span className="text-emerald-700">Response generation</span><span className="font-mono text-emerald-900">~$27</span></div>
                            <div className="flex justify-between"><span className="text-emerald-700">Hosting</span><span className="font-mono text-emerald-900">$5-20</span></div>
                            <div className="border-t border-emerald-300 pt-2 mt-2 flex justify-between font-semibold">
                                <span className="text-emerald-900">Total</span><span className="font-mono text-emerald-900">~$30-50/month</span>
                            </div>
                        </div>
                    </Card>
                    <Card className="bg-amber-50 border-amber-200">
                        <h4 className="font-semibold text-amber-900 mb-1">High Volume (10K queries/day)</h4>
                        <p className="text-sm text-amber-700 mb-3">Scaled deployment</p>
                        <div className="space-y-2">
                            <div className="flex justify-between"><span className="text-amber-700">Intent classification</span><span className="font-mono text-amber-900">~$5</span></div>
                            <div className="flex justify-between"><span className="text-amber-700">Retrieval</span><span className="font-mono text-amber-900">~$1</span></div>
                            <div className="flex justify-between"><span className="text-amber-700">Response generation</span><span className="font-mono text-amber-900">~$2,700</span></div>
                            <div className="flex justify-between"><span className="text-amber-700">Hosting</span><span className="font-mono text-amber-900">$50-200</span></div>
                            <div className="border-t border-amber-300 pt-2 mt-2 flex justify-between font-semibold">
                                <span className="text-amber-900">Total</span><span className="font-mono text-amber-900">~$2,800-3,000/mo</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    The 80/20 Optimization Rules
                </h3>
                <div className="space-y-2">
                    {[
                        { rule: "Cache product knowledge", desc: "It changes weekly, not per-query", impact: "30-50% cost reduction on SSOT queries" },
                        { rule: "Use small models for classification", desc: "GPT-4o-mini costs 20x less than GPT-4o", impact: "95% savings on routing" },
                        { rule: "Reduce context size", desc: "Send top 5 relevant chunks (2K tokens), not the whole transcript (15K)", impact: "80% savings on input tokens" },
                        { rule: "Skip the LLM when possible", desc: "SQL for exact lookups, code for formatting", impact: "Eliminates the LLM call entirely for Tier 1 queries" },
                    ].map((item, i) => (
                        <Card key={i} className="bg-indigo-50/50 border-indigo-100">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">{i + 1}</div>
                                <div className="flex-1">
                                    <h5 className="font-semibold text-slate-800">{item.rule}</h5>
                                    <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                                    <p className="text-sm text-emerald-600 mt-1 font-medium">{"\uD83D\uDCB0 "}{item.impact}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    Performance Targets
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Step</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Target</th>
                                <th className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">Why</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100"><td className="px-5 py-3 text-slate-700">Intent classification</td><td className="px-5 py-3 font-mono text-slate-600">{"<500ms"}</td><td className="px-5 py-3 text-slate-600">User expects instant routing</td></tr>
                            <tr className="border-b border-slate-100"><td className="px-5 py-3 text-slate-700">Entity resolution</td><td className="px-5 py-3 font-mono text-slate-600">{"<200ms"}</td><td className="px-5 py-3 text-slate-600">Database lookup, should be fast</td></tr>
                            <tr className="border-b border-slate-100"><td className="px-5 py-3 text-slate-700">Retrieval</td><td className="px-5 py-3 font-mono text-slate-600">{"<1 second"}</td><td className="px-5 py-3 text-slate-600">Vector/SQL search should be fast</td></tr>
                            <tr className="border-b border-slate-100"><td className="px-5 py-3 text-slate-700">LLM generation</td><td className="px-5 py-3 font-mono text-slate-600">{"<3 seconds"}</td><td className="px-5 py-3 text-slate-600">Acceptable for a thoughtful response</td></tr>
                            <tr className="bg-emerald-50/50"><td className="px-5 py-3 font-semibold text-slate-800">Total end-to-end</td><td className="px-5 py-3 font-mono font-semibold text-slate-800">{"<5 seconds"}</td><td className="px-5 py-3 font-medium text-slate-700">The Slack/chat UX threshold</td></tr>
                        </tbody>
                    </table>
                </div>
                <Callout type="warning" title="Bottleneck alert">
                    {"If your total exceeds 10 seconds, look at the step breakdown — the bottleneck is almost always retrieval or context assembly, not the LLM."}
                </Callout>
            </div>


            <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                    Latency Strategies
                </h3>
                <p className="text-slate-600 mb-4">
                    {"Users notice latency. Here's how to keep response times under the 5-second threshold:"}
                </p>
                <div className="space-y-2">
                    {[
                        { strategy: "Stream responses", desc: "Show tokens as they generate. Users perceive faster response.", impact: "Perceived latency drops 60-80%" },
                        { strategy: "Parallel retrieval", desc: "Run SQL filter and vector search simultaneously, not sequentially.", impact: "Retrieval time cut in half" },
                        { strategy: "Cache common queries", desc: "Product knowledge, company lists, recent meetings — cache aggressively.", impact: "Eliminates LLM call entirely for cached queries" },
                        { strategy: "Pre-compute embeddings", desc: "Embed at ingestion time, not query time.", impact: "Query-time embedding is only for the user question (~50ms)" },
                        { strategy: "Use smaller models for routing", desc: "GPT-4o-mini for intent classification, big model only for generation.", impact: "Routing in <500ms instead of 2-3s" },
                    ].map((item, i) => (
                        <Card key={i} className="bg-slate-50 border-slate-200">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-semibold">{i + 1}</div>
                                <div className="flex-1">
                                    <h5 className="font-semibold text-slate-800">{item.strategy}</h5>
                                    <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                                    <p className="text-sm text-emerald-600 mt-1 font-medium">{"\u26A1 "}{item.impact}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-gradient-to-r from-slate-800 to-indigo-900 text-white p-6">
                <h3 className="font-semibold text-base mb-3">{"\uD83C\uDFAF The Bottom Line"}</h3>
                <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Route cheap, generate smart.</span> Use the smallest model that works for each step.</p>
                    <p><span className="font-medium">Measure everything.</span> Track cost per query, latency per step, and quality per intent.</p>
                    <p className="text-indigo-200 text-xs mt-3">{"The goal isn't to minimize cost — it's to maximize value per dollar spent."}</p>
                </div>
            </div>

            <NextSectionNav currentId="modelselection" />
        </div>
    );
};

export { ModelSelectionSection };
