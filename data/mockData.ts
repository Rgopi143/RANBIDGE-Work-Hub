/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  ChatMessage
} from '../types';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'EMP-001',
    name: 'Kakara Lavanya',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    gender: 'Female',
    dob: '1998-05-15',
    mobile: '8341133750',
    email: 'lavanyakakara8@gmail.com',
    address: 'HSR Layout, Sector 2, Bengaluru, Karnataka 560102',
    department: 'Human Resources',
    designation: 'Social Media Handler',
    skills: ['Social Media Management', 'Content Strategy', 'Brand Marketing', 'Community Engagement'],
    experience: '1 Year',
    joiningDate: '2026-09-04',
    reportingManagerId: 'EMP-003',
    reportingManagerName: 'Amit Patel',
    salary: 120000,
    shiftTiming: '09:30 AM - 06:30 PM',
    employmentType: 'Full-Time',
    status: 'Active',
    documents: {
      aadhaar: 'Uploaded_Aadhaar.pdf',
      pan: 'Uploaded_PAN.pdf',
      resume: 'Uploaded_CV.pdf',
      offerLetter: 'Uploaded_Offer.pdf',
      nda: 'Signed_NDA_Digital.pdf'
    }
  }
];

export const INITIAL_TEAMS: Team[] = [];

export const INITIAL_PROJECTS: Project[] = [];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'TSK-206',
    name: 'Social Media Marketing & Brand Strategy',
    description: 'Create campaign schedules, publish promotional graphics, and run brand awareness campaigns for corporate channels.',
    assignedEmployeeId: 'EMP-001',
    assignedEmployeeName: 'Kakara Lavanya',
    projectId: '',
    projectName: 'Social Media Operations',
    deadline: '2026-09-15',
    priority: 'High',
    status: 'To Do',
    attachments: [],
    comments: []
  },
  {
    id: 'TSK-207',
    name: 'HR Onboarding & Document Verification',
    description: 'Verify employee credentials, Aadhaar, PAN, and NDA digital contracts upon login.',
    assignedEmployeeId: 'EMP-001',
    assignedEmployeeName: 'Kakara Lavanya',
    projectId: '',
    projectName: 'HR Portal Sync',
    deadline: '2026-09-10',
    priority: 'Medium',
    status: 'Working',
    attachments: ['Signed_NDA_Digital.pdf'],
    comments: [
      { id: 'C4', author: 'System Admin', comment: 'All 5 employee documents verified successfully.', timestamp: '2026-09-04 04:00 PM' }
    ]
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'ATT-301',
    employeeId: 'EMP-001',
    employeeName: 'Kakara Lavanya',
    date: '2026-09-04',
    checkInTime: '09:30 AM',
    checkOutTime: '06:30 PM',
    status: 'Present',
    gps: { lat: 12.9121, lng: 77.6446, address: 'HSR Layout Sector 2, Bengaluru' },
    faceRecognitionMatched: true,
    overtimeMinutes: 0
  }
];

export const INITIAL_LEAVES: LeaveRequest[] = [];

export const INITIAL_PAYROLL: PayrollItem[] = [
  {
    id: 'PAY-501',
    employeeId: 'EMP-001',
    employeeName: 'Kakara Lavanya',
    month: 'August 2026',
    baseSalary: 120000,
    allowances: { hra: 36000, conveyance: 5000, medical: 3000, bonus: 5000 },
    deductions: { pf: 9600, tax: 10000, professionalTax: 200 },
    netSalary: 144200,
    status: 'Paid'
  }
];

export const INITIAL_KPIS: PerformanceKPI[] = [
  {
    id: 'KPI-601',
    employeeId: 'EMP-001',
    employeeName: 'Kakara Lavanya',
    kpiScore: 95,
    taskCompletionRate: 98,
    attendanceScore: 100,
    teamContribution: 96,
    evaluationDate: '2026-09-01',
    feedback: 'Excellent work on social media campaign setup and HR document submission.'
  }
];

export const INITIAL_DOCUMENTS: CompanyDocument[] = [];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN-801',
    title: 'Welcome Kakara Lavanya to Human Resources',
    content: 'We are excited to announce Kakara Lavanya has joined RANBIDGE Solutions as Social Media Handler!',
    type: 'Success',
    pinned: true,
    creator: 'System Admin',
    createdAt: '2026-09-04'
  }
];

export const INITIAL_CHAT: ChatMessage[] = [];
