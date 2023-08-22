// TODO: Create a function to get the coordinates from an address and display a map with a marker on it

const showMap = (userInput) => {
  // TODO: Construct the URL (with apiKey & userInput) and make the fetch request to the mapbox API
  const apikey = "pk.eyJ1IjoiaGVkcyIsImEiOiJjbGxldzJjcTUwYWYxM2xxbzlwZmt2b21zIn0.GuRJ-jcMfTQFQ9uJ5YAr1w";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userInput}.json?access_token=${apikey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // TODO: Insert the info into the DOM
      // - Extract the coordinates from the parsed JSON response (lang, lat)
      // - Display the coordinates in the element where the coordinates will be displayed
      // - Create a map using the Mapbox API and the coordinates
      // - Add a marker to the map at the coordinates
      const long = data.features[0].geometry.coordinates[0];
      const lat = data.features[0].geometry.coordinates[1];
      const coordinates = document.querySelector(".lead");
      coordinates.innerText = `${lat}, ${lat}`;

      mapboxgl.accessToken = apikey;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [`${long}`, `${lat}`], // starting position [lng, lat]
        zoom: 12, // starting zoom
      });
      new mapboxgl.Marker()
        .setLngLat([`${long}`, `${lat}`])
        .addTo(map);
    });
};
//
// TODO: Select the form element
// TODO: Add event listener to the form that:
// - Prevents the default form submission behavior
// - Get the user input
// - Calls the showMap function with the user input as an argument

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = document.querySelector(".form-control");
  showMap(userInput.value);
});
