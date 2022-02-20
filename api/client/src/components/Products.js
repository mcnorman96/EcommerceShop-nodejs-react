import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from "axios";
import { tablet } from '../Responsive';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
 ${tablet({
    justifyContent: "center",
    alignItems: "center",
 })}
`;

//Taking parameters from productlist as CAT, SORT, Filters
const Products = ({cat, filters, sort}) => {

  // 2 Product state. One for normal and one for the filtered products. 
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredproducts] = useState([]);

  useEffect(()=> {
    const getProducts = async () => {
      try{
        const res = await axios.get( cat 
          ? `https://react-node-webshop.herokuapp.com/api/products?category=${cat}` 
          : "https://react-node-webshop.herokuapp.com/api/products");
       
        setProducts(res.data);

      } catch(err) {

      }
    } 
    getProducts();
  }, [cat]);


  /* Checking if cat and filteredproducts
    checking for values in productlist to match our filters.
    Our filter here is Color and Model. 
  */
  useEffect(()=> {
    setFilteredproducts(
      products.filter(item => 
        Object.entries(filters).every(([key, value])=> 
        
          item[key].includes(value)
        )
      )
    )
  }, [products, cat, filters]);


  /*
  This is for sorting by Newest, Price(ASC) and Price(DESC)
  Using the sort function to compare items in array
  */
  useEffect(()=> {
    if (sort === "newest") {
      setFilteredproducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredproducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredproducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {filteredproducts.map((item) =>(
        <Product item={item} key={item._id} />
      )) }
    </Container>
  );
};

export default Products;
