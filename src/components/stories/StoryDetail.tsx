import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Lock,
  Users,
  PenSquare,
  Trash2,
  Heart,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { Story, Friend } from '../../types';
import { MoodBadge } from '../common/MoodBadge';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface StoryDetailProps {
  story: Story;
  friends: Friend[];
  onBack: () => void;
  onEdit: (story: Story) => void;
  onDelete: (storyId: string) => void;
  onToggleFavorite: (storyId: string) => void;
  onChangePrivacy: (storyId: string, newPrivacy: 'private' | 'friends') => void;
}

export const StoryDetail: React.FC<StoryDetailProps> = ({
  story,
  friends,
  onBack,
  onEdit,
  onDelete,
  onToggleFavorite,
  onChangePrivacy,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const sharedFriends = friends.filter((f) =>
    story.sharedWithFriendIds.includes(f.id)
  );

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(story.date));

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Action Nav */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 py-2 px-3 rounded-xl hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Ceritaku</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(story.id)}
            className={`p-2 rounded-xl border border-stone-200/80 transition-all ${
              story.isFavorite
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white text-stone-400 hover:text-rose-500 hover:bg-stone-50'
            }`}
            title="Favorit"
          >
            <Heart
              className={`w-4 h-4 ${
                story.isFavorite ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
          </button>

          <button
            onClick={() => onEdit(story)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200/80 rounded-xl hover:bg-stone-50 active:scale-95 transition-all"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 text-stone-400 hover:text-rose-600 bg-white border border-stone-200/80 rounded-xl hover:bg-rose-50 active:scale-95 transition-all"
            title="Hapus cerita"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Reading Page Card */}
      <article className="scrapbook-card bg-white p-6 sm:p-10 space-y-7 relative border border-stone-200/70 overflow-hidden">
        {/* Playful washi tape in corner */}
        <div className="absolute top-2 right-12 w-28 h-6 washi-tape-yellow rotate-2 rounded-xs opacity-75" />

        {/* Header Metadata */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <div className="flex items-center gap-1.5 font-medium text-stone-600">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>{formattedDate}</span>
            </div>
            <span>·</span>
            <MoodBadge mood={story.mood} size="sm" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-heading text-stone-900 tracking-tight leading-snug">
            {story.title}
          </h1>
        </div>

        {/* Cover Illustration Frame */}
        <div className="relative rounded-2xl overflow-hidden aspect-16/9 w-full bg-stone-100 shadow-xs border border-stone-100">
          <img
            src={story.coverImage}
            alt={story.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Story Prose Body */}
        <div className="prose prose-stone max-w-none text-base sm:text-lg text-stone-800 leading-relaxed font-sans whitespace-pre-line">
          {story.content}
        </div>

        {/* Attached Photos Gallery (if any) */}
        {story.additionalPhotos && story.additionalPhotos.length > 0 && (
          <div className="space-y-3 pt-6 border-t border-stone-100">
            <h3 className="text-sm font-bold font-heading text-stone-800">
              Galeri Foto Kenangan
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {story.additionalPhotos.map((photo, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden aspect-square border border-stone-200/70 shadow-2xs group"
                >
                  <img
                    src={photo}
                    alt={`Foto ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Status & Sharing Info Box */}
        <div className="rounded-2xl bg-amber-50/60 border border-amber-200/60 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {story.privacy === 'private' ? (
                <>
                  <div className="w-8 h-8 rounded-xl bg-stone-200/70 flex items-center justify-center text-stone-700">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">
                      Cerita Pribadi
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Hanya kamu yang bisa membaca tulisan ini.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-xl bg-amber-200 flex items-center justify-center text-amber-800">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">
                      Dibagikan ke Teman Pilihan
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Dapat dibaca oleh teman yang kamu izinkan.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Quick toggle privacy */}
            <button
              onClick={() =>
                onChangePrivacy(
                  story.id,
                  story.privacy === 'private' ? 'friends' : 'private'
                )
              }
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 px-3 py-1.5 rounded-xl bg-white border border-amber-200/80 shadow-2xs hover:bg-amber-50 transition-colors"
            >
              {story.privacy === 'private'
                ? 'Bagikan ke Teman'
                : 'Ubah Jadi Pribadi'}
            </button>
          </div>

          {/* Parental Approval details if shared with friends */}
          {story.privacy === 'friends' && (
            <div className="pt-3 border-t border-amber-200/60 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                {story.approvalStatus === 'approved' ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Sudah disetujui Orang Tua
                  </span>
                ) : story.approvalStatus === 'pending' ? (
                  <span className="inline-flex items-center gap-1.5 text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-lg font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Menunggu persetujuan Orang Tua di Pusat Kendali
                  </span>
                ) : (
                  <span className="text-rose-700 font-medium">
                    Persetujuan ditolak orang tua
                  </span>
                )}
              </div>

              {sharedFriends.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <span className="text-[11px] text-stone-500">Penerima:</span>
                  <div className="flex items-center gap-1">
                    {sharedFriends.map((f) => (
                      <span
                        key={f.id}
                        className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-stone-200 text-stone-700 text-xs"
                      >
                        <span>{f.avatar}</span>
                        <span>{f.nickname}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </article>

      {/* Confirmation Dialog for Story Deletion */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Hapus Cerita Ini?"
        message="Cerita ini akan dihapus secara permanen dari buku harianmu. Kamu yakin?"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={() => {
          onDelete(story.id);
          setShowDeleteConfirm(false);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
