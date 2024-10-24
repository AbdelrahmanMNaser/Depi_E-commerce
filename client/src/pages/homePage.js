import Carousel from "../components/Carousel";
import Categories from "../components/categoriesHome";

function Home() {
  const mockCategories = [
    { _id: "1", name: "Technology" },
    { _id: "2", name: "Fashion" },
    { _id: "3", name: "Sports" },
    { _id: "4", name: "Music" },
    { _id: "5", name: "Health" },
    { _id: "6", name: "Travel" },
    { _id: "7", name: "Food" },
    { _id: "8", name: "Education" },
  ];

  return (
    <div>
      <Carousel />
      <Categories categories={mockCategories} />
    </div>
  );
}

export default Home;
