// app/api/getallvenues/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Prisma client

export async function GET(req: Request) {
  try {
    // Fetch venues
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '9', 10);
    const skip = (page - 1) * limit;

    const total = await db.venue.count();

    const venues = await db.venue.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Fetch all venue images
    const venueImages = await db.venueImage.findMany(); // Assuming you have a venueImage table

    // Build venues with images
    const venuesWithImages = await Promise.all(
      venues.map(async (venue) => {
        const imagesForVenue = venueImages.filter(img => img.venueId === venue.id);

        // Directly use the imageUrl from the database
        const imageUrls = imagesForVenue.map(img => img.imageUrl);

        return {
          ...venue,
          images: imageUrls,
        };
      })
    );

    return NextResponse.json({
      venues: venuesWithImages,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching venues:', error);
    return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 });
  }
}
