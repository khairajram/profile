import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const basicProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  about: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = basicProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const profile = await prisma.profile.create({
      data: {
        name: data.name,
        email: data.email,
        about: data.about,
      },
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create basic profile', details: error },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const profile = await prisma.profile.findFirst({
      include : {
        skills : true,
        links : true,
        projects : {
          include : {
            skills : true
          }
        },
        work : true,
        educations : true,
      }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = basicProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const existingProfile = await prisma.profile.findFirst();

    if (!existingProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const updated = await prisma.profile.update({
      where: { id: existingProfile.id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const existingProfile = await prisma.profile.findFirst();

    if (!existingProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    await prisma.profile.delete({
      where: { id: existingProfile.id },
    });

    return NextResponse.json({ message: 'Profile deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
}


