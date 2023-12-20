/** @format */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
function ProductModalComponent({ isOpen, onClose, setProducts, product }) {
  const inputRef = useRef();

  const addNewProduct = () => {
    if (!product.productName) setProducts((prev) => [...prev, data]);
    else {
      //edit
      setProducts((prev) => {
        const tmp = [...prev];
        const findIndex = prev.findIndex(
          ({ productName }) => productName == product.productName
        );
        tmp[findIndex] = data;
        console.log(tmp);
        return tmp;
      });
    }
    onClose();
  };

  const deleteProduct = () => {
    setProducts((prev) => {
      const tmp = [...prev];
      const findIndex = prev.findIndex(
        ({ productName }) => productName == product.productName
      );
      tmp.splice(findIndex, 1);
      return tmp;
    });
  };

  //component will mount
  //component did mount
  //component did update
  //component will unmount

  //   useEffect(() => {
  //     //ini statement
  //   },[search]);

  const [data, setData] = useState({
    img: "",
    price: 0,
    productName: "",
  });
  useEffect(() => {
    if (product?.productName) setData({ ...product });
  }, [product]);

  const onChangeHandler = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product</ModalHeader>
        <ModalBody
          display={"flex"}
          flexDir={"column"}
          gap={"16px"}
          alignItems={"center"}
          pb={"10px"}
        >
          <img src={data.img} onChange={onChangeHandler} className="img" />
          <Input
            placeholder="product name"
            onChange={onChangeHandler}
            name="productName"
            value={data.productName}
          />
          <Input
            placeholder="image url"
            onChange={onChangeHandler}
            name="img"
            value={data.img}
          />
          <Input
            placeholder="price"
            type="number"
            name="price"
            onChange={onChangeHandler}
            value={data.price}
          />
          <Input
            type="file"
            display={"none"}
            ref={inputRef}
            id="img"
            onClick={(e) => {
              console.log(e.target.files[0].name);
            }}
          ></Input>
          <Heading
            fontSize={"medium"}
            cursor={"pointer"}
            onClick={() => {
              inputRef.current.click();
            }}
          >
            upload image
          </Heading>
          <Button bgColor={"black"} color={"white"} onClick={addNewProduct}>
            submit
          </Button>
          <Button
            display={product?.productName ? "block" : "none"}
            bgColor={"red"}
            color={"white"}
            onClick={deleteProduct}
          >
            Delete
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ProductModalComponent;
