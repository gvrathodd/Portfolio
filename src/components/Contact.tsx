import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { portfolioData } from '../data/portfolioData';
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

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#10b981', '#06b6d4', '#6366f1', '#ffffff']
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
      <div className="relative p-8 sm:p-12 rounded-3xl glass-panel border-white/10 overflow-hidden shadow-2xl">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4" />
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
                Let's Build Something Exceptional
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                Whether you have an exciting software or AI/ML opportunity, want to collaborate on open-source, or simply want to chat, my inbox is always open.
              </p>

              {/* One-click Copy Email Pill */}
              <div className="mb-6">
                <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  Direct Email
                </label>
                <div className="flex items-center gap-2 p-2 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-xs sm:text-sm font-mono text-zinc-200 truncate pl-2 select-all">
                    {personal.email}
                  </span>
                  <animated.button
                    style={copyButtonSpring}
                    onClick={handleCopyEmail}
                    className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                      copied
                        ? 'bg-emerald-500 text-zinc-950'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
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
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
                Connect Online
              </label>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href={personal.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Code className="w-4 h-4 text-amber-400" />
                  <span>LeetCode</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href={personal.socials.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Codeforces</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Smith"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, idea, or role..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send className="w-4 h-4" />
                <span>Send Message via Email</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-mono animate-fadeIn">
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
