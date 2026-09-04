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

const pass = (prefix: string) => `${prefix}Passkey`;

export const ROLE_CREDENTIALS: Record<Role, RoleCredential> = {
  'Super Admin': {
    role: 'Super Admin',
    email: 'admin@ranbidge.com',
    tempPassword: pass('Admin'),
    name: 'Rajesh Kumar (System Admin)',
    department: 'Executive Administration'
  },
  'CEO': {
    role: 'CEO',
    email: 'ceo@ranbidge.com',
    tempPassword: pass('Ceo'),
    name: 'Ananya Sharma (CEO)',
    department: 'Executive Leadership'
  },
  'CFO': {
    role: 'CFO',
    email: 'cfo@ranbidge.com',
    tempPassword: pass('Cfo'),
    name: 'Vikramaditya Roy (CFO)',
    department: 'Finance & Compliance'
  },
  'CTO': {
    role: 'CTO',
    email: 'cto@ranbidge.com',
    tempPassword: pass('Cto'),
    name: 'Siddharth Varma (CTO)',
    department: 'Technology & R&D'
  },
  'COO': {
    role: 'COO',
    email: 'coo@ranbidge.com',
    tempPassword: pass('Coo'),
    name: 'Meera Nambiar (COO)',
    department: 'Global Operations'
  },
  'CMO': {
    role: 'CMO',
    email: 'cmo@ranbidge.com',
    tempPassword: pass('Cmo'),
    name: 'Karan Malhotra (CMO)',
    department: 'Growth & Marketing'
  },
  'HR': {
    role: 'HR',
    email: 'hr@ranbidge.com',
    tempPassword: pass('Hr'),
    name: 'Pooja Hegde (HR Lead)',
    department: 'Human Resources'
  },
  'Manager': {
    role: 'Manager',
    email: 'manager@ranbidge.com',
    tempPassword: pass('Manager'),
    name: 'Amit Patel (Senior Manager)',
    department: 'Product Operations'
  },
  'Project Manager': {
    role: 'Project Manager',
    email: 'pm@ranbidge.com',
    tempPassword: pass('Pm'),
    name: 'Rohan Gupta (Project Manager)',
    department: 'Delivery Engineering'
  },
  'Team Lead': {
    role: 'Team Lead',
    email: 'tl@ranbidge.com',
    tempPassword: pass('Tl'),
    name: 'Deepak Rao (Technical Lead)',
    department: 'Software Engineering'
  },
  'Social Media Manager': {
    role: 'Social Media Manager',
    email: 'smm@ranbidge.com',
    tempPassword: pass('Smm'),
    name: 'Kakara Lavanya (Social Media Handler)',
    department: 'Brand Marketing'
  },
  'Guide': {
    role: 'Guide',
    email: 'guide@ranbidge.com',
    tempPassword: pass('Guide'),
    name: 'Suresh Reddy (Product Guide)',
    department: 'Customer Success'
  },
  'Mentor': {
    role: 'Mentor',
    email: 'mentor@ranbidge.com',
    tempPassword: pass('Mentor'),
    name: 'Dr. Anita Joshi (Technical Mentor)',
    department: 'Learning & Development'
  },
  'Employee': {
    role: 'Employee',
    email: 'employee@ranbidge.com',
    tempPassword: pass('Emp'),
    name: 'Rahul Verma (Software Engineer)',
    department: 'Software Engineering'
  },
  'Intern': {
    role: 'Intern',
    email: 'intern@ranbidge.com',
    tempPassword: pass('Intern'),
    name: 'Neha Kapoor (Engineering Intern)',
    department: 'Software Engineering'
  }
};
