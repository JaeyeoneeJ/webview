import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import(/* webpackChunkName: "home" */ "./routes/Home"));
const Scan = lazy(() => import(/* webpackChunkName: "scan" */ "./routes/Scan"));

function App() {
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
