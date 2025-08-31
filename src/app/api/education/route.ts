import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const basicSchema = z.object({
  profileId: z.string().min(1),
  level: z.string().min(1),
  instName: z.string().min(1),
  streame: z.string().min(1),
  year_of_passing: z.string().min(1),
  percentage: z.number()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = basicSchema.safeParse(body);

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

    const profile = await prisma.education.create({
      data: {
        profileId   : data.profileId,
        level   :  data.level,
        instName : data.instName,
        streame   : data.streame,
        year_of_passing :   data.year_of_passing,
        percentage    :   data.percentage
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


export async function GET(req : Request) {
  
  try {

    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get("id");


    const profile = await prisma.education.findMany({
      where : { profileId }
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
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

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = basicSchema.safeParse(body);
    
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

    const existing = await prisma.education.findFirst({
      where : {
        id
      }
    });

    if (!existing) {
      return NextResponse.json({ error: 'data not found' }, { status: 404 });
    }

    const updated = await prisma.education.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}


