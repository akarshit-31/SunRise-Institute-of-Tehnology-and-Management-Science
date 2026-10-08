import React, { useState } from 'react';
import { 
  college, 
  faculty, 
  facilities, 
  placements, 
  notices, 
  admissionSteps, 
  faqs 
} from '../data/college';
import { 
  Award, 
  BookOpen, 
  Building, 
  Calendar, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Check, 
  Briefcase, 
  Wifi, 
  Cpu, 
  Home, 
  Trophy, 
  Coffee 
} from 'lucide-react';

interface SectionsProps {
  onApplyClick: () => void;
}

export const Sections: React.FC<SectionsProps> = ({ onApplyClick }) => {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Enquiry form state
  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    phone: '',
    courseInterested: 'B.Tech Computer Science & Engineering',
    message: ''
  });
  const [enquirySent, setEnquirySent] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiry.name || !enquiry.email || !enquiry.phone) return;
    try {
      const existing = JSON.parse(localStorage.getItem('sitm_enquiries') || '[]');
      existing.unshift({
        ...enquiry,
        id: `ENQ-${Date.now()}`,
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem('sitm_enquiries', JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }
    setEnquirySent(true);
    setEnquiry({
      name: '',
      email: '',
      phone: '',
      courseInterested: 'B.Tech Computer Science & Engineering',
      message: ''
    });
  };

  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-blue-900" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-blue-900" />;
      case 'Home': return <Home className="w-6 h-6 text-blue-900" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-blue-900" />;
      case 'Coffee': return <Coffee className="w-6 h-6 text-blue-900" />;
      case 'Wifi': return <Wifi className="w-6 h-6 text-blue-900" />;
      default: return <Building className="w-6 h-6 text-blue-900" />;
    }
  };

  return (
    <div className="space-y-0">
      
      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-blue-800" />
                About Our Institution
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Cultivating Academic Distinction & Visionary Thinkers Since {college.established}
              </h2>

              <p className="text-slate-600 text-base leading-relaxed">
                {college.about}
              </p>

              {/* Vision & Mission Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center font-bold mb-3">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Our Vision</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {college.vision}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold mb-3">
                    <Award className="w-5 h-5 text-slate-950" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Our Mission</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {college.mission}
                  </p>
                </div>
              </div>

              {/* Accreditations Badge Row */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Recognitions & Statutory Approvals
                </div>
                <div className="flex flex-wrap gap-2">
                  {college.accreditations.map((acc, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side Visual Showcase */}
            <div className="relative">
              <div className="relative rounded-3xl bg-gradient-to-tr from-blue-950 to-indigo-900 p-8 text-white shadow-xl overflow-hidden border border-blue-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl" />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Institutional Snapshot</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white font-mono">1998 - Present</span>
                  </div>

                  <h3 className="text-2xl font-bold leading-snug">
                    A quarter-century legacy of transforming young aspirations into global leaders.
                  </h3>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-black text-amber-400">5,000+</div>
                      <div className="text-xs text-slate-300 mt-0.5">Active Students</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-black text-amber-400">200+</div>
                      <div className="text-xs text-slate-300 mt-0.5">Doctoral & PG Faculty</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-black text-amber-400">90%</div>
                      <div className="text-xs text-slate-300 mt-0.5">Placement Record</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-black text-amber-400">₹42 LPA</div>
                      <div className="text-xs text-slate-300 mt-0.5">Highest Package</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200 flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-amber-400 shrink-0" />
                    <span>Over 18,000+ alumni working worldwide at Google, Microsoft, Amazon, ISRO, and Fortune 500 enterprises.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ADMISSIONS & FAQ SECTION */}
      <section id="admissions" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4 text-blue-800" />
              Admissions 2026-27
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Simplified 4-Step Admission Journey
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Apply online from anywhere in minutes with transparent merit evaluation and instant confirmation.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {admissionSteps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative flex flex-col justify-between hover:border-blue-400 transition-colors"
              >
                <div>
                  <div className="text-3xl font-black text-amber-500 font-mono mb-3">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-blue-900">
                  Step {idx + 1} of 4
                </div>
              </div>
            ))}
          </div>

          {/* Important Dates Timeline & FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Timeline */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-900" />
                  Important Admission Dates
                </h3>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Session 2026-27
                </span>
              </div>

              <div className="space-y-4">
                {college.importantDates.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-900 mt-1 shrink-0 ring-4 ring-blue-100" />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{item.event}</div>
                      <div className="text-amber-700 font-bold mt-0.5">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <button
                  onClick={onApplyClick}
                  className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  Start Online Application Now
                </button>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200">
                Frequently Asked Admission Questions
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div 
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-blue-900 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <div className="p-4 pt-0 text-xs text-slate-600 bg-slate-50/50 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FACULTY SECTION */}
      <section id="faculty" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-4 h-4 text-blue-800" />
              Academic Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Distinguished Faculty & Professors
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Mentored by eminent educators and researchers graduated from IITs, IISc, IIMs, and premier global universities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member) => (
              <div 
                key={member.id}
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-950 text-amber-400 font-extrabold text-lg flex items-center justify-center shadow-xs">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">{member.name}</h3>
                      <p className="text-xs font-semibold text-blue-900 mt-0.5">{member.designation}</p>
                      <p className="text-[11px] text-slate-500">{member.department}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <div><span className="font-semibold text-slate-800">Qualification:</span> {member.qualification}</div>
                    <div><span className="font-semibold text-slate-800">Experience:</span> {member.experience}</div>
                    <div><span className="font-semibold text-slate-800">Domain:</span> {member.specialization}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FACILITIES SECTION */}
      <section id="facilities" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Building className="w-4 h-4 text-blue-800" />
              Campus Infrastructure
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              World-Class Modern Facilities
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Designed to stimulate creativity, innovation, peer collaboration, and healthy student living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f) => (
              <div 
                key={f.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4">
                    {getFacilityIcon(f.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {f.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  {f.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PLACEMENTS SECTION */}
      <section id="placements" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-4 h-4 text-blue-800" />
              Career Outcomes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Unmatched 90% Campus Placements
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Our Corporate Relations & Training Cell prepares students through technical interview bootcamps, hackathons, and placement drives.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
            {placements.stats.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-black text-blue-900 tracking-tight">{item.value}</div>
                <div className="text-[11px] text-slate-600 font-medium mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Top Recruiters */}
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Our Esteemed Hiring Partners</span>
              <h3 className="text-xl sm:text-2xl font-bold mt-1">Leading Multinational Corporations</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {placements.recruiters.map((company, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-bold text-slate-200 hover:bg-white/10 hover:text-amber-300 transition-colors"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* NOTICES & ANNOUNCEMENTS */}
      <section id="notices" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-blue-800" />
                Circulars & Updates
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Notices & Campus Events
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Updated Daily • Official College Bulletin
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notices.map((n) => (
              <div 
                key={n.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {n.category}
                    </span>
                    {n.isNew && (
                      <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {n.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {n.date}
                  </span>
                  <button 
                    onClick={onApplyClick}
                    className="text-blue-900 font-semibold hover:underline"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT & ENQUIRY */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Phone className="w-4 h-4 text-blue-800" />
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Contact & Admissions Counseling Desk
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Have queries regarding seat eligibility, hostel facilities or fees? Our counselor team is here to assist.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Details Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 to-indigo-950 text-white p-8 rounded-3xl shadow-lg space-y-6">
              <div>
                <h3 className="text-xl font-bold">{college.name}</h3>
                <p className="text-xs text-amber-300 italic mt-0.5">"{college.tagline}"</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-semibold">Campus Address</span>
                    <span className="text-slate-200">{college.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-semibold">Helpline Numbers</span>
                    <div className="text-slate-200">
                      Admission: <a href={`tel:${college.admissionHelpline}`} className="hover:text-amber-300 font-bold">{college.admissionHelpline}</a>
                    </div>
                    <div className="text-slate-300">
                      General: <a href={`tel:${college.phone}`} className="hover:text-amber-300">{college.phone}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-semibold">Official Emails</span>
                    <div className="text-slate-200">
                      Admissions: <a href={`mailto:${college.admissionEmail}`} className="hover:text-amber-300 font-bold">{college.admissionEmail}</a>
                    </div>
                    <div className="text-slate-300">
                      General: <a href={`mailto:${college.email}`} className="hover:text-amber-300">{college.email}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-semibold">Office Hours</span>
                    <span className="text-slate-200">{college.officeHours}</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="pt-4 border-t border-white/10">
                <div className="w-full h-36 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center text-center p-4">
                  <MapPin className="w-6 h-6 text-amber-400 mb-1" />
                  <span className="text-xs font-bold text-white">Campus Map & Direction</span>
                  <span className="text-[11px] text-slate-300">Knowledge Park, Greenfield City (Near Metro Stn 4)</span>
                </div>
              </div>
            </div>

            {/* Quick Enquiry Form */}
            <div className="lg:col-span-7 bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Send Admission Enquiry
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Fill the brief details below and our counselors will call you back within 24 working hours.
              </p>

              {enquirySent ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold">Enquiry Registered Successfully!</h4>
                  <p className="text-xs text-emerald-800">
                    Our admissions counselor will contact you shortly on your provided phone and email.
                  </p>
                  <button
                    onClick={() => setEnquirySent(false)}
                    className="mt-3 px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl"
                  >
                    Send Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={enquiry.name}
                        onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={enquiry.phone}
                        onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                        placeholder="10-digit number"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={enquiry.email}
                        onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Course of Interest</label>
                      <select
                        value={enquiry.courseInterested}
                        onChange={(e) => setEnquiry({ ...enquiry, courseInterested: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden"
                      >
                        <option>B.Tech Computer Science & Engineering</option>
                        <option>B.Tech Electronics & Communication</option>
                        <option>BCA (Bachelor of Computer Applications)</option>
                        <option>BBA (Bachelor of Business Administration)</option>
                        <option>B.Com (Hons) Professional</option>
                        <option>MBA (Master of Business Administration)</option>
                        <option>M.Tech Computer Science & Engineering</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Message or Query</label>
                      <textarea
                        rows={3}
                        value={enquiry.message}
                        onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                        placeholder="Ask about cutoffs, hostel fees, scholarship options..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    Submit Enquiry
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
            {/* Col 1: Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base leading-none">Sunrise Institute</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Of Technology & Management</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                {college.affiliation}. Committed to empowering students with global competencies and technological leadership.
              </p>
              <div className="text-amber-400 font-semibold italic text-xs">
                "{college.tagline}"
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Quick Navigation</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#about" className="hover:text-amber-300 transition-colors">About College</a></li>
                <li><a href="#courses" className="hover:text-amber-300 transition-colors">Courses & Fee Structure</a></li>
                <li><a href="#admissions" className="hover:text-amber-300 transition-colors">Admissions 2026-27</a></li>
                <li><a href="#faculty" className="hover:text-amber-300 transition-colors">Faculty Directory</a></li>
                <li><a href="#facilities" className="hover:text-amber-300 transition-colors">Campus Facilities</a></li>
                <li><a href="#placements" className="hover:text-amber-300 transition-colors">Placement Records</a></li>
              </ul>
            </div>

            {/* Col 3: Programs */}
            <div>
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Programs Offered</h5>
              <ul className="space-y-2 text-slate-400">
                <li>B.Tech Computer Science</li>
                <li>B.Tech Electronics & Comm.</li>
                <li>BCA (Computer Applications)</li>
                <li>BBA (Management Studies)</li>
                <li>B.Com (Hons) Professional</li>
                <li>MBA (Dual Specialization)</li>
                <li>M.Tech Computer Science</li>
              </ul>
            </div>

            {/* Col 4: Contact info */}
            <div>
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Admissions Helpline</h5>
              <div className="space-y-2 text-slate-400">
                <p>Phone: <span className="text-white font-bold">{college.admissionHelpline}</span></p>
                <p>Email: <span className="text-white">{college.admissionEmail}</span></p>
                <p>Hours: {college.officeHours}</p>
                <p className="pt-2 text-slate-400">{college.address}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} {college.name}. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Admission</span>
              <span>•</span>
              <span>Mandatory AICTE Disclosure</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
