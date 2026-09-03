/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  Users,
  Building,
  Briefcase,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  CalendarCheck,
  CheckCircle2,
  TrendingUp,
  Activity,
  Layers,
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
  Bar
} from 'recharts';

interface DashboardViewProps {
  setActiveTab: (tab: string) => void;
}

export default function DashboardView({ setActiveTab }: DashboardViewProps) {
  const {
    currentRole,
    employees,
    teams,
    projects,
    tasks,
    announcements,
    getAIAssistantResponse
  } = useWorkspace();

  const [aiInput, setAiInput] = useState('');
  const [aiChatLog, setAiChatLog] = useState<{ query: string; reply: string; timestamp: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const totalEmployees = employees.length;
  const activeTeams = teams.length;
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'Working').length;
  const toDoTasks = tasks.filter(t => t.status === 'To Do').length;
  const delayedTasks = tasks.filter(t => t.status === 'Delayed').length;

  const taskStatusData = [
    { name: 'Completed', value: completedTasks || 4, color: '#10b981' },
    { name: 'Working', value: inProgressTasks || 3, color: '#3b82f6' },
    { name: 'To Do', value: toDoTasks || 2, color: '#8b5cf6' },
    { name: 'Delayed', value: delayedTasks || 2, color: '#f59e0b' }
  ];

  const attendanceHistory = [
    { day: 'Mon', Present: 9, Absent: 1 },
    { day: 'Tue', Present: 8, Absent: 2 },
    { day: 'Wed', Present: 10, Absent: 0 },
    { day: 'Thu', Present: 9, Absent: 1 },
    { day: 'Fri', Present: 8, Absent: 2 },
    { day: 'Today', Present: 9, Absent: 1 }
  ];

  const setQuestionSnippet = (snippet: string) => {
    setAiInput(snippet.replace('_', ''));
  };

  const handleAISubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiInput.trim()) return;

    const userPrompt = aiInput.trim();
    setAiInput('');
    setIsAiLoading(true);

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAiChatLog(prev => [...prev, { query: userPrompt, reply: 'Typing...', timestamp: timeStr }]);

    const answer = await getAIAssistantResponse(userPrompt);
    setAiChatLog(prev => prev.map((log, idx) => {
      if (idx === prev.length - 1) {
        return { ...log, reply: answer };
      }
      return log;
    }));
    setIsAiLoading(false);
  };

  const overdueList = tasks.filter(t => t.status === 'Delayed');

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/20 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">OPERATIONS CONTROL CENTER</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">RANBIDGE Workspace Dashboard</h2>
          <p className="text-xs text-indigo-200/80 leading-relaxed max-w-xl">
            Live operational intelligence, AI resource allocation, and real-time database sync for <span className="font-semibold text-white">RANBIDGE Solutions</span>.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          {['Super Admin', 'HR'].includes(currentRole) && (
            <button
              onClick={() => setActiveTab('employees')}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-102 cursor-pointer flex items-center space-x-1.5"
            >
              <span>+ Add Employee</span>
            </button>
          )}
          {['Super Admin', 'Manager', 'Team Lead'].includes(currentRole) && (
            <button
              onClick={() => setActiveTab('tasks')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <span>+ Create Task</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('attendance')}
            className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold rounded-xl border border-emerald-500/30 backdrop-blur-md transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <Clock className="h-3.5 w-3.5" />
            <span>Clock In</span>
          </button>
        </div>
      </div>

      {/* Bento Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => setActiveTab('employees')}
          className="p-5 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-xs hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[var(--theme-muted)]">Workforce</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-[var(--theme-text)]">{totalEmployees}</h3>
            <p className="text-[10px] text-[var(--theme-muted)] mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <span>Active headcount</span>
            </p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('teams')}
          className="p-5 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-xs hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[var(--theme-muted)]">Teams</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
              <Building className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-[var(--theme-text)]">{activeTeams}</h3>
            <p className="text-[10px] text-[var(--theme-muted)] mt-1 font-medium">Core divisions</p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('projects')}
          className="p-5 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-xs hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[var(--theme-muted)]">Projects</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 group-hover:scale-110 transition-transform">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-[var(--theme-text)]">{activeProjects}</h3>
            <p className="text-[10px] text-[var(--theme-muted)] mt-1 font-medium">Active client milestones</p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('tasks')}
          className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/30 shadow-xs hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400">Delayed Items</span>
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 group-hover:scale-110 transition-transform">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">{delayedTasks}</h3>
            <p className="text-[10px] text-amber-700/80 dark:text-amber-300 mt-1 font-semibold">Requires attention</p>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* AI Co-Pilot Widget */}
        <div className="lg:col-span-1 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl flex flex-col h-[430px] shadow-lg overflow-hidden">
          <div className="p-4 border-b border-[var(--theme-border)] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-indigo-500 animate-spin-slow" />
              <h3 className="text-xs font-bold text-[var(--theme-text)] font-mono uppercase tracking-wider">RAN Co-Pilot AI</h3>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-500/20 text-indigo-500 rounded-full border border-indigo-500/30">ONLINE</span>
          </div>

          {/* Prompt Snippets */}
          <div className="px-3 py-2 bg-[var(--theme-sidebar)] border-b border-[var(--theme-border)] flex items-center space-x-1.5 overflow-x-auto scrollbar-thin">
            <span className="text-[9px] font-mono text-[var(--theme-muted)] uppercase font-bold shrink-0">Quick Prompts:</span>
            <button
              onClick={() => setQuestionSnippet('Show delayed tasks and assignees_')}
              className="px-2.5 py-1 text-[9px] font-semibold bg-[var(--theme-card)] text-[var(--theme-text)] border border-[var(--theme-border)] rounded-lg hover:border-indigo-500 hover:text-indigo-500 transition-all shrink-0 cursor-pointer"
            >
              Delayed Tasks
            </button>
            <button
              onClick={() => setQuestionSnippet('Suggest team for AI research project_')}
              className="px-2.5 py-1 text-[9px] font-semibold bg-[var(--theme-card)] text-[var(--theme-text)] border border-[var(--theme-border)] rounded-lg hover:border-indigo-500 hover:text-indigo-500 transition-all shrink-0 cursor-pointer"
            >
              AI Team Setup
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin">
            {aiChatLog.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--theme-text)]">Co-Pilot Intelligence System</p>
                  <p className="text-[10px] text-[var(--theme-muted)] leading-relaxed mt-1 max-w-xs">
                    Query organizational metrics, delayed milestones, or project assignments.
                  </p>
                </div>
              </div>
            ) : (
              aiChatLog.map((log, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl rounded-tr-xs p-2.5 max-w-[85%] text-xs font-medium shadow-sm">
                      {log.query}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-[var(--theme-sidebar)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-2xl rounded-tl-xs p-3 max-w-[90%] text-xs leading-relaxed">
                      {log.reply === 'Typing...' ? (
                        <div className="flex items-center space-x-1 py-1">
                          <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      ) : (
                        <p className="whitespace-pre-line text-xs">{log.reply}</p>
                      )}
                      <span className="text-[8px] font-mono text-[var(--theme-muted)] block text-right mt-1.5">{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Form input */}
          <form onSubmit={handleAISubmit} className="p-3 border-t border-[var(--theme-border)] bg-[var(--theme-card)] flex items-center space-x-2">
            <input
              type="text"
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              placeholder="Ask Co-Pilot Assistant..."
              className="flex-1 px-3.5 py-2 text-xs bg-[var(--theme-sidebar)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text)] focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isAiLoading || !aiInput.trim()}
              className="p-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-md transition-all shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        {/* Charts & Analytics Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Task Status Pie Chart */}
            <div className="p-5 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
                <h4 className="text-xs font-bold text-[var(--theme-text)] font-mono uppercase tracking-wider">Sprint Task Breakdown</h4>
                <Layers className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="h-48 my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={taskStatusData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#111827', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--theme-border)]">
                {taskStatusData.map(item => (
                  <div key={item.name} className="flex items-center space-x-2 text-[10px]">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[var(--theme-text)] font-medium">{item.name}:</span>
                    <span className="font-extrabold text-[var(--theme-text)]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Chart */}
            <div className="p-5 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
                <h4 className="text-xs font-bold text-[var(--theme-text)] font-mono uppercase tracking-wider">Attendance Log Trend</h4>
                <Activity className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="h-48 my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceHistory}>
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip contentStyle={{ background: '#111827', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '11px' }} />
                    <Line type="monotone" dataKey="Present" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Absent" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-around pt-2 border-t border-[var(--theme-border)] text-[10px]">
                <span className="flex items-center gap-1 text-emerald-500 font-bold"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Present</span>
                <span className="flex items-center gap-1 text-rose-500 font-bold"><span className="h-2 w-2 rounded-full bg-rose-500" /> Absent</span>
              </div>
            </div>

          </div>

          {/* Overdue Milestones list */}
          <div className="p-5 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-md space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <h4 className="text-xs font-bold text-[var(--theme-text)] font-mono uppercase tracking-wider">Critical Delayed Sprint Milestones</h4>
              </div>
              <button onClick={() => setActiveTab('tasks')} className="text-xs text-indigo-500 hover:text-indigo-600 font-bold flex items-center gap-1 cursor-pointer">
                <span>View All Tasks</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[var(--theme-border)]">
              {overdueList.length === 0 ? (
                <div className="py-4 text-center text-xs text-[var(--theme-muted)]">No delayed tasks reported. Operations running on schedule.</div>
              ) : (
                overdueList.map(task => (
                  <div key={task.id} className="py-3 flex items-center justify-between hover:bg-[var(--theme-hover)] px-2 rounded-xl transition-colors">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 border border-amber-500/20">{task.id}</span>
                        <h5 className="text-xs font-bold text-[var(--theme-text)]">{task.name}</h5>
                      </div>
                      <p className="text-[10px] text-[var(--theme-muted)]">Assigned to: <span className="font-semibold text-[var(--theme-text)]">{task.assignedEmployeeName}</span> | Deadline: {task.deadline}</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('tasks')}
                      className="px-3 py-1 text-[10px] font-bold bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-lg transition-all cursor-pointer"
                    >
                      Reassign
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
