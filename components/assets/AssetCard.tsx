'use client';
import { useState } from 'react';
import { Asset } from '@/types';
import { formatFileSize, getFileTypeLabel } from '@/lib/utils';

const FILE_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  PDF: { bg: 'rgba(239,68,68,0.08)', text: '#DC2626' },
  AI: { bg: 'rgba(249,115,22,0.08)', text: '#EA580C' },
  EPS: { bg: 'rgba(249,115,22,0.08)', text: '#EA580C' },
  SVG: { bg: 'rgba(139,92,246,0.08)', text: '#7C3AED' },
  PNG: { bg: 'rgba(59,130,246,0.08)', text: '#2563EB' },
  JPG: { bg: 'rgba(59,130,246,0.08)', text: '#2563EB' },
  JPEG: { bg: 'rgba(59,130,246,0.08)', text: '#2563EB' },
  ZIP: { bg: 'rgba(107,114,128,0.08)', text: '#4B5563' },
  MP4: { bg: 'rgba(16,185,129,0.08)', text: '#059669' },
  MP3: { bg: 'rgba(16,185,129,0.08)', text: '#059669' },
  'Google Doc': { bg: 'rgba(27,40,58,0.06)', text: '#1B283A' },
  'Google Sheet': { bg: 'rgba(16,185,129,0.08)', text: '#059669' },
};

interface AssetCardProps {
  asset: Asset;
  onClick: () => void;
}

export function AssetCard({ asset, onClick }: AssetCardProps) {
  const [imgError, setImgError] = useState(false);
  const fileType = getFileTypeLabel(asset.mimeType);
  const typeStyle = FILE_TYPE_COLORS[fileType] ??
    { bg: 'rgba(0,0,0,0.04)', text: '#4B5563' };
  const thumbnailUrl = asset.id
    ? `/api/drive/thumbnail?id=${asset.id}&sz=w400`
    : null;
  const showThumbnail = thumbnailUrl && !imgError;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl overflow-hidden"
      style={{
        background: 'var(--surface-0)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 220ms ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          'var(--shadow-md)';
        (e.currentTarget as HTMLElement).style.transform =
          'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.borderColor =
          'rgba(0,0,0,0.12)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          'var(--shadow-sm)';
        (e.currentTarget as HTMLElement).style.transform =
          'translateY(0)';
        (e.currentTarget as HTMLElement).style.borderColor =
          'rgba(0,0,0,0.06)';
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative h-40 overflow-hidden flex items-center
                   justify-center"
        style={{background: 'var(--surface-1)'}}
      >
        {showThumbnail ? (
          <img
            src={thumbnailUrl}
            alt={asset.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            className="font-display text-sm font-bold px-3 py-1.5
                       rounded-md"
            style={{background: typeStyle.bg, color: typeStyle.text}}
          >
            {fileType}
          </span>
        )}
      </div>

      {/* Info */}
      <div
        className="px-3 py-2.5"
        style={{borderTop: '1px solid var(--border-subtle)'}}
      >
        <p
          className="font-body text-sm font-medium truncate mb-1.5"
          style={{color: 'var(--text-primary)'}}
          title={asset.name}
        >
          {asset.name}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="font-body text-xs font-semibold px-1.5
                       py-0.5 rounded"
            style={{background: typeStyle.bg, color: typeStyle.text}}
          >
            {fileType}
          </span>
          <span
            className="font-body text-xs"
            style={{color: 'var(--text-tertiary)'}}
          >
            {formatFileSize(asset.size)}
          </span>
        </div>
      </div>
    </div>
  );
}
