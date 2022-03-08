import React, { useEffect, useState } from "react";
import "./App.css";

// Component Imports
import Button from "./components/Button";
import ButtonsWrapper from "./components/ButtonsWrapper";
import HistorySection from "./components/HistorySection";
import HistoryWrapper from "./components/HistoryWrapper";
import Result from "./components/Result";
import Screen from "./components/Screen";
import Wrapper from "./components/Wrapper";

// Function Imports
import {
  readObjSafe,
  readObjFromLocalStorage,
  saveObjtoLocalStorage,
  trimObjectByKey,
  checkDateAfterGivenDate,
  getDateNDaysAgo,
} from "./utils/helpers";
import { calucaluteCurrentResult, defaultCalcState } from "./utils/operations";

// Config declarations
const CONFIG = {
  responsiveBreakpoint: 1370,
  historySpanInDays: 2,
};

// Function to get the history value from the local storage,
// then filter out the history before the given number of days.
const getHistoryDefaultValue = () => {
  return trimObjectByKey(
    readObjFromLocalStorage("calculationHistory") || {},
    checkDateAfterGivenDate(getDateNDaysAgo(CONFIG.historySpanInDays))
  );
};

function App() {
  const [expression, setExpression] = useState(""); // Store the current expression value
  const [history, setHistory] = useState(getHistoryDefaultValue()); // stores the history off calculations over the past n number of days
  const [calc, setCalc] = useState({ ...defaultCalcState }); // Caluclation object that holds the operands and operators
  const [result, setResult] = useState(""); // displays the result on the result screen
  const [isViewScientific, setisViewScientific] = useState(false); // Controls the visibility of the scientific buttons

  // clear the states for new calculation
  const handleClear = () => {
    setExpression("");
    setCalc({ ...defaultCalcState });
    setResult("");
  };

  // performs sign change on the current result.
  // Also the opreand 2 or opreand 1 holds the result in incomplete calculations.
  // Thus handles the sign change for them as well
  const handleSignChange = () => {
    let calculation = { ...calc };
    if (result !== "")
      calculation.result = calucaluteCurrentResult(result, "x", -1);
    if (calc.operand2 !== "")
      calculation.operand2 = calucaluteCurrentResult(calc.operand2, "x", -1);
    else if (calc.operand1 !== "")
      calculation.operand1 = calucaluteCurrentResult(calc.operand1, "x", -1);
    setCalc({ ...calculation });
  };

  // performs percentage function on the current result.
  // Also the opreand 2 or opreand 1 holds the result in incomplete calculations.
  // Thus handles the percentage function for them as well
  const handlePercentage = () => {
    let calculation = { ...calc };
    if (result !== "")
      calculation.result = calucaluteCurrentResult(result, "x", 0.01);
    if (calc.operand2 !== "")
      calculation.operand2 = calucaluteCurrentResult(calc.operand2, "x", 0.01);
    else if (calc.operand1 !== "")
      calculation.operand1 = calucaluteCurrentResult(calc.operand1, "x", 0.01);
    setCalc({ ...calculation });
  };

  // Handles the clicks from all the number and sign buttons.
  // The value is stores to operands when the inputs are provided
  // The value is stores to operator when the operator is provided
  // The result is calculated when there  both operands and opreator are entered completly and kept as operator 1 for next calculation.
  // The expression is build whenever the input is recieved and is stored to the history when the '=' sign is pressed
  const handleOnClick = (type, value) => {
    if (type !== "operator" && calc.operand2 !== "" && calc.operator !== "") {
      setExpression(expression + calc.operand2 + calc.operator);
      setCalc({
        ...calc,
        operand2: value,
        operator: "",
      });
      setResult("");
    } else if (type !== "operator") {
      if (calc.operand2.includes(".") && value === ".") return;
      setCalc({
        ...calc,
        operand2: calc.operand2 + value,
        operator: "",
      });
      setResult("");
    } else if (type === "operator" && calc.operator === "") {
      let currentResult = calucaluteCurrentResult(
        calc.operand1,
        expression.slice(-1),
        calc.operand2
      );
      setCalc({
        ...calc,
        operand1: currentResult,
        operator: value,
      });
      if (value === "=") {
        if (calc.operand1 === "" || calc.operand2 === "") return;
        let date = new Date().toDateString();
        let currentExpression = `${expression}${calc.operand2} = ${currentResult}`;

        setHistory({
          ...history,
          [date]: [...readObjSafe(history, date), currentExpression],
        });

        handleClear();
      }
      setResult(currentResult);
    } else if (type === "operator") {
      setCalc({
        ...calc,
        operator: value,
      });
    }
  };

  // Funtion to handle the scientific key press
  const handleScientificKey = () => null;

  // Contains the mappings to the button functions that are used to identify
  // the corresponsing functions from the button configuration.
  const functionMaps = Object.freeze({
    handleClear,
    handleSignChange,
    handlePercentage,
    handleOnClick,
    handleScientificKey,
  });

  // Updated the history to the local storage for persistant storage
  useEffect(() => {
    saveObjtoLocalStorage("calculationHistory", history);
  }, [history]);

  // Creates a component array of the histories based on the date of calculation
  const getHistories = () => {
    let histories;
    Object.entries(history).map(
      ([key, value]) =>
        (histories = (
          <HistorySection
            key={key}
            histories={value}
            title={key}
          ></HistorySection>
        ))
    );
    return histories;
  };

  // observes the change in the app componenent size and updated the component property for responsivenes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(
      (entries) => {
        let app = entries[0];

        if (
          app.contentRect.width > CONFIG.responsiveBreakpoint &&
          !isViewScientific
        ) {
          setisViewScientific(true);
          app.target.getElementsByClassName("wrapper")[0].style.width =
            "1370px";
        }
        if (
          app.contentRect.width < CONFIG.responsiveBreakpoint &&
          isViewScientific
        ) {
          setisViewScientific(false);
          app.target.getElementsByClassName("wrapper")[0].style.width = "373px";
        }
      },
      [isViewScientific]
    );
    resizeObserver.observe(document.getElementById("myApp"));

    return () => {
      resizeObserver.unobserve(document.getElementById("myApp"));
      resizeObserver.disconnect();
    };
  }, [isViewScientific]);
  return (
    <div id="myApp" className="App">
      <Wrapper id="wrapper">
        <Screen>
          <Result>
            {Number(result || calc.operand2).toLocaleString("en-US")}
          </Result>
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
                  handleClick={functionMaps[value.handleClick]}
                  style={{ fontSize: "24px" }}
                  label={value.label}
                  type={value.type}
                ></Button>
              );
            })}
          </ButtonsWrapper>
        )}
        {
          <ButtonsWrapper>
            {NORMAL_BUTTONS.map((value, index) => {
              return (
                <Button
                  key={index}
                  handleClick={functionMaps[value.handleClick]}
                  label={value.label}
                  type={value.type}
                  classTypes={value.classTypes}
                ></Button>
              );
            })}
          </ButtonsWrapper>
        }
      </Wrapper>
      <HistoryWrapper>{getHistories()}</HistoryWrapper>
    </div>
  );
}

// Configuration for scientific buttons. 
// ORDER OF THE OBJECTS IN THE ARRAY IS IMPORTANT
const SCIENTIFIC_BUTTONS = [
  {
    label: "(",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: ")",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "mc",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "m+",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "m-",
    classTypes: "2ndnormal",
    type: "scientific2nd",
    handleClick: "handleScientificKey",
  },
  {
    label: "mr",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "2ⁿᵈ",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "x²",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "x³",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "xʸ",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "eˣ",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "10ˣ",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "1/x",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "2√x",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "3√x",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "y√x",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "ln",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "log₁₀",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "x!",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "sin",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "cos",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "tan",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "e",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "EE",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "Rad",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "sinh",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "cosh",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "tanh",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "π",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
  {
    label: "Rand",
    classTypes: "normal",
    type: "scientific",
    handleClick: "handleScientificKey",
  },
];

// Configuration for normal buttons. 
// ORDER OF THE OBJECTS IN THE ARRAY IS IMPORTANT
const NORMAL_BUTTONS = [
  {
    label: "C",
    classTypes: "gray",
    type: "action",
    handleClick: "handleClear",
  },
  {
    label: "+/-",
    type: "action",
    classTypes: "gray",
    handleClick: "handleSignChange",
  },
  {
    label: "%",
    type: "action",
    classTypes: "gray",
    handleClick: "handlePercentage",
  },
  {
    label: "/",
    type: "operator",
    classTypes: "yellow",
    handleClick: "handleOnClick",
  },
  {
    label: "7",
    type: "number",
    classTypes: "normal",
    handleClick: "handleOnClick",
  },
  {
    label: "8",
    type: "number",
    classTypes: "normal",
    handleClick: "handleOnClick",
  },
  {
    label: "9",
    type: "number",
    classTypes: "normal",
    handleClick: "handleOnClick",
  },
  {
    label: "x",
    type: "operator",
    classTypes: "yellow",
    handleClick: "handleOnClick",
  },
  {
    label: "4",
    type: "number",
    classTypes: "normal",
    handleClick: "handleOnClick",
  },
  {
    label: "5",
    type: "number",
    classTypes: "normal",
    handleClick: "handleOnClick",
  },
  {
    label: "6",
    type: "number",
    classTypes: "normal",
    handleClick: "handleOnClick",
  },
  {
    label: "-",
    type: "operator",
    classTypes: "yellow",
    handleClick: "handleOnClick",
  },
  {
    label: "1",
    type: "number",
    classTypes: "normal",
    handleClick: "handleOnClick",
  },
  {
    label: "2",
    type: "number",
    classTypes: "normal",
    handleClick: "handleOnClick",
  },
  {
    label: "3",
    type: "number",
    classTypes: "normal",
    handleClick: "handleOnClick",
  },
  {
    label: "+",
    type: "operator",
    classTypes: "yellow",
    handleClick: "handleOnClick",
  },
  {
    label: "0",
    type: "number",
    classTypes: "normal extended2",
    handleClick: "handleOnClick",
  },
  {
    label: ".",
    type: "number",
    classTypes: "normal",
    handleClick: "handleOnClick",
  },
  {
    label: "=",
    type: "operator",
    classTypes: "yellow",
    handleClick: "handleOnClick",
  },
];
export default App;
