import Hero from "../components/Hero";
import HomeProductList from "../components/HomeProductList";

export default function Home() {
  return (
    <div className="main-container">
      <Hero />
      <HomeProductList />
    </div>
  );
}
