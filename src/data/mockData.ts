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
    id: "EMP-001",
    name: "Rajesh Kumar",
    photo: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150",
    gender: "Male",
    dob: "1988-04-12",
    mobile: "+91 98765 43210",
    email: "rajesh.kumar@ranbidge.com",
    address: "B-402, Sector 5, HSR Layout, Bengaluru, Karnataka, 560102",
    department: "AI Research",
    designation: "Principal AI Scientist",
    skills: ["Generative AI", "PyTorch", "LLMs", "NLP", "Python", "Cloud Solutions"],
    experience: "12 Years",
    joiningDate: "2021-03-15",
    reportingManagerId: "None",
    reportingManagerName: "Company Board",
    salary: 280000,
    shiftTiming: "09:30 AM - 06:30 PM",
    employmentType: "Full-Time",
    status: "Active",
    documents: {
      aadhaar: "Rajesh_Aadhaar.pdf",
      pan: "Rajesh_PAN.pdf",
      resume: "Rajesh_CV_Principal_AI.pdf",
      offerLetter: "Rajesh_Offer_Letter.pdf",
      nda: "Rajesh_NDA_RANBIDGE.pdf"
    }
  },
  {
    id: "EMP-002",
    name: "Priya Sharma",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    gender: "Female",
    dob: "1992-08-25",
    mobile: "+91 98765 43211",
    email: "priya.sharma@ranbidge.com",
    address: "Flat 101, Oak Meadows, Sarjapur Road, Bengaluru, 560035",
    department: "Human Resources",
    designation: "HR Director",
    skills: ["Talent Acquisition", "Conflict Resolution", "Employee Relations", "Payroll Compliance"],
    experience: "8 Years",
    joiningDate: "2022-01-10",
    reportingManagerId: "EMP-001",
    reportingManagerName: "Rajesh Kumar",
    salary: 150000,
    shiftTiming: "09:00 AM - 06:00 PM",
    employmentType: "Full-Time",
    status: "Active",
    documents: {
      aadhaar: "Priya_Aadhaar.pdf",
      pan: "Priya_PAN.pdf",
      resume: "Priya_CV_HRD.pdf",
      offerLetter: "Priya_Offer_Letter.pdf",
      nda: "Priya_NDA_RANBIDGE.pdf"
    }
  },
  {
    id: "EMP-003",
    name: "Amit Patel",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    gender: "Male",
    dob: "1990-11-02",
    mobile: "+91 98765 43212",
    email: "amit.patel@ranbidge.com",
    address: "Regency Park, Whitefield, Bengaluru, 560066",
    department: "Management",
    designation: "Senior Project Manager",
    skills: ["Agile Development", "Scrum", "Risk Management", "Project Scheduling", "Budgeting"],
    experience: "10 Years",
    joiningDate: "2021-08-18",
    reportingManagerId: "EMP-001",
    reportingManagerName: "Rajesh Kumar",
    salary: 190000,
    shiftTiming: "09:30 AM - 06:30 PM",
    employmentType: "Full-Time",
    status: "Active",
    documents: {
      aadhaar: "Amit_Aadhaar.pdf",
      pan: "Amit_PAN.pdf",
      resume: "Amit_CV_PM.pdf",
      offerLetter: "Amit_Offer_Letter.pdf",
      nda: "Amit_NDA_RANBIDGE.pdf"
    }
  },
  {
    id: "EMP-004",
    name: "Sarah Dias",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    gender: "Female",
    dob: "1994-01-30",
    mobile: "+91 98765 43213",
    email: "sarah.dias@ranbidge.com",
    address: "Block C-5, Palm Grove Apartments, Koramangala, Bengaluru, 560095",
    department: "Web Development",
    designation: "Full Stack Team Lead",
    skills: ["React", "Node.js", "TypeScript", "Next.js", "MongoDB", "PostgreSQL", "Tailwind CSS"],
    experience: "7 Years",
    joiningDate: "2023-02-01",
    reportingManagerId: "EMP-003",
    reportingManagerName: "Amit Patel",
    salary: 165000,
    shiftTiming: "09:30 AM - 06:30 PM",
    employmentType: "Full-Time",
    status: "Active",
    documents: {
      aadhaar: "Sarah_Aadhaar.pdf",
      pan: "Sarah_PAN.pdf",
      resume: "Sarah_CV_Fullstack.pdf",
      offerLetter: "Sarah_Offer_Letter.pdf",
      nda: "Sarah_NDA_RANBIDGE.pdf"
    }
  },
  {
    id: "EMP-005",
    name: "Vikram Singh",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    gender: "Male",
    dob: "1994-07-15",
    mobile: "+91 98765 43214",
    email: "vikram.singh@ranbidge.com",
    address: "H-506, Sunrise Heights, Bellandur, Bengaluru, 560103",
    department: "AI Research",
    designation: "Senior NLP Engineer",
    skills: ["Transformers", "Python", "FastAPI", "Docker", "HuggingFace", "TypeScript"],
    experience: "5 Years",
    joiningDate: "2023-06-10",
    reportingManagerId: "EMP-001",
    reportingManagerName: "Rajesh Kumar",
    salary: 140000,
    shiftTiming: "09:30 AM - 06:30 PM",
    employmentType: "Full-Time",
    status: "Active",
    documents: {
      aadhaar: "Vikram_Aadhaar.pdf",
      pan: "Vikram_PAN.pdf",
      resume: "Vikram_Resume_AI.pdf",
      offerLetter: "Vikram_Offer_Letter.pdf",
      nda: "Vikram_NDA_RANBIDGE.pdf"
    }
  },
  {
    id: "EMP-006",
    name: "Neha Gupta",
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150",
    gender: "Female",
    dob: "1995-12-05",
    mobile: "+91 98765 43215",
    email: "neha.gupta@ranbidge.com",
    address: "12/A, Ferns Residency, Electronic City, Bengaluru, 560100",
    department: "DevOps",
    designation: "DevOps Architect",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "GitHub Actions", "Nginx"],
    experience: "6 Years",
    joiningDate: "2022-11-20",
    reportingManagerId: "EMP-003",
    reportingManagerName: "Amit Patel",
    salary: 145000,
    shiftTiming: "10:00 AM - 07:00 PM",
    employmentType: "Full-Time",
    status: "Active",
    documents: {
      aadhaar: "Neha_Aadhaar.pdf",
      pan: "Neha_PAN.pdf",
      resume: "Neha_DevOps_CV.pdf",
      offerLetter: "Neha_Offer.pdf",
      nda: "Neha_NDA.pdf"
    }
  },
  {
    id: "EMP-007",
    name: "Rahul Verma",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    gender: "Male",
    dob: "2003-05-20",
    mobile: "+91 98765 43216",
    email: "rahul.verma@ranbidge.com",
    address: "Room 12, Sree PG, Indiranagar, Bengaluru, 560038",
    department: "Web Development",
    designation: "Frontend Intern",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    experience: "Fresher",
    joiningDate: "2026-02-01",
    reportingManagerId: "EMP-004",
    reportingManagerName: "Sarah Dias",
    salary: 250000, // Wait, Let's do 25000 monthly stipend
    shiftTiming: "09:30 AM - 06:30 PM",
    employmentType: "Intern",
    status: "Active",
    documents: {
      aadhaar: "Rahul_Aadhaar.pdf",
      pan: "Rahul_PAN.pdf",
      resume: "Rahul_Intern_CV.pdf",
      offerLetter: "Rahul_Internship_Letter.pdf",
      nda: "Rahul_NDA.pdf"
    }
  },
  {
    id: "EMP-008",
    name: "Sanjay Rao",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    gender: "Male",
    dob: "1991-03-08",
    mobile: "+91 98765 43217",
    email: "sanjay.rao@ranbidge.com",
    address: "G-101, Prestige Ferns, Bellandur, Bengaluru, 560103",
    department: "Hardware Engineering",
    designation: "Lead Firmware Engineer",
    skills: ["Embedded C++", "FPGA", "RTOS", "IoT", "Microcontrollers", "PCB Design"],
    experience: "9 Years",
    joiningDate: "2020-05-01",
    reportingManagerId: "EMP-001",
    reportingManagerName: "Rajesh Kumar",
    salary: 180000,
    shiftTiming: "09:00 AM - 06:00 PM",
    employmentType: "Full-Time",
    status: "Active",
    documents: {
      aadhaar: "Sanjay_Aadhaar.pdf",
      pan: "Sanjay_PAN.pdf",
      resume: "Sanjay_CV_Hardware.pdf",
      offerLetter: "Sanjay_Offer.pdf",
      nda: "Sanjay_NDA.pdf"
    }
  },
  {
    id: "EMP-009",
    name: "Emily Rose",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    gender: "Female",
    dob: "1997-09-14",
    mobile: "+91 98765 43218",
    email: "emily.rose@ranbidge.com",
    address: "B-5, Trinity Meadows, Koramangala, Bengaluru, 560034",
    department: "Marketing",
    designation: "Growth Lead",
    skills: ["SEO", "SaaS Marketing", "B2B Outreach", "Brand Management", "Copywriting"],
    experience: "4 Years",
    joiningDate: "2024-10-15",
    reportingManagerId: "EMP-003",
    reportingManagerName: "Amit Patel",
    salary: 110000,
    shiftTiming: "09:30 AM - 06:30 PM",
    employmentType: "Full-Time",
    status: "Active",
    documents: {
      aadhaar: "Emily_Aadhaar.pdf",
      pan: "Emily_PAN.pdf",
      resume: "Emily_Resume.pdf",
      offerLetter: "Emily_Offer.pdf",
      nda: "Emily_NDA.pdf"
    }
  },
  {
    id: "EMP-010",
    name: "Karan Malhotra",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    gender: "Male",
    dob: "1993-02-18",
    mobile: "+91 98765 43219",
    email: "karan.malhotra@ranbidge.com",
    address: "T-22, Shanthi Nagar, Bengaluru, 560027",
    department: "Cyber Security",
    designation: "Senior Infosec Specialist",
    skills: ["Penetration Testing", "ISO 27001", "Vulnerability Assessment", "Firewalls", "SOC"],
    experience: "7 Years",
    joiningDate: "2023-11-01",
    reportingManagerId: "EMP-003",
    reportingManagerName: "Amit Patel",
    salary: 155000,
    shiftTiming: "09:30 AM - 06:30 PM",
    employmentType: "Full-Time",
    status: "Active",
    documents: {
      aadhaar: "Karan_Aadhaar.pdf",
      pan: "Karan_PAN.pdf",
      resume: "Karan_Resume.pdf",
      offerLetter: "Karan_Offer.pdf",
      nda: "Karan_NDA.pdf"
    }
  }
];

export const INITIAL_TEAMS: Team[] = [
  {
    id: "TEAM-001",
    name: "AI & LangModel Team",
    description: "Build intelligence workflows, NLP architectures, LLM inference API services, and Generative pipelines.",
    leaderId: "EMP-001",
    leaderName: "Rajesh Kumar",
    memberIds: ["EMP-001", "EMP-005"],
    productivityScore: 94
  },
  {
    id: "TEAM-002",
    name: "Web Applications Team",
    description: "Create responsive client-side SPA dashboards and high-speed enterprise servers with full React integrations.",
    leaderId: "EMP-004",
    leaderName: "Sarah Dias",
    memberIds: ["EMP-004", "EMP-007"],
    productivityScore: 88
  },
  {
    id: "TEAM-003",
    name: "Hardware Engineering",
    description: "Design PCB panels, design RTOS microcontrollers, embedded nodes, and IoT hardware stacks.",
    leaderId: "EMP-008",
    leaderName: "Sanjay Rao",
    memberIds: ["EMP-008"],
    productivityScore: 82
  },
  {
    id: "TEAM-004",
    name: "Security & DevOps",
    description: "Oversee network audits, vulnerability tests, AWS architecture, CI/CD pipelines, and general system health.",
    leaderId: "EMP-006",
    leaderName: "Neha Gupta",
    memberIds: ["EMP-006", "EMP-010"],
    productivityScore: 91
  },
  {
    id: "TEAM-005",
    name: "Growth & Marketing",
    description: "Oversee client acquisitions, community outreach, product launches, SaaS optimization, and branding assets.",
    leaderId: "EMP-009",
    leaderName: "Emily Rose",
    memberIds: ["EMP-009"],
    productivityScore: 85
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "PRJ-101",
    name: "RAN AI Enterprise OS",
    description: "An intelligent workspace engine that integrates vector search, meeting transcripts, predictive workflow planning, and smart calendar sync.",
    clientName: "Internal Product",
    startDate: "2026-03-01",
    endDate: "2026-09-30",
    teamAssignedId: "TEAM-001",
    teamAssignedName: "AI & LangModel Team",
    budget: 4500000,
    priority: "High",
    status: "In Progress",
    files: [
      { name: "RAN_AI_Product_Specs.pdf", size: "2.1 MB", uploadedAt: "2026-03-02" },
      { name: "System_Architecture_Diagram.png", size: "850 KB", uploadedAt: "2026-03-10" }
    ]
  },
  {
    id: "PRJ-102",
    name: "State Bank of India HR Portals",
    description: "Standard web migration for customer registration portals, employee onboarding workflows, and document vaulting APIs.",
    clientName: "State Bank of India",
    startDate: "2026-01-15",
    endDate: "2026-06-30",
    teamAssignedId: "TEAM-002",
    teamAssignedName: "Web Applications Team",
    budget: 7200000,
    priority: "High",
    status: "In Progress",
    files: [
      { name: "SBI_Portal_Requirements.pdf", size: "3.4 MB", uploadedAt: "2026-01-16" },
      { name: "Signed_SOW_RANBIDGE_SBI.pdf", size: "1.2 MB", uploadedAt: "2026-01-20" }
    ]
  },
  {
    id: "PRJ-103",
    name: "IoT Smart Gate Sensors",
    description: "Real-time biometric reading grids, proximity tracking cards, and secure BLE gateway firmware modules.",
    clientName: "SmartSpace Realties Group",
    startDate: "2026-04-10",
    endDate: "2026-08-15",
    teamAssignedId: "TEAM-003",
    teamAssignedName: "Hardware Engineering",
    budget: 2800000,
    priority: "Medium",
    status: "In Progress",
    files: [
      { name: "Schematic_Gate_BLE_v1.pdf", size: "4.7 MB", uploadedAt: "2026-04-12" }
    ]
  },
  {
    id: "PRJ-104",
    name: "Global Security Hardening v2",
    description: "Upgrade core firewalls, prepare for SOC2 compliance evaluations, and automate kubernetes container monitoring scripts.",
    clientName: "Internal Compliance",
    startDate: "2026-05-01",
    endDate: "2026-06-15",
    teamAssignedId: "TEAM-004",
    teamAssignedName: "Security & DevOps",
    budget: 1200000,
    priority: "High",
    status: "In Progress",
    files: [
      { name: "Vulnerability_Report_Q1_2026.pdf", size: "1.8 MB", uploadedAt: "2026-05-02" }
    ]
  },
  {
    id: "PRJ-105",
    name: "RAN WorkHub SaaS Expansion",
    description: "Formulate lead lists, manage social channels, publish press letters, and scale initial beta user onboardings.",
    clientName: "Internal Product",
    startDate: "2026-05-15",
    endDate: "2026-07-31",
    teamAssignedId: "TEAM-005",
    teamAssignedName: "Growth & Marketing",
    budget: 800000,
    priority: "Low",
    status: "Pending",
    files: []
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "TSK-201",
    name: "Create Vector Storage Bridge",
    description: "Connect standard embedding results into an efficient local indexing layer for instant workplace semantic queries.",
    assignedEmployeeId: "EMP-005",
    assignedEmployeeName: "Vikram Singh",
    projectId: "PRJ-101",
    projectName: "RAN AI Enterprise OS",
    deadline: "2026-06-10",
    priority: "High",
    status: "Working",
    attachments: ["Embedding_Bridge_Spec.pdf"],
    comments: [
      { id: "C1", author: "Rajesh Kumar", comment: "Awesome setup. Ensure the chunk sizes are well optimized before feeding standard logs.", timestamp: "2026-05-24 10:30 AM" },
      { id: "C2", author: "Vikram Singh", comment: "Working on it. Tests are executing correctly.", timestamp: "2026-05-25 08:15 AM" }
    ]
  },
  {
    id: "TSK-202",
    name: "Fine-tune Gemini prompts for HR analysis",
    description: "Establish systemic guidelines to instruct Gemini on evaluating delayed schedules, tracking KPIs, and sorting high performance metrics safely.",
    assignedEmployeeId: "EMP-001",
    assignedEmployeeName: "Rajesh Kumar",
    projectId: "PRJ-101",
    projectName: "RAN AI Enterprise OS",
    deadline: "2026-05-30",
    priority: "High",
    status: "Working",
    attachments: [],
    comments: []
  },
  {
    id: "TSK-203",
    name: "Design SBI Landing Dashboard Grid",
    description: "Format fully themeable screens, configure high-contrast layouts, and implement robust sorting configurations using Tailwind grid styles.",
    assignedEmployeeId: "EMP-007",
    assignedEmployeeName: "Rahul Verma",
    projectId: "PRJ-102",
    projectName: "State Bank of India HR Portals",
    deadline: "2026-05-20", // LATE DATE
    priority: "Medium",
    status: "Delayed",
    attachments: ["Wireframe_Draft_v1.png"],
    comments: [
      { id: "C3", author: "Sarah Dias", comment: "Rahul, please push your changes dynamically so I can review the responsive layout issues.", timestamp: "2026-05-18 11:20 AM" },
      { id: "C4", author: "Rahul Verma", comment: "Encountering rendering problems with CSS nested variables in Chrome browser, fixing today.", timestamp: "2026-05-22 04:45 PM" }
    ]
  },
  {
    id: "TSK-204",
    name: "Secure Onboarding API Controllers",
    description: "Implement strict JSON web token checks, route validators, payload sanitizers, and setup role-based endpoints in node express router.",
    assignedEmployeeId: "EMP-004",
    assignedEmployeeName: "Sarah Dias",
    projectId: "PRJ-102",
    projectName: "State Bank of India HR Portals",
    deadline: "2026-05-28",
    priority: "High",
    status: "Working",
    attachments: [],
    comments: []
  },
  {
    id: "TSK-205",
    name: "Secure SPI Firmware Headers",
    description: "Optimize SPI hardware registers, configure clock cycle times, and resolve high latency reading from biometric finger grids.",
    assignedEmployeeId: "EMP-008",
    assignedEmployeeName: "Sanjay Rao",
    projectId: "PRJ-103",
    projectName: "IoT Smart Gate Sensors",
    deadline: "2026-05-15", // LATE DATE
    priority: "High",
    status: "Delayed",
    attachments: [],
    comments: [
      { id: "C5", author: "Rajesh Kumar", comment: "Is the reading lag physical noise or firmware interrupt timing issues?", timestamp: "2026-05-14 02:00 PM" },
      { id: "C6", author: "Sanjay Rao", comment: "I suspect firmware timing overlaps, trying to adjust the SPI delay registers.", timestamp: "2026-05-15 11:10 AM" }
    ]
  },
  {
    id: "TSK-206",
    name: "Perform Internal Penetration Audit",
    description: "Run automated web crawlers and conduct manual code audit checks for cross site injection threats.",
    assignedEmployeeId: "EMP-010",
    assignedEmployeeName: "Karan Malhotra",
    projectId: "PRJ-104",
    projectName: "Global Security Hardening v2",
    deadline: "2026-05-24", // LATE DATE
    priority: "High",
    status: "Completed",
    attachments: ["Sec_Audit_Draft.pdf"],
    comments: []
  },
  {
    id: "TSK-207",
    name: "Draft SaaS Marketing Outlines",
    description: "Create high impact copy addressing core productivity struggles, emphasizing immediate operational boosts from custom AI insights.",
    assignedEmployeeId: "EMP-009",
    assignedEmployeeName: "Emily Rose",
    projectId: "PRJ-105",
    projectName: "RAN WorkHub SaaS Expansion",
    deadline: "2026-06-15",
    priority: "Medium",
    status: "To Do",
    attachments: [],
    comments: []
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "ATT-301",
    employeeId: "EMP-001",
    employeeName: "Rajesh Kumar",
    date: "2026-05-25",
    checkInTime: "09:12 AM",
    checkOutTime: null,
    status: "Present",
    gps: { lat: 12.9141, lng: 77.6413, address: "HSR Sector 5, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 0
  },
  {
    id: "ATT-302",
    employeeId: "EMP-002",
    employeeName: "Priya Sharma",
    date: "2026-05-25",
    checkInTime: "08:55 AM",
    checkOutTime: null,
    status: "Present",
    gps: { lat: 12.9224, lng: 77.6749, address: "Sarjapur Road, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 0
  },
  {
    id: "ATT-303",
    employeeId: "EMP-003",
    employeeName: "Amit Patel",
    date: "2026-05-25",
    checkInTime: "09:45 AM",
    checkOutTime: null,
    status: "Late", // shifted past 9:30
    gps: { lat: 12.9562, lng: 77.7286, address: "Whitefield Road, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 0
  },
  {
    id: "ATT-304",
    employeeId: "EMP-004",
    employeeName: "Sarah Dias",
    date: "2026-05-25",
    checkInTime: "09:20 AM",
    checkOutTime: null,
    status: "Present",
    gps: { lat: 12.9339, lng: 77.6180, address: "Koramangala Block 5, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 0
  },
  {
    id: "ATT-305",
    employeeId: "EMP-005",
    employeeName: "Vikram Singh",
    date: "2026-05-25",
    checkInTime: "09:28 AM",
    checkOutTime: null,
    status: "Present",
    gps: { lat: 12.9197, lng: 77.6212, address: "HSR Block 5, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 0
  },
  {
    id: "ATT-306",
    employeeId: "EMP-006",
    employeeName: "Neha Gupta",
    date: "2026-05-25",
    checkInTime: null,
    checkOutTime: null,
    status: "Absent",
    gps: null,
    faceRecognitionMatched: false,
    overtimeMinutes: 0
  },
  {
    id: "ATT-307",
    employeeId: "EMP-007",
    employeeName: "Rahul Verma",
    date: "2026-05-25",
    checkInTime: "09:25 AM",
    checkOutTime: null,
    status: "Present",
    gps: { lat: 12.9716, lng: 77.5946, address: "M G Road Metro Station, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 0
  },
  {
    id: "ATT-308",
    employeeId: "EMP-008",
    employeeName: "Sanjay Rao",
    date: "2026-05-25",
    checkInTime: "08:48 AM",
    checkOutTime: null,
    status: "Present",
    gps: { lat: 12.9304, lng: 77.6782, address: "Bellandur Bypass, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 0
  },
  // Yesterday's full records for summary calculation
  {
    id: "ATT-290",
    employeeId: "EMP-001",
    employeeName: "Rajesh Kumar",
    date: "2026-05-24",
    checkInTime: "09:10 AM",
    checkOutTime: "06:45 PM",
    status: "Present",
    gps: { lat: 12.9141, lng: 77.6413, address: "HSR Sector 5, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 15
  },
  {
    id: "ATT-291",
    employeeId: "EMP-002",
    employeeName: "Priya Sharma",
    date: "2026-05-24",
    checkInTime: "08:50 AM",
    checkOutTime: "06:05 PM",
    status: "Present",
    gps: { lat: 12.9224, lng: 77.6749, address: "Sarjapur Road, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 5
  },
  {
    id: "ATT-292",
    employeeId: "EMP-003",
    employeeName: "Amit Patel",
    date: "2026-05-24",
    checkInTime: "09:40 AM",
    checkOutTime: "07:00 PM",
    status: "Late",
    gps: { lat: 12.9562, lng: 77.7286, address: "Whitefield Road, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 30
  },
  {
    id: "ATT-293",
    employeeId: "EMP-004",
    employeeName: "Sarah Dias",
    date: "2026-05-24",
    checkInTime: "09:12 AM",
    checkOutTime: "06:40 PM",
    status: "Present",
    gps: { lat: 12.9339, lng: 77.6180, address: "Koramangala Block 5, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 10
  },
  {
    id: "ATT-294",
    employeeId: "EMP-005",
    employeeName: "Vikram Singh",
    date: "2026-05-24",
    checkInTime: "09:20 AM",
    checkOutTime: "06:30 PM",
    status: "Present",
    gps: { lat: 12.9197, lng: 77.6212, address: "HSR Block 5, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 0
  },
  {
    id: "ATT-295",
    employeeId: "EMP-006",
    employeeName: "Neha Gupta",
    date: "2026-05-24",
    checkInTime: "09:55 AM",
    checkOutTime: "07:15 PM",
    status: "Present",
    gps: { lat: 12.9300, lng: 77.6800, address: "Electronic City phase 1, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 15
  },
  {
    id: "ATT-296",
    employeeId: "EMP-007",
    employeeName: "Rahul Verma",
    date: "2026-05-24",
    checkInTime: "10:15 AM",
    checkOutTime: "06:30 PM",
    status: "Late",
    gps: { lat: 12.9716, lng: 77.5946, address: "M G Road Metro Station, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 0
  },
  {
    id: "ATT-297",
    employeeId: "EMP-008",
    employeeName: "Sanjay Rao",
    date: "2026-05-24",
    checkInTime: "08:52 AM",
    checkOutTime: "06:10 PM",
    status: "Present",
    gps: { lat: 12.9304, lng: 77.6782, address: "Bellandur Bypass, Bengaluru" },
    faceRecognitionMatched: true,
    overtimeMinutes: 10
  }
];

export const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: "LV-401",
    employeeId: "EMP-006",
    employeeName: "Neha Gupta",
    type: "Sick Leave",
    startDate: "2026-05-25",
    endDate: "2026-05-26",
    reason: "Recovering from food infection. Under medical prescription.",
    status: "Approved",
    approvedBy: "Amit Patel"
  },
  {
    id: "LV-402",
    employeeId: "EMP-005",
    employeeName: "Vikram Singh",
    type: "Casual Leave",
    startDate: "2026-06-02",
    endDate: "2026-06-04",
    reason: "Going to native town to attend relative wedding function.",
    status: "Pending",
    approvedBy: "Pending"
  },
  {
    id: "LV-403",
    employeeId: "EMP-007",
    employeeName: "Rahul Verma",
    type: "Paid Leave",
    startDate: "2026-04-12",
    endDate: "2026-04-13",
    reason: "College semester final exams documentation preparation.",
    status: "Approved",
    approvedBy: "Sarah Dias"
  }
];

export const INITIAL_PAYROLL: PayrollItem[] = [
  {
    id: "PAY-501",
    employeeId: "EMP-001",
    employeeName: "Rajesh Kumar",
    month: "April 2026",
    baseSalary: 280000,
    allowances: { hra: 84000, conveyance: 15000, medical: 10000, bonus: 20000 },
    deductions: { pf: 21600, tax: 45000, professionalTax: 200 },
    netSalary: 342200,
    status: "Paid"
  },
  {
    id: "PAY-502",
    employeeId: "EMP-002",
    employeeName: "Priya Sharma",
    month: "April 2026",
    baseSalary: 150000,
    allowances: { hra: 45000, conveyance: 10000, medical: 5000, bonus: 5000 },
    deductions: { pf: 12000, tax: 22000, professionalTax: 200 },
    netSalary: 180800,
    status: "Paid"
  },
  {
    id: "PAY-503",
    employeeId: "EMP-003",
    employeeName: "Amit Patel",
    month: "April 2026",
    baseSalary: 190000,
    allowances: { hra: 57000, conveyance: 12000, medical: 6000, bonus: 10000 },
    deductions: { pf: 15000, tax: 28000, professionalTax: 200 },
    netSalary: 231800,
    status: "Paid"
  },
  {
    id: "PAY-504",
    employeeId: "EMP-004",
    employeeName: "Sarah Dias",
    month: "April 2026",
    baseSalary: 165000,
    allowances: { hra: 49500, conveyance: 10000, medical: 5000, bonus: 8000 },
    deductions: { pf: 13200, tax: 24000, professionalTax: 200 },
    netSalary: 200100,
    status: "Paid"
  },
  {
    id: "PAY-505",
    employeeId: "EMP-005",
    employeeName: "Vikram Singh",
    month: "April 2026",
    baseSalary: 140000,
    allowances: { hra: 42000, conveyance: 10000, medical: 5000, bonus: 0 },
    deductions: { pf: 11200, tax: 18500, professionalTax: 200 },
    netSalary: 167100,
    status: "Paid"
  }
];

export const INITIAL_KPIS: PerformanceKPI[] = [
  {
    id: "KPI-601",
    employeeId: "EMP-001",
    employeeName: "Rajesh Kumar",
    kpiScore: 97,
    taskCompletionRate: 100,
    attendanceScore: 100,
    teamContribution: 98,
    evaluationDate: "2026-05-01",
    feedback: "Exceptional technical direction, provides consistent mentorship across divisions and ensures correct execution timing."
  },
  {
    id: "KPI-602",
    employeeId: "EMP-004",
    employeeName: "Sarah Dias",
    kpiScore: 92,
    taskCompletionRate: 94,
    attendanceScore: 95,
    teamContribution: 92,
    evaluationDate: "2026-05-02",
    feedback: "Maintains strong fullstack focus, addresses nested styling layout bugs quickly, and keeps interns well aligned."
  },
  {
    id: "KPI-603",
    employeeId: "EMP-005",
    employeeName: "Vikram Singh",
    kpiScore: 89,
    taskCompletionRate: 88,
    attendanceScore: 98,
    teamContribution: 84,
    evaluationDate: "2026-05-03",
    feedback: "High research quality in machine vision workflows, needs slight speedups to deliver embedding storage bridges."
  },
  {
    id: "KPI-604",
    employeeId: "EMP-007",
    employeeName: "Rahul Verma",
    kpiScore: 71,
    taskCompletionRate: 70,
    attendanceScore: 88,
    teamContribution: 75,
    evaluationDate: "2026-05-04",
    feedback: "Needs close monitoring. Facing struggles resolving nested React structures and CSS grid rules cleanly."
  },
  {
    id: "KPI-605",
    employeeId: "EMP-008",
    employeeName: "Sanjay Rao",
    kpiScore: 78,
    taskCompletionRate: 72,
    attendanceScore: 96,
    teamContribution: 79,
    evaluationDate: "2026-05-05",
    feedback: "Firmware quality is excellent, but suffers schedule slippages due to high physical sensor noise debugging cycles."
  }
];

export const INITIAL_DOCUMENTS: CompanyDocument[] = [];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ANN-801",
    title: "Launch of RAN AI OS Enterprise Phase-1 Beta",
    content: "The first internal beta deployment for our RAN AI Enterprise operating portal is now live for testing. All team members can initiate check-ins and run mock evaluations via the AI Workspace. Please log any visual layout bugs directly to our Web Dev team lead Sarah.",
    type: "Success",
    pinned: true,
    creator: "Rajesh Kumar",
    createdAt: "2026-05-24"
  },
  {
    id: "ANN-802",
    title: "SOC-2 Compliance Internal Readiness Audit",
    content: "Our Infosec lead Karan Malhotra will begin internal file and container configuration scans starting Wednesday at 10 AM. Ensure all credentials are strictly declared outside codebase files and placed inside Settings > Secrets.",
    type: "Warning",
    pinned: false,
    creator: "Priya Sharma",
    createdAt: "2026-05-22"
  },
  {
    id: "ANN-803",
    title: "Monthly Town Hall Meeting - May 2026",
    content: "Our monthly review and company progress sync is scheduled for May 29th at 4:00 PM in the Main Conference Hub (and streamed on the WorkHub Communication server). Rajesh Kumar will share performance KPIs, team milestone rewards, and client expansions.",
    type: "Info",
    pinned: false,
    creator: "Rajesh Kumar",
    createdAt: "2026-05-25"
  }
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: "MSG-901",
    teamId: "TEAM-001",
    senderId: "EMP-001",
    senderName: "Rajesh Kumar",
    senderRole: "Super Admin",
    message: "Hi Vikram, were you able to evaluate prompt accuracy under the latest model update?",
    timestamp: "10:15 AM"
  },
  {
    id: "MSG-902",
    teamId: "TEAM-001",
    senderId: "EMP-005",
    senderName: "Vikram Singh",
    senderRole: "Employee",
    message: "Yes Rajesh, the scores improved with structured JSON definitions by roughly 8%. Working on final pipeline bindings today.",
    timestamp: "10:32 AM"
  },
  {
    id: "MSG-903",
    teamId: "TEAM-002",
    senderId: "EMP-004",
    senderName: "Sarah Dias",
    senderRole: "Team Lead",
    message: "Welcome to the SBI project channel! Rahul, please pick up task TSK-203. Get a basic sidebar landing configured.",
    timestamp: "09:05 AM"
  },
  {
    id: "MSG-904",
    teamId: "TEAM-002",
    senderId: "EMP-007",
    senderName: "Rahul Verma",
    senderRole: "Intern",
    message: "Thanks Sarah, on it. Designing the visual layouts using standard responsive flex grids.",
    timestamp: "09:18 AM"
  }
];
