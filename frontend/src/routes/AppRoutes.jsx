import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';

// ── Page-level code splitting (lazy loading) ─────────────────────────────
const Landing      = lazy(() => import('../pages/landing/Landing.jsx'));
const Login        = lazy(() => import('../pages/auth/Login.jsx'));
const Dashboard    = lazy(() => import('../pages/dashboard/Dashboard.jsx'));
const Groups       = lazy(() => import('../pages/group/Groups.jsx'));
const GroupDetail  = lazy(() => import('../pages/group/GroupDetail.jsx'));
const Balance      = lazy(() => import('../pages/balance/Balance.jsx'));
const Settle       = lazy(() => import('../pages/settlement/Settle.jsx'));
const Analytics    = lazy(() => import('../pages/analytics/Analytics.jsx'));
const Settings     = lazy(() => import('../pages/settings/Settings.jsx'));
const ProPlan      = lazy(() => import('../pages/pro/ProPlan.jsx'));

// ── Page-level loading skeleton ───────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-[#64748B] text-sm font-medium">Loading…</p>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Public routes ── */}
        <Route path="/"      element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pro"   element={<ProPlan />} />

        {/* ── Protected routes ── */}
        <Route path="/dashboard"         element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/groups"            element={<ProtectedRoute><Groups /></ProtectedRoute>} />
        <Route path="/groups/:id"        element={<ProtectedRoute><GroupDetail /></ProtectedRoute>} />
        <Route path="/balance/:groupId"  element={<ProtectedRoute><Balance /></ProtectedRoute>} />
        <Route path="/settle/:groupId"   element={<ProtectedRoute><Settle /></ProtectedRoute>} />
        <Route path="/analytics"         element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/settings"          element={<ProtectedRoute><Settings /></ProtectedRoute>} />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
