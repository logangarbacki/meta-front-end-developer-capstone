import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Error from "./pages/Error";
import Reserve from "./pages/Reserve";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
