import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import Link from 'next/link'

export default async function MyBookingsPage() {
  const { userId } = await auth()

  if (!userId) {
    return <div className="p-4 text-red-500">You must be logged in to view your bookings.</div>
  }

  // Fetch bookings and related venue
  const bookings = await db.booking.findMany({
    where: { userId },
    include: {
      venue: true
    },
    orderBy: { createdAt: 'desc' }
  })

  if (bookings.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
        <p>You have no bookings yet.</p>
        <Link href="/" className="text-blue-500 underline mt-4 block">Go to Home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{booking.venue.name}</h2>
            <p><strong>Venue:</strong> {booking.venue.name}</p>
            <p><strong>Date:</strong> {new Date(booking.bookingDate).toDateString()}</p>
            <p><strong>Start:</strong> {booking.startTime}</p>
            <p><strong>End:</strong> {booking.endTime}</p>
            <p><strong>Amount:</strong> ₹{booking.totalAmount}</p>
            <p><strong>Status:</strong> {booking.bookingStatus}</p>

            <Link href={`/booking-confirmation/${booking.id}`} className="text-green-500 underline mt-2 block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
