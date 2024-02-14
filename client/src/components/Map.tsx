import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { removeLocation } from '../slices/locationSlice.ts'
import { useAppDispatch } from '../slices/hooks.ts'
import { useState } from 'react';
import Location from '../type';
import axios from 'axios';

interface MapProps {
  locations: Location[]
}

export const Map = ({locations}: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: ""
  });
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string>("");
  if (!isLoaded) return <div>Loading...</div>;

  const center = {
    lat: 52.3676,
    lng: 4.9041
  };

  const handleMarkerClick = async (id: string) => {
    if (id === selected) return;
    setSelected(id);
  };

  const handleRemove = async (id: string) => {
    await axios.delete(`http://localhost:8080/api/locations/${id}`);
    setSelected("");
    dispatch(removeLocation(id))
  }

  return (
    <div>
      <GoogleMap
            center={center}
            zoom={11}
            mapContainerStyle={{ width: 'auto', height: '90vh' }}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
              minZoom: 2,
              maxZoom: 15
            }}
          >
      {locations.map(location => {
        const coordinates = {
          lat: location.lat,
          lng: location.lng
        };
        return (
          <Marker 
          key={location.id}
          position={coordinates}
          onClick={() => handleMarkerClick(location.id)}
          >
            {selected === location.id ? (
              <InfoWindow
              onCloseClick={() => setSelected("")}
              ><div>
                <p>{location.name}</p>
                <button
                onClick={()=>handleRemove(location.id)}
                >Delete</button></div>
              </InfoWindow>
            ) : null}
          </Marker>
          )
        })}
        </GoogleMap>
    </div>
  )
}
