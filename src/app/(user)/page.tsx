import Container from "@/components/Container";
import Banner from "@/components/Banner";
import Facilties from "@/components/Facilties";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
   <Container className="py-10">
    <Banner />
    <Facilties />
    <ProductList />
    </Container>
  );
}
