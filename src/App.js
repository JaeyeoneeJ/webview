import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import(/* webpackChunkName: "home" */ "./routes/Home"));
const Scan = lazy(() => import(/* webpackChunkName: "scan" */ "./routes/Scan"));

function App() {
  useEffect(() => {
    navigator?.mediaDevices
      ?.getUserMedia({ video: true })
      .then(function (stream) {
        console.log("카메라 권한이 허용되었습니다: ", stream);
      })
      .catch(function (err) {
        console.log("카메라 권한을 거부하거나 오류가 발생했습니다: ", err);
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
