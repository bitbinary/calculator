import { numString } from "./helpers";

export const defaultCalcState = {
  operand1: "",
  operand2: "",
  operator: "",
  result: "",
};

export const calucaluteCurrentResult = (op1, opr, op2) => {
    let answer;
    if (op1 === "" || op2 === "" || opr === "") return op1 || op2;

    if (opr === "+") {
      answer = parseFloat(op1) + parseFloat(op2);
    } else if (opr === "-") {
      answer = parseFloat(op1) - parseFloat(op2);
    } else if (opr === "x") {
      answer = parseFloat(op1) * parseFloat(op2);
    } else if (opr === "/") {
      answer = parseFloat(op1) / parseFloat(op2);
    }
    return numString(answer);
  };


