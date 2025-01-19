import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, PlayCircleIcon, UserGroupIcon, AcademicCapIcon, TrophyIcon, SparklesIcon } from '@heroicons/react/24/outline'

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]"></div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-40">
        <div className="pt-20 pb-16 flex items-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-full">
            <div className="lg:pl-8 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full">
                <span className="animate-pulse relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="text-blue-600 font-medium flex items-center gap-1">
                  <SparklesIcon className="w-4 h-4" />
                  New Features Available
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
                  Transform Your Learning Journey
                </span>
                <span className="block mt-2 text-2xl md:text-3xl lg:text-4xl text-gray-600">
                  Education
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Experience interactive learning like never before. Join our gamified platform where education meets innovation, powered by cutting-edge AI technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses" 
                  className="group inline-flex items-center px-8 py-4 rounded-2xl text-white bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  View Courses
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link to="/demo" 
                  className="group inline-flex items-center px-8 py-4 rounded-2xl text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  <PlayCircleIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Watch Demo
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="space-y-2 p-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <div className="flex items-center gap-2">
                    <UserGroupIcon className="w-6 h-6 text-blue-600" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">10K+</span>
                  </div>
                  <p className="text-sm text-gray-600">Active Students</p>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <div className="flex items-center gap-2">
                    <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">500+</span>
                  </div>
                  <p className="text-sm text-gray-600">Expert Courses</p>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <div className="flex items-center gap-2">
                    <TrophyIcon className="w-6 h-6 text-blue-600" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">95%</span>
                  </div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 z-0">
                <div className="w-full h-full mx-auto opacity-30 blur-lg filter">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-full transform rotate-12 animate-pulse"></div>
                </div>
              </div>
              
              <div className="relative z-10 bg-gradient-to-b from-white/80 to-blue-50/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                <div className="absolute top-2 left-2 right-2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"></div>
                
                <div className="relative mx-auto overflow-hidden rounded-2xl bg-gradient-to-b from-transparent to-blue-50/50">
                  <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:10px_10px]"></div>
                  
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                  
                  <div className="relative group">
                    <img
                      src="images/freya.png"
                      alt="Learning Platform Preview"
                      className="w-full h-[450px] object-contain transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                </div>

                <div className="absolute -top-2 -right-2 bg-white/60 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin-slow">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="absolute -top-2 -left-2 bg-white/60 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <div className="p-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce-slow">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-12 -left-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 transform hover:-translate-y-1 transition-transform duration-200 z-20">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full ring-2 ring-white shadow-lg" src="https://i.pravatar.cc/100?img=1" alt="User"/>
                    <img className="w-8 h-8 rounded-full ring-2 ring-white shadow-lg" src="https://i.pravatar.cc/100?img=2" alt="User"/>
                    <img className="w-8 h-8 rounded-full ring-2 ring-white shadow-lg" src="https://i.pravatar.cc/100?img=3" alt="User"/>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Join 10,000+ students</p>
                    <p className="text-gray-500">Learning together</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/3 -right-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 transform hover:-translate-y-1 transition-transform duration-200 z-20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                    <TrophyIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Achievement Unlocked!</p>
                    <p className="text-gray-500">Complete your first course</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-[45rem] h-[45rem] bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-[45rem] h-[45rem] bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      
      
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
    </div>
  )
}

export default Hero