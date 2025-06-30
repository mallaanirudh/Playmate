'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function CoachingOfferPage() {
  const router = useRouter();
  const { user } = useUser();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [durationMins, setDurationMins] = useState('');
  const [sport, setSport] = useState('TENNIS');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const addSlot = () => {
    setSlots([...slots, { date: '', startTime: '', endTime: '' }]);
  };

 type Slot = {
  date: string;
  startTime: string;
  endTime: string;
};

const [slots, setSlots] = useState<Slot[]>([
  { date: '', startTime: '', endTime: '' },
]);

const updateSlot = (
  slotIndex: number, 
  field: keyof Slot, 
  value: string
) => {
  const updatedSlots = [...slots];
  updatedSlots[slotIndex] = {
    ...updatedSlots[slotIndex],
    [field]: value,
  };
  setSlots(updatedSlots);
};


  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleCreateOffer = async () => {
    setError('');
    if (!title || !description || !price || !durationMins || !sport) {
      setError('Please fill out all fields.');
      return;
    }

    if (!slots.length || slots.some(s => !s.date || !s.startTime || !s.endTime)) {
      setError('Please provide at least one complete slot.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/coaching/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price),
          durationMins: parseInt(durationMins),
          sport,
          slots,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      router.push(`coaching/${data.data.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create coaching offer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 border rounded shadow-sm bg-white">
      <h1 className="text-2xl font-semibold mb-4">Create Coaching Offer</h1>

      <label className="block text-sm font-medium mb-1">Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="e.g. Private Tennis Lesson"
      />

      <label className="block text-sm font-medium mb-1">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="Describe the session..."
      />

      <label className="block text-sm font-medium mb-1">Price ($)</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block text-sm font-medium mb-1">Duration (mins)</label>
      <input
        type="number"
        value={durationMins}
        onChange={(e) => setDurationMins(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block text-sm font-medium mb-1">Sport</label>
      <select
        value={sport}
        onChange={(e) => setSport(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="CRICKET">Cricket</option>
        <option value="FOOTBALL">Football</option>
        <option value="SWIMMING">swimming</option>
      </select>

      <h2 className="text-xl font-semibold mt-6 mb-2">Available Slots</h2>
      {slots.map((slot, index) => (
        <div key={index} className="border p-3 rounded mb-4">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={slot.date}
            onChange={(e) => updateSlot(index, 'date', e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="time"
            value={slot.startTime}
            onChange={(e) => updateSlot(index, 'startTime', e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="time"
            value={slot.endTime}
            onChange={(e) => updateSlot(index, 'endTime', e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />

          <button
            type="button"
            onClick={() => removeSlot(index)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove Slot
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSlot}
        className="bg-gray-200 text-sm px-3 py-1 rounded mb-6"
      >
        + Add Slot
      </button>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleCreateOffer}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? 'Creating...' : 'Create Coaching Offer'}
      </button>
    </main>
  );
}
