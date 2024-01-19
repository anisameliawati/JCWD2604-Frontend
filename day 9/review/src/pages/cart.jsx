import { useEffect, useState } from "react";
import NavbarComponent from "../components/navbar";
import { axiosInstance } from "../api/axios";
import { useSelector } from "react-redux";

function Cart() {
  const [cart, setCart] = useState([]);
  const userSelector = useSelector((state) => state.auth);

  const hapus = (id) => {
    axiosInstance()
      .delete("/orders/" + id)
      .then(() => {
        alert(`product ${id} berhasil dihapus`);
        CartList();
      })
      .catch((err) => console.log(err));
  };

  const CartList = () => {
    axiosInstance()
      .get("/orders", {
        params: { userId: userSelector.id },
      })
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    CartList();
  }, []);

  return (
    <>
      <NavbarComponent />
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan="2">Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((order, key) => (
              <CartLoop {...order} key={key} hapus={() => hapus(order.id)} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Cart;

function CartLoop({
  productImg,
  qty,
  totalPrice,
  productPrice,
  productName,
  hapus,
  id,
}) {
  return (
    <>
      <tr>
        <td>
          <img src={productImg} className="w-32" />
        </td>
        <td>{productName}</td>
        <td>{qty}</td>
        <td>{productPrice}</td>
        <td>{totalPrice}</td>
        <td>
          <button
            className="bg-slate-800 text-white rounded-2xl p-3"
            onClick={() => hapus(id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
