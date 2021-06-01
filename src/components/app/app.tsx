import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { RouteURLS } from "../constants/route-urls";
import PrivateRoute from "../PrivateRoute";

import Header from "../header";
import Spinner from "../spinner";


import { getCurrentUser } from "../../api/user";
import { getToken } from "../../api";
import ProfilePage from "../../pages/profilePage";
import SignInPage from "../../pages/signInPage";
import SignUpPage from "../../pages/signUpPage";
import ArticleEditPage from "../../pages/articleEditPage";
import FullArticlePage from "../../pages/FullArticlePage";
import ArticlesPage from "../../pages/articlesPage";

const App: React.FC = () => {
  useEffect(() => {
    const token = getToken();
    if (token) {
      getCurrentUser();
    }
  }, []);

  return (
    <React.Fragment>
      <Header />
      <main className="main">
        <Switch>
          <Route
            path={[RouteURLS.HOME, RouteURLS.ARTICLES]}
            exact
            component={ArticlesPage}
          />
          <Route path={RouteURLS.EDIT_ARTICLE} exact component={ArticleEditPage} />
          <Route path={RouteURLS.ARTICLE} component={FullArticlePage} />
          <Route path={RouteURLS.SIGN_UP} component={SignUpPage} />
          <Route path={RouteURLS.SIGN_IN} component={SignInPage} />
          <PrivateRoute
            path={RouteURLS.PROFILE}
            exact={true}
            component={ProfilePage}
          />
          <PrivateRoute
            path={RouteURLS.NEW_ARTICLE}
            exact={true}
            component={ArticleEditPage}
          />
        </Switch>
      </main>
      <Spinner />
    </React.Fragment>
  );
};

export default App;
