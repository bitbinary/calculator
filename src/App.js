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
  const [isViewScientific, setisViewScientific] = useState(false);

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
      setOperand((operand) => Number(parseFloat(operand) * 0.01).toString());
    else if (result)
      setResult((result) => Number(parseFloat(result) * 0.01).toString());
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
    if (operand.includes(".") && value === ".") return;
    setOperand((operand) => operand + value);
  };

  const handleEvaluation = () => {
    if (!result) {
      setResult(operand);
      setOperator("");
      setOperand("");
      return;
    } else {
      let answer;
      if (operator === "+") {
        answer = parseFloat(result) + parseFloat(operand);
      } else if (operator === "-") {
        answer = parseFloat(result) - parseFloat(operand);
      } else if (operator === "*") {
        answer = parseFloat(result) * parseFloat(operand);
      } else if (operator === "/") {
        answer = parseFloat(result) / parseFloat(operand);
      }
      setOperand("");
      setOperator("");
      setResult(numString(answer));
    }
  };

  const numString = (num) => Number(Number(num).toFixed(10)).toString();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      console.log(entries[0].contentRect.width);

      if (entries[0].contentRect.width > 1370 && !isViewScientific)
        setisViewScientific(true);
      if (entries[0].contentRect.width < 1370 && isViewScientific)
        setisViewScientific(false);
    });

    resizeObserver.observe(document.getElementById("myApp"));

    return () => {
      resizeObserver.disconnect();
    };
  }, [isViewScientific]);

  return (
    <div id="myApp" className="App">
      <Wrapper>
        <Screen>
          <Expression>{expression}</Expression>
          <Result>{operand || result || 0}</Result>
        </Screen>
        {isViewScientific && (
          <ButtonsWrapper
            style={{
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              flex: "1 0 59%",
            }}
          >
            {SCIENTIFIC_BUTTONS.map((value, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => handleClear()}
                  style={{ fontSize: "24px" }}
                  label={value.label}
                  type={value.type}
                ></Button>
              );
            })}
          </ButtonsWrapper>
        )}
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

const SCIENTIFIC_BUTTONS = [
  {
    label: "{",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "}",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "mc",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "m+",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "m-",
    type: "2nd",
    handleClick: "handleScientificKey",
  },
  {
    label: "mr",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "2X",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "x2",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "x3",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "xy",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "ex",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "10x",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "1/x",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "2rX",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "3rX",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "yrX",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "ln",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "log10",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "x!",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "sin",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "cos",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "tan",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "e",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "EE",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "Rad",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "sinh",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "cosh",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "tanh",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "pi",
    type: "",
    handleClick: "handleScientificKey",
  },
  {
    label: "Rand",
    type: "",
    handleClick: "handleScientificKey",
  },
];
export default App;
