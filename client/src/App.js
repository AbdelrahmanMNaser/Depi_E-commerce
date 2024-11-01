import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from "./pages/productDetails";
import Routing from "./Routing";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main>
          <Routing />
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
