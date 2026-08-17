import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logoImg from '../../assets/navbar/logo.jpeg';
import './Navbar.css';

const isAuthed = () => {
  try {
    return localStorage.getItem('kidventure_auth') === 'true';
  } catch {
    return false;
  }
};

const getTheme = () => {
  try {
    const v = localStorage.getItem('kidventure_theme');
    return v === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

const setTheme = (theme) => {
  const normalized = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = normalized;
  try {
    localStorage.setItem('kidventure_theme', normalized);
  } catch {
    undefined;
  }
};

function NavItem({ to, children, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) => `kv-nav-link${isActive ? ' is-active' : ''}`}
    >
      {children}
    </NavLink>
  );
}

function Dropdown({ label, items, onNavigate }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onDocPointerDown = (e) => {
      const buttonEl = buttonRef.current;
      if (!buttonEl) return;
      const root = buttonEl.closest('.kv-dropdown');
      if (root && root.contains(e.target)) return;
      setOpen(false);
    };

    document.addEventListener('pointerdown', onDocPointerDown);
    return () => document.removeEventListener('pointerdown', onDocPointerDown);
  }, [open]);

  return (
    <div className={`kv-dropdown${open ? ' is-open' : ''}`}>
      <button
        ref={buttonRef}
        type="button"
        className="kv-nav-link kv-nav-button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{label}</span>
        <span className="kv-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      <div className="kv-dropdown-menu" role="menu" hidden={!open}>
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            role="menuitem"
            className="kv-dropdown-item"
            onClick={() => {
              onNavigate();
              setOpen(false);
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setThemeState] = useState(getTheme());
  const authed = isAuthed();

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const language = useMemo(() => (i18n.language === 'ar' ? 'ar' : 'en'), [i18n.language]);

  const setLanguage = (lng) => {
    const next = lng === 'ar' ? 'ar' : 'en';
    i18n.changeLanguage(next);
  };

  const onNavigate = () => setMobileOpen(false);

  const supportItems = [
    { to: '/support/help-safety', label: 'Help & Safety' },
    { to: '/support/contact', label: 'Contact Us' }
  ];

  const onLogout = () => {
    try {
      localStorage.removeItem('kidventure_auth');
    } catch {
      undefined;
    }
    navigate('/');
  };

  return (
    <header className="kv-header">
      <div className="kv-container">
        <nav className="kv-nav" aria-label="Primary">
          <div className="kv-nav-left">
            <Link to={authed ? '/dashboard' : '/'} className="kv-brand" onClick={onNavigate}>
              <img
                className="kv-brand-logo"
                src={logoImg}
                alt={`${t('brand.name')} logo`}
                loading="eager"
              />
              <span className="kv-brand-name">{t('brand.name')}</span>
            </Link>

            <div className="kv-nav-desktop" role="navigation">
              {!authed ? (
                <>
                  <NavItem to="/" onNavigate={onNavigate}>
                    {t('nav.home')}
                  </NavItem>
                  <NavItem to="/why-kidventure" onNavigate={onNavigate}>
                    {t('nav.why')}
                  </NavItem>
                  <NavItem to="/features" onNavigate={onNavigate}>
                    {t('nav.features')}
                  </NavItem>
                  <NavItem to="/pricing" onNavigate={onNavigate}>
                    {t('nav.pricing')}
                  </NavItem>
                  <NavItem to="/parents/guide" onNavigate={onNavigate}>
                    {t('nav.parentGuide')}
                  </NavItem>
                  <Dropdown label={t('nav.support')} items={supportItems} onNavigate={onNavigate} />
                </>
              ) : (
                <>
                  <NavItem to="/dashboard" onNavigate={onNavigate}>
                    {t('nav.dashboard')}
                  </NavItem>
                  <NavItem to="/dashboard/reports" onNavigate={onNavigate}>
                    {t('nav.reports')}
                  </NavItem>
                  <NavItem to="/dashboard/children" onNavigate={onNavigate}>
                    {t('nav.children')}
                  </NavItem>
                  <NavItem to="/dashboard/subscription" onNavigate={onNavigate}>
                    {t('nav.subscription')}
                  </NavItem>
                  <NavItem to="/dashboard/settings" onNavigate={onNavigate}>
                    {t('nav.settings')}
                  </NavItem>
                </>
              )}
            </div>
          </div>

          <div className="kv-nav-right">
            <div className="kv-toggles" aria-label="Preferences">
              <button
                type="button"
                className="kv-toggle"
                aria-label={t('common.langToggle')}
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              >
                {language === 'en' ? t('common.langEnShort') : t('common.langArShort')}
              </button>

              <button
                type="button"
                className="kv-toggle"
                aria-label={t('common.themeToggle')}
                onClick={() => setThemeState((v) => (v === 'dark' ? 'light' : 'dark'))}
              >
                {theme === 'dark' ? '◐' : '◑'}
              </button>
            </div>

            {!authed ? (
              <div className="kv-actions kv-nav-desktop">
                <Link to="/login" className="kv-nav-link" onClick={onNavigate}>
                  {t('common.login')}
                </Link>
                <Link to="/signup" className="kv-nav-link" onClick={onNavigate}>
                  {t('common.nav.signupLink')}
                </Link>
                <Link to="/download" className="kv-btn kv-btn-primary" onClick={onNavigate}>
                  {t('common.getTheApp')}
                </Link>
              </div>
            ) : (
              <div className="kv-actions kv-nav-desktop">
                <button type="button" className="kv-btn kv-btn-ghost" onClick={onLogout}>
                  {t('common.logout')}
                </button>
              </div>
            )}

            <button
              type="button"
              className="kv-mobile-toggle"
              aria-label={t('common.menuToggle')}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              ☰
            </button>
          </div>
        </nav>
      </div>

      <div className={`kv-mobile-panel${mobileOpen ? ' is-open' : ''}`}>
        <div className="kv-container">
          <div className="kv-mobile-links" aria-label="Mobile navigation">
            {!authed ? (
              <>
                <NavItem to="/" onNavigate={onNavigate}>
                  {t('nav.home')}
                </NavItem>
                <NavItem to="/why-kidventure" onNavigate={onNavigate}>
                  {t('nav.why')}
                </NavItem>
                <NavItem to="/features" onNavigate={onNavigate}>
                  {t('nav.features')}
                </NavItem>
                <NavItem to="/pricing" onNavigate={onNavigate}>
                  {t('nav.pricing')}
                </NavItem>
                <NavItem to="/parents/guide" onNavigate={onNavigate}>
                  {t('nav.parentGuide')}
                </NavItem>

                <div className="kv-mobile-group">
                  <div className="kv-mobile-group-title">{t('nav.support')}</div>
                  {supportItems.map((i) => (
                    <Link key={i.to} to={i.to} className="kv-mobile-sub" onClick={onNavigate}>
                      {i.label}
                    </Link>
                  ))}
                </div>

                <div className="kv-mobile-actions">
                  <Link to="/login" className="kv-nav-link" onClick={onNavigate}>
                    {t('common.login')}
                  </Link>
                  <Link to="/signup" className="kv-nav-link" onClick={onNavigate}>
                    {t('common.nav.signupLink')}
                  </Link>
                  <Link to="/download" className="kv-btn kv-btn-primary" onClick={onNavigate}>
                    {t('common.getTheApp')}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <NavItem to="/dashboard" onNavigate={onNavigate}>
                  {t('nav.dashboard')}
                </NavItem>
                <NavItem to="/dashboard/reports" onNavigate={onNavigate}>
                  {t('nav.reports')}
                </NavItem>
                <NavItem to="/dashboard/children" onNavigate={onNavigate}>
                  {t('nav.children')}
                </NavItem>
                <NavItem to="/dashboard/subscription" onNavigate={onNavigate}>
                  {t('nav.subscription')}
                </NavItem>
                <NavItem to="/dashboard/settings" onNavigate={onNavigate}>
                  {t('nav.settings')}
                </NavItem>

                <div className="kv-mobile-actions">
                  <button type="button" className="kv-btn kv-btn-ghost" onClick={onLogout}>
                    {t('common.logout')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}