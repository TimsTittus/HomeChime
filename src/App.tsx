import { useEffect, useRef, useState } from "react";

type Coord = { lat: number; lng: number };

function App() {
  const [liveLink, setLiveLink] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationCoord, setDestinationCoord] = useState<Coord | null>(null);
  const [distanceMsg, setDistanceMsg] = useState<string | null>(null);
  const [tracking, setTracking] = useState(false);
  const [alarmPlayed, setAlarmPlayed] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const parseLiveLocation = (): Coord | null => {
    const match = liveLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      return {
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2]),
      };
    }
    return null;
  };

  const fetchDestinationCoords = async () => {
    if (!destination) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`
    );
    const data = await res.json();
    if (data && data.length > 0) {
      const place = data[0];
      setDestinationCoord({ lat: parseFloat(place.lat), lng: parseFloat(place.lon) });
    } else {
      alert("Destination not found.");
    }
  };

  const haversine = (coord1: Coord, coord2: Coord) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371e3;
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lng - coord1.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const formatDistance = (meters: number) => {
    return meters < 1000
      ? `${Math.round(meters)} meters`
      : `${(meters / 1000).toFixed(2)} kilometers`;
  };

  const checkDistance = () => {
    const current = parseLiveLocation();
    if (!current || !destinationCoord) return;

    const distance = haversine(current, destinationCoord);
    setDistanceMsg(`You are ${formatDistance(distance)} away from your destination.`);

    if (distance <= 100 && !alarmPlayed) {
      new Audio("/alarm.wav").play();
      alert("You are within 100 meters of your destination.");
      setAlarmPlayed(true);
    }
  };

  const handleTrack = async () => {
    await fetchDestinationCoords();

    const current = parseLiveLocation();
    if (!current || !destinationCoord) {
      alert("Please check the live location and destination inputs.");
      return;
    }

    setTracking(true);
    setAlarmPlayed(false);
    checkDistance(); // run first check immediately

    intervalRef.current = setInterval(checkDistance, 10000); // every 10 seconds
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTracking(false);
    setDistanceMsg("Tracking stopped.");
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">HomeChime</h1>

        <label className="text-sm font-medium">Google Maps Live Location URL</label>
        <input
          type="text"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Paste your Google Maps live location URL"
        />

        <label className="text-sm font-medium">Destination</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your destination"
        />

        {!tracking ? (
          <button
            onClick={handleTrack}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Start Tracking
          </button>
        ) : (
          <button
            onClick={stopTracking}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            Stop Tracking
          </button>
        )}

        {distanceMsg && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded text-yellow-800 text-sm">
            {distanceMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;