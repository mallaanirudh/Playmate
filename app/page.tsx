'use client'
import { Waitlist } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

export default function Page() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        {/* Geometric Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(30, 58, 138, 0.05) 1px, transparent 1px),
            linear-gradient(0deg, rgba(30, 58, 138, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Floating Circles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute rounded-full bg-blue-200/30 dark:bg-blue-800/30"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>

      {/* Interactive Mouse Trail */}
      <div
        className="fixed pointer-events-none z-10 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 50,
          top: mousePosition.y - 50,
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div 
          className={`transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
          }`}
        >
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-blue-200/50 dark:bg-blue-800/50 rounded-full blur-lg opacity-70 animate-pulse" />
              <div className="relative bg-white dark:bg-blue-950 p-6 rounded-full shadow-xl border border-blue-100 dark:border-blue-900">
                <svg className="w-16 h-16 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            
            <h1 className="text-10xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-6 leading-tight">
              PlayMate
            </h1>
            
            <div className="space-y-4 mb-8">
              <p className="text-xl text-blue-800/80 dark:text-blue-200 font-medium">
                Book Premium Turfs • Find Playmates • Play Together
              </p>
              <p className="text-lg text-blue-700/70 dark:text-blue-300/80 max-w-md mx-auto">
                The ultimate platform for sports enthusiasts to discover, book, and connect
              </p>
            </div>

            {/* Feature Icons */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                  text: "Book Turfs"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  text: "Find Players"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  text: "Play & Win"
                }
              ].map((feature, i) => (
                <div key={i} className="group">
                  <div className="w-24 h-24 bg-white/80 dark:bg-blue-900/50 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-4 border border-blue-100 dark:border-blue-800 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-blue-300 dark:group-hover:border-blue-500">
                    <div className="text-blue-600 dark:text-blue-400 mb-2 transition-all duration-300 group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">{feature.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Waitlist Container */}
          <div className="relative max-w-md mx-auto">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-blue-200/30 dark:bg-blue-800/30 rounded-3xl blur-xl opacity-70 animate-pulse" />
            
            {/* Main Card */}
            <div className="relative backdrop-blur-sm bg-white/80 dark:bg-blue-950/80 rounded-2xl p-8 shadow-xl border border-blue-100/50 dark:border-blue-900/50">
              {/* Content */}
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-100 mb-2">
                    Join the Waitlist
                  </h2>
                  <p className="text-blue-600/80 dark:text-blue-300/80">
                    Be the first to experience the future of sports booking
                  </p>
                </div>

                {/* Enhanced Waitlist Component */}
                <div className="waitlist-sports-wrapper">
                  <style jsx global>{`
                    .waitlist-sports-wrapper .cl-formButtonPrimary {
                      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
                      border: none !important;
                      border-radius: 12px !important;
                      padding: 16px 32px !important;
                      font-weight: 600 !important;
                      font-size: 16px !important;
                      box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3) !important;
                      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    }
                    
                    .waitlist-sports-wrapper .cl-formButtonPrimary:hover {
                      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
                      transform: translateY(-2px) !important;
                      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4) !important;
                    }
                    
                    .waitlist-sports-wrapper .cl-formFieldInput {
                      background: rgba(255, 255, 255, 0.8) !important;
                      border: 1px solid rgba(59, 130, 246, 0.3) !important;
                      border-radius: 12px !important;
                      color: #1e3a8a !important;
                      padding: 16px 20px !important;
                      font-size: 16px !important;
                      font-weight: 500 !important;
                      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
                      transition: all 0.3s ease !important;
                    }
                    
                    .waitlist-sports-wrapper .cl-formFieldInput:focus {
                      border-color: #3b82f6 !important;
                      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
                      outline: none !important;
                    }
                    
                    .waitlist-sports-wrapper .cl-formFieldInput::placeholder {
                      color: rgba(30, 58, 138, 0.5) !important;
                    }
                    
                    .waitlist-sports-wrapper .cl-formFieldLabel {
                      color: #1e40af !important;
                      font-weight: 600 !important;
                      font-size: 14px !important;
                      margin-bottom: 8px !important;
                    }
                    
                    .waitlist-sports-wrapper .cl-rootBox {
                      color: #1e3a8a !important;
                    }
                    
                    .waitlist-sports-wrapper .cl-headerTitle {
                      color: #1e40af !important;
                      font-size: 24px !important;
                      font-weight: 700 !important;
                      margin-bottom: 8px !important;
                    }
                    
                    .waitlist-sports-wrapper .cl-headerSubtitle {
                      color: #3b82f6 !important;
                      font-size: 16px !important;
                      line-height: 1.5 !important;
                    }
                    
                    .waitlist-sports-wrapper .cl-footer {
                      margin-top: 16px !important;
                    }
                    
                    .waitlist-sports-wrapper .cl-footerActionLink {
                      color: #2563eb !important;
                      font-weight: 600 !important;
                    }

                    /* Dark mode styles */
                    .dark .waitlist-sports-wrapper .cl-formFieldInput {
                      background: rgba(30, 41, 59, 0.8) !important;
                      border: 1px solid rgba(59, 130, 246, 0.3) !important;
                      color: #f8fafc !important;
                    }
                    
                    .dark .waitlist-sports-wrapper .cl-formFieldInput::placeholder {
                      color: rgba(191, 219, 254, 0.5) !important;
                    }
                    
                    .dark .waitlist-sports-wrapper .cl-formFieldLabel {
                      color: #93c5fd !important;
                    }
                    
                    .dark .waitlist-sports-wrapper .cl-rootBox {
                      color: #f8fafc !important;
                    }
                    
                    .dark .waitlist-sports-wrapper .cl-headerTitle {
                      color: #f8fafc !important;
                    }
                    
                    .dark .waitlist-sports-wrapper .cl-headerSubtitle {
                      color: #93c5fd !important;
                    }
                    
                    .dark .waitlist-sports-wrapper .cl-footerActionLink {
                      color: #60a5fa !important;
                    }
                  `}</style>
                  <Waitlist />
                </div>

                {/* Bottom Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-sm rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                    <div className="text-xl mb-1">🏟️</div>
                    <div className="text-xs font-medium text-blue-800 dark:text-blue-200">Premium Venues</div>
                  </div>
                  <div className="bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-sm rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                    <div className="text-xl mb-1">🤝</div>
                    <div className="text-xs font-medium text-blue-800 dark:text-blue-200">Team Matching</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Badge */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center px-5 py-2 bg-blue-100/70 dark:bg-blue-900/50 backdrop-blur-sm rounded-full border border-blue-200 dark:border-blue-800">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Launching Soon • Early Access Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 py-4 text-center">
        <p className="text-sm text-blue-600/70 dark:text-blue-400/70">
          © {new Date().getFullYear()} TurfConnect. All rights reserved.
        </p>
      </div>
    </div>
  )
}