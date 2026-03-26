import { Render } from "@puckeditor/core";
import { config } from "@/puck.config";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

// Dynamic rendering for published pages
export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await prisma.page.findUnique({
    where: { slug },
  });

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Render config={config} data={page.data as any} />
    </div>
  );
}
