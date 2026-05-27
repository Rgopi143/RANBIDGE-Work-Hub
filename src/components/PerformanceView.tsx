/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  Sparkles,
  BarChart,
  Target,
  FileCheck2,
  PieChart as PieIcon,
  HelpCircle,
  AlertCircle,
  ArrowRight,
  Send,
  TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import Markdown from 'react-markdown';

export default function PerformanceView() {
  const {
    currentRole,
    employees,
    tasks,
    teams,
    getAIAnalyticsReport
  } = useWorkspace();

  const [aiReportType, setAiReportType] = useState('Select Report Category');
  const [aiMarkdownResult, setAiMarkdownResult] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Pick a sample employee for skill radar (e.g. Rahul Verma or Amit Patel)
  const [activeRadarEmpId, setActiveRadarEmpId] = useState('EMP-001');

  const selectedEmpForRadar = employees.find(e => e.id === activeRadarEmpId) || employees[0];

  // Set up dynamic radar stats for employees
  const employeeMockKpis: { [key: string]: { subject: string; value: number }[] } = {
    'EMP-001': [
      { subject: 'AI Modelling', value: 95 },
      { subject: 'Task Delivery', value: 90 },
      { subject: 'Attendance rate', value: 98 },
      { subject: 'Team Sync', value: 85 },
      { subject: 'Code Cleanliness', value: 92 }
    ],
    'EMP-002': [
      { subject: 'React Frontend', value: 92 },
      { subject: 'Task Delivery', value: 85 },
      { subject: 'Attendance rate', value: 96 },
      { subject: 'Team Sync', value: 90 },
      { subject: 'Design Accuracy', value: 94 }
    ],
    'EMP-003': [
      { subject: 'Product Mapping', value: 88 },
      { subject: 'Task Delivery', value: 94 },
      { subject: 'Attendance rate', value: 95 },
      { subject: 'Team Sync', value: 98 },
      { subject: 'Systems Architecture', value: 90 }
    ],
    'EMP-005': [
      { subject: 'Sprint Operations', value: 80 },
      { subject: 'Task Delivery', value: 75 },
      { subject: 'Attendance rate', value: 92 },
      { subject: 'Team Sync', value: 88 },
      { subject: 'Cloud Deployment', value: 70 }
    ]
  };

  // Set up 6-month historical KPI records for line chart visualizer
  const employeeKpiHistory: { [key: string]: { month: string; score: number }[] } = {
    'EMP-001': [
      { month: 'Dec 2025', score: 88 },
      { month: 'Jan 2026', score: 91 },
      { month: 'Feb 2026', score: 94 },
      { month: 'Mar 2026', score: 93 },
      { month: 'Apr 2026', score: 95 },
      { month: 'May 2026', score: 96 }
    ],
    'EMP-002': [
      { month: 'Dec 2025', score: 85 },
      { month: 'Jan 2026', score: 87 },
      { month: 'Feb 2026', score: 89 },
      { month: 'Mar 2026', score: 88 },
      { month: 'Apr 2026', score: 92 },
      { month: 'May 2026', score: 91 }
    ],
    'EMP-003': [
      { month: 'Dec 2025', score: 78 },
      { month: 'Jan 2026', score: 82 },
      { month: 'Feb 2026', score: 85 },
      { month: 'Mar 2026', score: 89 },
      { month: 'Apr 2026', score: 92 },
      { month: 'May 2026', score: 94 }
    ],
    'EMP-004': [
      { month: 'Dec 2025', score: 82 },
      { month: 'Jan 2026', score: 84 },
      { month: 'Feb 2026', score: 83 },
      { month: 'Mar 2026', score: 87 },
      { month: 'Apr 2026', score: 89 },
      { month: 'May 2026', score: 90 }
    ],
    'EMP-005': [
      { month: 'Dec 2025', score: 70 },
      { month: 'Jan 2026', score: 72 },
      { month: 'Feb 2026', score: 75 },
      { month: 'Mar 2026', score: 74 },
      { month: 'Apr 2026', score: 79 },
      { month: 'May 2026', score: 81 }
    ]
  };

  const getEmployeeKpiHistory = (empId: string) => {
    return employeeKpiHistory[empId] || [
      { month: 'Dec 2025', score: 80 },
      { month: 'Jan 2026', score: 82 },
      { month: 'Feb 2026', score: 81 },
      { month: 'Mar 2026', score: 85 },
      { month: 'Apr 2026', score: 87 },
      { month: 'May 2026', score: 89 }
    ];
  };

  const selectedEmp = employees.find(e => e.id === activeRadarEmpId) || employees[0];
  const historyData = getEmployeeKpiHistory(selectedEmp?.id || 'EMP-001');

  // Compute 6-month metrics
  const aprScore = historyData[4]?.score || 80;
  const mayScore = historyData[5]?.score || 80;
  const momChange = mayScore - aprScore;
  const momSign = momChange >= 0 ? '+' : '';
  const averageScore = Math.round((historyData.reduce((acc, cr) => acc + cr.score, 0) / historyData.length) * 10) / 10;
  const peakScore = Math.max(...historyData.map(d => d.score));
  const minScore = Math.min(...historyData.map(d => d.score));

  const CustomKpiTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FDFCFB] border border-[#E5E2DE] p-3 text-xs space-y-1.5 shadow-md rounded-none font-sans text-[#1A1A1A]">
          <p className="font-bold text-xs text-[#1A1A1A] border-b border-[#E5E2DE] pb-1">{data.month}</p>
          <div>
            <span className="text-[#8C8984] font-mono text-[9px] block font-bold uppercase tracking-wider">MONTHLY KPI SCORE</span>
            <span className="font-extrabold text-[#1A1A1A] text-sm">{data.score} / 100</span>
          </div>
          <div>
            <span className="text-[#8C8984] font-mono text-[9px] block font-bold uppercase tracking-wider">STATUS STATUS</span>
            <span className={`inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wide border mt-0.5 ${
              data.score >= 90
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : data.score >= 80
                ? 'bg-[#F2F0ED] text-[#1A1A1A] border-[#E5E2DE]'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {data.score >= 90 ? 'Outstanding' : data.score >= 80 ? 'Satisfactory' : 'Needs Focus'}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const currentRadarData = employeeMockKpis[selectedEmpForRadar?.id] || [
    { subject: 'App Scope Delivery', value: 85 },
    { subject: 'Attendance integrity', value: 90 },
    { subject: 'Team Cooperativeness', value: 80 }
  ];

  const handleTriggerAIAnalytics = async (reportType: string) => {
    setIsAiLoading(true);
    setAiReportType(reportType);
    setAiMarkdownResult('Co-Pilot synthesizing team capacity, sprint delays, and current logs...');

    // Context api Express proxy lookup
    const response = await getAIAnalyticsReport(reportType);
    setAiMarkdownResult(response);
    setIsAiLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#1A1A1A]">

        {/* Skills radar visualization and individual KPI metrics */}
        <div className="lg:col-span-1 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#E5E2DE] pb-3 justify-between">
              <div className="flex items-center space-x-1.5">
                <Target className="h-4 w-4 text-[#1A1A1A]" />
                <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Biometric & Skill Matrix</h3>
              </div>
              <select
                value={activeRadarEmpId}
                onChange={e => setActiveRadarEmpId(e.target.value)}
                className="bg-[#F2F0ED] text-[10px] font-bold text-[#1A1A1A] border border-[#E5E2DE] rounded-none px-2.5 py-1.5 max-w-[130px] font-mono focus:outline-none"
              >
                {employees.slice(0, 5).map(e => (
                  <option key={e.id} value={e.id}>{e.name.split(' ')[0]}</option>
                ))}
              </select>
            </div>

            {/* Recharts radar chart */}
            <div className="w-full h-56 select-none flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={currentRadarData}>
                  <PolarGrid stroke="#E5E2DE" />
                  <PolarAngleAxis dataKey="subject" fontSize={8.5} tick={{ fill: '#1A1A1A', fontWeight: 'bold', fontFamily: 'monospace' }} />
                  <PolarRadiusAxis fontSize={8} tick={{ fill: '#8C8984' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ fontSize: '11px', background: '#FDFCFB', border: '1px solid #E5E2DE', borderRadius: '0px', fontFamily: 'monospace' }} />
                  <Radar name="Scoring Profile" dataKey="value" stroke="#1A1A1A" fill="#1A1A1A" fillOpacity={0.15} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic target KPIs block */}
          <div className="space-y-2 border-t border-[#E5E2DE] pt-4">
            <span className="text-[9px] font-mono font-bold text-[#8C8984] uppercase tracking-wider">Competence Scoring Summary</span>
            <div className="grid grid-cols-2 gap-3 text-[11px] font-medium font-mono">
              <div className="p-3 bg-[#F2F0ED] border border-[#E5E2DE] rounded-none space-y-1">
                <span className="text-[#8C8984] block text-[8px] font-bold uppercase">COMMITTED TASKS</span>
                <span className="text-[#1A1A1A] font-bold">98% Success</span>
              </div>
              <div className="p-3 bg-[#F2F0ED] border border-[#E5E2DE] rounded-none space-y-1">
                <span className="text-[#8C8984] block text-[8px] font-bold uppercase">ATTENDANCE LEVEL</span>
                <span className="text-[#1A1A1A] font-bold">96.8% Office</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Column - Operations Central AI Analyst Markdown Report panel */}
        <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#1A1A1A] rounded-none p-5 flex flex-col h-[480px] text-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 shrink-0">
            <div className="flex items-center space-x-2">
              <div className="p-1 px-2.5 bg-white/10 text-white rounded-none text-[9px] font-mono font-bold border border-white/20 uppercase tracking-widest">
                ⚡ LIVE OPS AUDITOR
              </div>
              <h3 className="text-xs font-bold text-white tracking-widest uppercase font-mono">Executive AI Copilot Analyst</h3>
            </div>
            <Sparkles className="h-4 w-4 text-white" />
          </div>

          {/* Quick Audits trigger strip bar */}
          <div className="flex items-center space-x-2 shrink-0 overflow-x-auto pb-3 border-b border-white/10 whitespace-nowrap scrollbar-none">
            <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider font-bold mr-1.5">Diagnostic Tools:</span>
            <button
              onClick={() => handleTriggerAIAnalytics('Execute Sprint Delayed Risks Audit Report')}
              className={`px-3 py-1.5 rounded-none text-[10px] font-bold font-mono uppercase tracking-wider cursor-pointer transition-all border ${
                aiReportType === 'Execute Sprint Delayed Risks Audit Report'
                  ? 'bg-white text-[#1A1A1A] border-white'
                  : 'bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white'
              }`}
            >
              "Analyze Delayed Risks"
            </button>
            <button
              onClick={() => handleTriggerAIAnalytics('Assess Team Capacity bottlenecks')}
              className={`px-3 py-1.5 rounded-none text-[10px] font-bold font-mono uppercase tracking-wider cursor-pointer transition-all border ${
                aiReportType === 'Assess Team Capacity bottlenecks'
                  ? 'bg-white text-[#1A1A1A] border-white'
                  : 'bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white'
              }`}
            >
              "Map Capacity Bottlenecks"
            </button>
          </div>

          {/* Output area containing the Markdown body format */}
          <div className="flex-1 overflow-y-auto pr-1 py-4 text-white/95">
            {!aiMarkdownResult ? (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="p-3 bg-white/10 border border-white/20 rounded-none flex items-center justify-center">
                  <BarChart className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white font-mono uppercase tracking-wider">Ready for Operations Synthesis</p>
                  <p className="text-[10px] text-white/50 max-w-sm mx-auto leading-relaxed uppercase font-mono">
                    Trigger diagnostic analytics models to audit live task backlogs, deliverability pipelines, and human resource parameters.
                  </p>
                </div>
              </div>
            ) : (
              <div className="markdown-body text-xs text-white/90 space-y-3 leading-relaxed select-text font-normal font-serif prose prose-invert max-w-none">
                <Markdown>{aiMarkdownResult}</Markdown>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Progression Trend Graph panel */}
      <div id="kpi-history-section" className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-6 space-y-5 text-[#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#E5E2DE] pb-4 gap-3">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-[#1A1A1A] font-mono tracking-wider uppercase">
              KPI Progression Trend &bull; {selectedEmp?.name || "Employee"}
            </h3>
            <p className="text-[10px] text-[#8C8984] font-mono">
              Plotting the 6-month historical progression of overall key evaluation metric indices.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-[#F2F0ED] border border-[#E5E2DE] p-1 px-3 text-[10px] font-mono font-bold text-[#1A1A1A] self-start sm:self-auto">
            <span className="text-[#8C8984] uppercase">Current Level:</span>
            <span className="text-emerald-700 font-extrabold">{mayScore}%</span>
          </div>
        </div>

        {/* Top-level statistic KPIs widgets */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#F9F7F4] border border-[#E5E2DE] p-4 space-y-1 text-left">
            <span className="text-[#8C8984] font-mono text-[9px] block font-bold uppercase tracking-wider">Historical peak</span>
            <span className="text-[#1A1A1A] font-extrabold text-base md:text-lg font-sans">{peakScore}%</span>
          </div>
          <div className="bg-[#F9F7F4] border border-[#E5E2DE] p-4 space-y-1 text-left">
            <span className="text-[#8C8984] font-mono text-[9px] block font-bold uppercase tracking-wider">HISTORICAL LOW</span>
            <span className="text-[#1A1A1A] font-extrabold text-base md:text-lg font-sans">{minScore}%</span>
          </div>
          <div className="bg-[#F9F7F4] border border-[#E5E2DE] p-4 space-y-1 text-left">
            <span className="text-[#8C8984] font-mono text-[9px] block font-bold uppercase tracking-wider">6-MONTH AVERAGE</span>
            <span className="text-[#1A1A1A] font-extrabold text-base md:text-lg font-sans">{averageScore}%</span>
          </div>
          <div className="bg-[#F9F7F4] border border-[#E5E2DE] p-4 space-y-1 text-left">
            <span className="text-[#8C8984] font-mono text-[9px] block font-bold uppercase tracking-wider">MOM MOMENTUM</span>
            <span className={`text-[12px] md:text-sm font-bold font-mono inline-flex items-center ${momChange >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
              <TrendingUp className={`h-3.5 w-3.5 mr-1 ${momChange >= 0 ? '' : 'rotate-180 text-rose-700'}`} />
              {momSign}{momChange} pts
            </span>
          </div>
        </div>

        {/* Recharts Line Chart Container */}
        <div className="w-full">
          <div style={{ minWidth: '100%', height: '240px' }} className="pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historyData}
                margin={{ top: 15, right: 30, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E2DE" />
                <XAxis
                  dataKey="month"
                  stroke="#8C8984"
                  fontSize={10}
                  fontFamily="monospace"
                  tickLine={false}
                />
                <YAxis
                  stroke="#8C8984"
                  fontSize={10}
                  fontFamily="monospace"
                  domain={[60, 100]}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomKpiTooltip />} cursor={{ stroke: '#1A1A1A', strokeWidth: 1, strokeDasharray: '2 2' }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#1A1A1A"
                  strokeWidth={2.5}
                  dot={{ r: 4, stroke: '#1A1A1A', strokeWidth: 1.5, fill: '#FDFCFB' }}
                  activeDot={{ r: 6, stroke: '#1A1A1A', strokeWidth: 2, fill: '#1A1A1A' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
