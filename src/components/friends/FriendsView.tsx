import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  BookOpen,
  Copy,
  Check,
  Heart,
  Star,
  Sparkles,
  ShieldCheck,
  X,
  Calendar,
  Smile,
  Trash2,
} from 'lucide-react';
import { Friend, FriendStory, UserProfile } from '../../types';
import { EmptyState } from '../common/EmptyState';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface FriendsViewProps {
  userProfile: UserProfile;
  friends: Friend[];
  friendStories: FriendStory[];
  onAddFriend: (code: string) => Promise<{ success: boolean; message: string }>;
  onRemoveFriend: (friendId: string) => Promise<void>;
  onReactToStory: (
    storyId: string,
    reactionType: 'love' | 'star' | 'rainbow' | 'flower'
  ) => Promise<void>;
}

export const FriendsView: React.FC<FriendsViewProps> = ({
  userProfile,
  friends,
  friendStories,
  onAddFriend,
  onRemoveFriend,
  onReactToStory,
}) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'friends'>('stories');
  const [showAddModal, setShowAddModal] = useState(false);
  const [friendCodeInput, setFriendCodeInput] = useState('');
  const [addMessage, setAddMessage] = useState<{
    text: string;
    isError?: boolean;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedStory, setSelectedStory] = useState<FriendStory | null>(null);
  const [friendToDelete, setFriendToDelete] = useState<Friend | null>(null);

  const handleCopyMyCode = () => {
    navigator.clipboard.writeText(userProfile.friendCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAddFriendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendCodeInput.trim()) return;

    const res = await onAddFriend(friendCodeInput.trim());
    if (res.success) {
      setAddMessage({ text: res.message, isError: false });
      setFriendCodeInput('');
      setTimeout(() => {
        setShowAddModal(false);
        setAddMessage(null);
      }, 1500);
    } else {
      setAddMessage({ text: res.message, isError: true });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-stone-900 tracking-tight">
            Teman & Cerita Sahabat 🌸
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Berbagi kisah seru secara aman hanya dengan teman terpercaya
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Friend Trigger */}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-semibold text-xs shadow-xs transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah Teman</span>
          </button>
        </div>
      </div>

      {/* Safety Reassurance Card */}
      <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-200/80 flex items-center justify-center text-amber-800 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-amber-950">
              Ruang Ramah & Tanpa Jejak Publik
            </p>
            <p className="text-amber-800 text-[11px] leading-tight">
              Tidak ada kolom komentar terbuka atau daftar profil publik. Setiap teman hanya bisa ditambahkan menggunakan kode rahasia pribadi.
            </p>
          </div>
        </div>

        {/* My Private Code Box */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-amber-200/90 shadow-2xs">
          <span className="text-[11px] text-stone-500">Kodemu:</span>
          <span className="font-mono font-bold text-stone-900 tracking-wider">
            {userProfile.friendCode}
          </span>
          <button
            onClick={handleCopyMyCode}
            className="text-stone-400 hover:text-amber-700 p-1"
            title="Salin kode pertemanan"
          >
            {copiedCode ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Segmented Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-stone-200/80 pb-2">
        <button
          onClick={() => setActiveTab('stories')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'stories'
              ? 'bg-stone-900 text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Cerita Teman ({friendStories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('friends')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'friends'
              ? 'bg-stone-900 text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Daftar Teman ({friends.length})</span>
        </button>
      </div>

      {/* 1. CERITA TEMAN (Shared Stories from Friends) */}
      {activeTab === 'stories' && (
        <div className="space-y-6">
          {friendStories.length === 0 ? (
            <EmptyState
              title="Belum Ada Cerita dari Teman"
              description="Ketika teman terpercayamu membagikan cerita, kamu bisa membacanya dan mengirimkan stiker hangat di sini."
              emoji="📬"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {friendStories.map((story) => (
                <article
                  key={story.id}
                  onClick={() => setSelectedStory(story)}
                  className="group scrapbook-card bg-white cursor-pointer overflow-hidden flex flex-col hover:-translate-y-1 transition-all"
                >
                  {/* Cover */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Author chip */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold text-stone-800 shadow-2xs flex items-center gap-1.5 border border-stone-200/50">
                      <span>{story.authorAvatar}</span>
                      <span>{story.authorNickname}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-stone-900/70 backdrop-blur-xs px-2.5 py-0.5 rounded-lg text-[10px] text-white">
                      {new Intl.DateTimeFormat('id-ID', {
                        day: 'numeric',
                        month: 'short',
                      }).format(new Date(story.date))}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-bold font-heading text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                        {story.title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mt-1">
                        {story.content}
                      </p>
                    </div>

                    {/* Positive Sticker Reactions Bar */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-stone-400">Reaksi:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200/60 font-medium">
                            ❤️ {story.reactions.love}
                          </span>
                          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200/60 font-medium">
                            ⭐ {story.reactions.star}
                          </span>
                          <span className="text-xs bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full border border-pink-200/60 font-medium">
                            🌸 {story.reactions.flower}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-amber-700 group-hover:underline">
                        Baca Selengkapnya →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. DAFTAR TEMAN */}
      {activeTab === 'friends' && (
        <div className="space-y-4">
          {friends.length === 0 ? (
            <EmptyState
              title="Belum Ada Teman Terhubung"
              description="Minta kode rahasia dari teman sekolahmu dan masukkan di sini."
              actionText="+ Tambah Teman"
              onAction={() => setShowAddModal(true)}
              emoji="🤝"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="scrapbook-card bg-white p-5 flex items-center justify-between gap-3 border border-stone-200/80"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-2xl shrink-0">
                      {friend.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-heading text-stone-900">
                        {friend.nickname}
                      </h4>
                      <p className="text-[11px] text-stone-400 font-mono">
                        Kode: #{friend.friendCode}
                      </p>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        Berteman sejak {friend.sinceDate}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setFriendToDelete(friend)}
                    className="p-2 text-stone-300 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                    title="Hapus dari daftar teman"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* READ FRIEND STORY MODAL */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto relative border border-stone-100"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 p-2 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Author info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl">
                {selectedStory.authorAvatar}
              </div>
              <div>
                <h3 className="text-sm font-bold font-heading text-stone-900">
                  {selectedStory.authorNickname}
                </h3>
                <span className="text-[11px] text-stone-400">
                  Dibagikan pada {selectedStory.date}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold font-heading text-stone-900 mb-4">
              {selectedStory.title}
            </h2>

            <div className="rounded-2xl overflow-hidden aspect-16/9 bg-stone-100 mb-5 border border-stone-100">
              <img
                src={selectedStory.coverImage}
                alt={selectedStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-base text-stone-800 leading-relaxed whitespace-pre-line mb-6 font-sans">
              {selectedStory.content}
            </p>

            {/* Warm Positive Reactions Bar */}
            <div className="pt-4 border-t border-stone-100 bg-amber-50/50 p-4 rounded-2xl space-y-2">
              <p className="text-xs font-semibold text-stone-700">
                Kirim stiker apresiasi hangat untuk {selectedStory.authorNickname}:
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => onReactToStory(selectedStory.id, 'love')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    selectedStory.myReaction === 'love'
                      ? 'bg-rose-100 text-rose-800 border-rose-300 ring-2 ring-rose-300'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <span>❤️</span>
                  <span>Suka ({selectedStory.reactions.love})</span>
                </button>
                <button
                  onClick={() => onReactToStory(selectedStory.id, 'star')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    selectedStory.myReaction === 'star'
                      ? 'bg-amber-100 text-amber-800 border-amber-300 ring-2 ring-amber-300'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <span>⭐</span>
                  <span>Keren ({selectedStory.reactions.star})</span>
                </button>
                <button
                  onClick={() => onReactToStory(selectedStory.id, 'rainbow')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    selectedStory.myReaction === 'rainbow'
                      ? 'bg-purple-100 text-purple-800 border-purple-300 ring-2 ring-purple-300'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <span>🌈</span>
                  <span>Pelangi ({selectedStory.reactions.rainbow})</span>
                </button>
                <button
                  onClick={() => onReactToStory(selectedStory.id, 'flower')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    selectedStory.myReaction === 'flower'
                      ? 'bg-pink-100 text-pink-800 border-pink-300 ring-2 ring-pink-300'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <span>🌸</span>
                  <span>Bunga ({selectedStory.reactions.flower})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD FRIEND MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl border border-stone-100"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold font-heading text-stone-900">
                Tambah Teman Baru 🤝
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setAddMessage(null);
                }}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              Masukkan kode pertemanan rahasia yang diberikan oleh temanmu secara langsung:
            </p>

            <form onSubmit={handleAddFriendSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={friendCodeInput}
                  onChange={(e) => setFriendCodeInput(e.target.value)}
                  placeholder="Contoh: MAYA-19 atau RIAN-24"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-mono tracking-wider focus:outline-hidden focus:border-amber-500 uppercase placeholder:normal-case placeholder:font-sans"
                />
              </div>

              {addMessage && (
                <div
                  className={`text-xs p-2.5 rounded-xl ${
                    addMessage.isError
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {addMessage.text}
                </div>
              )}

              <div className="bg-amber-50 p-3 rounded-xl text-[11px] text-amber-800 leading-tight">
                🔒 Perlindungan Anak: Hanya teman dengan kode rahasia yang dapat terhubung.
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-xs font-semibold text-white shadow-xs"
                >
                  Hubungkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM REMOVE FRIEND */}
      <ConfirmDialog
        isOpen={Boolean(friendToDelete)}
        title="Hapus Teman Ini?"
        message={`Apakah kamu yakin ingin menghapus ${friendToDelete?.nickname} dari daftar teman? Kalian tidak akan dapat lagi saling melihat cerita yang dibagikan.`}
        confirmText="Hapus Teman"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={async () => {
          if (friendToDelete) {
            await onRemoveFriend(friendToDelete.id);
            setFriendToDelete(null);
          }
        }}
        onCancel={() => setFriendToDelete(null)}
      />
    </div>
  );
};
