import React from 'react';
import { NavLink } from 'react-router-dom';
import { Upload, LayoutDashboard } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Upload Statement', icon: Upload, to: '/' },
    { label: 'Financial Dashboard', icon: LayoutDashboard, to: '/dashboard' }
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 p-4 hidden md:flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="px-3">
          <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
            Navigation Menu
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={idx}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition ${
                    isActive
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400">
        <p className="font-semibold text-slate-200 mb-1">Provider-Agnostic AI</p>
        <p className="text-[11px] leading-relaxed">
          OpenAI engine connected with deterministic fallback.
        </p>
      </div>
    </aside>
  );
};
