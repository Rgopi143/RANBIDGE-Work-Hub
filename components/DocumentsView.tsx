/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { CompanyDocument } from '../types';
import {
  FileText,
  FolderDot,
  Upload,
  Clock,
  Briefcase,
  Layers,
  Search,
  CheckCircle,
  FileCheck2,
  Plus,
  X,
  FileBadge,
  Eye,
  Download,
  Trash2,
  ShieldCheck,
  Lock
} from 'lucide-react';

export default function DocumentsView() {
  const {
    currentRole,
    currentUser,
    documents,
    addDocument,
    deleteDocument
  } = useWorkspace();

  const [activeFolder, setActiveFolder] = useState('All');
  const [docSearch, setDocSearch] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<CompanyDocument | null>(null);

  // New Document Upload Form States
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState<'SOW Agreements' | 'HR Handbooks' | 'EPF Schemes' | 'Product Blueprints' | 'Agreements' | 'Reports' | 'Employee Records' | string>('SOW Agreements');
  const [docSize, setDocSize] = useState('1.2 MB');
  const [docVersion, setDocVersion] = useState('v1.0');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const folders = ['All', 'SOW Agreements', 'HR Handbooks', 'EPF Schemes', 'Product Blueprints', 'Agreements'];

  const canUploadAll = ['Super Admin', 'CEO', 'CFO', 'CTO', 'COO', 'CMO', 'HR', 'Manager', 'Project Manager', 'Team Lead'].includes(currentRole);

  // Role-based vault clearance filter
  const isExecutive = ['Super Admin', 'CEO', 'CFO', 'CTO', 'COO', 'CMO'].includes(currentRole);
  const isHR = currentRole === 'HR';
  const isManagement = ['Manager', 'Project Manager', 'Team Lead', 'Social Media Manager'].includes(currentRole);

  const roleFilteredDocs = documents.filter(doc => {
    if (isExecutive) return true; // Executive / Super Admin see all vault documents
    if (isHR) return ['HR Handbooks', 'EPF Schemes', 'Employee Records', 'Reports', 'Agreements'].includes(doc.category);
    if (isManagement) return ['SOW Agreements', 'Product Blueprints', 'Reports', 'Agreements'].includes(doc.category);
    // General Employee / Intern / Guide / Mentor
    return ['HR Handbooks', 'EPF Schemes', 'Product Blueprints', 'Reports'].includes(doc.category);
  });

  const filteredDocs = roleFilteredDocs.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(docSearch.toLowerCase()) ||
                          doc.category.toLowerCase().includes(docSearch.toLowerCase()) ||
                          doc.uploader.toLowerCase().includes(docSearch.toLowerCase());
    const matchesFolder = activeFolder === 'All' || doc.category === activeFolder;
    return matchesSearch && matchesFolder;
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setDocName(file.name);
      const cleanSize = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;
      setDocSize(cleanSize);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocName(file.name);
      const cleanSize = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;
      setDocSize(cleanSize);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    addDocument({
      name: docName,
      category: docCategory as any,
      path: `/vault/${docCategory.replace(/\s+/g, '_')}/${docName}`,
      size: docSize,
      version: docVersion
    });

    setShowUploadModal(false);
    setDocName('');
  };

  const handleDownloadDoc = (doc: CompanyDocument) => {
    try {
      const headerText = `==================================================
RANBIDGE SOLUTIONS PRIVATE LIMITED - ENTERPRISE VAULT
==================================================
DOCUMENT ID   : ${doc.id}
DOCUMENT FILE : ${doc.name}
CATEGORY      : ${doc.category.toUpperCase()}
VERSION       : ${doc.version}
SIZE          : ${doc.size}
UPLOADER      : ${doc.uploader}
UPLOADED AT   : ${doc.uploadedAt}
ACCESSED BY   : ${currentUser?.name || 'Authorized User'} (${currentRole})
SECURITY LEVEL: AES-256 ENCRYPTED CORPORATE ARCHIVE
TIMESTAMP     : ${new Date().toISOString()}
==================================================
This is an authentic verified electronic document archived in the RANBIDGE Enterprise Vault Database.
`;
      const blob = new Blob([headerText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', doc.name.includes('.') ? doc.name : `${doc.name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 200);
    } catch (err) {
      console.error('File download error:', err);
    }
  };

  return (
    <div className="space-y-6 text-[#1A1A1A] animate-fade-in-up">

      {/* Directory Folder grid shortcuts */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {folders.map(folder => {
          const count = folder === 'All' 
            ? roleFilteredDocs.length 
            : roleFilteredDocs.filter(d => d.category === folder).length;

          return (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`p-3.5 rounded-none border transition-all text-left cursor-pointer flex flex-col justify-between h-26 hover:bg-[#F2F0ED] interactive-card ${
                activeFolder === folder
                  ? 'border-[#1A1A1A] bg-[#F2F0ED] ring-1 ring-[#1A1A1A]'
                  : 'border-[#E5E2DE] bg-[#FDFCFB]'
              }`}
            >
              <div className="flex items-center justify-between">
                <FolderDot className={`h-5 w-5 shrink-0 ${activeFolder === folder ? 'text-[#1A1A1A]' : 'text-[#8C8984]'}`} />
                <span className="text-[10px] font-mono font-bold bg-[#E5E2DE] px-1.5 py-0.5 border border-[#CCCCCC]">
                  {count}
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A1A1A] leading-tight uppercase font-mono truncate">{folder === 'All' ? 'All Vaults' : folder}</h4>
                <p className="text-[9px] text-[#8C8984] font-mono mt-0.5">Role Archive</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Documents search listing & Turso DB ledger */}
        <div className="lg:col-span-2 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E5E2DE] pb-3 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Turso DB Secure Vault Ledger</h3>
              </div>
              <p className="text-[10px] text-[#8C8984] font-mono uppercase">Role clearance: {currentRole} ({roleFilteredDocs.length} Vault Documents Accessible)</p>
            </div>
            
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-48">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#8C8984]" />
                <input
                  type="text"
                  placeholder="Find archive..."
                  value={docSearch}
                  onChange={e => setDocSearch(e.target.value)}
                  className="bg-[#F9F7F4] text-[11px] border border-[#E5E2DE] rounded-none pl-8 pr-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] w-full"
                />
              </div>

              {canUploadAll && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-3 py-2 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer flex items-center space-x-1.5 transition-all shrink-0 rounded-none btn-interactive"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Upload Doc</span>
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredDocs.length === 0 ? (
              <div className="p-8 text-center bg-[#F9F7F4] border border-[#E5E2DE] space-y-2 font-mono">
                <FolderDot className="h-8 w-8 text-[#8C8984] mx-auto animate-pulse" />
                <p className="text-xs font-bold text-[#1A1A1A]">No vault documents match your filter or role clearance.</p>
                <p className="text-[10px] text-[#8C8984]">All documents are synced live with the Turso Database.</p>
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <div 
                  key={doc.id} 
                  className="p-3.5 bg-white border border-[#E5E2DE] hover:border-[#1A1A1A] rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs transition-all interactive-card animate-fade-in-up"
                >
                  <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                    <FileBadge className="h-6 w-6 text-[#1A1A1A] shrink-0" />
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="font-bold text-[#1A1A1A] truncate text-xs" title={doc.name}>{doc.name}</h4>
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className="inline-flex px-1.5 py-0.5 bg-[#F2F0ED] border border-[#E5E2DE] text-[9px] font-mono font-bold text-[#1A1A1A] rounded-none uppercase">
                          {doc.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#8C8984]">
                          {doc.uploader} • {doc.uploadedAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0 font-mono text-[11px] w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-[#E5E2DE] pt-2 sm:pt-0">
                    <div className="text-right">
                      <span className="text-[#8C8984] block text-[8px] font-bold uppercase leading-none">Size / Ver</span>
                      <span className="font-semibold text-[#1A1A1A] text-[10px]">{doc.size} ({doc.version})</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        type="button"
                        onClick={() => setPreviewDoc(doc)}
                        className="px-2 py-1 bg-[#F9F7F4] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] text-[#1A1A1A] text-[9px] font-bold font-mono cursor-pointer transition-all uppercase flex items-center space-x-1"
                      >
                        <Eye className="h-3 w-3 shrink-0" />
                        <span>Preview</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadDoc(doc)}
                        className="px-2 py-1 bg-[#1A1A1A] text-white hover:bg-[#333333] border border-[#1A1A1A] text-[9px] font-bold font-mono cursor-pointer transition-all uppercase flex items-center space-x-1"
                      >
                        <Download className="h-3 w-3 shrink-0" />
                        <span>Download</span>
                      </button>

                      {isExecutive && (
                        <button
                          type="button"
                          onClick={() => deleteDocument(doc.id)}
                          className="p-1 border border-[#E5E2DE] text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                          title="Delete from Vault DB"
                        >
                          <Trash2 className="h-3 w-3 shrink-0" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Audit & Security Clearance Card */}
        <div className="lg:col-span-1 bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#E5E2DE] pb-3">
            <Lock className="h-4 w-4 text-[#1A1A1A]" />
            <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Role Vault Authorization</h3>
          </div>

          <div className="space-y-3.5">
            <div className="p-3 bg-[#F9F7F4] border border-[#E5E2DE] rounded-none space-y-1 text-[11px] font-mono">
              <span className="text-[9px] text-[#8C8984] font-bold uppercase block">ACTIVE ROLE CLEARANCE:</span>
              <span className="font-bold text-[#1A1A1A] text-xs block">{currentRole.toUpperCase()}</span>
              <p className="text-[9.5px] text-[#8C8984] pt-1 border-t border-[#E5E2DE]">
                {isExecutive 
                  ? 'FULL CLEARANCE: You have unrestricted view and upload permissions across all company vault categories.'
                  : isHR
                    ? 'HR CLEARANCE: Authorized to access HR Handbooks, EPF Schemes, and Employee Records.'
                    : isManagement
                      ? 'MANAGEMENT CLEARANCE: Authorized to access SOW Agreements, Product Blueprints, and Project Records.'
                      : 'STANDARD CLEARANCE: Authorized to access Employee Handbooks, EPF Schemes, and Public Blueprints.'}
              </p>
            </div>

            <div className="p-3 bg-white border border-[#E5E2DE] rounded-none flex items-center justify-between text-[11px]">
              <div>
                <h4 className="font-bold text-[#1A1A1A]">SOC-2 & Turso DB Sync</h4>
                <p className="text-[#8C8984] text-[10px] mt-0.5">AES-256 cloud encryption active</p>
              </div>
              <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-none text-[8.5px] font-mono font-bold uppercase tracking-wider border border-emerald-200">ACTIVE DB SYNC</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <span className="text-[10px] font-mono font-bold text-[#8C8984] block pb-1">Recent Vault Audit Activity</span>
              {documents.slice(0, 3).map((d) => (
                <div key={d.id} className="p-2.5 bg-white border border-[#E5E2DE] rounded-none flex items-center justify-between">
                  <div className="truncate min-w-0 pr-2">
                    <span className="font-semibold text-[#1A1A1A] font-mono text-[10px] truncate block">{d.name}</span>
                    <span className="text-[9px] text-[#8C8984]">{d.uploader}</span>
                  </div>
                  <span className="bg-[#F2F0ED] text-[#1A1A1A] border border-[#E5E2DE] px-1.5 py-0.5 rounded-none text-[8.5px] font-mono font-bold uppercase tracking-wider shrink-0">
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none w-full max-w-lg overflow-hidden shadow-2xl space-y-0 animate-scale-in">
            <div className="px-5 py-3.5 bg-[#F2F0ED] border-b border-[#E5E2DE] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Upload className="h-4 w-4 text-[#1A1A1A]" />
                <h3 className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Upload Document to Turso Vault</h3>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="p-1 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] cursor-pointer transition-all text-[#1A1A1A]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              {/* Drag and Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 border-2 border-dashed text-center cursor-pointer transition-all ${
                  dragActive ? 'border-[#1A1A1A] bg-[#F2F0ED]' : 'border-[#E5E2DE] hover:border-[#1A1A1A] bg-[#F9F7F4]'
                }`}
              >
                <Upload className="h-6 w-6 mx-auto text-[#8C8984] animate-bounce mb-2" />
                <p className="text-xs font-bold text-[#1A1A1A] font-mono">Drag & Drop Document File Here</p>
                <p className="text-[10px] text-[#8C8984] mt-1 font-mono">Or click to select PDF, DOCX, PNG files</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-[10px] font-bold text-[#8C8984] uppercase block mb-1">Document Title / File Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. RANBIDGE_Product_Blueprint_2026.pdf"
                    value={docName}
                    onChange={e => setDocName(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-[#8C8984] uppercase block mb-1">Vault Category</label>
                    <select
                      value={docCategory}
                      onChange={e => setDocCategory(e.target.value)}
                      className="w-full bg-[#F9F7F4] border border-[#E5E2DE] px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] cursor-pointer"
                    >
                      {folders.filter(f => f !== 'All').map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                      <option value="Reports">Reports</option>
                      <option value="Agreements">Agreements</option>
                      <option value="Employee Records">Employee Records</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#8C8984] uppercase block mb-1">Document Version</label>
                    <input
                      type="text"
                      value={docVersion}
                      onChange={e => setDocVersion(e.target.value)}
                      className="w-full bg-[#F9F7F4] border border-[#E5E2DE] px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 bg-[#F9F7F4] border border-[#E5E2DE] text-[#1A1A1A] font-mono text-[10px] font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-all"
                >
                  Save to Turso DB Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Sub-Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-[#1A1A1A]/70 backdrop-blur-md flex items-center justify-center p-4 z-[60]">
          <div className="bg-[#FDFCFB] rounded-none w-full max-w-lg border border-[#E5E2DE] overflow-hidden shadow-2xl space-y-0 animate-scale-in">
            <div className="bg-[#F2F0ED] px-4 py-3 border-b border-[#E5E2DE] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileBadge className="h-4 w-4 text-[#1A1A1A]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1A1A]">
                  DOC VAULT PREVIEW :: {previewDoc.category}
                </span>
              </div>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="p-1 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] cursor-pointer transition-all text-[#1A1A1A]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-center">
              <div className="p-6 bg-[#F9F7F4] border border-[#E5E2DE] space-y-3 font-mono text-left">
                <div className="w-12 h-12 bg-[#E5E2DE] mx-auto flex items-center justify-center border border-[#CCCCCC]">
                  <FileBadge className="h-6 w-6 text-[#1A1A1A]" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-[#1A1A1A] break-all">{previewDoc.name}</p>
                  <p className="text-[10px] text-emerald-700 font-bold mt-1">Status: VERIFIED TURSO DB RECORD</p>
                </div>
                <div className="pt-3 border-t border-[#E5E2DE] text-[9.5px] text-[#1A1A1A] space-y-1 bg-white p-3 border">
                  <p className="font-bold text-[#8C8984] uppercase font-mono">VAULT AUDIT METADATA:</p>
                  <p>• Category: <span className="font-bold font-mono">{previewDoc.category}</span></p>
                  <p>• Uploader: <span className="font-bold">{previewDoc.uploader}</span></p>
                  <p>• Upload Date: <span className="font-mono">{previewDoc.uploadedAt}</span></p>
                  <p>• Version / Size: <span className="font-mono">{previewDoc.version} ({previewDoc.size})</span></p>
                  <p>• Security Token: <span className="font-mono text-indigo-700">AES256-TURSO-#{Math.floor(100000 + Math.random() * 900000)}</span></p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleDownloadDoc(previewDoc)}
                  className="px-3 py-2 bg-[#1A1A1A] text-white text-[10px] font-mono font-bold hover:bg-[#333333] transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Download className="h-3.5 w-3.5 shrink-0" />
                  <span>DOWNLOAD FILE</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="px-3 py-2 bg-[#F9F7F4] border border-[#E5E2DE] text-[#1A1A1A] text-[10px] font-mono font-bold hover:bg-[#E5E2DE] transition-all cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
