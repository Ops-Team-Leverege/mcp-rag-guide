import React from 'react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox } from '../components/ui';
import { NextSectionNav } from '../index';

export const BusinessCaseSection = () => (
    <div className="space-y-12">
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Start With the Business Case</h2>
        </div>

        <Callout type="danger" title="The Most Common Mistake">
            <p className="text-lg leading-relaxed">
                Building AI solutions without knowing what questions you need answered.
                Without a clear business case, you're just building a commercial AI wrapper —
                expensive, unfocused, and unlikely to deliver value.
            </p>
        </Callout>

        <ProgressiveSection number="1" title="Why Business Case First?" subtitle="Technology serves the question, not the other way around" defaultOpen={true}>
            <Card className="bg-rose-50 border-rose-200 mb-4">
                <h4 className="font-semibold text-rose-800 text-sm">Without a Business Case:</h4>
                <ul className="mt-2 space-y-1 text-sm text-rose-700">
                    <li>{"\u2022 You build a \"chat with your data\" interface"}</li>
                    <li>{"\u2022 Users don't know what to ask"}</li>
                    <li>{"\u2022 Answers are generic and unhelpful"}</li>
                    <li>{"\u2022 Nobody uses it after the first week"}</li>
                    <li>{"\u2022 You've built an expensive ChatGPT wrapper"}</li>
                </ul>
            </Card>

            <Card className="bg-emerald-50 border-emerald-200">
                <h4 className="font-semibold text-emerald-800 text-sm">With a Business Case:</h4>
                <ul className="mt-2 space-y-1 text-sm text-emerald-700">
                    <li>{"\u2022 You know exactly what questions to answer"}</li>
                    <li>{"\u2022 You design data shape around those questions"}</li>
                    <li>{"\u2022 You choose the right approach (SQL/RAG/Agent)"}</li>
                    <li>{"\u2022 Answers are specific and actionable"}</li>
                    <li>{"\u2022 Users get real value from day one"}</li>
                </ul>
            </Card>

            <Callout type="insight" title="The Key Insight">
                The business case determines everything: what data you need, how to chunk it,
                what metadata to store, which approach to use, and how to evaluate success.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="The Three Questions" subtitle="Answer these BEFORE any technology decisions">
            <div className="space-y-3">
                <Card className="border-l-4 border-l-sky-400">
                    <h4 className="font-semibold text-sm text-sky-800">1. What questions does the business need answered?</h4>
                    <p className="text-slate-600 text-sm mt-1">{"Not \"what can AI do?\" but \"what do we need to know?\""}</p>
                    <div className="mt-3 bg-sky-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-sky-800">Examples:</p>
                        <ul className="text-xs text-sky-700 mt-1 space-y-1">
                            <li>{"\u2022 \"What concerns did customers raise in recent meetings?\""}</li>
                            <li>{"\u2022 \"What did we promise to follow up on?\""}</li>
                            <li>{"\u2022 \"What's the sentiment around our pricing?\""}</li>
                            <li>{"\u2022 \"Which customers mentioned competitors?\""}</li>
                        </ul>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-violet-400">
                    <h4 className="font-semibold text-sm text-violet-800">2. Who needs these answers and why?</h4>
                    <p className="text-slate-600 text-sm mt-1">Different users need different things from the same data.</p>
                    <div className="mt-3 bg-violet-50 p-3 rounded-lg">
                        <ul className="text-xs text-violet-700 space-y-1">
                            <li>{"• BD team → Prep for calls → Need recent context, fast"}</li>
                            <li>{"• Product team → Feature requests → Need to aggregate across customers"}</li>
                            <li>{"• Leadership → Strategic trends → Need high-level synthesis"}</li>
                        </ul>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-amber-400">
                    <h4 className="font-semibold text-sm text-amber-800">3. What does a good answer look like?</h4>
                    <p className="text-slate-600 text-sm mt-1">Define success before building. What format? What level of detail?</p>
                    <div className="mt-3 bg-amber-50 p-3 rounded-lg">
                        <ul className="text-xs text-amber-700 space-y-1">
                            <li>{"• Must cite specific meetings and speakers"}</li>
                            <li>{"• Must distinguish customer vs. internal statements"}</li>
                            <li>{"• Must indicate confidence/uncertainty"}</li>
                            <li>{"• Must be actionable, not just informative"}</li>
                        </ul>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title={"Business Case → Technical Decisions"} subtitle="How business needs drive architecture">
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
  QUESTIONS THAT IMPLIES:
  • "What was our last meeting about?"
  • "What did they say about our product?"
  • "What concerns did they raise?"
  • "What did we promise to follow up on?"
                              │
  DATA SHAPE THAT IMPLIES:
  • Chunk by speaker turn (for attribution)
  • Store speaker_role (customer vs. internal)
  • Store meeting_date (for "last meeting")
  • Store company_id (for filtering)
                              │
  APPROACH THAT IMPLIES:
  • "Last meeting" → SQL (temporal query)
  • "What did they say about X" → SQL + RAG
  • "Summarize concerns" → RAG + LLM`}
            </DiagramBox>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="Build vs. Buy Decision Framework" subtitle="When to use off-the-shelf vs. building custom">
            <p className="text-slate-600 mb-4">
                Every team faces this decision: use a managed RAG product, an AI platform, or build on raw APIs?
                The calculus involves maintenance burden, customization needs, data sensitivity, and iteration speed.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-emerald-50 border-emerald-200">
                    <h4 className="font-semibold text-emerald-800 mb-2">Use Off-the-Shelf When:</h4>
                    <ul className="text-sm text-emerald-700 space-y-1">
                        <li>{"• Generic use case (chat with docs)"}</li>
                        <li>{"• No proprietary data concerns"}</li>
                        <li>{"• Speed to market matters most"}</li>
                        <li>{"• Limited engineering resources"}</li>
                        <li>{"• Standard workflows suffice"}</li>
                    </ul>
                </Card>

                <Card className="bg-sky-50 border-sky-200">
                    <h4 className="font-semibold text-sky-800 mb-2">Build Custom When:</h4>
                    <ul className="text-sm text-sky-700 space-y-1">
                        <li>{"• Specific business logic required"}</li>
                        <li>{"• Data sensitivity/compliance needs"}</li>
                        <li>{"• Need full control over behavior"}</li>
                        <li>{"• Integration with existing systems"}</li>
                        <li>{"• Cost optimization at scale"}</li>
                    </ul>
                </Card>

                <Card className="bg-violet-50 border-violet-200">
                    <h4 className="font-semibold text-violet-800 mb-2">Hybrid Approach:</h4>
                    <ul className="text-sm text-violet-700 space-y-1">
                        <li>{"• Start with managed platform"}</li>
                        <li>{"• Validate use case and ROI"}</li>
                        <li>{"• Build custom when limits hit"}</li>
                        <li>{"• Keep infrastructure managed"}</li>
                        <li>{"• Focus engineering on differentiation"}</li>
                    </ul>
                </Card>
            </div>

            <Callout type="insight" title="The real cost">
                The API cost is just the beginning. Factor in evaluation infrastructure, prompt engineering time,
                monitoring, re-prompting when models update, and human review queues. Teams routinely underestimate
                total cost of ownership by 3-5x.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="Total Cost of Ownership" subtitle="Beyond API costs">
            <p className="text-slate-600 mb-4">
                Most teams focus on API call costs but miss the larger picture. Here's what actually drives TCO:
            </p>

            <div className="space-y-3">
                <Card className="border-l-4 border-l-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2">Evaluation Infrastructure</h4>
                    <p className="text-sm text-slate-600">
                        Golden sets, AI-as-a-judge systems, human review queues. Building and maintaining these
                        costs more than the LLM calls themselves.
                    </p>
                </Card>

                <Card className="border-l-4 border-l-purple-400">
                    <h4 className="font-semibold text-purple-800 mb-2">Prompt Engineering Time</h4>
                    <p className="text-sm text-slate-600">
                        Iterating on prompts, testing edge cases, tuning for each model. This is ongoing work,
                        not a one-time setup cost.
                    </p>
                </Card>

                <Card className="border-l-4 border-l-amber-400">
                    <h4 className="font-semibold text-amber-800 mb-2">Monitoring & Observability</h4>
                    <p className="text-sm text-slate-600">
                        Logging every request, tracking quality metrics, alerting on degradation. Essential for
                        production but often underestimated.
                    </p>
                </Card>

                <Card className="border-l-4 border-l-rose-400">
                    <h4 className="font-semibold text-rose-800 mb-2">Model Updates & Re-prompting</h4>
                    <p className="text-sm text-slate-600">
                        When providers update models, your prompts may break. Budget for regression testing and
                        re-tuning with every model version change.
                    </p>
                </Card>

                <Card className="border-l-4 border-l-green-400">
                    <h4 className="font-semibold text-green-800 mb-2">Human Review Queues</h4>
                    <p className="text-sm text-slate-600">
                        For high-stakes decisions, humans review AI outputs. The cost of reviewers often exceeds
                        the cost of the AI system itself.
                    </p>
                </Card>
            </div>

            <Card className="bg-amber-50 border-amber-200 mt-4">
                <p className="text-amber-800 font-medium">
                    Rule of thumb: If your API costs are $1000/month, budget $3000-5000/month total when you include
                    engineering time, infrastructure, and operations.
                </p>
            </Card>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="When to Stop" subtitle="Knowing when to kill or rebuild">
            <p className="text-slate-600 mb-4">
                Teams often iterate indefinitely on underperforming AI features without a clear decision framework.
                Here's how to know when to stop.
            </p>

            <div className="space-y-4">
                <Card className="bg-rose-50 border-rose-200">
                    <h4 className="font-semibold text-rose-800 mb-2">Kill the Feature When:</h4>
                    <ul className="text-sm text-rose-700 space-y-1">
                        <li>{"• Accuracy below 70% after 3 months of iteration"}</li>
                        <li>{"• Users actively avoid using it"}</li>
                        <li>{"• Cost per valuable interaction exceeds manual process"}</li>
                        <li>{"• Hallucinations create trust issues"}</li>
                        <li>{"• The business case was wrong (users don't need this)"}</li>
                    </ul>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">Rebuild from Scratch When:</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                        <li>{"• Data quality is the bottleneck (garbage in, garbage out)"}</li>
                        <li>{"• Wrong pattern choice (should have used SQL, not RAG)"}</li>
                        <li>{"• Chunking strategy fundamentally broken"}</li>
                        <li>{"• Prompt engineering can't fix architectural issues"}</li>
                    </ul>
                </Card>

                <Card className="bg-emerald-50 border-emerald-200">
                    <h4 className="font-semibold text-emerald-800 mb-2">Keep Iterating When:</h4>
                    <ul className="text-sm text-emerald-700 space-y-1">
                        <li>{"• Accuracy improving month-over-month"}</li>
                        <li>{"• Users report value despite imperfections"}</li>
                        <li>{"• Clear path to next improvement"}</li>
                        <li>{"• Cost trending down as you optimize"}</li>
                    </ul>
                </Card>
            </div>

            <Callout type="warning" title="The sunk cost trap">
                Engineering teams keep iterating because they've already invested time. Business teams need a
                clear accuracy floor and timeline. If you can't hit 80% accuracy in 6 months, the use case
                may not be viable with current technology.
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="7" title="Anti-Patterns to Avoid" subtitle="Signs you don't have a real business case">
            <div className="grid md:grid-cols-2 gap-3">
                {[
                    { bad: '"Let users ask anything about the data"', why: "Too vague. Users won't know what to ask.", better: "Define the 10 questions users actually need" },
                    { bad: '"We\'ll figure out use cases after launch"', why: "You'll build generic infrastructure that fits nothing well.", better: "Start with one specific use case, nail it, then expand" },
                    { bad: '"AI will understand what they mean"', why: "AI needs structure. Garbage in = garbage out.", better: "Design prompts and capabilities around specific patterns" },
                    { bad: '"It\'s like ChatGPT but for our data"', why: "That's a feature, not a business case.", better: "What decisions will this help people make?" },
                    { bad: '"We need RAG" or "We need agents"', why: "You're starting with a solution, not a problem.", better: "Start with the questions, then choose the right pattern" },
                    { bad: '"Everyone will use this for everything"', why: "Unfocused systems serve no one well.", better: "Build for one team's specific workflow first" },
                ].map((item, i) => (
                    <Card key={i}>
                        <p className="text-rose-600 font-medium text-sm">{"\u274C "}{item.bad}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.why}</p>
                        <p className="text-emerald-600 text-xs mt-2">{"\u2713 "}{item.better}</p>
                    </Card>
                ))}
            </div>
        </ProgressiveSection>

        <div className="rounded-xl bg-gradient-to-r from-slate-800 to-indigo-900 text-white p-6">
            <h3 className="font-semibold text-base mb-3">{"\uD83C\uDFAF The Bottom Line"}</h3>
            <div className="space-y-2 text-sm">
                <p><span className="font-medium">Without a business case:</span> You build a ChatGPT wrapper. Expensive to run, vague answers, nobody uses it.</p>
                <p><span className="font-medium">With a business case:</span> You build a tool that answers specific questions, saves real time, and becomes indispensable.</p>
                <p className="text-indigo-200 text-xs mt-3">The business case is not a formality. It's the foundation that determines whether your AI investment succeeds or fails.</p>
            </div>
        </div>

        <NextSectionNav currentId="businesscase" />
    </div>
);
