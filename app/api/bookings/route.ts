import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      venueId,
      bookingDate,
      startTime,
      endTime,
      durationHours,
      totalAmount,
      notes,
    } = await req.json();

    // Check if venue exists
    const venue = await db.venue.findUnique({ where: { id: venueId } });

    if (!venue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 });
    }

    // Check if the slot is available in VenueSlot
    const slotAvailable = await db.venueSlot.findFirst({
      where: {
        venueId,
        date: new Date(bookingDate + 'T00:00:00.000Z'),
        startTime,
        endTime,
      },
    });

    if (!slotAvailable) {
      return NextResponse.json(
        { error: 'Selected slot is not available for this venue' },
        { status: 400 }
      );
    }

    // Optional: check if this slot is already booked by someone else
    const isAlreadyBooked = await db.booking.findFirst({
      where: {
        venueId,
        bookingDate: new Date(bookingDate),
        startTime,
        endTime,
      },
    });

    if (isAlreadyBooked) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    const booking = await db.booking.create({
      data: {
        userId,
        venueId,
        bookingDate: new Date(bookingDate),
        startTime,
        endTime,
        durationHours: parseFloat(durationHours),
        totalAmount: parseFloat(totalAmount),
        notes,
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
