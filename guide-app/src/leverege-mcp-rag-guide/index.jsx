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
  ArchitectureSection,
  DecisionsSection,
  MVPPathSection,
  ImplementationSection,
  PromptEngineeringSection,
  ModelSelectionSection,
  DebuggingSection,
  EvaluationSection,
  GoldenSetSection,
  HybridSearchSection,
  AIJudgeSection,
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
          className="group flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue text-sm font-semibold text-white hover:bg-blue-hover transition-all"
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
  const [completedSections, setCompletedSections] = useState(new Set(['overview', 'mindset']));

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
  const progressPercent = Math.round((completedSections.size / tabs.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Dark Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-sidebar bg-sidebar-bg overflow-y-auto z-50
          transition-transform duration-300 ease-in-out sidebar
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand */}
        <div className="px-[18px] pt-[22px] pb-[18px] border-b border-white/[0.07]">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 bg-blue rounded-lg flex items-center justify-center text-[13px] flex-shrink-0">
              🧠
            </div>
            <span className="text-[13.5px] font-bold text-white tracking-tight">
              AI Architecture Guide
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden ml-auto text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="text-[11px] text-slate-500 pl-[38px]">
            Building Production AI Systems
          </div>
        </div>

        {/* Navigation */}
        <nav>
          {tabGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`pt-7 ${groupIndex > 0 ? 'border-t border-white/[0.05] mt-1' : ''}`}
            >
              <h3 className="text-[10px] font-bold tracking-[0.11em] uppercase text-slate-400 px-[18px] pb-2">
                {group.title}
              </h3>
              <div>
                {group.tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`
                        w-full flex items-center gap-[9px] px-[18px] py-[9.5px]
                        text-[13px] font-medium transition-all duration-150
                        border-l-[3px]
                        ${isActive
                          ? 'bg-blue/20 text-white border-blue'
                          : 'text-[#C9CDD6] hover:text-white hover:bg-white/5 border-transparent'
                        }
                      `}
                    >
                      <Icon className={`w-[15px] h-[15px] flex-shrink-0 ${isActive ? 'opacity-100' : 'opacity-45'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer with Progress */}
        <div className="mt-auto px-[18px] py-[14px] border-t border-white/[0.07] text-[11px] text-slate-500">
          <div>{tabs.length} sections · ~45 min read</div>
          <div className="mt-[7px] h-[3px] bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-[5px] text-[10.5px]">
            {completedSections.size} of {tabs.length} completed
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-30 h-topbar bg-white border-b border-slate-200 flex items-center px-11 gap-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors -ml-2"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-[7px] text-[12.5px]">
            <span className="text-slate-400">{currentGroup?.title || 'Guide'}</span>
            <span className="text-slate-300">›</span>
            <span className="text-slate-700 font-semibold">{currentTab?.label || 'Overview'}</span>
          </div>

          {/* Navigation buttons */}
          <div className="ml-auto flex gap-2">
            {prevTab && (
              <button
                onClick={() => handleTabClick(prevTab.id)}
                className="px-4 py-[6px] text-[13px] font-semibold rounded-lg border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900 transition-all"
              >
                ← Previous
              </button>
            )}
            {nextTab && (
              <button
                onClick={() => handleTabClick(nextTab.id)}
                className="px-4 py-[6px] text-[13px] font-semibold rounded-lg bg-blue text-white hover:bg-blue-hover transition-all"
              >
                Next section →
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 px-6 py-11 lg:px-12 max-w-[860px] w-full content-area">
          <NavigationContext.Provider value={{ navigateTo: handleTabClick }}>
            {renderContent()}
          </NavigationContext.Provider>
        </main>
      </div>
    </div>
  );
}
