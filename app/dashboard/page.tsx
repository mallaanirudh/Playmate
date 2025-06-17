'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Star, MapPin, Clock, Users, Calendar, Search, Filter, Plus } from 'lucide-react'

export default function VenueBookingDashboard() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedVenue, setSelectedVenue] = useState(null)

  const venues = [
    {
      id: 1,
      name: "Elite Sports Turf",
      category: "turf",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop",
      rating: 4.8,
      reviews: 124,
      location: "Downtown Sports Complex",
      price: "₹800/hour",
      features: ["Floodlights", "Changing Rooms", "Parking"],
      availability: "Available Now",
      description: "Premium artificial turf with professional lighting"
    },
    {
      id: 2,
      name: "Crystal Clear Pool",
      category: "pool",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
      rating: 4.9,
      reviews: 89,
      location: "Luxury Resort Area",
      price: "₹1,200/hour",
      features: ["Heated Pool", "Lifeguard", "Pool Equipment"],
      availability: "Available Today",
      description: "Olympic-sized swimming pool with crystal clear water"
    },
    {
      id: 3,
      name: "Championship Court",
      category: "court",
      image: "https://images.unsplash.com/photo-1552057426-c4a71681057e?w=400&h=250&fit=crop",
      rating: 4.7,
      reviews: 156,
      location: "Sports Arena",
      price: "₹600/hour",
      features: ["Professional Court", "Equipment Rental", "Seating"],
      availability: "Available Tomorrow",
      description: "Professional basketball court with spectator seating"
    },
    {
      id: 4,
      name: "Green Valley Turf",
      category: "turf",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
      rating: 4.6,
      reviews: 78,
      location: "Valley Sports Club",
      price: "₹700/hour",
      features: ["Natural Grass", "Scoreboard", "Refreshments"],
      availability: "Available Now",
      description: "Natural grass football turf in scenic valley location"
    },
    {
      id: 5,
      name: "Aqua Paradise",
      category: "pool",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=250&fit=crop",
      rating: 4.5,
      reviews: 92,
      location: "Waterfront District",
      price: "₹1,000/hour",
      features: ["Infinity Pool", "Poolside Bar", "Towel Service"],
      availability: "Available This Week",
      description: "Infinity pool with stunning waterfront views"
    },
    {
      id: 6,
      name: "Pro Tennis Court",
      category: "court",
      image: "https://images.unsplash.com/photo-1542356517-7a0a0b6d9e33?w=400&h=250&fit=crop",
      rating: 4.8,
      reviews: 134,
      location: "Tennis Academy",
      price: "₹500/hour",
      features: ["Clay Court", "Net Equipment", "Ball Machine"],
      availability: "Available Now",
      description: "Professional clay tennis court with equipment included"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Venues', count: venues.length },
    { id: 'turf', name: 'Sports Turfs', count: venues.filter(v => v.category === 'turf').length },
    { id: 'pool', name: 'Swimming Pools', count: venues.filter(v => v.category === 'pool').length },
    { id: 'court', name: 'Sports Courts', count: venues.filter(v => v.category === 'court').length }
  ]

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || venue.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleBookVenue = (venue:any) => {
    setSelectedVenue(venue)
    // In a real app, this would open a booking modal or navigate to booking page
    alert(`Booking ${venue.name} - This would open the booking form!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VenueBook
              </h1>
              <p className="text-gray-600 mt-1">Find and book the perfect venue</p>
            </div>
            <button 
              onClick={() => router.push('/dashboard/CreateVenue')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={20} />
              List Your Venue
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search venues by name or location..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Filter size={16} />
                {category.name}
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm ml-1">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVenues.map(venue => (
            <div key={venue.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-green-600">
                  {venue.availability}
                </div>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium capitalize">
                  {venue.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {venue.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-medium text-gray-700">
                      {venue.rating} ({venue.reviews})
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {venue.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">{venue.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {venue.features.map(feature => (
                    <span key={feature} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {venue.price}
                  </div>
                  <button 
                    onClick={() => handleBookVenue(venue)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
                  >
                    <Calendar size={16} />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No venues found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or browse all venues</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
            <div className="text-3xl font-bold mb-2">{venues.length}</div>
            <div className="text-blue-100">Total Venues</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl">
            <div className="text-3xl font-bold mb-2">2.4k+</div>
            <div className="text-green-100">Happy Customers</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
            <div className="text-3xl font-bold mb-2">4.8</div>
            <div className="text-purple-100">Average Rating</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-orange-100">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  )
}