import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import PageHead from '../components/layout/PageHead'
import Quest from '../components/Quest'

const Quests = () => {
  const pageTitle = 'Quests';
  const pageDescription = 'Do Quests and Get Free Rewards!!!';
  const pageHeadBackground = 'from-purple-600 to-fuchsia-600';

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
        <div className="mx-auto py-6 px-2 md:px-6 lg:px-8">
          <div className="max-w-7xl flex flex-col gap-4 mx-auto justify-center">
            <div className="flex-none"><Quest /></div>
            
            <Quest />
            <Quest />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quests