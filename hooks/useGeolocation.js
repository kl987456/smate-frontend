'use client';
import { useState, useEffect } from 'react';

export default function useGeolocation(poll=false) {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    const onSuccess = pos => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    const onErr = err => setError(err.message);

    const id = navigator.geolocation.getCurrentPosition(onSuccess, onErr, { enableHighAccuracy:true });
    // getCurrentPosition doesn't return id; use watch only if poll true
    if (poll) {
      const watchId = navigator.geolocation.watchPosition(onSuccess, onErr, { enableHighAccuracy:true });
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [poll]);

  return { coords, error };
}
