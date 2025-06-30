import { db } from '@/lib/db'; // or prisma instance
import { notFound } from 'next/navigation';

export default async function CoachingOfferDetailPage({ params }: { params:Promise< { id: string } >}) {
  const { id} = await params;
  const offer = await db.coachingOffer.findUnique({
    where: { id: id },
    include: { coachingslots: true },
  });

  if (!offer) return notFound();

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{offer.title}</h1>
      <p className="text-gray-700 mb-4">{offer.description}</p>
      <p className="mb-2"><strong>Sport:</strong> {offer.sport}</p>
      <p className="mb-2"><strong>Price:</strong> ${offer.price}</p>
      <p className="mb-2"><strong>Duration:</strong> {offer.durationMins} minutes</p>

      <h2 className="mt-6 text-xl font-semibold">Available Slots</h2>
      <ul className="mt-2 list-disc list-inside">
        {offer.coachingslots.map((slot) => (
          <li key={slot.id}>
            {slot.date.toDateString()} – {slot.startTime} to {slot.endTime}
          </li>
        ))}
      </ul>
    </main>
  );
}
