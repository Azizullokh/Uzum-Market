import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/CartSlice";
import ShoppingBagCart from "../SVG/ShoppingBagCart";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const isInCart =
    Array.isArray(cartItems) &&
    cartItems.some((item) => item.id === product?.id);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log("Error fetching product details:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get(`https://dummyjson.com/comments/post/${id}`)
      .then((response) => setComments(response.data.comments || []))
      .catch((error) => console.log("Error fetching comments:", error));
  }, [id]);

  if (!product) {
    return (
      <p className="text-black text-center mt-[100px] text-[50px]">
        <span className="text-red-500">Error:</span> Product not found
      </p>
    );
  }
  const discountedPrice =
    product.discountPercentage > 0
      ? (
          product.price -
          (product.price * product.discountPercentage) / 100
        ).toFixed(2)
      : product.price;

  return (
    <div className="p-5 w-[90%] md:w-[80%] mx-auto">
      {loading && (
        <div className="flex items-center justify-center mt-20">
          <span className="loading loading-spinner loading-2xl w-24 h-24 text-gray-700"></span>
        </div>
      )}
      <h2 className="text-3xl text-black font-bold text-center mb-5">
        {product.title}
      </h2>

      <div className="flex flex-col md:flex-row gap-5">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 h-80 object-cover rounded-md shadow-md"
        />

        <div className="w-full md:w-1/2">
          <p className="text-black text-lg">{product.description}</p>

          <p className="text-xl font-semibold text-black mt-3">
            Original price:{" "}
            <span className="line-through text-red-500">${product.price}</span>
          </p>

          <p className="text-sm text-black font-bold">
            Discount:{" "}
            <span className="text-[#7000FF]">
              {product.discountPercentage}%
            </span>
          </p>
          <p className="text-lg font-bold text-[#7000FF]">${discountedPrice}</p>
          <p className="text-black mt-2 font-bold">
            Brand: <span className="text-[#7000FF]">{product.brand}</span>
          </p>
          <p className="text-black font-bold">
            Category: <span className="text-[#7000FF]">{product.category}</span>
          </p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-yellow-400 text-xl">⭐ {product.rating}</span>
            <span className="text-gray-500">
              ({Math.floor(Math.random() * 1000)} comment)
            </span>
          </div>

          {product.stock === 0 ? (
            <p className="text-red-600 text-lg font-semibold mt-2">
              Out of stock
            </p>
          ) : (
            <p className="text-[#7000FF] text-lg font-semibold mt-2">
              {product.stock} left
            </p>
          )}

          <div className="flex flex-col md:flex-row gap-3 mt-5">
            <button
              className={`w-full md:w-1/2 px-5 py-3 rounded-lg text-white font-semibold transition-all ${
                isInCart ? "bg-[#7000FF]" : "bg-[#7000FF]"
              }`}
              onClick={() =>
                isInCart
                  ? dispatch(removeFromCart(product.id))
                  : dispatch(addToCart(product))
              }
            >
              {isInCart ? "✅" : `add to Cart`}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full md:w-1/2 px-5 py-3 rounded-lg bg-black hover:bg-gray-400 text-white"
            >
              GO BACK
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mt-8 mb-3 text-black text-start">
        Product images
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {product.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Image ${index + 1}`}
            className="w-full h-40 object-cover rounded-md shadow-md"
          />
        ))}
      </div>
      <h3 className="text-2xl font-bold text-black mt-14 mb-5 text-start">
        User opinion
      </h3>
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow">
              <div className="flex items-center gap-[15px]">
                <p className="font-bold text-black">
                  {comment.user?.username || "Anonim"}
                </p>
                <div className="flex items-center gap-1 text-yellow-400">
                  ⭐ {comment.rating || Math.floor(Math.random() * 5) + 1}
                </div>
              </div>

              <p className="text-gray-700 mt-1">{comment.body}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            There are no comments yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Details;
