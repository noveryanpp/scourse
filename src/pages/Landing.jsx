import React from 'react'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import CallToAction from '../components/landing/CallToAction'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <Features />
      <CallToAction />
    </div>
  )
}

export default Landing