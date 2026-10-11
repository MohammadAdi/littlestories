import React from 'react';
import { Home, BookOpen, PenSquare, CalendarHeart, Users } from 'lucide-react';
import { NavigationTab } from '../../types';

interface BottomNavigationProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const navItems: Array<{
    id: NavigationTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    isCenter?: boolean;
  }> = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'ceritaku', label: 'Ceritaku', icon: BookOpen },
    { id: 'tulis', label: 'Tulis', icon: PenSquare, isCenter: true },
    { id: 'kenangan', label: 'Kenangan', icon: CalendarHeart },
    { id: 'teman', label: 'Teman', icon: Users },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 pb-safe"
      aria-label="Navigasi Utama Ponsel"
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentTab === item.id ||
            (item.id === 'ceritaku' && currentTab === 'detail');

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="flex flex-col items-center justify-center -mt-5 min-w-[52px] min-h-[52px] p-1 group"
                aria-label="Tulis Cerita Baru"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white flex items-center justify-center shadow-md shadow-amber-500/20 transition-all border-2 border-white">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold text-stone-700 mt-1">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-700 font-semibold'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? 'bg-amber-100/70 text-amber-700' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] leading-tight mt-0.5 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
