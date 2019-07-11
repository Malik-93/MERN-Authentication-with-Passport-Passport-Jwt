import React, { Component } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
// import { GOOGLE_MAP_API_KEY } from '../../utils/google-maps-key'

const MapComponent = withScriptjs(withGoogleMap((props) => {
    return (
        <GoogleMap
            defaultZoom={props.zoom}
            defaultCenter={{ lat: props.lat, lng: props.lng }}
        >
            <Marker position={{ lat: props.lat, lng: props.lng }} />
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
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA3ko0y_MWNRmCSXxYnpAv4VAfiLxOp-JI&v=3.exp&libraries=geometry,drawing,places`}
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