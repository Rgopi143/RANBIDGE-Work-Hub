/**
 * Turso / libSQL Database Connector & Schema Manager
 * RANBIDGE Solutions Private Limited
 */

import { createClient, Client } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const TURSO_URL = process.env.TURSO_DATABASE_URL || "libsql://ranbidge-workspace-rgopi143.aws-ap-south-1.turso.io";
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN || "";

let client: Client | null = null;

export function getDbClient(): Client {
  if (!client) {
    client = createClient({
      url: TURSO_URL,
      authToken: TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

export async function testDbConnection(): Promise<{ connected: boolean; error: string | null; url: string }> {
  try {
    const db = getDbClient();
    await db.execute("SELECT 1");
    return { connected: true, error: null, url: TURSO_URL };
  } catch (err: any) {
    return { connected: false, error: err.message || "Failed to connect to Turso DB", url: TURSO_URL };
  }
}

export async function initializeDatabaseSchema(): Promise<void> {
  const db = getDbClient();

  const createTablesQueries = [
    `CREATE TABLE IF NOT EXISTS employees (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      role TEXT,
      department TEXT,
      designation TEXT,
      joiningDate TEXT,
      status TEXT,
      salary REAL,
      skills TEXT,
      avatar TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS teams (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      department TEXT,
      leadId TEXT,
      leadName TEXT,
      memberCount INTEGER,
      projectCount INTEGER,
      description TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      client TEXT,
      department TEXT,
      status TEXT,
      progress INTEGER,
      startDate TEXT,
      deadline TEXT,
      budget REAL,
      teamId TEXT,
      description TEXT,
      files TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT,
      priority TEXT,
      assignedEmployeeId TEXT,
      assignedEmployeeName TEXT,
      projectId TEXT,
      projectName TEXT,
      deadline TEXT,
      tags TEXT,
      comments TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS attendance (
      id TEXT PRIMARY KEY,
      employeeId TEXT,
      employeeName TEXT,
      date TEXT,
      checkInTime TEXT,
      checkOutTime TEXT,
      status TEXT,
      workingHours REAL,
      location TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS leaves (
      id TEXT PRIMARY KEY,
      employeeId TEXT,
      employeeName TEXT,
      type TEXT,
      startDate TEXT,
      endDate TEXT,
      reason TEXT,
      status TEXT,
      appliedOn TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS payroll (
      id TEXT PRIMARY KEY,
      employeeId TEXT,
      employeeName TEXT,
      month TEXT,
      basicSalary REAL,
      allowances REAL,
      deductions REAL,
      netSalary REAL,
      status TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS kpis (
      id TEXT PRIMARY KEY,
      employeeId TEXT,
      employeeName TEXT,
      period TEXT,
      score REAL,
      tasksCompleted INTEGER,
      qualityRating REAL,
      feedback TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      category TEXT,
      author TEXT,
      date TEXT,
      priority TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      role TEXT NOT NULL,
      text TEXT NOT NULL,
      time TEXT,
      icon TEXT,
      color TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS meta_config (
      key TEXT PRIMARY KEY,
      value TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT,
      path TEXT,
      size TEXT,
      uploader TEXT,
      uploadedAt TEXT,
      version TEXT,
      allowedRoles TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      teamId TEXT NOT NULL,
      senderId TEXT NOT NULL,
      senderName TEXT NOT NULL,
      senderRole TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp TEXT NOT NULL
    );`
  ];

  for (const query of createTablesQueries) {
    await db.execute(query);
  }

  // Seed/Sync all 15 initial employee role accounts into Turso DB
    const { INITIAL_EMPLOYEES, INITIAL_TASKS, INITIAL_TEAMS, INITIAL_PROJECTS, INITIAL_DOCUMENTS, INITIAL_CHAT } = await import('./src/data/mockData');
  const countCheck = await db.execute("SELECT COUNT(*) as count FROM employees");
  const currentCount = Number(countCheck.rows[0]?.count || 0);

  if (currentCount < INITIAL_EMPLOYEES.length) {
    console.log(`📦 Syncing missing role accounts (${currentCount}/${INITIAL_EMPLOYEES.length}) into Turso DB...`);
    for (const emp of INITIAL_EMPLOYEES) {
      await upsertEmployee(emp);
    }
  }

  const seedCheck = await db.execute("SELECT * FROM meta_config WHERE key = 'initial_seeded'");
  if (seedCheck.rows.length === 0) {
    for (const tsk of INITIAL_TASKS) {
      await upsertTask(tsk);
    }
    for (const tm of INITIAL_TEAMS) {
      await upsertTeam(tm);
    }
    for (const prj of INITIAL_PROJECTS) {
      await upsertProject(prj);
    }
    for (const doc of INITIAL_DOCUMENTS) {
      await upsertDocument(doc);
    }
    if (INITIAL_CHAT && Array.isArray(INITIAL_CHAT)) {
      for (const msg of INITIAL_CHAT) {
        await upsertChatMessage(msg);
      }
    }
    await db.execute({
      sql: "INSERT OR REPLACE INTO meta_config (key, value) VALUES ('initial_seeded', 'true')",
      args: []
    });
  }

  console.log("✅ Turso / libSQL Database schema initialized successfully.");
}

export async function getAllDbData() {
  const {
    INITIAL_EMPLOYEES,
    INITIAL_TEAMS,
    INITIAL_PROJECTS,
    INITIAL_TASKS,
    INITIAL_ATTENDANCE,
    INITIAL_LEAVES,
    INITIAL_PAYROLL,
    INITIAL_KPIS,
    INITIAL_ANNOUNCEMENTS,
    INITIAL_DOCUMENTS,
    INITIAL_CHAT
  } = await import('./src/data/mockData');

  try {
    const db = getDbClient();
    await initializeDatabaseSchema();

    const employeesRes = await db.execute("SELECT * FROM employees");
    const teamsRes = await db.execute("SELECT * FROM teams");
    const projectsRes = await db.execute("SELECT * FROM projects");
    const tasksRes = await db.execute("SELECT * FROM tasks");
    const attendanceRes = await db.execute("SELECT * FROM attendance");
    const leavesRes = await db.execute("SELECT * FROM leaves");
    const payrollRes = await db.execute("SELECT * FROM payroll");
    const kpisRes = await db.execute("SELECT * FROM kpis");
    const announcementsRes = await db.execute("SELECT * FROM announcements");
    const documentsRes = await db.execute("SELECT * FROM documents");
    const chatRes = await db.execute("SELECT * FROM chat_messages");

    const parsedEmployees = employeesRes.rows.map((row: any) => {
      if (row.avatar && typeof row.avatar === 'string' && row.avatar.startsWith('{')) {
        try {
          return JSON.parse(row.avatar);
        } catch (e) {}
      }
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        photo: row.avatar || '',
        gender: row.gender || 'Male',
        dob: row.dob || '1995-01-01',
        mobile: row.mobile || '',
        address: row.address || '',
        department: row.department || '',
        designation: row.designation || '',
        skills: typeof row.skills === 'string' ? (row.skills.startsWith('[') ? JSON.parse(row.skills) : row.skills.split(',')) : (row.skills || []),
        experience: row.experience || '1 Year',
        joiningDate: row.joiningDate || '',
        reportingManagerId: 'EMP-003',
        reportingManagerName: 'Amit Patel',
        salary: row.salary || 100000,
        shiftTiming: row.shiftTiming || '09:30 AM - 06:30 PM',
        employmentType: row.employmentType || 'Full-Time',
        status: row.status || 'Active',
        documents: typeof row.documents === 'string' ? (row.documents.startsWith('{') ? JSON.parse(row.documents) : {}) : (row.documents || {}),
        faceIdEnrollment: row.faceIdEnrollment || undefined
      };
    });

    const parsedTasks = tasksRes.rows.map((row: any) => {
      if (row.comments && typeof row.comments === 'string' && row.comments.startsWith('{')) {
        try {
          return JSON.parse(row.comments);
        } catch (e) {}
      }
      let parsedComments: any[] = [];
      if (row.comments && typeof row.comments === 'string' && row.comments.startsWith('[')) {
        try { parsedComments = JSON.parse(row.comments); } catch (e) {}
      }
      let parsedAttachments: any[] = [];
      if (row.tags && typeof row.tags === 'string') {
        if (row.tags.startsWith('[')) {
          try { parsedAttachments = JSON.parse(row.tags); } catch (e) {}
        } else {
          parsedAttachments = row.tags.split(',').filter(Boolean);
        }
      }
      return {
        id: row.id,
        name: row.title || row.name || 'Untitled Task',
        description: row.description || '',
        assignedEmployeeId: row.assignedEmployeeId || '',
        assignedEmployeeName: row.assignedEmployeeName || '',
        projectId: row.projectId || '',
        projectName: row.projectName || '',
        deadline: row.deadline || '',
        priority: row.priority || 'Medium',
        status: row.status || 'To Do',
        attachments: parsedAttachments,
        comments: parsedComments
      };
    });

    return {
      employees: parsedEmployees.length > 0 ? parsedEmployees : INITIAL_EMPLOYEES,
      teams: teamsRes.rows.length > 0 ? teamsRes.rows : INITIAL_TEAMS,
      projects: projectsRes.rows.length > 0 ? projectsRes.rows : INITIAL_PROJECTS,
      tasks: parsedTasks.length > 0 ? parsedTasks : INITIAL_TASKS,
      attendance: attendanceRes.rows.length > 0 ? attendanceRes.rows : INITIAL_ATTENDANCE,
      leaves: leavesRes.rows.length > 0 ? leavesRes.rows : INITIAL_LEAVES,
      payroll: payrollRes.rows.length > 0 ? payrollRes.rows : INITIAL_PAYROLL,
      kpis: kpisRes.rows.length > 0 ? kpisRes.rows : INITIAL_KPIS,
      announcements: announcementsRes.rows.length > 0 ? announcementsRes.rows : INITIAL_ANNOUNCEMENTS,
      documents: documentsRes.rows.length > 0 ? documentsRes.rows : INITIAL_DOCUMENTS,
      chatMessages: chatRes.rows.length > 0 ? chatRes.rows : INITIAL_CHAT
    };
  } catch (err) {
    console.warn("⚠️ Turso DB offline or fetch failed, returning initial state:", err);
    return {
      employees: INITIAL_EMPLOYEES,
      teams: INITIAL_TEAMS,
      projects: INITIAL_PROJECTS,
      tasks: INITIAL_TASKS,
      attendance: INITIAL_ATTENDANCE,
      leaves: INITIAL_LEAVES,
      payroll: INITIAL_PAYROLL,
      kpis: INITIAL_KPIS,
      announcements: INITIAL_ANNOUNCEMENTS,
      documents: INITIAL_DOCUMENTS,
      chatMessages: INITIAL_CHAT
    };
  }
}

export async function upsertDocument(doc: any) {
  const db = getDbClient();
  await db.execute({
    sql: `INSERT OR REPLACE INTO documents (id, name, category, path, size, uploader, uploadedAt, version, allowedRoles)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      doc.id,
      doc.name || '',
      doc.category || 'Reports',
      doc.path || '',
      doc.size || '1.0 MB',
      doc.uploader || 'System Admin',
      doc.uploadedAt || new Date().toISOString().split('T')[0],
      doc.version || 'v1.0',
      typeof doc.allowedRoles === 'string' ? doc.allowedRoles : JSON.stringify(doc.allowedRoles || [])
    ]
  });
}

export async function deleteDocumentDb(id: string) {
  const db = getDbClient();
  await db.execute({ sql: `DELETE FROM documents WHERE id = ?`, args: [id] });
}

export async function upsertEmployee(emp: any) {
  const db = getDbClient();
  const fullPayload = JSON.stringify(emp);
  await db.execute({
    sql: `INSERT OR REPLACE INTO employees (id, name, email, role, department, designation, joiningDate, status, salary, skills, avatar)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      emp.id,
      emp.name || '',
      emp.email || '',
      emp.role || emp.employmentType || 'Full-Time',
      emp.department || '',
      emp.designation || '',
      emp.joiningDate || emp.joinDate || '',
      emp.status || 'Active',
      emp.salary || 0,
      typeof emp.skills === 'string' ? emp.skills : JSON.stringify(emp.skills || []),
      fullPayload
    ]
  });
}

export async function deleteEmployeeDb(id: string) {
  const db = getDbClient();
  await db.execute({ sql: `DELETE FROM employees WHERE id = ?`, args: [id] });
}

export async function upsertTeam(team: any) {
  const db = getDbClient();
  await db.execute({
    sql: `INSERT OR REPLACE INTO teams (id, name, department, leadId, leadName, memberCount, projectCount, description)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      team.id,
      team.name || '',
      team.department || '',
      team.leadId || '',
      team.leadName || '',
      team.memberCount || 0,
      team.projectCount || 0,
      team.description || ''
    ]
  });
}

export async function deleteTeamDb(id: string) {
  const db = getDbClient();
  await db.execute({ sql: `DELETE FROM teams WHERE id = ?`, args: [id] });
}

export async function upsertProject(proj: any) {
  const db = getDbClient();
  await db.execute({
    sql: `INSERT OR REPLACE INTO projects (id, name, client, department, status, progress, startDate, deadline, budget, teamId, description, files)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      proj.id,
      proj.name || '',
      proj.client || '',
      proj.department || '',
      proj.status || 'In Progress',
      proj.progress || 0,
      proj.startDate || '',
      proj.deadline || '',
      proj.budget || 0,
      proj.teamId || '',
      proj.description || '',
      typeof proj.files === 'string' ? proj.files : JSON.stringify(proj.files || [])
    ]
  });
}

export async function deleteProjectDb(id: string) {
  const db = getDbClient();
  await db.execute({ sql: `DELETE FROM projects WHERE id = ?`, args: [id] });
}

export async function upsertTask(task: any) {
  const db = getDbClient();
  const fullPayload = JSON.stringify(task);
  await db.execute({
    sql: `INSERT OR REPLACE INTO tasks (id, title, description, status, priority, assignedEmployeeId, assignedEmployeeName, projectId, projectName, deadline, tags, comments)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      task.id,
      task.name || task.title || 'Untitled Task',
      task.description || '',
      task.status || 'To Do',
      task.priority || 'Medium',
      task.assignedEmployeeId || '',
      task.assignedEmployeeName || '',
      task.projectId || '',
      task.projectName || '',
      task.deadline || '',
      typeof task.attachments === 'string' ? task.attachments : JSON.stringify(task.attachments || task.tags || []),
      fullPayload
    ]
  });
}

export async function deleteTaskDb(id: string) {
  const db = getDbClient();
  await db.execute({ sql: `DELETE FROM tasks WHERE id = ?`, args: [id] });
}

export async function clearNotificationsForRoleDb(role: string) {
  const db = getDbClient();
  await initializeDatabaseSchema();
  await db.execute({
    sql: `DELETE FROM notifications WHERE role = ? OR role = 'ALL'`,
    args: [role]
  });
}

export async function getNotificationsByRoleDb(role: string) {
  const db = getDbClient();
  await initializeDatabaseSchema();
  const res = await db.execute({
    sql: `SELECT * FROM notifications WHERE role = ? OR role = 'ALL'`,
    args: [role]
  });
  return res.rows;
}

export async function upsertChatMessage(msg: any) {
  const db = getDbClient();
  await db.execute({
    sql: `INSERT OR REPLACE INTO chat_messages (id, teamId, senderId, senderName, senderRole, message, timestamp)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      msg.id,
      msg.teamId || '',
      msg.senderId || '',
      msg.senderName || '',
      msg.senderRole || '',
      msg.message || '',
      msg.timestamp || ''
    ]
  });
}

export async function deleteChatMessageDb(id: string) {
  const db = getDbClient();
  await db.execute({ sql: `DELETE FROM chat_messages WHERE id = ?`, args: [id] });
}
