/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Role } from '../types';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
  X,
  UserCheck,
  ChevronDown,
  FileBadge,
  Upload,
  CheckCircle,
  KeyRound,
  ShieldCheck,
  FileText
} from 'lucide-react';

import { ROLE_CREDENTIALS } from '../data/roleCredentials';

export default function LoginView() {
  const { login, employees, updateEmployee } = useWorkspace();
  const [selectedRole, setSelectedRole] = useState<Role>('Super Admin');
  const [email, setEmail] = useState(ROLE_CREDENTIALS['Super Admin'].email);
  const [password, setPassword] = useState(ROLE_CREDENTIALS['Super Admin'].tempPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);

  // Onboarding & Document Upload Modal States
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState<string>('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [docAadhaar, setDocAadhaar] = useState('Uploaded_Aadhaar.pdf');
  const [docPan, setDocPan] = useState('Uploaded_PAN.pdf');
  const [docResume, setDocResume] = useState('Uploaded_CV.pdf');
  const [docOffer, setDocOffer] = useState('Uploaded_Offer.pdf');
  const [docNda, setDocNda] = useState('Signed_NDA_Digital.pdf');
  const [onboardingSuccess, setOnboardingSuccess] = useState(false);

  useEffect(() => {
    const cred = ROLE_CREDENTIALS[selectedRole];
    if (cred) {
      setEmail(cred.email);
      setPassword(cred.tempPassword);
    }
  }, [selectedRole]);

  const availableRoles: Role[] = [
    'Super Admin',
    'CEO',
    'CFO',
    'CTO',
    'COO',
    'CMO',
    'HR',
    'Manager',
    'Project Manager',
    'Team Lead',
    'Social Media Manager',
    'Guide',
    'Mentor',
    'Employee',
    'Intern'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      login(selectedRole);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-800 flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      {/* Background Soft Glows & Pattern */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Centered Clean Login Card */}
      <div className="relative w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-2xl shadow-slate-300/60 overflow-hidden p-8 lg:p-10 z-10">
        
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src="/Ranbidge Logo.png"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/logo.png';
            }}
            alt="RANBIDGE Solutions Private Limited"
            className="h-14 w-auto object-contain max-w-[260px] mb-4"
          />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Sign In to Your Workspace</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Select your role and enter credentials to log in</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Access Role Selection Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Select Access Role / Account</span>
              <span className="text-[10px] text-indigo-600 font-semibold">15 Roles Available</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <UserCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as Role)}
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role} Log In
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Email Address Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Work Email / Employee ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                placeholder="name@ranbidge.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                placeholder="Enter security password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Temporary Credentials Indicator Badge */}
          <div className="p-3 bg-indigo-50/90 border border-indigo-200/90 rounded-2xl text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span className="flex items-center gap-1.5 text-indigo-700">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Temporary Password for {selectedRole}:</span>
              </span>
              <code className="bg-white px-2 py-0.5 border border-indigo-200 rounded-lg text-indigo-800 font-mono font-bold text-[11px] select-all shadow-2xs">
                {ROLE_CREDENTIALS[selectedRole]?.tempPassword}
              </code>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-normal">
              Log in with this temporary password. After opening your account, you can change your password and update all details in Profile Setup.
            </p>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 bg-slate-50 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
              />
              <span className="text-xs text-slate-600 font-medium">Keep me signed in for 30 days</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 transition-all transform active:scale-[0.99] disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Authenticating Workspace...</span>
              </>
            ) : (
              <>
                <span>Sign In to {selectedRole} Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* First Time Login / Credential Setup & Document Upload Action */}
          <div className="pt-3 border-t border-slate-200/80 text-center space-y-2">
            <button
              type="button"
              onClick={() => {
                if (employees && employees.length > 0) {
                  setSelectedEmpId(employees[0].id);
                  const emp = employees[0];
                  if (emp.documents) {
                    setDocAadhaar(emp.documents.aadhaar || 'Uploaded_Aadhaar.pdf');
                    setDocPan(emp.documents.pan || 'Uploaded_PAN.pdf');
                    setDocResume(emp.documents.resume || 'Uploaded_CV.pdf');
                    setDocOffer(emp.documents.offerLetter || 'Uploaded_Offer.pdf');
                    setDocNda(emp.documents.nda || 'Signed_NDA_Digital.pdf');
                  }
                }
                setShowOnboardingModal(true);
              }}
              className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300/80 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <FileBadge className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>First-Time Login? Change Password & Upload ID Proofs</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCredentialsModal(true)}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors cursor-pointer block w-full py-1"
            >
              📋 View All 15 Role Temporary Passwords & Emails Directory
            </button>
          </div>
        </form>

        {/* Footer Copyright */}
        <div className="mt-6 pt-4 border-t border-slate-200/80 text-center text-[11px] text-slate-500 font-medium">
          © 2026 RANBIDGE Solutions Private Limited. All Rights Reserved.
        </div>
      </div>

      {/* 15 Roles Credentials Directory Modal */}
      {showCredentialsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
            <button
              onClick={() => setShowCredentialsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">All 15 System Role Mails & Temporary Passwords</h3>
                <p className="text-xs text-slate-500 font-medium">Click any role to auto-select credentials for instant workspace login</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-mono text-[10px] uppercase font-bold">
                    <th className="p-2.5 rounded-tl-xl">Role</th>
                    <th className="p-2.5">Email Address</th>
                    <th className="p-2.5">Temporary Password</th>
                    <th className="p-2.5 rounded-tr-xl text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {Object.entries(ROLE_CREDENTIALS).map(([rKey, cred]) => (
                    <tr key={rKey} className="hover:bg-slate-50 transition-colors">
                      <td className="p-2.5 font-bold text-slate-900 font-mono text-[11px]">{cred.role}</td>
                      <td className="p-2.5 font-mono text-slate-600 text-[11px]">{cred.email}</td>
                      <td className="p-2.5">
                        <code className="bg-slate-100 px-2 py-0.5 border border-slate-200 rounded text-indigo-700 font-mono font-bold text-[11px]">
                          {cred.tempPassword}
                        </code>
                      </td>
                      <td className="p-2.5 text-right">
                        <button
                          onClick={() => {
                            setSelectedRole(cred.role as Role);
                            setEmail(cred.email);
                            setPassword(cred.tempPassword);
                            setShowCredentialsModal(false);
                          }}
                          className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] rounded-lg transition-all shadow-xs cursor-pointer"
                        >
                          Select Role
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowCredentialsModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 cursor-pointer"
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password / Incident Mail Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4 shadow-xs">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">Password Reset & Incident Report</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4 font-medium leading-relaxed">
              To protect organizational security, password resets are processed as official IT security incidents. Please report your request directly to IT Support:
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mb-5">
              <div className="text-xs">
                <span className="font-bold text-slate-700 block mb-1">Official IT Support Email:</span>
                <span className="font-mono text-indigo-600 font-bold text-xs bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200/60 inline-block select-all">
                  ranbidgesolutionspvtltd@gmail.com
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                Clicking below will open your email client to send an incident report directly to <strong className="text-slate-800">ranbidgesolutionspvtltd@gmail.com</strong>.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="mailto:ranbidgesolutionspvtltd@gmail.com?subject=RANBIDGE%20Workspace%20Password%20Reset%20Incident%20Report&body=Hello%20IT%20Security%20Team%2C%0A%0AI%20am%20requesting%20a%20password%20reset%20for%20my%20RANBIDGE%20Workspace%20Account.%0A%0AUser%20Email%3A%20%0AIncident%20Details%3A%20Password%20Reset%20Request"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Send Incident Mail</span>
              </a>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-3 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer border border-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* First-Time Login / Document Upload & Password Change Modal */}
      {showOnboardingModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowOnboardingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                <FileBadge className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">First-Time Login & Document Setup</h3>
                <p className="text-xs text-slate-500 font-medium">Upload ID proofs & legal archives and set your account password</p>
              </div>
            </div>

            {onboardingSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Credentials & 5 Legal Documents uploaded successfully! Signing you in...</span>
              </div>
            )}

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (newPassword && newPassword !== confirmPassword) {
                  alert("Passwords do not match! Please check again.");
                  return;
                }
                const empId = selectedEmpId || (employees && employees[0]?.id) || 'EMP-001';
                updateEmployee(empId, {
                  documents: {
                    aadhaar: docAadhaar,
                    pan: docPan,
                    resume: docResume,
                    offerLetter: docOffer,
                    nda: docNda
                  }
                });
                setOnboardingSuccess(true);
                setTimeout(() => {
                  setOnboardingSuccess(false);
                  setShowOnboardingModal(false);
                  login('Employee');
                }, 1000);
              }} 
              className="space-y-4"
            >
              {/* Employee Account Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Employee Account</label>
                <select
                  value={selectedEmpId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedEmpId(id);
                    const emp = employees.find(x => x.id === id);
                    if (emp?.documents) {
                      setDocAadhaar(emp.documents.aadhaar || 'Uploaded_Aadhaar.pdf');
                      setDocPan(emp.documents.pan || 'Uploaded_PAN.pdf');
                      setDocResume(emp.documents.resume || 'Uploaded_CV.pdf');
                      setDocOffer(emp.documents.offerLetter || 'Uploaded_Offer.pdf');
                      setDocNda(emp.documents.nda || 'Signed_NDA_Digital.pdf');
                    }
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.id} • {emp.designation})
                    </option>
                  ))}
                </select>
              </div>

              {/* Security Password Change Section */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-indigo-600" />
                  <span>Account Password Setup</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">New Security Password</label>
                    <input
                      type="password"
                      placeholder="Set new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>
              </div>

              {/* ID Proofs & Legal Archives Upload Section */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span>ID Proofs & Legal Archives Upload</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">5 Documents Required</span>
                </span>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {/* 1. Aadhaar */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate min-w-0 pr-2">
                      <FileBadge className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-bold text-slate-800 shrink-0 font-mono">AADHAAR:</span>
                      <span className="text-slate-600 font-mono truncate text-[11px]">{docAadhaar}</span>
                    </div>
                    <label className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg cursor-pointer transition-all shrink-0">
                      Upload
                      <input 
                        type="file" 
                        accept=".pdf,.png,.jpg"
                        onChange={(e) => { if(e.target.files?.[0]) setDocAadhaar(e.target.files[0].name); }} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* 2. PAN */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate min-w-0 pr-2">
                      <FileBadge className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-bold text-slate-800 shrink-0 font-mono">PAN:</span>
                      <span className="text-slate-600 font-mono truncate text-[11px]">{docPan}</span>
                    </div>
                    <label className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg cursor-pointer transition-all shrink-0">
                      Upload
                      <input 
                        type="file" 
                        accept=".pdf,.png,.jpg"
                        onChange={(e) => { if(e.target.files?.[0]) setDocPan(e.target.files[0].name); }} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* 3. RESUME */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate min-w-0 pr-2">
                      <FileBadge className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-bold text-slate-800 shrink-0 font-mono">RESUME:</span>
                      <span className="text-slate-600 font-mono truncate text-[11px]">{docResume}</span>
                    </div>
                    <label className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg cursor-pointer transition-all shrink-0">
                      Upload
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => { if(e.target.files?.[0]) setDocResume(e.target.files[0].name); }} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* 4. OFFER LETTER */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate min-w-0 pr-2">
                      <FileBadge className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-bold text-slate-800 shrink-0 font-mono">OFFERLETTER:</span>
                      <span className="text-slate-600 font-mono truncate text-[11px]">{docOffer}</span>
                    </div>
                    <label className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg cursor-pointer transition-all shrink-0">
                      Upload
                      <input 
                        type="file" 
                        accept=".pdf,.png,.jpg"
                        onChange={(e) => { if(e.target.files?.[0]) setDocOffer(e.target.files[0].name); }} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* 5. NDA */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate min-w-0 pr-2">
                      <FileBadge className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-bold text-slate-800 shrink-0 font-mono">NDA:</span>
                      <span className="text-slate-600 font-mono truncate text-[11px]">{docNda}</span>
                    </div>
                    <label className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg cursor-pointer transition-all shrink-0">
                      Upload
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
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Save Documents & Proceed to Workspace</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowOnboardingModal(false)}
                  className="px-4 py-3 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer border border-slate-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
