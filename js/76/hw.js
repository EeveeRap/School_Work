/* global $*/
(function () {
    "use strict";

    const nameInput = $("#name");
    const addressInput = $("#address");
    const nameResult = $("#nameResult");
    const addressResult = $("#addressResult");

    const theForm = $("#theForm");
    theForm.submit(e => {
        e.preventDefault();

        nameResult.text(`name is ${nameInput.val()}`);
        addressResult.text(`address is ${addressInput.val()}`);
    });
    const checkBox = $("#license");
    $("#license").change(() => {
        $("#theForm button").prop("disabled", !checkBox.prop("checked"));
    });



}());