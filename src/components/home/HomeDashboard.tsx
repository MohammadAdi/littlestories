import React, { useState } from 'react';
import {
  PenSquare,
  Sparkles,
  Lock,
  Users,
  ChevronRight,
  Heart,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { Story, UserProfile, MoodType } from '../../types';
import { MOODS } from '../../services/mockApi';
import { MoodBadge } from '../common/MoodBadge';

interface HomeDashboardProps {
  userProfile: UserProfile;
  stories: Story[];
  onOpenStory: (storyId: string) => void;
  onStartWriting: (prefilledMood?: MoodType) => void;
  onViewAllStories: () => void;
  onViewMemories: () => void;
  onToggleFavorite: (storyId: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  userProfile,
  stories,
  onOpenStory,
  onStartWriting,
  onViewAllStories,
  onViewMemories,
  onToggleFavorite,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  // Indonesian Date Formatting
  const todayFormatted = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const recentStories = stories.slice(0, 3);
  const memoryHighlight = stories.find((s) => s.id === 'story-4') || stories[stories.length - 1];

  const handleSelectMood = (moodId: MoodType) => {
    setSelectedMood(moodId);
    setHasCheckedIn(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-amber-100/70 via-rose-50/60 to-purple-50/70 p-6 sm:p-8 border border-amber-200/60 shadow-xs">
        {/* Playful washi tape decorative top edge */}
        <div className="absolute top-2 left-8 w-20 h-5 washi-tape-yellow -rotate-2 rounded-xs opacity-80" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center text-3xl sm:text-4xl border-2 border-amber-200">
                {userProfile.avatar}
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-white flex items-center justify-center text-xs shadow-2xs">
                ✨
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>{todayFormatted}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900 tracking-tight">
                Hai, {userProfile.nickname}! 🌸
              </h1>
              <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-md">
                Ada cerita seru atau perasaan yang ingin kamu simpan hari ini?
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto shrink-0">
            <button
              onClick={() => onStartWriting(selectedMood || undefined)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white font-heading font-semibold text-base shadow-sm transition-all"
            >
              <PenSquare className="w-5 h-5" />
              <span>+ Tulis Cerita</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Mood Check-in Section */}
      <section className="bg-white rounded-3xl p-6 border border-stone-200/70 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold font-heading text-stone-800">
              Bagaimana perasaanmu hari ini?
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Pilih satu yang paling menggambarkan hatimu saat ini
            </p>
          </div>
          {hasCheckedIn && (
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full font-medium">
              Terpilih ✓
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
          {MOODS.map((m) => {
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMood(m.id)}
                className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition-all border ${
                  isSelected
                    ? `${m.bgClass} ${m.borderClass} ring-2 ring-amber-400 scale-[1.03] shadow-xs`
                    : 'bg-stone-50/80 border-stone-200/60 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                <span className="text-3xl mb-1.5 transform transition-transform group-hover:scale-110">
                  {m.emoji}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? m.textClass : 'text-stone-700'
                  }`}
                >
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        {hasCheckedIn && selectedMood && (
          <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-50/50 p-3 rounded-2xl">
            <p className="text-xs text-stone-700">
              Kamu memilih suasana <span className="font-semibold underline capitalize">{selectedMood}</span>. Ingin menuangkannya ke dalam cerita?
            </p>
            <button
              onClick={() => onStartWriting(selectedMood)}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-amber-200/80 shadow-2xs hover:bg-amber-50"
            >
              <span>Mulai Cerita dengan Suasana Ini</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* 3. Recent Stories (Cerita Harianku) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold font-heading text-stone-900">
              Cerita Harianku
            </h2>
          </div>
          <button
            onClick={onViewAllStories}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentStories.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-stone-300">
            <p className="text-stone-500 text-sm mb-3">
              Belum ada cerita yang tersimpan. Mulai tulis pengalaman pertamamu!
            </p>
            <button
              onClick={() => onStartWriting()}
              className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-medium"
            >
              Tulis Cerita Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentStories.map((story) => (
              <article
                key={story.id}
                onClick={() => onOpenStory(story.id)}
                className="group scrapbook-card cursor-pointer flex flex-col overflow-hidden bg-white hover:-translate-y-1"
              >
                {/* Cover image container */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Privacy badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-medium text-stone-700 shadow-2xs flex items-center gap-1.5 border border-stone-200/50">
                    {story.privacy === 'private' ? (
                      <>
                        <Lock className="w-3 h-3 text-stone-500" />
                        <span>Pribadi</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-3 h-3 text-amber-600" />
                        <span>Teman Pilihan</span>
                      </>
                    )}
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(story.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-400 hover:text-rose-500 shadow-2xs transition-colors"
                    aria-label={story.isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        story.isFavorite ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MoodBadge mood={story.mood} size="sm" />
                      <span className="text-xs text-stone-400">
                        {new Intl.DateTimeFormat('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        }).format(new Date(story.date))}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1 mb-1.5">
                      {story.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {story.content}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="text-[11px] text-stone-400">
                      Buku Harian
                    </span>
                    <span className="font-medium text-amber-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                      Baca cerita →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. Memory Highlights (Kenangan Indah) */}
      {memoryHighlight && (
        <section className="rounded-3xl bg-linear-to-br from-amber-50/80 via-white to-orange-50/80 p-6 sm:p-7 border border-amber-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌟</span>
              <div>
                <h2 className="text-lg font-bold font-heading text-stone-900">
                  Kenangan Indah
                </h2>
                <p className="text-xs text-stone-500">
                  Momen manis yang pernah kamu abadikan
                </p>
              </div>
            </div>
            <button
              onClick={onViewMemories}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              Buka Album Kenangan →
            </button>
          </div>

          <div
            onClick={() => onOpenStory(memoryHighlight.id)}
            className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-white border border-stone-200/70 cursor-pointer hover:border-amber-300 transition-all group"
          >
            <div className="w-full sm:w-44 h-36 rounded-xl overflow-hidden shrink-0 bg-stone-100">
              <img
                src={memoryHighlight.coverImage}
                alt={memoryHighlight.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span>
                  {new Intl.DateTimeFormat('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format(new Date(memoryHighlight.date))}
                </span>
                <span>·</span>
                <MoodBadge mood={memoryHighlight.mood} size="sm" />
              </div>
              <h3 className="text-base font-bold font-heading text-stone-900 group-hover:text-amber-800">
                {memoryHighlight.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                "{memoryHighlight.content}"
              </p>
              <p className="text-[11px] font-medium text-amber-600">
                Klik untuk mengenang kembali cerita ini →
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
