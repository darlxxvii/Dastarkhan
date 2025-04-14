import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 43.238949, 
  lng: 76.889709
};

function MapContainer() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDPr9zqFZfob2dB9rd7dRJC6faJVLr2RL0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center}  />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
