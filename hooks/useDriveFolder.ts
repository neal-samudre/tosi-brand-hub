'use client';
import { useState, useEffect } from 'react';
import { DriveFolder, DriveFile } from '@/types';

// In-memory cache — persists for the lifetime of the browser session
const folderCache = new Map<string, DriveFolder>();

export function useFolderTree(section: 'brand' | 'product') {
  const [data, setData] = useState<DriveFolder | null>(
    folderCache.get(section) ?? null
  );
  const [loading, setLoading] = useState(!folderCache.has(section));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we already have cached data, don't refetch
    if (folderCache.has(section)) {
      setData(folderCache.get(section)!);
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const res = await window.fetch(
          `/api/drive/folders?section=${section}`
        );
        if (!res.ok) throw new Error('Failed to fetch folder tree');
        const json = await res.json();
        folderCache.set(section, json);
        setData(json);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [section]);

  return { data, loading, error };
}

export function useFiles(folderId: string | null) {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!folderId) return;
    async function fetch() {
      try {
        setLoading(true);
        const res = await window.fetch(
          `/api/drive/files?folderId=${folderId}`
        );
        if (!res.ok) throw new Error('Failed to fetch files');
        const json = await res.json();
        setFiles(json);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [folderId]);

  return { files, loading, error };
}
