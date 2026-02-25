import React from 'react';
import { Bot, Database, FileText, Wrench } from 'lucide-react';

const Arrow = () => (
    <div className="flex justify-center py-1">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
    </div>
);

const PatternCard = ({ title, children, highlight = false }) => (
    <div className={`bg-white rounded-xl p-4 shadow-sm ${highlight ? 'border border-indigo-300 ring-1 ring-indigo-100' : 'border border-slate-200'}`}>
        <div className={`text-center py-1.5 px-3 rounded-lg font-semibold text-xs mb-4 ${highlight ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-white'}`}>
            {title}
        </div>
        <div className="space-y-2">{children}</div>
    </div>
);

const FlowBox = ({ children, color = "slate" }) => {
    const colors = {
        slate: "bg-slate-100 border-slate-200 text-slate-700",
        indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
        sky: "bg-sky-50 border-sky-200 text-sky-700",
        violet: "bg-violet-50 border-violet-200 text-violet-700",
        amber: "bg-amber-50 border-amber-200 text-amber-700",
        emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    };
    return (
        <div className={`border rounded-lg p-2.5 text-center text-xs font-medium ${colors[color]}`}>
            {children}
        </div>
    );
};

const LLMPill = ({ label = "LLM" }) => (
    <div className="bg-indigo-100 border border-indigo-200 rounded-full p-2.5 text-center text-xs font-semibold text-indigo-700">
        {label}
    </div>
);

const AIPatternComparison = () => {
    return (
        <div className="my-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-base font-semibold text-center mb-6 text-slate-800">AI Architecture Patterns Comparison</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* RAG */}
                <PatternCard title="RAG">
                    <FlowBox color="slate">Question</FlowBox>
                    <Arrow />
                    <LLMPill />
                    <div className="flex justify-center text-lg font-semibold text-slate-400">+</div>
                    <FlowBox color="sky">Knowledge Base</FlowBox>
                    <Arrow />
                    <FlowBox color="emerald">Grounded Reply</FlowBox>
                    <p className="text-[10px] text-center text-slate-500 italic mt-2">Retrieves relevant context on-the-fly</p>
                </PatternCard>

                {/* MCP */}
                <PatternCard title="MCP">
                    <FlowBox color="indigo">
                        <Bot className="w-5 h-5 mx-auto mb-1 text-indigo-500" />
                        <div>Client Agent</div>
                    </FlowBox>
                    <Arrow />
                    <div className="bg-indigo-600 border border-indigo-700 rounded-lg p-2.5 text-center text-white">
                        <FileText className="w-4 h-4 mx-auto mb-1" />
                        <div className="text-[10px] font-semibold">Model Context Protocol</div>
                    </div>
                    <Arrow />
                    <FlowBox color="sky">
                        <div className="flex justify-center gap-2 mb-1">
                            <Database className="w-4 h-4 text-sky-500" />
                            <Wrench className="w-4 h-4 text-sky-500" />
                        </div>
                        <div>Tools & Services</div>
                    </FlowBox>
                </PatternCard>

                {/* Fine-tuning */}
                <PatternCard title="Fine-tuning">
                    <FlowBox color="slate">Question</FlowBox>
                    <div className="flex justify-center text-lg font-semibold text-slate-400">+</div>
                    <div className="flex gap-2">
                        <div className="flex-1"><LLMPill /></div>
                        <div className="flex-1"><FlowBox color="violet">Knowledge (embedded)</FlowBox></div>
                    </div>
                    <Arrow />
                    <div className="bg-indigo-200 border border-indigo-300 rounded-full p-2.5 text-center text-xs font-semibold text-indigo-800">
                        LLM* (fine-tuned)
                    </div>
                    <Arrow />
                    <FlowBox color="emerald">Reply</FlowBox>
                    <p className="text-[10px] text-center text-slate-500 italic mt-2">Model weights updated with domain knowledge</p>
                </PatternCard>

                {/* Agentic AI */}
                <PatternCard title="Agentic AI">
                    <FlowBox color="slate">Question</FlowBox>
                    <Arrow />
                    <LLMPill />
                    <p className="text-[10px] text-center text-slate-500 italic">↓ decides</p>
                    <div className="grid grid-cols-2 gap-1.5">
                        <FlowBox color="amber">Tool 1 (search)</FlowBox>
                        <FlowBox color="amber">Tool 2 (calc)</FlowBox>
                    </div>
                    <FlowBox color="amber">Tool N (API)</FlowBox>
                    <p className="text-[10px] text-center text-slate-500 italic">↓ synthesizes</p>
                    <FlowBox color="emerald">Reply</FlowBox>
                    <p className="text-[10px] text-center text-slate-500 italic mt-2">Multi-step reasoning with tool execution</p>
                </PatternCard>

                {/* A2A */}
                <PatternCard title="A2A">
                    <FlowBox color="indigo">
                        <Bot className="w-5 h-5 mx-auto mb-1 text-indigo-500" />
                        <div>Client Agent</div>
                    </FlowBox>
                    <Arrow />
                    <div className="bg-indigo-600 border border-indigo-700 rounded-lg p-2.5 text-center text-white">
                        <div className="text-[10px] font-semibold">A2A Protocol</div>
                    </div>
                    <Arrow />
                    <FlowBox color="sky">
                        <div className="grid grid-cols-4 gap-1 mb-1">
                            <Bot className="w-4 h-4 text-sky-500" />
                            <Bot className="w-4 h-4 text-sky-500" />
                            <Bot className="w-4 h-4 text-sky-500" />
                            <Bot className="w-4 h-4 text-sky-500" />
                        </div>
                        <div>Remote Agents</div>
                    </FlowBox>
                </PatternCard>

                {/* Context Engineering */}
                <PatternCard title="Context Engineering">
                    <FlowBox color="slate">Question</FlowBox>
                    <Arrow />
                    <FlowBox color="violet">
                        Engineered Context
                        <div className="text-[10px] mt-0.5 opacity-75">(examples, instructions, formatting)</div>
                    </FlowBox>
                    <Arrow />
                    <LLMPill />
                    <Arrow />
                    <FlowBox color="emerald">Reply</FlowBox>
                    <p className="text-[10px] text-center text-slate-500 italic mt-2">Shapes output through prompt design</p>
                </PatternCard>

                {/* Router Pattern */}
                <PatternCard title="Router Pattern" highlight>
                    <FlowBox color="slate">Question</FlowBox>
                    <Arrow />
                    <LLMPill label="LLM (ONE call)" />
                    <p className="text-[10px] text-center text-slate-500 italic">↓ classifies intent</p>
                    <FlowBox color="indigo">
                        Code Routes
                        <div className="text-[10px] mt-0.5 opacity-75">Contract → Handler</div>
                    </FlowBox>
                    <p className="text-[10px] text-center text-slate-500 italic">↓ deterministic</p>
                    <FlowBox color="sky">Handler + RAG</FlowBox>
                    <Arrow />
                    <FlowBox color="emerald">Grounded Reply</FlowBox>
                    <p className="text-[10px] text-center text-slate-500 italic mt-2">LLM classifies, code routes deterministically</p>
                </PatternCard>

            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500 text-center">
                    <p className="font-semibold text-slate-600 mb-2">Pattern Selection Guide</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
                        <div><span className="font-medium text-slate-700">RAG:</span> Dynamic knowledge retrieval</div>
                        <div><span className="font-medium text-slate-700">MCP:</span> Standardized tool/data access</div>
                        <div><span className="font-medium text-slate-700">Fine-tuning:</span> Specialized model behavior</div>
                        <div><span className="font-medium text-slate-700">Agentic:</span> Autonomous multi-step reasoning</div>
                        <div><span className="font-medium text-slate-700">A2A:</span> Agent-to-agent collaboration</div>
                        <div><span className="font-medium text-slate-700">Context Eng:</span> Prompt optimization</div>
                        <div className="md:col-span-2"><span className="font-medium text-indigo-600">Router Pattern:</span> LLM classifies, code routes — audit trail & consistency</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIPatternComparison;
