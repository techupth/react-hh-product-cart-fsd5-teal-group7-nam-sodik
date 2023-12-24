import { useState } from "react";
import "./App.css";
import products from "./data/products";

function App() {
  /* 1. add to cart เริ่มสร้าง state สำหรับอัพเดท cart โดยกดจาก product list
   2. สร้าง state มาอัพเดท object item ใน cart โดยใช้ destructuring มา add array ลงใน object และเพิ่ม key quantity ลงไปใน cartList
   3. setCartList เป็นcallback ที่จะอัพเดท stateอัตโนมัติของ react ในกรณีนี้คือ ให้ [...cartList, โคลนarrayจากในcartListซึ่งเป็นarrayเปล่า
     {...newProduct, quantity: 1}] แล้วสร้าง objectใหม่มีproperty เหมือน param ที่รับมาจาก products.map(product) 
     ซึงในstateที่จะอัพเดทนี้ จะเพิ่มkeyเข้าไปคือ quantity: 1 ทำให้stateปัจจุบันมีค่า quantity 
     
     เขียนแบบเต็มๆ const newProduct = { key-value 1: , key-value: 2, ...key-value: n }
     const newProductQuantity = {...newProduct , quantity: 1}
     
     ทำใหม่โดยเพิ่มเงื่อนไข ถ้าสินค้าในcartซ้ำให้เพิ่ม quantity + 1 โดยเช็คboolean
     ประกาศตตัวแปล isProductExist (มีชื่อซ้ำ) = false ใช้ if วนลูปเพื่อนเช็ค state ในcart
     ว่ามีชื่อซ้ำหรือไม่ ซึ่ง cartList[i].id === newProduct.id = false เพราะชื่อซ้ำ
     ประกาศตัวแปลมาอัพเดทค่าในโคลนสเตจ โดยใช้.map()เพื่อเพิ่ม quantity +1 ลงในสินค้าที่ซ้ำ 
     โดยใช้เงื่อนไข.map()ให้เช็คกับ index แต่ละ id ว่าเป็น true หรือ false
     ถ้าเป็น false ให้ +1 ถ้าไม่มีชื่อซ้ำก็ให้หยุด

     สร้างเงื่อนไขที่ 2 กรณีที่ชื่อไม่ซ้ำและไม่มีสินค้าใน cart ก็ให้เพิ่มสินค้าเข้าไปปกติ
     */
  const [cartList, setCartList] = useState([]);
  const addToCart = (newProduct) => {
    // setCartList([...cartList, { ...newProduct, quantity: 1 }]);
    let isProductExist = false;

    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === newProduct.id) {
        // ถ้าสินค้าซ้ำกันอยู่ใน cart
        const updatedCart = cartList.map((product, quantityIndex) =>
          quantityIndex === i
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        setCartList(updatedCart);
        isProductExist = true;
        break;
      }
    }

    if (!isProductExist) {
      // ถ้าสินค้ายังไม่มีใน cart
      setCartList([...cartList, { ...newProduct, quantity: 1 }]);
    }
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
