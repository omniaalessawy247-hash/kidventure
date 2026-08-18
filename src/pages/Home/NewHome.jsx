/* eslint-disable */
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sparkles, ChevronRight, ChevronLeft, Play, Target, BarChart3,
  ShieldCheck, BookOpen, Zap, Trophy, Users, Clock, TrendingUp,
  Shield, Activity, Brain, Heart, ArrowRight, ArrowLeft, Frown, Smile,
  PlayCircle, PauseCircle, RefreshCw, Palette, Gamepad2, MessageCircle,
  Bot, PenTool, BarChart4, Wand2, Eye, CheckCircle, Download,
  Smartphone, Globe, Layers, Lock, Star, Award, GraduationCap,
  BarChart2, Rocket, Lightbulb, Quote, Cpu, Zap as ZapIcon,
  Users2, TrendingDown, MonitorSmartphone, Scan, QrCode, AppWindow
} from 'lucide-react';

import beforeVideo from '../../assets/home/videos/before.mp4';
import afterVideo  from '../../assets/home/videos/after.mp4';
import heroVideo   from '../../assets/home/videos/download.mp4';  // ✅ Download bg video

import mobileScreensImg     from '../../assets/home/videos/images/Mobile screens.png';
import learningAdventureImg from '../../assets/home/videos/images/Learning Adventure on Mobile.png';
import phoneImg             from '../../assets/home/videos/images/phone.jpg';
import webDashboardImg      from '../../assets/home/videos/images/Web Dashboard.jpeg';
import focusedChildImg      from '../../assets/home/videos/images/focused-child-tablet.jpg';
import qrCodeImg            from '../../assets/home/videos/images/qr.png';

import './NewHome.css';

/* ─── useReveal ─── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const numericValue = parseFloat(value);
  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (isNaN(end)) { setDisplay(value); return; }
    const duration = 1800;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setDisplay(value); clearInterval(timer); }
      else { setDisplay(Number.isInteger(end) ? Math.floor(current) : current.toFixed(1)); }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display}{suffix}</span>;
}

/* ─── section header ─── */
function SH({ title, hi, subtitle, align = 'center' }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={`kv-sh is-${align} ${vis ? 'sh-vis' : ''}`}>
      <h2 className="kv-sh-title">
        {title}{hi && <> <span className="kv-hi">{hi}</span></>}
      </h2>
      {subtitle && <p className="kv-sh-sub">{subtitle}</p>}
    </div>
  );
}

/* ════════════════════════════════════
   MAIN
   ════════════════════════════════════ */
export default function KidventureHomeRedesign() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir ? i18n.dir() === 'rtl' : document.documentElement.dir === 'rtl';

  const beforeRef = useRef(null);
  const afterRef  = useRef(null);
  const [bPlay, setBPlay] = useState(false);
  const [aPlay, setAPlay] = useState(false);

  const scrollTo = id =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const toggleVid = async (ref, setP) => {
    const el = ref.current;
    if (!el) return;
    try { if (el.paused) { await el.play(); setP(true); } else { el.pause(); setP(false); } } catch {}
  };

  useEffect(() => {
    const tryPlay = async (el, set) => { try { await el.play(); set(true); } catch {} };
    const obs = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      if (en.target === beforeRef.current) tryPlay(beforeRef.current, setBPlay);
      if (en.target === afterRef.current)  tryPlay(afterRef.current,  setAPlay);
    }), { threshold: 0.4 });
    if (beforeRef.current) obs.observe(beforeRef.current);
    if (afterRef.current)  obs.observe(afterRef.current);
    return () => obs.disconnect();
  }, []);

  /* reveal refs */
  const [heroRef,  heroV]  = useReveal(0.02);
  const [featRef,  featV]  = useReveal(0.08);
  const [solRef,   solV]   = useReveal(0.08);
  const [howRef,   howV]   = useReveal(0.08);
  const [vidRef,   vidV]   = useReveal(0.06);
  const [emoRef,   emoV]   = useReveal(0.08);
  const [dashRef,  dashV]  = useReveal(0.08);
  const [trustRef, trustV] = useReveal(0.08);
  const [dlRef,    dlV]    = useReveal(0.08);

  const features = [
    { icon: Brain,    title: t('pages.home.v2.childLearn.skills.critical.title'),   body: t('pages.home.v2.childLearn.skills.critical.body'),   color: '#FF6B35' },
    { icon: Gamepad2, title: t('pages.home.v2.childLearn.skills.problem.title'),    body: t('pages.home.v2.childLearn.skills.problem.body'),    color: '#8B5CF6' },
    { icon: Palette,  title: t('pages.home.v2.childLearn.skills.creativity.title'), body: t('pages.home.v2.childLearn.skills.creativity.body'), color: '#06B6D4' },
    { icon: Trophy,   title: t('pages.home.v2.childLearn.skills.confidence.title'), body: t('pages.home.v2.childLearn.skills.confidence.body'), color: '#10B981' },
  ];

  const trustCards = [
    { icon: Shield,      title: t('pages.home.v2.trust.cards.childFirst.title'),    body: t('pages.home.v2.trust.cards.childFirst.body') },
    { icon: Eye,         title: t('pages.home.v2.trust.cards.visibility.title'),    body: t('pages.home.v2.trust.cards.visibility.body') },
    { icon: Lock,        title: t('pages.home.v2.trust.cards.privacy.title'),       body: t('pages.home.v2.trust.cards.privacy.body') },
    { icon: ShieldCheck, title: t('pages.home.v2.trust.cards.secureAccess.title'), body: t('pages.home.v2.trust.cards.secureAccess.body') },
  ];

  const emoFeats = useMemo(() => {
    const arr = t('pages.home.emotionalAnchor.features', { returnObjects: true });
    if (!Array.isArray(arr)) return [];
    const map = { brain: Brain, heart: Heart, eye: Eye, target: Target };
    return arr.map((f, i) => ({ key: i, text: f?.text ?? '', Icon: map[f?.icon] || Sparkles }));
  }, [t]);

  const steps = [
    { num: '01', icon: Download,   title: t('pages.home.v2.howItWorks.steps.1.title'), body: t('pages.home.v2.howItWorks.steps.1.body') },
    { num: '02', icon: Smartphone, title: t('pages.home.v2.howItWorks.steps.2.title'), body: t('pages.home.v2.howItWorks.steps.2.body') },
    { num: '03', icon: Globe,      title: t('pages.home.v2.howItWorks.steps.3.title'), body: t('pages.home.v2.howItWorks.steps.3.body') },
  ];

  /* ✅ الأيقونات دي بترجع تتبدل تلقائي حسب اللغة (RTL/LTR) — دي كانت شغالة صح أصلاً */
  const Arr = isRTL ? ChevronLeft : ChevronRight;
  const FlowA = isRTL ? ArrowLeft : ArrowRight;

  /*
    ✅ الفرق هنا: الـ SVGs اللي تحت دي مرسومة يدوي بمسار (path) ثابت الاتجاه،
    مش أيقونة بتتبدل زي Arr/FlowA فوق. عشان كده في العربي كانت بتفضل
    بتشاور بنفس الاتجاه اللي في الإنجليزي وتبان "مبوظة"/معكوسة بصريًا.
    الحل: نعمل لها Mirror أفقي (scaleX(-1)) لما اللغة تبقى RTL.
  */
  const decorativeArrowStyle = { transform: isRTL ? 'scaleX(-1)' : 'none' };

  return (
    <div className="kv-home" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ══════════ HERO ══════════ */}
      <section className="kv-hero" id="top" ref={heroRef}>
        <div className="kv-hero-ambient" aria-hidden="true">
          <div className="kv-amb-1" />
          <div className="kv-amb-2" />
          <div className="kv-amb-3" />
          <div className="kv-amb-4" />
          <div className="kv-dot kv-dot-1" />
          <div className="kv-dot kv-dot-2" />
          <div className="kv-dot kv-dot-3" />
          <div className="kv-dot kv-dot-4" />
          <div className="kv-dot kv-dot-5" />
          <div className="kv-cross kv-cross-1">+</div>
          <div className="kv-cross kv-cross-2">+</div>
          <div className="kv-grid-pattern" />
        </div>

        <div className="kv-container">
          <div className={`kv-hero-row ${heroV ? 'row-vis' : ''}`}>

            {/* TEXT */}
            <div className="kv-hero-text">
              <p className="kv-hero-eyebrow">
                <span className="kv-eyebrow-dot" />
                {t('pages.home.v2.hero.badge')}
              </p>

              <h1 className="kv-hero-h1">
                {t('pages.home.v2.hero.titleA')}{' '}
                <span className="kv-hi-wrap">
                  <span className="kv-h1-hi">{t('pages.home.v2.hero.titleB')}</span>
                  <svg className="kv-underline-svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0 8 Q50 2 100 8 Q150 14 200 8" stroke="url(#ugrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="ugrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF6B35"/>
                        <stop offset="100%" stopColor="#8B5CF6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <p className="kv-hero-desc">{t('pages.home.v2.hero.description')}</p>

              <div className="kv-hero-cta">
                <button
                  type="button"
                  className="kv-btn kv-btn-primary kv-btn-glow"
                  onClick={() => scrollTo('download')}
                >
                  <Download size={16} />
                  <span>{t('pages.home.v2.hero.ctaPrimary')}</span>
                  <Arr size={15} />
                </button>
                <button
                  type="button"
                  className="kv-btn kv-btn-outline"
                  onClick={() => scrollTo('how-it-works')}
                >
                  <Play size={13} />
                  <span>{t('common.learnMore')}</span>
                </button>
              </div>

              <div className="kv-hero-trust">
                <div className="kv-htrust-item"><ShieldCheck size={14}/><span>{t('pages.home.v2.hero.stats.3.title')}</span></div>
                <div className="kv-htrust-sep"/>
                <div className="kv-htrust-item"><Trophy size={14}/><span>4.9 ★ rating</span></div>
                <div className="kv-htrust-sep"/>
                <div className="kv-htrust-item"><Users size={14}/><span>25k+ families</span></div>
              </div>

              {/* ✅ FIX: mirror للعربي عشان السهم يشاور صح */}
              <svg
                className="kv-arrow-from-text"
                viewBox="0 0 160 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                style={decorativeArrowStyle}
              >
                <path d="M10 75 Q80 5 150 30" stroke="#FF6B35" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeDasharray="7 5"/>
                <polygon points="146,22 158,34 143,36" fill="#FF6B35"/>
              </svg>
            </div>

            {/* VISUAL */}
            <div className="kv-hero-visual" aria-hidden="true">
              <div className="kv-hero-circle">
                <div className="kv-hero-circle-inner" />
              </div>
              {/* ✅ FIX: mirror للعربي عشان السهم يشاور صح */}
              <svg
                className="kv-arrow-bot"
                viewBox="0 0 120 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={decorativeArrowStyle}
              >
                <path d="M110 10 Q60 70 10 55" stroke="#06B6D4" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="6 4"/>
                <polygon points="14,62 2,52 17,48" fill="#06B6D4"/>
              </svg>
              <div className="kv-ml kv-ml-tl"><Trophy size={12}/><span>{t('pages.home.v2.hero.stats.1.title')}</span></div>
              <div className="kv-ml kv-ml-tr"><BarChart3 size={12}/><span>{t('pages.home.v2.hero.stats.2.title')}</span></div>
              <div className="kv-ml kv-ml-br"><ShieldCheck size={12}/><span>{t('pages.home.v2.hero.stats.3.title')}</span></div>
              <div className="kv-particle kv-p1">✦</div>
              <div className="kv-particle kv-p2">✦</div>
              <div className="kv-particle kv-p3">✦</div>
              <div className="kv-particle kv-p4">✦</div>
              <div className="kv-mockup-frame">
                <img src={mobileScreensImg} alt="Kidventure mobile app screens" style={{ width:'100%',height:'100%',objectFit:'contain',borderRadius:'16px' }}/>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section className="kv-sec kv-feat-sec" id="features" ref={featRef}>
        <div className="kv-container">
          <SH title={t('pages.home.learnTitle')} hi={t('pages.home.v2.childLearn.badge')} subtitle={t('pages.home.learnIntro')}/>
          <div className={`kv-feat-grid ${featV ? 'grid-vis' : ''}`}>
            {features.map((f, i) => (
              <div key={i} className="kv-feat-card" style={{ '--d':`${i*0.1}s`, '--acc':f.color }}>
                <div className="kv-feat-img-top" style={{ background:`linear-gradient(145deg,${f.color}18,${f.color}06)` }}>
                  <div className="kv-feat-illus" style={{ color:f.color }}>
                    <div className="kv-feat-illus-bg" style={{ background:`${f.color}15` }}/>
                    <f.icon size={56} strokeWidth={1.4}/>
                  </div>
                  <div className="kv-feat-num-badge" style={{ background:f.color }}>0{i+1}</div>
                  <div className="kv-feat-dot1" style={{ background:`${f.color}25` }}/>
                  <div className="kv-feat-dot2" style={{ background:`${f.color}18` }}/>
                  <div className="kv-feat-shine" />
                </div>
                <div className="kv-feat-footer">
                  <h3 style={{ color:f.color }}>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SOLUTION ══════════ */}
      <section className="kv-sec kv-sol-sec" id="solution" ref={solRef}>
        <div className="kv-sol-bg-blob" aria-hidden="true"/>
        <div className="kv-container">
          <div className={`kv-sol-row ${solV ? 'row-vis' : ''}`}>
            <div className="kv-sol-img-side">
              <div className="kv-sol-circle-blob"/>
              <div className="kv-sol-frame" style={{ overflow:'hidden',borderRadius:'20px' }}>
                <img src={learningAdventureImg} alt="Learning Adventure on Mobile" style={{ width:'100%',height:'100%',objectFit:'cover',borderRadius:'20px' }}/>
              </div>
              <div className="kv-sol-badge kv-sol-b1"><BookOpen size={13}/><span>{t('pages.home.v2.childLearn.skills.reading.title')}</span></div>
              <div className="kv-sol-badge kv-sol-b2"><Trophy size={13}/><span>+Level Up!</span></div>
            </div>

            <div className="kv-sol-text">
              <h2 className="kv-sh-title">
                {t('pages.home.platformChildTitle')}{' '}
                <span className="kv-hi">{t('pages.home.v2.howFeels.badge')}</span>
              </h2>
              <p className="kv-sh-sub" style={{ margin:0 }}>{t('pages.home.platformChildBody')}</p>
              <ul className="kv-check-list">
                {[{icon:BookOpen,k:'reading'},{icon:Brain,k:'critical'},{icon:Lightbulb,k:'curiosity'},{icon:Trophy,k:'confidence'}].map(({icon:I,k},i)=>(
                  <li key={k} style={{ '--d':`${i*0.09}s` }}>
                    <CheckCircle size={16} className="kv-chk-ico"/>
                    <div>
                      <strong>{t(`pages.home.v2.childLearn.skills.${k}.title`)}</strong>
                      <span>{t(`pages.home.v2.childLearn.skills.${k}.body`)}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="kv-cta-row">
                <button type="button" className="kv-btn kv-btn-primary" onClick={() => scrollTo('download')}>
                  <Download size={15}/><span>{t('common.getTheApp')}</span>
                </button>
                <button type="button" className="kv-btn kv-btn-outline" onClick={() => scrollTo('how-it-works')}>
                  <span>{t('common.learnMore')}</span><Arr size={15}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="kv-sec kv-how-sec" id="how-it-works" ref={howRef}>
        <div className="kv-container">
          <div className={`kv-how-row ${howV ? 'row-vis' : ''}`}>
            <div className="kv-how-left">
              <h2 className="kv-sh-title" style={{ textAlign:isRTL?'right':'left' }}>
                {t('pages.home.v2.howItWorks.title')}
              </h2>
              <p className="kv-sh-sub" style={{ margin:0,textAlign:isRTL?'right':'left' }}>
                {t('pages.home.v2.howItWorks.subtitle')}
              </p>
              <div className="kv-steps">
                {steps.map((s, i) => (
                  <div key={i} className="kv-step" style={{ '--d':`${i*0.12}s` }}>
                    <div className="kv-step-num">{s.num}</div>
                    <div className="kv-step-ico"><s.icon size={18} strokeWidth={1.6}/></div>
                    <div><strong>{s.title}</strong><span>{s.body}</span></div>
                  </div>
                ))}
              </div>
              <div className="kv-how-note">
                <CheckCircle size={14}/>
                <span>{t('pages.home.v2.howItWorks.noteTitle')} — {t('pages.home.v2.howItWorks.noteBody')}</span>
              </div>
            </div>

            {/* ✅ Enhanced screens with animations */}
            <div className="kv-how-screens">
              <div className="kv-screen-card kv-sc-mobile">
                <div style={{ position:'relative', width:'100%', aspectRatio:'9/16', borderRadius:'20px', overflow:'hidden' }}>
                  <img
                    src={phoneImg}
                    alt="Kidventure mobile app"
                    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  />
                </div>
                <div className="kv-sc-label">
                  <Smartphone size={12}/><span>Mobile App</span>
                </div>
              </div>

              <div className="kv-sc-arrow">
                {/* ✅ الاتنين دول (Right/Left) بيتبدلوا بالـ CSS classes، خليناهم زي ما هما لأن ده منطقي أصلاً */}
                <div className="kv-sc-arrow-inner">
                  <ArrowRight size={16} className="kv-a-r"/>
                  <ArrowLeft  size={16} className="kv-a-l"/>
                </div>
              </div>

              <div className="kv-screen-card kv-sc-web">
                <div style={{ position:'relative', width:'100%', aspectRatio:'16/10', borderRadius:'20px', overflow:'hidden' }}>
                  <img
                    src={webDashboardImg}
                    alt="Kidventure web dashboard"
                    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  />
                </div>
                <div className="kv-sc-label">
                  <Globe size={12}/><span>Web Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ BEFORE / AFTER ══════════ */}
      <section className="kv-sec kv-trans-sec" id="transformation" ref={vidRef}>
        <div className="kv-container">
          <SH title={t('pages.home.transformation.title')} subtitle={t('pages.home.transformation.subtitle')}/>

          <div className={`kv-trans-grid ${vidV ? 'grid-vis' : ''}`}>

            {/* BEFORE card */}
            <div className="kv-trans-card kv-before">
              <div className="kv-vid-wrap">
                <video ref={beforeRef} className="kv-vid" src={beforeVideo} loop muted playsInline preload="auto"/>
                <div className="kv-vid-ov">
                  <button className="kv-play-btn" onClick={() => toggleVid(beforeRef, setBPlay)}>
                    {bPlay ? <PauseCircle size={38}/> : <PlayCircle size={38}/>}
                  </button>
                </div>
                <div className="kv-vcap">
                  <Frown size={12}/><span>{t('pages.home.transformation.before.videoLabel')}</span>
                </div>
              </div>
              <div className="kv-trans-body">
                <h3>{t('pages.home.transformation.before.title')}</h3>
                <p>{t('pages.home.transformation.before.caption')}</p>
                <ul className="kv-trans-pts">
                  {(()=>{
                    const p = t('pages.home.transformation.before.points',{returnObjects:true});
                    return Array.isArray(p) ? p.map((x,i)=>(
                      <li key={i}><span className="kv-pt-ico kv-pt-neg"><Frown size={9}/></span><span>{x}</span></li>
                    )) : null;
                  })()}
                </ul>
              </div>
            </div>

            <div className="kv-trans-center">
              {/* ✅ ده بيتبدل صح أصلاً لأنه بيستخدم FlowA */}
              <div className="kv-trans-arrow"><FlowA size={24}/></div>
              <span>{t('pages.home.transformation.arrow')}</span>
            </div>

            {/* AFTER card */}
            <div className="kv-trans-card kv-after">
              <div className="kv-vid-wrap">
                <video ref={afterRef} className="kv-vid" src={afterVideo} loop muted playsInline preload="metadata"/>
                <div className="kv-vid-ov">
                  <button className="kv-play-btn" onClick={() => toggleVid(afterRef, setAPlay)}>
                    {aPlay ? <PauseCircle size={38}/> : <PlayCircle size={38}/>}
                  </button>
                </div>
                <div className="kv-vcap kv-vcap-pos"><Smile size={12}/><span>{t('pages.home.transformation.after.videoLabel')}</span></div>
              </div>
              <div className="kv-trans-body">
                <h3>{t('pages.home.transformation.after.title')}</h3>
                <p>{t('pages.home.transformation.after.caption')}</p>
                <ul className="kv-trans-pts">
                  {(()=>{
                    const p = t('pages.home.transformation.after.points',{returnObjects:true});
                    return Array.isArray(p) ? p.map((x,i)=>(
                      <li key={i}><span className="kv-pt-ico kv-pt-pos"><CheckCircle size={9}/></span><span>{x}</span></li>
                    )) : null;
                  })()}
                </ul>
              </div>
            </div>
          </div>

          <div className={`kv-stats-row ${vidV ? 'row-vis' : ''}`}>
            {['attention','learning','parents'].map((k,i)=>(
              <div key={k} className="kv-stat-card" style={{ '--d':`${0.7+i*0.12}s` }}>
                <span className="kv-stat-val">{t(`pages.home.transformation.stats.${k}.value`)}</span>
                <span className="kv-stat-lbl">{t(`pages.home.transformation.stats.${k}.label`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ EMOTIONAL ANCHOR ══════════ */}
      <section className="kv-sec kv-emo-sec" id="emotional-anchor" ref={emoRef}>
        <div className="kv-container">
          <div className={`kv-emo-row ${emoV ? 'row-vis' : ''}`}>
            <div className="kv-emo-img-side">
              <div className="kv-emo-frame" style={{ overflow:'hidden',borderRadius:'24px' }}>
                <div className="kv-emo-glow"/>
                <div className="kv-emo-badge kv-eb-tl"><Star size={11}/><span>4.9 ★</span></div>
                <div className="kv-emo-badge kv-eb-br"><Trophy size={11}/><span>25k+ families</span></div>
                <img src={focusedChildImg} alt="Focused child using tablet" style={{ width:'100%',height:'100%',objectFit:'cover',borderRadius:'24px',display:'block' }}/>
              </div>
            </div>
            <div className="kv-emo-content">
              <h2 className="kv-sh-title">{t('pages.home.emotionalAnchor.title')}</h2>
              <p className="kv-sh-sub" style={{ margin:0 }}>{t('pages.home.emotionalAnchor.subtitle')}</p>
              <blockquote className="kv-emo-quote">"{t('pages.home.emotionalAnchor.quote')}"</blockquote>
              <div className="kv-emo-feats">
                {emoFeats.map(f=>(
                  <div key={f.key} className="kv-emo-feat">
                    <div className="kv-emo-feat-ico"><f.Icon size={16}/></div>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="kv-cta-row">
                <button type="button" className="kv-btn kv-btn-primary" onClick={() => scrollTo('parent-dashboard')}>
                  <Wand2 size={14}/><span>{t('common.learnMore')}</span><Arr size={14}/>
                </button>
                <Link to="/login" className="kv-btn kv-btn-outline">
                  <span>{t('common.login')}</span><Arr size={14}/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PARENT DASHBOARD ══════════ */}
      <section className="kv-sec kv-dash-sec" id="parent-dashboard" ref={dashRef}>
        <div className="kv-container">
          <div className={`kv-dash-row ${dashV ? 'row-vis' : ''}`}>
            <div className="kv-dash-text">
              <h2 className="kv-sh-title" style={{ textAlign:isRTL?'right':'left' }}>{t('pages.home.v2.parentDashboard.title')}</h2>
              <p className="kv-sh-sub" style={{ margin:0,textAlign:isRTL?'right':'left' }}>{t('pages.home.v2.parentDashboard.subtitle')}</p>
              <ul className="kv-bullet-list">
                {[BarChart3,Activity,TrendingUp,Shield].map((Icon,i)=>(
                  <li key={i} style={{ '--d':`${i*0.1}s` }}>
                    <div className="kv-bul-ico"><Icon size={16}/></div>
                    <div>
                      <strong>{t(`pages.home.v2.parentDashboard.bullets.${i+1}.title`)}</strong>
                      <span>{t(`pages.home.v2.parentDashboard.bullets.${i+1}.body`)}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/login" className="kv-btn kv-btn-primary" style={{ display:'inline-flex',marginTop:'8px' }}>
                <span>{t('pages.home.v2.parentDashboard.cta')}</span><Arr size={16}/>
              </Link>
            </div>
            <div className="kv-dash-visual">
              <div className="kv-dash-card">
                <div className="kv-dash-top">
                  <div className="kv-dash-ttl"><BarChart3 size={14}/><span>{t('pages.home.v2.parentDashboard.mockup.title')}</span></div>
                  <div className="kv-dash-pill"><Clock size={12}/><span>{t('pages.home.v2.parentDashboard.mockup.range')}</span></div>
                </div>
                <div className="kv-dash-stats">
                  {[Trophy,BookOpen,Clock].map((Icon,i)=>(
                    <div key={i} className="kv-dstat">
                      <Icon size={14}/>
                      <div>
                        <div className="kv-dstat-val">—</div>
                        <div className="kv-dstat-lbl">{t(`pages.home.v2.parentDashboard.mockup.stats.${['achievements','stories','time'][i]}`)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="kv-dash-chart">
                  <div className="kv-chart-lbl">{t('pages.home.v2.parentDashboard.mockup.chartTitle')}</div>
                  <div className="kv-bars">
                    {['mon','tue','wed','thu','fri'].map((d,i)=>(
                      <div key={d} className="kv-bar" style={{ height:`${46+i*11}%`,'--d':`${i*0.08}s` }}>
                        <span>{t(`pages.home.v2.days.${d}`)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="kv-under-note">{t('pages.home.v2.parentDashboard.underNote')}</p>
        </div>
      </section>

      {/* ══════════ TRUST ══════════ */}
      <section className="kv-sec kv-trust-sec" id="trust" ref={trustRef}>
        <div className="kv-container">
          <SH title={t('pages.home.v2.trust.title')} subtitle={t('pages.home.v2.trust.subtitle')}/>
          <div className={`kv-trust-grid ${trustV ? 'grid-vis' : ''}`}>
            {trustCards.map((c,i)=>(
              <div key={i} className="kv-trust-card" style={{ '--d':`${i*0.1}s` }}>
                <div className="kv-trust-ico"><c.icon size={22}/></div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DOWNLOAD — Video Background ══════════ */}
{/* ══════════ DOWNLOAD — Enhanced Video Background ══════════ */}
<section className="kv-sec kv-dl-sec" id="download" ref={dlRef}>

  {/* ✅ Background video */}
  <video
    className="kv-dl-video-bg"
    src={heroVideo}
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    aria-hidden="true"
  />
  
  {/* ✅ Enhanced overlay — أخف */}
  <div className="kv-dl-video-overlay" aria-hidden="true"/>
  
  {/* ✅ Enhanced gradient overlay */}
  <div className="kv-dl-video-grad" aria-hidden="true"/>

  {/* ✅ Floating particles */}
  <div className="kv-dl-particles" aria-hidden="true">
    <div className="kv-dl-particle" />
    <div className="kv-dl-particle" />
    <div className="kv-dl-particle" />
    <div className="kv-dl-particle" />
    <div className="kv-dl-particle" />
    <div className="kv-dl-particle" />
    <div className="kv-dl-particle" />
    <div className="kv-dl-particle" />
    <div className="kv-dl-particle" />
    <div className="kv-dl-particle" />
  </div>

  <div className="kv-container">
    <SH 
      title={t('pages.home.v2.download.title')} 
      subtitle={t('pages.home.v2.download.subtitle')}
    />

    <div className={`kv-dl-grid ${dlV ? 'grid-vis' : ''}`}>

      {/* QR side */}
      <div className="kv-qr-side">
        <div className="kv-qr-box">
          <img
            src={qrCodeImg}
            alt="QR Code to download app"
            style={{ width:'85%', height:'85%', objectFit:'contain' }}
          />
        </div>
        <p className="kv-qr-note">{t('pages.home.v2.download.reassurance')}</p>
      </div>

      {/* Store buttons */}
      <div className="kv-store-side">
        {/* App Store */}
        <button type="button" className="kv-store-btn" style={{ '--d':'0s' }}>
          <Smartphone size={30} strokeWidth={1.5}/>
          <div>
            <span className="kv-s-strong">{t('pages.home.v2.download.appStore')}</span>
            <span className="kv-s-sub">{t('pages.home.v2.download.appStoreSub')}</span>
          </div>
          <Arr size={20}/>
        </button>

        {/* Play Store */}
        <button type="button" className="kv-store-btn" style={{ '--d':'0.1s' }}>
          <Globe size={30} strokeWidth={1.5}/>
          <div>
            <span className="kv-s-strong">{t('pages.home.v2.download.playStore')}</span>
            <span className="kv-s-sub">{t('pages.home.v2.download.playStoreSub')}</span>
          </div>
          <Arr size={20}/>
        </button>

        <Link to="/login" className="kv-login-link">
          {t('pages.home.v2.download.loginLink')}<Arr size={18}/>
        </Link>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}