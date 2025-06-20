
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { venueId, imageUrl, isPrimary, caption } = body;

    const { userId } =  await auth();

   
    if (!userId) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
    }

    // Check if venue belongs to user
    const venue = await db.venue.findUnique({
      where: {
        id: venueId,
        ownerId: userId, // Prevents adding images to someone else's venue
      },
    });

    if (!venue) {
      return new Response(JSON.stringify({ success: false, error: 'Venue not found or not owned by user' }), { status: 404 });
    }

    const image = await db.venueImage.create({
      data: {
        venueId:venueId,
        imageUrl,
        isPrimary,
        caption,
      },
    });

    return new Response(JSON.stringify({ success: true, image }), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
