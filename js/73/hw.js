(function () {
"use strict";
    const button = document.querySelector("#button");
    const colorParagraph = document.querySelector("#colorPar");
    const colors = ["red", "white", "green", "orange"];
    const colors2 = ["black", "blue", "purple", "brown"];

    function setCss(elem, property, value) {
        //elem.style.property = value;
        elem.style[property] = value;
    }

        let index = 0;
        let interval;

        function changeColor() {
            setCss(colorParagraph, "color", colors[index]);
            document.body.style.backgroundColor = colors2[index];
            index++;
            if(index >= colors.length){
                index = 0; // This resets index to 0 when it reaches end of colors array
            }
        }
        
        button.addEventListener("click", e => {
            
            if(!interval){
                interval = setInterval(changeColor, 1000);
                e.target.innerText = "Stop";
            } else {
                clearInterval(interval);
                interval = null;
                e.target.innerText = "Start";
            }
        });

        //setInterval(changeColor, 1000);


}());