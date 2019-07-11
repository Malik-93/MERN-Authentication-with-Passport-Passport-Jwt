import React, { Component, useState } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow, DirectionsRenderer } from "react-google-maps"
// import { GOOGLE_MAP_API_KEY } from '../../utils/google-maps-key'

const MapComponent = withScriptjs(withGoogleMap((props) => {
    const [selectedPlace, setSelectedPlace] = useState(null)
    let marker = <Marker position={{ lat: props.lat, lng: props.lng }} />;
    if (props.locationChoosen) {
        marker = <Marker position={{lat: props.lat, lng: props.lng}} />
    }

    return (
        <GoogleMap
            defaultZoom={props.zoom}
            defaultCenter={{ lat: props.lat, lng: props.lng }}
        >
            {marker}
            { selectedPlace && (
            <InfoWindow
                position={{
                    lat: selectedPlace.lat,
                    lng: selectedPlace.lng
                }}
                onCloseClick = {() => {
                    setSelectedPlace(null)
                }}
            >
                <div>
                    <h5>Your latitude and longitude is</h5>
                    <p>Lat: <span>{selectedPlace.lat}</span></p>
                    <p>Lng: <span>{selectedPlace.lng}</span></p>
                </div>
            </InfoWindow>
            )}
            {props.updateDirection && (
                <DirectionsRenderer directions={props.center} />
            )}
        </GoogleMap>
    )
}
))

class Maps extends Component {
    state = {
        center: {
            lat: 59.40,
            lng: 30.40,
        },
        zoom: 8,
        isMarkerShown: true,
        updateDirection: false,
        locationChoosen: false

    }

    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState(prevState => {
                return {
                    center: {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    },
                    ...prevState.zoom,
                    locationChoosen: true
                }
            })
        }, (err) => {
            console.log('Maps Error: ', err)
        })
    }
    render() {
        // console.log('Center:', Maps.defaultProps.center)
        return (
            <div>
                <MapComponent
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBKd3-rI7wCz8WKXwPOePfGecHe3uckNVQ&v=3.exp&libraries=geometry,drawing,places`}
                    isMarkerShown={this.state.isMarkerShown}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    lat={this.state.center.lat}
                    lng={this.state.center.lng}
                    zoom={this.state.zoom}
                    center={this.state.center}
                    updateDirection={this.state.updateDirection}
                    locationChoosen={this.state.locationChoosen}
                />
                <button onClick={this.getCurrentLocation}>get location</button>
            </div>
        );
    }
}

export default Maps;