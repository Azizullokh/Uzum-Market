import React from "react";
import AllProducts from "../components/AllProducts";
import Carousel from "../components/Carousel";
import Catalog from "../components/Katalog";

function Home() {
  return (
    <div className="bg-gray-100">
      <Carousel></Carousel>
      <AllProducts></AllProducts>
    </div>
  );
}

export default Home;
