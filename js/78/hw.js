












/* global $*/
(function () {
    "use strict";

    const file = $("#file");
    const loadButton = $("#loadButton");
    const output = $("#output");
    const loadingImage = new Image();
    loadingImage.src = "loading.gif";

    loadButton.click(async () => {
        const inputValue = file.val();
        output.html(loadingImage);

        setTimeout(async () => {
            try {
                const response = await fetch(inputValue);

                if (response.status >= 400) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const data = await response.text();
                setTimeout(3000);
                // console.log(data, typeof data, response.status);
                output.html(`The output is as follows: \n ${data}`);
            } catch (e) {
                const errorMessage = `Oops, an error occurred: ${e.message}`;
                output.html(errorMessage);
            }
        }, 3000);

    });

}());