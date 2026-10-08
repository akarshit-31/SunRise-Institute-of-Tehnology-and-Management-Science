import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { Sections } from './components/Sections';
import { ApplyForm, ApplicationRecord } from './components/ApplyForm';
import { Admin } from './components/Admin';

// Default initial sample records for immediate demo testing
const initialSampleApplications: ApplicationRecord[] = [
  {
    id: "SIT-2026-48213",
    appliedAt: "May 10, 2026, 11:30 AM",
    status: "Under Review",
    fullName: "Aarav Sharma",
    dob: "2007-04-12",
    gender: "Male",
    phone: "9876501234",
    email: "aarav.sharma@example.com",
    address: "Flat 402, Greenfield Meadows, Knowledge Park",
    state: "Greenfield State",
    category: "General",
    fatherName: "Rajesh Sharma",
    motherName: "Sunita Sharma",
    guardianPhone: "9876501230",
    tenthBoard: "CBSE",
    tenthSchool: "St. Xavier's Senior Secondary School",
    tenthPercentage: "92.4",
    tenthYear: "2022",
    twelfthBoard: "CBSE",
    twelfthSchool: "Delhi Public School, Greenfield",
    twelfthStream: "PCM (Physics, Chemistry, Maths)",
    twelfthPercentage: "89.6",
    twelfthYear: "2024",
    entranceExam: "JEE Main",
    entranceScore: "94.2 Percentile",
    level: "UG",
    courseId: "btech-cs",
    courseName: "B.Tech Computer Science & Engineering",
    specialization: "Artificial Intelligence & Data Science",
    statementOfPurpose: "Passionate about building scalable machine learning algorithms and deep learning systems to solve real-world problems.",
    hostelRequired: true
  },
  {
    id: "SIT-2026-31902",
    appliedAt: "May 08, 2026, 03:15 PM",
    status: "Accepted",
    fullName: "Priya Sundaram",
    dob: "2002-11-20",
    gender: "Female",
    phone: "9812345678",
    email: "priya.s@example.com",
    address: "14 Lakeview Enclave, Greenfield Central",
    state: "Greenfield State",
    category: "General",
    fatherName: "K. Sundaram",
    motherName: "Lalitha Sundaram",
    guardianPhone: "9812345670",
    tenthBoard: "ICSE",
    tenthSchool: "Bishop Cotton High School",
    tenthPercentage: "88.0",
    tenthYear: "2019",
    twelfthBoard: "ISC",
    twelfthSchool: "National College",
    twelfthStream: "Commerce with Maths",
    twelfthPercentage: "86.5",
    twelfthYear: "2021",
    entranceExam: "CAT / CMAT",
    entranceScore: "CAT 88.5 Percentile",
    level: "PG",
    courseId: "mba",
    courseName: "MBA (Master of Business Administration)",
    specialization: "Strategic Finance & Business Analytics",
    statementOfPurpose: "Seeking to combine quantitative analytical foundations with enterprise leadership to drive financial strategies in fintech firms.",
    hostelRequired: false
  },
  {
    id: "SIT-2026-19405",
    appliedAt: "May 06, 2026, 09:45 AM",
    status: "Submitted",
    fullName: "Rohan Varma",
    dob: "2006-08-15",
    gender: "Male",
    phone: "9988776655",
    email: "rohan.varma@example.com",
    address: "Sector 12, Vikas Nagar, Greenfield",
    state: "Greenfield State",
    category: "OBC",
    fatherName: "Mahesh Varma",
    motherName: "Geeta Varma",
    guardianPhone: "9988776650",
    tenthBoard: "State Board",
    tenthSchool: "Govt Model School",
    tenthPercentage: "81.0",
    tenthYear: "2022",
    twelfthBoard: "State Board",
    twelfthSchool: "Govt Science College",
    twelfthStream: "PCM (Physics, Chemistry, Maths)",
    twelfthPercentage: "79.2",
    twelfthYear: "2024",
    entranceExam: "State CET",
    entranceScore: "Rank 1450",
    level: "UG",
    courseId: "bca",
    courseName: "BCA (Bachelor of Computer Applications)",
    specialization: "Full-Stack Web Architectures",
    statementOfPurpose: "Eager to master modern cloud computing, database design, and mobile app programming to launch my career in software engineering.",
    hostelRequired: false
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'apply' | 'admin'>('home');
  const [selectedCourseForApply, setSelectedCourseForApply] = useState<string | null>(null);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);

  // Load applications from localStorage (or populate initial samples if first time)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sitm_applications');
      if (stored) {
        setApplications(JSON.parse(stored));
      } else {
        // Initialize with realistic samples
        localStorage.setItem('sitm_applications', JSON.stringify(initialSampleApplications));
        setApplications(initialSampleApplications);
      }
    } catch (e) {
      console.error('Error loading applications:', e);
      setApplications(initialSampleApplications);
    }
  }, []);

  // Listen to hash changes (e.g. #admin, #apply)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setCurrentView('admin');
      } else if (hash === '#apply') {
        setCurrentView('apply');
      } else if (hash === '#home' || hash === '') {
        setCurrentView('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update hash when currentView changes
  const handleSetCurrentView = (view: 'home' | 'apply' | 'admin') => {
    setCurrentView(view);
    if (view === 'admin') {
      window.location.hash = 'admin';
    } else if (view === 'apply') {
      window.location.hash = 'apply';
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Trigger apply with specific course pre-selected
  const handleApplyForCourse = (courseId: string) => {
    setSelectedCourseForApply(courseId);
    handleSetCurrentView('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add newly created application
  const handleApplicationCreated = (newApp: ApplicationRecord) => {
    setApplications(prev => [newApp, ...prev]);
  };

  // Update status in admin
  const handleUpdateStatus = (id: string, newStatus: ApplicationRecord['status']) => {
    setApplications(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, status: newStatus } : a);
      localStorage.setItem('sitm_applications', JSON.stringify(updated));
      return updated;
    });
  };

  // Seed sample data button
  const handleSeedSampleData = () => {
    localStorage.setItem('sitm_applications', JSON.stringify(initialSampleApplications));
    setApplications(initialSampleApplications);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-amber-400 selection:text-slate-950 flex flex-col">
      {/* Navbar (visible across all views) */}
      <Navbar
        currentView={currentView}
        setCurrentView={handleSetCurrentView}
        applicationsCount={applications.length}
        onSelectCourseForApply={handleApplyForCourse}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero 
              onApplyClick={() => handleSetCurrentView('apply')}
              onExploreCourses={() => {
                const el = document.getElementById('courses');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            
            <Courses 
              onApplyForCourse={handleApplyForCourse}
            />

            <Sections 
              onApplyClick={() => handleSetCurrentView('apply')}
            />
          </>
        )}

        {currentView === 'apply' && (
          <ApplyForm
            initialCourseId={selectedCourseForApply}
            onBackToHome={() => handleSetCurrentView('home')}
            onApplicationCreated={handleApplicationCreated}
          />
        )}

        {currentView === 'admin' && (
          <Admin
            applications={applications}
            onUpdateStatus={handleUpdateStatus}
            onBackToHome={() => handleSetCurrentView('home')}
            onSeedSampleData={handleSeedSampleData}
          />
        )}
      </main>
    </div>
  );
}
