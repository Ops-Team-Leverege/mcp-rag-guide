import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, Callout, ProgressiveSection } from '../components/ui';
import { NextSectionNav } from '../index';

export const ShouldYouBuildSection = () => (
    <div className="space-y-12">
        <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">Should You Build This?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
                Before writing a single line of code, ask whether AI is actually the right tool. The most expensive
                AI mistakes happen before development starts — when the use case is wrong, not the implementation.
            </p>
        </div>

        <Callout type="danger" title="The most important question">
            <p className="text-lg leading-relaxed">
                The right question isn't "can we use AI?" — it's "does AI make this meaningfully better than the
                alternative, and are we prepared to own what happens when it's wrong?"
            </p>
        </Callout>

        <ProgressiveSection number="1" title="Don't Build If..." subtitle="Five scenarios where AI adds cost without value" defaultOpen={true}>
            <div className="space-y-6">
                <Card className="border-l-4 border-l-rose-500">
                    <div className="flex items-start gap-4">
                        <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-rose-900 mb-2 text-lg">The data is static and fits in a document</h4>
                            <p className="text-gray-700 mb-3">
                                A well-organized wiki, FAQ page, or dashboard is faster, cheaper, and more reliable than an AI system.
                                If the answer never changes, AI adds no value and introduces unnecessary failure modes.
                            </p>
                            <div className="bg-rose-50 p-4 rounded-lg text-sm">
                                <p className="font-semibold text-rose-800 mb-1">Example:</p>
                                <p className="text-rose-700">
                                    Company policies, org charts, office locations, standard procedures. These belong in documentation,
                                    not an AI system.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-rose-500">
                    <div className="flex items-start gap-4">
                        <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-rose-900 mb-2 text-lg">There's no ambiguity or reasoning needed</h4>
                            <p className="text-gray-700 mb-3">
                                If the logic is deterministic — look up a value, run a calculation, filter a list — write code.
                                AI is for tasks where the answer requires interpretation, synthesis, or judgment that can't be hardcoded.
                            </p>
                            <div className="bg-rose-50 p-4 rounded-lg text-sm">
                                <p className="font-semibold text-rose-800 mb-1">Example:</p>
                                <p className="text-rose-700">
                                    "Get all customers who signed up in Q4" → SQL query. "Summarize customer sentiment from Q4 calls" → AI.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-rose-500">
                    <div className="flex items-start gap-4">
                        <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-rose-900 mb-2 text-lg">You don't know the use cases yet</h4>
                            <p className="text-gray-700 mb-3">
                                Building before you understand the problem leads to systems that answer the wrong questions well.
                                Do product discovery first. Talk to the people who will use it. Map the actual questions they ask.
                            </p>
                            <div className="bg-rose-50 p-4 rounded-lg text-sm">
                                <p className="font-semibold text-rose-800 mb-1">Anti-pattern:</p>
                                <p className="text-rose-700">
                                    "Let's build a chatbot for our data and see what people ask." You'll optimize for the wrong thing
                                    and rebuild anyway.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-rose-500">
                    <div className="flex items-start gap-4">
                        <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-rose-900 mb-2 text-lg">You have no accuracy requirements</h4>
                            <p className="text-gray-700 mb-3">
                                If you can't define what "correct" looks like, you can't evaluate, improve, or trust the system.
                                "It seems good" is not a success criterion.
                            </p>
                            <div className="bg-rose-50 p-4 rounded-lg text-sm">
                                <p className="font-semibold text-rose-800 mb-1">Required before building:</p>
                                <p className="text-rose-700">
                                    20 example questions with verified correct answers. If you can't create this, you're not ready to build.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-rose-500">
                    <div className="flex items-start gap-4">
                        <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-rose-900 mb-2 text-lg">You need critical accuracy without human review</h4>
                            <p className="text-gray-700 mb-3">
                                AI systems make mistakes — always. For high-stakes decisions in medical, legal, financial, or
                                safety-critical contexts, always design a human review step into the workflow.
                            </p>
                            <div className="bg-rose-50 p-4 rounded-lg text-sm">
                                <p className="font-semibold text-rose-800 mb-1">The rule:</p>
                                <p className="text-rose-700">
                                    AI can augment these decisions; it should not make them autonomously. If you can't afford to be
                                    wrong, you can't afford to skip human review.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="Build If..." subtitle="When AI genuinely adds value">
            <div className="space-y-6">
                <Card className="border-l-4 border-l-emerald-500">
                    <div className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-emerald-900 mb-2 text-lg">You need to find information by meaning, not exact match</h4>
                            <p className="text-gray-700">
                                Semantic search across documents, transcripts, or conversations where users ask in natural language
                                and the system needs to understand intent.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-emerald-500">
                    <div className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-emerald-900 mb-2 text-lg">You need synthesis or summarization at scale</h4>
                            <p className="text-gray-700">
                                Extracting insights from hundreds of customer calls, summarizing feedback across sources,
                                identifying patterns in unstructured data.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-emerald-500">
                    <div className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-emerald-900 mb-2 text-lg">The task requires judgment that can't be hardcoded</h4>
                            <p className="text-gray-700">
                                Classifying sentiment, detecting urgency, routing support tickets, drafting personalized responses
                                based on context.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-emerald-500">
                    <div className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-emerald-900 mb-2 text-lg">You have a clear success metric and can tolerate errors</h4>
                            <p className="text-gray-700">
                                You know what "good" looks like, you can measure it, and the cost of being wrong occasionally
                                is acceptable given the value of being right most of the time.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="The Pre-Build Checklist" subtitle="Answer these before writing code">
            <div className="space-y-4">
                <Card className="bg-blue-50 border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-3 text-lg">1. What specific questions does this need to answer?</h4>
                    <p className="text-gray-700 mb-2">
                        Not "what can AI do?" but "what do users need to know?" Write down 10-20 actual questions.
                    </p>
                    <div className="bg-white p-3 rounded text-sm">
                        <p className="text-gray-600 italic">
                            Example: "What did the customer say about pricing?" "What action items came out of the last meeting?"
                            "Which customers mentioned competitors?"
                        </p>
                    </div>
                </Card>

                <Card className="bg-violet-50 border-violet-200">
                    <h4 className="font-bold text-violet-900 mb-3 text-lg">2. What does a correct answer look like?</h4>
                    <p className="text-gray-700 mb-2">
                        For each question, write the ideal response. This becomes your golden set.
                    </p>
                    <div className="bg-white p-3 rounded text-sm">
                        <p className="text-gray-600 italic">
                            If you can't write correct answers for 20 questions, you don't understand the problem well enough to build.
                        </p>
                    </div>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                    <h4 className="font-bold text-amber-900 mb-3 text-lg">3. What happens when the system is wrong?</h4>
                    <p className="text-gray-700 mb-2">
                        Map the failure modes and their costs. Design mitigation before building.
                    </p>
                    <div className="bg-white p-3 rounded text-sm">
                        <p className="text-gray-600 italic">
                            Example: "If we fabricate a customer commitment, we damage the relationship. Mitigation: require citations,
                            add human review for high-stakes claims."
                        </p>
                    </div>
                </Card>

                <Card className="bg-emerald-50 border-emerald-200">
                    <h4 className="font-bold text-emerald-900 mb-3 text-lg">4. How will you measure success?</h4>
                    <p className="text-gray-700 mb-2">
                        Define metrics before launch. Accuracy, latency, user satisfaction, time saved.
                    </p>
                    <div className="bg-white p-3 rounded text-sm">
                        <p className="text-gray-600 italic">
                            "It seems to work" is not a metric. "95% of answers are grounded in source documents" is.
                        </p>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <div className="rounded-xl bg-gradient-to-r from-slate-800 to-indigo-900 text-white p-8">
            <h3 className="font-bold text-xl mb-4">The Bottom Line</h3>
            <p className="text-lg leading-relaxed mb-4">
                Most AI projects fail not because the technology doesn't work, but because they were the wrong project to begin with.
            </p>
            <p className="text-indigo-200 leading-relaxed">
                Spend a week on discovery before spending a month on development. Talk to users. Map real questions.
                Define success criteria. Build your golden set. If you can't do these things, you're not ready to build.
            </p>
        </div>

        <NextSectionNav currentId="shouldyoubuild" />
    </div>
);
