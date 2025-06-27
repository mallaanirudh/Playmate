'use client'
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation'

const items = [
  { id: 1, image: '/tennis.png', number: '0', description: 'Venues Listed' },
  { id: 2, image: '/tennis.png', number: '0', description: 'Athletes Reached' },
  { id: 3, image: '/tennis.png', number: '0', description: 'Cities Covered' },
  { id: 4, image: '/tennis.png', number: '0', description: 'Tournaments Hosted' },
  { id: 5, image: '/tennis.png', number: '0', description: 'Challenges Created' },
  { id: 6, image: '/tennis.png', number: '0', description: 'Matches Played' },
];
interface AnimatedCounterProps {
  target: number;
  duration?: number; 
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(endTime - now, 0);
      const progress = 1 - remaining / duration;
      
      if (remaining === 0) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.round(target * progress));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target, duration]);
  
  return count;
};

export default function PlayMateLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    router.push('/about') 
  }
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section with Landing Image */}
      <section className="relative overflow-hidden">
        <img 
          className="w-full h-screen object-cover" 
          src="/landing.png" 
          alt="PlayMate Landing" 
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Logo Placeholder */}
              <div className="mb-8">
                
              </div>
              
              
              
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Original Images */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-4 flex-wrap">
              The 
              <img 
                src="/playmate_word.png" 
                className="h-16 md:h-20 inline-block" 
                alt="PlayMate"
              /> 
              Impact
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of athletes and venue owners who trust PlayMate to connect and grow
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100 + 500}ms` }}
              >
                <img 
                  src={item.image} 
                  alt={item.description} 
                  className="w-32 h-24 object-cover rounded-xl mb-6 mx-auto shadow-md" 
                />
                <div className="text-4xl font-bold mb-3 text-blue-600">
                  <AnimatedCounter target={parseInt(item.number.replace(/\D/g, ''))} />
                  {item.number.includes('+') ? '+' : ''}
                </div>
                <p className="text-gray-700 font-medium text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Image */}
      <div className="w-full flex justify-center py-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <img 
          src="/pen.png" 
          alt="Decorative" 
          className="max-w-xs opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Features Section with Tennis Image */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image Side */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20"></div>
                <div className="relative">
                  <img 
                    src="/tennis.png" 
                    alt="Tennis Court" 
                    className="w-full h-80 object-cover rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300" 
                  />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  From Gyms to Grounds
                  <span className="block text-blue-600">Find Your Perfect Spot</span>
                </h1>
                
                <div className="space-y-6">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 Discover & Book</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Find top-rated fitness studios, sports courts, and open fields near you. Whether training solo or with friends, discover the perfect space in seconds. Filter by sport, time and location.
                    </p>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🏟️ Get Discovered</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Connect with thousands of players looking for the perfect place to play. Join a community that shares your passion for sports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Owner Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            {/* Image Side */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl blur opacity-20"></div>
                <div className="relative">
                  <img 
                    src="/tennis.png" 
                    alt="Venue Management" 
                    className="w-full h-80 object-cover rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300" 
                  />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  List Your Venue on
                  <span className="block text-green-600">PlayMate</span>
                </h1>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-green-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🚀 Fill Slots Faster</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Own a turf, court, gym, or training facility? PlayMate helps to fill your slots faster and maximize your bookings.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg border border-blue-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">📅 Simple Management</h3>
                    <p className="text-gray-700 leading-relaxed">
                      List your venue, set your schedule, and start accepting bookings from athletes nearby. Get discovered by thousands of players looking for the perfect place to play.
                    </p>
                  </div>
                </div>
                
                <button onClick={()=> router.push('/dashboard')}className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
                  Go to Venues Section
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Elevate Your Game?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the PlayMate community today and discover a new way to connect, play, and grow in sports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <button onClick={handleClick} className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}