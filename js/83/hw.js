(function () {
    "use strict";

    const bodyParts = document.querySelector("#sidebar");

    async function loadImages() {
        try {
            const response = await fetch("images.json");
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }

    async function displayImagesList() {
        const theImages = await loadImages();

        theImages.forEach(image => {

            const img = document.createElement("img");

            img.className = "box";

            img.src = `pHeadPics/${image.url}`;

            bodyParts.appendChild(img);
        });
    }


    //////////////////////////////////////////////////////////////

    let dragging;
    let offset;

    function mouseMoveHandler(e) {
        e.preventDefault();

        if (dragging) {
            console.log(e);


            const currentStyle = getComputedStyle(dragging);
            console.log(currentStyle);
            dragging.style = `top: ${e.pageY - offset.y}px; left: ${e.pageX - offset.x}px; background-color: ${currentStyle.backgroundColor}`;
        }
    }



    document.addEventListener("mousedown", e => {
        if (e.target.matches(".box")) {

            dragging = e.target;
            offset = { y: e.offsetY, x: e.offsetX };
        }

    });

    document.addEventListener("mousemove", mouseMoveHandler);

    document.addEventListener("mouseup", () => {
        console.log("mouse up");
        dragging = false;
    });
    displayImagesList();
}());