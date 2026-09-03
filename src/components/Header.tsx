/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
  Sparkles,
  LogOut,
  Trash2,
  User,
  Menu
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setIsMobileOpen?: (open: boolean) => void;
}

export default function Header({ activeTab, setIsMobileOpen }: HeaderProps) {
  const { currentRole, setCurrentRole, currentUser, currentTheme, setCurrentTheme, logout } = useWorkspace();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const roleRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotificationDropdown(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setShowRoleDropdown(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setShowThemeDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotificationDropdown(false);
        setShowRoleDropdown(false);
        setShowThemeDropdown(false);
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const INITIAL_NOTIFS = [
    { id: '1', text: 'Sarah Dias approved Intern Rahul Verma\'s leave application.', time: '10 mins ago', icon: CheckCircle, color: 'text-emerald-500' },
    { id: '2', text: 'TSK-203 (SBI Landing Dashboard) flagged delayed by AI Co-pilot.', time: '1 hour ago', icon: Clock, color: 'text-amber-500 font-medium' },
    { id: '3', text: 'Principal Rajesh Kumar updated RAN AI OS Product specification checklist.', time: 'Yesterday', icon: CalendarCheck, color: 'text-blue-500' }
  ];

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('RAN_WORKHUB_notifications_' + currentRole);
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_NOTIFS;
      }
    }
    return INITIAL_NOTIFS;
  });

  useEffect(() => {
    const saved = localStorage.getItem('RAN_WORKHUB_notifications_' + currentRole);
    if (saved !== null) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        setNotifications(INITIAL_NOTIFS);
      }
    } else {
      setNotifications(INITIAL_NOTIFS);
    }
  }, [currentRole]);

  const handleClearNotifications = async () => {
    setNotifications([]);
    localStorage.setItem('RAN_WORKHUB_notifications_' + currentRole, '[]');
    try {
      await fetch(`/api/db/notifications/clear/${encodeURIComponent(currentRole)}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn("Cleared locally, DB sync error:", err);
    }
  };

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
        <button
          onClick={() => setIsMobileOpen?.(true)}
          className="md:hidden p-2 text-[var(--theme-text)] hover:bg-[var(--theme-hover)] rounded-xl transition-all border border-[var(--theme-border)] bg-[var(--theme-card)] shadow-xs flex items-center justify-center cursor-pointer"
          title="Open mobile navigation menu"
        >
          <Menu className="h-5 w-5 text-indigo-500" />
        </button>
        <h2 id="header-page-title" className="text-sm md:text-base font-extrabold tracking-tight text-[var(--theme-text)] flex items-center gap-2 truncate">
          <span>{getPageTitle(activeTab)}</span>
        </h2>
      </div>

      {/* Right Actions Block */}
      <div className="flex items-center space-x-3">

        {/* Notification & Logout Icon Console */}
        <div ref={notifRef} className="relative flex items-center gap-2">
          <button
            id="notif-bell-btn"
            onClick={() => {
              setShowNotificationDropdown(!showNotificationDropdown);
              setShowRoleDropdown(false);
              setShowThemeDropdown(false);
            }}
            title="Notifications"
            className="p-2 text-[var(--theme-text)] hover:bg-[var(--theme-hover)] rounded-xl transition-all relative cursor-pointer border border-[var(--theme-border)] bg-[var(--theme-card)] shadow-xs flex items-center justify-center"
          >
            <Bell className="h-4 w-4 text-indigo-500" />
            {notifications.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs border-2 border-[var(--theme-bg)] shrink-0">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Profile Icon Button & Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotificationDropdown(false);
              }}
              title="User Account & Profile"
              className="p-1 rounded-xl transition-all cursor-pointer border border-[var(--theme-border)] bg-[var(--theme-card)] shadow-xs flex items-center gap-1.5 hover:ring-2 hover:ring-indigo-500/30"
            >
              <img
                src={currentUser?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={currentUser?.name || 'User Profile'}
                className="h-7 w-7 rounded-lg object-cover ring-1 ring-indigo-500/40 shrink-0"
              />
              <ChevronDown className={`h-3.5 w-3.5 text-[var(--theme-muted)] transition-transform mr-1 ${showProfileDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="p-3.5 border-b border-[var(--theme-border)] bg-[var(--theme-sidebar)] flex items-center space-x-3">
                  <img
                    src={currentUser?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt="Profile"
                    className="h-10 w-10 rounded-xl object-cover ring-2 ring-indigo-500/30 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[var(--theme-text)] truncate">{currentUser?.name || 'User Profile'}</h4>
                    <span className="text-[10px] text-indigo-500 block truncate font-mono font-semibold">{currentRole}</span>
                    <span className="text-[10px] text-[var(--theme-muted)] block truncate">{currentUser?.email || 'user@ranbidge.com'}</span>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      logout();
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-rose-500 hover:bg-rose-500/10 rounded-xl font-semibold flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    <span>Sign Out of Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {showNotificationDropdown && (
            <div id="notif-dropdown" className="absolute right-0 top-full mt-2 w-96 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-3.5 border-b border-[var(--theme-border)] bg-[var(--theme-sidebar)] flex justify-between items-center">
                <span className="text-xs font-bold text-[var(--theme-text)] tracking-wider uppercase font-mono">
                  <span>Alerts</span>
                </span>
                <div className="flex items-center space-x-2">
                  {notifications.length > 0 && (
                    <button
                      onClick={handleClearNotifications}
                      className="px-2 py-0.5 text-[10px] font-medium text-rose-500 hover:text-white bg-rose-500/10 hover:bg-rose-500 rounded-md border border-rose-500/20 transition-all flex items-center gap-1 cursor-pointer"
                      title="Clear all operational alerts"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Clear All</span>
                    </button>
                  )}
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-500/10 text-indigo-500 rounded-full uppercase border border-indigo-500/20">
                    {notifications.length} New
                  </span>
                </div>
              </div>
              <div className="p-2 divide-y divide-[var(--theme-border)] max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notif => {
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
                  })
                ) : (
                  <div className="p-8 text-center text-[var(--theme-muted)]">
                    <CheckCircle className="h-8 w-8 text-emerald-500/60 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-[var(--theme-text)]">All Caught Up!</p>
                    <p className="text-[10px] mt-0.5">No unread notifications</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
