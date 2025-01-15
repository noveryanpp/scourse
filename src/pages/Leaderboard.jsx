import React, { useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import PageHead from '../components/layout/PageHead'

import {
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline'


const Leaderboard = () => {
  const pageTitle = 'Leaderboard';
  const pageDescription = 'Get in the Top 100 Leaderboard and Get An Achievement!!!';
  const pageHeadBackground = 'from-purple-600 to-pink-600';

  const [isWeeklyLeaderboardTab, setIsWeeklyLeaderboardTab] = useState(false)

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
        <div className="max-w-7xl mx-auto px-2 md:pl-20 overflow-hidden">
          <div className={`flex flex-row w-full gap-1 ${isWeeklyLeaderboardTab ? '-translate-x-full lg:translate-x-0' : ''} transition ease-in-out duration-300`}>
            <div className="flex-auto relative min-w-full lg:min-w-0 max-w-4xl">
              <div className="flex items-center justify-between mt-8 mb-5 mx-2 text-gray-900">
                <h2 className="text-4xl font-semibold text-center">All Time</h2>
                <button className="bg-transparent lg:hidden p-0" onClick={() => setIsWeeklyLeaderboardTab(!isWeeklyLeaderboardTab)}>This Week<ChevronRightIcon className="inline text-gray-900 h-8 w-8" /></button>
              </div>
              <div className="relative bg-white backdrop-blur-sm rounded-3xl p-8 border border text-gray-900">
                <div className="space-y-3">
                  <div className="flex flex-row items-center">
                    <div className="font-semibold w-48">
                      Position
                    </div>
                    <div className="font-semibold w-full">
                      Name
                    </div>
                    <div className="font-semibold w-48 text-center">
                      Total Scores
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                  <div className="flex flex-row items-center">
                    <div className="w-48 flex flex-row items-center">
                      <div className="font-semibold pr-5">
                        1
                      </div>
                      <div className="flex w-12 h-12 rounded-full bg-white/10 items-center justify-center"></div>
                    </div>
                    <div className="font-semibold w-full">
                      John Doe
                    </div>
                    <div className="font-semibold w-48 text-center">
                      80039
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-auto relative min-w-full lg:min-w-0 max-w-4xl">
              <div className="flex items-center justify-between mt-8 mb-5 mx-2 text-gray-900">
                <button className="bg-transparent lg:hidden p-0" onClick={() => setIsWeeklyLeaderboardTab(!isWeeklyLeaderboardTab)}><ChevronLeftIcon className="inline text-gray-900 h-8 w-8" />All Time</button>
                <h2 className="text-4xl font-semibold text-center">This Week</h2>
              </div>
              <div className="relative bg-white backdrop-blur-sm rounded-3xl p-8 border border text-gray-900">
                <div className="space-y-3">
                  <div className="flex flex-row items-center">
                    <div className="font-semibold w-48">
                      Position
                    </div>
                    <div className="font-semibold w-full">
                      Name
                    </div>
                    <div className="font-semibold w-48 text-center">
                      Total Scores
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                  <div className="flex flex-row items-center">
                    <div className="w-48 flex flex-row items-center">
                      <div className="font-semibold pr-5">
                        1
                      </div>
                      <div className="flex w-12 h-12 rounded-full bg-white/10 items-center justify-center"></div>
                    </div>
                    <div className="font-semibold w-full">
                      John Doe
                    </div>
                    <div className="font-semibold w-48 text-center">
                      80039
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard