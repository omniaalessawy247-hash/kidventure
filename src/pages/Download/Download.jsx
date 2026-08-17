import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Download.css';

/* ─────────────────────────────────────────────
   🔧 LINKS
───────────────────────────────────────────── */
const ANDROID_LINK = 'https://appdistribution.firebase.dev/i/d446360bde8e0c93';
const IOS_LINK     = 'https://kidventure-26397.web.app/';

/* ─────────────────────────────────────────────
   🔧 MOCKUP IMAGE PATHS
───────────────────────────────────────────── */
import androidImg  from '../../assets/common/download/android.png';
import iosImg      from '../../assets/common/download/ios.png';
import qrImg       from '../../assets/common/download/qr.png';
// Hero section background video — place your video here:
import heroVideo   from '../../assets/common/download/hero-video.mp4';

/* ─────────────────────────────────────────────
   FLOATING ICONS CANVAS
   Icons use shadowBlur for visibility in light mode
───────────────────────────────────────────── */
function FloatingIconsCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, icons = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      spawnIcons();
    };

    const rnd = (a, b) => a + Math.random() * (b - a);

    const applyGlow = (ctx, color, size) => {
      ctx.shadowColor = color;
      ctx.shadowBlur  = size * 1.4;
    };

    const drawDownloadArrow = (ctx, x, y, size, color, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth   = size * 0.14;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      applyGlow(ctx, color, size);
      ctx.beginPath(); ctx.moveTo(x, y - size * 0.35); ctx.lineTo(x, y + size * 0.1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - size * 0.28, y - size * 0.05); ctx.lineTo(x, y + size * 0.32); ctx.lineTo(x + size * 0.28, y - size * 0.05); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - size * 0.38, y + size * 0.42); ctx.lineTo(x + size * 0.38, y + size * 0.42); ctx.stroke();
      ctx.restore();
    };

    const drawCloud = (ctx, x, y, size, color, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth   = size * 0.12;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      applyGlow(ctx, color, size);
      ctx.beginPath();
      ctx.arc(x - size * 0.15, y - size * 0.1, size * 0.22, Math.PI * 0.6, Math.PI * 1.9);
      ctx.arc(x + size * 0.15, y - size * 0.1, size * 0.18, Math.PI * 1.2, 0);
      ctx.arc(x + size * 0.1,  y + size * 0.06, size * 0.14, 0, Math.PI);
      ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y + size * 0.14); ctx.lineTo(x, y + size * 0.42); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - size * 0.18, y + size * 0.28); ctx.lineTo(x, y + size * 0.44); ctx.lineTo(x + size * 0.18, y + size * 0.28); ctx.stroke();
      ctx.restore();
    };

    const drawStar = (ctx, x, y, size, color, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = color;
      applyGlow(ctx, color, size);
      const pts = 5, outer = size * 0.48, inner = size * 0.20;
      ctx.beginPath();
      for (let i = 0; i < pts * 2; i++) {
        const angle = (i * Math.PI) / pts - Math.PI / 2;
        const r = i % 2 === 0 ? outer : inner;
        i === 0 ? ctx.moveTo(x + r * Math.cos(angle), y + r * Math.sin(angle))
                : ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
      }
      ctx.closePath(); ctx.fill();
      ctx.restore();
    };

    const drawBook = (ctx, x, y, size, color, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth   = size * 0.12;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      applyGlow(ctx, color, size);
      ctx.beginPath();
      ctx.roundRect(x - size * 0.32, y - size * 0.40, size * 0.64, size * 0.80, size * 0.08);
      ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - size * 0.16, y - size * 0.18); ctx.lineTo(x + size * 0.16, y - size * 0.18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - size * 0.16, y);               ctx.lineTo(x + size * 0.12, y);               ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - size * 0.32, y - size * 0.40); ctx.lineTo(x - size * 0.32, y + size * 0.40); ctx.stroke();
      ctx.restore();
    };

    const drawRocket = (ctx, x, y, size, color, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth   = size * 0.12;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      applyGlow(ctx, color, size);
      ctx.beginPath();
      ctx.moveTo(x, y - size * 0.44);
      ctx.bezierCurveTo(x + size * 0.22, y - size * 0.2, x + size * 0.22, y + size * 0.1, x, y + size * 0.30);
      ctx.bezierCurveTo(x - size * 0.22, y + size * 0.1, x - size * 0.22, y - size * 0.2, x, y - size * 0.44);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y - size * 0.08, size * 0.10, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    };

    const drawAtom = (ctx, x, y, size, color, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth   = size * 0.10;
      applyGlow(ctx, color, size);
      for (let i = 0; i < 3; i++) {
        ctx.save(); ctx.translate(x, y); ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath(); ctx.ellipse(0, 0, size * 0.42, size * 0.20, 0, 0, Math.PI * 2);
        ctx.stroke(); ctx.restore();
      }
      ctx.beginPath(); ctx.arc(x, y, size * 0.09, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
      ctx.restore();
    };

    const drawers = [drawDownloadArrow, drawCloud, drawStar, drawBook, drawRocket, drawAtom];
    const COLORS  = ['#FF6B35','#FFD23F','#7C3AED','#A855F7','#3B82F6','#06B6D4','#10B981','#EC4899'];

    const spawnIcons = () => {
      const count = Math.min(38, Math.floor((W * H) / 16000));
      icons = Array.from({ length: count }, () => ({
        x: rnd(0, W), y: rnd(0, H),
        vx: rnd(-.20, .20), vy: rnd(-.25, -.05),
        size: rnd(20, 48),
        life: rnd(0, Math.PI * 2), lifeSpeed: rnd(.008, .022),
        color: COLORS[Math.floor(rnd(0, COLORS.length))],
        draw: drawers[Math.floor(rnd(0, drawers.length))],
        rotation: rnd(0, Math.PI * 2), rotSpeed: rnd(-.006, .006),
        opacity: rnd(0.45, 0.85),
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      icons.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life += p.lifeSpeed; p.rotation += p.rotSpeed;
        if (p.x < -60) p.x = W + 60; if (p.x > W + 60) p.x = -60;
        if (p.y < -90) p.y = H + 90; if (p.y > H + 90) p.y = -90;
        const pulse = .5 + .5 * Math.sin(p.life);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
        p.draw(ctx, 0, 0, p.size, p.color, p.opacity * (.65 + .35 * pulse));
        ctx.restore();
      });
      animRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize(); draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="dl-particle-canvas" />;
}

/* ─────────────────────────────────────────────
   PARTICLE DOTS CANVAS
───────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; spawnParticles(); };
    const rnd = (a, b) => a + Math.random() * (b - a);
    const COLORS = ['#FF6B35','#7C3AED','#A855F7','#EC4899','#10B981','#FFD23F','#06B6D4'];
    const spawnParticles = () => {
      const count = Math.min(60, Math.floor((W * H) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: rnd(0, W), y: rnd(0, H), vx: rnd(-.2, .2), vy: rnd(-.2, .2),
        r: rnd(1.2, 2.8), life: rnd(0, Math.PI * 2), lifeSpeed: rnd(.006, .016),
        color: COLORS[Math.floor(rnd(0, COLORS.length))], trail: [],
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life += p.lifeSpeed;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        p.trail.push({ x: p.x, y: p.y }); if (p.trail.length > 6) p.trail.shift();
        if (p.trail.length > 1) {
          for (let i = 1; i < p.trail.length; i++) {
            ctx.beginPath(); ctx.moveTo(p.trail[i-1].x, p.trail[i-1].y); ctx.lineTo(p.trail[i].x, p.trail[i].y);
            ctx.strokeStyle = p.color; ctx.globalAlpha = (i / p.trail.length) * .07; ctx.lineWidth = p.r * .45; ctx.stroke();
          }
        }
        const pulse = .5 + .5 * Math.sin(p.life);
        ctx.globalAlpha = .40 * pulse;
        ctx.shadowColor = p.color; ctx.shadowBlur = p.r * 3;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (.8 + .2 * pulse), 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      });
      const maxDist = Math.min(W, H) * .07;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < maxDist) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color; ctx.globalAlpha = (1 - d / maxDist) * .09;
            ctx.lineWidth = .4; ctx.stroke(); ctx.globalAlpha = 1;
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    window.addEventListener('resize', resize); resize(); draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="dl-particle-canvas dl-particle-canvas--dots" />;
}

/* ─────────────────────────────────────────────
   BACKGROUND
───────────────────────────────────────────── */
function EduBackground() {
  return (
    <div className="auth-bg-world">
      <div className="auth-bg-gradient" />
      <div className="auth-orb auth-orb-1" /><div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" /><div className="auth-orb auth-orb-4" />
      <div className="auth-orb auth-orb-5" />
      <div className="auth-ring-system">
        <div className="auth-ring auth-ring-1" /><div className="auth-ring auth-ring-2" /><div className="auth-ring auth-ring-3" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GOOGLE PLAY ICON — official 4-color
───────────────────────────────────────────── */
const GooglePlayIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gp-a" x1="7.29" y1="46.94" x2="23.37" y2="30.86" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#00a0ff"/><stop offset=".007" stopColor="#00a1ff"/>
        <stop offset=".26" stopColor="#00beff"/><stop offset=".512" stopColor="#00d2ff"/>
        <stop offset=".76" stopColor="#00dfff"/><stop offset="1" stopColor="#00e3ff"/>
      </linearGradient>
      <linearGradient id="gp-b" x1="35.38" y1="24" x2="6.43" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ffe000"/><stop offset=".409" stopColor="#ffbd00"/>
        <stop offset=".775" stopColor="orange"/><stop offset="1" stopColor="#ff9c00"/>
      </linearGradient>
      <linearGradient id="gp-c" x1="27.08" y1="21.79" x2="5.67" y2="43.2" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ff3a44"/><stop offset="1" stopColor="#c31162"/>
      </linearGradient>
      <linearGradient id="gp-d" x1="4.19" y1="2.54" x2="13.73" y2="12.09" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#32a071"/><stop offset=".069" stopColor="#2da771"/>
        <stop offset=".476" stopColor="#15cf74"/><stop offset=".801" stopColor="#06e775"/>
        <stop offset="1" stopColor="#00f076"/>
      </linearGradient>
    </defs>
    <path d="M7.2 1.83A2.09 2.09 0 005 4.03v39.94a2.09 2.09 0 002.2 2.2l.12-.11L28.47 25v-.49L7.32 1.94z" fill="url(#gp-a)"/>
    <path d="M35.4 32.1L28.47 25v-.49l6.94-6.94.16.09 8.22 4.67a2.1 2.1 0 010 3.76L35.4 32.1z" fill="url(#gp-b)"/>
    <path d="M35.56 32l-7.09-7.09L7.2 46.17a2.43 2.43 0 003.1.09z" fill="url(#gp-c)"/>
    <path d="M35.56 16L10.3 1.74A2.43 2.43 0 007.2 1.83L28.47 25.09z" fill="url(#gp-d)"/>
  </svg>
);

const AppleIcon = ({ size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 170 170" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 01-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.017.17 2.035.17 3.241z"/>
  </svg>
);

/* ── small utility icons ── */
const CheckIcon    = ({ size=14, color='currentColor' }) => <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ArrowRight   = ({ size=16 }) => <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const LockIcon     = ({ size=12 }) => <svg width={size} height={size} viewBox="0 0 12 12" fill="none"><rect x="2" y="5.5" width="8" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4 5.5V4a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1.2"/></svg>;
const VerifiedIcon = ({ size=12 }) => <svg width={size} height={size} viewBox="0 0 12 12" fill="none"><path d="M6 1l1.4 1.4L9 2l.6 1.6L11 4.2l-.6 1.8.6 1.8-1.4.6L9 10l-1.6-.4L6 11l-1.4-1.4L3 10l-.6-1.8L1 7.8l.6-1.8L1 4.2l1.4-.6L3 2l1.6.4L6 1z" stroke="currentColor" strokeWidth="1" fill="none"/><path d="M4 6l1.5 1.5L8 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ShieldTrust  = ({ size=12 }) => <svg width={size} height={size} viewBox="0 0 12 12" fill="none"><path d="M6 1L1.5 3v3.5C1.5 9.5 6 11 6 11s4.5-1.5 4.5-4.5V3L6 1z" stroke="currentColor" strokeWidth="1.2"/><path d="M4 6l1.5 1.5L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const FirebaseIcon = ({ size=14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M5.2 14.8L9.4 3l3.1 5.8-7.3 6z" fill="#FFA000"/><path d="M14.8 8.5l2 4.7-11.6 1.6 9.6-6.3z" fill="#F57C00"/><path d="M5.2 14.8L12 21l6.8-6.2-13.6 0z" fill="#FFCA28"/><path d="M12 21l6.8-6.2-3.2-7.7L12 21z" fill="#FFA000"/></svg>;
const ShieldIcon   = ({ size=14 }) => <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M7 1L2 3.5V7c0 3 2.5 4.8 5 5.5 2.5-.7 5-2.5 5-5.5V3.5L7 1z" stroke="currentColor" strokeWidth="1.2"/></svg>;
const UpdateIcon   = ({ size=14 }) => <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M2 7a5 5 0 005 5 5 5 0 004.5-2.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M12 7a5 5 0 00-5-5 5 5 0 00-4.5 2.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M10 4.2l2-.5-.5-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const AndroidIcon  = ({ size=14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C7.15 3.37 6 5.06 6 7h12c0-1.94-1.15-3.63-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>;
const NativeIcon   = ({ size=14 }) => <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="3" y="1" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="10.5" r=".6" fill="currentColor"/><rect x="5" y="2" width="4" height=".8" rx=".4" fill="currentColor" opacity=".5"/></svg>;
const FaceIDIcon   = ({ size=14 }) => <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M1 4V2.5A1.5 1.5 0 012.5 1H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M10 1h1.5A1.5 1.5 0 0113 2.5V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M13 10v1.5A1.5 1.5 0 0111.5 13H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4 13H2.5A1.5 1.5 0 011 11.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="5" cy="6" r=".7" fill="currentColor"/><circle cx="9" cy="6" r=".7" fill="currentColor"/><path d="M5 9c.5.8 3.5.8 4 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>;
const CheckBadge   = ({ size=14 }) => <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M7 1l1.6 1.6L11 2l.7 1.8 1.6.7-.7 1.8.7 1.8-1.6.7L11 10.8l-1.8-.5L7.5 12l-1.7-1.5L4 10.8 3.3 9 1.7 8.3l.7-1.8-.7-1.8 1.6-.7L4 2l1.8.5L7 1z" stroke="currentColor" strokeWidth="1"/><path d="M4.5 7l2 2 3-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

/* ─────────────────────────────────────────────
   PHONE MOCKUP
───────────────────────────────────────────── */
function PhoneMockup({ src, accent, gradient }) {
  return (
    <div className="dl-phone-mockup-wrap">
      <div className="dl-phone-glow" style={{ background: accent + '55' }} />
      <div className="dl-phone-frame" style={{ '--frame-accent': accent }}>
        <div className="dl-phone-notch" />
        <div className="dl-phone-screen">
          {src ? (
            <img src={src} alt="App Screenshot" className="dl-phone-screenshot" />
          ) : (
            <div className="dl-phone-skeleton" style={{ '--sk-accent': accent }}>
              <div className="dl-sk-topbar">
                <div className="dl-sk-dot" />
                <div className="dl-sk-line dl-sk-line--short" />
              </div>
              <div className="dl-sk-hero" style={{ background: gradient }} />
              <div className="dl-sk-bar dl-sk-bar--80" />
              <div className="dl-sk-bar dl-sk-bar--60" />
              <div className="dl-sk-bar dl-sk-bar--90" />
              <div className="dl-sk-bar dl-sk-bar--50" />
              <div className="dl-sk-btn" style={{ background: gradient }} />
            </div>
          )}
        </div>
        <div className="dl-phone-home-bar" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO BACKGROUND VIDEO
───────────────────────────────────────────── */
function HeroVideo() {
  if (!heroVideo) return null;
  return (
    <div className="dl-hero-video-wrap" aria-hidden="true">
      <video
        className="dl-hero-video"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="dl-hero-video-overlay" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   QR SECTION — مع صورة QR وإضاءة وأنيميشن
───────────────────────────────────────────── */
function QrSection({ t }) {
  return (
    <section className="dl-qr-section">
      <div className="dl-qr-outer-glow" />
      <div className="dl-qr-card">
        <div className="dl-qr-top-bar" />
        <div className="dl-qr-inner">

          {/* ── QR Image with animated rings + glow ── */}
          <div className="dl-qr-img-wrap">
            {/* spinning rings */}
            <div className="dl-qr-ring dl-qr-ring-1" />
            <div className="dl-qr-ring dl-qr-ring-2" />
            <div className="dl-qr-ring dl-qr-ring-3" />
            {/* pulsing glow behind image */}
            <div className="dl-qr-glow-pulse" />
            {/* white frame + corner accents */}
            <div className="dl-qr-img-frame">
              <img src={qrImg} alt="QR Code — Scan to download Kidventure" className="dl-qr-img" />
            </div>
          </div>

          {/* ── text + store badges ── */}
          <div className="dl-qr-text">
            <p className="dl-qr-label">{t('pages.download.qr', 'Scan to Download')}</p>
            <p className="dl-qr-sub">
              {t('pages.download.qrSub', 'Point your camera at the code to open the Kidventure download link instantly on your device — no typing required.')}
            </p>
            <div className="dl-qr-badges">
              <a
                className="dl-qr-badge dl-qr-badge--android"
                href={ANDROID_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GooglePlayIcon size={14}/> Android
              </a>
              <a
                className="dl-qr-badge dl-qr-badge--ios"
                href={IOS_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppleIcon size={13} color="#A855F7"/> iOS
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PLATFORM CARD
───────────────────────────────────────────── */
function PlatformCard({ platform, link, t }) {
  const isAndroid = platform === 'android';

  const cfg = isAndroid ? {
    accent:   '#22c55e',
    gradient: 'linear-gradient(135deg,#16a34a,#22c55e,#4ade80)',
    shadow:   'rgba(34,197,94,0.40)',
    iconBg:   'linear-gradient(135deg,#16a34a,#22c55e)',
    title:    t('pages.download.androidTitle','Android'),
    store:    t('pages.download.androidStore','Google Play · Firebase Distribution'),
    ctaSup:   t('pages.download.ctaSupAndroid','GET IT ON'),
    ctaMain:  t('pages.download.ctaAndroid','Google Play'),
    mockup:   androidImg,
    features: [
      { icon: <FirebaseIcon />, text: t('pages.download.feat1','Fast, direct install via Firebase') },
      { icon: <ShieldIcon />,  text: t('pages.download.feat2','Verified, tamper-proof build') },
      { icon: <UpdateIcon />,  text: t('pages.download.feat3','Silent automatic updates') },
      { icon: <AndroidIcon />, text: t('pages.download.feat4','Android 8.0 and above') },
    ],
    meta: ['v2.4.1', '48 MB', 'Android 8+', t('pages.download.free','Free')],
  } : {
    accent:   '#818cf8',
    gradient: 'linear-gradient(135deg,#4f46e5,#818cf8,#c4b5fd)',
    shadow:   'rgba(129,140,248,0.40)',
    iconBg:   'linear-gradient(135deg,#4f46e5,#818cf8)',
    title:    t('pages.download.iosTitle','iOS & iPadOS'),
    store:    t('pages.download.iosStore','Apple App Store'),
    ctaSup:   t('pages.download.ctaSupIos','DOWNLOAD ON THE'),
    ctaMain:  t('pages.download.ctaIos','App Store'),
    mockup:   iosImg,
    features: [
      { icon: <NativeIcon />,  text: t('pages.download.iosFeat1','Native iOS & iPadOS experience') },
      { icon: <FaceIDIcon />,  text: t('pages.download.iosFeat2','Face ID & Touch ID support') },
      { icon: <CheckBadge />,  text: t('pages.download.iosFeat3','Optimised for iPhone and iPad') },
      { icon: <CheckBadge />,  text: t('pages.download.iosFeat4','Apple App Store reviewed') },
    ],
    meta: ['v2.4.1', '51 MB', 'iOS 15+', t('pages.download.free','Free')],
  };

  return (
    <div className={`dl-platform-card dl-platform-card--${platform}`}
      style={{ '--card-accent': cfg.accent, '--card-shadow': cfg.shadow }}>
      <div className="dl-card-shimmer" />
      <div className="dl-card-header">
        <div className="dl-card-icon" style={{ background: cfg.iconBg }}>
          {isAndroid ? <GooglePlayIcon size={22}/> : <AppleIcon size={20} color="#fff"/>}
        </div>
        <div className="dl-card-meta">
          <span className="dl-card-title">{cfg.title}</span>
          <span className="dl-card-store">{cfg.store}</span>
        </div>
        <div className="dl-live-pill">
          <span className="dl-live-dot" />
          {t('pages.download.live','LIVE')}
        </div>
      </div>

      <PhoneMockup src={cfg.mockup} accent={cfg.accent} gradient={cfg.gradient} />

      <ul className="dl-feature-list">
        {cfg.features.map((f, i) => (
          <li key={i} className="dl-feature-row">
            <span className="dl-feature-check" style={{ color: cfg.accent }}><CheckIcon size={13}/></span>
            <span className="dl-feature-icon-wrap">{f.icon}</span>
            <span className="dl-feature-text">{f.text}</span>
          </li>
        ))}
      </ul>

      <div className="dl-chips-row">
        {cfg.meta.map((m, i) => (
          <span key={i}
            className={`dl-chip ${i === cfg.meta.length-1 ? 'dl-chip--free' : ''}`}
            style={i === cfg.meta.length-1 ? { '--chip-color-val': cfg.accent } : {}}>
            {m}
          </span>
        ))}
      </div>

      <a className="dl-cta" href={link} target="_blank" rel="noopener noreferrer"
        style={{ '--cta-gradient': cfg.gradient, '--cta-shadow': cfg.shadow }}>
        <span className="dl-cta-icon-wrap">
          {isAndroid ? <GooglePlayIcon size={20}/> : <AppleIcon size={18} color="#fff"/>}
        </span>
        <span className="dl-cta-label">
          <span className="dl-cta-sup">{cfg.ctaSup}</span>
          <span className="dl-cta-main">{cfg.ctaMain}</span>
        </span>
        <span className="dl-cta-arrow"><ArrowRight size={16}/></span>
      </a>

      <div className="dl-trust-row">
        <span><LockIcon size={11}/> {t('pages.download.encrypted','Encrypted')}</span>
        <span><VerifiedIcon size={11}/> {t('pages.download.verified','Verified')}</span>
        <span><ShieldTrust size={11}/> {t('pages.download.safe','Child-Safe')}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BOTTOM FEATURES
───────────────────────────────────────────── */
const FeatureIcons = {
  curriculum: ({ a }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" fill={a+'20'} stroke={a} strokeWidth="1.5"/>
      <rect x="9" y="9" width="9" height="13" rx="1.5" stroke={a} strokeWidth="1.4"/>
      <path d="M11 12.5h5M11 15h4M11 17.5h5" stroke={a} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M20 12l2 2-2 2" stroke={a} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ai: ({ a }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" fill={a+'20'} stroke={a} strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="5" stroke={a} strokeWidth="1.4"/>
      <circle cx="16" cy="16" r="2" fill={a}/>
      <path d="M16 8V6M16 26v-2M8 16H6M26 16h-2M10.3 10.3L8.9 8.9M21.7 21.7l-1.4-1.4M10.3 21.7L8.9 23.1M21.7 10.3l-1.4 1.4" stroke={a} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  drawing: ({ a }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" fill={a+'20'} stroke={a} strokeWidth="1.5"/>
      <path d="M9 21l3.5-6 3.5 4 2.5-5 3.5 7" stroke={a} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="11" cy="12" r="2" fill={a} opacity=".7"/>
    </svg>
  ),
  privacy: ({ a }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" fill={a+'20'} stroke={a} strokeWidth="1.5"/>
      <path d="M16 8l-7 3V15c0 4.5 3.5 7.5 7 8.5 3.5-1 7-4 7-8.5V11L16 8z" stroke={a} strokeWidth="1.4"/>
      <path d="M12.5 16l2.5 2.5 4.5-5" stroke={a} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const FEAT_ACCENTS = ['#FF6B35', '#7C3AED', '#FFD23F', '#EC4899'];

function BottomFeatures({ t }) {
  const items = [
    { key: 'curriculum', title: t('pages.download.bgFeat1Title','Curriculum-Aligned'),  desc: t('pages.download.bgFeat1Desc','Every lesson, game, and story maps directly to Ministry of Education materials for children in grades 1 through 6.') },
    { key: 'ai',         title: t('pages.download.bgFeat2Title','AI-Powered Learning'), desc: t('pages.download.bgFeat2Desc','Powered by Google Gemini 3 Flash with a RAG system trained on official curriculum content, delivering accurate and trustworthy answers every time.') },
    { key: 'drawing',    title: t('pages.download.bgFeat3Title','Drawing Detection'),   desc: t('pages.download.bgFeat3Desc','A custom-trained CNN model recognises children\'s illustrations with over 90% accuracy and converts them into meaningful learning feedback.') },
    { key: 'privacy',    title: t('pages.download.bgFeat4Title','Safe & Private'),      desc: t('pages.download.bgFeat4Desc','Designed from the ground up for children. End-to-end encrypted with strict child-safety standards and full COPPA-aligned privacy practices.') },
  ];

  return (
    <div className="dl-features-grid">
      {items.map((f, i) => {
        const accent = FEAT_ACCENTS[i];
        const Icon   = FeatureIcons[f.key];
        return (
          <div key={f.key} className="dl-feat-card" style={{ '--feat-accent': accent }}>
            <span className="dl-feat-icon"><Icon a={accent} /></span>
            <strong className="dl-feat-title">{f.title}</strong>
            <p className="dl-feat-desc">{f.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO BADGES
───────────────────────────────────────────── */
function HeroBadges({ t }) {
  return (
    <div className="dl-hero-badges">
      <a className="dl-badge dl-badge--android" href={ANDROID_LINK} target="_blank" rel="noopener noreferrer">
        <GooglePlayIcon size={18}/>
        <div className="dl-badge-text">
          <span className="dl-badge-sup">{t('pages.download.ctaSupAndroid','GET IT ON')}</span>
          <span className="dl-badge-main">{t('pages.download.ctaAndroid','Google Play')}</span>
        </div>
      </a>
      <a className="dl-badge dl-badge--ios" href={IOS_LINK} target="_blank" rel="noopener noreferrer">
        <AppleIcon size={18} color="#fff"/>
        <div className="dl-badge-text">
          <span className="dl-badge-sup">{t('pages.download.ctaSupIos','DOWNLOAD ON THE')}</span>
          <span className="dl-badge-main">{t('pages.download.ctaIos','App Store')}</span>
        </div>
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function SectionLabel({ children, accent = '#A855F7' }) {
  return (
    <div className="dl-section-label" style={{ '--sl-accent': accent }}>
      <span className="dl-section-label-dot" />
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Download() {
  const { t } = useTranslation();

  return (
    <div className="dl-page">
      <EduBackground />
      <FloatingIconsCanvas />
      <ParticleCanvas />

      <div className="dl-wrapper">

        {/* ── HERO ── */}
        <section className="dl-hero">
          <HeroVideo />
          <div className="dl-hero-content">
            <div className="dl-eyebrow">
              <span className="dl-eyebrow-dot" />
              {t('pages.download.available','Now Available · Android & iOS')}
            </div>
            <h1 className="dl-hero-title">
              {t('pages.download.heroLine1','Learn.')}{' '}
              <span className="dl-hero-accent">{t('pages.download.heroLine2','Explore.')}</span>
              <br />
              {t('pages.download.heroLine3','Grow.')}
            </h1>
            <p className="dl-hero-sub">
              {t('pages.download.lead','Kidventure brings curriculum-aligned learning to life through 3D models, AI-powered stories, and immersive educational games — built for children aged 6 to 12.')}
            </p>
            <HeroBadges t={t} />
          </div>
        </section>

        {/* ── SECTION LABEL ── */}
        <div className="dl-section-divider">
          <SectionLabel accent="#7C3AED">
            {t('pages.download.title','Get Kidventure')} — {t('pages.download.titleAccent','Free on Android & iOS')}
          </SectionLabel>
        </div>

        {/* ── PLATFORM CARDS ── */}
        <div className="dl-cards-grid">
          <PlatformCard platform="android" link={ANDROID_LINK} t={t} />
          <PlatformCard platform="ios"     link={IOS_LINK}     t={t} />
        </div>

        {/* ── QR SECTION ── */}
        <QrSection t={t} />

        {/* ── WHY KIDVENTURE FEATURES ── */}
        <div className="dl-section-divider dl-section-divider--feat">
          <SectionLabel accent="#FF6B35">
            {t('pages.download.sectionWhyKidventure','Why Kidventure?')}
          </SectionLabel>
        </div>
        <BottomFeatures t={t} />

      </div>
    </div>
  );
}