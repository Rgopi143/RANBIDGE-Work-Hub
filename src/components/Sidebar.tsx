/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  LayoutDashboard,
  Users,
  Building,
  Briefcase,
  CheckSquare,
  Clock,
  CalendarDays,
  CreditCard,
  BarChart3,
  FileText,
  Megaphone,
  Settings,
  Database,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { currentRole, currentUser } = useWorkspace();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Super Admin', 'HR', 'Manager', 'Team Lead', 'Employee', 'Intern'] },
    { id: 'employees', label: 'Employees', icon: Users, roles: ['Super Admin', 'HR', 'Manager'] },
    { id: 'teams', label: 'Teams & Chat', icon: Building, roles: ['Super Admin', 'HR', 'Manager', 'Team Lead', 'Employee', 'Intern'] },
    { id: 'projects', label: 'Projects', icon: Briefcase, roles: ['Super Admin', 'HR', 'Manager', 'Team Lead', 'Employee', 'Intern'] },
    { id: 'tasks', label: 'Task Console', icon: CheckSquare, roles: ['Super Admin', 'HR', 'Manager', 'Team Lead', 'Employee', 'Intern'] },
    { id: 'attendance', label: 'Attendance', icon: Clock, roles: ['Super Admin', 'HR', 'Manager', 'Team Lead', 'Employee', 'Intern'] },
    { id: 'leaves', label: 'Leave Requests', icon: CalendarDays, roles: ['Super Admin', 'HR', 'Manager', 'Team Lead', 'Employee', 'Intern'] },
    { id: 'payroll', label: 'Payroll & Slips', icon: CreditCard, roles: ['Super Admin', 'HR', 'Manager'] },
    { id: 'performance', label: 'Performance & AI', icon: BarChart3, roles: ['Super Admin', 'HR', 'Manager', 'Team Lead', 'Employee', 'Intern'] },
    { id: 'documents', label: 'Doc Vault', icon: FileText, roles: ['Super Admin', 'HR', 'Manager', 'Team Lead', 'Employee', 'Intern'] },
    { id: 'communication', label: 'Announcements', icon: Megaphone, roles: ['Super Admin', 'HR', 'Manager', 'Team Lead', 'Employee', 'Intern'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['Super Admin', 'Manager'] }
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(currentRole));

  return (
    <div id="side-bar" className="w-64 bg-[var(--theme-sidebar)] border-r border-[var(--theme-border)] flex flex-col h-screen text-[var(--theme-text)] select-none shrink-0 sticky top-0 overflow-hidden transition-colors duration-300">
      {/* Brand Header */}
      <div className="p-5 border-b border-[var(--theme-border)] flex items-center space-x-3 bg-[var(--theme-sidebar)]">
        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center rounded-xl shadow-lg shadow-indigo-500/25 font-black text-xl tracking-wider">
          R
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-[var(--theme-text)] flex items-center gap-1.5">
            <span>RAN WorkHub</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">v1.2</span>
          </h1>
          <p className="text-[10px] text-[var(--theme-muted)] font-mono tracking-wider font-medium">RANBIDGE Solutions</p>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="p-3.5 mx-3 my-3 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl flex items-center space-x-3 shadow-sm hover:shadow transition-all">
        <img
          src={currentUser?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
          className="h-10 w-10 rounded-lg object-cover ring-2 ring-indigo-500/30 shrink-0"
          alt="Profile"
        />
        <div className="overflow-hidden min-w-0 flex-1">
          <h4 className="text-xs font-bold text-[var(--theme-text)] truncate">{currentUser?.name || 'User Profile'}</h4>
          <span className="text-[10px] text-[var(--theme-muted)] block truncate font-medium">{currentUser?.designation || 'Specialist'}</span>
          <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xs">
            {currentRole}
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto pb-4 no-scrollbar">
        <div className="px-3 mb-2 flex items-center justify-between">
          <span className="text-[10px] font-extrabold tracking-widest text-[var(--theme-muted)] uppercase">Console Modules</span>
        </div>
        {filteredItems.map(item => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              id={`nav-btn-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-md shadow-indigo-500/20 translate-x-1'
                  : 'text-[var(--theme-text)]/70 hover:text-[var(--theme-text)] hover:bg-[var(--theme-hover)] hover:translate-x-1'
              }`}
            >
              <IconComponent className={`h-4 w-4 shrink-0 transition-transform ${isActive ? 'text-white scale-110' : 'text-[var(--theme-muted)]'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Branding & Turso DB Indicator */}
      <div className="p-3.5 border-t border-[var(--theme-border)] bg-[var(--theme-sidebar)]">
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] text-[9px] font-mono text-[var(--theme-muted)]">
          <div className="flex items-center space-x-1.5 truncate">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate">Turso DB Sync</span>
          </div>
          <Sparkles className="h-3 w-3 text-indigo-500 shrink-0" />
        </div>
      </div>
    </div>
  );
}
