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
    );`
  ];

  for (const query of createTablesQueries) {
    await db.execute(query);
  }
  console.log("✅ Turso / libSQL Database schema initialized successfully.");
}

export async function getAllDbData() {
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

  return {
    employees: employeesRes.rows,
    teams: teamsRes.rows,
    projects: projectsRes.rows,
    tasks: tasksRes.rows,
    attendance: attendanceRes.rows,
    leaves: leavesRes.rows,
    payroll: payrollRes.rows,
    kpis: kpisRes.rows,
    announcements: announcementsRes.rows,
  };
}

export async function upsertEmployee(emp: any) {
  const db = getDbClient();
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
      emp.photo || emp.avatar || ''
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
  await db.execute({
    sql: `INSERT OR REPLACE INTO tasks (id, title, description, status, priority, assignedEmployeeId, assignedEmployeeName, projectId, projectName, deadline, tags, comments)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      task.id,
      task.title || task.name || 'Untitled Task',
      task.description || '',
      task.status || 'To Do',
      task.priority || 'Medium',
      task.assignedEmployeeId || '',
      task.assignedEmployeeName || '',
      task.projectId || '',
      task.projectName || '',
      task.deadline || '',
      typeof task.tags === 'string' ? task.tags : (task.tags || []).join(','),
      typeof task.comments === 'string' ? task.comments : JSON.stringify(task.comments || [])
    ]
  });
}

export async function deleteTaskDb(id: string) {
  const db = getDbClient();
  await db.execute({ sql: `DELETE FROM tasks WHERE id = ?`, args: [id] });
}
