import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Mail, Lock, ArrowRight, Loader2, AlertCircle,
  Shield, Facebook, Eye, EyeOff, X, Check
} from 'lucide-react';
import './Auth.css';

import loginHeroImg from '../../assets/common/login.png';
import { supabase } from '../../lib/supabaseClient';

/* ─────────────────────────────────────────────
   PARTICLE CANVAS
───────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], t = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      spawnParticles();
    };

    const rnd = (a, b) => a + Math.random() * (b - a);
    const COLORS = ['#6366f1','#8b5cf6','#ec4899','#06b6d4','#f59e0b','#10b981','#f97316','#a78bfa'];

    const spawnParticles = () => {
      const count = Math.min(80, Math.floor((W * H) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: rnd(0, W), y: rnd(0, H),
        vx: rnd(-.3, .3), vy: rnd(-.3, .3),
        r: rnd(1.2, 3.5),
        life: rnd(0, Math.PI * 2),
        lifeSpeed: rnd(.008, .022),
        color: COLORS[Math.floor(rnd(0, COLORS.length))],
        trail: [],
      }));
    };

    const draw = () => {
      t += .008;
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life += p.lifeSpeed;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 8) p.trail.shift();
        if (p.trail.length > 1) {
          for (let i = 1; i < p.trail.length; i++) {
            ctx.beginPath();
            ctx.moveTo(p.trail[i-1].x, p.trail[i-1].y);
            ctx.lineTo(p.trail[i].x,   p.trail[i].y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (i / p.trail.length) * .07;
            ctx.lineWidth = p.r * .5;
            ctx.stroke();
          }
        }
        const pulse = .5 + .5 * Math.sin(p.life);
        ctx.globalAlpha = .5 * pulse;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (.8 + .2 * pulse), 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
        ctx.globalAlpha = 1;
      });
      const maxDist = Math.min(W, H) * .1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - d / maxDist) * .08;
            ctx.lineWidth   = .5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize(); draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="auth-particle-canvas" style={{ position:'fixed', inset:0, zIndex:1, pointerEvents:'none' }} />;
}

/* ─────────────────────────────────────────────
   DEVICE ICONS
───────────────────────────────────────────── */
const TabletIcon = ({ color = '#6366f1', size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <rect x="8" y="4" width="48" height="56" rx="6" fill={color+'22'} stroke={color} strokeWidth="2.5"/>
    <rect x="13" y="10" width="38" height="36" rx="3" fill={color+'30'}/>
    <circle cx="32" cy="53" r="3" fill={color+'80'}/>
    <rect x="18" y="16" width="28" height="3" rx="1.5" fill={color+'60'}/>
    <rect x="18" y="22" width="20" height="2.5" rx="1.25" fill={color+'45'}/>
    <rect x="18" y="28" width="24" height="2.5" rx="1.25" fill={color+'45'}/>
    <rect x="18" y="34" width="16" height="2.5" rx="1.25" fill={color+'45'}/>
    <circle cx="41" cy="35" r="6" fill={color+'40'} stroke={color} strokeWidth="1.5"/>
    <path d="M38.5 35l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const PhoneIcon = ({ color = '#ec4899', size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 64" fill="none">
    <rect x="6" y="2" width="44" height="60" rx="8" fill={color+'20'} stroke={color} strokeWidth="2.5"/>
    <rect x="11" y="10" width="34" height="38" rx="3" fill={color+'28'}/>
    <circle cx="28" cy="55" r="3.5" fill={color+'70'}/>
    <rect x="21" y="5" width="14" height="3" rx="1.5" fill={color+'50'}/>
    <rect x="16" y="18" width="24" height="3" rx="1.5" fill={color+'55'}/>
    <rect x="16" y="24" width="18" height="2.5" rx="1.25" fill={color+'40'}/>
    <rect x="16" y="30" width="20" height="2.5" rx="1.25" fill={color+'40'}/>
    <circle cx="28" cy="40" r="5" fill={color+'35'} stroke={color} strokeWidth="1.5"/>
    <path d="M25.5 40l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const LaptopIcon = ({ color = '#06b6d4', size = 72 }) => (
  <svg width={size} height={size} viewBox="0 0 80 64" fill="none">
    <rect x="10" y="6" width="60" height="42" rx="5" fill={color+'22'} stroke={color} strokeWidth="2.5"/>
    <rect x="15" y="11" width="50" height="32" rx="2" fill={color+'30'}/>
    <rect x="0" y="52" width="80" height="6" rx="3" fill={color+'40'} stroke={color} strokeWidth="1.5"/>
    <rect x="30" y="52" width="20" height="3" rx="1.5" fill={color+'60'}/>
    <rect x="20" y="18" width="30" height="3" rx="1.5" fill={color+'55'}/>
    <rect x="20" y="24" width="22" height="2.5" rx="1.25" fill={color+'40'}/>
    <rect x="20" y="30" width="26" height="2.5" rx="1.25" fill={color+'40'}/>
    <circle cx="52" cy="30" r="6" fill={color+'38'} stroke={color} strokeWidth="1.5"/>
    <path d="M49.5 30l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const KidReadIcon = ({ color = '#10b981', size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 72" fill="none">
    <circle cx="32" cy="14" r="10" fill={color+'40'} stroke={color} strokeWidth="2"/>
    <circle cx="28" cy="13" r="1.8" fill={color}/>
    <circle cx="36" cy="13" r="1.8" fill={color}/>
    <path d="M27 17 Q32 21 37 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M20 26 Q32 22 44 26 L46 46 H18 Z" fill={color+'35'} stroke={color} strokeWidth="2"/>
    <rect x="14" y="36" width="36" height="26" rx="3" fill={color+'25'} stroke={color} strokeWidth="2"/>
    <line x1="32" y1="36" x2="32" y2="62" stroke={color} strokeWidth="1.5"/>
    <rect x="17" y="40" width="12" height="2" rx="1" fill={color+'60'}/>
    <rect x="17" y="45" width="10" height="2" rx="1" fill={color+'50'}/>
    <rect x="17" y="50" width="11" height="2" rx="1" fill={color+'50'}/>
    <rect x="35" y="40" width="12" height="2" rx="1" fill={color+'60'}/>
    <rect x="35" y="45" width="10" height="2" rx="1" fill={color+'50'}/>
    <rect x="35" y="50" width="11" height="2" rx="1" fill={color+'50'}/>
  </svg>
);
const HeadphonesIcon = ({ color = '#8b5cf6', size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M10 32 C10 18 20 8 32 8 C44 8 54 18 54 32" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"/>
    <rect x="6" y="30" width="12" height="20" rx="6" fill={color+'40'} stroke={color} strokeWidth="2"/>
    <rect x="46" y="30" width="12" height="20" rx="6" fill={color+'40'} stroke={color} strokeWidth="2"/>
    <circle cx="32" cy="32" r="8" fill={color+'30'} stroke={color} strokeWidth="2"/>
    <circle cx="32" cy="32" r="3" fill={color+'70'}/>
    <path d="M32 48 Q32 56 40 58" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);
const StarIcon = ({ color = '#f59e0b', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path d="M20 4 L23.5 14.5 H34.5 L25.8 21 L29 32 L20 26 L11 32 L14.2 21 L5.5 14.5 H16.5 Z"
      fill={color+'50'} stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);
const GlobeIcon = ({ color = '#f97316', size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="24" fill={color+'20'} stroke={color} strokeWidth="2.5"/>
    <ellipse cx="32" cy="32" rx="12" ry="24" fill="none" stroke={color} strokeWidth="1.5"/>
    <line x1="8" y1="32" x2="56" y2="32" stroke={color} strokeWidth="1.5"/>
    <line x1="32" y1="8" x2="32" y2="56" stroke={color+'60'} strokeWidth="1"/>
    <path d="M14 20 Q32 16 50 20" stroke={color} strokeWidth="1.2" fill="none"/>
    <path d="M14 44 Q32 48 50 44" stroke={color} strokeWidth="1.2" fill="none"/>
  </svg>
);
const PencilIcon = ({ color = '#ec4899', size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 52 64" fill="none">
    <rect x="16" y="4" width="20" height="46" rx="4" fill={color+'25'} stroke={color} strokeWidth="2"/>
    <polygon points="16,50 36,50 26,62" fill={color+'60'} stroke={color} strokeWidth="1.5"/>
    <rect x="16" y="4" width="20" height="10" rx="4" fill={color+'50'}/>
    <rect x="22" y="18" width="8" height="2.5" rx="1.25" fill={color+'55'}/>
    <rect x="22" y="24" width="8" height="2.5" rx="1.25" fill={color+'45'}/>
    <rect x="22" y="30" width="8" height="2.5" rx="1.25" fill={color+'45'}/>
    <rect x="22" y="36" width="6" height="2.5" rx="1.25" fill={color+'40'}/>
  </svg>
);
const TrophyIcon = ({ color = '#fbbf24', size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M20 8 H44 V30 C44 42 20 42 20 30 Z" fill={color+'35'} stroke={color} strokeWidth="2.5"/>
    <path d="M44 16 H54 C54 24 48 28 44 26" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M20 16 H10 C10 24 16 28 20 26" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M26 42 L24 52 H40 L38 42" stroke={color} strokeWidth="2" fill={color+'25'}/>
    <rect x="20" y="52" width="24" height="5" rx="2.5" fill={color+'50'} stroke={color} strokeWidth="1.5"/>
    <path d="M28 22 L30 27 L36 27 L31.5 30 L33.5 36 L29 32 L24.5 36 L26.5 30 L22 27 L28 27 Z" fill={color+'80'}/>
  </svg>
);
const BrainIcon = ({ color = '#a78bfa', size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M32 10 C22 10 14 18 14 28 C14 34 17 39 22 42 L22 54 H42 V42 C47 39 50 34 50 28 C50 18 42 10 32 10Z"
      fill={color+'28'} stroke={color} strokeWidth="2.5"/>
    <path d="M32 10 L32 54" stroke={color+'40'} strokeWidth="1.5" strokeDasharray="3,3"/>
    <circle cx="24" cy="24" r="4" fill={color+'55'} stroke={color} strokeWidth="1.5"/>
    <circle cx="40" cy="24" r="4" fill={color+'55'} stroke={color} strokeWidth="1.5"/>
    <path d="M22 32 Q32 38 42 32" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="32" cy="28" r="3" fill={color+'70'}/>
  </svg>
);
const RocketIcon = ({ color = '#06b6d4', size = 58 }) => (
  <svg width={size} height={size} viewBox="0 0 56 72" fill="none">
    <path d="M28 4 C28 4 44 16 44 36 L28 44 L12 36 C12 16 28 4 28 4Z" fill={color+'30'} stroke={color} strokeWidth="2.5"/>
    <circle cx="28" cy="28" r="7" fill={color+'50'} stroke={color} strokeWidth="2"/>
    <path d="M12 36 L6 42 L12 48 L20 44" fill={color+'35'} stroke={color} strokeWidth="1.5"/>
    <path d="M44 36 L50 42 L44 48 L36 44" fill={color+'35'} stroke={color} strokeWidth="1.5"/>
    <path d="M22 44 L20 58 L28 52 L36 58 L34 44" fill={color+'45'} stroke={color} strokeWidth="1.5"/>
    <circle cx="28" cy="28" r="3" fill={color}/>
  </svg>
);

/* ─────────────────────────────────────────────
   EDUCATIONAL BACKGROUND WORLD
───────────────────────────────────────────── */
function EduBackground() {
  return (
    <div className="auth-bg-world">
      <div className="auth-bg-gradient" />
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />
      <div className="auth-orb auth-orb-4" />
      <div className="auth-orb auth-orb-5" />
      <div className="auth-ring-system">
        <div className="auth-ring auth-ring-1" />
        <div className="auth-ring auth-ring-2" />
        <div className="auth-ring auth-ring-3" />
      </div>
      <div className="auth-device auth-device-1"><TabletIcon color="#6366f1" size={72} /></div>
      <div className="auth-device auth-device-2"><PencilIcon color="#ec4899" size={52} /></div>
      <div className="auth-device auth-device-3"><LaptopIcon color="#06b6d4" size={76} /></div>
      <div className="auth-device auth-device-4"><HeadphonesIcon color="#8b5cf6" size={62} /></div>
      <div className="auth-device auth-device-5"><KidReadIcon color="#10b981" size={64} /></div>
      <div className="auth-device auth-device-6"><PhoneIcon color="#a78bfa" size={60} /></div>
      <div className="auth-device auth-device-7"><GlobeIcon color="#f97316" size={58} /></div>
      <div className="auth-device auth-device-8"><RocketIcon color="#ec4899" size={62} /></div>
      <div className="auth-device auth-device-9"><BrainIcon color="#06b6d4" size={60} /></div>
      <div className="auth-device auth-device-10"><TrophyIcon color="#fbbf24" size={60} /></div>
      <div className="auth-device auth-device-11"><StarIcon color="#fbbf24" size={36} /></div>
      <div className="auth-device auth-device-12"><StarIcon color="#10b981" size={28} /></div>
      <div className="auth-device auth-device-13"><StarIcon color="#ec4899" size={38} /></div>
      <div className="auth-device auth-device-14"><StarIcon color="#6366f1" size={32} /></div>
      <div className="auth-bubble auth-bubble-1">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
      </div>
      <div className="auth-bubble auth-bubble-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>
      <div className="auth-bubble auth-bubble-3">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
        </svg>
      </div>
      <div className="auth-bubble auth-bubble-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      {[
        { cls:'auth-sparkle-1', color:'#818cf8' },
        { cls:'auth-sparkle-2', color:'#f472b6' },
        { cls:'auth-sparkle-3', color:'#34d399' },
        { cls:'auth-sparkle-4', color:'#fbbf24' },
        { cls:'auth-sparkle-5', color:'#22d3ee' },
        { cls:'auth-sparkle-6', color:'#a78bfa' },
      ].map(({ cls, color }) => (
        <div key={cls} className={`auth-sparkle ${cls}`} style={{ background: color, borderRadius:'50%' }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   GOOGLE ICON
───────────────────────────────────────────── */
const GoogleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

/* ─────────────────────────────────────────────
   SOCIAL MODAL  — Supabase OAuth
───────────────────────────────────────────── */
function SocialModal({ platform, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const isGoogle = platform === 'google';

  const handleOAuth = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: isGoogle ? 'google' : 'facebook',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-bd" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}><X size={13} /></button>
        <div className="auth-modal-hd">
          <div className={`auth-modal-icon ${isGoogle ? 'g' : 'fb'}`}>
            {isGoogle ? <GoogleIcon size={24} /> : <Facebook size={24} />}
          </div>
          <h3 className="auth-modal-title">
            {isGoogle ? 'Continue with Google' : 'Continue with Facebook'}
          </h3>
          <p className="auth-modal-sub">You'll be redirected to sign in securely</p>
        </div>
        <div className="auth-modal-body">
          {error && (
            <div className="auth-alert err" style={{ marginBottom: '12px' }}>
              <AlertCircle size={14} /><span>{error}</span>
            </div>
          )}
          <button className="auth-modal-btn" onClick={handleOAuth} disabled={loading}>
            {loading
              ? <><Loader2 size={14} className="spin" /> Redirecting...</>
              : <><span>Continue with {isGoogle ? 'Google' : 'Facebook'}</span><ArrowRight size={14} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FORGOT MODAL  — Supabase resetPasswordForEmail
───────────────────────────────────────────── */
function ForgotModal({ onClose }) {
  const [email,   setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState('');

  const submit = async () => {
    if (!email) return;
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="auth-modal-bd" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}><X size={13} /></button>
        {!sent ? (
          <>
            <div className="auth-modal-hd">
              <div className="auth-modal-icon pw"><Lock size={22} /></div>
              <h3 className="auth-modal-title">Reset Password</h3>
              <p className="auth-modal-sub">We'll send a reset link to your email</p>
            </div>
            <div className="auth-modal-body">
              {error && (
                <div className="auth-alert err" style={{ marginBottom: '12px' }}>
                  <AlertCircle size={14} /><span>{error}</span>
                </div>
              )}
              <div className="auth-modal-field">
                <label>Email Address</label>
                <div className="auth-wrap">
                  <span className="auth-ico"><Mail size={14} /></span>
                  <input type="email" className="auth-modal-input" placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
                </div>
              </div>
              <button className="auth-modal-btn" onClick={submit} disabled={loading}>
                {loading ? <><Loader2 size={14} className="spin" /> Sending...</> : 'Send Reset Link'}
              </button>
            </div>
          </>
        ) : (
          <div className="auth-modal-ok">
            <div className="auth-modal-ok-icon"><Check size={26} /></div>
            <h3 className="auth-modal-ok-title">Check your inbox!</h3>
            <p className="auth-modal-ok-text">We sent a reset link to <strong>{email}</strong></p>
            <button className="auth-modal-btn" onClick={onClose} style={{ marginTop:'8px', width:'auto', padding:'11px 30px' }}>
              Got it!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LOGIN PAGE

   منطق الـ Session:
   ────────────────
   ✅ onAuthStateChange هو المصدر الوحيد للـ navigation
   ✅ submit لا يعمل navigate — يتركها لـ onAuthStateChange
   ✅ INITIAL_SESSION: لو في session → dashboard مباشرة
   ✅ SIGNED_IN: بعد login ناجح → dashboard
   ✅ SIGNED_OUT: يفضل في صفحة اللوجين بدون redirect
   ✅ لا يوجد double navigation أو race condition
───────────────────────────────────────────── */
export default function Login() {
  const { t }    = useTranslation();
  const navigate = useNavigate();

  const [layoutClass,      setLayoutClass]      = useState('mounted');
  const [form,             setForm]             = useState({ email: '', password: '' });
  const [showPw,           setShowPw]           = useState(false);
  const [loading,          setLoading]          = useState(false);
  const [checkingSession,  setCheckingSession]  = useState(true);
  const [error,            setError]            = useState('');
  const [social,           setSocial]           = useState(null);
  const [forgot,           setForgot]           = useState(false);

  /* ─────────────────────────────────────────
     Session guard — onAuthStateChange فقط
     هو اللي بيقرر الـ navigation، مش submit.

     INITIAL_SESSION  → يُطلق مرة واحدة عند load
     SIGNED_IN        → بعد signInWithPassword
     SIGNED_OUT       → بعد signOut أو انتهاء session
  ───────────────────────────────────────── */
  useEffect(() => {
    let isMounted = true;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;

        if (event === 'INITIAL_SESSION') {
          if (session?.user) {
            // ✅ session موجودة → روح الداشبورد فورًا
            navigate('/dashboard', { replace: true });
          } else {
            // ✅ مفيش session → اعرض الفورم
            setCheckingSession(false);
          }
          return;
        }

        if (event === 'SIGNED_IN' && session?.user) {
          // ✅ login ناجح → روح الداشبورد
          navigate('/dashboard', { replace: true });
          return;
        }

        if (event === 'SIGNED_OUT') {
          // ✅ sign out → ابقى في صفحة اللوجين
          setCheckingSession(false);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  /* ─────────────────────────────────────────
     Form handlers
  ───────────────────────────────────────── */
  const onChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email:    form.email.trim(),
      password: form.password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    /*
      ✅ لا نعمل navigate هنا إطلاقًا.
      onAuthStateChange سيستقبل SIGNED_IN
      وسيعمل navigate('/dashboard') تلقائيًا.
      ده بيمنع أي double navigation أو race condition.
    */
  };

  const handleGoSignup = useCallback((e) => {
    e.preventDefault();
    setLayoutClass('going-signup');
    setTimeout(() => navigate('/signup'), 480);
  }, [navigate]);

  /* ─────────────────────────────────────────
     Loading screen أثناء التحقق من الـ session
     يمنع flash بين اللوجين والداشبورد
  ───────────────────────────────────────── */
  if (checkingSession) {
    return (
      <div
        className="auth-page"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Loader2 size={28} className="spin" />
      </div>
    );
  }

  return (
    <>
      {/* ✅ نفس طريقة الهوم بالظبط: <img> مباشرة مش CSS background-image */}
      <img
        src={loginHeroImg}
        alt=""
        aria-hidden="true"
        className="auth-root-bg"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      <div className="auth-page">
        <EduBackground />
        <ParticleCanvas />

        <div className="auth-wrapper-login">
          <div className={`auth-layout login ${layoutClass}`}>

            {/* ═══ LEFT: VISUAL ═══ */}
            <div className="auth-visual">
              <div className="auth-vis-sheen" />
              <div className="auth-vis-brand">
                <div className="auth-vis-brand-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <div className="auth-illustration">
                <img src={loginHeroImg} alt="Login Hero" className="auth-illustration-img" />
              </div>
              <div className="auth-vis-switch">
                <p className="auth-vis-cta-label">{t('pages.auth.login.noAccount')}</p>
                <a href="/signup" className="auth-vis-switch-btn" onClick={handleGoSignup}>
                  {t('pages.auth.signup.signUpBtn')} <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* ═══ RIGHT: FORM ═══ */}
            <div className="auth-form-panel">
              <div className="auth-form-card">
                <div className="auth-card-glow" />
                <h1 className="auth-form-title">{t('pages.auth.login.title')} 👋</h1>
                <p className="auth-form-sub">{t('pages.auth.login.subtitle')}</p>

                <div className="auth-social-row">
                  <button className="auth-social-btn" onClick={() => setSocial('google')}>
                    <GoogleIcon size={16} /> <span>Google</span>
                  </button>
                  <button className="auth-social-btn fb" onClick={() => setSocial('facebook')}>
                    <Facebook size={16} /> <span>Facebook</span>
                  </button>
                </div>

                <div className="auth-divider">
                  <div className="auth-divider-line" />
                  <span className="auth-divider-text">{t('pages.auth.login.orContinue') || 'OR CONTINUE WITH'}</span>
                  <div className="auth-divider-line" />
                </div>

                {error && (
                  <div className="auth-alert err">
                    <AlertCircle size={14} /><span>{error}</span>
                  </div>
                )}

                <form onSubmit={submit}>
                  <div className="auth-fields">
                    <div className="auth-field">
                      <label htmlFor="l-email">{t('pages.auth.login.emailLabel')}</label>
                      <div className="auth-wrap">
                        <span className="auth-ico"><Mail size={14} /></span>
                        <input
                          id="l-email"
                          type="email"
                          name="email"
                          className={`auth-input ${error ? 'err' : ''}`}
                          placeholder="parent@example.com"
                          value={form.email}
                          onChange={onChange}
                          autoComplete="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="auth-field">
                      <label htmlFor="l-pw">{t('pages.auth.login.passwordLabel')}</label>
                      <div className="auth-wrap">
                        <span className="auth-ico"><Lock size={14} /></span>
                        <input
                          id="l-pw"
                          type={showPw ? 'text' : 'password'}
                          name="password"
                          className={`auth-input ${error ? 'err' : ''}`}
                          placeholder="••••••••"
                          value={form.password}
                          onChange={onChange}
                          autoComplete="current-password"
                          style={{ paddingRight: '40px' }}
                          required
                        />
                        <button
                          type="button"
                          className="auth-ico-end"
                          onClick={() => setShowPw(v => !v)}
                          tabIndex={-1}
                        >
                          {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="auth-options">
                    <label className="auth-check-wrap">
                      <input type="checkbox" defaultChecked readOnly />
                      <span className="auth-check-box"><Check size={9} color="#fff" strokeWidth={3} /></span>
                      <span className="auth-check-text">{t('pages.auth.login.rememberMe')}</span>
                    </label>
                    <button type="button" className="auth-forgot" onClick={() => setForgot(true)}>
                      {t('pages.auth.login.forgotPassword')}
                    </button>
                  </div>

                  <button type="submit" className="auth-submit" disabled={loading}>
                    {loading
                      ? <><Loader2 size={16} className="spin" /> {t('pages.auth.login.signingIn')}...</>
                      : <><span>{t('pages.auth.login.signInBtn')}</span><ArrowRight size={16} /></>}
                  </button>
                </form>

                <div className="auth-trust">
                  <div className="auth-trust-item"><Shield size={9} /> SSL Secured</div>
                  <div className="auth-trust-item"><Lock size={9} /> Encrypted</div>
                </div>
              </div>

              <p className="auth-footer">
                {t('pages.auth.login.noAccount')}{' '}
                <a href="/signup" onClick={handleGoSignup}>{t('pages.auth.signup.signUpBtn')}</a>
              </p>
            </div>

          </div>
        </div>
      </div>

      {social && <SocialModal platform={social} onClose={() => setSocial(null)} />}
      {forgot  && <ForgotModal onClose={() => setForgot(false)} />}
    </>
  );
}