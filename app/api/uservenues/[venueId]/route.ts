// /app/api/uservenues/[venueId]/route.ts

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ venueId: string }> }
) {
  const { venueId } = await params;
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const venue = await db.venue.findFirst({
    where: { id: venueId, ownerId: userId }
  });

  if (!venue) {
    return NextResponse.json({ error: 'Venue not found' }, { status: 404 });
  }

  return NextResponse.json({ venue });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ venueId: string }> }
) {
  const { venueId } = await params;
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  if (!body.name || !body.description) {
    return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
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
  });
  return NextResponse.json({ venue: updatedVenue });
}
