import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) return NextResponse.json([]);

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { skills: { some: { name: { contains: q, mode: "insensitive" } } } }
      ]
    },
    include: { skills: true }
  });

  return NextResponse.json(projects);
}
