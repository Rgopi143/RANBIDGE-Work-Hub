/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Project } from '../types';
import {
  Briefcase,
  Calendar,
  Layers,
  CheckSquare,
  FileText,
  UploadCloud,
  ChevronRight,
  PlusCircle,
  TrendingUp,
  X,
  Plus
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  Cell
} from 'recharts';

export default function ProjectsView() {
  const {
    currentRole,
    projects,
    teams,
    addProject,
    deleteProject,
    uploadProjectFile,
    tasks,
    employees
  } = useWorkspace();

  const [showAddProject, setShowAddProject] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState('PRJ-101');
  const [ganttViewMode, setGanttViewMode] = useState<'selected' | 'all'>('selected');

  // Add project form states
  const [projName, setProjName] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [clientName, setClientName] = useState('');
  const [startDate, setStartDate] = useState('2026-05-25');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [teamAssignedId, setTeamAssignedId] = useState('TEAM-001');
  const [budget, setBudget] = useState(1000000);
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('High');
  const [projMentorId, setProjMentorId] = useState('EMP-013');
  const [projGuideId, setProjGuideId] = useState('EMP-012');
  const [projInternId, setProjInternId] = useState('EMP-015');

  // Simulated drag-over highlight state for uploading project agreements
  const [isDragOver, setIsDragOver] = useState(false);

  const selectedProject = projects.find(p => p.id === activeProjectId) || projects[0];

  const parseDate = (str: string) => {
    if (!str) return new Date();
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const selectedTasks = tasks.filter(t => t.projectId === selectedProject?.id);

  // If we are looking at active project tasks, let's process them
  const computedTasks = selectedTasks.map(t => {
    const end = parseDate(t.deadline);
    // Draft logical start dates based on priority if tasks don't have explicit project/start
    const durationDays = t.priority === 'High' ? 18 : t.priority === 'Medium' ? 12 : 8;
    let start = new Date(end.getTime() - durationDays * 24 * 60 * 60 * 1000);
    if (selectedProject) {
      const projStart = parseDate(selectedProject.startDate);
      if (start < projStart) {
        start = projStart;
      }
    }
    return {
      id: t.id,
      name: t.name,
      assignee: t.assignedEmployeeName,
      priority: t.priority,
      status: t.status,
      startDate: start,
      endDate: end
    };
  });

  // If looking at all company projects
  const computedProjects = projects.map(p => {
    const start = parseDate(p.startDate);
    const end = parseDate(p.endDate);
    return {
      id: p.id,
      name: p.name,
      assignee: p.clientName || 'Internal',
      priority: p.priority,
      status: p.status === 'Completed' ? 'Completed' : p.status === 'In Progress' ? 'Working' : p.status === 'On Hold' ? 'Delayed' : 'To Do',
      startDate: start,
      endDate: end
    };
  });

  const items = ganttViewMode === 'selected' ? computedTasks : computedProjects;

  let minDate = new Date();
  if (items.length > 0) {
    minDate = new Date(Math.min(...items.map(item => item.startDate.getTime())));
  } else if (selectedProject) {
    minDate = parseDate(selectedProject.startDate);
  }
  // Back up 3 days for extra chart padding
  const chartMinDate = new Date(minDate.getTime() - 3 * 24 * 60 * 60 * 1000);

  const chartData = items.map(item => {
    const startOffset = Math.round((item.startDate.getTime() - chartMinDate.getTime()) / (24 * 60 * 60 * 1000));
    const duration = Math.max(1, Math.round((item.endDate.getTime() - item.startDate.getTime()) / (24 * 60 * 60 * 1000)));
    return {
      ...item,
      startOffset,
      duration,
      startDateStr: item.startDate.toISOString().split('T')[0],
      endDateStr: item.endDate.toISOString().split('T')[0]
    };
  });

  const tickFormatter = (val: number) => {
    const d = new Date(chartMinDate.getTime() + val * 24 * 60 * 60 * 1000);
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getPriorityColorHex = (priority: string) => {
    if (priority === 'High') return '#B91C1C'; // Deep Crimson
    if (priority === 'Medium') return '#D97706'; // Warm Amber
    return '#6B7280'; // Cool Slate
  };

  const getStatusColorHex = (status: string) => {
    if (status === 'Completed') return '#059669'; // Emerald
    if (status === 'In Progress' || status === 'Working') return '#1A1A1A'; // Deep Charcoal
    if (status === 'On Hold' || status === 'Delayed') return '#D97706'; // Warm Amber
    return '#8C8984'; // Muted Grey
  };

  const CustomGanttTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FDFCFB] border border-[#E5E2DE] p-3 text-xs space-y-1.5 shadow-md rounded-none font-sans text-[#1A1A1A]">
          <p className="font-bold text-xs text-[#1A1A1A] border-b border-[#E5E2DE] pb-1">{data.name}</p>
          <div>
            <span className="text-[#8C8984] font-mono text-[9px] block font-bold uppercase tracking-wider">Timeline RANGE</span>
            <span className="font-semibold text-[#1A1A1A]">{data.startDateStr} to {data.endDateStr} ({data.duration} days)</span>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <span className="text-[#8C8984] font-mono text-[9px] block font-bold uppercase tracking-wider">Assignee/Client</span>
              <span className="font-semibold text-[#1A1A1A]">{data.assignee}</span>
            </div>
            <div>
              <span className="text-[#8C8984] font-mono text-[9px] block font-bold uppercase tracking-wider">Priority</span>
              <span className="font-extrabold text-[#1A1A1A]" style={{ color: getPriorityColorHex(data.priority) }}>
                {data.priority}
              </span>
            </div>
          </div>
          <div>
            <span className="text-[#8C8984] font-mono text-[9px] block font-bold uppercase tracking-wider">Current Status</span>
            <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#F2F0ED] text-[#1A1A1A] border border-[#E5E2DE] capitalize mt-0.5 tracking-wide">
              {data.status}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const hasManagerAuthority = ['Super Admin', 'CEO', 'CFO', 'CTO', 'COO', 'CMO', 'HR', 'Manager', 'Project Manager', 'Team Lead'].includes(currentRole);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const activeTeam = teams.find(t => t.id === teamAssignedId);
    const mentorEmp = employees.find(emp => emp.id === projMentorId);
    const guideEmp = employees.find(emp => emp.id === projGuideId);
    const internEmp = employees.find(emp => emp.id === projInternId);

    addProject({
      name: projName,
      description: projDesc,
      clientName,
      startDate,
      endDate,
      teamAssignedId,
      teamAssignedName: activeTeam ? activeTeam.name : 'Unassigned',
      budget: Number(budget),
      priority,
      status: 'Pending',
      mentorId: projMentorId,
      mentorName: mentorEmp ? mentorEmp.name : 'Dr. Anita Joshi',
      guideId: projGuideId,
      guideName: guideEmp ? guideEmp.name : 'Suresh Reddy',
      internIds: [projInternId],
      internNames: internEmp ? [internEmp.name] : ['Neha Kapoor']
    });
    setShowAddProject(false);
    setProjName('');
    setProjDesc('');
    setClientName('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDropUpload = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!selectedProject) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const cleanSize = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;
      uploadProjectFile(selectedProject.id, file.name, cleanSize);
    }
  };

  const handleManualUploadClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedProject || !e.target.files) return;
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const cleanSize = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;
      uploadProjectFile(selectedProject.id, file.name, cleanSize);
    }
  };

  // Pre-configured milstone grids for simulation
  const mockMilestones: { [key: string]: { task: string; done: boolean }[] } = {
    'PRJ-101': [
      { task: 'Set up core vector database schema', done: true },
      { task: 'Build express proxy AI router integrations', done: true },
      { task: 'Conduct testing on prompt tuning benchmarks', done: false },
      { task: 'Establish real-time video streaming capabilities', done: false }
    ],
    'PRJ-102': [
      { task: 'Design mobile-first wireframe drafts', done: true },
      { task: 'Construct SBI customer enrollment endpoints', done: true },
      { task: 'Deploy responsive layout dashboard templates', done: false }
    ],
    'PRJ-103': [
      { task: 'Formulate PCB signal routing outlines', done: true },
      { task: 'Assemble lead Bluetooth LE microcontrollers', done: false }
    ],
    'PRJ-104': [
      { task: 'Run web injection penetration crawls', done: true },
      { task: 'Audit docker container configurations', done: true },
      { task: 'Automate SOC-2 verification checklists', done: false }
    ]
  };

  const activeMilestones = mockMilestones[selectedProject?.id] || [
    { task: 'Collect client SOW alignment constraints', done: true },
    { task: 'Determine team schedules and sprint backlogs', done: false }
  ];

  const getPriorityColor = (level: string) => {
    if (level === 'High') return 'bg-red-50 text-red-700 border-red-200 rounded-none uppercase font-mono tracking-wider';
    if (level === 'Medium') return 'bg-amber-50 text-amber-700 border-amber-200 rounded-none uppercase font-mono tracking-wider';
    return 'bg-[#F2F0ED] text-[#8C8984] border-[#E5E2DE] rounded-none uppercase font-mono tracking-wider';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'bg-emerald-700';
    if (status === 'In Progress') return 'bg-[#1A1A1A]';
    if (status === 'On Hold') return 'bg-amber-600';
    return 'bg-[#8C8984]';
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1A1A1A]">

      {/* Left Columns - Projects Selection Menu */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-4 space-y-3.5">
          <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-2">
            <div>
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono tracking-wider uppercase font-bold">Company Projects</h3>
              <p className="text-[10px] text-[#8C8984] font-mono">Total Projects: {projects.length}</p>
            </div>
            {hasManagerAuthority && (
              <button
                onClick={() => setShowAddProject(true)}
                className="p-1.5 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] bg-[#FDFCFB] rounded-none cursor-pointer transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="space-y-2">
            {projects.map(proj => {
              const isActive = proj.id === activeProjectId;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectId(proj.id)}
                  className={`w-full text-left p-4 rounded-none transition-all border cursor-pointer ${
                    isActive
                      ? 'border-[#1A1A1A] bg-[#F2F0ED] ring-1 ring-[#1A1A1A]/20'
                      : 'border-[#E5E2DE] hover:bg-[#F9F7F4]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1A1A]">{proj.name}</h4>
                      <p className="text-[9.5px] font-mono text-[#8C8984] mt-0.5 uppercase tracking-wide">ID: {proj.id} • {proj.clientName}</p>
                    </div>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-none text-[8.5px] font-bold ${getPriorityColor(proj.priority)} border`}>
                      {proj.priority}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mt-4 text-[10px] text-[#8C8984] font-medium font-mono">
                    <span className={`h-2 w-2 rounded-none ${getStatusColor(proj.status)} shrink-0`} />
                    <span className="capitalize">{proj.status}</span>
                    <span>•</span>
                    <span>Team: {proj.teamAssignedName.split(' ')[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right side Detail Dashboard */}
      {selectedProject && (
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-6 space-y-5">
            {/* Title & Status */}
            <div className="flex justify-between items-start border-b border-[#E5E2DE] pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#8C8984] uppercase tracking-widest">{selectedProject.clientName}</span>
                <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight">{selectedProject.name}</h3>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="inline-flex items-center px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#F2F0ED] text-[#1A1A1A] border border-[#E5E2DE] font-mono uppercase">
                  Budget: INR {(selectedProject.budget / 100000).toFixed(1)} Lakhs
                </span>
                {hasManagerAuthority && (
                  <button
                    onClick={() => deleteProject(selectedProject.id)}
                    className="p-1 px-2.5 bg-[#F9F7F4] text-red-700 hover:bg-red-700 hover:text-white rounded-none border border-[#E5E2DE] text-[10px] font-mono tracking-wider font-bold transition-all cursor-pointer uppercase"
                  >
                    Terminate Project
                  </button>
                )}
              </div>
            </div>

            {/* Description card */}
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-[#8C8984] tracking-wider block">Scope / SOW Specifications</span>
              <p className="text-xs text-[#1A1A1A] leading-relaxed font-normal font-serif italic">{selectedProject.description}</p>
            </div>

            {/* Timelines and Teams */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-700 font-mono">
              <div className="p-3 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none space-y-2">
                <span className="text-[9px] font-mono text-[#8C8984] block font-bold leading-none uppercase">PROJECT DEADLINE DATES</span>
                <div className="flex items-center space-x-2 text-[#1A1A1A]">
                  <Calendar className="h-4 w-4 text-[#8C8984] shrink-0" />
                  <span>Start: {selectedProject.startDate} • End: {selectedProject.endDate}</span>
                </div>
              </div>
              <div className="p-3 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none space-y-2">
                <span className="text-[9px] font-mono text-[#8C8984] block font-bold leading-none uppercase">DIVISION ASSIGNED</span>
                <div className="flex items-center space-x-2 text-[#1A1A1A]">
                  <Layers className="h-4 w-4 text-[#1A1A1A] shrink-0" />
                  <span>{selectedProject.teamAssignedName}</span>
                </div>
              </div>
            </div>

            {/* Allotted Mentors, Guides & Interns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-indigo-50/60 border border-indigo-200/80 rounded-none space-y-1">
                <span className="text-[9px] font-mono text-indigo-700 block font-bold uppercase">ALLOTTED MENTOR</span>
                <span className="font-bold text-indigo-950 block truncate">{selectedProject.mentorName || 'Dr. Anita Joshi (Mentor)'}</span>
              </div>
              <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-none space-y-1">
                <span className="text-[9px] font-mono text-emerald-700 block font-bold uppercase">ALLOTTED GUIDE</span>
                <span className="font-bold text-emerald-950 block truncate">{selectedProject.guideName || 'Suresh Reddy (Guide)'}</span>
              </div>
              <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-none space-y-1">
                <span className="text-[9px] font-mono text-amber-800 block font-bold uppercase">ASSIGNED INTERN</span>
                <span className="font-bold text-amber-950 block truncate">{selectedProject.internNames?.join(', ') || 'Neha Kapoor (Intern)'}</span>
              </div>
            </div>

            {/* Milestones checklist layout */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-1.5 mb-2">
                <CheckSquare className="h-4 w-4 text-[#1A1A1A]" />
                <span className="text-[10px] font-mono font-bold text-[#8C8984] tracking-wider uppercase">Milestone Progress Timelines</span>
              </div>
              <div className="space-y-2">
                {activeMilestones.map((m, idx) => (
                  <div key={idx} className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none flex items-center justify-between font-sans text-xs">
                    <div className="flex items-center space-x-3">
                      <div className={`h-4.5 w-4.5 rounded-none border border-[#1A1A1A] flex items-center justify-center shrink-0 ${m.done ? 'bg-[#1A1A1A] text-white' : 'bg-white'}`}>
                        {m.done && <span className="text-[12px] font-black">✓</span>}
                      </div>
                      <span className={`font-semibold ${m.done ? 'line-through text-[#8C8984]' : 'text-[#1A1A1A]'}`}>{m.task}</span>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-none font-mono tracking-wider uppercase border border-[#E5E2DE] ${m.done ? 'bg-[#F2F0ED] text-[#1A1A1A]' : 'bg-white text-amber-600'}`}>
                      {m.done ? 'Completed' : 'Draft active'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Vault Dropzone */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-[#1A1A1A]" />
                  <span className="text-[10px] font-mono font-bold text-[#8C8984] tracking-wider uppercase">Project Files Ledger</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-[#1A1A1A] uppercase">Version controlled</span>
              </div>

              {/* Upload Drop Zone drag and drop */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDropUpload}
                className={`p-6 border-2 border-dashed rounded-none flex flex-col items-center justify-center text-center space-y-2 cursor-pointer transition-all ${
                  isDragOver
                    ? 'border-[#1A1A1A] bg-[#F2F0ED] text-[#1A1A1A] shadow-md'
                    : 'border-[#E5E2DE] bg-[#F9F7F4] text-[#8C8984] hover:border-[#1A1A1A]'
                }`}
              >
                <UploadCloud className={`h-8 w-8 transition-colors ${isDragOver ? 'text-[#1A1A1A] animate-bounce' : 'text-[#8C8984]'}`} />
                <div className="space-y-0.5">
                  <p className="text-xs text-[#1A1A1A] font-bold uppercase font-mono tracking-wider">Drag and Drop PDF, PNG files here</p>
                  <p className="text-[10px] text-[#8C8984] font-medium font-sans">Or click below to browse locally from disk</p>
                </div>
                <label className="px-3.5 py-1.5 bg-white hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] text-[10px] tracking-widest font-bold text-[#1A1A1A] rounded-none cursor-pointer transition-all inline-block mt-2 font-mono uppercase">
                  <span>Browse Files</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleManualUploadClick}
                  />
                </label>
              </div>

              {/* Upload files listing */}
              <div className="space-y-2">
                {selectedProject.files.map((f, idx) => (
                  <div key={idx} className="p-3 bg-white border border-[#E5E2DE] rounded-none flex items-center justify-between text-xs text-slate-705">
                    <div className="flex items-center space-x-2.5 truncate">
                      <FileText className="h-4 w-4 text-[#1A1A1A] shrink-0" />
                      <span className="font-bold text-[#1A1A1A] truncate">{f.name}</span>
                      <span className="text-[9px] font-mono text-[#8C8984] shrink-0">{f.size}</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-[#8C8984] shrink-0 uppercase">Uploaded: {f.uploadedAt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] rounded-none w-full max-w-md border border-[#E5E2DE] overflow-hidden shadow-2xl animate-fade-in">
            <div className="px-6 py-4 border-b border-[#E5E2DE] bg-[#F2F0ED] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Assign New Company Project</h3>
              <button onClick={() => setShowAddProject(false)} className="p-1 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI HR App"
                  value={projName}
                  onChange={e => setProjName(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Description / Deliverables</label>
                <textarea
                  required
                  value={projDesc}
                  onChange={e => setProjDesc(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 pb-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SBI"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Priority</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Budget (INR)</label>
                  <input
                    type="number"
                    required
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Assigned Team</label>
                  <select
                    value={teamAssignedId}
                    onChange={e => setTeamAssignedId(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] cursor-pointer"
                  >
                    {teams.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-indigo-600 font-mono uppercase block">Allot Mentor</label>
                  <select
                    value={projMentorId}
                    onChange={e => setProjMentorId(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-indigo-200 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-indigo-600 text-[#1A1A1A] cursor-pointer"
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name} ({emp.designation})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-emerald-600 font-mono uppercase block">Allot Guide</label>
                  <select
                    value={projGuideId}
                    onChange={e => setProjGuideId(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-emerald-200 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-[#1A1A1A] cursor-pointer"
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name} ({emp.designation})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-amber-700 font-mono uppercase block">Add Intern to Project</label>
                <select
                  value={projInternId}
                  onChange={e => setProjInternId(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-amber-200 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-amber-600 text-[#1A1A1A] cursor-pointer"
                >
                  {employees.filter(emp => emp.employmentType === 'Intern' || emp.designation === 'Intern' || emp.id === 'EMP-015').map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.designation})</option>
                  ))}
                  {employees.filter(emp => emp.employmentType !== 'Intern' && emp.id !== 'EMP-015').map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.designation})</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] uppercase tracking-widest font-bold cursor-pointer rounded-none transition-all"
              >
                Launch Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>

      {/* Gantt Timeline Visualizer Container spanning full width */}
      <div id="gantt-chart-section" className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#E5E2DE] pb-4 gap-3">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-[#1A1A1A] font-mono tracking-wider uppercase">Project Calendar Gantt Visualizer</h3>
            <p className="text-[10px] text-[#8C8984] font-mono">
              Real-time interactive task schedules & timelines mapped across the corporation calendar.
            </p>
          </div>
          
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setGanttViewMode('selected')}
              className={`px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer ${
                ganttViewMode === 'selected'
                  ? 'bg-[#1A1A1A] text-white font-bold'
                  : 'bg-[#FDFCFB] text-[#1A1A1A] border border-[#E5E2DE] hover:bg-[#F2F0ED]'
              }`}
            >
              Active Project Tasks
            </button>
            <button
              onClick={() => setGanttViewMode('all')}
              className={`px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer ${
                ganttViewMode === 'all'
                  ? 'bg-[#1A1A1A] text-white font-bold'
                  : 'bg-[#FDFCFB] text-[#1A1A1A] border border-[#E5E2DE] hover:bg-[#F2F0ED]'
              }`}
            >
              All Company Projects
            </button>
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-[#F9F7F4] border border-[#E5E2DE] space-y-2">
            <TrendingUp className="h-8 w-8 text-[#8C8984]" />
            <p className="text-xs font-bold text-[#1A1A1A] font-mono uppercase">No schedule data available</p>
            <p className="text-xs text-[#8C8984] max-w-sm">No tasks are currently assigned to this project to map onto the timeline calendar.</p>
          </div>
        ) : (
          <div className="w-full">
            <div style={{ minWidth: '100%', height: `${Math.max(220, chartData.length * 40 + 60)}px` }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  layout="vertical"
                  data={chartData}
                  margin={{ top: 15, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#E5E2DE" />
                  <XAxis
                    type="number"
                    tickFormatter={tickFormatter}
                    domain={['dataMin', 'dataMax + 2']}
                    stroke="#8C8984"
                    fontSize={10}
                    fontFamily="monospace"
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#8C8984"
                    fontSize={10}
                    fontFamily="sans-serif"
                    width={180}
                  />
                  <RechartsTooltip content={<CustomGanttTooltip />} cursor={{ fill: 'rgba(26, 26, 26, 0.05)' }} />
                  <Bar
                    dataKey="startOffset"
                    stackId="a"
                    fill="transparent"
                    isAnimationActive={false}
                  />
                  <Bar
                    dataKey="duration"
                    stackId="a"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getStatusColorHex(entry.status)}
                      />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend guide */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-[10px] font-mono text-[#8C8984] border-t border-[#E5E2DE] mt-4">
              <div className="flex items-center space-x-1.5">
                <span className="h-3 w-3 inline-block bg-[#059669]" />
                <span className="uppercase font-bold">COMPLETED / LAUNCHED</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="h-3 w-3 inline-block bg-[#1A1A1A]" />
                <span className="uppercase font-bold font-sans">IN PROGRESS / WORKING</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="h-3 w-3 inline-block bg-[#D97706]" />
                <span className="uppercase font-bold font-sans">DELAYED / ON HOLD</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="h-3 w-3 inline-block bg-[#8C8984]" />
                <span className="uppercase font-bold font-sans">TO DO / PENDING</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
