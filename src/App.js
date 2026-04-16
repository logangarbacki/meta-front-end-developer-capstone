import "./App.css";
import "./components/Toast.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import NavProgress from "./components/NavProgress";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Error from "./pages/Error";
import Reserve from "./pages/Reserve";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Bookings from "./pages/Bookings";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Footer from "./pages/Footer";

function App() {
  return (
    <ThemeProvider>
    <ToastProvider>
    <AuthProvider>
      <CartProvider>
      <OrdersProvider>
      <BrowserRouter>
        <ScrollToTop />
        <NavProgress />
        <Navbar />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<Events />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </PageTransition>
        <Footer />
        <BackToTop />
      </BrowserRouter>
      </OrdersProvider>
      </CartProvider>
    </AuthProvider>
    </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
