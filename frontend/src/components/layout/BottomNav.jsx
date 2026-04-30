import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Plus, Activity, User } from 'lucide-react';

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Hide BottomNav on Landing Page or Login
  if (pathname === '/' || pathname === '/login') return null;

  const navItems = [
    { label: 'Home', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Groups', icon: Users, path: '/groups' },
    { label: 'Add', icon: Plus, path: 'action_add', isAction: true },
    { label: 'Analytics', icon: Activity, path: '/analytics' },
    { label: 'Profile', icon: User, path: '/settings' }
  ];

  const handleNav = (item) => {
    if (item.isAction) {
      if (pathname !== '/dashboard') {
        navigate('/dashboard');
      } else {
        window.dispatchEvent(new CustomEvent('triggerAddExpense'));
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0F172A]/95 backdrop-blur-md border-t border-[#334155] pb-safe">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.path;
          
          if (item.isAction) {
            return (
              <button 
                key={idx}
                onClick={() => handleNav(item)}
                className="relative -top-6 w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 border-4 border-[#0F172A] hover:scale-105 active:scale-95 transition-all"
              >
                <item.icon className="w-6 h-6" />
              </button>
            );
          }

          return (
            <button
              key={idx}
              onClick={() => handleNav(item)}
              className={`flex flex-col items-center gap-1 min-w-[60px] transition-all ${
                isActive ? 'text-indigo-400' : 'text-[#64748B] hover:text-[#94A3B8]'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : ''}`} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
