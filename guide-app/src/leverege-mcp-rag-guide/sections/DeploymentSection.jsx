import React from 'react';
import { Cloud, Database, Box, Brain } from 'lucide-react';
import { Card, Callout, ProgressiveSection, ComparisonTable } from '../components/ui';

export const DeploymentSection = () => (
    <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-900">Deployment & Hosting</h2>

        <Callout type="info" title="The Quick Decision">
            Prototyping? → Replit / Railway / Render<br />
            Small production? → Railway / Fly.io<br />
            Scaled production → Cloud Run / AWS ECS<br />
            Enterprise → GKE / EKS
        </Callout>

        <ProgressiveSection number="1" title="Cloud Run (Recommended for GCP)" subtitle="Serverless container hosting" defaultOpen={true}>
            <p className="mb-4">
                <strong>Google Cloud Run</strong> is ideal for MCP servers because:
            </p>
            <ul className="list-disc ml-6 mb-4">
                <li>Scale to zero when idle (cost efficient)</li>
                <li>Automatic HTTPS</li>
                <li>Native GCP IAM integration</li>
                <li>Supports HTTP transport</li>
            </ul>

            <ComparisonTable
                headers={["Configuration", "Recommendation", "Why"]}
                rows={[
                    ["Min instances", "0 or 1", "0 = cheapest, 1 = no cold starts (~$8/mo)"],
                    ["Startup CPU Boost", "Enable", "Reduces cold start by ~50% (free)"],
                    ["Concurrency", "80 (default)", "Adjust based on memory usage"],
                ]}
            />

            <h4 className="font-bold mt-4 mb-2">Estimated Costs</h4>
            <p className="text-gray-600 text-sm">
                A workload handling 10M requests/month at 400ms average: ~$14/month
            </p>
        </ProgressiveSection>

        <ProgressiveSection number="2" title="Cloud-Agnostic Options" subtitle="Non-GCP alternatives">
            <ComparisonTable
                headers={["Platform", "Strengths", "Best For"]}
                rows={[
                    ["Replit", "Instant deployment, great DX", "Rapid prototyping"],
                    ["Railway", "Simple deployment, good DX", "Small teams"],
                    ["Render", "Easy from GitHub", "Small production apps"],
                    ["Fly.io", "Edge deployment, low latency", "Global distribution"],
                    ["AWS Lambda + API Gateway", "AWS ecosystem", "AWS-native shops"],
                ]}
            />
        </ProgressiveSection>

        <ProgressiveSection number="3" title="Security Essentials" subtitle="What you must implement">
            <Callout type="danger" title="Required for Production">
                Production deployments must implement proper authentication and authorization.
                Never expose your MCP server publicly without auth.
            </Callout>

            <h4 className="font-bold mt-4 mb-2">Key Security Practices</h4>
            <ul className="list-disc ml-6">
                <li><strong>Never store secrets in environment variables</strong> — use Secret Manager</li>
                <li>Implement proper authentication (OAuth, API keys, etc.)</li>
                <li>Validate all inputs and sanitize outputs</li>
                <li>Implement rate limiting to prevent abuse</li>
                <li>Log all authentication failures for audit</li>
            </ul>
        </ProgressiveSection>

        <ProgressiveSection number="4" title="What to Monitor" subtitle="Essential observability">
            <div className="space-y-3">
                {[
                    { metric: "Response Time", target: "< 5 seconds for 95th percentile", why: "User experience" },
                    { metric: "Error Rate", target: "< 1%", why: "System reliability" },
                    { metric: "LLM Call Cost", target: "Track daily spend", why: "Budget control" },
                    { metric: "Cache Hit Rate", target: "> 30% if caching", why: "Cost optimization" },
                ].map((item, i) => (
                    <Card key={i} className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h5 className="font-bold text-gray-900">{item.metric}</h5>
                                <p className="text-sm text-gray-600">{item.why}</p>
                            </div>
                            <div className="text-sm font-mono text-blue-600">{item.target}</div>
                        </div>
                    </Card>
                ))}
            </div>
        </ProgressiveSection>
    </div>
);
