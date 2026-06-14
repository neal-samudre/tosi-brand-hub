import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getFilesInFolder } from '@/lib/drive';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get('folderId');

    if (!folderId) {
      return NextResponse.json(
        { error: 'folderId is required' },
        { status: 400 }
      );
    }

    const files = await getFilesInFolder(session.accessToken, folderId);

    return NextResponse.json(files);
  } catch (error: any) {
    console.error('Drive files error:', error);
    return NextResponse.json(
      { error: error.message ?? 'Failed to fetch files' },
      { status: 500 }
    );
  }
}
