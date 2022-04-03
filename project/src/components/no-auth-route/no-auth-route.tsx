import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../constants/constants';

type NoauthRouteProps = {
  children: JSX.Element;
};

function NoAuthRoute(props: NoauthRouteProps): JSX.Element {
  const {children} = props;
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Main} />
      : children
  );
}

export default NoAuthRoute;
