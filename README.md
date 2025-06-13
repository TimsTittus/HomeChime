# HomeChime

**HomeChime** is a location-aware web application built using React + Vite (TypeScript) that alerts users when they are within 100 meters of a specified destination. It accepts a Google Maps live location link and a destination name, then continuously tracks the distance and plays an audio alert when proximity conditions are met.

---

## Features

- Accepts live Google Maps location links
- Accepts destination input via text (e.g., place names, landmarks)
- Uses OpenStreetMap (Nominatim) for destination geocoding
- Calculates real-time distance using the Haversine formula
- Periodic distance updates every 10 seconds
- Plays a one-time alert sound when within 100 meters
- Displays dynamic feedback messages with distance updates
- Built using React, Vite, TypeScript, and Tailwind CSS

---

## Technologies Used

- **React + Vite** – Frontend framework
- **TypeScript** – Type-safe JavaScript development
- **Tailwind CSS** – Utility-first styling
- **OpenStreetMap (Nominatim API)** – Destination geocoding
- **Haversine Formula** – Accurate distance calculation
- **HTML5 Audio API** – Audio playback on proximity detection

---

### Prerequisites

- Node.js (v16 or later)
- npm or yarn