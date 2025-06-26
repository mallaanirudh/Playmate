'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function TeamPage() {
  const { id } = useParams();
  const router = useRouter();

  const [team, setTeam] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTeam = async () => {
    const res = await fetch(`/api/team/${id}`);
    const data = await res.json();
    setTeam(data.team);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleInvite = async () => {
    setLoading(true);
    setError('');
    const res = await fetch(`/api/team/${id}/invite`, {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Something went wrong');
    } else {
      setUsername('');
      fetchTeam();
    }
    setLoading(false);
  };

  if (!team) return <div>Loading team...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{team.name}</h1>

      <div className="mb-6">
        <input
          className="border p-2 w-full rounded mb-2"
          placeholder="Search username to invite"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleInvite}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Inviting...' : 'Invite to Team'}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      <h2 className="text-xl font-semibold mb-2">Members:</h2>
      <ul className="list-disc list-inside">
        {team.members.map((member: any) => (
          <li key={member.id}>
            {member.user.username || member.user.email_address} ({member.role})
          </li>
        ))}
      </ul>
    </div>
  );
}
