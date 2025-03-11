import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites , removeFromFavorites } from "../store/FavoritesSlice";
import { addToCart, removeFromCart } from "../store/CartSlice";
import HeartSVG2 from "../SVG/HeartSVG2";
import HeartSVG from "../SVG/HeartSVG";
import ShoppingBagSVG from "../SVG/ShoppingBagSVG";
import ShoppingBagSVG2 from "../SVG/ShoppingBagSVG2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EyeSVG from "../SVG/EyeSVG";

function AllProducts() {
  const [Products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favorites.favorites);
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products?limit=200`)
      .then((response) => {
        if (response.status == 200) {
          setProducts(response.data.products);
          console.log(response.data.products);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-[9px] md:p-6 bg-gray-100 min-h-screen">
      {loading && (
        <div className="flex items-center justify-center mt-20">
          <span className="loading loading-spinner loading-2xl w-24 h-24 text-gray-700"></span>
        </div>
      )}

      <div className="w-full md:w-[95%] lg:w-[85%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[9px] md:gap-6">
        {Products.map((product) => {
          const isFavorite = favoriteItems.some(
            (item) => item.id === product.id
          );
          const isInCart = cartItems.some((item) => item.id === product.id);

          const discountedPrice =
            product.discountPercentage > 0
              ? (
                  product.price -
                  (product.price * product.discountPercentage) / 100
                ).toFixed(2)
              : product.price;
          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl h-[339px] transition-all p-4 relative"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-44 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <div className="relative flex items-center">
                <h3 className="text-sm w-[80%] md:text-lg font-semibold text-black mt-3 truncate">
                  {product.title}
                </h3>
                <button
                  className="text-xl absolute top-4 right-0 transition-all"
                  onClick={() =>{
                    if (isFavorite) {
                      dispatch(removeFromFavorites(product.id))
                      toast.error("Product removed from Favorites!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    }else{
                      dispatch(addToFavorites(product))
                      toast.success("Product added to Favorites!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    }
                  }
                }
                >
                  {isFavorite ? <HeartSVG2 /> : <HeartSVG />}
                </button>
                <button
                  className="text-xl absolute top-13 right-0 transition-all"
                  onClick={() => {
                    if (isInCart) {
                      dispatch(removeFromCart(product.id));
                    } else {
                      dispatch(addToCart(product));
                    }
                  }}
                >
                  {isInCart ? <ShoppingBagSVG /> : <ShoppingBagSVG2 />}
                </button>
                <Link to={`/details/${product.id}`} className="block mt-4">
                <button className="absolute top-22 right-0 rounded-lg">
                  <EyeSVG></EyeSVG>
                </button>
              </Link>
              </div>

              <p className="text-gray-700 text-sm">{product.category}</p>
              <p className="text-gray-600 text-sm w-[60%] truncate">{product.brand}</p>

              <div className="flex items-center justify-between mt-2">
                {product.discountPercentage > 0 ? (
                  <div className="relative mt-[15px] flex flex-col">
                    <p className="absolute right-0 -top-2 text-red-400 text-xs line-through">
                      ${product.price}
                    </p>
                    <p className="text-lg font-bold text-[#7000FF]">
                      ${discountedPrice}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-red-500">
                    ${product.price}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllProducts;
