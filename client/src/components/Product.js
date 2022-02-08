import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  //flex: 1;
  width: calc(33% - 10px);
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 100%;
  z-index: 2;
  object-fit: cover; 
  width: 100%;
`;

const Icon = styled.div`
  width: 40px; 
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display:flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({item}) => {
  return (
    <Container key={item._id}>
      <Image src={item.imgs ? item.img : `https://firebasestorage.googleapis.com/v0/b/normanisfire.appspot.com/o/headphones2.jpg?alt=media&token=880bd832-61c6-420a-9ce2-e03e8e680887` } />
      <Info>
        <Icon>
          <ShoppingCartOutlined/>
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined/>
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined/>
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
