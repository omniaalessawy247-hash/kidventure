import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import {
  LogOut, X, AlertTriangle, LayoutDashboard, BarChart2,
  Users, CreditCard, Settings, Bell, ChevronDown, ChevronRight,
  Menu, Moon, Sun, Eye, EyeOff, Plus, Lock,
  Star, Zap, Flame, Target, TrendingUp, TrendingDown, Award,
  Clock, CheckCircle, Activity, Shield, Trophy, Crown, Gem,
  ArrowRight, ArrowUp,
  Languages, Sigma, Atom, Globe, BookText, Paintbrush,
  ScrollText, GraduationCap, Gamepad2, Network, Pen, Pencil,
  Shapes, Leaf, Compass, Cpu, Beaker, Orbit, Waves,
  Sparkles, Rocket, BrainCircuit, Medal, Wand2, Puzzle,
  Telescope, BookOpen, Heart, Dumbbell,
  BarChart3, Hourglass, Download, PieChart,
  RefreshCw, AlertCircle, Mail, Smartphone,
  Calendar, Globe2, Fingerprint,
  Lightbulb, MessageCircle, BarChart, LineChart,
  Flower2, Baby, Bird, Cat, Dog, Fish, Candy,
  IceCream, Smile, Gift, Bike, BookCopy,
  FileText, Printer, UserPlus, LogIn, ArrowLeft,
  Phone, User, MapPin, Edit3, Trash2, Save,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   SEED DATA
───────────────────────────────────────────────────────────── */
const SEED_CHILDREN = [
  {
    id: "c1", name: "Sara", age: 8, grade: "Grade 3", avatarIcon: "flower2", color: "#ec4899",
    level: 12, xp: 3840, xpNext: 4200, streak: 7, badges: 14, timeThisWeek: 312,
    activitiesCompleted: 48, averageScore: 88, quizzesTotal: 23, storiesRead: 11, gamesPlayed: 18,
    lastActive: "Today, 3:45 PM",
    subjects: [
      { name: "Arabic Language", pct: 78, color: "#6366f1", icon: "arabic",  trend: +5, lessons: 24, rank: 8  },
      { name: "Mathematics",     pct: 65, color: "#ec4899", icon: "math",    trend: +3, lessons: 18, rank: 14 },
      { name: "Science",         pct: 91, color: "#10b981", icon: "science", trend: +8, lessons: 31, rank: 3  },
      { name: "Social Studies",  pct: 55, color: "#f59e0b", icon: "social",  trend: -2, lessons: 12, rank: 22 },
      { name: "English",         pct: 82, color: "#06b6d4", icon: "english", trend: +6, lessons: 27, rank: 6  },
      { name: "Art & Drawing",   pct: 94, color: "#8b5cf6", icon: "art",     trend: +4, lessons: 19, rank: 2  },
    ],
    recentActivity: [
      { id: "a1", type: "quiz",    title: "Fractions Quiz",          subject: "Mathematics",     time: "2h ago",    score: "9/10",  icon: "math",    xpGained: 120, duration: "8 min"  },
      { id: "a2", type: "story",   title: "The Brave Astronaut",     subject: "Science",         time: "5h ago",    score: null,    icon: "science", xpGained: 80,  duration: "12 min" },
      { id: "a3", type: "drawing", title: "Desert Animals",          subject: "Art & Drawing",   time: "Yesterday", score: "4/5",   icon: "art",     xpGained: 95,  duration: "20 min" },
      { id: "a4", type: "quiz",    title: "Arabic Letters Practice", subject: "Arabic Language", time: "Yesterday", score: "10/10", icon: "arabic",  xpGained: 150, duration: "6 min"  },
      { id: "a5", type: "game",    title: "Math Race",               subject: "Mathematics",     time: "2d ago",    score: "#1",    icon: "gamepad", xpGained: 200, duration: "15 min" },
    ],
    latestBadges: [
      { id: "b1", name: "Quiz Master",  iconType: "trophy", color: "#f59e0b", earned: "Today",     desc: "Scored 90%+ on 5 quizzes", rarity: "Rare"   },
      { id: "b2", name: "Streak King",  iconType: "flame",  color: "#ef4444", earned: "Yesterday", desc: "7-day streak",              rarity: "Common" },
      { id: "b3", name: "Science Star", iconType: "atom",   color: "#6366f1", earned: "3d ago",    desc: "All Science modules done",  rarity: "Epic"   },
      { id: "b4", name: "Artist Elite", iconType: "art",    color: "#8b5cf6", earned: "1w ago",    desc: "5 drawings top rated",      rarity: "Rare"   },
    ],
    weeklyData:  [45, 62, 30, 78, 55, 90, 52],
    monthlyData: [200, 280, 240, 320, 290, 380, 350, 420, 310, 390, 440, 312],
    insights: [
      { type: "strength", iconType: "atom",  bg: "rgba(16,185,129,0.1)", title: "Science Superstar",              text: "Sara excels in Science with 91% mastery — top 10% of her grade." },
      { type: "focus",    iconType: "globe", bg: "rgba(245,158,11,0.1)", title: "Social Studies needs attention", text: "Progress slipped 2% this week. Try the Egypt Ancient Kingdoms module." },
      { type: "streak",   iconType: "flame", bg: "rgba(239,68,68,0.1)",  title: "7-Day Streak!",                  text: "Sara has been learning every day this week. Celebrate!" },
      { type: "tip",      iconType: "brain", bg: "rgba(99,102,241,0.1)", title: "Study Tip",                      text: "Sessions between 3–5 PM show 23% better retention." },
    ],
  },
  {
    id: "c2", name: "Omar", age: 10, grade: "Grade 5", avatarIcon: "zap", color: "#6366f1",
    level: 18, xp: 6200, xpNext: 7000, streak: 3, badges: 22, timeThisWeek: 480,
    activitiesCompleted: 67, averageScore: 93, quizzesTotal: 41, storiesRead: 18, gamesPlayed: 30,
    lastActive: "Today, 1:20 PM",
    subjects: [
      { name: "Arabic Language", pct: 88, color: "#6366f1", icon: "arabic",  trend: +2, lessons: 38, rank: 4  },
      { name: "Mathematics",     pct: 95, color: "#ec4899", icon: "math",    trend: +7, lessons: 45, rank: 1  },
      { name: "Science",         pct: 72, color: "#10b981", icon: "science", trend: -3, lessons: 28, rank: 12 },
      { name: "Social Studies",  pct: 61, color: "#f59e0b", icon: "social",  trend: +4, lessons: 20, rank: 18 },
      { name: "English",         pct: 79, color: "#06b6d4", icon: "english", trend: +5, lessons: 32, rank: 7  },
      { name: "Art & Drawing",   pct: 45, color: "#8b5cf6", icon: "art",     trend: -1, lessons: 10, rank: 29 },
    ],
    recentActivity: [
      { id: "a1", type: "quiz",    title: "Algebra Basics",    subject: "Mathematics",    time: "1h ago",    score: "10/10", icon: "math",   xpGained: 200, duration: "10 min" },
      { id: "a2", type: "mindmap", title: "The Solar System",  subject: "Science",        time: "3h ago",    score: null,    icon: "orbit",  xpGained: 70,  duration: "18 min" },
      { id: "a3", type: "game",    title: "Word Builder",      subject: "Arabic Language",time: "Yesterday", score: "#3",    icon: "arabic", xpGained: 140, duration: "20 min" },
    ],
    latestBadges: [
      { id: "b1", name: "Math Wizard",  iconType: "math",   color: "#6366f1", earned: "Today",  desc: "20 advanced algebra problems", rarity: "Epic"      },
      { id: "b2", name: "Top Scorer",   iconType: "trophy", color: "#f59e0b", earned: "2d ago", desc: "#1 in weekly leaderboard",     rarity: "Legendary" },
      { id: "b3", name: "Fast Learner", iconType: "zap",    color: "#ec4899", earned: "6d ago", desc: "3 modules in a single day",    rarity: "Rare"      },
    ],
    weeklyData:  [80, 95, 60, 88, 72, 100, 85],
    monthlyData: [300, 350, 280, 420, 380, 460, 440, 520, 490, 580, 540, 480],
    insights: [
      { type: "strength",  iconType: "math",   bg: "rgba(16,185,129,0.1)", title: "Mathematics Champion",     text: "Omar is performing exceptionally — 95% mastery, top 5% nationally." },
      { type: "celebrate", iconType: "trophy", bg: "rgba(99,102,241,0.1)", title: "Level 18 achieved!",       text: "Only 800 XP away from the legendary Level 20 badge!" },
    ],
  },
  {
    id: "c3", name: "Layla", age: 6, grade: "Grade 1", avatarIcon: "baby", color: "#10b981",
    level: 5, xp: 890, xpNext: 1200, streak: 12, badges: 7, timeThisWeek: 198,
    activitiesCompleted: 29, averageScore: 75, quizzesTotal: 12, storiesRead: 22, gamesPlayed: 14,
    lastActive: "Today, 10:30 AM",
    subjects: [
      { name: "Arabic Language", pct: 62, color: "#6366f1", icon: "arabic",  trend: +8, lessons: 15, rank: 11 },
      { name: "Mathematics",     pct: 55, color: "#ec4899", icon: "math",    trend: +4, lessons: 12, rank: 16 },
      { name: "Science",         pct: 70, color: "#10b981", icon: "science", trend: +6, lessons: 18, rank: 9  },
      { name: "Social Studies",  pct: 48, color: "#f59e0b", icon: "social",  trend: +3, lessons: 10, rank: 24 },
      { name: "English",         pct: 60, color: "#06b6d4", icon: "english", trend: +9, lessons: 14, rank: 13 },
      { name: "Art & Drawing",   pct: 88, color: "#8b5cf6", icon: "art",     trend: +5, lessons: 21, rank: 4  },
    ],
    recentActivity: [
      { id: "a1", type: "story",   title: "The Magic Garden",  subject: "Arabic Language", time: "1h ago",    score: null,  icon: "scroll",  xpGained: 50,  duration: "9 min"  },
      { id: "a2", type: "game",    title: "Number Bubbles",    subject: "Mathematics",     time: "3h ago",    score: "#2",  icon: "gamepad", xpGained: 110, duration: "12 min" },
      { id: "a3", type: "drawing", title: "My Family Drawing", subject: "Art & Drawing",   time: "Yesterday", score: "5/5", icon: "art",     xpGained: 90,  duration: "18 min" },
    ],
    latestBadges: [
      { id: "b1", name: "Streak Star",  iconType: "flame",  color: "#10b981", earned: "Today",  desc: "12 days in a row!", rarity: "Epic"   },
      { id: "b2", name: "Story Lover",  iconType: "scroll", color: "#f59e0b", earned: "3d ago", desc: "Read 20 stories",   rarity: "Common" },
      { id: "b3", name: "Creative Kid", iconType: "art",    color: "#8b5cf6", earned: "5d ago", desc: "5-star drawings",   rarity: "Rare"   },
    ],
    weeklyData:  [20, 38, 25, 45, 30, 55, 28],
    monthlyData: [80, 120, 100, 150, 130, 180, 160, 200, 140, 190, 210, 198],
    insights: [
      { type: "strength",  iconType: "star", bg: "rgba(16,185,129,0.1)", title: "12-Day Streak Record!", text: "Layla has the longest streak in your family!" },
      { type: "celebrate", iconType: "art",  bg: "rgba(139,92,246,0.1)", title: "Art talent emerging",   text: "Top 3% for Grade 1. Consider the advanced Art module!" },
    ],
  },
  {
    id: "c4", name: "Youssef", age: 12, grade: "Grade 6", avatarIcon: "rocket", color: "#f59e0b",
    level: 24, xp: 9400, xpNext: 10000, streak: 5, badges: 31, timeThisWeek: 560,
    activitiesCompleted: 89, averageScore: 91, quizzesTotal: 58, storiesRead: 25, gamesPlayed: 45,
    lastActive: "Yesterday, 9:00 PM",
    subjects: [
      { name: "Arabic Language", pct: 92, color: "#6366f1", icon: "arabic",  trend: +3, lessons: 52, rank: 2 },
      { name: "Mathematics",     pct: 88, color: "#ec4899", icon: "math",    trend: +2, lessons: 48, rank: 5 },
      { name: "Science",         pct: 96, color: "#10b981", icon: "science", trend: +5, lessons: 61, rank: 1 },
      { name: "Social Studies",  pct: 79, color: "#f59e0b", icon: "social",  trend: -1, lessons: 38, rank: 9 },
      { name: "English",         pct: 94, color: "#06b6d4", icon: "english", trend: +4, lessons: 55, rank: 3 },
      { name: "Art & Drawing",   pct: 58, color: "#8b5cf6", icon: "art",     trend: +2, lessons: 22, rank: 20},
    ],
    recentActivity: [
      { id: "a1", type: "quiz",  title: "Advanced Algebra",   subject: "Mathematics", time: "4h ago", score: "10/10", icon: "math",    xpGained: 250, duration: "12 min" },
      { id: "a2", type: "essay", title: "The Future of AI",   subject: "English",     time: "1d ago", score: "5/5",   icon: "pen",     xpGained: 180, duration: "35 min" },
      { id: "a3", type: "quiz",  title: "Human Body Systems", subject: "Science",     time: "1d ago", score: "9/10",  icon: "science", xpGained: 190, duration: "15 min" },
    ],
    latestBadges: [
      { id: "b1", name: "Legend",      iconType: "crown",   color: "#f59e0b", earned: "Today",  desc: "Level 24 — only 7 students!",    rarity: "Legendary" },
      { id: "b2", name: "Science God", iconType: "science", color: "#10b981", earned: "1d ago", desc: "96% mastery in Science",         rarity: "Legendary" },
      { id: "b3", name: "Polyglot",    iconType: "globe",   color: "#06b6d4", earned: "3d ago", desc: "Top in Arabic and English",      rarity: "Epic"      },
    ],
    weeklyData:  [90, 110, 75, 105, 88, 120, 95],
    monthlyData: [380, 420, 360, 500, 460, 540, 510, 620, 580, 660, 630, 560],
    insights: [
      { type: "strength",  iconType: "crown",  bg: "rgba(245,158,11,0.1)", title: "Top 1% Learner",    text: "Youssef is in the top 1% of all Kidventure learners." },
      { type: "celebrate", iconType: "target", bg: "rgba(16,185,129,0.1)", title: "Level 25 incoming", text: "Only 600 XP away from Level 25 and the Grandmaster badge." },
    ],
  },
];

const SEED_PARENT = {
  name: "Ahmed Hassan",
  email: "ahmed@example.com",
  phone: "+20 100 000 0000",
  plan: "Kidventure Pro",
  joinedDate: "January 2025",
  language: "Arabic",
  city: "Cairo",
  country: "Egypt",
};

const SEED_NOTIFS = [
  { id: "n1", text: "Sara completed Fractions Quiz with 90% improvement!", time: "2h ago",  read: false, type: "achievement" },
  { id: "n2", text: "Omar earned the Math Wizard badge!",                   time: "5h ago",  read: false, type: "badge"       },
  { id: "n3", text: "Layla has a 12-day streak — her longest ever!",        time: "8h ago",  read: false, type: "streak"      },
  { id: "n4", text: "Youssef reached Level 24 and unlocked a new reward!",  time: "1d ago",  read: true,  type: "level"       },
  { id: "n5", text: "Your weekly family progress report is ready.",         time: "1d ago",  read: true,  type: "report"      },
  { id: "n6", text: "New Science content: 'Deep Ocean Mysteries'",          time: "2d ago",  read: true,  type: "content"     },
];

const BILLING_HISTORY = [
  { date: "Jun 15, 2026", amount: "EGP 49", method: "Visa ending 4242", txId: "TXN-2026-06-001" },
  { date: "May 15, 2026", amount: "EGP 49", method: "Visa ending 4242", txId: "TXN-2026-05-001" },
  { date: "Apr 15, 2026", amount: "EGP 49", method: "Visa ending 4242", txId: "TXN-2026-04-001" },
  { date: "Mar 15, 2026", amount: "EGP 49", method: "Visa ending 4242", txId: "TXN-2026-03-001" },
];

/* ─────────────────────────────────────────────────────────────
   LOCAL STORAGE HELPERS
───────────────────────────────────────────────────────────── */
const LS = {
  get: (key, fallback) => {
    try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
  remove: (key) => { try { localStorage.removeItem(key); } catch {} },
};

function initData() {
  if (!LS.get("kv_init_v10", false)) {
    LS.set("kv_children",      SEED_CHILDREN);
    LS.set("kv_parent",        SEED_PARENT);
    LS.set("kv_notifications", SEED_NOTIFS);
    LS.set("kv_init_v10",      true);
  }
}

/* ─────────────────────────────────────────────────────────────
   PDF HELPERS — theme-aware print approach
───────────────────────────────────────────────────────────── */
function printHtmlAsPdf(htmlContent, filename, isDark = false) {
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    alert("Please allow popups to download PDF");
    return;
  }

  const themeVars = isDark
    ? `
      --bg: #080c14;
      --surface: #0f1623;
      --surface-alt: #161e2e;
      --border: #1a2535;
      --text-primary: #f1f5f9;
      --text-secondary: #cbd5e1;
      --text-muted: #94a3b8;
      --text-faint: #475569;
      body { background: #080c14 !important; color: #f1f5f9 !important; }
    `
    : `
      --bg: #f4f6fb;
      --surface: #ffffff;
      --surface-alt: #f8fafc;
      --border: #e2e8f0;
      --text-primary: #0f172a;
      --text-secondary: #334155;
      --text-muted: #64748b;
      --text-faint: #94a3b8;
      body { background: #ffffff !important; color: #0f172a !important; }
    `;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${filename}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        :root { ${themeVars} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', Arial, sans-serif; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      </style>
    </head>
    <body>
      ${htmlContent}
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          }, 800);
        };
      <\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function generateReportHTML(child, isDark = false) {
  const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const maxW = Math.max(...child.weeklyData, 1);

  const textPrimary   = isDark ? "#f1f5f9" : "#0f172a";
  const textSecondary = isDark ? "#cbd5e1"  : "#334155";
  const textMuted     = isDark ? "#94a3b8"  : "#64748b";
  const borderCol     = isDark ? "#1a2535"  : "#e2e8f0";
  const bodyBg        = isDark ? "#080c14"  : "#ffffff";

  return `
    <div style="width:700px;margin:0 auto;font-family:'Inter',Arial,sans-serif;color:${textPrimary};background:${bodyBg};">
      <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:36px 44px;color:#fff;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">
          <div>
            <div style="font-size:30px;font-weight:900;letter-spacing:-0.5px;">Kidventure</div>
            <div style="font-size:14px;opacity:0.8;margin-top:4px;">Learning Progress Platform</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:12px;opacity:0.7;">Report Generated</div>
            <div style="font-size:14px;font-weight:700;">${dateStr}</div>
          </div>
        </div>
        <div style="background:rgba(255,255,255,0.15);border-radius:16px;padding:20px 24px;">
          <div style="font-size:24px;font-weight:900;">${child.name}</div>
          <div style="font-size:14px;opacity:0.85;margin-top:4px;">${child.grade} · Age ${child.age} · Level ${child.level}</div>
        </div>
      </div>

      <div style="padding:32px 44px 0;background:${bodyBg};">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:28px;">
          ${[
            { label:"Average Score",     value:`${child.averageScore}%`, color:"#6366f1" },
            { label:"Total Activities",  value:child.activitiesCompleted, color:"#10b981" },
            { label:"Badges Earned",     value:child.badges,              color:"#f59e0b" },
            { label:`${child.streak}-Day Streak`, value:`${child.streak} days`, color:"#ef4444" },
            { label:"Quizzes Passed",    value:child.quizzesTotal,        color:"#8b5cf6" },
            { label:"Stories Read",      value:child.storiesRead,         color:"#06b6d4" },
          ].map(s => `
            <div style="padding:18px 20px;background:${s.color}18;border:1.5px solid ${s.color}40;border-radius:14px;">
              <div style="font-size:28px;font-weight:900;color:${s.color};">${s.value}</div>
              <div style="font-size:12px;color:${textMuted};margin-top:6px;">${s.label}</div>
            </div>
          `).join("")}
        </div>

        <h3 style="font-size:17px;font-weight:800;margin:0 0 18px;color:${textPrimary};border-bottom:2px solid ${borderCol};padding-bottom:10px;">Subject Progress</h3>
        ${child.subjects.map(s => `
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:14px;">
            <div style="width:150px;font-size:13px;color:${textSecondary};flex-shrink:0;">${s.name}</div>
            <div style="flex:1;height:12px;background:${isDark ? "#1e293b" : "#f1f5f9"};border-radius:99px;overflow:hidden;">
              <div style="height:100%;width:${s.pct}%;background:${s.color};border-radius:99px;"></div>
            </div>
            <div style="width:44px;text-align:right;font-size:14px;font-weight:700;color:${s.color};">${s.pct}%</div>
            <div style="width:42px;text-align:right;font-size:12px;color:${s.trend >= 0 ? "#10b981" : "#ef4444"};font-weight:600;">${s.trend >= 0 ? "+" : ""}${s.trend}%</div>
            <div style="width:52px;text-align:right;font-size:11px;color:${textMuted};">Rank #${s.rank}</div>
          </div>
        `).join("")}

        <h3 style="font-size:17px;font-weight:800;margin:28px 0 14px;color:${textPrimary};border-bottom:2px solid ${borderCol};padding-bottom:10px;">Weekly Activity (minutes)</h3>
        <div style="display:flex;align-items:flex-end;gap:10px;height:100px;padding-bottom:4px;margin-bottom:24px;">
          ${days.map((day, i) => {
            const h = Math.round((child.weeklyData[i] / maxW) * 90);
            return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
              <div style="font-size:11px;color:#6366f1;font-weight:700;">${child.weeklyData[i]}m</div>
              <div style="width:100%;height:${h}px;background:linear-gradient(180deg,#6366f1,#8b5cf6);border-radius:6px 6px 0 0;min-height:4px;"></div>
              <div style="font-size:10px;color:${textMuted};">${day}</div>
            </div>`;
          }).join("")}
        </div>

        <h3 style="font-size:17px;font-weight:800;margin:0 0 14px;color:${textPrimary};border-bottom:2px solid ${borderCol};padding-bottom:10px;">Recent Activities</h3>
        ${child.recentActivity.slice(0,5).map(a => `
          <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid ${borderCol};">
            <div style="flex:1;">
              <div style="font-size:13.5px;font-weight:700;color:${textPrimary};">${a.title}</div>
              <div style="font-size:11.5px;color:${textMuted};">${a.subject} · ${a.type} · ${a.duration}</div>
            </div>
            <div style="text-align:right;">
              ${a.score ? `<div style="font-size:13px;font-weight:700;color:#6366f1;">${a.score}</div>` : ""}
              <div style="font-size:11.5px;color:#10b981;font-weight:700;">+${a.xpGained} XP</div>
              <div style="font-size:10.5px;color:${textMuted};">${a.time}</div>
            </div>
          </div>
        `).join("")}

        ${child.insights && child.insights.length > 0 ? `
          <h3 style="font-size:17px;font-weight:800;margin:28px 0 14px;color:${textPrimary};border-bottom:2px solid ${borderCol};padding-bottom:10px;">AI Learning Insights</h3>
          ${child.insights.map(ins => `
            <div style="display:flex;align-items:flex-start;gap:14px;padding:14px 18px;border-radius:12px;background:${ins.bg};margin-bottom:10px;border:1px solid rgba(0,0,0,0.06);">
              <div style="flex:1;">
                <div style="font-size:14px;font-weight:800;color:${textPrimary};margin-bottom:4px;">${ins.title}</div>
                <div style="font-size:12.5px;color:${textSecondary};line-height:1.55;">${ins.text}</div>
              </div>
            </div>
          `).join("")}
        ` : ""}
      </div>

      <div style="padding:20px 44px;border-top:1.5px solid ${borderCol};display:flex;justify-content:space-between;align-items:center;margin-top:24px;background:${bodyBg};">
        <div style="font-size:11px;color:${textMuted};">Kidventure Learning Platform — Confidential</div>
        <div style="font-size:11px;color:${textMuted};">Generated: ${dateStr}</div>
      </div>
    </div>
  `;
}

function generateInvoiceHTML(billing, parent, isDark = false) {
  const textPrimary   = isDark ? "#f1f5f9" : "#0f172a";
  const textMuted     = isDark ? "#94a3b8"  : "#64748b";
  const borderCol     = isDark ? "#1a2535"  : "#e2e8f0";
  const bodyBg        = isDark ? "#080c14"  : "#ffffff";
  const surfaceAlt    = isDark ? "#161e2e"  : "#f8fafc";

  return `
    <div style="width:700px;margin:0 auto;padding:48px;font-family:'Inter',Arial,sans-serif;color:${textPrimary};background:${bodyBg};">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;padding-bottom:24px;border-bottom:2px solid ${borderCol};">
        <div>
          <div style="font-size:28px;font-weight:900;color:#6366f1;letter-spacing:-0.5px;">Kidventure</div>
          <div style="font-size:13px;color:${textMuted};margin-top:4px;">Learning Progress Platform</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:22px;font-weight:900;color:${textPrimary};">INVOICE</div>
          <div style="font-size:12px;color:${textMuted};margin-top:6px;">Receipt: <strong>${billing.txId}</strong></div>
          <div style="font-size:12px;color:${textMuted};margin-top:3px;">Date: <strong>${billing.date}</strong></div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:36px;">
        <div>
          <div style="font-size:11px;font-weight:800;color:${textMuted};text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Billed To</div>
          <div style="font-size:15px;font-weight:800;color:${textPrimary};">${parent.name}</div>
          <div style="font-size:13px;color:${textMuted};margin-top:4px;">${parent.email}</div>
          <div style="font-size:13px;color:${textMuted};">${parent.city || "Cairo"}, ${parent.country || "Egypt"}</div>
          ${parent.phone ? `<div style="font-size:13px;color:${textMuted};">${parent.phone}</div>` : ""}
        </div>
        <div>
          <div style="font-size:11px;font-weight:800;color:${textMuted};text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Subscription Plan</div>
          <div style="font-size:15px;font-weight:800;color:#6366f1;">${parent.plan}</div>
          <div style="font-size:13px;color:${textMuted};margin-top:4px;">Billing Period: ${billing.date}</div>
          <div style="font-size:13px;color:${textMuted};">Member Since: ${parent.joinedDate}</div>
        </div>
      </div>

      <div style="border:1.5px solid ${borderCol};border-radius:14px;overflow:hidden;margin-bottom:24px;">
        <div style="display:grid;grid-template-columns:1fr 120px 100px;background:${surfaceAlt};padding:14px 20px;border-bottom:1.5px solid ${borderCol};">
          <div style="font-size:11px;font-weight:800;color:${textMuted};text-transform:uppercase;letter-spacing:0.8px;">Description</div>
          <div style="font-size:11px;font-weight:800;color:${textMuted};text-transform:uppercase;letter-spacing:0.8px;text-align:center;">Status</div>
          <div style="font-size:11px;font-weight:800;color:${textMuted};text-transform:uppercase;letter-spacing:0.8px;text-align:right;">Amount</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 120px 100px;padding:20px;border-bottom:1.5px solid ${borderCol};background:${bodyBg};">
          <div>
            <div style="font-size:14px;font-weight:700;color:${textPrimary};">${parent.plan} — Monthly</div>
            <div style="font-size:12px;color:${textMuted};margin-top:4px;">Full platform access for your family</div>
          </div>
          <div style="text-align:center;padding-top:2px;">
            <span style="font-size:11px;font-weight:700;color:#10b981;background:rgba(16,185,129,0.1);padding:4px 12px;border-radius:99px;">PAID</span>
          </div>
          <div style="text-align:right;font-size:15px;font-weight:800;color:${textPrimary};padding-top:2px;">${billing.amount}</div>
        </div>
      </div>

      <div style="display:flex;justify-content:flex-end;margin-bottom:36px;">
        <div style="width:260px;">
          <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:13px;color:${textMuted};">
            <span>Subtotal</span><span>${billing.amount}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:13px;color:${textMuted};">
            <span>Tax (0%)</span><span>EGP 0</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:12px 0;border-top:2px solid ${textPrimary};margin-top:6px;font-size:16px;font-weight:900;color:${textPrimary};">
            <span>Total</span><span>${billing.amount}</span>
          </div>
        </div>
      </div>

      <div style="background:${surfaceAlt};border:1.5px solid ${borderCol};border-radius:14px;padding:20px 24px;margin-bottom:32px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          <div>
            <div style="font-size:11px;font-weight:800;color:${textMuted};text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;">Payment Method</div>
            <div style="font-size:13.5px;font-weight:700;color:${textPrimary};">${billing.method}</div>
          </div>
          <div>
            <div style="font-size:11px;font-weight:800;color:${textMuted};text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;">Transaction ID</div>
            <div style="font-size:13.5px;font-weight:700;color:${textPrimary};font-family:monospace;">${billing.txId}</div>
          </div>
        </div>
      </div>

      <div style="text-align:center;padding:24px;background:linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.04));border-radius:16px;border:1.5px solid rgba(99,102,241,0.15);margin-bottom:24px;">
        <div style="font-size:16px;font-weight:800;color:#6366f1;margin-bottom:6px;">Thank you for choosing Kidventure!</div>
        <div style="font-size:12.5px;color:${textMuted};">Helping families build a love for learning — one day at a time.</div>
      </div>

      <div style="text-align:center;font-size:11px;color:${textMuted};padding-top:16px;border-top:1px solid ${borderCol};">
        This is an automatically generated invoice. Secured with 256-bit encryption.
      </div>
    </div>
  `;
}

function generateExportDataHTML(parent, children, isDark = false) {
  const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const textPrimary   = isDark ? "#f1f5f9" : "#0f172a";
  const textMuted     = isDark ? "#94a3b8"  : "#64748b";
  const borderCol     = isDark ? "#1a2535"  : "#e2e8f0";
  const bodyBg        = isDark ? "#080c14"  : "#ffffff";
  const surfaceAlt    = isDark ? "#161e2e"  : "#f8fafc";
  const headerBg      = isDark ? "linear-gradient(135deg,#0f172a,#1e293b)" : "linear-gradient(135deg,#1e293b,#334155)";

  return `
    <div style="width:700px;margin:0 auto;padding:48px;font-family:'Inter',Arial,sans-serif;color:${textPrimary};background:${bodyBg};">
      <div style="background:${headerBg};padding:36px 44px;color:#fff;border-radius:16px;margin-bottom:32px;">
        <div style="font-size:28px;font-weight:900;letter-spacing:-0.5px;margin-bottom:6px;">Kidventure</div>
        <div style="font-size:16px;font-weight:700;opacity:0.85;">Account Data Export</div>
        <div style="font-size:13px;opacity:0.6;margin-top:6px;">Generated on ${dateStr}</div>
      </div>

      <h3 style="font-size:17px;font-weight:800;margin:0 0 16px;color:${textPrimary};border-bottom:2px solid ${borderCol};padding-bottom:10px;">Account Information</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:32px;">
        ${[
          { label:"Full Name",     value: parent.name },
          { label:"Email",         value: parent.email },
          { label:"Phone",         value: parent.phone || "—" },
          { label:"City",          value: parent.city || "Cairo" },
          { label:"Country",       value: parent.country || "Egypt" },
          { label:"Language",      value: parent.language || "Arabic" },
          { label:"Plan",          value: parent.plan },
          { label:"Member Since",  value: parent.joinedDate },
        ].map(item => `
          <div style="padding:14px 18px;background:${surfaceAlt};border:1.5px solid ${borderCol};border-radius:12px;">
            <div style="font-size:10.5px;font-weight:700;color:${textMuted};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:5px;">${item.label}</div>
            <div style="font-size:14px;font-weight:700;color:${textPrimary};">${item.value}</div>
          </div>
        `).join("")}
      </div>

      <h3 style="font-size:17px;font-weight:800;margin:0 0 16px;color:${textPrimary};border-bottom:2px solid ${borderCol};padding-bottom:10px;">Children Profiles (${children.length})</h3>
      ${children.map(c => `
        <div style="background:${surfaceAlt};border:1.5px solid ${borderCol};border-radius:16px;padding:20px 24px;margin-bottom:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <div>
              <div style="font-size:18px;font-weight:900;color:${textPrimary};">${c.name}</div>
              <div style="font-size:13px;color:${textMuted};">${c.grade} · Age ${c.age} · Level ${c.level}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:22px;font-weight:900;color:#6366f1;">${c.averageScore}%</div>
              <div style="font-size:11px;color:${textMuted};">Avg Score</div>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px;">
            ${[
              { label:"XP",         value: c.xp.toLocaleString() },
              { label:"Badges",     value: c.badges },
              { label:"Streak",     value: `${c.streak} days` },
              { label:"Activities", value: c.activitiesCompleted },
            ].map(s => `
              <div style="text-align:center;padding:10px;background:${bodyBg};border-radius:10px;border:1px solid ${borderCol};">
                <div style="font-size:16px;font-weight:900;color:#6366f1;">${s.value}</div>
                <div style="font-size:10px;color:${textMuted};margin-top:2px;">${s.label}</div>
              </div>
            `).join("")}
          </div>
          <div style="font-size:12.5px;color:${textMuted};">Last Active: ${c.lastActive}</div>
        </div>
      `).join("")}

      <h3 style="font-size:17px;font-weight:800;margin:0 0 16px;color:${textPrimary};border-bottom:2px solid ${borderCol};padding-bottom:10px;">Billing History</h3>
      ${BILLING_HISTORY.map(b => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:${surfaceAlt};border:1px solid ${borderCol};border-radius:10px;margin-bottom:8px;">
          <div>
            <div style="font-size:13px;font-weight:700;color:${textPrimary};">${b.date}</div>
            <div style="font-size:11.5px;color:${textMuted};">${b.txId} · ${b.method}</div>
          </div>
          <div style="font-size:15px;font-weight:900;color:#10b981;">${b.amount}</div>
        </div>
      `).join("")}

      <div style="text-align:center;padding:24px;background:linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.04));border-radius:16px;border:1.5px solid rgba(99,102,241,0.15);margin-top:32px;">
        <div style="font-size:13px;color:${textMuted};">This document contains your personal data as stored by Kidventure.</div>
        <div style="font-size:11.5px;color:${textMuted};margin-top:4px;">GDPR / COPPA compliant · Data encrypted at rest</div>
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────────────────────
   ICON RESOLVER
───────────────────────────────────────────────────────────── */
function KvIcon({ type, size = 16, color, style, className }) {
  const p = { size, color, style, className };
  switch (type) {
    case "arabic":    return <Languages {...p} />;
    case "math":      return <Sigma {...p} />;
    case "science":   return <Atom {...p} />;
    case "social":    return <Globe {...p} />;
    case "english":   return <BookText {...p} />;
    case "art":       return <Paintbrush {...p} />;
    case "quiz":      return <CheckCircle {...p} />;
    case "story":
    case "scroll":    return <ScrollText {...p} />;
    case "drawing":
    case "pen":       return <Pen {...p} />;
    case "lesson":    return <GraduationCap {...p} />;
    case "game":
    case "gamepad":   return <Gamepad2 {...p} />;
    case "mindmap":   return <Network {...p} />;
    case "essay":     return <FileText {...p} />;
    case "orbit":     return <Orbit {...p} />;
    case "trophy":    return <Trophy {...p} />;
    case "star":      return <Star {...p} />;
    case "flame":     return <Flame {...p} />;
    case "zap":       return <Zap {...p} />;
    case "sparkles":  return <Sparkles {...p} />;
    case "crown":     return <Crown {...p} />;
    case "gem":       return <Gem {...p} />;
    case "shield":    return <Shield {...p} />;
    case "award":     return <Award {...p} />;
    case "rocket":    return <Rocket {...p} />;
    case "target":    return <Target {...p} />;
    case "book":      return <BookOpen {...p} />;
    case "atom":      return <Atom {...p} />;
    case "brain":     return <BrainCircuit {...p} />;
    case "medal":     return <Medal {...p} />;
    case "wand":      return <Wand2 {...p} />;
    case "puzzle":    return <Puzzle {...p} />;
    case "globe":     return <Globe {...p} />;
    case "heart":     return <Heart {...p} />;
    case "flower2":   return <Flower2 {...p} />;
    case "baby":      return <Baby {...p} />;
    case "bird":      return <Bird {...p} />;
    case "cat":       return <Cat {...p} />;
    case "dog":       return <Dog {...p} />;
    case "fish":      return <Fish {...p} />;
    case "candy":     return <Candy {...p} />;
    case "smile":     return <Smile {...p} />;
    case "gift":      return <Gift {...p} />;
    case "bike":      return <Bike {...p} />;
    case "users":     return <Users {...p} />;
    default:          return <Star {...p} />;
  }
}

/* ─────────────────────────────────────────────────────────────
   COUNT-UP HOOK
───────────────────────────────────────────────────────────── */
function useCountUp(target, duration = 1400, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf;
    const timeout = setTimeout(() => {
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [target, duration, delay]);
  return count;
}

/* ─────────────────────────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────────────────────────── */
function ProgressBar({ pct, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay + 100);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div style={{ flex: 1, height: 7, background: "rgba(148,163,184,0.15)", borderRadius: 99, overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 99, width: `${width}%`,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        boxShadow: `0 0 8px ${color}44`,
        transition: `width 1.4s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
      }} />
    </div>
  );
}

function XpBar({ xp, xpNext, color }) {
  const pct = Math.min((xp / xpNext) * 100, 100);
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(pct), 300); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ height: 7, background: "rgba(148,163,184,0.15)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99, width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${color}bb)`,
          transition: "width 1.6s cubic-bezier(0.34,1.56,0.64,1)",
        }} />
      </div>
      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
        {xp.toLocaleString()} / {xpNext.toLocaleString()} XP
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SPARKLINE CANVAS
───────────────────────────────────────────────────────────── */
function WeeklySparkline({ data, color, height = 64 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.offsetWidth || 200; const H = height;
    c.width = W * window.devicePixelRatio; c.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    const max = Math.max(...data, 1);
    const pad = 10; const step = (W - pad * 2) / (data.length - 1);
    const pts = data.map((v, i) => [pad + i * step, H - (v / max) * (H - 24) - 12]);
    let progress = 0; let rafId;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const drawUpTo = Math.min(Math.floor(progress * (pts.length - 1)) + 1, pts.length);
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, color + "55"); grad.addColorStop(1, color + "00");
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < drawUpTo; i++) {
        const mx = (pts[i-1][0] + pts[i][0]) / 2;
        ctx.bezierCurveTo(mx, pts[i-1][1], mx, pts[i][1], pts[i][0], pts[i][1]);
      }
      if (drawUpTo > 1) { ctx.lineTo(pts[drawUpTo-1][0], H); ctx.lineTo(pts[0][0], H); ctx.closePath(); ctx.fillStyle = grad; ctx.fill(); }
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < drawUpTo; i++) {
        const mx = (pts[i-1][0] + pts[i][0]) / 2;
        ctx.bezierCurveTo(mx, pts[i-1][1], mx, pts[i][1], pts[i][0], pts[i][1]);
      }
      ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.lineCap = "round"; ctx.stroke();
      const ep = pts[drawUpTo-1];
      ctx.beginPath(); ctx.arc(ep[0], ep[1], 5, 0, Math.PI*2); ctx.fillStyle = color; ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 2; ctx.stroke();
      if (progress < 1) { progress = Math.min(progress + 0.045, 1); rafId = requestAnimationFrame(draw); }
    };
    const t = setTimeout(() => { rafId = requestAnimationFrame(draw); }, 200);
    return () => { clearTimeout(t); cancelAnimationFrame(rafId); };
  }, [data, color, height]);
  return <canvas ref={ref} style={{ width: "100%", height: `${height}px`, display: "block" }} />;
}

/* ─────────────────────────────────────────────────────────────
   ACTIVITY CHART
───────────────────────────────────────────────────────────── */
function WeeklyActivityChart({ data, color, height = 220, monthlyData }) {
  const ref = useRef(null); const animRef = useRef(null);
  const [mode, setMode] = useState("week");
  const activeData = mode === "week" ? data : monthlyData;

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const W = c.offsetWidth || 400; const H = height;
    c.width = W * window.devicePixelRatio; c.height = H * window.devicePixelRatio;
    const ctx = c.getContext("2d"); ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    const max = Math.max(...activeData, 1);
    const labels = mode === "week"
      ? ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
      : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const padL = 44, padR = 18, padT = 24, padB = 44;
    const chartW = W - padL - padR; const chartH = H - padT - padB;
    const gap = chartW / activeData.length; const barW = gap * 0.5;
    let progress = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i <= 4; i++) {
        const y = padT + chartH - (i/4)*chartH;
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W-padR, y);
        ctx.strokeStyle = "rgba(99,102,241,0.09)"; ctx.lineWidth = 1; ctx.setLineDash([5,5]); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = "rgba(148,163,184,0.7)"; ctx.font = "10px Inter, sans-serif"; ctx.textAlign = "right";
        ctx.fillText(Math.round((i/4)*max)+"m", padL-6, y+3);
      }
      const pts = activeData.map((v,i) => ({ x: padL+i*gap+gap/2, y: padT+chartH-(v/max)*chartH*Math.min(progress*1.4,1), v }));
      pts.forEach((pt,i) => {
        const barH = (activeData[i]/max)*chartH*Math.min(progress*1.4,1);
        const bx = pt.x - barW/2; const by = padT+chartH-barH;
        ctx.shadowColor = color+"44"; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4;
        const grad = ctx.createLinearGradient(0,by,0,padT+chartH);
        grad.addColorStop(0,color+"ff"); grad.addColorStop(0.6,color+"cc"); grad.addColorStop(1,color+"22");
        ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(bx,by,barW,barH,[6,6,0,0]); ctx.fill();
        ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
      });
      if (progress > 0.65) { pts.forEach((pt,i) => { ctx.fillStyle="rgba(148,163,184,0.9)"; ctx.font="10px Inter,sans-serif"; ctx.textAlign="center"; ctx.fillText(labels[i],pt.x,H-10); }); }
      if (progress >= 1) { const maxVal = Math.max(...activeData); pts.forEach(pt => { if(pt.v===maxVal){ ctx.fillStyle=color; ctx.font="bold 12px Inter,sans-serif"; ctx.textAlign="center"; ctx.fillText(maxVal+"m",pt.x,pt.y-12); } }); }
      if (progress < 1) { progress = Math.min(progress+0.018,1); animRef.current = requestAnimationFrame(draw); }
    };
    animRef.current = setTimeout(() => { animRef.current = requestAnimationFrame(draw); }, 150);
    return () => { if(typeof animRef.current==="number") cancelAnimationFrame(animRef.current); else clearTimeout(animRef.current); };
  }, [activeData, color, height, mode]);

  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        {["week","month"].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding:"5px 14px", borderRadius:99, border:"none", cursor:"pointer", fontSize:12, fontWeight:600,
            background: mode===m ? "linear-gradient(135deg,var(--indigo),var(--purple))" : "rgba(148,163,184,0.1)",
            color: mode===m ? "#fff" : "var(--text-muted)"
          }}>{m === "week" ? "This Week" : "12 Months"}</button>
        ))}
      </div>
      <canvas ref={ref} style={{ width:"100%", height:`${height}px`, display:"block" }} />
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, fontSize:11, color:"var(--text-muted)" }}>
        <span style={{ display:"flex", alignItems:"center", gap:5 }}>
          <span style={{ width:10,height:10,borderRadius:"50%",background:color,display:"inline-block" }} />
          {mode==="week" ? "Minutes per day" : "Minutes per month"}
        </span>
        <span>Total: {activeData.reduce((a,b)=>a+b,0)}m</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   RARITY BADGE
───────────────────────────────────────────────────────────── */
function RarityBadge({ rarity }) {
  const map = { Common:{ color:"#6b7280",bg:"rgba(107,114,128,0.12)" }, Rare:{ color:"#3b82f6",bg:"rgba(59,130,246,0.12)" }, Epic:{ color:"#8b5cf6",bg:"rgba(139,92,246,0.12)" }, Legendary:{ color:"#f59e0b",bg:"rgba(245,158,11,0.12)" } };
  const s = map[rarity] || map.Common;
  return (
    <span style={{ fontSize:10, fontWeight:700, color:s.color, background:s.bg, border:`1px solid ${s.color}44`, borderRadius:99, padding:"2px 7px", display:"inline-flex", alignItems:"center", gap:3 }}>
      {rarity}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   GLANCE CARD
───────────────────────────────────────────────────────────── */
function GlanceCard({ icon, label, value, accent, trend, delay }) {
  return (
    <div style={{
      background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16,
      padding: "18px 20px", display: "flex", flexDirection: "column", gap: 6,
      animationDelay: `${delay}ms`, borderTop: `3px solid ${accent}`,
      boxShadow: `0 4px 20px ${accent}15`,
    }}>
      <div style={{ color: accent, opacity: 0.85 }}>{icon}</div>
      <div style={{ fontSize: 26, fontWeight: 900, color: "var(--text-primary)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>{label}</div>
      <div style={{ fontSize: 10.5, color: accent, display: "flex", alignItems: "center", gap: 3, fontWeight: 600 }}>
        <TrendingUp size={10} /> {trend}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TOAST
───────────────────────────────────────────────────────────── */
function Toast({ message, type = "success", onDismiss }) {
  useEffect(() => { const t = setTimeout(onDismiss, 3200); return () => clearTimeout(t); }, [onDismiss]);
  return (
    <div style={{
      position:"fixed", bottom:24, right:24, zIndex:9999,
      background: type==="success" ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#ef4444,#dc2626)",
      color:"#fff", borderRadius:12, padding:"12px 20px", display:"flex", alignItems:"center", gap:10,
      boxShadow:"0 8px 32px rgba(0,0,0,0.25)", fontWeight:600, fontSize:13,
      animation: "slideInRight 0.3s ease",
    }}>
      <CheckCircle size={16} /> {message}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TOGGLE SWITCH
───────────────────────────────────────────────────────────── */
function ToggleSwitch({ defaultOn, onChange }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => { setOn(v => !v); onChange?.(!on); }} style={{
      width:44, height:24, borderRadius:99, border:"none", cursor:"pointer", position:"relative", flexShrink:0,
      background: on ? "linear-gradient(135deg,var(--indigo),var(--purple))" : "rgba(148,163,184,0.25)",
      transition:"background 0.2s",
    }}>
      <span style={{
        position:"absolute", top:3, left: on ? 23 : 3, width:18, height:18, borderRadius:"50%", background:"#fff",
        boxShadow:"0 2px 6px rgba(0,0,0,0.18)", transition:"left 0.2s",
      }} />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   WIDGET HELPER
───────────────────────────────────────────────────────────── */
function Widget({ title, titleIcon, badge, action, onAction, children, style: extraStyle }) {
  return (
    <div style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:18, padding:22, ...extraStyle }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8,fontSize:13.5,fontWeight:800,color:"var(--text-primary)" }}>
          <span style={{ color:"var(--indigo)" }}>{titleIcon}</span> {title}
        </div>
        {badge && <span style={{ fontSize:10.5,fontWeight:700,background:"rgba(99,102,241,0.1)",color:"var(--indigo)",padding:"3px 10px",borderRadius:99 }}>{badge}</span>}
        {action && <button onClick={onAction} style={{ fontSize:11.5,fontWeight:700,color:"var(--indigo)",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4 }}>{action}<ChevronRight size={12}/></button>}
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SIGN OUT MODAL
───────────────────────────────────────────────────────────── */
function SignOutModal({ onConfirm, onCancel, loading }) {
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)" }} onClick={onCancel}>
      <div style={{ background:"var(--surface)",borderRadius:20,padding:32,width:360,position:"relative",border:"1.5px solid var(--border)",boxShadow:"0 24px 64px rgba(0,0,0,0.2)" }} onClick={e=>e.stopPropagation()}>
        <button onClick={onCancel} style={{ position:"absolute",top:14,right:14,background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)" }}><X size={16}/></button>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ width:56,height:56,borderRadius:16,background:"rgba(239,68,68,0.12)",border:"1.5px solid rgba(239,68,68,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:"#ef4444" }}><AlertTriangle size={24}/></div>
          <h3 style={{ margin:"0 0 8px",fontSize:18,fontWeight:800,color:"var(--text-primary)" }}>Sign Out?</h3>
          <p style={{ margin:0,fontSize:13.5,color:"var(--text-muted)" }}>You'll be redirected to the login page. Your dashboard data will be saved.</p>
        </div>
        <div style={{ display:"flex",gap:10 }}>
          <button onClick={onCancel} disabled={loading} style={{ flex:1,padding:"10px 0",borderRadius:10,border:"1.5px solid var(--border)",background:"none",cursor:"pointer",fontWeight:600,color:"var(--text-secondary)",fontSize:13 }}>Stay Here</button>
          <button onClick={onConfirm} disabled={loading} style={{ flex:1,padding:"10px 0",borderRadius:10,border:"none",background:"linear-gradient(135deg,#ef4444,#dc2626)",color:"#fff",cursor:"pointer",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:7,fontSize:13 }}>
            {loading ? <span style={{ width:14,height:14,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",animation:"spin 0.7s linear infinite",display:"inline-block" }}/> : <><LogOut size={14}/> Sign Out</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DELETE ACCOUNT MODAL
───────────────────────────────────────────────────────────── */
function DeleteAccountModal({ parentName, childrenNames, onConfirm, onCancel }) {
  const [typed, setTyped] = useState("");
  const [step, setStep]   = useState(1);
  const confirmed = typed.trim().toLowerCase() === "delete";

  const handleDelete = async () => {
    setStep(2);
    await new Promise(r => setTimeout(r, 2000));
    localStorage.clear();
    setStep(3);
  };

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)" }} onClick={onCancel}>
      <div style={{ background:"var(--surface)",borderRadius:24,padding:36,width:440,maxWidth:"95vw",position:"relative",border:"1.5px solid rgba(239,68,68,0.3)",boxShadow:"0 32px 80px rgba(239,68,68,0.15)" }} onClick={e=>e.stopPropagation()}>
        {step !== 3 && <button onClick={onCancel} style={{ position:"absolute",top:14,right:14,background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)" }}><X size={16}/></button>}

        {step === 1 && (
          <>
            <div style={{ textAlign:"center",marginBottom:24 }}>
              <div style={{ width:64,height:64,borderRadius:18,background:"rgba(239,68,68,0.1)",border:"2px solid rgba(239,68,68,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:"#ef4444" }}><Trash2 size={28}/></div>
              <h3 style={{ margin:"0 0 8px",fontSize:20,fontWeight:900,color:"var(--text-primary)" }}>Delete Account</h3>
              <p style={{ margin:0,fontSize:13.5,color:"var(--text-muted)",lineHeight:1.6 }}>
                This will permanently delete {parentName}'s account and {childrenNames.length} child profiles. <strong style={{color:"#ef4444"}}>This cannot be undone.</strong>
              </p>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ display:"block",fontSize:12,fontWeight:700,color:"var(--text-secondary)",marginBottom:8 }}>
                Type <strong style={{color:"#ef4444",fontFamily:"monospace"}}>delete</strong> to confirm
              </label>
              <input
                value={typed}
                onChange={e=>setTyped(e.target.value)}
                placeholder="Type DELETE here"
                style={{ width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${confirmed?"#ef4444":"var(--border)"}`,background:"var(--surface-alt)",color:"var(--text-primary)",fontSize:13.5,outline:"none",boxSizing:"border-box",fontFamily:"monospace" }}
              />
            </div>
            <div style={{ display:"flex",gap:10 }}>
              <button onClick={onCancel} style={{ flex:1,padding:"11px 0",borderRadius:10,border:"1.5px solid var(--border)",background:"none",cursor:"pointer",fontWeight:600,color:"var(--text-secondary)",fontSize:13 }}>Cancel</button>
              <button onClick={handleDelete} disabled={!confirmed} style={{ flex:1,padding:"11px 0",borderRadius:10,border:"none",cursor:confirmed?"pointer":"not-allowed",fontWeight:700,fontSize:13,background:confirmed?"linear-gradient(135deg,#ef4444,#dc2626)":"rgba(239,68,68,0.3)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:7 }}>
                <Trash2 size={14}/> Delete Forever
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <div style={{ textAlign:"center",padding:"24px 0" }}>
            <div style={{ width:64,height:64,borderRadius:"50%",border:"4px solid rgba(239,68,68,0.2)",borderTopColor:"#ef4444",animation:"spin 1s linear infinite",margin:"0 auto 20px" }}/>
            <h4 style={{ fontSize:16,fontWeight:800,color:"var(--text-primary)",marginBottom:8 }}>Deleting account...</h4>
            <p style={{ fontSize:13,color:"var(--text-muted)" }}>Please wait while we remove your data.</p>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign:"center",padding:"24px 0" }}>
            <div style={{ width:64,height:64,borderRadius:"50%",background:"rgba(16,185,129,0.1)",border:"2px solid #10b981",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
              <CheckCircle size={32} color="#10b981"/>
            </div>
            <h4 style={{ fontSize:18,fontWeight:900,color:"var(--text-primary)",marginBottom:8 }}>Account Deleted</h4>
            <p style={{ fontSize:13.5,color:"var(--text-muted)",lineHeight:1.6,marginBottom:24 }}>Your account and all associated data have been permanently removed.</p>
            <button onClick={onConfirm} style={{ padding:"11px 28px",borderRadius:12,border:"none",background:"linear-gradient(135deg,var(--indigo),var(--purple))",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:13 }}>
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION: OVERVIEW
───────────────────────────────────────────────────────────── */
function SectionOverview({ child }) {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const fmtTime = m => m < 60 ? `${m}m` : `${Math.floor(m/60)}h ${m%60}m`;
  const today = new Date().getDay();
  const streakDays = days.map((label,i) => ({
    label, done: i < child.streak && i < 6,
    today: i === (today===0?6:today-1)
  }));

  const cActivities = useCountUp(child.activitiesCompleted, 1000, 200);
  const cBadges     = useCountUp(child.badges,              900,  300);
  const cStreak     = useCountUp(child.streak,              700,  400);
  const cScore      = useCountUp(child.averageScore,        800,  500);

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
      <div style={{ background:`linear-gradient(135deg,${child.color}18,${child.color}06)`,border:`1.5px solid ${child.color}30`,borderRadius:22,padding:"28px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-50,right:-50,width:180,height:180,borderRadius:"50%",background:child.color+"10",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",bottom:-40,left:-40,width:140,height:140,borderRadius:"50%",background:child.color+"08",pointerEvents:"none" }}/>
        <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:20,position:"relative" }}>
          <div>
            <h3 style={{ margin:"0 0 10px",fontSize:24,fontWeight:900,color:"var(--text-primary)",letterSpacing:-0.5 }}>Welcome, {child.name}! 👋</h3>
            <p style={{ margin:"0 0 16px",fontSize:14.5,color:"var(--text-secondary)",lineHeight:1.6 }}>
              Learning for <strong>{fmtTime(child.timeThisWeek)}</strong> this week · <strong>{child.activitiesCompleted}</strong> activities completed
            </p>
            <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
              {[
                { text:`Last Active: ${child.lastActive}`, bg:"rgba(16,185,129,0.12)", color:"#10b981", icon:<CheckCircle size={11}/> },
                { text:`${child.streak} Day Streak`, bg:"rgba(239,68,68,0.12)", color:"#ef4444", icon:<Flame size={11}/> },
                { text:`Level ${child.level}`, bg:"rgba(99,102,241,0.12)", color:"var(--indigo)", icon:<Star size={11}/> },
              ].map((pill,i) => (
                <span key={i} style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"5px 14px",borderRadius:99,background:pill.bg,color:pill.color,fontSize:12,fontWeight:700 }}>{pill.icon}{pill.text}</span>
              ))}
            </div>
          </div>
          <div style={{ color:child.color,flexShrink:0,opacity:0.9 }}>
            <KvIcon type={child.avatarIcon} size={72} color={child.color}/>
          </div>
        </div>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:14 }}>
        <GlanceCard icon={<Clock size={22}/>}       label="Time This Week"    value={fmtTime(child.timeThisWeek)} accent="#6366f1" trend="vs last week" delay={50}  />
        <GlanceCard icon={<CheckCircle size={22}/>} label="Activities Done"   value={cActivities} accent="#10b981" trend="this week" delay={120} />
        <GlanceCard icon={<Award size={22}/>}       label="Badges Earned"     value={cBadges}     accent="#f59e0b" trend="new badges" delay={190} />
        <GlanceCard icon={<Flame size={22}/>}       label="Day Streak"        value={`${cStreak}d`} accent="#ef4444" trend={`Best: ${child.streak}`} delay={260} />
        <GlanceCard icon={<Target size={22}/>}      label="Avg Score"         value={`${cScore}%`} accent="#8b5cf6" trend="Top 15%" delay={330} />
      </div>

      <div style={{ background:"var(--surface)",border:"1.5px solid var(--border)",borderRadius:18,padding:24,borderLeft:`4px solid ${child.color}` }}>
        <div style={{ display:"flex",gap:24,flexWrap:"wrap" }}>
          <div style={{ flex:1,minWidth:200 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:99,background:child.color+"18",color:child.color,fontSize:12,fontWeight:800,marginBottom:10 }}>
              <Star size={12} fill="currentColor"/> Level {child.level}
            </div>
            <p style={{ margin:"0 0 8px",fontSize:14.5,fontWeight:700,color:"var(--text-primary)" }}>{child.name}'s Learning Journey</p>
            <XpBar xp={child.xp} xpNext={child.xpNext} color={child.color}/>
            <div style={{ display:"flex",gap:16,marginTop:8,fontSize:11.5,color:"var(--text-muted)" }}>
              <span style={{ display:"flex",alignItems:"center",gap:4 }}><Target size={11}/> {(child.xpNext-child.xp).toLocaleString()} XP to Level {child.level+1}</span>
              <span style={{ display:"flex",alignItems:"center",gap:4 }}><Trophy size={11}/> {child.grade}</span>
            </div>
          </div>
          <div style={{ flex:1,minWidth:200 }}>
            <p style={{ margin:"0 0 6px",fontSize:11,fontWeight:700,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:0.5 }}>Minutes Learned This Week</p>
            <WeeklySparkline data={child.weeklyData} color={child.color} height={72}/>
            <div style={{ display:"flex",justifyContent:"space-between",marginTop:4,fontSize:10,color:"var(--text-faint)" }}>
              {days.map(d=><span key={d}>{d}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
        <Widget title="Learning Streak" titleIcon={<Flame size={15}/>} badge={`${child.streak} days`}>
          <div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:16 }}>
            <div style={{ fontSize:52,fontWeight:900,color:child.streak>=7?"#ef4444":"#f59e0b",lineHeight:1 }}>{cStreak}</div>
            <div>
              <div style={{ fontWeight:800,fontSize:14,color:"var(--text-primary)",marginBottom:4 }}>{child.streak>=7?"Amazing! Keep going!":"Keep your streak alive!"}</div>
              <div style={{ fontSize:12,color:"var(--text-muted)",lineHeight:1.5 }}>Building a learning habit</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:6 }}>
            {streakDays.map((d,i)=>(
              <div key={i} style={{ flex:1,textAlign:"center" }}>
                <div style={{ width:32,height:32,borderRadius:8,background:d.done?"rgba(239,68,68,0.15)":d.today?`${child.color}18`:"rgba(148,163,184,0.1)",border:`1.5px solid ${d.done?"#ef4444":d.today?child.color:"var(--border)"}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 4px" }}>
                  {d.done?<Flame size={13} color="#ef4444"/>:d.today?<Target size={13} color={child.color}/>:<Clock size={11} color="#9ca3af"/>}
                </div>
                <span style={{ fontSize:9,color:"var(--text-faint)" }}>{d.label}</span>
              </div>
            ))}
          </div>
        </Widget>

        <Widget title="Top Subjects" titleIcon={<BarChart2 size={15}/>} badge={`${child.subjects.length} subjects`}>
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            {child.subjects.slice(0,4).map((s,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:10 }}>
                <KvIcon type={s.icon} size={15} color={s.color}/>
                <span style={{ width:100,fontSize:12,color:"var(--text-secondary)",flexShrink:0 }}>{s.name}</span>
                <ProgressBar pct={s.pct} color={s.color} delay={i*100}/>
                <span style={{ fontSize:12,fontWeight:700,color:s.color,width:32,textAlign:"right" }}>{s.pct}%</span>
                <span style={{ fontSize:10,display:"flex",alignItems:"center",gap:2,color:s.trend>=0?"#10b981":"#ef4444",width:32 }}>
                  {s.trend>=0?<TrendingUp size={10}/>:<TrendingDown size={10}/>}{Math.abs(s.trend)}%
                </span>
              </div>
            ))}
          </div>
        </Widget>
      </div>

      <Widget title="Recent Activity" titleIcon={<Activity size={15}/>} action="View All" onAction={()=>{}}>
        {child.recentActivity.length === 0 ? (
          <div style={{ textAlign:"center",padding:"32px 0",color:"var(--text-muted)" }}>
            <BookOpen size={36} style={{ opacity:0.25,display:"block",margin:"0 auto 10px" }}/>
            <p style={{ fontSize:13.5,fontWeight:600,margin:0 }}>No activity yet</p>
          </div>
        ) : child.recentActivity.map(a=>(
          <div key={a.id} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid var(--border)" }}>
            <div style={{ width:38,height:38,borderRadius:11,background:"rgba(99,102,241,0.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <KvIcon type={a.icon} size={17} color="var(--indigo)"/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13.5,fontWeight:700,color:"var(--text-primary)" }}>{a.title}</div>
              <div style={{ fontSize:11.5,color:"var(--text-muted)" }}>{a.subject} · {a.type} · {a.duration}</div>
            </div>
            <div style={{ textAlign:"right",flexShrink:0 }}>
              {a.score && <div style={{ fontSize:13,fontWeight:700,color:"var(--indigo)" }}>{a.score}</div>}
              <div style={{ fontSize:11.5,color:"#10b981",fontWeight:700 }}>+{a.xpGained} XP</div>
              <div style={{ fontSize:10.5,color:"var(--text-faint)" }}>{a.time}</div>
            </div>
          </div>
        ))}
      </Widget>

      <Widget title="Latest Badges" titleIcon={<Award size={15}/>} action={`All ${child.badges} badges`} onAction={()=>{}}>
        {child.latestBadges.length === 0 ? (
          <div style={{ textAlign:"center",padding:"32px 0",color:"var(--text-muted)" }}>
            <Award size={36} style={{ opacity:0.25,display:"block",margin:"0 auto 10px" }}/>
            <p style={{ fontSize:13.5,fontWeight:600,margin:0 }}>No badges yet</p>
          </div>
        ) : (
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:12 }}>
            {child.latestBadges.map(b=>(
              <div key={b.id} style={{ background:`${b.color}0d`,border:`1.5px solid ${b.color}30`,borderRadius:14,padding:"18px 12px",textAlign:"center" }}>
                <div style={{ color:b.color,marginBottom:10 }}><KvIcon type={b.iconType} size={30} color={b.color}/></div>
                <div style={{ fontSize:13,fontWeight:800,color:"var(--text-primary)",marginBottom:7 }}>{b.name}</div>
                <RarityBadge rarity={b.rarity}/>
                <div style={{ fontSize:10.5,color:"var(--text-faint)",marginTop:6 }}>{b.earned}</div>
              </div>
            ))}
          </div>
        )}
      </Widget>

      {child.insights?.length > 0 && (
        <Widget title="AI Insights" titleIcon={<Lightbulb size={15}/>} badge="RAG Powered">
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            {child.insights.map((ins,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:14,padding:"14px 16px",borderRadius:12,background:ins.bg,cursor:"pointer" }}>
                <div style={{ color:"var(--indigo)",flexShrink:0,marginTop:2 }}><KvIcon type={ins.iconType} size={20}/></div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13.5,fontWeight:800,color:"var(--text-primary)",marginBottom:4 }}>{ins.title}</div>
                  <div style={{ fontSize:12.5,color:"var(--text-secondary)",lineHeight:1.5 }}>{ins.text}</div>
                </div>
                <ArrowRight size={14} style={{ color:"var(--text-muted)",flexShrink:0,marginTop:4 }}/>
              </div>
            ))}
          </div>
        </Widget>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION: REPORTS
───────────────────────────────────────────────────────────── */
function SectionReports({ child, isDark }) {
  const best    = [...child.subjects].sort((a,b)=>b.pct-a.pct)[0];
  const weakest = [...child.subjects].sort((a,b)=>a.pct-b.pct)[0];
  const [exporting, setExporting] = useState(false);

  const cAvg        = useCountUp(child.averageScore,               900, 100);
  const cQuizTotal  = useCountUp(child.quizzesTotal,               800, 200);
  const cStories    = useCountUp(child.storiesRead,                750, 300);
  const cGames      = useCountUp(child.gamesPlayed,                700, 400);
  const cHours      = useCountUp(Math.floor(child.timeThisWeek/60),600, 500);
  const cActivities = useCountUp(child.activitiesCompleted,        800, 150);

  const handleExportPDF = () => {
    setExporting(true);
    try {
      const html = generateReportHTML(child, isDark);
      printHtmlAsPdf(html, `Kidventure_${child.name}_Report`, isDark);
    } catch(e) {
      alert("Export failed. Please try again.");
    }
    setExporting(false);
  };

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
        <div>
          <div style={{ fontSize:11,fontWeight:800,color:"var(--indigo)",textTransform:"uppercase",letterSpacing:1,marginBottom:4 }}>Analytics</div>
          <h2 style={{ margin:0,fontSize:22,fontWeight:900,color:"var(--text-primary)" }}>Progress Report — {child.name}</h2>
        </div>
        <button onClick={handleExportPDF} disabled={exporting} style={{ display:"flex",alignItems:"center",gap:8,padding:"11px 22px",borderRadius:12,border:"none",background:exporting?"rgba(99,102,241,0.5)":"linear-gradient(135deg,var(--indigo),var(--purple))",color:"#fff",cursor:exporting?"not-allowed":"pointer",fontWeight:700,fontSize:13.5,boxShadow:"0 4px 14px rgba(99,102,241,0.3)" }}>
          {exporting ? <><span style={{ width:14,height:14,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",animation:"spin 0.7s linear infinite",display:"inline-block" }}/> Exporting...</> : <><Download size={15}/> Export PDF</>}
        </button>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
        {[{label:"Strongest Subject",sub:best,color:"#10b981"},{label:"Needs Attention",sub:weakest,color:"#f59e0b"}].map(({label,sub,color},i)=>(
          <div key={i} style={{ background:`${sub.color}07`,border:`1.5px solid ${sub.color}44`,borderRadius:18,padding:22 }}>
            <div style={{ fontSize:10.5,fontWeight:800,color,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>{label}</div>
            <div style={{ display:"flex",alignItems:"center",gap:16 }}>
              <KvIcon type={sub.icon} size={48} color={sub.color}/>
              <div>
                <div style={{ fontSize:17,fontWeight:900,color:"var(--text-primary)" }}>{sub.name}</div>
                <div style={{ fontSize:30,fontWeight:900,color:sub.color }}>{sub.pct}%</div>
                <div style={{ fontSize:11.5,color:"var(--text-muted)" }}>{sub.lessons} lessons · Rank #{sub.rank}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Widget title="Progress by Subject" titleIcon={<BarChart2 size={15}/>}>
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          {child.subjects.map((s,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:12 }}>
              <KvIcon type={s.icon} size={16} color={s.color}/>
              <span style={{ width:130,fontSize:13,color:"var(--text-secondary)",flexShrink:0 }}>{s.name}</span>
              <ProgressBar pct={s.pct} color={s.color} delay={i*80}/>
              <span style={{ fontSize:13,fontWeight:700,color:s.color,width:34,textAlign:"right" }}>{s.pct}%</span>
              <span style={{ fontSize:11,display:"flex",alignItems:"center",gap:2,color:s.trend>=0?"#10b981":"#ef4444",width:34 }}>
                {s.trend>=0?<TrendingUp size={10}/>:<TrendingDown size={10}/>}{Math.abs(s.trend)}%
              </span>
              <span style={{ fontSize:10.5,color:"var(--text-faint)",width:50,textAlign:"right" }}>Rank #{s.rank}</span>
            </div>
          ))}
        </div>
      </Widget>

      <Widget title="Activity Chart" titleIcon={<TrendingUp size={15}/>}>
        <WeeklyActivityChart data={child.weeklyData} color={child.color} height={240} monthlyData={child.monthlyData}/>
      </Widget>

      <Widget title="Performance Summary" titleIcon={<Target size={15}/>}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:14 }}>
          {[
            {label:"Average Score",   value:`${cAvg}%`,   icon:<BarChart3 size={24}/>,   color:"#6366f1", sub:`Top 15% of ${child.grade}`},
            {label:"Quizzes Passed",  value:cQuizTotal,   icon:<CheckCircle size={24}/>, color:"#10b981", sub:`${Math.round(child.quizzesTotal*0.87)} first try`},
            {label:"Stories Read",    value:cStories,     icon:<ScrollText size={24}/>,  color:"#f59e0b", sub:`~${Math.round(child.storiesRead*11)}min reading`},
            {label:"Games Played",    value:cGames,       icon:<Gamepad2 size={24}/>,    color:"#ec4899", sub:`${Math.round(child.gamesPlayed*0.6)} wins`},
            {label:"Hours Learned",   value:`${cHours}h`, icon:<Hourglass size={24}/>,   color:"#8b5cf6", sub:"this week"},
            {label:"Total Activities",value:cActivities,  icon:<Activity size={24}/>,    color:"#06b6d4", sub:`+${Math.round(child.activitiesCompleted*0.14)} this week`},
          ].map((p,i)=>(
            <div key={i} style={{ background:`${p.color}0d`,border:`1.5px solid ${p.color}25`,borderRadius:16,padding:"20px 16px" }}>
              <div style={{ color:p.color,marginBottom:10 }}>{p.icon}</div>
              <div style={{ fontSize:28,fontWeight:900,color:p.color,lineHeight:1 }}>{p.value}</div>
              <div style={{ fontSize:12.5,color:"var(--text-primary)",fontWeight:700,marginTop:6 }}>{p.label}</div>
              <div style={{ fontSize:11,color:"var(--text-muted)",marginTop:3 }}>{p.sub}</div>
            </div>
          ))}
        </div>
      </Widget>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION: PROFILES
   FIX: useNavigate() called inside the component itself
───────────────────────────────────────────────────────────── */
function SectionProfiles({ children, activeId, onSwitch, onDelete }) {
  // FIX: useNavigate hook is now correctly called inside SectionProfiles
  const navigate = useNavigate();
  const fmtTime = m => m < 60 ? `${m}m` : `${Math.floor(m/60)}h ${m%60}m`;

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:11,fontWeight:800,color:"var(--indigo)",textTransform:"uppercase",letterSpacing:1,marginBottom:4 }}>Profiles</div>
          <h2 style={{ margin:0,fontSize:22,fontWeight:900,color:"var(--text-primary)" }}>Child Profiles ({children.length})</h2>
        </div>
        {children.length < 5 && (
          <button onClick={goToSignup} style={{ display:"flex",alignItems:"center",gap:8,padding:"11px 20px",borderRadius:12,border:"none",background:"linear-gradient(135deg,var(--indigo),var(--purple))",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:13.5,boxShadow:"0 4px 14px rgba(99,102,241,0.3)" }}>
            <Plus size={15}/> Add Child
          </button>
        )}
      </div>

      <Widget title="Family Summary" titleIcon={<Users size={15}/>} badge={`${5-children.length} slots remaining`}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:14 }}>
          {[
            {label:"Total Badges",    value:children.reduce((a,c)=>a+c.badges,0),         icon:<Crown size={20}/>,   color:"#f59e0b"},
            {label:"Best Streak",     value:`${Math.max(...children.map(c=>c.streak))}d`,  icon:<Flame size={20}/>,   color:"#ef4444"},
            {label:"Total Activities",value:children.reduce((a,c)=>a+c.activitiesCompleted,0),icon:<Activity size={20}/>,color:"#6366f1"},
            {label:"Family Learning", value:fmtTime(children.reduce((a,c)=>a+c.timeThisWeek,0)),icon:<Clock size={20}/>,color:"#10b981"},
          ].map((s,i)=>(
            <div key={i} style={{ textAlign:"center",padding:"16px 14px",background:`${s.color}0d`,borderRadius:14,border:`1.5px solid ${s.color}25` }}>
              <div style={{ color:s.color,marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontSize:22,fontWeight:900,color:s.color }}>{s.value}</div>
              <div style={{ fontSize:12,color:"var(--text-muted)",marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Widget>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16 }}>
        {children.map(c=>(
          <div key={c.id} onClick={()=>onSwitch(c.id)} style={{
            background:"var(--surface)",border:`2px solid ${activeId===c.id?c.color:"var(--border)"}`,
            borderRadius:20,padding:22,cursor:"pointer",position:"relative",
            transition:"border-color 0.2s,box-shadow 0.2s,transform 0.15s",
            boxShadow:activeId===c.id?`0 0 0 4px ${c.color}18`:"0 2px 8px rgba(0,0,0,0.06)",
          }}
            onMouseEnter={e=>{if(activeId!==c.id)e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
          >
            {children.length > 1 && (
              <button onClick={e=>{e.stopPropagation();if(window.confirm(`Remove ${c.name}?`))onDelete(c.id);}} style={{ position:"absolute",top:12,right:12,width:26,height:26,borderRadius:"50%",background:"rgba(239,68,68,0.1)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#ef4444",opacity:0.7 }}><X size={12}/></button>
            )}
            {activeId===c.id && (
              <div style={{ position:"absolute",top:12,left:12,display:"flex",alignItems:"center",gap:5,fontSize:10.5,fontWeight:700,color:c.color,background:`${c.color}18`,padding:"3px 10px",borderRadius:99 }}><Eye size={10}/>Viewing</div>
            )}
            <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:16,marginTop:activeId===c.id?20:0 }}>
              <div style={{ width:54,height:54,borderRadius:16,background:`${c.color}18`,border:`2px solid ${c.color}44`,display:"flex",alignItems:"center",justifyContent:"center",color:c.color }}>
                <KvIcon type={c.avatarIcon} size={30} color={c.color}/>
              </div>
              <div>
                <div style={{ fontSize:18,fontWeight:900,color:"var(--text-primary)" }}>{c.name}</div>
                <div style={{ fontSize:12.5,color:"var(--text-muted)" }}>{c.grade} · Age {c.age}</div>
                <div style={{ fontSize:11,color:"var(--text-faint)",marginTop:2 }}>{c.lastActive}</div>
              </div>
            </div>
            <div style={{ display:"flex",gap:14,marginBottom:14,flexWrap:"wrap" }}>
              {[{icon:<Star size={11}/>,v:`Lvl ${c.level}`},{icon:<Award size={11}/>,v:`${c.badges} badges`},{icon:<Flame size={11}/>,v:`${c.streak}d`},{icon:<CheckCircle size={11}/>,v:`${c.activitiesCompleted} done`}].map((s,i)=>(
                <span key={i} style={{ display:"inline-flex",alignItems:"center",gap:4,fontSize:11.5,fontWeight:600,color:"var(--text-muted)" }}>{s.icon}{s.v}</span>
              ))}
            </div>
            <XpBar xp={c.xp} xpNext={c.xpNext} color={c.color}/>
            <div style={{ marginTop:12 }}><WeeklySparkline data={c.weeklyData} color={c.color} height={42}/></div>
          </div>
        ))}

        {/* FIX: empty slot card also uses navigate */}
        {children.length < 5 && (
          <div onClick={goToSignup} style={{
            background:"var(--surface)",border:"2px dashed var(--border)",borderRadius:20,padding:22,
            cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,minHeight:220,
            transition:"border-color 0.2s,background 0.15s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--indigo)";e.currentTarget.style.background="rgba(99,102,241,0.03)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--surface)";}}
          >
            <div style={{ width:56,height:56,borderRadius:16,background:"rgba(99,102,241,0.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--indigo)" }}><Plus size={24}/></div>
            <div style={{ fontSize:14.5,fontWeight:800,color:"var(--text-secondary)" }}>Add Child Profile</div>
            <div style={{ fontSize:12,color:"var(--text-faint)",display:"flex",alignItems:"center",gap:5 }}><Lock size={11}/> {5-children.length} slots free</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION: SUBSCRIPTION
───────────────────────────────────────────────────────────── */
function SectionSubscription({ parent, onToast, isDark }) {
  const [downloadingIdx, setDownloadingIdx] = useState(null);
  const [downloadingAll, setDownloadingAll] = useState(false);

  const handleDownloadInvoice = (billing, idx) => {
    setDownloadingIdx(idx);
    try {
      const html = generateInvoiceHTML(billing, parent, isDark);
      printHtmlAsPdf(html, `Kidventure_Invoice_${billing.txId}`, isDark);
      onToast("Invoice opened for printing/saving as PDF", "success");
    } catch {
      onToast("Export failed. Please try again.", "error");
    }
    setTimeout(() => setDownloadingIdx(null), 800);
  };

  const handleDownloadAll = () => {
    setDownloadingAll(true);
    onToast("Opening all invoices...", "success");
    BILLING_HISTORY.forEach((b, i) => {
      setTimeout(() => {
        const html = generateInvoiceHTML(b, parent, isDark);
        printHtmlAsPdf(html, `Kidventure_Invoice_${b.txId}`, isDark);
      }, i * 600);
    });
    setTimeout(() => setDownloadingAll(false), BILLING_HISTORY.length * 600 + 500);
  };

  const planFeatures = [
    "Up to 5 child profiles",
    "All 6 subjects — full curriculum",
    "AI-powered learning insights",
    "Detailed progress reports",
    "PDF invoice downloads",
    "Priority customer support",
    "Offline mode access",
    "Badge & achievement system",
  ];

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
      <div>
        <div style={{ fontSize:11,fontWeight:800,color:"var(--indigo)",textTransform:"uppercase",letterSpacing:1,marginBottom:4 }}>Billing</div>
        <h2 style={{ margin:0,fontSize:22,fontWeight:900,color:"var(--text-primary)" }}>Subscription & Billing</h2>
      </div>

      <div style={{ background:"linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.08))",border:"1.5px solid rgba(99,102,241,0.3)",borderRadius:22,padding:30,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-50,right:-50,width:220,height:220,borderRadius:"50%",background:"rgba(99,102,241,0.06)",pointerEvents:"none" }}/>
        <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,position:"relative",flexWrap:"wrap" }}>
          <div>
            <div style={{ fontSize:12,fontWeight:800,color:"var(--indigo)",textTransform:"uppercase",letterSpacing:1,marginBottom:8 }}>Current Plan</div>
            <div style={{ fontSize:22,fontWeight:900,color:"var(--text-primary)",marginBottom:6 }}>{parent.plan}</div>
            <div style={{ fontSize:34,fontWeight:900,color:"var(--indigo)",lineHeight:1 }}>EGP 49<span style={{ fontSize:16,fontWeight:600,color:"var(--text-muted)" }}>/month</span></div>
            <div style={{ fontSize:12.5,color:"var(--text-muted)",marginTop:10,display:"flex",alignItems:"center",gap:6 }}>
              <Calendar size={12}/> Next renewal: <strong>July 15, 2026</strong>
            </div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:12 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:99,background:"rgba(16,185,129,0.15)",border:"1.5px solid rgba(16,185,129,0.3)" }}>
              <div style={{ width:7,height:7,borderRadius:"50%",background:"#10b981",animation:"pulse 2s infinite" }}/>
              <span style={{ fontSize:12.5,fontWeight:700,color:"#10b981" }}>Active</span>
            </div>
            <button onClick={() => onToast("Opening subscription manager...","success")} style={{ padding:"9px 18px",borderRadius:10,border:"1.5px solid var(--indigo)",background:"rgba(99,102,241,0.1)",color:"var(--indigo)",cursor:"pointer",fontWeight:700,fontSize:12.5,display:"flex",alignItems:"center",gap:6 }}>
              <Settings size={13}/> Manage
            </button>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:8,marginTop:22 }}>
          {planFeatures.map((feat,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:8,fontSize:12.5,color:"var(--text-secondary)" }}>
              <CheckCircle size={13} style={{ color:"#10b981",flexShrink:0 }}/><span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <Widget title="Compare Plans" titleIcon={<BarChart size={15}/>}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14 }}>
          {[
            { key:"free",  name:"Free",  price:"EGP 0",  period:"",    color:"var(--text-muted)", current:false, features:["1 child profile","3 subjects only","Basic progress tracking","Community support"] },
            { key:"pro",   name:"Pro",   price:"EGP 49", period:"/mo", color:"var(--indigo)",     current:true,  features:["5 child profiles","All 6 subjects","AI learning insights","PDF reports & invoices","Priority support"] },
            { key:"plus",  name:"Plus",  price:"EGP 89", period:"/mo", color:"#f59e0b",           current:false, features:["5 children","All subjects","Live tutoring sessions","Custom learning paths","Dedicated account manager"] },
          ].map((plan)=>(
            <div key={plan.key} style={{
              background:plan.current?"linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.05))":"var(--surface)",
              border:`2px solid ${plan.current?"rgba(99,102,241,0.4)":"var(--border)"}`,
              borderRadius:16,padding:20,position:"relative",
            }}>
              {plan.current && <div style={{ position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,var(--indigo),var(--purple))",color:"#fff",fontSize:10.5,fontWeight:800,padding:"3px 12px",borderRadius:99,whiteSpace:"nowrap" }}><CheckCircle size={10} style={{ verticalAlign:"middle",marginRight:4 }}/>Your Plan</div>}
              <div style={{ fontSize:13.5,fontWeight:800,color:plan.color,marginBottom:6,marginTop:plan.current?8:0 }}>{plan.name}</div>
              <div style={{ fontSize:26,fontWeight:900,color:plan.color,marginBottom:14 }}>{plan.price}{plan.period && <span style={{ fontSize:13,fontWeight:600,color:"var(--text-muted)" }}>{plan.period}</span>}</div>
              <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:8 }}>
                {plan.features.map((f,j)=>(
                  <li key={j} style={{ display:"flex",alignItems:"flex-start",gap:7,fontSize:12.5,color:"var(--text-secondary)" }}>
                    <CheckCircle size={11} style={{ color:"#10b981",flexShrink:0,marginTop:2 }}/>{f}
                  </li>
                ))}
              </ul>
              {!plan.current && (
                <button onClick={() => onToast(`Switching to ${plan.name}...`,"success")} style={{ width:"100%",marginTop:16,padding:"10px 0",borderRadius:10,border:`1.5px solid ${plan.color}`,background:"transparent",color:plan.color,cursor:"pointer",fontWeight:700,fontSize:12.5 }}
                  onMouseEnter={e=>{e.currentTarget.style.background=plan.color+"15";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
                  {plan.key==="free" ? "Downgrade" : "Upgrade"}
                </button>
              )}
            </div>
          ))}
        </div>
      </Widget>

      <Widget title="Billing History" titleIcon={<CreditCard size={15}/>} action={downloadingAll ? "Opening..." : "Download All"} onAction={handleDownloadAll}>
        <div style={{ display:"flex",flexDirection:"column",gap:0 }}>
          {BILLING_HISTORY.map((b,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"13px 0",borderBottom:"1px solid var(--border)" }}>
              <div style={{ width:38,height:38,borderRadius:10,background:"rgba(99,102,241,0.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--indigo)",flexShrink:0 }}><CreditCard size={17}/></div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13.5,fontWeight:700,color:"var(--text-primary)" }}>{b.date}</div>
                <div style={{ fontSize:11.5,color:"var(--text-muted)" }}>{b.method} · {b.txId}</div>
              </div>
              <div style={{ fontSize:15,fontWeight:900,color:"var(--text-primary)" }}>{b.amount}</div>
              <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                <span style={{ fontSize:11.5,fontWeight:700,color:"#10b981",background:"rgba(16,185,129,0.1)",padding:"3px 10px",borderRadius:99 }}>Paid</span>
                <button
                  onClick={() => handleDownloadInvoice(b, i)}
                  disabled={downloadingIdx === i}
                  title="Download Invoice PDF"
                  style={{ width:30,height:30,borderRadius:8,border:"1.5px solid var(--border)",background:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-muted)" }}
                >
                  {downloadingIdx === i
                    ? <span style={{ width:12,height:12,borderRadius:"50%",border:"2px solid rgba(99,102,241,0.3)",borderTopColor:"var(--indigo)",animation:"spin 0.7s linear infinite",display:"inline-block" }}/>
                    : <Download size={12}/>
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      </Widget>

      <Widget title="Payment Method" titleIcon={<Lock size={15}/>}>
        <div style={{ display:"flex",alignItems:"center",gap:16,flexWrap:"wrap" }}>
          <div style={{ width:54,height:34,borderRadius:8,background:"rgba(59,130,246,0.1)",border:"1.5px solid rgba(59,130,246,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"#3b82f6",fontSize:11,fontWeight:800,flexShrink:0 }}>VISA</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13.5,fontWeight:700,color:"var(--text-primary)" }}>Visa ending in 4242</div>
            <div style={{ fontSize:12,color:"var(--text-muted)" }}>Expires 12/2028</div>
          </div>
          <button onClick={()=>onToast("Opening card update...","success")} style={{ padding:"9px 18px",borderRadius:10,border:"1.5px solid var(--border)",background:"none",cursor:"pointer",fontWeight:700,fontSize:12.5,color:"var(--text-secondary)",display:"flex",alignItems:"center",gap:7 }}>
            <RefreshCw size={13}/> Update Card
          </button>
        </div>
      </Widget>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION: SETTINGS
───────────────────────────────────────────────────────────── */
function SectionSettings({ parent, children, onUpdate, onToast, isDark }) {
  const navigate = useNavigate();
  const [name,       setName]       = useState(parent.name);
  const [email,      setEmail]      = useState(parent.email);
  const [phone,      setPhone]      = useState(parent.phone || "");
  const [city,       setCity]       = useState(parent.city  || "");
  const [lang,       setLang]       = useState(parent.language || "Arabic");
  const [showPwd,    setShowPwd]    = useState(false);
  const [showEml,    setShowEml]    = useState(false);
  const [saved,      setSaved]      = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editMode,   setEditMode]   = useState(false);

  const handleSave = () => {
    onUpdate({ ...parent, name, email, phone, city, language: lang });
    setSaved(true); setEditMode(false);
    onToast("Account details saved!", "success");
    setTimeout(() => setSaved(false), 2500);
  };

  const handleExportData = () => {
    try {
      const html = generateExportDataHTML(parent, children, isDark);
      printHtmlAsPdf(html, `Kidventure_Data_Export_${name}`, isDark);
      onToast("Data export opened for printing/saving as PDF", "success");
    } catch {
      onToast("Export failed. Please try again.", "error");
    }
  };

  // FIX: use navigate instead of window.location
  const handleDeleteConfirm = () => {
    setShowDelete(false);
    navigate('/login', { replace: true });
  };

  const inputStyle = (editable=true) => ({
    width:"100%",padding:"10px 14px",borderRadius:10,
    border:`1.5px solid ${editable&&editMode?"var(--indigo)":"var(--border)"}`,
    background:editable&&editMode?"var(--surface-alt)":"rgba(148,163,184,0.06)",
    color:"var(--text-primary)",fontSize:13.5,outline:"none",boxSizing:"border-box",
    cursor:editable&&editMode?"text":"default",
  });
  const labelStyle = { display:"block",fontSize:11.5,fontWeight:700,color:"var(--text-secondary)",marginBottom:6,textTransform:"uppercase",letterSpacing:0.5 };

  const parentInitial = (name || "A").charAt(0).toUpperCase();
  const totalBadges   = children.reduce((a,c) => a + c.badges, 0);
  const totalXP       = children.reduce((a,c) => a + c.xp, 0);
  const bestStreak    = Math.max(...children.map(c => c.streak));

  const notifItems = [
    { label:"Weekly Reports",         desc:"Get your weekly progress report via email" },
    { label:"Achievement Alerts",     desc:"Badges, levels, and milestones" },
    { label:"Marketing Emails",       desc:"Product updates and promotions" },
    { label:"New Content Alerts",     desc:"New subjects and learning modules" },
    { label:"Daily Streak Reminders", desc:"Keep the learning streak alive" },
    { label:"Push Notifications",     desc:"On-device learning reminders" },
    { label:"AI Insight Reports",     desc:"Weekly AI-powered learning summaries" },
  ];

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:22 }}>
      <div>
        <div style={{ fontSize:11,fontWeight:800,color:"var(--indigo)",textTransform:"uppercase",letterSpacing:1,marginBottom:4 }}>Settings</div>
        <h2 style={{ margin:0,fontSize:22,fontWeight:900,color:"var(--text-primary)" }}>Account Settings</h2>
      </div>

      <div style={{ background:"linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.06))",border:"1.5px solid rgba(99,102,241,0.2)",borderRadius:22,padding:28 }}>
        <div style={{ display:"flex",alignItems:"center",gap:20,marginBottom:20 }}>
          <div style={{ width:72,height:72,borderRadius:22,background:"linear-gradient(135deg,var(--indigo),var(--purple))",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:28,fontWeight:900,flexShrink:0,boxShadow:"0 8px 24px rgba(99,102,241,0.3)" }}>
            {parentInitial}
          </div>
          <div style={{ flex:1 }}>
            <h3 style={{ margin:"0 0 4px",fontSize:20,fontWeight:900,color:"var(--text-primary)" }}>{name}</h3>
            <div style={{ fontSize:13.5,color:"var(--text-muted)",marginBottom:8 }}>{email}</div>
            <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
              <span style={{ fontSize:11.5,fontWeight:700,color:"var(--indigo)",background:"rgba(99,102,241,0.1)",padding:"3px 10px",borderRadius:99 }}>{parent.plan}</span>
              <span style={{ fontSize:11.5,fontWeight:700,color:"#10b981",background:"rgba(16,185,129,0.1)",padding:"3px 10px",borderRadius:99 }}>Member since {parent.joinedDate}</span>
            </div>
          </div>
          <button onClick={() => setEditMode(v => !v)} style={{ padding:"9px 18px",borderRadius:10,border:`1.5px solid ${editMode?"var(--indigo)":"var(--border)"}`,background:editMode?"rgba(99,102,241,0.1)":"none",cursor:"pointer",fontWeight:700,fontSize:12.5,color:editMode?"var(--indigo)":"var(--text-secondary)",display:"flex",alignItems:"center",gap:7 }}>
            <Edit3 size={13}/> {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12 }}>
          {[
            {label:"Children",    value:children.length,              color:"#6366f1"},
            {label:"Total XP",    value:totalXP.toLocaleString(),     color:"#f59e0b"},
            {label:"Total Badges",value:totalBadges,                  color:"#10b981"},
            {label:"Best Streak", value:`${bestStreak}d`,             color:"#ef4444"},
          ].map((s,i)=>(
            <div key={i} style={{ textAlign:"center",padding:"14px 10px",background:"rgba(255,255,255,0.05)",borderRadius:12 }}>
              <div style={{ fontSize:20,fontWeight:900,color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11,color:"var(--text-muted)",marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <Widget title="Account Details" titleIcon={<User size={15}/>}>
        <div style={{ display:"flex",flexDirection:"column",gap:18 }}>
          <div style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
            <div style={{ flex:1,minWidth:200 }}>
              <label style={labelStyle}>Full Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" style={inputStyle()} readOnly={!editMode}/>
            </div>
            <div style={{ flex:1,minWidth:160 }}>
              <label style={labelStyle}>Language</label>
              <select value={lang} onChange={e=>setLang(e.target.value)} disabled={!editMode} style={{...inputStyle(),appearance:"none"}}>
                {["Arabic","English"].map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Email Address</label>
            <div style={{ display:"flex",gap:8 }}>
              <input type={showEml?"text":"email"} value={email} onChange={e=>setEmail(e.target.value)} style={{...inputStyle(),flex:1}} readOnly={!editMode} placeholder="your@email.com"/>
              <button onClick={()=>setShowEml(v=>!v)} style={{ padding:"0 14px",borderRadius:10,border:"1.5px solid var(--border)",background:"none",cursor:"pointer",color:"var(--text-muted)",flexShrink:0 }}>{showEml?<EyeOff size={14}/>:<Eye size={14}/>}</button>
            </div>
          </div>
          <div style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
            <div style={{ flex:1,minWidth:200 }}>
              <label style={labelStyle}>Phone Number</label>
              <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                <Phone size={14} style={{ color:"var(--text-muted)",flexShrink:0 }}/>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+20 100 000 0000" style={{...inputStyle(),flex:1}} readOnly={!editMode}/>
              </div>
            </div>
            <div style={{ flex:1,minWidth:160 }}>
              <label style={labelStyle}>City</label>
              <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                <MapPin size={14} style={{ color:"var(--text-muted)",flexShrink:0 }}/>
                <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Cairo" style={{...inputStyle(),flex:1}} readOnly={!editMode}/>
              </div>
            </div>
          </div>
          {editMode && (
            <div>
              <label style={labelStyle}>New Password</label>
              <div style={{ display:"flex",gap:8 }}>
                <input type={showPwd?"text":"password"} placeholder="Leave blank to keep current" style={{...inputStyle(),flex:1}}/>
                <button onClick={()=>setShowPwd(v=>!v)} style={{ padding:"0 14px",borderRadius:10,border:"1.5px solid var(--border)",background:"none",cursor:"pointer",color:"var(--text-muted)",flexShrink:0 }}>{showPwd?<EyeOff size={14}/>:<Eye size={14}/>}</button>
              </div>
            </div>
          )}
          {editMode && (
            <button onClick={handleSave} style={{
              padding:"12px 28px",borderRadius:12,border:"none",cursor:"pointer",fontWeight:800,fontSize:14,
              background:saved?"linear-gradient(135deg,#10b981,#059669)":"linear-gradient(135deg,var(--indigo),var(--purple))",
              color:"#fff",display:"flex",alignItems:"center",gap:8,alignSelf:"flex-start",
              transition:"background 0.3s",boxShadow:"0 4px 14px rgba(99,102,241,0.25)",
            }}>
              {saved?<><CheckCircle size={15}/> Saved!</>:<><Save size={15}/> Save Changes</>}
            </button>
          )}
        </div>
      </Widget>

      <Widget title="My Children" titleIcon={<Users size={15}/>} badge={`${children.length} profiles`}>
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {children.map(c=>(
            <div key={c.id} style={{ display:"flex",alignItems:"center",gap:14,padding:"12px 14px",borderRadius:12,background:"var(--surface-alt)",border:"1.5px solid var(--border)" }}>
              <div style={{ width:42,height:42,borderRadius:12,background:`${c.color}18`,border:`2px solid ${c.color}40`,display:"flex",alignItems:"center",justifyContent:"center",color:c.color,flexShrink:0 }}>
                <KvIcon type={c.avatarIcon} size={22} color={c.color}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14,fontWeight:800,color:"var(--text-primary)" }}>{c.name}</div>
                <div style={{ fontSize:12,color:"var(--text-muted)" }}>{c.grade} · Age {c.age} · Level {c.level}</div>
              </div>
              <div style={{ display:"flex",gap:10,fontSize:12,color:"var(--text-muted)" }}>
                <span style={{ display:"flex",alignItems:"center",gap:4 }}><Flame size={11} color="#ef4444"/>{c.streak}d</span>
                <span style={{ display:"flex",alignItems:"center",gap:4 }}><Award size={11} color="#f59e0b"/>{c.badges}</span>
                <span style={{ display:"flex",alignItems:"center",gap:4 }}><Target size={11} color="#6366f1"/>{c.averageScore}%</span>
              </div>
            </div>
          ))}
          <div style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:12,border:"1.5px dashed var(--border)",color:"var(--text-faint)",fontSize:13 }}>
            <Plus size={13}/> {5-children.length} more profiles available
          </div>
        </div>
      </Widget>

      <Widget title="Notification Preferences" titleIcon={<Bell size={15}/>}>
        <div style={{ display:"flex",flexDirection:"column",gap:0 }}>
          {notifItems.map((item,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:i<notifItems.length-1?"1px solid var(--border)":"none" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ color:"var(--indigo)",opacity:0.7 }}>
                  {[<Mail size={14}/>,<Award size={14}/>,<Bell size={14}/>,<Rocket size={14}/>,<Flame size={14}/>,<Smartphone size={14}/>,<BrainCircuit size={14}/>][i]}
                </span>
                <div>
                  <div style={{ fontSize:13.5,fontWeight:700,color:"var(--text-primary)" }}>{item.label}</div>
                  <div style={{ fontSize:11.5,color:"var(--text-muted)" }}>{item.desc}</div>
                </div>
              </div>
              <ToggleSwitch defaultOn={[true,true,false,false,true,false,true][i]} onChange={()=>{}}/>
            </div>
          ))}
        </div>
      </Widget>

      <Widget title="Privacy & Security" titleIcon={<Shield size={15}/>}>
        <div style={{ display:"flex",gap:16,padding:"16px 20px",borderRadius:14,background:"rgba(99,102,241,0.06)",border:"1.5px solid rgba(99,102,241,0.15)",marginBottom:16 }}>
          <Lock size={22} style={{ color:"var(--indigo)",flexShrink:0,marginTop:2 }}/>
          <p style={{ margin:0,fontSize:13.5,color:"var(--text-secondary)",lineHeight:1.7 }}>
            <strong>COPPA &amp; GDPR-aligned.</strong> Your children's data is protected. We never share personal information with third parties.
          </p>
        </div>
        <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
          {[
            {icon:<Download size={12}/>, label:"Export My Data",       action: handleExportData },
            {icon:<Globe size={12}/>,    label:"Privacy Policy",        action:()=>window.open("https://kidventure.com/privacy","_blank")},
            {icon:<Shield size={12}/>,   label:"Security Settings",     action:()=>onToast("Opening security settings...","success")},
            {icon:<Fingerprint size={12}/>,label:"Enable 2FA",          action:()=>onToast("Setting up two-factor authentication...","success")},
          ].map(({icon,label,action},i)=>(
            <button key={i} onClick={action} style={{ padding:"9px 16px",borderRadius:10,border:"1.5px solid var(--border)",background:"none",cursor:"pointer",fontWeight:600,fontSize:12.5,color:"var(--text-secondary)",display:"flex",alignItems:"center",gap:6,transition:"all 0.15s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(99,102,241,0.08)";e.currentTarget.style.color="var(--indigo)";e.currentTarget.style.borderColor="rgba(99,102,241,0.3)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="var(--text-secondary)";e.currentTarget.style.borderColor="var(--border)";}}>
              {icon}{label}
            </button>
          ))}
        </div>
      </Widget>

      <Widget title="Account Information" titleIcon={<Activity size={15}/>}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:12 }}>
          {[
            {label:"Member Since", value:parent.joinedDate||"January 2025", icon:<Calendar size={18}/>},
            {label:"Plan",         value:parent.plan,                         icon:<Star size={18}/>},
            {label:"Children",     value:`${children.length} profiles`,       icon:<Users size={18}/>},
            {label:"Account ID",   value:"KV-2025-001",                       icon:<Shield size={18}/>},
            {label:"Country",      value:"Egypt",                             icon:<Globe size={18}/>},
            {label:"Language",     value:parent.language||"Arabic",           icon:<Languages size={18}/>},
          ].map((info,i)=>(
            <div key={i} style={{ padding:"16px 14px",background:"var(--surface-alt)",borderRadius:14,border:"1.5px solid var(--border)" }}>
              <div style={{ color:"var(--indigo)",marginBottom:8 }}>{info.icon}</div>
              <div style={{ fontSize:11,color:"var(--text-muted)",marginBottom:3,textTransform:"uppercase",letterSpacing:0.3 }}>{info.label}</div>
              <div style={{ fontSize:13.5,fontWeight:800,color:"var(--text-primary)" }}>{info.value}</div>
            </div>
          ))}
        </div>
      </Widget>

      <Widget title="Danger Zone" titleIcon={<AlertCircle size={15} style={{ color:"#ef4444" }}/>}>
        <div style={{ padding:20,borderRadius:16,background:"rgba(239,68,68,0.04)",border:"1.5px solid rgba(239,68,68,0.2)" }}>
          <div style={{ display:"flex",alignItems:"flex-start",gap:16 }}>
            <div style={{ width:44,height:44,borderRadius:12,background:"rgba(239,68,68,0.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"#ef4444" }}><Trash2 size={20}/></div>
            <div style={{ flex:1 }}>
              <h5 style={{ margin:"0 0 6px",fontSize:15,fontWeight:800,color:"var(--text-primary)" }}>Delete Account</h5>
              <p style={{ margin:"0 0 16px",fontSize:13,color:"var(--text-muted)",lineHeight:1.6 }}>
                This will permanently remove your account, all child profiles ({children.map(c=>c.name).join(", ")}), and all associated data. This cannot be undone.
              </p>
              <button onClick={()=>setShowDelete(true)} style={{ padding:"10px 20px",borderRadius:10,border:"1.5px solid #ef4444",background:"rgba(239,68,68,0.08)",color:"#ef4444",cursor:"pointer",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:7,transition:"background 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.15)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(239,68,68,0.08)";}}>
                <Trash2 size={14}/> Delete My Account
              </button>
            </div>
          </div>
        </div>
      </Widget>

      {showDelete && (
        <DeleteAccountModal
          parentName={name}
          childrenNames={children.map(c=>c.name)}
          onConfirm={handleDeleteConfirm}
          onCancel={()=>setShowDelete(false)}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CSS
   FIX: default theme is now "light"
───────────────────────────────────────────────────────────── */
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  :root {
    --indigo: #6366f1; --purple: #8b5cf6; --emerald: #10b981;
    --amber: #f59e0b; --rose: #ec4899; --red: #ef4444; --cyan: #06b6d4;
  }
  [data-kv-theme="dark"] {
    --bg: #080c14; --surface: #0f1623; --surface-alt: #161e2e;
    --border: #1a2535; --text-primary: #f1f5f9; --text-secondary: #cbd5e1;
    --text-muted: #94a3b8; --text-faint: #475569; --header-bg: rgba(8,12,20,0.92);
  }
  [data-kv-theme="light"],
  :root:not([data-kv-theme="dark"]) {
    --bg: #f4f6fb; --surface: #ffffff; --surface-alt: #f8fafc;
    --border: #e2e8f0; --text-primary: #0f172a; --text-secondary: #334155;
    --text-muted: #64748b; --text-faint: #94a3b8; --header-bg: rgba(255,255,255,0.92);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; -webkit-font-smoothing: antialiased; }
  #kv-root { display: flex; flex-direction: column; min-height: 100vh; width: 100%; background: var(--bg); color: var(--text-primary); }
  #kv-header { position: sticky; top: 0; z-index: 100; background: var(--header-bg); border-bottom: 1.5px solid var(--border); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); height: 62px; display: flex; align-items: center; padding: 0 22px; gap: 12px; }
  #kv-body { display: flex; flex: 1; overflow: hidden; height: calc(100vh - 62px); }
  #kv-sidebar { width: 248px; min-width: 248px; background: var(--surface); border-right: 1.5px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; transition: width 0.28s cubic-bezier(0.4,0,0.2,1), min-width 0.28s cubic-bezier(0.4,0,0.2,1); }
  #kv-sidebar.closed { width: 0; min-width: 0; overflow: hidden; }
  #kv-main { flex: 1; overflow-y: auto; padding: 28px 32px; display: flex; flex-direction: column; gap: 0; }
  .kv-nav-btn { width: 100%; display: flex; align-items: center; gap: 10px; padding: 10px 16px; border: none; background: none; cursor: pointer; border-radius: 11px; font-size: 13.5px; font-weight: 600; color: var(--text-muted); transition: background 0.15s, color 0.15s; text-align: left; margin-bottom: 2px; }
  .kv-nav-btn:hover { background: rgba(99,102,241,0.07); color: var(--text-primary); }
  .kv-nav-btn.active { background: linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.1)); color: var(--indigo); font-weight: 800; }
  .kv-child-opt { width: 100%; display: flex; align-items: center; gap: 9px; padding: 9px 14px; border: none; background: none; cursor: pointer; border-radius: 9px; font-size: 12.5px; font-weight: 600; color: var(--text-muted); transition: background 0.15s; margin-bottom: 1px; }
  .kv-child-opt:hover, .kv-child-opt.active { background: rgba(99,102,241,0.07); color: var(--indigo); }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
  @keyframes slideInRight { from { transform: translateX(20px); opacity: 0; } to { transform: none; opacity: 1; } }
  @media (max-width: 768px) {
    #kv-sidebar { position: fixed; left: 0; top: 62px; bottom: 0; z-index: 200; box-shadow: 4px 0 24px rgba(0,0,0,0.18); }
    #kv-sidebar.closed { display: none; }
    #kv-main { padding: 16px; }
  }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.25); border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,0.4); }
`;

/* ─────────────────────────────────────────────────────────────
   MAIN DASHBOARD
   FIX 1: default theme changed from "dark" to "light"
   FIX 2: handleSignOut uses navigate() instead of window.location.replace()
   FIX 3: no outer page-level navbar is rendered — dashboard is the only UI
───────────────────────────────────────────────────────────── */
export default function KidventureDashboard() {
  // FIX: useNavigate called at the top level of the main component
  const navigate = useNavigate();

  useEffect(() => { initData(); }, []);

  const [children,      setChildren]  = useState(() => LS.get("kv_children",      SEED_CHILDREN));
  const [parent,        setParent]    = useState(() => LS.get("kv_parent",         SEED_PARENT));
  const [notifications, setNotifs]    = useState(() => LS.get("kv_notifications",  SEED_NOTIFS));
  const [activeChildId, setActive]    = useState(() => LS.get("kv_active_child",   SEED_CHILDREN[0]?.id));
  const [section,       setSection]   = useState("overview");
  const [showSignOut,   setSignOut]   = useState(false);
  const [showNotifs,    setShowNotifs]= useState(false);
  const [signingOut,    setSigningOut]= useState(false);
  const [sidebarOpen,   setSidebar]   = useState(true);
  // FIX: default theme is now "light"
  const [theme,         setTheme]     = useState(() => LS.get("kv_theme", "light"));
  const [toast,         setToast]     = useState(null);
  const [childDropdown, setChildDrop] = useState(false);

  const isDark = theme === "dark";
  const child  = children.find(c => c.id === activeChildId) || children[0];
  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => {
    document.documentElement.setAttribute("data-kv-theme", theme);
    LS.set("kv_theme", theme);
  }, [theme]);

  useEffect(() => { LS.set("kv_children",      children); }, [children]);
  useEffect(() => { LS.set("kv_parent",         parent);   }, [parent]);
  useEffect(() => { LS.set("kv_active_child",   activeChildId); }, [activeChildId]);

  useEffect(() => {
    const handler = () => { setChildDrop(false); setShowNotifs(false); };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const deleteChild = useCallback(id => {
    setChildren(prev => {
      const next = prev.filter(c => c.id !== id);
      if (activeChildId === id) setActive(next[0]?.id);
      return next;
    });
  }, [activeChildId]);

  const markAllRead  = () => { const u = notifications.map(n=>({...n,read:true})); setNotifs(u); LS.set("kv_notifications",u); };
  const showToastMsg = (msg, type="success") => setToast({ msg, type });

  // FIX: handleSignOut now uses navigate() from react-router-dom
  const handleSignOut = async () => {
    setSigningOut(true);
    await new Promise(r => setTimeout(r, 900));
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  const navItems = [
    { key:"overview",     label:"Overview",         icon:<LayoutDashboard size={16}/> },
    { key:"reports",      label:"Reports",          icon:<BarChart2 size={16}/> },
    { key:"profiles",     label:"Profiles",         icon:<Users size={16}/>, badge:children.length },
    { key:"subscription", label:"Subscription",     icon:<CreditCard size={16}/> },
    { key:"settings",     label:"Settings",         icon:<Settings size={16}/> },
  ];

  const parentInitial = (parent.name || "A").charAt(0).toUpperCase();

  return (
    <>
      <style>{GLOBAL_STYLE}</style>
      <div id="kv-root" data-kv-theme={theme}>

        {/* ══ HEADER ══ */}
        <header id="kv-header">
          <button onClick={()=>setSidebar(v=>!v)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)",display:"flex",alignItems:"center",justifyContent:"center",padding:8,borderRadius:9,transition:"background 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(148,163,184,0.12)"}
            onMouseLeave={e=>e.currentTarget.style.background="none"}>
            <Menu size={20}/>
          </button>

          <div style={{ display:"flex",alignItems:"center",gap:9 }}>
            <div style={{ width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,var(--indigo),var(--purple))",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(99,102,241,0.35)" }}>
              <GraduationCap size={18} color="#fff"/>
            </div>
            <span style={{ fontSize:17,fontWeight:900,color:"var(--text-primary)",letterSpacing:-0.4 }}>Kidventure</span>
          </div>

          <div style={{ flex:1 }}/>

          {/* Child Switcher */}
          <div style={{ position:"relative" }} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setChildDrop(v=>!v)} style={{ display:"flex",alignItems:"center",gap:9,padding:"8px 14px",borderRadius:12,border:"1.5px solid var(--border)",background:"var(--surface)",cursor:"pointer",color:"var(--text-secondary)",transition:"border-color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="var(--indigo)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
              <KvIcon type={child?.avatarIcon} size={16} color={child?.color}/>
              <span style={{ fontSize:13,fontWeight:700 }}>{child?.name}</span>
              <ChevronDown size={13} style={{ transition:"transform 0.2s",transform:childDropdown?"rotate(180deg)":"none" }}/>
            </button>
            {childDropdown && (
              <div style={{ position:"absolute",top:"calc(100% + 8px)",right:0,background:"var(--surface)",border:"1.5px solid var(--border)",borderRadius:16,padding:6,minWidth:210,zIndex:200,boxShadow:"0 12px 40px rgba(0,0,0,0.16)" }}>
                <div style={{ padding:"6px 12px 8px",fontSize:10.5,fontWeight:800,color:"var(--text-faint)",textTransform:"uppercase",letterSpacing:0.5 }}>Switch Child</div>
                {children.map(c=>(
                  <button key={c.id} onClick={()=>{setActive(c.id);setSection("overview");setChildDrop(false);}} className="kv-child-opt">
                    <KvIcon type={c.avatarIcon} size={14} color={c.color}/>
                    {c.name}
                    <span style={{ marginLeft:"auto",fontSize:10.5,color:"var(--text-faint)" }}>Lvl {c.level}</span>
                    {c.id===activeChildId && <CheckCircle size={12} color="var(--indigo)"/>}
                  </button>
                ))}
                <div style={{ height:1,background:"var(--border)",margin:"6px 0" }}/>
                <button onClick={()=>{setSection("profiles");setChildDrop(false);}} className="kv-child-opt" style={{ color:"var(--indigo)",fontWeight:700 }}>
                  <Plus size={12}/> Manage Profiles
                </button>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={()=>setTheme(t_ => t_==="dark" ? "light" : "dark")}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)",padding:8,borderRadius:9,display:"flex",alignItems:"center",transition:"background 0.15s,color 0.15s" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(148,163,184,0.12)";e.currentTarget.style.color="var(--text-primary)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="var(--text-muted)";}}>
            {isDark ? <Sun size={17}/> : <Moon size={17}/>}
          </button>

          {/* Notifications */}
          <div style={{ position:"relative" }} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>{setShowNotifs(v=>!v);if(!showNotifs)markAllRead();}} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)",padding:8,borderRadius:9,display:"flex",alignItems:"center",position:"relative",transition:"background 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(148,163,184,0.12)"}
              onMouseLeave={e=>e.currentTarget.style.background="none"}>
              <Bell size={17}/>
              {unread>0 && <span style={{ position:"absolute",top:2,right:2,width:17,height:17,borderRadius:"50%",background:"#ef4444",color:"#fff",fontSize:9,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center" }}>{unread}</span>}
            </button>
            {showNotifs && (
              <div style={{ position:"absolute",top:"calc(100% + 8px)",right:0,background:"var(--surface)",border:"1.5px solid var(--border)",borderRadius:18,padding:6,width:330,zIndex:200,boxShadow:"0 12px 40px rgba(0,0,0,0.16)" }}>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px 8px",borderBottom:"1px solid var(--border)",marginBottom:4 }}>
                  <span style={{ fontSize:14,fontWeight:800,color:"var(--text-primary)" }}>Notifications</span>
                  <button onClick={()=>setShowNotifs(false)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)",padding:4,borderRadius:6 }}><X size={14}/></button>
                </div>
                {notifications.map(n=>(
                  <div key={n.id} style={{ display:"flex",gap:10,padding:"10px 12px",borderRadius:10,background:!n.read?"rgba(99,102,241,0.06)":"none",marginBottom:2 }}>
                    <div style={{ width:7,height:7,borderRadius:"50%",background:!n.read?"var(--indigo)":"transparent",marginTop:6,flexShrink:0 }}/>
                    <div>
                      <p style={{ fontSize:12.5,color:"var(--text-secondary)",lineHeight:1.55,margin:"0 0 3px" }}>{n.text}</p>
                      <span style={{ fontSize:11,color:"var(--text-faint)" }}>{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Parent Avatar → settings */}
          <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,var(--indigo),var(--purple))",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:15,fontWeight:900,flexShrink:0,cursor:"pointer",boxShadow:"0 4px 12px rgba(99,102,241,0.3)" }} title={parent.name} onClick={()=>setSection("settings")}>
            {parentInitial}
          </div>

          {/* Sign Out button */}
          <button onClick={()=>setSignOut(true)} style={{ display:"flex",alignItems:"center",gap:7,padding:"8px 14px",borderRadius:10,border:"1.5px solid var(--border)",background:"none",cursor:"pointer",color:"var(--text-muted)",fontWeight:700,fontSize:13,whiteSpace:"nowrap",transition:"all 0.15s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#ef4444";e.currentTarget.style.color="#ef4444";e.currentTarget.style.background="rgba(239,68,68,0.06)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-muted)";e.currentTarget.style.background="none";}}>
            <LogOut size={14}/> Sign Out
          </button>
        </header>

        {/* ══ LAYOUT ══ */}
        <div id="kv-body">
          {/* ── SIDEBAR ── */}
          <aside id="kv-sidebar" className={sidebarOpen?"":"closed"}>
            <div style={{ padding:18,borderBottom:"1.5px solid var(--border)",background:`linear-gradient(160deg,${child?.color}12,${child?.color}04)` }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
                <div style={{ width:48,height:48,borderRadius:14,background:`${child?.color}20`,border:`2px solid ${child?.color}40`,display:"flex",alignItems:"center",justifyContent:"center",color:child?.color,flexShrink:0 }}>
                  <KvIcon type={child?.avatarIcon} size={26} color={child?.color}/>
                </div>
                <div>
                  <div style={{ fontSize:15,fontWeight:900,color:"var(--text-primary)" }}>{child?.name}</div>
                  <div style={{ fontSize:11.5,color:"var(--text-muted)" }}>{child?.grade} · Level {child?.level}</div>
                </div>
              </div>
              <div style={{ display:"flex",gap:10,marginBottom:10 }}>
                {[{icon:<Flame size={11} color="#ef4444"/>,v:child?.streak+"d"},{icon:<Award size={11} color="#f59e0b"/>,v:child?.badges+" badges"},{icon:<Activity size={11} color="#10b981"/>,v:child?.activitiesCompleted+" done"}].map((s,i)=>(
                  <span key={i} style={{ flex:1,display:"flex",alignItems:"center",gap:4,fontSize:10.5,fontWeight:700,color:"var(--text-muted)" }}>{s.icon}{s.v}</span>
                ))}
              </div>
              <XpBar xp={child?.xp||0} xpNext={child?.xpNext||500} color={child?.color||"var(--indigo)"}/>
            </div>

            <nav style={{ padding:"14px 10px",flex:1 }}>
              <div style={{ fontSize:9.5,fontWeight:800,color:"var(--text-faint)",textTransform:"uppercase",letterSpacing:1.2,padding:"4px 8px",marginBottom:6 }}>Navigation</div>
              {navItems.map(item=>(
                <button key={item.key} onClick={()=>setSection(item.key)} className={`kv-nav-btn${section===item.key?" active":""}`}>
                  <span style={{ color:section===item.key?"var(--indigo)":"var(--text-muted)",flexShrink:0 }}>{item.icon}</span>
                  {item.label}
                  {item.badge!=null && <span style={{ marginLeft:"auto",fontSize:10.5,fontWeight:700,background:"rgba(99,102,241,0.12)",color:"var(--indigo)",padding:"2px 8px",borderRadius:99 }}>{item.badge}</span>}
                </button>
              ))}
              <div style={{ fontSize:9.5,fontWeight:800,color:"var(--text-faint)",textTransform:"uppercase",letterSpacing:1.2,padding:"14px 8px 6px" }}>Children</div>
              {children.map(c=>(
                <button key={c.id} onClick={()=>{setActive(c.id);setSection("overview");}} className={`kv-child-opt${activeChildId===c.id&&section==="overview"?" active":""}`}>
                  <KvIcon type={c.avatarIcon} size={14} color={c.color}/>
                  {c.name}
                  <span style={{ marginLeft:"auto",fontSize:10,color:"var(--text-faint)" }}>Lvl {c.level}</span>
                </button>
              ))}
            </nav>

            <div style={{ padding:"14px 18px",borderTop:"1.5px solid var(--border)",fontSize:12,color:"var(--text-muted)" }}>
              <div style={{ display:"flex",alignItems:"center",gap:7 }}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:"#10b981",boxShadow:"0 0 6px #10b981" }}/>
                {parent.plan} · {children.length}/5 children
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main id="kv-main">
            {section==="overview"     && child && <SectionOverview child={child}/>}
            {section==="reports"      && child && <SectionReports child={child} isDark={isDark}/>}
            {section==="profiles"     && (
              <SectionProfiles
                children={children}
                activeId={activeChildId}
                onSwitch={id=>{setActive(id);setSection("overview");}}
                onDelete={deleteChild}
              />
            )}
            {section==="subscription" && <SectionSubscription parent={parent} onToast={showToastMsg} isDark={isDark}/>}
            {section==="settings"     && (
              <SectionSettings
                parent={parent}
                children={children}
                onUpdate={p=>{setParent(p);LS.set("kv_parent",p);}}
                onToast={showToastMsg}
                isDark={isDark}
              />
            )}
          </main>
        </div>

        {/* ── MODALS ── */}
        {showSignOut && <SignOutModal onConfirm={handleSignOut} onCancel={()=>setSignOut(false)} loading={signingOut}/>}
        {toast && <Toast message={toast.msg} type={toast.type} onDismiss={()=>setToast(null)}/>}
      </div>
    </>
  );
}