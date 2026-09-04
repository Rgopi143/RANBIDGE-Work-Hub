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
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, isMobileOpen = false, setIsMobileOpen }: SidebarProps) {
  const { currentRole, currentUser } = useWorkspace();

  const ALL_ROLES = [
    'Super Admin', 'CEO', 'CFO', 'CTO', 'COO', 'CMO',
    'HR', 'Manager', 'Project Manager', 'Team Lead',
    'Social Media Manager', 'Guide', 'Mentor', 'Employee', 'Intern'
  ];

  const ADMIN_ROLES = [
    'Super Admin', 'CEO', 'CFO', 'CTO', 'COO', 'CMO', 'HR', 'Manager', 'Project Manager'
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ALL_ROLES },
    { id: 'employees', label: 'Employees', icon: Users, roles: ALL_ROLES.filter(r => r !== 'Intern') },
    { id: 'teams', label: 'Teams & Chat', icon: Building, roles: ALL_ROLES },
    { id: 'projects', label: 'Projects', icon: Briefcase, roles: ALL_ROLES },
    { id: 'tasks', label: 'Task Console', icon: CheckSquare, roles: ALL_ROLES },
    { id: 'attendance', label: 'Attendance', icon: Clock, roles: ALL_ROLES },
    { id: 'leaves', label: 'Leave Requests', icon: CalendarDays, roles: ALL_ROLES },
    { id: 'payroll', label: 'Payroll & Slips', icon: CreditCard, roles: [...ADMIN_ROLES, 'Employee'] },
    { id: 'performance', label: 'Performance & AI', icon: BarChart3, roles: ALL_ROLES },
    { id: 'documents', label: 'Doc Vault', icon: FileText, roles: ALL_ROLES },
    { id: 'communication', label: 'Announcements', icon: Megaphone, roles: ALL_ROLES },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ADMIN_ROLES }
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(currentRole));

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="side-bar"
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[var(--theme-sidebar)] border-r border-[var(--theme-border)] flex flex-col h-screen text-[var(--theme-text)] select-none shrink-0 overflow-hidden transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="px-3 py-2 border-b border-[var(--theme-border)] bg-[var(--theme-sidebar)] flex items-center justify-between">
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <img
              src="/Ranbidge Logo.png"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.png';
              }}
              alt="RANBIDGE Solutions Private Limited"
              className="h-12 w-full max-w-full object-contain"
            />
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen?.(false)}
            className="md:hidden ml-2 p-1.5 text-[var(--theme-muted)] hover:text-[var(--theme-text)] rounded-lg hover:bg-[var(--theme-hover)] cursor-pointer"
            title="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto pb-4 no-scrollbar pt-2">
          {filteredItems.map(item => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                id={`nav-btn-${item.id}`}
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen?.(false);
                }}
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
      </aside>
    </>
  );
}
