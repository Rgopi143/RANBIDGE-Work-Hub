/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Team, ChatMessage } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Users,
  MessageSquare,
  ChevronRight,
  Send,
  Sparkles,
  Award,
  PlusSquare,
  Activity,
  Plus,
  X
} from 'lucide-react';

export default function TeamsView() {
  const {
    currentRole,
    currentUser,
    teams,
    employees,
    chatMessages,
    sendTeamChatMessage,
    addTeam
  } = useWorkspace();

  const [activeTeamId, setActiveTeamId] = useState('TEAM-001');
  const [chatInput, setChatInput] = useState('');
  const [showAddTeam, setShowAddTeam] = useState(false);

  // Chat scroll auto-bottom handler
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, activeTeamId]);

  // Add team form states
  const [teamName, setTeamName] = useState('');
  const [teamDesc, setTeamDesc] = useState('');
  const [teamLeadId, setTeamLeadId] = useState('EMP-001');

  const selectedTeam = teams.find(t => t.id === activeTeamId) || teams[0];
  const selectedTeamMessages = chatMessages.filter(msg => msg.teamId === activeTeamId);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendTeamChatMessage(activeTeamId, chatInput.trim());
    setChatInput('');
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const leadEmp = employees.find(emp => emp.id === teamLeadId);
    addTeam({
      name: teamName,
      description: teamDesc,
      leaderId: teamLeadId,
      leaderName: leadEmp ? leadEmp.name : 'Unassigned',
      memberIds: [teamLeadId],
      productivityScore: 80
    });
    setShowAddTeam(false);
    setTeamName('');
    setTeamDesc('');
  };

  const getTeamDesignTheme = (teamId: string) => {
    switch (teamId) {
      case 'TEAM-001': return { bg: 'bg-indigo-50/65', border: 'border-indigo-100', text: 'text-indigo-700', fill: 'bg-indigo-600' };
      case 'TEAM-002': return { bg: 'bg-blue-50/65', border: 'border-blue-100', text: 'text-blue-700', fill: 'bg-blue-600' };
      case 'TEAM-003': return { bg: 'bg-amber-50/65', border: 'border-amber-100', text: 'text-amber-700', fill: 'bg-amber-600' };
      case 'TEAM-004': return { bg: 'bg-emerald-50/65', border: 'border-emerald-100', text: 'text-emerald-700', fill: 'bg-emerald-600' };
      case 'TEAM-005': return { bg: 'bg-rose-50/65', border: 'border-rose-100', text: 'text-rose-700', fill: 'bg-rose-600' };
      default: return { bg: 'bg-slate-50', border: 'border-slate-100', text: 'text-slate-700', fill: 'bg-slate-600' };
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1A1A1A]">
      
      {/* Left side: Teams Menu & Directory */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-4 space-y-3.5">
          <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-3">
            <div>
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono tracking-wider uppercase">Operational Divisions</h3>
              <p className="text-[10px] text-[#8C8984] font-mono">Total Teams: {teams.length}</p>
            </div>
            {['Super Admin', 'HR', 'Manager'].includes(currentRole) && (
              <button
                onClick={() => setShowAddTeam(true)}
                className="p-1.5 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] rounded-none cursor-pointer transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="space-y-2">
            {teams.map(team => {
              const theme = getTeamDesignTheme(team.id);
              const isActive = team.id === activeTeamId;
              return (
                <button
                  key={team.id}
                  onClick={() => setActiveTeamId(team.id)}
                  className={`w-full text-left p-3.5 rounded-none transition-all border cursor-pointer ${
                    isActive
                      ? 'border-[#1A1A1A] bg-[#F2F0ED] ring-1 ring-[#1A1A1A]/20'
                      : 'border-[#E5E2DE] hover:bg-[#F9F7F4]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1A1A]">{team.name}</h4>
                      <p className="text-[9px] text-[#8C8984] font-mono mt-0.5 uppercase tracking-wide">ID: {team.id} • Lead: {team.leaderName}</p>
                    </div>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-none text-[8px] font-mono font-bold bg-[#F9F7F4] text-[#1A1A1A] border border-[#E5E2DE]">
                      KPI Score: {team.productivityScore}%
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8C8984] leading-normal mt-2.5 truncate font-serif italic">{team.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Team info sheet */}
        {selectedTeam && (
          <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#E5E2DE] pb-3">
              <Users className="h-4 w-4 text-[#1A1A1A]" />
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono tracking-wider uppercase">Team Resources Allocation</h3>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-[#8C8984] uppercase block">TEAM LEADER (Assigned)</span>
                <div className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none flex items-center space-x-2 text-xs">
                  <div className="h-2 w-2 rounded-full bg-[#1A1A1A] shrink-0" />
                  <span className="font-bold text-[#1A1A1A]">{selectedTeam.leaderName}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-[#8C8984] uppercase block">Active Board Members</span>
                <div className="space-y-1">
                  {employees
                    .filter(emp => emp.department === selectedTeam.name.replace(' Team', '').replace(' Applications', '').split(' ')[0] || (emp.department === 'AI Research' && selectedTeam.id === 'TEAM-001') || (emp.department === 'Web Development' && selectedTeam.id === 'TEAM-002') || selectedTeam.memberIds.includes(emp.id))
                    .map(member => (
                      <div key={member.id} className="p-2 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2 truncate">
                          <img src={member.photo} className="h-5 w-5 rounded-none object-cover border border-[#E5E2DE] referer-policy animate-fade-in" referrerPolicy="no-referrer" alt="" />
                          <span className="font-medium text-[#1A1A1A] truncate">{member.name}</span>
                        </div>
                        <span className="text-[9px] font-mono text-[#8C8984] shrink-0 font-bold uppercase">{member.designation}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right side: Integrated central central panel Chat communication */}
      <div className="lg:col-span-2 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none flex flex-col h-[580px] overflow-hidden">
        <div className="p-4.5 border-b border-[#E5E2DE] bg-[#F2F0ED] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white text-[#1A1A1A] border border-[#E5E2DE] rounded-none flex items-center justify-center">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1A1A1A] tracking-wider uppercase font-mono">{selectedTeam?.name} central</h3>
              <p className="text-[9.5px] font-mono text-[#8C8984] uppercase tracking-wider font-bold">Central Operations Audio-Sync channels</p>
            </div>
          </div>
          {activeTeamId === 'TEAM-001' && (
            <div className="px-2 py-0.5 bg-[#1A1A1A] text-white rounded-none text-[10px] border border-[#E5E2DE] font-bold flex items-center space-x-1.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 fill-white/10" />
              <span>AI Agent Online</span>
            </div>
          )}
        </div>

        {/* Info advice ticker */}
        <div className="bg-[#F9F7F4] border-b border-[#E5E2DE] px-4.5 py-1.5 flex items-center justify-between shrink-0 text-[10px] text-[#8C8984] font-medium font-mono uppercase tracking-wider">
          <span>Simulation Workspace chat channel. System activities logging enabled.</span>
          {activeTeamId === 'TEAM-001' && (
            <span className="text-[#1a1a1a] font-bold font-mono">Type '/ai help' for co-pilot shortcuts!</span>
          )}
        </div>

        {/* Scrollable messages box */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
          {selectedTeamMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-550 space-y-2">
              <MessageSquare className="h-10 w-10 text-[#E5E2DE]" />
              <p className="text-xs font-semibold text-[#1A1A1A]">Quiet in this channel</p>
              <p className="text-[10px] text-[#8C8984] max-w-sm">Start the sync logs! Send an update or prompt the operations assistant to begin.</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {selectedTeamMessages.map((msg, idx) => {
                const isMe = msg.senderId === currentUser?.id;
                const isAi = msg.senderId === 'SYSTEM-AI';

                return (
                  <motion.div
                    key={msg.id || idx}
                    initial={{ opacity: 0, x: isMe ? 20 : -20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    className={`flex items-start space-x-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isMe && (
                      <div className="h-7 w-7 rounded-none text-[10px] font-bold flex items-center justify-center shrink-0 uppercase bg-[#1A1A1A] text-white border border-[#E5E2DE]">
                        {msg.senderName.substring(0, 2)}
                      </div>
                    )}
                    <div className="max-w-[75%] space-y-0.5">
                      <div className={`flex items-baseline space-x-1.5 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[10px] font-bold text-[#1A1A1A]">{msg.senderName}</span>
                        <span className="text-[8px] font-mono text-[#8C8984] font-bold tracking-wider uppercase">{msg.senderRole} • {msg.timestamp}</span>
                      </div>
                      <div className={`p-3 rounded-none text-[11px] leading-relaxed select-text ${
                        isMe
                          ? 'bg-[#1A1A1A] text-white rounded-none font-mono font-medium'
                          : isAi
                            ? 'bg-[#F2F0ED] text-[#1A1A1A] border-l-2 border-l-[#1A1A1A] border-[#E5E2DE] font-serif italic'
                            : 'bg-white border border-[#E5E2DE] text-[#1A1A1A]'
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Send input socket */}
        <form onSubmit={handleSendChat} className="p-4 border-t border-[#E5E2DE] bg-[#F2F0ED] shrink-0 flex items-center space-x-2">
          <input
            type="text"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            placeholder={`Send sync message to ${selectedTeam?.name}...`}
            className="flex-1 bg-white text-xs text-[#1A1A1A] border border-[#E5E2DE] placeholder-[#8C8984] rounded-none px-4 py-3 focus:outline-none focus:border-[#1A1A1A] transition-all font-sans"
          />
          <button
            id="team-chat-submit"
            type="submit"
            disabled={!chatInput.trim()}
            className="p-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 disabled:opacity-50 text-white rounded-none cursor-pointer transition-all flex items-center justify-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Add Team Modal */}
      {showAddTeam && (
        <div className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] rounded-none w-full max-w-md border border-[#E5E2DE] overflow-hidden shadow-2xl animate-fade-in">
            <div className="px-6 py-4 border-b border-[#E5E2DE] bg-[#F2F0ED] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Add New Team Division</h3>
              <button onClick={() => setShowAddTeam(false)} className="p-1 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateTeam} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Team Division Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sales Division"
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Scope & Description</label>
                <textarea
                  required
                  value={teamDesc}
                  onChange={e => setTeamDesc(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] h-24"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Assigned Team Lead</label>
                <select
                  value={teamLeadId}
                  onChange={e => setTeamLeadId(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] cursor-pointer"
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.designation})</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] uppercase tracking-widest font-bold cursor-pointer rounded-none transition-all"
              >
                Assemble Team
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
