import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Users,
  Lock,
  Download,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Info,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { ShareApprovalRequest, Story, Friend, UserProfile } from '../../types';
import { EmptyState } from '../common/EmptyState';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface ParentDashboardProps {
  userProfile: UserProfile;
  approvals: ShareApprovalRequest[];
  sharedStories: Story[];
  friends: Friend[];
  onRespondApproval: (requestId: string, approved: boolean) => Promise<void>;
  onRevokeSharing: (storyId: string) => Promise<void>;
  onResetDemoData: () => void;
  onOpenStory: (storyId: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  userProfile,
  approvals,
  sharedStories,
  friends,
  onRespondApproval,
  onRevokeSharing,
  onResetDemoData,
  onOpenStory,
}) => {
  const [showRevokeDialog, setShowRevokeDialog] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'approvals' | 'shared' | 'safety'>('approvals');

  const pendingApprovals = approvals.filter((a) => a.status === 'pending');
  const pastApprovals = approvals.filter((a) => a.status !== 'pending');

  const handleExportData = () => {
    const rawStories = localStorage.getItem('littlestories_stories_v1');
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(rawStories || JSON.stringify([]));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `littlestories-cadangan-${userProfile.nickname}-${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-xl shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-stone-900 tracking-tight">
              Pusat Kendali Orang Tua 🛡️
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Mengawasi aktivitas berbagi cerita anak tercinta ({userProfile.nickname})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 shadow-2xs transition-all"
            title="Unduh salinan data buku harian anak"
          >
            <Download className="w-4 h-4 text-stone-500" />
            <span>Ekspor Data</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-600 transition-all"
            title="Reset contoh data simulasi"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Philosophy & Privacy Manifesto Banner */}
      <div className="rounded-3xl bg-linear-to-r from-amber-100/80 via-white to-amber-50 p-6 border border-amber-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold font-heading text-sm sm:text-base">
          <Info className="w-5 h-5 text-amber-700 shrink-0" />
          <span>Prinsip Keamanan & Privasi Buku Harian Anak</span>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Buku harian adalah ruang ekspresi pribadi anak untuk membangun kebiasaan menulis dan kesadaran emosional.
          Demi menjaga rasa saling percaya, <strong>catatan pribadi yang tidak diajukan untuk dibagikan tetap terjaga kerahasiaannya secara otomatis</strong>.
          Sebagai orang tua, Anda meninjau dan memberi persetujuan saat anak ingin membagikan cerita ke teman.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200/80 pb-2">
        <button
          onClick={() => setActiveTab('approvals')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'approvals'
              ? 'bg-amber-600 text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <span>Permintaan Berbagi</span>
          {pendingApprovals.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-white text-amber-700 text-[10px] font-bold flex items-center justify-center">
              {pendingApprovals.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('shared')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'shared'
              ? 'bg-amber-600 text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <span>Cerita Aktif Dibagikan ({sharedStories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('safety')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'safety'
              ? 'bg-amber-600 text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <span>Pengaturan Akun & Teman</span>
        </button>
      </div>

      {/* 1. APPROVALS TAB */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-base font-bold font-heading text-stone-900 flex items-center gap-2">
              <span>Menunggu Persetujuan Anda</span>
              {pendingApprovals.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                  {pendingApprovals.length} cerita
                </span>
              )}
            </h2>

            {pendingApprovals.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-stone-300">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h3 className="text-sm font-bold font-heading text-stone-800">
                  Tidak Ada Permintaan Tertunda
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Saat ini anak Anda belum mengajukan cerita baru untuk dibagikan kepada teman.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingApprovals.map((req) => (
                  <div
                    key={req.id}
                    className="scrapbook-card bg-white p-5 border border-amber-300/80 shadow-xs space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          PERMINTAAN BERBAGI
                        </span>
                        <h3 className="text-base font-bold font-heading text-stone-900 mt-1.5">
                          {req.storyTitle}
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Diajukan oleh {req.childNickname} pada {req.requestedDate}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 text-xs text-stone-700 leading-relaxed italic">
                      "{req.storySnippet}"
                    </div>

                    <div className="text-xs text-stone-600 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>
                        Dibagikan ke:{' '}
                        <strong>{req.requestedFriends.join(', ')}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                      <button
                        onClick={() => onRespondApproval(req.id, false)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 active:scale-95"
                      >
                        <XCircle className="w-4 h-4 text-stone-400" />
                        <span>Tetap Pribadi</span>
                      </button>

                      <button
                        onClick={() => onRespondApproval(req.id, true)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Izinkan Berbagi</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Approvals History */}
          {pastApprovals.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <h3 className="text-sm font-bold font-heading text-stone-700">
                Riwayat Keputusan Sebelumnya
              </h3>
              <div className="space-y-2">
                {pastApprovals.map((req) => (
                  <div
                    key={req.id}
                    className="p-3.5 bg-white rounded-2xl border border-stone-200/70 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-stone-800">
                        {req.storyTitle}
                      </p>
                      <p className="text-stone-400 text-[11px]">
                        Ditujukan ke {req.requestedFriends.join(', ')} ·{' '}
                        {req.requestedDate}
                      </p>
                    </div>
                    <div>
                      {req.status === 'approved' ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-medium border border-emerald-200">
                          Disetujui ✓
                        </span>
                      ) : (
                        <span className="text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg font-medium">
                          Ditolak (Pribadi)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. CURRENTLY SHARED STORIES */}
      {activeTab === 'shared' && (
        <div className="space-y-4">
          <p className="text-xs text-stone-500">
            Berikut adalah cerita yang saat ini telah disetujui dan dapat dibaca oleh teman anak. Anda dapat mencabut akses kapan saja.
          </p>

          {sharedStories.length === 0 ? (
            <EmptyState
              title="Tidak Ada Cerita yang Dibagikan"
              description="Semua cerita anak tersimpan secara pribadi di perangkatnya."
              emoji="🔒"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sharedStories.map((story) => (
                <div
                  key={story.id}
                  className="scrapbook-card bg-white p-5 space-y-3 border border-stone-200/80"
                >
                  <div className="flex gap-3">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-stone-400">
                        {story.date}
                      </span>
                      <h4 className="text-sm font-bold font-heading text-stone-900 truncate">
                        {story.title}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-2">
                        {story.content}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => onOpenStory(story.id)}
                      className="text-xs text-amber-700 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Lihat Cerita</span>
                    </button>

                    <button
                      onClick={() => setShowRevokeDialog(story.id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold border border-rose-200 transition-colors"
                    >
                      Tarik Izin Berbagi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. SAFETY SETTINGS & FRIENDS TAB */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <div className="scrapbook-card bg-white p-6 space-y-4">
            <h3 className="text-sm font-bold font-heading text-stone-900">
              Daftar Teman Terhubung Anak ({friends.length})
            </h3>
            <p className="text-xs text-stone-500">
              Hanya akun di bawah ini yang dapat bertukar cerita dengan {userProfile.nickname}:
            </p>

            <div className="space-y-2">
              {friends.map((f) => (
                <div
                  key={f.id}
                  className="p-3 bg-stone-50 rounded-2xl flex items-center justify-between text-xs border border-stone-200/60"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{f.avatar}</span>
                    <div>
                      <p className="font-bold text-stone-800">{f.nickname}</p>
                      <p className="text-stone-400 font-mono text-[10px]">
                        Kode: #{f.friendCode}
                      </p>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                    Terverifikasi
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="scrapbook-card bg-white p-6 space-y-3">
            <h3 className="text-sm font-bold font-heading text-stone-900">
              Pengaturan Privasi & Data
            </h3>
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span>Email Orang Tua Terdaftar</span>
                <span className="font-mono font-medium text-stone-800">
                  {userProfile.parentEmail}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span>Visibilitas Profil Publik</span>
                <span className="font-semibold text-emerald-700">
                  Nonaktif (100% Privat)
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span>Pencarian Direktori Terbuka</span>
                <span className="font-semibold text-emerald-700">
                  Diblokir untuk perlindungan
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Sharing Confirm Dialog */}
      <ConfirmDialog
        isOpen={Boolean(showRevokeDialog)}
        title="Tarik Izin Berbagi Cerita?"
        message="Cerita ini akan segera diubah kembali menjadi Pribadi. Teman anak tidak akan lagi dapat membaca cerita ini."
        confirmText="Tarik Izin"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={async () => {
          if (showRevokeDialog) {
            await onRevokeSharing(showRevokeDialog);
            setShowRevokeDialog(null);
          }
        }}
        onCancel={() => setShowRevokeDialog(null)}
      />

      {/* Reset Demo Data Confirm Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Data Demo?"
        message="Akan mengembalikan contoh cerita awal, teman, dan permohonan persetujuan ke kondisi semula."
        confirmText="Reset Sekarang"
        cancelText="Batal"
        isDestructive={false}
        onConfirm={() => {
          onResetDemoData();
          setShowResetConfirm(false);
        }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
