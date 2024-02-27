import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return <StyledSpinner></StyledSpinner>;
};

export default Spinner;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const StyledSpinner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-left-color: #003558;
  margin: 1rem auto;
  animation: ${rotate} 2s ease infinite;
`;
