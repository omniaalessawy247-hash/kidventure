import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye, Shield, BarChart3, Star, Clock, BookOpen, Lock, Zap, Users,
  Check, X, ChevronDown, ChevronUp, Award, Activity, MessageCircle,
  Play, ArrowRight, Target, Brain, Bot, ShieldCheck, Sparkles,
  Layers, Gem, Hexagon, Triangle, Atom, GraduationCap, Smile
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './ParentGuide.css';

const NS = 'pages.parentGuide';

/* ─── theme-aware helper (kept for future light/dark image swaps) ─── */
function useIsDark() {
  const check = () =>
    !document.documentElement.classList.contains('theme-light') &&
    document.documentElement.getAttribute('data-theme') !== 'light';
  const [dark, setDark] = useState(check);
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(check()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/* ─── reveal-on-scroll ─── */
function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ─── animated counter ─── */
function useCounter(target, go, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!go) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step); else setVal(target);
    };
    requestAnimationFrame(step);
  }, [go, target, duration]);
  return val;
}
function Counter({ target, vis, suffix = '' }) {
  const v = useCounter(target, vis);
  return <>{v}{suffix}</>;
}

/* ─── media slot: drop a real screenshot/video later via `src` / `videoSrc` ─── */
function MediaSlot({ src, videoSrc, alt, path, icon: Icon = Layers, className = '' }) {
  if (videoSrc) {
    return (
      <div className={className}>
        <video src={videoSrc} poster={src} controls />
      </div>
    );
  }
  if (src) {
    return (
      <div className={className}>
        <img src={src} alt={alt} />
      </div>
    );
  }
  return null;
}

/* ─── video card (marketing video placeholder, same pattern as Features videos) ─── */
function VideoCard({ item, color, color2 }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="pg2-video-card" style={{ '--vc': color, '--vc2': color2 }}>
      <div className="pg2-video-frame">
        <span className="pg2-video-tag" style={{ background: color }}>
          <Play size={9} fill="#fff" /> {item.tag}
        </span>
        {!playing ? (
          <button
            className="pg2-video-placeholder"
            style={{ width: '100%', height: '100%', border: 'none', cursor: 'pointer' }}
            onClick={() => setPlaying(true)}
            aria-label={`Play ${item.title}`}
          >
            <div className="pg2-play-ring"><Play size={20} color="#fff" fill="#fff" /></div>
            <small>/assets/videos/parent-guide-{item.id}.mp4</small>
          </button>
        ) : (
          <video
            className="pg2-video-el"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            src={`/assets/videos/parent-guide-${item.id}.mp4`}
            controls
            autoPlay
          />
        )}
      </div>
      <div className="pg2-video-meta">
        <h3 className="pg2-video-title">{item.title}</h3>
        <p className="pg2-video-desc">{item.desc}</p>
      </div>
    </div>
  );
}

/* ─── FAQ accordion item ─── */
function FaqItem({ item, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`pg2-faq-item ${open ? 'pg2-open' : ''}`} style={{ '--fc': color }}>
      <button className="pg2-faq-btn" onClick={() => setOpen(o => !o)}>
        <span className="pg2-faq-q">{item.q}</span>
        <span className="pg2-faq-arr" style={{
          background: open ? `${color}22` : 'var(--sf2)',
          borderColor: open ? `${color}60` : 'var(--border)',
          color: open ? color : 'var(--t3)',
        }}>
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </span>
      </button>
      <div className={`pg2-faq-body ${open ? 'pg2-open' : ''}`}>
        <div className="pg2-faq-inner"><p>{item.a}</p></div>
      </div>
    </div>
  );
}

export default function ParentGuidePage() {
  const { t } = useTranslation();

  const [hRef, hVis] = useReveal(0.02);
  const [realRef, realVis] = useReveal();
  const [painRef, painVis] = useReveal();
  const [vidRef, vidVis] = useReveal(0.05);
  const [dashRef, dashVis] = useReveal();
  const [gsRef, gsVis] = useReveal();
  const [currRef, currVis] = useReveal();
  const [safeRef, safeVis] = useReveal();
  const [testiRef, testiVis] = useReveal();
  const [faqRef, faqVis] = useReveal(0.04);
  const [ctaRef, ctaVis] = useReveal();

  /* palette mirrors the Features page family (#C2410C / #7C3AED / #DB2777 / #047857 / #0369A1 / #B45309)
     plus the parent-guide accent set (#1C92A8 teal / #F4831F orange / #F0608C pink / #9A7BD9 violet) */
  const painColors = ['#1C92A8', '#F4831F', '#F0608C'];
  const painIcons = [Eye, BookOpen, Shield];

  const dashColors = ['#F4831F', '#1C92A8', '#7C3AED', '#F0608C', '#9A7BD9'];
  const dashIcons = [BarChart3, Activity, MessageCircle, Award, Users];

  const videoColors = ['#1C92A8', '#F4831F', '#7C3AED', '#047857', '#DB2777', '#B45309'];

  const stepColors = ['#1C92A8', '#F4831F', '#F0608C', '#7C3AED'];

  const safeColors = ['#7C3AED', '#F4831F', '#1C92A8', '#0369A1', '#047857', '#DB2777'];
  const safeIcons = [Bot, X, BookOpen, Lock, ShieldCheck, Eye];

  const testiColors = ['#F4831F', '#1C92A8', '#F0608C'];
  const pillColors = ['#1C92A8', '#F4831F', '#7C3AED'];
  const faqColors = ['#1C92A8', '#F4831F', '#7C3AED', '#F0608C', '#0369A1', '#9A7BD9', '#B45309'];

  const heroStripRaw = t(`${NS}.hero.strip`, { returnObjects: true });
  const heroStrip = Array.isArray(heroStripRaw) ? heroStripRaw : [];
  const heroStripIcons = [Layers, Activity, Users, Eye];
  const heroStripColors = ['#7C3AED', '#1C92A8', '#F0608C', '#F4831F'];

  const painCardsRaw = t(`${NS}.pain.cards`, { returnObjects: true });
  const painCards = Array.isArray(painCardsRaw) ? painCardsRaw : [];

  const videoItemsRaw = t(`${NS}.videos.items`, { returnObjects: true });
  const videoItems = Array.isArray(videoItemsRaw) ? videoItemsRaw : [];

  const dashFeaturesRaw = t(`${NS}.dashboard.features`, { returnObjects: true });
  const dashFeatures = Array.isArray(dashFeaturesRaw) ? dashFeaturesRaw : [];

  const stepsRaw = t(`${NS}.getStarted.steps`, { returnObjects: true });
  const steps = Array.isArray(stepsRaw) ? stepsRaw : [];

  const curriculumPillsRaw = t(`${NS}.curriculum.pills`, { returnObjects: true });
  const curriculumPills = Array.isArray(curriculumPillsRaw) ? curriculumPillsRaw : [];

  const safetyCardsRaw = t(`${NS}.safety.cards`, { returnObjects: true });
  const safetyCards = Array.isArray(safetyCardsRaw) ? safetyCardsRaw : [];

  const testiItemsRaw = t(`${NS}.testimonials.items`, { returnObjects: true });
  const testiItems = Array.isArray(testiItemsRaw) ? testiItemsRaw : [];

  const faqItemsRaw = t(`${NS}.faq.items`, { returnObjects: true });
  const faqItems = Array.isArray(faqItemsRaw) ? faqItemsRaw : [];

  const closingNotesRaw = t(`${NS}.closing.notes`, { returnObjects: true });
  const closingNotes = Array.isArray(closingNotesRaw) ? closingNotesRaw : [];

  const BG_ICONS = [BookOpen, BarChart3, Brain, Shield, Heart_, Star, Clock, Users, Award, Target, Atom, GraduationCap];

  return (
    <div className="pg2-page">

      {/* ════════ HERO ════════ */}
      <section className="pg2-hero">
        <div className="pg2-hero-mesh" aria-hidden="true" />
        <div className="pg2-hero-grid" aria-hidden="true" />
        <div className="pg2-bgicons" aria-hidden="true">
          {BG_ICONS.map((Ic, i) => (
            <div key={i} className="pg2-bgico" style={{
              left: `${(i / BG_ICONS.length) * 90 + 4}%`, top: `${10 + (i % 5) * 16}%`,
              animationDelay: `${i * .5}s`, animationDuration: `${5 + (i % 4)}s`, color: 'var(--t3)',
            }}><Ic size={22} strokeWidth={1.1} /></div>
          ))}
        </div>
        <div className="pg2-sh pg2-sh1" aria-hidden="true" />
        <div className="pg2-sh pg2-sh2" aria-hidden="true" />
        <div className="pg2-sh pg2-sh3" aria-hidden="true"><Gem size={20} color="#1C92A8" strokeWidth={1.2} /></div>
        <div className="pg2-sh pg2-sh4" aria-hidden="true"><Hexagon size={26} color="#F4831F" strokeWidth={1} /></div>
        <div className="pg2-sh pg2-sh5" aria-hidden="true"><Triangle size={15} color="#F0608C" strokeWidth={1.2} /></div>
        <div className="pg2-ring pg2-ring1" aria-hidden="true" />
        <div className="pg2-ring pg2-ring2" aria-hidden="true" />
        <div className="pg2-ring pg2-ring3" aria-hidden="true" />

        <div className="pg2-wrap">
          <div ref={hRef} className={`pg2-hero-inner pg2-au ${hVis ? 'pg2-in' : ''}`}>
            <div className="pg2-eyebrow">
              <Users size={11} />
              <span>{t(`${NS}.hero.eyebrow`, 'FOR PARENTS')}</span>
              <span className="pg2-eyebrow-dot" />
              <span className="pg2-live">{t(`${NS}.hero.live`, 'LIVE')}</span>
            </div>
            <h1 className="pg2-h1">
              {t(`${NS}.hero.titleA`, '')}
              <span className="pg2-hgrad">{t(`${NS}.hero.rotating.0`, '')}</span>
            </h1>
            <p className="pg2-lead">{t(`${NS}.hero.desc`, '')}</p>

            <div className="pg2-hero-strip">
              {heroStrip.map((s, i) => {
                const SIcon = heroStripIcons[i] || Layers;
                const sc = heroStripColors[i] || '#7C3AED';
                return (
                  <div key={i} className="pg2-hs">
                    <SIcon size={14} color={sc} />
                    <span className="pg2-hs-v" style={{ color: sc }}>{s.v}</span>
                    <span className="pg2-hs-l">{s.l}</span>
                  </div>
                );
              })}
            </div>

            <div className="pg2-chips-row">
              <span className="pg2-chip" style={{ '--cc': '#1C92A8' }}><Activity size={14} />{t(`${NS}.hero.chip1`, '')}</span>
              <span className="pg2-chip" style={{ '--cc': '#F4831F' }}><BarChart3 size={14} />{t(`${NS}.hero.chip2`, '')}</span>
              <span className="pg2-chip" style={{ '--cc': '#047857' }}><Shield size={14} />{t(`${NS}.hero.chip3`, '')}</span>
            </div>

            <div className="pg2-hero-btns">
              <button className="pg2-btn pg2-btn-hero"
                onClick={() => document.getElementById('pg2-get-started')?.scrollIntoView({ behavior: 'smooth' })}>
                <ArrowRight size={13} /><span>{t(`${NS}.hero.ctaPrimary`, t(`${NS}.closing.cta1`, 'Get Started'))}</span>
              </button>
              <button className="pg2-btn pg2-btn-ghost"
                onClick={() => document.getElementById('pg2-videos')?.scrollIntoView({ behavior: 'smooth' })}>
                <Play size={13} fill="currentColor" /><span>{t(`${NS}.hero.ctaSecondary`, t(`${NS}.closing.cta2`, 'Watch How It Works'))}</span>
              </button>
            </div>

            <div className="pg2-trust">
              <div className="pg2-avs">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="pg2-av" style={{ background: `hsl(${i * 48 + 180},60%,55%)` }} />
                ))}
              </div>
              <span className="pg2-trust-l">{t(`${NS}.hero.trustLabel`, '')}</span>
            </div>
          </div>
        </div>

        <div className="pg2-scroll-hint" aria-hidden="true"
          onClick={() => document.getElementById('pg2-reality')?.scrollIntoView({ behavior: 'smooth' })}>
          <div className="pg2-scroll-m"><div className="pg2-scroll-w" /></div>
        </div>
      </section>

      {/* ════════ REALITY ════════ */}
      <section className="pg2-sec" id="pg2-reality">
        <div className="pg2-sec-deco" aria-hidden="true">
          <div className="pg2-sec-gridlines" />
          <div className="pg2-sec-orb-a" style={{ background: '#1C92A814' }} />
          <div className="pg2-sec-orb-b" style={{ background: '#F4831F0e' }} />
        </div>
        <div className="pg2-wrap" ref={realRef}>
          <div className={`pg2-sec-head pg2-au ${realVis ? 'pg2-in' : ''}`}>
            <span className="pg2-label"><Target size={12} />{t(`${NS}.reality.eyebrow`, '')}</span>
            <p className="pg2-lead">{t(`${NS}.reality.body`, '')}</p>
          </div>
          <div className={`pg2-stats-row pg2-au ${realVis ? 'pg2-in' : ''}`} style={{ transitionDelay: '.1s' }}>
            <div className="pg2-stat-card" style={{ '--sc': '#F4831F' }}>
              <div className="pg2-stat-ico"><Clock size={22} /></div>
              <div className="pg2-stat-v">{realVis && <Counter target={6} vis={realVis} suffix="+" />}</div>
              <p className="pg2-stat-l">{t(`${NS}.reality.stat1`, '')}</p>
              <p className="pg2-stat-sub">{t(`${NS}.reality.stat1sub`, '')}</p>
            </div>
            <span className="pg2-vs">VS</span>
            <div className="pg2-stat-card" style={{ '--sc': '#1C92A8' }}>
              <div className="pg2-stat-ico"><Brain size={22} /></div>
              <div className="pg2-stat-v">{realVis && <Counter target={15} vis={realVis} suffix="%" />}</div>
              <p className="pg2-stat-l">{t(`${NS}.reality.stat2`, '')}</p>
              <p className="pg2-stat-sub">{t(`${NS}.reality.stat2sub`, '')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PAIN POINTS ════════ */}
      <section className="pg2-sec pg2-sec-alt">
        <div className="pg2-sec-deco" aria-hidden="true">
          <div className="pg2-sec-gridlines" />
          <div className="pg2-sec-orb-a" style={{ background: '#F0608C12' }} />
        </div>
        <div className="pg2-wrap" ref={painRef}>
          <div className={`pg2-sec-head pg2-au ${painVis ? 'pg2-in' : ''}`}>
            <span className="pg2-label"><MessageCircle size={12} />{t(`${NS}.pain.eyebrow`, '')}</span>
            <h2 className="pg2-h2">
              {t(`${NS}.pain.titleA`, '')} <em className="pg2-grad">{t(`${NS}.pain.titleB`, '')}</em>
            </h2>
            <p className="pg2-lead">{t(`${NS}.pain.sub`, '')}</p>
          </div>
          <div className="pg2-pain-grid">
            {painCards.map((c, i) => {
              const Ic = painIcons[i] || Eye;
              return (
                <div key={i} className={`pg2-pain-card pg2-au ${painVis ? 'pg2-in' : ''}`}
                  style={{ '--pc': painColors[i], transitionDelay: `${i * .1}s` }}>
                  <div className="pg2-pain-bar" />
                  <span className="pg2-pain-tag">{c.label}</span>
                  <div className="pg2-pain-icon"><Ic size={18} /></div>
                  <p className="pg2-pain-quote">"{c.quote}"</p>
                  <h3 className="pg2-pain-title">{c.headline}</h3>
                  <p className="pg2-pain-body">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ MARKETING VIDEOS ════════ */}
      <section className="pg2-sec" id="pg2-videos">
        <div className="pg2-sec-deco" aria-hidden="true">
          <div className="pg2-sec-gridlines" />
          <div className="pg2-sec-orb-a" style={{ background: '#7C3AED14' }} />
          <div className="pg2-sec-orb-b" style={{ background: '#1C92A80e' }} />
        </div>
        <div className="pg2-wrap" ref={vidRef}>
          <div className={`pg2-sec-head pg2-au ${vidVis ? 'pg2-in' : ''}`}>
            <span className="pg2-label"><Play size={12} />{t(`${NS}.videos.eyebrow`, '')}</span>
            <h2 className="pg2-h2">
              {t(`${NS}.videos.titleA`, '')} <em className="pg2-grad">{t(`${NS}.videos.titleB`, '')}</em>
            </h2>
            <p className="pg2-lead">{t(`${NS}.videos.sub`, '')}</p>
          </div>
          <div className={`pg2-video-grid pg2-au ${vidVis ? 'pg2-in' : ''}`} style={{ transitionDelay: '.1s' }}>
            {videoItems.map((v, i) => (
              <VideoCard key={v.id || i} item={v}
                color={videoColors[i % videoColors.length]}
                color2={videoColors[(i + 1) % videoColors.length]} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════ DASHBOARD ════════ */}
      <section className="pg2-sec pg2-sec-alt">
        <div className="pg2-sec-deco" aria-hidden="true">
          <div className="pg2-sec-gridlines" />
          <div className="pg2-sec-orb-a" style={{ background: '#F4831F14' }} />
        </div>
        <div className="pg2-wrap" ref={dashRef}>
          <div className={`pg2-sec-head pg2-au ${dashVis ? 'pg2-in' : ''}`}>
            <span className="pg2-label pg2-l-orange"><Eye size={12} />{t(`${NS}.dashboard.eyebrow`, '')}</span>
            <h2 className="pg2-h2">
              {t(`${NS}.dashboard.titleA`, '')} <em className="pg2-grad">{t(`${NS}.dashboard.titleB`, '')}</em>
            </h2>
            <p className="pg2-lead">{t(`${NS}.dashboard.sub`, '')}</p>
          </div>

          <div className="pg2-dash-layout">
            <div className={`pg2-dash-vis pg2-al ${dashVis ? 'pg2-in' : ''}`}>
              <div className="pg2-dash-tech-pill"><BarChart3 size={10} color="#fff" /><span>{t(`${NS}.dashboard.tech`, 'Live Parent Analytics')}</span></div>
              <div className="pg2-dash-frame">
                <div className="pg2-dash-placeholder">
                  <BarChart3 size={34} />
                  <span>{t(`${NS}.dashboard.videoTitle`, 'Parent Dashboard')}</span>
                  <small>/assets/parent-dashboard.png</small>
                </div>
              </div>
              <div className="pg2-dash-fstat">
                <div className="pg2-dash-fstat-bar" />
                <span className="pg2-dash-fstat-v">{t(`${NS}.dashboard.stat1.v`, '13')}</span>
                <span className="pg2-dash-fstat-l">{t(`${NS}.dashboard.stat1.l`, 'Features Tracked')}</span>
              </div>
            </div>

            <div className={`pg2-dash-feat-list pg2-ar ${dashVis ? 'pg2-in' : ''}`} style={{ transitionDelay: '.12s' }}>
              {dashFeatures.map((f, i) => {
                const Ic = dashIcons[i] || BarChart3;
                return (
                  <div key={i} className="pg2-dash-feat" style={{ '--fc': dashColors[i] }}>
                    <div className="pg2-dash-feat-icon"><Ic size={18} /></div>
                    <div>
                      <span className="pg2-dash-feat-tag">{f.tag}</span>
                      <p className="pg2-dash-feat-title">{f.headline}</p>
                    </div>
                  </div>
                );
              })}
              <Link to="/dashboard" className="pg2-btn pg2-btn-ghost" style={{ alignSelf: 'flex-start', marginTop: 6 }}>
                <Eye size={13} /><span>{t(`${NS}.dashboard.cta`, t(`${NS}.closing.cta3`, 'Open Dashboard'))}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ GET STARTED ════════ */}
      <section className="pg2-sec" id="pg2-get-started">
        <div className="pg2-sec-deco" aria-hidden="true">
          <div className="pg2-sec-gridlines" />
          <div className="pg2-sec-orb-a" style={{ background: '#1C92A814' }} />
          <div className="pg2-sec-orb-b" style={{ background: '#F0608C0e' }} />
        </div>
        <div className="pg2-wrap" ref={gsRef}>
          <div className={`pg2-sec-head pg2-au ${gsVis ? 'pg2-in' : ''}`}>
            <span className="pg2-label"><Zap size={12} />{t(`${NS}.getStarted.eyebrow`, '')}</span>
            <h2 className="pg2-h2">
              {t(`${NS}.getStarted.titleA`, '')} <em className="pg2-grad">{t(`${NS}.getStarted.titleB`, '')}</em>
            </h2>
          </div>
          <div className="pg2-steps-grid">
            {steps.map((s, i) => (
              <div key={i} className={`pg2-step-card pg2-au ${gsVis ? 'pg2-in' : ''}`}
                style={{ '--sc': stepColors[i], transitionDelay: `${i * .08}s` }}>
                <div className="pg2-step-num">{s.num || String(i + 1).padStart(2, '0')}</div>
                <h3 className="pg2-step-title">{s.title}</h3>
                <p className="pg2-step-body">{s.body}</p>
              </div>
            ))}
          </div>
          <div className={`pg2-gs-cta pg2-au ${gsVis ? 'pg2-in' : ''}`} style={{ transitionDelay: '.4s' }}>
            <button className="pg2-btn pg2-btn-hero">
              <ArrowRight size={14} /><span>{t(`${NS}.getStarted.cta`, '')}</span>
            </button>
            <p className="pg2-gs-note">{t(`${NS}.getStarted.note`, '')}</p>
          </div>
        </div>
      </section>

      {/* ════════ CURRICULUM ════════ */}
      <section className="pg2-sec pg2-sec-alt">
        <div className="pg2-sec-deco" aria-hidden="true">
          <div className="pg2-sec-gridlines" />
          <div className="pg2-sec-orb-a" style={{ background: '#F4831F14' }} />
        </div>
        <div className="pg2-wrap" ref={currRef}>
          <div className={`pg2-sec-head pg2-au ${currVis ? 'pg2-in' : ''}`}>
            <span className="pg2-label pg2-l-orange"><BookOpen size={12} />{t(`${NS}.curriculum.eyebrow`, '')}</span>
            <h2 className="pg2-h2">
              {t(`${NS}.curriculum.titleA`, '')} <em className="pg2-grad">{t(`${NS}.curriculum.titleB`, '')}</em>
            </h2>
          </div>
          <div className="pg2-curr-layout">
            <div className={`pg2-al ${currVis ? 'pg2-in' : ''}`}>
              <p className="pg2-curr-body">{t(`${NS}.curriculum.body`, '')}</p>
              <p className="pg2-curr-body">{t(`${NS}.curriculum.body2`, '')}</p>
              <p className="pg2-curr-body">{t(`${NS}.curriculum.body3`, '')}</p>
              <div className="pg2-curr-pills">
                {curriculumPills.map((p, i) => (
                  <span key={i} className="pg2-curr-pill" style={{ '--cp': pillColors[i] }}>
                    <Check size={14} />{p}
                  </span>
                ))}
              </div>
              <div className="pg2-curr-stats">
                <div className="pg2-stat-card" style={{ '--sc': '#1C92A8', minWidth: 0, padding: '12px 18px' }}>
                  <span className="pg2-stat-v" style={{ fontSize: '1.3rem' }}>{t(`${NS}.curriculum.stat1.v`, '')}</span>
                  <span className="pg2-stat-l" style={{ fontSize: '.7rem' }}>{t(`${NS}.curriculum.stat1.l`, '')}</span>
                </div>
                <div className="pg2-stat-card" style={{ '--sc': '#F4831F', minWidth: 0, padding: '12px 18px' }}>
                  <span className="pg2-stat-v" style={{ fontSize: '1.3rem' }}>{t(`${NS}.curriculum.stat2.v`, '')}</span>
                  <span className="pg2-stat-l" style={{ fontSize: '.7rem' }}>{t(`${NS}.curriculum.stat2.l`, '')}</span>
                </div>
              </div>
            </div>
            <div className={`pg2-ar ${currVis ? 'pg2-in' : ''}`} style={{ transitionDelay: '.1s' }}>
              <div className="pg2-curr-frame">
                <div className="pg2-curr-placeholder">
                  <BookOpen size={34} />
                  <span>{t(`${NS}.curriculum.titleA`, 'Curriculum')}</span>
                  <small>/assets/curriculum-app.png</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SAFETY ════════ */}
      <section className="pg2-sec">
        <div className="pg2-sec-deco" aria-hidden="true">
          <div className="pg2-sec-gridlines" />
          <div className="pg2-sec-orb-a" style={{ background: '#7C3AED14' }} />
          <div className="pg2-sec-orb-b" style={{ background: '#0369A10e' }} />
        </div>
        <div className="pg2-wrap" ref={safeRef}>
          <div className={`pg2-sec-head pg2-au ${safeVis ? 'pg2-in' : ''}`}>
            <span className="pg2-label"><Shield size={12} />{t(`${NS}.safety.eyebrow`, '')}</span>
            <h2 className="pg2-h2">
              {t(`${NS}.safety.titleA`, '')} <em className="pg2-grad">{t(`${NS}.safety.titleB`, '')}</em>
            </h2>
            <p className="pg2-lead">{t(`${NS}.safety.sub`, '')}</p>
          </div>
          <div className="pg2-safe-grid">
            {safetyCards.map((c, i) => {
              const Ic = safeIcons[i] || ShieldCheck;
              return (
                <div key={i} className={`pg2-safe-card pg2-au ${safeVis ? 'pg2-in' : ''}`}
                  style={{ '--sc': safeColors[i], transitionDelay: `${i * .06}s` }}>
                  <div className="pg2-safe-icon"><Ic size={22} /></div>
                  <h3 className="pg2-safe-title">{c.title}</h3>
                  <p className="pg2-safe-body">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ TESTIMONIALS ════════ */}
      <section className="pg2-sec pg2-sec-alt">
        <div className="pg2-sec-deco" aria-hidden="true">
          <div className="pg2-sec-gridlines" />
          <div className="pg2-sec-orb-a" style={{ background: '#F0608C12' }} />
        </div>
        <div className="pg2-wrap" ref={testiRef}>
          <div className={`pg2-sec-head pg2-au ${testiVis ? 'pg2-in' : ''}`}>
            <span className="pg2-label pg2-l-orange"><Star size={12} />{t(`${NS}.testimonials.eyebrow`, '')}</span>
            <h2 className="pg2-h2">
              {t(`${NS}.testimonials.titleA`, '')} <em className="pg2-grad">{t(`${NS}.testimonials.titleB`, '')}</em>
            </h2>
          </div>
          <div className="pg2-testi-grid">
            {testiItems.map((te, i) => (
              <div key={i} className={`pg2-testi-card pg2-au ${testiVis ? 'pg2-in' : ''}`}
                style={{ '--tc': testiColors[i], transitionDelay: `${i * .1}s` }}>
                <Smile className="pg2-testi-quote-ico" size={22} />
                <p className="pg2-testi-quote">"{te.quote}"</p>
                <div className="pg2-testi-footer">
                  <div className="pg2-testi-avatar">{te.name?.charAt(0)}</div>
                  <div>
                    <p className="pg2-testi-name">{te.name}</p>
                    <p className="pg2-testi-role">{te.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="pg2-sec" ref={faqRef}>
        <div className="pg2-sec-deco" aria-hidden="true">
          <div className="pg2-sec-gridlines" />
          <div className="pg2-sec-orb-a" style={{ background: '#1C92A814' }} />
        </div>
        <div className="pg2-wrap">
          <div className="pg2-faq-layout">
            <div className={`pg2-faq-left pg2-al ${faqVis ? 'pg2-in' : ''}`}>
              <span className="pg2-label"><MessageCircle size={12} />{t(`${NS}.faq.eyebrow`, '')}</span>
              <h2 className="pg2-h2">
                {t(`${NS}.faq.titleA`, '')} <em className="pg2-grad">{t(`${NS}.faq.titleB`, '')}</em>
              </h2>
              <div className="pg2-faq-stack">
                {safetyCards.slice(0, 5).map((_, i) => {
                  const Ic = [Brain, Eye, BookOpen, Lock, ShieldCheck][i] || ShieldCheck;
                  const c = faqColors[i];
                  return (
                    <div key={i} className="pg2-faq-stack-ico"
                      style={{ background: `linear-gradient(135deg,${c},${faqColors[(i + 1) % faqColors.length]})`, transform: `rotate(${(i - 2) * 8}deg) translateY(${Math.abs(i - 2) * -4}px)`, zIndex: 5 - Math.abs(i - 2) }}>
                      <Ic size={16} strokeWidth={1.8} />
                    </div>
                  );
                })}
              </div>
              <div className="pg2-faq-box">
                <div className="pg2-faq-box-ico"><Sparkles size={20} /></div>
                <div>
                  <p className="pg2-faq-box-text">{t(`${NS}.faq.stillQ`, '')}</p>
                  <Link to="/support/contact" className="pg2-btn pg2-btn-outline" style={{ marginTop: 10 }}>
                    <Check size={12} /><span>{t(`${NS}.faq.contactBtn`, 'Contact Support')}</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={`pg2-faq-right pg2-ar ${faqVis ? 'pg2-in' : ''}`} style={{ transitionDelay: '.1s' }}>
              {faqItems.map((it, i) => <FaqItem key={i} item={it} color={faqColors[i % faqColors.length]} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CLOSING CTA ════════ */}
      <section className="pg2-cta-sec" ref={ctaRef}>
        <div className="pg2-cta-orb pg2-co1" aria-hidden="true" />
        <div className="pg2-cta-orb pg2-co2" aria-hidden="true" />
        <div className="pg2-cta-gridlines" aria-hidden="true" />
        <div className="pg2-wrap">
          <div className={`pg2-cta-inner pg2-au ${ctaVis ? 'pg2-in' : ''}`}>
            <div className="pg2-cta-icon"><Shield size={26} /></div>
            <span className="pg2-label pg2-l-orange">{t(`${NS}.closing.eyebrow`, '')}</span>
            <h2 className="pg2-h2">
              {t(`${NS}.closing.titleA`, '')} <em className="pg2-grad">{t(`${NS}.closing.titleB`, '')}</em>
            </h2>
            <p className="pg2-lead">{t(`${NS}.closing.sub`, '')}</p>
            <p className="pg2-lead" style={{ fontSize: '.88rem' }}>{t(`${NS}.closing.body`, '')}</p>
            <div className="pg2-cta-btns">
              <Link to="/signup" className="pg2-btn pg2-btn-hero">
                <ArrowRight size={14} /><span>{t(`${NS}.closing.cta1`, '')}</span>
              </Link>
              <button className="pg2-btn pg2-btn-ghost"
                onClick={() => document.getElementById('pg2-videos')?.scrollIntoView({ behavior: 'smooth' })}>
                <Play size={13} fill="currentColor" /><span>{t(`${NS}.closing.cta2`, '')}</span>
              </button>
            </div>
            <Link to="/dashboard" className="pg2-trust-l" style={{ textDecoration: 'underline' }}>
              {t(`${NS}.closing.cta3`, '')}
            </Link>
            <div className="pg2-cta-notes">
              {closingNotes.map((n, i) => (
                <span key={i} className="pg2-cta-note"><Check size={13} />{n}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* fallback alias so an extra heart-style icon exists without importing twice */
const Heart_ = Star;