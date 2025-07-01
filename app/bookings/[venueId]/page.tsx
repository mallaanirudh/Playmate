'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Slot {
  id: string
  startTime: string
  endTime: string
}

export default function BookingForm() {
  const { venueId } = useParams()
  const router = useRouter()

  const [formData, setFormData] = useState({
    bookingDate: '',
    selectedSlotId: '',
    durationHours: '',
    totalAmount: '',
    notes: '',
  })

  const [availableSlots, setAvailableSlots] = useState<Slot[]>([])

  useEffect(() => {
    if (!formData.bookingDate) return

    const fetchSlots = async () => {
      try {
        const res = await fetch(`/api/available-slots?venueId=${venueId}&date=${formData.bookingDate}`)
        const data = await res.json()
        setAvailableSlots(data.slots || [])
      } catch (err) {
        console.error('Error fetching slots:', err)
        setAvailableSlots([])
      }
    }

    fetchSlots()
  }, [formData.bookingDate, venueId])

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSlotSelect = (e: any) => {
  const slotId = e.target.value
  const selected = availableSlots.find((s) => s.id === slotId)

  if (selected) {
    const start = new Date(`1970-01-01T${selected.startTime}`)
    const end = new Date(`1970-01-01T${selected.endTime}`)
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)

    setFormData((prev) => ({
      ...prev,
      selectedSlotId: slotId,
      startTime: selected.startTime,
      endTime: selected.endTime,
      durationHours: hours.toFixed(2),
    }))
  }
}

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const selected = availableSlots.find((s) => s.id === formData.selectedSlotId)
    if (!selected) {
      alert('Please select a valid slot.')
      return
    }

    const payload = {
      venueId,
      bookingDate: formData.bookingDate,
      startTime: selected.startTime,
      endTime: selected.endTime,
      durationHours: formData.durationHours,
      totalAmount: formData.totalAmount,
      notes: formData.notes,
    }

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      const data = await res.json()
      alert('Booking successful!')
      router.push(`/mybookings/${data.booking.id}`)
    } else {
      const error = await res.json()
      alert(`Booking failed: ${error.error}`)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Your Slot</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Booking Date */}
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

        {/* Slot Dropdown */}
       
<div>
  <label className="block mb-1">Available Slots:</label>
  {availableSlots.length > 0 ? (
    <select
      name="selectedSlotId"
      value={formData.selectedSlotId}
      onChange={handleSlotSelect}
      required
      className="w-full border p-2 rounded"
    >
      <option value="">-- Select a Slot --</option>
      {availableSlots.map((slot) => (
        <option key={slot.id} value={slot.id}>
          {slot.startTime} - {slot.endTime}
        </option>
      ))}
    </select>
  ) : (
    <div className="text-gray-500 italic">No available slots for selected date.</div>
  )}
</div>
        {/* Duration */}
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

        {/* Amount */}
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

        {/* Notes */}
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  )
}
