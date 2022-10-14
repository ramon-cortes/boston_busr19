//VEHICLE TRACKER
//LÍNEA AZUL ACE

let runCycles = 0, maxCycles = 50, busNumber = 0;
let consola = document.getElementById('consola');

mapboxgl.accessToken = 'pk.eyJ1IjoicmFtb25peCIsImEiOiJjbDh2c2JtMDAwZ3ZvM3dzOG5rNmMxMm10In0.x1m_PGYjDThqGWhDAhOvIw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.07, 42.325],
  zoom: 12
});
let marker = new mapboxgl.Marker();
marker.setLngLat([-71.07, 42.325]);
marker.addTo(map);

//marker.setLngLat([-71.0681755, 42.30148223]);
//marker.addTo(map);

async function run() {
  runCycles++;
  if (runCycles <= maxCycles) {
    //only run 10 times
    const locations = await getLocations();
    console.log(locations);
    //Checks if bus is active. Tries 9 more buses
    while (locations[busNumber].attributes.occupancy_status == 'null' && busNumber <= 10) {
      busNumber++;      
    }
    let lonLat = 'Longitude & Latitude: ' + locations[busNumber].attributes.longitude + ', ' + locations[0].attributes.latitude;
    consola.innerHTML = `${lonLat} Cycle(${maxCycles}): ${runCycles}<br>Occupancy status: ${locations[busNumber].attributes.occupancy_status}. Following bus: ${busNumber}`;
    marker.setLngLat([locations[busNumber].attributes.longitude, locations[busNumber].attributes.latitude]);
    //marker.addTo(map);
    setTimeout(run, 15000); //no reducir el tiempo o te pueden bloquear
  }
}

async function getLocations() {
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=19&include=trip';
  //esperar a que fetch obtenga la información y guardarlo en response
  const response = await fetch(url); 
  //formatearla
  const responseJson = await response.json();
  return responseJson.data;
}



run();
