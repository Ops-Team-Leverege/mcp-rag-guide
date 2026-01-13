# Leverege MCP & RAG Implementation Guide

An interactive React-based learning guide for understanding and implementing MCP (Model Context Protocol) and RAG (Retrieval Augmented Generation) systems.

## 📁 File Structure

```
leverege-mcp-rag-guide/
├── README.md                    # This file
├── index.jsx                    # Main app component with navigation
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Card.jsx
│   │   ├── Callout.jsx
│   │   ├── ProgressiveSection.jsx
│   │   ├── ComparisonTable.jsx
│   │   ├── DiagramBox.jsx
│   │   ├── ResourceLink.jsx
│   │   └── QuizQuestion.jsx
│   └── diagrams/                # Visual diagram components
│       ├── MCPArchitectureDiagram.jsx
│       ├── DataQualityPyramid.jsx
│       ├── SixLayerArchitecture.jsx
│       ├── ComplexitySpectrum.jsx
│       ├── SQLRagFlowDiagram.jsx
│       └── AgenticFlowDiagram.jsx
├── sections/                    # Content sections (one per tab)
│   ├── OverviewSection.jsx
│   ├── MindsetSection.jsx
│   ├── BusinessCaseSection.jsx
│   ├── ConceptsSection.jsx
│   ├── DataShapeSection.jsx
│   ├── ArchitectureSection.jsx
│   ├── DecisionsSection.jsx
│   ├── ImplementationSection.jsx
│   ├── HostingSection.jsx
│   ├── ZapierSection.jsx
│   ├── PlanningSection.jsx
│   ├── EvaluationSection.jsx
│   └── ResourcesSection.jsx
└── config/
    └── tabs.js                  # Navigation configuration
```

## 🚀 Quick Start

### Prerequisites
- React 18+
- Tailwind CSS 3+
- lucide-react icons

### Installation

1. **Copy files to your project:**
   ```bash
   cp -r leverege-mcp-rag-guide/ src/components/
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install lucide-react
   ```

3. **Import and use the component:**
   ```jsx
   import AgenticAIGuide from './components/leverege-mcp-rag-guide';
   
   function App() {
     return <AgenticAIGuide />;
   }
   ```

### Using as a standalone page

```jsx
// pages/guide.jsx or app/guide/page.jsx
import AgenticAIGuide from '@/components/leverege-mcp-rag-guide';

export default function GuidePage() {
  return <AgenticAIGuide />;
}
```

## 📖 Guide Structure

The guide is organized into **13 sections** following a progressive learning path:

| # | Section | Description |
|---|---------|-------------|
| 1 | **Overview** | Introduction and learning path |
| 2 | **Mindset** | Consumer AI vs Production AI |
| 3 | **Business Case** | Defining what questions need answers |
| 4 | **Core Concepts** | MCP, RAG, and the mental model |
| 5 | **Data Shape** | Data quality and metadata requirements |
| 6 | **Architecture** | Six-layer stack (build bottom-up) |
| 7 | **When to Use What** | SQL vs RAG vs Agentic decision framework |
| 8 | **Implementation** | Chunking, embeddings, retrieval |
| 9 | **Hosting** | Cloud Run, security, deployment |
| 10 | **Zapier MCP** | Build vs buy decision |
| 11 | **Planning** | Timeline, costs, phased rollout |
| 12 | **Evaluation** | RAGAS metrics, golden test sets |
| 13 | **Resources** | External links and quick reference |

## 🎨 Customization

### Changing colors/branding

Edit the header gradient in `index.jsx`:
```jsx
style={{
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
}}
```

### Adding new sections

1. Create a new section file in `sections/`
2. Add the tab configuration in `config/tabs.js`
3. Add the case to the switch statement in `index.jsx`

### Modifying content

Each section is self-contained in `sections/`. Edit the relevant file to update content.

## 🧩 Component API

### Callout
```jsx
<Callout type="info|warning|success|insight|danger" title="Title">
  Content here
</Callout>
```

### ProgressiveSection
```jsx
<ProgressiveSection 
  number="1" 
  title="Section Title" 
  subtitle="Optional subtitle"
  defaultOpen={false}
>
  Content revealed when expanded
</ProgressiveSection>
```

### ComparisonTable
```jsx
<ComparisonTable
  headers={["Column 1", "Column 2", "Column 3"]}
  rows={[
    ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
    ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
  ]}
/>
```

### QuizQuestion
```jsx
<QuizQuestion
  question="What is the question?"
  options={["Option A", "Option B", "Option C"]}
  correctIndex={1}
  explanation="Why Option B is correct"
/>
```

## 📱 Responsive Design

- **Desktop (lg+)**: Fixed sidebar navigation on the left
- **Mobile**: Hamburger menu with slide-out sidebar
- All diagrams are responsive with mobile-friendly layouts

## 🔧 Technical Notes

### Dependencies
```json
{
  "react": "^18.0.0",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.0.0"
}
```

### Tailwind Configuration
The component uses standard Tailwind utilities. No custom configuration required.

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript

## 📄 License

Internal use for Leverege teams.

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test on both desktop and mobile
4. Submit PR with description of changes

---

**Built for Leverege Ops Teams**  
*Understand what you're building and why — then use AI to help with how.*
