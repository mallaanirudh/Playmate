'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function BookingForm() {
  const { venueId } = useParams()
  const router = useRouter()

  const [formData, setFormData] = useState({
    bookingDate: '',
    startTime: '',
    endTime: '',
    durationHours: '',
    totalAmount: '',
    notes: ''
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, courtId: venueId })
    })

    if (res.ok) {
      alert('Booking successful!')
      router.push('/mybookings')
    } else {
      alert('Booking failed.')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Your Slot</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Booking Date:</label>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Start Time (HH:MM):</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">End Time (HH:MM):</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Duration (Hours):</label>
          <input
            type="number"
            name="durationHours"
            value={formData.durationHours}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Total Amount:</label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Notes (optional):</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  )
}
