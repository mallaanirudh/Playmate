import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { auth, User } from '@clerk/nextjs/server';
import { SportsType } from '@/app/generated/prisma';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, price, durationMins, sport, slots } = body;

    if (!title || !description || !price || !durationMins || !sport) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!Array.isArray(slots)) {
      return NextResponse.json(
        { success: false, message: 'Slots must be an array' },
        { status: 400 }
      );
    }

    
    for (const slot of slots) {
      if (!slot.date || !slot.startTime || !slot.endTime) {
        return NextResponse.json(
          { success: false, message: 'Each slot must include date, startTime, and endTime' },
          { status: 400 }
        );
      }
    }

    const coachingOffer = await db.coachingOffer.create({
      data: {
        coachId: userId,
        title,
        description,
        price: parseFloat(price),
        durationMins: parseInt(durationMins),
        sport,
        coachingslots: {
          create: slots.map(slot => ({
            date: new Date(slot.date), 
            startTime: slot.startTime,
            endTime: slot.endTime,
          })),
        },
      },
      include: {
        coachingslots: true,
      },
    });

    return NextResponse.json({ success: true, data: coachingOffer }, { status: 201 });
  } catch (error) {
    console.error('Error creating coaching offer:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
