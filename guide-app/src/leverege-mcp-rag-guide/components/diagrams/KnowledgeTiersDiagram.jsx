import React from 'react';
import { Database, FileText, Brain, Shield, AlertTriangle } from 'lucide-react';

export const KnowledgeTiersDiagram = () => {
    const tiers = [
        {
            tier: 1,
            name: "Authoritative",
            source: "Your database, verified docs",
            trustLevel: "Highest",
            behavior: "State as fact, cite source",
            examples: ["Pricing from product DB", "Features from SSOT", "Customer data from CRM"],
            color: "green",
            icon: Database
        },
        {
            tier: 2,
            name: "Contextual",
            source: "Meeting transcripts, emails",
            trustLevel: "Medium",
            behavior: '"According to the Dec 5 meeting..."',
            examples: ["Customer statements", "Meeting discussions", "Email threads"],
            color: "blue",
            icon: FileText
        },
        {
            tier: 3,
            name: "Advisory",
            source: "LLM general knowledge",
            trustLevel: "Lowest",
            behavior: '"Generally speaking..." or decline',
            examples: ["General best practices", "Industry knowledge", "Common patterns"],
            color: "amber",
            icon: Brain
        }
    ];

    const colorClasses = {
        green: {
            bg: "bg-green-50",
            border: "border-green-300",
            text: "text-green-800",
            iconBg: "bg-green-100",
            iconText: "text-green-600"
        },
        blue: {
            bg: "bg-blue-50",
            border: "border-blue-300",
            text: "text-blue-800",
            iconBg: "bg-blue-100",
            iconText: "text-blue-600"
        },
        amber: {
            bg: "bg-amber-50",
            border: "border-amber-300",
            text: "text-amber-800",
            iconBg: "bg-amber-100",
            iconText: "text-amber-600"
        }
    };

    return (
        <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <h4 className="text-center font-bold text-gray-800 mb-2">Knowledge Tiers Pattern</h4>
            <p className="text-center text-sm text-gray-600 mb-6">
                Different information sources have different levels of trustworthiness
            </p>

            <div className="space-y-4">
                {tiers.map((tier, index) => {
                    const Icon = tier.icon;
                    const colors = colorClasses[tier.color];

                    return (
                        <div key={index} className={`${colors.bg} border-2 ${colors.border} rounded-xl p-5 shadow-sm transition-all hover:shadow-md`}>
                            <div className="flex items-start gap-4">
                                {/* Tier Number */}
                                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.iconBg} flex items-center justify-center`}>
                                    <span className={`text-xl font-bold ${colors.iconText}`}>{tier.tier}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icon className={`w-5 h-5 ${colors.iconText}`} />
                                        <h5 className={`text-lg font-bold ${colors.text}`}>Tier {tier.tier}: {tier.name}</h5>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <div className="text-xs font-semibold text-gray-600 mb-1">SOURCE:</div>
                                            <div className={`text-sm ${colors.text}`}>{tier.source}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-600 mb-1">TRUST LEVEL:</div>
                                            <div className={`text-sm font-bold ${colors.text}`}>{tier.trustLevel}</div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="text-xs font-semibold text-gray-600 mb-1">BEHAVIOR:</div>
                                        <div className={`text-sm italic ${colors.text} bg-white/50 px-3 py-2 rounded`}>
                                            {tier.behavior}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs font-semibold text-gray-600 mb-1">EXAMPLES:</div>
                                        <div className="flex flex-wrap gap-2">
                                            {tier.examples.map((example, i) => (
                                                <span key={i} className={`text-xs ${colors.text} bg-white px-2 py-1 rounded border ${colors.border}`}>
                                                    {example}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Why Tiers Matter */}
            <div className="mt-6 p-4 bg-white border-2 border-gray-300 rounded-lg">
                <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h5 className="font-bold text-gray-900 mb-2">Why Tiers Matter</h5>
                        <p className="text-sm text-gray-700 mb-3">
                            Without tiers, the AI treats all information equally. With tiers, your assistant can be
                            helpful with everything while being honest about where each piece comes from.
                        </p>

                        <div className="grid md:grid-cols-3 gap-3 text-xs">
                            <div className="bg-green-50 border border-green-200 rounded p-2">
                                <div className="font-semibold text-green-800 mb-1">Pricing questions →</div>
                                <div className="text-green-700">Only Tier 1 (never guess)</div>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded p-2">
                                <div className="font-semibold text-blue-800 mb-1">"What did customer say?" →</div>
                                <div className="text-blue-700">Tier 2 (cite the meeting)</div>
                            </div>
                            <div className="bg-amber-50 border border-amber-200 rounded p-2">
                                <div className="font-semibold text-amber-800 mb-1">"How do I write a follow-up?" →</div>
                                <div className="text-amber-700">Tier 3 okay (general help)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Example Usage */}
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg">
                <h5 className="font-bold text-purple-900 mb-3">Example: Answering "What's our refund policy?"</h5>

                <div className="space-y-3">
                    <div className="bg-white rounded-lg border border-green-300 p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">1</div>
                            <span className="font-semibold text-green-800">Tier 1 Available:</span>
                        </div>
                        <p className="text-sm text-gray-700 ml-8">
                            "According to our policy document v2.1: 'Refunds are available within 14 days with receipt required.' [Source: policy_doc_v2.1]"
                        </p>
                    </div>

                    <div className="bg-white rounded-lg border border-blue-300 p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">2</div>
                            <span className="font-semibold text-blue-800">Tier 2 Fallback:</span>
                        </div>
                        <p className="text-sm text-gray-700 ml-8">
                            "In the March 15 meeting, Sarah mentioned that 'we typically allow 14-day returns.' [Source: Meeting transcript, March 15]"
                        </p>
                    </div>

                    <div className="bg-white rounded-lg border border-red-300 p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">✗</div>
                            <span className="font-semibold text-red-800">Tier 3 Decline:</span>
                        </div>
                        <p className="text-sm text-gray-700 ml-8">
                            "I don't have verified information about our refund policy. Let me connect you with the support team."
                        </p>
                    </div>
                </div>
            </div>

            {/* Warning */}
            <div className="mt-4 p-3 bg-amber-100 border-2 border-amber-300 rounded-lg">
                <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-amber-900 font-medium">
                            <strong>Critical Rule:</strong> Never mix tiers in a single response. If you have Tier 1 data,
                            use ONLY Tier 1. Don't supplement with Tier 3 general knowledge.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
