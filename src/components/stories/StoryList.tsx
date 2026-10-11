import React, { useState } from 'react';
import {
  Search,
  Lock,
  Users,
  PenSquare,
  Trash2,
  Heart,
  Calendar,
  BookOpen,
  Filter,
  Plus,
} from 'lucide-react';
import { Story, MoodType } from '../../types';
import { MoodBadge } from '../common/MoodBadge';
import { EmptyState } from '../common/EmptyState';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface StoryListProps {
  stories: Story[];
  onOpenStory: (storyId: string) => void;
  onEditStory: (story: Story) => void;
  onDeleteStory: (storyId: string) => void;
  onToggleFavorite: (storyId: string) => void;
  onCreateNew: () => void;
}

export const StoryList: React.FC<StoryListProps> = ({
  stories,
  onOpenStory,
  onEditStory,
  onDeleteStory,
  onToggleFavorite,
  onCreateNew,
}) => {
  const [activeFilter, setActiveFilter] = useState<'semua' | 'pribadi' | 'dibagikan' | 'draft'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null);

  const filteredStories = stories.filter((story) => {
    // Filter by category
    if (activeFilter === 'pribadi' && (story.privacy !== 'private' || story.status === 'draft')) {
      return false;
    }
    if (activeFilter === 'dibagikan' && (story.privacy !== 'friends' || story.status === 'draft')) {
      return false;
    }
    if (activeFilter === 'draft' && story.status !== 'draft') {
      return false;
    }

    // Filter by search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        story.title.toLowerCase().includes(q) ||
        story.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDeleteConfirm = () => {
    if (storyToDelete) {
      onDeleteStory(storyToDelete);
      setStoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-stone-900 tracking-tight">
            Ceritaku 📖
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Kumpulan catatan harian dan pengalaman pribadimu
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-semibold text-xs shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Cerita Baru</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari cerita berdasarkan judul atau kata..."
            className="w-full pl-10 pr-4 py-2 bg-white rounded-2xl border border-stone-200/80 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all shadow-2xs"
          />
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setActiveFilter('semua')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              activeFilter === 'semua'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Semua ({stories.length})
          </button>
          <button
            onClick={() => setActiveFilter('pribadi')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              activeFilter === 'pribadi'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Pribadi
          </button>
          <button
            onClick={() => setActiveFilter('dibagikan')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              activeFilter === 'dibagikan'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Dibagikan
          </button>
          <button
            onClick={() => setActiveFilter('draft')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              activeFilter === 'draft'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Draf
          </button>
        </div>
      </div>

      {/* Grid of Story Cards */}
      {filteredStories.length === 0 ? (
        <EmptyState
          title="Belum ada cerita yang cocok"
          description={
            searchQuery
              ? `Tidak ditemukan cerita yang mengandung kata "${searchQuery}". Coba kata kunci lain.`
              : 'Belum ada cerita di kategori ini. Yuk tulis hal seru hari ini!'
          }
          actionText="+ Tulis Cerita Baru"
          onAction={onCreateNew}
          emoji="📝"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => {
            const isDraft = story.status === 'draft';
            return (
              <article
                key={story.id}
                onClick={() => onOpenStory(story.id)}
                className="group scrapbook-card cursor-pointer flex flex-col overflow-hidden bg-white hover:-translate-y-1 relative"
              >
                {/* Visual Cover */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Privacy Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-medium text-stone-700 shadow-2xs flex items-center gap-1.5 border border-stone-200/50">
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

                  {/* Draft tag or Approval status */}
                  {isDraft && (
                    <div className="absolute bottom-3 left-3 bg-amber-500 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-2xs">
                      DRAF
                    </div>
                  )}

                  {story.privacy === 'friends' && story.approvalStatus === 'pending' && (
                    <div className="absolute bottom-3 left-3 bg-amber-100 border border-amber-300 text-amber-800 px-2 py-0.5 rounded-lg text-[10px] font-medium shadow-2xs">
                      Menunggu Izin Orang Tua
                    </div>
                  )}

                  {/* Favorite Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(story.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-400 hover:text-rose-500 shadow-2xs transition-colors"
                    aria-label="Favorit"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        story.isFavorite ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MoodBadge mood={story.mood} size="sm" />
                      <span className="text-xs text-stone-400">
                        {new Intl.DateTimeFormat('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
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

                  {/* Card Actions Footer */}
                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-amber-700 group-hover:underline">
                      Baca Cerita →
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditStory(story);
                        }}
                        className="p-1.5 text-stone-400 hover:text-amber-700 hover:bg-stone-50 rounded-lg transition-colors"
                        title="Edit cerita"
                      >
                        <PenSquare className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setStoryToDelete(story.id);
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-50 rounded-lg transition-colors"
                        title="Hapus cerita"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Confirmation Dialog for Story Deletion */}
      <ConfirmDialog
        isOpen={Boolean(storyToDelete)}
        title="Hapus Cerita Ini?"
        message="Cerita yang dihapus tidak bisa dikembalikan lagi. Kamu yakin ingin menghapusnya dari buku harian?"
        confirmText="Ya, Hapus"
        cancelText="Jangan Hapus"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setStoryToDelete(null)}
      />
    </div>
  );
};
