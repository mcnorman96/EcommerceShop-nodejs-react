import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile, tablet } from '../Responsive';

const Container = styled.div`
  //flex: 1;
  width: calc(33% - 10px);
  margin: 5px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  & > a {
    width: 100%; 
    height: 100%; 
    color: black;
    text-align: center; 
    text-decoration: none;
  }
  ${props => {
    if (props.props?.color === 'white') return `
          color: white;
          a {
            color: white;
          }
        `
  }}
    &:hover {
    opacity: 0.8;
  }

  ${tablet({ width: "calc(50% - 10px)" })}
`;

const ImageContainer = styled.div`
  margin: 5px 5px 10px;
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  ${mobile({ height: "200px" })}
`;

const Image = styled.img`
  height: 100%;
  z-index: 2;
  object-fit: cover; 
  width: 100%;
`;

const Title = styled.h3`
  margin-bottom: 10px;
  ${props => {
    if (props.props === 'white') return `
        color: white;
        `
  }}
`;

const Price = styled.b`
  font-weight: bold;
  ${props => {
    if (props.props === 'white') return `
        color: white;
        `
  }}
`;

const Product = ({ item, color }) => {
  return (
    <Container key={item._id}>
      <Link to={`/product/${item._id}`}>
        <ImageContainer>
          <Image src={item.img ? item.img : `https://firebasestorage.googleapis.com/v0/b/normanisfire.appspot.com/o/headphones2.jpg?alt=media&token=880bd832-61c6-420a-9ce2-e03e8e680887`} />
        </ImageContainer>
        <Title props={color}>{item.title}</Title>
        <Price props={color}>{item.price} DKK</Price>
      </Link>
    </Container>
  );
};

export default Product;
