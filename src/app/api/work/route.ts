import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const workExperienceSchema = z.object({
  profileId: z.string().min(1),
  company: z.string().min(1),
  role: z.string().min(1),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid startDate format, must be a valid date string",
  }),
  endDate: z.string().optional().nullable().refine(
    (val) => !val || !isNaN(Date.parse(val)),
    { message: "Invalid endDate format" }
  ),
  description: z.string().optional(),
});


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = workExperienceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const workExperience = await prisma.workExperience.create({
      data: {
        profileId: data.profileId,
        company: data.company,
        role: data.role,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        description: data.description,
      },
    });

    return NextResponse.json(workExperience, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create work experience", details: error },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get("id");

    if (!profileId) {
      return NextResponse.json({ error: "profileId is required" }, { status: 400 });
    }

    const experiences = await prisma.workExperience.findMany({
      where: { profileId },
    });

    if (!experiences || experiences.length === 0) {
      return NextResponse.json({ error: "No work experience found" }, { status: 404 });
    }

    return NextResponse.json(experiences);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const existing = await prisma.workExperience.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Work experience not found" }, { status: 404 });
    }

    await prisma.workExperience.delete({ where: { id } });

    return NextResponse.json({ message: "Work experience deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete work experience" },
      { status: 500 }
    );
  }
}





export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = workExperienceSchema.safeParse(body);
    
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

    const existing = await prisma.workExperience.findFirst({
      where : {
        id
      }
    });

    if (!existing) {
      return NextResponse.json({ error: 'work not found' }, { status: 404 });
    }

    const updated = await prisma.workExperience.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update workExperience' }, { status: 500 });
  }
}





