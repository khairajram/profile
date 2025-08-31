import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const projectSchema = z.object({
  profileId: z.string().optional(),
  projectId: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  link: z.string().url().optional().or(z.literal("")),
  techStack: z.string().optional(),
  skillId: z.string().optional(),
  skills: z.array(z.object({
    name: z.string(),
    level: z.string().optional()
  })).optional()
});


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const project = await prisma.project.create({
      data: {
        profileId: data.profileId || null,
        title: data.title,
        description: data.description,
        link: data.link || null,
        techStack: data.techStack || null,
        skills: {
          create: data.skills?.map(skill => ({
            name: skill.name,
            level: skill.level || null
          })) || []
        }
      },
      include: { skills: true }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create project", details: error },
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

    const projects = await prisma.project.findMany({
      where: { profileId },
      include: { skills: true }
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error,message: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("id");

    if (!projectId) {
      return NextResponse.json(
        { error: "Missing projectId" },
        { status: 400 }
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({
      where: { id: projectId }
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error,message: "Failed to delete project" },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = projectSchema.safeParse(body);
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: 'id not provided' },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const existing = await prisma.project.findUnique({
      where: { id }
    });

    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        link: data.link || null,
        techStack: data.techStack || null,
        skills: {
          connect : {
            id : data.skillId
          }
        }
      },
      include: { skills: true }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error,message: 'Failed to update project' }, { status: 500 });
  }
}
