import {useEffect, useState} from 'react';
import {Map, TileLayer} from 'leaflet';
import {CityObj} from '../../types/offer';
import {ATTRIBUTION, TILE_LAYER_URL} from '../../constants/constants';

function useMap(
  mapRef: React.MutableRefObject<HTMLElement | null>,
  cityObj: CityObj,
): Map | null  {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: cityObj.latitude,
          lng: cityObj.longitude,
        },
        zoom: cityObj.zoom,
      });

      const layer = new TileLayer(
        TILE_LAYER_URL,
        {
          attribution: ATTRIBUTION,
        },
      );

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, cityObj]);

  return map;
}

export default useMap;
