import React, { Component, useState } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow } from "react-google-maps"
// import { GOOGLE_MAP_API_KEY } from '../../utils/google-maps-key'

const MapComponent = withScriptjs(withGoogleMap((props) => {
    const [selectedPlace, setSelectedPlace] = useState(null)
    return (
        <GoogleMap
            defaultZoom={props.zoom}
            defaultCenter={{ lat: props.lat, lng: props.lng }}
        >
            <Marker position={{ lat: props.lat, lng: props.lng }} 
            onClick={() => {
                setSelectedPlace({
                    lat:props.lat,
                    lng:props.lng
                })
            }}
            />
            { selectedPlace && (
            <InfoWindow
                position={{
                    lat: selectedPlace.lat,
                    lng: selectedPlace.lng
                }}
            >
                <div>
                    <h5>Your Lat and Lng</h5>
                    <p>Lat: <span>{selectedPlace.lat}</span></p> <br />
                    <p>Lng: <span>{selectedPlace.lng}</span></p>
                </div>
            </InfoWindow>
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
        isMarkerShown: true
    }

    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            console.log('pos :', pos)
            console.log('coords :', pos.coords)
            this.setState(prevState => {
                return {
                    center: {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    },
                    ...prevState.zoom,
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
                />
                <button onClick={this.getCurrentLocation}>get location</button>
            </div>
        );
    }
}

export default Maps;