import React from 'react';
import Geosuggest from 'react-geosuggest';
export const LocationSuggest = () => {
    return (
        <div>
            <h5>Geo Suggestion</h5>
            <Geosuggest
                location={new google.maps.LatLng(59.40, 30.40)}
                radius={20}
            />
        </div>
    )
}