import React, { useCallback, useEffect, useState } from "react";
import QRScanner from "../components/QRScanner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateScanData } from "../features/scan/scanSlice";

const Scan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isShow, setShow] = useState(false);

  const handleScan = useCallback((data) => {
    console.log(`App.js 스캔 결과: ${data}`);
    if (data) {
      dispatch(updateScanData(data));
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const getVideoInfo = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        getVideoInfo && setShow(true);
      } catch (error) {
        window.alert("카메라 권한을 확인해주세요: " + error);
        navigate(-1);
      }
    };
    getPermission();
  }, []);

  return isShow && <QRScanner onScan={handleScan} />;
};

export default Scan;
