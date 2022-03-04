import CardList from '../card-list/card-list';
import Map from '../map/map';
import OfferType from '../../types/offer';
import CityNameType from '../../types/cityName';
import {Point} from '../../types/offer';
import {onCardItemHoverType} from '../../types/functions';
import {citiesMapObj} from '../../constants/cities';
import Sorting from '../../components/sorting/sorting';
import {useState} from 'react';
import Filter from '../../types/filter';

type CitiesPlacesPropsType = {
  offers: OfferType[];
  activeCity: CityNameType;
  selectedPointId: number | undefined,
  onCardItemHover: onCardItemHoverType,
};

type FilterStateType = {
  isOpen: boolean,
  activeFilter: Filter,
}

const initialState: FilterStateType = {
  isOpen: false,
  activeFilter: Filter.Pop,
};

function getSortList(offers: OfferType[], activeFilter: Filter): OfferType[] {
  let sortedList = [...offers];

  switch(activeFilter) {
    case Filter.Tr:
      sortedList.sort((prev, next) => next.rating - prev.rating);
      break;
    case Filter.Phl:
      sortedList.sort((prev, next) => next.price - prev.price);
      break;
    case Filter.Plh:
      sortedList.sort((prev, next) => prev.price - next.price);
      break;
    default:
      sortedList = [...offers];
  }

  return sortedList;
}

function CitiesPlaces(props: CitiesPlacesPropsType): JSX.Element {
  const {offers, activeCity, selectedPointId, onCardItemHover} = props;
  const [filterState, setFilterState] = useState(initialState);

  function handleToggleFilterMenu(): void {
    setFilterState({
      ...filterState,
      isOpen: !filterState.isOpen,
    });
  }

  function handleActiveFilter(activeFilter: Filter): void {
    setFilterState({
      isOpen: false,
      activeFilter: activeFilter,
    });
  }

  const points: Point[] = offers.map((offer) => ({
    id: offer.id,
    title: offer.title,
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
  }));

  const cityObj = citiesMapObj[activeCity];
  const filterMenu = Object.values(Filter);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places
          {activeCity && ` to stay in ${activeCity}`}
        </b>
        <Sorting
          handleToggleFilterMenu={handleToggleFilterMenu}
          isOpen={filterState.isOpen}
          handleActiveFilter={handleActiveFilter}
          activeFilter={filterState.activeFilter}
          filterMenu={filterMenu}
        />
        <CardList
          offers={getSortList(offers, filterState.activeFilter)}
          onCardItemHover={onCardItemHover}
        />
      </section>
      <div className="cities__right-section">
        <Map
          points={points}
          selectedPointId={selectedPointId}
          cityObj={cityObj}
        />
      </div>
    </div>
  );
}

export default CitiesPlaces;
