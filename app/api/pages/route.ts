import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { slug, data } = await req.json();

    if (!slug || !data) {
      return NextResponse.json({ error: 'Missing slug or data' }, { status: 400 });
    }

    // Use upsert to create or update the page based on the slug
    const page = await prisma.page.upsert({
      where: { slug },
      update: { data },
      create: { slug, data },
    });

    return NextResponse.json({ success: true, page });
  } catch (error: any) {
    console.error('Error saving page:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  try {
    const page = await prisma.page.findUnique({
      where: { slug },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
