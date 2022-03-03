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

type Offer = {
  city: City,
  previewImage: string,
  images: string[],
  title: string,
  isFavorite: false | true,
  isPremium: false | true,
  rating: number,
  type: string,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: string[],
  host: Host,
  description: string,
  location: Location,
  id: number,
}

export default Offer;
