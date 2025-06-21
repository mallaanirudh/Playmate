import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { venueId, bookingDate, startTime, endTime, durationHours, totalAmount, notes } = await req.json()

    // Validate if the venue exists
    const venue = await db.venue.findUnique({
      where: { id: venueId }
    })

    if (!venue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 })
    }

    console.log('✅ POST /api/bookings called')

    const booking = await db.booking.create({
      data: {
        userId,
        venueId,
        bookingDate: new Date(bookingDate),
        startTime,
        endTime,
        durationHours: parseFloat(durationHours),
        totalAmount: parseFloat(totalAmount),
        notes
      }
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error('Booking Error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
