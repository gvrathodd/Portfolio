import React, { useState, useRef, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { portfolioData } from '../data/portfolioData';
import { Terminal, X, ChevronRight, CornerDownLeft, Sparkles, Minimize2, Maximize2 } from 'lucide-react';

interface LogEntry {
  command: string;
  output: React.ReactNode;
  time: string;
}

export const InteractiveConsole: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      command: 'init',
      output: (
        <span className="text-slate-300">
          Welcome to Gaurav's interactive terminal. Type a command or click a chip below to explore.
        </span>
      ),
      time: '00:00',
    },
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Spring animation for terminal drawer pop-up
  const drawerSpring = useSpring({
    transform: isOpen ? 'translate3d(0, 0px, 0) scale(1)' : 'translate3d(0, 120%, 0) scale(0.92)',
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 26 },
  });

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    let output: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <div>Available commands:</div>
            <div>• <span className="text-sky-300 font-bold">projects</span>: View top engineering projects</div>
            <div>• <span className="text-sky-300 font-bold">deepfake</span>: Show deepfake detection metrics</div>
            <div>• <span className="text-sky-300 font-bold">skills</span>: List key programming languages & frameworks</div>
            <div>• <span className="text-sky-300 font-bold">resume</span>: Download Gaurav's verified resume</div>
            <div>• <span className="text-sky-300 font-bold">contact</span>: Show contact channels</div>
            <div>• <span className="text-sky-300 font-bold">whoami</span>: Display bio & educational background</div>
            <div>• <span className="text-sky-300 font-bold">clear</span>: Clear terminal history</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1">
            {portfolioData.projects.slice(0, 4).map((p, idx) => (
              <div key={p.id} className="text-xs">
                <span className="text-sky-400 font-bold">[{idx + 1}] {p.title}</span>
                <span className="text-slate-400"> — {p.tagline}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'deepfake':
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <div className="text-sky-300 font-bold">Robust Deepfake Detection Under Domain Shift</div>
            <div>• Backbone: DINOv2 ViT-L/14 (307M params) + SRM 30-kernel frequency filter</div>
            <div>• Module: Fused Gromov-Wasserstein (FGW) with Sinkhorn algorithm</div>
            <div>• Validation AUC: <span className="text-emerald-400 font-bold">0.946</span> (88.7% accuracy)</div>
            <div>• WildDeepfake Compressed AUC: <span className="text-sky-400 font-bold">0.884</span> (+5.3% over XceptionNet)</div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="text-xs space-y-1">
            <div><span className="text-sky-400 font-semibold">Languages:</span> C++, Python, Kotlin (Android), JavaScript, TypeScript, C, SQL</div>
            <div><span className="text-cyan-400 font-semibold">AI/ML:</span> PyTorch, TensorFlow, OpenCV, Transformers, LLMs, RAG, MCP</div>
            <div><span className="text-indigo-400 font-semibold">Web & App:</span> React, Next.js, FastAPI, Flask, Android Jetpack Compose, Tailwind</div>
          </div>
        );
        break;

      case 'resume':
        window.open(portfolioData.personal.resumeUrl, '_blank');
        output = <span className="text-emerald-400">Opening Gaurav_Rathod_Resume.pdf in new tab...</span>;
        break;

      case 'contact':
        output = (
          <div className="text-xs space-y-1 text-slate-300">
            <div>Email: <a href={`mailto:${portfolioData.personal.email}`} className="text-sky-300 underline">{portfolioData.personal.email}</a></div>
            <div>LinkedIn: <a href={portfolioData.personal.socials.linkedin} target="_blank" rel="noreferrer" className="text-sky-300 underline">linkedin.com/in/gauravgirishrathod</a></div>
            <div>GitHub: <a href={portfolioData.personal.socials.github} target="_blank" rel="noreferrer" className="text-sky-300 underline">github.com/gvrathodd</a></div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="text-white font-bold">{portfolioData.personal.name}</span> — B.Tech undergraduate at <span className="text-sky-300">IIT Mandi</span> (CGPA: 8.34). Specializing in systems programming, machine learning architectures, and modern application development.
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      default:
        output = (
          <span className="text-rose-400">
            Command not recognized: '{trimmed}'. Type <span className="text-white font-bold">'help'</span> for list of commands.
          </span>
        );
    }

    setLogs((prev) => [...prev, { command: cmd, output, time }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <>
      {/* Floating Pill Launch Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-sky-500/30 hover:border-sky-400 text-sky-300 hover:text-white font-mono text-xs font-semibold shadow-xl shadow-sky-950/40 backdrop-blur-xl transition-all duration-200 hover:scale-105 active:scale-95 group"
        >
          <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <Terminal className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform" />
          <span>Interactive Console</span>
        </button>
      </div>

      {/* Slide-up Spring Console Window */}
      {isOpen && (
        <animated.div
          style={drawerSpring}
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[480px] max-h-[500px] flex flex-col rounded-2xl glass-panel bg-slate-950/95 border border-sky-500/30 shadow-2xl shadow-black/80 overflow-hidden font-mono text-xs text-slate-200"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-sky-500/20">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-[11px] text-slate-400 ml-2 font-mono">gaurav@iitmandi: ~</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Command Chips */}
          <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 flex flex-wrap gap-1.5">
            {['help', 'projects', 'deepfake', 'skills', 'resume', 'contact'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-sky-500/20 text-slate-300 hover:text-sky-300 border border-slate-700/60 transition-colors text-[10px]"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Logs Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[300px]">
            {logs.map((log, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                  <span>[{log.time}]</span>
                  <span className="text-sky-400 font-bold">$ {log.command}</span>
                </div>
                <div className="pl-3 border-l border-sky-500/30">
                  {log.output}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Prompt */}
          <div className="flex items-center gap-2 p-3 bg-slate-900/80 border-t border-sky-500/20">
            <span className="text-sky-400 font-bold">❯</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command ('help', 'projects', 'clear')..."
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none text-xs"
              autoFocus
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="p-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 transition-colors"
              title="Submit command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </animated.div>
      )}
    </>
  );
};
