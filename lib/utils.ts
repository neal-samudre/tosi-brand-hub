import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: string | undefined): string {
  if (!bytes) return 'Unknown size';
  const size = parseInt(bytes);
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function getFileTypeLabel(mimeType: string): string {
  const map: Record<string, string> = {
    'image/png': 'PNG',
    'image/jpeg': 'JPG',
    'image/svg+xml': 'SVG',
    'image/gif': 'GIF',
    'image/webp': 'WEBP',
    'application/pdf': 'PDF',
    'application/postscript': 'EPS',
    'application/illustrator': 'AI',
    'application/zip': 'ZIP',
    'video/mp4': 'MP4',
    'audio/mpeg': 'MP3',
    'application/vnd.google-apps.document': 'Google Doc',
    'application/vnd.google-apps.spreadsheet': 'Google Sheet',
  };
  return map[mimeType] ?? mimeType.split('/')[1]?.toUpperCase() ?? 'FILE';
}

export function canPreviewInBrowser(mimeType: string): boolean {
  const previewable = [
    'image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml',
    'application/pdf',
    'video/mp4', 'video/webm',
    'audio/mpeg', 'audio/wav',
    'application/vnd.google-apps.document',
    'application/vnd.google-apps.presentation',
  ];
  return previewable.includes(mimeType);
}

export function getLargeThumbnail(thumbnailLink: string): string {
  return thumbnailLink.replace(/=s\d+$/, '=s400');
}
