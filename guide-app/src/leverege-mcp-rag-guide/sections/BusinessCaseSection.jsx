import React from 'react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox } from '../components/ui';

export const BusinessCaseSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-900">Start With the Business Case</h2>

        <Callout type="danger" title="The Most Common Mistake">
            Building AI solutions without knowing what questions you need answered.
            Without a clear business case, you're just building a <strong>commercial AI wrapper</strong> —
            expensive, unfocused, and unlikely to deliver value.
        </Callout>

        <ProgressiveSection number="1" title="Why Business Case First?" subtitle="Technology serves the question, not the other way around" defaultOpen={true}>
            <Card className="p-4 bg-red-50 border-red-200 mb-4">
                <h4 className="font-bold text-red-800">Without a Business Case:</h4>
                <ul className="mt-2 space-y-1 text-sm text-red-700">
                    <li>• You build a "chat with your data" interface</li>
                    <li>• Users don't know what to ask</li>
                    <li>• Answers are generic and unhelpful</li>
                    <li>• Nobody uses it after the first week</li>
                    <li>• You've built an expensive ChatGPT wrapper</li>
                </ul>
            </Card>

            <Card className="p-4 bg-green-50 border-green-200">
                <h4 className="font-bold text-green-800">With a Business Case:</h4>
                <ul className="mt-2 space-y-1 text-sm text-green-700">
                    <li>• You know exactly what questions to answer</li>
                    <li>• You design data shape around those questions</li>
                    <li>• You choose the right approach (SQL/RAG/Agent)</li>
                    <li>• Answers are specific and actionable</li>
                    <li>• Users get real value from day one</li>
                </ul>
            </Card>

            <Callout type="insight" title="The Key Insight">
                <strong>The business case determines everything:</strong> what data you need, how to chunk it,
                what metadata to store, which approach to use, and how to evaluate success.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="The Three Questions" subtitle="Answer these BEFORE any technology decisions">
            <div className="space-y-4">
                <Card className="p-5 border-l-4 border-blue-500">
                    <h4 className="font-bold text-lg text-blue-800">1. What questions does the business need answered?</h4>
                    <p className="text-gray-600 mt-2">Not "what can AI do?" but "what do we need to know?"</p>
                    <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">Examples for Leverege:</p>
                        <ul className="text-sm text-blue-700 mt-1 space-y-1">
                            <li>• "What concerns did customers raise in recent meetings?"</li>
                            <li>• "What did we promise to follow up on?"</li>
                            <li>• "What's the sentiment around our pricing?"</li>
                            <li>• "Which customers mentioned competitors?"</li>
                        </ul>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-purple-500">
                    <h4 className="font-bold text-lg text-purple-800">2. Who needs these answers and why?</h4>
                    <p className="text-gray-600 mt-2">Different users need different things from the same data.</p>
                    <div className="mt-3 bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-purple-800">User → Need → Implication:</p>
                        <ul className="text-sm text-purple-700 mt-1 space-y-1">
                            <li>• <strong>BD team</strong> → Prep for calls → Need recent context, fast</li>
                            <li>• <strong>Product team</strong> → Feature requests → Need to aggregate across customers</li>
                            <li>• <strong>Leadership</strong> → Strategic trends → Need high-level synthesis</li>
                        </ul>
                    </div>
                </Card>

                <Card className="p-5 border-l-4 border-amber-500">
                    <h4 className="font-bold text-lg text-amber-800">3. What does a good answer look like?</h4>
                    <p className="text-gray-600 mt-2">Define success before building. What format? What level of detail? What sources?</p>
                    <div className="mt-3 bg-amber-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-amber-800">Answer Requirements:</p>
                        <ul className="text-sm text-amber-700 mt-1 space-y-1">
                            <li>• Must cite specific meetings and speakers</li>
                            <li>• Must distinguish customer vs. internal statements</li>
                            <li>• Must indicate confidence/uncertainty</li>
                            <li>• Must be actionable, not just informative</li>
                        </ul>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="Business Case → Technical Decisions" subtitle="How business needs drive architecture">
            <ComparisonTable
                headers={["Business Need", "Implies", "Technical Decision"]}
                rows={[
                    ['"What did the customer say?"', "Need speaker attribution", "Store speaker_role metadata"],
                    ['"Last meeting with X"', "Need temporal queries", "Index by company + date"],
                    ['"Concerns across all customers"', "Need aggregation", "SQL + vector pre-filter"],
                    ['"Summarize the discussion"', "Need synthesis", "RAG + LLM"],
                    ['"What did we promise?"', "Need to identify commitments", "Train for action item extraction"],
                ]}
            />

            <DiagramBox title="Business Case Drives Everything">
                {`BUSINESS CASE: "BD needs to prep for customer calls quickly"
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  QUESTIONS THAT IMPLIES:                                    │
│  • "What was our last meeting about?"                       │
│  • "What did they say about our product?"                   │
│  • "What concerns did they raise?"                          │
│  • "What did we promise to follow up on?"                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  DATA SHAPE THAT IMPLIES:                                   │
│  • Chunk by speaker turn (for attribution)                  │
│  • Store speaker_role (customer vs. Leverege)               │
│  • Store meeting_date (for "last meeting")                  │
│  • Store company_id (for filtering)                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  APPROACH THAT IMPLIES:                                     │
│  • "Last meeting" → SQL (temporal query)                    │
│  • "What did they say about X" → SQL + RAG                  │
│  • "Summarize concerns" → RAG + LLM                         │
└─────────────────────────────────────────────────────────────┘`}
            </DiagramBox>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="Write Down Your Business Case" subtitle="A template to fill out before building">
            <Card className="p-6 bg-gray-50 border-gray-300">
                <h4 className="font-bold mb-4">📝 Business Case Template</h4>

                <div className="space-y-4">
                    <div>
                        <p className="font-medium text-gray-700">1. Primary Users:</p>
                        <p className="text-sm text-gray-500 italic">Who will use this system? (e.g., BD team, Product team)</p>
                    </div>

                    <div>
                        <p className="font-medium text-gray-700">2. Core Problem:</p>
                        <p className="text-sm text-gray-500 italic">What problem are we solving? (e.g., "BD spends 30 min prepping for each call")</p>
                    </div>

                    <div>
                        <p className="font-medium text-gray-700">3. Top 5 Questions Users Need Answered:</p>
                        <p className="text-sm text-gray-500 italic">Be specific. Not "ask anything" but actual questions.</p>
                        <ol className="list-decimal ml-6 text-sm text-gray-500 mt-1">
                            <li>_______________</li>
                            <li>_______________</li>
                            <li>_______________</li>
                            <li>_______________</li>
                            <li>_______________</li>
                        </ol>
                    </div>

                    <div>
                        <p className="font-medium text-gray-700">4. What Does a Good Answer Look Like?</p>
                        <p className="text-sm text-gray-500 italic">Format, detail level, must-haves (e.g., "must cite sources")</p>
                    </div>

                    <div>
                        <p className="font-medium text-gray-700">5. Success Metric:</p>
                        <p className="text-sm text-gray-500 italic">How will we know it's working? (e.g., "BD prep time drops to 5 min")</p>
                    </div>
                </div>
            </Card>

            <Callout type="success" title="Pro Tip">
                Fill out this template with actual users. Their answers will surprise you —
                and save you from building the wrong thing.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="Anti-Patterns to Avoid" subtitle="Signs you don't have a real business case">
            <div className="grid md:grid-cols-2 gap-4">
                {[
                    {
                        bad: '"Let users ask anything about the data"',
                        why: "Too vague. Users won't know what to ask.",
                        better: "Define the 10 questions users actually need"
                    },
                    {
                        bad: '"We\'ll figure out use cases after launch"',
                        why: "You'll build generic infrastructure that fits nothing well.",
                        better: "Start with one specific use case, nail it, then expand"
                    },
                    {
                        bad: '"AI will understand what they mean"',
                        why: "AI needs structure. Garbage in = garbage out.",
                        better: "Design prompts and capabilities around specific patterns"
                    },
                    {
                        bad: '"It\'s like ChatGPT but for our data"',
                        why: "That's a feature, not a business case.",
                        better: "What decisions will this help people make?"
                    },
                ].map((item, i) => (
                    <Card key={i} className="p-4">
                        <p className="text-red-600 font-medium">❌ {item.bad}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.why}</p>
                        <p className="text-green-600 text-sm mt-2">✓ {item.better}</p>
                    </Card>
                ))}
            </div>
        </ProgressiveSection>

        <Card className="p-6 bg-gradient-to-r from-blue-900 to-purple-900 text-white mt-6">
            <h3 className="font-bold text-lg mb-4">🎯 The Bottom Line</h3>
            <div className="space-y-3">
                <p>
                    <strong>Without a business case:</strong> You build a ChatGPT wrapper.
                    Expensive to run, vague answers, nobody uses it.
                </p>
                <p>
                    <strong>With a business case:</strong> You build a tool that answers
                    specific questions, saves real time, and becomes indispensable.
                </p>
                <p className="text-blue-200 mt-4 text-sm">
                    The business case is not a formality. It's the foundation that determines
                    whether your AI investment succeeds or fails.
                </p>
            </div>
        </Card>
    </div>
);
