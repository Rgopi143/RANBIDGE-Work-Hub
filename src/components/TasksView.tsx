/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Task } from '../types';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  HelpCircle,
  Plus,
  Compass,
  Sparkles,
  MessageSquare,
  User,
  PlusCircle,
  X,
  Send,
  ArrowRight
} from 'lucide-react';

export default function TasksView() {
  const {
    currentRole,
    tasks,
    employees,
    projects,
    teams,
    addTask,
    updateTask,
    deleteTask,
    addTaskComment,
    getAISmartTaskAllocation
  } = useWorkspace();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>('TSK-201');

  // New task form fields
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [assignedEmpId, setAssignedEmpId] = useState('EMP-005');
  const [projId, setProjId] = useState('PRJ-101');
  const [deadline, setDeadline] = useState('2026-06-15');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('High');

  // AI Recommendation status info
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  // Comment input field
  const [newCommentInput, setNewCommentInput] = useState('');

  const selectedTask = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  const hasAssignAuthority = ['Super Admin', 'Manager', 'Team Lead'].includes(currentRole);

  const triggerAISuggestions = async () => {
    if (!taskDesc.trim()) {
      setAiMessage('⚠️ Please provide a clear task description scope first.');
      return;
    }
    setIsAiLoading(true);
    setAiMessage('Co-pilot evaluating skills directory mapping...');

    const result = await getAISmartTaskAllocation(taskDesc);

    setPriority(result.priority as any);

    // Map recommended team back to a suitable developer
    const matchingTeam = teams.find(t => t.id === result.recommendedTeamId);
    if (matchingTeam) {
      // Find a member of that team
      const matchedEmp = employees.find(e => {
        const teamShort = matchingTeam.name.split(' ')[0];
        return e.department.includes(teamShort) || e.id === matchingTeam.leaderId;
      });
      if (matchedEmp) {
        setAssignedEmpId(matchedEmp.id);
      }
    }

    setAiMessage(`🤖 **Co-pilot Recommendation:** Priority **${result.priority}**. Recommended Routing: **${matchingTeam ? matchingTeam.name : 'Web Team'}.**

*Justification:* ${result.reason}`);
    setIsAiLoading(false);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const employeeObj = employees.find(emp => emp.id === assignedEmpId);
    const projectObj = projects.find(p => p.id === projId);

    addTask({
      name: taskName,
      description: taskDesc,
      assignedEmployeeId: assignedEmpId,
      assignedEmployeeName: employeeObj ? employeeObj.name : 'Unassigned',
      projectId: projId,
      projectName: projectObj ? projectObj.name : 'Internal Task',
      deadline,
      priority,
      status: 'To Do'
    });

    setShowAddModal(false);
    setTaskName('');
    setTaskDesc('');
    setAiMessage('');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim() || !selectedTask) return;
    addTaskComment(selectedTask.id, newCommentInput.trim());
    setNewCommentInput('');
  };

  const updateTaskStatus = (id: string, newStatus: Task['status']) => {
    updateTask(id, { status: newStatus });
  };

  const getPriorityBadge = (p: string) => {
    if (p === 'High') return 'bg-red-50 text-red-700 border border-red-200 rounded-none font-mono tracking-wider';
    if (p === 'Medium') return 'bg-amber-50 text-amber-700 border border-amber-200 rounded-none font-mono tracking-wider';
    return 'bg-[#F2F0ED] text-[#8C8984] border border-[#E5E2DE] rounded-none font-mono tracking-wider';
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="h-4 w-4 text-[#1A1A1A] shrink-0" />;
      case 'Working': return <Clock className="h-4 w-4 text-[#1A1A1A] shrink-0" />;
      case 'Delayed': return <AlertTriangle className="h-4 w-4 text-amber-705 shrink-0" />;
      default: return <HelpCircle className="h-4 w-4 text-[#8C8984] shrink-0" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1A1A1A]">

      {/* Main Board - Sprints List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-3">
            <div>
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono tracking-wider uppercase">Sprint Backlog Queue</h3>
              <p className="text-[10px] text-[#8C8984] font-mono uppercase">Manage deliverables schedules ({tasks.length} standard tickets)</p>
            </div>
            {hasAssignAuthority && (
              <button
                onClick={() => {
                  setAiMessage('');
                  setShowAddModal(true);
                }}
                className="px-3.5 py-1.5 rounded-none bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] uppercase tracking-wider font-bold cursor-pointer transition-all flex items-center space-x-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create Sprint Ticket</span>
              </button>
            )}
          </div>

          {/* Simple List view with column categories */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {tasks.map(task => {
              const isSelected = selectedTaskId === task.id;
              return (
                <div
                  id={`task-ticket-${task.id}`}
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`p-3.5 rounded-none border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#1A1A1A] bg-[#F2F0ED] ring-1 ring-[#1A1A1A]/20'
                      : 'border-[#E5E2DE] bg-white hover:bg-[#F9F7F4]'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    {getTaskStatusIcon(task.status)}
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-xs font-bold text-[#1A1A1A] truncate">{task.name}</h4>
                      <p className="text-[10px] text-[#8C8984] truncate font-mono">
                        {task.projectName} • <span className="font-bold text-[#1A1A1A]">Assignee: {task.assignedEmployeeName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="text-[10px] font-mono font-bold text-[#8C8984]">By {task.deadline}</span>
                    <span className={`px-2 py-0.5 rounded-none text-[8.5px] font-bold ${getPriorityBadge(task.priority)} uppercase tracking-wider`}>
                      {task.priority}
                    </span>
                    <span className="inline-flex px-1.5 py-0.5 font-mono text-[8.5px] font-bold bg-[#F9F7F4] text-[#1A1A1A] border border-[#E5E2DE] rounded-none uppercase">
                      {task.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Task Details with comment section */}
      {selectedTask && (
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4">
            <div className="flex justify-between items-start border-b border-[#E5E2DE] pb-3">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono font-bold text-[#8C8984] uppercase tracking-wider">Ticket Details: {selectedTask.id}</span>
                <h3 className="text-xs font-bold text-[#1A1A1A] leading-tight">{selectedTask.name}</h3>
              </div>
              {hasAssignAuthority && (
                <button
                  onClick={() => deleteTask(selectedTask.id)}
                  className="p-1 text-[#1A1A1A] hover:bg-red-700 hover:text-white border border-[#E5E2DE] rounded-none cursor-pointer"
                >
                  <X className="h-3.5 w-3.5 shrink-0" />
                </button>
              )}
            </div>

            {/* Description context */}
            <p className="text-[11px] text-[#1A1A1A] leading-relaxed font-serif italic">{selectedTask.description}</p>

            {/* Target attributes grid */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-slate-600 border-t border-b border-[#E5E2DE] py-3.5">
              <div className="space-y-0.5 bg-[#F9F7F4] p-2.5 border border-[#E5E2DE] rounded-none font-mono">
                <span className="text-[8px] font-bold text-[#8C8984] block">ASSIGNEE</span>
                <span className="font-bold text-[#1A1A1A]">{selectedTask.assignedEmployeeName}</span>
              </div>
              <div className="space-y-0.5 bg-[#F9F7F4] p-2.5 border border-[#E5E2DE] rounded-none font-mono">
                <span className="text-[8px] font-bold text-[#8C8984] block">DEADLINE TICKET</span>
                <span className="font-bold text-[#1A1A1A]">{selectedTask.deadline}</span>
              </div>
            </div>

            {/* Change Status Controls wrapper */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono font-bold text-[#8C8984] uppercase block">Update Status Milestone</span>
              <div className="flex flex-wrap gap-1.5">
                {(['To Do', 'Working', 'Completed', 'Delayed'] as Task['status'][]).map(st => (
                  <button
                    key={st}
                    onClick={() => updateTaskStatus(selectedTask.id, st)}
                    className={`px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider font-bold rounded-none cursor-pointer border transition-all ${
                      selectedTask.status === st
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-[#F9F7F4] hover:bg-[#F2F0ED] text-[#1A1A1A] border-[#E5E2DE]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Comments Loop */}
            <div className="space-y-3.5 pt-2 border-t border-[#E5E2DE] text-[11px]">
              <div className="flex items-center space-x-1.5 pb-1">
                <MessageSquare className="h-4 w-4 text-[#1A1A1A] shrink-0" />
                <span className="text-[10px] font-mono font-bold text-[#8C8984] uppercase tracking-wide">Developer Commentary ({selectedTask.comments.length})</span>
              </div>

              {/* Feed wrapper */}
              <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                {selectedTask.comments.map((comment, index) => (
                  <div key={index} className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none space-y-1">
                    <div className="flex justify-between items-center text-[9px] font-bold text-[#1A1A1A] font-mono">
                      <span>{comment.author}</span>
                      <span className="text-[#8C8984]">{comment.timestamp}</span>
                    </div>
                    <p className="text-[#1A1A1A] leading-normal text-[10.5px] font-serif italic select-text">{comment.comment}</p>
                  </div>
                ))}
              </div>

              {/* Comment submit bar */}
              <form onSubmit={handlePostComment} className="flex space-x-1.5 pt-1.5">
                <input
                  type="text"
                  value={newCommentInput}
                  onChange={e => setNewCommentInput(e.target.value)}
                  placeholder="Draft feedback comments..."
                  className="flex-1 bg-[#F9F7F4] border border-[#E5E2DE] text-[11px] placeholder-[#8C8984] rounded-none px-2.5 py-2 focus:outline-none focus:border-[#1A1A1A]"
                />
                <button
                  type="submit"
                  disabled={!newCommentInput.trim()}
                  className="p-2 bg-[#1A1A1A] hover:bg-[#1a1a1a]/90 text-white rounded-none disabled:bg-[#F2F0ED] disabled:text-[#8C8984] cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal with AI Co-Pilot Recommendation system */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] rounded-none w-full max-w-xl border border-[#E5E2DE] overflow-hidden shadow-2xl animate-fade-in">
            <div className="px-6 py-4 border-b border-[#E5E2DE] bg-[#F2F0ED] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Assign New Sprint Ticket</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="p-6 space-y-4 font-sans">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Ticket Task Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Audit API routing headers"
                  value={taskName}
                  onChange={e => setTaskName(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                />
              </div>

              {/* Scope block with AI evaluation trigger */}
              <div className="space-y-1 relative">
                <div className="flex justify-between items-center pb-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Functional Scope / Description</label>
                  <button
                    type="button"
                    onClick={triggerAISuggestions}
                    disabled={isAiLoading || !taskDesc.trim()}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-none bg-[#1A1A1A] hover:bg-[#1A1A1A]/95 disabled:bg-[#F2F0ED] disabled:text-[#8C8984] text-white font-mono text-[9px] font-bold border border-[#E5E2DE] cursor-pointer transition-all uppercase"
                  >
                    <Sparkles className="h-3 w-3 text-white fill-white/10" />
                    <span>Get AI allocation recommendation</span>
                  </button>
                </div>
                <textarea
                  required
                  placeholder="Describe functional goals in detail so Gemini can evaluate matching teams and suggest target priority levels..."
                  value={taskDesc}
                  onChange={e => setTaskDesc(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] h-20"
                />
              </div>

              {/* Co-Pilot feedback text */}
              {aiMessage && (
                <div className="p-3 bg-[#F2F0ED] border-l-2 border-[#1A1A1A] border border-[#E5E2DE] text-[10.5px] leading-relaxed text-[#1A1A1A] font-serif italic whitespace-pre-wrap select-text animate-fade-in">
                  {aiMessage}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Assigned Project</label>
                  <select
                    value={projId}
                    onChange={e => setProjId(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] cursor-pointer"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Assigned Developer</label>
                  <select
                    value={assignedEmpId}
                    onChange={e => setAssignedEmpId(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] cursor-pointer"
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Ticket Target Deadline</label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Priority Level</label>
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
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] uppercase tracking-widest font-bold cursor-pointer rounded-none transition-all"
              >
                Assemble Ticket & Send Notifications
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
