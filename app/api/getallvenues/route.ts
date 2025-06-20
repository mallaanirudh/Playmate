// app/api/getallvenues/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Prisma client

export async function GET() {
  try {
    // Fetch venues
    const venues = await db.venue.findMany();

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

    return NextResponse.json({ venues: venuesWithImages });
  } catch (error) {
    console.error('Error fetching venues:', error);
    return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 });
  }
}
