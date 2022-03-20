import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../constants/constants';

type NoauthRouteProps = {
  children: JSX.Element;
};

function NoauthRoute(props: NoauthRouteProps): JSX.Element {
  const {children} = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Main} />
      : children
  );
}

export default NoauthRoute;
