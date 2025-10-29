
export enum Platform {
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter',
  Instagram = 'Instagram',
}

export enum Tone {
  Professional = 'Professional',
  Witty = 'Witty',
  Urgent = 'Urgent',
  Inspirational = 'Inspirational',
  Casual = 'Casual'
}

export interface GeneratedPost {
  post: string;
  imagePrompt: string;
}

export interface GeneratedContent extends GeneratedPost {
  imageUrl: string;
}

export type AspectRatio = '16:9' | '9:16';
