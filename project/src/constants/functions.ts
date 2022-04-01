import leaflet from 'leaflet';
import {getPointsFromOffersType} from '../types/functions';

export const getLeafletIcon = (iconUrl: string) => (
  leaflet.icon({
    iconUrl: iconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  })
);

export const getPointsFromOffers: getPointsFromOffersType = (offers) => (
  offers.map((offer) => ({
    id: offer.id,
    title: offer.title,
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
  }))
);
