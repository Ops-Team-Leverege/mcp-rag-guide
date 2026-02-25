import React from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export const DebugFlowDiagram = () => {
    const steps = [
        {
            step: 1,
            title: "Intent Classification",
            time: "30 seconds",
            check: "Was the intent correct?",
            problem: "If the system routed a meeting question to PRODUCT_KNOWLEDGE, no amount of prompt fixing will help",
            action: "Check your logs for the intent",
            color: "blue"
        },
        {
            step: 2,
            title: "Entity Resolution",
            time: "30 seconds",
            check: "Did it resolve the right company, meeting, or document?",
            problem: "If entity resolution failed, everything downstream is wrong",
            action: 'Check: "Acme" → company_id resolution',
            color: "purple"
        },
        {
            step: 3,
            title: "Retrieval",
            time: "2 minutes",
            check: "What data was actually retrieved?",
            problem: "90% of errors live here. Wrong data = wrong answer",
            action: "Check: How many chunks? Were they relevant? Right meeting?",
            color: "green",
            highlight: true
        },
        {
            step: 4,
            title: "Context Assembly",
            time: "1 minute",
            check: "Was the prompt assembled correctly?",
            problem: "Hitting context limits or missing evidence",
            action: "Check: Total token count, evidence position, system prompt intact",
            color: "amber"
        },
        {
            step: 5,
            title: "LLM Response",
            time: "1 minute",
            check: "Did the LLM follow instructions?",
            problem: "Only check this AFTER steps 1-4 are correct",
            action: "Check: Format followed? Sources cited? Hallucination?",
            color: "red"
        }
    ];

    const colorClasses = {
        blue: "bg-blue-100 border-blue-300 text-blue-800",
        purple: "bg-purple-100 border-purple-300 text-purple-800",
        green: "bg-green-100 border-green-400 text-green-800",
        amber: "bg-amber-100 border-amber-300 text-amber-800",
        red: "bg-red-100 border-red-300 text-red-800"
    };

    return (
        <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <h4 className="text-center font-bold text-gray-800 mb-2">The 5-Minute Debug Protocol</h4>
            <p className="text-center text-sm text-gray-600 mb-6">
                When a query gives a bad answer, check in this order. Most problems are found in steps 1-3.
            </p>

            <div className="space-y-3">
                {steps.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className={`${colorClasses[item.color]} ${item.highlight ? 'border-4' : 'border-2'} rounded-xl p-4 shadow-sm transition-all hover:shadow-md`}>
                            <div className="flex items-start gap-4">
                                {/* Step Number */}
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center">
                                        <span className="text-lg font-bold">{item.step}</span>
                                    </div>
                                    <div className="text-xs text-center mt-1 font-mono">{item.time}</div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h5 className="font-bold text-lg mb-2">{item.title}</h5>

                                    <div className="space-y-2">
                                        <div className="bg-white/50 rounded p-2">
                                            <div className="text-xs font-semibold mb-1">CHECK:</div>
                                            <div className="text-sm">{item.check}</div>
                                        </div>

                                        <div className="bg-white/50 rounded p-2">
                                            <div className="text-xs font-semibold mb-1">ACTION:</div>
                                            <div className="text-sm font-mono text-xs">{item.action}</div>
                                        </div>

                                        <div className="bg-white/50 rounded p-2">
                                            <div className="text-xs font-semibold mb-1 flex items-center gap-1">
                                                <AlertTriangle className="w-3 h-3" />
                                                PROBLEM IF WRONG:
                                            </div>
                                            <div className="text-sm italic">{item.problem}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {item.highlight && (
                                <div className="mt-3 p-2 bg-green-200 border border-green-400 rounded">
                                    <p className="text-xs font-bold text-green-900">
                                        90% OF ERRORS LIVE HERE — Check retrieval first!
                                    </p>
                                </div>
                            )}
                        </div>

                        {index < steps.length - 1 && (
                            <div className="flex justify-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Common Failure Patterns */}
            <div className="mt-6 p-4 bg-white border-2 border-gray-300 rounded-lg">
                <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-600" />
                    Common Failure Patterns
                </h5>

                <div className="space-y-2">
                    {[
                        { symptom: "Wrong answer", cause: "Bad retrieval or missing data", fix: "Check retrieval logs, verify data exists" },
                        { symptom: "Hallucination", cause: "Insufficient grounding", fix: 'Add "only use provided context" constraint' },
                        { symptom: "Format errors", cause: "Unclear output spec", fix: "Add explicit format instructions + examples" },
                        { symptom: "Wrong intent", cause: "Classification failure", fix: "Add training examples for edge cases" },
                        { symptom: "Slow response", cause: "Too much context", fix: "Reduce chunk count, optimize retrieval" },
                        { symptom: "Confident but wrong", cause: "Wrong chunks retrieved OR speaker misattribution", fix: "Log retrieval → check embeddings → verify metadata" },
                        { symptom: "Same question, different answers", cause: "Temperature too high OR non-deterministic retrieval", fix: "Use temp=0 for factual queries, fix retrieval ordering" }
                    ].map((pattern, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm bg-gray-50 rounded p-3 border border-gray-200">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs mt-0.5">
                                !
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-gray-900">{pattern.symptom}</div>
                                <div className="text-gray-600 text-xs mt-0.5">
                                    <span className="text-red-600">Cause:</span> {pattern.cause}
                                </div>
                                <div className="text-gray-600 text-xs mt-0.5">
                                    <span className="text-green-600">Fix:</span> {pattern.fix}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* The Structured Debug Log */}
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg">
                <h5 className="font-bold text-blue-900 mb-2">The Structured Debug Log (Build This Early)</h5>
                <p className="text-sm text-blue-800 mb-3">Every request should log:</p>

                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto font-mono">
                    {`{
  "request_id": "abc123",
  "user_query": "What did Acme say about pricing?",
  "intent": "SINGLE_MEETING",
  "intent_method": "keyword_fast_path",
  "entities_resolved": {
    "company": "Acme Corp",
    "meeting_id": "m_456"
  },
  "retrieval": {
    "chunks_found": 5,
    "source": "meeting_transcript"
  },
  "context_tokens": 2400,
  "llm_model": "gpt-4o",
  "response_time_ms": 3200,
  "citations": 3
}`}
                </pre>

                <p className="text-xs text-blue-700 mt-2">
                    Query this to find patterns: Which intents have low accuracy? Which queries retrieve no data? Which responses are slowest?
                </p>
            </div>

            {/* Key Insight */}
            <div className="mt-4 p-4 bg-purple-100 border-2 border-purple-300 rounded-lg">
                <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h5 className="font-bold text-purple-900 mb-1">Key Insight</h5>
                        <p className="text-sm text-purple-800">
                            Most "AI errors" are actually <strong>retrieval errors</strong> or <strong>prompt errors</strong>,
                            not LLM errors. Debug those first before blaming the model.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
