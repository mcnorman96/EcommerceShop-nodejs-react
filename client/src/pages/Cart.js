import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { decreaseQuantity, incrementQuantity } from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopTexts = styled.div`
display: block;
width: max-content; 
margin: 0 auto;
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  // Getting cart item by using the function useSelctor
  const cart = useSelector(state=>state.cart);
  //Stripetoken to enable payment method. 
  const [stripeToken, setStripeToken] = useState(null);
  const [bagCounter, setBagCounter] = useState(0);
  const quantity = 1;
  const dispatch = useDispatch();


  //useNavigate hook to redirect to page after submitting order. 
  const history = useNavigate();

  //Setting the stripe token
  const onToken = (token) => {
    setStripeToken(token);
  };
  
  useEffect(() => {
    // Get the token id and amount when needing to pay.
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id, 
          amount: cart.total * 100, 
          
        });
        history.push("/success", {data:res.data});
      } catch {

      }
    }
    // Only getting the makeRequest function if stripetoke and cart.total is over 1.
    stripeToken && cart.total >= 1 && makeRequest();

  }, [stripeToken, cart.total, history]);

  useEffect(() => {
    let bagcounter = 0;
    cart.products.map((product)=> (
      setBagCounter( bagcounter += product.quantity)
    ));

  }, [cart]);



  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopTexts>
            <TopText>Shopping Bag({bagCounter})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product)=> (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Model:</b> {product.model}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={ 
                      () => {
                        dispatch(
                          incrementQuantity({...product, quantity })
                        );
                      } }/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={ 
                      () => {
                        dispatch(
                          decreaseQuantity({...product, quantity })
                        );
                      } }/>
                  </ProductAmountContainer>
                  <ProductPrice>{product.price * product.quantity} DKK</ProductPrice>
                </PriceDetail>
              </Product>
            ))};
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{cart.total} DKK</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>45 DKK</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-45 DKK</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total} DKK</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Beats by Me"
              image="https://firebasestorage.googleapis.com/v0/b/normanisfire.appspot.com/o/headphones.jpg?alt=media&token=d11abed6-6b92-4286-8e96-285fde4673d6"
              billingAddress
              shippingAddress
              description={`Your total is ${cart.total} DKK`}
              amount={cart.total*100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>Checkout NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;