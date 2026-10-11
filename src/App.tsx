/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  NavigationTab,
  Story,
  Friend,
  FriendStory,
  ShareApprovalRequest,
  UserProfile,
  MoodType,
} from './types';
import { mockApi } from './services/mockApi';
import { AppLayout } from './components/layout/AppLayout';
import { HomeDashboard } from './components/home/HomeDashboard';
import { StoryList } from './components/stories/StoryList';
import { StoryEditor } from './components/stories/StoryEditor';
import { StoryDetail } from './components/stories/StoryDetail';
import { MemoriesView } from './components/memories/MemoriesView';
import { FriendsView } from './components/friends/FriendsView';
import { ProfileView } from './components/profile/ProfileView';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { ToastNotification } from './components/common/ToastNotification';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('beranda');
  const [stories, setStories] = useState<Story[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendStories, setFriendStories] = useState<FriendStory[]>([]);
  const [approvals, setApprovals] = useState<ShareApprovalRequest[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockApi.getUserProfile());

  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [initialMoodForEditor, setInitialMoodForEditor] = useState<MoodType | undefined>(undefined);
  const [toast, setToast] = useState<{
    message: string;
    type?: 'success' | 'info' | 'error';
  } | null>(null);

  // Load all initial data
  const loadData = async () => {
    try {
      const [fetchedStories, fetchedFriends, fetchedFriendStories, fetchedApprovals] =
        await Promise.all([
          mockApi.getStories(),
          mockApi.getFriends(),
          mockApi.getFriendStories(),
          mockApi.getParentApprovals(),
        ]);
      setStories(fetchedStories);
      setFriends(fetchedFriends);
      setFriendStories(fetchedFriendStories);
      setApprovals(fetchedApprovals);
      setUserProfile(mockApi.getUserProfile());
    } catch (err) {
      console.error('Gagal memuat data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (
    message: string,
    type: 'success' | 'info' | 'error' = 'success'
  ) => {
    setToast({ message, type });
  };

  // HANDLERS
  const handleStartWriting = (prefilledMood?: MoodType) => {
    setEditingStory(null);
    setInitialMoodForEditor(prefilledMood);
    setCurrentTab('tulis');
  };

  const handleOpenStory = (storyId: string) => {
    setSelectedStoryId(storyId);
    setCurrentTab('detail');
  };

  const handleEditStory = (story: Story) => {
    setEditingStory(story);
    setInitialMoodForEditor(story.mood || undefined);
    setCurrentTab('tulis');
  };

  const handleSaveStory = async (storyData: Partial<Story>) => {
    try {
      if (editingStory) {
        const updated = await mockApi.updateStory(editingStory.id, storyData);
        showToast('Ceritamu berhasil diperbarui! ✨');
        setSelectedStoryId(updated.id);
        setEditingStory(null);
        setCurrentTab('detail');
      } else {
        const created = await mockApi.createStory(storyData);
        showToast(
          storyData.status === 'draft'
            ? 'Draf berhasil disimpan! 📝'
            : 'Cerita barumu berhasil disimpan! 🌸'
        );
        setSelectedStoryId(created.id);
        setCurrentTab('detail');
      }
      await loadData();
    } catch (err) {
      showToast('Gagal menyimpan cerita. Coba lagi.', 'error');
    }
  };

  const handleDeleteStory = async (storyId: string) => {
    try {
      await mockApi.deleteStory(storyId);
      showToast('Cerita telah dihapus dari buku harian.');
      if (selectedStoryId === storyId) {
        setSelectedStoryId(null);
        setCurrentTab('ceritaku');
      }
      await loadData();
    } catch (err) {
      showToast('Gagal menghapus cerita.', 'error');
    }
  };

  const handleToggleFavorite = async (storyId: string) => {
    try {
      const isFav = await mockApi.toggleFavorite(storyId);
      showToast(
        isFav
          ? 'Ditambahkan ke Kenangan Favorit! 💖'
          : 'Dihapus dari Kenangan Favorit.'
      );
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePrivacy = async (
    storyId: string,
    newPrivacy: 'private' | 'friends'
  ) => {
    try {
      await mockApi.updateStory(storyId, { privacy: newPrivacy });
      showToast(
        newPrivacy === 'friends'
          ? 'Permintaan berbagi diajukan ke Orang Tua! 🛡️'
          : 'Cerita kini diatur sebagai Pribadi. 🔒'
      );
      await loadData();
    } catch (err) {
      showToast('Gagal mengubah privasi cerita.', 'error');
    }
  };

  const handleAddFriend = async (code: string) => {
    const result = await mockApi.addFriendByCode(code);
    if (result.success) {
      showToast(result.message);
      await loadData();
    }
    return result;
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await mockApi.removeFriend(friendId);
      showToast('Teman telah dihapus dari daftar.');
      await loadData();
    } catch (err) {
      showToast('Gagal menghapus teman.', 'error');
    }
  };

  const handleReactToStory = async (
    storyId: string,
    reactionType: 'love' | 'star' | 'rainbow' | 'flower'
  ) => {
    try {
      await mockApi.reactToFriendStory(storyId, reactionType);
      const updatedFriendStories = await mockApi.getFriendStories();
      setFriendStories(updatedFriendStories);
      showToast('Stiker apresiasi berhasil dikirim! ✨');
    } catch (err) {
      console.error(err);
    }
  };

  const handleRespondApproval = async (requestId: string, approved: boolean) => {
    try {
      await mockApi.respondToApproval(requestId, approved);
      showToast(
        approved
          ? 'Cerita diizinkan untuk dibagikan ke teman! ✅'
          : 'Cerita tetap disimpan secara pribadi. 🔒'
      );
      await loadData();
    } catch (err) {
      showToast('Gagal memproses persetujuan.', 'error');
    }
  };

  const handleRevokeSharing = async (storyId: string) => {
    try {
      await mockApi.revokeStorySharing(storyId);
      showToast('Izin berbagi berhasil dicabut. Cerita kembali pribadi.');
      await loadData();
    } catch (err) {
      showToast('Gagal mencabut izin berbagi.', 'error');
    }
  };

  const handleUpdateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const updated = await mockApi.updateUserProfile(updates);
      setUserProfile(updated);
      showToast('Profil buku harian berhasil diperbarui! 🌸');
    } catch (err) {
      showToast('Gagal memperbarui profil.', 'error');
    }
  };

  const handleSwitchRole = (newRole: 'child' | 'parent') => {
    const updated = { ...userProfile, currentRole: newRole };
    mockApi.updateUserProfile({ currentRole: newRole });
    setUserProfile(updated);
    if (newRole === 'parent') {
      setCurrentTab('orangtua');
      showToast('Beralih ke Pusat Kendali Orang Tua 🛡️', 'info');
    } else {
      setCurrentTab('beranda');
      showToast(`Selamat datang kembali, ${userProfile.nickname}! 🌸`, 'info');
    }
  };

  const handleResetDemoData = () => {
    mockApi.resetDemoData();
    loadData();
    showToast('Data simulasi berhasil dikembalikan ke awal! 🔄');
  };

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length;
  const selectedStory = stories.find((s) => s.id === selectedStoryId) || null;
  const sharedStories = stories.filter(
    (s) => s.privacy === 'friends' && s.approvalStatus === 'approved'
  );

  return (
    <AppLayout
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      userProfile={userProfile}
      pendingApprovalsCount={pendingApprovalsCount}
      onSwitchRole={handleSwitchRole}
    >
      {/* Tab: BERANDA */}
      {currentTab === 'beranda' && (
        <HomeDashboard
          userProfile={userProfile}
          stories={stories}
          onOpenStory={handleOpenStory}
          onStartWriting={handleStartWriting}
          onViewAllStories={() => setCurrentTab('ceritaku')}
          onViewMemories={() => setCurrentTab('kenangan')}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Tab: CERITAKU */}
      {currentTab === 'ceritaku' && (
        <StoryList
          stories={stories}
          onOpenStory={handleOpenStory}
          onEditStory={handleEditStory}
          onDeleteStory={handleDeleteStory}
          onToggleFavorite={handleToggleFavorite}
          onCreateNew={() => handleStartWriting()}
        />
      )}

      {/* Tab: TULIS CERITA */}
      {currentTab === 'tulis' && (
        <StoryEditor
          initialStory={editingStory}
          initialMood={initialMoodForEditor}
          friends={friends}
          onSave={handleSaveStory}
          onCancel={() => {
            if (editingStory) {
              setCurrentTab('detail');
            } else {
              setCurrentTab('beranda');
            }
          }}
        />
      )}

      {/* Tab: DETAIL CERITA */}
      {currentTab === 'detail' && selectedStory && (
        <StoryDetail
          story={selectedStory}
          friends={friends}
          onBack={() => setCurrentTab('ceritaku')}
          onEdit={handleEditStory}
          onDelete={handleDeleteStory}
          onToggleFavorite={handleToggleFavorite}
          onChangePrivacy={handleChangePrivacy}
        />
      )}

      {/* Tab: KENANGAN */}
      {currentTab === 'kenangan' && (
        <MemoriesView
          stories={stories}
          onOpenStory={handleOpenStory}
          onToggleFavorite={handleToggleFavorite}
          onStartWriting={() => handleStartWriting()}
        />
      )}

      {/* Tab: TEMAN */}
      {currentTab === 'teman' && (
        <FriendsView
          userProfile={userProfile}
          friends={friends}
          friendStories={friendStories}
          onAddFriend={handleAddFriend}
          onRemoveFriend={handleRemoveFriend}
          onReactToStory={handleReactToStory}
        />
      )}

      {/* Tab: PROFIL */}
      {currentTab === 'profil' && (
        <ProfileView
          userProfile={userProfile}
          storyCount={stories.length}
          memoryCount={stories.filter((s) => s.isFavorite).length}
          friendCount={friends.length}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {/* Tab: PUSAT KENDALI ORANG TUA */}
      {currentTab === 'orangtua' && (
        <ParentDashboard
          userProfile={userProfile}
          approvals={approvals}
          sharedStories={sharedStories}
          friends={friends}
          onRespondApproval={handleRespondApproval}
          onRevokeSharing={handleRevokeSharing}
          onResetDemoData={handleResetDemoData}
          onOpenStory={handleOpenStory}
        />
      )}

      {/* Toast feedback */}
      <ToastNotification
        message={toast?.message || null}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </AppLayout>
  );
}
