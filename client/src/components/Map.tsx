import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

// const loader = new Loader({
//   apiKey: ,
//   version: "weekly"
// });

// loader.load().then(async () => {
//   const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
//   map = new Map(document.getElementById("map") as HTMLElement, {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// });


export const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: ""
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lat: 40.4168,
    lng: -3.70379
  });

  useEffect(() => {
    setCenter((center) => ({ lat: -25.344, lng: 131.031 }));
  }, []);

  // @ts-ignore
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  };
  return (
    <GoogleMap
            onLoad={handleOnLoad}
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100vh' }}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
              minZoom: 11,
              maxZoom: 15
            }}
          ></GoogleMap>
  )
}

