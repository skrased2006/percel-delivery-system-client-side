import React from 'react';

import locetion from '../../assets/location-merchant.png'

const BeMarcent = () => {
  return (
    <div data-aos="zoom-in-up" className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] p-20 rounded-4xl my-8 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={locetion}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl text-white font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
          <p className="py-6 text-[#DADADA]">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <div className='flex gap-5'>
            <button className="btn btn-primary  bg-[#CAEB66] border-none rounded-2xl text-[#1F1F1F]">Become a Merchant</button>
            <button className="btn  bg-[#03373D] text-[#CAEB66] rounded-2xl">Earn with Profast Courier</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BeMarcent;