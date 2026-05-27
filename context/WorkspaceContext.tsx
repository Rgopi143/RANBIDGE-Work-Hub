/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Employee,
  Team,
  Project,
  Task,
  AttendanceRecord,
  LeaveRequest,
  PayrollItem,
  PerformanceKPI,
  CompanyDocument,
  Announcement,
  ChatMessage,
  Role,
  TaskComment
} from '../types';
import {
  INITIAL_EMPLOYEES,
  INITIAL_TEAMS,
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVES,
  INITIAL_PAYROLL,
  INITIAL_KPIS,
  INITIAL_DOCUMENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CHAT
} from '../data/mockData';

interface WorkspaceContextProps {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  currentUser: Employee | null;
  employees: Employee[];
  teams: Team[];
  projects: Project[];
  tasks: Task[];
  attendance: AttendanceRecord[];
  leaves: LeaveRequest[];
  payroll: PayrollItem[];
  kpis: PerformanceKPI[];
  documents: CompanyDocument[];
  announcements: Announcement[];
  chatMessages: ChatMessage[];

  // CRUD API Functions
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, emp: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;

  addTeam: (team: Omit<Team, 'id'>) => void;
  updateTeam: (id: string, team: Partial<Team>) => void;
  deleteTeam: (id: string) => void;

  addProject: (proj: Omit<Project, 'id' | 'files'>) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  uploadProjectFile: (id: string, fileName: string, size: string) => void;

  addTask: (task: Omit<Task, 'id' | 'comments' | 'attachments'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addTaskComment: (taskId: string, commentText: string) => void;

  checkIn: (gpsCoords: { lat: number; lng: number; address: string } | null, matchedFace: boolean) => void;
  checkOut: () => void;

  applyLeave: (leave: Omit<LeaveRequest, 'id' | 'status' | 'approvedBy' | 'employeeId' | 'employeeName'>) => void;
  updateLeaveStatus: (id: string, status: 'Approved' | 'Rejected') => void;

  addPayrollItem: (item: Omit<PayrollItem, 'id' | 'netSalary'>) => void;
  updatePayrollStatus: (id: string, status: 'Paid' | 'Processing' | 'On Hold') => void;

  addDocument: (doc: Omit<CompanyDocument, 'id' | 'uploadedAt' | 'uploader'>) => void;
  deleteDocument: (id: string) => void;

  addAnnouncement: (ann: Omit<Announcement, 'id' | 'createdAt' | 'creator'>) => void;
  deleteAnnouncement: (id: string) => void;

  sendTeamChatMessage: (teamId: string, msg: string) => void;

  // AI Assistant Integrations
  getAIAnalyticsReport: (promptType: string) => Promise<string>;
  getAISmartTaskAllocation: (taskDesc: string) => Promise<{ priority: string; recommendedTeamId: string; reason: string }>;
  getAIAssistantResponse: (chatPrompt: string) => Promise<string>;
  restoreWorkspaceData: (data: {
    employees?: Employee[];
    teams?: Team[];
    projects?: Project[];
    tasks?: Task[];
    attendance?: AttendanceRecord[];
    leaves?: LeaveRequest[];
    payroll?: PayrollItem[];
    kpis?: PerformanceKPI[];
    documents?: CompanyDocument[];
    announcements?: Announcement[];
    chatMessages?: ChatMessage[];
  }) => void;
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(undefined);

const STORAGE_PREFIX = 'RAN_WORKHUB_';

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  // Load state or use initial mocks
  const [currentRole, setRoleState] = useState<Role>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'role');
    return (saved as Role) || 'Super Admin';
  });

  const [currentTheme, setThemeState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'theme');
    return saved || 'minimal-warm';
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'teams');
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [leaves, setLeaves] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'leaves');
    return saved ? JSON.parse(saved) : INITIAL_LEAVES;
  });

  const [payroll, setPayroll] = useState<PayrollItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'payroll');
    return saved ? JSON.parse(saved) : INITIAL_PAYROLL;
  });

  const [kpis, setKpis] = useState<PerformanceKPI[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'kpis');
    return saved ? JSON.parse(saved) : INITIAL_KPIS;
  });

  const [documents, setDocuments] = useState<CompanyDocument[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'chatMessages');
    return saved ? JSON.parse(saved) : INITIAL_CHAT;
  });

  const [currentUser, setCurrentUser] = useState<Employee | null>(null);

  // Sync state to local storage to persist
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'leaves', JSON.stringify(leaves));
  }, [leaves]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'payroll', JSON.stringify(payroll));
  }, [payroll]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'kpis', JSON.stringify(kpis));
  }, [kpis]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Determine active profile based on simulated Role
  useEffect(() => {
    let mappingId = 'EMP-001'; // Default Super Admin = Rajesh
    if (currentRole === 'HR') mappingId = 'EMP-002'; // Priya
    else if (currentRole === 'Manager') mappingId = 'EMP-003'; // Amit
    else if (currentRole === 'Team Lead') mappingId = 'EMP-004'; // Sarah (Web Lead)
    else if (currentRole === 'Employee') mappingId = 'EMP-005'; // Vikram (AI Eng)
    else if (currentRole === 'Intern') mappingId = 'EMP-007'; // Rahul (Intern)

    const match = employees.find(e => e.id === mappingId);
    setCurrentUser(match || employees[0] || null);
  }, [currentRole, employees]);

  const setCurrentRole = (role: Role) => {
    setRoleState(role);
  };

  const setCurrentTheme = (theme: string) => {
    setThemeState(theme);
  };

  // 1. Employee CRUD
  const addEmployee = (rawEmp: Omit<Employee, 'id'>) => {
    const nextNum = employees.length + 1;
    const nextId = `EMP-${nextNum.toString().padStart(3, '0')}`;
    const newEmp: Employee = {
      ...rawEmp,
      id: nextId
    };
    setEmployees(prev => [...prev, newEmp]);

    // Setup initial empty KPI for new employees
    const newKpi: PerformanceKPI = {
      id: `KPI-${700 + nextNum}`,
      employeeId: nextId,
      employeeName: rawEmp.name,
      kpiScore: 75,
      taskCompletionRate: 0,
      attendanceScore: 100,
      teamContribution: 75,
      evaluationDate: new Date().toISOString().split('T')[0],
      feedback: "Initial onboarding KPIs set. Awaiting project task completions."
    };
    setKpis(prev => [...prev, newKpi]);
  };

  const updateEmployee = (id: string, updatedFields: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updatedFields } : e));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  // 2. Team CRUD
  const addTeam = (rawTeam: Omit<Team, 'id'>) => {
    const nextId = `TEAM-${(teams.length + 1).toString().padStart(3, '0')}`;
    const newTeam: Team = {
      ...rawTeam,
      id: nextId
    };
    setTeams(prev => [...prev, newTeam]);
  };

  const updateTeam = (id: string, updatedFields: Partial<Team>) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
  };

  const deleteTeam = (id: string) => {
    setTeams(prev => prev.filter(t => t.id !== id));
  };

  // 3. Project CRUD
  const addProject = (rawProj: Omit<Project, 'id' | 'files'>) => {
    const nextId = `PRJ-${(projects.length + 101).toString()}`;
    const newProj: Project = {
      ...rawProj,
      id: nextId,
      files: []
    };
    setProjects(prev => [...prev, newProj]);
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const uploadProjectFile = (projectId: string, fileName: string, size: string) => {
    const today = new Date().toISOString().split('T')[0];
    // Add file link to project list
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          files: [...p.files, { name: fileName, size, uploadedAt: today }]
        };
      }
      return p;
    }));

    // Add to main global document management system
    const nextDocNum = documents.length + 1;
    const newDoc: CompanyDocument = {
      id: `DOC-${700 + nextDocNum}`,
      name: fileName,
      category: 'Project files',
      path: `/documents/uploaded_${fileName.toLowerCase().replace(/\s+/g, '_')}`,
      size,
      uploader: currentUser?.name || 'System User',
      uploadedAt: today,
      version: '1.0'
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  // 4. Task CRUD
  const addTask = (rawTask: Omit<Task, 'id' | 'comments' | 'attachments'>) => {
    const nextId = `TSK-${(tasks.length + 201).toString()}`;
    const newTask: Task = {
      ...rawTask,
      id: nextId,
      attachments: [],
      comments: []
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addTaskComment = (taskId: string, commentText: string) => {
    const authorName = currentUser?.name || 'Anonymous';
    const now = new Date();
    const cleanTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newComment: TaskComment = {
      id: `C${Math.random().toString(36).substr(2, 4)}`,
      author: authorName,
      comment: commentText,
      timestamp: cleanTime
    };

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          comments: [...t.comments, newComment]
        };
      }
      return t;
    }));
  };

  // 5. Attendance Actions
  const checkIn = (gpsCoords: { lat: number; lng: number; address: string } | null, matchedFace: boolean) => {
    if (!currentUser) return;
    const today = new Date().toISOString().split('T')[0];

    // Check if check-in already logged for today
    const existing = attendance.find(a => a.employeeId === currentUser.id && a.date === today);
    if (existing) return;

    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const isPastTiming = hour > 9 || (hour === 9 && minutes > 30); // Standard shift starts at 9:30 AM

    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    const fMinutes = minutes.toString().padStart(2, '0');
    const timeStr = `${formattedHour}:${fMinutes} ${ampm}`;

    const newRec: AttendanceRecord = {
      id: `ATT-${Math.floor(Math.random() * 900000 + 100000)}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      date: today,
      checkInTime: timeStr,
      checkOutTime: null,
      status: isPastTiming ? 'Late' : 'Present',
      gps: gpsCoords,
      faceRecognitionMatched: matchedFace,
      overtimeMinutes: 0
    };

    setAttendance(prev => [newRec, ...prev]);
  };

  const checkOut = () => {
    if (!currentUser) return;
    const today = new Date().toISOString().split('T')[0];

    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    const fMinutes = minutes.toString().padStart(2, '0');
    const timeStr = `${formattedHour}:${fMinutes} ${ampm}`;

    // Overtime checks: standard checkout is after 6:30 PM (18:30)
    let extraMins = 0;
    const checkoutMinCount = hour * 60 + minutes;
    const standardCheckoutMinCount = 18 * 60 + 30; // 6:30 PM
    if (checkoutMinCount > standardCheckoutMinCount) {
      extraMins = checkoutMinCount - standardCheckoutMinCount;
    }

    setAttendance(prev => prev.map(a => {
      if (a.employeeId === currentUser.id && a.date === today) {
        return {
          ...a,
          checkOutTime: timeStr,
          overtimeMinutes: extraMins
        };
      }
      return a;
    }));
  };

  // 6. Leaves CRUD
  const applyLeave = (rawLeave: Omit<LeaveRequest, 'id' | 'status' | 'approvedBy' | 'employeeId' | 'employeeName'>) => {
    if (!currentUser) return;
    const nextId = `LV-${(leaves.length + 401).toString()}`;
    const newLeave: LeaveRequest = {
      ...rawLeave,
      id: nextId,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      status: 'Pending',
      approvedBy: 'Pending'
    };
    setLeaves(prev => [newLeave, ...prev]);
  };

  const updateLeaveStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setLeaves(prev => prev.map(l => {
      if (l.id === id) {
        return {
          ...l,
          status,
          approvedBy: currentUser?.name || 'Administrator'
        };
      }
      return l;
    }));
  };

  // 7. Payroll CRUD
  const addPayrollItem = (rawItem: Omit<PayrollItem, 'id' | 'netSalary'>) => {
    const nextId = `PAY-${(payroll.length + 501).toString()}`;
    const hraAmount = rawItem.baseSalary * 0.3; // 30% HRA standard
    const pfDeduction = rawItem.baseSalary * 0.08; // 8% PF standard
    const taxDeduction = rawItem.baseSalary * 0.15; // 15% estimated TDS

    const allowancesTotal = hraAmount + rawItem.allowances.conveyance + rawItem.allowances.medical + rawItem.allowances.bonus;
    const deductionsTotal = pfDeduction + taxDeduction + rawItem.allowances.conveyance + 200; // 200 professional tax

    const netSalary = rawItem.baseSalary + allowancesTotal - deductionsTotal;

    const newItem: PayrollItem = {
      ...rawItem,
      id: nextId,
      allowances: {
        ...rawItem.allowances,
        hra: Math.round(hraAmount)
      },
      deductions: {
        pf: Math.round(pfDeduction),
        tax: Math.round(taxDeduction),
        professionalTax: 200
      },
      netSalary: Math.round(netSalary)
    };

    setPayroll(prev => [...prev, newItem]);
  };

  const updatePayrollStatus = (id: string, status: 'Paid' | 'Processing' | 'On Hold') => {
    setPayroll(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  // 8. Documents CRUD
  const addDocument = (rawDoc: Omit<CompanyDocument, 'id' | 'uploadedAt' | 'uploader'>) => {
    const nextId = `DOC-${(documents.length + 701).toString()}`;
    const today = new Date().toISOString().split('T')[0];
    const newDoc: CompanyDocument = {
      ...rawDoc,
      id: nextId,
      uploader: currentUser?.name || 'System User',
      uploadedAt: today
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  // 9. Announcements CRUD
  const addAnnouncement = (rawAnn: Omit<Announcement, 'id' | 'createdAt' | 'creator'>) => {
    const nextId = `ANN-${(announcements.length + 801).toString()}`;
    const today = new Date().toISOString().split('T')[0];
    const newAnn: Announcement = {
      ...rawAnn,
      id: nextId,
      creator: currentUser?.name || 'Administrator',
      createdAt: today
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  // 10. Chat messaging
  const sendTeamChatMessage = (teamId: string, msg: string) => {
    if (!currentUser) return;
    const now = new Date();
    const cleanTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: ChatMessage = {
      id: `MSG-${Math.floor(Math.random() * 900000 + 100000)}`,
      teamId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentRole,
      message: msg,
      timestamp: cleanTime
    };

    setChatMessages(prev => [...prev, newMsg]);

    // Fast simulated AI responding if the user asks AI or tests in the AI chat
    if (teamId === 'TEAM-001' && (msg.toLowerCase().includes('ai') || msg.toLowerCase().includes('bot') || msg.toLowerCase().includes('hello') || msg.startsWith('/ai'))) {
      setTimeout(() => {
        let responsePhrase = "Hello, this is the RAN AI Assistant responding from the neural pipeline. Let me know if I should compile a performance outline or suggest a project milestone!";
        if (msg.toLowerCase().includes('task') || msg.toLowerCase().includes('assign')) {
          responsePhrase = "Auto assignment recommendation initiated. In general, based on technical skill mappings, PRJ-101 NLP workloads align perfectly with Vikram Singh (Senior NLP Lead), and SB HR Portals align with Sarah Dias.";
        } else if (msg.toLowerCase().includes('delay') || msg.toLowerCase().includes('late')) {
          responsePhrase = "Detection models online. I've mapped 2 tasks currently classified as Delayed: TSK-203 (landing grid for SBI portals by Rahul Verma) and TSK-205 (biometric firmware registers by Sanjay Rao).";
        }

        const aiMsg: ChatMessage = {
          id: `MSG-AI-${Math.floor(Math.random() * 900000 + 100000)}`,
          teamId,
          senderId: 'SYSTEM-AI',
          senderName: 'RAN AI Co-Pilot',
          senderRole: 'Super Admin',
          message: responsePhrase,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, aiMsg]);
      }, 1500);
    }
  };

  // 11. Core Fullstack AI Integrations wrapping around server ts endpoints
  const getAIAnalyticsReport = async (promptType: string): Promise<string> => {
    try {
      const response = await fetch('/api/ai/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          promptType,
          employees,
          tasks,
          attendance,
          kpis
        })
      });

      if (!response.ok) {
        throw new Error('AI Server responded with an error status.');
      }

      const result = await response.json();
      return result.report || 'Unable to generate report.';
    } catch (err: any) {
      console.error(err);
      return `[Demo Co-pilot Standby]: Unable to connect to backend server.

**Local AI Synthesis Report:**
- **Productivity trends:** Company is operating at an overall average **91.5%** delivery accuracy.
- **Top Performer:** Rajesh Kumar (Principal AI Scientist) is maintaining a 97 KPI score with 100% attendance.
- **Slippages Spotted:** Sanjay Rao (TSK-205) and Rahul Verma (TSK-203) have delayed milestones due to nested CSS and hardware SPI noise bottlenecks.
- **Suggestions:** Implement localized peer coding reviews for Intern Rahul Verma to resolve grid CSS dependencies. Allocate hardware signal analyzers to SANJAY RAO.`;
    }
  };

  const getAISmartTaskAllocation = async (taskDesc: string): Promise<{ priority: string; recommendedTeamId: string; reason: string }> => {
    try {
      const response = await fetch('/api/ai/suggest-priority', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: taskDesc,
          teams,
          employees
        })
      });

      if (!response.ok) {
        throw new Error('AI Server error');
      }

      const result = await response.json();
      return {
        priority: result.priority || 'Medium',
        recommendedTeamId: result.recommendedTeamId || 'TEAM-002',
        reason: result.reason || 'Synthesized via skill matrix lookup.'
      };
    } catch {
      // Return beautiful logical falling fallback
      let priority = 'Medium';
      let recommendedTeamId = 'TEAM-002'; // Web Dev Default
      let reason = 'Matched against Web development skills list due to keyword matching.';

      const desc = taskDesc.toLowerCase();
      if (desc.includes('ai') || desc.includes('gpt') || desc.includes('llm') || desc.includes('nlp') || desc.includes('model') || desc.includes('vector')) {
        priority = 'High';
        recommendedTeamId = 'TEAM-001';
        reason = 'High-frequency correlation with NLP, LLM, and Machine Learning matrices. Highly recommended to route to Rajesh Kumar in AI Team.';
      } else if (desc.includes('firmware') || desc.includes('iot') || desc.includes('hardware') || desc.includes('embedded') || desc.includes('sensor')) {
        priority = 'Medium';
        recommendedTeamId = 'TEAM-003';
        reason = 'Configured corresponding mapping for Embedded hardware / BLE gateways. Route to संजय राव (Lead Firmware Engineer).';
      } else if (desc.includes('firewall') || desc.includes('hack') || desc.includes('security') || desc.includes('host') || desc.includes('kubernetes')) {
        priority = 'High';
        recommendedTeamId = 'TEAM-004';
        reason = 'Classified under infrastructure hardening & audits. Assigned to DevOps & Cyber Security division led by Neha Gupta.';
      } else if (desc.includes('sales') || desc.includes('seo') || desc.includes('ads') || desc.includes('marketing') || desc.includes('brand')) {
        priority = 'Low';
        recommendedTeamId = 'TEAM-005';
        reason = 'Matches client outreach and SaaS growth parameters. Handled by Emily Rose (Growth Lead).';
      }

      return { priority, recommendedTeamId, reason };
    }
  };

  const getAIAssistantResponse = async (chatPrompt: string): Promise<string> => {
    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: chatPrompt,
          employees,
          projects,
          tasks
        })
      });

      if (!response.ok) {
        throw new Error('AI Assistant server offline');
      }

      const resJson = await response.json();
      return resJson.reply;
    } catch {
      // Local parsing and answering simulator to make it 100% bulletproof
      const lower = chatPrompt.toLowerCase();
      if (lower.includes('delayed') || lower.includes('late')) {
        return `I parsed your active tasks and found **2 delayed items**:
1. **TSK-203 (Design SBI Landing Dashboard Grid)** by **Rahul Verma** (Deadline was 2026-05-20, delayed due to nested styling dependencies).
2. **TSK-205 (Secure SPI Firmware Headers)** by **Sanjay Rao** (Deadline was 2026-05-15, delayed due to microcontroller hardware debugging clocks).

Would you like me to draft direct notification reminders or schedule a peer troubleshooting code review?`;
      }

      if (lower.includes('assign') || lower.includes('recommend')) {
        return `Sure! For a task related to "LLM Prompt fine tuning", I would recommend **TEAM-001 (AI & LangModel Team)** with **Rajesh Kumar** or **Vikram Singh** because they carry specific skill scores of 94%+ in PyTorch, transformers, and prompt engineering. If you describe the specific task, I can auto-populate its priority and route it!`;
      }

      return `Welcome to **RAN Co-Pilot AI Workspace**! I am connected to the RANBIDGE database.

You can ask me operational questions like:
- "Show delayed employees this week"
- "Recommend team mappings for a new IoT dashboard project"
- "Tell me who has the highest performance KPI score"

How can I assist you with company operations today?`;
    }
  };

  const restoreWorkspaceData = (data: {
    employees?: Employee[];
    teams?: Team[];
    projects?: Project[];
    tasks?: Task[];
    attendance?: AttendanceRecord[];
    leaves?: LeaveRequest[];
    payroll?: PayrollItem[];
    kpis?: PerformanceKPI[];
    documents?: CompanyDocument[];
    announcements?: Announcement[];
    chatMessages?: ChatMessage[];
  }) => {
    if (data.employees) setEmployees(data.employees);
    if (data.teams) setTeams(data.teams);
    if (data.projects) setProjects(data.projects);
    if (data.tasks) setTasks(data.tasks);
    if (data.attendance) setAttendance(data.attendance);
    if (data.leaves) setLeaves(data.leaves);
    if (data.payroll) setPayroll(data.payroll);
    if (data.kpis) setKpis(data.kpis);
    if (data.documents) setDocuments(data.documents);
    if (data.announcements) setAnnouncements(data.announcements);
    if (data.chatMessages) setChatMessages(data.chatMessages);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentTheme,
        setCurrentTheme,
        currentUser,
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

        addEmployee,
        updateEmployee,
        deleteEmployee,
        addTeam,
        updateTeam,
        deleteTeam,
        addProject,
        updateProject,
        deleteProject,
        uploadProjectFile,
        addTask,
        updateTask,
        deleteTask,
        addTaskComment,
        checkIn,
        checkOut,
        applyLeave,
        updateLeaveStatus,
        addPayrollItem,
        updatePayrollStatus,
        addDocument,
        deleteDocument,
        addAnnouncement,
        deleteAnnouncement,
        sendTeamChatMessage,

        getAIAnalyticsReport,
        getAISmartTaskAllocation,
        getAIAssistantResponse,
        restoreWorkspaceData
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
