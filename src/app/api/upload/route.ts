import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { uploadToGCS } from '@/lib/gcs';

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await getSession();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    if (files.length > 3) {
      return NextResponse.json(
        { error: 'Cannot upload more than 3 images' },
        { status: 400 }
      );
    }

    // Upload all files to GCS
    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const url = await uploadToGCS(buffer, file.name);
      return url;
    });

    const urls = await Promise.all(uploadPromises);

    return NextResponse.json({ urls }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    );
  }
}
