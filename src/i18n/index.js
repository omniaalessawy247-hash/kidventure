import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = {
    en: { translation: en },
    ar: { translation: ar },
};

const applyDocumentLanguage = (lng) => {
    const lang = lng === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        parseMissingKeyHandler: (key) => {
            const lang = i18n.language === 'ar' ? 'ar' : 'en';
            const ns = 'translation';

            const aliases = [
                ['pages.auth.', 'auth.'],
                ['pages.support.', 'support.'],
                ['pages.dashboard.', 'dashboard.'],
                ['pages.download.', 'download.'],
                ['pages.why.', 'why.'],
                ['pages.pricing.', 'pricing.'],
                ['pages.parents.', 'parents.'],
                ['pages.notFound.', 'notFound.']
            ];

            for (const [prefix, replacement] of aliases) {
                if (!key.startsWith(prefix)) continue;
                const altKey = replacement + key.slice(prefix.length);
                const v = i18n.getResource(lang, ns, altKey);
                if (typeof v === 'string') return v;
            }

            return key;
        },
        detection: {
            order: ['localStorage'],
            caches: ['localStorage'],
            lookupLocalStorage: 'kidventure_lang',
        },
    });

i18n.on('languageChanged', (lng) => {
    applyDocumentLanguage(lng);
    try {
        localStorage.setItem('kidventure_lang', lng === 'ar' ? 'ar' : 'en');
    } catch {
        undefined;
    }
});

applyDocumentLanguage(i18n.language);

export default i18n;
