import React, { useEffect } from "react";

import Header from "../header";
import ArticlesPage from "../../pages/articlesPage";
import Spinner from "../spinner";
import { Route, useHistory, Switch } from "react-router-dom";
import ArticlePage from "../../pages/articlePage";
import { RouteURLS } from "../../helpers/route-urls";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import SignUp from "../forms/formSignUp";
import SignIn from "../forms/formSignIn";
import Profile from "../forms/formProfile";
import { getArticles } from "../../handlers/article";
import { getCurrentUser } from "../../handlers/user";
import { getToken } from "../../api";

const App: React.FC = () => {
  const pageSize = useAppSelector((state) => state.articles.pageSize);
  const page = useAppSelector((state) => state.articles.page);
  let history = useHistory();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getCurrentUser();
    }
  }, []);

  useEffect(() => {
    getArticles(pageSize, page);
    history.push(`${RouteURLS.ARTICLES}?limit=${pageSize}&page=${page}`);
  }, [page, history, pageSize, isAuth]);

  return (
    <React.Fragment>
      <Header />
      <main className="main">
        <Spinner />
        <Switch>
          <Route path={RouteURLS.ARTICLES} exact component={ArticlesPage} />
          <Route path={RouteURLS.ARTICLE} component={ArticlePage} />
          <Route path={RouteURLS.SIGN_UP} component={SignUp} />
          <Route path={RouteURLS.SIGN_IN} component={SignIn} />
          <Route path={RouteURLS.PROFILE} component={Profile} />
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;
