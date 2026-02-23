import React from 'react';
import { AlertTriangle, Shield, Eye } from 'lucide-react';
import { Card, Callout, ProgressiveSection, ComparisonTable } from '../components/ui';
import { NextSectionNav } from '../index';

export const HallucinationSection = () => (
    <div className="space-y-12">
        <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">The Hallucination Problem</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
                AI models don't retrieve facts — they generate plausible text. This distinction is fundamental.
                A model that sounds confident is not a model that is correct.
            </p>
        </div>

        <Callout type="danger" title="The core issue">
            <p className="text-lg leading-relaxed">
                Understanding how hallucination happens is the first step to preventing it. Models don't "know" when
                they're making things up — they generate what should statistically come next.
            </p>
        </Callout>

        <ProgressiveSection number="1" title="Three Hallucination Mechanisms" subtitle="How models generate confident wrong answers" defaultOpen={true}>
            <div className="space-y-6">
                <Card className="border-l-4 border-l-rose-500">
                    <h4 className="font-bold text-rose-900 mb-3 text-lg">1. Gap Filling</h4>
                    <p className="text-gray-700 mb-4">
                        When context is incomplete, models fill the gap with the most statistically plausible continuation.
                        There is no signal that information is missing — the model simply generates what should be there.
                    </p>
                    <div className="bg-rose-50 p-4 rounded-lg">
                        <p className="font-semibold text-rose-800 mb-2">Example:</p>
                        <p className="text-sm text-rose-700 mb-3">
                            <strong>Prompt:</strong> "What were Q3 results for the APAC region?"
                        </p>
                        <p className="text-sm text-rose-700">
                            If APAC data is absent from the provided context, the model may generate plausible-sounding
                            numbers rather than reporting that the data isn't available. The output looks identical to a
                            grounded response.
                        </p>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                    <h4 className="font-bold text-orange-900 mb-3 text-lg">2. Confabulation</h4>
                    <p className="text-gray-700 mb-4">
                        The model invents specific details — names, dates, citations, statistics — with no source material
                        at all, and expresses them with full confidence. This is most dangerous for requests that imply
                        facts should exist.
                    </p>
                    <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="font-semibold text-orange-800 mb-2">Example:</p>
                        <p className="text-sm text-orange-700 mb-3">
                            <strong>Prompt:</strong> "Cite three studies on customer churn in SaaS."
                        </p>
                        <p className="text-sm text-orange-700">
                            Without real studies in context, the model will generate plausible-sounding fake citations.
                            Author names, journal names, and publication years will all look real.
                        </p>
                    </div>
                </Card>

                <Card className="border-l-4 border-l-amber-500">
                    <h4 className="font-bold text-amber-900 mb-3 text-lg">3. Selective Omission and Distortion</h4>
                    <p className="text-gray-700 mb-4">
                        The model softens negatives, loses critical nuance, or drops signals that feel uncomfortable —
                        particularly in summarization. This is the most insidious form because the output isn't wrong —
                        it's just misleading.
                    </p>
                    <div className="bg-amber-50 p-4 rounded-lg">
                        <p className="font-semibold text-amber-800 mb-2">Example:</p>
                        <p className="text-sm text-amber-700 mb-3">
                            <strong>Source text:</strong> "We need this fixed before renewal or we're walking."
                        </p>
                        <p className="text-sm text-amber-700">
                            <strong>Summarized as:</strong> "Customer mentioned the renewal timeline."
                        </p>
                        <p className="text-sm text-amber-700 mt-2">
                            The sentiment and urgency are gone. A customer who expressed frustration becomes "shared some concerns."
                        </p>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="Prevention Techniques" subtitle="How to reduce hallucination systematically">
            <ComparisonTable
                headers={["Technique", "How to Apply", "Effectiveness"]}
                rows={[
                    [
                        "Extractive prompting",
                        '"Answer only using information explicitly stated in the context below."',
                        "High — forces grounding"
                    ],
                    [
                        "Citation requirements",
                        '"For every claim, include a direct quote from the source."',
                        "High — makes hallucination detectable"
                    ],
                    [
                        "Null state instructions",
                        '"If the answer is not present in the context, respond: \'I don\'t have that information.\'"',
                        "High — prevents gap filling"
                    ],
                    [
                        "Temperature = 0",
                        "Reduces randomness for factual retrieval tasks",
                        "Medium — reduces variance, not a cure"
                    ],
                    [
                        "Negative framing protection",
                        '"Do not soften, reframe, or generalize negative statements. Preserve the original tone."',
                        "High — prevents distortion"
                    ],
                    [
                        "Self-consistency sampling",
                        "Run the same prompt 3 times with temperature > 0. Flag answers that diverge across runs.",
                        "Medium — catches inconsistency"
                    ]
                ]}
            />

            <Callout type="insight" title="Layered defense">
                <p className="text-lg leading-relaxed">
                    No single technique eliminates hallucination. Use multiple layers: extractive prompting + citation
                    requirements + null state instructions + output validation. Defense in depth.
                </p>
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="Detection Strategies" subtitle="How to catch hallucinations in production">
            <div className="space-y-4">
                <Card className="bg-blue-50 border-blue-200">
                    <div className="flex items-start gap-4">
                        <Eye className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-blue-900 mb-2 text-lg">Citation Verification</h4>
                            <p className="text-gray-700 mb-3">
                                After generation, check that every cited quote actually exists in the retrieved context.
                                This catches confabulation.
                            </p>
                            <div className="bg-white p-3 rounded text-sm">
                                <p className="text-gray-600">
                                    Implementation: String matching or fuzzy matching against source chunks. Flag responses
                                    where citations don't match.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="bg-violet-50 border-violet-200">
                    <div className="flex items-start gap-4">
                        <Eye className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-violet-900 mb-2 text-lg">Consistency Sampling</h4>
                            <p className="text-gray-700 mb-3">
                                Run the same prompt multiple times with temperature {">"} 0. If answers diverge significantly,
                                the model is uncertain — flag for review.
                            </p>
                            <div className="bg-white p-3 rounded text-sm">
                                <p className="text-gray-600">
                                    Cost: 3x generation calls. Use selectively for high-stakes queries or as a quality audit sample.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="bg-emerald-50 border-emerald-200">
                    <div className="flex items-start gap-4">
                        <Eye className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-emerald-900 mb-2 text-lg">Human Review Queue</h4>
                            <p className="text-gray-700 mb-3">
                                For high-stakes outputs, route a sample to human review. This is the only reliable way to
                                catch hallucinations that pass automated checks.
                            </p>
                            <div className="bg-white p-3 rounded text-sm">
                                <p className="text-gray-600">
                                    Strategy: 100% review for first 2 weeks, then 10-20% random sample ongoing. Flag low-confidence
                                    responses for priority review.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                    <div className="flex items-start gap-4">
                        <Eye className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-amber-900 mb-2 text-lg">Sentiment Preservation Check</h4>
                            <p className="text-gray-700 mb-3">
                                For summarization tasks, verify that negative sentiment, urgency, and strong language from
                                the source is preserved in the output.
                            </p>
                            <div className="bg-white p-3 rounded text-sm">
                                <p className="text-gray-600">
                                    Implementation: Use a second LLM call to compare source sentiment vs. summary sentiment.
                                    Flag mismatches.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="Real-World Example: The Audit" subtitle="What hallucination looks like in production">
            <Card className="bg-gradient-to-r from-rose-50 to-orange-50 border-rose-200">
                <h4 className="font-bold text-rose-900 mb-4 text-lg">Case Study: Meeting Intelligence System</h4>
                <p className="text-gray-700 mb-4">
                    A team building a meeting intelligence tool audited their extraction pipeline across 120 transcripts
                    and 999 product insights before building the conversational layer. The results were instructive:
                </p>
                <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-rose-800 mb-1">Only 6.9% of extracted quotes were verbatim</p>
                        <p className="text-sm text-gray-600">
                            The LLM was paraphrasing 93% of the time, silently losing customer tone and nuance.
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-orange-800 mb-1">Only 22% of Q&A answers were strongly grounded</p>
                        <p className="text-sm text-gray-600">
                            The rest synthesized across multiple parts of the conversation, introducing interpretation.
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-amber-800 mb-1">High-value categories were systematically missed</p>
                        <p className="text-sm text-gray-600">
                            Competitive mentions, buying signals, and decision process signals were dropped or distorted.
                        </p>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                    <p className="font-semibold text-emerald-900 mb-2">The Fix:</p>
                    <p className="text-sm text-emerald-800">
                        Switched to extractive prompting over raw transcripts with explicit instructions to preserve
                        original tone. Pre-extracted structured data became a completeness checklist, never ground truth.
                    </p>
                </div>
            </Card>

            <Callout type="success" title="The lesson">
                <p className="text-lg leading-relaxed">
                    This audit was the most valuable thing they did. Build your golden set and evaluate before you build
                    the conversational layer on top. Hallucination isn't a bug you fix later — it's a design constraint
                    you architect around from day one.
                </p>
            </Callout>
        </ProgressiveSection>

        <div className="rounded-xl bg-gradient-to-r from-slate-800 to-rose-900 text-white p-8">
            <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-xl mb-4">The Production Rule</h3>
                    <p className="text-lg leading-relaxed mb-4">
                        Hallucination is not a model limitation you can prompt away. It's a fundamental property of how
                        language models work.
                    </p>
                    <p className="text-rose-200 leading-relaxed">
                        Your job is not to eliminate hallucination — that's impossible. Your job is to design systems
                        where hallucinations are detectable, containable, and don't reach users. Grounding, citations,
                        null states, and human review aren't optional features — they're the foundation.
                    </p>
                </div>
            </div>
        </div>

        <NextSectionNav currentId="hallucination" />
    </div>
);
