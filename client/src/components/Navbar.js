import { Badge, Menu } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import { ShoppingCartOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {mobile, tablet} from "../Responsive";

const Container = styled.div`
  height: 60px; 
  ${mobile({ height: "50px" })}
  z-index: 99;
  background-color: #161616;
  color: white;
  height: 75px;
  display: flex;
  align-items:center;
  width: 100%;
  ${props => {
        if (props.props?.name === 'Home') return `
        position: absolute;
        top: 0;
        width: 100%;
        color: white;
        background: transparent;
        `
    }}
`
const Wrapper = styled.div`
  padding: 10px 20px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;


`
const Left = styled.div`
  flex: 1;
  display: flex; 
  align-items: center;
  a {
    text-decoration: none;
  }
`

const Center= styled.div`
  display: flex; 
  flex-wrap: wrap;
  justify-center: center;
  text-align: center;
  position: relative;
  a {
    text-decoration: none;
  }
  ${tablet({ order: "2", marginLeft: "10px" })}
`
const Nav = styled.nav`
  display: flex; 
  flex-wrap: wrap;
  justify-center: center;
  text-align: center;
  font-size: 25px;
  a {
    text-decoration: none;
  }
  ${tablet({
    position: "absolute",
    flexDirection: "column",
    right: "0",
    top: "50px",
    background: "#161616",
    padding: "20px"
  })}
`

const Logo = styled.h1`
  font-weight: bold;
  text-align:center;
  color: white; 
  text-decoration: none;
  ${tablet({
    fontSize: "25px",
  })}
`

const Right = styled.div`
  flex: 1;
  display : flex; 
  align-items: center; 
  justify-content: flex-end;
  a {
    text-decoration: none;
  }
`
const MenuItem = styled.div`
  font-size: 16px; 
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  color: white;
  .MuiBadge-colorPrimary {
    background-color:red;
    color: white;
  }
  ${tablet({
    marginLeft: "10px", 
    marginRight: "10px", 
    marginBottom: "10px"
  })}
  
`

const NavbarButton = styled.div`
  cursor: pointer; 
  display: none;
  ${tablet({ display: "block" })}
`;





const Navbar = ({page}) => {

  const quantity = useSelector(state => state.cart.quantity )
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [toggleMenu, setToggleMenu] = useState(false)

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

    return () => {
            window.removeEventListener('resize', changeWidth)
        }
  }, [])

  return (
    <Container props={page}>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>Beats by Me</Logo>
          </Link>
        </Left>
        <Center>
          {(toggleMenu || screenWidth > 992) && (
            <Nav>
              <Link to="/products">
                <MenuItem>All Products</MenuItem>
              </Link>
              <Link to="/products/headphones">
                <MenuItem>Headphones</MenuItem>
              </Link>
              <Link to="/products/earphones">
                <MenuItem>Earphones</MenuItem>
              </Link>
              <Link to="/products/speakers">
                <MenuItem>Speakers</MenuItem>
              </Link>
            </Nav>
          )}
          <NavbarButton>
            <MenuIcon onClick={toggleNav} />
          </NavbarButton>
        </Center>
        <Right>
        <Link to="/login">
          <MenuItem>Sign IN</MenuItem>
        </Link>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>  
      </Wrapper>
    </Container>
  );
};

export default Navbar;
