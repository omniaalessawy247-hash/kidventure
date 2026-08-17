import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NotFound.css';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <section className="kv-page">
            <div className="kv-container nf-wrap">
                <h1 className="kv-h1">{t('pages.notFound.title')}</h1>
                <p className="kv-lead">{t('pages.notFound.lead')}</p>
                <Link to="/" className="kv-btn kv-btn-primary">{t('pages.notFound.backHome')}</Link>
            </div>
        </section>
    );
}
