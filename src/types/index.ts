export type MoodType = 'senang' | 'sedih' | 'marah' | 'khawatir' | 'tenang' | 'semangat';

export interface MoodItem {
  id: MoodType;
  label: string;
  emoji: string;
  colorName: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export type StoryPrivacy = 'private' | 'friends';

export type StoryStatus = 'draft' | 'published';

export type ApprovalStatus = 'none' | 'pending' | 'approved' | 'rejected';

export interface Story {
  id: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD
  mood: MoodType | null;
  coverImage: string;
  additionalPhotos: string[];
  privacy: StoryPrivacy;
  status: StoryStatus;
  approvalStatus: ApprovalStatus;
  sharedWithFriendIds: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Friend {
  id: string;
  nickname: string;
  avatar: string;
  friendCode: string;
  status: 'approved' | 'pending';
  sinceDate: string;
  bio?: string;
}

export interface FriendStory {
  id: string;
  authorId: string;
  authorNickname: string;
  authorAvatar: string;
  title: string;
  content: string;
  coverImage: string;
  date: string;
  additionalPhotos?: string[];
  reactions: {
    love: number;
    star: number;
    rainbow: number;
    flower: number;
  };
  myReaction?: string | null;
}

export interface ShareApprovalRequest {
  id: string;
  storyId: string;
  storyTitle: string;
  childNickname: string;
  requestedFriends: string[];
  requestedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  storySnippet: string;
}

export interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;
  friendCode: string;
  themeColor: 'amber' | 'emerald' | 'purple' | 'rose';
  parentEmail: string;
  currentRole: 'child' | 'parent';
}

export type NavigationTab = 
  | 'beranda'
  | 'ceritaku'
  | 'tulis'
  | 'detail'
  | 'kenangan'
  | 'teman'
  | 'profil'
  | 'orangtua';
