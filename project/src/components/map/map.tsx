import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../constants/constants';
import useMap from '../../hooks/use-map/use-map';
import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Point} from '../../types/offer';
import {CityObj} from '../../types/offer';
import {activeCardIdType} from '../../types/functions';
import {getLeafletIcon} from '../../constants/functions';

type MapProps = {
  points: Point[],
  selectedPointId: activeCardIdType,
  cityObj: CityObj,
}

function Map(props :MapProps): JSX.Element {
  const {points, selectedPointId, cityObj} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, cityObj);
  const defaultCustomIcon = getLeafletIcon(URL_MARKER_DEFAULT);
  const currentCustomIcon = getLeafletIcon(URL_MARKER_CURRENT);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: (point.id === selectedPointId)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, currentCustomIcon, defaultCustomIcon, selectedPointId]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
    />
  );
}

export default Map;
