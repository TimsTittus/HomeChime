# HomeChime

**HomeChime** is a location-aware browser-based web application built using vanilla JavaScript, HTML, Tailwind CSS, and Leaflet.js. It alerts users when they are within 100 meters of a specified destination. The app accepts a Google Maps live location link (or uses device GPS), a destination address, and then tracks proximity using real-time geolocation and the Haversine formula.

---

## Inspiration
Every afternoon, my younger brother comes home by the school bus, which shares a live location link via Google Maps. My mother waits anxiously, constantly asking me to check if the bus has reached the usual place where we go to pick him up — a signal that it’s time to leave.

Tired of staring at my phone every few minutes, I dreamt of a better solution. One evening, fueled by my passion for coding and our daily routine, I created this web app. I input the school’s live location link and set the park as the destination.

The next day, as the bus neared the park, a soft chime echoed from my device, easing the tension at home. My mother smiled, her eyes misty, as I said, “Now we’ll always know he’s almost here.” The app became our family’s silent protector — turning worry into warmth.

---

## Features

- Accepts Google Maps live location link (or uses browser geolocation)
- Allows destination input using text (e.g., place name, landmark)
- Uses **OpenStreetMap Nominatim API** for destination geocoding
- Uses **Leaflet.js** for interactive map display
- Calculates real-time distance using the **Haversine formula**
- Triggers an audio alert when within 100 meters of the destination
- Fully client-side: no backend required
- Lightweight, privacy-friendly, and works in all modern browsers

---

## Technologies Used

- **HTML5 + JavaScript** – Core logic and structure
- **Tailwind CSS** – Modern utility-first UI styling
- **Leaflet.js** – Interactive map rendering and marker handling
- **OpenStreetMap Nominatim API** – Geocoding destination addresses
- **Haversine Formula** – Precise distance calculation between coordinates
- **HTML5 Audio API** – For alert playback on proximity trigger

---

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for fetching maps and location data

---

## Getting Started

1. Clone or download the project folder.
2. Open `index.html` in your browser.
3. Paste your Google Maps live location link or allow GPS access.
4. Enter a destination address (e.g., "Kochi Metro").
5. Click the **Start Tracking** button.
6. The app will begin tracking your location and alert when you’re near your destination.

---

## Future Enhancements

- Support for multiple destinations
- Customizable alarm sounds
- Save favorite destinations
- Offline map support
- Dark/light theme toggle

---

## License

This project is licensed under the [MIT License](LICENSE).
