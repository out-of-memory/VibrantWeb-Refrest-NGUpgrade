


$(document).ready(function () {
    window.navigator.geolocation.getCurrentPosition(success, error, { timeout: 10000 });
});

function success(position) {

    // if (localStorage.getItem("geolocation") != null) {
    //     return false;
    // }

    let latitude = position.coords.latitude.toFixed(5);
    let longitude = position.coords.longitude.toFixed(5);
    let timestamp = Number(String(position.timestamp).substring(0, 7));

    var locationUrl = "https://maps.googleapis.com/maps/api/timezone/json?location=" + latitude + "," + longitude + "&timestamp=" + timestamp + "&key=AIzaSyACjdU4Ktfz70yFgVAPAS2loH2HcFiY2KI"

    $.getJSON(locationUrl).done(function (location) {
        if (location.status == "OK") {
            localStorage.setItem("geolocation", JSON.stringify(location));
        }
    });
}

function error(err) {
    // location.href = "/vibranthelp/404Error.html";
    location.href = "#/enablelocation";
    //console.log(err);
}