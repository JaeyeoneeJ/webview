import React, { useCallback, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackArrow from "./svg/BackArrow";

const ScanWrapper = styled.div`
  & > section > div {
    width: auto !important;
    height: 100vh;
    padding: 0 !important;
  }
  & > section > div > video {
    width: auto !important;
    left: 50% !important;
    transform: translateX(-50%) scaleX(-1) !important;
  }
`;
const BgWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BgContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const BgBox = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
`;
const TransparentBox = styled.div`
  min-width: 200px;
  min-height: 200px;
  background-color: transparent;
  border: 5px solid #ffffff;
`;
const BackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 12px 10px 8px;
  border-radius: 50%;
  box-sizing: border-box;
  width: 50px;
  height: 50px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const SCAN_DELAY = 1000; // scan interval

const QRScanner = ({ onScan }) => {
  const navigate = useNavigate();
  const handleScan = useCallback(
    (data) => {
      console.log("jjy test");
      if (data && typeof onScan === "function") {
        onScan(data); // 스캔된 데이터를 부모 컴포넌트로 전달
      }
    },
    [onScan]
  );

  const handleError = useCallback((err) => {
    console.error(err);
  }, []);

  return (
    <ScanWrapper>
      {/* ui */}
      <BgWrapper>
        <BackButton onClick={() => navigate(-1)}>
          <BackArrow fill={"#ffffff"} />
        </BackButton>
        <BgBox />
        <BgContainer>
          <BgBox />
          <TransparentBox />
          <BgBox />
        </BgContainer>
        <BgBox />
      </BgWrapper>

      {/* scanComponent */}
      <QrReader
        scanDelay={SCAN_DELAY}
        onError={handleError}
        onResult={handleScan}
      />
    </ScanWrapper>
  );
};

export default QRScanner;
