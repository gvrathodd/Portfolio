/**
 * ==============================================================================
 * PORTFOLIO DATA CONFIGURATION
 * ==============================================================================
 * Welcome to your portfolio configuration!
 * Even if you have ZERO web development experience, you can customize everything
 * on your website right here. Simply change the text inside quotes ("...")!
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'AI & ML' | 'Software Dev' | 'Android & Mobile' | 'Systems & Robotics';
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  highlights: string[];
  metrics?: { label: string; value: string };
  badge?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  category: 'Education' | 'Leadership' | 'Activities';
  highlights: string[];
  badge?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: 'Proficient' | 'Advanced' | 'Familiar'; icon?: string }[];
}

export interface PortfolioData {
  personal: {
    name: string;
    preferredName: string;
    role: string;
    statusBadge: string;
    location: string;
    tagline: string;
    aboutMe: string;
    resumeUrl: string;
    email: string;
    phone: string;
    socials: {
      github: string;
      linkedin: string;
      leetcode: string;
      codeforces: string;
    };
    quickStats: { label: string; value: string }[];
  };
  projects: Project[];
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
}

export const portfolioData: PortfolioData = {
  // ----------------------------------------------------------------------------
  // HERO & PERSONAL INFORMATION
  // ----------------------------------------------------------------------------
  personal: {
    name: "Gaurav Girish Rathod",
    preferredName: "Gaurav",
    role: "Software Engineer & AI/ML Developer",
    statusBadge: "Available for Software & AI/ML Roles",
    location: "IIT Mandi & Mumbai, India",
    tagline: "Engineering intelligent machine learning pipelines, high-performance systems, and fluid digital applications.",
    aboutMe: "I am an engineering undergraduate at IIT Mandi with a passion for systems programming, machine learning, and generative AI. From architecting dual-branch deepfake detectors and autonomous computer vision vehicles to building modern Android and web applications, I love solving complex technical challenges with clean, robust code.",
    resumeUrl: "/Gaurav_Rathod_Resume.pdf",
    email: "gauravrathod140706@gmail.com",
    phone: "+91 9324892309",
    socials: {
      github: "https://github.com/gvrathodd",
      linkedin: "https://linkedin.com/in/gaurav-girish-rathod", // Update with exact handle if desired
      leetcode: "https://leetcode.com/gvrathodd",
      codeforces: "https://codeforces.com/profile/gvrathodd",
    },
    quickStats: [
      { label: "CGPA at IIT Mandi", value: "8.34" },
      { label: "Algorithmic Problems Solved", value: "500+" },
      { label: "Fundraising Lead (Xpecto)", value: "INR 20L+" },
      { label: "Hackathon Finishes", value: "Top 3" },
    ]
  },

  // ----------------------------------------------------------------------------
  // FEATURED PROJECTS
  // ----------------------------------------------------------------------------
  projects: [
    {
      id: "deepfake-detection",
      title: "Robust Deepfake Detection Under Domain Shift",
      tagline: "State-of-the-art multimodal vision pipeline utilizing DINOv2 and Optimal Transport",
      description: "Coupled a 307M-parameter DINOv2 ViT-L/14 with a 30-kernel SRM frequency stream to isolate high-frequency noise artifacts. Implemented Fused Gromov-Wasserstein (FGW) module with a 20-iteration Sinkhorn solver to match patch graphs against 32 real-face prototypes.",
      category: "AI & ML",
      tags: ["PyTorch", "DINOv2 ViT", "Optimal Transport (FGW)", "SRM", "Computer Vision", "Python"],
      githubUrl: "https://github.com/gvrathodd",
      featured: true,
      badge: "Research & AI",
      metrics: { label: "WildDeepfake AUC", value: "0.884 (+5.3%)" },
      highlights: [
        "Surpassed XceptionNet baseline across all metrics: Recall lifted from 48.0% to 74.0% (+26%).",
        "Attained 0.946 validation AUC (88.7% accuracy) across 140k+ compressed test samples.",
        "Built graph matching mechanism yielding 224x224 interpretable anomaly heatmaps."
      ]
    },
    {
      id: "ai-knowledge-assistant",
      title: "AI Personal Knowledge Assistant",
      tagline: "Context-aware conversational intelligence powered by RAG and modern LLM agents",
      description: "An intelligent personal knowledge companion that indexes personal notes, documentation, and research papers using vector embeddings. Features high-speed retrieval augmented generation (RAG), conversational memory, and tool-calling automation.",
      category: "AI & ML",
      tags: ["Python", "FastAPI", "RAG", "LLMs", "Vector DB", "LangChain", "OpenAI / HuggingFace"],
      githubUrl: "https://github.com/gvrathodd",
      featured: true,
      badge: "Generative AI",
      metrics: { label: "Query Retrieval Latency", value: "< 250ms" },
      highlights: [
        "Semantic document chunking with hybrid keyword + vector retrieval for high relevance.",
        "Engineered with FastAPI backend and modular MCP/tool-calling architecture.",
        "Interactive citations linking directly to indexed source materials."
      ]
    },
    {
      id: "chatroom-app",
      title: "Chatroom App",
      tagline: "Modern real-time Android communication application",
      description: "A fast, native Android chat client featuring secure user authentication, instant peer-to-peer message synchronization, and intuitive room creation with clean MVVM architecture.",
      category: "Android & Mobile",
      tags: ["Kotlin", "Android SDK", "Firebase Firestore", "Jetpack Compose", "Coroutines", "MVVM"],
      githubUrl: "https://github.com/gvrathodd/ChatRoomApp",
      featured: true,
      badge: "Mobile App",
      metrics: { label: "Realtime Sync", value: "Sub-second" },
      highlights: [
        "Real-time reactive messaging backed by Firebase Firestore snapshot listeners.",
        "Modern Material Design 3 and responsive Jetpack Compose UI with dark mode support.",
        "Offline caching and state resilience using Kotlin Coroutines and StateFlow."
      ]
    },
    {
      id: "hudson-rc-car",
      title: "Hudson Vision RC Car",
      tagline: "Autonomous vision-based lane tracking and obstacle navigation vehicle",
      description: "An autonomous miniature vehicle system equipped with onboard camera feeds and real-time computer vision processing to detect lane markings, calculate steering curvature, and execute throttle control in real time.",
      category: "Systems & Robotics",
      tags: ["Python", "OpenCV", "Embedded Systems", "Motor Telemetry", "PID Controller", "Computer Vision"],
      githubUrl: "https://github.com/gvrathodd/vision_lan_nav",
      featured: true,
      badge: "Robotics & CV",
      metrics: { label: "Frame Processing", value: "30+ FPS" },
      highlights: [
        "Designed edge detection and inverse perspective mapping (bird's-eye view) algorithms in OpenCV.",
        "Implemented closed-loop PID steering controller for smooth trajectory correction.",
        "Integrated lightweight hardware telemetry communicating with microcontroller drive controllers."
      ]
    },
    {
      id: "finance-tracker",
      title: "Finance Tracker (FrostHack 2025)",
      tagline: "Smart expense analytics and budgeting tool built for FrostHack 2025",
      description: "Developed during FrostHack 2025 to empower students and professionals to track cash flow, categorize recurring expenses automatically, and visualize financial runway with interactive graphs.",
      category: "Software Dev",
      tags: ["Python", "Flask", "SQLite", "Data Analysis", "Matplotlib / Chart.js", "Hackathon"],
      githubUrl: "https://github.com/gvrathodd/FinanceTraker",
      featured: false,
      badge: "Hackathon Project",
      metrics: { label: "Built for", value: "FrostHack 2025" },
      highlights: [
        "Automated spending categorization based on merchant transaction descriptions.",
        "Dynamic budget threshold alerts with predictive expense extrapolation.",
        "Clean, responsive dashboard with fast local SQLite persistence."
      ]
    },
    {
      id: "process-discovery-engine",
      title: "Process Discovery & HITL Automation Engine",
      tagline: "Multimodal workflow boundary detection and human-in-the-loop web automation",
      description: "Temporal boundary-detection pipeline on 183k+ operation logs combined with isolated PaddleOCR extraction over 1.1k+ UI captures to identify and automate repetitive back-office workflows.",
      category: "AI & ML",
      tags: ["Python", "Playwright", "Scikit-Learn", "PaddleOCR", "Process Mining", "HistGradientBoosting"],
      githubUrl: "https://github.com/gvrathodd/automation-proposal",
      featured: false,
      badge: "Enterprise AI",
      metrics: { label: "Boundary F1 Score", value: "0.905" },
      highlights: [
        "Consolidated 540 unlabelled work units across 15 production sessions with 1.10s mean error.",
        "Categorized 5 operational families and isolated 209 target workflow units consuming 35.8% of runtime.",
        "Parameterized Playwright browser automation suite featuring safe-stop invariants and HITL validation."
      ]
    },
    {
      id: "path-finder",
      title: "Path-Finder: Algorithmic Graph Traversal Engine",
      tagline: "Interactive 60 FPS visual traversal engine for graph search algorithms",
      description: "Interactive pathfinding simulator rendering Dijkstra, A*, BFS, and DFS traversals on dynamically weighted grid topologies with custom heuristic queues and recursive maze generation.",
      category: "Software Dev",
      tags: ["React", "JavaScript", "Graph Theory", "Algorithms", "Web Performance", "Vite"],
      githubUrl: "https://github.com/gvrathodd/Path-Finder",
      liveUrl: "https://github.com/gvrathodd/Path-Finder",
      featured: false,
      badge: "Web & Algorithms",
      metrics: { label: "Frame Rate", value: "60 FPS" },
      highlights: [
        "Renders 2,500+ nodes under 16ms animation frames on dynamic weighted grids.",
        "Decoupled path calculation from UI re-renders using custom heuristic queues.",
        "Built recursive maze generation and state-export tools, cutting map setup time by 70%."
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // EXPERIENCE & ACTIVITIES
  // ----------------------------------------------------------------------------
  experience: [
    {
      id: "iit-mandi",
      role: "B.Tech Engineering Undergraduate",
      organization: "Indian Institute of Technology (IIT), Mandi",
      period: "August 2024 – Present",
      location: "Himachal Pradesh, India",
      category: "Education",
      badge: "CGPA: 8.34 / 10",
      description: "Pursuing engineering with intensive coursework in computer science, machine learning, systems architecture, and mathematical foundations.",
      highlights: [
        "Relevant Coursework: Programming & Data Structures, Machine Learning, Deep Learning, Operating Systems, Database Management Systems (DBMS), Computer Networks, Design of Algorithms, Linear Algebra.",
        "Active member of technical student societies, robotics initiatives, and collegiate coding competitions."
      ]
    },
    {
      id: "xpecto-26",
      role: "Sponsorship Head",
      organization: "Xpecto '26 (Annual Tech Fest, IIT Mandi)",
      period: "September 2025 – March 2026",
      location: "IIT Mandi, India",
      category: "Leadership",
      badge: "INR 20+ Lakh Raised",
      description: "Spearheaded the corporate outreach, sponsorship acquisitions, and partnership pipeline for IIT Mandi's flagship national technical festival.",
      highlights: [
        "Directed a 25-member cross-functional team across pitching, negotiations, and contract deliverables.",
        "Successfully secured INR 20+ Lakh in sponsorship from 20+ corporate and public sector leaders.",
        "Streamlined pitch decks, CRM lead tracking, and institutional partnership deliverables."
      ]
    },
    {
      id: "design-practicum",
      role: "Team Lead — IoT Neonatal Warmer",
      organization: "Design Practicum, IIT Mandi",
      period: "August 2025 – December 2025",
      location: "IIT Mandi, India",
      category: "Leadership",
      badge: "Hardware & IoT",
      description: "Directed an engineering team to architect and build a low-cost, high-reliability IoT neonatal infant warmer for rural clinical settings.",
      highlights: [
        "Reduced prototype production cost to INR 8,000 against the standard commercial baseline of INR 1 Lakh.",
        "Implemented real-time thermal sensing, automated temperature regulation, and safety cut-off loops.",
        "Delivered a working physical prototype verified under clinical safety guidelines."
      ]
    },
    {
      id: "sae-society",
      role: "Automotive Dynamics & Telemetry Member",
      organization: "Society of Automotive Engineers (SAE)",
      period: "2024 – Present",
      location: "IIT Mandi, India",
      category: "Activities",
      badge: "SAE Collegiate",
      description: "Collaborated on automotive systems, chassis telemetry, sensor data logging, and electric/mechanical powertrain integration.",
      highlights: [
        "Analyzed real-time sensor streams and motor controllers for collegiate racing competitions.",
        "Worked across multidisciplinary subsystems bridging software telemetry with mechanical hardware."
      ]
    },
    {
      id: "ranneeti",
      role: "Organizing Committee Member",
      organization: "Ranneeti (Annual Sports Fest, IIT Mandi)",
      period: "2024 – 2025",
      location: "IIT Mandi, India",
      category: "Activities",
      badge: "Sports & Operations",
      description: "Organized tournament operations, hospitality, and event scheduling for inter-college contingents from across India.",
      highlights: [
        "Managed logistical coordination and live scheduling for multi-sport tournament brackets.",
        "Facilitated campus facilities and athlete accommodations for 500+ visiting competitors."
      ]
    },
    {
      id: "hackathons-cp",
      role: "Competitive Programmer & Hackathon Finalist",
      organization: "HACK60, FrostHack, Codeforces & LeetCode",
      period: "2024 – Present",
      location: "National / Online",
      category: "Activities",
      badge: "Top Honors",
      description: "Active competitive programmer and hackathon builder solving algorithmic and real-world engineering problems.",
      highlights: [
        "1st Runner-Up in Deep Learning Hackathon HACK60 for an end-to-end computer vision solution.",
        "Won 3rd Position pan-IIT in the Sustainable City Planning Case Study at IIT Roorkee (Inter-IIT).",
        "Solved 500+ algorithmic challenges on LeetCode and Codeforces (Rating: 1200+)."
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // SKILLS & TECH STACK
  // ----------------------------------------------------------------------------
  skillCategories: [
    {
      title: "Languages & Core",
      description: "Foundational programming languages used for high-efficiency systems and algorithms",
      skills: [
        { name: "C++ (C++17)", level: "Advanced" },
        { name: "Python", level: "Advanced" },
        { name: "Kotlin (Android)", level: "Proficient" },
        { name: "JavaScript / TypeScript", level: "Proficient" },
        { name: "C", level: "Proficient" },
        { name: "SQL", level: "Proficient" },
        { name: "Linux / Bash", level: "Proficient" }
      ]
    },
    {
      title: "AI, Machine Learning & Vision",
      description: "Deep learning frameworks, computer vision architectures, and agent workflows",
      skills: [
        { name: "PyTorch", level: "Advanced" },
        { name: "TensorFlow / Keras", level: "Proficient" },
        { name: "OpenCV", level: "Advanced" },
        { name: "HuggingFace Transformers", level: "Proficient" },
        { name: "LLMs & RAG Systems", level: "Advanced" },
        { name: "Model Context Protocol (MCP)", level: "Proficient" },
        { name: "Scikit-Learn", level: "Advanced" },
        { name: "CUDA & Acceleration", level: "Familiar" }
      ]
    },
    {
      title: "Web, Mobile & Backend",
      description: "Modern frameworks for responsive full-stack apps and native mobile clients",
      skills: [
        { name: "React & Next.js", level: "Proficient" },
        { name: "FastAPI", level: "Advanced" },
        { name: "Flask & Django", level: "Proficient" },
        { name: "Android Jetpack Compose", level: "Proficient" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "RESTful APIs", level: "Advanced" },
        { name: "Firebase (Auth, Firestore)", level: "Advanced" },
        { name: "PostgreSQL & SQLite", level: "Proficient" }
      ]
    },
    {
      title: "DevOps, Tools & Data",
      description: "Deployment, automation testing, version control, and data engineering",
      skills: [
        { name: "Git & GitHub Actions", level: "Advanced" },
        { name: "Docker", level: "Proficient" },
        { name: "Playwright Automation", level: "Advanced" },
        { name: "Azure (AI Foundry) / AWS", level: "Familiar" },
        { name: "Pandas & NumPy", level: "Advanced" },
        { name: "Databricks & Neo4j", level: "Familiar" },
        { name: "GDB & Unit Testing", level: "Proficient" }
      ]
    }
  ]
};
