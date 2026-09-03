/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Sparkles, Send, Minimize2 } from 'lucide-react';

export default function AICoPilot() {
  const { getAIAssistantResponse } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiChatLog, setAiChatLog] = useState<{ query: string; reply: string; timestamp: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number; moved: boolean }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    moved: false
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [aiChatLog, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dragStartRef.current.moved) return;
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: rect.left,
      initialY: rect.top,
      moved: false
    };

    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - dragStartRef.current.startX;
      const dy = moveEvent.clientY - dragStartRef.current.startY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        dragStartRef.current.moved = true;
      }

      let newX = dragStartRef.current.initialX + dx;
      let newY = dragStartRef.current.initialY + dy;

      const elemWidth = containerRef.current?.offsetWidth || 56;
      const elemHeight = containerRef.current?.offsetHeight || 56;

      newX = Math.max(10, Math.min(newX, window.innerWidth - elemWidth - 10));
      newY = Math.max(10, Math.min(newY, window.innerHeight - elemHeight - 10));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1 || !containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();

    dragStartRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      initialX: rect.left,
      initialY: rect.top,
      moved: false
    };

    setIsDragging(true);

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches.length !== 1) return;
      const t = moveEvent.touches[0];
      const dx = t.clientX - dragStartRef.current.startX;
      const dy = t.clientY - dragStartRef.current.startY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        dragStartRef.current.moved = true;
      }

      let newX = dragStartRef.current.initialX + dx;
      let newY = dragStartRef.current.initialY + dy;

      const elemWidth = containerRef.current?.offsetWidth || 56;
      const elemHeight = containerRef.current?.offsetHeight || 56;

      newX = Math.max(10, Math.min(newX, window.innerWidth - elemWidth - 10));
      newY = Math.max(10, Math.min(newY, window.innerHeight - elemHeight - 10));

      setPosition({ x: newX, y: newY });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleButtonClick = () => {
    if (!dragStartRef.current.moved) {
      setIsOpen(!isOpen);
    }
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
    setAiChatLog(prev =>
      prev.map((log, idx) => {
        if (idx === prev.length - 1) {
          return { ...log, reply: answer };
        }
        return log;
      })
    );
    setIsAiLoading(false);
  };

  const containerStyle: React.CSSProperties = position
    ? { left: `${position.x}px`, top: `${position.y}px` }
    : { right: '24px', bottom: '24px' };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      className={`fixed z-50 select-none transition-shadow ${isDragging ? 'cursor-grabbing opacity-90 scale-102' : ''}`}
    >
      {!isOpen ? (
        /* Floating Circle Button - Draggable Anywhere */
        <button
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={handleButtonClick}
          className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-indigo-500/35 hover:scale-110 active:scale-95 transition-all duration-200 cursor-grab border border-white/20 relative group"
          title="Drag anywhere or click to open RAN Co-Pilot AI"
        >
          <Sparkles className="h-6 w-6 text-white animate-pulse pointer-events-none" />
          <span className="absolute top-2 right-2 h-3 w-3 rounded-full bg-emerald-400 border-2 border-indigo-700 pointer-events-none" />
        </button>
      ) : (
        /* Floating Window Box - Draggable Header */
        <div className="w-96 h-[520px] bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300">
          
          {/* Draggable Header */}
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="p-4 border-b border-[var(--theme-border)] bg-[var(--theme-sidebar)] flex items-center justify-between cursor-grab active:cursor-grabbing"
            title="Drag header to move window"
          >
            <div className="flex items-center space-x-2.5 pointer-events-none">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold tracking-wider font-mono uppercase text-[var(--theme-text)]">RAN CO-PILOT AI</h3>
                <span className="text-[9px] text-emerald-500 font-bold font-mono uppercase flex items-center gap-1 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  ONLINE
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="p-1.5 text-[var(--theme-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-hover)] rounded-xl transition-all cursor-pointer"
              title="Minimize Co-Pilot"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 no-scrollbar bg-[var(--theme-bg)]/30">
            {aiChatLog.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-4 text-center space-y-3">
                <div className="p-4 rounded-3xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 shadow-inner">
                  <Sparkles className="h-8 w-8" />
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
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl rounded-tr-xs p-2.5 max-w-[85%] text-xs font-medium shadow-xs">
                      {log.query}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-2xl rounded-tl-xs p-3 max-w-[90%] text-xs leading-relaxed shadow-xs">
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
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleAISubmit} className="p-3 border-t border-[var(--theme-border)] bg-[var(--theme-card)] flex items-center space-x-2">
            <input
              type="text"
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              placeholder="Ask Co-Pilot Assistant..."
              className="flex-1 px-3.5 py-2 text-xs bg-[var(--theme-sidebar)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text)] focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isAiLoading || !aiInput.trim()}
              className="p-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-md transition-all shrink-0"
              title="Send Message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
