import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Palette,
  Sparkles,
  BookOpen,
  CalendarHeart,
  Users,
  Copy,
  Check,
  Save,
} from 'lucide-react';
import { UserProfile } from '../../types';
import { AVATAR_OPTIONS } from '../../services/mockApi';

interface ProfileViewProps {
  userProfile: UserProfile;
  storyCount: number;
  memoryCount: number;
  friendCount: number;
  onUpdateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  storyCount,
  memoryCount,
  friendCount,
  onUpdateProfile,
}) => {
  const [nickname, setNickname] = useState(userProfile.nickname);
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatar);
  const [selectedTheme, setSelectedTheme] = useState(userProfile.themeColor);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const themeOptions = [
    { id: 'amber', name: 'Cream Hangat', color: 'bg-amber-400' },
    { id: 'emerald', name: 'Mint Sejuk', color: 'bg-emerald-400' },
    { id: 'purple', name: 'Lavender Lembut', color: 'bg-purple-400' },
    { id: 'rose', name: 'Peach Manis', color: 'bg-rose-400' },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userProfile.friendCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    setIsSaving(true);
    try {
      await onUpdateProfile({
        nickname: nickname.trim(),
        avatar: selectedAvatar,
        themeColor: selectedTheme,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold font-heading text-stone-900 tracking-tight">
          Profil Bukuku 🌸
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Atur nama panggilan, avatar lucu, dan tema buku harianmu
        </p>
      </div>

      {/* Safe Milestones (No competitive streaks or rankings!) */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 text-center shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-4 h-4" />
          </div>
          <p className="text-xl font-bold font-heading text-stone-900">
            {storyCount}
          </p>
          <p className="text-[11px] text-stone-500 mt-0.5">Cerita Ditulis</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 text-center shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto mb-2">
            <CalendarHeart className="w-4 h-4" />
          </div>
          <p className="text-xl font-bold font-heading text-stone-900">
            {memoryCount}
          </p>
          <p className="text-[11px] text-stone-500 mt-0.5">Kenangan Tersimpan</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 text-center shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-2">
            <Users className="w-4 h-4" />
          </div>
          <p className="text-xl font-bold font-heading text-stone-900">
            {friendCount}
          </p>
          <p className="text-[11px] text-stone-500 mt-0.5">Teman Terpercaya</p>
        </div>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSave}
        className="scrapbook-card bg-white p-6 sm:p-8 space-y-6 border border-stone-200/80"
      >
        {/* Avatar Picker */}
        <div className="space-y-3">
          <label className="block text-xs font-bold font-heading text-stone-800">
            Pilih Avatar Karaktermu
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {AVATAR_OPTIONS.map((opt) => {
              const isSelected = selectedAvatar === opt.emoji;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedAvatar(opt.emoji)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 scale-105 shadow-2xs'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span className="text-3xl mb-1">{opt.emoji}</span>
                  <span className="text-[10px] font-semibold text-stone-700 truncate w-full text-center">
                    {opt.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nickname Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold font-heading text-stone-800">
            Nama Panggilan (Nickname)
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Misal: Fatiah, Nisa, Rian..."
            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-800 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-100 font-sans"
          />
          <p className="text-[11px] text-stone-400">
            Hanya nama panggilan yang terlihat oleh teman terpercaya.
          </p>
        </div>

        {/* Secret Friend Code Card */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-amber-950 uppercase tracking-wide">
              Kode Rahasia Pertemananmu
            </p>
            <p className="font-mono text-base font-bold text-stone-900 mt-0.5">
              #{userProfile.friendCode}
            </p>
            <p className="text-[11px] text-stone-500">
              Bagikan kode ini langsung ke teman yang ingin kamu hubungi.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-stone-700 rounded-xl border border-stone-200 text-xs font-semibold hover:bg-stone-50 shadow-2xs"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>

        {/* Theme Palette */}
        <div className="space-y-2">
          <label className="block text-xs font-bold font-heading text-stone-800">
            Warna Tema Favorit
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {themeOptions.map((th) => {
              const isSelected = selectedTheme === th.id;
              return (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setSelectedTheme(th.id as any)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-stone-900 bg-stone-50 shadow-2xs font-semibold'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${th.color}`} />
                  <span>{th.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-between">
          {savedSuccess && (
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              Profil berhasil diperbarui! ✨
            </span>
          )}
          {!savedSuccess && <div />}

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-semibold text-xs shadow-xs transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
