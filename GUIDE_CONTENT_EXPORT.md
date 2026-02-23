# AI Architecture Guide - Complete Content Export

**Building Production AI Systems**

From paradigm selection to production deployment, with PitCrew Sauce as a real-world case study

---

## Table of Contents

1. [Overview](#overview)
2. [Mindset Shift](#mindset-shift)
3. [Business Case](#business-case)
4. [Core Concepts](#core-concepts)
5. [Prompt Engineering](#prompt-engineering)
6. [Model Selection](#model-selection)
7. [Data Shape](#data-shape)
8. [Architecture Patterns](#architecture-patterns)
9. [When to Use What](#when-to-use-what)
10. [The MVP Path](#the-mvp-path)
11. [Implementation](#implementation)
12. [Debugging](#debugging)
13. [Evaluation](#evaluation)
14. [Golden Set](#golden-set)
15. [Hybrid Search](#hybrid-search)
16. [AI-as-a-Judge](#ai-as-a-judge)
17. [Deployment](#deployment)
18. [PitCrew Sauce Case Study](#pitcrew-sauce-case-study)

---

## Overview

### What This Guide Will Help You Do

- **Understand the 7 AI paradigms and when to use each**
  - RAG, MCP, Fine-tuning, Agentic AI, A2A, Context Engineering, Router Pattern

- **Design systems that don't hallucinate critical information**
  - Grounding, citations, and the "cite or abstain" rule

- **Choose and combine the right architecture patterns**
  - When to use code-driven routing, when to let LLMs decide, and how patterns combine

- **Debug, evaluate, and improve production AI**
  - Systematic debugging, RAGAS evaluation, intent accuracy testing

### Learning Path

The guide is organized progressively. Each section builds on the previous ones.

---

## Mindset Shift

### The Most Important Lesson

**The mindset shift**: Before writing a single line of code, you need to understand why building production AI is fundamentally different from using consumer AI tools.

### Before You Build: Do You Actually Need This?

The best architecture is the one you don't need to build. Run through this checklist honestly. Many teams invest weeks building custom AI systems when simpler solutions would work better.

#### Don't Build If...

1. **<50 static questions with fixed answers**
   - Solution: Knowledge base (Notion AI, Confluence)
   - Why: No retrieval needed — just serve pre-written answers

2. **Simple API chaining (no interpretation)**
   - Solution: Zapier / Make / n8n
   - Why: Automation, not intelligence

3. **No proprietary data**
   - Solution: Use ChatGPT / Claude directly
   - Why: You don't have a data advantage worth engineering for

4. **<100 queries/month**
   - Solution: Manual process + templates
   - Why: The engineering cost exceeds the time saved

5. **Can't define 5 specific questions users need answered**
   - Solution: Stop and do user research first
   - Why: If you can't name the questions, you can't evaluate the answers

6. **No one owns the data (stale CRM, scattered docs)**
   - Solution: Fix your data first
   - Why: AI amplifies data quality — good or bad

#### Build When...

A custom agent is worth the investment when you have:

- Proprietary data that must stay private (meeting transcripts, internal docs, customer records)
- Complex routing needs — different data sources, authority levels, or output formats
- Audit requirements — you need to explain exactly WHY the system said what it said
- Team-wide access — the system needs to work for everyone, not just the expert
- Real-time requirements — users need answers from live data, not a static export

### The Consumer AI Illusion

**The Illusion**: You've used ChatGPT, Claude, Gemini. You drop in files, ask questions, get answers. It feels like magic. This creates a dangerous expectation that you can "just ask the AI" anything and get reliable answers.

**What You Think Happens**:
```
Files → AI → Answer
"The AI read my files and knows the answer"
```

**What Actually Happens**:
```
Files → Chunking → Embeddings → 
Vector DB → Retrieval → 
Prompt Assembly → LLM → 
Validation → Answer
```

Consumer products hide this complexity. They make tradeoffs you don't see: generic chunking, no metadata filtering, no source verification. These tradeoffs are fine for casual use but dangerous for business-critical applications.

### The Hallucination Problem

**Hallucinations aren't bugs — they're the default behavior.**

LLMs generate statistically likely text. Without guardrails, they will confidently state things that aren't in your data. This is by design — the model optimizes for helpfulness, not accuracy.

#### Why Hallucinations Happen: The Three Mechanisms

1. **Attention Collapse**: The model loses track of which part of the context to focus on
2. **Recency Bias**: Later tokens in the context get more weight than earlier ones
3. **Parametric Memory Interference**: The model's training data conflicts with your retrieved context

#### How Hallucinations Manifest

1. **Fake Specificity**: "55-inch TCL Google TV" (transcript said "I don't see a brand")
2. **Confident Gap-Filling**: "March 15, 2026" (no date exists in any document)
3. **Context Collapse**: Blending details from multiple sources

### Grounding: The Solution

**The Cite or Abstain Rule**: If the answer isn't in the retrieved context, the system must say "I don't have that information" rather than guess.

**Implementation**:
- Explicit source citations in every response
- Metadata tracking (which document, which chunk, which timestamp)
- Validation layer that checks if the answer is grounded in retrieved context

---

## Business Case

### The Most Common Mistake

Building AI solutions without knowing what questions you need answered. Without a clear business case, you're just building a commercial AI wrapper — expensive, unfocused, and unlikely to deliver value.

### Why Business Case First?

Technology serves the question, not the other way around.

**Without a Business Case**:
- You build a "chat with your data" interface
- Users don't know what to ask
- Answers are generic and unhelpful
- Nobody uses it after the first week
- You've built an expensive ChatGPT wrapper

**With a Business Case**:
- You know exactly what questions to answer
- You design data shape around those questions
- You choose the right approach (SQL/RAG/Agent)
- Answers are specific and actionable
- Users get real value from day one

### The Three Questions

Answer these BEFORE any technology decisions:

1. **What specific questions do users need answered?**
   - Not "chat with meetings" — that's a feature, not a question
   - Instead: "What did the customer say about pricing?" or "What blockers were mentioned?"

2. **What does success look like?**
   - How will you measure if the system is working?
   - What's the acceptable error rate?
   - What's the cost per query budget?

3. **What data do you have, and what's missing?**
   - Do you have the data to answer these questions?
   - Is it structured or unstructured?
   - What metadata exists (speaker, timestamp, company)?

### Business Case → Technical Decisions

How business needs drive architecture:

| Business Need | Technical Approach |
|--------------|-------------------|
| <50 static questions with fixed answers | Knowledge base (Notion AI, Confluence) |
| Structured data queries (revenue, counts) | SQL + natural language interface |
| Unstructured data (meeting transcripts, docs) | RAG (Retrieval Augmented Generation) |
| Complex routing (different data sources, authority levels) | Router + MCP pattern |
| Multi-step reasoning, tool use | Agentic AI |

---

## Core Concepts

### The 7 AI Paradigms

Understanding when to use each approach:

1. **RAG (Retrieval Augmented Generation)**
   - What: Retrieve relevant documents, pass to LLM for answer generation
   - When: Unstructured data, need citations, data changes frequently
   - Example: "What did the customer say about pricing in the last meeting?"

2. **MCP (Model Context Protocol)**
   - What: Standardized way for LLMs to access external data sources
   - When: Multiple data sources, need structured access, want reusability
   - Example: Connecting to CRM, calendar, email, Slack

3. **Fine-tuning**
   - What: Train model on your specific data/task
   - When: Consistent format, large dataset, need specific behavior
   - Example: Classification, entity extraction, style matching

4. **Agentic AI**
   - What: LLM decides which tools to use and when
   - When: Multi-step reasoning, tool selection, exploratory tasks
   - Example: "Research competitors and create a comparison table"

5. **A2A (Agent-to-Agent)**
   - What: Multiple specialized agents collaborate
   - When: Complex workflows, specialized expertise, parallel processing
   - Example: Research agent → Analysis agent → Writing agent

6. **Context Engineering**
   - What: Carefully crafted prompts with examples and constraints
   - When: Simple tasks, no external data needed, consistent format
   - Example: Text summarization, format conversion

7. **Router Pattern**
   - What: Code-driven routing to different handlers based on intent
   - When: Predictable intents, need deterministic behavior, multiple data sources
   - Example: Route to SQL for metrics, RAG for meetings, API for real-time data

### The Mental Model: Capabilities vs Contracts

**Capabilities**: What data sources can the system access?
- Meeting transcripts
- CRM data
- Product documentation
- Slack messages

**Contracts**: What specific questions can the system answer?
- "What blockers were mentioned in the last standup?"
- "What's our revenue this quarter?"
- "How do I configure SSO?"

**The Key Insight**: Capabilities are broad. Contracts are specific. Users care about contracts, not capabilities.

---

## Prompt Engineering

### The 70% Rule

**70% of your AI system's quality comes from prompt engineering, not the model.**

You can build a better system with GPT-4o-mini and great prompts than with GPT-4o and bad prompts.

### System Prompts: The Foundation

System prompts define:
- Role and expertise
- Output format
- Constraints and rules
- Citation requirements

**Example**:
```
You are a meeting intelligence assistant. Your job is to answer questions about meeting transcripts.

Rules:
1. ONLY answer based on the provided transcript
2. ALWAYS cite the speaker and approximate timestamp
3. If the answer isn't in the transcript, say "I don't have that information"
4. Be specific — quote exact phrases when possible

Output format:
- Direct answer first
- Supporting quotes with [Speaker, ~MM:SS]
- If multiple mentions, list all
```

### Few-Shot Examples

Show the model what good looks like:

```
Question: What blockers were mentioned?
Good Answer: "Sarah mentioned two blockers: 1) The API integration is delayed due to auth issues [Sarah, ~15:30], and 2) The design team needs feedback on the new mockups [Sarah, ~18:45]"

Question: What's the team's mood?
Bad Answer: "The team seems frustrated"
Good Answer: "I can't determine mood from the transcript. I can only report what was explicitly said."
```

### Temperature and Sampling

- **Temperature 0**: Deterministic, consistent (use for classification, extraction)
- **Temperature 0.3-0.5**: Slightly creative (use for summarization)
- **Temperature 0.7-1.0**: Creative (use for brainstorming, writing)

### Common Mistakes

1. **Vague instructions**: "Be helpful" → "Answer in 2-3 sentences with specific examples"
2. **No output format**: Model chooses format → Specify exact structure
3. **No constraints**: Model guesses → "Only use provided context"
4. **No examples**: Model interprets → Show 2-3 examples

---

## Model Selection

### The Multi-Model Pattern

**Route cheap, generate smart.**

Don't use GPT-4o for everything. Use small models for routing, large models for generation.

**Pattern**:
1. Intent classification → Small/fast model (GPT-4o-mini, $0.15/1M tokens)
2. Routing decisions → Small/fast model
3. Response generation → Medium-large model (GPT-4o, $2.50/1M tokens)
4. High-trust extraction → Medium at temp=0
5. Complex reasoning → Large model only when needed

### Cost Optimization

**Real-world example** (10K queries/day):
- All GPT-4o: ~$5,000/month
- Multi-model pattern: ~$1,200/month
- **Savings: 76%**

### The 80/20 Optimization Rules

Priority-ordered strategies:

1. **Cache product knowledge** (30-50% cost reduction)
2. **Use small models for classification** (95% savings on routing)
3. **Reduce context size** (80% savings on input tokens)
4. **Skip the LLM when possible** (eliminates LLM call entirely)

### Performance Targets

- Intent classification: <500ms
- Entity resolution: <200ms
- Retrieval: <1 second
- LLM generation: <3 seconds
- **Total end-to-end: <5 seconds** (Slack/chat UX threshold)

---

## Data Shape

### THE RULE: AI Quality is Capped by Data Quality

You cannot retrieve what you haven't properly ingested. The best model in the world can't fix bad data.

### Why Data Shape Matters More Than the Model

**Three key aspects**:
1. **What data**: Do you have the information needed to answer the questions?
2. **How it's structured**: Can you retrieve the right chunks?
3. **What metadata**: Can you filter before retrieval?

### Metadata: The Secret Weapon

**Example**: Meeting transcripts

**Bad** (no metadata):
```
"The customer mentioned pricing concerns"
```

**Good** (with metadata):
```
{
  "text": "The customer mentioned pricing concerns",
  "speaker": "John Smith",
  "speaker_role": "Customer",
  "company": "Acme Corp",
  "timestamp": "2024-03-15T14:23:00Z",
  "meeting_type": "sales_call"
}
```

**Why it matters**: You can now filter to "What did customers say about pricing?" instead of retrieving every mention of pricing.

### The Data Quality Pyramid

```
Level 4: Rich Metadata (speaker, role, company, timestamp)
Level 3: Basic Metadata (source, date)
Level 2: Clean Text (proper formatting, no artifacts)
Level 1: Raw Text (OCR errors, formatting issues)
```

**Target**: Level 3 minimum, Level 4 for production systems

---

## Architecture Patterns

### The Six-Layer Architecture

1. **Layer 1: Interface** (Slack, API, Web)
2. **Layer 2: Decision Layer** (Intent → Scope → Contract)
3. **Layer 3: Execution Layer** (Handlers for each contract)
4. **Layer 4: Data Layer** (Vector DB, SQL, APIs)
5. **Layer 5: LLM Layer** (Model calls, prompt assembly)
6. **Layer 6: Delivery Layer** (Format, stream, respond)

### The Router Pattern: Decide First, Then Execute

**Three-step process**:

**Step A: Intent Classification**
- What is the user asking for?
- Use small LLM (GPT-4o-mini) at temp=0
- Returns: Intent enum + semantic metadata

**Step B: Scope Resolution**
- What data sources are needed?
- Deterministic logic based on intent
- Returns: List of capabilities to query

**Step C: Contract Selection**
- What specific handler should execute?
- Maps intent + scope → contract
- Returns: Contract ID + parameters

**Why this matters**: Predictable, debuggable, testable. You know exactly what will happen before any LLM generation.

### The Ingestion Pipeline

**Six steps** (deterministic vs AI):

1. **Extraction** (Deterministic): Pull raw data from source
2. **Cleaning** (Deterministic): Remove artifacts, fix formatting
3. **Chunking** (Deterministic): Split into retrievable units
4. **Metadata Enrichment** (AI): Extract speaker, topics, entities
5. **Embedding** (AI): Convert to vectors
6. **Indexing** (Deterministic): Store in vector DB

**The principle**: You can only retrieve what you've properly ingested.

---

## When to Use What

### Decision Framework

**Use SQL when**:
- Structured data (tables, columns)
- Aggregations (count, sum, average)
- Exact matches needed
- Example: "What's our revenue this quarter?"

**Use RAG when**:
- Unstructured data (documents, transcripts)
- Semantic search needed
- Need citations
- Example: "What did the customer say about pricing?"

**Use Agentic AI when**:
- Multi-step reasoning
- Tool selection needed
- Exploratory tasks
- Example: "Research competitors and create a comparison"

**Use Router Pattern when**:
- Multiple data sources
- Predictable intents
- Need deterministic behavior
- Example: Route to SQL for metrics, RAG for meetings

### Combining Patterns

**Common combinations**:
- Router + RAG: Route intent, then retrieve relevant docs
- Router + SQL: Route intent, then query database
- RAG + Agentic: Retrieve docs, then reason over them
- MCP + Router: Expose capabilities via MCP, route via intent

---

## Implementation

### Chunking Strategies

**The tradeoff**: Too small = lose context. Too large = irrelevant content.

**For transcripts**: Chunk by speaker turn
**For documents**: Chunk by paragraph or section
**Overlap**: 10-20% overlap between chunks

### Embeddings

**What they are**: Mathematical representations of meaning

**Model size decision**:
- Small (384 dimensions): Fast, cheap, good enough for most
- Large (1536 dimensions): Better quality, slower, more expensive

**Recommendation**: Start small (text-embedding-3-small)

### Retrieval Patterns

**Pattern 1: Metadata pre-filter + vector search**
1. Filter by metadata (company, date range, speaker)
2. Vector search within filtered set
3. Return top K results

**Pattern 2: Hybrid search**
1. Vector search (semantic)
2. Keyword search (BM25)
3. Combine with RRF (Reciprocal Rank Fusion)

### Error Handling

**Graceful degradation**:
1. Try primary retrieval
2. If empty, try broader search
3. If still empty, try related terms
4. If nothing, return "I don't have that information"

**The principle**: Simple answer > error message

---

## Debugging

### The 5-Minute Debug Protocol

When something goes wrong:

1. **Check retrieval** (30 seconds)
   - What chunks were retrieved?
   - Are they relevant?
   - Is the answer in them?

2. **Check prompt** (1 minute)
   - What was sent to the LLM?
   - Are instructions clear?
   - Are examples provided?

3. **Check response** (30 seconds)
   - What did the LLM return?
   - Is it following instructions?
   - Is it grounded in context?

4. **Check metadata** (1 minute)
   - Are filters working?
   - Is metadata correct?
   - Are timestamps accurate?

5. **Check logs** (2 minutes)
   - Any errors?
   - Latency issues?
   - Rate limits hit?

### What to Log

**Always log**:
- User query
- Intent classification result
- Retrieved chunks (IDs + scores)
- Prompt sent to LLM
- LLM response
- Final answer delivered
- Latency for each step

**Why**: You can't debug what you can't see.

---

## Evaluation

### RAGAS Framework

Four key metrics:

1. **Context Precision**: Are retrieved chunks relevant?
   - Target: >0.85
   - Red flag: <0.70

2. **Context Recall**: Did we retrieve all relevant chunks?
   - Target: >0.90
   - Red flag: <0.75

3. **Faithfulness**: Is the answer grounded in retrieved context?
   - Target: >0.95
   - Red flag: <0.85

4. **Answer Relevance**: Does the answer address the question?
   - Target: >0.90
   - Red flag: <0.80

### Golden Test Set

**What to include**:
- Easy questions (should always work)
- Medium questions (edge cases)
- Hard questions (stress tests)

**How to use**:
1. Run golden set weekly
2. Track metrics over time
3. Investigate regressions
4. Add failures to golden set

**The principle**: You can't improve what you don't measure.

### Three Validation Types

1. **Retrieval Validation**: Are we getting the right chunks?
2. **Grounding Validation**: Is the answer in the chunks?
3. **User Trust Validation**: Do users trust the answers?

---

## Deployment

### Hosting Options

**Serverless** (Cloud Run, Lambda):
- Pros: Auto-scaling, pay-per-use, no ops
- Cons: Cold starts, timeout limits
- Best for: <1000 queries/day

**Container** (ECS, GKE):
- Pros: More control, no cold starts
- Cons: More ops, fixed costs
- Best for: >1000 queries/day

**Dedicated** (EC2, GCE):
- Pros: Full control, predictable costs
- Cons: Most ops, scaling complexity
- Best for: >10K queries/day

### Security Essentials

1. **Authentication**: OAuth 2.0, API keys
2. **Authorization**: Role-based access control
3. **Data encryption**: At rest and in transit
4. **Audit logging**: Who asked what, when
5. **Rate limiting**: Prevent abuse

---

## PitCrew Sauce Case Study

### Overview

**What**: Meeting intelligence bot for Leverege
**Platform**: Slack-native
**Production**: Since Feb 2026
**Scale**: 8 intent types, 30+ contracts

### Architecture

**Layer 1: Slack Integration**
- Signature verification
- Deduplication
- Bot/edit filtering
- Immediate 200 ACK
- "Thinking..." acknowledgment
- Thread context resolution

**Layer 2: Decision Layer**
- Intent classification (GPT-4o-mini)
- Context layer flags
- Contract selection

**Layer 3: Execution**
- Single meeting handler
- Multi-meeting handler
- Product knowledge handler
- External research handler
- Slack search handler

### Key Lessons

1. **Metadata prevents hallucination**: Speaker attribution, timestamps, company names
2. **Router pattern enables debugging**: Know exactly what happened at each step
3. **Thread context matters**: Follow-up questions need conversation history
4. **Type safety prevents runtime surprises**: TypeScript interfaces enforce correct structure

### Real-World Metrics

- Intent accuracy: 94%
- Response time: <3 seconds (p95)
- User satisfaction: 4.6/5
- Cost per query: $0.08

---

## Conclusion

Building production AI systems requires:
1. Clear business case
2. Proper data shape
3. Right architecture pattern
4. Systematic debugging
5. Continuous evaluation

Start simple. Measure everything. Iterate based on data.

---

## Additional Resources

- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- [RAGAS Framework](https://docs.ragas.io/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

---

**Last Updated**: February 2026
**Version**: 1.0
**Maintainer**: Leverege Ops Team
