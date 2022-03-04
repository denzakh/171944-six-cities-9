import leaflet from 'leaflet';

export const getLeafletIcon = (iconUrl: string) => (
  leaflet.icon({
    iconUrl: iconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  })
);
