import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import(/* webpackChunkName: "home" */ "./routes/Home"));
const Scan = lazy(() => import(/* webpackChunkName: "scan" */ "./routes/Scan"));

function App() {
  useEffect(() => {
    navigator?.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        console.log("jjy 카메라 및 마이크 엑세스가 허용되었습니다.");
      })
      .catch(function (err) {
        console.log(
          "jjy 카메라 및 마이크 액세스를 거부하거나 오류가 발생했습니다: ",
          err
        );
      });
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
