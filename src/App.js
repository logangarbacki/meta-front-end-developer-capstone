import "./App.css";
import "./components/Toast.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Error from "./pages/Error";
import Reserve from "./pages/Reserve";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Footer from "./pages/Footer";

function App() {
  return (
    <ToastProvider>
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Hero /><Home /></>} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
        <BackToTop />
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
    </ToastProvider>
  );
}

export default App;
