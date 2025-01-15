import React from 'react'
import { 
  AcademicCapIcon,
  TrophyIcon, 
  ShoppingBagIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Interactive Courses',
    description: 'Learn through engaging interactive courses designed for maximum retention.',
    icon: AcademicCapIcon,
    gradient: 'from-blue-600 to-indigo-600',
    delay: '0'
  },
  {
    name: 'Achievement System',
    description: 'Earn rewards and track your progress through our gamified learning system.',
    icon: TrophyIcon,
    gradient: 'from-purple-600 to-pink-600',
    delay: '100'
  },
  {
    name: 'Shop & Customize',
    description: 'Customize your learning experience with items from our shop.',
    icon: ShoppingBagIcon,
    gradient: 'from-orange-600 to-red-600',
    delay: '200'
  },
  {
    name: 'Community',
    description: 'Join a community of learners and share your knowledge.',
    icon: UserGroupIcon,
    gradient: 'from-green-600 to-teal-600',
    delay: '300'
  },
]

const Features = () => {
  return (
    <div className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full">
            <SparklesIcon className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 font-medium">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              A better way to learn
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of education with our cutting-edge features designed to make learning engaging and effective.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div 
              key={feature.name}
              style={{animationDelay: `${feature.delay}ms`}} 
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-fade-up"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />
              
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient}`}>
                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              
              <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {feature.name}
              </h3>
              
              <p className="mt-2 text-gray-600">
                {feature.description}
              </p>
              
             
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 right-0 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 left-0 translate-x-1/2 w-96 h-96 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </div>
  )
}

export default Features