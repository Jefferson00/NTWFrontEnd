import React from 'react'
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%', height: '100%'
}
const center = {
  lat: -15.787361,
  lng: -47.882432,
}

export default function Map(){
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  })

  if (loadError) return "Error loading map";
  if (!isLoaded) return "loading map";

  return(
    <div style={{width: '100%', height: '100%' }}>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={16} center= {center} >
          <Marker position={center}></Marker>
        </GoogleMap>
    </div>
  )
}