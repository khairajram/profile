import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const skills = await prisma.skill.findMany({
    include: {
      _count: { select: { projects: true } }
    },
    orderBy: {
      projects: { _count: "desc" }
    },
    take: 10
  });

  return NextResponse.json(skills);
}
