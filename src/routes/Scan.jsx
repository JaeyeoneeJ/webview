import React, { useCallback } from "react";
import QRScanner from "../components/QRScanner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateScanData } from "../features/scan/scanSlice";

const Scan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleScan = useCallback((data) => {
    console.log(`App.js 스캔 결과: ${data}`);
    if (data) {
      dispatch(updateScanData(data));
      navigate("/");
    }
  }, []);

  return <QRScanner onScan={handleScan} />;
};

export default Scan;
