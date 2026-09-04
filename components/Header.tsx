/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  Menu,
  FileBadge,
  KeyRound,
  Upload,
  FileText,
  Edit3
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setIsMobileOpen?: (open: boolean) => void;
}

export default function Header({ activeTab, setIsMobileOpen }: HeaderProps) {
  const { currentRole, setCurrentRole, currentUser, currentTheme, setCurrentTheme, logout, updateEmployee } = useWorkspace();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Document Upload & Password Change Modal State
  const [showDocModal, setShowDocModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [docAadhaar, setDocAadhaar] = useState('');
  const [docPan, setDocPan] = useState('');
  const [docResume, setDocResume] = useState('');
  const [docOffer, setDocOffer] = useState('');
  const [docNda, setDocNda] = useState('');
  // Profile Setup State
  const [profileName, setProfileName] = useState('');
  const [profileDesignation, setProfileDesignation] = useState('');
  const [profileDepartment, setProfileDepartment] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileMobile, setProfileMobile] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [saveSuccessBanner, setSaveSuccessBanner] = useState(false);
  const [passwordSuccessBanner, setPasswordSuccessBanner] = useState(false);
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  useEffect(() => {
    if (currentUser && showDocModal) {
      setProfileName(currentUser.name || '');
      setProfileDesignation(currentUser.designation || currentRole);
      setProfileDepartment(currentUser.department || 'Operations');
      setProfileEmail(currentUser.email || '');
      setProfileMobile(currentUser.mobile || '');
      setProfilePhoto(currentUser.photo || '');
      setDocAadhaar(currentUser.documents?.aadhaar || 'Uploaded_Aadhaar.pdf');
      setDocPan(currentUser.documents?.pan || 'Uploaded_PAN.pdf');
      setDocResume(currentUser.documents?.resume || 'Uploaded_CV.pdf');
      setDocOffer(currentUser.documents?.offerLetter || 'Uploaded_Offer.pdf');
      setDocNda(currentUser.documents?.nda || 'Signed_NDA_Digital.pdf');
      setIsProfileSaved(false);
    }
  }, [currentUser, showDocModal, currentRole]);

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
        setShowDocModal(false);
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
                <div className="p-3.5 border-b border-[var(--theme-border)] bg-[var(--theme-sidebar)] flex items-center justify-between">
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={currentUser?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt="Profile"
                      className="h-10 w-10 rounded-xl object-cover ring-2 ring-indigo-500/30 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-[var(--theme-text)] truncate">{currentUser?.name || 'User Profile'}</h4>
                      <div className="flex items-center space-x-1.5 mt-0.5">
                        <span className="status-dot-active shrink-0"></span>
                        <span className="text-[10px] text-indigo-500 block truncate font-mono font-semibold">{currentRole}</span>
                      </div>
                      <span className="text-[10px] text-[var(--theme-muted)] block truncate">{currentUser?.email || 'user@ranbidge.com'}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      setShowDocModal(true);
                    }}
                    className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer shrink-0"
                    title="Edit Profile Details"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      if (currentUser?.documents) {
                        setDocAadhaar(currentUser.documents.aadhaar || 'Uploaded_Aadhaar.pdf');
                        setDocPan(currentUser.documents.pan || 'Uploaded_PAN.pdf');
                        setDocResume(currentUser.documents.resume || 'Uploaded_CV.pdf');
                        setDocOffer(currentUser.documents.offerLetter || 'Uploaded_Offer.pdf');
                        setDocNda(currentUser.documents.nda || 'Signed_NDA_Digital.pdf');
                      }
                      setShowDocModal(true);
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-[var(--theme-text)] hover:bg-[var(--theme-hover)] rounded-xl font-semibold flex items-center space-x-2 transition-colors cursor-pointer bg-indigo-500/5 hover:bg-indigo-500/15 text-indigo-600"
                  >
                    <Edit3 className="h-4 w-4 text-indigo-500 shrink-0" />
                    <span>Edit Profile Details</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      if (currentUser?.documents) {
                        setDocAadhaar(currentUser.documents.aadhaar || 'Uploaded_Aadhaar.pdf');
                        setDocPan(currentUser.documents.pan || 'Uploaded_PAN.pdf');
                        setDocResume(currentUser.documents.resume || 'Uploaded_CV.pdf');
                        setDocOffer(currentUser.documents.offerLetter || 'Uploaded_Offer.pdf');
                        setDocNda(currentUser.documents.nda || 'Signed_NDA_Digital.pdf');
                      }
                      setShowDocModal(true);
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-[var(--theme-text)] hover:bg-[var(--theme-hover)] rounded-xl font-semibold flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <FileBadge className="h-4 w-4 text-indigo-500 shrink-0" />
                    <span>ID Proofs & Password Credentials</span>
                  </button>

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

      {/* Document Upload & Password Change Modal for Logged-In User */}
      {showDocModal && createPortal(
        <div 
          onClick={() => setShowDocModal(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99999] overflow-y-auto p-4 sm:p-6 flex items-start sm:items-center justify-center cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-2xl w-full max-w-xl p-6 shadow-2xl relative text-[#1A1A1A] my-auto max-h-[85vh] flex flex-col cursor-default"
          >
            <button
              onClick={() => setShowDocModal(false)}
              className="absolute top-4 right-4 text-[#8C8984] hover:text-[#1A1A1A] cursor-pointer z-10"
            >
              <Menu className="w-5 h-5 rotate-45 hidden" />
              <span className="text-base font-bold font-mono px-2 py-0.5 border border-[#E5E2DE] rounded-md hover:bg-slate-100 transition-colors">✕</span>
            </button>

            <div className="flex items-center space-x-3 mb-4 shrink-0 pr-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                <FileBadge className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A]">Setup Profile & Security Credentials</h3>
                <p className="text-xs text-[#8C8984] font-medium font-mono">Active Role: {currentRole} ({currentUser?.id || 'EMP-001'})</p>
              </div>
            </div>

            {saveSuccessBanner && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 animate-fade-in font-mono shrink-0">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Profile info, security credentials & 5 ID proofs updated successfully!</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newPassword && newPassword !== confirmPassword) {
                  alert("Passwords do not match! Please check again.");
                  return;
                }
                if (currentUser) {
                  updateEmployee(currentUser.id, {
                    name: profileName || currentUser.name,
                    photo: profilePhoto || currentUser.photo,
                    designation: profileDesignation || currentUser.designation,
                    department: profileDepartment || currentUser.department,
                    email: profileEmail || currentUser.email,
                    mobile: profileMobile || currentUser.mobile,
                    documents: {
                      aadhaar: docAadhaar || currentUser.documents?.aadhaar || 'Uploaded_Aadhaar.pdf',
                      pan: docPan || currentUser.documents?.pan || 'Uploaded_PAN.pdf',
                      resume: docResume || currentUser.documents?.resume || 'Uploaded_CV.pdf',
                      offerLetter: docOffer || currentUser.documents?.offerLetter || 'Uploaded_Offer.pdf',
                      nda: docNda || currentUser.documents?.nda || 'Signed_NDA_Digital.pdf'
                    }
                  });
                }
                setSaveSuccessBanner(true);
                setTimeout(() => {
                  setSaveSuccessBanner(false);
                  setShowDocModal(false);
                }, 1200);
              }}
              className="space-y-4 flex-1 overflow-y-auto pr-1"
            >
              {/* Profile Setup Information */}
              <div className="p-3.5 bg-[#F9F7F4] border border-[#E5E2DE] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 font-mono">
                    <FileBadge className="w-4 h-4 text-indigo-600" />
                    <span>PROFILE INFORMATION ({currentRole.toUpperCase()})</span>
                  </span>
                  {isProfileSaved && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-bold font-mono flex items-center gap-1 animate-fade-in">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Personal Details Saved!
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#8C8984] font-mono uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={profileName}
                      onChange={(e) => {
                        setProfileName(e.target.value);
                        setIsProfileSaved(false);
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#E5E2DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#8C8984] font-mono uppercase mb-1">Designation</label>
                    <input
                      type="text"
                      placeholder="Job Designation"
                      value={profileDesignation}
                      onChange={(e) => {
                        setProfileDesignation(e.target.value);
                        setIsProfileSaved(false);
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#E5E2DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#8C8984] font-mono uppercase mb-1">Department</label>
                    <input
                      type="text"
                      placeholder="Department"
                      value={profileDepartment}
                      onChange={(e) => {
                        setProfileDepartment(e.target.value);
                        setIsProfileSaved(false);
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#E5E2DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#8C8984] font-mono uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={profileEmail}
                      onChange={(e) => {
                        setProfileEmail(e.target.value);
                        setIsProfileSaved(false);
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#E5E2DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-[#8C8984] font-mono uppercase mb-1">Mobile Contact</label>
                    <input
                      type="text"
                      placeholder="Mobile number"
                      value={profileMobile}
                      onChange={(e) => {
                        setProfileMobile(e.target.value);
                        setIsProfileSaved(false);
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#E5E2DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentUser) {
                        updateEmployee(currentUser.id, {
                          name: profileName || currentUser.name,
                          photo: profilePhoto || currentUser.photo,
                          designation: profileDesignation || currentUser.designation,
                          department: profileDepartment || currentUser.department,
                          email: profileEmail || currentUser.email,
                          mobile: profileMobile || currentUser.mobile
                        });
                      }
                      setIsProfileSaved(true);
                    }}
                    className={`px-4 py-1.5 text-xs font-mono font-bold rounded-md transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                      isProfileSaved
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600'
                        : 'bg-[#2D2D2D] hover:bg-[#1A1A1A] text-white border border-[#2D2D2D]'
                    }`}
                  >
                    {isProfileSaved ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <span>Save</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Security Password Change Section */}
              <div className="p-3.5 bg-[#F9F7F4] border border-[#E5E2DE] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 font-mono">
                    <KeyRound className="w-4 h-4 text-indigo-600" />
                    <span>CHANGE PASSWORD</span>
                  </span>
                  {passwordSuccessBanner && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-bold font-mono flex items-center gap-1 animate-fade-in">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Password Updated!
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#8C8984] font-mono uppercase mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E5E2DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#8C8984] font-mono uppercase mb-1">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E5E2DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (!newPassword) {
                        alert("Please enter a new password.");
                        return;
                      }
                      if (newPassword !== confirmPassword) {
                        alert("Passwords do not match! Please check again.");
                        return;
                      }
                      if (currentUser) {
                        updateEmployee(currentUser.id, {
                          password: newPassword
                        });
                      }
                      setPasswordSuccessBanner(true);
                      setTimeout(() => setPasswordSuccessBanner(false), 2500);
                    }}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-bold rounded-md transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-white" />
                    <span>Update Password</span>
                  </button>
                </div>
              </div>

              {/* ID Proofs & Legal Archives Upload Section */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1A1A1A] flex items-center justify-between font-mono">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span>ID PROOFS & LEGAL ARCHIVES</span>
                  </span>
                  <span className="text-[10px] text-[#8C8984]">5 Legal Archives</span>
                </span>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {/* 1. Aadhaar */}
                  <div className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate min-w-0 pr-2">
                      <FileBadge className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                      <span className="font-bold text-[#1A1A1A] shrink-0 font-mono">AADHAAR:</span>
                      <span className="text-[#8C8984] font-mono truncate text-[11px] font-bold">{docAadhaar || 'Uploaded_Aadhaar.pdf'}</span>
                    </div>
                    <label className={`px-2.5 py-1 text-[10px] font-bold font-mono rounded-md cursor-pointer transition-all shrink-0 flex items-center gap-1.5 shadow-xs ${
                      docAadhaar 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600' 
                        : 'bg-white border border-[#E5E2DE] hover:bg-[#E5E2DE] text-[#1A1A1A]'
                    }`}>
                      {docAadhaar ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-white shrink-0" />
                          <span>Uploaded</span>
                        </>
                      ) : (
                        <span>Upload File</span>
                      )}
                      <input 
                        type="file" 
                        accept=".pdf,.png,.jpg"
                        onChange={(e) => { if(e.target.files?.[0]) setDocAadhaar(e.target.files[0].name); }} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* 2. PAN */}
                  <div className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate min-w-0 pr-2">
                      <FileBadge className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                      <span className="font-bold text-[#1A1A1A] shrink-0 font-mono">PAN:</span>
                      <span className="text-[#8C8984] font-mono truncate text-[11px] font-bold">{docPan || 'Uploaded_PAN.pdf'}</span>
                    </div>
                    <label className={`px-2.5 py-1 text-[10px] font-bold font-mono rounded-md cursor-pointer transition-all shrink-0 flex items-center gap-1.5 shadow-xs ${
                      docPan 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600' 
                        : 'bg-white border border-[#E5E2DE] hover:bg-[#E5E2DE] text-[#1A1A1A]'
                    }`}>
                      {docPan ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-white shrink-0" />
                          <span>Uploaded</span>
                        </>
                      ) : (
                        <span>Upload File</span>
                      )}
                      <input 
                        type="file" 
                        accept=".pdf,.png,.jpg"
                        onChange={(e) => { if(e.target.files?.[0]) setDocPan(e.target.files[0].name); }} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* 3. RESUME */}
                  <div className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate min-w-0 pr-2">
                      <FileBadge className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                      <span className="font-bold text-[#1A1A1A] shrink-0 font-mono">RESUME:</span>
                      <span className="text-[#8C8984] font-mono truncate text-[11px] font-bold">{docResume || 'Uploaded_CV.pdf'}</span>
                    </div>
                    <label className={`px-2.5 py-1 text-[10px] font-bold font-mono rounded-md cursor-pointer transition-all shrink-0 flex items-center gap-1.5 shadow-xs ${
                      docResume 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600' 
                        : 'bg-white border border-[#E5E2DE] hover:bg-[#E5E2DE] text-[#1A1A1A]'
                    }`}>
                      {docResume ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-white shrink-0" />
                          <span>Uploaded</span>
                        </>
                      ) : (
                        <span>Upload File</span>
                      )}
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => { if(e.target.files?.[0]) setDocResume(e.target.files[0].name); }} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* 4. OFFER LETTER */}
                  <div className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate min-w-0 pr-2">
                      <FileBadge className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                      <span className="font-bold text-[#1A1A1A] shrink-0 font-mono">OFFERLETTER:</span>
                      <span className="text-[#8C8984] font-mono truncate text-[11px] font-bold">{docOffer || 'Uploaded_Offer.pdf'}</span>
                    </div>
                    <label className={`px-2.5 py-1 text-[10px] font-bold font-mono rounded-md cursor-pointer transition-all shrink-0 flex items-center gap-1.5 shadow-xs ${
                      docOffer 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600' 
                        : 'bg-white border border-[#E5E2DE] hover:bg-[#E5E2DE] text-[#1A1A1A]'
                    }`}>
                      {docOffer ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-white shrink-0" />
                          <span>Uploaded</span>
                        </>
                      ) : (
                        <span>Upload File</span>
                      )}
                      <input 
                        type="file" 
                        accept=".pdf,.png,.jpg"
                        onChange={(e) => { if(e.target.files?.[0]) setDocOffer(e.target.files[0].name); }} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* 5. NDA */}
                  <div className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate min-w-0 pr-2">
                      <FileBadge className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                      <span className="font-bold text-[#1A1A1A] shrink-0 font-mono">NDA:</span>
                      <span className="text-[#8C8984] font-mono truncate text-[11px] font-bold">{docNda || 'Signed_NDA_Digital.pdf'}</span>
                    </div>
                    <label className={`px-2.5 py-1 text-[10px] font-bold font-mono rounded-md cursor-pointer transition-all shrink-0 flex items-center gap-1.5 shadow-xs ${
                      docNda 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600' 
                        : 'bg-white border border-[#E5E2DE] hover:bg-[#E5E2DE] text-[#1A1A1A]'
                    }`}>
                      {docNda ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-white shrink-0" />
                          <span>Uploaded</span>
                        </>
                      ) : (
                        <span>Upload File</span>
                      )}
                      <input 
                        type="file" 
                        accept=".pdf,.png,.jpg"
                        onChange={(e) => { if(e.target.files?.[0]) setDocNda(e.target.files[0].name); }} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-xs uppercase font-bold tracking-wider cursor-pointer transition-all flex items-center justify-center space-x-2 rounded-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Update Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowDocModal(false)}
                  className="px-4 py-3 text-xs text-[#8C8984] hover:bg-[#F2F0ED] rounded-none font-mono font-bold cursor-pointer border border-[#E5E2DE]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
