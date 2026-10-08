export interface Course {
  id: string;
  name: string;
  code: string;
  level: 'UG' | 'PG';
  department: string;
  duration: string;
  seats: number;
  annualFee: string;
  eligibility: string;
  description: string;
  syllabusHighlights: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  department: string;
  designation: string;
  qualification: string;
  experience: string;
  specialization: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Admission' | 'Academic' | 'Examination' | 'Event';
  isNew?: boolean;
}

export const college = {
  name: "Sunrise Institute of Technology & Management",
  shortName: "SITM",
  tagline: "Learn. Lead. Inspire.",
  established: 1998,
  affiliation: "Affiliated to Greenfield State University, AICTE approved, NAAC A grade",
  accreditations: ["AICTE Approved", "NAAC 'A' Grade Accredited", "Greenfield State University Affiliated", "ISO 9001:2015"],
  address: "45 University Road, Knowledge Park, Greenfield City, ST 12345",
  phone: "+91 98765 43210",
  admissionHelpline: "+91 98765 00000",
  email: "info@sunriseinstitute.edu",
  admissionEmail: "admissions@sunriseinstitute.edu",
  officeHours: "Mon–Sat, 9:00 AM – 5:00 PM",
  about: "Sunrise Institute of Technology & Management stands as a beacon of academic distinction, research innovation, and career leadership. With a sprawling lush-green campus, state-of-the-art research laboratories, and strong industry tie-ups, we prepare tomorrow's leaders to excel in a rapidly evolving technological landscape.",
  vision: "To be an internationally acclaimed educational institution recognized for academic excellence, innovative research, and value-based professional leadership.",
  mission: "To deliver rigorous, future-ready education, foster entrepreneurial thinking, cultivate ethical values, and drive research addressing societal challenges through close collaboration with global industries.",
  stats: [
    { label: "Legacy of Excellence", value: "25+ Years" },
    { label: "Enrolled Students", value: "5,000+" },
    { label: "Expert Faculty", value: "200+" },
    { label: "Placement Track Record", value: "90%" },
    { label: "Highest Package", value: "₹42 LPA" },
    { label: "Corporate Partners", value: "150+" }
  ],
  importantDates: [
    { event: "Online Applications Open", date: "April 15, 2026" },
    { event: "Early Round Admission Deadline", date: "May 30, 2026" },
    { event: "Merit List Announcement", date: "June 10, 2026" },
    { event: "Counseling & Document Verification", date: "June 18 - 25, 2026" },
    { event: "Commencement of Classes", date: "August 3, 2026" }
  ]
};

export const courses: Course[] = [
  {
    id: "btech-cs",
    name: "B.Tech Computer Science & Engineering",
    code: "CSE101",
    level: "UG",
    department: "Computer Science & Engineering",
    duration: "4 Years (8 Semesters)",
    seats: 120,
    annualFee: "₹1,20,000/yr",
    eligibility: "10+2 with Physics, Chemistry & Mathematics with min 60% aggregate (55% for reserved category)",
    description: "A comprehensive program in software architecture, algorithms, cloud computing, artificial intelligence, and full-stack systems engineering designed with leading technology giants.",
    syllabusHighlights: [
      "Data Structures, Algorithms & Computational Complexity",
      "Full-Stack Web & Cloud Architecture (Microservices, Docker, K8s)",
      "Artificial Intelligence, Machine Learning & Deep Learning",
      "Operating Systems, Networks & Cybersecurity Defense",
      "Capstone Industry Project & 6-Month Corporate Internship"
    ]
  },
  {
    id: "btech-ece",
    name: "B.Tech Electronics & Communication",
    code: "ECE102",
    level: "UG",
    department: "Electronics & Communication Engineering",
    duration: "4 Years (8 Semesters)",
    seats: 60,
    annualFee: "₹1,10,000/yr",
    eligibility: "10+2 with Physics, Chemistry & Mathematics with min 60% aggregate",
    description: "Covers VLSI design, embedded microcontrollers, IoT hardware, wireless communication technologies, robotics, and next-generation signal processing.",
    syllabusHighlights: [
      "Digital Logic & Analog Electronic Circuit Design",
      "Microprocessors, Microcontrollers & ARM Architecture",
      "VLSI System Design using Cadence & Verilog HDL",
      "Internet of Things (IoT) & Smart Embedded Systems",
      "Wireless & 5G Cellular Communication Protocols"
    ]
  },
  {
    id: "bca",
    name: "BCA (Bachelor of Computer Applications)",
    code: "BCA103",
    level: "UG",
    department: "Information Technology",
    duration: "3 Years (6 Semesters)",
    seats: 60,
    annualFee: "₹60,000/yr",
    eligibility: "10+2 in any stream with Mathematics / Computer Studies preferred, min 50% aggregate",
    description: "Focuses on applied computer applications, enterprise software development, database administration, web development, and digital system integration.",
    syllabusHighlights: [
      "Programming Fundamentals in Python, C++ & Java",
      "Relational Database Management Systems (PostgreSQL, MySQL)",
      "Modern Web Applications (HTML5, Tailwind, React, Node.js)",
      "Mobile Application Development (Flutter & Android)",
      "Cyber Law, Software Testing & Agile Methodologies"
    ]
  },
  {
    id: "bba",
    name: "BBA (Bachelor of Business Administration)",
    code: "BBA104",
    level: "UG",
    department: "Management Studies",
    duration: "3 Years (6 Semesters)",
    seats: 60,
    annualFee: "₹55,000/yr",
    eligibility: "10+2 in any stream from a recognized board with minimum 50% aggregate",
    description: "Develops core management acumen across marketing, corporate finance, human resources, supply chain, and entrepreneurship through business simulations.",
    syllabusHighlights: [
      "Principles of Management & Organizational Dynamics",
      "Marketing Management & Digital Brand Strategy",
      "Corporate Financial Accounting & Business Law",
      "Human Resource Management & Talent Analytics",
      "Startup Incubation & Business Plan Formulation"
    ]
  },
  {
    id: "bcom-hons",
    name: "B.Com (Hons) Professional",
    code: "BCM105",
    level: "UG",
    department: "Commerce & Finance",
    duration: "3 Years (6 Semesters)",
    seats: 90,
    annualFee: "₹40,000/yr",
    eligibility: "10+2 with Commerce / Mathematics with minimum 50% aggregate",
    description: "In-depth specialization in corporate auditing, direct & indirect taxation, financial analysis, investment banking, and fintech tools.",
    syllabusHighlights: [
      "Advanced Financial Accounting & IFRS Standards",
      "GST, Direct Taxation & Corporate Tax Planning",
      "Banking Operations, FinTech & Financial Markets",
      "Auditing Practices & Corporate Governance",
      "Financial Modeling with Excel & Data Analytics"
    ]
  },
  {
    id: "mba",
    name: "MBA (Master of Business Administration)",
    code: "MBA201",
    level: "PG",
    department: "Management Studies",
    duration: "2 Years (4 Semesters)",
    seats: 60,
    annualFee: "₹1,50,000/yr",
    eligibility: "Bachelor's Degree in any discipline with min 50% aggregate (CAT / MAT / CMAT / University Test score)",
    description: "Dual-specialization MBA offering concentrations in Marketing, Finance, HR, Business Analytics, and Operations with executive masterclasses.",
    syllabusHighlights: [
      "Strategic Management & Global Business Leadership",
      "Data Analytics & Predictive Business Intelligence",
      "Investment Analysis, Portfolio Management & M&A",
      "Omnichannel Marketing & Consumer Behavior Analysis",
      "Live Corporate Consulting Capstone & Summer Internship"
    ]
  },
  {
    id: "mtech-cs",
    name: "M.Tech Computer Science & Engineering",
    code: "MTC202",
    level: "PG",
    department: "Computer Science & Engineering",
    duration: "2 Years (4 Semesters)",
    seats: 30,
    annualFee: "₹1,00,000/yr",
    eligibility: "B.Tech/BE in CSE/IT or MCA/M.Sc (CS) with minimum 60% aggregate (GATE qualified preferred)",
    description: "Advanced research-driven postgraduate degree emphasizing deep learning architectures, distributed computing, cyber defense, and big data engineering.",
    syllabusHighlights: [
      "Advanced Algorithms & High-Performance Distributed Systems",
      "Natural Language Processing & Generative AI Systems",
      "Cloud Infrastructure, Kubernetes & Edge Computing",
      "Cryptographic Protocols & Advanced Cyber Forensics",
      "Postgraduate Dissertation & IEEE Conference Research Publication"
    ]
  }
];

export const faculty: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Dr. Arvind Ramanathan",
    department: "Computer Science & Engineering",
    designation: "Professor & Dean (Academics)",
    qualification: "Ph.D. (IIT Delhi), M.Tech (CSE)",
    experience: "22 Years",
    specialization: "Artificial Intelligence, High Performance Computing"
  },
  {
    id: "fac-2",
    name: "Dr. Meenakshi Sundaram",
    department: "Electronics & Communication",
    designation: "Head of Department & Professor",
    qualification: "Ph.D. (IISc Bangalore), M.Tech (VLSI)",
    experience: "19 Years",
    specialization: "VLSI Architecture, Embedded Robotics"
  },
  {
    id: "fac-3",
    name: "Prof. Rajeshwari Kulkarni",
    department: "Management Studies",
    designation: "Professor & Director (MBA)",
    qualification: "Ph.D. (IIM Ahmedabad fellow), MBA (Finance)",
    experience: "18 Years",
    specialization: "Strategic Finance, Corporate Mergers"
  },
  {
    id: "fac-4",
    name: "Dr. Sandeep Vardhan",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    qualification: "Ph.D. (BITS Pilani), B.Tech (CSE)",
    experience: "14 Years",
    specialization: "Cybersecurity, Distributed Ledger Systems"
  },
  {
    id: "fac-5",
    name: "Prof. Ananya Sen",
    department: "Information Technology",
    designation: "Associate Professor (BCA)",
    qualification: "M.Tech (IT), Ph.D. (Pursuing)",
    experience: "12 Years",
    specialization: "Full-Stack Web Architectures, Cloud Platforms"
  },
  {
    id: "fac-6",
    name: "Dr. Pradeep Mathur",
    department: "Commerce & Finance",
    designation: "Head of Department (B.Com)",
    qualification: "Ph.D. (Delhi School of Economics), FCA",
    experience: "16 Years",
    specialization: "Corporate Taxation, Auditing, FinTech"
  }
];

export const facilities: Facility[] = [
  {
    id: "fac-lib",
    title: "Central Digital Library",
    description: "Over 65,000+ volumes, IEEE/Springer digital access, 24/7 quiet air-conditioned reading halls, and automated RFID kiosk book checkout.",
    iconName: "BookOpen",
    features: ["65,000+ Volumes & Textbooks", "IEEE, Scopus & ScienceDirect E-Journals", "RFID Auto Checkout Kiosks", "Dedicated Research Scholars Pod"]
  },
  {
    id: "fac-labs",
    title: "Advanced Computing & AI Labs",
    description: "High-spec workstations equipped with NVIDIA RTX GPUs, Apple Silicon labs, IoT maker equipment, and enterprise Cisco networking racks.",
    iconName: "Cpu",
    features: ["NVIDIA RTX GPU Clusters", "Apple Mac Development Suite", "IoT & Robotics Hardware Station", "Gigabit LAN Backbone"]
  },
  {
    id: "fac-hostel",
    title: "Residential Hostels",
    description: "Secure, home-like single and shared furnished accommodation with attached washrooms, biometric security, hygienic mess, and solar water heating.",
    iconName: "Home",
    features: ["Separate Boys & Girls Hostels", "24/7 Security & CCTV Monitoring", "Nutritious Four-Meal Mess", "Recreation Lounges & Gymnasium"]
  },
  {
    id: "fac-sports",
    title: "Sports & Athletics Arena",
    description: "Olympic-standard basketball courts, cricket turf, indoor badminton arena, synthetic tennis courts, and certified fitness trainers.",
    iconName: "Trophy",
    features: ["Floodlit Cricket & Football Turf", "Indoor Badminton & Table Tennis", "Full Gymnasium with Trainers", "Annual Inter-University Fest"]
  },
  {
    id: "fac-cafe",
    title: "Multicuisine Food Court",
    description: "Spacious cafeteria serving healthy vegetarian and international cuisines, freshly brewed coffees, and juice counters adhering to FSSAI standards.",
    iconName: "Coffee",
    features: ["FSSAI Certified Hygiene", "Multi-cuisine Menu & Bakery", "Spacious 400-Seater Dining Hall", "Student Discount Pricing"]
  },
  {
    id: "fac-wifi",
    title: "Smart Wi-Fi Campus",
    description: "High-speed 1 Gbps redundant leased fiber lines covering entire campus quads, auditoriums, hostel corridors, and cafeteria lounges.",
    iconName: "Wifi",
    features: ["1 Gbps Redundant Fiber Uplink", "Secure Enterprise Wi-Fi 6 Access", "Smart Projector Classrooms", "24/7 IT Helpdesk Support"]
  }
];

export const placements = {
  stats: [
    { value: "90%", label: "Placement Percentage" },
    { value: "₹42 LPA", label: "Highest Domestic Package" },
    { value: "₹8.5 LPA", label: "Average CTC" },
    { value: "150+", label: "Visiting Recruiters" },
    { value: "620+", label: "Job Offers Handed in 2025-26" },
    { value: "45+", label: "Fortune 500 Recruiters" }
  ],
  recruiters: [
    "Google", "Microsoft", "Amazon", "Deloitte", "Tata Consultancy Services",
    "Infosys", "Wipro", "Cognizant", "Accenture", "Larsen & Toubro",
    "HCL Technologies", "IBM", "Capgemini", "Tech Mahindra", "Aditya Birla Capital"
  ]
};

export const notices: Notice[] = [
  {
    id: "not-1",
    title: "Admission Applications Open for Academic Session 2026-27 (UG & PG)",
    date: "April 02, 2026",
    category: "Admission",
    isNew: true
  },
  {
    id: "not-2",
    title: "SITM Annual Techno-Management Fest 'IGNITE 2026' Schedule Announced",
    date: "March 28, 2026",
    category: "Event",
    isNew: true
  },
  {
    id: "not-3",
    title: "End-Semester Examination Time Table Published on Student Portal",
    date: "March 20, 2026",
    category: "Examination"
  },
  {
    id: "not-4",
    title: "Campus Placement Drive with Microsoft & Amazon for Final Year Cohort",
    date: "March 15, 2026",
    category: "Academic"
  },
  {
    id: "not-5",
    title: "AICTE Sponsored National Workshop on Generative AI & Cloud Systems",
    date: "March 08, 2026",
    category: "Academic"
  }
];

export const admissionSteps = [
  {
    step: "01",
    title: "Register & Fill Form",
    desc: "Complete the online 4-step application with personal, academic, and course preferences."
  },
  {
    step: "02",
    title: "Document Screening",
    desc: "Our admissions committee reviews your submitted academic records and eligibility criteria."
  },
  {
    step: "03",
    title: "Merit & Counseling",
    desc: "Merit lists are released online followed by personalized seat allocation counseling."
  },
  {
    step: "04",
    title: "Enrollment & Welcome",
    desc: "Confirm your seat by paying initial semester fees and receive your formal student enrollment kit."
  }
];

export const faqs = [
  {
    q: "What is the minimum eligibility criteria for B.Tech programs?",
    a: "Candidates must have passed 10+2 with Physics and Mathematics as mandatory subjects along with Chemistry/Computer Science, securing at least 60% aggregate marks (55% for SC/ST/OBC categories)."
  },
  {
    q: "Are scholarships available for meritorious students?",
    a: "Yes! SITM offers merit-based fee waivers of up to 50% for candidates scoring 90%+ in 10+2 / entrance exams, as well as sports achiever and economic concession schemes."
  },
  {
    q: "Can I apply for more than one course with a single account?",
    a: "Yes, you can submit separate applications for distinct programs. Each submission generates a unique Application ID."
  },
  {
    q: "What is the procedure after submitting the online application?",
    a: "You will receive an instant Application ID confirmation. Shortlisted applicants will receive counseling call letters and instructions via registered email."
  },
  {
    q: "Is hostel accommodation guaranteed for outstation students?",
    a: "Yes, we guarantee safe, modern hostel accommodations for all outstation first-year students on a first-come, first-served basis upon seat confirmation."
  }
];
