import React from 'react';
import { GitBranch, Zap, DollarSign, Shield, TrendingUp } from 'lucide-react';
import { Callout, Card, ComparisonTable } from '../../components/ui';
import { NextSectionNav } from '../../index';

export const RouterPatternSection = () => (
    <div className="space-y-12">
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Router Pattern</h2>
            <p className="text-lg text-slate-600">
                Use the LLM once to classify intent, then route to deterministic code handlers. Fast, cheap, and predictable.
            </p>
        </div>

        {/* Core Concept */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <GitBranch className="w-8 h-8 text-blue-600" />
                What is the Router Pattern?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
                The Router Pattern is a hybrid approach that uses an LLM for the hard part (understanding user intent) and deterministic code for the easy part (executing the action). Instead of having the LLM generate code or make decisions at every step, you use it once to classify what the user wants, then hand off to fast, reliable, testable code.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                    <strong>Key Insight:</strong> Most user requests fall into a finite set of intents. Once you know the intent, the execution path is deterministic. The Router Pattern exploits this by using the LLM only for classification, not execution.
                </p>
            </div>
        </section>

        {/* How It Works */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">How It Works</h3>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Three-Step Process</h4>
                <ol className="space-y-4 text-lg text-gray-700">
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600 min-w-[2rem]">1.</span>
                        <div>
                            <strong>Classification:</strong> LLM analyzes user input and returns a structured intent classification (e.g., <code className="bg-white px-2 py-1 rounded border">{"intent: 'refund_request'"}</code>)
                        </div>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600 min-w-[2rem]">2.</span>
                        <div>
                            <strong>Routing:</strong> Your code maps the intent to a specific handler function (e.g., <code className="bg-white px-2 py-1 rounded border">handleRefundRequest()</code>)
                        </div>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600 min-w-[2rem]">3.</span>
                        <div>
                            <strong>Execution:</strong> The handler runs deterministic code — database queries, API calls, business logic — without further LLM involvement
                        </div>
                    </li>
                </ol>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Example Flow</h4>
                <pre className="bg-white p-6 rounded border border-gray-300 overflow-x-auto text-base">
                    {`User: "I want to return my order from last week"

Step 1 - LLM Classification:
{
  "intent": "return_request",
  "entities": {
    "timeframe": "last_week"
  },
  "confidence": 0.92
}

Step 2 - Route to Handler:
router.route("return_request") → handleReturnRequest()

Step 3 - Deterministic Execution:
- Query database for orders in last 7 days
- Check return eligibility rules
- Generate return label
- Send confirmation email
- Return structured response to user`}
                </pre>
            </div>
        </section>

        {/* Benefits */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Why Use the Router Pattern?</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <Card title="Speed" icon={Zap}>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        One LLM call for classification (200-500ms), then instant deterministic execution. Compare to agentic patterns that might make 5-10 LLM calls per request.
                    </p>
                </Card>
                <Card title="Cost" icon={DollarSign}>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Classification prompts are small (typically &lt;500 tokens). You're not paying for the LLM to execute business logic or make repeated decisions.
                    </p>
                </Card>
                <Card title="Reliability" icon={Shield}>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Deterministic code is testable, debuggable, and predictable. No hallucinations in execution. You control exactly what happens for each intent.
                    </p>
                </Card>
                <Card title="Observability" icon={TrendingUp}>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Easy to log, monitor, and analyze. You know exactly which intents are being triggered and can track success rates per handler.
                    </p>
                </Card>
            </div>
        </section>

        {/* When to Use */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">When to Use the Router Pattern</h3>
            <ComparisonTable
                headers={['Use Case', 'Why Router Fits', 'When to Avoid']}
                rows={[
                    ['Customer support chatbot', 'Finite set of intents (refund, track order, change address)', 'Open-ended conversations requiring context'],
                    ['Command interfaces', 'Clear actions (create, update, delete, search)', 'Complex multi-step workflows'],
                    ['Form filling assistants', 'Structured data extraction + validation', 'Unstructured creative tasks'],
                    ['FAQ systems', 'Map questions to known answers', 'Novel questions requiring reasoning'],
                    ['Workflow triggers', 'Classify event type, then run automation', 'Workflows requiring dynamic decisions']
                ]}
            />
        </section>

        {/* Implementation */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Implementation Pattern</h3>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Classification Prompt</h4>
                <pre className="bg-white p-6 rounded border border-gray-300 overflow-x-auto text-base">
                    {`You are an intent classifier for a customer support system.

Classify the user's message into one of these intents:
- refund_request: User wants to return a product or get money back
- order_status: User wants to know where their order is
- account_issue: User has login or account problems
- product_question: User has questions about a product
- other: Anything else

Extract relevant entities (order_id, product_name, timeframe, etc.)

Return JSON:
{
  "intent": "intent_name",
  "entities": {...},
  "confidence": 0.0-1.0
}

User message: {{user_input}}`}
                </pre>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Router Implementation</h4>
                <pre className="bg-white p-6 rounded border border-gray-300 overflow-x-auto text-base">
                    {`class IntentRouter:
    def __init__(self):
        self.handlers = {
            'refund_request': self.handle_refund,
            'order_status': self.handle_order_status,
            'account_issue': self.handle_account_issue,
            'product_question': self.handle_product_question,
            'other': self.handle_fallback
        }
    
    async def route(self, user_input):
        # Step 1: Classify intent using LLM
        classification = await self.classify_intent(user_input)
        
        # Step 2: Route to handler
        handler = self.handlers.get(
            classification['intent'],
            self.handle_fallback
        )
        
        # Step 3: Execute deterministic code
        return await handler(
            user_input,
            classification['entities']
        )
    
    async def handle_refund(self, input, entities):
        # Deterministic business logic
        orders = db.get_recent_orders(user_id, days=30)
        eligible = [o for o in orders if o.can_refund()]
        return generate_refund_response(eligible)
    
    # ... other handlers`}
                </pre>
            </div>
        </section>

        {/* Advanced Techniques */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Advanced Techniques</h3>
            <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Confidence Thresholds</h4>
                    <p className="text-lg text-gray-700 leading-relaxed mb-3">
                        Don't blindly trust the classification. Set confidence thresholds and handle low-confidence cases explicitly:
                    </p>
                    <pre className="bg-white p-4 rounded border border-gray-300 overflow-x-auto text-sm">
                        {`if classification['confidence'] < 0.7:
    return ask_clarifying_question()
elif classification['confidence'] < 0.85:
    return show_confirmation_prompt()
else:
    return execute_handler()`}
                    </pre>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Multi-Intent Handling</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Some user messages contain multiple intents ("I want to track my order and also update my address"). Your classifier can return multiple intents, and your router can execute handlers in sequence or parallel.
                    </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Intent Hierarchies</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        For complex domains, use hierarchical classification. First classify broad category (e.g., "order_management"), then sub-classify (e.g., "cancel_order" vs "modify_order"). This improves accuracy and makes prompts more focused.
                    </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Fallback to Agentic</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        For the "other" intent or complex edge cases, you can fall back to a full agentic pattern. Most requests get the fast router path; rare complex cases get the flexible agentic path.
                    </p>
                </div>
            </div>
        </section>

        {/* Optimization Tips */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Optimization Tips</h3>
            <div className="space-y-4">
                <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Use Smaller Models for Classification</p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Intent classification is often simple enough for GPT-3.5 or Claude Haiku. Save the expensive models for complex reasoning tasks.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Cache Classification Results</p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            If users often ask the same questions, cache the classification result. "Where is my order?" always maps to "order_status" intent.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Use Structured Outputs</p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Use JSON mode or function calling to ensure the LLM returns valid, parseable classification results. Don't rely on parsing free-form text.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Monitor Misclassifications</p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Log every classification and track when handlers fail or users express confusion. Use this data to refine your intent definitions and classification prompt.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Start with Few Intents</p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Begin with 5-10 core intents. Add more as you see patterns in the "other" category. Too many intents upfront makes classification harder and less accurate.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Comparison */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Router vs. Other Patterns</h3>
            <p className="text-gray-600 mb-4">
                <em>Note: Cost figures are approximate and illustrative. Verify current pricing before making architectural decisions.</em>
            </p>
            <ComparisonTable
                headers={['Pattern', 'LLM Calls per Request', 'Latency', 'Cost (approx)', 'Best For']}
                rows={[
                    ['Router', '1', '~500ms', '~$0.001', 'Finite intents, deterministic actions'],
                    ['RAG', '1-2', '1-2s', '~$0.01', 'Knowledge retrieval + generation'],
                    ['Agentic', '5-15', '5-30s', '~$0.10', 'Complex multi-step reasoning'],
                    ['Fine-tuned', '1', '~300ms', '~$0.05', 'Specialized tasks with training data']
                ]}
            />
        </section>

        {/* Real-World Example */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Real-World Example (Illustrative)</h3>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">E-commerce Support Bot</h4>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    An online retailer built a support bot using the Router Pattern. They identified 12 core intents covering 85% of support requests:
                </p>
                <ul className="space-y-2 text-lg text-gray-700 mb-4">
                    <li className="flex gap-2"><span className="text-blue-600">•</span> Track order</li>
                    <li className="flex gap-2"><span className="text-blue-600">•</span> Initiate return</li>
                    <li className="flex gap-2"><span className="text-blue-600">•</span> Change shipping address</li>
                    <li className="flex gap-2"><span className="text-blue-600">•</span> Apply promo code</li>
                    <li className="flex gap-2"><span className="text-blue-600">•</span> Report damaged item</li>
                    <li className="flex gap-2"><span className="text-blue-600">•</span> ... and 7 more</li>
                </ul>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Results after 3 months:
                </p>
                <ul className="space-y-2 text-lg text-gray-700">
                    <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span> 92% classification accuracy</li>
                    <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span> Average response time: 800ms (vs 8s with previous agentic approach)</li>
                    <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span> Significant cost reduction per interaction</li>
                    <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span> 78% of requests fully automated (no human handoff needed)</li>
                </ul>
            </div>
        </section>

        <NextSectionNav currentId="pattern-router" />
    </div>
);
