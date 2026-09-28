import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  Terminal, 
  Code,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact: React.FC = () => {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Copy email with spring physics
  const copyButtonSpring = useSpring({
    transform: copied ? 'scale(1.08)' : 'scale(1)',
    config: { tension: 400, friction: 17 },
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger confetti celebration with Sky Blue & Azure tones
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#0ea5e9', '#0284c7', '#60a5fa', '#ffffff']
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);
    // Create mailto link for direct sending
    const mailtoUrl = `mailto:${personal.email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="relative p-8 sm:p-12 rounded-2xl glass-panel border border-sky-500/30 overflow-hidden shadow-2xl shadow-sky-950/20">
        {/* Ambient background sky glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-500/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-sky-400 uppercase tracking-widest mb-2">
                <span className="text-sky-300 font-bold">// 04</span>
                <span>TRANSMISSION RELAY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white uppercase mb-4">
                Initiate Direct Dispatch
              </h2>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-400 mb-6">
                <span className="text-sky-400">[COMM // DIRECT LINK]</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  INBOX ACTIVE
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Seeking high-impact Software Engineering or AI/ML roles. Reach out directly via encrypted channels or dispatch a prompt message.
              </p>

              {/* One-click Copy Email Pill */}
              <div className="mb-6">
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                  Direct Email
                </label>
                <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-950/80 border border-sky-500/20">
                  <span className="text-xs sm:text-sm font-mono text-slate-200 truncate pl-2 select-all">
                    {personal.email}
                  </span>
                  <animated.button
                    style={copyButtonSpring}
                    onClick={handleCopyEmail}
                    className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                      copied
                        ? 'bg-sky-400 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </animated.button>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">
                Connect Online
              </label>
              <div className="flex flex-wrap gap-2.5">
                <MagneticButton
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-sky-500/20 hover:border-sky-400/40 text-slate-200 text-xs font-medium transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </MagneticButton>

                <MagneticButton
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-sky-500/20 hover:border-sky-400/40 text-slate-200 text-xs font-medium transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </MagneticButton>

                <MagneticButton
                  href={personal.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-sky-500/20 hover:border-sky-400/40 text-slate-200 text-xs font-medium transition-colors"
                >
                  <Code className="w-4 h-4 text-sky-400" />
                  <span>LeetCode</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </MagneticButton>

                <MagneticButton
                  href={personal.socials.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-sky-500/20 hover:border-sky-400/40 text-slate-200 text-xs font-medium transition-colors"
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Codeforces</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Smith"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-sky-500/20 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-sky-500/20 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, idea, or role..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-sky-500/20 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-sm transition-all duration-200 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send className="w-4 h-4" />
                <span>Send Message via Email</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-300 text-xs text-center font-mono">
                  Opening your email client... Looking forward to connecting!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
