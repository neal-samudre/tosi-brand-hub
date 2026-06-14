'use client';
import { Asset } from '@/types';
import { AssetCard } from './AssetCard';

interface AssetGridProps {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
  loading?: boolean;
}

export function AssetGrid({ assets, onAssetClick, loading }: AssetGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                      xl:grid-cols-5 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden animate-pulse"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div className="h-40"
                 style={{background: 'var(--surface-2)'}} />
            <div className="px-3 py-2.5"
                 style={{borderTop: '1px solid var(--border-subtle)'}}>
              <div className="h-3.5 rounded mb-2"
                   style={{background: 'var(--surface-2)'}} />
              <div className="h-3 rounded w-2/3"
                   style={{background: 'var(--surface-2)'}} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24
                   rounded-xl"
        style={{
          background: 'var(--surface-0)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center
                     justify-center mb-3"
          style={{background: 'var(--surface-2)'}}
        >
          <span style={{color: 'var(--text-tertiary)', fontSize: '20px'}}>
            ∅
          </span>
        </div>
        <p className="font-body font-medium text-sm mb-1"
           style={{color: 'var(--text-primary)'}}>
          No assets found
        </p>
        <p className="font-body text-xs"
           style={{color: 'var(--text-tertiary)'}}>
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                    xl:grid-cols-5 gap-3">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          onClick={() => onAssetClick(asset)}
        />
      ))}
    </div>
  );
}
