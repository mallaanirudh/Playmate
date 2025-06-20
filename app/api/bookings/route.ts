import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { courtId, bookingDate, startTime, endTime, durationHours, totalAmount, notes } = await req.json()

    // Validate if the court exists
    const court = await db.court.findUnique({
      where: { id: courtId }
    })

    if (!court) {
      return NextResponse.json({ error: 'Court not found' }, { status: 404 })
    }

    const booking = await db.booking.create({
      data: {
        userId,
        courtId,
        bookingDate: new Date(bookingDate),
        startTime,
        endTime,
        durationHours: parseFloat(durationHours),
        totalAmount: parseFloat(totalAmount),
        notes
      }
    })

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Booking Error:', error)
    
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
