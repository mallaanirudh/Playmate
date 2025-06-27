'use client'
import React, { useState } from 'react'
import { Calendar, Users, MapPin, Clock, Star, Settings, Plus, Search, Filter, Bell, MessageCircle, Trophy, Crown, Shield, UserPlus, Edit, Heart, Share, Eye } from 'lucide-react'

interface Community {
  id: number
  name: string
  description: string
  members: number
  events: number
  category: string
  image: string
  head: string
  moderators: string[]
  tags: string[]
  isJoined: boolean
  rating: number
  nextEvent?: string
}

interface Event {
  id: number
  title: string
  community: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  description: string
  organizer: string
  tags: string[]
  price: string
  status: string
}

const CommunityPlatform = () => {
  const [activeTab, setActiveTab] = useState('communities')
  const [selectedCommunity, setSelectedCommunity] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formType, setFormType] = useState('')

  // Mock data
  const communities = [
    {
      id: 1,
      name: 'Tech Innovators Hub',
      description: 'A community for tech enthusiasts and startup founders',
      members: 1247,
      events: 23,
      category: 'Technology',
      image: '🚀',
      head: 'Sarah Chen',
      moderators: ['Alex Kim', 'Maya Patel'],
      tags: ['Startup', 'AI', 'Web3'],
      isJoined: true,
      rating: 4.8,
      nextEvent: 'AI Workshop - Tomorrow 6PM'
    },
    {
      id: 2,
      name: 'Fitness Warriors',
      description: 'Get fit together, stay motivated, achieve goals',
      members: 892,
      events: 18,
      category: 'Health & Fitness',
      image: '💪',
      head: 'Mike Johnson',
      moderators: ['Lisa Wong', 'Carlos Rivera'],
      tags: ['Fitness', 'Nutrition', 'Wellness'],
      isJoined: false,
      rating: 4.6,
      nextEvent: 'Morning Yoga - Sunday 7AM'
    },
    {
      id: 3,
      name: 'Creative Minds',
      description: 'Artists, designers, and creative professionals unite',
      members: 634,
      events: 15,
      category: 'Arts & Design',
      image: '🎨',
      head: 'Emma Davis',
      moderators: ['Tom Baker', 'Zoe Martinez'],
      tags: ['Design', 'Art', 'Photography'],
      isJoined: true,
      rating: 4.7,
      nextEvent: 'Art Exhibition - Friday 7PM'
    }
  ]

  const events = [
    {
      id: 1,
      title: 'AI & Machine Learning Workshop',
      community: 'Tech Innovators Hub',
      date: '2025-06-28',
      time: '18:00',
      location: 'Innovation Center, Mumbai',
      attendees: 45,
      maxAttendees: 50,
      description: 'Deep dive into latest AI trends and hands-on ML projects',
      organizer: 'Sarah Chen',
      tags: ['AI', 'Workshop', 'Hands-on'],
      price: 'Free',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Community Fitness Challenge',
      community: 'Fitness Warriors',
      date: '2025-06-29',
      time: '07:00',
      location: 'Juhu Beach, Mumbai',
      attendees: 23,
      maxAttendees: 30,
      description: '5K run followed by group workout session',
      organizer: 'Mike Johnson',
      tags: ['Fitness', 'Outdoor', 'Challenge'],
      price: '₹200',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Digital Art Showcase',
      community: 'Creative Minds',
      date: '2025-07-01',
      time: '19:00',
      location: 'Art Gallery, Bandra',
      attendees: 67,
      maxAttendees: 80,
      description: 'Exhibition of digital artworks by community members',
      organizer: 'Emma Davis',
      tags: ['Art', 'Exhibition', 'Digital'],
      price: '₹150',
      status: 'upcoming'
    }
  ]

  const CreateCommunityForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4">Create New Community</h3>
        <div className="space-y-4">
          <input type="text" placeholder="Community Name" className="w-full p-3 border rounded-lg" />
          <textarea placeholder="Description" className="w-full p-3 border rounded-lg h-24"></textarea>
          <select className="w-full p-3 border rounded-lg">
            <option>Select Category</option>
            <option>Technology</option>
            <option>Health & Fitness</option>
            <option>Arts & Design</option>
            <option>Business</option>
            <option>Education</option>
          </select>
          <input type="text" placeholder="Tags (comma separated)" className="w-full p-3 border rounded-lg" />
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
              Create Community
            </button>
            <button 
              onClick={() => setShowCreateForm(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const CreateEventForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Create New Event</h3>
        <div className="space-y-4">
          <input type="text" placeholder="Event Title" className="w-full p-3 border rounded-lg" />
          <textarea placeholder="Event Description" className="w-full p-3 border rounded-lg h-24"></textarea>
          <select className="w-full p-3 border rounded-lg">
            <option>Select Community</option>
            {communities.map(community => (
              <option key={community.id}>{community.name}</option>
            ))}
          </select>
          <input type="date" className="w-full p-3 border rounded-lg" />
          <input type="time" className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Location" className="w-full p-3 border rounded-lg" />
          <input type="number" placeholder="Max Attendees" className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Price (e.g., Free, ₹200)" className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Tags (comma separated)" className="w-full p-3 border rounded-lg" />
          <div className="flex gap-3">
            <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
              Create Event
            </button>
            <button 
              onClick={() => setShowCreateForm(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const CommunityCard = ({ community }: { community: Community }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{community.image}</div>
          <div>
            <h3 className="font-bold text-lg">{community.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{community.rating}</span>
              <span>•</span>
              <span>{community.category}</span>
            </div>
          </div>
        </div>
        <button className={`px-4 py-2 rounded-lg font-medium ${
          community.isJoined 
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}>
          {community.isJoined ? 'Joined' : 'Join'}
        </button>
      </div>
      
      <p className="text-gray-600 mb-4">{community.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {community.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{community.members} members</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{community.events} events</span>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium">Head: {community.head}</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-blue-500" />
          <span className="text-sm">Mods: {community.moderators.join(', ')}</span>
        </div>
        {community.nextEvent && (
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{community.nextEvent}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const EventCard = ({ event }: { event: Event }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">{event.title}</h3>
          <p className="text-blue-600 text-sm font-medium mb-2">{event.community}</p>
          <p className="text-gray-600 text-sm">{event.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
            Attend
          </button>
          <div className="flex gap-1">
            <button className="p-2 text-gray-600 hover:text-red-600"><Heart className="w-4 h-4" /></button>
            <button className="p-2 text-gray-600 hover:text-blue-600"><Share className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {event.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{event.attendees}/{event.maxAttendees}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">by {event.organizer}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-bold text-green-600">{event.price}</span>
          <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">CommunityHub</h1>
              <div className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => setActiveTab('communities')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === 'communities' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Communities
                </button>
                <button 
                  onClick={() => setActiveTab('events')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === 'events' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Events
                </button>
                <button 
                  onClick={() => setActiveTab('my-communities')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === 'my-communities' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  My Communities
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <MessageCircle className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                U
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab === 'communities' ? 'communities' : 'events'}...`}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button 
              onClick={() => {
                setFormType(activeTab === 'communities' ? 'community' : 'event')
                setShowCreateForm(true)
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Create {activeTab === 'communities' ? 'Community' : 'Event'}
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'communities' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map(community => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {activeTab === 'my-communities' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.filter(c => c.isJoined).map(community => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        )}
      </div>

      {/* Create Forms */}
      {showCreateForm && formType === 'community' && <CreateCommunityForm />}
      {showCreateForm && formType === 'event' && <CreateEventForm />}
    </div>
  )
}

export default CommunityPlatform