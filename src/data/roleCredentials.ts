/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Role } from '../types';

export interface RoleCredential {
  role: Role;
  email: string;
  tempPassword: string;
  name: string;
  department: string;
}

export const ROLE_CREDENTIALS: Record<Role, RoleCredential> = {
  'Super Admin': {
    role: 'Super Admin',
    email: 'admin@ranbidge.com',
    tempPassword: 'Admin@2026',
    name: 'Rajesh Kumar (System Admin)',
    department: 'Executive Administration'
  },
  'CEO': {
    role: 'CEO',
    email: 'ceo@ranbidge.com',
    tempPassword: 'Ceo@2026',
    name: 'Ananya Sharma (CEO)',
    department: 'Executive Leadership'
  },
  'CFO': {
    role: 'CFO',
    email: 'cfo@ranbidge.com',
    tempPassword: 'Cfo@2026',
    name: 'Vikramaditya Roy (CFO)',
    department: 'Finance & Compliance'
  },
  'CTO': {
    role: 'CTO',
    email: 'cto@ranbidge.com',
    tempPassword: 'Cto@2026',
    name: 'Siddharth Varma (CTO)',
    department: 'Technology & R&D'
  },
  'COO': {
    role: 'COO',
    email: 'coo@ranbidge.com',
    tempPassword: 'Coo@2026',
    name: 'Meera Nambiar (COO)',
    department: 'Global Operations'
  },
  'CMO': {
    role: 'CMO',
    email: 'cmo@ranbidge.com',
    tempPassword: 'Cmo@2026',
    name: 'Karan Malhotra (CMO)',
    department: 'Growth & Marketing'
  },
  'HR': {
    role: 'HR',
    email: 'hr@ranbidge.com',
    tempPassword: 'Hr@2026',
    name: 'Pooja Hegde (HR Lead)',
    department: 'Human Resources'
  },
  'Manager': {
    role: 'Manager',
    email: 'manager@ranbidge.com',
    tempPassword: 'Manager@2026',
    name: 'Amit Patel (Senior Manager)',
    department: 'Product Operations'
  },
  'Project Manager': {
    role: 'Project Manager',
    email: 'pm@ranbidge.com',
    tempPassword: 'Pm@2026',
    name: 'Rohan Gupta (Project Manager)',
    department: 'Delivery Engineering'
  },
  'Team Lead': {
    role: 'Team Lead',
    email: 'tl@ranbidge.com',
    tempPassword: 'Tl@2026',
    name: 'Deepak Rao (Technical Lead)',
    department: 'Software Engineering'
  },
  'Social Media Manager': {
    role: 'Social Media Manager',
    email: 'smm@ranbidge.com',
    tempPassword: 'Smm@2026',
    name: 'Kakara Lavanya (Social Media Handler)',
    department: 'Brand Marketing'
  },
  'Guide': {
    role: 'Guide',
    email: 'guide@ranbidge.com',
    tempPassword: 'Guide@2026',
    name: 'Suresh Reddy (Product Guide)',
    department: 'Customer Success'
  },
  'Mentor': {
    role: 'Mentor',
    email: 'mentor@ranbidge.com',
    tempPassword: 'Mentor@2026',
    name: 'Dr. Anita Joshi (Technical Mentor)',
    department: 'Learning & Development'
  },
  'Employee': {
    role: 'Employee',
    email: 'employee@ranbidge.com',
    tempPassword: 'Emp@2026',
    name: 'Rahul Verma (Software Engineer)',
    department: 'Software Engineering'
  },
  'Intern': {
    role: 'Intern',
    email: 'intern@ranbidge.com',
    tempPassword: 'Intern@2026',
    name: 'Neha Kapoor (Engineering Intern)',
    department: 'Software Engineering'
  }
};
