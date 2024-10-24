import Carousel from "../components/Carousel"
import Footer from "../components/Footer";
import Categories from "../components/categoriesHome";


function Home() {
  return (
    <div>
        <Carousel />
        <Categories />
        <Footer />
    </div>
  );
}

export default Home;