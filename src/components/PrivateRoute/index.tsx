import React from "react";
import { Redirect, Route } from "react-router-dom";
import { RouteURLS } from "../../helpers/route-urls";
import { useAppSelector } from "../../hooks/useAppSelelctor";

type TProps = {
  component: React.FC;
  path: string;
  exact: boolean;
};
const PrivateRoute: React.FC<TProps> = (props) => {
  const { isAuth } = useAppSelector((state) => state.user);

  return isAuth ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to={RouteURLS.SIGN_IN} />
  );
};
export default PrivateRoute;
