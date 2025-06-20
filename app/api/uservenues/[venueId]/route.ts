// /app/api/uservenues/[venueId]/route.ts
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// GET - Fetch Venue Details
export async function GET(req: Request, { params }: { params: { venueId: string } }) {
  const { userId } = await auth()
  const {venueId} = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const venue = await db.venue.findFirst({
    where: { id: venueId, ownerId: userId }
  })

  if (!venue) {
    return NextResponse.json({ error: 'Venue not found' }, { status: 404 })
  }

  return NextResponse.json({ venue })
}

// PUT - Update Venue Details
export async function PUT(req: Request, { params }: { params: { venueId: string } }) {
  const { userId } = await auth()
  const {venueId}=await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  try {
    const updatedVenue = await db.venue.update({
      where: { id: venueId, ownerId: userId },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        timings: body.timings,
        contact: body.contact
      }
    })

    return NextResponse.json({ venue: updatedVenue })
  } catch (error) {
    console.error('Error updating venue:', error)
    return NextResponse.json({ error: 'Failed to update venue' }, { status: 500 })
  }
}
