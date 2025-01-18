import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../components/layout/Sidebar'
import PageHead from '../components/layout/PageHead'
import ItemCard from '../components/card/ItemCard'
import { MIDTRANS_CLIENT_KEY, API_URL } from "../utils/constants";

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
    script.onload = () => resolve();
    document.body.appendChild(script);
  })
}

const Shop = () => {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageTitle = 'Items Shop';
  const pageDescription = 'Buy Bills, Boosters, and Avatars Here!!!';
  const pageHeadBackground = 'from-orange-500 to-red-600';
  const cardType = 'Item';

  useEffect(() => {
    const fetchItems = async () => {
      try{
        const respose = await axios.get(`${API_URL}/api/item/`);
        setItems(respose.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch items");
        setLoading(false);
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
    insertSnapScript();
  }, [])

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
            {loading ? (
              <div className="flex items-center justify-center w-full p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 p-4">{error}</div>
            ) : (
              items.map((item) => (
                <div key={item._id} className="flex-none snap-start w-80">
                  <ItemCard item={item} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop