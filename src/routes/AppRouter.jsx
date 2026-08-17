import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';

import NewHome from '../pages/Home/NewHome';
import WhyKidventure from '../pages/WhyKidventure/WhyKidventure';
import Pricing from '../pages/Pricing/Pricing';
import Features from '../pages/Features/Features';

import ParentGuide from '../pages/Parents/ParentGuide';

import HelpSafety from '../pages/Support/HelpSafety';
import ContactUs from '../pages/Support/ContactUs';

import Download from '../pages/Download/Download';

import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';

import DashboardHome from '../pages/Dashboard/DashboardHome';

import NotFound from '../pages/NotFound/NotFound';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        {/* Public Routes */}
        <Route path="/" element={<NewHome />} />
        <Route path="/why-kidventure" element={<WhyKidventure />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/parents/guide" element={<ParentGuide />} />

        <Route path="/support/help-safety" element={<HelpSafety />} />
        <Route path="/support/contact" element={<ContactUs />} />

        <Route path="/download" element={<Download />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
}