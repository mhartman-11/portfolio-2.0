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
  { id: 'hero', label: 'Hello', num: '01', color: '#FF5C00' },
  { id: 'expertise', label: 'Expertise', num: '02', color: '#8A2BE2' },
  { id: 'work', label: 'Work', num: '03', color: '#000000' },
  { id: 'impact', label: 'Talent', num: '04', color: '#007AFF' },
  { id: 'career', label: 'Careers', num: '05', color: '#FF0050' },
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
  { period: 'Mar 2024 – Present', current: true, title: 'Senior Manager, Talent Acquisition & AI Enablement', company: 'Kellanova', desc: 'Pioneered AI Enablement and talent intelligence division within TA. Built and deployed 10+ custom AI agents enhancing recruiter productivity by 30%. 91% offer accept rate across ~300 hires in 2024.' },
  { period: 'Jun 2021 – Jul 2023', current: false, title: 'Talent Sourcing Manager → Principal Talent Sourcer', company: 'Uber', desc: 'Promoted within six months — only Sourcing Manager overseeing four verticals. Managed eight global direct reports, achieving 90% offer accept rate and 93% Mansfield D&I attainment.' },
  { period: 'Aug 2017 – Jun 2021', current: false, title: 'Senior Talent Sourcer → Talent Sourcer', company: 'Boston Consulting Group (BCG)', desc: 'Generated $850K cost savings through 30 global hires. Selected for secondment on in-house Executive Search Team supporting C-Suite stakeholders.' },
  { period: 'Sep 2015 – Aug 2017', current: false, title: 'Diversity Sourcing Recruiter, Sr. Analyst', company: 'Accenture', desc: 'Led diversity recruiting strategy across Ethnicity, Gender, LGBT, and PwD pillars. Cross-functional D&I SME for six business units.' },
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
  { category: 'TALENT INTELLIGENCE', title: 'Market Intelligence Dashboard', desc: 'Configurable dashboard tracking real-time industry layoffs, talent supply/demand, and competitor hiring activity.', metric: 'Real-time data' },
  { category: 'INTERACTIVE TOOL', title: 'Recruiter Prompt Dashboard', desc: 'Browser-based dashboard with 150 ready-to-use AI prompts for recruiters with real-time search.', metric: '150+ prompts' },
  { category: 'FEATURED WORK', title: 'AI in TA Digest (2026)', desc: 'Curated weekly insight into the convergence of recruitment operations and agentic AI.', metric: 'Weekly digest' },
  { category: 'INDUSTRY RESOURCES', title: '2026 HR/TA Global Calendar', desc: 'Centralized hub for HR and TA events worldwide with advanced filtering and registration access.', metric: 'Global events' },
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
  const [agentFilter, setAgentFilter] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

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
          .snap-container { margin-left: 0 !important; }
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

        .card-lift { transition: transform 0.3s ease; }
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
          transition: all 0.2s ease;
        }
        .filter-pill:hover { background: rgba(0,0,0,0.05); }
        .filter-pill.active { background: #000; color: #fff; }

        .agent-card {
          background: #fff;
          border: 2px solid #000;
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
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
          transition: all 0.2s ease;
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
          style={{ background: '#FF5C00', flexDirection: 'column', justifyContent: 'center', padding: '60px 60px' }}
        >
          <BlockPill num="01" />
          <div style={{ marginTop: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
            <h1 style={{
              fontSize: 'clamp(60px, 12vw, 180px)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#000',
              textTransform: 'uppercase',
            }}>
              Michael<br />Hartman
            </h1>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 32, flexWrap: 'wrap', gap: 24 }}>
              <div>
                <p style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 500, color: '#000', maxWidth: 500, lineHeight: 1.5 }}>
                  Senior Manager, TA & AI Enablement at Kellanova.<br />
                  Building AI agents for talent acquisition.
                </p>
                <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)', marginTop: 8 }}>📍 Greater Chicago Area</p>
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
                  src="/headshot.jpg"
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
          }}
        >
          <div style={{ width: '100%' }}>
            <BlockPill num="02" />

            <h2 style={{
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
              <div>
                <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', maxWidth: 560 }}>
                  13 years in talent acquisition, sourcing, and market intelligence — now focused on AI enablement and implementation across global TA operations. I build and deploy AI agents that make recruiters measurably more productive. I help brands articulate their talent strategy through data-driven automation and agentic AI workflows.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, opacity: 0.7 }}>Services</h4>
                  {competencies.map(c => (
                    <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 15, fontWeight: 500 }}>
                      <span>{c.icon}</span> {c.title}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, opacity: 0.7 }}>Selected Clients</h4>
                  {companies.map(c => (
                    <div key={c} style={{ marginBottom: 12, fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>→</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Tech Stack */}
            <div style={{ marginTop: 40 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, opacity: 0.7 }}>AI Tech Stack</h4>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {techStack.map(t => (
                  <span key={t} style={{
                    padding: '8px 18px', borderRadius: 999,
                    border: '2px solid rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 600,
                    color: '#fff',
                  }}>{t}</span>
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
          style={{ background: '#000', color: '#fff', padding: '60px 60px', flexDirection: 'column', alignItems: 'stretch' }}
        >
          <div style={{ width: '100%' }}>
            <BlockPill num="03" />
            <h2 style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em',
              textTransform: 'uppercase', marginTop: 24, marginBottom: 40,
            }}>
              Selected Work
            </h2>

            <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {projects.map((p, i) => (
                <div key={i} className="card-lift" style={{
                  background: '#1a1a1a', borderRadius: 24, overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  {/* Mockup area */}
                  <div style={{
                    height: 160, background: '#111',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    position: 'relative',
                  }}>
                    <div style={{
                      width: '75%', height: '70%', borderRadius: 8,
                      border: '2px solid rgba(255,255,255,0.15)',
                      background: 'rgba(255,255,255,0.03)',
                      overflow: 'hidden',
                    }}>
                      <div style={{ height: 20, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 5, padding: '0 8px' }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF5C00' }} />
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFFF00' }} />
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00C853' }} />
                      </div>
                      <div style={{ padding: 10 }}>
                        <div style={{ height: 6, width: '50%', borderRadius: 3, background: 'rgba(255,255,255,0.1)', marginBottom: 6 }} />
                        <div style={{ height: 5, width: '70%', borderRadius: 3, background: 'rgba(255,255,255,0.06)', marginBottom: 5 }} />
                        <div style={{ height: 5, width: '40%', borderRadius: 3, background: 'rgba(255,255,255,0.06)' }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '20px 24px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#FF5C00' }}>{p.category}</span>
                      <span style={{
                        fontSize: 11, padding: '3px 10px', borderRadius: 999,
                        border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)',
                      }}>{p.metric}</span>
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>View project →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BLOCK 04: IMPACT (Blue) ===== */}
        <section
          id="impact"
          className="snap-section"
          ref={el => { sectionRefs.current['impact'] = el; }}
          style={{ background: '#007AFF', color: '#fff', padding: '60px 60px', flexDirection: 'column' }}
        >
          <div style={{ width: '100%' }}>
            <BlockPill num="04" />
            <h2 style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em',
              textTransform: 'uppercase', marginTop: 24, marginBottom: 40,
            }}>
              The Numbers
            </h2>

            <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {stats.map((s, i) => {
                const { count, ref } = useCountUp(s.value, 2000);
                return (
                  <div key={i} ref={ref} style={{
                    background: '#fff', borderRadius: 20, padding: '28px 24px',
                    color: '#000',
                  }}>
                    <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1, marginBottom: 12, color: '#007AFF' }}>
                      {s.prefix || ''}{count}{s.suffix}
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(0,0,0,0.6)' }}>{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== BLOCK 05: CAREER (Cream) ===== */}
        <section
          id="career"
          className="snap-section"
          ref={el => { sectionRefs.current['career'] = el; }}
          style={{
            background: '#FF0050', color: '#fff', padding: '60px 60px',
            flexDirection: 'column', alignItems: 'stretch',
            minHeight: '100vh', height: 'auto',
          }}
        >
          <div style={{ width: '100%' }}>
            <BlockPill num="05" />
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em',
              textTransform: 'uppercase', marginTop: 24, marginBottom: 40,
            }}>
              Where I've Been
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {career.map((role, i) => (
                <div key={i} className="career-row" style={{
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
            <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 40 }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#FFFF00', marginBottom: 12 }}>Education</div>
                <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>University of Illinois at Urbana-Champaign</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Bachelor's Degree, 2008-2012. Major: Recreation, Sport & Tourism. Minor: Communication.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#FFFF00', marginBottom: 12 }}>Certification</div>
                <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>MindStudio Level 3 AI Agent Developer</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Highest level of certification for AI agent architecture and deployment.</p>
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
          }}
        >
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <BlockPill num="06" dark />
              <span style={{
                fontSize: 13, fontWeight: 700, padding: '6px 16px',
                borderRadius: 999, background: '#000', color: '#00C853',
              }}>15 deployed</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em',
              textTransform: 'uppercase', marginTop: 24, marginBottom: 24,
            }}>
              MindStudio AI Agents
            </h2>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
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
              {filteredAgents.map(agent => (
                <div key={agent.name} className="agent-card">
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
          style={{ background: '#FFFF00', color: '#000', padding: '60px 60px' }}
        >
          <div style={{ width: '100%', maxWidth: 700 }}>
            <BlockPill num="07" dark />
            <h2 style={{
              fontSize: 'clamp(40px, 8vw, 100px)',
              fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em',
              textTransform: 'uppercase', marginTop: 24, marginBottom: 24,
            }}>
              Let's Build<br />Something<br />Together
            </h2>
            <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.7, color: 'rgba(0,0,0,0.7)', marginBottom: 40, maxWidth: 500 }}>
              Whether you're exploring AI in talent acquisition, looking for a builder, or just want to trade ideas — I'm always up for a conversation.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="mailto:michael@example.com" className="brutalist-btn brutalist-btn-dark">✉ Email</a>
              <a href="#" className="brutalist-btn brutalist-btn-light">💼 LinkedIn</a>
              <a href="#" className="brutalist-btn brutalist-btn-light">🐙 GitHub</a>
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
