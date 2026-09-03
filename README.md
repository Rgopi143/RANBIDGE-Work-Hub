# 🏢 RANBIDGE Solutions Private Limited - Work Space Portal

Welcome to the **RANBIDGE Work Space Portal**, an enterprise-grade cloud workspace management system featuring role-based authorization, employee management, project tracking, attendance, payroll, document vault, announcements, and AI Co-Pilot integration.

---

## 🔑 Role Credentials & Authorization Matrix

Select any role on the **Sign In** screen from the **Select Access Role / Account** dropdown menu to authenticate and access its dedicated workspace modules.

### Default Login Credentials

| Role | Work Email / ID | Default Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@ranbidge.com` | `••••••••••••` | Full Enterprise System Access |
| **CEO** (Chief Executive Officer) | `ceo@ranbidge.com` | `••••••••••••` | Full Executive & Strategic Governance |
| **CFO** (Chief Financial Officer) | `cfo@ranbidge.com` | `••••••••••••` | Full Financial, Payroll & Budget Control |
| **CTO** (Chief Technology Officer) | `cto@ranbidge.com` | `••••••••••••` | Full Engineering, Architecture & AI Access |
| **COO** (Chief Operating Officer) | `coo@ranbidge.com` | `••••••••••••` | Full Operations & Milestone Governance |
| **CMO** (Chief Marketing Officer) | `cmo@ranbidge.com` | `••••••••••••` | Full Marketing, Media & Announcements |
| **HR** (Human Resources Lead) | `hr@ranbidge.com` | `••••••••••••` | Full Employee, Leave & Payroll Control |
| **Manager** | `manager@ranbidge.com` | `••••••••••••` | Departmental & Team Management |
| **Project Manager** | `pm@ranbidge.com` | `••••••••••••` | Project Engineering & Sprint Console |
| **Team Lead** | `teamlead@ranbidge.com` | `••••••••••••` | Sprint Tasks & Team Performance |
| **Social Media Manager** | `smm@ranbidge.com` | `••••••••••••` | Marketing Media & Communication Vault |
| **Guide** | `guide@ranbidge.com` | `••••••••••••` | Technical Mentorship & Guidance |
| **Mentor** | `mentor@ranbidge.com` | `••••••••••••` | Employee & Intern Mentorship |
| **Employee** | `employee@ranbidge.com` | `••••••••••••` | Standard Workspace & Task Console |
| **Intern** | `intern@ranbidge.com` | `••••••••••••` | Intern Tasks & Attendance Console |

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
| **Employee Directory** | ✅ Add/Edit/Delete | ✅ Add/Edit/Delete | 👁️ Directory View | 👁️ Directory View |
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
