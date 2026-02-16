import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox } from '../components/ui';

export const MVPPathSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-900">The MVP Path: Off-the-Shelf Before Custom</h2>

        <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
            <h3 className="font-bold text-lg mb-2">The Principle</h3>
            <p className="text-gray-700">
                Start with off-the-shelf solutions. Only build custom when you hit clear limitations.
                This section answers: "What can I build WITHOUT writing a custom backend?"
            </p>
        </Card>

        <ProgressiveSection number="1" title="The Progression Path" subtitle="From fastest to most control" defaultOpen={true}>
            <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 text-center">
                        <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4">
                            <h4 className="font-bold text-green-800">Off-the-shelf MCP</h4>
                            <p className="text-sm text-green-700 mt-1">Hours</p>
                            <p className="text-xs text-green-600 mt-1">Zapier / Make</p>
                        </div>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="flex-1 text-center">
                        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4">
                            <h4 className="font-bold text-blue-800">Custom MCP tools</h4>
                            <p className="text-sm text-blue-700 mt-1">Days</p>
                            <p className="text-xs text-blue-600 mt-1">Your tools, LLM decides routing</p>
                        </div>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="flex-1 text-center">
                        <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4">
                            <h4 className="font-bold text-purple-800">Router Pattern</h4>
                            <p className="text-sm text-purple-700 mt-1">Weeks</p>
                            <p className="text-xs text-purple-600 mt-1">Decision layer, code routes</p>
                        </div>
                    </div>
                </div>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="Zapier MCP: Option 1 (Fastest)" subtitle="When managed solutions make sense">
            <Card className="p-4 bg-blue-50 border-blue-200 mb-4">
                <h4 className="font-bold text-blue-800">What is Zapier MCP?</h4>
                <p className="text-sm text-blue-700 mt-2">
                    A fully-managed cloud MCP server that connects AI assistants to 8,000+ apps and 30,000+ actions.
                    Setup takes minutes instead of months.
                </p>
            </Card>

            <h4 className="font-bold mb-3">Zapier MCP Strengths</h4>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { title: "8,000+ App Integrations", desc: "Pre-built connections to everything" },
                    { title: "Zero Backend Code", desc: "Setup in minutes, not months" },
                    { title: "Built-in Security", desc: "OAuth, rate limits, SOC 2 compliance" },
                    { title: "Great for Ops Teams", desc: "No developers required" },
                ].map((item, i) => (
                    <Card key={i} className="p-4">
                        <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{item.title}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </Card>
                ))}
            </div>

            <h4 className="font-bold mb-3">Zapier MCP Limitations</h4>
            <div className="grid md:grid-cols-2 gap-4">
                {[
                    { title: "No Semantic Search", desc: "Actions only, not vector search" },
                    { title: "No Direct SQL", desc: "Can't write custom database queries" },
                    { title: "Can't Tune AI Prompts", desc: "Zapier controls the prompt logic" },
                    { title: "Cost at Scale", desc: "2 tasks per call adds up" },
                ].map((item, i) => (
                    <Card key={i} className="p-4 border-red-200">
                        <div className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-medium">{item.title}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </Card>
                ))}
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="Decision Matrix" subtitle="Build vs Buy">
            <ComparisonTable
                headers={["Requirement", "Zapier MCP", "Custom MCP"]}
                rows={[
                    ["Standard SaaS integrations (Slack, Gmail, CRMs)", "✅ Perfect", "Overkill"],
                    ["Semantic search over documents", "❌ Not supported", "✅ Required"],
                    ["Complex SQL queries", "❌ Not supported", "✅ Required"],
                    ["Custom AI prompt behavior", "❌ Limited", "✅ Full control"],
                    ["Proprietary systems", "❌ Unless Zapier has integration", "✅ Build your own"],
                    ["Rapid prototyping", "✅ Minutes to deploy", "Days/weeks"],
                    ["High volume (1000s of calls/day)", "💰 Expensive", "✅ More economical"],
                ]}
            />

            <Callout type="success" title="The Hybrid Approach">
                Many organizations use <strong>both</strong>: Zapier MCP for standard SaaS automation,
                custom MCP servers for semantic search and proprietary systems.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="Good Use Cases for Zapier MCP" subtitle="When it shines">
            <ul className="space-y-2">
                {[
                    "Create tasks in project management tools (Asana, Trello, Jira)",
                    "Send messages to Slack or Teams",
                    "Create calendar events and send invites",
                    "Add rows to Google Sheets or Airtable",
                    "Create or update CRM records (Salesforce, HubSpot)",
                    "Send emails via Gmail or Outlook"
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {item}
                    </li>
                ))}
            </ul>
        </ProgressiveSection>
    </div>
);
