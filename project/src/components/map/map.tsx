import {useRef, useEffect, useState} from 'react';
import classNames from 'classnames';
import leaflet, {LatLng} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../constants/constants';
import useMap from '../../hooks/use-map/use-map';
import {Point} from '../../types/offer';
import {activeCardIdType} from '../../types/functions';
import {getLeafletIcon} from '../../constants/functions';
import {citiesMapObj} from '../../constants/cities';
import CityNameType from '../../types/cityName';


type MapProps = {
  points: Point[],
  selectedPointId: activeCardIdType,
  activeCity: CityNameType,
  mapClassName?: string,
}

function getMapClassName(mapClassName: string | undefined): string {
  if(mapClassName) {
    return classNames({
      'map': true,
      [mapClassName]: true,
    });
  } else {
    return 'map';
  }
}

function Map(props :MapProps): JSX.Element {

  const {points, selectedPointId, activeCity, mapClassName} = props;
  const mapRef = useRef(null);
  const defaultCustomIcon = getLeafletIcon(URL_MARKER_DEFAULT);
  const currentCustomIcon = getLeafletIcon(URL_MARKER_CURRENT);
  const cityObj = citiesMapObj[activeCity];
  const map = useMap(mapRef, cityObj);
  const [prevCity, setPrevCity] = useState<CityNameType | null>(null);

  useEffect(() => {
    if (map) {
      if(activeCity !== prevCity) {
        map.setView(new LatLng(cityObj.latitude, cityObj.longitude), cityObj.zoom);
        setPrevCity(activeCity);
      }

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
  }, [
    map,
    points,
    currentCustomIcon,
    defaultCustomIcon,
    selectedPointId,
    activeCity,
    cityObj.latitude,
    cityObj.longitude,
    cityObj.zoom,
    prevCity,
  ]);

  return (
    <section
      className={getMapClassName(mapClassName)}
      ref={mapRef}
    />
  );
}

export default Map;
