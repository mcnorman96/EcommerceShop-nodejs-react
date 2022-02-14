import React from 'react';
import styled from 'styled-components';
import { categories } from "../data";
import { tablet, mobile } from '../Responsive';
import CategoryItem from './CategoryItem';

const Container = styled.div`
  display: flex; 
  padding: 100px 50px ;
  justify-content: space-between;
  background-color: #161616;
  ${tablet({ flexDirection: "column",  })}
`

const Categories = () => {
  return (
    <Container>
      {categories.map(item => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
