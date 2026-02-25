import React from 'react';
import { Network, Plug, Database, Code, CheckCircle, AlertTriangle, Zap, Settings, FileText, Brain } from 'lucide-react';
import { Card, Callout, ProgressiveSection, DiagramBox } from '../../components/ui';
import { NextSectionNav } from '../../index';

export const MCPPatternSection = () => (
    <div className="space-y-12">
        <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">MCP — Model Context Protocol</h2>
            <p className="text-xl text-gray-600">
                A standardized protocol for connecting AI agents to external tools, services, and data sources. Think USB-C for AI.
            </p>
        </div>

        <Callout type="info" title="What MCP Is">
            <p className="text-lg leading-relaxed">
                MCP is a standard protocol for connecting AI agents to external systems — databases, APIs, tools.
                One protocol, many connections. Any compliant AI client can connect to any compliant server without custom integration code.
            </p>
        </Callout>

        <ProgressiveSection number="1" title="How MCP Works" subtitle="The standardized interface" defaultOpen={true}>
            <DiagramBox title="MCP Architecture">
                {`[Client Agent] → [MCP Protocol] → [Tools & Services]
                                     ├── Databases
                                     ├── APIs
                                     └── Files & Resources`}
            </DiagramBox>

            <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-x-auto">
                <div className="hidden md:flex items-center justify-center gap-3 min-w-max">
                    <div className="px-4 py-3 rounded-lg border bg-blue-50 border-blue-200 text-blue-800 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <Brain className="w-4 h-4" />
                            <span className="font-semibold text-sm">AI Host</span>
                        </div>
                        <p className="text-xs opacity-75 mt-1">Claude, Cursor, etc.</p>
                    </div>
                    <div className="w-6 h-6 text-slate-400">→</div>
                    <div className="px-4 py-3 rounded-lg border bg-purple-50 border-purple-200 text-purple-800 text-center">
                        <span className="font-semibold text-sm">MCP Client</span>
                        <p className="text-xs opacity-75 mt-1">Connects host to server</p>
                    </div>
                    <div className="w-6 h-6 text-slate-400">→</div>
                    <div className="px-4 py-3 rounded-lg border bg-green-50 border-green-200 text-green-800 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <Settings className="w-4 h-4" />
                            <span className="font-semibold text-sm">MCP Server</span>
                        </div>
                        <p className="text-xs opacity-75 mt-1">Your tools & logic</p>
                    </div>
                    <div className="w-6 h-6 text-slate-400">→</div>
                    <div className="px-4 py-3 rounded-lg border bg-amber-50 border-amber-200 text-amber-800 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <Database className="w-4 h-4" />
                            <span className="font-semibold text-sm">External Systems</span>
                        </div>
                        <p className="text-xs opacity-75 mt-1">Databases, APIs, Services</p>
                    </div>
                </div>
            </div>

            <h4 className="font-semibold mt-6 mb-3">MCP Servers Expose Three Types of Capabilities:</h4>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                    {
                        icon: Settings,
                        title: "Tools",
                        desc: "Functions the AI can invoke",
                        examples: ["create_task()", "search_database()", "send_email()"],
                        color: "blue"
                    },
                    {
                        icon: Database,
                        title: "Resources",
                        desc: "Data the AI can read",
                        examples: ["File contents", "Database schemas", "API responses"],
                        color: "purple"
                    },
                    {
                        icon: FileText,
                        title: "Prompts",
                        desc: "Pre-built templates",
                        examples: ["Summarize meeting", "Extract action items", "Analyze feedback"],
                        color: "green"
                    },
                ].map((item, i) => {
                    const colors = {
                        blue: "border-blue-200 bg-blue-50",
                        purple: "border-purple-200 bg-purple-50",
                        green: "border-green-200 bg-green-50"
                    };
                    const iconColors = {
                        blue: "text-blue-600 bg-blue-100",
                        purple: "text-purple-600 bg-purple-100",
                        green: "text-green-600 bg-green-100"
                    };
                    return (
                        <Card key={i} className={`p-4 ${colors[item.color]}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`p-2 rounded-lg ${iconColors[item.color]}`}>
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <h5 className="font-semibold">{item.title}</h5>
                            </div>
                            <p className="text-sm text-slate-500 mb-3">{item.desc}</p>
                            <div className="space-y-1">
                                {item.examples.map((ex, j) => (
                                    <div key={j} className="text-xs font-mono bg-white/50 px-2 py-1 rounded">{ex}</div>
                                ))}
                            </div>
                        </Card>
                    );
                })}
            </div>

            <Callout type="info" title="Key Insight">
                <strong>HTTP is how MCP is accessed, not what MCP is.</strong> MCP defines the contract
                between AI and tools. The transport (HTTP, stdio) is just plumbing.
            </Callout>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-emerald-50 border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3">MCP Defines:</h4>
                    <ul className="space-y-2 text-gray-700">
                        <li>• What capabilities exist</li>
                        <li>• What inputs each requires</li>
                        <li>• What outputs to expect</li>
                        <li>• How to discover and invoke them</li>
                    </ul>
                </Card>

                <Card className="p-6 bg-purple-50 border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-3">MCP Does NOT Define:</h4>
                    <ul className="space-y-2 text-gray-700">
                        <li>• How capabilities are implemented</li>
                        <li>• What database backs them</li>
                        <li>• Which LLM is called internally</li>
                        <li>• Business logic details</li>
                    </ul>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="When to Use MCP" subtitle="The right use cases">
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-emerald-50 border-emerald-200">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        <h4 className="font-semibold text-emerald-900">Use MCP When:</h4>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You want to connect an AI agent to multiple external services (CRM, calendar, email, databases)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You want reusable, composable tools that work with any MCP-compatible AI client</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You're building an agent that needs to take actions in the world, not just answer questions</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You want to expose your tools to multiple AI hosts (Claude, Cursor, custom agents)</span>
                        </li>
                    </ul>
                </Card>

                <Card className="p-6 bg-rose-50 border-rose-200">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-rose-600" />
                        <h4 className="font-semibold text-rose-900">Avoid MCP When:</h4>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>You have a simple, single-purpose system — MCP adds abstraction overhead that isn't worth it</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>Your tools are highly custom and the standardization doesn't buy you anything</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>You're just retrieving data (use RAG instead)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>You need the simplest possible implementation</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="The Key Insight" subtitle="Separation of concerns">
            <Callout type="insight" title="What Makes MCP Powerful">
                <p className="text-lg leading-relaxed">
                    MCP separates <strong>what the AI can do</strong> (capabilities) from <strong>how it does it</strong> (implementation).
                    This is what makes AI systems maintainable at scale. You can swap implementations without changing
                    the interface your agents depend on.
                </p>
            </Callout>

            <div className="mt-6 space-y-4">
                <Card className="p-6 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-3">Example: Database Query Tool</h4>
                    <div className="space-y-3">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-900 mb-2"><strong>MCP Interface (Stable):</strong></p>
                            <code className="text-xs text-blue-800">query_customer_data(company_name: string) → CustomerRecord[]</code>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-900 mb-2"><strong>Implementation (Can Change):</strong></p>
                            <ul className="text-xs text-gray-700 space-y-1">
                                <li>• V1: Direct PostgreSQL query</li>
                                <li>• V2: Redis cache + PostgreSQL fallback</li>
                                <li>• V3: GraphQL API to microservice</li>
                            </ul>
                        </div>
                        <p className="text-sm text-gray-600">
                            The agent doesn't know or care which version is running. The interface stays the same.
                        </p>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="MCP vs. RAG" subtitle="Different problems, complementary solutions">
            <p className="text-gray-600 mb-6">
                MCP and RAG are often confused because both involve "connecting to data." They solve different problems:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-purple-50 border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                        <Network className="w-6 h-6 text-purple-600" />
                        <h4 className="font-semibold text-purple-900">MCP</h4>
                    </div>
                    <p className="text-gray-700 mb-4">
                        Connects an agent to <strong>tools and services</strong> — databases, APIs, functions.
                        The agent can <strong>take actions</strong>.
                    </p>
                    <div className="bg-white p-4 rounded-lg text-sm">
                        <p className="text-gray-600 mb-2"><strong>Examples:</strong></p>
                        <ul className="space-y-1 text-gray-600">
                            <li>• Send an email</li>
                            <li>• Create a calendar event</li>
                            <li>• Query a database</li>
                            <li>• Call an API</li>
                        </ul>
                    </div>
                </Card>

                <Card className="p-6 bg-green-50 border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                        <Database className="w-6 h-6 text-green-600" />
                        <h4 className="font-semibold text-green-900">RAG</h4>
                    </div>
                    <p className="text-gray-700 mb-4">
                        Retrieves from a <strong>knowledge base</strong> — documents, transcripts, policies.
                        The agent can <strong>answer questions</strong>.
                    </p>
                    <div className="bg-white p-4 rounded-lg text-sm">
                        <p className="text-gray-600 mb-2"><strong>Examples:</strong></p>
                        <ul className="space-y-1 text-gray-600">
                            <li>• "What did the customer say?"</li>
                            <li>• "Summarize this meeting"</li>
                            <li>• "Find docs about pricing"</li>
                            <li>• "What's our policy on X?"</li>
                        </ul>
                    </div>
                </Card>
            </div>

            <Callout type="success" title="Use Both Together">
                <p className="text-lg leading-relaxed">
                    Production systems often use both. MCP for actions (send email, create ticket),
                    RAG for knowledge (retrieve meeting notes, search documentation). They're complementary, not competing.
                </p>
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="Real-World Example" subtitle="MCP in practice">
            <Card className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-4">Sales Assistant with MCP</h4>
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2"><strong>User asks:</strong></p>
                        <p className="text-gray-800">"Schedule a follow-up call with Acme Corp for next Tuesday and send them the pricing deck"</p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-sm text-indigo-900 mb-3"><strong>Agent uses MCP tools:</strong></p>
                        <ol className="space-y-2 text-sm text-indigo-800">
                            <li>1. <code className="bg-white px-2 py-1 rounded">query_crm("Acme Corp")</code> → Get contact info</li>
                            <li>2. <code className="bg-white px-2 py-1 rounded">check_calendar("next Tuesday")</code> → Find available slots</li>
                            <li>3. <code className="bg-white px-2 py-1 rounded">create_calendar_event(...)</code> → Schedule the call</li>
                            <li>4. <code className="bg-white px-2 py-1 rounded">send_email(...)</code> → Send pricing deck with calendar invite</li>
                        </ol>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                        <p className="text-sm text-emerald-900 mb-2"><strong>Result:</strong></p>
                        <p className="text-emerald-800">Call scheduled, email sent, CRM updated — all from one natural language request</p>
                    </div>
                </div>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="Building MCP Servers" subtitle="Implementation considerations">
            <div className="space-y-4">
                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Server Implementation</h4>
                    <p className="text-gray-600 mb-4">
                        An MCP server is typically a lightweight HTTP service that exposes tools, resources, and prompts
                        via the MCP protocol. It handles discovery, invocation, and returns structured responses.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                        <p className="text-gray-700 mb-2"><strong>Key responsibilities:</strong></p>
                        <ul className="space-y-1 text-gray-600">
                            <li>• Expose available capabilities via discovery endpoint</li>
                            <li>• Validate inputs and handle errors gracefully</li>
                            <li>• Execute the actual business logic (database queries, API calls, etc.)</li>
                            <li>• Return structured responses in MCP format</li>
                            <li>• Handle authentication and authorization</li>
                        </ul>
                    </div>
                </Card>

                <Card className="p-6 bg-amber-50 border-amber-200">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-amber-900 mb-2">Security Considerations</h4>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li>• Always validate and sanitize inputs — agents can be prompted to send malicious payloads</li>
                                <li>• Implement rate limiting per client</li>
                                <li>• Use authentication tokens, not just IP allowlists</li>
                                <li>• Log all tool invocations for audit trails</li>
                                <li>• Implement least-privilege access — tools should only access what they need</li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="7" title="The Access Scope Problem" subtitle="What MCP doesn't solve">
            <Callout type="warning" title="The most commonly misunderstood limitation">
                MCP defines how to connect. It doesn't define what flows through the wire. Access control is entirely
                outside MCP's scope — it's your responsibility to build inside the server.
            </Callout>

            <div className="mt-6 space-y-4">
                <Card className="p-6 bg-blue-50 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3">The USB-C Analogy Extended</h4>
                    <p className="text-gray-700 mb-3">
                        USB-C defines how to connect. It doesn't define what flows through the wire. A USB-C port doesn't know
                        if it should deliver 5W or 100W — that negotiation happens separately, outside the connector standard itself.
                        You can plug in a laptop charger or a phone charger and the port accepts both without question.
                    </p>
                    <p className="text-gray-700">
                        MCP works the same way. The protocol handles discovery and invocation — how the agent finds your tools
                        and calls them. It says nothing about what data those tools are allowed to return, or to whom.
                    </p>
                </Card>

                <Card className="p-6 bg-rose-50 border-rose-200">
                    <h4 className="font-semibold text-rose-900 mb-3">What This Means in Practice</h4>
                    <p className="text-gray-700 mb-3">
                        When you give an agent access to a Slack MCP server, it gets access to <strong>everything</strong> that
                        server's credentials can see — every channel, every DM, every message the underlying token has permission to read.
                    </p>
                    <p className="text-gray-700 mb-3">
                        MCP has no built-in mechanism to say "this agent can only see #sales." There's no query-level scoping
                        in the protocol itself.
                    </p>
                    <div className="bg-white p-4 rounded-lg text-sm">
                        <p className="text-gray-700 mb-2"><strong>The same is true for any broad integration:</strong></p>
                        <ul className="space-y-1 text-gray-600">
                            <li>• CRM access → agent can read all customer records, not just the ones relevant to the current task</li>
                            <li>• Google Drive → agent can access all files the OAuth token allows, not just the folder you intended</li>
                            <li>• Database tool → agent can run any query the connection string permits, not just the query you designed it for</li>
                        </ul>
                    </div>
                </Card>

                <Card className="p-6 bg-amber-50 border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-3">This Isn't a Bug in MCP</h4>
                    <p className="text-gray-700">
                        It's a correct observation about what the protocol is and isn't. MCP standardizes the interface.
                        Scoping is your responsibility to build inside the server.
                    </p>
                </Card>

                <Card className="p-6 bg-emerald-50 border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3">The Fix: Narrow Tools, Not Broad Access</h4>
                    <p className="text-gray-700 mb-4">
                        The mitigation is tool design, not protocol configuration. Instead of:
                    </p>
                    <div className="bg-white p-4 rounded-lg mb-4">
                        <code className="text-sm text-rose-600">search_slack(query: string) → Message[]</code>
                        <p className="text-xs text-gray-500 mt-1">// searches everything</p>
                    </div>
                    <p className="text-gray-700 mb-2">Build:</p>
                    <div className="bg-white p-4 rounded-lg space-y-2">
                        <div>
                            <code className="text-sm text-emerald-600">search_sales_channel(query: string) → Message[]</code>
                            <p className="text-xs text-gray-500">// searches #sales only</p>
                        </div>
                        <div>
                            <code className="text-sm text-emerald-600">search_customer_threads(company: string) → Message[]</code>
                            <p className="text-xs text-gray-500">// scoped to a company</p>
                        </div>
                    </div>
                    <p className="text-gray-700 mt-4">
                        Each tool uses a token or query that's scoped to exactly what it needs. The agent can only access
                        what the tool exposes — and the tool only exposes what it should.
                    </p>
                </Card>

                <Card className="p-6 border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-indigo-900 mb-3">Least-Privilege Tool Design</h4>
                    <p className="text-gray-700 mb-3">
                        Least-privilege tool design isn't optional hygiene. It's the primary mechanism for access control
                        in MCP systems. If you skip it, you're trusting that the agent will never be prompted — accidentally
                        or adversarially — to ask for data it shouldn't have.
                    </p>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-sm text-indigo-900 mb-2"><strong>Practical rules for production:</strong></p>
                        <ul className="space-y-2 text-sm text-indigo-800">
                            <li>• One OAuth token per purpose, not one token for everything</li>
                            <li>• Name tools after what they should do, not what they technically can do — this also helps the agent use them correctly</li>
                            <li>• If a tool could return sensitive data outside its intended scope, it's too broad — split it</li>
                            <li>• Log every tool invocation with the inputs received — this is your audit trail when something goes wrong</li>
                            <li>• Test adversarially: prompt your agent to ask for something it shouldn't be able to get, and verify the tool design stops it</li>
                        </ul>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <div className="rounded-xl bg-gradient-to-r from-slate-800 to-indigo-900 text-white p-8">
            <h3 className="font-semibold text-xl mb-4">🎯 The Bottom Line</h3>
            <div className="space-y-3 text-lg leading-relaxed">
                <p>
                    MCP is about standardization. Instead of building custom integrations for every AI client,
                    you build one MCP server and any compliant client can use it.
                </p>
                <p>
                    Think of it as the difference between every phone having a different charger (pre-USB-C)
                    vs. one standard that works everywhere. MCP is that standard for AI tool access.
                </p>
            </div>
        </div>

        <NextSectionNav currentId="pattern-mcp" />
    </div>
);
