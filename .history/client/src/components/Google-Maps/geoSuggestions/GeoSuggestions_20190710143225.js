import React from 'react';
import Geosuggest from 'react-geosuggest';
export const LocationSuggest = () => {
<Geosuggest 
    location={new google.maps.LatLng(59.40, 30.40,)}
    radius={20}
/>
}