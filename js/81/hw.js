/* global google */
(async function () {
  "use strict";

  const searchBox = document.getElementById("searchBox");
  const searchButton = document.getElementById("searchButton");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
  const sidebar = document.getElementById("sidebar");

  searchButton.addEventListener("click", async () => {
    const inputValue = searchBox.value;
    sidebar.innerHTML = "";

    try {

      // Gets the location based on the user's input:
      const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${inputValue}&maxRows=10&username=eeveerap&type=json`);

      if (response.status >= 400) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      // Gets the results from the fetch and displays it to the console in json format:
      const data = await response.json();
      console.log(data);

      const geonamesData = data.geonames;


      // accessing the data in the geoNames array:
      geonamesData.forEach((result, index) => {
        const locationName = result.title;
        const countryCode = result.countryCode;

        const results = document.createElement("div");
        results.innerHTML = `Result ${index + 1}: ${locationName}, ${countryCode}`;

        // Append the results to the sidebar:
        sidebar.appendChild(results);



      });

      if (geonamesData.length > 0) {

        const firstResult = geonamesData[0];
        const locationName = firstResult.title;
        const countryCode = firstResult.countryCode;
        console.log(locationName, countryCode);



        // Getting the location of the map to the user's input location
        const position = {
          lat: firstResult.lat,
          lng: firstResult.lng
        };

        // Setting the location of the map to the user's input location
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 12,
          center: position,
          mapId: "DEMO_MAP_ID",
          mapTypeId: google.maps.MapTypeId.HYBRID
        });
      
        const infoWindow = new google.maps.InfoWindow();

        // If the result has a thumbnail:
        if (firstResult.thumbnailImg) {
          const thumbnail = document.createElement("img");
          thumbnail.src = firstResult.thumbnailImg;

          // Adding the marker which will have a thumbnail:
          const thumbnailMarker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: firstResult.title,
            content: thumbnail,
          });
          // If you click the marker, the window should pop up:
          thumbnailMarker.addListener("click", () => { 
            infoWindow.setContent(`${locationName} - ${firstResult.summary} <a target="_blank" href=https://${firstResult.wikipediaUrl}> Click here for more info</a>`); 
            infoWindow.open(map, thumbnailMarker); 
          });
        } else {

          const pinScaled = new PinElement({ // Creating a new PinElement with specified options.
            scale: 1, // Scaling the pin element by a factor of 2.
            background: "#FBBC04", // Setting the background color of the pin.  
                      
          });
          // Adding a marker for the results that don't have a thumbnail:
          const pinMarker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: firstResult.title,
            content: pinScaled.element,
          });

          // If you click the marker, the window should pop up:
          pinMarker.addListener("click", () => {
            infoWindow.setContent(`${locationName} - ${firstResult.summary} <a target="_blank" href=https://${firstResult.wikipediaUrl}> Click here for more info</a>`);
            infoWindow.open(map, pinMarker);
          });
        }

      }
    } catch (e) {
      const errorMessage = `Oops, an error occurred: ${e.message}`;
      console.log(errorMessage);
    }
  });
}());