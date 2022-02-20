import React from 'react';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar page={Home}/>
      <Slider/>
      <Categories />
      <FeaturedProducts/>
      <Footer />
    </>
    );
};

export default Home;

