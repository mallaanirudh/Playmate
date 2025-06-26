'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function CreateTeamPage() {
  const router = useRouter();
  const { user } = useUser();

  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateTeam = async () => {
    setError('');
    if (!teamName.trim()) {
      setError('Please enter a team name.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/team/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: teamName,
          userId: user?.id, // make sure your Clerk ID maps to your DB user
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      router.push(`/teams/${data.team.id}`); // redirect to team detail page
    } catch (err: any) {
      setError(err.message || 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 border rounded shadow-sm bg-white">
      <h1 className="text-2xl font-semibold mb-4">Create a New Team</h1>

      <label htmlFor="teamName" className="block text-sm font-medium mb-1">
        Team Name
      </label>
      <input
        id="teamName"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="e.g. Thunderbolts"
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleCreateTeam}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Creating...' : 'Create Team'}
      </button>

      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-gray-600">After creating, you can invite members to join your team.</p>
        <button
          className="mt-2 text-blue-500 hover:underline"
          onClick={() => alert('Invite feature coming soon')}
        >
          Invite Members
        </button>
      </div>
    </main>
  );
}
