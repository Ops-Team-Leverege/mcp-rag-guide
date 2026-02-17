import React, { useState, createContext, useContext } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { tabGroups, tabs } from './config/tabs';

export const NavigationContext = createContext(null);

import {
  OverviewSection,
  MindsetSection,
  BusinessCaseSection,
  ConceptsSection,
  DataShapeSection,
  ArchitectureSection,
  DecisionsSection,
  MVPPathSection,
  ImplementationSection,
  PromptEngineeringSection,
  ModelSelectionSection,
  DebuggingSection,
  EvaluationSection,
  DeploymentSection,
  PitCrewCaseStudy
} from './sections';

// Next Section navigation component
export const NextSectionNav = ({ currentId }) => {
  const { navigateTo } = useContext(NavigationContext);
  const currentIndex = tabs.findIndex(t => t.id === currentId);
  const next = tabs[currentIndex + 1];
  const prev = tabs[currentIndex - 1];
  if (!next && !prev) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
      {prev ? (
        <button
          onClick={() => navigateTo(prev.id)}
          className="group flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
        >
          <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
          {prev.label}
        </button>
      ) : <div />}
      {next && (
        <button
          onClick={() => navigateTo(next.id)}
          className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-50 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-all"
        >
          Next: {next.label}
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
      case 'architecture': return <ArchitectureSection />;
      case 'decisions': return <DecisionsSection />;
      case 'mvppath': return <MVPPathSection />;
      case 'implementation': return <ImplementationSection />;
      case 'debugging': return <DebuggingSection />;
      case 'evaluation': return <EvaluationSection />;
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

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — light, clean */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-64 bg-white border-r border-slate-200 overflow-y-auto z-50
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-semibold text-slate-900 leading-tight">
                AI Architecture Guide
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Building Production AI Systems
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4">
          {tabGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-5">
              <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5 px-3">
                {group.title}
              </h3>
              <div className="space-y-0.5">
                {group.tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`
                        w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium
                        transition-all duration-150
                        ${isActive
                          ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-500'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-2 border-transparent'
                        }
                      `}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-indigo-500' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 text-center text-[11px] text-slate-400">
          15 sections · ~45 min read
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <h2 className="text-sm font-semibold text-slate-800">AI Architecture Guide</h2>
          <div className="w-9" />
        </div>

        {/* Content Area */}
        <div className="mx-auto px-6 py-8 lg:px-16 lg:py-10 max-w-none">
          <NavigationContext.Provider value={{ navigateTo: handleTabClick }}>
            {renderContent()}
          </NavigationContext.Provider>
        </div>
      </main>
    </div>
  );
}
