import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const venueId = searchParams.get('venueId')
  const date = searchParams.get('date')

  if (!venueId || !date) {
    return NextResponse.json({ error: 'Missing venueId or date' }, { status: 400 })
  }

  const slots = await db.venueSlot.findMany({
    where: {
      venueId,
      date: new Date(`${date}T00:00:00.000Z`),
      isBooked: false,
    },
    select: {
      id: true,
      startTime: true,
      endTime: true,
    },
  })

  return NextResponse.json({ slots })
}
