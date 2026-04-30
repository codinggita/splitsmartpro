# 💸 SplitSmart Pro

> A production-ready, full-stack **fintech expense-splitting platform** built with React, Node.js, Express, and MongoDB. Track, split, and settle shared expenses effortlessly across groups.

[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://mongodb.com/)

---

## 🚀 Features

### Core
- 🌐 **Landing Page** – Conversion-optimised SaaS marketing page
- 🔐 **Authentication** – JWT-based login / signup with bcrypt
- 🏠 **Dashboard** – Real-time balance summary, quick actions, analytics
- 👥 **Group Management** – Create/join groups with invite codes
- 💸 **Expense Splitting** – Equal, exact, or percentage-based splits
- ⚖️ **Settle Up** – Simplified debt settlement flow
- 📊 **Analytics** – Monthly trends, category breakdown, AI insights
- ⚙️ **Settings** – Theme, currency, notifications, security

### Technical Highlights
- ⚡ **Code splitting** – All pages lazy-loaded via React Suspense
- 🛡️ **Protected routes** – Auth guards with redirect-back support
- 🔁 **API retry** – Automatic retry on 5xx / network failures (2 attempts)
- 🌍 **Dynamic currency** – Switch between INR, USD, EUR, GBP globally
- 🌓 **Dark / Light mode** – Persisted in `localStorage`
- 🔔 **Toast notifications** – Success, error, info feedback
- 📱 **Mobile-first** – Bottom navigation, responsive layout

---

## 🧠 Tech Stack

| Layer       | Technology                                    |
|-------------|-----------------------------------------------|
| Frontend    | React 18, Vite 5, Tailwind CSS 3              |
| Routing     | React Router DOM 6 (lazy + protected routes)  |
| State       | React hooks (useState, useEffect, useCallback)|
| API Client  | Axios (interceptors, retry, auto-logout)      |
| Charts      | Recharts                                      |
| Animations  | Framer Motion                                 |
| SEO         | react-helmet-async                            |
| Backend     | Node.js, Express.js                           |
| Database    | MongoDB + Mongoose                            |
| Auth        | JWT + bcrypt                                  |

---

## 📁 Folder Structure

```
split/
├── frontend/
│   ├── index.html              # Full SEO + OG meta tags
│   └── src/
│       ├── App.jsx             # Root – ErrorBoundary + routes
│       ├── main.jsx            # Entry – HelmetProvider + BrowserRouter
│       ├── routes/
│       │   └── AppRoutes.jsx   # Lazy routes + ProtectedRoute guards
│       ├── components/
│       │   ├── common/         # Button, Input, Modal, Toast, PageSEO,
│       │   │                   # ErrorBoundary, ProtectedRoute
│       │   ├── layout/         # Navbar, BottomNav, NotificationPanel
│       │   ├── dashboard/      # StatCard, ExpenseList, AnalyticsChart…
│       │   ├── expense/        # ExpenseCard, AddExpenseModal
│       │   ├── group/          # GroupCard, CreateGroupModal…
│       │   ├── balance/        # BalanceCard
│       │   └── settlement/     # Settlement components
│       ├── pages/
│       │   ├── landing/        # Landing.jsx
│       │   ├── auth/           # Login.jsx
│       │   ├── dashboard/      # Dashboard.jsx
│       │   ├── group/          # Groups.jsx, GroupDetail.jsx
│       │   ├── balance/        # Balance.jsx
│       │   ├── settlement/     # Settle.jsx
│       │   ├── analytics/      # Analytics.jsx
│       │   ├── settings/       # Settings.jsx
│       │   └── pro/            # ProPlan.jsx
│       ├── hooks/
│       │   ├── useAuth.js      # Auth state + login/logout
│       │   ├── useTheme.js     # Dark/light mode management
│       │   ├── useDebounce.js  # Input debouncing
│       │   └── useFetch.js     # Generic data-fetching
│       ├── services/
│       │   ├── api.js          # Axios instance (interceptors + retry)
│       │   ├── authService.js
│       │   ├── groupService.js
│       │   ├── expenseService.js
│       │   ├── balanceService.js
│       │   └── settlementService.js
│       └── utils/
│           ├── currencyUtils.js  # Dynamic currency formatting
│           ├── storageUtils.js   # Safe localStorage/sessionStorage helpers
│           ├── analytics.js      # GA4 page-view & event tracking
│           ├── splitLogic.js     # Expense split calculations
│           └── cn.js             # Tailwind class merger
└── backend/
    └── src/
        ├── server.js
        ├── models/             # User, Group, Expense, Settlement
        ├── routes/             # Auth, Group, Expense, Balance, Settlement
        ├── controllers/
        └── middleware/         # Auth middleware, error handler
```

---

## 📦 Installation & Setup

### Prerequisites
- Node.js ≥ 18
- MongoDB (Atlas or local)

### 1. Clone the repository

```bash
git clone https://github.com/VishwaPatel892/splitsmartpro.git
cd splitsmartpro
```

### 2. Install root dependencies (runs both servers)

```bash
npm install
```

### 3. Configure environment variables

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Create `frontend/.env` (optional):
```env
VITE_GA_ID=G-XXXXXXXXXX   # Google Analytics 4 Measurement ID
```

### 4. Run development servers

```bash
npm run dev        # Starts both frontend (5173) and backend (5000)
```

Or individually:
```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && npm run server
```

---

## 🌐 Pages

| Route              | Page             | Auth Required |
|--------------------|------------------|---------------|
| `/`                | Landing          | ❌            |
| `/login`           | Login / Signup   | ❌            |
| `/pro`             | Pro Plan         | ❌            |
| `/dashboard`       | Dashboard        | ✅            |
| `/groups`          | Groups           | ✅            |
| `/groups/:id`      | Group Detail     | ✅            |
| `/balance/:id`     | Balance          | ✅            |
| `/settle/:id`      | Settle Up        | ✅            |
| `/analytics`       | Analytics        | ✅            |
| `/settings`        | Settings         | ✅            |

---

## 🔧 Key Implementation Details

### Protected Routes
All authenticated pages use a `ProtectedRoute` guard that reads the JWT from `localStorage`. Unauthenticated users are redirected to `/login` with the original URL preserved for post-login redirect.

### API Layer
- Axios with request interceptor to attach Bearer token
- Response interceptor: normalises errors, auto-redirects on 401, retries 5xx/network failures up to 2 times

### Storage Strategy
| Data                  | Storage       |
|-----------------------|---------------|
| Auth token + user     | `localStorage`|
| Theme preference      | `localStorage`|
| Currency preference   | `localStorage`|
| Multi-step form step  | `sessionStorage`|
| Temporary filters     | `sessionStorage`|

### Custom Hooks
| Hook            | Purpose                              |
|-----------------|--------------------------------------|
| `useAuth`       | Login, logout, isAuthenticated       |
| `useTheme`      | Toggle dark/light mode               |
| `useDebounce`   | Debounce search/filter inputs        |
| `useFetch`      | Generic async data fetching          |

---

## 📈 Future Roadmap

- [ ] UPI / Stripe payment integration
- [ ] Push notifications (Web Push API)
- [ ] Export reports (PDF / CSV)
- [ ] Recurring expenses
- [ ] React Native mobile app
- [ ] AI-powered spending insights

---

## 📄 License

MIT © 2025 SplitSmart Pro
