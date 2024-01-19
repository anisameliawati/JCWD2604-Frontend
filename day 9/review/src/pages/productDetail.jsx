/** @format */

import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../components/navbar";
import { axiosInstance } from "../api/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ProductDetail() {
  const navigate = useNavigate();

  const { productId } = useParams();
  const initalProduct = {
    productName: "",
    price: 0,
    productDescription: "",
    img: "",
    id: 0,
  };
  const [product, setProduct] = useState({ ...initalProduct });
  const userSelector = useSelector((state) => state.auth);

  const buy = () => {
    if (
      window.confirm(
        "apakah anda yakin membeli produk " + product.productName + "?"
      )
    ) {
      // e.preventDefault();

      const qty = document.getElementById("qty").value;
      const newOrder = {
        productId: product.id,
        userId: userSelector.id,
        qty,
        orderDate: new Date(),
        totalPrice: qty * product.price,
      };
      axiosInstance()
        .post("/transaksi", newOrder)
        .then(() => {
          alert("order berhasil dibuat");
          document.getElementById("form").reset();
          navigate("/transaksi");
        })
        .catch((err) => console.log(err));
    }
  };

  const cart = async () => {
    try {
      if (
        window.confirm(
          "apakah Anda yakin menambah produk " +
            product.productName +
            " kedalam cart?"
        )
      ) {
        // e.preventDefault();
        const qty = document.getElementById("qty").value;
        const newCart = {
          productId: product.id,
          userId: userSelector.id,
          productName: product.productName,
          productPrice: product.price,
          productImg: product.img,
          qty,
          orderDate: new Date(),
          totalPrice: qty * product.price,
        };

        const check = await axiosInstance().get("/orders", {
          params: {
            userId: userSelector.id,
            productId: product.id,
          },
        });
        if (check.data.lenght) {
          axiosInstance().patch("/orders/", check.data[0].id, {
            qty: Number(check.data[0].qty) + Number(qty),
          });
          alert("okee");
        } else {
          await axiosInstance().post("/order", newCart);
          alert("produk berhasil ditambah");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProduct = () => {
    axiosInstance()
      .get("/products/" + productId)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const input = () => {
    const a = document.getElementById("qty").value;
    if (a > 0) cart(); // ga nge post jadinya ga update di cart page
    else if (a >= 1) buy(); // kenapa masih mereturn si cart?
  };
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto ">
        <div className="grid max-w-screen-2xl  md:grid-cols-2 p-7 gap-3 w-full  sm:grid-cols-1">
          <div className="m-auto">
            <img src={product.img} alt="" />
          </div>
          <div className=" pt-10 flex flex-col gap-5  w-9/12">
            <div className=" font-bold text-3xl">{product.productName}</div>
            <div className="my-2">
              <div>start from</div>
              <div className="font-bold text-3xl">
                IDR {product?.price?.toLocaleString()}
              </div>
            </div>

            <form action="" className="flex gap-3" id="form">
              <input
                className="h-[49px] border max-w-32 p-5 rounded-lg text-center"
                type="number"
                min={1}
                placeholder="Quantity"
                required
                id="qty"
              ></input>
              <button
                onClick={buy}
                type="button"
                className="h-[49px] border w-[168px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
              >
                Buy
              </button>
              <button
                onClick={cart}
                type="button"
                className="h-[49px] border w-[168px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
              >
                Add To Cart
              </button>
            </form>
            <div className="font-semibold">
              Please Make Sure The Size Fits You
            </div>
            <hr />
            <div className="font-semibold">Authentic. Guarateed.</div>

            <div className=" text-justify">
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              earum architecto nisi tempore, consectetur autem porro
              exercitationem soluta, corrupti dicta corporis similique
              repellendus quibusdam. */}
              {product.productDescription}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;
