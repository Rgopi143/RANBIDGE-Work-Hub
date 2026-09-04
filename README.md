# 🏢 RANBIDGE Solutions Private Limited - Work Space Portal

Welcome to the **RANBIDGE Work Space Portal**, an enterprise-grade cloud workspace management system featuring role-based authorization, employee management, project tracking, attendance, payroll, document vault, announcements, and AI Co-Pilot integration.

---

## 🔑 Role Credentials & Authorization Matrix

Select any role on the **Sign In** screen from the **Select Access Role / Account** dropdown menu to authenticate and access its dedicated workspace modules.

### Default Login Credentials

| Employee ID | Role / Designation | Employee Name | Work Email | Passkey Clearance | Department | Access Level |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `EMP-001` | **Super Admin** | Rajesh Kumar | `admin@ranbidge.com` | `[SUPER_ADMIN_PASSKEY]` | Executive Administration | Full Enterprise Control |
| `EMP-002` | **CEO** | Ananya Sharma | `ceo@ranbidge.com` | `[CEO_PASSKEY]` | Executive Leadership | Strategic Governance |
| `EMP-003` | **CFO** | Vikramaditya Roy | `cfo@ranbidge.com` | `[CFO_PASSKEY]` | Finance & Compliance | Financial & Payroll Control |
| `EMP-004` | **CTO** | Siddharth Varma | `cto@ranbidge.com` | `[CTO_PASSKEY]` | Technology & R&D | Engineering & AI Architecture |
| `EMP-005` | **COO** | Meera Nambiar | `coo@ranbidge.com` | `[COO_PASSKEY]` | Global Operations | Operational Governance |
| `EMP-006` | **CMO** | Karan Malhotra | `cmo@ranbidge.com` | `[CMO_PASSKEY]` | Growth & Marketing | Branding & Announcements |
| `EMP-007` | **HR** | Pooja Hegde | `hr@ranbidge.com` | `[HR_PASSKEY]` | Human Resources | Employee, Leave & Payroll |
| `EMP-008` | **Manager** | Amit Patel | `manager@ranbidge.com` | `[MANAGER_PASSKEY]` | Product Operations | Departmental Management |
| `EMP-009` | **Project Manager** | Rohan Gupta | `pm@ranbidge.com` | `[PM_PASSKEY]` | Delivery Engineering | Projects & Sprint Console |
| `EMP-010` | **Team Lead** | Deepak Rao | `tl@ranbidge.com` | `[TL_PASSKEY]` | Software Engineering | Engineering Sprints & Tasks |
| `EMP-011` | **Social Media Manager** | Kakara Lavanya | `smm@ranbidge.com` | `[SMM_PASSKEY]` | Brand Marketing | Media & Communications |
| `EMP-012` | **Guide** | Suresh Reddy | `guide@ranbidge.com` | `[GUIDE_PASSKEY]` | Customer Success | Product Guidance & Support |
| `EMP-013` | **Mentor** | Dr. Anita Joshi | `mentor@ranbidge.com` | `[MENTOR_PASSKEY]` | Learning & Development | Mentorship & Technical Training |
| `EMP-014` | **Employee** | Rahul Verma | `employee@ranbidge.com` | `[EMP_PASSKEY]` | Software Engineering | Standard Workspace & Tasks |
| `EMP-015` | **Intern** | Neha Kapoor | `intern@ranbidge.com` | `[INTERN_PASSKEY]` | Software Engineering | Intern Console & Attendance |

---

## 🎯 Detailed Role Features & Responsibilities

### 👑 Executive Suite (`Super Admin`, `CEO`, `CFO`, `CTO`, `COO`, `CMO`)
- **System Governance**: Full administrative control over workspace settings, security rules, and user authorizations.
- **Executive Analytics**: Access to high-level organization KPIs, financial distribution charts, and project progress metrics.
- **Doc Vault & Announcements**: Capability to broadcast company-wide announcements and manage sensitive corporate documents.
- **Payroll & Financial Control**: `CFO` & `Super Admin` have full oversight over salary calculations, tax compliance, and payslips.
- **Technology & AI Systems**: `CTO` oversees AI performance analytics, model allocations, and engineering project sprints.

### 👔 Management (`HR`, `Manager`, `Project Manager`)
- **Employee Management**: Create, update, and manage employee profiles, departments, and designations.
- **Leave & Attendance Approvals**: Review and approve/reject leave applications and monitor real-time biometric/GPS attendance logs.
- **Payroll Management**: Generate monthly salary slips, process payouts, and manage bonus allocations.
- **Project Engineering**: Create client projects, allocate task workloads, and assign team leaders.

### 🚀 Lead & Specialist Support (`Team Lead`, `Social Media Manager`, `Guide`, `Mentor`)
- **Team Leadership & Chat**: Communicate in dedicated team chat channels and monitor milestone progress.
- **Task Management**: Assign sprint tasks to team members, add comments, and track task statuses (`To Do`, `Working`, `Completed`, `Delayed`).
- **Mentorship & Technical Guidance**: `Guide` and `Mentor` support employee onboarding, skill development, and intern evaluations.
- **Media & Announcements**: `Social Media Manager` manages corporate announcements, branding docs, and public communications.

### 💻 Operational Staff (`Employee`, `Intern`)
- **Personal Workspace**: Overview of assigned projects, pending tasks, and performance ratings.
- **Biometric & GPS Check-In**: Perform AI face-verification and GPS location-validated attendance check-ins/check-outs.
- **Leave Requests**: Apply for casual, sick, paid, or emergency leaves and track approval status.
- **Doc Vault & Chat**: View company policies, access project files, and participate in team discussions.

---

## 🎯 Feature Permissions Matrix

| Module / Feature | Executive Suite | HR & Managers | Leads & Support | Employees & Interns |
| :--- | :---: | :---: | :---: | :---: |
| **Dashboard & AI Analytics** | ✅ Full Access | ✅ Full Access | ✅ Full Access | ✅ Full Access |
| **Employee Directory** | ✅ Add/Edit/Delete | ✅ Add/Edit/Delete | 👁️ Directory View | 👁️ Employees (Excl. Intern) |
| **Teams & Real-time Chat** | ✅ Full Access | ✅ Full Access | ✅ Full Access | ✅ Full Access |
| **Projects & Sprints** | ✅ Full Access | ✅ Full Access | ✅ Full Access | ✅ Full Access |
| **Task Console** | ✅ Full Access | ✅ Full Access | ✅ Full Access | ✅ Full Access |
| **Biometric & GPS Attendance** | ✅ Full Access | ✅ Full Access | ✅ Full Access | ✅ Full Access |
| **Leave Management** | ✅ Approvals | ✅ Approvals | 📝 Apply Only | 📝 Apply Only |
| **Payroll & Slips** | ✅ Full Access | ✅ Full Access | 👁️ Own Payslips | 👁️ Own Payslips |
| **Performance & AI** | ✅ Full Access | ✅ Full Access | ✅ Full Access | ✅ Full Access |
| **Doc Vault System** | ✅ Upload/Delete | ✅ Upload/Delete | 👁️ Access | 👁️ Access |
| **Announcements** | ✅ Post/Delete | ✅ Post/Delete | 👁️ View | 👁️ View |
| **Enterprise Settings** | ✅ Config Access | ✅ Config Access | ❌ Restricted | ❌ Restricted |
| **RAN Co-Pilot AI** | ✅ Draggable Assistant | ✅ Draggable Assistant | ✅ Draggable Assistant | ✅ Draggable Assistant |

---

## 💻 Quick Start & Running the Application

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn package manager

### Installation Commands

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Web Workspace Portal**:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) in your browser.*

3. **Start Turso Database Server (Optional)**:
   ```bash
   npm run server
   ```

---

© 2026 **RANBIDGE Solutions Private Limited**. All Rights Reserved.
