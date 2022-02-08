import React from 'react';
//import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
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

