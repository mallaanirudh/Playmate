'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TournamentForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        venue_address: '',
        city: '',
        state: '',
        country: '',
        prize_money: '',
        startDate: '',
        endDate: '',
        sport: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/tournaments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    prize_money: parseInt(formData.prize_money) || 0 // ensure number
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create tournament');
            }

            
            router.push('/tournaments');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-4 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Register a Tournament</h2>

            <input type="text" name="name" placeholder="Tournament Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded" />
            <input type="text" name="venue_address" placeholder="Venue Address" value={formData.venue_address} onChange={handleChange} required className="w-full p-2 border rounded" />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="number" name="prize_money" placeholder="Prize Money" value={formData.prize_money} onChange={handleChange} className="w-full p-2 border rounded" />

            <label className="block">Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full p-2 border rounded" />

            <label className="block">End Date</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required className="w-full p-2 border rounded" />

            <select name="sport" value={formData.sport} onChange={handleChange} required className="w-full p-2 border rounded">
                <option value="">Select Sport</option>
                <option value="FOOTBALL">Football</option>
                <option value="BASKETBALL">Basketball</option>
                <option value="TENNIS">Tennis</option>
                {/* Add more sports if needed */}
            </select>

            {error && <p className="text-red-500">{error}</p>}

            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {loading ? 'Registering...' : 'Register Tournament'}
            </button>
        </form>
    );
}
