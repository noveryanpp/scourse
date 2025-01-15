import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import PageHead from '../components/layout/PageHead'
import Item from '../components/Item'
import ItemCard from '../components/card/ItemCard'


const Shop = () => {
  const pageTitle = 'Items Shop';
  const pageDescription = 'Buy Bills, Boosters, and Avatars Here!!!';
  const pageHeadBackground = 'from-orange-500 to-red-600';
  const cardType = 'Item';

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
          <div className='max-w-7xl flex flex-wrap mx-auto justify-center gap-4'>
            <div className="flex-none snap-start w-80">
              <ItemCard/>
            </div>
            <div className="flex-none snap-start w-80">
              <ItemCard/>
            </div>
            <div className="flex-none snap-start w-80">
              <ItemCard/>
            </div>
            <div className="flex-none snap-start w-80">
              <ItemCard/>
            </div>
            <div className="flex-none snap-start w-80">
              <ItemCard/>
            </div>
            <div className="flex-none snap-start w-80">
              <ItemCard/>
            </div>
            <div className="flex-none snap-start w-80">
              <ItemCard/>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop