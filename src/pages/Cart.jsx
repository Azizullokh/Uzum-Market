import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart , updateQuantity } from "../store/CartSlice";
import WhiteDeleteSVG from "../SVG/WhiteDeleteSVG";
import ShoppingBagCart from "../SVG/ShoppingBagCart";
import ToatalSvg from "../SVG/ToatalSvg";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, product) => sum + Number(product.price) * (product.quantity || 1),
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <div className="w-[90%] md:w-[80%] mx-auto">
      <h2 className="flex gap-1.5 items-center text-2xl font-bold text-gray-800 mb-6">
        <ShoppingBagCart></ShoppingBagCart> Shopping Bag
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your bag is empty</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:hidden block bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full md:w-[30%] h-fit">
            <h3 className="flex items-center gap-1.5 text-2xl font-bold text-gray-800 mb-3"><ToatalSvg></ToatalSvg> Total</h3>
            <p className="text-2xl md:text-3xl font-semibold text-violet-600">
              ${totalPrice}
            </p>
            <p className="text-gray-500 text-md mt-3">
              🏷️ Categories:{" "}
              <span className="font-medium text-gray-700">
                {cartItems
                  .map((product) => product.category)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .join(", ")}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-[5px] md:gap-5 w-full md:w-[70%]">
            {cartItems.map((product) => (
              <div
                key={product.id}
                className="flex bg-white p-[10px] md:p-4 rounded-lg shadow-md hover:shadow-xl transition-all items-center gap-[5px] md:gap-5 border border-gray-200"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-14 h-14  md:w-16 md:h-16 object-contain rounded-lg border"
                />
                <div className="flex-grow">
                  <h3 className="text-[10px] w-[60%] font-bold md:text-lg text-gray-800 truncate">
                    {product.title}
                  </h3>
                  <p className="text-purple-600 font-bold mb-[4px] text-[10px] md:text-sm">
                    {product.category}
                  </p>
                  {product.colors && product.colors.length > 0 && (
                    <select className="mt-2 p-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none">
                      {product.colors.map((color, index) => (
                        <option key={index} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  )}
                  <select
                    className="ml-[0px] md:ml-2 px-[4px] py-[2px] md:p-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
                    value={product.quantity}
                    onChange={(e) =>
                      dispatch(
                        updateQuantity({ id: product.id, quantity: Number(e.target.value) })
                      )
                    }
                  >
                    {[...Array(Math.min(10, product.stock)).keys()].map(
                      (num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <p className="text-[10px] md:text-xl font-bold text-violet-600">
                  ${(product.price * product.quantity).toFixed(2)}
                </p>

                <button
                  className="bg-black relative rounded-lg cursor-pointer transition-all text-2xl p-2"
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  <WhiteDeleteSVG></WhiteDeleteSVG>
                </button>
              </div>
            ))}
          </div>
          <div className="md:block hidden bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full md:w-[30%] h-fit">
            <h3 className="text-2xl flex items-center gap-[7px] font-bold text-gray-800 mb-3"><ToatalSvg></ToatalSvg> Total</h3>
            <p className="text-3xl font-semibold text-violet-600">
              ${totalPrice}
            </p>
            <p className="text-gray-500 text-md mt-3">
              🏷️ Categories:{" "}
              <span className="font-medium text-gray-700">
                {cartItems
                  .map((product) => product.category)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .join(", ")}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
