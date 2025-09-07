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
import Wishlist from "./pages/Wishlist/Wishlist";

// This Layout component wraps every page that is its child
const Layout = () => {
  return (
    <div>
      <Navbar />
      <Navigation />
      <ScrollRestoration />
      {/* Child routes will be rendered here */}
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    // The Layout is the parent for all pages that need a Navbar and Footer.
    <Route path="/" element={<Layout />}>
      {/* --- Main Pages --- */}
      <Route index element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/my-list" element={<Wishlist />} />
      <Route path="/paymentgateway" element={<Payment />} />

      {/* --- Account Pages (CORRECTLY PLACED INSIDE LAYOUT) --- */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
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