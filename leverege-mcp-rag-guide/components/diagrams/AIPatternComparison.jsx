import React from 'react';
import { Bot, Database, FileText, Wrench, Users } from 'lucide-react';

const AIPatternComparison = () => {
    return (
        <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-center mb-6 text-gray-800">AI Architecture Patterns Comparison</h3>

            {/* Grid layout - 3 columns on desktop, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* RAG Pattern */}
                <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                    <div className="bg-black text-white text-center py-2 px-4 rounded-lg font-bold mb-4">
                        RAG
                    </div>
                    <div className="space-y-3">
                        <div className="bg-green-200 border-2 border-green-400 rounded-lg p-3 text-center font-medium">
                            Question
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-blue-200 border-2 border-blue-400 rounded-full p-3 text-center font-medium">
                            LLM
                        </div>
                        <div className="flex justify-center text-2xl font-bold">+</div>
                        <div className="bg-gray-200 border-2 border-gray-400 rounded-lg p-3 text-center font-medium">
                            Knowledge
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-orange-200 border-2 border-orange-400 rounded-lg p-3 text-center font-medium">
                            Reply
                        </div>
                        <div className="text-xs text-center text-gray-600 mt-2 italic">
                            Retrieves relevant context on-the-fly
                        </div>
                    </div>
                </div>

                {/* MCP Pattern */}
                <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                    <div className="bg-black text-white text-center py-2 px-4 rounded-lg font-bold mb-4">
                        MCP
                    </div>
                    <div className="space-y-3">
                        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-3 text-center">
                            <Bot className="w-8 h-8 mx-auto mb-1 text-blue-600" />
                            <div className="text-xs font-medium">CLIENT AGENT</div>
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-teal-600 border-2 border-teal-700 rounded-lg p-3 text-center text-white">
                            <FileText className="w-6 h-6 mx-auto mb-1" />
                            <div className="text-xs font-bold">MODEL CONTEXT</div>
                            <div className="text-xs font-bold">PROTOCOL</div>
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center">
                            <div className="flex justify-center gap-2 mb-2">
                                <Database className="w-6 h-6 text-blue-600" />
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <Wrench className="w-6 h-6 mx-auto text-blue-600" />
                            <div className="text-xs font-medium mt-2">TOOLS AND SERVICES</div>
                        </div>
                    </div>
                </div>

                {/* Fine-tuning Pattern */}
                <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                    <div className="bg-black text-white text-center py-2 px-4 rounded-lg font-bold mb-4">
                        Fine-tuning
                    </div>
                    <div className="space-y-3">
                        <div className="bg-green-200 border-2 border-green-400 rounded-lg p-3 text-center font-medium">
                            Question
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <div className="text-2xl font-bold">+</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-blue-200 border-2 border-blue-400 rounded-full p-3 text-center font-medium text-sm">
                                LLM
                            </div>
                            <div className="flex-1 bg-gray-200 border-2 border-gray-400 rounded-lg p-3 text-center font-medium text-xs">
                                Knowledge<br />(embedded)
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-blue-300 border-2 border-blue-500 rounded-full p-3 text-center font-medium">
                            LLM*
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-orange-200 border-2 border-orange-400 rounded-lg p-3 text-center font-medium">
                            Reply
                        </div>
                        <div className="text-xs text-center text-gray-600 mt-2 italic">
                            Model weights updated with domain knowledge
                        </div>
                    </div>
                </div>

                {/* Agentic AI Pattern */}
                <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                    <div className="bg-black text-white text-center py-2 px-4 rounded-lg font-bold mb-4">
                        Agentic AI
                    </div>
                    <div className="space-y-3">
                        <div className="bg-green-200 border-2 border-green-400 rounded-lg p-3 text-center font-medium">
                            Question
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-blue-200 border-2 border-blue-400 rounded-full p-3 text-center font-medium">
                            LLM
                        </div>
                        <div className="text-center text-xs text-gray-600 italic">↓ decides</div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-orange-200 border-2 border-orange-400 rounded-lg p-2 text-center text-xs font-medium">
                                Tool 1<br />(search)
                            </div>
                            <div className="bg-orange-200 border-2 border-orange-400 rounded-lg p-2 text-center text-xs font-medium">
                                Tool 2<br />(calc)
                            </div>
                        </div>
                        <div className="bg-orange-200 border-2 border-orange-400 rounded-lg p-2 text-center text-xs font-medium">
                            Tool N<br />(API)
                        </div>
                        <div className="text-center text-xs text-gray-600 italic">↓ synthesizes</div>
                        <div className="bg-orange-300 border-2 border-orange-500 rounded-lg p-3 text-center font-medium">
                            Reply
                        </div>
                        <div className="text-xs text-center text-gray-600 mt-2 italic">
                            Multi-step reasoning with tool execution
                        </div>
                    </div>
                </div>

                {/* A2A Pattern */}
                <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                    <div className="bg-black text-white text-center py-2 px-4 rounded-lg font-bold mb-4">
                        A2A
                    </div>
                    <div className="space-y-3">
                        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-3 text-center">
                            <Bot className="w-8 h-8 mx-auto mb-1 text-blue-600" />
                            <div className="text-xs font-medium">CLIENT AGENT</div>
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-teal-600 border-2 border-teal-700 rounded-lg p-3 text-center text-white">
                            <FileText className="w-6 h-6 mx-auto mb-1" />
                            <div className="text-xs font-bold">A2A PROTOCOL</div>
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center">
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <Bot className="w-6 h-6 text-blue-600" />
                                <Bot className="w-6 h-6 text-blue-600" />
                                <Bot className="w-6 h-6 text-blue-600" />
                                <Bot className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-xs font-medium">REMOTE AGENTS</div>
                        </div>
                    </div>
                </div>

                {/* Context Engineering Pattern */}
                <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                    <div className="bg-black text-white text-center py-2 px-4 rounded-lg font-bold mb-4">
                        Context Engineering
                    </div>
                    <div className="space-y-3">
                        <div className="bg-green-200 border-2 border-green-400 rounded-lg p-3 text-center font-medium">
                            Question
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-purple-200 border-2 border-purple-400 rounded-lg p-3 text-center">
                            <div className="font-medium text-sm">Engineered Context</div>
                            <div className="text-xs mt-1">(examples, instructions,</div>
                            <div className="text-xs">formatting, guidelines)</div>
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-blue-200 border-2 border-blue-400 rounded-full p-3 text-center font-medium">
                            LLM
                        </div>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div className="bg-orange-200 border-2 border-orange-400 rounded-lg p-3 text-center font-medium">
                            Reply
                        </div>
                        <div className="text-xs text-center text-gray-600 mt-2 italic">
                            Shapes output through prompt design
                        </div>
                    </div>
                </div>

            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-300">
                <div className="text-sm text-gray-600 text-center">
                    <p className="font-medium mb-2">Pattern Selection Guide:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                        <div><span className="font-semibold">RAG:</span> Dynamic knowledge retrieval</div>
                        <div><span className="font-semibold">MCP:</span> Standardized tool/data access</div>
                        <div><span className="font-semibold">Fine-tuning:</span> Specialized model behavior</div>
                        <div><span className="font-semibold">Agentic:</span> Multi-step autonomous reasoning</div>
                        <div><span className="font-semibold">A2A:</span> Agent-to-agent collaboration</div>
                        <div><span className="font-semibold">Context Eng:</span> Prompt optimization</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIPatternComparison;
