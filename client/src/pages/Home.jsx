import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem'

const Home = () => {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
console.log(saleListings);

useEffect(() => {
  const fetchOfferListings = async () => {
    try {
      const res = await fetch('/api/listing/get?offer=true&limit=3');
      const data = await res.json();
      setOfferListings(data);
      fetchRentListings();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRentListings = async () => {
    try {
      const res = await fetch('/api/listing/get?type=rent&limit=3');
      const data = await res.json();
      setRentListings(data);
      fetchSaleListings();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSaleListings = async () => {
    try {
      const res = await fetch('/api/listing/get?type=sale&limit=3');
      const data = await res.json();
      setSaleListings(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchOfferListings();
}, []);

  return (
    <div className=" font-Higuen">
      {/* top */}
      <div className=" flex flex-col gap-6 py-28 px-4 max-w-6xl mx-auto">
        <h1 className=" text-slate-700 font-bold text-3xl lg:text-6xl">
          Unlocking Dreams, Building Futures:{" "}
          <span className="text-slate-500">Vasudhā</span>
          <span className=" text-slate-700">Estate</span>,
          <br />
          Your Gateway to Seamless Real Estate Solutions.{" "}
        </h1>
        <div className=" text-gray-400 text-xs sm:text-sm">
          Discover a world of possibilities with VasudhaEstate, where every
          listing is a key to exceptional living. We specialize in unlocking the
          door to your dream home or investment, offering seamless real estate
          solutions tailored to your needs.
        </div>
        <Link to={'/search'} className=" text-xs sm:text-sm text-blue-800 font-bold hover:underline">Lets start...</Link>
      </div>

      {/* swiper */}

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px] bg-fixed'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>



      {/* Listings */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap md:flex-nowrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap md:flex-nowrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4 md:flex-nowrap'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
