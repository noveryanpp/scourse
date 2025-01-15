import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import PageHead from '../components/layout/PageHead'

const Forum = () => {
  const pageTitle = 'Forum';
  const pageDescription = 'Chat with Friends, Instructors, and Others';
  const pageHeadBackground = 'from-red-600 via-amber-600 to-amber-600';

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen w-screen bg-gray-100 top-0 absolute">
        <div className="w-full">
          <PageHead 
            pageTitle={pageTitle} 
            pageHeadBackground={pageHeadBackground} 
            pageDescription={pageDescription}
          />
        </div>
      </div>
    </div>
  )
}

export default Forum