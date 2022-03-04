import React, { useEffect, useState } from "react";

import "./App.css";
import Button from "./components/Button";
import ButtonsWrapper from "./components/ButtonsWrapper";
import Expression from "./components/Expression";
import Result from "./components/Result";
import Screen from "./components/Screen";
import Wrapper from "./components/Wrapper";

function App() {
  const [expression, setExpression] = useState("");
  const [operator, setOperator] = useState("");
  const [operand, setOperand] = useState("1936");
  const [result, setResult] = useState("");

  const handleClear = () => {
    setExpression("");
    setOperand("");
    setOperator("");
    setResult("");
  };

  const handleSignChange = () => {
    if (operand) setOperand((operand) => (parseFloat(operand) * -1).toString());
    else if (result)
      setResult((result) => (parseFloat(result) * -1).toString());
  };
  const handlePercentage = () => {
    if (operand)
      setOperand((operand) => (parseFloat(operand) * 0.01).toString());
    else if (result)
      setResult((result) => (parseFloat(result) * 0.01).toString());
  };
  const handleOperator = (value) => {
    if (operator || result) {
      setOperator(value);
    } else if (operand) {
      setOperator(value);
      setResult(operand);
      setOperand("");
    } else {
    }
  };
  const handleOperand = (value) => {
    setOperand((operand) => operand + value);
  };

  const handleEvaluation = () => {
    if (!result) {
      setResult(operand);
      setOperator("");
      setOperand("");
      return;
    } else {
      var expression = `${result} ${operator} ${operand}`;
      expression = new String(expression);
      let answer = eval(expression.toString());
      setOperand("");
      setOperator("");
      setResult(answer);
    }
  };

  return (
    <div className="App">
      <Wrapper>
        <Screen>
          <Expression>{expression}</Expression>
          <Result>{operand || result || 0}</Result>
        </Screen>
        <ButtonsWrapper>
          <Button
            onClick={() => handleClear()}
            label={"C"}
            type="action"
          ></Button>
          <Button
            onClick={() => handleSignChange()}
            label={"+/-"}
            type="action"
          ></Button>
          <Button
            onClick={() => handlePercentage()}
            label={"%"}
            type="action"
          ></Button>
          <Button
            onClick={() => handleOperator("/")}
            label={"/"}
            type="operator"
          ></Button>
          <Button
            onClick={(e) => handleOperand(e.target.innerText)}
            label={"7"}
            type=""
          ></Button>
          <Button
            onClick={(e) => handleOperand(e.target.innerText)}
            label={"8"}
            type=""
          ></Button>
          <Button
            onClick={(e) => handleOperand(e.target.innerText)}
            label={"9"}
            type=""
          ></Button>
          <Button
            onClick={() => handleOperator("*")}
            label={"x"}
            type="operator"
          ></Button>
          <Button
            onClick={(e) => handleOperand(e.target.innerText)}
            label={"4"}
            type=""
          ></Button>
          <Button
            onClick={(e) => handleOperand(e.target.innerText)}
            label={"5"}
            type=""
          ></Button>
          <Button
            onClick={(e) => handleOperand(e.target.innerText)}
            label={"6"}
            type=""
          ></Button>
          <Button
            onClick={() => handleOperator("-")}
            label={"-"}
            type="operator"
          ></Button>
          <Button
            onClick={(e) => handleOperand(e.target.innerText)}
            label={"1"}
            type=""
          ></Button>
          <Button
            onClick={(e) => handleOperand(e.target.innerText)}
            label={"2"}
            type=""
          ></Button>
          <Button
            onClick={(e) => handleOperand(e.target.innerText)}
            label={"3"}
            type=""
          ></Button>
          <Button
            onClick={() => handleOperator("+")}
            label={"+"}
            type="operator"
          ></Button>
          <Button
            onClick={(e) => handleOperand(e.target.innerText)}
            label={"0"}
            type="extended"
          ></Button>
          <Button
            onClick={(e) => handleOperand(e.target.innerText)}
            label={"."}
            type=""
          ></Button>
          <Button
            onClick={() => handleEvaluation()}
            label={"="}
            type="operator"
          ></Button>
        </ButtonsWrapper>
      </Wrapper>
    </div>
  );
}

export default App;
