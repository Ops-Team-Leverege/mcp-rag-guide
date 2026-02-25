import React, { useState, createContext, useContext } from 'react';
import { Menu, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { tabGroups, tabs } from './config/tabs';

export const NavigationContext = createContext(null);

import {
  OverviewSection,
  MindsetSection,
  BusinessCaseSection,
  ConceptsSection,
  DataShapeSection,
  DecisionsSection,
  ImplementationSection,
  PromptEngineeringSection,
  ModelSelectionSection,
  DebuggingSection,
  EvaluationSection,
  GoldenSetSection,
  HybridSearchSection,
  AIJudgeSection,
  DeploymentSection,
  PitCrewCaseStudy,
  RAGPatternSection,
  MCPPatternSection,
  FineTuningPatternSection,
  AgenticPatternSection,
  A2APatternSection,
  ContextEngineeringSection,
  RouterPatternSection
} from './sections';

// Next Section navigation component
export const NextSectionNav = ({ currentId }) => {
  const { navigateTo } = useContext(NavigationContext);
  const currentIndex = tabs.findIndex(t => t.id === currentId);
  const next = tabs[currentIndex + 1];
  const prev = tabs[currentIndex - 1];
  if (!next && !prev) return null;

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
      {prev ? (
        <button
          onClick={() => navigateTo(prev.id)}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-400 transition-all"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Previous
        </button>
      ) : <div />}
      {next && (
        <button
          onClick={() => navigateTo(next.id)}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-all shadow-sm"
        >
          Next section
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default function AIArchitectureGuide() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewSection />;
      case 'mindset': return <MindsetSection />;
      case 'businesscase': return <BusinessCaseSection />;
      case 'concepts': return <ConceptsSection />;
      case 'promptengineering': return <PromptEngineeringSection />;
      case 'modelselection': return <ModelSelectionSection />;
      case 'data': return <DataShapeSection />;
      case 'pattern-rag': return <RAGPatternSection />;
      case 'pattern-mcp': return <MCPPatternSection />;
      case 'pattern-finetuning': return <FineTuningPatternSection />;
      case 'pattern-agentic': return <AgenticPatternSection />;
      case 'pattern-a2a': return <A2APatternSection />;
      case 'pattern-context': return <ContextEngineeringSection />;
      case 'pattern-router': return <RouterPatternSection />;
      case 'decisions': return <DecisionsSection />;
      case 'implementation': return <ImplementationSection />;
      case 'debugging': return <DebuggingSection />;
      case 'evaluation': return <EvaluationSection />;
      case 'goldenset': return <GoldenSetSection />;
      case 'hybridsearch': return <HybridSearchSection />;
      case 'aijudge': return <AIJudgeSection />;
      case 'deployment': return <DeploymentSection />;
      case 'pitcrew': return <PitCrewCaseStudy />;
      default: return <OverviewSection />;
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTabIndex = tabs.findIndex(t => t.id === activeTab);
  const currentTab = tabs[currentTabIndex];
  const nextTab = tabs[currentTabIndex + 1];
  const prevTab = tabs[currentTabIndex - 1];
  const currentGroup = tabGroups.find(g => g.tabs.some(t => t.id === activeTab));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed lg:relative top-0 left-0 h-screen
          w-72 bg-white border-r border-gray-200 overflow-y-auto z-50
          transition-transform duration-300 ease-in-out sidebar
          flex-shrink-0 shadow-lg lg:shadow-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">⚡</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">AI Architecture</h1>
                <p className="text-xs text-gray-500">Implementation Guide</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          {tabGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <h3 className="text-xs font-bold tracking-wider uppercase text-gray-500 px-6 mb-3">
                {group.title}
              </h3>
              <div className="space-y-1 px-3">
                {group.tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-3 rounded-lg
                        text-sm font-medium transition-all duration-200
                        ${isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span className="flex-1 text-left truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 mt-auto">
          <p className="text-xs text-gray-500 text-center">
            {tabs.length} sections · Comprehensive guide
          </p>
          <p className="text-xs text-gray-400 text-center mt-1">
            Built for Leverege Ops Teams
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">{currentGroup?.title || 'Guide'}</span>
              <span className="text-gray-300">›</span>
              <span className="text-gray-900 font-semibold">{currentTab?.label || 'Overview'}</span>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2">
              {prevTab && (
                <button
                  onClick={() => handleTabClick(prevTab.id)}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
              {nextTab && (
                <button
                  onClick={() => handleTabClick(nextTab.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
                >
                  Next Lesson
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-16 lg:py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-12 sm:px-12 sm:py-14 lg:px-20 lg:py-16">
              <NavigationContext.Provider value={{ navigateTo: handleTabClick }}>
                {renderContent()}
              </NavigationContext.Provider>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-6 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-600">
              © 2026 Ops Team
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
