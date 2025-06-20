// /app/api/uservenues/[venueId]/route.ts
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'



// GET - Fetch Venue Details
export async function GET(
  req: NextRequest,
  { params }: { params: { venueId: string } }
): Promise<NextResponse> {
  const { userId } = await auth();
  const { venueId } = params

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
export async function PUT(
  req: NextRequest,
  { params }:  { params: { venueId: string } }
): Promise<NextResponse> {
  const { userId } =await  auth();
  const { venueId } = params

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    
    // Optional: Add input validation
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      )
    }

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
    return NextResponse.json(
      { error: 'Failed to update venue' },
      { status: 500 }
    )
  }
}

// DELETE - Delete Venue
/*
export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  const { userId } = await auth();
  const { venueId } = params

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await db.venue.delete({
      where: { id: venueId, ownerId: userId }
    })

    return NextResponse.json(
      { message: 'Venue deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting venue:', error)
    return NextResponse.json(
      { error: 'Failed to delete venue' },
      { status: 500 }
    )
  }
}
  */