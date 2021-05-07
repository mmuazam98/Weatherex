function geoFindMe() {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(longitude, latitude);
    alert(latitude);
    alert(longitude);
  }

  function error() {
    alert("Unable to retrieve your location");
  }

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
  } else {
    alert("Locating…");
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
geoFindMe();
