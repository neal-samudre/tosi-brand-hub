import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getFolderTree, BRAND_FOLDER_ID, PRODUCT_FOLDER_ID } from '@/lib/drive';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const folderId = section === 'product'
      ? PRODUCT_FOLDER_ID
      : BRAND_FOLDER_ID;

    const tree = await getFolderTree(session.accessToken, folderId);

    return NextResponse.json(tree, {
      headers: {
        // Cache for 5 minutes in the browser
        'Cache-Control': 'private, max-age=300, stale-while-revalidate=60',
      },
    });

  } catch (error: any) {
    console.error('Drive folders error:', error.message);
    return NextResponse.json(
      { error: error.message ?? 'Failed to fetch folders' },
      { status: 500 }
    );
  }
}
