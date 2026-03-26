import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/pages — Save page data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, data } = body;

    if (!slug || !title || !data) {
      return NextResponse.json(
        { success: false, error: "slug, title, and data are required" },
        { status: 400 }
      );
    }

    console.log("Saving page with slug:", slug);

    // Manual upsert — avoid transactions for standalone MongoDB
    console.log("Checking if page exists...");
    let page = await prisma.page.findUnique({ where: { slug } });
    
    if (page) {
      console.log("Page exists, updating...");
      page = await prisma.page.update({
        where: { slug },
        data: { title, data, status: "published" },
      });
      console.log("Page updated successfully");
    } else {
      console.log("Page does not exist, creating new...");
      page = await prisma.page.create({
        data: { slug, title, data, status: "published" },
      });
      console.log("Page created successfully");
    }

    return NextResponse.json({ success: true, page });
  } catch (error: any) {
    console.error("Save error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET /api/pages — List all pages
export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      select: { slug: true, title: true, status: true, createdAt: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, pages });
  } catch (error: any) {
    console.error("List error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
