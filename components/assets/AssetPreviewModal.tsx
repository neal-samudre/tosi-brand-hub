'use client';
import { Asset } from '@/types';
import { getFileTypeLabel, canPreviewInBrowser, formatFileSize } from '@/lib/utils';
import { useEffect } from 'react';

interface AssetPreviewModalProps {
  asset: Asset | null;
  onClose: () => void;
}

export function AssetPreviewModal({ asset, onClose }: AssetPreviewModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!asset) return null;

  const fileType = getFileTypeLabel(asset.mimeType);
  const canPreview = canPreviewInBrowser(asset.mimeType);
  const isImage = asset.mimeType.startsWith('image/');
  const isGoogleDoc = asset.mimeType.startsWith('application/vnd.google-apps');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        style={{
          background: 'var(--surface-0)',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-xl)',
          borderRadius: 'var(--radius-xl)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5"
             style={{borderBottom: '1px solid var(--border-subtle)'}}>
          <div className="flex-1 min-w-0 pr-4">
            <p className="font-body font-bold text-navy text-lg truncate">
              {asset.name}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs bg-terracotta/10 text-terracotta
                               font-body font-bold px-2 py-0.5 rounded-full">
                {fileType}
              </span>
              <span className="text-xs text-navy/40 font-body">
                {formatFileSize(asset.size)}
              </span>
              {asset.modifiedTime && (
                <span className="text-xs text-navy/40 font-body">
                  Modified {new Date(asset.modifiedTime).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-navy/40 hover:text-navy transition-colors
                       text-2xl leading-none font-body"
          >
            ×
          </button>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-hidden bg-cream-dark
                        flex items-center justify-center min-h-64">
          {canPreview && isImage && asset.id ? (
            <img
              src={`/api/drive/thumbnail?id=${asset.id}&sz=w800`}
              alt={asset.name}
              className="max-w-full max-h-full object-contain"
            />
          ) : canPreview && isGoogleDoc && asset.webViewLink ? (
            <iframe
              src={asset.webViewLink}
              className="w-full h-full min-h-96"
              title={asset.name}
            />
          ) : canPreview && asset.id ? (
            <iframe
              src={`https://drive.google.com/file/d/${asset.id}/preview`}
              className="w-full h-full min-h-96"
              title={asset.name}
              allow="autoplay"
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <span className="font-display text-6xl text-navy/20 mb-4">
                {fileType}
              </span>
              <p className="font-body text-navy/40 text-center">
                Preview not available for this file type
              </p>
              <p className="font-body text-navy/30 text-sm text-center mt-1">
                Open in Drive to view
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-4"
             style={{borderTop: '1px solid var(--border-subtle)'}}>
          {asset.webViewLink && (
            <a
              href={asset.webViewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body"
              style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                padding: '7px 14px',
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                textDecoration: 'none',
              }}
            >
              Open in Drive
            </a>
          )}
          {asset.webContentLink && (
            <a
              href={asset.webContentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body"
              style={{
                background: 'var(--tosi-terracotta)',
                border: '1px solid transparent',
                borderRadius: 'var(--radius-sm)',
                padding: '7px 14px',
                fontSize: '13px',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                textDecoration: 'none',
              }}
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
