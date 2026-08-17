import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './MainLayout.css';

export default function MainLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="kv-shell">
      {!isDashboard && <Navbar />}
      <main className="kv-main">
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}