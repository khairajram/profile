import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const linkSchema = z.object({
  profileId: z.string().min(1),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  portfolio: z.string().url().optional(),
  resume: z.string().url().optional(),
  twitter: z.string().url().optional()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = linkSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const link = await prisma.links.create({
      data: {
        profileId: data.profileId,
        github: data.github || null,
        linkedin: data.linkedin || null,
        portfolio: data.portfolio || null,
        resume: data.resume || null,
        twitter: data.twitter || null
      }
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create links", details: error },
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

    const links = await prisma.links.findUnique({
      where: { profileId }
    });

    if (!links) {
      return NextResponse.json({ error: "Links not found" }, { status: 404 });
    }

    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json({ error, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get("id");

    if (!profileId) {
      return NextResponse.json(
        { error: "Missing profileId" },
        { status: 400 }
      );
    }

    const existingLinks = await prisma.links.findUnique({
      where: { profileId }
    });

    if (!existingLinks) {
      return NextResponse.json({ error: "Links not found" }, { status: 404 });
    }

    await prisma.links.delete({
      where: { profileId }
    });

    return NextResponse.json({ message: "Links deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error,message: "Failed to delete links" },
      { status: 500 }
    );
  }
}




export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = linkSchema.safeParse(body);
    
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

    const existing = await prisma.links.findFirst({
      where : {
        id
      }
    });

    if (!existing) {
      return NextResponse.json({ error: 'link not found' }, { status: 404 });
    }

    const updated = await prisma.links.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error,message: 'Failed to update link' }, { status: 500 });
  }
}





