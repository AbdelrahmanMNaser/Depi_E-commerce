import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from "./pages/productDetails";

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<ProductDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;