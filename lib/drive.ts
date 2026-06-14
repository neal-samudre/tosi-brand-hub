import { google } from 'googleapis';
import { DriveFile, DriveFolder } from '@/types';

const BRAND_FOLDER_ID = process.env.DRIVE_BRAND_FOLDER_ID!;
const PRODUCT_FOLDER_ID = process.env.DRIVE_PRODUCT_FOLDER_ID!;

export function getDriveClient(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return google.drive({ version: 'v3', auth });
}

export async function getSubfolders(
  accessToken: string,
  parentFolderId: string
): Promise<DriveFolder[]> {
  const drive = getDriveClient(accessToken);
  const response = await drive.files.list({
    q: `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name, mimeType)',
    orderBy: 'name',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    corpora: 'allDrives',
  });
  return (response.data.files ?? []).map((f) => ({
    id: f.id!,
    name: f.name!,
  }));
}

export async function getFilesInFolder(
  accessToken: string,
  folderId: string
): Promise<DriveFile[]> {
  const drive = getDriveClient(accessToken);
  const response = await drive.files.list({
    q: `'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name, mimeType, thumbnailLink, webViewLink, webContentLink, size, modifiedTime, parents)',
    orderBy: 'name',
    pageSize: 100,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    corpora: 'allDrives',
  });
  return (response.data.files ?? []).map((f) => ({
    id: f.id!,
    name: f.name!,
    mimeType: f.mimeType!,
    thumbnailLink: f.thumbnailLink ?? undefined,
    webViewLink: f.webViewLink ?? undefined,
    webContentLink: f.webContentLink ?? undefined,
    size: f.size ?? undefined,
    modifiedTime: f.modifiedTime ?? undefined,
    parents: f.parents ?? undefined,
  }));
}

export async function getAllFilesRecursive(
  accessToken: string,
  folderId: string,
  topLevelFolderId?: string
): Promise<DriveFile[]> {
  const drive = getDriveClient(accessToken);

  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id, name, mimeType, thumbnailLink, webViewLink, webContentLink, size, modifiedTime, parents)',
    pageSize: 1000,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    corpora: 'allDrives',
  });

  const items = response.data.files ?? [];

  const folders = items.filter(
    (f) => f.mimeType === 'application/vnd.google-apps.folder'
  );
  const files = items.filter(
    (f) => f.mimeType !== 'application/vnd.google-apps.folder'
  ).map((f) => ({
    id: f.id!,
    name: f.name!,
    mimeType: f.mimeType!,
    thumbnailLink: f.thumbnailLink ?? undefined,
    webViewLink: f.webViewLink ?? undefined,
    webContentLink: f.webContentLink ?? undefined,
    size: f.size ?? undefined,
    modifiedTime: f.modifiedTime ?? undefined,
    parents: [topLevelFolderId ?? folderId],
  }));

  const subFolderFiles = await Promise.all(
    folders.map((folder) =>
      getAllFilesRecursive(
        accessToken,
        folder.id!,
        topLevelFolderId ?? folderId
      )
    )
  );

  return [...files, ...subFolderFiles.flat()];
}

export async function getFolderTree(
  accessToken: string,
  rootFolderId: string
): Promise<DriveFolder> {
  const drive = getDriveClient(accessToken);

  const rootResponse = await drive.files.get({
    fileId: rootFolderId,
    fields: 'id, name',
    supportsAllDrives: true,
  });

  const root: DriveFolder = {
    id: rootFolderId,
    name: rootResponse.data.name!,
    children: [],
    files: [],
  };

  const subfolders = await getSubfolders(accessToken, rootFolderId);

  const foldersWithFiles = await Promise.all(
    subfolders.map(async (folder) => {
      const files = await getAllFilesRecursive(
        accessToken,
        folder.id,
        folder.id  // tag all files with this top-level subfolder ID
      );
      return { ...folder, files, children: [] };
    })
  );

  root.children = foldersWithFiles;
  root.files = await getAllFilesRecursive(accessToken, rootFolderId);

  return root;
}

export function getLargeThumbnail(thumbnailLink: string): string {
  return thumbnailLink.replace(/=s\d+$/, '=s400');
}

export { BRAND_FOLDER_ID, PRODUCT_FOLDER_ID };
