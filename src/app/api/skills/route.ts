import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const skillSchema = z.object({
  profileId: z.string(),
  name: z.string().min(1, "Skill name is required"),
  level: z.string().optional()
});


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = skillSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const skill = await prisma.skill.create({
      data: {
        profileId: data.profileId,
        name: data.name,
        level: data.level || null
      }
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create skill", details: error },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get("id");

    if (!profileId) {
      return NextResponse.json(
        { error: "Missing profileId" },
        { status: 400 }
      );
    }

    const skills = await prisma.skill.findMany({
      where: { profileId }
    });

    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const skillId = searchParams.get("id");

    if (!skillId) {
      return NextResponse.json(
        { error: "Missing skillId" },
        { status: 400 }
      );
    }

    const existingSkill = await prisma.skill.findUnique({
      where: { id: skillId }
    });

    if (!existingSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    await prisma.skill.delete({
      where: { id: skillId }
    });

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}




export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = skillSchema.safeParse(body);
    
    const { searchParams } = new URL(req.url);
    console.log(searchParams);
    const id = searchParams.get("id");

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: 'id not send' },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const existing = await prisma.skill.findFirst({
      where : {
        id
      }
    });

    if (!existing) {
      return NextResponse.json({ error: 'skill not found' }, { status: 404 });
    }

    const updated = await prisma.skill.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}



