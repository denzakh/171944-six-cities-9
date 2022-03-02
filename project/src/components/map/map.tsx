//import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../';

// import React from 'react';
// import leaflet from 'leaflet';
// import 'leaflet/dist/leaflet.css';
import OfferType from '../../types/offer';

type MapProps = {
  offers: OfferType[],
}

function Map(props :MapProps): JSX.Element {
  const {offers} = props;

  offers.map((m)=>true); //чтобы ошибку не выводило

  return (
    <section className="cities__map map" />
  );
}

export default Map;
