import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('id');
    const size = searchParams.get('sz') ?? 'w400';

    if (!fileId) {
      return new NextResponse('Missing file ID', { status: 400 });
    }

    // Use the Drive API directly instead of the thumbnail URL
    // This uses the files.get endpoint with alt=media for actual files
    // For thumbnails, use the Drive API with fields=thumbnailLink
    const metaUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=thumbnailLink,webContentLink&supportsAllDrives=true`;

    const metaResponse = await fetch(metaUrl, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!metaResponse.ok) {
      console.error('Meta fetch failed:', metaResponse.status);
      return new NextResponse('File not found', {
        status: metaResponse.status,
      });
    }

    const meta = await metaResponse.json();
    console.log('File meta:', JSON.stringify(meta));

    if (!meta.thumbnailLink) {
      return new NextResponse('No thumbnail available', { status: 404 });
    }

    // Fetch the actual thumbnail using the authenticated link
    const thumbResponse = await fetch(
      meta.thumbnailLink.replace(/=s\d+$/, `=s400`),
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        redirect: 'follow',
      }
    );

    if (!thumbResponse.ok) {
      console.error('Thumb fetch failed:', thumbResponse.status);
      return new NextResponse('Thumbnail fetch failed', {
        status: thumbResponse.status,
      });
    }

    const contentType = thumbResponse.headers.get('content-type')
      ?? 'image/jpeg';
    const buffer = await thumbResponse.arrayBuffer();

    console.log('Thumbnail size:', buffer.byteLength,
      'contentType:', contentType);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=3600',
      },
    });

  } catch (error: any) {
    console.error('Thumbnail proxy error:', error.message);
    return new NextResponse('Failed to fetch thumbnail', {
      status: 500,
    });
  }
}
