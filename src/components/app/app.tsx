import React, { useEffect } from "react";

import Header from "../header";
import ArticlesPage from "../../pages/articlesPage";
import Spinner from "../spinner";
import { Route, useHistory } from "react-router-dom";
import ArticlePage from "../../pages/articlePage";
import { RouteURLS } from "../../helpers/route-urls";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { getArticles } from "../../api";

const App = () => {
  const pageSize = useAppSelector((state) => state.articles.pageSize);
  let history = useHistory();
  useEffect(() => {
    getArticles(pageSize);
    history.push(`${RouteURLS.ARTICLES}`);
  }, [pageSize, history]);

  return (
    <React.Fragment>
      <Header />
      <main className="main">
        <Spinner />
        <Route path={RouteURLS.ARTICLES} exact component={ArticlesPage} />
        <Route path={RouteURLS.ARTICLE} component={ArticlePage} />
      </main>
    </React.Fragment>
  );
};

export default App;
