'use client';
import { useState, useMemo } from 'react';
import { useFolderTree } from '@/hooks/useDriveFolder';
import { AssetGrid } from '@/components/assets/AssetGrid';
import { AssetPreviewModal } from '@/components/assets/AssetPreviewModal';
import { Asset, DriveFile } from '@/types';

export default function ProductPage() {
  const { data, loading, error } = useFolderTree('product');
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [search, setSearch] = useState('');

  const displayedAssets = useMemo(() => {
    if (!data) return [];

    let files: DriveFile[] = [];

    if (activeFolder === null) {
      data.children?.forEach((folder) => {
        files = [...files, ...(folder.files ?? [])];
      });
    } else {
      // Match files by their tagged parent (topLevelFolderId)
      data.children?.forEach((folder) => {
        if (folder.id === activeFolder) {
          files = [...files, ...(folder.files ?? [])];
        }
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      files = files.filter((f) => f.name.toLowerCase().includes(q));
    }

    return files.map((f) => ({ ...f, section: 'product' as const }));
  }, [data, activeFolder, search]);

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-navy/40 font-body">
          Failed to load assets. Please refresh.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1
          className="font-display text-2xl font-semibold mb-1"
          style={{color: 'var(--text-primary)', letterSpacing: '-0.02em'}}
        >
          Product Assets
        </h1>
        <p className="font-body text-sm"
           style={{color: 'var(--text-secondary)'}}>
          Renders, packaging flats, nutrition panels, UPC codes, and certifications
        </p>
      </div>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs font-body text-sm"
          style={{
            background: 'var(--surface-0)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '7px 12px',
            color: 'var(--text-primary)',
            outline: 'none',
            boxShadow: 'var(--shadow-sm)',
          }}
        />
      </div>

      {search.trim() && (
        <p className="font-body text-xs mt-2"
           style={{color: 'var(--text-tertiary)'}}>
          {displayedAssets.length} result{displayedAssets.length !== 1 ? 's' : ''}{' '}
          for "{search}"
        </p>
      )}

      {data && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveFolder(null)}
            className="font-body"
            style={activeFolder === null ? {
              background: 'var(--tosi-navy)',
              color: 'white',
              border: '1px solid transparent',
              borderRadius: '6px',
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            } : {
              background: 'var(--surface-0)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            All
          </button>
          {data.children?.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setActiveFolder(folder.id)}
              className="font-body"
              style={activeFolder === folder.id ? {
                background: 'var(--tosi-navy)',
                color: 'white',
                border: '1px solid transparent',
                borderRadius: '6px',
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              } : {
                background: 'var(--surface-0)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              {folder.name.replace(/^\d+_/, '')}
            </button>
          ))}
        </div>
      )}

      <AssetGrid
        assets={displayedAssets}
        onAssetClick={setSelectedAsset}
        loading={loading}
      />

      <AssetPreviewModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />
    </div>
  );
}
