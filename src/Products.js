import React, { useState, useEffect } from "react";
import Cart from "./Cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=100");
    const res = await data.json();
    console.log("res::", res.products);
    setProducts([...res.products]);
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      removeFromCart(product);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  const increaseQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    const totalPrice = cart.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="prod-product">
        {products.map((p, i) => {
          const isInCart = cart.some((item) => item.id === p.id);
          return (
            <div key={i} className="prod-image">
              <h4> {p.title}</h4>
              <img alt="prod" src={p.thumbnail} width={200} />
              <h5>${p.price}</h5>
              <button onClick={() => addToCart(p)}>
                {isInCart ? "Remove" : "Add"}
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <div className="cart">
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            calculateTotalPrice={calculateTotalPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
