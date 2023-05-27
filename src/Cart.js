import React from "react";

const Cart = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity }) => {
  const calculateTotalPrice = () => {
    const totalPrice = cart.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    return totalPrice.toFixed(2);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item, index) => (
        <div key={index} className="cart-prod12">
          <h4>{item.title}</h4>
          <img alt="prod" src={item.thumbnail} width={100} />
          <h5>${item.price}</h5>
          <button onClick={() => decreaseQuantity(item)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => increaseQuantity(item)}>+</button>
        </div>
      ))}
      <div>
        <h4>Total Price: ${calculateTotalPrice()}</h4>
      </div>
    </div>
  );
};

export default Cart;
