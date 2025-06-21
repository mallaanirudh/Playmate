'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function TournamentsPage() {
  const router = useRouter()
  const [tournaments, setTournaments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await fetch('/api/tournaments/getalltournaments')
        const data = await res.json()

        if (res.ok) {
          setTournaments(data.tournaments)
        } else {
          console.error(data.error)
        }
      } catch (error) {
        console.error('Error fetching tournaments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTournaments()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-lg text-gray-600">Loading tournaments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Tournaments</h1>
          <button
            onClick={() => router.push('/tournaments/form')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register Your Tournament
          </button>
        </div>

        {tournaments.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No tournaments found</h3>
            <p className="text-gray-600">Check back later for upcoming tournaments!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="bg-white shadow-lg hover:shadow-2xl rounded-2xl p-6 space-y-4 cursor-pointer border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1 transition"
              >
                <h2 className="text-2xl font-bold text-gray-800 line-clamp-1">{tournament.name}</h2>

                {tournament.location && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{tournament.location}</span>
                  </div>
                )}

                {tournament.date && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(tournament.date).toLocaleDateString()}</span>
                  </div>
                )}

                {tournament.description && (
                  <p className="text-gray-600 text-sm line-clamp-3">{tournament.description}</p>
                )}

                <Link href={`/tournaments/${tournament.id}`} className="block">
                  <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition">
                    View Details
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
