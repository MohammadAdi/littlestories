import React from 'react';
import {
  BookOpen,
  Home,
  PenSquare,
  CalendarHeart,
  Users,
  ShieldCheck,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../../types';
import { BottomNavigation } from './BottomNavigation';

interface AppLayoutProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  userProfile: UserProfile;
  pendingApprovalsCount: number;
  onSwitchRole: (role: 'child' | 'parent') => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentTab,
  onSelectTab,
  userProfile,
  pendingApprovalsCount,
  onSwitchRole,
  children,
}) => {
  const isParentMode = userProfile.currentRole === 'parent';

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col selection:bg-amber-200">
      {/* Top Header - follows 3-zone contract */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('beranda')}
              className="flex items-center gap-2.5 text-left group focus-visible:outline-hidden"
              aria-label="Kembali ke Beranda Little Stories"
            >
              <div className="w-9 h-9 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-lg shadow-2xs group-hover:scale-105 transition-transform">
                📖
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-stone-900 leading-none">
                  Little Stories
                </span>
                <span className="text-[10px] text-stone-500 font-sans tracking-wide leading-tight">
                  Buku Harian Sahabat
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Desktop 4-5 single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              onClick={() => onSelectTab('beranda')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'beranda' ? 'text-amber-700 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => onSelectTab('ceritaku')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'ceritaku' || currentTab === 'detail'
                  ? 'text-amber-700 font-semibold border-b-2 border-amber-500 pb-0.5'
                  : ''
              }`}
            >
              Ceritaku
            </button>
            <button
              onClick={() => onSelectTab('kenangan')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'kenangan' ? 'text-amber-700 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
              }`}
            >
              Kenangan
            </button>
            <button
              onClick={() => onSelectTab('teman')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'teman' ? 'text-amber-700 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
              }`}
            >
              Teman
            </button>
            <button
              onClick={() => onSelectTab('profil')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'profil' ? 'text-amber-700 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
              }`}
            >
              Profil
            </button>
          </nav>

          {/* Zone 3: 1 primary action & role toggle badge */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Role switch toggle */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200/80">
              <button
                onClick={() => onSwitchRole('child')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  !isParentMode
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Beralih ke tampilan Anak"
              >
                <span>{userProfile.avatar}</span>
                <span className="hidden sm:inline font-sans">{userProfile.nickname}</span>
              </button>
              <button
                onClick={() => onSwitchRole('parent')}
                className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isParentMode
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Beralih ke tampilan Orang Tua"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-sans">Orang Tua</span>
                {pendingApprovalsCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {pendingApprovalsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Primary Action Button */}
            {!isParentMode ? (
              <button
                onClick={() => onSelectTab('tulis')}
                className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold shadow-xs active:scale-95 transition-all"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span>Tulis Cerita</span>
              </button>
            ) : (
              <button
                onClick={() => onSelectTab('orangtua')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-xs transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Pusat Kendali</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-12 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-5">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation
        currentTab={currentTab}
        onSelectTab={onSelectTab}
      />

      {/* Subtle safety reassurance footer on desktop */}
      <footer className="hidden md:block py-6 border-t border-stone-200/50 text-center text-xs text-stone-400">
        <p>
          Little Stories · Ruang pribadi & aman untuk mencatat kenangan masa kecil · Privasi terjaga secara default
        </p>
      </footer>
    </div>
  );
};
