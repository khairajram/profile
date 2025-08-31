import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const skill = searchParams.get("skill"); 

  if (!skill) {
    const projects = await prisma.project.findMany({
      include: { skills: true }
    });
    return NextResponse.json(projects);
  }

  const projects = await prisma.project.findMany({
    where: {
      skills: {
        some: { name: { equals: skill, mode: "insensitive" } }
      }
    },
    include: { skills: true }
  });

  return NextResponse.json(projects);
}
