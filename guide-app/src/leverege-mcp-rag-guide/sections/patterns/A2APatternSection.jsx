import React from 'react';
import { GitMerge, Network, Shield, Zap, AlertTriangle } from 'lucide-react';
import { Callout, Card, ComparisonTable } from '../../components/ui';
import { NextSectionNav } from '../../index';

export const A2APatternSection = () => (
    <div className="space-y-12">
        <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">A2A — Agent-to-Agent</h2>
            <p className="text-lg text-slate-600">
                A protocol where agents delegate tasks to specialized remote agents, enabling distributed AI systems with clear boundaries and specialized capabilities.
            </p>
        </div>

        {/* Core Concept */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Network className="w-8 h-8 text-blue-600" />
                What is A2A?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
                Agent-to-Agent (A2A) is an emerging protocol that allows one AI agent to delegate specific tasks to other specialized agents running on remote systems. Think of it as microservices for AI — instead of building one monolithic agent that does everything, you compose a system of specialized agents that communicate over a network.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                    <strong>Key Insight:</strong> A2A extends the MCP pattern from local tool access to remote agent delegation. While MCP connects an agent to local tools, A2A connects agents to other agents across network boundaries.
                </p>
            </div>
        </section>

        {/* Architecture */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">How A2A Works</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <Card title="Orchestrator Agent" icon={GitMerge}>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        The primary agent that receives user requests and coordinates the overall workflow. It decides which specialized agents to invoke and how to combine their results.
                    </p>
                </Card>
                <Card title="Specialist Agents" icon={Zap}>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Remote agents optimized for specific domains (e.g., legal analysis, code generation, data processing). Each runs independently with its own model, context, and tools.
                    </p>
                </Card>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Typical A2A Flow</h4>
                <ol className="space-y-3 text-lg text-gray-700">
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600 min-w-[2rem]">1.</span>
                        <span>User sends request to orchestrator agent</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600 min-w-[2rem]">2.</span>
                        <span>Orchestrator analyzes request and identifies required specialist agents</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600 min-w-[2rem]">3.</span>
                        <span>Orchestrator sends sub-tasks to specialist agents via API calls</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600 min-w-[2rem]">4.</span>
                        <span>Specialist agents process requests using their specialized models and tools</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600 min-w-[2rem]">5.</span>
                        <span>Results are returned to orchestrator</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600 min-w-[2rem]">6.</span>
                        <span>Orchestrator synthesizes results and responds to user</span>
                    </li>
                </ol>
            </div>
        </section>

        {/* When to Use */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">When to Use A2A</h3>
            <ComparisonTable
                headers={['Scenario', 'Why A2A Fits', 'Alternative']}
                rows={[
                    ['Multi-domain expertise needed', 'Each agent can use domain-specific models and tools', 'Single agent with all tools (context overload)'],
                    ['Organizational boundaries', 'Different teams own different agents', 'Monolithic system (coordination nightmare)'],
                    ['Compliance/security isolation', 'Sensitive operations stay in controlled environments', 'Shared context (audit risk)'],
                    ['Scale different workloads', 'Route heavy tasks to specialized infrastructure', 'One-size-fits-all deployment (cost inefficient)'],
                    ['Reusable specialist agents', 'Build once, use across multiple orchestrators', 'Duplicate logic in each system']
                ]}
            />
        </section>

        {/* Benefits */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Benefits of A2A</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <Card title="Specialization" icon={Zap}>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Each agent can use the optimal model, prompt, and tools for its domain. A legal agent might use Claude with case law RAG, while a code agent uses GPT-4 with GitHub access.
                    </p>
                </Card>
                <Card title="Security Boundaries" icon={Shield}>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Sensitive operations stay isolated. Your financial analysis agent can run in a secure environment without exposing credentials to the orchestrator.
                    </p>
                </Card>
                <Card title="Independent Scaling" icon={Network}>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Scale each agent independently based on demand. Your image processing agent can run on GPU instances while your text agent uses cheaper CPU-only infrastructure.
                    </p>
                </Card>
                <Card title="Team Autonomy" icon={GitMerge}>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Different teams can own and evolve their specialist agents independently, with clear API contracts between them.
                    </p>
                </Card>
            </div>
        </section>

        {/* Challenges */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
                Challenges and Considerations
            </h3>
            <div className="space-y-6">
                <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Network Latency</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Each agent call adds network round-trip time. A workflow requiring 5 specialist agents might take 10+ seconds even if each agent responds in 2 seconds. Consider batching or parallel calls where possible.
                    </p>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Error Propagation</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        When a specialist agent fails, the orchestrator must handle it gracefully. Implement retry logic, fallbacks, and clear error messages. Don't let a single agent failure crash the entire workflow.
                    </p>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Context Passing</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        The orchestrator must decide what context to pass to each specialist. Too much context wastes tokens and time; too little context produces poor results. Design clear, minimal interfaces between agents.
                    </p>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Cost Multiplication</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Each agent call costs money. A single user request might trigger 3-5 LLM calls across different agents. Monitor costs carefully and optimize agent selection logic.
                    </p>
                </div>
            </div>
        </section>

        {/* Implementation Pattern */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Implementation Pattern</h3>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Orchestrator Agent Prompt Structure</h4>
                <pre className="bg-white p-6 rounded border border-gray-300 overflow-x-auto text-base">
                    {`You are an orchestrator agent. You coordinate specialist agents to fulfill user requests.

Available Specialist Agents:
- legal_agent: Analyzes contracts and legal documents
- code_agent: Generates and reviews code
- data_agent: Processes and analyzes datasets
- research_agent: Searches and synthesizes information

For each user request:
1. Identify which specialist agents are needed
2. Determine the order of operations
3. Call agents using the delegate_to_agent tool
4. Synthesize results into a coherent response

When delegating:
- Pass only the context the specialist needs
- Include clear instructions for what you need back
- Handle errors gracefully with fallbacks`}
                </pre>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Specialist Agent API Contract</h4>
                <pre className="bg-white p-6 rounded border border-gray-300 overflow-x-auto text-base">
                    {`POST /agent/execute
{
  "task": "Analyze this contract for liability clauses",
  "context": {
    "document": "...",
    "user_requirements": "..."
  },
  "constraints": {
    "max_tokens": 2000,
    "timeout_seconds": 30
  }
}

Response:
{
  "result": "Analysis results...",
  "confidence": 0.85,
  "sources": ["section_3.2", "section_7.1"],
  "metadata": {
    "model_used": "claude-3-opus",
    "tokens_used": 1543
  }
}`}
                </pre>
            </div>
        </section>

        {/* Best Practices */}
        <section className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Best Practices</h3>
            <div className="space-y-4">
                <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Design Clear Interfaces</p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Each specialist agent should have a well-defined API contract. Document inputs, outputs, error codes, and expected response times.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Implement Timeouts</p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Set reasonable timeouts for each agent call. Don't let one slow agent block the entire workflow.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Monitor Agent Performance</p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Track latency, error rates, and costs for each specialist agent. Identify bottlenecks and optimize accordingly.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Version Your Agents</p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Use semantic versioning for specialist agents. Allow orchestrators to specify which version they need for backward compatibility.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Parallelize When Possible</p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            If multiple specialist agents don't depend on each other's results, call them in parallel to reduce total latency.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <Callout type="warning" title="A2A is Emerging">
            <p className="text-lg leading-relaxed">
                A2A protocols are still evolving. Standards like the proposed A2A specification are in early stages. Expect tooling and best practices to mature over the next 1-2 years. For now, focus on clear API contracts and robust error handling.
            </p>
        </Callout>

        <NextSectionNav currentId="pattern-a2a" />
    </div>
);
