'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
const DEFAULT_LIMIT = 9

export default function DashboardPage() {
  const searchParams = useSearchParams()
const router = useRouter()

const page = parseInt(searchParams.get('page') || '1', 10)
const [venues, setVenues] = useState<any[]>([])
const [total, setTotal] = useState(0)
const [loading, setLoading] = useState(true)

const fetchVenues = async (page: number) => {
  setLoading(true)
  try {
    const res = await fetch(`/api/getallvenues?page=${page}&limit=${DEFAULT_LIMIT}`)
    const data = await res.json()
    setVenues(data.venues)
    setTotal(data.total)
  } catch (error) {
    console.error('Error fetching venues:', error)
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  fetchVenues(page)
}, [page])

const totalPages = Math.ceil(total / DEFAULT_LIMIT)
const goToPage = (newPage: number) => {
  if (newPage < 1 || newPage > totalPages) return
  router.push(`/dashboard?page=${newPage}`)
}


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-xl text-gray-600 font-medium">Loading amazing venues...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Venues
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Find the perfect space for your next event, celebration, or gathering
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 -left-8 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        {venues.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No venues found</h3>
            <p className="text-gray-600">Check back later for amazing venues!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue, index) => {
              const image = venue.images?.[0]
              const imageUrl = image ?? null

              return (
                <Link href={`/bookings/${venue.id}`} key={venue.id}>
                  <div 
                    className="group bg-white shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-300 ease-out border border-gray-100 hover:border-indigo-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={venue.name}
                          width={500}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 group-hover:from-gray-200 group-hover:to-gray-300 transition-colors duration-300">
                          <div className="text-center">
                            <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm font-medium">No Image Available</p>
                          </div>
                        </div>
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Title and Location */}
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-1">
                          {venue.name}
                        </h2>
                        {venue.location && (
                          <div className="flex items-center text-gray-600 mb-3">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm font-medium">{venue.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {venue.description && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                          {venue.description}
                        </p>
                      )}

                      {/* Details Grid */}
                      <div className="space-y-3 pt-2">
                        {venue.price && (
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              <span className="text-sm font-medium text-gray-700">Price</span>
                            </div>
                            <span className="text-green-700 font-bold">{venue.price}</span>
                          </div>
                        )}

                        {venue.timings && (
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm font-medium text-gray-700">Hours</span>
                            </div>
                            <span className="text-blue-700 font-semibold text-sm">{venue.timings}</span>
                          </div>
                        )}

                        {venue.contact && (
                          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span className="text-sm font-medium text-gray-700">Contact</span>
                            </div>
                            <span className="text-purple-700 font-semibold text-sm">{venue.contact}</span>
                          </div>
                        )}
                      </div>

                      {/* Book Now Button */}
                      <div className="pt-4">
                        <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold text-center group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-200 transform group-hover:scale-105">
                          <span className="flex items-center justify-center">
                            Book Now
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
  <div className="flex justify-center mt-8 space-x-2">
    <button
      onClick={() => goToPage(page - 1)}
      disabled={page === 1}
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
      Previous
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => goToPage(i + 1)}
        className={`px-3 py-1 rounded ${
          page === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
        }`}
      >
        {i + 1}
      </button>
    ))}
    <button
      onClick={() => goToPage(page + 1)}
      disabled={page === totalPages}
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
      )}

    </div>
  )
}