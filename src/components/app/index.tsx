import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { RouteURLS } from "../../helpers/route-urls";
import PrivateRoute from "../PrivateRoute";

import Header from "../header";
import ArticlesPage from "../../pages/articlesPage";
import ArticlePage from "../../pages/articlePage";
import Spinner from "../spinner";

import SignUp from "../forms/formSignUp";
import SignIn from "../forms/formSignIn";
import Profile from "../forms/formProfile";
import ArticleForm from "../forms/formArticle";

import { getCurrentUser } from "../../api/user";
import { getToken } from "../../api";

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
        <Spinner />
        <Switch>
          <Route
            path={[RouteURLS.HOME, RouteURLS.ARTICLES]}
            exact
            component={ArticlesPage}
          />
          <Route path={RouteURLS.EDIT_ARTICLE} exact component={ArticleForm} />
          <Route path={RouteURLS.ARTICLE} component={ArticlePage} />
          <Route path={RouteURLS.SIGN_UP} component={SignUp} />
          <Route path={RouteURLS.SIGN_IN} component={SignIn} />
          <PrivateRoute
            path={RouteURLS.PROFILE}
            exact={true}
            component={Profile}
          />
          <PrivateRoute
            path={RouteURLS.NEW_ARTICLE}
            exact={true}
            component={ArticleForm}
          />
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;
