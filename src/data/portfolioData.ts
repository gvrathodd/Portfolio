/**
 * All site content lives here. Edit the strings; the components pick them up.
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  highlights: string[];
  metrics?: { label: string; value: string };
  year?: string;
  gallery?: { src: string; alt: string; caption: string }[];
  /** Before/after bars shown in the expanded project. `max` is the scale (100 for %, 1 for scores). */
  comparison?: {
    baselineLabel: string;
    rows: { label: string; before: number; after: number; max: number; unit?: string }[];
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
}

export interface Competition {
  result: string;
  event: string;
  detail: string;
}

export interface Skill {
  name: string;
  /** Where it was actually used: the evidence behind the claim. */
  usedIn: string[];
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface PortfolioData {
  personal: {
    name: string;
    availability: string;
    location: string;
    education: string;
    focus: string;
    intro: string;
    introAside: string;
    resumeUrl: string;
    email: string;
    socials: { label: string; url: string }[];
  };
  about: {
    title: string;
    paragraphs: string[];
    photo: string;
    photoAlt: string;
    photoCaption: string;
  };
  stats: Stat[];
  projects: Project[];
  experience: ExperienceItem[];
  competitions: Competition[];
  education: { degree: string; school: string; period: string; note: string };
  skills: SkillGroup[];
  /** Tools used, but not yet in a project shown here. Kept to one honest line. */
  alsoFamiliar: string[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Gaurav Girish Rathod",
    availability: "Open to software & ML roles",
    location: "Mandi & Mumbai, India",
    education: "B.Tech Civil Engineering, IIT Mandi",
    focus: "Computer vision, ML systems, C++",
    intro: "Civil Engineering at IIT Mandi by degree. Machine learning and systems software by choice.",
    introAside: "Lately: a deepfake detector that holds up on data it wasn't trained on, and a pipeline that finds the busywork hiding in 183k office logs.",
    resumeUrl: "/Gaurav_Rathod_Resume.pdf",
    email: "contact.gauravgrathod@gmail.com",
    socials: [
      { label: "GitHub", url: "https://github.com/gvrathodd" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/gauravgirishrathod/" },
      { label: "LeetCode", url: "https://leetcode.com/u/gvrathodd/" },
      { label: "Codeforces", url: "https://codeforces.com/profile/gauravrathod140706" },
    ],
  },

  about: {
    title: "From load paths to loss curves",
    paragraphs: [
      "I came to IIT Mandi to study Civil Engineering, and for the first semester that was the whole plan. Then Programming and Data Structures happened. I'd spend an afternoon working out by hand how a single beam carries its load, then spend the evening writing code that could check a thousand beams before I'd finished one. That was the hook.",
      "Civil never really left, though. It taught me to think about systems in terms of constraints, margins and failure modes, and that is still how I approach ML. A deepfake detector is only worth something if it holds up on faces it has never seen, the same way a bridge is only worth something if it holds up on the day nobody tested for.",
      "So I do both. I took every CS elective I could fit, still show up for civil case studies (we placed third across the IITs in sustainable city planning), and spend most of my evenings on models, C++ and whatever I'm building next. Mandi turns out to be a good place to stare at a loss curve. There's a mountain outside every window.",
    ],
    photo: "/me.jpg",
    photoAlt: "Gaurav smiling on a terrace, with pine-covered hills and a blue sky behind him",
    photoCaption: "Mandi, Himachal Pradesh",
  },

  stats: [
    { value: 0.884, decimals: 3, label: "Cross-domain AUC", context: "Deepfake detector on WildDeepfake, up from a 0.831 baseline" },
    { value: 20, prefix: "₹", suffix: "L+", label: "Sponsorship raised", context: "Xpecto '26, leading a 25-person team" },
    { value: 8000, prefix: "₹", label: "Neonatal warmer prototype", context: "Against roughly ₹1 lakh for a commercial unit" },
    { value: 500, suffix: "+", label: "Problems solved", context: "LeetCode and Codeforces, rated 1200+" },
  ],

  projects: [
    {
      id: "deepfake-detection",
      title: "Deepfake detection under domain shift",
      tagline: "A two-stream detector that generalises to fakes from unseen sources.",
      description: "Most deepfake detectors memorise one generator's fingerprints and fall apart on anything new. This one pairs a frozen 307M-parameter DINOv2 ViT-L/14 with a 30-kernel SRM noise stream, fused into a 1153-d head. A Fused Gromov-Wasserstein module (20-iteration Sinkhorn) then matches each face's patch graph against a bank of 32 real-face prototypes, so the model learns what real looks like instead.",
      category: "Research · ML",
      tags: ["PyTorch", "DINOv2", "Optimal transport", "SRM", "OpenCV"],
      githubUrl: "https://github.com/Krupal-1219/Deepfake-detection-SSL",
      featured: true,
      metrics: { label: "AUC on WildDeepfake", value: "0.884" },
      year: "2026",
      highlights: [
        "0.946 validation AUC (88.7% accuracy) over 140k+ heavily compressed test samples.",
        "Graph matching produces 224×224 heatmaps showing which regions look manipulated.",
      ],
      gallery: [
        { src: "/projects/deepfake/heatmap-1.webp", alt: "Fake face with anomaly heatmap concentrated on the cheeks and jaw", caption: "Fake, flagged at p = 0.987. Anomalies cluster along the blended cheek and jaw." },
        { src: "/projects/deepfake/heatmap-2.webp", alt: "Fake face with two sharp anomaly hotspots on the right side", caption: "Fake, p = 0.940. Two tight hotspots where the face swap meets the hair." },
        { src: "/projects/deepfake/heatmap-3.webp", alt: "Real face with diffuse, low-intensity heatmap", caption: "Real, p = 0.000. Only scattered, low-energy responses." },
        { src: "/projects/deepfake/heatmap-4.webp", alt: "Real face with heatmap spread across the background", caption: "Real, p = 0.009. Activation spreads into the background, not the face." },
      ],
      comparison: {
        baselineLabel: "XceptionNet (published)",
        rows: [
          { label: "Recall", before: 48.0, after: 74.0, max: 100, unit: "%" },
          { label: "Accuracy", before: 72.3, after: 76.5, max: 100, unit: "%" },
          { label: "F1", before: 0.59, after: 0.76, max: 1 },
          { label: "Cross-domain AUC", before: 0.831, after: 0.884, max: 1 },
        ],
      },
    },
    {
      id: "process-discovery-engine",
      title: "Process discovery & HITL automation",
      tagline: "Finding the repetitive work in back-office logs, then automating it with a human in the loop.",
      description: "Back-office staff repeat the same workflows all day, but nobody logs where one task ends and the next begins. A HistGradientBoosting boundary detector over 183k+ operation logs recovers those work units, PaddleOCR (>0.97 confidence) reads 1.1k+ UI screenshots to label them, and a Playwright suite automates the worst offenders, with a human approving every step.",
      category: "ML · Automation",
      tags: ["Python", "Playwright", "scikit-learn", "PaddleOCR", "Process mining"],
      githubUrl: "https://github.com/gvrathodd/automation-proposal",
      featured: true,
      metrics: { label: "Boundary F1", value: "0.905" },
      highlights: [
        "Segmented 540 unlabelled work units across 15 production sessions with 1.10s mean boundary error.",
        "Grouped them into 5 operational families; 209 target units accounted for 35.8% of runtime.",
        "Safe-stop invariants and human-in-the-loop gates: 16/16 test scenarios passed with zero unauthorised transactions.",
      ],
      year: "2026",
    },
    {
      id: "path-finder",
      title: "Path-Finder",
      tagline: "A visualiser for Dijkstra, A*, BFS and DFS on weighted grids.",
      description: "An interactive pathfinding sandbox. Draw walls and weights, generate a maze, and watch each algorithm explore the grid. Path computation is decoupled from rendering so large grids stay smooth.",
      category: "Web · Algorithms",
      tags: ["React", "JavaScript", "Graph algorithms", "Vite"],
      githubUrl: "https://github.com/gvrathodd/Path-Finder",
      liveUrl: "https://path-visualizer-two.vercel.app/",
      featured: true,
      metrics: { label: "Nodes per frame", value: "2,500+" },
      highlights: [
        "Renders 2,500+ nodes inside a 16ms frame budget on dynamically weighted grids.",
        "Custom heuristic priority queues keep pathfinding off React's render path.",
        "Recursive maze generation and state export cut map setup time by about 70%.",
      ],
      year: "2026",
    },
    {
      id: "qtext-editor",
      title: "QTextEditor",
      tagline: "A multi-tab desktop text editor written in C++17 and Qt.",
      description: "A native editor with tabbed documents, syntax highlighting, regex search and replace, and keyboard-driven navigation. Built to learn how real editors manage buffers, file I/O and redraws.",
      category: "Systems · C++",
      tags: ["C++17", "Qt", "OOP", "Desktop"],
      githubUrl: "https://github.com/gvrathodd/QTextEditor-main",
      featured: true,
      metrics: { label: "Stack", value: "C++ / Qt" },
      highlights: [
        "Modular multi-tab document manager with memory-conscious buffer handling.",
        "Real-time syntax highlighting and regex search.",
        "Cross-platform UI with keyboard shortcuts for most actions.",
      ],
    },
    {
      id: "ai-knowledge-assistant",
      title: "Personal knowledge assistant",
      tagline: "RAG over my own notes, docs and papers, with citations back to the source.",
      description: "Indexes notes and papers with vector embeddings and answers questions with hybrid keyword + vector retrieval, conversational memory and tool calling.",
      category: "ML · LLMs",
      tags: ["Python", "FastAPI", "RAG", "LangChain", "Vector DB"],
      featured: false,
      highlights: [],
    },
    {
      id: "chatroom-app",
      title: "Chatroom",
      tagline: "A real-time Android chat app with rooms and authentication.",
      description: "Native Android client with Firebase auth and Firestore-backed realtime messaging, built with Jetpack Compose and MVVM.",
      category: "Android",
      tags: ["Kotlin", "Jetpack Compose", "Firebase", "Coroutines"],
      githubUrl: "https://github.com/gvrathodd/ChatRoomApp",
      featured: false,
      highlights: [],
    },
    {
      id: "hudson-rc-car",
      title: "Hudson vision RC car",
      tagline: "Lane tracking and steering from an onboard camera, closed with a PID loop.",
      description: "Edge detection and inverse perspective mapping in OpenCV feed a PID steering controller on a small RC chassis.",
      category: "Robotics · CV",
      tags: ["Python", "OpenCV", "PID", "Embedded"],
      githubUrl: "https://github.com/gvrathodd/vision_lan_nav",
      featured: false,
      highlights: [],
    },
    {
      id: "finance-tracker",
      title: "Finance tracker",
      tagline: "Expense categorisation and budget alerts, built at FrostHack 2025.",
      description: "Flask + SQLite app that auto-categorises transactions and projects spending against a budget.",
      category: "Hackathon",
      tags: ["Python", "Flask", "SQLite", "Chart.js"],
      githubUrl: "https://github.com/gvrathodd/FinanceTraker",
      featured: false,
      highlights: [],
    },
  ],

  experience: [
    {
      id: "xpecto-26",
      role: "Sponsorship Head",
      organization: "Xpecto '26, IIT Mandi's annual tech fest",
      period: "Sep 2025 – Mar 2026",
      location: "IIT Mandi",
      description: "Ran corporate outreach and sponsorship for the fest.",
      highlights: [
        "Led a 25-person team across pitching, negotiation and contract delivery.",
        "Raised INR 20L+ from 20+ corporate and public-sector sponsors.",
      ],
    },
    {
      id: "design-practicum",
      role: "Team Lead, IoT neonatal warmer",
      organization: "Design Practicum, IIT Mandi",
      period: "Aug 2025 – Dec 2025",
      location: "IIT Mandi",
      description: "Led the build of a low-cost infant warmer for rural clinics.",
      highlights: [
        "Brought prototype cost to INR 8,000, against roughly INR 1 lakh for commercial units.",
        "Real-time thermal sensing with automatic regulation and safety cut-offs.",
      ],
    },
    {
      id: "sae-society",
      role: "Member, telemetry",
      organization: "SAE Collegiate Club, IIT Mandi",
      period: "2024 – now",
      location: "IIT Mandi",
      description: "Sensor data logging and telemetry for the college racing team.",
      highlights: [],
    },
    {
      id: "ranneeti",
      role: "Organising committee",
      organization: "Ranneeti, IIT Mandi's sports fest",
      period: "2024 – 2025",
      location: "IIT Mandi",
      description: "Scheduling, logistics and accommodation for 500+ visiting athletes.",
      highlights: [],
    },
  ],

  competitions: [
    { result: "1st runner-up", event: "HACK60", detail: "Deep learning hackathon, with an end-to-end computer vision solution" },
    { result: "3rd pan-IIT", event: "Inter-IIT Civil Conclave", detail: "Sustainable City Planning case study, IIT Roorkee" },
    { result: "500+", event: "Problems solved", detail: "LeetCode and Codeforces, rated 1200+" },
  ],

  education: {
    degree: "B.Tech, Civil Engineering",
    school: "IIT Mandi",
    period: "2024 – now",
    note: "Took the CS electives anyway: data structures, algorithms, machine learning, deep learning, operating systems, DBMS and computer networks.",
  },

  skills: [
    {
      title: "Languages",
      skills: [
        { name: "Python", usedIn: ["Deepfake detector", "Process mining", "RC car"] },
        { name: "C++17", usedIn: ["QTextEditor"] },
        { name: "TypeScript / JavaScript", usedIn: ["Path-Finder", "this site"] },
        { name: "Kotlin", usedIn: ["Chatroom"] },
        { name: "SQL", usedIn: ["Finance tracker"] },
      ],
    },
    {
      title: "ML & vision",
      skills: [
        { name: "PyTorch", usedIn: ["Deepfake detector"] },
        { name: "OpenCV", usedIn: ["RC car", "Deepfake detector"] },
        { name: "scikit-learn", usedIn: ["Process mining"] },
        { name: "PaddleOCR", usedIn: ["Process mining"] },
        { name: "LLMs & RAG", usedIn: ["Knowledge assistant"] },
      ],
    },
    {
      title: "Build & ship",
      skills: [
        { name: "React", usedIn: ["Path-Finder", "this site"] },
        { name: "Qt", usedIn: ["QTextEditor"] },
        { name: "FastAPI / Flask", usedIn: ["Knowledge assistant", "Finance tracker"] },
        { name: "Jetpack Compose + Firebase", usedIn: ["Chatroom"] },
        { name: "Playwright", usedIn: ["Process mining"] },
      ],
    },
  ],

  alsoFamiliar: ["TensorFlow / Keras", "Hugging Face", "Docker", "GitHub Actions", "AWS / Azure", "Databricks"],
};
