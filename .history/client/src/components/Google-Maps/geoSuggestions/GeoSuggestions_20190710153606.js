import React, { Component } from 'react';
import  Geosuggest from 'react-geosuggest';
export class LocationSuggest extends Component {
onSuggestSelect = (suggest) => {
    console.log(suggest)
}
    render() {
        const google = window.google
        // var fixtures = [
        //     { label: 'Old Elbe Tunnel, Hamburg', location: { lat: 53.5459, lng: 9.966576 } },
        //     { label: 'Reeperbahn, Hamburg', location: { lat: 53.5495629, lng: 9.9625838 } },
        //     { label: 'Alster, Hamburg', location: { lat: 53.5610398, lng: 10.0259135 } }
        // ];
        return (
            <div>
                <h5>Geo Suggestion</h5>
                <Geosuggest
                    location={new google.maps.LatLng(59.40, 30.40) }
                    radius={20}
                    onSuggestSelect={this.onSuggestSelect}
                    // fixtures={fixtures}
                />
            </div>
        )
    }
}
