(function () {
    "use strict";

    //Gets button from html:
    const button = document.getElementById("button");

    let count = 1;
    button.innerText = count;

    const createButton = () => {
        const newButton = document.createElement("button");//initializes creation of new button
        document.body.appendChild(newButton);//adds myNewButton to the page after initialization
        count++;
        newButton.innerText = count;//sets button text

        newButton.addEventListener("click", createButton);// gives new button event listener to create new buttons
    };

    button.addEventListener("click", createButton);
}());
