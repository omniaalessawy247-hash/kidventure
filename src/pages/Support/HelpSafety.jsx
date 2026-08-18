import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search, X, Mail, MessageCircle, BookOpen, ChevronDown,
  Rocket, CreditCard, Smartphone, BarChart3, ShieldCheck, KeyRound,
  ArrowRight, Sparkles, HelpCircle, LifeBuoy
} from 'lucide-react';
import './HelpSafety.css';

const NS = 'pages.support';

const CATEGORIES = [
  { key: 'gettingStarted', accent: '#F4831F', icon: Rocket,     count: 4 },
  { key: 'subscriptions',  accent: '#FFC94A', icon: CreditCard, count: 4 },
  { key: 'mobileApp',      accent: '#9A7BD9', icon: Smartphone, count: 4 },
  { key: 'dashboard',      accent: '#1C92A8', icon: BarChart3,  count: 3 },
  { key: 'safety',         accent: '#21B6CC', icon: ShieldCheck,count: 3 },
  { key: 'account',        accent: '#F0608C', icon: KeyRound,   count: 3 },
];

function useReveal(threshold = 0.1) {
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

export default function HelpSafety() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('gettingStarted');
  const [query, setQuery] = useState('');
  const [openItems, setOpenItems] = useState({});
  const [bodyRef, bodyVis] = useReveal(0.05);

  const toggleItem = (id) => setOpenItems((p) => ({ ...p, [id]: !p[id] }));

  const allFaqs = useMemo(() => {
    const items = [];
    CATEGORIES.forEach((cat) => {
      for (let i = 1; i <= cat.count; i++) {
        items.push({
          id: `${cat.key}-${i}`,
          category: cat.key,
          accent: cat.accent,
          Icon: cat.icon,
          question: t(`${NS}.${cat.key}.q${i}`),
          answer: t(`${NS}.${cat.key}.a${i}`),
        });
      }
    });
    return items;
  }, [t]);

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      return allFaqs.filter(
        (it) => it.question.toLowerCase().includes(q) || it.answer.toLowerCase().includes(q)
      );
    }
    return allFaqs.filter((it) => it.category === activeCategory);
  }, [allFaqs, query, activeCategory]);

  const isSearching = query.trim().length > 0;
  const activeCat = CATEGORIES.find((c) => c.key === activeCategory);

  return (
    <div className="hs2-page">

      {/* ════════ HERO ════════ */}
      <section className="hs2-hero">
        <div className="hs2-hero-mesh" aria-hidden="true" />
        <div className="hs2-hero-grid" aria-hidden="true" />
        <div className="hs2-orbits" aria-hidden="true">
          {[Rocket, ShieldCheck, CreditCard, Smartphone, BarChart3, KeyRound, HelpCircle, LifeBuoy].map((Ic, i) => (
            <span key={i} className="hs2-orbit-ico" style={{ '--d': `${i * 4.4}s`, '--r': `${110 + (i % 3) * 40}px` }}>
              <Ic size={16} />
            </span>
          ))}
        </div>

        <div className="hs2-wrap">
          <div className="hs2-hero-inner">
            <span className="hs2-eyebrow">
              <span className="hs2-eyebrow-dot" /> {t(`${NS}.eyebrow`)}
            </span>
            <h1 className="hs2-h1">
              {t(`${NS}.titleStart`)} <span className="hs2-grad">{t(`${NS}.titleAccent`)}</span>
            </h1>
            <p className="hs2-lead">{t(`${NS}.subtitle`)}</p>

            <div className="hs2-search-wrap">
              <Search size={19} className="hs2-search-ico" />
              <input
                type="text"
                className="hs2-search-input"
                placeholder={t(`${NS}.searchPlaceholder`)}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={t(`${NS}.searchPlaceholder`)}
              />
              {query && (
                <button type="button" className="hs2-search-clear" onClick={() => setQuery('')} aria-label={t(`${NS}.clearSearch`)}>
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CONTACT CHIPS ════════ */}
      <div className="hs2-wrap hs2-contact-row">
        <a className="hs2-contact-chip" style={{ '--cc': '#7C3AED' }} href="mailto:support@kidventure.app">
          <span className="hs2-contact-icon"><Mail size={18} /></span>
          <span className="hs2-contact-text">
            <strong>{t(`${NS}.contactEmailTitle`)}</strong>
            <span>{t(`${NS}.contactEmailValue`)}</span>
          </span>
        </a>
        <a className="hs2-contact-chip" style={{ '--cc': '#047857' }} href="#">
          <span className="hs2-contact-icon"><MessageCircle size={18} /></span>
          <span className="hs2-contact-text">
            <strong>{t(`${NS}.contactChatTitle`)}</strong>
            <span>{t(`${NS}.contactChatValue`)}</span>
          </span>
        </a>
        <a className="hs2-contact-chip" style={{ '--cc': '#F4831F' }} href="#">
          <span className="hs2-contact-icon"><BookOpen size={18} /></span>
          <span className="hs2-contact-text">
            <strong>{t(`${NS}.contactGuideTitle`)}</strong>
            <span>{t(`${NS}.contactGuideValue`)}</span>
          </span>
        </a>
      </div>

      {/* ════════ BODY: SIDEBAR + FAQ ════════ */}
      <section className="hs2-sec" ref={bodyRef}>
        <div className="hs2-sec-deco" aria-hidden="true">
          <div className="hs2-sec-orb hs2-orb-a" />
          <div className="hs2-sec-orb hs2-orb-b" />
        </div>
        <div className={`hs2-wrap hs2-body ${bodyVis ? 'hs2-in' : ''}`}>

          {!isSearching && (
            <nav className="hs2-categories" aria-label={t(`${NS}.categoriesLabel`)}>
              {CATEGORIES.map((cat) => {
                const Ic = cat.icon;
                const active = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    className={`hs2-cat-btn ${active ? 'hs2-cat-active' : ''}`}
                    style={{ '--cc': cat.accent }}
                    onClick={() => setActiveCategory(cat.key)}
                    aria-pressed={active}
                  >
                    <span className="hs2-cat-icon"><Ic size={17} /></span>
                    <span className="hs2-cat-label">{t(`${NS}.${cat.key}.title`)}</span>
                    <span className="hs2-cat-count">{cat.count}</span>
                  </button>
                );
              })}
            </nav>
          )}

          <div className="hs2-faq-panel">
            {isSearching ? (
              <p className="hs2-results-label">
                {filteredFaqs.length > 0 ? t(`${NS}.resultsFound`, { count: filteredFaqs.length }) : t(`${NS}.noResults`)}
              </p>
            ) : (
              <h2 className="hs2-panel-title">
                <span className="hs2-panel-title-icon" style={{ '--cc': activeCat?.accent }}>
                  {activeCat && <activeCat.icon size={19} />}
                </span>
                {t(`${NS}.${activeCategory}.title`)}
              </h2>
            )}

            <div className="hs2-faq-list">
              {filteredFaqs.map((item) => {
                const isOpen = !!openItems[item.id];
                const Ic = item.Icon;
                return (
                  <div key={item.id} className={`hs2-faq-item ${isOpen ? 'hs2-open' : ''}`} style={{ '--cc': item.accent }}>
                    <button type="button" className="hs2-faq-q-btn" onClick={() => toggleItem(item.id)} aria-expanded={isOpen}>
                      {isSearching && <span className="hs2-faq-tag"><Ic size={14} /></span>}
                      <span className="hs2-faq-q-text">{item.question}</span>
                      <span className="hs2-faq-chevron"><ChevronDown size={16} /></span>
                    </button>
                    <div className={`hs2-faq-a-wrap ${isOpen ? 'hs2-open' : ''}`}>
                      <div className="hs2-faq-a-inner"><p>{item.answer}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CTA BANNER ════════ */}
      <section className="hs2-cta-sec">
        <div className="hs2-cta-orb hs2-co1" aria-hidden="true" />
        <div className="hs2-cta-orb hs2-co2" aria-hidden="true" />
        <div className="hs2-wrap">
          <div className="hs2-cta-banner">
            <div className="hs2-cta-icon"><Sparkles size={24} /></div>
            <div className="hs2-cta-text">
              <h3>{t(`${NS}.ctaTitle`)}</h3>
              <p>{t(`${NS}.ctaSubtitle`)}</p>
            </div>
            <a className="hs2-cta-btn" href="mailto:support@kidventure.app">
              <span>{t(`${NS}.ctaButton`)}</span><ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}