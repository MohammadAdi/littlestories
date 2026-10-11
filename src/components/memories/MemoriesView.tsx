import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Heart,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { Story } from '../../types';
import { MoodBadge } from '../common/MoodBadge';
import { EmptyState } from '../common/EmptyState';

interface MemoriesViewProps {
  stories: Story[];
  onOpenStory: (storyId: string) => void;
  onToggleFavorite: (storyId: string) => void;
  onStartWriting: () => void;
}

export const MemoriesView: React.FC<MemoriesViewProps> = ({
  stories,
  onOpenStory,
  onToggleFavorite,
  onStartWriting,
}) => {
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar' | 'gallery'>('timeline');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);

  // Calendar State (Defaults to October 2026 based on mock data & current simulated date)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 = Oktober

  const filteredStories = stories.filter((story) => {
    if (onlyFavorites && !story.isFavorite) return false;
    if (selectedDateFilter && story.date !== selectedDateFilter) return false;
    return true;
  });

  // Group stories by Month and Year for Timeline
  const groupedTimeline = filteredStories.reduce<Record<string, Story[]>>(
    (acc, story) => {
      const d = new Date(story.date);
      const groupKey = new Intl.DateTimeFormat('id-ID', {
        month: 'long',
        year: 'numeric',
      }).format(d);

      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(story);
      return acc;
    },
    {}
  );

  // Calendar calculation
  const monthName = new Intl.DateTimeFormat('id-ID', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(currentYear, currentMonth, 1));

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday

  const calendarDays = [];
  // Empty padding for start of month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const storiesByDate = stories.reduce<Record<string, Story[]>>((acc, story) => {
    if (!acc[story.date]) acc[story.date] = [];
    acc[story.date].push(story);
    return acc;
  }, {});

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-stone-900 tracking-tight">
            Kenangan Indah 🌸
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Album perjalanan dan memori manis yang tersimpan
          </p>
        </div>

        {/* View mode segmented switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              onlyFavorites
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                onlyFavorites ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
            <span>Favorit</span>
          </button>

          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-2xl">
            <button
              onClick={() => {
                setViewMode('timeline');
                setSelectedDateFilter(null);
              }}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Garis Waktu</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Kalender</span>
            </button>
            <button
              onClick={() => {
                setViewMode('gallery');
                setSelectedDateFilter(null);
              }}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                viewMode === 'gallery'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Galeri Foto</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. TIMELINE MODE */}
      {viewMode === 'timeline' && (
        <div className="space-y-8">
          {Object.keys(groupedTimeline).length === 0 ? (
            <EmptyState
              title="Belum Ada Kenangan Tersimpan"
              description="Kenangan akan muncul otomatis setelah kamu menulis cerita hari ini."
              actionText="+ Tulis Cerita Baru"
              onAction={onStartWriting}
              emoji="🌸"
            />
          ) : (
            Object.entries(groupedTimeline).map(([monthYear, monthStories]) => (
              <section key={monthYear} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <h2 className="text-lg font-bold font-heading text-stone-800">
                    {monthYear}
                  </h2>
                  <span className="text-xs text-stone-400">
                    ({monthStories.length} cerita)
                  </span>
                </div>

                <div className="relative pl-5 border-l-2 border-dashed border-amber-200/80 space-y-5 ml-1.5">
                  {monthStories.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => onOpenStory(story.id)}
                      className="group scrapbook-card bg-white p-5 hover:-translate-y-0.5 cursor-pointer flex flex-col sm:flex-row gap-5 items-start sm:items-center relative"
                    >
                      {/* Photo Thumbnail */}
                      <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-stone-100">
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-stone-400">
                          <span>
                            {new Intl.DateTimeFormat('id-ID', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'long',
                            }).format(new Date(story.date))}
                          </span>
                          <span>·</span>
                          <MoodBadge mood={story.mood} size="sm" />
                        </div>

                        <h3 className="text-base font-bold font-heading text-stone-900 group-hover:text-amber-800 transition-colors">
                          {story.title}
                        </h3>

                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {story.content}
                        </p>
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(story.id);
                        }}
                        className="p-2 text-stone-300 hover:text-rose-500 rounded-full hover:bg-stone-50"
                        title="Favorit"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            story.isFavorite ? 'fill-rose-500 text-rose-500' : ''
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      )}

      {/* 2. CALENDAR MODE */}
      {viewMode === 'calendar' && (
        <div className="space-y-6">
          <div className="scrapbook-card bg-white p-6 sm:p-8 space-y-5">
            {/* Calendar Month Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-heading text-stone-900 capitalize">
                {monthName}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                  aria-label="Bulan sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                  aria-label="Bulan berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-stone-400">
              <span>Min</span>
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="h-14 sm:h-18" />;
                }

                const dayString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const storiesOnThisDay = storiesByDate[dayString] || [];
                const hasStories = storiesOnThisDay.length > 0;
                const isSelected = selectedDateFilter === dayString;

                return (
                  <button
                    key={dayString}
                    onClick={() => {
                      if (hasStories) {
                        setSelectedDateFilter(
                          selectedDateFilter === dayString ? null : dayString
                        );
                      }
                    }}
                    disabled={!hasStories}
                    className={`h-14 sm:h-18 p-1.5 rounded-2xl flex flex-col items-center justify-between border transition-all ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 shadow-xs'
                        : hasStories
                        ? 'bg-amber-50/70 border-amber-200/70 hover:bg-amber-100/60 cursor-pointer'
                        : 'bg-stone-50/40 border-stone-100 text-stone-400 cursor-default opacity-80'
                    }`}
                  >
                    <span className="text-xs font-bold font-heading">{day}</span>
                    {hasStories && (
                      <div className="flex items-center gap-0.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shadow-2xs" />
                        {storiesOnThisDay.length > 1 && (
                          <span className="text-[10px] text-amber-800 font-bold">
                            +{storiesOnThisDay.length - 1}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stories on selected day preview */}
          {selectedDateFilter && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-heading text-stone-800">
                  Cerita pada tanggal {selectedDateFilter}:
                </h3>
                <button
                  onClick={() => setSelectedDateFilter(null)}
                  className="text-xs text-amber-700 font-medium hover:underline"
                >
                  Tampilkan Semua Tanggal
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(storiesByDate[selectedDateFilter] || []).map((story) => (
                  <div
                    key={story.id}
                    onClick={() => onOpenStory(story.id)}
                    className="scrapbook-card p-4 bg-white hover:-translate-y-0.5 cursor-pointer flex gap-4 items-center"
                  >
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <MoodBadge mood={story.mood} size="sm" />
                      <h4 className="text-sm font-bold font-heading text-stone-900 truncate mt-1">
                        {story.title}
                      </h4>
                      <p className="text-xs text-stone-500 truncate">
                        {story.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. GALLERY MODE */}
      {viewMode === 'gallery' && (
        <div className="space-y-4">
          <p className="text-xs text-stone-500">
            Kumpulan seluruh foto sampul dan kenangan bergambar dari ceritamu:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                onClick={() => onOpenStory(story.id)}
                className="group relative rounded-2xl overflow-hidden aspect-square bg-stone-100 cursor-pointer border border-stone-200/80 shadow-2xs hover:shadow-md transition-all hover:-translate-y-1"
              >
                <img
                  src={story.coverImage}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-xs font-bold font-heading line-clamp-1">
                    {story.title}
                  </span>
                  <span className="text-[10px] text-stone-200">
                    {story.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
