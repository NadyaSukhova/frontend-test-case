import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { selectTotalPrice, removeFromCart, addToCart, clearCart, selectCartTotalAmount, selectCart } from "../store/slices/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const cartCount = useSelector(selectCartTotalAmount);
  const totalPrice = useSelector(selectTotalPrice);

  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);


  const handleCheckout = () => {
    setShowCheckout(true);
    setTimeout(() => {
      alert("Заказ оформлен!");
      dispatch(clearCart());
      setShowCheckout(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <div className="cart">
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
        Корзина ({cartCount})
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Корзина</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p>Корзина пуста</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          dispatch(addToCart({product: item, amount: -1}))
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(addToCart({product: item, amount: 1}))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Удалить
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-footer">
            <div className="total">Итого: ${totalPrice}</div>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cart.length === 0 || showCheckout}
            >
              {showCheckout ? "Оформляем..." : "Оформить заказ"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}