import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";
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
    transform: translateX(-50%)
      ${({ $isMobile, $isDev }) => ($isDev || !$isMobile) && `scaleX(-1)`} !important;
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

  const [isShow, setShow] = useState(false);
  const videoBoxRef = useRef(null);

  const envMode = useMemo(() => {
    const isDevelopment = process.env.REACT_APP_LAUNCH_MODE === "LOCAL";
    const isMobile = isDevelopment
      ? true
      : /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const includeLabel = isDevelopment ? "" : "back";

    return { isDevelopment, isMobile, includeLabel };
  }, []);

  const handleScan = useCallback(
    (data) => {
      if (data && typeof onScan === "function") {
        onScan(data); // 스캔된 데이터를 부모 컴포넌트로 전달
      }
    },
    [onScan]
  );

  const handleError = useCallback((err) => {
    console.error(err);
  }, []);

  useEffect(() => {
    const errorCase = (error) => {
      window.alert("카메라 권한을 확인해주세요: " + error);
      navigate(-1);
    };
    const getPermission = async (videoEl) => {
      try {
        const timeoutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error("getUserMedia timed out"));
          }, 2000); // 2초 후에 타임아웃 처리
        });

        const getVideoFunc = async () => {
          if (envMode.isMobile) {
            let mediaStream;
            await navigator.mediaDevices
              .enumerateDevices()
              .then(async (devices) => {
                const cameraDevices = devices.filter(
                  (device) =>
                    device.kind === "videoinput" &&
                    device.label.includes(envMode.includeLabel)
                );
                if (cameraDevices.length > 0) {
                  const cameraDevice = cameraDevices[cameraDevices.length - 1];
                  const constraints = {
                    video: { deviceId: cameraDevice.deviceId },
                    audio: false,
                  };
                  return await navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then((stream) => {
                      // 미디어 스트림을 사용하여 비디오 요소에 표시
                      if (videoEl?.srcObject) {
                        videoEl.srcObject = stream;
                      }
                      mediaStream = stream;
                    })
                    .catch((error) => {
                      console.error("카메라 액세스 실패:", error);
                    });
                }
              });
            return mediaStream;
          } else {
            return navigator.mediaDevices.getUserMedia({ video: true });
          }
        };

        const getVideoInfo = await Promise.race([
          getVideoFunc(),
          timeoutPromise,
        ]);
        getVideoInfo?.id ? setShow(true) : errorCase("NOTHING");
      } catch (error) {
        errorCase(error);
      }
    };

    if (videoBoxRef.current) {
      const boxEl = videoBoxRef.current;
      const videoEl = boxEl.querySelector("video");
      getPermission(videoEl);
    }
  }, [navigate, envMode]);

  return (
    <ScanWrapper
      ref={videoBoxRef}
      $isMobile={envMode.isMobile}
      $isDev={envMode.isDevelopment}
    >
      {/* ui */}
      {isShow ? (
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
      ) : (
        <BgWrapper style={{ backgroundColor: "#fff" }}>
          <p>loading camera</p>
          <PulseLoader color={"#acacac"} size={10} margin={4} />
        </BgWrapper>
      )}

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
