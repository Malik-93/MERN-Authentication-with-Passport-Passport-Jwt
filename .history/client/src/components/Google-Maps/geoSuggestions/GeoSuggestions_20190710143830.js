import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
export class LocationSuggest extends Component {
    render() {
        return (
            <div>
                <h5>Geo Suggestion</h5>
                <Geosuggest
                    location={ google.maps.LatLng(59.40, 30.40)}
                    radius={20}
                    onSuggestSelect={this.onSuggestSelect}
                />
            </div>
        )
    }
}
