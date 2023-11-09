/* global google*/
(async function () {
    "use strict";

    const lakewood = { lat: 40.09564277325912, lng: -74.22203857900014 };

    //Loading the Map, DrawingManager, & AdvancedMarker libraries from google:
    const { Map } = await google.maps.importLibrary("maps");
    const { DrawingManager } = await google.maps.importLibrary("drawing");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    //Setting Lakewood as the default location on load:
    const map = new Map(document.querySelector("#map"), {
        zoom: 18,
        center: lakewood,
        mapId: "DEMO_MAP_ID",
    });


    const drawingManager = new DrawingManager({ polylineOptions: { geodesic: true } }); //geoDesic takes into account the curvature of the Earth when drawing a line.
    drawingManager.setMap(map);

    //Parsing the array saved in the localStorage which is saved in JSON format, under the key "drawings":
    const drawings = JSON.parse(localStorage.getItem("drawings")) ?? []; //This will check if there already is an array "drawings" & if there isn't one (ie. its the first iteration), it will create an array.

    if (drawings) {
        drawings.forEach(drawing => {
            //Checking each type of drawing and saving the data associated with it, based on its type:
            switch (drawing.type) {
                case "marker":
                    new AdvancedMarkerElement({
                        map,
                        position: drawing.position
                    });
                    break;
                case "circle":
                    new google.maps.Circle({
                        map,
                        center: drawing.center,
                        radius: drawing.radius,
                    });
                    break;
                case "polyline":
                    new google.maps.Polyline({
                        map,
                        path: drawing.path,
                        geodesic: true
                    });
                    break;
                case "polygon":
                    new google.maps.Polygon({
                        map,
                        path: drawing.path
                    });
                    break;
                case "rectangle":
                    new google.maps.Rectangle({
                        map,
                        bounds: drawing.bounds
                    });
                    break;
            }
        });
    }

    //These addListeners are for when a drawing is placed on the map, based on type, and pushes the location data, to the "drawing" array inside the locationStorage.

    drawingManager.addListener('markercomplete', e => {
        drawings.push({ type: 'marker', position: e.getPosition() });
        localStorage.setItem('drawings', JSON.stringify(drawings));
    });

    drawingManager.addListener('circlecomplete', e => {
        drawings.push({ type: 'circle', radius: e.getRadius(), center: e.getCenter() });
        localStorage.setItem('drawings', JSON.stringify(drawings));
    });

    drawingManager.addListener('polylinecomplete', e => {
        drawings.push({ type: 'polyline', path: e.getPath().getArray() });
        localStorage.setItem('drawings', JSON.stringify(drawings));
    });

    drawingManager.addListener('polygoncomplete', e => {
        drawings.push({ type: 'polygon', path: e.getPath().getArray() });
        localStorage.setItem('drawings', JSON.stringify(drawings));
    });

    drawingManager.addListener('rectanglecomplete', e => {
        drawings.push({ type: 'rectangle', bounds: e.getBounds() });
        localStorage.setItem('drawings', JSON.stringify(drawings));
    });
}());