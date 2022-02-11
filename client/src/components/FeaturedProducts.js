import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from "axios";

const Container = styled.div`
  padding: 50px 100px;
  background-color: #3f0d12;
  background-color: #000000;
  background-image: linear-gradient(315deg, #000000 0%, #b82e1f 74%);
`;

const Wrapping = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Headline = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 900;
  color: white;
`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const FeaturedProducts = () => {

  // Defining product state as an array to populate with api items
  const [products, setProducts] = useState([]);

  useEffect(()=> {
    const getProducts = async () => {
      try{
        const res = await axios.get("http://localhost:5000/api/products");
       
        setProducts(res.data);

      } catch(err) {

      }
    } 
    getProducts();
  });

  return (
    <Container>
      <Wrapping>
        <Headline>MOST SOLD PRODUCTS</Headline>
        <Wrapper>
          {products.slice(0, 6).map((item) =>(
            <Product color="white" item={item} key={item._id} />
          ))}
        </Wrapper>
      </Wrapping>
    </Container>
  );
};

export default FeaturedProducts;
