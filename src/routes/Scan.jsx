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
    const errorCase = (error) => {
      window.alert("카메라 권한을 확인해주세요: " + error);
      navigate(-1);
    };
    const getPermission = async () => {
      try {
        const timeoutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error("getUserMedia timed out"));
          }, 2000); // 2초 후에 타임아웃 처리
        });

        const getVideoInfo = await Promise.race([
          navigator.mediaDevices.getUserMedia({ video: true }),
          timeoutPromise,
        ]);

        console.log("jjy getVideoInfo", getVideoInfo);
        getVideoInfo.id ? setShow(true) : errorCase("NOTHING");
      } catch (error) {
        errorCase(error);
      }
    };
    getPermission();
  }, [navigate]);

  return isShow ? (
    <QRScanner onScan={handleScan} />
  ) : (
    <div>NotAllowedError: Permission denied</div>
  );
};

export default Scan;
