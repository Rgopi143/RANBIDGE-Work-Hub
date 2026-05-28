/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DashboardView from './components/DashboardView';
import EmployeesView from './components/EmployeesView';
import TeamsView from './components/TeamsView';
import ProjectsView from './components/ProjectsView';
import TasksView from './components/TasksView';
import AttendanceView from './components/AttendanceView';
import LeavesView from './components/LeavesView';
import PayrollView from './components/PayrollView';
import PerformanceView from './components/PerformanceView';
import DocumentsView from './components/DocumentsView';
import CommunicationView from './components/CommunicationView';
import SettingsView from './components/SettingsView';

function WorkspaceLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentTheme } = useWorkspace();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView setActiveTab={setActiveTab} />;
      case 'employees':
        return <EmployeesView />;
      case 'teams':
        return <TeamsView />;
      case 'projects':
        return <ProjectsView />;
      case 'tasks':
        return <TasksView />;
      case 'attendance':
        return <AttendanceView />;
      case 'leaves':
        return <LeavesView />;
      case 'payroll':
        return <PayrollView />;
      case 'performance':
        return <PerformanceView />;
      case 'documents':
        return <DocumentsView />;
      case 'communication':
        return <CommunicationView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView setActiveTab={setActiveTab} />;
    }
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="workspace"
        data-theme={currentTheme}
        className="flex h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] overflow-hidden font-sans antialiased transition-colors duration-250"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Navigation Panel */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsLoggedIn(false)} />

        {/* Primary Workspace Panel */}
        <div className="flex-1 flex flex-col min-w-0 bg-[var(--theme-bg)] text-[var(--theme-text)] transition-colors duration-250">
          <Header activeTab={activeTab} />
          
          {/* Main View Port */}
          <main className="flex-1 overflow-y-auto p-6 bg-[var(--theme-bg)] text-[var(--theme-text)] scrollbar-thin transition-colors duration-250">
            <div className="max-w-7xl mx-auto">
              {renderActiveView()}
            </div>
          </main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <WorkspaceProvider>
      <WorkspaceLayout />
    </WorkspaceProvider>
  );
}
