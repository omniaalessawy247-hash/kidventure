import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Bot, PenTool, Gamepad2, CreditCard, Network, Box,
  Trophy, Settings2, Home, Cpu, BarChart3, Star,
  ChevronRight, Download, CheckCircle, Sparkles,
  ArrowRight, Play, ChevronDown, ChevronUp, Check, Zap,
  Globe, Flame, Gem, Hexagon, Triangle, Brain, Palette, Calculator,
  Music, Microscope, Lightbulb, Map, Layers, Users, GraduationCap,
  Award, Atom, ShieldCheck
} from 'lucide-react';
import './Features.css';
import { useTranslation } from 'react-i18next';

const NS = 'pages.features';

function useIsDark() {
  const check = () =>
    !document.documentElement.classList.contains('theme-light') &&
    document.documentElement.getAttribute('data-theme') !== 'light';
  const [dark, setDark] = useState(check);
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(check()));
    obs.observe(document.documentElement, {
      attributes: true, attributeFilter: ['class', 'data-theme'],
    });
    return () => obs.disconnect();
  }, []);
  return dark;
}

function TImg({ light, dark, alt, className }) {
  const isDark = useIsDark();
  return <img src={isDark ? dark : light} alt={alt} className={className} loading="lazy" />;
}

const ASSET_DIR = 'src/assets/features';
const img = (name) => `${ASSET_DIR}/kidventure-${name}.png`;

const FEATURES_CONFIG = [
  {
    id: 'home',
    icon: Home,
    c1: '#9333EA', c2: '#A855F7', c3: '#F5D0FE',
    bg: 'rgba(147,51,234,.14)',
    shots: [{ light: img('home-light'), dark: img('home-dark') }],
  },
  {
    id: 'stories',
    icon: BookOpen,
    c1: '#C2410C', c2: '#EA580C', c3: '#FED7AA',
    bg: 'rgba(194,65,12,.14)',
    shots: [
      { light: img('stories-light-1'), dark: img('stories-dark-1') },
      { light: img('stories-light-2'), dark: img('stories-dark-2') },
      { light: img('stories-light-3'), dark: img('stories-dark-3') },
      { light: img('stories-light-4'), dark: img('stories-dark-4') },
      { light: img('stories-light-5'), dark: img('stories-dark-5') },
      { light: img('stories-light-6'), dark: img('stories-dark-6') },
    ],
  },
  {
    id: 'chatbot',
    icon: Bot,
    c1: '#7C3AED', c2: '#8B5CF6', c3: '#DDD6FE',
    bg: 'rgba(124,58,237,.14)',
    shots: [{ light: img('chatbot-light'), dark: img('chatbot-dark') }],
  },
  {
    id: 'drawing',
    icon: PenTool,
    c1: '#0369A1', c2: '#0284C7', c3: '#BAE6FD',
    bg: 'rgba(3,105,161,.14)',
    shots: [{ light: img('drawing-light'), dark: img('drawing-dark') }],
  },
  {
    id: 'games',
    icon: Gamepad2,
    c1: '#047857', c2: '#059669', c3: '#A7F3D0',
    bg: 'rgba(4,120,87,.14)',
    shots: Array.from({ length: 10 }, (_, i) => ({
      light: img(`games-light-${i + 1}`),
      dark: img(`games-dark-${i + 1}`),
    })),
  },
  {
    id: 'flashcards',
    icon: CreditCard,
    c1: '#B45309', c2: '#D97706', c3: '#FDE68A',
    bg: 'rgba(180,83,9,.14)',
    shots: Array.from({ length: 3 }, (_, i) => ({
      light: img(`flashcards-light-${i + 1}`),
      dark: img(`flashcards-dark-${i + 1}`),
    })),
  },
  {
    id: 'mindmaps',
    icon: Network,
    c1: '#DB2777', c2: '#EC4899', c3: '#FBCFE8',
    bg: 'rgba(219,39,119,.14)',
    shots: Array.from({ length: 4 }, (_, i) => ({
      light: img(`mindmaps-light-${i + 1}`),
      dark: img(`mindmaps-dark-${i + 1}`),
    })),
  },
  {
    id: 'models3d',
    icon: Box,
    c1: '#4338CA', c2: '#6366F1', c3: '#C7D2FE',
    bg: 'rgba(67,56,202,.14)',
    shots: [
      { light: img('models3d-light'), dark: img('models3d-dark') },
      { light: img('models3d-example'), dark: img('models3d-example') },
    ],
  },
  {
    id: 'hero_module',
    icon: ShieldCheck,
    c1: '#BE185D', c2: '#E11D48', c3: '#FFE4E6',
    bg: 'rgba(190,24,93,.14)',
    shots: [
      { light: img('hero-module-light-1'), dark: img('hero-module-dark-1') },
      { light: img('hero-module-light-2'), dark: img('hero-module-dark-2') },
      { light: img('hero-module-light-3'), dark: img('hero-module-dark-3') },
      { light: img('hero-module-light-4'), dark: img('hero-module-dark-4') },
    ],
  },
  {
    id: 'progress',
    icon: BarChart3,
    c1: '#C2410C', c2: '#EA580C', c3: '#FED7AA',
    bg: 'rgba(194,65,12,.14)',
    shots: [{ light: img('progress-light'), dark: img('progress-dark') }],
  },
  {
    id: 'leaderboard',
    icon: Trophy,
    c1: '#B45309', c2: '#F59E0B', c3: '#FDE68A',
    bg: 'rgba(180,83,9,.14)',
    shots: [{ light: img('leaderboard-light'), dark: img('leaderboard-dark') }],
  },
  {
    id: 'settings',
    icon: Settings2,
    c1: '#0F766E', c2: '#0D9488', c3: '#CCFBF1',
    bg: 'rgba(15,118,110,.14)',
    shots: [{ light: img('settings-light'), dark: img('settings-dark') }],
  },
  {
    id: 'homewidget',
    icon: Cpu,
    c1: '#9333EA', c2: '#A855F7', c3: '#F5D0FE',
    bg: 'rgba(147,51,234,.14)',
    shots: [{ light: img('homewidget'), dark: img('homewidget'), fixed: true }],
  },
];

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

function useTypewriter(text, go, speed = 60) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!go) return;
    setOut(''); setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++; setOut(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, go, speed]);
  return [out, done];
}

function useCounter(raw, go) {
  const [c, setC] = useState(0);
  useEffect(() => {
    if (!go) return;
    const n = parseFloat(String(raw).replace(/[^\d.]/g, ''));
    if (!n) return;
    let s = null;
    const step = ts => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1800, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setC(Math.floor(e * n));
      if (p < 1) requestAnimationFrame(step); else setC(n);
    };
    requestAnimationFrame(step);
  }, [raw, go]);
  return c;
}

function FeatureCluster({ feat }) {
  const [active, setActive] = useState(0);
  const hero = feat.shots[active];
  const others = feat.shots.filter((_, i) => i !== active);
  return (
    <div className="fp-cluster">
      <div className="fp-cluster-ring" aria-hidden="true" />
      <div className="fp-cluster-main">
        {hero.fixed
          ? <img src={hero.light} alt={hero.alt} className="fp-cluster-img" />
          : <TImg light={hero.light} dark={hero.dark} alt={hero.alt} className="fp-cluster-img" />}
        <div className="fp-cluster-shine" />
      </div>
      {others.length > 0 && (
        <div className={`fp-cluster-orbit fp-cluster-orbit-${others.length}`}>
          {others.map((s, i) => {
            const realIdx = feat.shots.indexOf(s);
            return (
              <button key={realIdx} className="fp-cluster-thumb" style={{ '--ti': i }}
                onClick={() => setActive(realIdx)} aria-label={`Show ${s.alt}`}>
                {s.fixed
                  ? <img src={s.light} alt={s.alt} />
                  : <TImg light={s.light} dark={s.dark} alt={s.alt} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatCard({ raw, label, Icon, color, vis }) {
  const n = useCounter(raw, vis);
  const suffix = String(raw).replace(/[\d.]/g, '');
  return (
    <div className="fp-stat" style={{ '--sc': color }}>
      <div className="fp-stat-ico" style={{ background: `${color}22`, color }}><Icon size={20} /></div>
      <div className="fp-stat-v" style={{ color }}>{vis ? `${n}${suffix}` : `0${suffix}`}</div>
      <div className="fp-stat-l">{label}</div>
    </div>
  );
}

function FaqItem({ item, idx }) {
  const [open, setOpen] = useState(false);
  const COLORS = ['#C2410C','#7C3AED','#0369A1','#047857','#DB2777','#B45309','#BE123C'];
  const c = COLORS[idx % COLORS.length];
  return (
    <div className={`fp-faq-item ${open ? 'open' : ''}`} style={{ '--fc': c }}>
      <button className="fp-faq-btn" onClick={() => setOpen(o => !o)}>
        <span className="fp-faq-q" style={{ color: open ? c : 'var(--t1)' }}>{item.q}</span>
        <span className="fp-faq-arr" style={{
          background: open ? `${c}22` : 'var(--sf2)',
          borderColor: open ? `${c}60` : 'var(--border)',
          color: open ? c : 'var(--t3)',
        }}>
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </span>
      </button>
      <div className={`fp-faq-body ${open ? 'open' : ''}`}>
        <div className="fp-faq-inner"><p>{item.a}</p></div>
      </div>
    </div>
  );
}

function FeatSec({ feat, idx, FEATURES, t }) {
  const [ref, vis] = useReveal(0.06);
  const Icon = feat.icon;
  const even = idx % 2 === 0;
  return (
    <section id={`f-${feat.id}`}
      className={`fp-sec ${even ? '' : 'fp-sec-alt'}`}
      style={{ '--c1': feat.c1, '--c2': feat.c2 }}>
      <div className="fp-sec-deco" aria-hidden="true">
        <div className="fp-sec-mesh" style={{
          background: `radial-gradient(ellipse 65% 55% at 18% 30%,${feat.c1}18 0%,transparent 62%),
                       radial-gradient(ellipse 55% 65% at 82% 70%,${feat.c2}11 0%,transparent 62%)`,
        }} />
        <div className="fp-sec-gridlines" />
        <div className="fp-sec-orb-a" style={{ background: `${feat.c1}14` }} />
        <div className="fp-sec-orb-b" style={{ background: `${feat.c2}0e` }} />
      </div>
      <div className="fp-wrap" ref={ref}>
        <div className="fp-sec-grid" style={{ gridTemplateAreas: even ? '"vis txt"' : '"txt vis"' }}>
          <div className={`fp-sec-vis fp-al ${vis ? 'fp-in' : ''}`} style={{ gridArea: 'vis', transitionDelay: '.04s' }}>
            <FeatureCluster feat={feat} />
            <div className="fp-tech-pill" style={{ background: `linear-gradient(135deg,${feat.c1},${feat.c2})` }}>
              <Icon size={10} color="#fff" /><span>{feat.tech}</span>
            </div>
            <div className="fp-fstat">
              <div className="fp-fstat-bar" style={{ background: `linear-gradient(90deg,${feat.c1},${feat.c2})` }} />
              <span className="fp-fstat-v" style={{ color: feat.c1 }}>{feat.stat1?.v}</span>
              <span className="fp-fstat-l">{feat.stat1?.l}</span>
            </div>
          </div>
          <div className={`fp-sec-txt fp-ar ${vis ? 'fp-in' : ''}`} style={{ gridArea: 'txt', transitionDelay: '.16s' }}>
            <div className="fp-tag-row">
              <div className="fp-tag-ico" style={{ background: `linear-gradient(135deg,${feat.c1},${feat.c2})` }}>
                <Icon size={16} color="#fff" strokeWidth={1.8} />
              </div>
              <span className="fp-tag" style={{ color: feat.c1, background: feat.bg, borderColor: `${feat.c1}55` }}>
                {feat.tech}
              </span>
            </div>
            <h2 className="fp-sec-h">
              {feat.title}{' '}
              <span className="fp-sec-accent" style={{ '--mg': `linear-gradient(270deg,${feat.c1},${feat.c2},${feat.c1})` }}>
                {feat.accent}
              </span>
            </h2>
            <p className="fp-sec-desc">{feat.desc}</p>
            <ul className="fp-bullets">
              {(feat.bullets || []).map((b, i) => (
                <li key={i} className="fp-bullet">
                  <div className="fp-bullet-ico" style={{ background: `linear-gradient(135deg,${feat.c1},${feat.c2})` }}>
                    <CheckCircle size={10} color="#fff" strokeWidth={2.5} />
                  </div>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="fp-sec-stats">
              {[feat.stat1, feat.stat2].filter(Boolean).map((s, i) => (
                <div key={i} className="fp-mstat" style={{ borderColor: `${feat.c1}45`, background: feat.bg }}>
                  <div className="fp-mstat-bar" style={{ background: `linear-gradient(90deg,${feat.c1},${feat.c2})` }} />
                  <span className="fp-mstat-v" style={{ color: feat.c1 }}>{s.v}</span>
                  <span className="fp-mstat-l">{s.l}</span>
                </div>
              ))}
            </div>
            {idx < FEATURES.length - 1 ? (
              <button className="fp-btn fp-btn-sec" style={{ '--bc1': feat.c1, '--bc2': feat.c2 }}
                onClick={() => document.getElementById(`f-${FEATURES[idx+1].id}`)?.scrollIntoView({ behavior:'smooth' })}>
                <span>{t(`${NS}.buttons.nextFeature`, 'Next Feature')}</span><ArrowRight size={14} />
              </button>
            ) : (
              <Link to="/download" className="fp-btn fp-btn-sec" style={{ '--bc1': feat.c1, '--bc2': feat.c2 }}>
                <Download size={14} /><span>{t(`${NS}.buttons.getKidVentureFree`, 'Get KidVenture Free')}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  const { t } = useTranslation();

  const FEATURES = FEATURES_CONFIG.map((f) => {
    const base = `${NS}.items.${f.id}`;
    const bulletsRaw = t(`${base}.bullets`, { returnObjects: true });
    const bullets = Array.isArray(bulletsRaw) ? bulletsRaw : [];
    const shotAltsRaw = t(`${base}.shotAlts`, { returnObjects: true });
    const shotAlts = Array.isArray(shotAltsRaw) ? shotAltsRaw : [];
    return {
      ...f,
      name:   t(`${base}.name`,   f.id),
      title:  t(`${base}.title`,  ''),
      accent: t(`${base}.accent`, ''),
      tech:   t(`${base}.tech`,   ''),
      desc:   t(`${base}.desc`,   ''),
      bullets,
      stat1: { v: t(`${base}.stat1.v`, ''), l: t(`${base}.stat1.l`, '') },
      stat2: { v: t(`${base}.stat2.v`, ''), l: t(`${base}.stat2.l`, '') },
      shots: f.shots.map((s, i) => ({ ...s, alt: shotAlts[i] || '' })),
    };
  });

  const [hRef, hVis] = useReveal(0.02);
  const [oRef, oVis] = useReveal(0.07);
  const [sRef, sVis] = useReveal(0.07);
  const [fRef, fVis] = useReveal(0.06);
  const [cRef, cVis] = useReveal(0.06);

  const typewriterText = t(`${NS}.hero.typewriterText`, 'Imagine. Learn. Grow.');
  const [tw, twDone] = useTypewriter(typewriterText, hVis, 62);

  const BG_ICONS = [BookOpen,Gamepad2,Brain,Palette,Calculator,Music,Microscope,Globe,Lightbulb,Map,Atom,Trophy];
  const PARTICLES = [
    {x:8,y:22,c:'#7C3AED55',s:'7px',d:0},{x:91,y:14,c:'#C2410C55',s:'9px',d:.5},
    {x:14,y:74,c:'#DB277755',s:'5px',d:1},{x:84,y:60,c:'#04785777',s:'7px',d:1.5},
    {x:50,y:6, c:'#B4530966',s:'9px',d:.8},{x:4, y:50,c:'#0369A155',s:'5px',d:2},
    {x:96,y:84,c:'#7C3AED44',s:'6px',d:.3},{x:44,y:91,c:'#C2410C44',s:'4px',d:1.8},
    {x:70,y:30,c:'#EC489955',s:'6px',d:2.4},{x:25,y:42,c:'#6366F155',s:'8px',d:.9},
  ];

  const statsCardsRaw = t(`${NS}.stats.cards`, { returnObjects: true });
  const statsCards = Array.isArray(statsCardsRaw) ? statsCardsRaw : [{},{},{},{}];
  const STATS = statsCards.map((s, i) => ({
    ...s,
    Icon: [Layers, Brain, Gamepad2, Star][i],
    color: ['#C2410C', '#7C3AED', '#DB2777', '#B45309'][i],
  }));

  const heroChipsRaw = t(`${NS}.hero.chips`, { returnObjects: true });
  const heroChips = Array.isArray(heroChipsRaw) ? heroChipsRaw : [];
  const HERO_CHIPS = heroChips.map((ch, i) => ({
    ...ch,
    c: ['#047857', '#C2410C', '#7C3AED'][i],
    Icon: [Gamepad2, Bot, Sparkles][i],
    cls: ['fp-chip-tl', 'fp-chip-tr', 'fp-chip-br'][i],
  }));

  const heroBadgesRaw = t(`${NS}.hero.badges`, { returnObjects: true });
  const heroBadges = Array.isArray(heroBadgesRaw) ? heroBadgesRaw : [];
  const HERO_BADGES = heroBadges.map((b, i) => ({
    ...b,
    Icon: [Brain, GraduationCap, Gamepad2, Award, Sparkles][i],
    color: ['#7C3AED', '#C2410C', '#047857', '#B45309', '#DB2777'][i],
    pos: `fp-hb-${i + 1}`,
  }));

  const heroStripRaw = t(`${NS}.hero.strip`, { returnObjects: true });
  const heroStrip = Array.isArray(heroStripRaw) ? heroStripRaw : [];

  const faqItemsRaw = t(`${NS}.faq.items`, { returnObjects: true });
  const faqItems = Array.isArray(faqItemsRaw) ? faqItemsRaw : [];

  const ctaPillsRaw = t(`${NS}.cta.pills`, { returnObjects: true });
  const ctaPills = Array.isArray(ctaPillsRaw) ? ctaPillsRaw : [];

  return (
    <div className="fp-page">

      {/* ════════ HERO ════════ */}
      <section className="fp-hero">
        <div className="fp-hero-mesh" aria-hidden="true" />
        <div className="fp-hero-grain" aria-hidden="true" />
        <div className="fp-hero-bgicons" aria-hidden="true">
          {BG_ICONS.map((Icon,i) => (
            <div key={i} className="fp-bgico" style={{
              left:`${(i/BG_ICONS.length)*90+4}%`, top:`${12+(i%5)*16}%`,
              animationDelay:`${i*.5}s`, animationDuration:`${5+(i%4)}s`,
            }}><Icon size={22} strokeWidth={1.1} /></div>
          ))}
        </div>
        {PARTICLES.map((p,i) => (
          <div key={i} className="fp-particle" aria-hidden="true" style={{
            left:`${p.x}%`,top:`${p.y}%`,background:p.c,width:p.s,height:p.s,animationDelay:`${p.d}s`,
          }} />
        ))}
        <div className="fp-sh fp-sh1" aria-hidden="true" />
        <div className="fp-sh fp-sh2" aria-hidden="true" />
        <div className="fp-sh fp-sh3" aria-hidden="true"><Gem size={20} color="#A78BFA" strokeWidth={1.2}/></div>
        <div className="fp-sh fp-sh4" aria-hidden="true"><Hexagon size={26} color="#F97316" strokeWidth={1}/></div>
        <div className="fp-sh fp-sh5" aria-hidden="true"><Triangle size={15} color="#EC4899" strokeWidth={1.2}/></div>
        <div className="fp-sh fp-sh6" aria-hidden="true"><Atom size={22} color="#0284C7" strokeWidth={1}/></div>
        <div className="fp-ring fp-ring1" aria-hidden="true" />
        <div className="fp-ring fp-ring2" aria-hidden="true" />
        <div className="fp-ring fp-ring3" aria-hidden="true" />
        <div className="fp-wrap">
          <div ref={hRef} className={`fp-hero-inner fp-au ${hVis?'fp-in':''}`}>
            <div className="fp-htxt">
              <div className="fp-eyebrow">
                <Sparkles size={11}/>
                <span>{t(`${NS}.hero.eyebrow`, 'Features')}</span>
                <span className="fp-eyebrow-dot"/>
                <span className="fp-live">{t(`${NS}.hero.live`, 'LIVE')}</span>
              </div>
              <h1 className="fp-hero-h">
                <span className="fp-hline">{t(`${NS}.hero.titleLine1`, 'Everything your child')}</span>
                <span className={`fp-hgrad fp-tw ${twDone?'fp-tw-done':''}`}>{tw}</span>
              </h1>
              <p className="fp-hero-p">{t(`${NS}.hero.paragraph`, '')}</p>
              <div className="fp-hero-strip">
                {heroStrip.map((s,i) => {
                  const SIcon = [Layers, Brain, Gamepad2, Users][i];
                  const sColor = ['#7C3AED', '#C2410C', '#047857', '#DB2777'][i];
                  return (
                    <div key={i} className="fp-hs" style={{'--hsc':sColor}}>
                      <SIcon size={14} color={sColor}/>
                      <span className="fp-hs-v" style={{color:sColor}}>{s.v}</span>
                      <span className="fp-hs-l">{s.l}</span>
                    </div>
                  );
                })}
              </div>
              <div className="fp-icon-row">
                {FEATURES.slice(0,9).map((f,i)=>{
                  const Ic=f.icon;
                  return (
                    <div key={f.id} className="fp-icon-pill"
                      style={{animationDelay:`${i*.11}s`,'--pc1':f.c1}} title={f.name}>
                      <Ic size={13} color={f.c1} strokeWidth={2}/>
                    </div>
                  );
                })}
              </div>
              <div className="fp-hero-btns">
                <button className="fp-btn fp-btn-hero"
                  onClick={()=>document.getElementById('fp-overview')?.scrollIntoView({behavior:'smooth'})}>
                  <Play size={13} fill="currentColor"/><span>{t(`${NS}.hero.exploreBtn`, 'Explore Features')}</span>
                </button>
                <button className="fp-btn fp-btn-ghost"
                  onClick={()=>document.getElementById('fp-overview')?.scrollIntoView({behavior:'smooth'})}>
                  <span>{t(`${NS}.hero.overviewBtn`, 'Quick Overview')}</span><ChevronRight size={13}/>
                </button>
              </div>
              <div className="fp-trust">
                <div className="fp-avs">
                  {[...Array(5)].map((_,i)=>(
                    <div key={i} className="fp-av" style={{background:`hsl(${i*55+20},70%,58%)`}}/>
                  ))}
                </div>
                <span className="fp-trust-l">{t(`${NS}.hero.trustLabel`, '')}</span>
              </div>
            </div>
            <div className={`fp-hvis fp-ar ${hVis?'fp-in':''}`} style={{transitionDelay:'.14s'}}>
              <div className="fp-hero-phone-wrap">
                {HERO_BADGES.map((b,i)=>(
                  <div key={i} className={`fp-hbadge ${b.pos}`}
                    style={{'--hbc':b.color,animationDelay:`${.3+i*.18}s`}}>
                    <div className="fp-hb-ico" style={{background:`${b.color}22`}}>
                      <b.Icon size={13} color={b.color}/>
                    </div>
                    <span>{b.label}</span>
                  </div>
                ))}
                <div className="fp-phone-glow"/>
                <div className="fp-hero-frame">
                  <TImg light={img('home-light')} dark={img('home-dark')}
                    alt={t(`${NS}.hero.heroAlt`, 'App screenshot')} className="fp-hero-pimg"/>
                  <div className="fp-hero-shine"/>
                  <div className="fp-hero-shimmer"/>
                </div>
                {HERO_CHIPS.map((ch,i)=>(
                  <div key={i} className={`fp-chip ${ch.cls}`}
                    style={{animationDelay:`${i*.38}s`,'--cc':ch.c}}>
                    <div className="fp-chip-ico" style={{background:`${ch.c}22`}}>
                      <ch.Icon size={12} color={ch.c}/>
                    </div>
                    <span>{ch.l}</span>
                    <span className="fp-chip-dot" style={{background:ch.c}}/>
                  </div>
                ))}
                <div className="fp-pms fp-pms1"><Zap size={10} color="#7C3AED"/><span>{t(`${NS}.hero.pmsPowered`, 'AI Powered')}</span></div>
                <div className="fp-pms fp-pms2"><Star size={10} color="#B45309" fill="#B45309"/><span>{t(`${NS}.hero.pmsRating`, '4.9 ★')}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="fp-scroll-hint" aria-hidden="true"
          onClick={()=>document.getElementById('fp-overview')?.scrollIntoView({behavior:'smooth'})}>
          <div className="fp-scroll-m"><div className="fp-scroll-w"/></div>
        </div>
      </section>

      {/* ════════ TICKER ════════ */}
      <div className="fp-ticker" aria-hidden="true">
        <div className="fp-tick-track">
          {[...FEATURES,...FEATURES,...FEATURES].map((f,i)=>{
            const fi=i%FEATURES.length; const Ico=FEATURES[fi].icon;
            return (
              <span key={i} className="fp-tick-item">
                <span style={{color:FEATURES[fi].c1}}><Ico size={12}/></span>
                <span>{FEATURES[fi].name}</span>
                <span className="fp-tick-sep">✦</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* ════════ OVERVIEW ════════ */}
      <section className="fp-ov" id="fp-overview">
        <div className="fp-wrap">
          <div ref={oRef} className={`fp-ov-head fp-au ${oVis?'fp-in':''}`}>
            <div className="fp-label"><Globe size={12}/>{t(`${NS}.overview.label`, 'Overview')}</div>
            <h2 className="fp-ov-h">{t(`${NS}.overview.heading`, 'All Features')}</h2>
            <p className="fp-ov-sub">{t(`${NS}.overview.subheading`, '')}</p>
          </div>
          <div className={`fp-ov-pills fp-au ${oVis?'fp-in':''}`} style={{transitionDelay:'.1s'}}>
            {FEATURES.map(f=>{
              const Ic=f.icon;
              return (
                <button key={f.id} className="fp-pill"
                  style={{'--pc1':f.c1,'--pc2':f.c2}}
                  onClick={()=>document.getElementById(`f-${f.id}`)?.scrollIntoView({behavior:'smooth'})}>
                  <span className="fp-pill-ico" style={{background:`${f.c1}22`,color:f.c1}}>
                    <Ic size={13} strokeWidth={1.8}/>
                  </span>
                  <span className="fp-pill-lbl">{f.name}</span>
                  <ArrowRight size={10} className="fp-pill-arr"/>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ FEATURE SECTIONS ════════ */}
      {FEATURES.map((f,i)=><FeatSec key={f.id} feat={f} idx={i} FEATURES={FEATURES} t={t}/>)}

      {/* ════════ STATS ════════ */}
      <section className="fp-stats-sec">
        <div className="fp-stats-orb fp-so1" aria-hidden="true"/>
        <div className="fp-stats-orb fp-so2" aria-hidden="true"/>
        <div className="fp-stats-mesh" aria-hidden="true"/>
        <div className="fp-wrap">
          <div ref={sRef} className={`fp-stats-inner fp-au ${sVis?'fp-in':''}`}>
            <div className="fp-stats-txt">
              <div className="fp-label"><Flame size={12} color="#F97316"/>{t(`${NS}.stats.label`, 'Stats')}</div>
              <h2 className="fp-stats-h">
                {t(`${NS}.stats.heading`, 'Trusted by')}<br/>
                {t(`${NS}.stats.headingLine2`, 'thousands')}
              </h2>
              <p className="fp-stats-sub">{t(`${NS}.stats.subheading`, '')}</p>
              <Link to="/download" className="fp-btn fp-btn-cta" style={{alignSelf:'flex-start',marginTop:'10px'}}>
                <Download size={14}/><span>{t(`${NS}.stats.downloadBtn`, 'Download Free')}</span>
              </Link>
            </div>
            <div className="fp-stats-grid">
              {STATS.map((s,i)=><StatCard key={i} {...s} vis={sVis}/>)}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="fp-faq-sec" ref={fRef}>
        <div className="fp-faq-dots" aria-hidden="true"/>
        <div className="fp-wrap">
          <div className="fp-faq-layout">
            <div className={`fp-faq-left fp-al ${fVis?'fp-in':''}`}>
              <div className="fp-label"><Sparkles size={12}/>{t(`${NS}.faq.label`, 'FAQ')}</div>
              <h2 className="fp-faq-h">
                {t(`${NS}.faq.heading`, 'Got questions')}
                <span className="fp-faq-hi">{t(`${NS}.faq.headingHighlight`, '?')}</span>
              </h2>
              <p className="fp-faq-sub">{t(`${NS}.faq.subheading`, '')}</p>
              <div className="fp-faq-stack">
                {FEATURES.slice(0,5).map((f,i)=>{
                  const Ico=f.icon;
                  return (
                    <div key={f.id} className="fp-faq-stack-ico"
                      style={{background:`linear-gradient(135deg,${f.c1},${f.c2})`,transform:`rotate(${(i-2)*8}deg) translateY(${Math.abs(i-2)*-4}px)`,zIndex:5-Math.abs(i-2)}}>
                      <Ico size={16} color="#fff" strokeWidth={1.8}/>
                    </div>
                  );
                })}
              </div>
              <div className="fp-faq-box">
                <div className="fp-faq-box-ico"><Sparkles size={20} color="#A78BFA"/></div>
                <div>
                  <p className="fp-faq-box-text">{t(`${NS}.faq.boxText`, '')}</p>
                  <Link to="/support/contact" className="fp-btn fp-btn-outline" style={{marginTop:10}}>
                    <Check size={12}/><span>{t(`${NS}.faq.contactBtn`, 'Contact Us')}</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={`fp-faq-right fp-ar ${fVis?'fp-in':''}`} style={{transitionDelay:'.1s'}}>
              {faqItems.map((item,i)=><FaqItem key={i} item={item} idx={i}/>)}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="fp-cta-sec" ref={cRef}>
        <div className="fp-cta-orb fp-co1" aria-hidden="true"/>
        <div className="fp-cta-orb fp-co2" aria-hidden="true"/>
        <div className="fp-cta-gridlines" aria-hidden="true"/>
        <div className="fp-cta-bgicos" aria-hidden="true">
          {FEATURES.map((f,i)=>{const Ic=f.icon;return(
            <div key={f.id} className="fp-cta-bgico"
              style={{left:`${(i/FEATURES.length)*90+5}%`,top:`${20+(i%3)*25}%`,color:f.c1,animationDelay:`${i*.32}s`,animationDuration:`${4+(i%3)}s`}}>
              <Ic size={18} strokeWidth={1.2}/>
            </div>);
          })}
        </div>
        <div className="fp-wrap">
          <div className={`fp-cta-box fp-au ${cVis?'fp-in':''}`}>
            <div className="fp-cta-l">
              <h2 className="fp-cta-h">
                {t(`${NS}.cta.heading`, 'Start your child\'s')}
                <em className="fp-cta-em">{t(`${NS}.cta.headingEm`, ' adventure')}</em>
              </h2>
              <p className="fp-cta-p">{t(`${NS}.cta.paragraph`, '')}</p>
              <div className="fp-cta-btns">
                <Link to="/download" className="fp-btn fp-btn-cta"><Download size={14}/><span>{t(`${NS}.cta.getAppBtn`, 'Get the App')}</span></Link>
                <Link to="/login" className="fp-btn fp-btn-ghost"><span>{t(`${NS}.cta.signInBtn`, 'Sign In')}</span><ChevronRight size={13}/></Link>
              </div>
              <div className="fp-cta-pills">
                {ctaPills.map((p,i)=>(
                  <span key={i} className="fp-cta-pill"><Check size={11}/><span>{p}</span></span>
                ))}
              </div>
            </div>
            <div className="fp-cta-r">
              <div className="fp-cta-phone">
                <TImg light={img('home-light')} dark={img('home-dark')}
                  alt={t(`${NS}.cta.phoneAlt`, 'App')} className="fp-cta-pimg"/>
                <div className="fp-cta-pglow"/>
              </div>
              <div className="fp-cta-cards">
                {FEATURES.slice(0,3).map(f=>{const Ic=f.icon;return(
                  <div key={f.id} className="fp-cta-card"
                    style={{'--cm1':f.c1,'--cm2':f.c2,background:f.bg,borderColor:`${f.c1}45`}}>
                    <div className="fp-cta-card-ico" style={{background:`linear-gradient(135deg,${f.c1},${f.c2})`}}>
                      <Ic size={14} color="#fff"/>
                    </div>
                    <span className="fp-cta-card-label" style={{color:f.c1}}>{f.name}</span>
                    <ArrowRight size={12} color={f.c1} style={{marginInlineStart:'auto',opacity:.7}}/>
                  </div>);
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}