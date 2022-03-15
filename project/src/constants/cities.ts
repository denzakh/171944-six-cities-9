import CityNameType from '../types/cityName';
import {CityObj} from '../types/offer';

const cities: CityNameType[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const citiesObj = {
  'Paris': {},
  'Cologne': {},
  'Brussels': {},
  'Amsterdam': {},
  'Hamburg': {},
  'Dusseldorf': {},
};

type citiesMapObjType = {
  [name: string]: CityObj,
}

export const citiesMapObj: citiesMapObjType = {
  'Paris': {
    'title': 'Paris',
    'latitude': 48.85661,
    'longitude': 2.351499,
    'zoom': 13,
  },
  'Cologne': {
    'title': 'Cologne',
    'latitude': 50.938361,
    'longitude': 6.959974,
    'zoom': 13,
  },
  'Brussels': {
    'title': 'Brussels',
    'latitude': 50.846557,
    'longitude': 4.351697,
    'zoom': 13,
  },
  'Amsterdam': {
    'title': 'Amsterdam',
    'latitude': 52.37454,
    'longitude': 4.897976,
    'zoom': 13,
  },
  'Hamburg': {
    'title': 'Hamburg',
    'latitude': 53.550341,
    'longitude': 10.000654,
    'zoom': 13,
  },
  'Dusseldorf': {
    'title': 'Dusseldorf',
    'latitude': 51.225402,
    'longitude': 6.776314,
    'zoom': 13,
  },
};

export const DEFAULT_CITY: CityNameType = 'Paris';

export default cities;
