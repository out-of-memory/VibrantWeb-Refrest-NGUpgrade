import { Injectable } from '@angular/core';
declare var $: any;
declare var navigator: any;

@Injectable()
export class LocationserviceService {

  constructor() {


  }

  getLocation() {

    // window.navigator.geolocation.getCurrentPosition(this.success, this.error, { timeout: 10000 });

    navigator.permissions.query({ name: 'geolocation' })
      .then(function (permissionStatus) {
        if (permissionStatus.state == "denied" || permissionStatus.state == "prompt") {
          window.location.href = "index.html";
        }
      });
  }

  private success(position) {

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

  private error(err) {
    location.href = "#/enablelocation";
    console.log(err);
  }
}
