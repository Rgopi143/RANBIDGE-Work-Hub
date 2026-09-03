/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Employee } from '../types';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  FileText,
  UserCheck,
  UserX,
  PlusCircle,
  X,
  FileBadge,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

export default function EmployeesView() {
  const {
    currentRole,
    currentUser,
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [viewingProfile, setViewingProfile] = useState<Employee | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formGender, setFormGender] = useState('Male');
  const [formDob, setFormDob] = useState('1995-01-01');
  const [formMobile, setFormMobile] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formDept, setFormDept] = useState('AI Research');
  const [formDesig, setFormDesig] = useState('');
  const [formSkills, setFormSkills] = useState('');
  const [formExp, setFormExp] = useState('1 Year');
  const [formSalary, setFormSalary] = useState(100000);
  const [formShift, setFormShift] = useState('09:30 AM - 06:30 PM');
  const [formType, setFormType] = useState<'Full-Time' | 'Part-Time' | 'Contract' | 'Intern'>('Full-Time');
  const [formPhoto, setFormPhoto] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isProvisionalPhoto, setIsProvisionalPhoto] = useState(false);
  const [photoFileName, setPhotoFileName] = useState('');
  const addFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (png, jpeg, webp, etc.)');
      return;
    }
    setPhotoFileName(file.name);
    setIsProvisionalPhoto(true);

    // Dynamic, instantaneous local object URL creation for zero-latency UI load
    const tempUrl = URL.createObjectURL(file);
    setFormPhoto(tempUrl);

    // Read full File contents in background into persistent Base64 string for Workspace storage
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormPhoto(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const departments = ['All', 'AI Research', 'Web Development', 'Hardware Engineering', 'DevOps', 'Cyber Security', 'Marketing', 'Human Resources', 'Management'];

  // Permissions lock: Employee and Intern can only view/edit their own Profile
  const canManageAll = ['Super Admin', 'HR', 'Manager'].includes(currentRole);

  const filteredEmployees = employees.filter(emp => {
    // Search query matches
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.designation.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Dept filter matches
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;

    // Role specific lock: If standard Employee view, they can see everyone listed, but we highlight if restricted
    if (!canManageAll) {
      // In a regular business card directory, seeing list is fine, editing is locked.
      return matchesSearch && matchesDept;
    }
    return matchesSearch && matchesDept;
  });

  const handleOpenAdd = () => {
    setFormName('');
    setFormPhoto('');
    setIsProvisionalPhoto(false);
    setPhotoFileName('');
    setFormMobile('');
    setFormEmail('');
    setFormAddress('');
    setFormDesig('');
    setFormSkills('');
    setFormExp('1 Year');
    setFormSalary(100000);
    setFormType('Full-Time');
    setShowAddModal(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = formSkills.split(',').map(s => s.trim()).filter(Boolean);
    addEmployee({
      name: formName,
      photo: formPhoto || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000) + 1500000}?w=150`,
      gender: formGender,
      dob: formDob,
      mobile: formMobile,
      email: formEmail,
      address: formAddress,
      department: formDept,
      designation: formDesig,
      skills: skillsArray,
      experience: formExp,
      joiningDate: new Date().toISOString().split('T')[0],
      reportingManagerId: 'EMP-003',
      reportingManagerName: 'Amit Patel',
      salary: Number(formSalary),
      shiftTiming: formShift,
      employmentType: formType,
      status: 'Active',
      documents: {
        aadhaar: 'Uploaded_Aadhaar.pdf',
        pan: 'Uploaded_PAN.pdf',
        resume: 'Uploaded_CV.pdf',
        offerLetter: 'Uploaded_Offer.pdf',
        nda: 'Signed_NDA_Digital.pdf'
      }
    });
    setShowAddModal(false);
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormName(emp.name);
    setFormPhoto(emp.photo || '');
    setIsProvisionalPhoto(false);
    setPhotoFileName('');
    setFormGender(emp.gender);
    setFormDob(emp.dob);
    setFormMobile(emp.mobile);
    setFormEmail(emp.email);
    setFormAddress(emp.address);
    setFormDept(emp.department);
    setFormDesig(emp.designation);
    setFormSkills(emp.skills.join(', '));
    setFormExp(emp.experience);
    setFormSalary(emp.salary);
    setFormShift(emp.shiftTiming);
    setFormType(emp.employmentType);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmployee) return;
    const skillsArray = formSkills.split(',').map(s => s.trim()).filter(Boolean);
    updateEmployee(editingEmployee.id, {
      name: formName,
      photo: formPhoto,
      gender: formGender,
      dob: formDob,
      mobile: formMobile,
      email: formEmail,
      address: formAddress,
      department: formDept,
      designation: formDesig,
      skills: skillsArray,
      experience: formExp,
      salary: Number(formSalary),
      shiftTiming: formShift,
      employmentType: formType
    });
    setShowEditModal(false);
  };

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* Search and Filters panel */}
      <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 ml-0.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1A1A1A]/60" />
            <input
              type="text"
              placeholder="Search by name, ID, or title..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#F9F7F4] text-xs text-[#1A1A1A] placeholder-[#8C8984] border border-[#E5E2DE] rounded-none pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1A1A1A] transition-all font-sans"
            />
          </div>
          <div className="relative">
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="bg-[#F9F7F4] text-xs text-[#1A1A1A] border border-[#E5E2DE] rounded-none px-4 py-2.5 focus:outline-none focus:border-[#1A1A1A] cursor-pointer font-sans"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept === 'All' ? 'All Divisions' : dept}</option>
              ))}
            </select>
          </div>
        </div>

        {canManageAll && (
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] tracking-widest uppercase font-bold cursor-pointer flex items-center space-x-2 transition-all rounded-none"
          >
            <Plus className="h-4 w-4" />
            <span>Add Employee Profile</span>
          </button>
        )}
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map(emp => {
          const isOwnProfile = currentUser?.id === emp.id;
          const hasFullClearance = canManageAll;
          const canEditThis = hasFullClearance || isOwnProfile;

          return (
            <div
              id={`emp-card-${emp.id}`}
              key={emp.id}
              className={`bg-[#FDFCFB] border p-5 space-y-4 hover:border-[#1A1A1A] transition-all relative overflow-hidden rounded-none ${
                isOwnProfile ? 'border-l-4 border-l-[#1A1A1A] border-[#E5E2DE]' : 'border-[#E5E2DE]'
              }`}
            >
              {/* Profile Header */}
              <div className="flex items-start space-x-3">
                <img
                  src={emp.photo}
                  className="h-14 w-14 rounded-none object-cover border border-[#E5E2DE] flex-shrink-0 referer-policy animate-fade-in"
                  referrerPolicy="no-referrer"
                  alt={emp.name}
                />
                <div className="space-y-0.5 overflow-hidden">
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-sm font-bold text-[#1A1A1A] truncate">{emp.name}</h3>
                    {isOwnProfile && (
                      <span className="bg-[#1A1A1A] text-white font-mono text-[8px] font-black tracking-wider px-1.5 py-0.5 rounded-none uppercase">YOU</span>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-[#8C8984] truncate">{emp.id} • {emp.designation}</p>
                  <span className="inline-flex px-1.5 py-0.5 bg-[#F2F0ED] border border-[#E5E2DE] rounded-none text-[9px] text-[#1A1A1A] font-mono uppercase tracking-wide">
                    {emp.department}
                  </span>
                </div>
              </div>

              {/* Quick Contacts */}
              <div className="space-y-2 text-[10px] text-[#8C8984] font-medium border-t border-b border-[#E5E2DE] py-3 font-sans leading-normal">
                <div className="flex items-center space-x-2">
                  <Mail className="h-3.5 w-3.5 text-[#8C8984] shrink-0" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-3.5 w-3.5 text-[#8C8984] shrink-0" />
                  <span>{emp.mobile}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-3.5 w-3.5 text-[#8C8984] shrink-0" />
                  <span>Shift: {emp.shiftTiming} • {emp.employmentType}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 min-h-[44px]">
                {emp.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 rounded-none text-[9px] font-bold bg-[#F9F7F4] border border-[#E5E2DE] text-[#8C8984] font-mono tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
                {emp.skills.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded-none text-[9px] font-bold bg-[#F2F0ED] text-[#1A1A1A] border border-[#E5E2DE] font-mono">
                    +{emp.skills.length - 3} MORE
                  </span>
                )}
              </div>

              {/* Card Actions Footer */}
              <div className="flex items-center justify-between border-t border-[#E5E2DE] pt-3 flex-wrap gap-2">
                <button
                  onClick={() => setViewingProfile(emp)}
                  className="px-3 py-1.5 rounded-none bg-[#F9F7F4] hover:bg-[#E5E2DE] border border-[#E5E2DE] text-[10px] font-bold font-mono text-[#1A1A1A] uppercase tracking-wider cursor-pointer transition-all flex items-center space-x-1"
                >
                  <FileText className="h-3.5 w-3.5 shrink-0 text-[#1A1A1A]" />
                  <span>View Credentials</span>
                </button>
                <div className="flex items-center space-x-2">
                  {canEditThis && (
                    <button
                      onClick={() => handleOpenEdit(emp)}
                      className="p-1.5 rounded-none border border-[#E5E2DE] text-[#8C8984] hover:text-[#1A1A1A] hover:bg-[#F2F0ED] cursor-pointer transition-all"
                    >
                      <Edit2 className="h-3 w-3 shrink-0" />
                    </button>
                  )}
                  {hasFullClearance && (
                    <button
                      onClick={() => deleteEmployee(emp.id)}
                      className="p-1.5 rounded-none border border-[#E5E2DE] text-red-700 hover:text-white hover:bg-red-700 cursor-pointer transition-all"
                    >
                      <Trash2 className="h-3 w-3 shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profiles Credential Drawer */}
      {viewingProfile && (
        <div className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] rounded-none w-full max-w-2xl border border-[#E5E2DE] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Left Photo & Role */}
            <div className="md:w-1/3 bg-[#F2F0ED] p-6 border-r border-[#E5E2DE] flex flex-col items-center justify-center text-center text-[#1A1A1A] relative">
              <div className="absolute top-4 right-4 md:hidden">
                <button onClick={() => setViewingProfile(null)} className="p-1.5 bg-[#FDFCFB] border border-[#E5E2DE] hover:bg-[#1A1A1A] hover:text-white transition-all text-[#1A1A1A]">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <img
                src={viewingProfile.photo}
                referrerPolicy="no-referrer"
                className="h-24 w-24 rounded-none object-cover border-2 border-[#1A1A1A] referer-policy animate-fade-in"
                alt={viewingProfile.name}
              />
              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-bold tracking-tight text-[#1A1A1A]">{viewingProfile.name}</h3>
                <p className="text-[10px] font-mono text-[#8C8984]">{viewingProfile.id}</p>
                <p className="text-[10px] text-[#1A1A1A] font-semibold uppercase tracking-wider">{viewingProfile.designation}</p>
              </div>
            </div>
 
            {/* Right Detailed stats & Doc attachments */}
            <div className="flex-1 p-6 space-y-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-[#8C8984] uppercase tracking-wider font-mono">Professional Dossier</span>
                <button onClick={() => setViewingProfile(null)} className="hidden md:block p-1 bg-[#F9F7F4] border border-[#E5E2DE] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] cursor-pointer transition-all">
                  <X className="h-4 w-4" />
                </button>
              </div>
 
              <div className="grid grid-cols-2 gap-3 text-[11px] font-sans">
                <div className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] space-y-0.5">
                  <span className="text-[#8C8984] font-mono block text-[9px]">DEPARTMENT</span>
                  <span className="font-bold text-[#1A1A1A]">{viewingProfile.department}</span>
                </div>
                <div className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] space-y-0.5">
                  <span className="text-[#8C8984] font-mono block text-[9px]">EXPERIENCE SUMMARY</span>
                  <span className="font-bold text-[#1A1A1A]">{viewingProfile.experience}</span>
                </div>
                <div className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] space-y-0.5">
                  <span className="text-[#8C8984] font-mono block text-[9px]">EMAIL ID</span>
                  <span className="font-bold text-[#1A1A1A] truncate block">{viewingProfile.email}</span>
                </div>
                <div className="p-2.5 bg-[#F9F7F4] border border-[#E5E2DE] space-y-0.5">
                  <span className="text-[#8C8984] font-mono block text-[9px]">JOINING DATE</span>
                  <span className="font-bold text-[#1A1A1A]">{viewingProfile.joiningDate}</span>
                </div>
              </div>
 
              {/* File proofs checklist */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#8C8984] tracking-wider block">ID Proofs & Legal Archives</span>
                <div className="space-y-1.5">
                  {Object.entries(viewingProfile.documents).map(([key, name]) => (
                    <div key={key} className="p-2 bg-[#F9F7F4] border border-[#E5E2DE] flex items-center justify-between text-[11px] font-medium text-[#1A1A1A]">
                      <div className="flex items-center space-x-2">
                        <FileBadge className="h-4 w-4 text-[#1A1A1A] shrink-0" />
                        <span className="font-mono text-[#1A1A1A] uppercase tracking-wide">{key}:</span>
                        <span className="text-[#8C8984] font-bold truncate max-w-xs">{name}</span>
                      </div>
                      <span className="px-1.5 py-0.5 bg-[#F2F0ED] text-[#1A1A1A] text-[9px] font-bold font-mono border border-[#E5E2DE] uppercase">APPROVED</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none w-full max-w-xl overflow-hidden shadow-2xl animate-fade-in">
            <div className="px-6 py-4 border-b border-[#E5E2DE] bg-[#F2F0ED] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono tracking-wider uppercase">Add Employee to Directory</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] cursor-pointer transition-all">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>

                {/* Photo Upload System */}
                <div id="image-upload-wrapper-add" className="space-y-2 col-span-2 border border-[#E5E2DE] p-4 bg-[#F2F0ED]/30 relative animate-fade-in">
                  <span className="text-[10px] font-bold text-[#1A1A1A] font-mono uppercase block">Employee Photo Profile</span>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* The drag/drop preview area */}
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => addFileInputRef.current?.click()}
                      className={`w-28 h-28 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all shrink-0 relative ${
                        dragActive 
                          ? 'border-[#1A1A1A] bg-[#F2F0ED]' 
                          : isProvisionalPhoto 
                            ? 'border-amber-400 hover:border-amber-500 bg-amber-50/10' 
                            : 'border-[#E5E2DE] hover:border-[#1A1A1A] bg-white'
                      }`}
                    >
                      {formPhoto ? (
                        <>
                          <img 
                            src={formPhoto} 
                            alt="Employee preview" 
                            className="w-full h-full object-cover" 
                          />
                          
                          {/* Provisional Overlay Badge */}
                          {isProvisionalPhoto && (
                            <div className="absolute -top-2 -right-2 bg-amber-500 text-white font-mono text-[8px] font-bold uppercase px-1.5 py-0.5 border border-white rotate-3 shadow-md z-10 animate-bounce">
                              PREVIEW
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-mono">
                            CHANGE
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-2 text-[#8C8984] hover:text-[#1A1A1A]">
                          <Upload className="h-5 w-5 mx-auto mb-1 text-[#8C8984] animate-pulse" />
                          <span className="text-[9px] font-sans font-medium">Upload File</span>
                        </div>
                      )}
                      <input
                        ref={addFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </div>

                    {/* Quick Avatar options & Direct URL entry */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-[#8C8984] uppercase block">Or Paste Photo URL</label>
                        <input
                          type="text"
                          placeholder="https://images.unsplash.com/photo-..."
                          value={formPhoto}
                          onChange={e => {
                            setFormPhoto(e.target.value);
                            setIsProvisionalPhoto(true);
                            setPhotoFileName('External Web Link');
                          }}
                          className="w-full bg-white border border-[#E5E2DE] px-3 py-1.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-[#8C8984] uppercase block">Quick Preset Profiles</span>
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setFormPhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');
                              setIsProvisionalPhoto(true);
                              setPhotoFileName('Professional Female (Preset)');
                            }}
                            className="px-2 py-1 text-[8px] font-mono tracking-wider border border-[#E5E2DE] bg-white hover:bg-[#F2F0ED] text-[#1A1A1A] cursor-pointer"
                          >
                            👩 Professional Female
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormPhoto('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150');
                              setIsProvisionalPhoto(true);
                              setPhotoFileName('Professional Male (Preset)');
                            }}
                            className="px-2 py-1 text-[8px] font-mono tracking-wider border border-[#E5E2DE] bg-white hover:bg-[#F2F0ED] text-[#1A1A1A] cursor-pointer"
                          >
                            👨 Professional Male
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormPhoto('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150');
                              setIsProvisionalPhoto(true);
                              setPhotoFileName('Exec Leader (Preset)');
                            }}
                            className="px-2 py-1 text-[8px] font-mono tracking-wider border border-[#E5E2DE] bg-white hover:bg-[#F2F0ED] text-[#1A1A1A] cursor-pointer"
                          >
                            💼 Exec Leader
                          </button>
                          {formPhoto && (
                            <button
                              type="button"
                              onClick={() => {
                                setFormPhoto('');
                                setIsProvisionalPhoto(false);
                                setPhotoFileName('');
                              }}
                              className="px-2 py-1 text-[8px] font-mono tracking-wider border border-red-200 bg-red-50 hover:bg-red-500 hover:text-white text-red-600 font-bold cursor-pointer"
                            >
                              ✕ Remove
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Real-time unconfirmed preview indicator */}
                      {isProvisionalPhoto && formPhoto && (
                        <div className="p-2 border border-amber-200 bg-amber-50/40 text-amber-800 text-[9px] font-mono flex items-center gap-1.5 animate-fade-in rounded-none">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shrink-0" />
                          <span className="font-bold">UNCONFIRMED IMAGE:</span>
                          <span className="truncate max-w-[150px] italic font-semibold">{photoFileName || 'Source Loaded'}</span>
                          <span className="text-[8px] text-amber-500/80 ml-auto lowercase select-none">(submit profile to save)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Mobile Number</label>
                  <input
                    type="text"
                    required
                    value={formMobile}
                    onChange={e => setFormMobile(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Email address</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Department</label>
                  <select
                    value={formDept}
                    onChange={e => setFormDept(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] cursor-pointer"
                  >
                    {departments.filter(d => d !== 'All').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Designation</label>
                  <input
                    type="text"
                    required
                    value={formDesig}
                    onChange={e => setFormDesig(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Salary P/M (INR)</label>
                  <input
                    type="number"
                    required
                    value={formSalary}
                    onChange={e => setFormSalary(Number(e.target.value))}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Skills (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. React, Next.js, Node"
                    value={formSkills}
                    onChange={e => setFormSkills(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Office Timing Shifts</label>
                  <input
                    type="text"
                    value={formShift}
                    onChange={e => setFormShift(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] uppercase tracking-widest font-bold cursor-pointer rounded-none transition-all"
              >
                Assemble Profile & Dispatch KPI
              </button>
            </form>
          </div>
        </div>
      )}
 
      {/* Edit Employee Modal */}
      {showEditModal && editingEmployee && (
        <div className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] border border-[#E5E2DE] rounded-none w-full max-w-xl overflow-hidden shadow-2xl animate-fade-in">
            <div className="px-6 py-4 border-b border-[#E5E2DE] bg-[#F2F0ED] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#1A1A1A] font-mono tracking-wider uppercase">Edit Profile details</h3>
              <button onClick={() => setShowEditModal(false)} className="p-1 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E2DE] cursor-pointer transition-all">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>

                {/* Photo Upload System */}
                <div id="image-upload-wrapper-edit" className="space-y-2 col-span-2 border border-[#E5E2DE] p-4 bg-[#F2F0ED]/30 relative animate-fade-in">
                  <span className="text-[10px] font-bold text-[#1A1A1A] font-mono uppercase block">Update Employee Photo</span>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* The drag/drop preview area */}
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => editFileInputRef.current?.click()}
                      className={`w-28 h-28 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all shrink-0 relative ${
                        dragActive 
                          ? 'border-[#1A1A1A] bg-[#F2F0ED]' 
                          : isProvisionalPhoto 
                            ? 'border-amber-400 hover:border-amber-500 bg-amber-50/10' 
                            : 'border-[#E5E2DE] hover:border-[#1A1A1A] bg-white'
                      }`}
                    >
                      {formPhoto ? (
                        <>
                          <img 
                            src={formPhoto} 
                            alt="Employee preview" 
                            className="w-full h-full object-cover" 
                          />
                          
                          {/* Provisional Overlay Badge */}
                          {isProvisionalPhoto && (
                            <div className="absolute -top-2 -right-2 bg-amber-500 text-white font-mono text-[8px] font-bold uppercase px-1.5 py-0.5 border border-white rotate-3 shadow-md z-10 animate-bounce">
                              NEW PREVIEW
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-mono">
                            CHANGE
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-2 text-[#8C8984] hover:text-[#1A1A1A]">
                          <Upload className="h-5 w-5 mx-auto mb-1 text-[#8C8984] animate-pulse" />
                          <span className="text-[9px] font-sans font-medium">Upload File</span>
                        </div>
                      )}
                      <input
                        ref={editFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </div>

                    {/* Quick Avatar options & Direct URL entry */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-[#8C8984] uppercase block">Or Paste Photo URL</label>
                        <input
                          type="text"
                          placeholder="https://images.unsplash.com/photo-..."
                          value={formPhoto}
                          onChange={e => {
                            setFormPhoto(e.target.value);
                            setIsProvisionalPhoto(true);
                            setPhotoFileName('External Web Link');
                          }}
                          className="w-full bg-white border border-[#E5E2DE] px-3 py-1.5 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-[#8C8984] uppercase block">Quick Preset Profiles</span>
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setFormPhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');
                              setIsProvisionalPhoto(true);
                              setPhotoFileName('Professional Female (Preset)');
                            }}
                            className="px-2 py-1 text-[8px] font-mono tracking-wider border border-[#E5E2DE] bg-white hover:bg-[#F2F0ED] text-[#1A1A1A] cursor-pointer"
                          >
                            👩 Professional Female
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormPhoto('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150');
                              setIsProvisionalPhoto(true);
                              setPhotoFileName('Professional Male (Preset)');
                            }}
                            className="px-2 py-1 text-[8px] font-mono tracking-wider border border-[#E5E2DE] bg-white hover:bg-[#F2F0ED] text-[#1A1A1A] cursor-pointer"
                          >
                            👨 Professional Male
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormPhoto('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150');
                              setIsProvisionalPhoto(true);
                              setPhotoFileName('Exec Leader (Preset)');
                            }}
                            className="px-2 py-1 text-[8px] font-mono tracking-wider border border-[#E5E2DE] bg-white hover:bg-[#F2F0ED] text-[#1A1A1A] cursor-pointer"
                          >
                            💼 Exec Leader
                          </button>
                          {formPhoto && (
                            <button
                              type="button"
                              onClick={() => {
                                setFormPhoto('');
                                setIsProvisionalPhoto(true);
                                setPhotoFileName('No custom image (Reset to default symbol)');
                              }}
                              className="px-2 py-1 text-[8px] font-mono tracking-wider border border-red-200 bg-red-50 hover:bg-red-500 hover:text-white text-red-600 font-bold cursor-pointer"
                            >
                              ✕ Remove
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Real-time unconfirmed preview indicator */}
                      {isProvisionalPhoto && formPhoto && (
                        <div className="p-2 border border-amber-200 bg-amber-50/40 text-amber-800 text-[9px] font-mono flex items-center gap-1.5 animate-fade-in rounded-none">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shrink-0" />
                          <span className="font-bold">UNSAVED PROFILE IMAGE UPDATE:</span>
                          <span className="truncate max-w-[150px] italic font-semibold">{photoFileName || 'Source Loaded'}</span>
                          <span className="text-[8px] text-amber-500/80 ml-auto lowercase select-none">(submit changes to save to directory)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Mobile Number</label>
                  <input
                    type="text"
                    required
                    value={formMobile}
                    onChange={e => setFormMobile(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Email address</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-[10px] font-bold text-[#8C8984] font-mono uppercase">Skills (comma separated)</label>
                  <input
                    type="text"
                    value={formSkills}
                    onChange={e => setFormSkills(e.target.value)}
                    className="w-full bg-[#F9F7F4] border border-[#E5E2DE] rounded-none px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-mono text-[10px] uppercase tracking-widest font-bold cursor-pointer rounded-none transition-all"
              >
                Save Changes & Recalculate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
