import React, { useState } from 'react';
import { college } from '../data/college';
import { 
  GraduationCap, 
  Menu, 
  X, 
  ShieldCheck, 
  PhoneCall, 
  FileText, 
  LayoutDashboard,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'apply' | 'admin';
  setCurrentView: (view: 'home' | 'apply' | 'admin') => void;
  applicationsCount: number;
  onSelectCourseForApply?: (courseId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  applicationsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification Strip */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Admissions 2026-27 Open
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">AICTE Approved • NAAC 'A' Grade • Affiliated to GSU</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a href={`tel:${college.admissionHelpline}`} className="hover:text-amber-300 transition-colors flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-amber-400" />
              Helpline: {college.admissionHelpline}
            </a>
            <span className="text-slate-500">|</span>
            <button 
              onClick={() => setCurrentView('admin')}
              className={`text-xs px-2 py-0.5 rounded font-medium transition-colors flex items-center gap-1 ${
                currentView === 'admin' 
                  ? 'bg-amber-500 text-slate-950 font-semibold' 
                  : 'text-amber-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-3 h-3" />
              Admin Portal
              {applicationsCount > 0 && (
                <span className="ml-1 bg-amber-400 text-slate-950 text-[10px] font-bold px-1.5 rounded-full">
                  {applicationsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & College Identity */}
          <button 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-950 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition-transform border border-blue-800">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-blue-950 tracking-tight leading-none group-hover:text-blue-800 transition-colors">
                  Sunrise Institute
                </span>
                <span className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <ShieldCheck className="w-3 h-3 text-amber-700" /> NAAC 'A'
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-wide">
                Of Technology & Management
              </p>
              <p className="text-[11px] text-amber-600 font-semibold italic hidden sm:block">
                "{college.tagline}"
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700">
            <button 
              onClick={() => handleNavClick('hero')} 
              className={`px-3 py-2 rounded-lg transition-colors hover:text-blue-900 hover:bg-slate-100 ${
                currentView === 'home' ? 'text-blue-900 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="px-3 py-2 rounded-lg transition-colors hover:text-blue-900 hover:bg-slate-100"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('courses')} 
              className="px-3 py-2 rounded-lg transition-colors hover:text-blue-900 hover:bg-slate-100"
            >
              Courses
            </button>
            <button 
              onClick={() => handleNavClick('admissions')} 
              className="px-3 py-2 rounded-lg transition-colors hover:text-blue-900 hover:bg-slate-100"
            >
              Admissions
            </button>
            <button 
              onClick={() => handleNavClick('faculty')} 
              className="px-3 py-2 rounded-lg transition-colors hover:text-blue-900 hover:bg-slate-100"
            >
              Faculty
            </button>
            <button 
              onClick={() => handleNavClick('facilities')} 
              className="px-3 py-2 rounded-lg transition-colors hover:text-blue-900 hover:bg-slate-100"
            >
              Facilities
            </button>
            <button 
              onClick={() => handleNavClick('placements')} 
              className="px-3 py-2 rounded-lg transition-colors hover:text-blue-900 hover:bg-slate-100"
            >
              Placements
            </button>
            <button 
              onClick={() => handleNavClick('notices')} 
              className="px-3 py-2 rounded-lg transition-colors hover:text-blue-900 hover:bg-slate-100"
            >
              Notices
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="px-3 py-2 rounded-lg transition-colors hover:text-blue-900 hover:bg-slate-100"
            >
              Contact
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setCurrentView('apply')}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-sm ${
                currentView === 'apply'
                  ? 'bg-amber-500 text-blue-950 ring-2 ring-amber-400 font-bold'
                  : 'bg-blue-900 hover:bg-blue-800 text-white hover:shadow-md'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              Apply Online
            </button>

            <button
              onClick={() => setCurrentView('admin')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-inner'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
              }`}
              title="Open Admin Portal"
            >
              Admin {applicationsCount > 0 && `(${applicationsCount})`}
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setCurrentView('apply')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                setCurrentView('apply');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-blue-900 text-white font-semibold text-center text-sm flex items-center justify-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              Apply Now
            </button>
            <button
              onClick={() => {
                setCurrentView('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-slate-900 text-amber-400 font-semibold text-center text-sm flex items-center justify-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin ({applicationsCount})
            </button>
          </div>

          <div className="flex flex-col space-y-1 text-slate-800 font-medium">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
            >
              About College
            </button>
            <button 
              onClick={() => handleNavClick('courses')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
            >
              Courses & Programs
            </button>
            <button 
              onClick={() => handleNavClick('admissions')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
            >
              Admissions & FAQ
            </button>
            <button 
              onClick={() => handleNavClick('faculty')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
            >
              Faculty
            </button>
            <button 
              onClick={() => handleNavClick('facilities')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
            >
              Campus Facilities
            </button>
            <button 
              onClick={() => handleNavClick('placements')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
            >
              Placements & Recruiters
            </button>
            <button 
              onClick={() => handleNavClick('notices')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
            >
              Notices & Circulars
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
            >
              Contact & Helpline
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
