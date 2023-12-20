/** @format */
import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import ProductModalComponent from "./modal";

function CardListComponents({ products, setProducts }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="content">
        {products.map((product, key) => (
          <CardComponent key={key} {...product} setProducts={setProducts} />
        ))}
        <Flex
          maxW={"984px"}
          w={"100%"}
          justifyContent={"right"}
          padding={"30px"}
          pos={"fixed"}
          bottom={0}
        >
          <Button
            borderRadius={"100%"}
            p={"10px"}
            zIndex={1}
            bgColor={"black"}
            color={"white"}
            onClick={onOpen}
          >
            Add
          </Button>
        </Flex>
      </div>
      <ProductModalComponent
        isOpen={isOpen}
        onClose={onClose}
        setProducts={setProducts}
      />
    </>
  );
}
export default CardListComponents;

function CardComponent({ img, productName, price, setProducts }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="card" onClick={onOpen}>
        <img src={img} alt="" />
        <div className="wrapper">
          <h2>{productName}</h2>
          <span> IDR {Number(price).toLocaleString("id-ID")} </span>
        </div>
      </div>
      <ProductModalComponent
        isOpen={isOpen}
        onClose={onClose}
        setProducts={setProducts}
        product={{ productName, img, price }}
      />
    </>
  );
}
