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
    name: 'Rajesh Kumar',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    gender: 'Male',
    dob: '1985-03-20',
    mobile: '9876543210',
    email: 'admin@ranbidge.com',
    password: 'Admin@2026',
    address: 'Indiranagar, Bengaluru, Karnataka 560038',
    department: 'Executive Administration',
    designation: 'Super Admin',
    skills: ['System Architecture', 'Enterprise Security', 'Cloud Infrastructure', 'DevOps'],
    experience: '12 Years',
    joiningDate: '2020-01-10',
    reportingManagerId: 'EMP-001',
    reportingManagerName: 'Self',
    salary: 350000,
    shiftTiming: '09:00 AM - 06:00 PM',
    employmentType: 'Full-Time',
    status: 'Active',
    documents: {
      aadhaar: 'Uploaded_Aadhaar.pdf',
      pan: 'Uploaded_PAN.pdf',
      resume: 'Uploaded_CV.pdf',
      offerLetter: 'Uploaded_Offer.pdf',
      nda: 'Signed_NDA_Digital.pdf'
    }
  },
  {
    id: 'EMP-002',
    name: 'Ananya Sharma',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
    gender: 'Female',
    dob: '1982-08-14',
    mobile: '9876543211',
    email: 'ceo@ranbidge.com',
    password: 'Ceo@2026',
    address: 'Koramangala, Bengaluru, Karnataka 560034',
    department: 'Executive Leadership',
    designation: 'CEO',
    skills: ['Strategic Planning', 'Corporate Governance', 'Venture Growth', 'Executive Operations'],
    experience: '15 Years',
    joiningDate: '2019-06-01',
    reportingManagerId: 'EMP-002',
    reportingManagerName: 'Board of Directors',
    salary: 500000,
    shiftTiming: '09:00 AM - 06:00 PM',
    employmentType: 'Full-Time',
    status: 'Active',
    documents: {
      aadhaar: 'Uploaded_Aadhaar.pdf',
      pan: 'Uploaded_PAN.pdf',
      resume: 'Uploaded_CV.pdf',
      offerLetter: 'Uploaded_Offer.pdf',
      nda: 'Signed_NDA_Digital.pdf'
    }
  },
  {
    id: 'EMP-003',
    name: 'Vikramaditya Roy',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    gender: 'Male',
    dob: '1984-11-05',
    mobile: '9876543212',
    email: 'cfo@ranbidge.com',
    password: 'Cfo@2026',
    address: 'Whitefield, Bengaluru, Karnataka 560066',
    department: 'Finance & Compliance',
    designation: 'CFO',
    skills: ['Financial Analysis', 'Tax Audit', 'Corporate Treasury', 'Risk Management'],
    experience: '14 Years',
    joiningDate: '2020-03-15',
    reportingManagerId: 'EMP-002',
    reportingManagerName: 'Ananya Sharma',
    salary: 420000,
    shiftTiming: '09:00 AM - 06:00 PM',
    employmentType: 'Full-Time',
    status: 'Active',
    documents: {
      aadhaar: 'Uploaded_Aadhaar.pdf',
      pan: 'Uploaded_PAN.pdf',
      resume: 'Uploaded_CV.pdf',
      offerLetter: 'Uploaded_Offer.pdf',
      nda: 'Signed_NDA_Digital.pdf'
    }
  },
  {
    id: 'EMP-004',
    name: 'Siddharth Varma',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    gender: 'Male',
    dob: '1986-04-22',
    mobile: '9876543213',
    email: 'cto@ranbidge.com',
    password: 'Cto@2026',
    address: 'MG Road, Bengaluru, Karnataka 560001',
    department: 'Technology & R&D',
    designation: 'CTO',
    skills: ['AI Systems', 'Distributed Systems', 'Cloud Native Architecture', 'Cybersecurity'],
    experience: '13 Years',
    joiningDate: '2020-05-01',
    reportingManagerId: 'EMP-002',
    reportingManagerName: 'Ananya Sharma',
    salary: 450000,
    shiftTiming: '09:00 AM - 06:00 PM',
    employmentType: 'Full-Time',
    status: 'Active',
    documents: {
      aadhaar: 'Uploaded_Aadhaar.pdf',
      pan: 'Uploaded_PAN.pdf',
      resume: 'Uploaded_CV.pdf',
      offerLetter: 'Uploaded_Offer.pdf',
      nda: 'Signed_NDA_Digital.pdf'
    }
  },
  {
    id: 'EMP-005',
    name: 'Meera Nambiar',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300',
    gender: 'Female',
    dob: '1987-09-18',
    mobile: '9876543214',
    email: 'coo@ranbidge.com',
    password: 'Coo@2026',
    address: 'Electronic City, Bengaluru, Karnataka 560100',
    department: 'Global Operations',
    designation: 'COO',
    skills: ['Operational Excellence', 'Resource Optimization', 'Supply Chain', 'Process Engineering'],
    experience: '11 Years',
    joiningDate: '2021-02-10',
    reportingManagerId: 'EMP-002',
    reportingManagerName: 'Ananya Sharma',
    salary: 380000,
    shiftTiming: '09:00 AM - 06:00 PM',
    employmentType: 'Full-Time',
    status: 'Active',
    documents: {
      aadhaar: 'Uploaded_Aadhaar.pdf',
      pan: 'Uploaded_PAN.pdf',
      resume: 'Uploaded_CV.pdf',
      offerLetter: 'Uploaded_Offer.pdf',
      nda: 'Signed_NDA_Digital.pdf'
    }
  },
  {
    id: 'EMP-006',
    name: 'Karan Malhotra',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300',
    gender: 'Male',
    dob: '1988-12-12',
    mobile: '9876543215',
    email: 'cmo@ranbidge.com',
    password: 'Cmo@2026',
    address: 'Jayanagar, Bengaluru, Karnataka 560041',
    department: 'Growth & Marketing',
    designation: 'CMO',
    skills: ['Digital Marketing', 'Brand Positioning', 'Growth Hacking', 'Public Relations'],
    experience: '10 Years',
    joiningDate: '2021-07-20',
    reportingManagerId: 'EMP-002',
    reportingManagerName: 'Ananya Sharma',
    salary: 360000,
    shiftTiming: '09:00 AM - 06:00 PM',
    employmentType: 'Full-Time',
    status: 'Active',
    documents: {
      aadhaar: 'Uploaded_Aadhaar.pdf',
      pan: 'Uploaded_PAN.pdf',
      resume: 'Uploaded_CV.pdf',
      offerLetter: 'Uploaded_Offer.pdf',
      nda: 'Signed_NDA_Digital.pdf'
    }
  },
  {
    id: 'EMP-007',
    name: 'Pooja Hegde',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
    gender: 'Female',
    dob: '1990-06-25',
    mobile: '9876543216',
    email: 'hr@ranbidge.com',
    password: 'Hr@2026',
    address: 'BTM Layout, Bengaluru, Karnataka 560076',
    department: 'Human Resources',
    designation: 'HR',
    skills: ['Talent Acquisition', 'Payroll Compliance', 'Employee Relations', 'HR Analytics'],
    experience: '8 Years',
    joiningDate: '2022-01-05',
    reportingManagerId: 'EMP-005',
    reportingManagerName: 'Meera Nambiar',
    salary: 220000,
    shiftTiming: '09:00 AM - 06:00 PM',
    employmentType: 'Full-Time',
    status: 'Active',
    documents: {
      aadhaar: 'Uploaded_Aadhaar.pdf',
      pan: 'Uploaded_PAN.pdf',
      resume: 'Uploaded_CV.pdf',
      offerLetter: 'Uploaded_Offer.pdf',
      nda: 'Signed_NDA_Digital.pdf'
    }
  },
  {
    id: 'EMP-008',
    name: 'Amit Patel',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
    gender: 'Male',
    dob: '1989-02-14',
    mobile: '9876543217',
    email: 'manager@ranbidge.com',
    password: 'Manager@2026',
    address: 'Marathahalli, Bengaluru, Karnataka 560037',
    department: 'Product Operations',
    designation: 'Manager',
    skills: ['Sprint Planning', 'Agile Operations', 'Resource Allocation', 'Risk Mitigation'],
    experience: '9 Years',
    joiningDate: '2022-04-12',
    reportingManagerId: 'EMP-005',
    reportingManagerName: 'Meera Nambiar',
    salary: 260000,
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
  },
  {
    id: 'EMP-009',
    name: 'Rohan Gupta',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300',
    gender: 'Male',
    dob: '1991-10-30',
    mobile: '9876543218',
    email: 'pm@ranbidge.com',
    password: 'Pm@2026',
    address: 'Sarjapur Road, Bengaluru, Karnataka 560035',
    department: 'Delivery Engineering',
    designation: 'Project Manager',
    skills: ['Project Governance', 'Jira Management', 'Client Communication', 'Scrum Master'],
    experience: '7 Years',
    joiningDate: '2023-02-01',
    reportingManagerId: 'EMP-008',
    reportingManagerName: 'Amit Patel',
    salary: 210000,
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
  },
  {
    id: 'EMP-010',
    name: 'Deepak Rao',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300',
    gender: 'Male',
    dob: '1993-01-19',
    mobile: '9876543219',
    email: 'tl@ranbidge.com',
    password: 'Tl@2026',
    address: 'Bellandur, Bengaluru, Karnataka 560103',
    department: 'Software Engineering',
    designation: 'Team Lead',
    skills: ['Fullstack Architecture', 'Node.js', 'React', 'Code Review'],
    experience: '6 Years',
    joiningDate: '2023-08-15',
    reportingManagerId: 'EMP-009',
    reportingManagerName: 'Rohan Gupta',
    salary: 180000,
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
  },
  {
    id: 'EMP-011',
    name: 'Kakara Lavanya',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    gender: 'Female',
    dob: '1998-05-15',
    mobile: '8341133750',
    email: 'smm@ranbidge.com',
    password: 'Smm@2026',
    address: 'HSR Layout, Sector 2, Bengaluru, Karnataka 560102',
    department: 'Brand Marketing',
    designation: 'Social Media Manager',
    skills: ['Social Media Strategy', 'Content Creation', 'Digital Campaigning', 'Analytics'],
    experience: '3 Years',
    joiningDate: '2024-01-10',
    reportingManagerId: 'EMP-006',
    reportingManagerName: 'Karan Malhotra',
    salary: 140000,
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
  },
  {
    id: 'EMP-012',
    name: 'Suresh Reddy',
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300',
    gender: 'Male',
    dob: '1992-07-04',
    mobile: '9876543220',
    email: 'guide@ranbidge.com',
    password: 'Guide@2026',
    address: 'Hebbal, Bengaluru, Karnataka 560024',
    department: 'Customer Success',
    designation: 'Guide',
    skills: ['Product Guidance', 'User Onboarding', 'Technical Support', 'Documentation'],
    experience: '5 Years',
    joiningDate: '2024-03-01',
    reportingManagerId: 'EMP-008',
    reportingManagerName: 'Amit Patel',
    salary: 130000,
    shiftTiming: '09:00 AM - 06:00 PM',
    employmentType: 'Full-Time',
    status: 'Active',
    documents: {
      aadhaar: 'Uploaded_Aadhaar.pdf',
      pan: 'Uploaded_PAN.pdf',
      resume: 'Uploaded_CV.pdf',
      offerLetter: 'Uploaded_Offer.pdf',
      nda: 'Signed_NDA_Digital.pdf'
    }
  },
  {
    id: 'EMP-013',
    name: 'Dr. Anita Joshi',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300',
    gender: 'Female',
    dob: '1985-05-30',
    mobile: '9876543221',
    email: 'mentor@ranbidge.com',
    password: 'Mentor@2026',
    address: 'Malleshwaram, Bengaluru, Karnataka 560003',
    department: 'Learning & Development',
    designation: 'Mentor',
    skills: ['Technical Mentorship', 'Curriculum Design', 'AI Engineering', 'Research'],
    experience: '12 Years',
    joiningDate: '2023-09-01',
    reportingManagerId: 'EMP-004',
    reportingManagerName: 'Siddharth Varma',
    salary: 250000,
    shiftTiming: '09:00 AM - 06:00 PM',
    employmentType: 'Full-Time',
    status: 'Active',
    documents: {
      aadhaar: 'Uploaded_Aadhaar.pdf',
      pan: 'Uploaded_PAN.pdf',
      resume: 'Uploaded_CV.pdf',
      offerLetter: 'Uploaded_Offer.pdf',
      nda: 'Signed_NDA_Digital.pdf'
    }
  },
  {
    id: 'EMP-014',
    name: 'Rahul Verma',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300',
    gender: 'Male',
    dob: '1997-11-11',
    mobile: '9876543222',
    email: 'employee@ranbidge.com',
    password: 'Emp@2026',
    address: 'Banashankari, Bengaluru, Karnataka 560050',
    department: 'Software Engineering',
    designation: 'Employee',
    skills: ['Frontend Development', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    experience: '2 Years',
    joiningDate: '2025-01-15',
    reportingManagerId: 'EMP-010',
    reportingManagerName: 'Deepak Rao',
    salary: 95000,
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
  },
  {
    id: 'EMP-015',
    name: 'Neha Kapoor',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
    gender: 'Female',
    dob: '2002-03-25',
    mobile: '9876543223',
    email: 'intern@ranbidge.com',
    password: 'Intern@2026',
    address: 'Kalyan Nagar, Bengaluru, Karnataka 560043',
    department: 'Software Engineering',
    designation: 'Intern',
    skills: ['JavaScript', 'HTML/CSS', 'Git', 'UI Testing'],
    experience: '6 Months',
    joiningDate: '2026-06-01',
    reportingManagerId: 'EMP-010',
    reportingManagerName: 'Deepak Rao',
    salary: 35000,
    shiftTiming: '09:30 AM - 06:30 PM',
    employmentType: 'Intern',
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

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'TEAM-001',
    name: 'AI Research & Engineering',
    description: 'Advanced Agentic Systems, LLM Orchestration, and Deep Learning Infrastructure.',
    leaderId: 'EMP-010',
    leaderName: 'Deepak Rao (Team Lead)',
    memberIds: ['EMP-010', 'EMP-014', 'EMP-015'],
    mentorId: 'EMP-013',
    mentorName: 'Dr. Anita Joshi (Mentor)',
    guideId: 'EMP-012',
    guideName: 'Suresh Reddy (Guide)',
    internIds: ['EMP-015'],
    internNames: ['Neha Kapoor (Intern)'],
    productivityScore: 94
  },
  {
    id: 'TEAM-002',
    name: 'Enterprise Web & Core OS',
    description: 'RANBIDGE Cloud Platform, Turso DB Realtime Sync, and Responsive Workspace UI.',
    leaderId: 'EMP-009',
    leaderName: 'Rohan Gupta (Project Manager)',
    memberIds: ['EMP-009', 'EMP-010', 'EMP-014'],
    mentorId: 'EMP-004',
    mentorName: 'Siddharth Varma (CTO)',
    guideId: 'EMP-008',
    guideName: 'Amit Patel (Manager)',
    internIds: ['EMP-015'],
    internNames: ['Neha Kapoor (Intern)'],
    productivityScore: 88
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'PRJ-101',
    name: 'RAN-OS Agentic Intelligence Platform',
    description: 'Building next-generation enterprise AI orchestration with real-time Turso DB synchronization, automated document clearance, and role-based workspace analytics.',
    clientName: 'RANBIDGE Global Labs',
    startDate: '2026-06-01',
    endDate: '2026-12-31',
    teamAssignedId: 'TEAM-001',
    teamAssignedName: 'AI Research & Engineering',
    budget: 1500000,
    priority: 'High',
    status: 'In Progress',
    mentorId: 'EMP-013',
    mentorName: 'Dr. Anita Joshi',
    guideId: 'EMP-012',
    guideName: 'Suresh Reddy',
    internIds: ['EMP-015'],
    internNames: ['Neha Kapoor'],
    files: [
      { name: 'RAN_Product_OS_Architectural_Schedules.pdf', size: '3.4 MB', uploadedAt: '2026-06-05' },
      { name: 'Security_Compliance_Standard.pdf', size: '1.2 MB', uploadedAt: '2026-06-10' }
    ]
  },
  {
    id: 'PRJ-102',
    name: 'Prestige Enterprise Smart Hub',
    description: 'Cloud HR operations portal with face-verification GPS attendance, automated payroll slips, and role-restricted document vaults.',
    clientName: 'Prestige Systems Ltd',
    startDate: '2026-07-15',
    endDate: '2026-11-30',
    teamAssignedId: 'TEAM-002',
    teamAssignedName: 'Enterprise Web & Core OS',
    budget: 850000,
    priority: 'Medium',
    status: 'In Progress',
    mentorId: 'EMP-004',
    mentorName: 'Siddharth Varma',
    guideId: 'EMP-008',
    guideName: 'Amit Patel',
    internIds: ['EMP-015'],
    internNames: ['Neha Kapoor'],
    files: [
      { name: 'Prestige_Campus_SOW_Signed.pdf', size: '2.8 MB', uploadedAt: '2026-07-20' }
    ]
  }
];

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

export const INITIAL_DOCUMENTS: CompanyDocument[] = [
  {
    id: 'DOC-001',
    name: 'RANBIDGE_Offer_Letter_Master.dot',
    category: 'HR Handbooks',
    path: '/vault/HR/RANBIDGE_Offer_Letter_Master.dot',
    size: '240 KB',
    uploader: 'Pooja Hegde (HR Lead)',
    uploadedAt: '2026-05-10',
    version: 'v2.1'
  },
  {
    id: 'DOC-002',
    name: 'Prestige_Campus_SOW_Signed.pdf',
    category: 'SOW Agreements',
    path: '/vault/Agreements/Prestige_Campus_SOW_Signed.pdf',
    size: '2.4 MB',
    uploader: 'Rajesh Kumar (Super Admin)',
    uploadedAt: '2026-05-15',
    version: 'v1.0'
  },
  {
    id: 'DOC-003',
    name: 'EPF_Provident_Fund_Rulebook_2026.pdf',
    category: 'EPF Schemes',
    path: '/vault/Compliance/EPF_Provident_Fund_Rulebook_2026.pdf',
    size: '1.1 MB',
    uploader: 'Vikramaditya Roy (CFO)',
    uploadedAt: '2026-05-20',
    version: 'v3.2'
  },
  {
    id: 'DOC-004',
    name: 'RAN_Product_OS_Architectural_Schedules.pdf',
    category: 'Product Blueprints',
    path: '/vault/Blueprints/RAN_Product_OS_Architectural_Schedules.pdf',
    size: '6.8 MB',
    uploader: 'Siddharth Varma (CTO)',
    uploadedAt: '2026-05-28',
    version: 'v4.5'
  },
  {
    id: 'DOC-005',
    name: 'Corporate_Security_Compliance_Standard.pdf',
    category: 'Agreements',
    path: '/vault/Legal/Corporate_Security_Compliance_Standard.pdf',
    size: '3.5 MB',
    uploader: 'Ananya Sharma (CEO)',
    uploadedAt: '2026-06-01',
    version: 'v1.2'
  }
];

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
