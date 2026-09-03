/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Role } from '../types';
import {
  Bell,
  ShieldCheck,
  ChevronDown,
  Info,
  CalendarCheck,
  CheckCircle,
  Clock,
  Palette,
  Database
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
}

export default function Header({ activeTab }: HeaderProps) {
  const { currentRole, setCurrentRole, currentUser, currentTheme, setCurrentTheme } = useWorkspace();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const themesList = [
    { id: 'minimal-warm', label: 'Minimal Warm', icon: '☀️', desc: 'Soft warm light with slate' },
    { id: 'slate-dark', label: 'Slate Dark', icon: '🌙', desc: 'Deep cosmic slate gray' },
    { id: 'vintage-sepia', label: 'Vintage Sepia', icon: '📜', desc: 'Aged paperback paper' },
    { id: 'industrial-mono', label: 'Industrial Mono', icon: '🔲', desc: 'Cyber stark brutalism' }
  ];

  const rolesList: { role: Role; details: string; color: string }[] = [
    { role: 'Super Admin', details: 'Full system authorization & terminal commands', color: 'bg-indigo-600' },
    { role: 'HR', details: 'Manage employee details, pan, salary compliance, and logs', color: 'bg-emerald-600' },
    { role: 'Manager', details: 'Full project planning, budgets, team approvals & deliverables', color: 'bg-sky-600' },
    { role: 'Team Lead', details: 'Manage target tasks, code schedules & KPI reviews', color: 'bg-amber-600' },
    { role: 'Employee', details: 'Track assignments, apply leaves & scan face attendance', color: 'bg-purple-600' },
    { role: 'Intern', details: 'Own personal dashboard & target schedules', color: 'bg-teal-600' }
  ];

  // Simulated notifications list
  const mockNotifications = [
    { id: '1', text: 'Sarah Dias approved Intern Rahul Verma\'s leave application.', time: '10 mins ago', icon: CheckCircle, color: 'text-green-500' },
    { id: '2', text: 'TSK-203 (SBI Landing Dashboard) flagged delayed by AI Co-pilot.', time: '1 hour ago', icon: Clock, color: 'text-amber-500 font-medium' },
    { id: '3', text: 'Principal Rajesh Kumar updated RAN AI OS Product specification checklist.', time: 'Yesterday', icon: CalendarCheck, color: 'text-blue-500' }
  ];

  const getPageTitle = (tabId: string) => {
    switch (tabId) {
      case 'dashboard': return 'Operations Dashboard';
      case 'employees': return 'Employee Directory';
      case 'teams': return 'Team Formations & Central Chat';
      case 'projects': return 'Product & Client Engineering Projects';
      case 'tasks': return 'Sprint Task Console';
      case 'attendance': return 'Simulated Attendance scan logs';
      case 'leaves': return 'Time-off and Leave console';
      case 'payroll': return 'Salary Calculation and Payslips';
      case 'performance': return 'AI Performance & Operational Analytics';
      case 'documents': return 'Doc Vault System';
      case 'communication': return 'Announcements Board';
      case 'settings': return 'Enterprise Configurations';
      default: return 'RAN Core OS';
    }
  };

  return (
    <header className="h-16 bg-[var(--theme-bg)] border-b border-[var(--theme-border)] px-6 flex items-center justify-between shrink-0 select-none sticky top-0 z-40 bg-opacity-95 backdrop-blur-sm transition-colors duration-250">
      {/* Title block */}
      <div className="flex items-center space-x-2">
        <h2 id="header-page-title" className="text-sm font-serif italic font-bold tracking-tight text-[var(--theme-text)] transition-all">{getPageTitle(activeTab)}</h2>
        <span className="h-4 w-px bg-[var(--theme-border)]" />
        <span className="text-[9px] font-mono text-[var(--theme-muted)] bg-[var(--theme-sidebar)] px-2 py-0.5 rounded-sm border border-[var(--theme-border)] flex items-center space-x-1">
          <Database className="h-3 w-3 text-cyan-500 inline mr-1" />
          <span>Turso DB: ranbidge-workspace</span>
        </span>
      </div>

      {/* Right Actions Block */}
      <div className="flex items-center space-x-4">
        {/* Visual Theme Selection Console */}
        <div className="relative">
          <button
            id="theme-select-btn"
            onClick={() => {
              setShowThemeDropdown(!showThemeDropdown);
              setShowRoleDropdown(false);
              setShowNotificationDropdown(false);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-sm border border-[var(--theme-border)] bg-[var(--theme-sidebar)] hover:bg-[var(--theme-hover)] text-[var(--theme-text)] font-sans text-xs font-semibold cursor-pointer transition-all"
          >
            <Palette className="h-4 w-4 text-[var(--theme-text)] shrink-0" />
            <span className="tracking-wide">Theme: {
              themesList.find(t => t.id === currentTheme)?.label || 'Theme'
            }</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform text-[var(--theme-text)]/70 shrink-0 ${showThemeDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showThemeDropdown && (
            <div id="theme-select-dropdown" className="absolute right-0 mt-2 w-64 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-sm shadow-xl overflow-hidden z-20">
              <div className="p-3 border-b border-[var(--theme-border)] bg-[var(--theme-sidebar)] flex items-center space-x-2">
                <Palette className="h-4 w-4 text-[var(--theme-muted)]" />
                <span className="text-[10px] font-bold text-[var(--theme-text)] tracking-wider uppercase font-mono">Workspace Themes</span>
              </div>
              <div className="p-1.5 space-y-0.5 max-h-96 overflow-y-auto">
                {themesList.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTheme(item.id);
                      setShowThemeDropdown(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-sm transition-all hover:bg-[var(--theme-hover)] cursor-pointer flex items-center space-x-3 ${
                      currentTheme === item.id ? 'bg-[var(--theme-hover)] border border-[var(--theme-border)] font-bold' : 'border border-transparent'
                    }`}
                  >
                    <span className="text-base shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs text-[var(--theme-text)] truncate">{item.label}</h4>
                      <p className="text-[9px] text-[var(--theme-muted)] truncate">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher Button Console */}
        <div className="relative">
          <button
            id="role-switch-btn"
            onClick={() => {
              setShowRoleDropdown(!showRoleDropdown);
              setShowNotificationDropdown(false);
              setShowThemeDropdown(false);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-sm border border-[var(--theme-border)] bg-[var(--theme-sidebar)] hover:bg-[var(--theme-hover)] text-[var(--theme-text)] font-sans text-xs font-semibold cursor-pointer transition-all"
          >
            <ShieldCheck className="h-4 w-4 text-[var(--theme-text)] shrink-0" />
            <span className="tracking-wide">Role: {currentRole}</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform text-[var(--theme-text)]/70 shrink-0 ${showRoleDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showRoleDropdown && (
            <div id="role-select-dropdown" className="absolute right-0 mt-2 w-80 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-sm shadow-xl overflow-hidden z-20">
              <div className="p-3 border-b border-[var(--theme-border)] bg-[var(--theme-sidebar)] flex items-center space-x-2">
                <Info className="h-4 w-4 text-[var(--theme-muted)]" />
                <span className="text-[10px] font-bold text-[var(--theme-text)] tracking-wider uppercase font-mono">Simulate Perms</span>
              </div>
              <div className="p-1.5 max-h-96 overflow-y-auto">
                {rolesList.map(item => (
                  <button
                    key={item.role}
                    onClick={() => {
                      setCurrentRole(item.role);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left p-3 rounded-sm transition-all hover:bg-[var(--theme-hover)] cursor-pointer flex items-start space-x-3 ${
                      currentRole === item.role ? 'bg-[var(--theme-hover)] border border-[var(--theme-border)]' : 'border border-transparent'
                    }`}
                  >
                    <div className={`mt-0.5 h-2 w-2 rounded-full ring-2 ring-offset-2 ${item.color} shrink-0`} />
                    <div>
                      <h4 className="text-xs font-bold text-[var(--theme-text)]">{item.role}</h4>
                      <p className="text-[10px] text-[var(--theme-muted)] leading-relaxed mt-0.5">{item.details}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Icon with simulated Badge */}
        <div className="relative">
          <button
            id="notif-btn"
            onClick={() => {
              setShowNotificationDropdown(!showNotificationDropdown);
              setShowRoleDropdown(false);
              setShowThemeDropdown(false);
            }}
            className="p-1.5 text-[var(--theme-text)]/70 hover:text-[var(--theme-text)] hover:bg-[var(--theme-sidebar)] rounded-sm transition-all relative cursor-pointer flex items-center justify-center border border-[var(--theme-border)] bg-[var(--theme-bg)]"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-600 rounded-full shrink-0" />
          </button>

          {showNotificationDropdown && (
            <div id="notif-dropdown" className="absolute right-0 mt-2 w-96 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-sm shadow-xl overflow-hidden z-20">
              <div className="p-3.5 border-b border-[var(--theme-border)] bg-[var(--theme-sidebar)] flex justify-between items-center">
                <span className="text-xs font-bold text-[var(--theme-text)] tracking-wider uppercase font-mono">Operational Alerts</span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-red-50/10 text-red-500 uppercase">3 New</span>
              </div>
              <div className="p-1.5 divide-y divide-[var(--theme-border)] max-h-96 overflow-y-auto">
                {mockNotifications.map(notif => {
                  const Icon = notif.icon;
                  return (
                    <div key={notif.id} className="p-3 flex items-start space-x-3 hover:bg-[var(--theme-hover)] transition-colors">
                      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${notif.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[var(--theme-text)] leading-normal">{notif.text}</p>
                        <span className="text-[9px] font-mono text-[var(--theme-muted)] block mt-1">{notif.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
