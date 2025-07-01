import { db } from '../../../lib/db';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const {
      name,
      description,
      venueType,
      address,
      city,
      state,
      pincode,
      latitude,
      longitude,
      phone,
      email,
      websiteUrl,
      slots = [], // array of { date, startTime, endTime }
    } = body;

    const newVenue = await db.venue.create({
      data: {
        name,
        description,
        venueType,
        address,
        city,
        state,
        pincode,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        phone,
        email,
        websiteUrl,
        ownerId: userId,
      },
    });

    // Create available slots if any were sent
    if (Array.isArray(slots) && slots.length > 0) {
      await db.venueSlot.createMany({
        data: slots.map((slot: any) => ({
          venueId: newVenue.id,
          date: new Date(slot.date),
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
      });
    }

    return NextResponse.json({ success: true, venue: newVenue });
  } catch (error) {
    console.error('Error creating venue:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
