import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h3`
  margin-top: 0;
`;
const Button = styled.button`
  background-color: #ffffff;
  padding: 4px 8px;
  border: 3px solid gray;
  border-radius: 10px;
  color: #000000;
  font-weight: bold;

  &:hover {
    background-color: gray;
    color: #ffffff;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.scan);

  return (
    <Wrapper>
      <Title>QR Code Scanner</Title>
      <Button onClick={() => navigate("/scan")}>ScanButton</Button>
      {data && <p>Scan 결과: {data.text}</p>}
    </Wrapper>
  );
};

export default Home;
