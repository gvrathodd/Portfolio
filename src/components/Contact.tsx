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
  Code,
  Terminal,
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
    transform: copied ? 'scale(1.06)' : 'scale(1)',
    config: { tension: 350, friction: 18 },
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger celebratory sky-blue confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#0ea5e9', '#7dd3fc', '#bae6fd', '#ffffff']
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);
    const mailtoUrl = `mailto:${personal.email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="relative p-8 sm:p-12 md:p-14 rounded-3xl glass-card border border-sky-400/25 overflow-hidden shadow-2xl shadow-sky-950/20">
        {/* Soft background sky ambient light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-500/15 via-sky-400/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-300 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
                Let's Build Together
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                I am actively seeking software engineering and AI/ML opportunities. Whether you have a project idea, question, or role to discuss, feel free to reach out.
              </p>

              {/* One-click Copy Email Pill */}
              <div className="mb-8">
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Direct Email
                </label>
                <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/80 border border-sky-400/20">
                  <span className="text-xs sm:text-sm text-slate-200 truncate pl-2 select-all font-mono">
                    {personal.email}
                  </span>
                  <animated.button
                    style={copyButtonSpring}
                    onClick={handleCopyEmail}
                    className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
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
              <label className="block text-xs font-medium text-slate-400 mb-3">
                Connect Online
              </label>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-sky-400/20 hover:border-sky-400/40 text-slate-200 text-xs font-medium transition-all"
                >
                  <LinkedinIcon className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-sky-400/20 hover:border-sky-400/40 text-slate-200 text-xs font-medium transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-slate-300" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={personal.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-sky-400/20 hover:border-sky-400/40 text-slate-200 text-xs font-medium transition-all"
                >
                  <Code className="w-4 h-4 text-sky-400" />
                  <span>LeetCode</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={personal.socials.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-sky-400/20 hover:border-sky-400/40 text-slate-200 text-xs font-medium transition-all"
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Codeforces</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Smith"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900/70 border border-sky-400/20 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900/70 border border-sky-400/20 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your team, project, or role..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900/70 border border-sky-400/20 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-sky-400 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>

              {submitted && (
                <div className="p-3.5 rounded-2xl bg-sky-500/15 border border-sky-400/30 text-sky-200 text-xs text-center font-medium">
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
