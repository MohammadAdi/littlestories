import {
  Story,
  Friend,
  FriendStory,
  ShareApprovalRequest,
  UserProfile,
  MoodItem,
  MoodType,
} from '../types';

export const MOODS: MoodItem[] = [
  {
    id: 'senang',
    label: 'Senang',
    emoji: '😄',
    colorName: 'Kuning Ceria',
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-800',
    borderClass: 'border-amber-300',
  },
  {
    id: 'sedih',
    label: 'Sedih',
    emoji: '😢',
    colorName: 'Biru Lembut',
    bgClass: 'bg-sky-100',
    textClass: 'text-sky-800',
    borderClass: 'border-sky-300',
  },
  {
    id: 'marah',
    label: 'Marah',
    emoji: '😠',
    colorName: 'Merah Hangat',
    bgClass: 'bg-rose-100',
    textClass: 'text-rose-800',
    borderClass: 'border-rose-300',
  },
  {
    id: 'khawatir',
    label: 'Khawatir',
    emoji: '😟',
    colorName: 'Ungu Teduh',
    bgClass: 'bg-indigo-100',
    textClass: 'text-indigo-800',
    borderClass: 'border-indigo-300',
  },
  {
    id: 'tenang',
    label: 'Tenang',
    emoji: '😌',
    colorName: 'Hijau Sejuk',
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-800',
    borderClass: 'border-emerald-300',
  },
  {
    id: 'semangat',
    label: 'Semangat',
    emoji: '🤩',
    colorName: 'Oranye Terang',
    bgClass: 'bg-orange-100',
    textClass: 'text-orange-800',
    borderClass: 'border-orange-300',
  },
];

export const AVATAR_OPTIONS = [
  { id: 'cat', name: 'Kucing Manis', emoji: '🐱', bg: 'bg-amber-100' },
  { id: 'rabbit', name: 'Kelinci Ceria', emoji: '🐰', bg: 'bg-pink-100' },
  { id: 'bear', name: 'Beruang Hangat', emoji: '🐻', bg: 'bg-orange-100' },
  { id: 'owl', name: 'Burung Hantu', emoji: '🦉', bg: 'bg-indigo-100' },
  { id: 'fox', name: 'Rubah Pintar', emoji: '🦊', bg: 'bg-red-100' },
  { id: 'star', name: 'Bintang Terang', emoji: '⭐', bg: 'bg-yellow-100' },
];

export const COVER_PRESETS = [
  {
    id: 'cat',
    title: 'Kucing di Taman Bunga',
    url: '/src/assets/images/diary_cover_cat_1791676564290.jpg',
  },
  {
    id: 'bicycle',
    title: 'Sepeda Sore Hari',
    url: '/src/assets/images/diary_cover_bicycle_1791676576960.jpg',
  },
  {
    id: 'stargazing',
    title: 'Malam Berbintang',
    url: '/src/assets/images/diary_cover_stargazing_1791676588659.jpg',
  },
  {
    id: 'cooking',
    title: 'Membuat Kue Bersama',
    url: '/src/assets/images/diary_cover_cooking_1791676599606.jpg',
  },
];

const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'Kucing Kecil di Depan Rumah',
    content:
      'Pagi ini waktu aku mau berangkat sekolah, ada kucing kecil berwarna oranye tidur di dekat pot bunga depan teras. Bulunya lembut sekali dan suaranya pelan mengeong seperti minta makan. Aku minta izin Ibu untuk memberinya sedikit biskuit dan susu hangat.\n\nKucing itu lalu menggosokkan kepalanya ke kakiku. Rasanya hangat sekali di hati! Sore nanti sepulang sekolah aku mau mengajaknya bermain dengan tali wol merah.',
    date: '2026-10-10',
    mood: 'senang',
    coverImage: '/src/assets/images/diary_cover_cat_1791676564290.jpg',
    additionalPhotos: [],
    privacy: 'private',
    status: 'published',
    approvalStatus: 'none',
    sharedWithFriendIds: [],
    isFavorite: true,
    createdAt: '2026-10-10T08:30:00.000Z',
    updatedAt: '2026-10-10T08:30:00.000Z',
  },
  {
    id: 'story-2',
    title: 'Hari Pertamaku Ikut Lomba',
    content:
      'Kemarin hari Kamis aku ikut lomba menggambar pemandangan antar kelas 4. Awalnya tanganku agak gemetar dan jantungku berdegup cepat sekali karena banyak yang melihat.\n\nTapi aku ingat kata Ayah: "Menggambar itu untuk bersenang-senang, bukan untuk membandingkan diri." Begitu aku mulai menggoreskan krayon warna kuning dan biru muda, rasa gugupku hilang perlahan. Walaupun tidak juara satu, aku dapat piala juara harapan dan yang paling penting aku berani mencoba!',
    date: '2026-10-08',
    mood: 'semangat',
    coverImage: '/src/assets/images/diary_cover_bicycle_1791676576960.jpg',
    additionalPhotos: [],
    privacy: 'friends',
    status: 'published',
    approvalStatus: 'approved',
    sharedWithFriendIds: ['f-1', 'f-2'],
    isFavorite: true,
    createdAt: '2026-10-08T15:20:00.000Z',
    updatedAt: '2026-10-08T15:20:00.000Z',
  },
  {
    id: 'story-3',
    title: 'Aku Kesal dengan Temanku',
    content:
      'Waktu jam istirahat tadi siang, kotak pensil baruku yang ada gantungan kelinci tidak sengaja terjatuh karena temanku berlari terlalu cepat. Tutupnya retak sedikit.\n\nAku merasa sangat kesal dan ingin menangis di sudut kelas. Temanku sudah minta maaf, tapi saat itu aku masih belum mau bicara dengannya. Sekarang sesudah mandi sore dan minum teh manis, amarahku mulai reda. Besok aku mau memaafkannya dengan tulus, karena dia memang tidak sengaja.',
    date: '2026-10-05',
    mood: 'marah',
    coverImage: '/src/assets/images/diary_cover_stargazing_1791676588659.jpg',
    additionalPhotos: [],
    privacy: 'private',
    status: 'published',
    approvalStatus: 'none',
    sharedWithFriendIds: [],
    isFavorite: false,
    createdAt: '2026-10-05T17:15:00.000Z',
    updatedAt: '2026-10-05T17:15:00.000Z',
  },
  {
    id: 'story-4',
    title: 'Liburan ke Rumah Nenek',
    content:
      'Akhir pekan lalu kami sekeluarga pergi ke desa tempat tinggal Nenek. Udara di sana sejuk sekali dan banyak pohon rambutan yang buahnya sudah mulai memerah.\n\nAku diajari Nenek membuat kue kering bentuk beruang madu di dapur tua yang harum vanila. Tepungnya sempat kena hidungku sampai Ibu tertawa. Rasanya ingin tinggal lebih lama di sana.',
    date: '2026-09-28',
    mood: 'tenang',
    coverImage: '/src/assets/images/diary_cover_cooking_1791676599606.jpg',
    additionalPhotos: [],
    privacy: 'friends',
    status: 'published',
    approvalStatus: 'pending',
    sharedWithFriendIds: ['f-1'],
    isFavorite: true,
    createdAt: '2026-09-28T19:00:00.000Z',
    updatedAt: '2026-09-28T19:00:00.000Z',
  },
  {
    id: 'story-5',
    title: 'Hari Ini Aku Bangga',
    content:
      'Hari ini bu guru memanggilku ke depan kelas untuk membacakan puisi tentang hujan yang aku buat kemarin lusa. Suaraku lantang dan teman-teman bertepuk tangan.\n\nAku senang sekali bisa menyelesaikan puisiku sendiri tanpa bantuan kakak!',
    date: '2026-09-20',
    mood: 'senang',
    coverImage: '/src/assets/images/diary_cover_cat_1791676564290.jpg',
    additionalPhotos: [],
    privacy: 'private',
    status: 'published',
    approvalStatus: 'none',
    sharedWithFriendIds: [],
    isFavorite: false,
    createdAt: '2026-09-20T14:40:00.000Z',
    updatedAt: '2026-09-20T14:40:00.000Z',
  },
];

const INITIAL_FRIENDS: Friend[] = [
  {
    id: 'f-1',
    nickname: 'Nisa Bintang',
    avatar: '🐰',
    friendCode: 'NISA-88',
    status: 'approved',
    sinceDate: '2026-08-15',
    bio: 'Suka membaca dongeng dan mewarnai bunga.',
  },
  {
    id: 'f-2',
    nickname: 'Rian Penjelajah',
    avatar: '🦊',
    friendCode: 'RIAN-24',
    status: 'approved',
    sinceDate: '2026-09-01',
    bio: 'Suka mengamati serangga dan main sepeda.',
  },
  {
    id: 'f-3',
    nickname: 'Maya Bunga',
    avatar: '🐱',
    friendCode: 'MAYA-19',
    status: 'approved',
    sinceDate: '2026-09-20',
    bio: 'Suka membuat prakarya dari origami kertas.',
  },
];

const INITIAL_FRIEND_STORIES: FriendStory[] = [
  {
    id: 'fs-1',
    authorId: 'f-1',
    authorNickname: 'Nisa Bintang',
    authorAvatar: '🐰',
    title: 'Bunga Matahari yang Mekar Pertama',
    content:
      'Tiga minggu lalu aku menanam biji bunga matahari di pot daur ulang. Hari ini kelopak kuningnya akhirnya terbuka lebar menghadap sinar mentari pagi! Senang sekali bisa merawatnya dari kecil bersama bundaku.',
    coverImage: '/src/assets/images/diary_cover_bicycle_1791676576960.jpg',
    date: '2026-10-09',
    reactions: { love: 3, star: 5, rainbow: 2, flower: 4 },
    myReaction: 'flower',
  },
  {
    id: 'fs-2',
    authorId: 'f-2',
    authorNickname: 'Rian Penjelajah',
    authorAvatar: '🦊',
    title: 'Menemukan Kumbang Emas Kecil',
    content:
      'Waktu bersepeda di jalan belakang komplek, ada kilauan di daun pohon jambu. Pas aku dekati ternyata seekor kumbang kecil yang warnanya berkilau seperti emas! Aku amati sebentar lalu membiarkannya terbang bebas.',
    coverImage: '/src/assets/images/diary_cover_stargazing_1791676588659.jpg',
    date: '2026-10-07',
    reactions: { love: 2, star: 4, rainbow: 1, flower: 1 },
    myReaction: null,
  },
];

const INITIAL_APPROVALS_REQUESTS: ShareApprovalRequest[] = [
  {
    id: 'appr-1',
    storyId: 'story-4',
    storyTitle: 'Liburan ke Rumah Nenek',
    childNickname: 'Fatiah',
    requestedFriends: ['Nisa Bintang'],
    requestedDate: '2026-09-28',
    status: 'pending',
    storySnippet:
      'Aku diajari Nenek membuat kue kering bentuk beruang madu di dapur tua yang harum vanila...',
  },
];

const INITIAL_PROFILE: UserProfile = {
  id: 'user-fatiah',
  nickname: 'Fatiah',
  avatar: '🐱',
  friendCode: 'FATIAH-402',
  themeColor: 'amber',
  parentEmail: 'orangtua.fatiah@email.id',
  currentRole: 'child',
};

// Storage Keys
const STORAGE_STORIES_KEY = 'littlestories_stories_v1';
const STORAGE_FRIENDS_KEY = 'littlestories_friends_v1';
const STORAGE_FRIEND_STORIES_KEY = 'littlestories_friend_stories_v1';
const STORAGE_APPROVALS_KEY = 'littlestories_approvals_v1';
const STORAGE_PROFILE_KEY = 'littlestories_profile_v1';

function getStored<T>(key: string, defaultValue: T): T {
  try {
    const val = localStorage.getItem(key);
    if (!val) return defaultValue;
    return JSON.parse(val);
  } catch {
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

export const mockApi = {
  // STORIES
  async getStories(filter?: string, search?: string): Promise<Story[]> {
    const stories = getStored<Story[]>(STORAGE_STORIES_KEY, INITIAL_STORIES);
    let result = [...stories];

    if (filter === 'pribadi') {
      result = result.filter((s) => s.privacy === 'private');
    } else if (filter === 'dibagikan') {
      result = result.filter((s) => s.privacy === 'friends');
    } else if (filter === 'draft') {
      result = result.filter((s) => s.status === 'draft');
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.content.toLowerCase().includes(q)
      );
    }

    // Sort descending by date
    result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return result;
  },

  async getStoryById(id: string): Promise<Story | null> {
    const stories = getStored<Story[]>(STORAGE_STORIES_KEY, INITIAL_STORIES);
    return stories.find((s) => s.id === id) || null;
  },

  async createStory(storyData: Partial<Story>): Promise<Story> {
    const stories = getStored<Story[]>(STORAGE_STORIES_KEY, INITIAL_STORIES);
    const nowIso = new Date().toISOString();
    const newStory: Story = {
      id: `story-${Date.now()}`,
      title: storyData.title || 'Cerita Tanpa Judul',
      content: storyData.content || '',
      date: storyData.date || nowIso.split('T')[0],
      mood: storyData.mood || null,
      coverImage: storyData.coverImage || COVER_PRESETS[0].url,
      additionalPhotos: storyData.additionalPhotos || [],
      privacy: storyData.privacy || 'private',
      status: storyData.status || 'published',
      approvalStatus:
        storyData.privacy === 'friends' ? 'pending' : 'none',
      sharedWithFriendIds: storyData.sharedWithFriendIds || [],
      isFavorite: false,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    const updated = [newStory, ...stories];
    setStored(STORAGE_STORIES_KEY, updated);

    // If marked as shared with friends, create an approval request for parents
    if (newStory.privacy === 'friends') {
      const approvals = getStored<ShareApprovalRequest[]>(
        STORAGE_APPROVALS_KEY,
        INITIAL_APPROVALS_REQUESTS
      );
      const friends = getStored<Friend[]>(STORAGE_FRIENDS_KEY, INITIAL_FRIENDS);
      const friendNames = friends
        .filter((f) => newStory.sharedWithFriendIds.includes(f.id))
        .map((f) => f.nickname);

      const newAppr: ShareApprovalRequest = {
        id: `appr-${Date.now()}`,
        storyId: newStory.id,
        storyTitle: newStory.title,
        childNickname: 'Fatiah',
        requestedFriends: friendNames.length ? friendNames : ['Semua Teman Pilihan'],
        requestedDate: newStory.date,
        status: 'pending',
        storySnippet: newStory.content.slice(0, 100) + '...',
      };
      setStored(STORAGE_APPROVALS_KEY, [newAppr, ...approvals]);
    }

    return newStory;
  },

  async updateStory(id: string, updates: Partial<Story>): Promise<Story> {
    const stories = getStored<Story[]>(STORAGE_STORIES_KEY, INITIAL_STORIES);
    const index = stories.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Cerita tidak ditemukan');

    const prev = stories[index];
    const isNewShare =
      prev.privacy !== 'friends' && updates.privacy === 'friends';

    const updatedStory: Story = {
      ...prev,
      ...updates,
      approvalStatus: isNewShare ? 'pending' : (updates.approvalStatus ?? prev.approvalStatus),
      updatedAt: new Date().toISOString(),
    };

    stories[index] = updatedStory;
    setStored(STORAGE_STORIES_KEY, stories);

    if (isNewShare) {
      const approvals = getStored<ShareApprovalRequest[]>(
        STORAGE_APPROVALS_KEY,
        INITIAL_APPROVALS_REQUESTS
      );
      const friends = getStored<Friend[]>(STORAGE_FRIENDS_KEY, INITIAL_FRIENDS);
      const friendNames = friends
        .filter((f) => updatedStory.sharedWithFriendIds.includes(f.id))
        .map((f) => f.nickname);

      const newAppr: ShareApprovalRequest = {
        id: `appr-${Date.now()}`,
        storyId: updatedStory.id,
        storyTitle: updatedStory.title,
        childNickname: 'Fatiah',
        requestedFriends: friendNames.length ? friendNames : ['Teman Pilihan'],
        requestedDate: updatedStory.date,
        status: 'pending',
        storySnippet: updatedStory.content.slice(0, 100) + '...',
      };
      setStored(STORAGE_APPROVALS_KEY, [newAppr, ...approvals]);
    }

    return updatedStory;
  },

  async deleteStory(id: string): Promise<boolean> {
    const stories = getStored<Story[]>(STORAGE_STORIES_KEY, INITIAL_STORIES);
    const filtered = stories.filter((s) => s.id !== id);
    setStored(STORAGE_STORIES_KEY, filtered);

    // Also clean up pending approvals
    const approvals = getStored<ShareApprovalRequest[]>(
      STORAGE_APPROVALS_KEY,
      INITIAL_APPROVALS_REQUESTS
    );
    setStored(
      STORAGE_APPROVALS_KEY,
      approvals.filter((a) => a.storyId !== id)
    );
    return true;
  },

  async toggleFavorite(id: string): Promise<boolean> {
    const stories = getStored<Story[]>(STORAGE_STORIES_KEY, INITIAL_STORIES);
    const s = stories.find((item) => item.id === id);
    if (!s) return false;
    s.isFavorite = !s.isFavorite;
    setStored(STORAGE_STORIES_KEY, stories);
    return s.isFavorite;
  },

  // FRIENDS
  async getFriends(): Promise<Friend[]> {
    return getStored<Friend[]>(STORAGE_FRIENDS_KEY, INITIAL_FRIENDS);
  },

  async addFriendByCode(
    code: string
  ): Promise<{ success: boolean; message: string; friend?: Friend }> {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: 'Harap masukkan kode rahasia teman.' };
    }

    const friends = getStored<Friend[]>(STORAGE_FRIENDS_KEY, INITIAL_FRIENDS);
    if (friends.some((f) => f.friendCode === cleanCode)) {
      return { success: false, message: 'Teman ini sudah ada dalam daftarmu!' };
    }

    // Generate a new friend based on code
    const newFriend: Friend = {
      id: `f-${Date.now()}`,
      nickname: `Teman ${cleanCode.slice(0, 4)}`,
      avatar: ['🐱', '🐰', '🐼', '🦊', '⭐'][Math.floor(Math.random() * 5)],
      friendCode: cleanCode,
      status: 'approved',
      sinceDate: new Date().toISOString().split('T')[0],
      bio: 'Teman baik baru di Little Stories.',
    };

    const updated = [newFriend, ...friends];
    setStored(STORAGE_FRIENDS_KEY, updated);
    return {
      success: true,
      message: `Berhasil menambahkan ${newFriend.nickname}!`,
      friend: newFriend,
    };
  },

  async removeFriend(friendId: string): Promise<boolean> {
    const friends = getStored<Friend[]>(STORAGE_FRIENDS_KEY, INITIAL_FRIENDS);
    const updated = friends.filter((f) => f.id !== friendId);
    setStored(STORAGE_FRIENDS_KEY, updated);
    return true;
  },

  // FRIEND STORIES
  async getFriendStories(): Promise<FriendStory[]> {
    return getStored<FriendStory[]>(
      STORAGE_FRIEND_STORIES_KEY,
      INITIAL_FRIEND_STORIES
    );
  },

  async reactToFriendStory(
    storyId: string,
    reactionType: 'love' | 'star' | 'rainbow' | 'flower'
  ): Promise<{ success: boolean; reactions: Record<string, number> }> {
    const list = getStored<FriendStory[]>(
      STORAGE_FRIEND_STORIES_KEY,
      INITIAL_FRIEND_STORIES
    );
    const item = list.find((s) => s.id === storyId);
    if (!item) throw new Error('Cerita teman tidak ditemukan');

    const prevReaction = item.myReaction;
    if (prevReaction === reactionType) {
      // Toggle off
      item.reactions[reactionType] = Math.max(
        0,
        item.reactions[reactionType] - 1
      );
      item.myReaction = null;
    } else {
      if (prevReaction && item.reactions[prevReaction as keyof typeof item.reactions]) {
        item.reactions[prevReaction as keyof typeof item.reactions] -= 1;
      }
      item.reactions[reactionType] = (item.reactions[reactionType] || 0) + 1;
      item.myReaction = reactionType;
    }

    setStored(STORAGE_FRIEND_STORIES_KEY, list);
    return { success: true, reactions: item.reactions };
  },

  // PARENT APPROVALS
  async getParentApprovals(): Promise<ShareApprovalRequest[]> {
    return getStored<ShareApprovalRequest[]>(
      STORAGE_APPROVALS_KEY,
      INITIAL_APPROVALS_REQUESTS
    );
  },

  async respondToApproval(
    requestId: string,
    approved: boolean
  ): Promise<boolean> {
    const approvals = getStored<ShareApprovalRequest[]>(
      STORAGE_APPROVALS_KEY,
      INITIAL_APPROVALS_REQUESTS
    );
    const appr = approvals.find((a) => a.id === requestId);
    if (!appr) return false;

    appr.status = approved ? 'approved' : 'rejected';
    setStored(STORAGE_APPROVALS_KEY, approvals);

    // Update story's approval status
    const stories = getStored<Story[]>(STORAGE_STORIES_KEY, INITIAL_STORIES);
    const story = stories.find((s) => s.id === appr.storyId);
    if (story) {
      story.approvalStatus = approved ? 'approved' : 'rejected';
      if (!approved) {
        // If rejected, fallback to private for safety
        story.privacy = 'private';
      }
      setStored(STORAGE_STORIES_KEY, stories);
    }
    return true;
  },

  async revokeStorySharing(storyId: string): Promise<boolean> {
    const stories = getStored<Story[]>(STORAGE_STORIES_KEY, INITIAL_STORIES);
    const story = stories.find((s) => s.id === storyId);
    if (!story) return false;

    story.privacy = 'private';
    story.approvalStatus = 'none';
    story.sharedWithFriendIds = [];
    setStored(STORAGE_STORIES_KEY, stories);

    // Also update approvals list
    const approvals = getStored<ShareApprovalRequest[]>(
      STORAGE_APPROVALS_KEY,
      INITIAL_APPROVALS_REQUESTS
    );
    const appr = approvals.find((a) => a.storyId === storyId);
    if (appr) {
      appr.status = 'rejected';
      setStored(STORAGE_APPROVALS_KEY, approvals);
    }
    return true;
  },

  // PROFILE
  getUserProfile(): UserProfile {
    return getStored<UserProfile>(STORAGE_PROFILE_KEY, INITIAL_PROFILE);
  },

  async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const curr = getStored<UserProfile>(STORAGE_PROFILE_KEY, INITIAL_PROFILE);
    const updated = { ...curr, ...profile };
    setStored(STORAGE_PROFILE_KEY, updated);
    return updated;
  },

  // Reset to initial demo data
  resetDemoData(): void {
    setStored(STORAGE_STORIES_KEY, INITIAL_STORIES);
    setStored(STORAGE_FRIENDS_KEY, INITIAL_FRIENDS);
    setStored(STORAGE_FRIEND_STORIES_KEY, INITIAL_FRIEND_STORIES);
    setStored(STORAGE_APPROVALS_KEY, INITIAL_APPROVALS_REQUESTS);
    setStored(STORAGE_PROFILE_KEY, INITIAL_PROFILE);
  },
};
