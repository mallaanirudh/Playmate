// /app/api/venues/route.ts
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
    }

    // Fetch venues for this user
    const venues = await db.venue.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch all images for this user's venues in one query
    const venueIds = venues.map(v => v.id);
    const venueImages = await db.venueImage.findMany({
      where: { venueId: { in: venueIds } },
    });

    // Attach images to each venue
    const venuesWithImages = venues.map(venue => {
      const imagesForVenue = venueImages.filter(img => img.venueId === venue.id);
      const imageUrls = imagesForVenue.map(img => img.imageUrl);
      return { ...venue, images: imageUrls };
    });

    return new Response(JSON.stringify({ success: true, venues: venuesWithImages }), { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user venues:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
