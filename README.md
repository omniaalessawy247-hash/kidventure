<div align="center">

<img src="docs/screenshots/07-landing-home-dark.png" alt="Kidventure — Where Learning Becomes an Adventure" width="100%" />

<br />
<br />

<h1>🚀 Kidventure</h1>

<h3><em>Where Learning Becomes an Adventure</em></h3>

<p>
An AI-powered learning ecosystem that turns children's screen time into<br/>
purposeful, curriculum-aligned adventures — and gives parents complete visibility along the way.
</p>

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/i18next-EN%20%7C%20AR-26A69A?style=for-the-badge&logo=i18next&logoColor=white" alt="i18next" />
</p>

<p>
  <a href="https://kidventure-1913.vercel.app/"><img src="https://img.shields.io/badge/🔴_LIVE_DEMO-Visit_Kidventure-FF6B35?style=for-the-badge" alt="Live Demo" /></a>
</p>

<p>
  <a href="#-live-demo">Live Demo</a> ·
  <a href="#-the-idea">The Idea</a> ·
  <a href="#-screenshots">Screenshots</a> ·
  <a href="#-features">Features</a> ·
  <a href="#-tech-stack">Tech Stack</a> ·
  <a href="#-project-structure">Structure</a> ·
  <a href="#-getting-started">Getting Started</a> ·
  <a href="#-project-status">Status</a>
</p>

</div>

<br />

## 🔴 Live Demo

<div align="center">

### 👉 **[kidventure-1913.vercel.app](https://kidventure-1913.vercel.app/)** 👈

*Explore the full marketing experience, switch between light & dark mode, flip the language to Arabic and watch the entire interface mirror into RTL, create a real account, and preview the Parent Dashboard.*

</div>

<br />

## 💡 The Idea

Children today grow up on infinite scroll and short-form video — content engineered to reward *zero effort* with *instant* gratification. The result: shrinking attention spans and a generation that finds structured learning boring by comparison.

**Kidventure doesn't fight screen time. It redirects it.**

The product is built as a dual-platform ecosystem:

| Platform | Audience | Role |
|:---|:---|:---|
| 📱 **Mobile App** (Flutter) | Children (6–9) | Gamified learning — interactive stories, quizzes, flashcards, mind maps, 3D models, an AI chatbot tutor, and a CNN-powered drawing-detection game |
| 💻 **Web Platform** *(this repository)* | Parents | The marketing site parents discover Kidventure through, and the dashboard they use to monitor their child's learning journey |

This repository is the **web platform**: a fully bilingual, dual-themed React application that carries the entire brand experience — from the very first landing page to the parent's private dashboard.

<br />

## 📸 Screenshots

<details open>
<summary><b>🌐 Marketing Website</b> — light & dark modes, full Arabic RTL localization</summary>
<br />

<table>
<tr>
<td width="50%"><img src="docs/screenshots/06-landing-home-light.png" width="100%" /><p align="center"><sub>Home — Light Mode</sub></p></td>
<td width="50%"><img src="docs/screenshots/07-landing-home-dark.png" width="100%" /><p align="center"><sub>Home — Dark Mode</sub></p></td>
</tr>
<tr>
<td width="50%"><img src="docs/screenshots/08-landing-home-arabic-rtl.png" width="100%" /><p align="center"><sub><b>Arabic — full RTL mirroring, not just translated text</b></sub></p></td>
<td width="50%"><img src="docs/screenshots/09-landing-why-kidventure.png" width="100%" /><p align="center"><sub>"Why Kidventure" — storybook-style scroll narrative</sub></p></td>
</tr>
<tr>
<td width="50%"><img src="docs/screenshots/10-landing-features.png" width="100%" /><p align="center"><sub>Features overview</sub></p></td>
<td width="50%"><img src="docs/screenshots/11-landing-pricing.png" width="100%" /><p align="center"><sub>Plans & Pricing</sub></p></td>
</tr>
<tr>
<td width="50%"><img src="docs/screenshots/12-landing-parent-guide.png" width="100%" /><p align="center"><sub>Parent Guide</sub></p></td>
<td width="50%"><img src="docs/screenshots/14-landing-contact-us.png" width="100%" /><p align="center"><sub>Contact & Support</sub></p></td>
</tr>
</table>

</details>

<details>
<summary><b>🔐 Authentication</b> — live, working Supabase-powered sign up & login</summary>
<br />

<table>
<tr>
<td width="50%"><img src="docs/screenshots/15-auth-login.png" width="100%" /><p align="center"><sub>Sign In</sub></p></td>
<td width="50%"><img src="docs/screenshots/16-auth-signup.png" width="100%" /><p align="center"><sub>Create Account</sub></p></td>
</tr>
</table>

</details>

<details>
<summary><b>📊 Parent Dashboard</b> — the full UX vision, previewed with sample data</summary>
<br />

<table>
<tr>
<td width="50%"><img src="docs/screenshots/01-dashboard-overview-dark.png" width="100%" /><p align="center"><sub>Overview — streaks, XP, badges, AI insights</sub></p></td>
<td width="50%"><img src="docs/screenshots/02-dashboard-reports-dark.png" width="100%" /><p align="center"><sub>Reports — progress by subject, weekly activity</sub></p></td>
</tr>
<tr>
<td width="50%"><img src="docs/screenshots/03-dashboard-profiles-dark.png" width="100%" /><p align="center"><sub>Multi-child family profiles</sub></p></td>
<td width="50%"><img src="docs/screenshots/04-dashboard-subscription-dark.png" width="100%" /><p align="center"><sub>Subscription & billing</sub></p></td>
</tr>
</table>

> ℹ️ The dashboard shown here is a **complete, production-ready interface** built ahead of the backend — see [Project Status](#-project-status) for details.

</details>

<br />

## ✨ Features

### 🌍 Bilingual by Design, Not by Patch
Full **English & Arabic** localization powered by `i18next`, including a genuine **RTL layout** — the entire interface mirrors, from navigation to card alignment, not just the copy.

### 🌗 Effortless Light & Dark Themes
Every single page — marketing site and dashboard alike — ships with a fully designed light and dark theme, switchable instantly with zero layout shift.

### 🔐 Real Authentication, Not a Mock
Sign up and login are wired to a **live Supabase project**. Create an account on the demo right now and it works.

### 🎬 A Marketing Site That Tells a Story
Seven fully designed pages — Home, Why Kidventure, Features, Plans & Pricing, Parent Guide, Support, and Contact — built with `Framer Motion` for smooth, purposeful animation rather than decoration for its own sake.

### 📊 A Dashboard Designed for Trust
A complete Parent Dashboard experience — child progress by subject, learning streaks, badges, AI-generated insight cards, multi-child family management, and subscription controls — designed to give parents the clarity they're promised on the landing page.

<br />

## 🧱 Tech Stack

<table>
<tr>
<td valign="top" width="33%">

**Frontend**
- React 19
- Vite 7
- React Router v7
- Framer Motion
- Custom CSS design system
- PostCSS + Autoprefixer
- lucide-react · react-icons

</td>
<td valign="top" width="33%">

**Localization**
- i18next
- react-i18next
- i18next-browser-languagedetector
- Full Arabic RTL support

</td>
<td valign="top" width="33%">

**Backend**
- Supabase JS Client
- Used exclusively for **Authentication** (sign up / login) at this stage

</td>
</tr>
</table>

> This is a pure **React + Vite** single-page application — no framework-level backend (e.g. Laravel, Next.js API routes) is involved. Supabase currently powers authentication only; the rest of the data you see in the dashboard is illustrative, ahead of the broader ecosystem's backend integration.

<br />

## 📁 Project Structure

```
kidventure/
├── docs/
│   └── screenshots/      README assets
├── public/
├── src/
│   ├── assets/            Images, icons, and static media
│   ├── components/        Reusable UI building blocks
│   ├── config/             App-level configuration (incl. Supabase client)
│   ├── i18n/                Translation files & i18next setup (en / ar)
│   ├── layout/             Shared layout shells (nav, footer, wrappers)
│   ├── lib/                  Utility functions & helpers
│   ├── pages/               Marketing pages & the Parent Dashboard
│   ├── routes/              React Router route definitions
│   ├── services/            Supabase auth calls & API-facing logic
│   ├── styles/               Global & shared CSS
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

<br />

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/omniaalessawy247-hash/kidventure.git
cd kidventure
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

> Supabase credentials for authentication are configured directly inside `src/config`. If you're setting up your own Supabase project, update the client initialization there with your project URL and anon key.

### Other scripts

| Command | Description |
|:---|:---|
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

<br />

## 🗺️ Project Status

Kidventure's web platform is under active development as part of a graduation project. Here's exactly where things stand:

| Area | Status |
|:---|:---|
| 🌐 Marketing site — all 7 pages, EN/AR, light/dark | ✅ Complete |
| 🔐 Authentication (sign up & login) | ✅ Live, connected to Supabase |
| 📊 Parent Dashboard UI | ✅ Complete — currently displaying illustrative sample data |
| 🔌 Dashboard ↔ live data integration | 🚧 In progress |
| 🤖 AI-generated insights & reports | 🚧 In progress |

The dashboard interface you see in the screenshots above represents the intended final product, deliberately built ahead of the backend so the complete vision is clear before wiring in live data from the broader Kidventure ecosystem (mobile app + Supabase tables).

<br />

## 🤝 Contributing

This project is part of an academic graduation project, but contributions, issues, and feature suggestions are always welcome. Feel free to open an [issue](../../issues).

<br />

## 📄 License

Add your preferred license here (e.g. MIT).

<br />

<div align="center">

**Built with React, Vite & Supabase — part of the Kidventure ecosystem**

[🔴 Try the Live Demo](https://kidventure-1913.vercel.app/)

</div>
