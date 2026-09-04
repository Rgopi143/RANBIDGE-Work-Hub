/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role =
  | 'Super Admin'
  | 'CEO'
  | 'CFO'
  | 'CTO'
  | 'COO'
  | 'CMO'
  | 'HR'
  | 'Manager'
  | 'Project Manager'
  | 'Team Lead'
  | 'Social Media Manager'
  | 'Guide'
  | 'Mentor'
  | 'Employee'
  | 'Intern';

export interface Employee {
  id: string; // e.g. "EMP-001"
  name: string;
  photo: string; // URL / Avatar
  gender: string;
  dob: string;
  mobile: string;
  email: string;
  address: string;
  department: string;
  designation: string;
  skills: string[];
  experience: string;
  joiningDate: string;
  reportingManagerId: string;
  reportingManagerName: string;
  salary: number;
  shiftTiming: string; // e.g., "09:00 AM - 06:00 PM"
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Intern';
  status: 'Active' | 'Inactive';
  faceIdEnrollment?: string; // Base64 data URI of captured face snapshot for authentication
  password?: string;
  documents?: {
    aadhaar?: string;
    pan?: string;
    resume?: string;
    offerLetter?: string;
    nda?: string;
  };
}

export interface Team {
  id: string; // e.g., "TEAM-001"
  name: string;
  description: string;
  leaderId: string;
  leaderName: string;
  memberIds: string[];
  productivityScore: number; // 0-100
  mentorId?: string;
  mentorName?: string;
  guideId?: string;
  guideName?: string;
  internIds?: string[];
  internNames?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  clientName: string;
  startDate: string;
  endDate: string;
  teamAssignedId: string;
  teamAssignedName: string;
  budget: number;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed' | 'On Hold';
  mentorId?: string;
  mentorName?: string;
  guideId?: string;
  guideName?: string;
  internIds?: string[];
  internNames?: string[];
  files: {
    name: string;
    size: string;
    uploadedAt: string;
  }[];
}

export interface TaskComment {
  id: string;
  author: string;
  comment: string;
  timestamp: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  assignedEmployeeId: string;
  assignedEmployeeName: string;
  projectId: string;
  projectName: string;
  deadline: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To Do' | 'Working' | 'Completed' | 'Delayed';
  attachments: string[];
  comments: TaskComment[];
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // YYYY-MM-DD
  checkInTime: string | null; // HH:MM AM/PM
  checkOutTime: string | null;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  gps: {
    lat: number;
    lng: number;
    address: string;
  } | null;
  faceRecognitionMatched: boolean;
  overtimeMinutes: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Casual Leave' | 'Sick Leave' | 'Paid Leave' | 'Emergency Leave';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy: string; // Manager Name
}

export interface PayrollItem {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string; // Month name e.g., "May 2026"
  baseSalary: number;
  allowances: {
    hra: number;
    conveyance: number;
    medical: number;
    bonus: number;
  };
  deductions: {
    pf: number;
    tax: number;
    professionalTax: number;
  };
  netSalary: number;
  status: 'Paid' | 'Processing' | 'On Hold';
}

export interface PerformanceKPI {
  id: string;
  employeeId: string;
  employeeName: string;
  kpiScore: number; // 1-100
  taskCompletionRate: number; // percentage
  attendanceScore: number; // percentage
  teamContribution: number; // 1-100
  evaluationDate: string;
  feedback: string;
}

export interface CompanyDocument {
  id: string;
  name: string;
  category: 'Employee Records' | 'Project files' | 'Agreements' | 'Reports' | 'Company Announcement' | 'SOW Agreements' | 'HR Handbooks' | 'EPF Schemes' | 'Product Blueprints' | string;
  path: string;
  size: string;
  uploader: string;
  uploadedAt: string;
  version: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'Info' | 'Warning' | 'Success' | 'Urgent';
  pinned: boolean;
  creator: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  teamId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  message: string;
  timestamp: string;
}
