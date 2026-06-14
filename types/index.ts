import type { DefaultSession } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
    user: {
      email: string;
      name: string;
      image: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    picture?: string;
  }
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  size?: string;
  modifiedTime?: string;
  parents?: string[];
}

export interface DriveFolder {
  id: string;
  name: string;
  children?: DriveFolder[];
  files?: DriveFile[];
}

export interface AssetMetadata {
  driveFileId: string;
  tags: string[];
  sku?: string;
  approvalStatus: 'approved' | 'pending' | 'archived';
  isCurrent: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Asset extends DriveFile {
  metadata?: AssetMetadata;
  category?: string;
  section?: 'brand' | 'product';
}

export type FileSection = 'brand' | 'product';
export type ViewMode = 'grid' | 'list';

export interface FolderTreeResponse {
  id: string;
  name: string;
  children: Array<{
    id: string;
    name: string;
    files: DriveFile[];
  }>;
  files: DriveFile[];
}
