
import Header from "./components/Header";
import About from "./components/About";
import Home from "./components/Home";
import Product from "./components/Product";
import ProductDetail from "./components/Productdetails";
import { BrowserRouter as Router,Routes,Route  } from "react-router-dom";
import CartPage from "./components/Cart";
import CheckoutPage from "./components/Checkout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BookForm from "./components/books";
import AdminLogin from "./components/Adminlogin";
import './App.css'
function App() {
  return<>
 <Router>
  <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/admin" element={<AdminLogin/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/home" element={<Home/>} />
    <Route path='/about' element={<About />}  />
    <Route path='/book' element={<BookForm />}  />
    <Route path='/product' element={<Product />}  />
    <Route path='/products/:id' element={<ProductDetail />}  />
    <Route path='/cart' element={<CartPage />}  />
    <Route path='/checkout' element={<CheckoutPage />}  />

  </Routes>
 </Router>
  </>
}

export default App;
