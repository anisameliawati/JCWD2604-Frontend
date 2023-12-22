/** @format */
import { products } from "../database/data.json";
import { useState, useEffect } from "react";
import CardListComponents from "../components/cardlist";
import NavbarComponent from "../components/navbar";

function HomePage() {
  const [data, setData] = useState([...products]);
  const [filtered, setFiltered] = useState([...products]);

  const [search, setSearch] = useState("");

  const filter = () => {
    // console.log(data);
    const filtered = data.filter((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filtered);
  };

  useEffect(() => {
    filter();
  }, [search, data]);
  //component did update
  return (
    <>
      <NavbarComponent setSearch={setSearch} />
      <CardListComponents
        products={filtered}
        search={search}
        setProducts={setData}
      />
    </>
  );
}
export default HomePage;
