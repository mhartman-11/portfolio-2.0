import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// PORTFOLIO V6 — Michael Hartman — Kinetic Brutalist
// Inspired by therawmaterials.com
// Scroll-snap sections, sidebar nav, bold color blocks
// ============================================================

// ---------- Count-up hook ----------
const useCountUp = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
};

// ---------- DATA ----------
const SECTIONS = [
  { id: 'hero', label: 'Welcome', num: '01', color: '#FF5C00' },
  { id: 'expertise', label: 'Expertise', num: '02', color: '#8A2BE2' },
  { id: 'work', label: "What I've Built", num: '03', color: '#000000' },
  { id: 'impact', label: 'Impact', num: '04', color: '#007AFF' },
  { id: 'career', label: 'Career', num: '05', color: '#C4163A' },
  { id: 'agents', label: 'Agents', num: '06', color: '#00C853' },
  { id: 'contact', label: 'Contact', num: '07', color: '#FFFF00' },
];

const companies = ['Kellanova', 'Uber', 'BCG', 'Accenture', 'Cars.com', 'Brooksource'];

const stats = [
  { value: 91, suffix: '%', label: 'Offer accept rate across ~300 hires at Kellanova in 2024' },
  { value: 10, suffix: '+', label: 'Custom AI agents built and deployed across Global TA operations' },
  { value: 850, suffix: 'K', prefix: '$', label: 'In cost savings generated through sourced hires at BCG' },
  { value: 30, suffix: '%', label: 'Recruiter productivity lift after AI agent deployment' },
  { value: 50, suffix: '%', label: 'Increase in TA team engagement with AI enablement programs' },
  { value: 93, suffix: '%', label: 'Mansfield D&I attainment rate across verticals at Uber' },
];

const career = [
  { period: 'Mar 2024 – Present', current: true, title: 'Senior Manager, Talent Acquisition & AI Enablement', company: "Kellanova (previously Kellogg's)", desc: 'Pioneered AI Enablement and talent intelligence division within TA. Built and deployed 10+ custom AI agents enhancing recruiter productivity by 30%. Oversee hiring for 11 Corporate Functions, managing top performing team in North America. 91% offer accept rate across ~300 hires in 2024.' },
  { period: 'Jun 2021 – Jul 2023', current: false, title: 'Talent Sourcing Manager → Principal Talent Sourcer', company: 'Uber', desc: 'Promoted within six months — only Sourcing Manager overseeing four verticals: Legal, Finance, People/Places, Core Services. Managed eight global direct reports, achieving 90% offer accept rate and 93% Mansfield D&I attainment.' },
  { period: 'Aug 2017 – Jun 2021', current: false, title: 'Senior Talent Sourcer → Talent Sourcer', company: 'Boston Consulting Group (BCG)', desc: 'Generated $850K cost savings through 30 global hires. Selected for secondment on in-house Executive Search Team supporting C-Suite stakeholders. Only team member out of 45 promoted in 2020. Sourcing across NAMR, EMEA, and APAC.' },
  { period: 'Sep 2015 – Aug 2017', current: false, title: 'Diversity Sourcing Recruiter, Sr. Analyst', company: 'Accenture', desc: 'Led diversity recruiting strategy across Ethnicity, Gender, LGBT, and PwD pillars. Cross-functional D&I SME for six business units. Managed $60K conference budget.' },
  { period: 'Aug 2014 – Sep 2015', current: false, title: 'Affiliate Account Manager', company: 'Cars.com', desc: 'Account management bridging sales and customer success in automotive digital marketplace.' },
  { period: 'Aug 2012 – Aug 2014', current: false, title: 'Technical Recruiter', company: 'Brooksource', desc: 'Foundation in high-volume technical recruiting and client relationship management.' },
];

const competencies = [
  { icon: '⚡', title: 'Agentic AI Workflows' },
  { icon: '🧠', title: 'AI Enablement' },
  { icon: '📊', title: 'Market Intelligence' },
  { icon: '🔍', title: 'Talent Sourcing' },
  { icon: '⚙️', title: 'TA Operations' },
  { icon: '👥', title: 'People Leadership' },
];

const techStack = ['Canva', 'ChatGPT', 'Claude', 'Claude Code', 'Claude Cowork', 'Copilot', 'Gamma', 'Gemini', 'LinkedIn Talent Insights', 'MindStudio', 'NotebookLM', 'Notion AI', 'Perplexity', 'Prompt Engineering', 'Talent Neuron'];

const projects = [
  { category: 'TA Tools', tag: 'TALENT INTELLIGENCE', title: 'Market Intelligence Dashboard', desc: 'Configurable dashboard tracking real-time industry layoffs, talent supply/demand, and competitor hiring activity.', metric: 'Real-time data', url: 'https://claude.ai/public/artifacts/f352991a-f0b4-41f8-b788-2a6adc5c70e0' },
  { category: 'TA Tools', tag: 'INTERACTIVE TOOL', title: 'Recruiter Prompt Dashboard', desc: 'Browser-based dashboard with 150 ready-to-use AI prompts for recruiters with real-time search.', metric: '150+ prompts', url: 'https://claude.ai/public/artifacts/786c8e3a-718b-419d-8d3b-2cc7be995ef6' },
  { category: 'TA Tools', tag: 'FEATURED WORK', title: 'AI in TA Digest (2026)', desc: 'Curated weekly insight into the convergence of recruitment operations and agentic AI.', metric: 'Weekly digest', url: 'https://mhartman-11.github.io/ai-in-ta-digest/' },
  { category: 'TA Tools', tag: 'INDUSTRY RESOURCES', title: '2026 HR/TA Global Calendar', desc: 'Centralized hub for HR and TA events worldwide with advanced filtering and registration access.', metric: 'Global events', url: 'https://hr-events-calendar-2026.vercel.app' },
  { category: 'TA Tools', tag: 'SOURCING TOOL', title: 'Sourcing Channel Optimizer', desc: 'Helps recruiters discover the best channels to source talent by filtering on industry, skills, and role type — no logins or fees required.', metric: 'Open access', url: 'https://sourcing-channel-optimizer.vercel.app/' },
  { category: 'AI Projects', tag: 'AI PROJECT', title: 'March Madness Pool Tracker', desc: 'Live tracker for a snake draft March Madness pool with real-time standings, rosters, and game log for NCAA tournament competition.', metric: 'Live tracker', url: 'https://march-madness-pool-liard.vercel.app/' },
  { category: 'Consulting', tag: 'CONSULTING', title: 'Mortgage Conditions Email Generator', desc: 'Automates mortgage condition emails by parsing underwriting documents and routing action items to borrower, agent, and processor.', metric: '3-party routing', url: 'https://conditions-email-app.vercel.app' },
];

const recognition = [
  { title: 'Winner, KNA HR Peer Nominated Award', desc: '"Simply the Best" recognition', org: 'Kellanova' },
  { title: '1st Place, KNA Hackathon', desc: 'Best idea among all remote teams for an AI-powered predictive maintenance solution', org: 'Kellanova' },
  { title: 'Strategy Spark Award', desc: 'Recognized for sharp, high-impact thinking; only TA recipient', org: 'Kellanova' },
  { title: 'BCG Global Recognition Award', desc: 'Multiple global awards, including largest-ever cost savings on a sourced hire', org: 'BCG' },
  { title: 'MindStudio AI Agent Builder Bootcamp', desc: 'Selected from ~14,000 applicants (<500 accepted), 2025', org: 'MindStudio' },
];

const projectCategories = ['All', 'TA Tools', 'AI Projects', 'Consulting'];

const agents = [
  { name: 'Boolean String Generator', desc: 'Advanced query builder for LinkedIn, Google, and niche platforms.', category: 'Sourcing' },
  { name: 'Lead Cold Email Generator', desc: 'Hyper-personalized outreach based on prospect profile analysis.', category: 'Sourcing' },
  { name: 'Webpage Entity Extractor', desc: 'Identifies and sends people data from webpages to CRM/ATS.', category: 'Sourcing' },
  { name: 'YouTube Video Summary', desc: 'Extracts insights from webinar recordings and tutorials.', category: 'Intelligence' },
  { name: 'Monitor Website Changes', desc: 'Real-time alerts for competitive updates or job board changes.', category: 'Intelligence' },
  { name: 'Daily News Digest via Email', desc: 'Automated industry monitoring and daily stakeholder briefings.', category: 'Intelligence' },
  { name: 'Research Report Generator', desc: 'End-to-end talent intelligence and market reports.', category: 'Intelligence' },
  { name: 'Email TLDR & Response Draft', desc: 'Distills email threads and drafts suggested replies.', category: 'Efficiency' },
  { name: 'Slack Channel Weekly Summary', desc: 'Summarizes high-volume Slack channels into action items.', category: 'Operations' },
  { name: 'Dynamic Content Generator', desc: 'Context-aware copy for multichannel recruiting campaigns.', category: 'Engagement' },
  { name: 'LinkedIn Post Generator', desc: 'High-engagement social copy for professional visibility.', category: 'Social' },
  { name: 'Blog Post Generator', desc: 'SEO-optimized thought leadership from TA insights.', category: 'Branding' },
  { name: 'Home Page FAQ Generator', desc: 'Automates candidate service content from existing docs.', category: 'CX' },
  { name: 'Ask the Docs Chat Bot', desc: 'RAG-based agent answering internal process questions.', category: 'Enablement' },
  { name: 'Interview Question Generator', desc: 'Custom behavioral questions tailored to roles and resumes.', category: 'Evaluation' },
];

const agentCategories = ['All', ...Array.from(new Set(agents.map(a => a.category)))];

const categoryColors: Record<string, string> = {
  Sourcing: '#FF5C00', Intelligence: '#8A2BE2', Efficiency: '#007AFF',
  Operations: '#000', Engagement: '#FF3B30', Social: '#00C853',
  Branding: '#FF5C00', CX: '#007AFF', Enablement: '#8A2BE2', Evaluation: '#00C853',
};

// ---------- Block ID Pill ----------
const BlockPill: React.FC<{ num: string; dark?: boolean }> = ({ num, dark }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: `2px solid ${dark ? '#000' : '#fff'}`,
    borderRadius: 999, padding: '4px 14px',
    fontSize: 13, fontWeight: 600,
    color: dark ? '#000' : '#fff',
    letterSpacing: 1,
  }}>
    {num}
  </div>
);

// ---------- Main Component ----------
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [projectFilter, setProjectFilter] = useState('All');
  const [agentFilter, setAgentFilter] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // IntersectionObserver for active section tracking + animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Trigger hero animations immediately on mount
  useEffect(() => {
    const heroEl = sectionRefs.current['hero'];
    if (heroEl) {
      requestAnimationFrame(() => {
        heroEl.classList.add('section-visible');
      });
    }
  }, []);

  // Scroll parallax for geometric wireframe layers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        Object.values(sectionRefs.current).forEach((section) => {
          if (!section) return;
          const rect = section.getBoundingClientRect();
          const progress = rect.top / vh;
          const backs = section.querySelectorAll<HTMLElement>('.parallax-back');
          const mids = section.querySelectorAll<HTMLElement>('.parallax-mid');
          const fronts = section.querySelectorAll<HTMLElement>('.parallax-front');
          backs.forEach(el => { el.style.transform = `translateY(${progress * -15}px)`; });
          mids.forEach(el => { el.style.transform = `translateY(${progress * -30}px)`; });
          fronts.forEach(el => { el.style.transform = `translateY(${progress * -50}px)`; });
        });
        ticking = false;
      });
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProjects = projectFilter === 'All' ? projects : projects.filter(p => p.category === projectFilter);
  const filteredAgents = agentFilter === 'All' ? agents : agents.filter(a => a.category === agentFilter);

  // Determine if nav label text should be dark based on section color
  const lightColorSections = ['contact']; // yellow needs dark text
  const darkTextForNav = (color: string) => color === '#FFFF00' || color === '#FFF8F4';

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Space Grotesk', sans-serif", background: '#FFF8F4' }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { height: 100%; overflow: hidden; }

        .sidebar-nav { display: flex; }
        .mobile-nav { display: none; }

        @media (max-width: 768px) {
          .sidebar-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
          .snap-container { margin-left: 0 !important; scroll-snap-type: none !important; }
          .snap-section { padding: 32px 20px 80px !important; }
          .grid-2col { grid-template-columns: 1fr !important; }
          .grid-3col { grid-template-columns: 1fr 1fr !important; }
          .career-row { grid-template-columns: 1fr !important; }
        }

        .snap-container {
          flex: 1;
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }
        .snap-container::-webkit-scrollbar { width: 0; }

        .snap-section {
          min-height: 100vh;
          scroll-snap-align: start;
          position: relative;
          padding: 40px;
          display: flex;
          align-items: center;
        }

        .card-lift { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .card-lift:hover { transform: scale(1.01) translateY(-2px); }

        .filter-pill {
          padding: 8px 20px;
          border-radius: 999px;
          border: 2px solid #000;
          background: transparent;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .filter-pill:hover { background: rgba(0,0,0,0.05); }
        .filter-pill.active { background: #000; color: #fff; }

        .work-filter-pill {
          padding: 8px 20px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.3);
          background: transparent;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .work-filter-pill:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.6); }
        .work-filter-pill.active { background: #fff; color: #000; }

        .agent-card {
          background: #fff;
          border: 2px solid #000;
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .agent-card:hover {
          transform: translateY(-3px);
          box-shadow: 6px 6px 0 #000;
        }

        .brutalist-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          border: 3px solid #000;
          border-radius: 999px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }
        .brutalist-btn:hover {
          transform: translateY(-2px);
          box-shadow: 4px 4px 0 #000;
        }
        .brutalist-btn-dark {
          background: #000; color: #fff; border-color: #000;
        }
        .brutalist-btn-dark:hover { box-shadow: 4px 4px 0 rgba(0,0,0,0.3); }
        .brutalist-btn-light {
          background: transparent; color: #000;
        }

        .tech-pill {
          padding: 8px 18px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.5);
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
        }
        .tech-pill:hover {
          background: rgba(255,255,255,0.15);
          border-color: #fff;
          transform: translateY(-2px);
        }

        .stat-card {
          background: #fff;
          border-radius: 20px;
          padding: 28px 24px;
          color: #000;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .credential-card {
          background: rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .credential-card:hover {
          background: rgba(255,255,255,0.22);
          transform: translateY(-2px);
        }

        /* ---- Motion System ---- */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .animate-in {
          opacity: 0;
        }

        .section-visible .animate-in {
          animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .section-visible .stagger-1 { animation-delay: 0.08s; }
        .section-visible .stagger-2 { animation-delay: 0.16s; }
        .section-visible .stagger-3 { animation-delay: 0.24s; }
        .section-visible .stagger-4 { animation-delay: 0.32s; }
        .section-visible .stagger-5 { animation-delay: 0.4s; }
        .section-visible .stagger-6 { animation-delay: 0.48s; }

        .tech-pill-float {
          animation: subtleFloat 3s ease-in-out infinite;
        }
        .tech-pill-float:nth-child(2n) { animation-delay: 0.4s; }
        .tech-pill-float:nth-child(3n) { animation-delay: 0.8s; }
        .tech-pill-float:nth-child(5n) { animation-delay: 1.2s; }

        .recognition-row { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .recognition-row:hover { background: rgba(255,255,255,0.08); }

        /* ---- Geometric Wireframe Background System ---- */
        .bg-element {
          position: absolute;
          pointer-events: none;
          z-index: 0;
        }
        .parallax-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
        }

        @keyframes wireGridPulse {
          0%, 100% { opacity: 0.14; }
          50% { opacity: 0.30; }
        }
        @keyframes nodePulse {
          0%, 100% { transform: scale(1); opacity: 0.25; box-shadow: 0 0 0 0 currentColor; }
          50% { transform: scale(2.2); opacity: 0.50; }
        }
        @keyframes nodeRing {
          0% { transform: scale(1); opacity: 0.30; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes wireRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes wireRotateSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes lineDraw {
          0% { transform: scaleX(0); opacity: 0; }
          15% { opacity: 0.35; }
          85% { opacity: 0.35; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes lineDrawV {
          0% { transform: scaleY(0); opacity: 0; }
          15% { opacity: 0.28; }
          85% { opacity: 0.28; }
          100% { transform: scaleY(1); opacity: 0; }
        }
        @keyframes gridDrift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-30px, -20px); }
          66% { transform: translate(15px, -35px); }
        }
        @keyframes scanLine {
          0% { transform: translateY(-5%); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(105%); opacity: 0; }
        }
        @keyframes wireBreathe {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.18; }
          50% { transform: scale(1.12) rotate(3deg); opacity: 0.38; }
        }
        @keyframes wireBreatheAlt {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.15; }
          50% { transform: scale(0.88) rotate(-4deg); opacity: 0.35; }
        }
        @keyframes constellationDrift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(25px, -18px); }
          50% { transform: translate(-14px, -32px); }
          75% { transform: translate(20px, -10px); }
        }
        @keyframes signalPulse {
          0% { transform: scale(0.8); opacity: 0.40; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes traceH {
          0% { width: 0; opacity: 0.40; }
          50% { opacity: 0.40; }
          100% { width: 100%; opacity: 0; }
        }
        @keyframes cornerBlink {
          0%, 100% { opacity: 0.30; }
          50% { opacity: 0.70; }
        }

        .wire-grid-pulse { animation: wireGridPulse 5s ease-in-out infinite; }
        .wire-node { animation: nodePulse 3s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .wire-node-2 { animation: nodePulse 3.5s cubic-bezier(0.16, 1, 0.3, 1) infinite; animation-delay: 1s; }
        .wire-node-3 { animation: nodePulse 4s cubic-bezier(0.16, 1, 0.3, 1) infinite; animation-delay: 2s; }
        .wire-ring { animation: nodeRing 3s ease-out infinite; }
        .wire-ring-2 { animation: nodeRing 3s ease-out infinite; animation-delay: 1s; }
        .wire-rotate { animation: wireRotate 25s linear infinite; }
        .wire-rotate-rev { animation: wireRotate 30s linear infinite; animation-direction: reverse; }
        .wire-rotate-slow { animation: wireRotateSlow 50s linear infinite; }
        .wire-line-draw { animation: lineDraw 7s cubic-bezier(0.16, 1, 0.3, 1) infinite; transform-origin: left center; }
        .wire-line-draw-2 { animation: lineDraw 9s cubic-bezier(0.16, 1, 0.3, 1) infinite; animation-delay: 2.5s; transform-origin: left center; }
        .wire-line-draw-3 { animation: lineDraw 11s cubic-bezier(0.16, 1, 0.3, 1) infinite; animation-delay: 5s; transform-origin: left center; }
        .wire-line-v { animation: lineDrawV 8s cubic-bezier(0.16, 1, 0.3, 1) infinite; transform-origin: top center; }
        .wire-grid-drift { animation: gridDrift 18s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .wire-scan { animation: scanLine 8s linear infinite; }
        .wire-scan-slow { animation: scanLine 14s linear infinite; animation-delay: 4s; }
        .wire-breathe { animation: wireBreathe 7s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .wire-breathe-2 { animation: wireBreatheAlt 9s cubic-bezier(0.16, 1, 0.3, 1) infinite; animation-delay: 1.5s; }
        .wire-breathe-3 { animation: wireBreathe 11s cubic-bezier(0.16, 1, 0.3, 1) infinite; animation-delay: 3s; }
        .wire-constellation { animation: constellationDrift 12s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .wire-constellation-2 { animation: constellationDrift 15s cubic-bezier(0.16, 1, 0.3, 1) infinite; animation-delay: 3s; }
        .wire-signal { animation: signalPulse 3s ease-out infinite; }
        .wire-signal-2 { animation: signalPulse 3s ease-out infinite; animation-delay: 1s; }
        .wire-signal-3 { animation: signalPulse 3s ease-out infinite; animation-delay: 2s; }
        .wire-corner-blink { animation: cornerBlink 2s ease-in-out infinite; }

        /* Project card styles */
        .project-card {
          position: relative;
          border-radius: 20px;
          padding: 32px 28px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          text-decoration: none;
          display: block;
          color: #fff;
          border: 2px solid rgba(255,255,255,0.1);
        }
        .project-card:hover {
          transform: translateY(-4px) scale(1.01);
          border-color: rgba(255,255,255,0.3);
        }
        .project-card::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 120px; height: 120px;
          border-radius: 0 0 0 100%;
          opacity: 0.15;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-card:hover::before {
          opacity: 0.3;
        }
        .project-card-ta { background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); }
        .project-card-ta::before { background: #FF5C00; }
        .project-card-ta .project-tag { color: #FF5C00; }
        .project-card-ai { background: linear-gradient(135deg, #0a1628 0%, #0d0d0d 100%); }
        .project-card-ai::before { background: #007AFF; }
        .project-card-ai .project-tag { color: #007AFF; }
        .project-card-consulting { background: linear-gradient(135deg, #1a0f0f 0%, #0d0d0d 100%); }
        .project-card-consulting::before { background: #C4163A; }
        .project-card-consulting .project-tag { color: #C4163A; }

        .project-card .project-arrow {
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-card:hover .project-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        @media (max-width: 768px) {
          .animate-in { opacity: 1 !important; animation: none !important; }
          .tech-pill-float { animation: none !important; }
          .recognition-row { grid-template-columns: 1fr !important; }
          .bg-element { display: none !important; }
          .parallax-layer { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg-element { animation: none !important; }
          .parallax-layer { transform: none !important; animation: none !important; }
        }
      `}</style>

      {/* ===== SIDEBAR (Desktop) — Block card nav ===== */}
      <nav className="sidebar-nav" style={{
        width: 160, flexShrink: 0, height: '100vh',
        position: 'fixed', left: 0, top: 0, zIndex: 100,
        flexDirection: 'column',
        padding: '12px 10px',
        gap: 6,
        overflowY: 'auto',
        background: '#FFF8F4',
      }}>
        {SECTIONS.map(section => {
          const isActive = activeSection === section.id;
          const useDarkText = darkTextForNav(section.color);
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left',
                width: '100%',
                flex: isActive ? 1.3 : 1,
                minHeight: 0,
                background: section.color,
                borderRadius: 12,
                padding: '10px 12px',
                border: useDarkText ? '1.5px solid #000' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: isActive ? 1 : 0.85,
                fontFamily: "'Space Grotesk', sans-serif",
                overflow: 'hidden',
              }}
            >
              <span style={{
                fontSize: 11, fontWeight: 600,
                color: useDarkText ? '#000' : '#fff',
                opacity: 0.7,
                alignSelf: 'flex-start',
              }}>
                {section.num}
              </span>
              <span style={{
                fontSize: 16, fontWeight: 700,
                color: useDarkText ? '#000' : '#fff',
                alignSelf: 'flex-start',
                lineHeight: 1.2,
                marginTop: 'auto',
              }}>
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ===== MAIN SCROLL CONTAINER ===== */}
      <div className="snap-container" ref={containerRef} style={{ marginLeft: 160 }}>

        {/* ===== BLOCK 01: HERO (Orange) ===== */}
        <section
          id="hero"
          className="snap-section"
          ref={el => { sectionRefs.current['hero'] = el; }}
          style={{ background: '#FF5C00', flexDirection: 'column', justifyContent: 'center', padding: '60px 60px', position: 'relative', overflow: 'hidden' }}
        >
          {/* Geometric wireframe: Blueprint Origin */}
          <div className="parallax-layer parallax-back">
            <div className="bg-element wire-grid-pulse" style={{
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
          </div>
          <div className="parallax-layer parallax-mid">
            {/* Large spinning diamond — dominant hero element */}
            <div className="bg-element wire-rotate-slow" style={{
              top: '-5%', right: '-8%', width: 420, height: 420,
              border: '2px solid rgba(0,0,0,0.22)',
              transform: 'rotate(45deg)',
            }} />
            {/* Counter-rotating inner diamond */}
            <div className="bg-element wire-rotate-rev" style={{
              top: '4%', right: '0%', width: 260, height: 260,
              border: '1.5px solid rgba(0,0,0,0.15)',
              transform: 'rotate(45deg)',
            }} />
            {/* Large circle */}
            <div className="bg-element wire-breathe" style={{
              bottom: '-20%', right: '-5%', width: 360, height: 360,
              border: '1.5px solid rgba(0,0,0,0.16)',
              borderRadius: '50%',
            }} />
            {/* Horizontal extending lines */}
            <div className="bg-element wire-line-draw" style={{
              top: '38%', left: 0, width: '45%', height: 1,
              background: 'rgba(0,0,0,0.28)',
            }} />
            <div className="bg-element wire-line-draw-2" style={{
              top: '55%', left: 0, width: '30%', height: 1,
              background: 'rgba(0,0,0,0.20)',
            }} />
            <div className="bg-element wire-line-draw-3" style={{
              bottom: '20%', left: 0, width: '25%', height: 1,
              background: 'rgba(0,0,0,0.16)',
            }} />
          </div>
          <div className="parallax-layer parallax-front">
            {/* Corner brackets */}
            <div className="bg-element wire-corner-blink" style={{
              top: '12%', right: '14%',
              width: 30, height: 30,
              borderTop: '2px solid rgba(0,0,0,0.35)',
              borderRight: '2px solid rgba(0,0,0,0.35)',
            }} />
            <div className="bg-element wire-corner-blink" style={{
              bottom: '18%', right: '24%',
              width: 24, height: 24,
              borderBottom: '2px solid rgba(0,0,0,0.28)',
              borderLeft: '2px solid rgba(0,0,0,0.28)',
              animationDelay: '0.8s',
            }} />
            {/* Bold node dots */}
            <div className="bg-element wire-node" style={{
              top: '38%', left: '44%', width: 10, height: 10,
              borderRadius: '50%', background: 'rgba(0,0,0,0.30)',
            }} />
            <div className="bg-element wire-ring" style={{
              top: '37%', left: '43%', width: 12, height: 12,
              borderRadius: '50%', border: '1.5px solid rgba(0,0,0,0.25)',
            }} />
            <div className="bg-element wire-node-2" style={{
              top: '55%', left: '29%', width: 8, height: 8,
              borderRadius: '50%', background: 'rgba(0,0,0,0.24)',
            }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <BlockPill num="01" />
          </div>
          <div style={{ marginTop: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', position: 'relative', zIndex: 1 }}>
            <h1 className="animate-in" style={{
              fontSize: 'clamp(60px, 12vw, 180px)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#000',
              textTransform: 'uppercase',
            }}>
              Michael<br />Hartman
            </h1>
            <div className="animate-in stagger-2" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 32, flexWrap: 'wrap', gap: 24 }}>
              <div>
                <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 500, color: '#000', lineHeight: 1.5, whiteSpace: 'nowrap' }}>
                  Senior Manager, TA & AI Enablement at Kellanova.
                </p>
                <p style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 500, color: '#000', maxWidth: 500, lineHeight: 1.5, marginTop: 16 }}>
                  Accelerating AI in Talent Acquisition.
                </p>
                <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)', marginTop: 8 }}>Greater Chicago Area</p>
              </div>
              {/* Headshot */}
              <div style={{
                width: 140, height: 140, borderRadius: '50%',
                border: '4px solid #000', overflow: 'hidden', flexShrink: 0,
                background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <span style={{ fontSize: 48, fontWeight: 700, color: '#FF5C00', position: 'absolute' }}>MH</span>
                <img
                  src={`${import.meta.env.BASE_URL}headshot.jpg`}
                  alt="Michael Hartman"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== BLOCK 02: EXPERTISE (Purple) ===== */}
        <section
          id="expertise"
          className="snap-section"
          ref={el => { sectionRefs.current['expertise'] = el; }}
          style={{
            background: '#8A2BE2', color: '#fff', padding: '60px 60px',
            flexDirection: 'column', alignItems: 'stretch',
            minHeight: '100vh', height: 'auto',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Geometric wireframe: Neural Network */}
          <div className="parallax-layer parallax-back">
            <div className="bg-element wire-grid-drift" style={{
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'linear-gradient(60deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(-60deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '60px 104px',
            }} />
          </div>
          <div className="parallax-layer parallax-mid">
            {/* Large outer hexagon */}
            <div className="bg-element wire-rotate-slow" style={{
              top: '-15%', right: '-12%', width: 450, height: 450,
              boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.28)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }} />
            {/* Inner hexagon counter-rotating */}
            <div className="bg-element wire-rotate-rev" style={{
              top: '-5%', right: '-2%', width: 280, height: 280,
              boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.20)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }} />
            {/* Pentagon bottom-left */}
            <div className="bg-element wire-breathe-2" style={{
              bottom: '5%', left: '-5%', width: 200, height: 200,
              boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.22)',
              clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            }} />
            {/* Diagonal connection lines */}
            <div className="bg-element wire-line-draw" style={{
              top: '30%', left: '5%', width: '40%', height: 1,
              background: 'rgba(255,255,255,0.28)',
              transform: 'rotate(-18deg)',
              transformOrigin: 'left center',
            }} />
            <div className="bg-element wire-line-draw-2" style={{
              top: '60%', left: '10%', width: '35%', height: 1,
              background: 'rgba(255,255,255,0.22)',
              transform: 'rotate(22deg)',
              transformOrigin: 'left center',
            }} />
          </div>
          <div className="parallax-layer parallax-front">
            <div className="bg-element wire-node" style={{
              top: '25%', right: '22%', width: 12, height: 12,
              borderRadius: '50%', background: 'rgba(255,255,255,0.40)',
            }} />
            <div className="bg-element wire-ring" style={{
              top: '24%', right: '21%', width: 14, height: 14,
              borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.30)',
            }} />
            <div className="bg-element wire-node-2" style={{
              top: '52%', left: '12%', width: 10, height: 10,
              borderRadius: '50%', background: 'rgba(255,255,255,0.35)',
            }} />
            <div className="bg-element wire-node-3" style={{
              bottom: '22%', left: '30%', width: 8, height: 8,
              borderRadius: '50%', background: 'rgba(255,255,255,0.28)',
            }} />
            <div className="bg-element wire-constellation" style={{
              top: '72%', right: '18%', width: 6, height: 6,
              borderRadius: '50%', background: 'rgba(255,255,255,0.25)',
            }} />
          </div>

          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            <BlockPill num="02" />

            <h2 className="animate-in" style={{
              fontSize: 'clamp(36px, 6vw, 80px)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginTop: 24,
              marginBottom: 32,
            }}>
              Expertise
            </h2>

            <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'start' }}>
              <div className="animate-in stagger-1">
                <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', maxWidth: 560 }}>
                  13 years in talent acquisition, sourcing, and market intelligence — now focused on AI enablement and implementation across global TA operations. I build and deploy AI agents that make recruiters measurably more productive. I help brands articulate their talent strategy through data-driven automation and agentic AI workflows.
                </p>
              </div>

              <div className="animate-in stagger-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, opacity: 0.7 }}>Specializations</h4>
                  {competencies.map(c => (
                    <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 15, fontWeight: 500 }}>
                      <span>{c.icon}</span> {c.title}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, opacity: 0.7 }}>Employers</h4>
                  {companies.map(c => (
                    <div key={c} style={{ marginBottom: 12, fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>→</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Tech Stack */}
            <div className="animate-in stagger-3" style={{ marginTop: 40 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, opacity: 0.7 }}>AI Tech Stack</h4>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {techStack.map((t, i) => (
                  <span key={t} className="tech-pill tech-pill-float" style={{ animationDelay: `${i * 0.15}s` }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== BLOCK 03: WORK (Black) ===== */}
        <section
          id="work"
          className="snap-section"
          ref={el => { sectionRefs.current['work'] = el; }}
          style={{
            background: '#000', color: '#fff', padding: '60px 60px',
            flexDirection: 'column', alignItems: 'stretch',
            minHeight: '100vh', height: 'auto',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Geometric wireframe: Circuit Board */}
          <div className="parallax-layer parallax-back">
            <div className="bg-element wire-grid-pulse" style={{
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
          </div>
          <div className="parallax-layer parallax-mid">
            {/* Dramatic scan line */}
            <div className="bg-element wire-scan" style={{
              top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,92,0,0.50) 30%, rgba(255,255,255,0.60) 50%, rgba(255,92,0,0.50) 70%, transparent 100%)',
              boxShadow: '0 0 20px rgba(255,255,255,0.30)',
            }} />
            {/* Large PCB rectangle top-right */}
            <div className="bg-element wire-breathe" style={{
              top: '8%', right: '5%', width: 200, height: 130,
              border: '1.5px solid rgba(255,255,255,0.20)',
              borderRadius: 4,
            }} />
            {/* Inner rectangle */}
            <div className="bg-element wire-breathe-2" style={{
              top: '13%', right: '8%', width: 140, height: 80,
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 3,
            }} />
            {/* L-shaped trace horizontal */}
            <div className="bg-element wire-line-draw" style={{
              top: '50%', left: 0, width: '22%', height: 2,
              background: 'rgba(255,255,255,0.30)',
            }} />
            {/* L-shaped trace vertical */}
            <div className="bg-element wire-line-v" style={{
              top: '50%', left: '22%', width: 2, height: '18%',
              background: 'rgba(255,255,255,0.24)',
            }} />
            {/* Second trace */}
            <div className="bg-element wire-line-draw-2" style={{
              top: '68%', left: '22%', width: '18%', height: 2,
              background: 'rgba(255,255,255,0.22)',
            }} />
            {/* Bottom-right component square */}
            <div className="bg-element wire-breathe-3" style={{
              bottom: '12%', right: '8%', width: 90, height: 90,
              border: '1.5px solid rgba(255,255,255,0.18)',
            }} />
          </div>
          <div className="parallax-layer parallax-front">
            <div className="bg-element wire-node" style={{
              top: '50%', left: '22%', width: 10, height: 10,
              background: 'rgba(255,255,255,0.40)', borderRadius: '50%',
            }} />
            <div className="bg-element wire-ring" style={{
              top: '49%', left: '21%', width: 12, height: 12,
              border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: '50%',
            }} />
            <div className="bg-element wire-node-2" style={{
              top: '68%', left: '40%', width: 8, height: 8,
              background: 'rgba(255,255,255,0.32)', borderRadius: '50%',
            }} />
            <div className="bg-element wire-node-3" style={{
              bottom: '12%', right: '8%', width: 6, height: 6,
              background: 'rgba(255,255,255,0.28)',
            }} />
          </div>

          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            <BlockPill num="03" />
            <h2 className="animate-in" style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em',
              textTransform: 'uppercase', marginTop: 24, marginBottom: 20,
            }}>
              What I've Built
            </h2>

            {/* Filter pills */}
            <div className="animate-in stagger-1" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
              {projectCategories.map(cat => (
                <button
                  key={cat}
                  className={`work-filter-pill ${projectFilter === cat ? 'active' : ''}`}
                  onClick={() => setProjectFilter(cat)}
                >
                  {cat === 'All' ? `All (${projects.length})` : cat}
                </button>
              ))}
            </div>

            <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {filteredProjects.map((p, i) => {
                const cardClass = p.category === 'TA Tools' ? 'project-card-ta'
                  : p.category === 'AI Projects' ? 'project-card-ai'
                  : 'project-card-consulting';
                return (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`project-card ${cardClass} animate-in`}
                    style={{ animationDelay: `${i * 0.08 + 0.2}s` }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <span className="project-tag" style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                      }}>{p.tag}</span>
                      <span style={{
                        fontSize: 11, padding: '4px 12px', borderRadius: 999,
                        border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)',
                        fontWeight: 600,
                      }}>{p.metric}</span>
                    </div>
                    <h3 style={{
                      fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 700,
                      lineHeight: 1.15, marginBottom: 12, letterSpacing: '-0.01em',
                    }}>{p.title}</h3>
                    <p style={{
                      fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6,
                      marginBottom: 20, maxWidth: 380,
                    }}>{p.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>View project</span>
                      <span className="project-arrow" style={{ fontSize: 16, color: '#fff' }}>↗</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== BLOCK 04: IMPACT (Blue) ===== */}
        <section
          id="impact"
          className="snap-section"
          ref={el => { sectionRefs.current['impact'] = el; }}
          style={{
            background: '#007AFF', color: '#fff', padding: '60px 60px',
            flexDirection: 'column', alignItems: 'stretch',
            minHeight: '100vh', height: 'auto',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Geometric wireframe: Data Visualization Grid */}
          <div className="parallax-layer parallax-back">
            <div className="bg-element wire-grid-drift" style={{
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
          </div>
          <div className="parallax-layer parallax-mid">
            {/* Vertical axis line full height right side */}
            <div className="bg-element" style={{
              top: 0, right: '15%', width: 1, height: '100%',
              background: 'rgba(255,255,255,0.18)',
            }} />
            {/* Horizontal measurement lines with different lengths = chart bars */}
            <div className="bg-element wire-line-draw" style={{
              top: '22%', left: '5%', width: '58%', height: 2,
              background: 'rgba(255,255,255,0.32)',
            }} />
            <div className="bg-element wire-line-draw-2" style={{
              top: '38%', left: '5%', width: '42%', height: 2,
              background: 'rgba(255,255,255,0.26)',
            }} />
            <div className="bg-element wire-line-draw-3" style={{
              top: '54%', left: '5%', width: '72%', height: 2,
              background: 'rgba(255,255,255,0.30)',
            }} />
            <div className="bg-element wire-line-draw" style={{
              top: '70%', left: '5%', width: '35%', height: 2,
              background: 'rgba(255,255,255,0.22)',
              animationDelay: '3s',
            }} />
            {/* Large background circle top-right decorative */}
            <div className="bg-element wire-breathe" style={{
              top: '-10%', right: '-8%', width: 320, height: 320,
              border: '2px solid rgba(255,255,255,0.14)',
              borderRadius: '50%',
            }} />
          </div>
          <div className="parallax-layer parallax-front">
            {/* Data point nodes at end of each bar */}
            <div className="bg-element wire-node" style={{
              top: '21%', left: '63%', width: 12, height: 12,
              borderRadius: '50%', background: 'rgba(255,255,255,0.45)',
            }} />
            <div className="bg-element wire-ring" style={{
              top: '20%', left: '62%', width: 14, height: 14,
              borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.30)',
            }} />
            <div className="bg-element wire-node-2" style={{
              top: '37%', left: '47%', width: 10, height: 10,
              borderRadius: '50%', background: 'rgba(255,255,255,0.38)',
            }} />
            <div className="bg-element wire-node-3" style={{
              top: '53%', left: '77%', width: 12, height: 12,
              borderRadius: '50%', background: 'rgba(255,255,255,0.42)',
            }} />
            <div className="bg-element wire-ring-2" style={{
              top: '52%', left: '76%', width: 14, height: 14,
              borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.28)',
            }} />
          </div>

          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            <BlockPill num="04" />
            <h2 className="animate-in" style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em',
              textTransform: 'uppercase', marginTop: 24, marginBottom: 40,
            }}>
              Impact
            </h2>

            <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {stats.map((s, i) => {
                const { count, ref } = useCountUp(s.value, 2000);
                return (
                  <div key={i} ref={ref} className="stat-card animate-in" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1, marginBottom: 12, color: '#007AFF' }}>
                      {s.prefix || ''}{count}{s.suffix}
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(0,0,0,0.6)' }}>{s.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Recognition */}
            <div style={{ marginTop: 48 }}>
              <h3 className="animate-in" style={{
                fontSize: 13, fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase', marginBottom: 20, opacity: 0.85,
                animationDelay: '0.5s',
              }}>
                Recognition
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {recognition.map((r, i) => (
                  <div key={i} className="recognition-row animate-in" style={{
                    padding: '16px 0',
                    borderTop: '2px solid rgba(255,255,255,0.25)',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 16,
                    alignItems: 'start',
                    animationDelay: `${i * 0.06 + 0.55}s`,
                  }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{r.title}</div>
                      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{r.desc}</div>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: 1,
                      padding: '4px 12px', borderRadius: 999,
                      border: '1.5px solid rgba(255,255,255,0.4)',
                      whiteSpace: 'nowrap',
                    }}>
                      {r.org}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== BLOCK 05: CAREER (Cream) ===== */}
        <section
          id="career"
          className="snap-section"
          ref={el => { sectionRefs.current['career'] = el; }}
          style={{
            background: '#C4163A', color: '#fff', padding: '60px 60px',
            flexDirection: 'column', alignItems: 'stretch',
            minHeight: '100vh', height: 'auto',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Geometric wireframe: Timeline Architecture */}
          <div className="parallax-layer parallax-back">
            <div className="bg-element wire-grid-pulse" style={{
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }} />
          </div>
          <div className="parallax-layer parallax-mid">
            {/* Dominant vertical timeline line */}
            <div className="bg-element" style={{
              top: '5%', right: '10%', width: 2, height: '90%',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.30) 15%, rgba(255,255,255,0.30) 85%, transparent)',
            }} />
            {/* Branch lines extending left from timeline */}
            <div className="bg-element wire-line-draw" style={{
              top: '18%', right: '10%', width: '18%', height: 1,
              background: 'rgba(255,255,255,0.30)',
              transformOrigin: 'right center',
            }} />
            <div className="bg-element wire-line-draw-2" style={{
              top: '42%', right: '10%', width: '28%', height: 1,
              background: 'rgba(255,255,255,0.28)',
              transformOrigin: 'right center',
            }} />
            <div className="bg-element wire-line-draw-3" style={{
              top: '65%', right: '10%', width: '22%', height: 1,
              background: 'rgba(255,255,255,0.24)',
              transformOrigin: 'right center',
            }} />
            {/* Large triangle wireframe shapes */}
            <div className="bg-element wire-breathe" style={{
              bottom: '10%', left: '2%', width: 180, height: 180,
              boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.26)',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            }} />
            <div className="bg-element wire-breathe-2" style={{
              top: '5%', left: '35%', width: 120, height: 120,
              boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.20)',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            }} />
          </div>
          <div className="parallax-layer parallax-front">
            {/* Timeline milestone nodes */}
            <div className="bg-element wire-node" style={{
              top: '18%', right: '10%', width: 12, height: 12,
              borderRadius: '50%', background: 'rgba(255,255,255,0.45)',
              transform: 'translate(50%, -50%)',
            }} />
            <div className="bg-element wire-ring" style={{
              top: '18%', right: '10%', width: 18, height: 18,
              borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.28)',
              transform: 'translate(50%, -50%)',
            }} />
            <div className="bg-element wire-node-2" style={{
              top: '42%', right: '10%', width: 10, height: 10,
              borderRadius: '50%', background: 'rgba(255,255,255,0.38)',
              transform: 'translate(50%, -50%)',
            }} />
            <div className="bg-element wire-node-3" style={{
              top: '65%', right: '10%', width: 10, height: 10,
              borderRadius: '50%', background: 'rgba(255,255,255,0.35)',
              transform: 'translate(50%, -50%)',
            }} />
          </div>

          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            <BlockPill num="05" />
            <h2 className="animate-in" style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em',
              textTransform: 'uppercase', marginTop: 24, marginBottom: 40,
            }}>
              Where I've Been
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {career.map((role, i) => (
                <div key={i} className="career-row animate-in" style={{
                  animationDelay: `${i * 0.08}s`,
                  display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32,
                  padding: '24px 0',
                  borderTop: '2px solid rgba(255,255,255,0.3)',
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{role.period}</div>
                    {role.current && (
                      <span style={{
                        display: 'inline-block', marginTop: 6,
                        fontSize: 11, fontWeight: 700, letterSpacing: 1,
                        color: '#FFFF00', textTransform: 'uppercase',
                      }}>● Current</span>
                    )}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{role.title}</h3>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#FFFF00', marginBottom: 8 }}>{role.company}</div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education + Cert row */}
            <div className="grid-2col animate-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 40, animationDelay: '0.5s' }}>
              <div className="credential-card">
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#FFFF00', marginBottom: 12 }}>Education</div>
                <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>University of Illinois at Urbana-Champaign</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Bachelor's Degree, 2008-2012. Major: Recreation, Sport & Tourism (Sport Management). Minor: Communication.</p>
              </div>
              <div className="credential-card">
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#FFFF00', marginBottom: 12 }}>Certification</div>
                <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>MindStudio Level 3 AI Agent Developer</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Highest level of certification for AI agent architecture and deployment.</p>
                <a href="https://www.virtualbadge.io/certificate-validator?credential=40f1426b-e1a1-405d-96bd-03ebae42a977" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: '#FFFF00', textDecoration: 'none' }}>Verify Credential ↗</a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BLOCK 06: AGENTS (Green) ===== */}
        <section
          id="agents"
          className="snap-section"
          ref={el => { sectionRefs.current['agents'] = el; }}
          style={{
            background: '#00C853', color: '#000', padding: '60px 60px',
            flexDirection: 'column', alignItems: 'stretch',
            minHeight: '100vh', height: 'auto',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Geometric wireframe: Network Mesh */}
          <div className="parallax-layer parallax-back">
            <div className="bg-element wire-grid-drift" style={{
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.15) 2px, transparent 2px)',
              backgroundSize: '45px 45px',
            }} />
          </div>
          <div className="parallax-layer parallax-mid">
            {/* Large octagon rotating */}
            <div className="bg-element wire-rotate-slow" style={{
              top: '-12%', right: '-8%', width: 400, height: 400,
              boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.26)',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }} />
            {/* Inner octagon counter-rotating */}
            <div className="bg-element wire-rotate-rev" style={{
              top: '-2%', right: '2%', width: 240, height: 240,
              boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.20)',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }} />
            {/* Connection lines between node clusters */}
            <div className="bg-element wire-line-draw" style={{
              top: '30%', left: '8%', width: '35%', height: 1.5,
              background: 'rgba(0,0,0,0.22)',
              transform: 'rotate(-12deg)',
              transformOrigin: 'left center',
            }} />
            <div className="bg-element wire-line-draw-2" style={{
              top: '55%', left: '15%', width: '30%', height: 1.5,
              background: 'rgba(0,0,0,0.18)',
              transform: 'rotate(18deg)',
              transformOrigin: 'left center',
            }} />
            <div className="bg-element wire-line-draw-3" style={{
              top: '42%', left: '40%', width: '25%', height: 1.5,
              background: 'rgba(0,0,0,0.16)',
              transform: 'rotate(-8deg)',
              transformOrigin: 'left center',
            }} />
          </div>
          <div className="parallax-layer parallax-front">
            {/* Hub nodes — larger, more visible */}
            <div className="bg-element wire-node" style={{
              top: '28%', left: '12%', width: 14, height: 14,
              borderRadius: '50%', background: 'rgba(0,0,0,0.30)',
            }} />
            <div className="bg-element wire-ring" style={{
              top: '27%', left: '11%', width: 18, height: 18,
              borderRadius: '50%', border: '1.5px solid rgba(0,0,0,0.22)',
            }} />
            <div className="bg-element wire-node-2" style={{
              top: '43%', left: '44%', width: 12, height: 12,
              borderRadius: '50%', background: 'rgba(0,0,0,0.26)',
            }} />
            <div className="bg-element wire-ring-2" style={{
              top: '42%', left: '43%', width: 16, height: 16,
              borderRadius: '50%', border: '1.5px solid rgba(0,0,0,0.18)',
            }} />
            <div className="bg-element wire-node-3" style={{
              top: '55%', left: '22%', width: 10, height: 10,
              borderRadius: '50%', background: 'rgba(0,0,0,0.22)',
            }} />
            <div className="bg-element wire-constellation" style={{
              top: '66%', left: '40%', width: 8, height: 8,
              borderRadius: '50%', background: 'rgba(0,0,0,0.18)',
            }} />
          </div>

          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <BlockPill num="06" dark />
              <span style={{
                fontSize: 13, fontWeight: 700, padding: '6px 16px',
                borderRadius: 999, background: '#000', color: '#00C853',
              }}>15 deployed</span>
            </div>
            <h2 className="animate-in" style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em',
              textTransform: 'uppercase', marginTop: 24, marginBottom: 24,
            }}>
              MindStudio AI Agents
            </h2>

            {/* Filter pills */}
            <div className="animate-in stagger-1" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {agentCategories.map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${agentFilter === cat ? 'active' : ''}`}
                  onClick={() => setAgentFilter(cat)}
                >
                  {cat === 'All' ? `All (${agents.length})` : cat}
                </button>
              ))}
            </div>

            {/* Agent grid */}
            <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {filteredAgents.map((agent, i) => (
                <div key={agent.name} className="agent-card animate-in" style={{ animationDelay: `${i * 0.04 + 0.2}s` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: categoryColors[agent.category] || '#000',
                      flexShrink: 0,
                    }} />
                    <h4 style={{ fontSize: 14, fontWeight: 700 }}>{agent.name}</h4>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)', lineHeight: 1.5, paddingLeft: 18 }}>{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BLOCK 07: CONTACT (Yellow) ===== */}
        <section
          id="contact"
          className="snap-section"
          ref={el => { sectionRefs.current['contact'] = el; }}
          style={{ background: '#FFFF00', color: '#000', padding: '60px 60px', position: 'relative', overflow: 'hidden' }}
        >
          {/* Geometric wireframe: Signal Transmission */}
          <div className="parallax-layer parallax-back">
            {/* Large concentric signal circles centered right */}
            <div className="bg-element wire-signal" style={{
              top: '20%', right: '5%', width: 80, height: 80,
              border: '2px solid rgba(0,0,0,0.22)',
              borderRadius: '50%',
            }} />
            <div className="bg-element wire-signal-2" style={{
              top: '20%', right: '5%', width: 80, height: 80,
              border: '2px solid rgba(0,0,0,0.18)',
              borderRadius: '50%',
            }} />
            <div className="bg-element wire-signal-3" style={{
              top: '20%', right: '5%', width: 80, height: 80,
              border: '2px solid rgba(0,0,0,0.14)',
              borderRadius: '50%',
            }} />
          </div>
          <div className="parallax-layer parallax-mid">
            {/* Large static outer circle wireframe */}
            <div className="bg-element wire-breathe" style={{
              top: '-10%', right: '-20%', width: 500, height: 500,
              border: '1.5px solid rgba(0,0,0,0.12)',
              borderRadius: '50%',
            }} />
            <div className="bg-element wire-breathe-2" style={{
              top: '5%', right: '-10%', width: 320, height: 320,
              border: '1.5px solid rgba(0,0,0,0.14)',
              borderRadius: '50%',
            }} />
            {/* Crossing diagonal lines */}
            <div className="bg-element wire-line-draw" style={{
              top: '48%', left: 0, width: '35%', height: 2,
              background: 'rgba(0,0,0,0.24)',
            }} />
            <div className="bg-element wire-line-draw-2" style={{
              top: '60%', left: 0, width: '28%', height: 1.5,
              background: 'rgba(0,0,0,0.18)',
            }} />
            {/* Grid scan slow */}
            <div className="bg-element wire-scan-slow" style={{
              top: 0, left: 0, right: 0, height: 1.5,
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.22) 40%, rgba(0,0,0,0.22) 60%, transparent 100%)',
            }} />
          </div>
          <div className="parallax-layer parallax-front">
            {/* Origin node for signal */}
            <div className="bg-element wire-node" style={{
              top: '33%', right: '7.5%', width: 14, height: 14,
              borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
              transform: 'translate(50%, -50%)',
            }} />
            <div className="bg-element wire-ring" style={{
              top: '33%', right: '7.5%', width: 20, height: 20,
              borderRadius: '50%', border: '2px solid rgba(0,0,0,0.25)',
              transform: 'translate(50%, -50%)',
            }} />
            <div className="bg-element wire-node-2" style={{
              top: '48%', left: '35%', width: 10, height: 10,
              borderRadius: '50%', background: 'rgba(0,0,0,0.28)',
            }} />
            <div className="bg-element wire-node-3" style={{
              top: '60%', left: '28%', width: 8, height: 8,
              borderRadius: '50%', background: 'rgba(0,0,0,0.22)',
            }} />
          </div>

          <div style={{ width: '100%', maxWidth: 700, position: 'relative', zIndex: 1 }}>
            <BlockPill num="07" dark />
            <h2 className="animate-in" style={{
              fontSize: 'clamp(40px, 8vw, 100px)',
              fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em',
              textTransform: 'uppercase', marginTop: 24, marginBottom: 24,
            }}>
              Let's Build<br />Something<br />Together
            </h2>
            <p className="animate-in stagger-1" style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.7, color: 'rgba(0,0,0,0.7)', marginBottom: 40, maxWidth: 500 }}>
              Whether you're exploring AI in talent acquisition, looking for a builder, or just want to trade ideas — I'm always up for a conversation.
            </p>
            <div className="animate-in stagger-2" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="mailto:hartman1133@gmail.com" className="brutalist-btn brutalist-btn-dark">Email</a>
              <a href="https://www.linkedin.com/in/mike-hartman-13614224" target="_blank" rel="noopener noreferrer" className="brutalist-btn brutalist-btn-light">LinkedIn</a>
              <a href="https://github.com/mhartman-11" target="_blank" rel="noopener noreferrer" className="brutalist-btn brutalist-btn-light">GitHub</a>
            </div>
          </div>
        </section>

      </div>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <div className="mobile-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        height: 56, background: 'rgba(255,248,244,0.95)', backdropFilter: 'blur(10px)',
        borderTop: '2px solid #000',
        display: 'none', alignItems: 'center', justifyContent: 'space-around',
        padding: '0 8px',
      }}>
        {SECTIONS.map(section => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '4px 6px',
              opacity: activeSection === section.id ? 1 : 0.4,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <div style={{
              width: activeSection === section.id ? 16 : 10,
              height: activeSection === section.id ? 16 : 10,
              borderRadius: 4,
              background: section.color,
              border: section.color === '#FFF8F4' || section.color === '#FFFF00' ? '1px solid #000' : 'none',
              transition: 'all 0.3s',
            }} />
            <span style={{ fontSize: 8, fontWeight: 600, color: '#000', letterSpacing: 0.3 }}>
              {section.num}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
