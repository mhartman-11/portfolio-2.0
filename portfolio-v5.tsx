import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================
// PORTFOLIO V5 — Michael Hartman
// Upgraded: animated background, stronger hero, count-up stats,
// interactive agent grid, project mockup frames, scroll animations
// ============================================================

// ---------- Animated count-up hook ----------
const useCountUp = (end: number, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView]);

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

// ---------- Scroll fade-in hook ----------
const useFadeIn = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
};

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ---------- Stat card with count-up ----------
const StatCard: React.FC<{ value: number; suffix: string; prefix?: string; label: string; delay?: number }> = ({ value, suffix, prefix = '', label, delay = 0 }) => {
  const { count, ref } = useCountUp(value, 2000);
  const { ref: fadeRef, visible } = useFadeIn();
  return (
    <div
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (fadeRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
        opacity: 0.6,
      }} />
      <div style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 42, fontWeight: 700,
        background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 8,
      }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.5 }}>{label}</div>
    </div>
  );
};

// ---------- Main Portfolio Component ----------
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [navBlur, setNavBlur] = useState(false);
  const [agentFilter, setAgentFilter] = useState('All');
  const [rotatingText, setRotatingText] = useState(0);

  const rotatingTitles = ['AI Agent Builder', 'TA Innovator', 'AI Strategist', 'Talent Technologist'];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((prev) => (prev + 1) % rotatingTitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setNavBlur(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  // ---------- DATA ----------
  const companies = ['KELLANOVA', 'UBER', 'BCG', 'ACCENTURE', 'CARS.COM', 'BROOKSOURCE'];

  const stats = [
    { value: 91, suffix: '%', label: 'Offer accept rate across ~300 hires at Kellanova in 2024' },
    { value: 10, suffix: '+', label: 'Custom AI agents built and deployed across Global TA operations' },
    { value: 850, suffix: 'K', prefix: '$', label: 'In cost savings generated through sourced hires at BCG' },
    { value: 30, suffix: '%', label: 'Recruiter productivity lift after AI agent deployment' },
    { value: 50, suffix: '%', label: 'Increase in TA team engagement with AI enablement programs' },
    { value: 93, suffix: '%', label: 'Mansfield D&I attainment rate across verticals at Uber' },
  ];

  const career = [
    { period: 'Mar 2024 – Present', current: true, title: 'Senior Manager, Talent Acquisition & AI Enablement', company: 'Kellanova (previously Kellogg\'s)', desc: 'Pioneered AI Enablement and talent intelligence division within TA. Built and deployed 10+ custom AI agents enhancing recruiter productivity by 30%. Oversee hiring for 11 Corporate Functions, managing top performing team in North America. 91% offer accept rate across ~300 hires in 2024.' },
    { period: 'Jun 2021 – Jul 2023', current: false, title: 'Talent Sourcing Manager → Principal Talent Sourcer', company: 'Uber', desc: 'Promoted within six months — only Sourcing Manager overseeing four verticals: Legal, Finance, People/Places, Core Services. Managed eight global direct reports, achieving 90% offer accept rate and 93% Mansfield D&I attainment.' },
    { period: 'Aug 2017 – Jun 2021', current: false, title: 'Senior Talent Sourcer → Talent Sourcer', company: 'Boston Consulting Group (BCG)', desc: 'Generated $850K cost savings through 30 global hires. Selected for secondment on in-house Executive Search Team supporting C-Suite stakeholders. Only team member out of 45 promoted in 2020. Sourcing across NAMR, EMEA, and APAC.' },
    { period: 'Sep 2015 – Aug 2017', current: false, title: 'Diversity Sourcing Recruiter, Sr. Analyst', company: 'Accenture', desc: 'Led diversity recruiting strategy across Ethnicity, Gender, LGBT, and PwD pillars. Cross-functional D&I SME for six business units. Managed $60K conference budget.' },
    { period: 'Aug 2014 – Sep 2015', current: false, title: 'Affiliate Account Manager', company: 'Cars.com', desc: 'Account management bridging sales and customer success in automotive digital marketplace.' },
    { period: 'Aug 2012 – Aug 2014', current: false, title: 'Technical Recruiter', company: 'Brooksource', desc: 'Foundation in high-volume technical recruiting and client relationship management.' },
  ];

  const competencies = [
    { icon: '⚡', title: 'Agentic AI Workflows', desc: 'End-to-end agents that research, summarize, and execute decisions independently.' },
    { icon: '📊', title: 'Market Intelligence', desc: 'Talent mapping and competitive landscape analysis for C-Suite stakeholders.' },
    { icon: '⚙️', title: 'TA Operations', desc: 'Scaling global recruiting infrastructure with data-driven automation.' },
  ];

  const techStack = ['Canva', 'ChatGPT', 'Claude', 'Copilot', 'Gamma', 'Gemini', 'LinkedIn Talent Insights', 'MindStudio', 'NotebookLM', 'Notion AI', 'Perplexity', 'Prompt Engineering', 'Talent Neuron'];

  const projects = [
    { category: 'TALENT INTELLIGENCE', title: 'Market Intelligence Dashboard', desc: 'Configurable dashboard tracking real-time industry layoffs, talent supply/demand, and competitor hiring activity.', metric: 'Real-time data', color: '#6366f1' },
    { category: 'INTERACTIVE TOOL', title: 'Recruiter Prompt Dashboard', desc: 'Browser-based dashboard with 150 ready-to-use AI prompts for recruiters with real-time search.', metric: '150+ prompts', color: '#8b5cf6' },
    { category: 'FEATURED WORK', title: 'AI in TA Digest (2026)', desc: 'Curated weekly insight into the convergence of recruitment operations and agentic AI.', metric: 'Weekly digest', color: '#a78bfa' },
    { category: 'INDUSTRY RESOURCES', title: '2026 HR/TA Global Calendar', desc: 'Centralized hub for HR and TA events worldwide with advanced filtering and registration access.', metric: 'Global events', color: '#7c3aed' },
  ];

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
  const filteredAgents = agentFilter === 'All' ? agents : agents.filter(a => a.category === agentFilter);

  const categoryColors: Record<string, string> = {
    Sourcing: '#6366f1', Intelligence: '#8b5cf6', Efficiency: '#10b981',
    Operations: '#f59e0b', Engagement: '#ec4899', Social: '#3b82f6',
    Branding: '#f97316', CX: '#14b8a6', Enablement: '#a78bfa', Evaluation: '#6ee7b7',
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'work', label: 'Work' },
    { id: 'agents', label: 'Agents' },
    { id: 'connect', label: 'Connect' },
  ];

  return (
    <div style={{ background: '#0a0b14', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif", overflowX: 'hidden' }}>

      {/* ===== GLOBAL STYLES ===== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        @keyframes meshMove1 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          25% { transform: translate(5%, -10%) scale(1.1); }
          50% { transform: translate(-5%, 5%) scale(0.95); }
          75% { transform: translate(10%, -5%) scale(1.05); }
        }
        @keyframes meshMove2 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          25% { transform: translate(-8%, 6%) scale(1.05); }
          50% { transform: translate(6%, -8%) scale(1.1); }
          75% { transform: translate(-3%, 10%) scale(0.95); }
        }
        @keyframes meshMove3 {
          0%, 100% { transform: translate(0%, 0%) scale(1.05); }
          33% { transform: translate(8%, 5%) scale(0.95); }
          66% { transform: translate(-6%, -8%) scale(1.1); }
        }
        @keyframes fadeRotate {
          0%, 15% { opacity: 1; transform: translateY(0); }
          20%, 25% { opacity: 0; transform: translateY(-20px); }
          30%, 100% { opacity: 0; transform: translateY(20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          50% { box-shadow: 0 0 0 4px rgba(99, 102, 241, 0); }
        }

        .nav-link { position: relative; color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; padding: 6px 0; transition: color 0.3s; cursor: pointer; background: none; border: none; font-family: inherit; }
        .nav-link:hover { color: #fff; }
        .nav-link.active { color: #fff; }
        .nav-link.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #6366f1, #8b5cf6); border-radius: 1px; }

        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(99, 102, 241, 0.15); border-color: rgba(99, 102, 241, 0.3) !important; }

        .agent-card { transition: all 0.3s ease; cursor: default; }
        .agent-card:hover { transform: translateY(-2px); background: rgba(255,255,255,0.06) !important; border-color: rgba(99, 102, 241, 0.3) !important; }

        .filter-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); padding: 6px 16px; border-radius: 20px; font-size: 13px; cursor: pointer; transition: all 0.3s; font-family: inherit; }
        .filter-btn:hover { border-color: rgba(99, 102, 241, 0.4); color: rgba(255,255,255,0.9); }
        .filter-btn.active { background: rgba(99, 102, 241, 0.2); border-color: #6366f1; color: #fff; }

        .gradient-btn { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; border: none; padding: 14px 32px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s; font-family: inherit; display: inline-flex; align-items: center; gap: 8px; }
        .gradient-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4); }

        .outline-btn { background: transparent; color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.2); padding: 14px 32px; border-radius: 12px; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-family: inherit; display: inline-flex; align-items: center; gap: 8px; }
        .outline-btn:hover { border-color: rgba(99, 102, 241, 0.5); color: #fff; background: rgba(99, 102, 241, 0.1); }

        .connect-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 14px 28px; border-radius: 12px; font-size: 15px; cursor: pointer; transition: all 0.3s; font-family: inherit; display: inline-flex; align-items: center; gap: 10px; text-decoration: none; }
        .connect-btn:hover { border-color: #6366f1; background: rgba(99, 102, 241, 0.1); transform: translateY(-2px); }

        .view-link { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px; display: inline-flex; align-items: center; gap: 6px; transition: all 0.3s; }
        .view-link:hover { color: #a78bfa; gap: 10px; }

        .tech-tag { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); padding: 6px 16px; border-radius: 20px; font-size: 13px; transition: all 0.3s; }
        .tech-tag:hover { border-color: rgba(99, 102, 241, 0.4); color: #fff; }
      `}</style>

      {/* ===== NAVIGATION ===== */}
      <nav style={{
        position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, display: 'flex', alignItems: 'center', gap: 24,
        padding: '10px 24px', borderRadius: 50,
        background: navBlur ? 'rgba(10, 11, 20, 0.85)' : 'rgba(10, 11, 20, 0.5)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${navBlur ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700,
        }}>MH</div>
        {navItems.map(item => (
          <button key={item.id} className={`nav-link ${activeSection === item.id ? 'active' : ''}`} onClick={() => scrollTo(item.id)}>
            {item.label}
          </button>
        ))}
        <button className="gradient-btn" style={{ padding: '8px 20px', fontSize: 13, borderRadius: 20 }} onClick={() => scrollTo('connect')}>
          Say hi ↗
        </button>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Animated mesh background */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', width: '60vw', height: '60vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            top: '-10%', left: '-10%', animation: 'meshMove1 20s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: '50vw', height: '50vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
            top: '20%', right: '-15%', animation: 'meshMove2 25s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: '40vw', height: '40vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%)',
            bottom: '-10%', left: '30%', animation: 'meshMove3 22s ease-in-out infinite',
          }} />
          {/* Dot grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '120px 40px 80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 60 }}>
          <div style={{ flex: 1, maxWidth: 700 }}>
            {/* Tagline hook */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: 20, padding: '6px 16px', marginBottom: 24, fontSize: 13,
              color: '#a78bfa', fontWeight: 500, letterSpacing: '0.5px',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', animation: 'livePulse 2s infinite' }} />
              Building AI agents for talent acquisition
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(48px, 7vw, 80px)',
              fontWeight: 900, lineHeight: 1.05, marginBottom: 16,
              letterSpacing: '-1px',
            }}>
              Michael<br />Hartman
            </h1>

            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
              Senior Manager, TA & AI Enablement <span style={{ color: 'rgba(255,255,255,0.3)' }}>at</span> <span style={{ color: 'rgba(255,255,255,0.7)' }}>Kellanova</span>
            </div>

            {/* Rotating title */}
            <div style={{ height: 32, overflow: 'hidden', marginBottom: 20 }}>
              {rotatingTitles.map((title, i) => (
                <div key={title} style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 20, fontStyle: 'italic',
                  color: '#a78bfa',
                  opacity: rotatingText === i ? 1 : 0,
                  transform: rotatingText === i ? 'translateY(0)' : 'translateY(-100%)',
                  transition: 'all 0.5s ease',
                  position: rotatingText === i ? 'relative' : 'absolute',
                }}>
                  {title}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 20 }}>
              📍 Greater Chicago Area
            </div>

            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 520 }}>
              13 years in talent acquisition and sourcing — now pioneering AI enablement across global TA operations. I build and deploy AI agents that make recruiters measurably more productive.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button className="gradient-btn" onClick={() => scrollTo('work')}>
                See My Work <span style={{ fontSize: 18 }}>→</span>
              </button>
              <button className="outline-btn" onClick={() => scrollTo('connect')}>
                Get in Touch
              </button>
            </div>
          </div>

          {/* Headshot */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              width: 220, height: 220, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))',
              padding: 4, boxShadow: '0 0 60px rgba(99, 102, 241, 0.2)',
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: 'linear-gradient(135deg, #1a1b2e, #252640)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 48, fontFamily: "'Playfair Display', Georgia, serif",
                color: 'rgba(255,255,255,0.3)',
                overflow: 'hidden',
              }}>
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQH6xIjnOy7JcA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730734711498?e=1748476800&v=beta&t=rHdKE1UcfXuR2Td5e2yJK9UD7UVoNuNX-Pp-WRqiCIo"
                  alt="Michael Hartman"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
        }}>
          <span>Scroll</span>
          <div style={{ width: 1, height: 30, background: 'linear-gradient(180deg, rgba(255,255,255,0.3), transparent)' }} />
        </div>
      </section>

      {/* ===== COMPANY LOGOS BAR ===== */}
      <FadeIn>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '40px 40px',
          display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Experience at</span>
          {companies.map(c => (
            <span key={c} style={{ fontSize: 13, letterSpacing: 2, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{c}</span>
          ))}
        </div>
      </FadeIn>

      {/* ===== IMPACT SECTION ===== */}
      <section id="impact" style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 40px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
            <span style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Impact</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 48px)', fontStyle: 'italic', fontWeight: 400, marginBottom: 48, color: 'rgba(255,255,255,0.95)' }}>
            The numbers behind the work
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {stats.map((s, i) => (
            <StatCard key={i} value={s.value} suffix={s.suffix} prefix={s.prefix || ''} label={s.label} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ===== CAREER SECTION ===== */}
      <section id="experience" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 100px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
            <span style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Career</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 48px)', fontStyle: 'italic', fontWeight: 400, marginBottom: 16, color: 'rgba(255,255,255,0.95)' }}>
            Where I've been
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.7, marginBottom: 48, maxWidth: 600 }}>
            Over a decade leading global Talent Sourcing and Intelligence functions — bridging human strategy and technological innovation.
          </p>
        </FadeIn>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: 195, top: 0, bottom: 0, width: 1,
            background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.05))',
          }} />

          {career.map((role, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                display: 'flex', gap: 40, padding: '28px 0',
                borderBottom: i < career.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <div style={{ width: 180, flexShrink: 0, textAlign: 'right', paddingRight: 24, position: 'relative' }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>
                    {role.period}
                  </div>
                  {role.current && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6,
                      fontSize: 11, fontWeight: 600, color: '#6366f1', letterSpacing: 1,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', animation: 'livePulse 2s infinite' }} />
                      CURRENT
                    </div>
                  )}
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute', right: -4, top: 32,
                    width: 8, height: 8, borderRadius: '50%',
                    background: role.current ? '#6366f1' : 'rgba(99, 102, 241, 0.3)',
                    boxShadow: role.current ? '0 0 12px rgba(99, 102, 241, 0.5)' : 'none',
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'rgba(255,255,255,0.95)', marginBottom: 4 }}>{role.title}</h3>
                  <div style={{ fontSize: 14, color: '#8b5cf6', marginBottom: 10, fontWeight: 500 }}>{role.company}</div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{role.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== CREDENTIALS ===== */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 100px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
            <span style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Education & Certification</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 48px)', fontStyle: 'italic', fontWeight: 400, marginBottom: 48, color: 'rgba(255,255,255,0.95)' }}>
            Credentials
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <FadeIn>
            <div className="card-hover" style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 32,
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6366f1', fontWeight: 600, marginBottom: 16 }}>Education</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.95)', marginBottom: 12 }}>
                University of Illinois at Urbana-Champaign
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                Bachelor's Degree, 2008–2012. Major: Recreation, Sport & Tourism (Sport Management). Minor: Communication.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="card-hover" style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 32,
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#a78bfa', fontWeight: 600, marginBottom: 16 }}>Certification</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.95)', marginBottom: 12 }}>
                MindStudio Level 3 AI Agent Developer
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 16 }}>
                Highest level of certification for AI agent architecture and deployment.
              </p>
              <a href="#" className="view-link" style={{ color: '#a78bfa' }}>
                ✓ Verify Credential <span>↗</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== CORE COMPETENCIES ===== */}
      <section id="skills" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 100px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
            <span style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Core Competencies</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 48px)', fontStyle: 'italic', fontWeight: 400, marginBottom: 48, color: 'rgba(255,255,255,0.95)' }}>
            What I do best
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
          {competencies.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="card-hover" style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16, padding: 32,
              }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.95)', marginBottom: 12 }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>AI Tech Stack</span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {techStack.map(t => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ===== SELECTED WORK ===== */}
      <section id="work" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 100px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
            <span style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>What I've Built</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 48px)', fontStyle: 'italic', fontWeight: 400, marginBottom: 48, color: 'rgba(255,255,255,0.95)' }}>
            Selected work
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {projects.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="card-hover" style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16, overflow: 'hidden',
              }}>
                {/* Mockup frame placeholder */}
                <div style={{
                  height: 200, position: 'relative',
                  background: `linear-gradient(135deg, ${p.color}15, ${p.color}08)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                  {/* Browser frame */}
                  <div style={{
                    width: '80%', height: '75%', borderRadius: 8,
                    background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: 24, background: 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                      <div style={{ flex: 1, height: 12, marginLeft: 8, borderRadius: 6, background: 'rgba(255,255,255,0.06)' }} />
                    </div>
                    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ height: 8, width: '60%', borderRadius: 4, background: `${p.color}30` }} />
                      <div style={{ height: 6, width: '80%', borderRadius: 3, background: 'rgba(255,255,255,0.06)' }} />
                      <div style={{ height: 6, width: '45%', borderRadius: 3, background: 'rgba(255,255,255,0.06)' }} />
                      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                        <div style={{ height: 30, flex: 1, borderRadius: 4, background: 'rgba(255,255,255,0.04)' }} />
                        <div style={{ height: 30, flex: 1, borderRadius: 4, background: 'rgba(255,255,255,0.04)' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '24px 28px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: p.color, fontWeight: 600 }}>{p.category}</span>
                    <span style={{
                      fontSize: 11, padding: '3px 10px', borderRadius: 10,
                      background: `${p.color}15`, color: p.color, fontWeight: 500,
                    }}>{p.metric}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.95)', marginBottom: 10 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
                  <a href="#" className="view-link">View project <span>↗</span></a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== AGENT INVENTORY ===== */}
      <section id="agents" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 100px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
            <span style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
              Agent Inventory
            </span>
            <span style={{
              fontSize: 12, padding: '3px 12px', borderRadius: 10,
              background: 'rgba(99, 102, 241, 0.15)', color: '#a78bfa', fontWeight: 600,
            }}>
              15 deployed
            </span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 48px)', fontStyle: 'italic', fontWeight: 400, marginBottom: 32, color: 'rgba(255,255,255,0.95)' }}>
            MindStudio AI Agents
          </h2>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {agentCategories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${agentFilter === cat ? 'active' : ''}`}
                onClick={() => setAgentFilter(cat)}
              >
                {cat === 'All' ? `All (${agents.length})` : `${cat} (${agents.filter(a => a.category === cat).length})`}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Agent card grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filteredAgents.map((agent, i) => (
            <div
              key={agent.name}
              className="agent-card"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '20px 20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: categoryColors[agent.category] || '#6366f1',
                  boxShadow: `0 0 8px ${categoryColors[agent.category] || '#6366f1'}50`,
                  animation: 'pulse 3s infinite',
                }} />
                <h4 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{agent.name}</h4>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, paddingLeft: 18 }}>{agent.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONNECT ===== */}
      <section id="connect" style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px 60px', textAlign: 'center' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
            <span style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Connect</span>
            <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #8b5cf6, #6366f1)' }} />
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(36px, 5vw, 56px)', fontStyle: 'italic', fontWeight: 400,
            marginBottom: 16, color: 'rgba(255,255,255,0.95)',
          }}>
            Let's build something together
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.7, marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>
            Whether you're exploring AI in talent acquisition, looking for a builder, or just want to trade ideas — I'm always up for a conversation.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:michael@example.com" className="connect-btn">
              ✉ Email
            </a>
            <a href="#" className="connect-btn">
              💼 LinkedIn
            </a>
            <a href="#" className="connect-btn">
              🐙 GitHub
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        maxWidth: 1200, margin: '0 auto', padding: '30px 40px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 13,
      }}>
        © 2026 Michael Hartman
      </footer>

      {/* Back to top button */}
      {scrollY > 500 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: 24, right: 24,
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(10, 11, 20, 0.8)', border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.6)', fontSize: 18, transition: 'all 0.3s',
            zIndex: 50,
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Portfolio;
