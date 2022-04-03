import {Link} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks/';
import {AppRoute, AuthorizationStatus} from '../../constants/constants';

function NavUser(): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const dispatch = useAppDispatch();

  const logoutHandle = (e: React.SyntheticEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  const getStatus = () => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      return (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <a className="header__nav-link" href="/" onClick={logoutHandle}>
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <nav className="header__nav">
      {getStatus()}
    </nav>
  );
}

export default NavUser;
