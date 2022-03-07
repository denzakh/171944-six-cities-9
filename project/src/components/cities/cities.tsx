import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import cities from '../../constants/cities';
import {DEFAULT_CITY} from '../../constants/cities';

function getLinkClassName(city: string, activeCity: string | null): string {
  return classNames({
    'locations__item-link': true,
    'tabs__item': true,
    'tabs__item--active': city === activeCity,
  });
}

function Cities() {
  const [searchParams] = useSearchParams();
  const activeCity = searchParams.get('city') || DEFAULT_CITY;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city)=>(
          <li className="locations__item" key={city}>
            <Link className={getLinkClassName(city, activeCity)} to={`/?city=${city}`}>
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Cities;
