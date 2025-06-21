import { db } from '@/lib/db'

interface BookingPageProps {
  params: {
    bookingId: string
  }
}

export default async function BookingConfirmationPage({ params }: BookingPageProps) {
  const { bookingId } = await params

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: {
      venue: true,
      user: true
    }
  })

  if (!booking) {
    return <div className="p-4 text-red-500">Booking not found.</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Booking Confirmation</h1>
      
      <div className="space-y-4 border p-4 rounded shadow">
        <p><strong>Venue:</strong> {booking.venue.name}</p>
        <p><strong>Booking Date:</strong> {booking.bookingDate.toDateString()}</p>
        <p><strong>Start Time:</strong> {booking.startTime}</p>
        <p><strong>End Time:</strong> {booking.endTime}</p>
        <p><strong>Duration:</strong> {booking.durationHours} hours</p>
        <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
        {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
      </div>

      <div className="mt-6">
        <a href="/mybookings" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          View My Bookings
        </a>
      </div>
    </div>
  )
}
