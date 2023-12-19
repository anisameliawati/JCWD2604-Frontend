/** @format */
import { Flex, Input, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
function CalculatorPage() {
  let numbers = {
    number1: 0,
    number2: 0,
  };

  const [result, setResult] = useState(0);

  const onChange = (e) => {
    numbers[e.target.name] = e.target.value;
  };

  const jumlahin = () => {
    const { number1, number2 } = numbers;
    console.log(number1, number2);
    if (number1 && number2) setResult(Number(number1) + Number(number2));
  };

  // useState(0) => [value,function]
  // state,setState
  return (
    <Flex flexDir={"column"} gap={"8px"} width={"250px"} margin={"20px auto"}>
      <Input
        name="number1"
        type="number"
        placeholder="number 1"
        onChange={(event) => onChange(event)}
      ></Input>
      <Input
        type="number"
        name="number2"
        placeholder="number 2"
        onChange={onChange}
      ></Input>

      <Button w={"full"} onClick={jumlahin}>
        +
      </Button>
      <Heading fontSize={"18px"} py={"16px"}>
        Total : {result}
      </Heading>
    </Flex>
  );
}
export default CalculatorPage;
