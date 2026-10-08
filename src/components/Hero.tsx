import React from 'react';
import { college } from '../data/college';
import { 
  ArrowRight, 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles, 
  TrendingUp, 
  Users 
} from 'lucide-react';

interface HeroProps {
  onApplyClick: () => void;
  onExploreCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onApplyClick, onExploreCourses }) => {
  return (
    <section id="hero" className="relative bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-10 pb-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admissions Notification Banner */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-inner animate-pulse">
            <span className="flex h-2 w-2 rounded-full bg-amber-400" />
            <span className="font-semibold text-amber-300">Admissions Open 2026-27</span>
            <span className="text-amber-400/60 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Early Round Deadline: May 30, 2026
            </span>
          </div>
        </div>

        {/* Main Content Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Est. {college.established} • AICTE Approved • NAAC 'A' Grade
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {college.name}
          </h1>

          <p className="text-xl sm:text-2xl font-light text-amber-300 tracking-wide italic">
            "{college.tagline}"
          </p>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Empowering next-generation engineers, managers, and digital innovators with world-class faculty, advanced research labs, and an enviable 90% campus placement track record.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onApplyClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-5 h-5" />
              Apply for Admission 2026
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreCourses}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/20 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-xs"
            >
              <BookOpen className="w-5 h-5 text-amber-400" />
              Explore Courses & Fees
            </button>
          </div>

          {/* Accreditation Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
            {college.accreditations.map((item, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid Bar */}
        <div className="mt-14 pt-10 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {college.stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-amber-400/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
