/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  FileText,
  FolderDot,
  Upload,
  Clock,
  Briefcase,
  Layers,
  Search,
  CheckCircle,
  FileCheck2
} from 'lucide-react';

export default function DocumentsView() {
  const {
    currentRole,
    employees
  } = useWorkspace();

  const [activeFolder, setActiveFolder] = useState('All');
  const [docSearch, setDocSearch] = useState('');

  const folders = ['All', 'SOW Agreements', 'HR Handbooks', 'EPF Schemes', 'Product Blueprints'];

  // Mock static documents
  const sampleDocs = [
    { title: 'RANBIDGE_Offer_Letter_Master.dot', folder: 'HR Handbooks', size: '240 KB', ver: 'v2.1', user: 'Amit Patel' },
    { title: 'Prestige_Campus_SOW_Signed.pdf', folder: 'SOW Agreements', size: '2.4 MB', ver: 'v1.0', user: 'Super Admin' },
    { title: 'EPF_Provident_Fund_Rulebook_2026.pdf', folder: 'EPF Schemes', size: '1.1 MB', ver: 'v3.2', user: 'HR Department' },
    { title: 'RAN_Product_OS_Architectural_Schedules.pdf', folder: 'Product Blueprints', size: '6.8 MB', ver: 'v4.5', user: 'Rajesh Kumar' }
  ];

  const filteredDocs = sampleDocs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(docSearch.toLowerCase());
    const matchesFolder = activeFolder === 'All' || doc.folder === activeFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="space-y-6 text-[#1A1A1A]">

      {/* Directory Folder grid shortcuts */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {folders.map(folder => (
          <button
            key={folder}
            onClick={() => setActiveFolder(folder)}
            className={`p-4 rounded-none border transition-all text-left cursor-pointer flex flex-col justify-between h-28 hover:bg-[#F2F0ED] ${
              activeFolder === folder
                ? 'border-[#1A1A1A] bg-[#F2F0ED] ring-1 ring-[#1A1A1A]'
                : 'border-[#E5E2DE] bg-[#FDFCFB]'
            }`}
          >
            <FolderDot className={`h-6 w-6 shrink-0 ${activeFolder === folder ? 'text-[#1A1A1A]' : 'text-[#8C8984]'}`} />
            <div>
              <h4 className="text-xs font-bold text-[#1A1A1A] leading-tight uppercase font-mono">{folder === 'All' ? 'All Folders' : folder}</h4>
              <p className="text-[9.5px] text-[#8C8984] font-mono mt-0.5">Category directory</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Documents search listing */}
        <div className="lg:col-span-2 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-3 flex-wrap gap-2">
            <div>
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Secure Vault Ledger</h3>
              <p className="text-[10px] text-[#8C8984] font-mono uppercase">Corporate documents ledger versioning</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#8C8984]" />
              <input
                type="text"
                placeholder="Find archive..."
                value={docSearch}
                onChange={e => setDocSearch(e.target.value)}
                className="bg-[#F9F7F4] text-[11px] border border-[#E5E2DE] rounded-none pl-8 pr-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {filteredDocs.map((doc, idx) => (
              <div key={idx} className="p-3.5 bg-white border border-[#E5E2DE] rounded-none flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3.5 min-w-0">
                  <FolderDot className="h-5 w-5 text-[#1A1A1A] shrink-0" />
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="font-bold text-[#1A1A1A] truncate">{doc.title}</h4>
                    <span className="inline-flex px-1.5 py-0.5 bg-[#F2F0ED] border border-[#E5E2DE] text-[9px] font-mono font-bold text-[#1A1A1A] rounded-none">
                      Category: {doc.folder}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0 font-mono text-[11px] font-semibold text-[#1A1A1A]">
                  <div>
                    <span className="text-[#8C8984] block text-[8px] font-bold text-right uppercase leading-none">Size</span>
                    {doc.size}
                  </div>
                  <div>
                    <span className="text-[#8C8984] block text-[8px] font-bold text-right uppercase leading-none">Version</span>
                    {doc.ver}
                  </div>
                  <div>
                    <span className="text-[#8C8984] block text-[8px] font-bold text-right uppercase leading-none">Uploader</span>
                    {doc.user}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Audit policies checklist */}
        <div className="lg:col-span-1 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#E5E2DE] pb-3">
            <Layers className="h-4 w-4 text-[#1A1A1A]" />
            <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Governance & NDA Audits</h3>
          </div>

          <div className="space-y-3.5">
            <div className="p-3 bg-white border border-[#E5E2DE] rounded-none flex items-center justify-between text-[11px]">
              <div>
                <h4 className="font-bold text-[#1A1A1A]">SOC-2 Audit Schedule 2026</h4>
                <p className="text-[#8C8984] text-[10px] mt-0.5">NDA and policy signatures checklist</p>
              </div>
              <span className="px-1.5 py-0.5 bg-[#F2F0ED] text-[#1A1A1A] rounded-none text-[8.5px] font-mono font-bold uppercase tracking-wider border border-[#E5E2DE]">Audit Passed</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <span className="text-[10px] font-mono font-bold text-[#8C8984] block pb-1">Signature Trackers Checks</span>
              <div className="p-2.5 bg-white border border-[#E5E2DE] rounded-none flex items-center justify-between">
                <span className="font-semibold text-[#1A1A1A] font-mono">{sampleDocs[0].user || 'Principal Amit Patel'}</span>
                <span className="bg-[#F2F0ED] text-[#1A1A1A] border border-[#E5E2DE] px-1.5 py-0.5 rounded-none text-[8.5px] font-mono font-bold uppercase tracking-wider">DIGITAL NDA ACTIVE</span>
              </div>
              <div className="p-2.5 bg-white border border-[#E5E2DE] rounded-none flex items-center justify-between">
                <span className="font-semibold text-[#1A1A1A] font-mono">{sampleDocs[3].user || 'Senior Rajesh Kumar'}</span>
                <span className="bg-[#F2F0ED] text-[#1A1A1A] border border-[#E5E2DE] px-1.5 py-0.5 rounded-none text-[8.5px] font-mono font-bold uppercase tracking-wider">DIGITAL NDA ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
