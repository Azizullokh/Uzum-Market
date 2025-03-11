import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHome,
  FaSearch,
} from "react-icons/fa";
import UzumLogo from "../images/Uzum-logo2.png";
import Catalog from "../components/Katalog";

function MainLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);
  const closeMenu = () => {
    setMenuOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="bg-gray-100">
      <header className="bg-white flex items-center flex-col shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center md:w-[80%]">
          <div className="w-40">
            <Link to="/">
              <img src={UzumLogo} alt="Uzum Logo" className="w-full" />
            </Link>
          </div>
          <div className="relative hidden md:flex flex-grow items-center mx-4">
            <Catalog></Catalog>
            <input
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none 
               focus:ring-2 focus:ring-blue-500 transition sm:placeholder-black placeholder-transparent"
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-4 text-gray-500" />
            {searchQuery && (
              <div className="absolute left-0 w-full bg-white text-black shadow-lg rounded-lg mt-14 z-10">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/details/${product.id}`}
                      className="px-4 py-2 border-b hover:bg-gray-200 flex items-center"
                      onClick={() => setSearchQuery("")}
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded-lg mr-3"
                      />
                      <span>{product.title}</span>
                    </Link>
                  ))
                ) : (
                  <p className="p-4 text-gray-600">No results found</p>
                )}
              </div>
            )}
          </div>
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/favorites"
              className="flex items-center text-gray-700 hover:text-red-500 transition"
            >
              <FaHeart className="text-2xl" />
              <span className="ml-1 hidden lg:inline">Favorites</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center text-gray-700 hover:text-blue-500 transition"
            >
              <FaShoppingCart className="text-2xl" />
              <span className="ml-1 hidden lg:inline">Cart</span>
            </Link>
          </div>
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden w-full mt-4 bg-white text-black shadow-md rounded-lg p-4">
            <Catalog></Catalog>
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute right-3 top-4 text-gray-500" />
              {searchQuery && (
            <div className="mt-4 max-h-60 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/details/${product.id}`}
                    className="flex items-center gap-3 p-2 border-b hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <span>{product.title}</span>
                  </Link>
                ))
              ) : (
                <p className="p-4 text-gray-600">No results found</p>
              )}
            </div>
          )}
            </div>
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-blue-500"
            >
              <FaHome className="inline mr-2"></FaHome>Home
            </Link>{" "}
            <Link
              to="/favorites"
              className="block py-2 text-gray-700 hover:text-red-500"
            >
              <FaHeart className="inline mr-2" /> Favorites
            </Link>
            <Link
              to="/cart"
              className="block py-2 text-gray-700 hover:text-blue-500"
            >
              <FaShoppingCart className="inline mr-2" /> Cart
            </Link>
          </div>
          
        )}
      </header>
      
      <main className="container mx-auto m-4">{children}</main>
    </div>
  );
}

export default MainLayout;
