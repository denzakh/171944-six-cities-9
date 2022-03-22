import './preloader.css';
import {useAppSelector} from '../../hooks/';

function Preloader(): JSX.Element | null {
  const offers = useAppSelector((state) => state.offers);

  if(!offers.length) {
    return (
      <div className="preloader-5-wrap">
        <div className="preloader-5"></div>
      </div>
    );
  }
  return null;
}

export default Preloader;
