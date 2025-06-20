// /app/uservenues/[venueId]/page.tsx

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';


import Link from 'next/link'
export default async function VenueDetails({ params }: { params:Promise< { venueId: string }> }) {
  const {venueId} = await params;
  const { userId } = await auth();
  
 
  if (!userId) {
    notFound();
  }

  const venue = await db.venue.findUnique({
    
    where: { id:venueId, ownerId: userId },
  });

  if (!venue) {
    notFound();
  }
  

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{venue.name}</h1>
      <p>{venue.description}</p>
      <p className="text-gray-500">{venue.address}</p>
      <Link
  href={`/uservenues/${venue.id}/edit`}
  className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
>
  Edit Venue
</Link>

    </div>
  );
}
