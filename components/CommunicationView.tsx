/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  Megaphone,
  Video,
  Mic,
  VideoOff,
  PhoneOff,
  UserCheck,
  Sparkles,
  Award,
  Plus,
  X,
  Pin
} from 'lucide-react';

export default function CommunicationView() {
  const {
    currentRole,
    currentUser,
    announcements,
    addAnnouncement
  } = useWorkspace();

  const [showAddAnnounce, setShowAddAnnounce] = useState(false);
  const [isVideoLive, setIsVideoLive] = useState(false);

  // New announcement form state
  const [announceTitle, setAnnounceTitle] = useState('');
  const [announceContent, setAnnounceContent] = useState('');

  // Audio mute toggles
  const [isMuted, setIsMuted] = useState(false);

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      title: announceTitle,
      content: announceContent,
      type: 'Info',
      pinned: false
    });
    setAnnounceTitle('');
    setAnnounceContent('');
    setShowAddAnnounce(false);
  };

  const hasAnnouncePermission = ['Super Admin', 'HR', 'Manager'].includes(currentRole);

  const activeTownhallSpeakers = [
    { name: 'Rajesh Kumar', role: 'Principal AI Architect', status: 'Speaking', pulse: true, face: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { name: 'Priya Sharma', role: 'Staff Front-End Specialist', status: 'Muted', pulse: false, face: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { name: 'Amit Patel', role: 'Operations Vice-President', status: 'Active Listener', pulse: false, face: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1A1A1A]">

      {/* Announcements board column */}
      <div className="lg:col-span-1 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-2">
          <div>
            <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Operational Bulletins</h3>
            <p className="text-[10px] text-[#8C8984] font-mono uppercase">Published corporate announcements</p>
          </div>
          {hasAnnouncePermission && (
            <button
              onClick={() => setShowAddAnnounce(true)}
              className="p-1.5 text-[#1A1A1A] hover:bg-[#F2F0ED] border border-[#E5E2DE] rounded-none cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Announcements list */}
        <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
          {announcements.map(ann => (
            <div
              id={`announce-${ann.id}`}
              key={ann.id}
              className={`p-3.5 rounded-none border transition-all space-y-2 relative ${
                ann.pinned ? 'bg-[#F2F0ED] border-[#1A1A1A] ring-1 ring-[#1A1A1A]/20' : 'bg-white border-[#E5E2DE]'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono font-bold text-[#8C8984] uppercase whitespace-nowrap">{ann.createdAt}</span>
                <span className="flex items-center space-x-1.5">
                  {ann.pinned && <Pin className="h-3 w-3 text-[#1A1A1A] shrink-0 fill-[#1A1A1A]" />}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#1A1A1A] pr-4 leading-snug">{ann.title}</h4>
              <p className="text-[10.5px] text-[#1A1A1A] leading-relaxed font-serif italic whitespace-pre-wrap select-text">{ann.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video sync / Townhall web-conferencing simulator */}
      <div className="lg:col-span-2 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none overflow-hidden flex flex-col h-[540px] justify-between">
        
        {/* Header */}
        <div className="p-4 bg-[#F2F0ED] border-b border-[#E5E2DE] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#1A1A1A] text-white rounded-none">
              <Video className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1A1A1A] font-sans uppercase tracking-wider leading-none">RAN Workspace Townhall Suite</h3>
              <p className="text-[9.5px] font-mono text-[#8C8984] uppercase tracking-wider font-bold">Web-conference mesh grid</p>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-white text-[#1A1A1A] border border-[#E5E2DE] rounded-none text-[9px] font-mono font-bold uppercase tracking-wider">
            Status: Ready
          </span>
        </div>

        {/* Video stream simulator workspace */}
        <div className="flex-1 p-6 flex items-center justify-center bg-white relative overflow-hidden border-b border-[#E5E2DE]">
          <div className="absolute inset-0 bg-[#F2F0ED]/20 pointer-events-none" />

          {!isVideoLive ? (
            <div className="text-center p-6 space-y-4 max-w-sm">
              <div className="p-4 mx-auto w-16 h-16 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none flex items-center justify-center text-[#1A1A1A] relative">
                <Video className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#1A1A1A] uppercase font-sans tracking-wide">Start Simulated Townhall Sync</p>
                <p className="text-[10.5px] text-[#8C8984] leading-relaxed max-w-xs mx-auto font-serif italic">
                  Launch the interactive web conference viewport. Synced live with presenters Rajesh, Priya, and Amit.
                </p>
              </div>
              <button
                onClick={() => setIsVideoLive(true)}
                className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#1A1A1A]/95 text-white rounded-none text-[10px] font-mono font-bold tracking-widest cursor-pointer transition-all uppercase"
              >
                Assemble Conference Grid
              </button>
            </div>
          ) : (
            /* Active Meetings Grid mesh */
            <div className="w-full h-full grid grid-cols-2 gap-4 animate-fade-in select-none">
              
              {/* Leader Grid speaker 1 */}
              {activeTownhallSpeakers.map((spk, idx) => (
                <div key={idx} className="bg-[#F9F7F4] border border-[#E5E2DE] rounded-none overflow-hidden relative group flex flex-col justify-end p-3">
                  <div className="absolute top-2 right-2 flex items-center space-x-1.5 z-10">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-none text-[8px] font-bold font-mono tracking-wide ${
                      spk.pulse ? 'bg-[#1A1A1A] text-white' : 'bg-[#E5E2DE] text-[#8C8984]'
                    }`}>
                      {spk.status}
                    </span>
                  </div>

                  {/* Circle Portrait centered */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col space-y-2">
                    <img
                      src={spk.face}
                      referrerPolicy="no-referrer"
                      className={`h-16 w-16 rounded-none object-cover border ${
                      spk.pulse ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#E5E2DE]'
                    }`}
                      alt={spk.name}
                    />
                    {spk.pulse && (
                      <div className="flex items-center space-x-0.5 py-0.5 h-4 justify-center">
                        <span className="h-3 w-0.5 bg-[#1A1A1A] rounded animate-voice-bar" style={{ animationDelay: '0ms' }} />
                        <span className="h-1.5 w-0.5 bg-[#1A1A1A] rounded animate-voice-bar" style={{ animationDelay: '150ms' }} />
                        <span className="h-2.5 w-0.5 bg-[#1A1A1A] rounded animate-voice-bar" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>

                  {/* Footer overlay label */}
                  <div className="bg-white/95 backdrop-blur-sm p-2 rounded-none border border-[#E5E2DE] text-left relative z-10 space-y-0.5">
                    <h5 className="text-[10.5px] font-bold text-[#1A1A1A] leading-none uppercase font-mono">{spk.name}</h5>
                    <p className="text-[8.5px] text-[#8C8984] font-bold uppercase font-mono">{spk.role}</p>
                  </div>
                </div>
              ))}

              {/* Your Webcam Viewport stream */}
              <div className="bg-[#F9F7F4] border border-[#E5E2DE] rounded-none overflow-hidden relative flex flex-col justify-end p-3">
                <div className="absolute top-2 right-2 z-10">
                  <span className="bg-[#1A1A1A] text-white font-bold font-mono tracking-wide px-1.5 py-0.5 rounded-none text-[8px]">
                    SELF STREAM ACTIVE
                  </span>
                </div>

                {/* Simulated Webcam content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-[#F2F0ED]/20">
                  <div className="h-14 w-14 rounded-none bg-white border border-[#E5E2DE] text-[#1A1A1A] flex items-center justify-center relative shadow-sm">
                    <span className="h-8 w-8 text-[#1A1A1A] uppercase font-mono font-bold text-sm flex items-center justify-center">
                      {currentUser?.name.substring(0,2) || 'LE'}
                    </span>
                  </div>
                  {!isMuted && (
                    <div className="flex items-center space-x-0.5 py-0.5 h-4 justify-center">
                      <span className="h-2 w-0.5 bg-[#1A1A1A] rounded animate-voice-bar" style={{ animationDelay: '50ms' }} />
                      <span className="h-3 w-0.5 bg-[#1A1A1A] rounded animate-voice-bar" style={{ animationDelay: '200ms' }} />
                      <span className="h-1.5 w-0.5 bg-[#1A1A1A] rounded animate-voice-bar" style={{ animationDelay: '400ms' }} />
                    </div>
                  )}
                </div>

                <div className="bg-white/95 backdrop-blur-sm p-2 rounded-none border border-[#E5E2DE] text-left relative z-10 space-y-0.5">
                  <h5 className="text-[10.5px] font-bold text-[#1A1A1A] leading-none uppercase font-mono">{currentUser?.name}</h5>
                  <p className="text-[8.5px] text-[#8C8984] font-bold uppercase font-mono">{currentRole} Cleared</p>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Video controllers footer */}
        {isVideoLive && (
          <div className="bg-[#F2F0ED] p-3.5 flex items-center justify-center space-x-3 shrink-0">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2.5 rounded-none border cursor-pointer transition-all flex items-center justify-center ${
                isMuted ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white hover:bg-[#F9F7F4] border-[#E5E2DE] text-[#1A1A1A]'
              }`}
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsVideoLive(false)}
              className="p-2.5 rounded-none bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 border border-[#1A1A1A] text-white cursor-pointer transition-all flex items-center justify-center"
            >
              <PhoneOff className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Add Announcement Modal */}
      {showAddAnnounce && (
        <div className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] rounded-none w-full max-w-sm border border-[#E5E2DE] overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-[#E5E2DE] bg-[#F2F0ED] flex items-center justify-between animate-fade-in">
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Publish Announcement</h3>
              <button onClick={() => setShowAddAnnounce(false)} className="p-1 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateAnnouncement} className="p-6 space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Bulletin Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Townhall timing rescheduled..."
                  value={announceTitle}
                  onChange={e => setAnnounceTitle(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Bulletin Content Body</label>
                <textarea
                  required
                  placeholder="Draft details..."
                  value={announceContent}
                  onChange={e => setAnnounceContent(e.target.value)}
                  className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] h-24"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] uppercase tracking-widest font-bold cursor-pointer rounded-none transition-all"
              >
                Broadcast Announcement
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
