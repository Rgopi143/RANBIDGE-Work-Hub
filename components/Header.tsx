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
  Database,
  Sparkles
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
    { id: 'minimal-warm', label: 'Minimal Warm', icon: '☀️', desc: 'Vibrant Light Indigo & Slate' },
    { id: 'slate-dark', label: 'Slate Dark', icon: '🌙', desc: 'Cosmic Cyber Midnight' },
    { id: 'vintage-sepia', label: 'Vintage Sepia', icon: '📜', desc: 'Royal Gold & Soft Amber' },
    { id: 'industrial-mono', label: 'Industrial Mono', icon: '⚡', desc: 'Cyberpunk Neon Synthwave' }
  ];

  const rolesList: { role: Role; details: string; color: string }[] = [
    { role: 'Super Admin', details: 'Full system authorization & terminal commands', color: 'from-indigo-600 to-purple-600' },
    { role: 'HR', details: 'Manage employee details, pan, salary compliance, and logs', color: 'from-emerald-500 to-teal-600' },
    { role: 'Manager', details: 'Full project planning, budgets, team approvals & deliverables', color: 'from-blue-600 to-cyan-600' },
    { role: 'Team Lead', details: 'Manage target tasks, code schedules & KPI reviews', color: 'from-amber-500 to-orange-600' },
    { role: 'Employee', details: 'Track assignments, apply leaves & scan face attendance', color: 'from-purple-600 to-pink-600' },
    { role: 'Intern', details: 'Own personal dashboard & target schedules', color: 'from-teal-500 to-emerald-600' }
  ];

  const mockNotifications = [
    { id: '1', text: 'Sarah Dias approved Intern Rahul Verma\'s leave application.', time: '10 mins ago', icon: CheckCircle, color: 'text-emerald-500' },
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
    <header className="h-16 bg-[var(--theme-bg)] border-b border-[var(--theme-border)] px-6 flex items-center justify-between shrink-0 select-none sticky top-0 z-40 bg-opacity-95 backdrop-blur-md transition-colors duration-300">
      {/* Title block */}
      <div className="flex items-center space-x-3">
        <h2 id="header-page-title" className="text-base font-extrabold tracking-tight text-[var(--theme-text)] flex items-center gap-2">
          <span>{getPageTitle(activeTab)}</span>
        </h2>
        <span className="h-4 w-px bg-[var(--theme-border)]" />
        <span className="text-[10px] font-mono text-[var(--theme-muted)] bg-[var(--theme-card)] px-2.5 py-1 rounded-full border border-[var(--theme-border)] shadow-xs flex items-center space-x-1.5">
          <Database className="h-3 w-3 text-cyan-500 shrink-0" />
          <span className="font-semibold">Turso: ranbidge-workspace</span>
        </span>
      </div>

      {/* Right Actions Block */}
      <div className="flex items-center space-x-3">
        {/* Visual Theme Selection Console */}
        <div className="relative">
          <button
            id="theme-select-btn"
            onClick={() => {
              setShowThemeDropdown(!showThemeDropdown);
              setShowRoleDropdown(false);
              setShowNotificationDropdown(false);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] hover:bg-[var(--theme-hover)] text-[var(--theme-text)] font-sans text-xs font-semibold cursor-pointer shadow-xs transition-all hover:scale-102"
          >
            <Palette className="h-4 w-4 text-indigo-500 shrink-0" />
            <span className="tracking-wide">Theme: {
              themesList.find(t => t.id === currentTheme)?.label || 'Theme'
            }</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform text-[var(--theme-muted)] shrink-0 ${showThemeDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showThemeDropdown && (
            <div id="theme-select-dropdown" className="absolute right-0 mt-2 w-64 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-3 border-b border-[var(--theme-border)] bg-[var(--theme-sidebar)] flex items-center space-x-2">
                <Palette className="h-4 w-4 text-indigo-500" />
                <span className="text-[10px] font-bold text-[var(--theme-text)] tracking-wider uppercase font-mono">Workspace Themes</span>
              </div>
              <div className="p-2 space-y-1">
                {themesList.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTheme(item.id);
                      setShowThemeDropdown(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all hover:bg-[var(--theme-hover)] cursor-pointer flex items-center space-x-3 ${
                      currentTheme === item.id ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 font-bold' : 'border border-transparent'
                    }`}
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[var(--theme-text)] truncate">{item.label}</h4>
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
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border border-[var(--theme-border)] bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-sans text-xs font-semibold cursor-pointer shadow-xs transition-all hover:scale-102"
          >
            <ShieldCheck className="h-4 w-4 text-white shrink-0" />
            <span className="tracking-wide">Role: {currentRole}</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform text-white/80 shrink-0 ${showRoleDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showRoleDropdown && (
            <div id="role-select-dropdown" className="absolute right-0 mt-2 w-80 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-3.5 border-b border-[var(--theme-border)] bg-[var(--theme-sidebar)] flex items-center space-x-2">
                <Info className="h-4 w-4 text-indigo-500" />
                <span className="text-[10px] font-bold text-[var(--theme-text)] tracking-wider uppercase font-mono">Simulate Perms Context</span>
              </div>
              <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
                {rolesList.map(item => (
                  <button
                    key={item.role}
                    onClick={() => {
                      setCurrentRole(item.role);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all hover:bg-[var(--theme-hover)] cursor-pointer flex items-start space-x-3 ${
                      currentRole === item.role ? 'bg-indigo-500/10 border border-indigo-500/30' : 'border border-transparent'
                    }`}
                  >
                    <div className={`mt-1 h-3 w-3 rounded-full bg-gradient-to-r ${item.color} shrink-0 shadow-xs`} />
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

        {/* Notifications Icon */}
        <div className="relative">
          <button
            id="notif-btn"
            onClick={() => {
              setShowNotificationDropdown(!showNotificationDropdown);
              setShowRoleDropdown(false);
              setShowThemeDropdown(false);
            }}
            className="p-2 text-[var(--theme-text)] hover:bg-[var(--theme-hover)] rounded-xl transition-all relative cursor-pointer border border-[var(--theme-border)] bg-[var(--theme-card)] shadow-xs"
          >
            <Bell className="h-4 w-4 text-indigo-500" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full animate-ping shrink-0" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full shrink-0" />
          </button>

          {showNotificationDropdown && (
            <div id="notif-dropdown" className="absolute right-0 mt-2 w-96 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-3.5 border-b border-[var(--theme-border)] bg-[var(--theme-sidebar)] flex justify-between items-center">
                <span className="text-xs font-bold text-[var(--theme-text)] tracking-wider uppercase font-mono flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Operational Alerts</span>
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-rose-500/10 text-rose-500 rounded-full uppercase border border-rose-500/20">3 New</span>
              </div>
              <div className="p-2 divide-y divide-[var(--theme-border)] max-h-96 overflow-y-auto">
                {mockNotifications.map(notif => {
                  const Icon = notif.icon;
                  return (
                    <div key={notif.id} className="p-3 flex items-start space-x-3 hover:bg-[var(--theme-hover)] rounded-xl transition-colors">
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
