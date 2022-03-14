import classNames from 'classnames';
import Filter from '../../types/filter';

type SortingPropsType = {
  handleToggleFilterMenu: ()=> void,
  isOpen: boolean,
  handleActiveFilter (activeFilter: Filter): void,
  activeFilter: Filter,
  filterMenu: Filter[],
}

function getListClassName(isOpen: boolean): string {
  return classNames({
    'places__options': true,
    'places__options--custom': true,
    'places__options--opened': isOpen,
  });
}

function getOptionClassName(option: Filter, activeoption: Filter): string {
  return classNames({
    'places__option ': true,
    'places__option--active': option === activeoption,
  });
}

function Sorting(props: SortingPropsType): JSX.Element {

  const {
    handleToggleFilterMenu,
    isOpen,
    handleActiveFilter,
    activeFilter,
    filterMenu,
  } = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggleFilterMenu}
      > &nbsp;
        {activeFilter}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={getListClassName(isOpen)}>
        {filterMenu.map((filterItem: Filter)=>(
          <li
            className={getOptionClassName(filterItem, activeFilter)}
            tabIndex={0}
            key={filterItem}
            onClick={()=>{handleActiveFilter(filterItem);}}
          >
            {filterItem}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
