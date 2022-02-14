import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Footer from '../components/Footer';
import {
  useLocation, 
} from "react-router-dom";
import { tablet } from '../Responsive';

const Container = styled.div`
  
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
   padding: 10px;
  margin-right: 20px; 
  ${tablet({ marginTop: "10px"  })}
  
`;

const Option = styled.option`

`;

const ProductList = () => {
  // Using the useLocation hook to find out which page we are on
  const location = useLocation();
  // Retrieving the category name
  const cat = location.pathname.split("/")[2];
  // Setting the filter state as an object.
  const [filters, setFilters] = useState({});
  // Setting the sort filter as Newest
  const [sort, setSort] = useState("Newest");


  // Handle filter function for setting the value of our sort
  // Then we pass it to our products components
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name] : value
    });
  }

  return (
    <Container>
        <Navbar/>
      <Title>{ cat }</Title>
      <FilterContainer>
      <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled >
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
          </Select>
          <Select name="model" onChange={handleFilters}>
            <Option disabled>
              Model
            </Option>
            <Option>Normal</Option>
            <Option>Premium</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={e => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort}/>
      <Footer />
    </Container>
    );
};

export default ProductList;
