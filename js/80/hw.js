(function () {
    "use strict";

    const videoList = $("#sidebar ul");
    const theVideoElem = $("#theVideo");
    async function loadVideos() {

        try {
            const response = await fetch("hw.json");
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            return await response.json();

        } catch (e) {
            console.error(e);
        }
    }

    async function displayVideos() {
        const theVideos = await loadVideos();
        theVideos.forEach(video => {
            $(`<button>${video.name} <img src="videoImage.jpg"</button>`)
            .appendTo(videoList)
            .click(() => {
                theVideoElem.attr("src", video.url)
                
            });
        });
    }

    displayVideos();
}());