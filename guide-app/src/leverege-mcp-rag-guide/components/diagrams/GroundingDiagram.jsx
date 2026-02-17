import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const GroundingDiagram = () => {
    const [showComparison, setShowComparison] = useState(false);

    return (
        <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
            <h4 className="text-center font-semibold text-slate-800 mb-4">Grounding: The Solution to Hallucination</h4>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Without Grounding */}
                <div className="bg-white rounded-lg border border-red-300 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <XCircle className="w-6 h-6 text-red-600" />
                        <h5 className="font-semibold text-red-800">Without Grounding</h5>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-red-50 border border-red-200 rounded p-3">
                            <div className="text-xs font-semibold text-red-600 mb-1">USER ASKS:</div>
                            <div className="text-sm text-red-800">"What's our refund policy?"</div>
                        </div>

                        <div className="flex justify-center">
                            <div className="text-2xl text-red-400">↓</div>
                        </div>

                        <div className="bg-red-100 border border-red-300 rounded p-3">
                            <div className="text-xs font-semibold text-red-700 mb-1">LLM GENERATES:</div>
                            <div className="text-sm text-red-900 italic">
                                "Our standard refund policy allows returns within 30 days of purchase with receipt..."
                            </div>
                        </div>

                        <div className="bg-red-200 border border-red-400 rounded p-3">
                            <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-700 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-red-900">
                                    <strong>Problem:</strong> Plausible but potentially wrong. The LLM made this up based on training data, not your actual policy.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* With Grounding */}
                <div className="bg-white rounded-lg border border-green-300 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <h5 className="font-semibold text-green-800">With Grounding</h5>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                            <div className="text-xs font-semibold text-green-600 mb-1">USER ASKS:</div>
                            <div className="text-sm text-green-800">"What's our refund policy?"</div>
                        </div>

                        <div className="flex justify-center">
                            <div className="text-2xl text-green-400">↓</div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <div className="text-xs font-semibold text-blue-600 mb-1">SYSTEM RETRIEVES:</div>
                            <div className="text-xs font-mono text-blue-800 bg-white p-2 rounded">
                                policy_doc_v2.1: "Refunds available within 14 days with receipt required"
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="text-2xl text-green-400">↓</div>
                        </div>

                        <div className="bg-green-100 border border-green-300 rounded p-3">
                            <div className="text-xs font-semibold text-green-700 mb-1">LLM RESPONDS:</div>
                            <div className="text-sm text-green-900">
                                "According to policy document v2.1: 'Refunds are available within 14 days with receipt required.'"
                            </div>
                            <div className="text-xs text-green-700 mt-2 font-mono bg-green-50 p-1 rounded">
                                [Source: policy_doc_v2.1]
                            </div>
                        </div>

                        <div className="bg-green-200 border border-green-400 rounded p-3">
                            <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-green-900">
                                    <strong>Result:</strong> Verifiable and citable. Every claim is backed by source data.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-300 rounded-lg">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <div className="font-semibold text-amber-800 mb-1">The Cite or Abstain Rule</div>
                        <div className="text-sm text-amber-900">
                            If the AI cannot cite a specific source for a claim, it should not make the claim.
                            This is the foundation of trustworthy AI systems.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroundingDiagram;
