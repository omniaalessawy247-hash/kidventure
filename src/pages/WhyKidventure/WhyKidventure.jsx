import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Brain, Sparkles, Star, Trophy, Target,
  BarChart2, Gamepad2, PenLine, ChevronLeft, ChevronRight,
  Users, Clock, Heart, Lightbulb, Zap, Globe, Lock,
  CheckCircle, ArrowRight, Download, LayoutDashboard,
  AlertTriangle, TrendingDown, Rocket, Compass, Palette,
  Award, ShieldCheck, LineChart, BookMarked, Cpu,
  GraduationCap, Smile, FlaskConical, Layers, Eye, Medal,
  Wand2, Keyboard, MousePointer2,
} from 'lucide-react';
import './WhyKidventure.css';

/* ================================================================
   PAGE DATA
   ================================================================ */
const PAGE_DATA = {
  cover: {
    title:    'pages.whyKidventure.cover.title',
    subtitle: 'pages.whyKidventure.cover.subtitle',
    tagline:  'pages.whyKidventure.cover.tagline',
    cta:      'pages.whyKidventure.cover.cta',
    ctaSub:   'pages.whyKidventure.cover.ctaSub',
  },
  pages: [
    {
      id: 'problem',
      chapterTag: 'pages.whyKidventure.problem.chapterTag',
      chapterNum: 'pages.whyKidventure.problem.chapterNum',
      title:      'pages.whyKidventure.problem.title',
      titleLine2: 'pages.whyKidventure.problem.titleLine2',
      stats: [
        { v: 'pages.whyKidventure.problem.stat1Value', l: 'pages.whyKidventure.problem.stat1Label' },
        { v: 'pages.whyKidventure.problem.stat2Value', l: 'pages.whyKidventure.problem.stat2Label' },
        { v: 'pages.whyKidventure.problem.stat3Value', l: 'pages.whyKidventure.problem.stat3Label' },
      ],
      body:  ['pages.whyKidventure.problem.body1', 'pages.whyKidventure.problem.body2'],
      quote: { text: 'pages.whyKidventure.problem.quote', author: 'pages.whyKidventure.problem.quoteAuthor' },
      img:   { icon: 'AlertTriangle', sub: 'pages.whyKidventure.problem.imgHint', col: 'red' },
      achs: [
        { icon: 'AlertTriangle', key: 'pages.whyKidventure.problem.ach1', v: 'orange' },
        { icon: 'TrendingDown',  key: 'pages.whyKidventure.problem.ach2', v: 'purple' },
      ],
    },
    {
      id: 'bigIdea',
      chapterTag:     'pages.whyKidventure.bigIdea.chapterTag',
      chapterNum:     'pages.whyKidventure.bigIdea.chapterNum',
      title:          'pages.whyKidventure.bigIdea.title',
      titleHighlight: 'pages.whyKidventure.bigIdea.titleHighlight',
      body: ['pages.whyKidventure.bigIdea.body1', 'pages.whyKidventure.bigIdea.body2'],
      pillars: [
        { icon: 'BookOpen',  k: 'stories',  c: 'orange' },
        { icon: 'Brain',     k: 'brain',    c: 'purple' },
        { icon: 'PenLine',   k: 'creative', c: 'cyan'   },
        { icon: 'Star',      k: 'rewards',  c: 'gold'   },
      ],
      achs: [
        { icon: 'Lightbulb', key: 'pages.whyKidventure.bigIdea.ach1', v: 'cyan'   },
        { icon: 'Rocket',    key: 'pages.whyKidventure.bigIdea.ach2', v: 'gold'   },
        { icon: 'Brain',     key: 'pages.whyKidventure.bigIdea.ach3', v: 'purple' },
      ],
    },
    {
      id: 'philosophy',
      chapterTag: 'pages.whyKidventure.philosophy.chapterTag',
      chapterNum: 'pages.whyKidventure.philosophy.chapterNum',
      title:      'pages.whyKidventure.philosophy.title',
      titleLine2: 'pages.whyKidventure.philosophy.titleLine2',
      body: ['pages.whyKidventure.philosophy.body1', 'pages.whyKidventure.philosophy.body2', 'pages.whyKidventure.philosophy.body3'],
      values: [
        { icon: 'Compass',   k: 'explore',   c: 'orange' },
        { icon: 'PenLine',   k: 'create',    c: 'purple' },
        { icon: 'Zap',       k: 'grow',      c: 'cyan'   },
        { icon: 'Trophy',    k: 'celebrate', c: 'gold'   },
      ],
      achs: [
        { icon: 'Target',        key: 'pages.whyKidventure.philosophy.ach1', v: 'orange' },
        { icon: 'GraduationCap', key: 'pages.whyKidventure.philosophy.ach2', v: 'gold'   },
      ],
    },
    {
      id: 'insideApp',
      chapterTag: 'pages.whyKidventure.insideApp.chapterTag',
      chapterNum: 'pages.whyKidventure.insideApp.chapterNum',
      title:      'pages.whyKidventure.insideApp.title',
      subtitle:   'pages.whyKidventure.insideApp.subtitle',
      img: { icon: 'Layers', sub: 'pages.whyKidventure.insideApp.imgHint', col: 'purple' },
      features: [
        { icon: 'BookMarked', k: 'stories', c: 'orange' },
        { icon: 'Gamepad2',   k: 'games',   c: 'purple' },
        { icon: 'Palette',    k: 'studio',  c: 'cyan'   },
        { icon: 'Award',      k: 'rewards', c: 'gold'   },
      ],
      achs: [
        { icon: 'Gamepad2', key: 'pages.whyKidventure.insideApp.ach1', v: 'purple' },
        { icon: 'Palette',  key: 'pages.whyKidventure.insideApp.ach2', v: 'cyan'   },
        { icon: 'Trophy',   key: 'pages.whyKidventure.insideApp.ach3', v: 'gold'   },
      ],
    },
    {
      id: 'parents',
      chapterTag: 'pages.whyKidventure.parents.chapterTag',
      chapterNum: 'pages.whyKidventure.parents.chapterNum',
      title:      'pages.whyKidventure.parents.title',
      titleLine2: 'pages.whyKidventure.parents.titleLine2',
      body: ['pages.whyKidventure.parents.body1'],
      features: [
        { icon: 'BarChart2',   k: 'track',   c: 'orange' },
        { icon: 'Clock',       k: 'time',    c: 'purple' },
        { icon: 'ShieldCheck', k: 'safe',    c: 'cyan'   },
        { icon: 'LineChart',   k: 'insight', c: 'gold'   },
      ],
      testimonial: {
        text:   'pages.whyKidventure.parents.testimonial',
        name:   'Sarah M.',
        meta:   'pages.whyKidventure.parents.testimonialAuthor',
        avatar: 'S',
      },
      img: { icon: 'LayoutDashboard', sub: 'pages.whyKidventure.parents.imgHint', col: 'cyan' },
      achs: [
        { icon: 'ShieldCheck', key: 'pages.whyKidventure.parents.ach1', v: 'cyan'  },
        { icon: 'LineChart',   key: 'pages.whyKidventure.parents.ach2', v: 'green' },
      ],
    },
    {
      id: 'vision',
      chapterTag:     'pages.whyKidventure.vision.chapterTag',
      chapterNum:     'pages.whyKidventure.vision.chapterNum',
      title:          'pages.whyKidventure.vision.title',
      titleHighlight: 'pages.whyKidventure.vision.titleHighlight',
      titleEnd:       'pages.whyKidventure.vision.titleEnd',
      statKeys: ['kids', 'countries', 'rating', 'missions'],
      body: ['pages.whyKidventure.vision.body1', 'pages.whyKidventure.vision.body2', 'pages.whyKidventure.vision.body3'],
      cta: {
        primary:   'pages.whyKidventure.vision.ctaApp',
        secondary: 'pages.whyKidventure.vision.ctaDashboard',
        ghost:     'pages.whyKidventure.vision.ctaLearn',
      },
      achs: [
        { icon: 'Globe',  key: 'pages.whyKidventure.vision.ach1', v: 'green'  },
        { icon: 'Star',   key: 'pages.whyKidventure.vision.ach2', v: 'gold'   },
        { icon: 'Rocket', key: 'pages.whyKidventure.vision.ach3', v: 'purple' },
        { icon: 'Cpu',    key: 'pages.whyKidventure.vision.ach4', v: 'cyan'   },
      ],
    },
  ],
  nav: {
    prev:   'pages.whyKidventure.nav.prev',
    next:   'pages.whyKidventure.nav.next',
    pageOf: 'pages.whyKidventure.nav.pageOf',
  },
};

/* ================================================================
   ICON MAP
   ================================================================ */
const ICONS = {
  BookOpen, Brain, Sparkles, Star, Trophy, Target,
  BarChart2, Gamepad2, PenLine, Users, Clock, Heart,
  Lightbulb, Zap, Globe, Lock, CheckCircle,
  ArrowRight, Download, LayoutDashboard,
  AlertTriangle, TrendingDown, Rocket, Compass, Palette,
  Award, ShieldCheck, LineChart, BookMarked, Cpu,
  GraduationCap, Smile, FlaskConical, Layers, Eye, Medal,
  Wand2, Keyboard, MousePointer2,
};

function Icon({ name, size = 14, className = '' }) {
  const C = ICONS[name];
  if (!C) return null;
  return <C size={size} className={className} aria-hidden="true" />;
}

/* ================================================================
   BRAND NAME
   ================================================================ */
function BrandName({ className = '' }) {
  return (
    <span className={`wk-brand-name ${className}`} aria-label="Kidventure">
      Kidventure
    </span>
  );
}

/* ================================================================
   CORNER ORNAMENT
   ================================================================ */
function Corner({ pos }) {
  return (
    <svg
      className={`wk-corner wk-corner--${pos}`}
      width="20" height="20" viewBox="0 0 28 28"
      fill="none" aria-hidden="true"
    >
      <path d="M0 28 L0 0 L28 0" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <circle cx="0" cy="0" r="2.2" fill="currentColor" />
    </svg>
  );
}

/* ================================================================
   LOGO RING EMBLEM
   ================================================================ */
function LogoEmblem({ size = 'lg' }) {
  const isLg = size === 'lg';
  const cls  = isLg ? 'wk-emblem' : 'wk-emblem wk-emblem--sm';
  return (
    <div className={cls}>
      <div className="wk-emblem-ring wk-emblem-ring--1" />
      <div className="wk-emblem-ring wk-emblem-ring--2" />
      <div className="wk-emblem-core">
        <BookOpen size={isLg ? 20 : 12} className="wk-emblem-icon" />
      </div>
    </div>
  );
}

/* ================================================================
   ACHIEVEMENT BADGES
   ================================================================ */
function Badges({ achs, t }) {
  if (!achs?.length) return null;
  return (
    <div className="wk-badges">
      {achs.map((a, i) => (
        <span key={i} className={`wk-badge wk-badge--${a.v}`}>
          <Icon name={a.icon} size={10} />
          {t(a.key)}
        </span>
      ))}
    </div>
  );
}

/* ================================================================
   BOOK FLIP ENGINE
   ================================================================ */
function FlipEngine({ pages, current, direction, isFlipping, onDone }) {
  return (
    <div className="wk-pages">
      <div className="wk-crease" aria-hidden="true" />
      {isFlipping && <div className="wk-shimmer" key={`sh${current}`} aria-hidden="true" />}
      <div className="wk-page-slot">{pages[current]}</div>
      {isFlipping && (
        <div className="wk-flip-wrap" aria-hidden="true">
          <div
            className={`wk-leaf wk-leaf--${direction}`}
            onAnimationEnd={onDone}
          >
            <div className="wk-face wk-face--front">
              {pages[direction === 'forward' ? current - 1 : current + 1]}
            </div>
            <div className="wk-face wk-face--back">
              {pages[current]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   PAGE 0 — COVER
   ✦ FIX: removed duplicate BrandName + LogoEmblem from inside cover
   ✦ FIX: wk-cover-chapter now uses t('brand.premiumLabel')
   ================================================================ */
function PageCover({ t, onOpen }) {
  const d = PAGE_DATA.cover;
  return (
    <div className="wk-page wk-page--cover">
      <div className="wk-cover-frame" />

      {/* ── REMOVED duplicate logo row — already shown in <header> above ── */}

      <div className="wk-cover-art">
        <div className="wk-cover-art-glow"  aria-hidden="true" />
        <div className="wk-cover-art-ring"  aria-hidden="true" />
        <div className="wk-cover-art-ring2" aria-hidden="true" />
        <div className="wk-cover-art-circle">
          <img
            src="src/assets/whykidventure/logo.jpeg"
            alt="Kidventure"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
          />
        </div>
      </div>

      {/* ✦ FIX: was hardcoded "A Premium Learning Experience" */}
      <div className="wk-cover-chapter">{t('brand.premiumLabel')}</div>

      <h1 className="wk-cover-title">{t(d.title)}</h1>
      <p  className="wk-cover-sub">{t(d.subtitle)}</p>
      <p  className="wk-cover-tagline">{t(d.tagline)}</p>

      <button className="wk-btn-open" onClick={onOpen} type="button">
        <BookOpen size={15} aria-hidden="true" />
        {t(d.cta)}
      </button>
      <span className="wk-cover-sub-note">{t(d.ctaSub)}</span>
    </div>
  );
}

/* ================================================================
   PAGE 1 — THE PROBLEM
   ================================================================ */
function PageProblem({ t }) {
  const d = PAGE_DATA.pages[0];
  return (
    <div className="wk-page">
      <Corner pos="tl" /><Corner pos="br" />
      <div className="wk-pane-l">
        <div className="wk-tag"><Icon name="AlertTriangle" size={9} />{t(d.chapterTag)}</div>
        <div className="wk-chapnum">{t(d.chapterNum)}</div>
        <h2 className="wk-htitle">{t(d.title)}</h2>
        <h3 className="wk-hsub"><span className="wk-hl--orange">{t(d.titleLine2)}</span></h3>
        <div className="wk-rule wk-rule--gold" />
        <div className="wk-stats">
          {d.stats.map((s, i) => (
            <div key={i} className={`wk-stat wk-stat--${i}`}>
              <div className="wk-stat-v">{t(s.v)}</div>
              <div className="wk-stat-l">{t(s.l)}</div>
            </div>
          ))}
        </div>
        <Badges achs={d.achs} t={t} />
      </div>
      <div className="wk-pane-r">
        <div style={{ gridColumn: '1 / -1' }}>
          <img
            src="src/assets/whykidventure/image2.jpg"
            alt="The Problem"
            style={{ width: '90%', height: '310px', objectFit: 'cover', borderRadius: 4 }}
          />
        </div>
        <div style={{ overflow: 'auto' }}>
          {d.body.map((b, i) => <p key={i} className="wk-body">{t(b)}</p>)}
        </div>
      </div>
      <div className="wk-pgnum">I</div>
    </div>
  );
}

/* ================================================================
   PAGE 2 — BIG IDEA
   ================================================================ */
function PageBigIdea({ t }) {
  const d = PAGE_DATA.pages[1];
  return (
    <div className="wk-page wk-page--alt">
      <Corner pos="tl" /><Corner pos="tr" />
      <div className="wk-pane-l">
        <div className="wk-tag"><Icon name="Lightbulb" size={9} />{t(d.chapterTag)}</div>
        <div className="wk-chapnum">{t(d.chapterNum)}</div>
        <h2 className="wk-htitle">{t(d.title)}</h2>
        <h3 className="wk-hsub"><span className="wk-hl--orange">{t(d.titleHighlight)}</span></h3>
        <div className="wk-rule" />
        {d.body.map((b, i) => <p key={i} className="wk-body">{t(b)}</p>)}
        <Badges achs={d.achs} t={t} />
      </div>
      <div className="wk-pane-r" style={{ justifyContent: 'center' }}>
        <div className="wk-pillars">
          {d.pillars.map(({ icon: k, k: key, c: col }) => (
            <div key={key} className="wk-pillar">
              <div className={`wk-pi wk-pi--${col}`}><Icon name={k} size={14} /></div>
              <div className="wk-pt">{t(`pages.whyKidventure.bigIdea.pillars.${key}`)}</div>
              <div className="wk-pd">{t(`pages.whyKidventure.bigIdea.pillars.${key}Desc`)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="wk-pgnum">II</div>
    </div>
  );
}

/* ================================================================
   PAGE 3 — PHILOSOPHY
   ================================================================ */
function PagePhilosophy({ t }) {
  const d = PAGE_DATA.pages[2];
  return (
    <div className="wk-page">
      <Corner pos="tl" /><Corner pos="br" />
      <div className="wk-pane-l">
        <div className="wk-tag"><Icon name="Brain" size={9} />{t(d.chapterTag)}</div>
        <div className="wk-chapnum">{t(d.chapterNum)}</div>
        <h2 className="wk-htitle">{t(d.title)}</h2>
        <h3 className="wk-hsub"><span className="wk-hl--purple">{t(d.titleLine2)}</span></h3>
        <div className="wk-rule" />
        {d.body.map((b, i) => (
          <p key={i} className="wk-body">
            {i === d.body.length - 1 ? <strong>{t(b)}</strong> : t(b)}
          </p>
        ))}
        <Badges achs={d.achs} t={t} />
      </div>
      <div className="wk-pane-r" style={{ justifyContent: 'center' }}>
        <div className="wk-flist">
          {d.values.map(({ icon: k, k: key, c: col }) => (
            <div key={key} className="wk-fi">
              <div className={`wk-ficon wk-ficon--${col}`}><Icon name={k} size={14} /></div>
              <div>
                <div className="wk-ft">{t(`pages.whyKidventure.philosophy.values.${key}`)}</div>
                <div className="wk-fd">{t(`pages.whyKidventure.philosophy.values.${key}Desc`)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="wk-pgnum">III</div>
    </div>
  );
}

/* ================================================================
   PAGE 4 — INSIDE APP
   ================================================================ */
function PageInsideApp({ t }) {
  const d = PAGE_DATA.pages[3];
  return (
    <div className="wk-page wk-page--alt">
      <Corner pos="tr" /><Corner pos="bl" />
      <div className="wk-pane-l" style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        padding: '16px 0',
      }}>
        <img
          src="src/assets/whykidventure/image3.png"
          alt="Inside App"
          style={{
            width: '70%',
            height: '80%',
            maxWidth: '80%',
            maxHeight: 'calc(100% - 32px)',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}
        />
      </div>
      <div className="wk-pane-r">
        <div className="wk-tag"><Icon name="Sparkles" size={9} />{t(d.chapterTag)}</div>
        <div className="wk-chapnum">{t(d.chapterNum)}</div>
        <h2 className="wk-htitle">{t(d.title)}</h2>
        <p className="wk-body wk-body--italic">{t(d.subtitle)}</p>
        <div className="wk-rule" />
        <div className="wk-flist">
          {d.features.map(({ icon: k, k: key, c: col }) => (
            <div key={key} className="wk-fi">
              <div className={`wk-ficon wk-ficon--${col}`}><Icon name={k} size={14} /></div>
              <div>
                <div className="wk-ft">{t(`pages.whyKidventure.insideApp.features.${key}`)}</div>
                <div className="wk-fd">{t(`pages.whyKidventure.insideApp.features.${key}Desc`)}</div>
              </div>
            </div>
          ))}
        </div>
        <Badges achs={d.achs} t={t} />
      </div>
      <div className="wk-pgnum">IV</div>
    </div>
  );
}

/* ================================================================
   PAGE 5 — PARENTS
   ================================================================ */
function PageParents({ t, navigate }) {
  const d = PAGE_DATA.pages[4];
  return (
    <div className="wk-page">
      <Corner pos="tl" /><Corner pos="tr" />
      <div className="wk-pane-l">
        <div className="wk-tag"><Icon name="Heart" size={9} />{t(d.chapterTag)}</div>
        <div className="wk-chapnum">{t(d.chapterNum)}</div>
        <h2 className="wk-htitle">{t(d.title)}</h2>
        <h3 className="wk-hsub"><span className="wk-hl--orange">{t(d.titleLine2)}</span></h3>
        <div className="wk-rule" />
        {d.body.map((b, i) => <p key={i} className="wk-body">{t(b)}</p>)}
        <div className="wk-pillars" style={{ marginTop: 8 }}>
          {d.features.map(({ icon: k, k: key, c: col }) => (
            <div key={key} className="wk-pillar">
              <div className={`wk-pi wk-pi--${col}`}><Icon name={k} size={13} /></div>
              <div className="wk-pt">{t(`pages.whyKidventure.parents.features.${key}`)}</div>
              <div className="wk-pd">{t(`pages.whyKidventure.parents.features.${key}Desc`)}</div>
            </div>
          ))}
        </div>
        <Badges achs={d.achs} t={t} />
      </div>
      <div className="wk-pane-r" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <img
          src="src/assets/whykidventure/image5.png"
          alt="Parents Dashboard"
          style={{
            width: '75%',
            height: '55%',
            display: 'block',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        />
        <div className="wk-testimonial">
          <p className="wk-testimonial-txt">{t(d.testimonial.text)}</p>
          <div className="wk-testimonial-who">
            <div className="wk-testimonial-av">{d.testimonial.avatar}</div>
            <div>
              <div className="wk-testimonial-nm">{d.testimonial.name}</div>
              <div className="wk-testimonial-meta">{t(d.testimonial.meta)}</div>
            </div>
          </div>
        </div>
        <button
          className="wk-cta-btn wk-cta-btn--secondary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => navigate('/parent-dashboard')}
          type="button"
        >
          <LayoutDashboard size={12} aria-hidden="true" />
          {t('pages.whyKidventure.vision.ctaDashboard')}
          <ArrowRight size={11} aria-hidden="true" />
        </button>
      </div>
      <div className="wk-pgnum">V</div>
    </div>
  );
}

/* ================================================================
   PAGE 6 — VISION
   ================================================================ */
function PageVision({ t, navigate, isLoggedIn }) {
  const d = PAGE_DATA.pages[5];
  const handleDownload  = () => navigate('/download');
  const handleDashboard = () => navigate(isLoggedIn ? '/parent-dashboard' : '/sign-up');
  const handleLearn     = () => navigate('/');
  return (
    <div className="wk-page wk-page--alt">
      <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
      <div className="wk-pane-l">
        <div className="wk-tag"><Icon name="Star" size={9} />{t(d.chapterTag)}</div>
        <div className="wk-chapnum">{t(d.chapterNum)}</div>
        <h2 className="wk-hdisplay">
          {t(d.title)}&nbsp;<span className="wk-hl--gold">{t(d.titleHighlight)}</span>
        </h2>
        <h3 className="wk-hsub" style={{ marginBottom: 10 }}>{t(d.titleEnd)}</h3>
        <div className="wk-rule wk-rule--gold" />
        <div className="wk-vstats">
          {d.statKeys.map(k => (
            <div key={k} className="wk-vstat">
              <div className="wk-vstat-n">{t(`pages.whyKidventure.vision.stats.${k}`)}</div>
              <div className="wk-vstat-l">{t(`pages.whyKidventure.vision.stats.${k}Label`)}</div>
            </div>
          ))}
        </div>
        <Badges achs={d.achs} t={t} />
      </div>
      <div className="wk-pane-r">
        {d.body.map((b, i) => (
          <p key={i} className={i === 0 ? 'wk-body wk-body--lead' : 'wk-body'}>
            {i === d.body.length - 1 ? <em><strong>{t(b)}</strong></em> : t(b)}
          </p>
        ))}
        <div className="wk-cta-group">
          <button className="wk-cta-btn wk-cta-btn--primary" onClick={handleDownload} type="button">
            <Download size={12} aria-hidden="true" />
            {t(d.cta.primary)}
            <ArrowRight size={11} aria-hidden="true" />
          </button>
          <button className="wk-cta-btn wk-cta-btn--secondary" onClick={handleDashboard} type="button">
            <LayoutDashboard size={12} aria-hidden="true" />
            {t(d.cta.secondary)}
          </button>
          <button className="wk-cta-btn wk-cta-btn--ghost" onClick={handleLearn} type="button">
            {t(d.cta.ghost)}
          </button>
        </div>
      </div>
      <div className="wk-pgnum">VI</div>
    </div>
  );
}

/* ================================================================
   SECTION A — WHAT CHILDREN ACTUALLY EXPERIENCE
   ================================================================ */
function SectionExperience({ t }) {
  const pairs = [
    { before: t('pages.whyKidventure.exp.pair1Before'), after: t('pages.whyKidventure.exp.pair1After') },
    { before: t('pages.whyKidventure.exp.pair2Before'), after: t('pages.whyKidventure.exp.pair2After') },
    { before: t('pages.whyKidventure.exp.pair3Before'), after: t('pages.whyKidventure.exp.pair3After') },
  ];

  const floaters = [
    { icon: 'Heart',     size: 28 },
    { icon: 'Sparkles',  size: 22 },
    { icon: 'Star',      size: 26 },
    { icon: 'Lightbulb', size: 24 },
    { icon: 'Smile',     size: 30 },
    { icon: 'Zap',       size: 20 },
  ];

  return (
    <section className="wk-exp" id="experience">
      <div className="wk-exp-floaters" aria-hidden="true">
        {floaters.map((f, i) => (
          <span key={i} className="wk-exp-floater">
            <Icon name={f.icon} size={f.size} />
          </span>
        ))}
      </div>

      <div className="wk-exp-inner">
        <div className="wk-exp-text">
          <h2 className="wk-sec-headline">{t('pages.whyKidventure.exp.title')}</h2>
          <p className="wk-sec-lead">{t('pages.whyKidventure.exp.sub')}</p>
          <div className="wk-exp-pairs">
            {pairs.map((p, i) => (
              <div key={i} className="wk-exp-pair">
                <div className="wk-exp-before">
                  <div className="wk-exp-badge">
                    <TrendingDown size={9} aria-hidden="true" />
                    {t('pages.whyKidventure.exp.notThis')}
                  </div>
                  <div className="wk-exp-line">{p.before}</div>
                </div>
                <div className="wk-exp-after">
                  <div className="wk-exp-badge">
                    <Sparkles size={9} aria-hidden="true" />
                    {t('pages.whyKidventure.exp.butThis')}
                  </div>
                  <div className="wk-exp-line">{p.after}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wk-exp-visual" style={{
          margin: '0 20px',
          height: 'auto',
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 0',
        }}>
          <div className="wk-exp-visual-glow" aria-hidden="true" />
          <div className="wk-exp-mediabox">
            <div className="wk-exp-visual" style={{ margin: '40px 20px 0 20px', height: 'auto', overflow: 'visible' }}>
              <div className="wk-exp-visual-glow" aria-hidden="true" />
              <video
                src="src/assets/whykidventure/video.mp4"
                autoPlay loop muted playsInline
                style={{
                  width: '90%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: 16,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION B — TECHNOLOGY WITH INTENTION
   ================================================================ */
function SectionIntention({ t }) {
  const pillars = [
    { icon: 'Brain',   color: 'orange', title: t('pages.whyKidventure.intent.p1Title'), body: t('pages.whyKidventure.intent.p1Body') },
    { icon: 'Target',  color: 'purple', title: t('pages.whyKidventure.intent.p2Title'), body: t('pages.whyKidventure.intent.p2Body') },
    { icon: 'Trophy',  color: 'cyan',   title: t('pages.whyKidventure.intent.p3Title'), body: t('pages.whyKidventure.intent.p3Body') },
    { icon: 'Compass', color: 'green',  title: t('pages.whyKidventure.intent.p4Title'), body: t('pages.whyKidventure.intent.p4Body') },
  ];

  return (
    <section className="wk-intent" id="intention">
      <div className="wk-intent-inner">
        <div className="wk-intent-statement">
          <div className="wk-intent-mantra">
            <span className="wk-intent-mantra-line">{t('pages.whyKidventure.intent.mantra1')}</span>
            <span className="wk-intent-mantra-line">{t('pages.whyKidventure.intent.mantra2')}</span>
            <span className="wk-intent-mantra-line wk-intent-mantra-line--accent">
              {t('pages.whyKidventure.intent.mantraAccent')}
            </span>
          </div>
          <p className="wk-intent-sub">{t('pages.whyKidventure.intent.sub')}</p>
        </div>

        <div className="wk-intent-pillars">
          {pillars.map((p, i) => (
            <div key={i} className={`wk-intent-pillar wk-intent-pillar--${p.color}`}>
              <div className="wk-intent-pillar-icon"><Icon name={p.icon} size={24} /></div>
              <div className="wk-intent-pillar-title">{p.title}</div>
              <div className="wk-intent-pillar-body">{p.body}</div>
            </div>
          ))}
        </div>

        <div className="wk-intent-media" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <img
            src="src/assets/whykidventure/image4.png"
            alt="Technology with Intention"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 16 }}
          />
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION C — THE KIND OF SCREEN TIME WE BELIEVE IN
   ================================================================ */
function SectionBelief({ t }) {
  const items = [
    {
      tag:     t('pages.whyKidventure.belief.item1Tag'),
      title:   t('pages.whyKidventure.belief.item1Title'),
      body:    t('pages.whyKidventure.belief.item1Body'),
      icon:    'Sparkles',
      bullets: [
        t('pages.whyKidventure.belief.item1b1'),
        t('pages.whyKidventure.belief.item1b2'),
        t('pages.whyKidventure.belief.item1b3'),
      ],
    },
    {
      tag:     t('pages.whyKidventure.belief.item2Tag'),
      title:   t('pages.whyKidventure.belief.item2Title'),
      body:    t('pages.whyKidventure.belief.item2Body'),
      icon:    'Trophy',
      bullets: [
        t('pages.whyKidventure.belief.item2b1'),
        t('pages.whyKidventure.belief.item2b2'),
        t('pages.whyKidventure.belief.item2b3'),
      ],
    },
    {
      tag:     t('pages.whyKidventure.belief.item3Tag'),
      title:   t('pages.whyKidventure.belief.item3Title'),
      body:    t('pages.whyKidventure.belief.item3Body'),
      icon:    'Rocket',
      bullets: [
        t('pages.whyKidventure.belief.item3b1'),
        t('pages.whyKidventure.belief.item3b2'),
        t('pages.whyKidventure.belief.item3b3'),
      ],
    },
  ];

  return (
    <section className="wk-belief" id="belief">
      <div className="wk-belief-inner">
        <div className="wk-belief-head">
          <h2 className="wk-sec-headline" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 12px' }}>
            {t('pages.whyKidventure.belief.title')}
          </h2>
          <p className="wk-sec-lead" style={{ textAlign: 'center', margin: '0 auto' }}>
            {t('pages.whyKidventure.belief.sub')}
          </p>
        </div>

        <div className="wk-belief-items">
          {items.map((item, i) => (
            <div key={i} className="wk-belief-item">
              <div className="wk-belief-item-text">
                <div className="wk-belief-item-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="wk-belief-item-tag">
                  <Icon name={item.icon} size={10} />
                  {item.tag}
                </div>
                <h3 className="wk-belief-item-title">{item.title}</h3>
                <p className="wk-belief-item-body">{item.body}</p>
                <div className="wk-belief-bullets">
                  {item.bullets.map((b, j) => (
                    <div key={j} className="wk-belief-bullet">
                      <div className="wk-belief-bullet-dot">
                        <CheckCircle size={12} aria-hidden="true" />
                      </div>
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              <div className="wk-belief-item-media">
                <img
                  src={[
                    'src/assets/whykidventure/image6.png',
                    'src/assets/whykidventure/image7.png',
                    'src/assets/whykidventure/image8.png',
                  ][i]}
                  alt={item.title}
                  style={{
                    width: '60%',
                    height: '350px',
                    display: 'block',
                    borderRadius: 20,
                    objectFit: 'cover',
                    objectPosition: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION D — WHY WE BUILT KIDVENTURE
   ================================================================ */
function SectionStory({ t, navigate }) {
  const nodes = [
    { label: t('pages.whyKidventure.story.n1Label'), title: t('pages.whyKidventure.story.n1Title'), body: t('pages.whyKidventure.story.n1Body') },
    { label: t('pages.whyKidventure.story.n2Label'), title: t('pages.whyKidventure.story.n2Title'), body: t('pages.whyKidventure.story.n2Body') },
    { label: t('pages.whyKidventure.story.n3Label'), title: t('pages.whyKidventure.story.n3Title'), body: t('pages.whyKidventure.story.n3Body') },
    { label: t('pages.whyKidventure.story.n4Label'), title: t('pages.whyKidventure.story.n4Title'), body: t('pages.whyKidventure.story.n4Body') },
  ];

  const dotIcons = ['Lightbulb', 'Rocket', 'Heart', 'Star'];

  return (
    <section className="wk-story" id="story">
      <div className="wk-story-inner">
        <div className="wk-story-head">
          <div className="wk-story-head-text">
            <h2 className="wk-story-question">
              {t('pages.whyKidventure.story.question')}
              &nbsp;<em>{t('pages.whyKidventure.story.questionEm')}</em>
            </h2>
            <p className="wk-sec-lead">{t('pages.whyKidventure.story.sub')}</p>
          </div>
          <div className="wk-story-head-visual">
            <div className="wk-story-head-ring" aria-hidden="true" />
            <div className="wk-story-head-mediabox">
              <img
                src="src/assets/whykidventure/image9.png"
                alt="Why we built Kidventure"
                style={{
                  width: '99%', height: '90%',
                  display: 'block', borderRadius: '50%', objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>

        <div className="wk-story-timeline">
          {nodes.map((node, i) => (
            <div key={i} className="wk-story-node">
              <div className="wk-story-node-dot">
                <Icon name={dotIcons[i]} size={12} />
              </div>
              <div className="wk-story-node-content">
                <div className="wk-story-node-label">{node.label}</div>
                <div className="wk-story-node-title">{node.title}</div>
                <div className="wk-story-node-body">{node.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="wk-story-cta">
          <h3 className="wk-story-cta-title">{t('pages.whyKidventure.story.ctaTitle')}</h3>
          <div className="wk-story-cta-btns">
            <button
              className="wk-story-btn-primary"
              onClick={() => navigate('/download')}
              type="button"
            >
              <Download size={16} aria-hidden="true" />
              {t('common.download')}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
            <button
              className="wk-story-btn-secondary"
              onClick={() => navigate('/parent-dashboard')}
              type="button"
            >
              <LayoutDashboard size={16} aria-hidden="true" />
              {t('pages.home.parentsCta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
const TOTAL = 7;

export default function WhyKidventure({ theme = 'dark', isLoggedIn = false }) {
  const { t }    = useTranslation();
  const navigate = useNavigate();

  const [page,      setPage]      = useState(0);
  const [opened,    setOpened]    = useState(false);
  const [flipping,  setFlipping]  = useState(false);
  const [direction, setDirection] = useState('forward');
  const pending = useRef(null);

  const go = useCallback((idx, dir) => {
    if (flipping || idx < 0 || idx >= TOTAL || idx === page) return;
    pending.current = idx;
    setDirection(dir);
    setFlipping(true);
  }, [flipping, page]);

  const onDone = useCallback(() => {
    if (pending.current !== null) { setPage(pending.current); pending.current = null; }
    setFlipping(false);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(page + 1, 'forward');
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(page - 1, 'backward');
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [go, page]);

  const next    = useCallback(() => go(page + 1, 'forward'),  [go, page]);
  const prev    = useCallback(() => go(page - 1, 'backward'), [go, page]);
  const onOpen  = useCallback(() => { setOpened(true); go(1, 'forward'); }, [go]);
  const display = flipping ? (pending.current ?? page) : page;

  const pages = [
    <PageCover      key={0} t={t} onOpen={onOpen} />,
    <PageProblem    key={1} t={t} />,
    <PageBigIdea    key={2} t={t} />,
    <PagePhilosophy key={3} t={t} />,
    <PageInsideApp  key={4} t={t} />,
    <PageParents    key={5} t={t} navigate={navigate} />,
    <PageVision     key={6} t={t} navigate={navigate} isLoggedIn={isLoggedIn} />,
  ];

  return (
    <section className="wk-scene" data-theme={theme}>

      <div className="wk-blobs" aria-hidden="true">
        <div className="wk-blob" /><div className="wk-blob" />
      </div>

      <div className="wk-bubbles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => <div key={i} className="wk-bubble" />)}
      </div>

      {/* ================================================================
          HEADER
          ✦ FIX 1: header tagline now uses t('brand.headerTagline')
          ✦ FIX 2: removed duplicate logo/brand from PageCover
          ================================================================ */}
      <header className="wk-header">
        <div className="wk-header-inner">
          <LogoEmblem size="lg" />
          <BrandName className="wk-brand-name--xl" />
        </div>
        {/* ✦ was hardcoded "Learning · Adventure · Wonder" */}
        <p className="wk-header-tagline">{t('brand.headerTagline')}</p>
      </header>

      <div className="wk-stage">
        <div className="wk-book">

          <div className="wk-book-back" aria-hidden="true" />

          <div className="wk-book-stack" aria-hidden="true">
            {[...Array(12)].map((_, i) => <div key={i} className="wk-stack-leaf" />)}
          </div>

          {/* ✦ FIX 3: spine text uses t('brand.name') */}
          <div className="wk-book-spine" aria-hidden="true">
            <div className="wk-spine-ornament"><Star size={8} /></div>
            <span className="wk-spine-text">{t('brand.name')}</span>
            <div className="wk-spine-ornament"><Star size={8} /></div>
          </div>

          <div className="wk-book-top" aria-hidden="true" />
          <div className="wk-book-btm" aria-hidden="true" />

          <div className="wk-book-face">
            <FlipEngine
              pages={pages}
              current={display}
              direction={direction}
              isFlipping={flipping}
              onDone={onDone}
            />

            {opened && (
              <nav className="wk-nav" aria-label="book navigation">
                <button
                  className="wk-nav-btn" type="button"
                  onClick={prev}
                  disabled={page <= 1 || flipping}
                  aria-label={t(PAGE_DATA.nav.prev)}
                >
                  <ChevronLeft size={12} />
                  {t(PAGE_DATA.nav.prev)}
                </button>

                <div className="wk-dots-wrap">
                  <div className="wk-dots" role="tablist">
                    {Array.from({ length: TOTAL }).map((_, i) => (
                      <button
                        key={i} role="tab" type="button"
                        className={`wk-dot${i === page ? ' wk-dot--on' : ''}`}
                        onClick={() => go(i, i > page ? 'forward' : 'backward')}
                        disabled={flipping}
                        aria-selected={i === page}
                        aria-label={`Page ${i + 1}`}
                      />
                    ))}
                  </div>
                  <span className="wk-dots-lbl">
                    {page}&nbsp;{t(PAGE_DATA.nav.pageOf)}&nbsp;{TOTAL - 1}
                  </span>
                </div>

                <button
                  className="wk-nav-btn" type="button"
                  onClick={next}
                  disabled={page >= TOTAL - 1 || flipping}
                  aria-label={t(PAGE_DATA.nav.next)}
                >
                  {t(PAGE_DATA.nav.next)}
                  <ChevronRight size={12} />
                </button>
              </nav>
            )}
          </div>

        </div>
      </div>

      <div className="wk-section-divider" aria-hidden="true" />
      <SectionExperience t={t} />
      <div className="wk-section-divider" aria-hidden="true" />
      <SectionIntention t={t} />
      <div className="wk-section-divider" aria-hidden="true" />
      <SectionBelief t={t} />
      <div className="wk-section-divider" aria-hidden="true" />
      <SectionStory t={t} navigate={navigate} />

    </section>
  );
}