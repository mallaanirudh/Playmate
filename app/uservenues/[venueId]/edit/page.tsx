'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditVenuePage() {
  const { venueId } = useParams()
  const router = useRouter()
  const [venue, setVenue] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    timings: '',
    contact: ''
  })

  useEffect(() => {
    const fetchVenue = async () => {
      const res = await fetch(`/api/uservenues/${venueId}`)
      const data = await res.json()
      if (res.ok) {
        setVenue(data.venue)
        setFormData({
          name: data.venue.name || '',
          description: data.venue.description || '',
          price: data.venue.price || '',
          timings: data.venue.timings || '',
          contact: data.venue.contact || ''
        })
      }
    }

    fetchVenue()
  }, [venueId])

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await fetch(`/api/uservenues/${venueId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      alert('Venue updated successfully!')
      router.push('/uservenues')
    } else {
      alert('Update failed.')
    }
  }

  if (!venue) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Venue: {venue.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Timings</label>
          <input
            type="text"
            name="timings"
            value={formData.timings}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
