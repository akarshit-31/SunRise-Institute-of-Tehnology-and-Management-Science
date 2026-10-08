import React, { useState, useMemo } from 'react';
import { courses, Course } from '../data/college';
import { 
  Search, 
  Clock, 
  Users, 
  IndianRupee, 
  GraduationCap, 
  CheckCircle, 
  ArrowRight, 
  BookOpen, 
  X,
  Sparkles,
  Info
} from 'lucide-react';

interface CoursesProps {
  onApplyForCourse: (courseId: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onApplyForCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | 'UG' | 'PG'>('ALL');
  const [activeModalCourse, setActiveModalCourse] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesLevel = selectedLevel === 'ALL' || c.level === selectedLevel;
      const matchesSearch = 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [searchTerm, selectedLevel]);

  return (
    <section id="courses" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold tracking-wide uppercase mb-3">
            <GraduationCap className="w-4 h-4 text-blue-700" />
            Academic Offerings 2026-27
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Programs & Degree Courses
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Industry-aligned undergraduate and postgraduate curriculums engineered with modern technologies, practical laboratory workshops, and real-world internships.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Level Filter Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedLevel('ALL')}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selectedLevel === 'ALL'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Programs ({courses.length})
            </button>
            <button
              onClick={() => setSelectedLevel('UG')}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selectedLevel === 'UG'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Undergraduate (UG)
            </button>
            <button
              onClick={() => setSelectedLevel('PG')}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selectedLevel === 'PG'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Postgraduate (PG)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by course name, dept..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No courses match your search</h3>
            <p className="text-sm text-slate-500 mt-1">Try clearing your search term or filtering by all levels.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedLevel('ALL'); }}
              className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top */}
                <div className="p-6">
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase ${
                      course.level === 'UG' 
                        ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                        : 'bg-purple-100 text-purple-900 border border-purple-200'
                    }`}>
                      {course.level} Program
                    </span>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1">
                      <IndianRupee className="w-3 h-3 text-amber-600" />
                      {course.annualFee}
                    </span>
                  </div>

                  {/* Title & Department */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                    {course.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">
                    {course.department}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Details Pill Strip */}
                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{course.seats} Intake Seats</span>
                    </div>
                  </div>

                  {/* Eligibility snippet */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 leading-snug">
                    <span className="font-semibold text-slate-800">Eligibility: </span>
                    {course.eligibility}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalCourse(course)}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5 text-blue-800" />
                    Syllabus
                  </button>

                  <button
                    onClick={() => onApplyForCourse(course.id)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 hover:shadow-md"
                  >
                    Apply Now
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Course Detail & Syllabus Modal */}
      {activeModalCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase">
                    {activeModalCourse.level} Program
                  </span>
                  <span className="text-xs text-slate-300">Code: {activeModalCourse.code}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {activeModalCourse.name}
                </h3>
                <p className="text-xs text-amber-300 mt-1 font-medium">
                  Department of {activeModalCourse.department}
                </p>
              </div>
              <button
                onClick={() => setActiveModalCourse(null)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Quick specs */}
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div>
                  <div className="text-[11px] text-slate-500 uppercase font-bold">Duration</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{activeModalCourse.duration}</div>
                </div>
                <div className="border-x border-slate-200">
                  <div className="text-[11px] text-slate-500 uppercase font-bold">Total Intake</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{activeModalCourse.seats} Seats</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 uppercase font-bold">Annual Fee</div>
                  <div className="text-xs font-bold text-amber-700 mt-0.5">{activeModalCourse.annualFee}</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Program Overview
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                  {activeModalCourse.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-blue-700" />
                  Admission Eligibility
                </h4>
                <p className="text-xs text-slate-700 bg-amber-50/60 border border-amber-200/80 p-3 rounded-xl">
                  {activeModalCourse.eligibility}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  Curriculum & Syllabus Highlights
                </h4>
                <ul className="space-y-2">
                  {activeModalCourse.syllabusHighlights.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalCourse(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const courseId = activeModalCourse.id;
                  setActiveModalCourse(null);
                  onApplyForCourse(courseId);
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                Apply for this Course
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
