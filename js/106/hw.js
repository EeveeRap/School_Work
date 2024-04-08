const app = require("express")();

//Getting the first number out of the params in the search and checking if its a number:
app.param("firstNum", (req, res, next) => {
  if (!isNaN(parseInt(req.params.firstNum))) {
    req.firstNum = parseInt(req.params.firstNum);
    next();
  } else {
    const error = new Error(
      "400. Invalid input provided. Please provide a valid number."
    );
    error.statusCode = 400;
    next(error);
  }
});

//Getting the second number out of the params in the search and checking if its a number:
app.param("secondNum", (req, res, next) => {
  if (!isNaN(parseInt(req.params.secondNum))) {
    req.secondNum = parseInt(req.params.secondNum);
    next();
  } else {
    const error = new Error(
      "400. Invalid input provided. Please provide a valid number."
    );
    error.statusCode = 400;
    next(error);
  }
});

//Code for using "add" endpoint:
app.get("/add/:firstNum/:secondNum", (req, res) => {
  const result = req.firstNum + req.secondNum;
  res.send(`${req.firstNum} + ${req.secondNum} = ${result}`);
});

//Code for using "subtract" endpoint:
app.get("/subtract/:firstNum/:secondNum", (req, res) => {
  const result = req.firstNum - req.secondNum;
  res.send(`${req.firstNum} - ${req.secondNum} = ${result}`);
});

//Code for operator endpoint:
app.get("/:firstNum/:operator/:secondNum", (req, res) => {
  const operator = req.params.operator;
  let result;
  switch (operator) {
    case "+":
      result = req.firstNum + req.secondNum;
      break;
    case "-":
      result = req.firstNum - req.secondNum;
      break;
    case "*":
      result = req.firstNum * req.secondNum;
      break;
    case "/":
      result = req.firstNum / req.secondNum;
      break;
    default:
      res.send(
        `${operator} is not a valid operator. Please input + , - , * , / `
      );
      break;
  }
  res.send(
    `The result of ${req.firstNum} ${operator} ${req.secondNum} is ${result}`
  );
});

//General error handling:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected error occurred";
  res.status(statusCode).send(message);
});

app.listen(80);
