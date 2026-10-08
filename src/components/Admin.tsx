import React, { useState, useMemo } from 'react';
import { ApplicationRecord } from './ApplyForm';
import { courses, college } from '../data/college';
import { 
  LayoutDashboard, 
  Search, 
  Download, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileText, 
  ArrowLeft, 
  RefreshCw, 
  Eye, 
  X,
  Phone,
  Mail,
  Calendar,
  GraduationCap,
  Sparkles,
  Database
} from 'lucide-react';

interface AdminProps {
  applications: ApplicationRecord[];
  onUpdateStatus: (id: string, newStatus: ApplicationRecord['status']) => void;
  onBackToHome: () => void;
  onSeedSampleData: () => void;
}

export const Admin: React.FC<AdminProps> = ({
  applications,
  onUpdateStatus,
  onBackToHome,
  onSeedSampleData
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [courseFilter, setCourseFilter] = useState<string>('ALL');
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = applications.length;
    const submitted = applications.filter(a => a.status === 'Submitted').length;
    const underReview = applications.filter(a => a.status === 'Under Review').length;
    const accepted = applications.filter(a => a.status === 'Accepted').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;

    // Course counts
    const byCourse: Record<string, number> = {};
    applications.forEach(a => {
      byCourse[a.courseName] = (byCourse[a.courseName] || 0) + 1;
    });

    return { total, submitted, underReview, accepted, rejected, byCourse };
  }, [applications]);

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchSearch = 
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm) ||
        app.courseName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus = statusFilter === 'ALL' || app.status === statusFilter;
      const matchCourse = courseFilter === 'ALL' || app.courseId === courseFilter;

      return matchSearch && matchStatus && matchCourse;
    });
  }, [applications, searchTerm, statusFilter, courseFilter]);

  // Export CSV
  const handleExportCSV = () => {
    if (applications.length === 0) {
      alert('No application records to export.');
      return;
    }

    const headers = [
      'Application ID',
      'Submission Date',
      'Status',
      'Applicant Name',
      'DOB',
      'Gender',
      'Phone',
      'Email',
      'Category',
      'State',
      'Father Name',
      'Mother Name',
      'Guardian Phone',
      '10th %',
      '10th Board',
      '12th %',
      '12th Stream',
      'Entrance Score',
      'Level',
      'Course',
      'Specialization',
      'Hostel Required',
      'Statement of Purpose'
    ];

    const rows = applications.map(a => [
      `"${a.id}"`,
      `"${a.appliedAt}"`,
      `"${a.status}"`,
      `"${a.fullName}"`,
      `"${a.dob}"`,
      `"${a.gender}"`,
      `"${a.phone}"`,
      `"${a.email}"`,
      `"${a.category}"`,
      `"${a.state}"`,
      `"${a.fatherName}"`,
      `"${a.motherName}"`,
      `"${a.guardianPhone}"`,
      `"${a.tenthPercentage}"`,
      `"${a.tenthBoard}"`,
      `"${a.twelfthPercentage}"`,
      `"${a.twelfthStream}"`,
      `"${a.entranceScore}"`,
      `"${a.level}"`,
      `"${a.courseName}"`,
      `"${a.specialization}"`,
      `"${a.hostelRequired ? 'Yes' : 'No'}"`,
      `"${(a.statementOfPurpose || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SITM_Admissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: ApplicationRecord['status']) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={onBackToHome}
                className="p-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700"
                title="Back to Public Site"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <LayoutDashboard className="w-7 h-7 text-blue-900" />
                Admissions Administration Panel
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {college.name} • Registry & Online Applications Management
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={onSeedSampleData}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
              title="Add 3 realistic sample candidate applications"
            >
              <Database className="w-3.5 h-3.5 text-blue-800" />
              Seed Demo Applications
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              Export to CSV ({applications.length})
            </button>
          </div>
        </div>

        {/* Stats Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Applied</div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{stats.total}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Recorded in Registry</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-2xs">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wide">Submitted</div>
            <div className="text-2xl sm:text-3xl font-black text-blue-900 mt-1">{stats.submitted}</div>
            <div className="text-[11px] text-blue-600 mt-0.5">Awaiting Review</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-2xs">
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">Under Review</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-900 mt-1">{stats.underReview}</div>
            <div className="text-[11px] text-amber-600 mt-0.5">Screening in Progress</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-2xs">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Accepted</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">{stats.accepted}</div>
            <div className="text-[11px] text-emerald-600 mt-0.5">Offer Letters Sent</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-2xs col-span-2 sm:col-span-1">
            <div className="text-xs font-bold text-rose-700 uppercase tracking-wide">Rejected</div>
            <div className="text-2xl sm:text-3xl font-black text-rose-900 mt-1">{stats.rejected}</div>
            <div className="text-[11px] text-rose-600 mt-0.5">Criteria Not Met</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, name, email, course..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 md:flex-none px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:outline-hidden"
            >
              <option value="ALL">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Course Filter */}
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="flex-1 md:flex-none px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:outline-hidden max-w-[220px] truncate"
            >
              <option value="ALL">All Programs</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {(searchTerm || statusFilter !== 'ALL' || courseFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('ALL');
                  setCourseFilter('ALL');
                }}
                className="px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-semibold"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {filteredApps.length === 0 ? (
            <div className="py-16 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No applications found</h3>
              <p className="text-xs text-slate-500 mt-1">
                {applications.length === 0 
                  ? 'No students have applied yet. Click "Seed Demo Applications" to populate test data!' 
                  : 'Try modifying your search or filter options.'}
              </p>
              {applications.length === 0 && (
                <button
                  onClick={onSeedSampleData}
                  className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
                >
                  Populate 3 Test Applications
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Application ID</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Program</th>
                    <th className="py-3 px-4">Academics</th>
                    <th className="py-3 px-4">Submitted On</th>
                    <th className="py-3 px-4">Status & Action</th>
                    <th className="py-3 px-4 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-950">
                        {app.id}
                      </td>

                      {/* Applicant */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{app.fullName}</div>
                        <div className="text-[11px] text-slate-500">{app.email}</div>
                        <div className="text-[11px] text-slate-500">{app.phone}</div>
                      </td>

                      {/* Program */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-semibold text-slate-800 line-clamp-1">{app.courseName}</div>
                        <div className="text-[11px] text-slate-500">
                          {app.level} • {app.specialization || 'General'}
                        </div>
                      </td>

                      {/* Academics */}
                      <td className="py-3.5 px-4">
                        <div className="text-slate-800">
                          12th: <strong className="text-slate-900">{app.twelfthPercentage}%</strong>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          10th: {app.tenthPercentage}%
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        {app.appliedAt}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <select
                            value={app.status}
                            onChange={(e) => onUpdateStatus(app.id, e.target.value as any)}
                            className={`px-2.5 py-1 text-xs rounded-lg font-bold border ${getStatusBadge(app.status)} focus:outline-hidden`}
                          >
                            <option value="Submitted">Submitted</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      </td>

                      {/* View Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
                          title="View Application Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Detail Application Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">
                  {selectedApp.id}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedApp.fullName}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Applied for {selectedApp.courseName} on {selectedApp.appliedAt}
                </p>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {/* Status Updater inside modal */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">Update Decision:</span>
                <select
                  value={selectedApp.status}
                  onChange={(e) => {
                    const newSt = e.target.value as any;
                    onUpdateStatus(selectedApp.id, newSt);
                    setSelectedApp({ ...selectedApp, status: newSt });
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold border text-xs ${getStatusBadge(selectedApp.status)}`}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Personal Details */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900 text-xs border-b pb-1">Applicant Contact & Demographics</div>
                <div className="grid grid-cols-2 gap-2">
                  <div><span className="text-slate-500">DOB & Gender:</span> {selectedApp.dob} ({selectedApp.gender})</div>
                  <div><span className="text-slate-500">Category:</span> {selectedApp.category}</div>
                  <div><span className="text-slate-500">Phone:</span> {selectedApp.phone}</div>
                  <div><span className="text-slate-500">Email:</span> {selectedApp.email}</div>
                  <div className="col-span-2"><span className="text-slate-500">Address:</span> {selectedApp.address}, {selectedApp.state}</div>
                </div>
              </div>

              {/* Family & Academics */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900 text-xs border-b pb-1">Parental & School Record</div>
                <div className="grid grid-cols-2 gap-2">
                  <div><span className="text-slate-500">Father:</span> {selectedApp.fatherName}</div>
                  <div><span className="text-slate-500">Mother:</span> {selectedApp.motherName}</div>
                  <div><span className="text-slate-500">Guardian Contact:</span> {selectedApp.guardianPhone}</div>
                  <div><span className="text-slate-500">Entrance Score:</span> {selectedApp.entranceScore}</div>
                  <div><span className="text-slate-500">10th Class:</span> {selectedApp.tenthPercentage}% ({selectedApp.tenthBoard}, {selectedApp.tenthSchool})</div>
                  <div><span className="text-slate-500">12th Class:</span> {selectedApp.twelfthPercentage}% ({selectedApp.twelfthStream}, {selectedApp.twelfthSchool})</div>
                </div>
              </div>

              {/* Statement of Purpose */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900 text-xs border-b pb-1 mb-1.5">Statement of Purpose</div>
                <p className="text-slate-700 italic leading-relaxed">
                  "{selectedApp.statementOfPurpose}"
                </p>
              </div>

            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
