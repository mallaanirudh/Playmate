// app/about/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center py-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-4 text-indigo-700"
        >
          About <span className="text-indigo-500">Us</span>
        </motion.h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to <strong>PlayMate</strong> — where booking meets community, learning, and growth.
        </p>
      </section>

      {/* What We Offer */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
        {[
          { title: 'Book Venues & Events', emoji: '🎯', desc: 'Find and reserve the perfect spaces with ease.' },
          { title: 'Build Communities', emoji: '🤝', desc: 'Join or create groups to connect with others.' },
          { title: 'Create & Join Teams', emoji: '🏆', desc: 'Form teams or join existing ones effortlessly.' },
          { title: 'Learn & Improve', emoji: '📚', desc: 'Grow your skills with workshops and resources.' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all"
          >
            <div className="text-4xl mb-4">{item.emoji}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="max-w-4xl mx-auto text-center py-12 space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-indigo-700"
        >
          Why Choose Us?
        </motion.h2>
        <ul className="space-y-4 text-gray-700">
          {[
            '🚀 Seamless booking experience',
            '🌐 Vibrant and active communities',
            '🛠️ Tools to manage your teams and events',
            '💬 Easy ways to connect and communicate',
          ].map((point, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-lg"
            >
              {point}
            </motion.li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center py-16">
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold mb-4 text-indigo-600"
        >
          Be Part of Something Bigger
        </motion.h3>
        <p className="text-gray-600 mb-6">
          Start your journey with us today — book, connect, and grow.
        </p>
        <Link href="/venues">
          <div className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition">
            Explore Venues
          </div>
        </Link>
      </section>
    </div>
  )
}
