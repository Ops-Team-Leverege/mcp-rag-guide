import React from 'react';
import { Card, Callout, ProgressiveSection, ComparisonTable, DiagramBox } from '../components/ui';
import { NextSectionNav } from '../index';

export const BusinessCaseSection = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-slate-900">Start With the Business Case</h2>

        <Callout type="danger" title="The Most Common Mistake">
            Building AI solutions without knowing what questions you need answered.
            Without a clear business case, you're just building a commercial AI wrapper —
            expensive, unfocused, and unlikely to deliver value.
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

        <ProgressiveSection number="4" title="Anti-Patterns to Avoid" subtitle="Signs you don't have a real business case">
            <div className="grid md:grid-cols-2 gap-3">
                {[
                    { bad: '"Let users ask anything about the data"', why: "Too vague. Users won't know what to ask.", better: "Define the 10 questions users actually need" },
                    { bad: '"We\'ll figure out use cases after launch"', why: "You'll build generic infrastructure that fits nothing well.", better: "Start with one specific use case, nail it, then expand" },
                    { bad: '"AI will understand what they mean"', why: "AI needs structure. Garbage in = garbage out.", better: "Design prompts and capabilities around specific patterns" },
                    { bad: '"It\'s like ChatGPT but for our data"', why: "That's a feature, not a business case.", better: "What decisions will this help people make?" },
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
