import React from 'react';
import { XCircle, CheckCircle, AlertTriangle } from 'lucide-react';

const BeforeYouBuildDiagram = () => {
    const dontBuildScenarios = [
        {
            situation: "<50 static questions with fixed answers",
            solution: "Knowledge base (Notion AI, Confluence)",
            why: "No retrieval needed — just serve pre-written answers"
        },
        {
            situation: "Simple API chaining (no interpretation)",
            solution: "Zapier / Make / n8n",
            why: "Automation, not intelligence"
        },
        {
            situation: "No proprietary data",
            solution: "Use ChatGPT / Claude directly",
            why: "You don't have a data advantage worth engineering for"
        },
        {
            situation: "<100 queries/month",
            solution: "Manual process + templates",
            why: "The engineering cost exceeds the time saved"
        },
        {
            situation: "Can't define 5 specific questions users need answered",
            solution: "Stop and do user research first",
            why: "If you can't name the questions, you can't evaluate the answers"
        },
        {
            situation: "No one owns the data (stale CRM, scattered docs)",
            solution: "Fix your data first",
            why: "AI amplifies data quality — good or bad"
        }
    ];

    const buildWhenScenarios = [
        "Proprietary data that must stay private (meeting transcripts, internal docs, customer records)",
        "Complex routing needs — different data sources, authority levels, or output formats",
        "Audit requirements — you need to explain exactly WHY the system said what it said",
        "Team-wide access — the system needs to work for everyone, not just the expert",
        "Real-time requirements — users need answers from live data, not a static export"
    ];

    return (
        <div className="my-6 space-y-6">
            {/* Don't Build Section */}
            <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
                <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-8 h-8 text-red-600" />
                    <h3 className="text-xl font-bold text-red-800">Don't Build If...</h3>
                </div>
                <p className="text-sm text-red-700 mb-4">
                    Before committing to a custom AI agent, run through this checklist. If any apply, there's a simpler solution:
                </p>

                <div className="space-y-3">
                    {dontBuildScenarios.map((scenario, index) => (
                        <div key={index} className="bg-white rounded-lg border-2 border-red-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-red-900 mb-1">{scenario.situation}</div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-red-600">→</span>
                                        <span className="text-sm text-green-700 font-medium">{scenario.solution}</span>
                                    </div>
                                    <div className="text-xs text-gray-600 italic">{scenario.why}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Build When Section */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
                <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <h3 className="text-xl font-bold text-green-800">Build When...</h3>
                </div>
                <p className="text-sm text-green-700 mb-4">
                    A custom agent is worth the investment when you have:
                </p>

                <div className="space-y-2">
                    {buildWhenScenarios.map((scenario, index) => (
                        <div key={index} className="flex items-start gap-3 bg-white rounded-lg border border-green-200 p-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-800">{scenario}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Time Investment Reality */}
            <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-300">
                <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-amber-600" />
                    <h3 className="text-xl font-bold text-amber-800">The Time Investment Reality</h3>
                </div>
                <p className="text-sm text-amber-700 mb-4">
                    Don't underestimate the upfront work:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg border border-amber-200 p-4">
                        <div className="font-semibold text-amber-900 mb-2">Phase Timeline</div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-700">Data preparation</span>
                                <span className="font-mono text-amber-700">2-4 weeks</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700">Core architecture</span>
                                <span className="font-mono text-amber-700">2-3 weeks</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700">Prompt engineering</span>
                                <span className="font-mono text-amber-700">1-2 weeks</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700">Testing & debugging</span>
                                <span className="font-mono text-amber-700">1-2 weeks</span>
                            </div>
                            <div className="border-t border-amber-200 pt-2 mt-2 flex justify-between font-bold">
                                <span className="text-amber-900">Total</span>
                                <span className="font-mono text-amber-800">6-11 weeks</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-amber-200 p-4">
                        <div className="font-semibold text-amber-900 mb-2">What Takes Time</div>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600">•</span>
                                <span>Cleaning transcripts, setting up SSOT</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600">•</span>
                                <span>Building ingestion pipeline</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600">•</span>
                                <span>Intent classification & routing</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600">•</span>
                                <span>System prompts & few-shot examples</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600">•</span>
                                <span>Golden test set & edge cases</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded-lg">
                    <p className="text-sm text-amber-900 font-medium">
                        ⚠️ The ingestion pipeline and data prep take longer than the AI code. Plan for that.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BeforeYouBuildDiagram;
