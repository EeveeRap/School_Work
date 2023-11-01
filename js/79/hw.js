/*global $*/
(function () {
    "use strict";

    const recipesButton = $("#recipesButton");
    const output = $("#output");


    recipesButton.click(async () => {
        try {
            const response = await fetch("recipes.json");
            recipesButton.hide();
            output.css({
                "width": "20%",
                "position": "absolute",
                "left": "50%",
                "top": "20%",
                "transform": "translate(-50%, -50%)"

            });



            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const loadedRecipes = await response.json();

            const listGroup = output.find(".list-group");
            const recipeDetails = output.find(".recipe-details"); // Create a div to display details

            recipeDetails.css({
                "height": "1em", /* You can adjust this value to your desired height */
                "max-width": "100%",
                "max-height": "100%",
                "padding": "1em",
                "margin-top": "1em"
            });

            loadedRecipes.forEach(recipe => {
                const listItem = $(`<a href="#" class="list-group-item list-group-item-action">${recipe.recipeName}</a>`);
                listItem.click(() => {
                    // Create a new div for the details and populate it
                    const detailsDiv = $(`
                        <div class="recipe-details">
                        <h3>${recipe.recipeName}</h3>
                            <img src="${recipe.url}" alt="${recipe.recipeName}">
                            
                            <h4>Ingredients:</h4>
                            <ul>
                                ${recipe.ingredients.split("\n").map(ingredient => `<li>${ingredient}</li>`).join("")}
                            </ul>
                        </div>
                    `);

                    // detailsDiv.find(".recipe-image").css({
                    //     "max-width": "100%",
                    //     "max-height": "auto",
                    //     "text-align": "centered"
                    // });
                    // Replace the previous details (if any) with the new details
                    recipeDetails.empty().append(detailsDiv);
                });
                listGroup.append(listItem);
            });




        } catch (e) {
            const errorMessage = `Oops, an error occurred: ${e.message}`;
            output.html(errorMessage);
        }


    });


}());