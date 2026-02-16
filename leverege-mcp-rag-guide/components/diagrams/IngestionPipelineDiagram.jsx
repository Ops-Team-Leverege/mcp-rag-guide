import React from 'react';
import { FileText, Scissors, Tag, Database, Brain, CheckCircle } from 'lucide-react';

const IngestionPipelineDiagram = () => {
    const steps = [
        {
            icon: FileText,
            title: "Step 1: Format Conversion",
            subtitle: "Deterministic",
            description: "Audio → transcript, PDF → text, email → structured fields",
            color: "blue",
            example: "Zoom recording → .txt file"
        },
        {
            icon: Tag,
            title: "Step 2: Structural Parsing",
            subtitle: "Deterministic",
            description: "Identify speakers, sections, timestamps, metadata",
            color: "purple",
            example: "Extract: speaker_name, timestamp, company"
        },
        {
            icon: Scissors,
            title: "Step 3: Chunking",
            subtitle: "Deterministic",
            description: "Split into retrieval-ready pieces with metadata",
            color: "green",
            example: "By speaker turn: 200-300 tokens each"
        },
        {
            icon: Database,
            title: "Step 4: Embedding",
            subtitle: "Deterministic (temp=0)",
            description: "Convert chunks to vectors for semantic search",
            color: "amber",
            example: "text-embedding-3-small → 1536 dimensions"
        },
        {
            icon: Brain,
            title: "Step 5: AI Extraction",
            subtitle: "LLM (separated)",
            description: "Q&A pairs, action items, summaries, topics",
            color: "red",
            example: "Extract customer questions, identify commitments"
        },
        {
            icon: CheckCircle,
            title: "Step 6: Indexing",
            subtitle: "Deterministic",
            description: "Store everything with cross-references",
            color: "teal",
            example: "Insert into Postgres with pgvector"
        }
    ];

    const colorClasses = {
        blue: "bg-blue-100 border-blue-300 text-blue-800",
        purple: "bg-purple-100 border-purple-300 text-purple-800",
        green: "bg-green-100 border-green-300 text-green-800",
        amber: "bg-amber-100 border-amber-300 text-amber-800",
        red: "bg-red-100 border-red-300 text-red-800",
        teal: "bg-teal-100 border-teal-300 text-teal-800"
    };

    return (
        <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <h4 className="text-center font-bold text-gray-800 mb-2">Data Ingestion Pipeline</h4>
            <p className="text-center text-sm text-gray-600 mb-6">
                Ingestion is deterministic. Interpretation is AI. Never mix the two.
            </p>

            <div className="flex flex-col items-center gap-3">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <React.Fragment key={index}>
                            <div className={`w-full max-w-2xl ${colorClasses[step.color]} border-2 rounded-lg p-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]`}>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h5 className="font-bold">{step.title}</h5>
                                            <span className="text-xs font-semibold px-2 py-1 bg-white/50 rounded">
                                                {step.subtitle}
                                            </span>
                                        </div>
                                        <p className="text-sm mb-2">{step.description}</p>
                                        <div className="text-xs font-mono bg-white/50 px-2 py-1 rounded">
                                            {step.example}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="flex flex-col items-center">
                                    <div className="w-0.5 h-4 bg-gray-400"></div>
                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                    <div className="font-bold text-green-800 mb-2">✓ Ingestion (Steps 1-4, 6)</div>
                    <ul className="text-sm text-green-700 space-y-1">
                        <li>• Deterministic and reproducible</li>
                        <li>• No LLM randomness</li>
                        <li>• Can be re-run identically</li>
                        <li>• Foundation of trust</li>
                    </ul>
                </div>
                <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
                    <div className="font-bold text-amber-800 mb-2">⚠ Interpretation (Step 5)</div>
                    <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Uses LLM for extraction</li>
                        <li>• Stored separately from source</li>
                        <li>• Can be re-generated</li>
                        <li>• Always traceable to source</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default IngestionPipelineDiagram;
