import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 30px; 
  background-color: red; 
  color: white;
  display: flex; 
  align-items: center; 
  font-weight: bold;
  justify-content: centeR;
`
const Announcement = () => {
  return (
    <Container>
      Super deal
    </Container>
  );
};

export default Announcement;
