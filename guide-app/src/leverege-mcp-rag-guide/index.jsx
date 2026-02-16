import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { tabGroups } from './config/tabs';
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
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-72 bg-gradient-to-b from-slate-900 to-slate-800
          border-r border-slate-700 overflow-y-auto z-50
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white mb-1">
                AI Architecture Guide
              </h1>
              <p className="text-sm text-slate-400">
                Building Production AI Systems
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation - Grouped */}
        <nav className="p-4">
          {tabGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium
                        transition-all duration-200
                        ${activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-left">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 text-center text-sm text-slate-400">
          <p>14 sections · ~45 min read</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="font-semibold text-gray-900">AI Architecture Guide</h2>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto p-6 lg:p-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 lg:p-12">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
