import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientLogoMarques from '../ClientLogoMarque/ClientLogoMarques';
import Benefits from '../Benifit/Benefits';
import BeMarcent from '../BeMarcent/BeMarcent';
import HowItWorks from '../HowItWorks/HowItWorks';
import TestimonialSlider from '../TestimonialSlider/TestimonialSlider';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <ClientLogoMarques></ClientLogoMarques>
      <Benefits></Benefits>
      <BeMarcent></BeMarcent>
      <TestimonialSlider></TestimonialSlider>
    </div>
  );
};

export default Home;