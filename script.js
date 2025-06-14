const startBtn = document.getElementById("startBtn");
const statusMsg = document.getElementById("status");
const alarm = document.getElementById("alarm");
let destinationCoords = null;

// Extract coordinates from Google Maps link
function extractCoords(link) {
  const match = link.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  return match ? { lat: +match[1], lng: +match[2] } : null;
}

// Haversine Formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Start tracking
function trackUser(liveCoords) {
  statusMsg.classList.remove("opacity-0");
  navigator.geolocation.watchPosition(pos => {
    const { latitude, longitude } = pos.coords;
    const distance = getDistance(latitude, longitude, destinationCoords.lat, destinationCoords.lng);
    statusMsg.textContent = `You're ${Math.round(distance)} meters away from your destination.`;

    if (distance <= 100) {
      alarm.play();
    }
  }, err => {
    alert("Location access denied or unavailable.");
    console.error(err);
  }, { enableHighAccuracy: true });
}

// Event listener
startBtn.addEventListener("click", () => {
  const link = document.getElementById("liveLocation").value.trim();
  const destination = document.getElementById("destination").value.trim();

  const liveCoords = extractCoords(link);
  if (!liveCoords) {
    return alert("Invalid Google Maps link. Make sure it includes @lat,lng.");
  }

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: destination }, (results, status) => {
    if (status === "OK") {
      destinationCoords = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      };
      trackUser(liveCoords);
    } else {
      alert("Destination not found.");
    }
  });
});

// Google Places Autocomplete
window.onload = () => {
  const input = document.getElementById("destination");
  new google.maps.places.Autocomplete(input);
};