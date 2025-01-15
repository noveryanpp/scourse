import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, PlayCircleIcon, SparklesIcon, AcademicCapIcon, UserGroupIcon, TrophyIcon } from '@heroicons/react/24/outline'

const CallToAction = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-700">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
      
      <div className="absolute top-0 left-0 -translate-y-12 -translate-x-12 w-[45rem] h-[45rem] bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 translate-y-12 translate-x-12 w-[45rem] h-[45rem] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <SparklesIcon className="w-5 h-5 text-blue-200" />
              <span className="text-blue-100 font-medium">
                Start Learning Today
                </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Transform Your Future With 
              <span className="block mt-2 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Interactive Learning
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 leading-relaxed">
              Join our community of learners and start your journey towards mastery. Experience education reimagined for the modern world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" 
                className="group inline-flex items-center px-8 py-4 rounded-2xl text-blue-700 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Get Started Free
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-2xl"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <UserGroupIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">10K+ Students</div>
                    <div className="text-sm opacity-75">Active Learners</div>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <AcademicCapIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">500+ Courses</div>
                    <div className="text-sm opacity-75">Expert-led Content</div>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <TrophyIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">95% Success Rate</div>
                    <div className="text-sm opacity-75">Course Completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
    </div>
  )
}

export default CallToAction