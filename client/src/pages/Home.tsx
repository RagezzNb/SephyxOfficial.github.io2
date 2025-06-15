import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductCatalog from "@/components/ProductCatalog";
import BrandStory from "@/components/BrandStory";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <ProductCatalog />
      <BrandStory />
      <Newsletter />
      <Footer />
      <ShoppingCart />
    </div>
  );
}
