import React, { useState, useEffect } from 'react';
import { courses, Course, college } from '../data/college';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  Printer, 
  GraduationCap, 
  Home, 
  User, 
  BookOpen, 
  FileCheck, 
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Building,
  Check
} from 'lucide-react';

export interface ApplicationRecord {
  id: string;
  appliedAt: string;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
  // Personal
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  category: string;
  // Family & Academic
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  tenthBoard: string;
  tenthSchool: string;
  tenthPercentage: string;
  tenthYear: string;
  twelfthBoard: string;
  twelfthSchool: string;
  twelfthStream: string;
  twelfthPercentage: string;
  twelfthYear: string;
  entranceExam: string;
  entranceScore: string;
  // Course Choice
  level: 'UG' | 'PG';
  courseId: string;
  courseName: string;
  specialization: string;
  statementOfPurpose: string;
  hostelRequired: boolean;
}

interface ApplyFormProps {
  initialCourseId?: string | null;
  onBackToHome: () => void;
  onApplicationCreated: (app: ApplicationRecord) => void;
}

export const ApplyForm: React.FC<ApplyFormProps> = ({
  initialCourseId,
  onBackToHome,
  onApplicationCreated
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedApp, setSubmittedApp] = useState<ApplicationRecord | null>(null);

  // Initial state derived from course if provided
  const initialSelectedCourse = courses.find(c => c.id === initialCourseId) || courses[0];

  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: '',
    dob: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    state: 'Greenfield State',
    category: 'General',
    // Step 2: Family & Academics
    fatherName: '',
    motherName: '',
    guardianPhone: '',
    tenthBoard: 'CBSE',
    tenthSchool: '',
    tenthPercentage: '',
    tenthYear: '2022',
    twelfthBoard: 'CBSE',
    twelfthSchool: '',
    twelfthStream: 'PCM (Physics, Chemistry, Maths)',
    twelfthPercentage: '',
    twelfthYear: '2024',
    entranceExam: 'JEE Main / University Test',
    entranceScore: '',
    // Step 3: Course Choice
    level: (initialSelectedCourse?.level || 'UG') as 'UG' | 'PG',
    courseId: initialSelectedCourse?.id || 'btech-cs',
    specialization: 'Artificial Intelligence & Machine Learning',
    statementOfPurpose: '',
    hostelRequired: false,
    // Step 4: Declaration
    agreedToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // When initialCourseId changes from props
  useEffect(() => {
    if (initialCourseId) {
      const found = courses.find(c => c.id === initialCourseId);
      if (found) {
        setFormData(prev => ({
          ...prev,
          courseId: found.id,
          level: found.level
        }));
      }
    }
  }, [initialCourseId]);

  // Courses filtered by chosen level
  const availableCourses = courses.filter(c => c.level === formData.level);

  // Handle field change
  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      // If level changed, reset courseId to first available in that level
      if (field === 'level') {
        const first = courses.find(c => c.level === value);
        if (first) {
          next.courseId = first.id;
        }
      }
      return next;
    });

    // Clear error for that field
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Validation functions
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errs.fullName = 'Full Name must be at least 3 characters.';
    }
    if (!formData.dob) {
      errs.dob = 'Date of birth is required.';
    } else {
      const birthYear = new Date(formData.dob).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - birthYear < 15) {
        errs.dob = 'Applicant must be at least 15 years of age.';
      }
    }
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone || cleanPhone.length !== 10) {
      errs.phone = 'Valid 10-digit mobile number is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Valid email address is required.';
    }
    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errs.address = 'Residential street address is required.';
    }
    if (!formData.state.trim()) {
      errs.state = 'State / Province is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fatherName.trim() || formData.fatherName.trim().length < 3) {
      errs.fatherName = "Father's name is required.";
    }
    if (!formData.motherName.trim() || formData.motherName.trim().length < 3) {
      errs.motherName = "Mother's name is required.";
    }
    const cleanGPhone = formData.guardianPhone.replace(/[^0-9]/g, '');
    if (!formData.guardianPhone || cleanGPhone.length !== 10) {
      errs.guardianPhone = 'Valid 10-digit guardian contact number is required.';
    }
    if (!formData.tenthSchool.trim()) {
      errs.tenthSchool = '10th School / Institution name is required.';
    }
    const tPct = parseFloat(formData.tenthPercentage);
    if (!formData.tenthPercentage || isNaN(tPct) || tPct < 35 || tPct > 100) {
      errs.tenthPercentage = 'Valid 10th percentage between 35 and 100 is required.';
    }
    if (!formData.twelfthSchool.trim()) {
      errs.twelfthSchool = '12th / Qualifying College name is required.';
    }
    const twPct = parseFloat(formData.twelfthPercentage);
    if (!formData.twelfthPercentage || isNaN(twPct) || twPct < 35 || twPct > 100) {
      errs.twelfthPercentage = 'Valid 12th percentage between 35 and 100 is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.courseId) {
      errs.courseId = 'Please select a degree course.';
    }
    if (!formData.statementOfPurpose.trim() || formData.statementOfPurpose.trim().length < 30) {
      errs.statementOfPurpose = 'Please write at least 30 characters explaining why you wish to join this program.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep4 = () => {
    const errs: Record<string, string> = {};
    if (!formData.agreedToTerms) {
      errs.agreedToTerms = 'You must accept and certify the declaration before final submission.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Next Step click
  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
    }
  };

  // Back Step click
  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep(currentStep - 1);
    }
  };

  // Final Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;

    const chosenCourse = courses.find(c => c.id === formData.courseId);
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const appId = `SIT-2026-${randomNum}`;

    const newRecord: ApplicationRecord = {
      id: appId,
      appliedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Submitted',
      fullName: formData.fullName.trim(),
      dob: formData.dob,
      gender: formData.gender,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      state: formData.state.trim(),
      category: formData.category,
      fatherName: formData.fatherName.trim(),
      motherName: formData.motherName.trim(),
      guardianPhone: formData.guardianPhone.trim(),
      tenthBoard: formData.tenthBoard,
      tenthSchool: formData.tenthSchool.trim(),
      tenthPercentage: formData.tenthPercentage,
      tenthYear: formData.tenthYear,
      twelfthBoard: formData.twelfthBoard,
      twelfthSchool: formData.twelfthSchool.trim(),
      twelfthStream: formData.twelfthStream,
      twelfthPercentage: formData.twelfthPercentage,
      twelfthYear: formData.twelfthYear,
      entranceExam: formData.entranceExam,
      entranceScore: formData.entranceScore.trim() || 'N/A',
      level: formData.level,
      courseId: formData.courseId,
      courseName: chosenCourse ? chosenCourse.name : formData.courseId,
      specialization: formData.specialization,
      statementOfPurpose: formData.statementOfPurpose.trim(),
      hostelRequired: formData.hostelRequired
    };

    // Save to localStorage
    try {
      const existingStr = localStorage.getItem('sitm_applications');
      const existingList: ApplicationRecord[] = existingStr ? JSON.parse(existingStr) : [];
      const updatedList = [newRecord, ...existingList];
      localStorage.setItem('sitm_applications', JSON.stringify(updatedList));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }

    setSubmittedApp(newRecord);
    onApplicationCreated(newRecord);
  };

  // Selected course object
  const currentSelectedCourse = courses.find(c => c.id === formData.courseId) || courses[0];

  // If already submitted, display confirmation slip
  if (submittedApp) {
    return (
      <div className="py-12 bg-slate-100 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden print:shadow-none print:border-none">
            {/* Header with Stamp */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 sm:p-8 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black">{college.name}</h2>
                    <p className="text-xs text-amber-300 font-medium">Official Admission Acknowledgement Slip</p>
                  </div>
                </div>

                <div className="bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  Application Received
                </div>
              </div>

              {/* ID Badge */}
              <div className="mt-6 pt-4 border-t border-blue-800/80 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] text-blue-200 block uppercase font-bold tracking-wider">Application Number</span>
                  <span className="text-2xl sm:text-3xl font-mono font-black text-amber-400 tracking-wider">
                    {submittedApp.id}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-blue-200 block uppercase font-bold tracking-wider">Date & Time</span>
                  <span className="text-xs text-white font-medium">{submittedApp.appliedAt}</span>
                </div>
              </div>
            </div>

            {/* Application Summary Sheet */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Application Saved Successfully!</span>
                  <p className="text-emerald-800 text-xs mt-0.5">
                    Your application is securely recorded in the college registry. Please print or download this slip for counseling and document verification.
                  </p>
                </div>
              </div>

              {/* Course Detail Highlight */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4">
                <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">Applied Program</div>
                <div className="text-lg font-bold text-slate-900">{submittedApp.courseName}</div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-600 mt-2">
                  <span><strong>Level:</strong> {submittedApp.level}</span>
                  <span><strong>Specialization:</strong> {submittedApp.specialization}</span>
                  <span><strong>Hostel:</strong> {submittedApp.hostelRequired ? 'Required' : 'Day Scholar'}</span>
                  <span><strong>Status:</strong> <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">{submittedApp.status}</span></span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Personal Information */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="font-bold text-slate-900 text-sm border-b pb-1.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-blue-800" />
                    Applicant Details
                  </div>
                  <div><span className="text-slate-500">Name:</span> <strong className="text-slate-900">{submittedApp.fullName}</strong></div>
                  <div><span className="text-slate-500">DOB:</span> <span className="text-slate-800">{submittedApp.dob} ({submittedApp.gender})</span></div>
                  <div><span className="text-slate-500">Category:</span> <span className="text-slate-800">{submittedApp.category}</span></div>
                  <div><span className="text-slate-500">Mobile:</span> <span className="text-slate-800">{submittedApp.phone}</span></div>
                  <div><span className="text-slate-500">Email:</span> <span className="text-slate-800">{submittedApp.email}</span></div>
                  <div><span className="text-slate-500">Address:</span> <span className="text-slate-800">{submittedApp.address}, {submittedApp.state}</span></div>
                </div>

                {/* Family & Academics */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="font-bold text-slate-900 text-sm border-b pb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-800" />
                    Family & Academics
                  </div>
                  <div><span className="text-slate-500">Father:</span> <span className="text-slate-800">{submittedApp.fatherName}</span></div>
                  <div><span className="text-slate-500">Mother:</span> <span className="text-slate-800">{submittedApp.motherName}</span></div>
                  <div><span className="text-slate-500">Guardian Contact:</span> <span className="text-slate-800">{submittedApp.guardianPhone}</span></div>
                  <div><span className="text-slate-500">Class 10th:</span> <span className="text-slate-800">{submittedApp.tenthPercentage}% ({submittedApp.tenthBoard}, {submittedApp.tenthYear})</span></div>
                  <div><span className="text-slate-500">Class 12th:</span> <span className="text-slate-800">{submittedApp.twelfthPercentage}% ({submittedApp.twelfthStream})</span></div>
                  <div><span className="text-slate-500">Entrance Score:</span> <span className="text-slate-800">{submittedApp.entranceScore} ({submittedApp.entranceExam})</span></div>
                </div>
              </div>

              {/* SOP Preview */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                <span className="font-bold text-slate-900 block mb-1">Statement of Purpose:</span>
                <p className="text-slate-600 italic">"{submittedApp.statementOfPurpose}"</p>
              </div>

              {/* College signature footer for print */}
              <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
                <div>
                  <p className="font-bold text-slate-800">{college.name}</p>
                  <p>{college.address}</p>
                  <p>Helpline: {college.admissionHelpline}</p>
                </div>
                <div className="text-right">
                  <div className="h-10 border-b border-slate-400 w-36 mb-1" />
                  <p className="text-[11px] font-semibold text-slate-600">Registrar / Admissions Seal</p>
                </div>
              </div>

              {/* Actions Button Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
                <button
                  onClick={onBackToHome}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return to Home
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSubmittedApp(null);
                      setCurrentStep(1);
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
                  >
                    Submit Another Application
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    Print Application Slip
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Top Breadcrumb & Title */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to College Website
          </button>
          <div className="text-xs text-slate-500 font-medium">
            Session: <span className="font-bold text-slate-800">2026-27</span>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-6 sm:p-8">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              Online Admissions Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Application for Admission
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Complete the 4 steps below with accurate records. You will receive an instant verified Application ID.
            </p>

            {/* Stepper Progress Bar */}
            <div className="mt-8">
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { num: 1, label: 'Personal Details' },
                  { num: 2, label: 'Family & Academic' },
                  { num: 3, label: 'Course Choice' },
                  { num: 4, label: 'Review & Submit' }
                ].map((s) => (
                  <div key={s.num} className="flex flex-col items-center">
                    <div 
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                        currentStep === s.num
                          ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 font-black'
                          : currentStep > s.num
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/10 text-slate-300 border border-white/20'
                      }`}
                    >
                      {currentStep > s.num ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : s.num}
                    </div>
                    <span className={`text-[11px] sm:text-xs mt-2 font-medium line-clamp-1 ${
                      currentStep === s.num ? 'text-amber-400 font-bold' : 'text-slate-300'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Line */}
              <div className="mt-3 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-400 h-full transition-all duration-300 ease-out"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">

            {/* STEP 1: PERSONAL DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b pb-3 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-900" />
                    Step 1: Personal & Demographic Information
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Please provide your legal name and contact details as they appear on official identity documents.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden ${
                        errors.fullName 
                          ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-400' 
                          : 'border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Date of Birth <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleChange('dob', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden ${
                        errors.dob 
                          ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-400' 
                          : 'border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20'
                      }`}
                    />
                    {errors.dob && (
                      <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.dob}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Gender <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 focus:outline-hidden bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="10-digit number"
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-hidden ${
                          errors.phone 
                            ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-400' 
                            : 'border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="you@example.com"
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-hidden ${
                          errors.email 
                            ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-400' 
                            : 'border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Reservation Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 focus:outline-hidden bg-white"
                    >
                      <option value="General">General (Unreserved)</option>
                      <option value="OBC">OBC (Non-Creamy Layer)</option>
                      <option value="SC">SC (Scheduled Caste)</option>
                      <option value="ST">ST (Scheduled Tribe)</option>
                      <option value="EWS">EWS (Economically Weaker Section)</option>
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      State / UT <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      placeholder="e.g. Greenfield State"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden ${
                        errors.state 
                          ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-400' 
                          : 'border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20'
                      }`}
                    />
                    {errors.state && (
                      <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.state}
                      </p>
                    )}
                  </div>

                  {/* Full Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Permanent Residential Address <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="House No., Street Name, City, PIN Code"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden ${
                        errors.address 
                          ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-400' 
                          : 'border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: FAMILY & ACADEMICS */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b pb-3 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-900" />
                    Step 2: Family & Academic History
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Parental information and qualifying 10th and 12th examination scores.
                  </p>
                </div>

                {/* Family Details */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                    Parent / Guardian Contact
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Father's Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fatherName}
                        onChange={(e) => handleChange('fatherName', e.target.value)}
                        placeholder="Father's Name"
                        className={`w-full px-3 py-2 rounded-xl border text-sm bg-white focus:outline-hidden ${
                          errors.fatherName ? 'border-rose-400' : 'border-slate-300'
                        }`}
                      />
                      {errors.fatherName && <p className="text-rose-600 text-xs mt-1">{errors.fatherName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mother's Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.motherName}
                        onChange={(e) => handleChange('motherName', e.target.value)}
                        placeholder="Mother's Name"
                        className={`w-full px-3 py-2 rounded-xl border text-sm bg-white focus:outline-hidden ${
                          errors.motherName ? 'border-rose-400' : 'border-slate-300'
                        }`}
                      />
                      {errors.motherName && <p className="text-rose-600 text-xs mt-1">{errors.motherName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Guardian Contact No. <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.guardianPhone}
                        onChange={(e) => handleChange('guardianPhone', e.target.value)}
                        placeholder="10-digit phone"
                        className={`w-full px-3 py-2 rounded-xl border text-sm bg-white focus:outline-hidden ${
                          errors.guardianPhone ? 'border-rose-400' : 'border-slate-300'
                        }`}
                      />
                      {errors.guardianPhone && <p className="text-rose-600 text-xs mt-1">{errors.guardianPhone}</p>}
                    </div>
                  </div>
                </div>

                {/* 10th Standard */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                    Secondary (Class 10th) Record
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Board</label>
                      <select
                        value={formData.tenthBoard}
                        onChange={(e) => handleChange('tenthBoard', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden"
                      >
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="State Board">State Board</option>
                        <option value="IB/Cambridge">IB / International</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        School Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.tenthSchool}
                        onChange={(e) => handleChange('tenthSchool', e.target.value)}
                        placeholder="e.g. St. Xavier's High School"
                        className={`w-full px-3 py-2 rounded-xl border text-sm bg-white focus:outline-hidden ${
                          errors.tenthSchool ? 'border-rose-400' : 'border-slate-300'
                        }`}
                      />
                      {errors.tenthSchool && <p className="text-rose-600 text-xs mt-1">{errors.tenthSchool}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Percentage (%) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="35"
                        max="100"
                        value={formData.tenthPercentage}
                        onChange={(e) => handleChange('tenthPercentage', e.target.value)}
                        placeholder="e.g. 88.5"
                        className={`w-full px-3 py-2 rounded-xl border text-sm bg-white focus:outline-hidden ${
                          errors.tenthPercentage ? 'border-rose-400' : 'border-slate-300'
                        }`}
                      />
                      {errors.tenthPercentage && <p className="text-rose-600 text-xs mt-1">{errors.tenthPercentage}</p>}
                    </div>
                  </div>
                </div>

                {/* 12th Standard */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                    Senior Secondary (Class 12th / Diploma / Degree) Record
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Board / University</label>
                      <select
                        value={formData.twelfthBoard}
                        onChange={(e) => handleChange('twelfthBoard', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden"
                      >
                        <option value="CBSE">CBSE</option>
                        <option value="ISC">ISC</option>
                        <option value="State Board">State Board</option>
                        <option value="Polytechnic Diploma">Polytechnic Diploma</option>
                        <option value="University Degree">University Degree</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        College / Institution <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.twelfthSchool}
                        onChange={(e) => handleChange('twelfthSchool', e.target.value)}
                        placeholder="e.g. Greenfield Senior Secondary"
                        className={`w-full px-3 py-2 rounded-xl border text-sm bg-white focus:outline-hidden ${
                          errors.twelfthSchool ? 'border-rose-400' : 'border-slate-300'
                        }`}
                      />
                      {errors.twelfthSchool && <p className="text-rose-600 text-xs mt-1">{errors.twelfthSchool}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Aggregate (%) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="35"
                        max="100"
                        value={formData.twelfthPercentage}
                        onChange={(e) => handleChange('twelfthPercentage', e.target.value)}
                        placeholder="e.g. 84.0"
                        className={`w-full px-3 py-2 rounded-xl border text-sm bg-white focus:outline-hidden ${
                          errors.twelfthPercentage ? 'border-rose-400' : 'border-slate-300'
                        }`}
                      />
                      {errors.twelfthPercentage && <p className="text-rose-600 text-xs mt-1">{errors.twelfthPercentage}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Stream / Subjects</label>
                      <select
                        value={formData.twelfthStream}
                        onChange={(e) => handleChange('twelfthStream', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden"
                      >
                        <option value="PCM (Physics, Chemistry, Maths)">PCM (Physics, Chemistry, Maths)</option>
                        <option value="PCB (Physics, Chemistry, Biology)">PCB (Physics, Chemistry, Biology)</option>
                        <option value="Commerce with Maths">Commerce with Mathematics</option>
                        <option value="Commerce without Maths">Commerce without Mathematics</option>
                        <option value="Humanities / Arts">Humanities / Arts</option>
                        <option value="Engineering / Technical Diploma">Engineering / Technical Diploma</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Entrance Exam Score / Roll (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.entranceScore}
                        onChange={(e) => handleChange('entranceScore', e.target.value)}
                        placeholder="e.g. JEE Main Percentile: 91.4 or N/A"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: COURSE CHOICE */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b pb-3 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-900" />
                    Step 3: Program Selection & Statement of Purpose
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose your desired program and let the admissions committee understand your aspirations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Level Toggle */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Academic Level <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleChange('level', 'UG')}
                        className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                          formData.level === 'UG'
                            ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        Undergraduate (UG)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChange('level', 'PG')}
                        className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                          formData.level === 'PG'
                            ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        Postgraduate (PG)
                      </button>
                    </div>
                  </div>

                  {/* Course Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Select Degree Program <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.courseId}
                      onChange={(e) => handleChange('courseId', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 focus:outline-hidden bg-white"
                    >
                      {availableCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.duration} - {c.annualFee})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Course Summary Card */}
                  <div className="sm:col-span-2 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded uppercase">
                          Selected Program
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">
                          {currentSelectedCourse.name}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {currentSelectedCourse.eligibility}
                        </p>
                      </div>
                      <div className="text-right sm:shrink-0">
                        <div className="text-xs font-bold text-amber-800">{currentSelectedCourse.annualFee}</div>
                        <div className="text-[11px] text-slate-500">{currentSelectedCourse.seats} Seats Available</div>
                      </div>
                    </div>
                  </div>

                  {/* Preferred Specialization */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Preferred Elective / Specialization
                    </label>
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) => handleChange('specialization', e.target.value)}
                      placeholder="e.g. AI & Data Science, Finance, VLSI"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 focus:outline-hidden"
                    />
                  </div>

                  {/* Hostel requirement */}
                  <div className="flex items-center gap-3 pt-6">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hostelRequired}
                        onChange={(e) => handleChange('hostelRequired', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-blue-900" />
                      <span className="ml-3 text-xs font-bold text-slate-800">
                        Hostel Accommodation Required
                      </span>
                    </label>
                  </div>

                  {/* Statement of purpose */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Statement of Purpose / Why SITM? <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.statementOfPurpose}
                      onChange={(e) => handleChange('statementOfPurpose', e.target.value)}
                      placeholder="Tell us about your career goals and what excites you about pursuing this degree with us (min. 30 characters)..."
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden ${
                        errors.statementOfPurpose 
                          ? 'border-rose-400 bg-rose-50/30' 
                          : 'border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20'
                      }`}
                    />
                    <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
                      <span>{formData.statementOfPurpose.length} characters</span>
                      {errors.statementOfPurpose && (
                        <span className="text-rose-600 font-medium">{errors.statementOfPurpose}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & DECLARATION */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b pb-3 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-blue-900" />
                    Step 4: Review Application & Declaration
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Please review all provided information carefully before submitting.
                  </p>
                </div>

                {/* Review Cards */}
                <div className="space-y-4">
                  {/* Personal Summary */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
                      <span className="text-xs font-bold text-blue-950 uppercase">Applicant Details</span>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(1)} 
                        className="text-xs font-semibold text-blue-700 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div><span className="text-slate-500 block">Name:</span> <strong className="text-slate-900">{formData.fullName}</strong></div>
                      <div><span className="text-slate-500 block">DOB:</span> <span className="text-slate-800">{formData.dob}</span></div>
                      <div><span className="text-slate-500 block">Gender:</span> <span className="text-slate-800">{formData.gender}</span></div>
                      <div><span className="text-slate-500 block">Category:</span> <span className="text-slate-800">{formData.category}</span></div>
                      <div><span className="text-slate-500 block">Phone:</span> <span className="text-slate-800">{formData.phone}</span></div>
                      <div className="sm:col-span-2"><span className="text-slate-500 block">Email:</span> <span className="text-slate-800">{formData.email}</span></div>
                      <div><span className="text-slate-500 block">State:</span> <span className="text-slate-800">{formData.state}</span></div>
                    </div>
                  </div>

                  {/* Academics Summary */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
                      <span className="text-xs font-bold text-blue-950 uppercase">Family & Academic Record</span>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(2)} 
                        className="text-xs font-semibold text-blue-700 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <div><span className="text-slate-500 block">Father:</span> <span className="text-slate-800">{formData.fatherName}</span></div>
                      <div><span className="text-slate-500 block">Mother:</span> <span className="text-slate-800">{formData.motherName}</span></div>
                      <div><span className="text-slate-500 block">Guardian Phone:</span> <span className="text-slate-800">{formData.guardianPhone}</span></div>
                      <div><span className="text-slate-500 block">10th Class:</span> <strong className="text-slate-900">{formData.tenthPercentage}%</strong> ({formData.tenthBoard})</div>
                      <div><span className="text-slate-500 block">12th Class:</span> <strong className="text-slate-900">{formData.twelfthPercentage}%</strong> ({formData.twelfthStream})</div>
                      <div><span className="text-slate-500 block">Entrance Exam:</span> <span className="text-slate-800">{formData.entranceScore || 'N/A'}</span></div>
                    </div>
                  </div>

                  {/* Program Choice Summary */}
                  <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40">
                    <div className="flex items-center justify-between pb-2 border-b border-amber-200 mb-2">
                      <span className="text-xs font-bold text-amber-900 uppercase">Program Selected</span>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(3)} 
                        className="text-xs font-semibold text-blue-700 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-sm font-bold text-slate-900">{currentSelectedCourse.name}</div>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-600 mt-1">
                      <span>Level: <strong>{formData.level}</strong></span>
                      <span>Annual Fee: <strong>{currentSelectedCourse.annualFee}</strong></span>
                      <span>Specialization: <strong>{formData.specialization || 'General'}</strong></span>
                      <span>Hostel: <strong>{formData.hostelRequired ? 'Requested' : 'No'}</strong></span>
                    </div>
                  </div>

                  {/* Declaration Checkbox */}
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-blue-900 focus:ring-blue-900 border-slate-300"
                      />
                      <span className="text-xs text-slate-800 leading-relaxed">
                        <strong>Student Declaration:</strong> I hereby declare that the particulars provided in this admission form are true, complete, and authentic. I acknowledge that any falsification of documents or examination scores will result in immediate disqualification and forfeiture of admission as per college statutes.
                      </span>
                    </label>
                    {errors.agreedToTerms && (
                      <p className="text-rose-600 text-xs mt-2 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-4 h-4" /> {errors.agreedToTerms}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  Continue to Step {currentStep + 1}
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-900" />
                  Submit Application
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
