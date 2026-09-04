# 🔐 RANBIDGE Solutions - Enterprise Roles & Credentials Guide

This document contains the official registry of all **15 System Roles**, authentication credentials, security clearances, and database synchronization schemas for **RANBIDGE Solutions Private Limited**.

---

## 📋 Comprehensive Roles & Credentials Directory

All 15 employee accounts are pre-seeded into Turso Database (`libsql://ranbidge-workspace-rgopi143.aws-ap-south-1.turso.io`) under the `employees` and `documents` tables.

| # | Employee ID | Designation / Role | Full Name | Official Email | Clearance & Passkey | Department | Monthly Salary (INR) |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **1** | `EMP-001` | **Super Admin** | Rajesh Kumar | `admin@ranbidge.com` | `[SUPER_ADMIN_PASSKEY]` | Executive Administration | ₹3,50,000 |
| **2** | `EMP-002` | **CEO** | Ananya Sharma | `ceo@ranbidge.com` | `[CEO_PASSKEY]` | Executive Leadership | ₹5,00,000 |
| **3** | `EMP-003` | **CFO** | Vikramaditya Roy | `cfo@ranbidge.com` | `[CFO_PASSKEY]` | Finance & Compliance | ₹4,20,000 |
| **4** | `EMP-004` | **CTO** | Siddharth Varma | `cto@ranbidge.com` | `[CTO_PASSKEY]` | Technology & R&D | ₹4,50,000 |
| **5** | `EMP-005` | **COO** | Meera Nambiar | `coo@ranbidge.com` | `[COO_PASSKEY]` | Global Operations | ₹3,80,000 |
| **6** | `EMP-006` | **CMO** | Karan Malhotra | `cmo@ranbidge.com` | `[CMO_PASSKEY]` | Growth & Marketing | ₹3,60,000 |
| **7** | `EMP-007` | **HR** | Pooja Hegde | `hr@ranbidge.com` | `[HR_PASSKEY]` | Human Resources | ₹2,20,000 |
| **8** | `EMP-008` | **Manager** | Amit Patel | `manager@ranbidge.com` | `[MANAGER_PASSKEY]` | Product Operations | ₹2,60,000 |
| **9** | `EMP-009` | **Project Manager** | Rohan Gupta | `pm@ranbidge.com` | `[PM_PASSKEY]` | Delivery Engineering | ₹2,10,000 |
| **10** | `EMP-010` | **Team Lead** | Deepak Rao | `tl@ranbidge.com` | `[TL_PASSKEY]` | Software Engineering | ₹1,80,000 |
| **11** | `EMP-011` | **Social Media Manager** | Kakara Lavanya | `smm@ranbidge.com` | `[SMM_PASSKEY]` | Brand Marketing | ₹1,40,000 |
| **12** | `EMP-012` | **Guide** | Suresh Reddy | `guide@ranbidge.com` | `[GUIDE_PASSKEY]` | Customer Success | ₹1,30,000 |
| **13** | `EMP-013` | **Mentor** | Dr. Anita Joshi | `mentor@ranbidge.com` | `[MENTOR_PASSKEY]` | Learning & Development | ₹2,50,000 |
| **14** | `EMP-014` | **Employee** | Rahul Verma | `employee@ranbidge.com` | `[EMP_PASSKEY]` | Software Engineering | ₹95,000 |
| **15** | `EMP-015` | **Intern** | Neha Kapoor | `intern@ranbidge.com` | `[INTERN_PASSKEY]` | Software Engineering | ₹35,000 |

---

## 🏛️ Role Classifications & Access Scopes

### 1. Executive Suite (`Super Admin`, `CEO`, `CFO`, `CTO`, `COO`, `CMO`)
- **Super Admin (`EMP-001`)**: Full system-wide master control, database seeding, audit log inspection, and complete management across all 15 roles. *(Note: Hidden from directory grids on other role views).*
- **CEO (`EMP-002`)**: Corporate leadership dashboard, strategy KPI governance, executive document access, and high-level team monitoring.
- **CFO (`EMP-003`)**: Complete financial governance, budget tracking, payroll processing, tax compliance, and payroll slip generation.
- **CTO (`EMP-004`)**: Engineering architecture control, AI Co-Pilot model allocations, technology sprint oversight, and technical mentorship rules.
- **COO (`EMP-005`)**: Global operations management, resource optimization, team leadership tracking, and operational milestones.
- **CMO (`EMP-006`)**: Growth strategy, brand marketing campaigns, company announcements broadcasting, and public communication vault access.

- **HR (`EMP-007`)**: Employee directory management (excluding self card), leave request approvals, biometric attendance oversight, candidate onboarding, compliance records, full authority to create projects & teams, allot Mentors & Guides to research/engineering teams & projects, and assign Interns to projects.
- **Manager (`EMP-008`)**: Departmental operations, sprint task assignment, leave approvals for team members, and performance KPI reviews.
- **Project Manager (`EMP-009`)**: Project engineering management, sprint scheduling, milestone progress tracking, and developer task allocation.

### 3. Lead & Specialist Layer (`Team Lead`, `Social Media Manager`, `Guide`, `Mentor`)
- **Team Lead (`EMP-010`)**: Technical sprint execution, task assignment, code review, team chat channels, and daily developer standups.
- **Social Media Manager (`EMP-011`)**: Social media campaign tasks, digital marketing announcements, brand asset storage, and community communications.
- **Guide (`EMP-012`)**: User guidance, technical support workflows, customer success onboarding, and documentation.
- **Mentor (`EMP-013`)**: Academic research, employee skill training, intern evaluations, and technical mentorship.

### 4. Workforce Layer (`Employee`, `Intern`)
- **Employee (`EMP-014`)**: Personal task console, project milestone participation, biometric/GPS check-in, leave application submission, and personal payslips.
- **Intern (`EMP-015`)**: Specialized workspace view (Employees tab hidden in sidebar); full access to assigned Projects displaying project timeline & duration, team members, allotted Mentor (`EMP-013` / Dr. Anita Joshi) & Guide (`EMP-012` / Suresh Reddy), and interactive direct/channel access to chat with them in **Teams & Chat**.

---

## 📁 Doc Vault Access Security Clearance Matrix

| Document Category | Executive Suite | HR Lead | Managers & PMs | Workforce (Employees & Interns) |
| :--- | :---: | :---: | :---: | :---: |
| **All Vault Documents** | 🔓 Full View & Upload/Delete | 🔒 Filtered View | 🔒 Filtered View | 🔒 Filtered View |
| **HR Handbooks & Policies** | ✅ Accessible | ✅ Accessible | ✅ Accessible | ✅ Accessible |
| **EPF & Statutory Schemes** | ✅ Accessible | ✅ Accessible | ❌ Restricted | ✅ Accessible |
| **SOW & Client Agreements** | ✅ Accessible | ❌ Restricted | ✅ Accessible | ❌ Restricted |
| **Product Blueprints** | ✅ Accessible | ❌ Restricted | ✅ Accessible | ❌ Restricted |
| **Executive Reports** | ✅ Accessible | ❌ Restricted | ❌ Restricted | ❌ Restricted |

---

## 🗄️ Turso Database Schema Names

```sql
-- Employees Registry Table
CREATE TABLE IF NOT EXISTS employees (
  id TEXT PRIMARY KEY,           -- e.g. 'EMP-001'
  name TEXT NOT NULL,            -- Full Name
  email TEXT,                    -- Work Email
  role TEXT,                     -- Employment Type
  department TEXT,               -- Department Name
  designation TEXT,              -- Official Title / Role
  joiningDate TEXT,              -- Date of Joining
  status TEXT,                   -- 'Active' | 'Inactive'
  salary REAL,                   -- Monthly Base Salary
  skills TEXT,                   -- JSON Array of Skills
  avatar TEXT                    -- Full JSON Payload / Photo URL
);

-- Doc Vault Storage Table
CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,           -- e.g. 'DOC-001'
  name TEXT NOT NULL,            -- Document Title
  category TEXT,                 -- Category (e.g. 'HR Handbooks', 'SOW')
  path TEXT,                     -- Document URL / Path
  size TEXT,                     -- File Size (e.g. '2.4 MB')
  uploader TEXT,                 -- Uploader Name & Role
  uploadedAt TEXT,               -- Upload Date
  version TEXT,                  -- Version Tag (e.g. 'v1.0')
  allowedRoles TEXT              -- JSON Array of Clearance Roles
);
```

---

© 2026 **RANBIDGE Solutions Private Limited**. Enterprise Work Space Portal.
