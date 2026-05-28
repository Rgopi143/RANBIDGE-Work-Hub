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
  MessageSquare,
  Megaphone,
  Settings,
  ShieldCheck,
  Zap,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const { currentRole, currentUser } = useWorkspace();

  // Menu item structure with role locks
  // HR can see Employees, Payroll. Lead can see Teams, Analytics. Employee/Intern can see profiles, tasks, leaves. Super Admin sees all.
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
    <div id="side-bar" className="w-64 bg-[var(--theme-sidebar)] border-r border-[var(--theme-border)] flex flex-col h-screen text-[var(--theme-text)] select-none shrink-0 sticky top-0 overflow-hidden transition-colors duration-250">
      {/* Brand Header */}
      <div className="p-6 border-b border-[var(--theme-border)] flex items-center space-x-3 bg-[var(--theme-sidebar)] transition-colors duration-250">
        <div className="w-10 h-10 bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] flex items-center justify-center rounded-sm font-serif text-xl font-bold transition-all">
          R
        </div>
        <div>
          <h1 className="text-sm font-serif font-black tracking-wider text-[var(--theme-text)] uppercase transition-colors duration-250">RAN WorkHub</h1>
          <p className="text-[9px] text-[var(--theme-muted)] font-mono tracking-widest uppercase font-bold transition-colors duration-250">RANBIDGE Operating System</p>
        </div>
      </div>

      {/* Profile summary */}
      <div className="p-4 mx-4 my-4 bg-[var(--theme-hover)] border border-[var(--theme-border)] rounded-sm flex items-center space-x-3 transition-colors duration-250">
        <img
          src={currentUser?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
          className="h-10 w-10 rounded-sm object-cover ring-1 ring-[var(--theme-border)] referer-policy"
          referrerPolicy="no-referrer"
          alt="Profile"
        />
        <div className="overflow-hidden">
          <h4 className="text-xs font-bold text-[var(--theme-text)] truncate transition-colors duration-250">{currentUser?.name || 'LoadingUser...'}</h4>
          <span className="text-[10px] font-mono text-[var(--theme-muted)] block truncate transition-colors duration-250">{currentUser?.designation || 'Specialist'}</span>
          <span className="inline-flex mt-1 px-1.5 py-0.5 rounded-sm text-[9px] font-mono font-bold bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] tracking-wider">
            {currentRole}
          </span>
        </div>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto pb-4 no-scrollbar transition-colors duration-250">
        <div className="px-3 mb-2">
          <span className="text-[10px] font-bold tracking-widest text-[var(--theme-muted)] uppercase transition-colors duration-250">Enterprise OS</span>
        </div>
        {filteredItems.map(item => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              id={`nav-btn-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-sm text-xs font-medium cursor-pointer transition-all ${
                isActive
                  ? 'bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] font-semibold border border-[var(--theme-border)]'
                  : 'text-[var(--theme-text)]/70 hover:text-[var(--theme-text)] hover:bg-[var(--theme-hover)]'
              }`}
            >
              <IconComponent className={`h-4 w-4 shrink-0 transition-colors ${isActive ? 'text-[var(--theme-button-text)]' : 'text-[var(--theme-text)]/60'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="px-3 py-2 border-t border-[var(--theme-border)] transition-colors duration-250">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-sm text-xs font-medium cursor-pointer transition-all text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-[var(--theme-border)] text-center bg-[var(--theme-hover)]/25 transition-colors duration-250">
        <span className="text-[9px] font-mono text-[var(--theme-muted)] uppercase tracking-widest transition-colors duration-250">
          RAN Workspace OS © 2026
        </span>
      </div>
    </div>
  );
}
