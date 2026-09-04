/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  Settings,
  ShieldCheck,
  Scale,
  MapPin,
  Clock,
  Compass,
  AlertCircle,
  Camera,
  CheckCircle,
  Trash2,
  User,
  Upload,
  RefreshCw,
  X,
  Sparkles
} from 'lucide-react';

export default function SettingsView() {
  const {
    currentRole,
    currentUser,
    updateEmployee,
    employees,
    teams,
    projects,
    tasks,
    attendance,
    leaves,
    payroll,
    kpis,
    documents,
    announcements,
    chatMessages,
    restoreWorkspaceData
  } = useWorkspace();

  // Settings values
  const [shiftStart, setShiftStart] = useState('09:30 AM');
  const [shiftEnd, setShiftEnd] = useState('06:30 PM');
  const [radiusLock, setRadiusLock] = useState('200 Meters');
  const [soc2Period, setSoc2Period] = useState('Quarterly Audit');

  const hasAdminRights = ['Super Admin', 'Manager'].includes(currentRole);

  // JSON storage console states
  const [activeJsonTab, setActiveJsonTab] = useState<'employees' | 'tasks' | 'attendance' | 'teams' | 'documents'>('employees');
  const [jsonText, setJsonText] = useState<string>('');
  const [isJsonEditable, setIsJsonEditable] = useState<boolean>(false);
  const [jsonValidationError, setJsonValidationError] = useState<string | null>(null);
  const [jsonSuccessBanner, setJsonSuccessBanner] = useState<string | null>(null);
  
  const dbFileInputRef = useRef<HTMLInputElement>(null);

  // Sync state values to active json textarea inside the view session
  React.useEffect(() => {
    if (!isJsonEditable) {
      let dataToSerialize: any[] = [];
      if (activeJsonTab === 'employees') dataToSerialize = employees;
      else if (activeJsonTab === 'tasks') dataToSerialize = tasks;
      else if (activeJsonTab === 'attendance') dataToSerialize = attendance;
      else if (activeJsonTab === 'teams') dataToSerialize = teams;
      else if (activeJsonTab === 'documents') dataToSerialize = documents;
      
      setJsonText(JSON.stringify(dataToSerialize, null, 2));
      setJsonValidationError(null);
    }
  }, [activeJsonTab, employees, tasks, attendance, teams, documents, isJsonEditable]);

  const handleJsonChange = (val: string) => {
    setJsonText(val);
    try {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed)) {
        setJsonValidationError("Database error: Dataset must be a valid JSON Array [] of records.");
      } else {
        setJsonValidationError(null);
      }
    } catch (err: any) {
      setJsonValidationError(`JSON Syntax Error: ${err.message}`);
    }
  };

  const syncEditedJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        setJsonValidationError("Database error: Dataset must be a valid JSON Array [] of records.");
        return;
      }
      
      const updatePayload: any = {};
      updatePayload[activeJsonTab] = parsed;
      restoreWorkspaceData(updatePayload);
      
      setJsonSuccessBanner(`Successfully synchronized local ${activeJsonTab} JSON storage table active state.`);
      setIsJsonEditable(false);
      setJsonValidationError(null);
      
      setTimeout(() => {
        setJsonSuccessBanner(null);
      }, 5000);
    } catch (err: any) {
      setJsonValidationError(`Unable to synchronize state. Syntax Error: ${err.message}`);
    }
  };

  const exportDatabaseJson = () => {
    const backupDb = {
      employees,
      teams,
      projects,
      tasks,
      attendance,
      leaves,
      payroll,
      kpis,
      documents,
      announcements,
      chatMessages,
      exportedAt: new Date().toISOString(),
      systemVersion: 'RAN-WorkHub-OS V2.6.2'
    };
    
    const fileName = `ran_workhub_db_${new Date().toISOString().split('T')[0]}.json`;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backupDb, null, 2)
    )}`;
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDatabaseImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (
          !parsed.employees && 
          !parsed.tasks && 
          !parsed.attendance && 
          !parsed.teams
        ) {
          alert('Could not restore backup. Malformed signature: Missing core databases.');
          return;
        }
        
        const restorePayload: any = {};
        if (parsed.employees) restorePayload.employees = parsed.employees;
        if (parsed.teams) restorePayload.teams = parsed.teams;
        if (parsed.projects) restorePayload.projects = parsed.projects;
        if (parsed.tasks) restorePayload.tasks = parsed.tasks;
        if (parsed.attendance) restorePayload.attendance = parsed.attendance;
        if (parsed.leaves) restorePayload.leaves = parsed.leaves;
        if (parsed.payroll) restorePayload.payroll = parsed.payroll;
        if (parsed.kpis) restorePayload.kpis = parsed.kpis;
        if (parsed.documents) restorePayload.documents = parsed.documents;
        if (parsed.announcements) restorePayload.announcements = parsed.announcements;
        if (parsed.chatMessages) restorePayload.chatMessages = parsed.chatMessages;
        
        restoreWorkspaceData(restorePayload);
        setJsonSuccessBanner('Enterprise JSON data restore completed. Full organization datasets synchronized to active cache.');
        
        setTimeout(() => {
          setJsonSuccessBanner(null);
        }, 6000);
      } catch (err: any) {
        alert(`Restore failed: JSON compilation syntax error. ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  // Biometric details states
  const [provisionalFace, setProvisionalFace] = useState<string>('');
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [enrollSuccess, setEnrollSuccess] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick preset portrait structures for simulation
  const FACE_PRESETS = [
    {
      name: "Studio Portrait A",
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop"
    },
    {
      name: "Studio Portrait B",
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"
    },
    {
      name: "Corporate Style C",
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop"
    }
  ];

  const handleFaceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setEnrollError('Portrait validation error: Please select a valid photo image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        setProvisionalFace(event.target.result);
        setEnrollError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    setEnrollError(null);
    setEnrollSuccess(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 360, height: 360, facingMode: 'user' } 
      });
      setVideoStream(stream);
      setCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err: any) {
      console.error(err);
      setEnrollError("Webcam permissions not granted or camera not detected in this iframe session. Please drag & drop/upload an image file, or select a demo preset snapshot.");
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    setCameraActive(false);
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth || 360;
        canvas.height = video.videoHeight || 360;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URI
        const dataUrl = canvas.toDataURL('image/jpeg');
        setProvisionalFace(dataUrl);
        stopCamera();
      }
    }
  };

  const saveEnrollment = () => {
    if (!currentUser) return;
    if (!provisionalFace) {
      setEnrollError("Capture, upload, or select a face snapshot before registering.");
      return;
    }
    updateEmployee(currentUser.id, { faceIdEnrollment: provisionalFace });
    setEnrollSuccess(true);
    setEnrollError(null);
    setProvisionalFace('');
    setTimeout(() => {
      setEnrollSuccess(false);
    }, 6000);
  };

  const clearEnrollment = () => {
    if (!currentUser) return;
    if (confirm("Verify action: Clear enrolled Face ID snapshot? Attendance face check-in recognition logs will require manual HR override.")) {
      updateEmployee(currentUser.id, { faceIdEnrollment: undefined });
      setProvisionalFace('');
      setEnrollSuccess(false);
      setEnrollError(null);
    }
  };

  return (
    <div className="space-y-6 text-[#1A1A1A] animate-fade-in-up">

      {/* 1. Biometric Security & Face ID Enrollment Card */}
      <div className="bg-[#FDFCFB] border border-[#E5E2DE] p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-2">
          <div className="flex items-center space-x-2">
            <Camera className="h-4 w-4 text-[#1A1A1A] animate-pulse" />
            <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Face ID Biometric Desk</h3>
          </div>
          <span className="px-2 py-0.5 border border-amber-300/60 bg-amber-500/10 text-[9px] font-mono uppercase text-amber-800 font-semibold tracking-wider flex items-center gap-1">
            <span className="status-dot-active scale-75" />
            Secure Profile Snapshot Vault
          </span>
         </div>

         {/* Status Header */}
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-[#F2F0ED]/40 border border-[#E5E2DE] relative overflow-hidden">
           <div className="space-y-1 z-10">
             <span className="text-[10px] font-mono font-bold text-[#8C8984] uppercase block tracking-wider">Secured Profile Linked:</span>
             <h4 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-1.5 flex-wrap">
               <span className={`w-2.5 h-2.5 rounded-full ${currentUser?.faceIdEnrollment ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
               {currentUser?.name} <span className="text-xs font-mono font-normal text-[#8C8984]">({currentUser?.id} • {currentUser?.designation})</span>
             </h4>
             <p className="text-[10.5px] text-[#8C8984] leading-normal uppercase font-mono mt-1 flex items-center gap-1">
               Enrollment Status:{' '}
               {currentUser?.faceIdEnrollment ? (
                 <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-300 px-2 py-0.5 ml-1 flex items-center gap-1 shadow-xs">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                   REGISTERED & ACTIVE
                 </span>
               ) : (
                 <span className="text-rose-600 font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 ml-1 animate-pulse">NOT ENROLLED</span>
               )}
             </p>
           </div>

           {currentUser?.faceIdEnrollment && (
             <div className="flex items-center gap-3 z-10">
               <div className="relative w-12 h-12 border-2 border-emerald-500/50 rounded-none overflow-hidden bg-white shrink-0 shadow-sm group">
                 <img src={currentUser.faceIdEnrollment} alt="Face Registration" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/40" />
               </div>
               <button
                 type="button"
                 onClick={clearEnrollment}
                 className="px-2.5 py-1.5 border border-rose-300 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 font-mono text-[10px] uppercase font-bold cursor-pointer transition-all flex items-center gap-1 shadow-xs active:scale-95"
               >
                 <Trash2 className="h-3 w-3" />
                 Clear Register
               </button>
             </div>
           )}
         </div>

         {/* Live Enrollment Interface */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
           
           {/* Camera/Canvas Visual Area with Futuristic Laser HUD */}
           <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-[#F9F7F4] border border-[#E5E2DE] text-center min-h-[270px] relative overflow-hidden rounded-none group hover:border-amber-400/80 transition-colors">
             
             {/* HUD Corner Bracket Accents */}
             <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-600/80 z-20 pointer-events-none" />
             <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-600/80 z-20 pointer-events-none" />
             <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-600/80 z-20 pointer-events-none" />
             <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-600/80 z-20 pointer-events-none" />

             {cameraActive ? (
               <div className="relative w-full aspect-square max-w-[210px] border-2 border-amber-500 bg-black overflow-hidden select-none shadow-md">
                 <div className="animate-laser-scan" />
                 <video
                   ref={videoRef}
                   autoPlay
                   playsInline
                   muted
                   className="w-full h-full object-cover scale-x-[-1]"
                 />
                 <div className="absolute inset-0 border border-dashed border-amber-400/50 pointer-events-none flex items-center justify-center">
                   <div className="w-32 h-32 border-2 border-dashed border-emerald-400 rounded-full animate-pulse flex items-center justify-center bg-emerald-500/5">
                     <span className="text-[7.5px] font-mono text-emerald-400 bg-black/70 px-2 py-0.5 uppercase font-bold tracking-wider rounded-none">Align Head</span>
                   </div>
                 </div>
                 <div className="absolute bottom-2 left-0 right-0 flex justify-center z-30">
                    <button
                      type="button"
                      onClick={captureFrame}
                      className="px-3 py-1.5 bg-amber-600 text-white text-[9px] font-mono uppercase font-bold hover:bg-amber-500 transition-all flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
                    >
                      <Camera className="h-3.5 w-3.5" />
                      Take Snapshot
                    </button>
                 </div>
               </div>
             ) : provisionalFace ? (
               <div className="relative w-full aspect-square max-w-[210px] border-2 border-amber-500 bg-[#F2F0ED] overflow-hidden shadow-md group/snap">
                 <div className="animate-laser-scan" />
                 <img src={provisionalFace} alt="Provisional Face Capture" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                 <div className="absolute top-2 right-2 bg-amber-600 text-white text-[8px] font-mono px-2 py-0.5 font-bold uppercase tracking-wider shadow-xs">
                   PENDING REGISTRATION
                 </div>
                 <button
                   type="button"
                   onClick={() => setProvisionalFace('')}
                   className="absolute bottom-2 right-2 p-1.5 bg-black/80 hover:bg-rose-600 text-white rounded-none cursor-pointer transition-colors"
                   title="Clear provisional snap"
                 >
                   <X className="h-3.5 w-3.5" />
                 </button>
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center space-y-3 p-4 text-[#8C8984] relative">
                 <div className="relative">
                   <div className="absolute -inset-3 rounded-full border border-amber-400/30 animate-sonar-ping pointer-events-none" />
                   <div className="w-16 h-16 border border-amber-300/80 rounded-full flex items-center justify-center bg-white shadow-xs group-hover:scale-105 transition-transform">
                     <Camera className="h-7 w-7 text-amber-700" />
                   </div>
                 </div>
                 <p className="text-[10px] font-mono uppercase tracking-wide leading-relaxed block text-center max-w-[150px] text-[#555]">
                   Live webcam scanner offline
                 </p>
                 <button
                   type="button"
                   onClick={startCamera}
                   className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-amber-700 text-white font-mono text-[9.5px] uppercase font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                 >
                   <Camera className="h-3.5 w-3.5" />
                   Start Webcam
                 </button>
               </div>
             )}

             <canvas ref={canvasRef} className="hidden" />
           </div>

           {/* Setup Control Form Areas */}
           <div className="lg:col-span-8 space-y-4 flex flex-col justify-between">
             <div className="space-y-3">
               <div className="space-y-1">
                 <h4 className="text-[10.5px] font-mono font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
                   <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                   Registration Walkthrough
                 </h4>
                 <p className="text-xs text-[#8C8984] leading-relaxed">
                   Integrate high-accuracy biometric validation references into your profile. To avoid check-in rejections, verify even lighting, look straight into the camera, and remove objects compromising facial contours.
                 </p>
               </div>

               {/* Alternative: Image Upload button & Presets */}
               <div className="p-3.5 bg-[#F2F0ED]/30 border border-[#E5E2DE] space-y-3 font-mono">
                 <span className="text-[8.5px] font-bold text-[#8C8984] uppercase block tracking-wider">Portrait upload alternative:</span>
                 
                 <div className="flex flex-col sm:flex-row gap-2">
                   {/* Manual Upload */}
                   <button
                     type="button"
                     onClick={() => fileInputRef.current?.click()}
                     className="px-3 py-1.5 border border-[#E5E2DE] bg-white hover:bg-amber-500/10 hover:border-amber-400 text-[#1A1A1A] text-[9.5px] uppercase font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:-translate-y-0.5"
                   >
                     <Upload className="h-3.5 w-3.5 text-amber-700" />
                     Upload Reference Photo
                   </button>
                   <input
                     ref={fileInputRef}
                     type="file"
                     accept="image/*"
                     onChange={handleFaceUpload}
                     className="hidden"
                   />
                 </div>

                 {/* Presets */}
                 <div className="space-y-1.5 pt-2 border-t border-[#E5E2DE]/70">
                   <span className="text-[8px] font-medium text-[#8C8984] uppercase block tracking-wider">Webcam Emulator Presets (Quick Tests):</span>
                   <div className="flex flex-wrap gap-2">
                     {FACE_PRESETS.map((preset, idx) => (
                       <button
                         key={idx}
                         type="button"
                         onClick={() => {
                           setProvisionalFace(preset.url);
                           setEnrollError(null);
                           if (cameraActive) stopCamera();
                         }}
                         className="px-2.5 py-1 text-[8.5px] border border-[#E5E2DE] bg-white hover:bg-amber-50 hover:border-amber-400 text-[#1A1A1A] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:-translate-y-0.5 active:scale-95"
                       >
                         <Sparkles className="h-3 w-3 text-amber-600" />
                         <span>{preset.name}</span>
                       </button>
                     ))}
                   </div>
                 </div>
               </div>

               {/* Notifications */}
               {enrollError && (
                 <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-mono leading-relaxed uppercase flex items-center gap-2 animate-fade-in-up">
                   <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                   <span>{enrollError}</span>
                 </div>
               )}

               {enrollSuccess && (
                 <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-[10px] font-mono leading-relaxed uppercase flex items-center gap-2 animate-fade-in-up shadow-xs">
                   <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                   <div>
                     <span className="font-bold">REGISTERED:</span> Face signature updated successfully. Try checking in on the Attendance tab!
                   </div>
                 </div>
               )}
             </div>

             {/* Bottom Save Action */}
             <div className="pt-2">
               <button
                 type="button"
                 onClick={saveEnrollment}
                 disabled={!provisionalFace}
                 className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-amber-700 disabled:bg-[#F2F0ED] disabled:text-[#8C8984] text-[10.5px] font-bold font-mono tracking-widest text-white uppercase transition-all flex items-center gap-2 cursor-pointer rounded-none shadow-sm active:scale-95 disabled:active:scale-100"
               >
                 <ShieldCheck className="h-4 w-4" />
                 Save Secure Face Signature
               </button>
             </div>
           </div>

         </div>
      </div>

      {/* Main Settings Panel */}
      <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 border-b border-[#E5E2DE] pb-2">
          <Settings className="h-4 w-4 text-[#1A1A1A]" />
          <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Enterprise OS Configurations</h3>
        </div>

        {!hasAdminRights ? (
          <div className="p-5 bg-[#F2F0ED] border border-[#E5E2DE] rounded-none text-center text-xs text-[#8C8984] font-mono">
            ⚠️ Simulated role <span className="font-bold text-[#1A1A1A]">{currentRole}</span> lacks administrative settings authorization permissions.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-normal text-xs font-medium">
            
            {/* Shifts configuration controls */}
            <div className="p-5 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none space-y-3.5">
              <span className="text-[10px] font-mono font-bold text-[#1A1A1A] uppercase flex items-center space-x-1.5 pb-1 border-b border-[#E5E2DE]">
                <Clock className="h-3.5 w-3.5" />
                <span>Default Office Shifts Settings</span>
              </span>
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-[#8C8984] font-mono uppercase">SHIFT START TIME</label>
                  <input
                    type="text"
                    value={shiftStart}
                    onChange={e => setShiftStart(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-[#8C8984] font-mono uppercase">SHIFT END TIME</label>
                  <input
                    type="text"
                    value={shiftEnd}
                    onChange={e => setShiftEnd(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>
            </div>

            {/* Geolocation Lock controls */}
            <div className="p-5 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none space-y-3.5">
              <span className="text-[10px] font-mono font-bold text-[#1A1A1A] uppercase flex items-center space-x-1.5 pb-1 border-b border-[#E5E2DE]">
                <MapPin className="h-3.5 w-3.5 text-[#1A1A1A]" />
                <span>Face Scanner Location Radius Lock</span>
              </span>
              <div className="space-y-2 font-mono">
                <label className="text-[9px] font-bold text-[#8C8984] font-mono uppercase block">Allowed check-in boundary</label>
                <select
                  value={radiusLock}
                  onChange={e => setRadiusLock(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs text-[#1A1A1A] cursor-pointer focus:outline-none focus:border-[#1A1A1A]"
                >
                  <option value="50 Meters">50 Meters (Strict campus lock)</option>
                  <option value="200 Meters">200 Meters (Standard HSR lock)</option>
                  <option value="1000 Meters">1000 Meters (Flexible local block)</option>
                  <option value="Unlimited">Unlimited (Work from home enabled)</option>
                </select>
                <span className="text-[9.5px] font-normal text-[#8C8984] leading-tight block uppercase">
                  Attendance face scan logs are locked to current GPS Coordinates unless Unlimited is active.
                </span>
              </div>
            </div>

            {/* SOC-2 Compliance audits lock controls */}
            <div className="p-5 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none space-y-3.5 col-span-1 md:col-span-2">
              <span className="text-[10px] font-mono font-bold text-[#1A1A1A] uppercase flex items-center space-x-1.5 pb-1 border-b border-[#E5E2DE]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#1A1A1A]" />
                <span>Data audit & governance cycles schedule</span>
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-1">
                <div className="space-y-1 font-mono">
                  <label className="text-[9px] font-bold text-[#8C8984] font-mono uppercase">VERIFICATION FREQUENCY</label>
                  <select
                    value={soc2Period}
                    onChange={e => setSoc2Period(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs text-[#1A1A1A] cursor-pointer focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="Monthly Audit">Monthly Audit Checklists</option>
                    <option value="Quarterly Audit">Quarterly Compliance review</option>
                    <option value="Annual Audit">Annual Security Board Ledger</option>
                  </select>
                </div>
                <div className="p-3 bg-[#F2F0ED] border border-[#E5E2DE] rounded-none space-y-1 text-[10px] text-[#1A1A1A] leading-relaxed font-mono uppercase">
                  <span className="font-bold flex items-center space-x-1 text-[#1A1A1A]">
                    <AlertCircle className="h-3.5 w-3.5 text-[#1A1A1A]" />
                    <span>Compliance Advisory note</span>
                  </span>
                  <p className="normal-case font-serif italic text-xs mt-1 text-[#8C8984] font-normal">
                    "Data archiving has been cleared via encrypted local vaults. Disabling telemetry is restricted by corporate mandates."
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* JSON Storage Database Console - Complete compliance of Using JSON to store all state */}
      <div className="bg-[#FDFCFB] border border-[#E5E2DE] p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-2">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-[#1A1A1A]" />
            <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">JSON Database Controller</h3>
          </div>
          <span className="px-2 py-0.5 border border-[#E5E2DE] bg-[#F2F0ED] text-[9px] font-mono uppercase text-[#8C8984]">
            Active Serialization Sandbox
          </span>
        </div>

        <p className="text-xs text-[#8C8984] leading-relaxed uppercase font-mono">
          All system assets (employees, punch lists, milestones, teams) are loaded and serialized natively as JSON arrays. Use the controller below to query schema tables, download verified cold backups, or synchronise customized payloads directly into the local registers.
        </p>

        {/* Import & Export Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
          {/* Export */}
          <div className="p-4 bg-[#F2F0ED]/30 border border-[#E5E2DE] flex flex-col justify-between space-y-3">
            <div>
              <h4 className="text-[10.5px] font-mono font-bold text-[#1A1A1A] uppercase">Export Cold Database Backup</h4>
              <p className="text-[10px] text-[#8C8984] leading-relaxed mt-1">
                Compile all live storage registers into single verified JSON payload backup file for replication.
              </p>
            </div>
            <button
              type="button"
              onClick={exportDatabaseJson}
              className="self-start px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[9px] uppercase font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <Upload className="h-3.5 w-3.5 rotate-180" />
              Download database.json
            </button>
          </div>

          {/* Import */}
          <div className="p-4 bg-[#F2F0ED]/30 border border-[#E5E2DE] flex flex-col justify-between space-y-3">
            <div>
              <h4 className="text-[10.5px] font-mono font-bold text-[#1A1A1A] uppercase">Restore Database Snapshot</h4>
              <p className="text-[10px] text-[#8C8984] leading-relaxed mt-1">
                Upload verified legacy/replica `.json` data snapshot to safely override current tables with backup contents.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => dbFileInputRef.current?.click()}
                className="px-3 py-1.5 border border-[#E5E2DE] bg-white hover:bg-[#F2F0ED] text-[#1A1A1A] font-mono text-[9px] uppercase font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5" />
                Import backup.json
              </button>
              <input
                ref={dbFileInputRef}
                type="file"
                accept=".json"
                onChange={handleDatabaseImport}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Tabbed playground */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#1A1A1A] uppercase">Live Scheme Schema Tables:</span>
            <div className="flex items-center space-x-2">
              {jsonValidationError ? (
                <span className="px-2 py-0.5 border border-rose-300 bg-rose-50 text-rose-800 text-[8.5px] font-mono uppercase font-bold animate-pulse">
                  🚨 Pattern Malformed
                </span>
              ) : (
                <span className="px-2 py-0.5 border border-green-300 bg-green-50 text-green-800 text-[8.5px] font-mono uppercase font-bold">
                  ✓ Syntax Compliant
                </span>
              )}
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap border-b border-[#E5E2DE] gap-1 bg-[#F9F7F4] p-1 border">
            {(['employees', 'tasks', 'attendance', 'teams', 'documents'] as const).map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveJsonTab(tab);
                  setIsJsonEditable(false);
                }}
                className={`px-3 py-1.5 text-[9.5px] font-mono uppercase transition-all font-bold cursor-pointer ${
                  activeJsonTab === tab
                    ? 'bg-[#1A1A1A] text-white'
                    : 'hover:bg-[#F2F0ED] text-[#8C8984]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Text area code screen */}
          <div className="relative border border-[#E5E2DE]">
            <textarea
              value={jsonText}
              onChange={e => handleJsonChange(e.target.value)}
              disabled={!isJsonEditable}
              className={`w-full h-80 p-4 font-mono text-[11px] leading-relaxed bg-[#1A1A1A] text-green-400 focus:outline-none focus:ring-0 ${
                isJsonEditable ? 'cursor-text' : 'cursor-not-allowed opacity-90'
              }`}
              style={{ tabSize: 2 }}
            />
            
            {!isJsonEditable && (
              <div className="absolute top-2 right-2 flex items-center bg-[#1A1A1A]/85 border border-white/10 px-2 py-1 space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-[8.5px] font-mono text-white/80 uppercase font-bold tracking-wider">READ-ONLY STREAM</span>
              </div>
            )}
          </div>

          {/* Notifications */}
          {jsonSuccessBanner && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-[10px] font-mono leading-relaxed uppercase flex items-center gap-2 animate-fade-in">
              <CheckCircle className="h-4 w-4 text-green-700 shrink-0" />
              <span className="font-bold">{jsonSuccessBanner}</span>
            </div>
          )}

          {jsonValidationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-[10.5px] font-mono leading-relaxed uppercase flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
              <span className="font-bold">{jsonValidationError}</span>
            </div>
          )}

          {/* Action Pad */}
          <div className="flex items-center justify-between pt-1 font-mono">
            <span className="text-[9.5px] text-[#8C8984] uppercase">
              Table size: {jsonText.length.toLocaleString()} bytes.
            </span>

            <div className="flex items-center gap-2">
              {!isJsonEditable ? (
                <button
                  type="button"
                  onClick={() => setIsJsonEditable(true)}
                  className="px-3 py-1.5 border border-[#E5E2DE] bg-white hover:bg-[#F2F0ED] text-[#1A1A1A] text-[9.5px] uppercase font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  Unlock Live Editing
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsJsonEditable(false);
                      const current = activeJsonTab;
                      setActiveJsonTab(current);
                    }}
                    className="px-3 py-1.5 border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[9.5px] uppercase font-bold transition-all cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                  <button
                    type="button"
                    onClick={syncEditedJson}
                    disabled={!!jsonValidationError}
                    className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 disabled:bg-[#F2F0ED] disabled:text-[#8C8984] text-white text-[9.5px] uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Sync JSON Database
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
