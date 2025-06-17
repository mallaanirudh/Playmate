"use client"
import { useRouter } from 'next/router';

export default function BecomeVenueOwnerButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/dashboard/CreateVenue')}
      className="btn"
    >
      Become a Venue Owner
    </button>
  );
}
