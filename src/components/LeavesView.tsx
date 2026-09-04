/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { LeaveRequest } from '../types';
import {
  CalendarDays,
  FileCheck2,
  AlertCircle,
  PlusCircle,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck2,
  X
} from 'lucide-react';

export default function LeavesView() {
  const {
    currentRole,
    currentUser,
    leaves,
    applyLeave,
    updateLeaveStatus
  } = useWorkspace();

  const [showApplyModal, setShowApplyModal] = useState(false);

  // New leave form states
  const [formType, setFormType] = useState<'Casual Leave' | 'Sick Leave' | 'Paid Leave' | 'Emergency Leave'>('Casual Leave');
  const [startDate, setStartDate] = useState('2026-06-01');
  const [endDate, setEndDate] = useState('2026-06-02');
  const [reason, setReason] = useState('');

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyLeave({
      type: formType,
      startDate,
      endDate,
      reason
    });
    setShowApplyModal(false);
    setReason('');
  };

  const hasAuthorizedApproverClass = ['Super Admin', 'CEO', 'CFO', 'CTO', 'COO', 'CMO', 'HR', 'Manager', 'Project Manager', 'Team Lead'].includes(currentRole);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-50 text-green-700 border border-green-150';
      case 'Rejected': return 'bg-red-50 text-red-600 border border-red-100';
      default: return 'bg-amber-50 text-amber-600 border border-amber-100 font-medium animate-pulse';
    }
  };

  // Simulated static balances
  const balances = {
    casual: 12,
    sick: 10,
    paid: 15,
    emergency: 4
  };

  return (
    <div className="space-y-6 text-[#1A1A1A]">

      {/* Highlights leave balances grid widget */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Casual Leave (CL)</span>
            <h3 className="text-xl font-bold text-[#1A1A1A] font-mono">{balances.casual} Days</h3>
            <span className="text-[9px] text-[#8C8984] font-mono">Annual Allocation</span>
          </div>
          <CalendarDays className="h-5 w-5 text-[#1A1A1A]" />
        </div>

        <div className="p-4 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Sick Leave (SL)</span>
            <h3 className="text-xl font-bold text-[#1A1A1A] font-mono">{balances.sick} Days</h3>
            <span className="text-[9px] text-[#8C8984] font-mono">Doctor Certificate verified</span>
          </div>
          <AlertCircle className="h-5 w-5 text-[#1A1A1A]" />
        </div>

        <div className="p-4 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Paid LOP (PL)</span>
            <h3 className="text-xl font-bold text-[#1A1A1A] font-mono">{balances.paid} Days</h3>
            <span className="text-[9px] text-[#8C8984] font-mono">Direct Manager consent</span>
          </div>
          <FileCheck2 className="h-5 w-5 text-[#1A1A1A]" />
        </div>

        <div className="p-4 bg-[#F2F0ED] border border-[#E5E2DE] rounded-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#1A1A1A] font-mono uppercase font-black font-semibold">Emergency (EL)</span>
            <h3 className="text-xl font-bold text-[#1A1A1A] font-mono">{balances.emergency} Days</h3>
            <span className="text-[9px] text-[#8C8984] font-mono">Special approval logs</span>
          </div>
          <Clock className="h-5 w-5 text-[#1A1A1A]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Leaves application submissions directory */}
        <div className="lg:col-span-2 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-2">
            <div>
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Time-off Sheets Directory</h3>
              <p className="text-[10px] text-[#8C8984] font-mono uppercase">Apply or track submitted leave applications</p>
            </div>
            <button
              onClick={() => setShowApplyModal(true)}
              className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#1A1A1A]/95 text-white font-mono text-[10px] uppercase tracking-wider font-bold flex items-center space-x-1.5 border border-[#E5E2DE] cursor-pointer"
            >
              <PlusCircle className="h-4 w-4 text-white" />
              <span>Request Leave</span>
            </button>
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {leaves.map(req => {
              return (
                <div key={req.id} className="p-3.5 bg-white border border-[#E5E2DE] rounded-none space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[#1A1A1A] font-mono">{req.employeeName} <span className="text-[10px] text-[#8C8984] font-medium">({req.employeeId})</span></h4>
                      <p className="text-[9.5px] font-mono text-[#8C8984] uppercase font-bold tracking-wide">
                        {req.type} Leave Proposal • {req.startDate} to {req.endDate}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-none text-[8.5px] font-bold font-mono uppercase border ${getStatusBadge(req.status)}`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-[#1A1A1A] italic font-serif pl-2 border-l border-[#1A1A1A]/40">"{req.reason}"</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Approver console for Super Admin/HR/Manager */}
        <div className="lg:col-span-1 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#E5E2DE] pb-3">
              <UserCheck2 className="h-4 w-4 text-[#1A1A1A]" />
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Approvals Docket Queue</h3>
            </div>

            <div className="space-y-3.5 max-h-[290px] overflow-y-auto pr-1">
              {!hasAuthorizedApproverClass ? (
                <div className="p-4 bg-[#F2F0ED] rounded-none text-center text-[10.5px] text-[#8C8984] font-mono">
                  ⚠️ Role <span className="font-bold text-[#1A1A1A]">{currentRole}</span> lacks approvals authorization profiles.
                </div>
              ) : leaves.filter(l => l.status === 'Pending').length === 0 ? (
                <div className="p-4 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none text-center text-[10.5px] text-[#1A1A1A] font-mono font-bold uppercase tracking-wider">
                  ✓ Pending queue is empty.
                </div>
              ) : (
                leaves.filter(l => l.status === 'Pending').map(req => (
                  <div key={req.id} className="p-3.5 bg-white border border-[#E5E2DE] rounded-none space-y-3 text-[11px]">
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1A1A1A] font-mono shrink-0">{req.employeeName} ({req.type})</h4>
                      <p className="text-[#8C8984] font-mono text-[9px]">{req.startDate} to {req.endDate}</p>
                      <p className="text-[#1A1A1A] font-serif italic leading-snug">"{req.reason}"</p>
                    </div>
                    <div className="flex items-center space-x-1.5 border-t border-[#E5E2DE] pt-2.5">
                      <button
                        onClick={() => updateLeaveStatus(req.id, 'Approved')}
                        className="flex-1 py-1.5 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white rounded-none text-[9.5px] font-mono font-bold uppercase tracking-wide cursor-pointer flex items-center justify-center space-x-1"
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => updateLeaveStatus(req.id, 'Rejected')}
                        className="flex-1 py-1.5 bg-[#F2F0ED] hover:bg-[#E5E2DE] text-[#1A1A1A] border border-[#E5E2DE] rounded-none text-[9.5px] font-mono font-bold uppercase tracking-wide cursor-pointer flex items-center justify-center space-x-1"
                      >
                        <XCircle className="h-3 w-3" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] rounded-none w-full max-w-sm border border-[#E5E2DE] overflow-hidden shadow-2xl animate-fade-in">
            <div className="px-6 py-4 border-b border-[#E5E2DE] bg-[#F2F0ED] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Draft Leave Request</h3>
              <button onClick={() => setShowApplyModal(false)} className="p-1 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleApplySubmit} className="p-6 space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Leave Catalog Type</label>
                <select
                  value={formType}
                  onChange={e => setFormType(e.target.value as any)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                >
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Paid Leave">Paid LOP</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3 pb-1">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Reason / Justification</label>
                <textarea
                  required
                  placeholder="Provide context regarding shift coverage..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] h-20"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] uppercase tracking-widest font-bold cursor-pointer rounded-none transition-all"
              >
                Dispatch Leave Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
