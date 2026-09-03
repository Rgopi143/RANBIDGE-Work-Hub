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
let isConnected = false;
let connectionError: string | null = null;

export function getDbClient(): Client {
  if (!client) {
    // If url starts with file: or is local, token might not be needed.
    // For remote libsql:// turso url, client is initialized with url & authToken
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
    isConnected = true;
    connectionError = null;
    return { connected: true, error: null, url: TURSO_URL };
  } catch (err: any) {
    isConnected = false;
    connectionError = err.message || "Failed to connect to Turso DB";
    return { connected: false, error: connectionError, url: TURSO_URL };
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
      joinDate TEXT,
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
