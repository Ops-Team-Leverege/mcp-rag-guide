import React from 'react';
import { Cpu, AlertTriangle, CheckCircle, DollarSign, Clock, Zap } from 'lucide-react';
import { Card, Callout, ProgressiveSection, DiagramBox, ComparisonTable } from '../../components/ui';
import { NextSectionNav } from '../../index';

export const FineTuningPatternSection = () => (
    <div className="space-y-12">
        <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">Fine-Tuning</h2>
            <p className="text-xl text-gray-600">
                Update the model's weights directly with domain-specific data, so knowledge or behavior becomes part of the model itself.
            </p>
        </div>

        <Callout type="warning" title="The Most Misunderstood Pattern">
            <p className="text-lg leading-relaxed">
                Teams hear "fine-tuning" and think it's how you make AI better. For most use cases, it's not.
                Understanding when fine-tuning actually helps — and when it's a waste of time and money — is critical.
            </p>
        </Callout>

        <ProgressiveSection number="1" title="How Fine-Tuning Works" subtitle="Training on your data" defaultOpen={true}>
            <DiagramBox title="Fine-Tuning Flow">
                {`Question + [LLM* with embedded domain knowledge] → Response
           (* weights updated with your training data)`}
            </DiagramBox>

            <div className="mt-6 space-y-4">
                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">The Process</h4>
                    <ol className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-3">
                            <span className="font-semibold text-indigo-600">1.</span>
                            <span>Prepare a dataset of input-output pairs that demonstrate the behavior you want (typically 1,000+ examples)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="font-semibold text-indigo-600">2.</span>
                            <span>The base model is trained on this data, adjusting its weights to reproduce the patterns</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="font-semibold text-indigo-600">3.</span>
                            <span>The resulting model responds differently — with domain-specific behavior baked in</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="font-semibold text-indigo-600">4.</span>
                            <span>Deploy the custom model endpoint (separate from the base model)</span>
                        </li>
                    </ol>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="Fine-Tuning is for Behavior, RAG is for Knowledge" subtitle="The critical distinction">
            <Callout type="insight" title="This Distinction Matters Deeply">
                <p className="text-lg leading-relaxed">
                    Fine-tuning teaches the model <strong>how</strong> to respond — tone, format, domain-specific reasoning style,
                    specialized task patterns. RAG gives the model <strong>what</strong> to respond with — specific facts,
                    recent data, proprietary content.
                </p>
            </Callout>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Card className="p-6 bg-purple-50 border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-3">Fine-Tuning</h4>
                    <p className="text-gray-700 mb-4">Teaches <em>how</em> to respond</p>
                    <div className="bg-white p-4 rounded-lg text-sm space-y-2">
                        <p className="text-gray-600"><strong>Examples:</strong></p>
                        <ul className="space-y-1 text-gray-600">
                            <li>• Always respond in formal legal tone</li>
                            <li>• Use numbered sections with citations</li>
                            <li>• Follow specific diagnostic reasoning patterns</li>
                            <li>• Generate code in a particular style</li>
                        </ul>
                    </div>
                </Card>

                <Card className="p-6 bg-blue-50 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3">RAG</h4>
                    <p className="text-gray-700 mb-4">Gives <em>what</em> to respond with</p>
                    <div className="bg-white p-4 rounded-lg text-sm space-y-2">
                        <p className="text-gray-600"><strong>Examples:</strong></p>
                        <ul className="space-y-1 text-gray-600">
                            <li>• "What did the customer say on Jan 15?"</li>
                            <li>• "What's our current pricing?"</li>
                            <li>• "Summarize this meeting"</li>
                            <li>• "What's in the product docs?"</li>
                        </ul>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="3" title="When to Use Fine-Tuning" subtitle="The right use cases">
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-emerald-50 border-emerald-200">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        <h4 className="font-semibold text-emerald-900">Use Fine-Tuning When:</h4>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You need consistent tone, format, or style that prompting alone can't reliably achieve</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You have a highly specialized task with a stable, well-defined correct behavior</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You're using a smaller model that needs capability uplift for your specific domain</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>You have thousands of high-quality labeled examples and a clear behavioral target</span>
                        </li>
                    </ul>
                </Card>

                <Card className="p-6 bg-rose-50 border-rose-200">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-rose-600" />
                        <h4 className="font-semibold text-rose-900">Avoid Fine-Tuning When:</h4>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>Your data changes frequently — fine-tuned knowledge becomes stale</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>You have fewer than ~1,000 high-quality examples — you'll overfit</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>Prompting or RAG can solve the problem — fine-tuning is expensive and slow to iterate</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-600 mt-1">•</span>
                            <span>You need to explain why the model responds a certain way — fine-tuned behavior is opaque</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="The Cost Reality" subtitle="What fine-tuning actually costs">
            <Card className="p-6 bg-amber-50 border-amber-200">
                <div className="flex items-start gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold text-amber-900 mb-3">Fine-Tuning Requires:</h4>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-900">Dataset Preparation</p>
                                    <p className="text-sm text-gray-600">Weeks to months collecting and labeling 1,000+ high-quality examples</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <DollarSign className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-900">Training Compute</p>
                                    <p className="text-sm text-gray-600">$100s to $1,000s per training run depending on model size</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Cpu className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-900">Custom Model Endpoint</p>
                                    <p className="text-sm text-gray-600">Separate deployment, monitoring, and maintenance</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-900">Re-training</p>
                                    <p className="text-sm text-gray-600">Whenever behavior needs to change, repeat the entire process</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </Card>

            <Callout type="danger" title="The ROI Must Be Explicit">
                <p className="text-lg leading-relaxed">
                    The ROI needs to be explicit before committing. If you can't articulate exactly what behavior improvement
                    you're buying and why prompting can't achieve it, don't fine-tune.
                </p>
            </Callout>
        </ProgressiveSection>

        <ProgressiveSection number="5" title="The 40-Hour Rule" subtitle="Earn the right to fine-tune">
            <Card className="p-6 bg-rose-50 border-rose-200">
                <h4 className="font-semibold text-rose-900 mb-3">Rule of Thumb</h4>
                <p className="text-lg text-gray-800">
                    If you haven't spent 40+ hours iterating on prompts, you haven't earned the right to consider fine-tuning.
                </p>
            </Card>

            <div className="mt-6 space-y-4">
                <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Why This Matters</h4>
                    <p className="text-gray-600 mb-4">
                        Most teams skip straight to fine-tuning because it sounds sophisticated. They waste weeks and thousands
                        of dollars on a solution that prompt engineering could have solved in days for free.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-900 mb-2"><strong>The progression should be:</strong></p>
                        <ol className="space-y-2 text-sm text-blue-800">
                            <li>1. Better prompts (70% of problems solved here)</li>
                            <li>2. Few-shot examples (15% more)</li>
                            <li>3. Chain-of-thought (10% more)</li>
                            <li>4. RAG for knowledge (4% more)</li>
                            <li>5. Fine-tuning for behavior (1% more, if you really need it)</li>
                        </ol>
                    </div>
                </Card>
            </div>
        </ProgressiveSection>

        <ProgressiveSection number="6" title="Fine-Tuning vs. Prompt Engineering" subtitle="The comparison">
            <ComparisonTable
                headers={["Dimension", "Prompt Engineering", "Fine-Tuning"]}
                rows={[
                    ["Cost", "Free", "$100s-$1,000s per run"],
                    ["Iteration speed", "Minutes", "Days to weeks"],
                    ["Data required", "0-10 examples", "1,000+ examples"],
                    ["Explainability", "High — you wrote the prompt", "Low — weights are opaque"],
                    ["Maintenance", "Edit the prompt", "Re-train the model"],
                    ["When data changes", "Update prompt instantly", "Re-train from scratch"],
                    ["Best for", "Instructions, format, constraints", "Consistent specialized behavior"],
                ]}
            />
        </ProgressiveSection>

        <ProgressiveSection number="7" title="Real-World Example" subtitle="When fine-tuning makes sense">
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-4">Medical Diagnostic Assistant</h4>
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2"><strong>Problem:</strong></p>
                        <p className="text-gray-800">
                            Need consistent diagnostic reasoning that follows specific clinical protocols.
                            Prompting alone produces variable quality — sometimes it follows the protocol, sometimes it doesn't.
                        </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-900 mb-2"><strong>Solution:</strong></p>
                        <p className="text-purple-800">
                            Fine-tune on 5,000 examples of correct diagnostic reasoning from expert clinicians.
                            The model learns the specific reasoning patterns and consistently applies them.
                        </p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                        <p className="text-sm text-emerald-900 mb-2"><strong>Result:</strong></p>
                        <p className="text-emerald-800">
                            Consistent, protocol-compliant diagnostic suggestions. The behavior is stable and predictable.
                            Worth the investment because lives depend on consistency.
                        </p>
                    </div>
                </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-rose-50 to-red-50 border-rose-200 mt-6">
                <h4 className="font-semibold text-rose-900 mb-4">Counter-Example: Customer Support Bot</h4>
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2"><strong>Problem:</strong></p>
                        <p className="text-gray-800">
                            Need to answer questions about product features and pricing.
                        </p>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-lg">
                        <p className="text-sm text-rose-900 mb-2"><strong>Wrong Solution:</strong></p>
                        <p className="text-rose-800">
                            Fine-tune on historical support conversations. Now the model "knows" your product.
                        </p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                        <p className="text-sm text-amber-900 mb-2"><strong>Why It Fails:</strong></p>
                        <ul className="text-sm text-amber-800 space-y-1">
                            <li>• Product features change monthly — model is stale immediately</li>
                            <li>• Can't cite sources — just generates plausible-sounding answers</li>
                            <li>• Expensive to re-train every time pricing changes</li>
                        </ul>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                        <p className="text-sm text-emerald-900 mb-2"><strong>Right Solution:</strong></p>
                        <p className="text-emerald-800">
                            RAG over product documentation. Always current, always citable, free to update.
                        </p>
                    </div>
                </div>
            </Card>
        </ProgressiveSection>

        <div className="rounded-xl bg-gradient-to-r from-slate-800 to-purple-900 text-white p-8">
            <h3 className="font-semibold text-xl mb-4">🎯 The Bottom Line</h3>
            <div className="space-y-3 text-lg leading-relaxed">
                <p>
                    Fine-tuning is powerful but expensive and slow. It's for behavior, not knowledge.
                    It's for when you've exhausted simpler approaches and have a clear, stable behavioral target.
                </p>
                <p>
                    As Chip Huyen puts it: "Fine-tuning is for form, and RAG is for facts."
                    If you need the AI to know your data, use RAG. If you need it to write in a very specific style
                    that prompting can't achieve, then consider fine-tuning.
                </p>
            </div>
        </div>

        <NextSectionNav currentId="pattern-finetuning" />
    </div>
);
