import React from 'react';
import { MessageSquare, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const ThreadContextDiagram = () => {
    return (
        <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
            <h4 className="text-center font-semibold text-slate-800 mb-2">Thread Context Pattern</h4>
            <p className="text-center text-sm text-slate-500 mb-6">
                THE RULE: Reuse entity IDs, never prior answers
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Correct Pattern */}
                <div className="bg-white rounded-lg border border-green-300 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <h5 className="font-semibold text-green-800">✓ Correct: Reuse Entity IDs</h5>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <MessageSquare className="w-4 h-4 text-blue-600" />
                                <span className="text-xs font-semibold text-blue-600">USER (Turn 1):</span>
                            </div>
                            <p className="text-sm text-blue-800">"Summarize the Acme meeting"</p>
                        </div>

                        <div className="flex justify-center">
                            <div className="text-slate-400">↓</div>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded p-3">
                            <div className="text-xs font-semibold text-purple-600 mb-1">SYSTEM RESOLVES:</div>
                            <div className="text-xs font-mono bg-white p-2 rounded">
                                meetingId: "abc123"<br />
                                companyId: "acme-corp"
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="text-slate-400">↓</div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <RefreshCw className="w-4 h-4 text-green-600" />
                                <span className="text-xs font-semibold text-green-600">AI RESPONDS:</span>
                            </div>
                            <p className="text-xs text-green-800 italic">
                                "The Acme meeting covered pricing concerns and timeline..."
                            </p>
                        </div>

                        <div className="border-t-2 border-green-300 pt-3 mt-3">
                            <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <MessageSquare className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs font-semibold text-blue-600">USER (Turn 2):</span>
                                </div>
                                <p className="text-sm text-blue-800">"What about the action items?"</p>
                            </div>

                            <div className="flex justify-center my-2">
                                <div className="text-slate-400">↓</div>
                            </div>

                            <div className="bg-purple-50 border border-purple-200 rounded p-3">
                                <div className="text-xs font-semibold text-purple-600 mb-1">SYSTEM REUSES:</div>
                                <div className="text-xs font-mono bg-white p-2 rounded">
                                    meetingId: "abc123" ← SAME<br />
                                    companyId: "acme-corp" ← SAME
                                </div>
                                <div className="text-xs text-purple-700 mt-2">
                                    ✓ Queries meeting data directly<br />
                                    ✓ NOT the prior AI response
                                </div>
                            </div>

                            <div className="flex justify-center my-2">
                                <div className="text-slate-400">↓</div>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <RefreshCw className="w-4 h-4 text-green-600" />
                                    <span className="text-xs font-semibold text-green-600">AI RESPONDS:</span>
                                </div>
                                <p className="text-xs text-green-800 italic">
                                    "Action items: 1) Send proposal by Friday..."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                        <p className="text-xs text-green-900 font-medium">
                            Each response is grounded in source data, not in prior AI outputs
                        </p>
                    </div>
                </div>

                {/* Wrong Pattern */}
                <div className="bg-white rounded-lg border border-red-300 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <XCircle className="w-6 h-6 text-red-600" />
                        <h5 className="font-semibold text-red-800">✗ Wrong: Include Prior Answers</h5>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <MessageSquare className="w-4 h-4 text-blue-600" />
                                <span className="text-xs font-semibold text-blue-600">USER (Turn 1):</span>
                            </div>
                            <p className="text-sm text-blue-800">"Summarize the Acme meeting"</p>
                        </div>

                        <div className="flex justify-center">
                            <div className="text-slate-400">↓</div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <RefreshCw className="w-4 h-4 text-green-600" />
                                <span className="text-xs font-semibold text-green-600">AI RESPONDS:</span>
                            </div>
                            <p className="text-xs text-green-800 italic">
                                "The Acme meeting covered pricing concerns and timeline..."
                            </p>
                        </div>

                        <div className="border-t-2 border-red-300 pt-3 mt-3">
                            <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <MessageSquare className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs font-semibold text-blue-600">USER (Turn 2):</span>
                                </div>
                                <p className="text-sm text-blue-800">"What about the action items?"</p>
                            </div>

                            <div className="flex justify-center my-2">
                                <div className="text-slate-400">↓</div>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded p-3">
                                <div className="text-xs font-semibold text-red-600 mb-1">SYSTEM INCLUDES:</div>
                                <div className="text-xs font-mono bg-white p-2 rounded">
                                    priorAnswer: "The Acme meeting<br />
                                    covered pricing concerns..."
                                </div>
                                <div className="text-xs text-red-700 mt-2">
                                    ✗ AI references its own claims<br />
                                    ✗ Not the source data
                                </div>
                            </div>

                            <div className="flex justify-center my-2">
                                <div className="text-slate-400">↓</div>
                            </div>

                            <div className="bg-red-100 border border-red-300 rounded p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <RefreshCw className="w-4 h-4 text-red-600" />
                                    <span className="text-xs font-semibold text-red-600">AI RESPONDS:</span>
                                </div>
                                <p className="text-xs text-red-800 italic">
                                    "Based on the summary, the action items include..."
                                </p>
                                <div className="mt-2 p-2 bg-red-200 rounded">
                                    <p className="text-xs text-red-900 font-medium">
                                        ⚠️ HALLUCINATION RISK: AI is citing itself, not the meeting
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                        <p className="text-xs text-red-900 font-medium">
                            Creates a hallucination feedback loop — AI starts citing itself instead of evidence
                        </p>
                    </div>
                </div>
            </div>

            {/* What to Carry Forward */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-lg">
                <h5 className="font-semibold text-blue-900 mb-3">Thread Context (What to Carry Forward):</h5>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <div className="font-semibold text-green-700 mb-2">✓ DO Carry Forward:</div>
                        <ul className="text-sm text-green-800 space-y-1">
                            <li>• <code className="bg-green-100 px-1 rounded">meetingId</code> — Reuse resolved entity</li>
                            <li>• <code className="bg-green-100 px-1 rounded">companyId</code> — Reuse resolved entity</li>
                            <li>• <code className="bg-green-100 px-1 rounded">userId</code> — For access control</li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-semibold text-red-700 mb-2">✗ NEVER Carry Forward:</div>
                        <ul className="text-sm text-red-800 space-y-1">
                            <li>• <code className="bg-red-100 px-1 rounded">priorAnswer</code> — Creates hallucination loop</li>
                            <li>• <code className="bg-red-100 px-1 rounded">conversationHistory</code> — AI cites itself</li>
                            <li>• <code className="bg-red-100 px-1 rounded">previousSummary</code> — Not source data</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-300 rounded-lg">
                <h5 className="font-semibold text-purple-900 mb-2">How It Works in Practice:</h5>
                <ol className="text-sm text-purple-800 space-y-2">
                    <li><strong>1.</strong> User asks: "Summarize the Acme meeting" → system resolves <code className="bg-purple-100 px-1 rounded">meetingId</code>, generates summary</li>
                    <li><strong>2.</strong> User follows up: "What were the action items?" → system reuses <code className="bg-purple-100 px-1 rounded">meetingId</code>, queries meeting data directly (not the summary it just generated)</li>
                    <li><strong>3.</strong> Each response is grounded in source data, not in prior AI outputs</li>
                </ol>
            </div>
        </div>
    );
};

export default ThreadContextDiagram;
