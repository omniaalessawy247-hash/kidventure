import React, { useRef, useState, useEffect, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sparkles, Download, ArrowRight, ChevronRight, ChevronLeft,
  Check, X, Star, Zap, Heart, Users, Rocket,
  School, ChevronDown, ChevronUp, Globe, Tag, CheckCircle,
  Lock, CreditCard, Loader2, ShieldCheck, Building2,
  Phone, Mail, MessageSquare, Send
} from 'lucide-react';

import pricingBgImage     from '../../assets/common/image.png';
import pricingBgImageDark from '../../assets/common/image dark.png';
import './Pricing.css';

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   STRIPE CONFIG
━━━━━━━━━━━━━━━━━━━━━━━━ */
const STRIPE_PUBLIC_KEY    = import.meta.env.VITE_STRIPE_PUBLIC_KEY    || 'pk_test_REPLACE_WITH_YOUR_KEY';
const STRIPE_MONTHLY_PRICE = import.meta.env.VITE_STRIPE_MONTHLY_PRICE || 'price_REPLACE_MONTHLY';
const STRIPE_YEARLY_PRICE  = import.meta.env.VITE_STRIPE_YEARLY_PRICE  || 'price_REPLACE_YEARLY';

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   ERROR BOUNDARY
   ✅ FIX: يمسك أي crash في Stripe ويعرض fallback بدل ما يوقع الصفحة كلها
━━━━━━━━━━━━━━━━━━━━━━━━ */
class StripeErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || 'Unknown error' };
  }

  componentDidCatch(error, info) {
    console.error('[StripeErrorBoundary] caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="kv-pay-state" style={{ minHeight: 300 }}>
          <div className="kv-pay-state-icon" style={{ background: 'rgba(219,39,119,.14)', border: '2px solid rgba(219,39,119,.35)' }}>
            <X size={34} color="#F472B6" />
          </div>
          <h2 className="kv-pay-state-title">Something went wrong</h2>
          <p className="kv-pay-state-sub">
            There was an issue loading the payment form.<br />
            Please refresh the page and try again.
          </p>
          <button
            className="kv-pay-btn"
            style={{ background: 'linear-gradient(135deg,#7C3AED,#DB2777)', boxShadow: '0 10px 32px rgba(124,58,237,.44)' }}
            onClick={() => this.setState({ hasError: false, errorMessage: '' })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   REVEAL HOOK
━━━━━━━━━━━━━━━━━━━━━━━━ */
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

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   STATIC CONFIG
━━━━━━━━━━━━━━━━━━━━━━━━ */
const PLANS = [
  {
    key: 'free',
    c1: '#C2410C', c2: '#EA580C',
    Icon: Rocket,
    isPopular: false,
    isSchool: false,
    features: [
      { key: 'pages.pricing.plans.free.f1', included: true  },
      { key: 'pages.pricing.plans.free.f2', included: true  },
      { key: 'pages.pricing.plans.free.f3', included: true  },
      { key: 'pages.pricing.plans.free.f4', included: true  },
      { key: 'pages.pricing.plans.free.f5', included: true  },
      { key: 'pages.pricing.plans.free.f6', included: false },
      { key: 'pages.pricing.plans.free.f7', included: false },
      { key: 'pages.pricing.plans.free.f8', included: false },
      { key: 'pages.pricing.plans.free.f9', included: false },
    ],
  },
  {
    key: 'premium',
    c1: '#7C3AED', c2: '#DB2777',
    Icon: Sparkles,
    isPopular: true,
    isSchool: false,
    features: [
      { key: 'pages.pricing.plans.premium.f1', included: true },
      { key: 'pages.pricing.plans.premium.f2', included: true },
      { key: 'pages.pricing.plans.premium.f3', included: true },
      { key: 'pages.pricing.plans.premium.f4', included: true },
      { key: 'pages.pricing.plans.premium.f5', included: true },
      { key: 'pages.pricing.plans.premium.f6', included: true },
      { key: 'pages.pricing.plans.premium.f7', included: true },
      { key: 'pages.pricing.plans.premium.f8', included: true },
      { key: 'pages.pricing.plans.premium.f9', included: true },
    ],
  },
  {
    key: 'school',
    c1: '#047857', c2: '#059669',
    Icon: School,
    isPopular: false,
    isSchool: true,
    features: [
      { key: 'pages.pricing.plans.school.f1', included: true },
      { key: 'pages.pricing.plans.school.f2', included: true },
      { key: 'pages.pricing.plans.school.f3', included: true },
      { key: 'pages.pricing.plans.school.f4', included: true },
      { key: 'pages.pricing.plans.school.f5', included: true },
      { key: 'pages.pricing.plans.school.f6', included: true },
      { key: 'pages.pricing.plans.school.f7', included: true },
      { key: 'pages.pricing.plans.school.f8', included: true },
      { key: 'pages.pricing.plans.school.f9', included: true },
    ],
  },
];

const COMPARE_ROWS = [
  { fKey:'pages.pricing.compare.r1',  free:'pages.pricing.compare.r1_free',  premium:'pages.pricing.compare.r1_premium',  school:'pages.pricing.compare.r1_school'  },
  { fKey:'pages.pricing.compare.r2',  free:'pages.pricing.compare.r2_free',  premium:'pages.pricing.compare.r2_premium',  school:'pages.pricing.compare.r2_school'  },
  { fKey:'pages.pricing.compare.r3',  free:'pages.pricing.compare.r3_free',  premium:'pages.pricing.compare.r3_premium',  school:'pages.pricing.compare.r3_school'  },
  { fKey:'pages.pricing.compare.r4',  free:'pages.pricing.compare.r4_free',  premium:'pages.pricing.compare.r4_premium',  school:'pages.pricing.compare.r4_school'  },
  { fKey:'pages.pricing.compare.r5',  free:'pages.pricing.compare.r5_free',  premium:'pages.pricing.compare.r5_premium',  school:'pages.pricing.compare.r5_school'  },
  { fKey:'pages.pricing.compare.r6',  free:false, premium:true,  school:true  },
  { fKey:'pages.pricing.compare.r7',  free:false, premium:true,  school:true  },
  { fKey:'pages.pricing.compare.r8',  free:false, premium:true,  school:true  },
  { fKey:'pages.pricing.compare.r9',  free:false, premium:'pages.pricing.compare.r9_premium', school:'pages.pricing.compare.r9_school' },
  { fKey:'pages.pricing.compare.r10', free:false, premium:false, school:true  },
  { fKey:'pages.pricing.compare.r11', free:false, premium:false, school:'pages.pricing.compare.r11_school' },
];

const STEPS = [
  { numKey:'pages.pricing.how.n1', titleKey:'pages.pricing.how.t1', descKey:'pages.pricing.how.d1', Icon:Users,       c1:'#C2410C', c2:'#EA580C' },
  { numKey:'pages.pricing.how.n2', titleKey:'pages.pricing.how.t2', descKey:'pages.pricing.how.d2', Icon:Tag,         c1:'#7C3AED', c2:'#8B5CF6' },
  { numKey:'pages.pricing.how.n3', titleKey:'pages.pricing.how.t3', descKey:'pages.pricing.how.d3', Icon:CheckCircle, c1:'#DB2777', c2:'#EC4899' },
  { numKey:'pages.pricing.how.n4', titleKey:'pages.pricing.how.t4', descKey:'pages.pricing.how.d4', Icon:Rocket,      c1:'#047857', c2:'#059669' },
];

const TESTIMONIALS = [
  { textKey:'pages.pricing.test.t1', nameKey:'pages.pricing.test.n1', roleKey:'pages.pricing.test.r1', planKey:'pages.pricing.test.p1', planColor:'#7C3AED', avatar:'NE', avatarColor:'#7C3AED' },
  { textKey:'pages.pricing.test.t2', nameKey:'pages.pricing.test.n2', roleKey:'pages.pricing.test.r2', planKey:'pages.pricing.test.p2', planColor:'#047857', avatar:'AK', avatarColor:'#047857' },
  { textKey:'pages.pricing.test.t3', nameKey:'pages.pricing.test.n3', roleKey:'pages.pricing.test.r3', planKey:'pages.pricing.test.p3', planColor:'#7C3AED', avatar:'RM', avatarColor:'#DB2777' },
];

const FAQS = [
  { qKey:'pages.pricing.faq.q1', aKey:'pages.pricing.faq.a1' },
  { qKey:'pages.pricing.faq.q2', aKey:'pages.pricing.faq.a2' },
  { qKey:'pages.pricing.faq.q3', aKey:'pages.pricing.faq.a3' },
  { qKey:'pages.pricing.faq.q4', aKey:'pages.pricing.faq.a4' },
  { qKey:'pages.pricing.faq.q5', aKey:'pages.pricing.faq.a5' },
  { qKey:'pages.pricing.faq.q6', aKey:'pages.pricing.faq.a6' },
  { qKey:'pages.pricing.faq.q7', aKey:'pages.pricing.faq.a7' },
];

const STATS = [
  { valKey:'pages.pricing.stats.val1', lblKey:'pages.pricing.stats.lbl1', c:'#C2410C', Icon:Users    },
  { valKey:'pages.pricing.stats.val2', lblKey:'pages.pricing.stats.lbl2', c:'#7C3AED', Icon:Sparkles },
  { valKey:'pages.pricing.stats.val3', lblKey:'pages.pricing.stats.lbl3', c:'#DB2777', Icon:Heart    },
  { valKey:'pages.pricing.stats.val4', lblKey:'pages.pricing.stats.lbl4', c:'#047857', Icon:Zap      },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STRIPE CARD INNER
   ✅ FIX: كل كود Stripe منعزل في component منفصل
   محاط بـ try/catch في كل خطوة
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function StripeCardField({ onReady, onError }) {
  const [loading, setLoading] = useState(true);
  const [failed,  setFailed]  = useState(false);
  const cardRef    = useRef(null);
  const mountedRef = useRef(false);
  const elemRef    = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const initStripe = async () => {
      try {
        /* 1. تحميل سكريبت Stripe لو مش موجود */
        if (!window.Stripe) {
          await new Promise((resolve, reject) => {
            const existing = document.querySelector('script[src*="js.stripe.com"]');
            if (existing) { resolve(); return; }
            const s = document.createElement('script');
            s.src = 'https://js.stripe.com/v3/';
            s.onload = resolve;
            s.onerror = () => reject(new Error('Stripe script failed to load'));
            document.head.appendChild(s);
          });
        }

        if (cancelled) return;

        /* 2. التحقق من وجود Stripe بعد التحميل */
        if (!window.Stripe) {
          throw new Error('Stripe is not available (possibly blocked by an ad blocker)');
        }

        /* 3. إنشاء Stripe instance */
        const stripe   = window.Stripe(STRIPE_PUBLIC_KEY);
        const elements = stripe.elements();

        const card = elements.create('card', {
          style: {
            base: {
              color: '#F0EDFF',
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '16px',
              fontSmoothing: 'antialiased',
              '::placeholder': { color: '#4A4670' },
              iconColor: '#A78BFA',
            },
            invalid: { color: '#F472B6', iconColor: '#F472B6' },
          },
          hidePostalCode: true,
        });

        cardRef.current = card;

        /* 4. انتظار قليلاً عشان الـ DOM يكون جاهز */
        await new Promise(r => setTimeout(r, 200));

        if (cancelled) return;

        const el = document.getElementById('kv-stripe-card-mount');
        if (!el) throw new Error('Mount element not found');

        if (!mountedRef.current) {
          card.mount('#kv-stripe-card-mount');
          mountedRef.current = true;
        }

        if (!cancelled) {
          setLoading(false);
          onReady?.(stripe, card);
        }

      } catch (err) {
        console.error('[StripeCardField] error:', err);
        if (!cancelled) {
          setFailed(true);
          setLoading(false);
          onError?.(err);
        }
      }
    };

    initStripe();

    return () => {
      cancelled = true;
      if (cardRef.current && mountedRef.current) {
        try { cardRef.current.unmount(); } catch (_) {}
        mountedRef.current = false;
        cardRef.current    = null;
      }
    };
  }, []);

  if (failed) {
    return (
      <div className="kv-stripe-loading" style={{ color: '#F472B6', padding: '8px 0' }}>
        <X size={15} />
        <span>Payment form unavailable — please disable your ad blocker and refresh.</span>
      </div>
    );
  }

  return (
    <div className="kv-stripe-el" ref={elemRef}>
      {loading && (
        <div className="kv-stripe-loading">
          <Loader2 size={15} className="kv-spin" />
          <span>Loading secure payment form…</span>
        </div>
      )}
      <div
        id="kv-stripe-card-mount"
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAYMENT PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PaymentPageInner({ plan, isYearly, onBack }) {
  const c1        = plan?.c1       || '#7C3AED';
  const c2        = plan?.c2       || '#DB2777';
  const PlanIcon  = plan?.Icon     || Sparkles;
  const planKey   = plan?.key      || 'premium';
  const isPopular = plan?.isPopular ?? true;

  const [step,   setStep]   = useState('form');
  const [name,   setName]   = useState('');
  const [email,  setEmail]  = useState('');
  const [errors, setErrors] = useState({});

  /* ✅ FIX: stripe و card يتخزنوا في state بدل ref
     عشان لو StripeCardField راح يعيد رندر مش يضيع */
  const [stripeInstance, setStripeInstance] = useState(null);
  const [stripeReady,    setStripeReady]    = useState(false);
  const [stripeError,    setStripeError]    = useState(null);

  /* ✅ نفس كود scroll lock */
  useEffect(() => {
    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top      = `-${scrollY}px`;
    document.body.style.width    = '100%';

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top      = '';
      document.body.style.width    = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const price = isYearly ? 449 : 49;

  const validate = () => {
    const e = {};
    if (!name.trim())                                      e.name  = 'Full name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))    e.email = 'Valid email is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handlePay = async () => {
    if (!validate()) return;
    setStep('processing');
    try {
      await new Promise(r => setTimeout(r, 2400));
      setStep('success');
    } catch (err) {
      console.error('[Payment]', err);
      setStep('error');
    }
  };

  const included = [
    'Unlimited interactive stories',
    'All 20+ educational games',
    'AI Chatbot tutor — no limits',
    'Parental monitoring dashboard',
    '3D model explorer & mind maps',
    'Weekly progress reports',
  ];

  return (
    <div className="kv-pay-page">
      <button className="kv-pay-back" onClick={onBack}>
        <ChevronLeft size={16} /> Back to plans
      </button>

      <div className="kv-pay-wrap">

        {/* ── LEFT: Order Summary ── */}
        <div className="kv-pay-summary">
          <div className="kv-pay-summary-inner">
            <div className="kv-pay-brand">
              <div className="kv-pay-brand-icon" style={{ background:`linear-gradient(135deg,${c1},${c2})`, boxShadow:`0 8px 24px ${c1}55` }}>
                <PlanIcon size={22} color="#fff" strokeWidth={1.8} />
              </div>
              <div>
                <div className="kv-pay-brand-name">Kidventure</div>
                <div className="kv-pay-brand-sub">Adventurer Plan</div>
              </div>
            </div>

            <div className="kv-pay-price-block" style={{ borderColor:`${c1}33` }}>
              <div className="kv-pay-price-label">Total due today</div>
              {planKey === 'premium' ? (
                <>
                  <div className="kv-pay-price-free-label" style={{ color: c1 }}>EGP 0.00</div>
                  <div className="kv-pay-price-note">7-day free trial, then</div>
                  <div className="kv-pay-price-main" style={{ color: c1 }}>
                    EGP {price} <span>/ {isYearly ? 'year' : 'month'}</span>
                  </div>
                </>
              ) : (
                <div className="kv-pay-price-main" style={{ color: c1 }}>
                  EGP {price} <span>/ {isYearly ? 'year' : 'month'}</span>
                </div>
              )}
              {isYearly && (
                <div className="kv-pay-price-save">You save 92 EGP vs monthly billing</div>
              )}
            </div>

            <div className="kv-pay-features">
              <div className="kv-pay-features-title">What's included</div>
              {included.map((f, i) => (
                <div key={i} className="kv-pay-feature-item">
                  <div className="kv-pay-feature-check" style={{ background:`linear-gradient(135deg,${c1},${c2})` }}>
                    <Check size={10} color="#fff" strokeWidth={3} />
                  </div>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="kv-pay-trust-list">
              <div className="kv-pay-trust-item"><ShieldCheck size={13} style={{ color: c1 }} /><span>Cancel anytime, no penalties</span></div>
              <div className="kv-pay-trust-item"><Lock size={13} style={{ color: c1 }} /><span>256-bit SSL encryption</span></div>
              <div className="kv-pay-trust-item"><CreditCard size={13} style={{ color: c1 }} /><span>Secured by Stripe</span></div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form / States ── */}
        <div className="kv-pay-form-col">

          {step === 'form' && (
            <div className="kv-pay-form">
              <h1 className="kv-pay-title">Complete your subscription</h1>
              <p className="kv-pay-subtitle">
                {planKey === 'premium'
                  ? 'Start your 7-day free trial. No charge today.'
                  : 'Secure payment powered by Stripe'}
              </p>

              <div className="kv-pay-section-label">Account details</div>
              <div className="kv-pay-row-2">
                <div className="kv-pay-field">
                  <label htmlFor="kv-pay-name">Full Name</label>
                  <input
                    id="kv-pay-name" type="text" autoComplete="name"
                    className={`kv-pay-input${errors.name ? ' error' : ''}`}
                    placeholder="Ahmed Mohamed"
                    value={name}
                    onChange={e => { setName(e.target.value); setErrors(p => ({...p, name:''})); }}
                  />
                  {errors.name && <span className="kv-pay-field-err">{errors.name}</span>}
                </div>
                <div className="kv-pay-field">
                  <label htmlFor="kv-pay-email">Email Address</label>
                  <input
                    id="kv-pay-email" type="email" autoComplete="email"
                    className={`kv-pay-input${errors.email ? ' error' : ''}`}
                    placeholder="ahmed@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email:''})); }}
                  />
                  {errors.email && <span className="kv-pay-field-err">{errors.email}</span>}
                </div>
              </div>

              <div className="kv-pay-section-label" style={{ marginTop: 6 }}>Payment details</div>
              <div className="kv-pay-field">
                <label>Card details</label>
                {/* ✅ FIX: StripeCardField في Error Boundary منفصلة */}
                <StripeErrorBoundary>
                  <StripeCardField
                    onReady={(stripe, card) => {
                      setStripeInstance({ stripe, card });
                      setStripeReady(true);
                      setStripeError(null);
                    }}
                    onError={(err) => {
                      setStripeError(err?.message || 'Failed to load payment form');
                      setStripeReady(false);
                    }}
                  />
                </StripeErrorBoundary>
                {stripeError && (
                  <span className="kv-pay-field-err" style={{ marginTop: 4 }}>
                    ⚠ {stripeError}
                  </span>
                )}
                <div className="kv-stripe-secure">
                  <Lock size={10} /> 256-bit SSL · Secured by Stripe
                </div>
              </div>

              {planKey === 'premium' && (
                <div className="kv-pay-trial-note" style={{ borderColor:`${c1}33`, background:`${c1}0D` }}>
                  <ShieldCheck size={15} style={{ color: c1, flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: c1 }}>7-day free trial</strong>
                    <span style={{ color: 'var(--t3)' }}> — You won't be charged until your trial ends. Cancel anytime.</span>
                  </div>
                </div>
              )}

              <button
                type="button"
                className="kv-pay-btn"
                style={{
                  background: isPopular
                    ? 'linear-gradient(270deg,#C2410C,#7C3AED,#DB2777,#C2410C)'
                    : `linear-gradient(135deg,${c1},${c2})`,
                  backgroundSize: '300% 300%',
                  boxShadow: `0 10px 32px ${c1}55`,
                }}
                onClick={handlePay}
              >
                <CreditCard size={17} />
                {planKey === 'premium' ? 'Start Free Trial — No Charge Today' : `Pay EGP ${price}`}
                <ArrowRight size={16} />
              </button>

              <div className="kv-pay-cards-row">
                <span>We accept</span>
                {['Visa', 'MC', 'Amex'].map(c => (
                  <div key={c} className="kv-pay-card-badge">{c}</div>
                ))}
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="kv-pay-state">
              <div className="kv-pay-state-icon" style={{ background:`${c1}1A`, border:`2px solid ${c1}44` }}>
                <Loader2 size={34} style={{ color: c1 }} className="kv-spin" />
              </div>
              <h2 className="kv-pay-state-title">Processing your payment…</h2>
              <p className="kv-pay-state-sub">Please wait and don't close this window.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="kv-pay-state">
              <div className="kv-pay-state-icon" style={{ background:'rgba(4,120,87,.14)', border:'2px solid rgba(4,120,87,.35)' }}>
                <CheckCircle size={38} color="#34D399" />
              </div>
              <h2 className="kv-pay-state-title">You're all set!</h2>
              <p className="kv-pay-state-sub">
                Your <strong>Adventurer</strong> subscription is now active.<br />
                A confirmation has been sent to <strong>{email}</strong>.
              </p>
              <button
                className="kv-pay-btn"
                style={{ background:`linear-gradient(135deg,${c1},${c2})`, boxShadow:`0 10px 32px ${c1}44` }}
                onClick={onBack}
              >
                Start Learning <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 'error' && (
            <div className="kv-pay-state">
              <div className="kv-pay-state-icon" style={{ background:'rgba(219,39,119,.14)', border:'2px solid rgba(219,39,119,.35)' }}>
                <X size={34} color="#F472B6" />
              </div>
              <h2 className="kv-pay-state-title">Payment failed</h2>
              <p className="kv-pay-state-sub">
                Please check your card details or try a different card.<br />
                If the issue persists, contact your bank.
              </p>
              <button
                className="kv-pay-btn"
                style={{ background:`linear-gradient(135deg,${c1},${c2})`, boxShadow:`0 10px 32px ${c1}44` }}
                onClick={() => setStep('form')}
              >
                Try Again
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ✅ FIX: PaymentPage مغلفة بـ Error Boundary إضافية */
function PaymentPage(props) {
  return (
    <StripeErrorBoundary>
      <PaymentPageInner {...props} />
    </StripeErrorBoundary>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCHOOL CONTACT PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SchoolContactPage({ onBack }) {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({ name:'', email:'', school:'', phone:'', students:'', message:'' });
  const [errors, setErrors]   = useState({});

  const c1 = '#047857', c2 = '#059669';

  useEffect(() => {
    const scrollY    = window.scrollY;
    const prevOver   = document.body.style.overflow;
    const prevPos    = document.body.style.position;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top      = `-${scrollY}px`;
    document.body.style.width    = '100%';

    return () => {
      document.body.style.overflow = prevOver;
      document.body.style.position = prevPos;
      document.body.style.top      = '';
      document.body.style.width    = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const set = k => e => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                                       e.name   = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email  = 'Valid email required';
    if (!form.school.trim())                                     e.school = 'Required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSent(true);
  };

  const feats = [
    { Icon: Users,       text: 'Bulk student accounts — unlimited seats' },
    { Icon: Building2,   text: 'Teacher & admin panel with class analytics' },
    { Icon: ShieldCheck, text: 'SLA guarantee & data compliance (COPPA, GDPR)' },
    { Icon: Sparkles,    text: 'Custom branding & curriculum-aligned content' },
    { Icon: Zap,         text: 'Priority 24/7 dedicated support' },
    { Icon: CheckCircle, text: 'Free onboarding & staff training session' },
  ];

  return (
    <div className="kv-school-page">
      <button className="kv-pay-back" onClick={onBack}>
        <ChevronLeft size={16} /> Back to plans
      </button>

      <div className="kv-school-wrap">
        <div className="kv-school-info">
          <div className="kv-school-brand">
            <div className="kv-school-icon" style={{ background:`linear-gradient(135deg,${c1},${c2})`, boxShadow:`0 8px 24px ${c1}55` }}>
              <School size={24} color="#fff" strokeWidth={1.8} />
            </div>
            <div>
              <div className="kv-school-brand-name">Kidventure School</div>
              <div className="kv-school-brand-sub">Enterprise Plan</div>
            </div>
          </div>

          <h1 className="kv-school-h">Bring AI learning to your entire school</h1>
          <p className="kv-school-p">Our team will build a custom proposal for your school within 48 hours, tailored to your student count and curriculum requirements.</p>

          <div className="kv-school-features">
            {feats.map(({ Icon, text }, i) => (
              <div key={i} className="kv-school-feat">
                <div className="kv-school-feat-icon" style={{ background:`${c1}18` }}>
                  <Icon size={15} style={{ color: c1 }} />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="kv-school-contact-info">
            <div className="kv-school-contact-item"><Mail size={14} style={{ color: c1 }} /><span>schools@kidventure.app</span></div>
            <div className="kv-school-contact-item"><Phone size={14} style={{ color: c1 }} /><span>+20 (0) 100 000 0000</span></div>
            <div className="kv-school-contact-item"><MessageSquare size={14} style={{ color: c1 }} /><span>Response within 24–48 hours</span></div>
          </div>
        </div>

        <div className="kv-school-form-col">
          {!sent ? (
            <div className="kv-school-form">
              <h2 className="kv-school-form-title">Request a Custom Quote</h2>
              <p className="kv-school-form-sub">Fill in the details below and we'll send you a tailored proposal within 48 hours.</p>

              <div className="kv-pay-row-2">
                <div className="kv-pay-field">
                  <label>Your Full Name *</label>
                  <input type="text" className={`kv-pay-input${errors.name ? ' error' : ''}`} placeholder="Dr. Ahmed Hassan" value={form.name} onChange={set('name')} />
                  {errors.name && <span className="kv-pay-field-err">{errors.name}</span>}
                </div>
                <div className="kv-pay-field">
                  <label>Work Email *</label>
                  <input type="email" className={`kv-pay-input${errors.email ? ' error' : ''}`} placeholder="ahmed@school.edu.eg" value={form.email} onChange={set('email')} />
                  {errors.email && <span className="kv-pay-field-err">{errors.email}</span>}
                </div>
              </div>

              <div className="kv-pay-row-2">
                <div className="kv-pay-field">
                  <label>School Name *</label>
                  <input type="text" className={`kv-pay-input${errors.school ? ' error' : ''}`} placeholder="Al-Azhar Primary School" value={form.school} onChange={set('school')} />
                  {errors.school && <span className="kv-pay-field-err">{errors.school}</span>}
                </div>
                <div className="kv-pay-field">
                  <label>Phone Number</label>
                  <input type="tel" className="kv-pay-input" placeholder="+20 100 000 0000" value={form.phone} onChange={set('phone')} />
                </div>
              </div>

              <div className="kv-pay-field">
                <label>Number of Students</label>
                <select className="kv-pay-input kv-pay-select" value={form.students} onChange={set('students')}>
                  <option value="">Select range…</option>
                  <option value="under50">Under 50</option>
                  <option value="50-150">50 – 150</option>
                  <option value="150-500">150 – 500</option>
                  <option value="500-1000">500 – 1,000</option>
                  <option value="over1000">Over 1,000</option>
                </select>
              </div>

              <div className="kv-pay-field">
                <label>Additional Message</label>
                <textarea
                  className="kv-pay-input kv-pay-textarea"
                  placeholder="Tell us about your school, specific needs, or any questions…"
                  rows={4}
                  value={form.message}
                  onChange={set('message')}
                />
              </div>

              <button
                type="button"
                className="kv-pay-btn"
                style={{ background:`linear-gradient(135deg,${c1},${c2})`, boxShadow:`0 10px 32px ${c1}55` }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? <><Loader2 size={17} className="kv-spin" /> Sending…</>
                  : <><Send size={17} /> Send Request <ArrowRight size={16} /></>}
              </button>
            </div>
          ) : (
            <div className="kv-pay-state">
              <div className="kv-pay-state-icon" style={{ background:'rgba(4,120,87,.14)', border:'2px solid rgba(4,120,87,.35)' }}>
                <CheckCircle size={38} color="#34D399" />
              </div>
              <h2 className="kv-pay-state-title">Request sent!</h2>
              <p className="kv-pay-state-sub">
                Thank you, <strong>{form.name}</strong>.<br />
                Our school team will contact <strong>{form.email}</strong> within 48 hours.
              </p>
              <button
                className="kv-pay-btn"
                style={{ background:`linear-gradient(135deg,${c1},${c2})`, boxShadow:`0 10px 32px ${c1}44` }}
                onClick={onBack}
              >
                Back to Pricing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   SUB-COMPONENTS
━━━━━━━━━━━━━━━━━━━━━━━━ */
function FaqItem({ qKey, aKey, idx, t }) {
  const [open, setOpen] = useState(false);
  const colors = ['#C2410C','#7C3AED','#0369A1','#047857','#DB2777','#B45309','#BE123C'];
  const c = colors[idx % colors.length];
  return (
    <div className={`pp-faq-item ${open ? 'pp-faq-open' : ''}`} style={{ '--cc': c }}>
      <button type="button" className="pp-faq-btn" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="pp-faq-q">{t(qKey)}</span>
        <span className="pp-faq-arrow">{open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}</span>
      </button>
      <div className={`pp-faq-ans ${open ? 'pp-faq-ans-open' : ''}`}>
        <div className="pp-faq-ans-inner"><p>{t(aKey)}</p></div>
      </div>
    </div>
  );
}

function PlanCard({ plan, isYearly, idx, vis, t, onAction }) {
  const { c1, c2, Icon, key, isPopular, isSchool } = plan;
  const price = isSchool ? null : key === 'free' ? '0' : isYearly ? '37' : '49';

  return (
    <div
      className={`pp-card kv-anim-u ${vis ? 'kv-in' : ''} ${isPopular ? 'pp-card-popular' : ''} ${isSchool ? 'pp-card-school' : ''}`}
      style={{ '--cc': c1, transitionDelay: `${idx * 0.09}s` }}
    >
      <div className="pp-card-blob" style={{ background:`radial-gradient(ellipse,${c1}66,${c2}44,transparent)` }} />
      {isPopular && (
        <div className="pp-popular-badge">
          <Star size={9} fill="currentColor" />
          {t('pages.pricing.plans.premium.badge')}
        </div>
      )}
      <div className="pp-card-top" style={{ paddingTop: isPopular ? '30px' : '0' }}>
        <div className="pp-card-icon" style={{ background:`linear-gradient(135deg,${c1},${c2})`, boxShadow:`0 6px 20px ${c1}55` }}>
          <Icon size={20} color="#fff" strokeWidth={1.8} />
        </div>
        <div>
          <div className="pp-card-name">{t(`pages.pricing.plans.${key}.name`)}</div>
          <div className="pp-card-tagline">{t(`pages.pricing.plans.${key}.tagline`)}</div>
        </div>
        {isSchool ? (
          <div>
            <div className="pp-price-free" style={{ color: c1 }}>{t('pages.pricing.plans.school.priceLabel')}</div>
            <div className="pp-price-yearly">{t('pages.pricing.plans.school.priceNote')}</div>
          </div>
        ) : (
          <div>
            <div className="pp-price-row">
              {key !== 'free' && <span className="pp-price-currency" style={{ color: c1 }}>EGP</span>}
              <span className="pp-price-amount">{price}</span>
              {key !== 'free' && <span className="pp-price-period">{t('pages.pricing.plans.premium.pricePeriod')}</span>}
            </div>
            {key === 'free' && <div className="pp-price-period">{t('pages.pricing.plans.free.pricePeriod')}</div>}
            {key === 'premium' && isYearly && (
              <div className="pp-price-yearly">
                {t('pages.pricing.plans.premium.yearlyNote')}{' '}
                <span className="pp-price-save">🎉 {t('pages.pricing.toggle.savePill')}</span>
              </div>
            )}
            {key === 'premium' && !isYearly && (
              <div className="pp-price-yearly" style={{ color: c1, opacity: .75 }}>
                {t('pages.pricing.toggle.saveLabel')} ↗
              </div>
            )}
          </div>
        )}
      </div>
      <ul className="pp-feat-list">
        {plan.features.map((f, i) => (
          <li key={i} className={`pp-feat-item ${!f.included ? 'pp-feat-missing' : ''}`}>
            {f.included ? (
              <div className="pp-feat-check" style={{ background:`linear-gradient(135deg,${c1},${c2})` }}>
                <Check size={10} color="#fff" strokeWidth={3} />
              </div>
            ) : (
              <div className="pp-feat-cross">
                <X size={10} color="currentColor" strokeWidth={2.5} style={{ opacity: 0.28 }} />
              </div>
            )}
            <span>{t(f.key)}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`pp-card-btn ${isPopular ? 'pp-btn-gradient pp-btn-ring' : isSchool ? 'pp-btn-green' : 'pp-btn-outline'}`}
        onClick={() => onAction(key)}
      >
        {isSchool ? <Users size={14} /> : isPopular ? <Sparkles size={14} /> : <Rocket size={14} />}
        <span>{t(`pages.pricing.plans.${key}.cta`)}</span>
        <ArrowRight size={13} />
      </button>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE CONTROLLER
━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function PricingPage() {
  const { t, i18n } = useTranslation();
  const navigate    = useNavigate();
  const isRTL = i18n.dir?.() === 'rtl' || i18n.language === 'ar';
  const Arr   = isRTL ? ChevronLeft : ChevronRight;

  const [isYearly, setIsYearly] = useState(false);

  const [showPayment,    setShowPayment]    = useState(false);
  const [showSchool,     setShowSchool]     = useState(false);
  const [paymentPlanKey, setPaymentPlanKey] = useState(null);

  const handleAction = (planKey) => {
    if (planKey === 'free') {
      navigate('/signup');
      return;
    }
    if (planKey === 'school') {
      setShowSchool(true);
      return;
    }
    setPaymentPlanKey(planKey);
    setShowPayment(true);
  };

  const [heroRef,  heroVis]  = useReveal(0.02);
  const [cardsRef, cardsVis] = useReveal(0.06);
  const [cmpRef,   cmpVis]   = useReveal(0.06);
  const [howRef,   howVis]   = useReveal(0.06);
  const [statsRef, statsVis] = useReveal(0.06);
  const [testRef,  testVis]  = useReveal(0.06);
  const [faqRef,   faqVis]   = useReveal(0.06);
  const [ctaRef,   ctaVis]   = useReveal(0.06);

  /* ── Render School Page ── */
  if (showSchool) {
    return (
      <div className="pp" dir={isRTL ? 'rtl' : 'ltr'}>
        <SchoolContactPage onBack={() => setShowSchool(false)} />
      </div>
    );
  }

  /* ── Render Payment Page ── */
  if (showPayment && paymentPlanKey) {
    const plan = PLANS.find(p => p.key === paymentPlanKey);
    return (
      <div className="pp" dir={isRTL ? 'rtl' : 'ltr'}>
        <PaymentPage
          plan={plan}
          isYearly={isYearly}
          onBack={() => {
            setShowPayment(false);
            setPaymentPlanKey(null);
          }}
        />
      </div>
    );
  }

  /* ── Render Main Pricing ── */
  return (
    <div className="pp" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ════ HERO ════ */}
      <section className="pp-hero">
        <div className="pp-hero-bg-image pp-hero-bg-light" style={{ backgroundImage:`url(${pricingBgImage})` }} aria-hidden="true" />
        <div className="pp-hero-bg-image pp-hero-bg-dark"  style={{ backgroundImage:`url(${pricingBgImageDark})` }} aria-hidden="true" />
        <div className="pp-hero-overlay" aria-hidden="true" />
        <div className="pp-hero-lines"   aria-hidden="true" />
        <div className="pp-hero-dots"    aria-hidden="true" />
        <div className="pp-hero-orb pp-ho-1" aria-hidden="true" />
        <div className="pp-hero-orb pp-ho-2" aria-hidden="true" />
        <div className="pp-hero-orb pp-ho-3" aria-hidden="true" />
        <div className="pp-hero-ring pp-hr-1" aria-hidden="true" />
        <div className="pp-hero-ring pp-hr-2" aria-hidden="true" />
        <div className="pp-hero-ring pp-hr-3" aria-hidden="true" />
        <div className="pp-hero-ring pp-hr-4" aria-hidden="true" />
        <div className="pp-wrap">
          <div ref={heroRef} className="pp-hero-inner">
            <div className="pp-eyebrow">
              <span className="pp-eyebrow-dot" /><Tag size={11} />
              <span>{t('pages.pricing.hero.eyebrow')}</span>
            </div>
            <h1 className="pp-hero-h">
              {t('pages.pricing.hero.titleA')}{' '}
              <span className="pp-hero-h-grad">{t('pages.pricing.hero.titleB')}</span>
            </h1>
            <p className="pp-hero-p">{t('pages.pricing.hero.desc')}</p>
            <div className="pp-toggle-wrap">
              <span className="pp-toggle-label">{t('pages.pricing.toggle.monthly')}</span>
              <div className="pp-toggle" role="group" aria-label="Billing period">
                <button type="button" className={`pp-toggle-btn ${!isYearly ? 'active' : ''}`} onClick={() => setIsYearly(false)}>
                  {t('pages.pricing.toggle.monthly')}
                </button>
                <button type="button" className={`pp-toggle-btn ${isYearly ? 'active' : ''}`} onClick={() => setIsYearly(true)}>
                  {t('pages.pricing.toggle.yearly')}
                </button>
              </div>
              {isYearly && (
                <div className="pp-save-pill">
                  <span className="pp-save-dot" />
                  {t('pages.pricing.toggle.saveLabel')}
                </div>
              )}
            </div>
            <div className="pp-currency-badge"><Globe size={12} />{t('pages.pricing.hero.currency')}</div>
          </div>
        </div>
      </section>

      {/* ════ PLAN CARDS ════ */}
      <section className="pp-cards-section">
        <div className="pp-cards-bg" aria-hidden="true">
          <div className="pp-cb-1" /><div className="pp-cb-2" /><div className="pp-cb-3" />
        </div>
        <div className="pp-wrap">
          <div ref={cardsRef} className="pp-cards-grid">
            {PLANS.map((plan, idx) => (
              <PlanCard key={plan.key} plan={plan} isYearly={isYearly} idx={idx} vis={cardsVis} t={t} onAction={handleAction} />
            ))}
          </div>
        </div>
      </section>

      {/* ════ STATS BAR ════ */}
      <section className="pp-stats-bar">
        <div className="pp-wrap">
          <div ref={statsRef} className={`pp-stats-inner kv-anim-u ${statsVis ? 'kv-in' : ''}`}>
            {STATS.map((s, i) => (
              <div key={i} className="pp-stat-item" style={{ transitionDelay:`${i*.07}s` }}>
                <div style={{ color:s.c, marginBottom:4 }}><s.Icon size={20} /></div>
                <div className="pp-stat-val" style={{ color:s.c }}>{t(s.valKey)}</div>
                <div className="pp-stat-lbl">{t(s.lblKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ COMPARISON TABLE ════ */}
      <section className="pp-compare-section">
        <div className="pp-compare-orb pp-co-1" /><div className="pp-compare-orb pp-co-2" />
        <div className="pp-wrap">
          <div ref={cmpRef} className={`pp-section-head kv-anim-u ${cmpVis ? 'kv-in' : ''}`}>
            <div className="pp-section-label"><Sparkles size={12} />{t('pages.pricing.compare.eyebrow')}</div>
            <h2 className="pp-section-h">{t('pages.pricing.compare.titleA')} <span className="pp-grad-mark">{t('pages.pricing.compare.titleB')}</span></h2>
            <p className="pp-section-sub">{t('pages.pricing.compare.sub')}</p>
          </div>
          <div className={`kv-anim-u ${cmpVis ? 'kv-in' : ''}`} style={{ transitionDelay:'.13s' }}>
            <div className="pp-table-wrap">
              <table className="pp-table">
                <thead>
                  <tr>
                    <th>{t('pages.pricing.compare.featureCol')}</th>
                    {PLANS.map(plan => (
                      <th key={plan.key} className={plan.isPopular ? 'pp-th-popular-col pp-th-popular' : ''}>
                        <div className="pp-th-icon" style={{ background:`linear-gradient(135deg,${plan.c1},${plan.c2})` }}>
                          <plan.Icon size={14} color="#fff" strokeWidth={1.8} />
                        </div>
                        {t(`pages.pricing.plans.${plan.key}.name`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, i) => (
                    <tr key={i}>
                      <td>{t(row.fKey)}</td>
                      {PLANS.map(plan => {
                        const val = row[plan.key];
                        return (
                          <td key={plan.key} className={plan.isPopular ? 'pp-td-popular-col' : ''}>
                            {val === true  ? <Check className="pp-td-check" size={16} strokeWidth={3} /> :
                             val === false ? <X className="pp-td-cross" size={15} strokeWidth={2.5} /> :
                             <span className={plan.isPopular ? 'pp-td-text-popular' : ''}>{t(val)}</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ════ HOW IT WORKS ════ */}
      <section className="pp-how-section">
        <div className="pp-how-orb" aria-hidden="true" />
        <div className="pp-wrap">
          <div ref={howRef} className={`pp-section-head kv-anim-u ${howVis ? 'kv-in' : ''}`}>
            <div className="pp-section-label"><Zap size={12} />{t('pages.pricing.how.eyebrow')}</div>
            <h2 className="pp-section-h">{t('pages.pricing.how.titleA')} <span className="pp-grad-mark">{t('pages.pricing.how.titleB')}</span></h2>
            <p className="pp-section-sub">{t('pages.pricing.how.sub')}</p>
          </div>
          <div className={`pp-how-grid kv-anim-u ${howVis ? 'kv-in' : ''}`} style={{ transitionDelay:'.1s' }}>
            {STEPS.map((step, i) => (
              <div key={i} className="pp-step-card" style={{ '--sc':step.c1, transitionDelay:`${i*.07}s`, animationDelay:`${i*.1}s` }}>
                <div className="pp-step-num" style={{ background:`linear-gradient(135deg,${step.c1},${step.c2})` }}>{t(step.numKey)}</div>
                <div className="pp-step-icon" style={{ background:`linear-gradient(135deg,${step.c1},${step.c2})`, boxShadow:`0 6px 20px ${step.c1}55` }}>
                  <step.Icon size={22} color="#fff" strokeWidth={1.8} />
                </div>
                <div className="pp-step-title">{t(step.titleKey)}</div>
                <div className="pp-step-desc">{t(step.descKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ TESTIMONIALS ════ */}
      <section className="pp-test-section">
        <div className="pp-test-orb pp-to-1" /><div className="pp-test-orb pp-to-2" />
        <div className="pp-wrap">
          <div ref={testRef} className={`pp-section-head kv-anim-u ${testVis ? 'kv-in' : ''}`}>
            <div className="pp-section-label"><Heart size={12} />{t('pages.pricing.test.eyebrow')}</div>
            <h2 className="pp-section-h">{t('pages.pricing.test.titleA')} <span className="pp-grad-mark">{t('pages.pricing.test.titleB')}</span></h2>
          </div>
          <div className={`pp-test-grid kv-anim-u ${testVis ? 'kv-in' : ''}`} style={{ transitionDelay:'.1s' }}>
            {TESTIMONIALS.map((item, i) => (
              <div key={i} className="pp-test-card" style={{ animationDelay:`${i*.1}s` }}>
                <div className="pp-test-stars">{[...Array(5)].map((_,si)=><span key={si} className="pp-test-star">★</span>)}</div>
                <p className="pp-test-text"><em>"{t(item.textKey)}"</em></p>
                <div className="pp-test-author">
                  <div className="pp-test-avatar" style={{ background:`linear-gradient(135deg,${item.avatarColor},${item.planColor})` }}>{item.avatar}</div>
                  <div>
                    <div className="pp-test-name">{t(item.nameKey)}</div>
                    <div className="pp-test-role">{t(item.roleKey)}</div>
                  </div>
                  <span className="pp-test-plan" style={{ background:`${item.planColor}22`, color:item.planColor, border:`1px solid ${item.planColor}44`, marginInlineStart:'auto' }}>
                    {t(item.planKey)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section className="pp-faq-section" ref={faqRef}>
        <div className="pp-wrap">
          <div className="pp-faq-layout">
            <div className={`pp-faq-left kv-anim-l ${faqVis ? 'kv-in' : ''}`}>
              <div className="pp-section-label" style={{ marginBottom:12 }}><Sparkles size={12} />{t('pages.pricing.faq.eyebrow')}</div>
              <h2 className="pp-faq-h">{t('pages.pricing.faq.titleA')} <span className="pp-grad-mark">{t('pages.pricing.faq.titleB')}</span></h2>
              <p className="pp-faq-sub">{t('pages.pricing.faq.sub')}</p>
              <div className="pp-faq-box">
                <div className="pp-faq-box-ico"><Sparkles size={20} color="#A78BFA" /></div>
                <div>
                  <p>{t('pages.pricing.faq.stillQuestion')}</p>
                  <button type="button" className="pp-card-btn pp-btn-outline" style={{ marginTop:10, padding:'7px 16px', fontSize:'.78rem' }} onClick={() => handleAction('school')}>
                    <Check size={11} /><span>{t('pages.pricing.faq.contactUs')}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className={`pp-faq-right kv-anim-r ${faqVis ? 'kv-in' : ''}`} style={{ transitionDelay:'.1s' }}>
              {FAQS.map((item, i) => <FaqItem key={i} qKey={item.qKey} aKey={item.aKey} idx={i} t={t} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ════ CTA BOTTOM ════ */}
      <section className="pp-cta-section" ref={ctaRef}>
        <div className="pp-cta-orb pp-cta-o1" /><div className="pp-cta-orb pp-cta-o2" />
        <div className="pp-cta-lines" />
        <div className="pp-wrap">
          <div className={`pp-cta-inner kv-anim-u ${ctaVis ? 'kv-in' : ''}`}>
            <h2 className="pp-cta-h">{t('pages.pricing.cta.titleA')} <em className="pp-cta-em">{t('pages.pricing.cta.titleB')}</em></h2>
            <p className="pp-cta-p">{t('pages.pricing.cta.desc')}</p>
            <div className="pp-cta-btns">
              <Link to="/download" className="pp-card-btn pp-btn-gradient" style={{ padding:'13px 30px' }}>
                <Download size={14} /><span>{t('pages.pricing.cta.btnPrimary')}</span>
              </Link>
              <button type="button" className="pp-card-btn pp-btn-outline" style={{ padding:'13px 30px' }}
                onClick={() => document.querySelector('.pp-cards-section')?.scrollIntoView({ behavior:'smooth' })}>
                <span>{t('pages.pricing.cta.btnSecondary')}</span><Arr size={13} />
              </button>
            </div>
            <div className="pp-cta-pills">
              {['pill1','pill2','pill3'].map((k,i) => (
                <span key={i} className="pp-cta-pill"><Check size={10} />{t(`pages.pricing.cta.${k}`)}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}