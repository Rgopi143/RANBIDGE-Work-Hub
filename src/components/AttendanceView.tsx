/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  Clock,
  MapPin,
  Camera,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

export default function AttendanceView() {
  const {
    currentRole,
    currentUser,
    attendance,
    checkIn,
    checkOut
  } = useWorkspace();

  const [simLocalTime, setSimLocalTime] = useState('');
  const [simDateStr, setSimDateStr] = useState('');
  
  // Custom camera scanner interaction
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  // Load digital live clocks
  useEffect(() => {
    const updateTimes = () => {
      const d = new Date();
      setSimLocalTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setSimDateStr(d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const currentUserTodayLog = attendance.find(a => a.employeeId === currentUser?.id && a.date === todayStr);

  const startFaceScan = () => {
    setIsScanning(true);
    setScanStatus('idle');

    setTimeout(() => {
      setIsScanning(false);
      setScanStatus('success');

      // Coordinate GPS positions in Bengaluru
      const mockGps = {
        lat: 12.93 + (Math.random() - 0.5) * 0.05,
        lng: 77.62 + (Math.random() - 0.5) * 0.05,
        address: "RANBIDGE Solutions Campus, Koramangala, Bengaluru"
      };

      // Call context model
      checkIn(mockGps, true);
    }, 2800); // 2.8 secs mock biometric reading timing
  };

  const hasManagerClearance = ['Super Admin', 'HR', 'Manager', 'Team Lead'].includes(currentRole);

  // Group yesterdays and todays logs
  const displayLogs = attendance.filter(log => log.date === todayStr || log.date === '2026-05-24');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1A1A1A]">
      
      {/* Central Face Biometric Check-In scanner card */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-6 text-center text-[#1A1A1A] flex flex-col justify-between h-[450px]">
          
          {/* Header */}
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider leading-none">Simulated Biometric Clock</h3>
            <p className="text-[10px] text-[#8C8984] font-mono uppercase">Scan Face + GPS boundary check</p>
          </div>

          {/* Virtual Camera scanner canvas box */}
          <div className="relative mx-auto w-44 h-44 border border-[#1A1A1A]/10 rounded-full flex flex-col items-center justify-center overflow-hidden bg-[#F9F7F4] ring-1 ring-[#1A1A1A]/10">
            {isScanning ? (
              <>
                <div className="absolute inset-0 bg-[#1A1A1A]/5 animate-pulse" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1A1A1A]/30 to-[#1A1A1A]/90 rounded animate-scan-line shadow-lg" />
                {currentUser?.faceIdEnrollment ? (
                  <img src={currentUser.faceIdEnrollment} alt="Scanning face snapshot" className="w-full h-full object-cover blur-[0.5px]" referrerPolicy="no-referrer" />
                ) : (
                  <Camera className="h-10 w-10 text-[#1A1A1A] animate-pulse" />
                )}
                <p className="text-[9px] font-mono font-bold tracking-wider text-white mt-2 absolute bottom-4 bg-[#1A1A1A]/85 px-2 py-0.5 uppercase">ALIGNED • SCANNING</p>
              </>
            ) : scanStatus === 'success' || currentUserTodayLog ? (
              <>
                <div className="absolute inset-0 bg-green-500/5" />
                {currentUser?.faceIdEnrollment ? (
                  <img src={currentUser.faceIdEnrollment} alt="Enrolled Face Matched" className="w-full h-full object-cover grayscale opacity-90" referrerPolicy="no-referrer" />
                ) : (
                  <CheckCircle className="h-12 w-12 text-[#1A1A1A] animate-bounce-subtle" />
                )}
                <p className="text-[10px] font-mono font-bold text-green-800 uppercase tracking-wider mt-1.5 absolute bottom-4 bg-green-50/90 border border-green-200 px-2 py-0.5">MATCHED</p>
              </>
            ) : (
              <>
                {currentUser?.faceIdEnrollment ? (
                  <div className="relative w-full h-full">
                    <img src={currentUser.faceIdEnrollment} alt="Enrolled Face" className="w-full h-full object-cover opacity-60 grayscale" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
                      <Camera className="h-10 w-10 text-[#1A1A1A] drop-shadow" />
                      <p className="text-[9.5px] font-mono text-[#1A1A1A] mt-2 font-bold tracking-wide bg-white/90 border border-[#E5E2DE] px-2 py-0.5 uppercase">TAP TO INITIATE</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Camera className="h-10 w-10 text-[#8C8984]" />
                    <p className="text-[9.5px] font-mono text-[#8C8984] mt-2 font-bold tracking-wide">ALIGN FACE INSIDE</p>
                  </>
                )}
              </>
            )}
          </div>

          {/* Clock values ticker */}
          <div className="space-y-1 pb-1">
            <h2 className="text-2xl font-bold text-[#1A1A1A] font-mono tracking-wider">{simLocalTime}</h2>
            <p className="text-[10px] text-[#8C8984] font-bold font-mono">{simDateStr}</p>
          </div>

          {/* Form Actions */}
          <div className="space-y-2">
            {!currentUserTodayLog ? (
              <button
                onClick={startFaceScan}
                disabled={isScanning}
                className="w-full py-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 disabled:bg-[#F2F0ED] disabled:text-[#8C8984] text-xs font-bold font-mono tracking-wider text-white rounded-none cursor-pointer transition-all uppercase"
              >
                {isScanning ? 'Scans Processing...' : 'Trigger Face check-in'}
              </button>
            ) : !currentUserTodayLog.checkOutTime ? (
              <button
                onClick={checkOut}
                className="w-full py-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-xs font-bold font-mono tracking-wider text-white rounded-none cursor-pointer transition-all uppercase border border-[#E5E2DE]"
              >
                Log Shift Check-Out
              </button>
            ) : (
              <div className="p-3 bg-[#F2F0ED] border border-[#E5E2DE] text-[#1A1A1A] rounded-none text-[10.5px] font-bold font-mono uppercase tracking-wider">
                ✓ Shift completed logs filed
              </div>
            )}

            {/* GPS capture telemetry */}
            {currentUserTodayLog && currentUserTodayLog.gps && (
              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-[#8C8984] pt-1">
                <MapPin className="h-3.5 w-3.5 text-[#1A1A1A] shrink-0" />
                <span className="truncate max-w-[200px] font-mono">{currentUserTodayLog.gps.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right column: Main Daily Log list report sheet */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-3">
            <div>
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Operational Daily Capacity Logs</h3>
              <p className="text-[10px] text-[#8C8984] font-mono uppercase">Showing active clock times ({displayLogs.length} total)</p>
            </div>
            <span className="p-1 px-3 bg-white hover:bg-[#F9F7F4] border border-[#E5E2DE] text-[#1A1A1A] rounded-none text-[10px] font-mono font-bold uppercase tracking-wider inline-flex items-center space-x-1 cursor-pointer">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </span>
          </div>

          {/* Layout List */}
          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
            {displayLogs.map(log => {
              const isLate = log.status === 'Late';
              const isAbsent = log.status === 'Absent';

              return (
                <div key={log.id} className="p-3.5 bg-white border border-[#E5E2DE] rounded-none flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className={`h-8 w-8 rounded-none flex items-center justify-center text-[10px] font-mono font-bold shrink-0 border ${
                      isAbsent
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : isLate
                        ? 'bg-amber-50 text-amber-700 border-amber-250'
                        : 'bg-[#F2F0ED] text-[#1A1A1A] border-[#E5E2DE]'
                    }`}>
                      {log.employeeName.substring(0, 2)}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="font-bold text-[#1A1A1A] truncate">{log.employeeName}</h4>
                      <p className="text-[9.5px] font-mono text-[#8C8984]">{log.date} • ID: {log.employeeId}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 shrink-0 font-mono text-[11px] font-semibold text-[#1A1A1A]">
                    <div>
                      <span className="text-[#8C8984] block text-[8px] font-bold text-right leading-none uppercase">Check-In</span>
                      {log.checkInTime || 'No check-in'}
                    </div>
                    <div>
                      <span className="text-[#8C8984] block text-[8px] font-bold text-right leading-none uppercase">Check-Out</span>
                      {log.checkOutTime || '--:--'}
                    </div>
                    <div>
                      <span className={`inline-flex px-1.5 py-0.5 text-[9px] rounded-none font-bold uppercase ${isAbsent ? 'bg-[#F2F0ED] text-red-700 border border-red-200' : isLate ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-[#F9F7F4] text-[#1A1A1A] border border-[#E5E2DE]'}`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
