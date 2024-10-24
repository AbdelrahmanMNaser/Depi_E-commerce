import { Provider } from "react-redux";
import "./App.css";
import Routing from "./Routing";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Carousel from "./components/Carousel"
import Footer from "./components/Footer";
import Categories from "./components/categoriesHome";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <h1 className="text-center text-green-600">DEPI E-Commerce</h1>
        <Carousel />
        <Categories />
        <Footer />
        <Routing />
      </Router>
    </Provider>
  );
}

export default App;