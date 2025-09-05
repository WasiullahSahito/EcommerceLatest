import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Payment from "./pages/payment/Payment";
import Shop from "./pages/Shop/Shop";
import Navbar from "./components/navbar/Navbar";
import Navigation from "./components/navigation/Navigation";
import Products from "./pages/products/Products";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import Wishlist from "./pages/Wishlist/Wishlist"; // Import Wishlist page

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Navigation />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        <Route path="/product/:id" element={<ProductDetailPage />} />

        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/my-list" element={<Wishlist />}></Route> {/* Wishlist Route */}
        <Route path="/paymentgateway" element={<Payment />}></Route>

        <Route path="/products" element={<Products />}></Route>
      </Route>

      {/* SignIn/SignUp pages - Layout ke bahar (without navbar/footer) */}
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;