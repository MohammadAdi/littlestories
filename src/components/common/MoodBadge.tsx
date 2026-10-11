import React from 'react';
import { MoodType } from '../../types';
import { MOODS } from '../../services/mockApi';

interface MoodBadgeProps {
  mood: MoodType | null;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const MoodBadge: React.FC<MoodBadgeProps> = ({
  mood,
  size = 'md',
  showLabel = true,
}) => {
  if (!mood) return null;
  const moodData = MOODS.find((m) => m.id === mood);
  if (!moodData) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-medium',
  };

  const emojiSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${moodData.bgClass} ${moodData.textClass} ${moodData.borderClass} ${sizeClasses[size]}`}
    >
      <span className={emojiSizes[size]}>{moodData.emoji}</span>
      {showLabel && <span>{moodData.label}</span>}
    </span>
  );
};
