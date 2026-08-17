import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="kv-footer">
            <div className="kv-container">
                <div className="kv-footer-top">
                    <div className="kv-footer-brand">
                        <div className="kv-footer-name">{t('brand.name')}</div>
                        <div className="kv-footer-tagline">{t('footer.tagline')}</div>
                    </div>

                    <div className="kv-footer-links" aria-label="Footer links">
                        <Link to="/why-kidventure">{t('footer.links.why')}</Link>
                        <Link to="/pricing">{t('footer.links.pricing')}</Link>
                        <Link to="/parents/guide">{t('footer.links.parentGuide')}</Link>
                        <Link to="/support/faq">{t('footer.links.faq')}</Link>
                        <Link to="/download">{t('footer.links.download')}</Link>
                    </div>
                </div>

                <div className="kv-footer-bottom">
                    <div className="kv-footer-legal">
                        <Link to="/support/privacy">{t('footer.legal.privacy')}</Link>
                        <span className="kv-footer-sep">·</span>
                        <Link to="/support/terms">{t('footer.legal.terms')}</Link>
                    </div>

                    <div className="kv-footer-copy">{t('footer.copyrightSafe', { year })}</div>
                </div>
            </div>
        </footer>
    );
}
