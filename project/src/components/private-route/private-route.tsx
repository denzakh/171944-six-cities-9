import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/';
import {AppRoute, AuthorizationStatus} from '../../constants/constants';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
