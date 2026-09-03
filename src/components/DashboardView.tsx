/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  Users,
  Building,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  Calendar,
  Gift,
  PlusCircle,
  Mic,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend
} from 'recharts';

interface DashboardViewProps {
  setActiveTab: (tab: string) => void;
}

export default function DashboardView({ setActiveTab }: DashboardViewProps) {
  const {
    currentRole,
    currentUser,
    employees,
    teams,
    projects,
    tasks,
    attendance,
    announcements,
    getAIAssistantResponse
  } = useWorkspace();

  const [aiInput, setAiInput] = useState('');
  const [aiChatLog, setAiChatLog] = useState<{ query: string; reply: string; timestamp: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Stats calculation
  const totalEmployees = employees.length;
  const activeTeams = teams.length;
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'Working').length;
  const toDoTasks = tasks.filter(t => t.status === 'To Do').length;
  const delayedTasks = tasks.filter(t => t.status === 'Delayed').length;

  // Pie chart task allocation mapping
  const taskStatusData = [
    { name: 'Completed', value: completedTasks, color: '#10b981' }, // emerald-500
    { name: 'Working', value: inProgressTasks, color: '#3b82f6' }, // blue-500
    { name: 'To Do', value: toDoTasks, color: '#64748b' }, // slate-500
    { name: 'Delayed', value: delayedTasks, color: '#f59e0b' } // amber-500
  ].filter(item => item.value > 0);

  // Line chart showing simulated attendance history over past week
  const attendanceHistory = [
    { day: 'Mon', Present: 9, Absent: 1, Late: 0 },
    { day: 'Tue', Present: 8, Absent: 1, Late: 1 },
    { day: 'Wed', Present: 9, Absent: 0, Late: 1 },
    { day: 'Thu', Present: 10, Absent: 0, Late: 0 },
    { day: 'Fri', Present: 8, Absent: 1, Late: 1 },
    { day: 'Today', Present: 8, Absent: 1, Late: 1 }
  ];

  // Bar chart showing task count by team
  const teamTaskData = teams.map(team => {
    const teamEmployees = employees.filter(e => e.department === team.name.replace(' Team', '').split(' ')[0] || e.department === 'AI Research' && team.id === 'TEAM-001' || e.department === 'Web Development' && team.id === 'TEAM-002');
    const teamEmpIds = teamEmployees.map(e => e.id);
    const teamTasks = tasks.filter(t => teamEmpIds.includes(t.assignedEmployeeId));
    return {
      name: team.name.replace(' Team', '').replace(' Applications', '').split(' ')[0], // abbreviation
      Tasks: teamTasks.length,
      Completed: teamTasks.filter(t => t.status === 'Completed').length,
    };
  });

  const handleAISubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiInput.trim()) return;

    const userPrompt = aiInput.trim();
    setAiInput('');
    setIsAiLoading(true);

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user query first
    setAiChatLog(prev => [...prev, { query: userPrompt, reply: 'Typing...', timestamp: timeStr }]);

    // Make API express proxy query
    const answer = await getAIAssistantResponse(userPrompt);

    setAiChatLog(prev => prev.map((log, idx) => {
      if (idx === prev.length - 1) {
        return { ...log, reply: answer };
      }
      return log;
    }));
    setIsAiLoading(false);
  };

  const setQuestionSnippet = (question: string) => {
    setAiInput(question);
  };

  return (
    <div className="space-y-8 pb-12 text-[#1A1A1A]">
      {/* Welcome Hero Banner */}
      <div className="bg-[#F9F7F4] p-8 border border-[#E5E2DE] border-l-4 border-l-[#1A1A1A] relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2 text-[#8C8984] font-mono text-[9px] font-bold tracking-widest uppercase">
            <Sparkles className="h-3.5 w-3.5 text-[#1A1A1A]" />
            <span>AI Analytical node status: online</span>
          </div>
          <h2 className="text-3xl font-serif italic font-bold tracking-tight text-[#1A1A1A] leading-tight">
            Welcome back, {currentUser?.name || 'Director'}.
          </h2>
          <p className="text-[#8C8984] text-xs leading-relaxed max-w-xl font-sans">
            Core operational metrics active for <span className="text-[#1A1A1A] font-bold">RANBIDGE Solutions Private Limited</span>. Access clearance configured to <span className="font-serif italic font-semibold border-b border-[#1A1A1A] pb-0.5">{currentRole}</span>.
          </p>
        </div>

        {/* Quick action triggers */}
        <div className="flex flex-wrap gap-2.5 relative z-10 shrink-0">
          {['Super Admin', 'HR'].includes(currentRole) && (
            <button
              onClick={() => setActiveTab('employees')}
              className="px-4 py-2 bg-[#1A1A1A]/95 hover:bg-[#1A1A1A] text-white font-mono text-[10px] font-bold tracking-widest uppercase transition-all rounded-none cursor-pointer"
            >
              <span>Register Employee</span>
            </button>
          )}
          {['Super Admin', 'Manager', 'Team Lead'].includes(currentRole) && (
            <button
              onClick={() => setActiveTab('tasks')}
              className="px-4 py-2 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white font-mono text-[10px] font-bold tracking-widest uppercase transition-all rounded-none bg-transparent cursor-pointer"
            >
              <span>Assign New Task</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('attendance')}
            className="px-4 py-2 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white font-mono text-[10px] font-bold tracking-widest uppercase transition-all rounded-none bg-transparent cursor-pointer"
          >
            <span>Clock Check-In</span>
          </button>
        </div>
      </div>

      {/* Numerical Stats Bento Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#8C8984] font-bold font-mono">Total Workforce</span>
            <h3 className="text-5xl font-serif font-light text-[#1A1A1A] leading-none pt-1">{totalEmployees}</h3>
            <p className="text-[10px] text-[#8C8984] font-sans">Registered employees</p>
          </div>
          <div className="p-2.5 bg-[#F2F0ED] text-[#1A1A1A] rounded-none border border-[#E5E2DE] flex items-center justify-center">
            <Users className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="p-6 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#8C8984] font-bold font-mono">Divisions</span>
            <h3 className="text-5xl font-serif font-light text-[#1A1A1A] leading-none pt-1">{activeTeams}</h3>
            <p className="text-[10px] text-[#8C8984] font-sans">Active departments</p>
          </div>
          <div className="p-2.5 bg-[#F2F0ED] text-[#1A1A1A] rounded-none border border-[#E5E2DE] flex items-center justify-center">
            <Building className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="p-6 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#8C8984] font-bold font-mono">Projects</span>
            <h3 className="text-5xl font-serif font-light text-[#1A1A1A] leading-none pt-1">{activeProjects}</h3>
            <p className="text-[10px] text-[#8C8984] font-sans">Milestones in-progress</p>
          </div>
          <div className="p-2.5 bg-[#F2F0ED] text-[#1A1A1A] rounded-none border border-[#E5E2DE] flex items-center justify-center">
            <Briefcase className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="p-6 bg-[#FDFCFB] border border-orange-200/80 bg-orange-50/5 border-l-4 border-l-orange-500 rounded-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-orange-800 font-bold font-mono">Priority Delayed</span>
            <h3 className="text-5xl font-serif font-medium text-orange-900 leading-none pt-1">{delayedTasks}</h3>
            <p className="text-[10px] text-orange-700/85 font-sans">Action required</p>
          </div>
          <div className="p-2.5 bg-orange-50 text-orange-850 rounded-none border border-orange-200 flex items-center justify-center font-mono">
            <AlertCircle className="h-4.5 w-4.5" />
          </div>
        </div>
      </div>

      {/* Primary Row: Charts & Co-Pilot Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Co-Pilot AI Workspace dialog panel */}
        <div className="lg:col-span-1 bg-[#F2F0ED] border border-[#E5E2DE] border-l-4 border-l-[#1A1A1A] rounded-none flex flex-col h-[400px]">
          <div className="p-4 border-b border-[#E5E2DE] flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-mono font-bold text-[#1A1A1A] bg-white border border-[#E5E2DE] px-2 py-0.5 tracking-wider">
                RAN CO-PILOT AI
              </span>
              <h3 className="text-xs font-bold text-[#1A1A1A] font-sans tracking-tight">Enterprise Node</h3>
            </div>
            <Sparkles className="h-4 w-4 text-[#1A1A1A]" />
          </div>

          {/* Prompt quick Suggestions helper toolbar */}
          <div className="px-3 py-1.5 bg-[#F9F7F4] border-b border-[#E5E2DE] shrink-0 flex items-center space-x-1 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="text-[9px] font-mono text-[#8C8984] tracking-wider uppercase font-bold mr-1">Ask Co-pilot:</span>
            <button
              onClick={() => setQuestionSnippet('Show delayed employees this week_')}
              className="px-2 py-0.5 text-[9px] font-mono bg-white text-[#1A1A1A] border border-[#E5E2DE] hover:bg-[#1A1A1A] hover:text-white cursor-pointer transition-all"
            >
              "Delayed Sprints"
            </button>
            <button
              onClick={() => setQuestionSnippet('Recommend team mapping for NLP model tuning_')}
              className="px-2 py-0.5 text-[9px] font-mono bg-white text-[#1A1A1A] border border-[#E5E2DE] hover:bg-[#1A1A1A] hover:text-white cursor-pointer transition-all"
            >
              "NLP Team Assignments"
            </button>
          </div>

          {/* Scrollable messages container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin">
            {aiChatLog.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="p-3 bg-white border border-[#E5E2DE] text-[#1A1A1A] flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-[#1A1A1A]" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#1A1A1A] font-bold">Query Engine Ready</p>
                  <p className="text-[10px] text-[#8C8984] leading-relaxed max-w-xs mx-auto">
                    Search, query, and analysis on employees, projects, and capacity logs.
                  </p>
                </div>
              </div>
            ) : (
              aiChatLog.map((log, idx) => (
                <div key={idx} className="space-y-2">
                  {/* User query bubble */}
                  <div className="flex justify-end">
                    <div className="bg-[#1A1A1A] text-white rounded-none p-2 max-w-[85%] text-[11px] leading-relaxed font-semibold font-mono">
                      {log.query}
                    </div>
                  </div>
                  {/* AI Response bubble */}
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#E5E2DE] text-[#1A1A1A] rounded-none p-2.5 max-w-[90%] text-[11px] leading-relaxed relative font-sans">
                      {log.reply === 'Typing...' ? (
                        <div className="flex items-center space-x-1.5 py-0.5 font-sans">
                          <span className="h-1.5 w-1.5 bg-[#1A1A1A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="h-1.5 w-1.5 bg-[#1A1A1A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="h-1.5 w-1.5 bg-[#1A1A1A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      ) : (
                        <p className="whitespace-pre-line text-[10.5px] leading-relaxed select-text font-serif">{log.reply}</p>
                      )}
                      <span className="text-[8px] font-mono text-[#8C8984] block text-right mt-1.5">{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Form input dock */}
          <form onSubmit={handleAISubmit} className="p-2 border-t border-[#E5E2DE] bg-white shrink-0 flex items-center space-x-2">
            <input
              type="text"
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              placeholder="e.g. recommend team mappings..."
              disabled={isAiLoading}
              className="flex-1 bg-[#F9F7F4] text-xs border border-[#E5E2DE] text-[#1A1A1A] placeholder-[#8C8984] rounded-none px-3 py-2 focus:outline-none focus:border-[#1A1A1A] transition-all font-sans"
            />
            <button
              id="ai-submit-button"
              type="submit"
              disabled={isAiLoading || !aiInput.trim()}
              className="p-2 bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/90 disabled:opacity-50 transition-all cursor-pointer rounded-none"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Dynamic task status Recharts breakdown */}
        <div className="lg:col-span-1 bg-[#FDFCFB] border border-[#E5E2DE] p-5 rounded-none flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-4 border-b border-[#E5E2DE] pb-2 shrink-0">
            <div>
              <h3 className="text-xs font-bold text-[#1A1A1A]">Workload Resource Index</h3>
              <p className="text-[10px] text-[#8C8984]">Proportion of sprint workload allocations</p>
            </div>
            <span className="px-1.5 py-0.5 rounded-none text-[8px] font-mono font-bold bg-[#F2F0ED] text-[#1A1A1A] border border-[#E5E2DE] uppercase">
              Count: {tasks.length}
            </span>
          </div>

          {taskStatusData.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#8C8984] space-y-2">
              <CheckCircle2 className="h-10 w-10 text-[#E5E2DE]" />
              <p className="text-xs font-semibold">Workspace backlog clean</p>
              <p className="text-[10px] text-[#8C8984]">All sprint assignments resolved.</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-full h-44 select-none">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {taskStatusData.map((entry, index) => {
                        const designColors = ['#1A1A1A', '#8C8984', '#C9C6C2', '#E5E2DE'];
                        return <Cell key={`cell-${index}`} fill={designColors[index % designColors.length]} />;
                      })}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '2px', backgroundColor: '#FDFCFB', color: '#1A1A1A' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legends list matching the monochrome editorial colors */}
              <div className="w-full grid grid-cols-2 gap-2 mt-4 text-[10px] border-t border-[#E5E2DE] pt-3 text-[#1A1A1A] font-mono">
                {taskStatusData.map((item, index) => {
                  const designColors = ['#1A1A1A', '#8C8984', '#C9C6C2', '#E5E2DE'];
                  return (
                    <div key={index} className="flex items-center space-x-2 font-sans text-[#1A1A1A]">
                      <span className="h-2 w-2 shrink-0 rounded-none inline-block" style={{ backgroundColor: designColors[index % designColors.length] }} />
                      <span className="font-bold truncate">{item.name}:</span>
                      <span>{item.value} ({Math.round((item.value / tasks.length) * 100)}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Weekly Attendance line/bar summary */}
        <div className="lg:col-span-1 bg-[#FDFCFB] border border-[#E5E2DE] p-5 rounded-none flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-4 border-b border-[#E5E2DE] pb-2 shrink-0">
            <div>
              <h3 className="text-xs font-bold text-[#1A1A1A]">Daily Attendance Sheet</h3>
              <p className="text-[10px] text-[#8C8984] font-serif italic font-sans pb-1">Biometric clock attendance sheets</p>
            </div>
            <Clock className="h-4.5 w-4.5 text-[#1A1A1A]/60" />
          </div>

          <div className="flex-1 h-full select-none">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceHistory}>
                <XAxis dataKey="day" stroke="#1A1A1A" fontSize={9} tickLine={false} />
                <YAxis stroke="#1A1A1A" fontSize={9} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '2px', backgroundColor: '#FDFCFB' }} />
                <Legend verticalAlign="top" height={24} iconSize={8} wrapperStyle={{ fontSize: '9px', fontWeight: 'bold' }} />
                <Bar name="Present" dataKey="Present" stackId="a" fill="#1A1A1A" />
                <Bar name="Late Limit" dataKey="Late" stackId="a" fill="#8C8984" />
                <Bar name="Absentee" dataKey="Absent" stackId="a" fill="#E5E2DE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Section: Team Schedules and Announcements Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Teams visual backlog */}
        <div className="lg:col-span-2 bg-[#FDFCFB] border border-[#E5E2DE] p-6 rounded-none">
          <div className="flex items-center justify-between mb-4 border-b border-[#E5E2DE] pb-2">
            <div>
              <h3 className="text-xs font-bold text-[#1A1A1A]">Workforce Performance Snapshots</h3>
              <p className="text-[10px] text-[#8C8984]">Relative completion rates per operational unit</p>
            </div>
            <button
              onClick={() => setActiveTab('teams')}
              className="text-[10px] text-[#1A1A1A] font-bold font-mono tracking-widest uppercase hover:underline flex items-center shrink-0 cursor-pointer"
            >
              <span>View Divisions</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          </div>

          <div className="space-y-4">
            {teamTaskData.map((team, idx) => (
              <div key={idx} className="space-y-1 bg-[#F9F7F4] p-3 border border-[#E5E2DE]">
                <div className="flex justify-between items-center text-[10px] font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">
                  <span>{team.name} Division</span>
                  <span>{team.Completed}/{team.Tasks} Sprints Completed</span>
                </div>
                <div className="w-full bg-[#E5E2DE] h-1.5 relative text-[9px]">
                  <div
                    className="bg-[#1A1A1A] h-full absolute left-0 top-0 transition-all duration-500"
                    style={{ width: `${team.Tasks > 0 ? (team.Completed / team.Tasks) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Pinned announcements widget */}
        <div className="lg:col-span-1 bg-[#FDFCFB] border border-[#E5E2DE] p-6 rounded-none flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-2">
              <h3 className="text-xs font-bold text-[#1A1A1A] font-sans">Critical Bulletins Node</h3>
              <span className="text-[8px] font-mono font-bold bg-[#1A1A1A] text-white px-2 py-0.5 tracking-widest">
                VERIFIED
              </span>
            </div>

            <div className="space-y-3.5 max-h-48 overflow-y-auto">
              {announcements.filter(a => a.pinned).map(bullet => (
                <div key={bullet.id} className="p-3 bg-[#F2F0ED] border-l-2 border-l-[#1A1A1A] space-y-1">
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-[9px] font-bold text-[#1A1A1A]">BULLETIN-{bullet.id}</span>
                    <span className="text-[9px] text-[#8C8984] font-bold">{bullet.createdAt}</span>
                  </div>
                  <h4 className="text-xs font-serif font-bold italic text-[#1A1A1A] leading-tight font-sans">{bullet.title}</h4>
                  <p className="text-[10px] text-[#8C8984] leading-relaxed truncate font-sans">{bullet.content}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setActiveTab('communication')}
            className="w-full mt-4 py-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] font-mono text-[9px] font-bold tracking-widest uppercase transition-all rounded-none cursor-pointer flex items-[#1A1A1A] justify-center space-x-1.5"
          >
            <span>Activate Discussions Forum</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
