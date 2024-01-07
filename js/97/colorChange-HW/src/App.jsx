import { useState } from "react";

export default function App() {

  //Text color:
  const [textColor, setTextColor] = useState(JSON.parse(localStorage.getItem("textColor")) || "#000000");

  const colorChangeHandler = e => {
    const newColor = e.target.value;
    setTextColor(newColor);
    localStorage.setItem("textColor", JSON.stringify(newColor));
  }

  function setColor(theColor) {
  return { color: theColor }
  }

  //Background color:
  const [backgroundColor, setBackgroundColor] = useState(JSON.parse(localStorage.getItem("backgroundColor")) || "#ffffff");

  const backgroundColorChangeHandler = e => {
    const newColor = e.target.value;
    setBackgroundColor(newColor);
    localStorage.setItem("backgroundColor", JSON.stringify(newColor));
  }

  function setbackgroundColor(theColor) {
    return { backgroundColor: theColor }
  }

  //Fonts:
  const [font, setFont] = useState(JSON.parse(localStorage.getItem("font")) || "Arial");

  const fontChangeHandler = e => {
    const newFont = e.target.value;
    setFont(newFont);
    localStorage.setItem("font", JSON.stringify(newFont));
  }

  function setfont(theFont) {
    return { fontFamily: theFont }
  }



  return (
    <>
      
        
      <div>
        Choose a text color: <input type="color" value={textColor} onChange={colorChangeHandler} />
      </div>

      <div>
        Choose a background color: <input type="color" value={backgroundColor} onChange={backgroundColorChangeHandler} />
      </div>

      <h3>Please select a font:</h3>

      <select value={font} onChange={fontChangeHandler}>

        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Georgia">Georgia</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Garamond">Garamond</option>
        <option value="Courier New">Courier New</option>

      </select>
      <br />
            
      <div style={{...setbackgroundColor(backgroundColor), ...setfont(font), ...setColor(textColor)}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eligendi nulla rerum natus earum aliquid similique mollitia cum aut perspiciatis asperiores doloremque error harum, vitae totam ipsam unde, fuga, deleniti veritatis ut libero! Maxime non quis quidem at tenetur voluptates similique quibusdam error saepe. Repellat, nesciunt dignissimos. Voluptate, sunt mollitia.
      </div>
    </>
  )
}