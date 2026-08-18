/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Mail, Phone, MessageCircle, Send, CheckCircle,
  Sparkles, Clock, Shield, BookOpen, HelpCircle,
  Headphones, Heart, Star, ArrowRight,
  MapPin, MessageSquare, Users, Lock, LifeBuoy,
  ChevronDown, Zap, Globe, Award, TrendingUp
} from 'lucide-react';

import heroBg from '../../assets/contact us/image.png';
import './ContactUs.css';

/* ── scroll reveal ── */
function useReveal(threshold = 0.08) {
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

/* ── animated counter ── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const MAX_MSG = 500;

function StatCard({ Icon, target, suffix, label, color, delay, started }) {
  const count = useCounter(target, 1600, started);
  return (
    <div className="cu-stat-card" style={{ '--sc': color, animationDelay: delay }}>
      <div className="cu-stat-icon-wrap"><Icon size={22} /></div>
      <div className="cu-stat-num">{count}{suffix}</div>
      <div className="cu-stat-label">{label}</div>
    </div>
  );
}

function FeatureCard({ Icon, title, desc, color, delay }) {
  return (
    <div className="cu-feat-card" style={{ '--fc': color, animationDelay: delay }}>
      <div className="cu-feat-icon"><Icon size={20} /></div>
      <h3 className="cu-feat-title">{title}</h3>
      <p className="cu-feat-desc">{desc}</p>
    </div>
  );
}

export default function ContactUs() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir ? i18n.dir() === 'rtl' : document.documentElement.dir === 'rtl';

  const contentRef = useRef(null);
  const [gridRef,  gridVis]  = useReveal(0.04);
  const [statsRef, statsVis] = useReveal(0.12);
  const [featRef,  featVis]  = useReveal(0.08);
  const [mapRef,   mapVis]   = useReveal(0.08);
  const [faqRef,   faqVis]   = useReveal(0.1);

  const [form, setForm]     = useState({ name:'', email:'', phone:'', topic:'', message:'' });
  const [activeTopic, setAT] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);
  const [errors, setErrors] = useState({});

  const set = useCallback((k, v) => setForm(f => ({ ...f, [k]: v })), []);

  const scrollToContent = () => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const topics = [
    { key:'general',      label: t('contactUs.form.topics.general'),      Icon: HelpCircle },
    { key:'subscription', label: t('contactUs.form.topics.subscription'), Icon: Star       },
    { key:'safety',       label: t('contactUs.form.topics.safety'),       Icon: Shield     },
    { key:'support',      label: t('contactUs.form.topics.support'),      Icon: Headphones },
    { key:'feedback',     label: t('contactUs.form.topics.feedback'),     Icon: Heart      },
    { key:'other',        label: t('contactUs.form.topics.other'),        Icon: Sparkles   },
  ];

  const infoItems = [
    { Icon: Mail,   label: t('contactUs.info.email.label'),        val: t('contactUs.info.email.value'),        col:'#FF6B35' },
    { Icon: Clock,  label: t('contactUs.info.responseTime.label'), val: t('contactUs.info.responseTime.value'), col:'#8B5CF6' },
    { Icon: MapPin, label: t('contactUs.info.location.label'),     val: t('contactUs.info.location.value'),     col:'#06B6D4' },
  ];

  const socials = [
    { label:'Instagram', col:'#E1306C', bg:'rgba(225,48,108,.13)',
      Svg:() => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
    { label:'Facebook',  col:'#1877F2', bg:'rgba(24,119,242,.13)',
      Svg:() => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
    { label:'X / Twitter', col:'#0f0f0f', bg:'rgba(0,0,0,.08)',
      Svg:() => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.74-8.855L2.25 2.25h6.928l4.27 5.647 4.796-5.647zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg> },
    { label:'WhatsApp',  col:'#25D366', bg:'rgba(37,211,102,.13)',
      Svg:() => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> },
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t('contactUs.form.errors.name');
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = t('contactUs.form.errors.email');
    if (!form.message.trim()) e.message = t('contactUs.form.errors.message');
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    setSent(true);
  };

  const reset = () => { setSent(false); setForm({ name:'', email:'', phone:'', topic:'', message:'' }); setAT(''); };

  return (
    <div className="cu-page kv-home" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ══ HERO ══ */}
      <section className="cu-hero-sec">
        {/* wrapper controls height + object-position so image never crops from bottom */}
        <div className="cu-hero-img-wrap">
          <img src={heroBg} alt="" className="cu-hero-img" aria-hidden="true" />
        </div>
        <div className="cu-hero-ov" aria-hidden="true" />
        <div className="cu-hero-dots" aria-hidden="true" />
        <div className="cu-orb cu-orb-1" aria-hidden="true" />
        <div className="cu-orb cu-orb-2" aria-hidden="true" />
        <div className="cu-orb cu-orb-3" aria-hidden="true" />
        <div className="cu-orb cu-orb-4" aria-hidden="true" />

        <div className="cu-hero-center">
          <div className="cu-hero-badge"><Sparkles size={11}/><span>{t('contactUs.hero.badge')}</span></div>
          <h1 className="cu-hero-title">{t('contactUs.hero.titlePre')} <span className="cu-hero-accent">{t('contactUs.hero.titleAccent')}</span></h1>
          <p className="cu-hero-sub">{t('contactUs.hero.subtitle')}</p>
          <button className="cu-scroll-btn" onClick={scrollToContent} aria-label="Scroll to form">
            <span className="cu-scroll-label">{t('contactUs.hero.scrollLabel')}</span>
            <span className="cu-scroll-arrow"><ChevronDown size={18}/></span>
          </button>
        </div>
      </section>

      {/* ══ INFO STRIP ══ */}
      <div className="cu-info-strip">
        <div className="kv-container">
          <div className="cu-info-row">
            {infoItems.map((it, i) => (
              <div key={i} className="cu-info-item" style={{ animationDelay:`${i*0.1}s` }}>
                <div className="cu-info-ico" style={{ background: it.col }}><it.Icon size={14} color="#fff"/></div>
                <div>
                  <div className="cu-info-lbl">{it.label}</div>
                  <div className="cu-info-val">{it.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ STATS ══ */}
      <div ref={statsRef} className={`cu-stats-section ${statsVis ? 'cu-vis' : ''}`}>
        <div className="kv-container">
          <div className="cu-stats-grid">
            <StatCard Icon={Users}    target={12000} suffix="+" label={t('contactUs.stats.families')}     color="#FF6B35" delay="0s"    started={statsVis} />
            <StatCard Icon={Award}    target={98}    suffix="%" label={t('contactUs.stats.satisfaction')} color="#8B5CF6" delay="0.1s" started={statsVis} />
            <StatCard Icon={Clock}    target={24}    suffix="h" label={t('contactUs.stats.responseTime')} color="#06B6D4" delay="0.2s" started={statsVis} />
            <StatCard Icon={Globe}    target={15}    suffix="+" label={t('contactUs.stats.countries')}    color="#10B981" delay="0.3s" started={statsVis} />
          </div>
        </div>
      </div>

      {/* ══ WHY US ══ */}
      <div ref={featRef} className={`cu-feat-section ${featVis ? 'cu-vis' : ''}`}>
        <div className="kv-container">
          <div className="cu-section-head">
            <div className="cu-section-badge"><Zap size={11}/> {t('contactUs.features.badge')}</div>
            <h2 className="cu-section-title">{t('contactUs.features.title')}</h2>
            <p className="cu-section-sub">{t('contactUs.features.subtitle')}</p>
          </div>
          <div className="cu-feat-grid">
            <FeatureCard Icon={Zap}        title={t('contactUs.features.fast.title')}       desc={t('contactUs.features.fast.desc')}       color="#FF6B35" delay="0s" />
            <FeatureCard Icon={Shield}     title={t('contactUs.features.safe.title')}       desc={t('contactUs.features.safe.desc')}       color="#8B5CF6" delay="0.1s" />
            <FeatureCard Icon={Heart}      title={t('contactUs.features.human.title')}      desc={t('contactUs.features.human.desc')}      color="#EC4899" delay="0.2s" />
            <FeatureCard Icon={TrendingUp} title={t('contactUs.features.improving.title')}  desc={t('contactUs.features.improving.desc')}  color="#10B981" delay="0.3s" />
          </div>
        </div>
      </div>

      {/* ══ CONTENT ANCHOR ══ */}
      <div ref={contentRef} className="cu-content-anchor" />

      <div className="kv-container">

        <div className="cu-grid-label">
          <div className="cu-section-badge"><MessageSquare size={11}/> {t('contactUs.formSection.badge')}</div>
          <h2 className="cu-section-title">{t('contactUs.formSection.title')}</h2>
        </div>

        {/* ══ MAIN GRID ══ */}
        <div ref={gridRef} className={`cu-grid ${gridVis ? 'cu-vis' : ''}`}>

          <aside className="cu-sidebar">
            <Link to="/support/help-safety" className="cu-hc-banner">
              <div className="cu-hc-ico"><LifeBuoy size={20}/></div>
              <div className="cu-hc-body">
                <div className="cu-hc-title">{t('contactUs.sidebar.helpCenter.title')}</div>
                <div className="cu-hc-sub">{t('contactUs.sidebar.helpCenter.desc')}</div>
              </div>
              <ArrowRight size={14} className="cu-hc-arr"/>
            </Link>

            <div className="cu-sb-card">
              <div className="cu-sb-head"><Mail size={13} className="cu-sb-hico"/><span>{t('contactUs.sidebar.reachUs')}</span></div>
              <div className="cu-channel-list">
                <a href="mailto:hello@kidventure.app" className="cu-channel-row">
                  <div className="cu-channel-ico" style={{background:'rgba(255,107,53,.12)',color:'#FF6B35'}}><Mail size={13}/></div>
                  <div><div className="cu-channel-lbl">{t('contactUs.sidebar.channels.email.label')}</div><div className="cu-channel-val">{t('contactUs.sidebar.channels.email.value')}</div></div>
                  <ArrowRight size={12} className="cu-channel-arr"/>
                </a>
                <div className="cu-channel-row">
                  <div className="cu-channel-ico" style={{background:'rgba(139,92,246,.12)',color:'#8B5CF6'}}><Clock size={13}/></div>
                  <div><div className="cu-channel-lbl">{t('contactUs.sidebar.channels.response.label')}</div><div className="cu-channel-val">{t('contactUs.sidebar.channels.response.value')}</div></div>
                </div>
                <div className="cu-channel-row">
                  <div className="cu-channel-ico" style={{background:'rgba(6,182,212,.12)',color:'#06B6D4'}}><MapPin size={13}/></div>
                  <div><div className="cu-channel-lbl">{t('contactUs.sidebar.channels.location.label')}</div><div className="cu-channel-val">{t('contactUs.sidebar.channels.location.value')}</div></div>
                </div>
              </div>
            </div>

            <div className="cu-sb-card">
              <div className="cu-sb-head"><Users size={13} className="cu-sb-hico"/><span>{t('contactUs.sidebar.followUs')}</span></div>
              <div className="cu-soc-grid">
                {socials.map(({ label, col, bg, Svg }) => (
                  <a key={label} href="#" className="cu-soc-btn" style={{'--scol':col}}>
                    <span className="cu-soc-ico" style={{color:col,background:bg}}><Svg/></span>
                    <span className="cu-soc-lbl" style={{color:col}}>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="cu-form-card">
            {sent ? (
              <div className="cu-success-state">
                <div className="cu-success-rings">
                  <div className="cu-success-ring cu-ring-1"/>
                  <div className="cu-success-ring cu-ring-2"/>
                  <div className="cu-success-circle"><CheckCircle size={34}/></div>
                </div>
                <div className="cu-success-title">{t('contactUs.success.title')}</div>
                <p className="cu-success-body">{t('contactUs.success.body')}</p>
                <div className="cu-success-badge"><CheckCircle size={11}/><span>{t('contactUs.success.badge')}</span></div>
                <button className="cu-reset-link" onClick={reset}>{t('contactUs.success.reset')}</button>
              </div>
            ) : (
              <>
                <div className="cu-form-head">
                  <div className="cu-form-hico"><MessageSquare size={16}/></div>
                  <div>
                    <div className="cu-form-title">{t('contactUs.form.title')}</div>
                    <p className="cu-form-sub">{t('contactUs.form.subtitle')}</p>
                  </div>
                </div>
                <div className="cu-topic-row">
                  {topics.map(({ key, label, Icon: TI }) => (
                    <button key={key} type="button"
                      className={`cu-topic-chip ${activeTopic===key?'active':''}`}
                      onClick={() => { setAT(key); set('topic',key); }}>
                      <TI size={11}/><span>{label}</span>
                    </button>
                  ))}
                </div>
                <form className="cu-form" onSubmit={onSubmit} noValidate>
                  <div className="cu-row-2">
                    <label className="cu-label">
                      <span><BookOpen size={10}/> {t('contactUs.form.labels.name')}</span>
                      <input className={`cu-input${errors.name?' cu-err':''}`} type="text" placeholder={t('contactUs.form.placeholders.name')}
                        value={form.name} onChange={e=>set('name',e.target.value)}/>
                      {errors.name && <em className="cu-errtxt">{errors.name}</em>}
                    </label>
                    <label className="cu-label">
                      <span><Mail size={10}/> {t('contactUs.form.labels.email')}</span>
                      <input className={`cu-input${errors.email?' cu-err':''}`} type="email" placeholder={t('contactUs.form.placeholders.email')}
                        value={form.email} onChange={e=>set('email',e.target.value)}/>
                      {errors.email && <em className="cu-errtxt">{errors.email}</em>}
                    </label>
                  </div>
                  <div className="cu-row-2">
                    <label className="cu-label">
                      <span><Phone size={10}/> {t('contactUs.form.labels.phone')}</span>
                      <input className="cu-input" type="tel" placeholder={t('contactUs.form.placeholders.phone')}
                        value={form.phone} onChange={e=>set('phone',e.target.value)}/>
                    </label>
                    <label className="cu-label">
                      <span><Sparkles size={10}/> {t('contactUs.form.labels.topic')}</span>
                      <select className="cu-input cu-select" value={activeTopic}
                        onChange={e=>{ setAT(e.target.value); set('topic',e.target.value); }}>
                        <option value="">{t('contactUs.form.selectTopic')}</option>
                        {topics.map(tp=><option key={tp.key} value={tp.key}>{tp.label}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className="cu-label">
                    <div className="cu-char-row">
                      <span><MessageCircle size={10}/> {t('contactUs.form.labels.message')}</span>
                      <span className={`cu-char-count${form.message.length>MAX_MSG*.85?' warn':''}`}>
                        {form.message.length}/{MAX_MSG}
                      </span>
                    </div>
                    <textarea className={`cu-input cu-textarea${errors.message?' cu-err':''}`}
                      rows={5} maxLength={MAX_MSG}
                      placeholder={t('contactUs.form.placeholders.message')}
                      value={form.message} onChange={e=>set('message',e.target.value)}/>
                    {errors.message && <em className="cu-errtxt">{errors.message}</em>}
                  </label>
                  <button type="submit" className="cu-submit-btn" disabled={loading}>
                    <span className="cu-btn-bg"/>
                    {loading
                      ? <><div className="cu-spinner"/><span>{t('contactUs.form.sending')}</span></>
                      : <><Send size={14}/><span>{t('contactUs.form.submit')}</span><ArrowRight size={14}/></>}
                  </button>
                  <p className="cu-form-note"><Lock size={10}/> {t('contactUs.form.note')}</p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* ══ MAP ══ */}
        <div ref={mapRef} className={`cu-map-wrap ${mapVis?'cu-vis':''}`}>
          <div className="cu-map-strip">
            <div className="cu-map-info">
              <div className="cu-map-hd"><MapPin size={15} className="cu-map-hico"/><span>{t('contactUs.map.title')}</span></div>
              <p className="cu-map-body">{t('contactUs.map.bodyPre')} <strong>{t('contactUs.map.bodyLocation')}</strong> {t('contactUs.map.bodyPost')}</p>
              <div className="cu-map-tags">
                <span className="cu-map-tag"><CheckCircle size={10}/> {t('contactUs.map.tags.location')}</span>
                <span className="cu-map-tag"><CheckCircle size={10}/> {t('contactUs.map.tags.languages')}</span>
                <span className="cu-map-tag"><CheckCircle size={10}/> {t('contactUs.map.tags.hours')}</span>
                <span className="cu-map-tag"><CheckCircle size={10}/> {t('contactUs.map.tags.email')}</span>
              </div>
            </div>
            <div className="cu-map-frame">
              <iframe title="Kidventure — Mansoura, Egypt"
                src="https://www.openstreetmap.org/export/embed.html?bbox=31.2807%2C30.9364%2C31.4807%2C31.1364&layer=mapnik&marker=31.0364%2C31.3807"
                loading="lazy" allowFullScreen style={{border:0,width:'100%',height:'100%',display:'block'}}/>
              <div className="cu-map-badge"><MapPin size={11}/><span>{t('contactUs.map.badge')}</span></div>
            </div>
          </div>
        </div>

        {/* ══ FAQ STRIP ══ */}
        <div ref={faqRef} className={`cu-faq-strip ${faqVis?'cu-vis':''}`}>
          <div className="cu-faq-inner">
            <div className="cu-faq-left">
              <div className="cu-faq-ico"><HelpCircle size={18}/></div>
              <div>
                <h3>{t('contactUs.faq.title')}</h3>
                <p>{t('contactUs.faq.desc')}</p>
              </div>
            </div>
            <Link to="/support/help-safety" className="cu-faq-cta">
              <LifeBuoy size={14}/><span>{t('contactUs.faq.cta')}</span><ArrowRight size={13}/>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}