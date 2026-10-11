import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Image as ImageIcon,
  Plus,
  X,
  Lock,
  Users,
  Check,
  ChevronDown,
  ChevronUp,
  Bold,
  Italic,
  List,
  Save,
  ArrowLeft,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { Story, MoodType, StoryPrivacy, Friend } from '../../types';
import { MOODS, COVER_PRESETS } from '../../services/mockApi';
import { MoodBadge } from '../common/MoodBadge';

interface StoryEditorProps {
  initialStory?: Story | null;
  initialMood?: MoodType;
  friends: Friend[];
  onSave: (storyData: Partial<Story>) => Promise<void>;
  onCancel: () => void;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({
  initialStory,
  initialMood,
  friends,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialStory?.title || '');
  const [content, setContent] = useState(initialStory?.content || '');
  const [date, setDate] = useState(
    initialStory?.date || new Date().toISOString().split('T')[0]
  );
  const [mood, setMood] = useState<MoodType | null>(
    initialStory?.mood || initialMood || null
  );
  const [coverImage, setCoverImage] = useState(
    initialStory?.coverImage || COVER_PRESETS[0].url
  );
  const [additionalPhotos, setAdditionalPhotos] = useState<string[]>(
    initialStory?.additionalPhotos || []
  );
  const [privacy, setPrivacy] = useState<StoryPrivacy>(
    initialStory?.privacy || 'private'
  );
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>(
    initialStory?.sharedWithFriendIds || []
  );

  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>('Siap');
  const [showInspiration, setShowInspiration] = useState(false);
  const [showCoverPicker, setShowCoverPicker] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const writingPrompts = [
    'Apa hal paling menyenangkan hari ini? 🌟',
    'Adakah sesuatu yang membuatmu sedih atau kecewa? 🌧️',
    'Apa yang ingin kamu ingat dari hari ini sepuluh tahun lagi? 🎈',
    'Siapa yang membuatmu tersenyum hari ini? 😊',
    'Kalau hari ini punya judul buku cerita, apa judulnya? 📚',
    'Apa makanan terenak yang kamu nikmati hari ini? 🍪',
  ];

  // Auto-save feedback simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title.trim() || content.trim()) {
        setAutoSaveStatus('Draf otomatis tersimpan');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [title, content, mood, privacy]);

  const handleApplyPrompt = (promptText: string) => {
    if (!content.trim()) {
      setContent(promptText + '\n\n');
    } else {
      setContent((prev) => prev + '\n\n' + promptText + '\n');
    }
    setAutoSaveStatus('Inspirasi ditambahkan');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleFormatText = (type: 'bold' | 'italic' | 'list') => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selectedText = content.substring(start, end) || 'teks';

    let formatted = '';
    if (type === 'bold') {
      formatted = `**${selectedText}**`;
    } else if (type === 'italic') {
      formatted = `*${selectedText}*`;
    } else if (type === 'list') {
      formatted = `\n• ${selectedText}`;
    }

    const newContent =
      content.substring(0, start) + formatted + content.substring(end);
    setContent(newContent);
  };

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAdditionalPhotos((prev) => [...prev, reader.result as string]);
        setAutoSaveStatus('Foto baru ditambahkan');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (index: number) => {
    setAdditionalPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleFriend = (friendId: string) => {
    setSelectedFriendIds((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleSubmit = async (asDraft: boolean = false) => {
    if (!title.trim()) {
      alert('Beri judul singkat untuk ceritamu ya!');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        date,
        mood,
        coverImage,
        additionalPhotos,
        privacy,
        status: asDraft ? 'draft' : 'published',
        sharedWithFriendIds: privacy === 'friends' ? selectedFriendIds : [],
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 py-2 px-3 rounded-xl hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400 hidden sm:inline">
            {autoSaveStatus}
          </span>

          <button
            onClick={() => handleSubmit(true)}
            disabled={isSaving}
            className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200/80 rounded-xl hover:bg-stone-50 active:scale-95 transition-all"
          >
            Simpan Draf
          </button>

          <button
            onClick={() => handleSubmit(false)}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xs active:scale-95 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Menyimpan...' : 'Simpan Cerita'}</span>
          </button>
        </div>
      </div>

      {/* Main Journal Page Container */}
      <div className="scrapbook-card bg-white p-6 sm:p-8 space-y-6 relative border border-amber-200/50">
        {/* Playful washi tape on top corner */}
        <div className="absolute -top-3 left-10 w-24 h-6 washi-tape-pink -rotate-1 rounded-xs" />

        {/* Date and Mood Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Date Picker */}
          <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200/60">
            <Calendar className="w-4 h-4 text-amber-600" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent border-none text-xs font-medium text-stone-800 focus:outline-hidden"
            />
          </div>

          {/* Mood Selector Button & Pill */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Suasana:</span>
            {mood ? (
              <div className="flex items-center gap-1.5">
                <MoodBadge mood={mood} size="sm" />
                <button
                  onClick={() => setMood(null)}
                  className="text-stone-400 hover:text-stone-600 text-xs p-1"
                  title="Hapus suasana"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <span className="text-xs text-stone-400 italic">Belum dipilih</span>
            )}
          </div>
        </div>

        {/* Quick Mood Selector Row */}
        <div className="p-3 bg-stone-50/70 rounded-2xl border border-stone-200/40">
          <p className="text-[11px] font-medium text-stone-500 mb-2">
            Pilih suasana hati untuk cerita ini (opsional):
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {MOODS.map((m) => {
              const isSelected = mood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMood(isSelected ? null : m.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? `${m.bgClass} ${m.textClass} ring-2 ring-amber-400 font-semibold shadow-2xs`
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/60'
                  }`}
                >
                  <span>{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Story Title Input */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Beri judul ceritamu di sini..."
            className="w-full text-xl sm:text-2xl font-bold font-heading text-stone-900 placeholder:text-stone-300 border-b border-stone-200 pb-2 focus:border-amber-500 focus:outline-hidden transition-colors"
          />
        </div>

        {/* Writing Inspiration Accordion */}
        <div className="border border-amber-200/70 rounded-2xl bg-amber-50/40 overflow-hidden">
          <button
            onClick={() => setShowInspiration(!showInspiration)}
            className="w-full flex items-center justify-between p-3.5 text-left text-xs font-semibold text-amber-900 hover:bg-amber-100/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Butuh ide menulis? Buka Inspirasi Menulis</span>
            </div>
            {showInspiration ? (
              <ChevronUp className="w-4 h-4 text-amber-700" />
            ) : (
              <ChevronDown className="w-4 h-4 text-amber-700" />
            )}
          </button>

          {showInspiration && (
            <div className="p-4 pt-0 space-y-2 border-t border-amber-200/40">
              <p className="text-[11px] text-stone-600">
                Pilih salah satu pertanyaan di bawah untuk membantumu memulai cerita:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {writingPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyPrompt(prompt)}
                    className="p-2.5 bg-white text-stone-700 text-xs text-left rounded-xl border border-amber-200/60 hover:bg-amber-50 transition-colors shadow-2xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Text Formatting Toolbar */}
        <div className="flex items-center gap-1 border-y border-stone-100 py-1.5">
          <button
            type="button"
            onClick={() => handleFormatText('bold')}
            className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            title="Tebal (Bold)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormatText('italic')}
            className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            title="Miring (Italic)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormatText('list')}
            className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            title="Daftar Poin"
          >
            <List className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-stone-200 mx-1" />
          <button
            type="button"
            onClick={() => setShowCoverPicker(!showCoverPicker)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg"
          >
            <ImageIcon className="w-4 h-4 text-amber-600" />
            <span>Pilih Sampul</span>
          </button>
        </div>

        {/* Story Body Text Area */}
        <div>
          <textarea
            ref={textareaRef}
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tuliskan ceritamu dengan bebas di sini... Ceritakan apa yang terjadi, apa yang kamu rasakan, atau siapa yang ada di sana."
            className="w-full text-base text-stone-800 placeholder:text-stone-300 resize-y border-none focus:outline-hidden leading-relaxed"
          />
        </div>

        {/* Cover Image Selector Section */}
        {showCoverPicker && (
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 font-heading">
                Pilih Ilustrasi Sampul Buku Harian
              </span>
              <button
                onClick={() => setShowCoverPicker(false)}
                className="text-stone-400 hover:text-stone-600 text-xs"
              >
                Tutup
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COVER_PRESETS.map((preset) => {
                const isSelected = coverImage === preset.url;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setCoverImage(preset.url)}
                    className={`relative rounded-xl overflow-hidden aspect-4/3 border-2 transition-all group ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-300 scale-102'
                        : 'border-transparent hover:border-stone-300'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-stone-900/30 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-white font-medium leading-tight">
                        {preset.title}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs shadow-xs">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Additional Photos Attachment */}
        <div className="space-y-3 pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-stone-700 font-heading">
                Lampiran Foto Kenangan
              </h4>
              <p className="text-[11px] text-stone-400">
                Kamu bisa menambahkan foto tambahan dari komputermu
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200/60"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Tambah Foto</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleCustomPhotoUpload}
              className="hidden"
            />
          </div>

          {additionalPhotos.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {additionalPhotos.map((photoUrl, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 rounded-xl overflow-hidden border border-stone-200 group"
                >
                  <img
                    src={photoUrl}
                    alt={`Lampiran ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                    title="Hapus foto"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Privacy Settings & Safety Policy */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-stone-800 font-heading">
              Pengaturan Privasi Cerita
            </h4>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Tentukan siapa yang boleh membaca catatan ini. Semua cerita secara default adalah rahasiamu!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Option A: Private */}
            <button
              type="button"
              onClick={() => setPrivacy('private')}
              className={`flex items-start gap-3 p-3.5 rounded-xl text-left border transition-all ${
                privacy === 'private'
                  ? 'bg-white border-amber-500 ring-2 ring-amber-300 shadow-2xs'
                  : 'bg-white/60 border-stone-200 hover:bg-white'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">
                  Hanya Untukku (Pribadi)
                </p>
                <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                  Tersimpan di buku harian pribadimu, aman dan tidak terlihat oleh siapa pun.
                </p>
              </div>
            </button>

            {/* Option B: Selected Friends */}
            <button
              type="button"
              onClick={() => setPrivacy('friends')}
              className={`flex items-start gap-3 p-3.5 rounded-xl text-left border transition-all ${
                privacy === 'friends'
                  ? 'bg-white border-amber-500 ring-2 ring-amber-300 shadow-2xs'
                  : 'bg-white/60 border-stone-200 hover:bg-white'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">
                  Teman Pilihan
                </p>
                <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                  Bagikan cerita ini ke teman terpilih setelah diverifikasi orang tua.
                </p>
              </div>
            </button>
          </div>

          {/* If Friends selected, choose which friends */}
          {privacy === 'friends' && (
            <div className="pt-3 border-t border-amber-200/50 space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-100/60 p-2.5 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                <span>
                  Demi keamananmu, cerita yang dibagikan akan ditinjau oleh Orang Tua sebelum temanmu bisa melihatnya.
                </span>
              </div>

              <p className="text-[11px] font-semibold text-stone-700">
                Pilih teman yang ingin kamu ajak membaca:
              </p>

              {friends.length === 0 ? (
                <p className="text-xs text-stone-400 italic">
                  Belum ada teman terhubung. Tambahkan teman di tab "Teman".
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {friends.map((friend) => {
                    const isSelected = selectedFriendIds.includes(friend.id);
                    return (
                      <button
                        key={friend.id}
                        type="button"
                        onClick={() => handleToggleFriend(friend.id)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <span>{friend.avatar}</span>
                        <span>{friend.nickname}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
