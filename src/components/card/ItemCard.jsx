import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Modal } from "flowbite-react";
import { CircleStackIcon, BanknotesIcon, BoltIcon } from "@heroicons/react/16/solid";

import { useUser } from "../../hooks/useUser.js"
import { MIDTRANS_CLIENT_KEY, API_URL } from "../../utils/constants.js";


const ItemCard = ({ item }) => {
  const {user, loading} = useUser();
  const [openModalValidation, setOpenModalValidation] = useState(false);
  const [openModalAmount, setOpenModalAmount] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const [amount, setAmount] = useState(1);

  const handlePayment = async () => {
    if(item.price.currency === "IDR"){
      try {
        const response = await axios.post(`${API_URL}/api/payment/purchase`,
          {
            userId: user._id,
            username: user.username,
            itemDetails: item,
            amount: amount
          }
        );
        const token = response.data;
        window.snap.pay(token);
      } catch (error) {
        console.error(error);
      }
    } else {
      // todo req post buy items
    }
  }

  const handlePurchase = () => {
    if(item.multiPurchase){
      setOpenModalAmount(true);
    } else {
      setOpenModalValidation(true);
    };

  }

  const handleAccept = () => {
    if (openModal) {
      if(item.multiPurchase){
        setOpenModal(false);
        setOpenModalAmount(true);
      };
      if(item.price.currency === "IDR"){
        handlePayment();
      } else {
        handlePurchase();
      }
    } else if (openModalAmount) {
      setOpenModalAmount(false);
      handlePayment();
    }
  }

  return (
    <>
      <div className="group max-w-xs 2xl:max-w-72 xl:max-w-sm lg:max-w-md md:max-w-md sm:max-w-screen bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 ease-in-out">
        <a href="#">
          <img className="rounded-t-lg" src="images/16x10.png" alt="product image" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition-color duration-300">{item.name}</h5>
            <h3 className="text-sm text-gray-600">{item.description}</h3>
          </a>
          <div className="flex items-center mt-5">
            <button
              className="text-white w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:bg-blue-800 hover:text-blue-300 hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => handlePurchase()}
            >
              <div className="inline">{item.price.currency === "Scoin" ? <CircleStackIcon className="w-5" /> : item.price.currency === "Scash" ? <BanknotesIcon className="w-5" /> : "Rp"}</div>
              {item.price.amount}
            </button>
          </div>
        </div>
      </div>
      <Modal show={openModalValidation} size="md" color="white" onClose={() => setOpenModalValidation(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <div className="w-10 h-10">{item.image}</div>
            <h3 className="mb-5 text-lg text-white">
              Are you sure you want to buy this item?
            </h3>
            <div className="flex justify-center gap-4">
                <button className="bg-blue-500 rounded-lg text-white" onClick={() => handlePayment()}>
                  Yes, I'm sure
                </button>
                <button className="bg-gray-100 rounded-lg text-gray-900" onClick={() => setOpenModalValidation(false)}>
                  No, cancel
                </button>
              </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={openModalAmount} size="md" color="white" onClose={() => setOpenModalAmount(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <div className="w-10 h-10">{item.image}</div>
            <h3 className="mb-2 text-lg text-white">
              How much you want to buy?
            </h3>
            <input type="number" className="rounded-lg text-gray-900" placeholder="E.g. 1, 10, 100" onChange={(e) => setAmount(e.target.value)}/>
            <div className="flex justify-center gap-4 mt-4">
                <button className="bg-blue-500 rounded-lg text-white" onClick={() => setOpenModalValidation(true)}>
                  Continue Payment
                </button>
                <button className="bg-gray-100 rounded-lg text-gray-900" onClick={() => setOpenModalAmount(false)}>
                  No, cancel
                </button>
              </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ItemCard;
