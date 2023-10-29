/*global $*/
(function () {
    "use strict";

    const oddButton = $("#oddButton");
    const evenButton = $("#evenButton");

    oddButton.click(() => {
        $("p:nth-child(odd) ")
            .css("color", "yellow");
        $("p:nth-child(even) ")
            .css("color", "");

    });

    evenButton.click(() => {
        $("p:nth-child(even) ")
            .css("color", "yellow");
        $("p:nth-child(odd) ")
            .css("color", "");

    });



}());