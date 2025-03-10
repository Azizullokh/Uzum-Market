import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import CatalogSVG from "../SVG/CatalogSVG";
import { Link } from "react-router-dom";

const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [products, setProducts] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data.map((category) => category.name || category.slug));
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategoryClick = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));

    if (!products[category]) {
      fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts((prev) => ({ ...prev, [category]: data.products }));
        })
        .catch((err) =>
          console.error(`Error fetching products for ${category}:`, err)
        );
    }
  };

  return (
    <div className="flex justify-start mr-[7px] ml-0 mb-2 md:mb-0 md:ml-[20px] mx-auto text-black">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-1 bg-purple-600 flex items-center md:gap-[6px] text-white md:px-6 md:py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
      >
        <CatalogSVG></CatalogSVG> Сatalog
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-white flex flex-col p-6 overflow-auto">
            <button
              className="absolute top-4 right-6 text-gray-600 hover:text-red-500 text-3xl"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">Catalog</h2>
            <ul className="max-w-3xl mx-auto w-full">
              {categories.map((category, index) => (
                <li key={index} className="mb-4">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left font-medium bg-gray-200 hover:bg-gray-300 rounded-lg text-xl"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                    {openCategory === category ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>

                  {openCategory === category && (
                    <ul className="mt-2 space-y-2">
                      {products[category] ? (
                        products[category].map((product) => (
                          <Link
                            to={`/details/${product.id}`}
                            className="block mt-4"
                            onClick={() => setIsOpen(false)}
                          >
                            <li
                              key={product.id}
                              className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-100"
                            >
                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div>
                                <h3 className="font-semibold text-lg w-42 truncate">
                                  {product.title}
                                </h3>
                                <p className="text-gray-600 w-42 truncate">
                                  {product.description}
                                </p>
                                <p className="text-xl font-bold text-green-600">
                                  ${product.price}
                                </p>
                              </div>
                            </li>
                          </Link>
                        ))
                      ) : (
                        <div className="flex items-center justify-center my-6">
                          <span className="loading loading-spinner loading-2xl w-14 h-14 text-gray-700"></span>
                        </div>
                      )}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
