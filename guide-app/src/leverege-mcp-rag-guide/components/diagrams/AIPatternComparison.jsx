import React from 'react';
import { CheckCircle, XCircle, DollarSign, Zap, Clock, Database } from 'lucide-react';

const AIPatternComparison = () => {
    const patterns = [
        {
            name: "RAG",
            description: "Retrieve relevant context, then generate",
            bestFor: "Large, changing knowledge bases",
            cost: "Low-Medium",
            speed: "Medium",
            complexity: "Medium",
            dataNeeds: "Documents, transcripts, knowledge base",
            pros: ["Fresh data always", "Citations & sources", "Easy to update"],
            cons: ["Retrieval quality critical", "Context window limits", "Latency from retrieval"],
            highlight: false
        },
        {
            name: "MCP",
            description: "Standardized protocol for tools/data",
            bestFor: "Connecting AI to external systems",
            cost: "Low",
            speed: "Fast",
            complexity: "Low-Medium",
            dataNeeds: "APIs, databases, services",
            pros: ["Reusable across hosts", "Standardized interface", "Easy to extend"],
            cons: ["Requires MCP support", "Tool design matters", "Additional abstraction"],
            highlight: false
        },
        {
            name: "Fine-Tuning",
            description: "Update model weights with your data",
            bestFor: "Specialized style or domain language",
            cost: "High",
            speed: "Fast (inference)",
            complexity: "High",
            dataNeeds: "Quality training examples (1000s)",
            pros: ["Embedded knowledge", "Consistent style", "No retrieval needed"],
            cons: ["Expensive to train", "Knowledge goes stale", "Hard to update"],
            highlight: false
        },
        {
            name: "Agentic AI",
            description: "Model decides tools & execution order",
            bestFor: "Complex, unpredictable workflows",
            cost: "High",
            speed: "Slow",
            complexity: "High",
            dataNeeds: "Tool definitions, examples",
            pros: ["Autonomous reasoning", "Handles complexity", "Flexible workflows"],
            cons: ["Unpredictable behavior", "Hard to debug", "Can loop infinitely"],
            highlight: false
        },
        {
            name: "A2A",
            description: "Agents delegate to specialized agents",
            bestFor: "Distributed AI systems",
            cost: "Medium-High",
            speed: "Medium",
            complexity: "High",
            dataNeeds: "Agent protocols, interfaces",
            pros: ["Specialized expertise", "Distributed architecture", "Scalable"],
            cons: ["Complex coordination", "Network latency", "Protocol compatibility"],
            highlight: false
        },
        {
            name: "Context Engineering",
            description: "Shape output through prompt design",
            bestFor: "Specific output format or style",
            cost: "Low",
            speed: "Fast",
            complexity: "Low",
            dataNeeds: "Examples, instructions",
            pros: ["Free & instant", "Easy to iterate", "No infrastructure"],
            cons: ["Context window limits", "No external knowledge", "Model-specific"],
            highlight: false
        },
        {
            name: "Router Pattern",
            description: "LLM classifies, code routes",
            bestFor: "Predictable query types with audit trail",
            cost: "Low",
            speed: "Fast",
            complexity: "Low-Medium",
            dataNeeds: "Intent examples, handlers",
            pros: ["Predictable & debuggable", "Audit trail", "Combines patterns"],
            cons: ["Requires intent categories", "Less flexible than agentic", "Classification can fail"],
            highlight: true
        }
    ];

    const getCostColor = (cost) => {
        if (cost.includes("Low")) return "text-green-700 bg-green-50";
        if (cost.includes("Medium")) return "text-amber-700 bg-amber-50";
        return "text-rose-700 bg-rose-50";
    };

    const getSpeedColor = (speed) => {
        if (speed === "Fast") return "text-green-700 bg-green-50";
        if (speed === "Medium") return "text-amber-700 bg-amber-50";
        return "text-rose-700 bg-rose-50";
    };

    const getComplexityColor = (complexity) => {
        if (complexity.includes("Low")) return "text-green-700 bg-green-50";
        if (complexity.includes("Medium")) return "text-amber-700 bg-amber-50";
        return "text-rose-700 bg-rose-50";
    };

    return (
        <div className="my-8">
            <h3 className="text-lg font-semibold text-center mb-6 text-slate-800">AI Architecture Patterns Comparison</h3>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-slate-100 border-b-2 border-slate-200">
                            <th className="text-left p-3 font-semibold text-slate-700 text-sm">Pattern</th>
                            <th className="text-left p-3 font-semibold text-slate-700 text-sm">Best For</th>
                            <th className="text-center p-3 font-semibold text-slate-700 text-sm">Cost</th>
                            <th className="text-center p-3 font-semibold text-slate-700 text-sm">Speed</th>
                            <th className="text-center p-3 font-semibold text-slate-700 text-sm">Complexity</th>
                            <th className="text-left p-3 font-semibold text-slate-700 text-sm">Pros</th>
                            <th className="text-left p-3 font-semibold text-slate-700 text-sm">Cons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patterns.map((pattern, i) => (
                            <tr
                                key={i}
                                className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${pattern.highlight ? 'bg-indigo-50/50 hover:bg-indigo-50' : ''
                                    }`}
                            >
                                <td className="p-3">
                                    <div className={`font-semibold ${pattern.highlight ? 'text-indigo-700' : 'text-slate-800'}`}>
                                        {pattern.name}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">{pattern.description}</div>
                                </td>
                                <td className="p-3 text-sm text-slate-600">{pattern.bestFor}</td>
                                <td className="p-3">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getCostColor(pattern.cost)}`}>
                                        <DollarSign className="w-3 h-3" />
                                        {pattern.cost}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getSpeedColor(pattern.speed)}`}>
                                        <Zap className="w-3 h-3" />
                                        {pattern.speed}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getComplexityColor(pattern.complexity)}`}>
                                        <Clock className="w-3 h-3" />
                                        {pattern.complexity}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <ul className="space-y-1">
                                        {pattern.pros.map((pro, j) => (
                                            <li key={j} className="flex items-start gap-1.5 text-xs text-slate-600">
                                                <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                                                <span>{pro}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="p-3">
                                    <ul className="space-y-1">
                                        {pattern.cons.map((con, j) => (
                                            <li key={j} className="flex items-start gap-1.5 text-xs text-slate-600">
                                                <XCircle className="w-3 h-3 text-rose-600 mt-0.5 flex-shrink-0" />
                                                <span>{con}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {patterns.map((pattern, i) => (
                    <div
                        key={i}
                        className={`border rounded-lg p-4 ${pattern.highlight
                                ? 'border-indigo-300 bg-indigo-50/50'
                                : 'border-slate-200 bg-white'
                            }`}
                    >
                        <div className={`font-semibold text-base mb-1 ${pattern.highlight ? 'text-indigo-700' : 'text-slate-800'}`}>
                            {pattern.name}
                        </div>
                        <div className="text-sm text-slate-500 mb-3">{pattern.description}</div>

                        <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-600">Best For:</span>
                                <span className="text-slate-700 font-medium">{pattern.bestFor}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Cost:</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCostColor(pattern.cost)}`}>
                                    {pattern.cost}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Speed:</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSpeedColor(pattern.speed)}`}>
                                    {pattern.speed}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Complexity:</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getComplexityColor(pattern.complexity)}`}>
                                    {pattern.complexity}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                            <div>
                                <div className="text-xs font-semibold text-green-700 mb-1.5">Pros</div>
                                <ul className="space-y-1">
                                    {pattern.pros.map((pro, j) => (
                                        <li key={j} className="flex items-start gap-1 text-xs text-slate-600">
                                            <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span>{pro}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-rose-700 mb-1.5">Cons</div>
                                <ul className="space-y-1">
                                    {pattern.cons.map((con, j) => (
                                        <li key={j} className="flex items-start gap-1 text-xs text-slate-600">
                                            <XCircle className="w-3 h-3 text-rose-600 mt-0.5 flex-shrink-0" />
                                            <span>{con}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600 text-center">
                    <span className="font-semibold text-indigo-600">Router Pattern</span> is highlighted as a recommended starting point —
                    it combines LLM flexibility with code reliability, making it predictable and debuggable.
                </p>
            </div>
        </div>
    );
};

export default AIPatternComparison;
