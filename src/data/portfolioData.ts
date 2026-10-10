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
  downloadUrl?: string;
  downloadLabel?: string;
  featured: boolean;
  highlights: string[];
  metrics?: { label: string; value: string };
  year?: string;
  gallery?: { src: string; alt: string; caption: string }[];
  /** Heading above the gallery, and an optional note under it. */
  galleryTitle?: string;
  galleryNote?: string;
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
  education: { degree: string; school: string; period: string; note: string }[];
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
      liveUrl: "https://seam-tau.vercel.app/",
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
      galleryTitle: "What the model sees",
      galleryNote: "Left to right: input, heatmap overlay, raw anomaly map.",
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
      id: "rl-quant",
      title: "Regime-aware RL trading & model risk",
      tagline: "A PPO trading agent, and the risk framework a bank would use to sign it off.",
      description: "Each tick is labelled with one of five forward-return regimes across 40 horizons, XGBoost turns features into regime probabilities, and a PPO agent trades short, flat or long on top of them, paying for transaction costs and churn. A separate risk layer then validates the strategy the way a model-risk team would: five VaR models, Expected Shortfall, Kupiec and Christoffersen backtests, Basel traffic-light zones, and historical stress scenarios.",
      category: "ML · Quant",
      tags: ["Python", "PPO", "XGBoost", "Gymnasium", "Risk modelling"],
      githubUrl: "https://github.com/gvrathodd/rl_quant",
      featured: true,
      metrics: { label: "VaR models backtested", value: "5" },
      year: "2026",
      highlights: [
        "Chronological 4-fold CV and expanding-window z-scores, so the agent never trains on in-sample predictions or sees the future.",
        "Over 2,250 out-of-sample days at 99%, only Historical VaR passed both coverage and independence; Cornish-Fisher got the count right but its exceptions clustered.",
        "Stress-tests the worst exposure held against 1987, Lehman, the Flash Crash and COVID, plus 1–3× volatility regimes.",
      ],
      gallery: [
        { src: "/projects/rl-quant/var_backtest.webp", alt: "Five 99% VaR forecasts plotted against daily P&L, with black dots marking exception days", caption: "99% VaR backtest on a synthetic fat-tailed market. Dots mark days a loss broke the Historical VaR forecast." },
      ],
      galleryTitle: "Backtesting the risk models",
    },
    {
      id: "var-toolkit",
      title: "VaR & counterparty risk toolkit",
      tagline: "Measuring, backtesting, stressing and capitalising the market risk of an NSE equity book.",
      description: "A risk library built on five years of live NSE data for an HDFC Bank, Reliance and SBI portfolio. It covers the whole model lifecycle: VaR and Expected Shortfall six ways (up to GARCH(1,1)-t and correlated Student-t Monte Carlo), regulatory backtests, Euler risk decomposition, historical stress replays, option-book VaR, Basel 2.5 capital, and counterparty exposure and CVA for interest-rate swaps, all exported to a one-click Excel risk pack.",
      category: "Quant · Risk",
      tags: ["Python", "GARCH", "Monte Carlo", "Black-Scholes", "pytest"],
      githubUrl: "https://github.com/gvrathodd/VaR-Calculator-main",
      featured: true,
      metrics: { label: "CVA cut by netting + collateral", value: "70%" },
      year: "2026",
      highlights: [
        "Backtested five 99% VaR models over 989 out-of-sample days. Parametric VaR sat in the Basel green zone yet failed Christoffersen, so a count-based traffic light alone would have approved it.",
        "Showed delta-normal VaR understates a short-put book by about 3× against full revaluation.",
        "Basel 2.5 capital with stressed VaR calibrated to 2008–09, plus EE, PFE and CVA for an IRS netting set on 5,000 Vasicek paths.",
      ],
      gallery: [
        { src: "/projects/var-toolkit/var_comparison.webp", alt: "Histogram of daily portfolio returns with 95% and 99% VaR lines from four models", caption: "Five years of daily returns. At 99% the normal models sit inside the historical tail: fat tails in one picture." },
        { src: "/projects/var-toolkit/exposure_profile.webp", alt: "Expected and potential future exposure curves for gross, netted and collateralised swap positions over five years", caption: "Counterparty exposure on two swaps: netting, then a CSA, flatten the potential future exposure." },
      ],
      galleryTitle: "From market risk to counterparty risk",
    },
    {
      id: "credit-scorecard",
      title: "Corporate credit scorecard & PD models",
      tagline: "Rating NSE-listed companies from their financial statements, then measuring the loan book's credit risk.",
      description: "Probability-of-default models for 113 NSE-listed companies built from Yahoo Finance statements: Altman Z, logistic regression, XGBoost and a WoE points scorecard with reason codes. PDs are rescaled to a population default rate and mapped to AAA–D grades, then a portfolio engine prices a hypothetical loan book with expected loss, Basel IRB capital, Monte Carlo credit VaR and IFRS 9 staging.",
      category: "Quant · Credit",
      tags: ["Python", "XGBoost", "scikit-learn", "Scorecards", "Basel IRB"],
      githubUrl: "https://github.com/gvrathodd/credit-scorecard",
      featured: true,
      metrics: { label: "Grouped-CV AUC (XGBoost)", value: "0.939" },
      year: "2026",
      highlights: [
        "Points scorecard with monotonic WoE bins and PDO scaling. Every split is grouped by company, so no firm appears on both sides.",
        "Validated the way a bank would: bootstrap CIs, per-grade Jeffreys calibration tests and PSI drift. The write-up flags that most defaults are already in insolvency, so AUC is not early-warning skill.",
        "Monte Carlo credit VaR with global and sector factors lands within about 2% of the Basel IRB capital figure.",
      ],
      gallery: [
        { src: "/projects/credit-scorecard/score_distribution.webp", alt: "Histogram of scorecard points, with defaulted firm-years clustered at low scores and performing ones at high scores", caption: "Scorecard points by status: most defaulters score below 530, most performing firms above 540." },
        { src: "/projects/credit-scorecard/roc_curve.webp", alt: "ROC curves for logistic regression, XGBoost and Altman Z on held-out companies", caption: "Held-out companies: XGBoost 0.955 AUC against 0.888 for the Altman Z benchmark." },
      ],
      galleryTitle: "Separating defaulters from performers",
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
      title: "ChatRoomApp",
      tagline: "A real-time Android chat client with room channels, email verification, and live Firestore sync.",
      description: "Native Android client built with Jetpack Compose and Material Design 3. Features asynchronous email validation before channel entry, topic-based chat rooms, reactive message streams via callbackFlow listeners, in-memory search, and offline disk caching.",
      category: "Android · Mobile",
      tags: ["Kotlin", "Jetpack Compose", "Firebase", "Firestore", "Coroutines", "MVVM"],
      githubUrl: "https://github.com/gvrathodd/ChatRoomApp",
      downloadUrl: "https://github.com/gvrathodd/ChatRoomApp/raw/main/releases/ChatRoomApp.apk",
      downloadLabel: "Download APK",
      featured: false,
      metrics: { label: "Binary", value: "v1.0.0 APK" },
      year: "2025",
      highlights: [
        "Reactive real-time messaging pipeline built on Cloud Firestore callbackFlow listeners.",
        "Mandatory email verification gate and session persistence with Firebase Authentication.",
        "Material Design 3 with Unidirectional Data Flow (UDF), StateFlow, and offline cache resilience.",
      ],
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
      id: "masonry-image-to-cad",
      title: "Masonry image-to-CAD",
      tagline: "Cleaning up photos of stone walls so their outlines can be traced into CAD.",
      description: "The image-processing front end of a pipeline from wall photos to CAD drawings. A bilateral filter is tuned by brute-force search against a score that rewards smoothing but penalises lost edges, then a line-segment detector finds near-vertical edges and rectifies the photo so the wall stands straight.",
      category: "CV · Civil",
      tags: ["Python", "OpenCV", "scikit-image", "Image processing"],
      githubUrl: "https://github.com/gvrathodd/Mong_sir_project_july",
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

  education: [
    {
      degree: "B.Tech, Civil Engineering",
      school: "IIT Mandi",
      period: "2024 – now",
      note: "Took the CS electives anyway: data structures, algorithms, machine learning, deep learning, operating systems, DBMS and computer networks.",
    },
    {
      degree: "Class 12, HSC Board",
      school: "Queen Mary School, Mumbai",
      period: "2022 – 2024",
      note: "Ranked 3rd of 850 students, with 85.5%.",
    },
    {
      degree: "Class 10, ICSE Board",
      school: "Kanakia International School, Mumbai",
      period: "2022",
      note: "Ranked 23rd of 600 students, with 97.5%.",
    },
  ],

  skills: [
    {
      title: "Languages",
      skills: [
        { name: "Python", usedIn: ["Deepfake detector", "Process mining", "RC car"] },
        { name: "C++17", usedIn: ["QTextEditor"] },
        { name: "TypeScript / JavaScript", usedIn: ["Path-Finder", "this site"] },
        { name: "Kotlin", usedIn: ["ChatRoomApp"] },
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
        { name: "Jetpack Compose + Firebase", usedIn: ["ChatRoomApp"] },
        { name: "Playwright", usedIn: ["Process mining"] },
      ],
    },
  ],

  alsoFamiliar: ["TensorFlow / Keras", "Hugging Face", "Docker", "GitHub Actions", "AWS / Azure", "Databricks"],
};
