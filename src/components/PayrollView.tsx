/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Employee } from '../types';
import {
  CreditCard,
  Printer,
  FileSpreadsheet,
  Download,
  Percent,
  Calculator,
  X,
  Building
} from 'lucide-react';

export default function PayrollView() {
  const {
    currentRole,
    employees,
    attendance
  } = useWorkspace();

  const [activePayrollMonth, setActivePayrollMonth] = useState('May 2026');
  const [selectedPayslipEmp, setSelectedPayslipEmp] = useState<Employee | null>(null);

  // Filter out individuals depending on status
  const salaryLogs = employees.filter(emp => emp.status === 'Active');

  const openPayslip = (emp: Employee) => {
    setSelectedPayslipEmp(emp);
  };

  // Tax calculations
  const calculatePayslipBreakdown = (baseSalary: number) => {
    // allowances
    const hra = Math.floor(baseSalary * 0.4);
    const conveyance = 1600;
    const medical = 1250;
    const grossSalary = baseSalary + hra + conveyance + medical;

    // deductions
    const pf = Math.floor(baseSalary * 0.12);
    const profTax = 200;
    const tds = Math.floor(baseSalary * 0.05);
    const totalDeductions = pf + profTax + tds;

    const netSalary = grossSalary - totalDeductions;

    return {
      hra,
      conveyance,
      medical,
      grossSalary,
      pf,
      profTax,
      tds,
      totalDeductions,
      netSalary
    };
  };

  const handlePrint = () => {
    window.print();
  };

  const hasHRAccess = ['Super Admin', 'CEO', 'CFO', 'HR', 'Manager'].includes(currentRole);

  return (
    <div className="space-y-6 text-[#1A1A1A]">

      {/* Main ledger directory banner */}
      <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-2 flex-wrap gap-2">
          <div>
            <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider font-semibold">Company Payroll & Salaries Ledger</h3>
            <p className="text-[10px] text-[#8C8984] font-mono uppercase">Automatic allowances & statutory EPF deductions calculations</p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={activePayrollMonth}
              onChange={e => setActivePayrollMonth(e.target.value)}
              className="bg-[#F2F0ED] border border-[#E5E2DE] text-xs rounded-none px-3 py-1.5 cursor-pointer text-[#1A1A1A] font-mono focus:outline-none focus:border-[#1A1A1A]"
            >
              <option value="May 2026">May 2026</option>
              <option value="April 2026">April 2026</option>
              <option value="March 2026">March 2026</option>
            </select>
            <button className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] uppercase tracking-wider font-bold inline-flex items-center space-x-1.5 border border-[#E5E2DE] rounded-none cursor-pointer">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Export Bank CSV</span>
            </button>
          </div>
        </div>

        {/* Ledger table */}
        {!hasHRAccess ? (
          <div className="p-6 bg-[#F2F0ED] border border-[#E5E2DE] rounded-none text-center text-xs text-[#8C8984] font-mono">
            ⚠️ Simulated role <span className="font-bold text-[#1A1A1A]">{currentRole}</span> lacks HR payroll ledger authorization scopes.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1A1A1A] border-collapse bg-white">
              <thead>
                <tr className="border-b border-[#E5E2DE] text-[10px] font-bold text-[#8C8984] uppercase tracking-wider bg-[#FDFCFB] font-mono font-semibold">
                  <th className="py-3 px-4">EMPLOYEE DETAILS</th>
                  <th className="py-3 px-4">DEPT</th>
                  <th className="py-3 px-4">BASE SALARY</th>
                  <th className="py-3 px-4">ESTIMATED NET</th>
                  <th className="py-3 px-4">PAYSLIPS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DE] font-mono">
                {salaryLogs.map(emp => {
                  const numbers = calculatePayslipBreakdown(emp.salary);
                  return (
                    <tr key={emp.id} className="hover:bg-[#F2F0ED]/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#1A1A1A] font-sans">
                        {emp.name} <span className="text-[10px] font-mono font-medium text-[#8C8984]">({emp.id})</span>
                      </td>
                      <td className="py-3.5 px-4 font-sans text-[#8C8984] uppercase text-[10.5px]">{emp.department}</td>
                      <td className="py-3.5 px-4">INR {emp.salary.toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-[#1A1A1A] font-bold">INR {numbers.netSalary.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => openPayslip(emp)}
                          className="px-3 py-1.5 rounded-none bg-white font-mono font-bold text-[#1A1A1A] border border-[#E5E2DE] hover:bg-[#F2F0ED] text-[10px] uppercase tracking-wider cursor-pointer font-sans inline-flex items-center space-x-1"
                        >
                          <CreditCard className="h-3.5 w-3.5" />
                          <span>Generate Payslip</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Printed Payslip Modal */}
      {selectedPayslipEmp && (() => {
        const breakdown = calculatePayslipBreakdown(selectedPayslipEmp.salary);
        return (
          <div className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-[#FDFCFB] rounded-none w-full max-w-2xl border border-[#E5E2DE] overflow-hidden shadow-2xl flex flex-col p-6 space-y-6">
              
              {/* Controls bar */}
              <div className="flex justify-between items-center pb-3 border-b border-[#E5E2DE] shrink-0">
                <span className="text-[10px] font-bold text-[#8C8984] uppercase tracking-wider font-mono">Statutory Pay Record Console</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrint}
                    className="p-1 px-3 bg-[#F2F0ED] text-[#1A1A1A] hover:bg-[#E5E2DE] border border-[#E5E2DE] rounded-none text-[10px] uppercase tracking-wider font-mono font-bold transition-all cursor-pointer flex items-center space-x-1"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print Payslip</span>
                  </button>
                  <button onClick={() => setSelectedPayslipEmp(null)} className="p-1 bg-[#F2F0ED] border border-[#E5E2DE] text-[#8C8984] hover:text-[#1A1A1A] rounded-none cursor-pointer">
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {/* Printable Body structure */}
              <div id="print-sheet" className="p-6 border border-[#E5E2DE] rounded-none space-y-6 bg-white font-sans text-xs select-text text-[#1A1A1A]">
                {/* Brand header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-base font-bold text-[#1A1A1A] font-mono leading-none tracking-tight uppercase">RANBIDGE Solutions Private Limited</h2>
                    <p className="text-[10px] text-[#8C8984] mt-1 font-mono uppercase">Regd Office: Prestige Tech Park, Outer Ring Rd, Bengaluru-560103</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Monthly Payslip</h3>
                    <p className="text-[10px] font-mono text-[#8C8984] uppercase mt-0.5">{activePayrollMonth}</p>
                  </div>
                </div>

                {/* Person details */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-dashed border-[#E5E2DE] py-3.5 leading-relaxed bg-[#FDFCFB] px-4 rounded-none">
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Employee Name: <span className="font-bold">{selectedPayslipEmp.name}</span></p>
                    <p className="font-medium text-[#8C8984]">Designation: {selectedPayslipEmp.designation}</p>
                    <p className="font-medium text-[#8C8984]">Department: {selectedPayslipEmp.department}</p>
                  </div>
                  <div className="text-right font-mono">
                    <p className="font-medium text-[#8C8984] font-sans">Employee ID: {selectedPayslipEmp.id}</p>
                    <p className="font-medium text-[#8C8984]">PAN State: <span className="text-[#1A1A1A]">APXRP6392M</span></p>
                    <p className="font-medium text-[#8C8984] font-sans">Payment Mode: Direct Bank ECS Transfer</p>
                  </div>
                </div>

                {/* Earnings & Deductions Calculations table grid layout */}
                <div className="grid grid-cols-2 gap-8">
                  {/* Earnings Left */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-[#8C8984] uppercase tracking-wider font-mono border-b border-[#E5E2DE] pb-1 flex items-center justify-between">
                      <span>A. Earnings</span>
                      <span>INR</span>
                    </h4>
                    <div className="space-y-2 text-[#1A1A1A] font-mono">
                      <div className="flex justify-between">
                        <span className="font-sans text-[#8C8984]">Basic Salary (LOP Deductible)</span>
                        <span>INR {selectedPayslipEmp.salary.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-sans text-[#8C8984]">House Rent Allowance (HRA)</span>
                        <span>INR {breakdown.hra.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-sans text-[#8C8984]">Conveyance Allowance</span>
                        <span>INR {breakdown.conveyance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-sans text-[#8C8984]">Medical Insurance Premium</span>
                        <span>INR {breakdown.medical.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold border-t border-[#E5E2DE] pt-2 text-[#1A1A1A] bg-[#F2F0ED] p-1 px-1.5 rounded-none font-mono">
                        <span className="font-sans uppercase text-[10px]">Gross Salary Earnings (A)</span>
                        <span>INR {breakdown.grossSalary.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deductions Right */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-[#8C8984] uppercase tracking-wider font-mono border-b border-[#E5E2DE] pb-1 flex items-center justify-between">
                      <span>B. Deductions</span>
                      <span>INR</span>
                    </h4>
                    <div className="space-y-2 text-[#1A1A1A] font-mono">
                      <div className="flex justify-between">
                        <span className="font-sans text-[#8C8984]">Employee Provident Fund (12% EPF)</span>
                        <span>INR {breakdown.pf.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-sans text-[#8C8984]">Professional Tax (PT)</span>
                        <span>INR {breakdown.profTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-sans text-[#8C8984]">Tax Deducted at Source (TDS 5%)</span>
                        <span>INR {breakdown.tds.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold border-t border-[#E5E2DE] pt-2 text-[#1A1A1A] bg-[#F2F0ED] p-1 px-1.5 rounded-none font-mono">
                        <span className="font-sans uppercase text-[10px]">Total Deductions (B)</span>
                        <span>INR {breakdown.totalDeductions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final calculated payouts */}
                <div className="p-4 bg-[#F2F0ED] border border-[#E5E2DE] rounded-none flex items-center justify-between flex-wrap gap-2">
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">C. NET TAKE-HOME PAYOUT (A - B)</h3>
                    <p className="text-[10px] text-[#8C8984] font-mono uppercase">Disbursed on 28th of the month via HDFC Corporate bank transfer</p>
                  </div>
                  <h2 className="text-lg font-bold text-[#1A1A1A] font-mono">
                    INR {breakdown.netSalary.toLocaleString()}/-
                  </h2>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
