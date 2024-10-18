import "./styles/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="HEADER">
      <div className="container">
        <h3>Depi_E-Commerce</h3>
        <nav>
          <Link className="Menu" to="/menu">Menu</Link>  
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/Contact-Us">Contact Us</Link> 
          <Link to="/Faqs">Faqs</Link>
          <Link to="/Categories">
            <button className="dropbtn" onClick={toggleDropdown}>
                  Categories
            </button>
        </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;