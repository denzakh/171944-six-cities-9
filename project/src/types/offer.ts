import CityNameType from './cityName';

type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

type City = {
	name: CityNameType,
  location: Location,
}

type Host = {
  id: number,
  name: string,
  isPro: false | true,
  avatarUrl: string,
}

type Point = {
  id: number,
  title: string,
  latitude: number,
  longitude: number,
}

type CityObj = {
  title: CityNameType,
  latitude: number,
  longitude: number,
  zoom: number,
}

type RoomType =
  'apartment' |
  'room' |
  'house' |
  'hotel';

type Offer = {
  city: City,
  previewImage: string,
  images: string[],
  title: string,
  isFavorite: false | true,
  isPremium: false | true,
  rating: number,
  type: RoomType,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: string[],
  host: Host,
  description: string,
  location: Location,
  id: number,
}

export type {Location, City, Host, Point, CityObj};

export default Offer;
