import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addToFavorites, removeFromFavorites } from "../store/FavoritesSlice";
import { addToCart, removeFromCart } from "../store/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import ShoppingBagSVG from "../SVG/ShoppingBagSVG";
import ShoppingBagSVG2 from "../SVG/ShoppingBagSVG2";
import DeleteSVG from "../SVG/DeleteSVG";
import { toast } from "react-toastify";

function Favorite() {
  const favoriteItems = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="w-[100%] px-[10px] md:w-[80%] mx-auto">
      <div className="flex items-center justify-between mt-[50px] mb-[50px]">
        <h2 className="text-2xl font-bold text-black">
          Favorite Products
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="p-[9px] bg-black text-white rounded-lg cursor-pointer"
        >
          BACK
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center mt-20">
          <span className="loading loading-spinner loading-2xl w-24 h-24 text-gray-700"></span>
        </div>
      )}
      {favoriteItems.length === 0 ? (
        <p className="text-black">There are no favorite products yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 mx-auto lg:grid-cols-4 gap-3">
          {favoriteItems.map((product) => {
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
                  className="w-full h-44 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
                <div className="relative flex items-center">
                  <h3 className="text-sm w-[75%] md:text-lg font-semibold text-black mt-3 truncate">
                    {product.title}
                  </h3>
                  <button
                    className="text-xl absolute top-3 right-0 transition-all"
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

                  <button
                    className="text-xl absolute top-14 right-0 transition-all cursor-pointer"
                    onClick={() => {
                      dispatch(removeFromFavorites(product.id));
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
                    }}
                  >
                    <DeleteSVG></DeleteSVG>
                  </button>
                </div>

                <p className="text-gray-700 text-sm">{product.category}</p>
                <p className="text-gray-600 text-sm truncate w-[60%]">
                  {product.brand}
                </p>

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
      )}
    </div>
  );
}

export default Favorite;
