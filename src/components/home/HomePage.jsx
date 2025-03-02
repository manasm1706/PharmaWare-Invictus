import React from 'react';
import HeroPage from './HeroPage';
import ServicesPage from './ServicesPage';
import TestimonialsPage from './TestimonialsPage';
import './HomePage';

const HomePage = () => {
  return (
    <div className='home-page'>
      <HeroPage />
      <ServicesPage />
      <TestimonialsPage />
    </div>
  );
};

export default HomePage;
