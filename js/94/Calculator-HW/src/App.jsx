import { Component } from 'react'
import './App.css'

 export default class App extends Component {

   state = {
    displayValue: '0'
  };


  calculate() {
    const left = Number(this.state.first);
    const right = Number(this.state.displayValue);
    let result;
    switch(this.state.operation) {
      case '+':
        result = left + right;
        break;
      case '-':
        result = left - right;
        break;
      case '*':
        result = left * right;
        break;
      case '/':
        result = left / right;
        break;
    }
    this.setState({
      displayValue: result
    });
  }

  

  handleClick (button) {
    
    switch(button) {
      case "+":
      case "-":
      case "*":
      case "/":
       this.setState({
          first: this.state.displayValue,
          displayValue: '',
          operation: button
          })
          break;
      case 'C':
        this.setState({
          displayValue: '0',
          first: 0,
          operation: null
        })
        break;
      case '=':
        this.calculate();
        break;
      case '.':
        if (this.state.displayValue.includes('.')) {
          break;
        }
        //falls through
      default:
        this.setState({
          displayValue: this.state.displayValue === '0' ? button.toString() : this.state.displayValue + button
        });
        
      }
    }

  render() {
      
      const { displayValue } = this.state;
      console.log(this.state);
    return (
      
        <div id="calculatorDiv">
          <div id="calculatorDisplay">{displayValue}</div>
      <div className="row">
        <button onClick={this.handleClick.bind(this, 1)}>1</button>
        <button onClick={this.handleClick.bind(this, 2)}>2</button>
        <button onClick={this.handleClick.bind(this, 3)}>3</button>
        <button onClick={this.handleClick.bind(this, "/")}>/</button>
      </div>
      <div className="row">
        <button onClick={this.handleClick.bind(this, 4)}>4</button>
        <button onClick={this.handleClick.bind(this, 5)}>5</button>
        <button onClick={this.handleClick.bind(this, 6)}>6</button>
        <button onClick={this.handleClick.bind(this, "*")}>*</button>
      </div>
      <div className="row">
        <button onClick={this.handleClick.bind(this, 7)}>7</button>
        <button onClick={this.handleClick.bind(this, 8)}>8</button>
        <button onClick={this.handleClick.bind(this, 9)}>9</button>
        <button onClick={this.handleClick.bind(this, "-")}> - </button>
      </div>

      <div className="row lastRow">
        <button className="double-size" onClick={this.handleClick.bind(this, 0)}>0</button>
        <button onClick={this.handleClick.bind(this, ".")}>.</button>
        <button onClick={this.handleClick.bind(this, "=")}> = </button>
      </div>
    </div>
    )
  }
}
