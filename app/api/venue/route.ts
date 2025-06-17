import { db } from '../../../lib/db';
import { NextResponse } from 'next/server';
import { auth} from '@clerk/nextjs/server'
export async function POST(req: Request) {
  try {
    const body = await req.json();
   const {userId}= await auth();
    const newVenue = await db.venue.create({
      data: {
        name: body.name,
        description: body.description,
        venueType: body.venueType,
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        latitude: body.latitude ? parseFloat(body.latitude) : null,
        longitude: body.longitude ? parseFloat(body.longitude) : null,
        phone: body.phone,
        email: body.email,
        websiteUrl: body.websiteUrl,
        ownerId: userId||"",
       
      },
    });

    return NextResponse.json({ success: true, venue: newVenue });
  } catch (error) {
    console.error('Error creating venue:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
