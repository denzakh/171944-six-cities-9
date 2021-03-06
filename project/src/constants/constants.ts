export enum AppRoute {
  Main = '/',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorites',
  Room = '/offer',
  RoomRoute = '/offer/:id',
  Page404 = '/page404',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Offer = '/hotels',
  Comments = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const RATING_WIDTH_MULTIPLIER = 20;

export const STAR_NUMBER_ARR = [5, 4, 3, 2, 1];

export const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const AVATAR_SIZE = 74;

export const COMMENTS_COUNT = 10;

export const COMMENTS_LENGTH_MIN = 50;

export const COMMENTS_LENGTH_MAX = 300;
