import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { removeLocation } from '../slices/locationSlice.ts'
import { useAppDispatch, useAppSelector } from '../slices/hooks.ts'
// import 'dotenv/config';
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
    const removed = await axios.delete(`http://localhost:8080/api/locations/${id}`);
    console.log(id, "id")
    setSelected("");
    dispatch(removeLocation(id))
    // locations = locations.filter(location => {
    //   location.id !== id
    //   console.log(location.id, "locantions")
    // });
    // console.log(locations);
    return removed;
  }
  return (
    <div>
      <GoogleMap
            center={center}
            zoom={4}
            mapContainerStyle={{ width: 'auto', height: '90vh' }}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
              minZoom: 4,
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

