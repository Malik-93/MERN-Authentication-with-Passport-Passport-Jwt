import React from 'react';
import { Spinner } from 'reactstrap';


export default function Loading() {
    return (
        <div>
            <h1>Loading....</h1>
            <Spinner color="primary" />
        </div>
    )
}
