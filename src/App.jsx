import { useState } from "react";
import "./App.css";
import products from "./data/products";

function App() {
  // add to cart เริ่มสร้าง state สำหรับอัพเดท cart โดยกดจาก product list
  // สร้าง state มาอัพเดท object item ใน cart โดยใช้ destructuring มา add array ลงใน object และเพิ่ม key quantity ลงไปใน cartList
  const [cartList, setCartList] = useState([]);
  const addToCart = (newProduct) => {
    setCartList([...cartList, { ...newProduct, quantity: 1 }]);
  };

  const delCart = (productIndex) => {
    const updateProduct = [...cartList];
    updateProduct.splice(productIndex, 1);
    setCartList(updateProduct);
  };

  // สร้าง state มารับค่า quantity โดยดึงค่าที่มีการอัพเดทใหม่ ในstateเก่า
  const addItems = (itemIndex) => {
    const addQuantity = [...cartList];
    addQuantity[itemIndex].quantity += 1;
    setCartList(addQuantity);
  };

  const delItems = (itemIndex) => {
    const addQuantity = [...cartList];
    addQuantity[itemIndex].quantity > 0
      ? (addQuantity[itemIndex].quantity -= 1)
      : (addQuantity[itemIndex].quantity = 0);
    setCartList(addQuantity);
  };

  function CalcTotalPrice() {
    return cartList.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {products.map((product) => {
            return (
              <div className="product">
                <img
                  src="http://dummyimage.com/350x350.png/dddddd/000000"
                  alt="sample name"
                />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <button
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total Price is {CalcTotalPrice()} Baht)
        </h1>

        <div className="cart-item-list">
          {cartList.map((product, index) => {
            return (
              <div className="cart-item">
                <h1>Item name: {product.name}</h1>
                <h2>Price: {product.price} Baht</h2>
                <h2>Quantity: {product.quantity}</h2>
                <button
                  className="delete-button"
                  onClick={() => {
                    delCart(index);
                  }}
                >
                  x
                </button>
                <div className="quantity-actions">
                  <button
                    className="add-quantity"
                    onClick={() => {
                      addItems(index);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="subtract-quantity"
                    onClick={() => {
                      delItems(index);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
