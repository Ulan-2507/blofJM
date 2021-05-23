import React from "react";
import cn from "classnames";
import "./favorite.scss";
import { favorite, unfavorite } from "../../../handlers/article";
import { useAppSelector } from "../../../hooks/useAppSelelctor";
import { useActions } from "../../../hooks/useActions";
import { IArticle } from "../../../types/article";
type TProps = {
  favorited: boolean;
  favoritesCount: number;
  slug: string;
};

const Favorite: React.FC<TProps> = ({ favorited, favoritesCount, slug }) => {
  const { articles } = useAppSelector((state) => state.articles);
  const article = useAppSelector((state) => state.articles.article)!;
  const { isAuth } = useAppSelector((state) => state.user);
  const { setArticles, setArticle } = useActions();
  const changeArticle = (
    articles: IArticle[],
    article: IArticle,
    slug: string,
    favorited: boolean
  ) => {
    const newArticles = articles.map((article) => {
      if (article.slug === slug) {
        const newArticle = { ...article, favorited };
        if (favorited) {
          return { ...newArticle, favoritesCount: article.favoritesCount + 1 };
        }
        return { ...newArticle, favoritesCount: article.favoritesCount - 1 };
      }
      return article;
    });
    setArticles(newArticles);
    if (article.slug === slug) {
      const newArticle = { ...article, favorited };
      if (favorited) {
        setArticle({
          ...newArticle,
          favoritesCount: article.favoritesCount + 1,
        });
        return;
      }
      setArticle({ ...newArticle, favoritesCount: article.favoritesCount - 1 });
    }
  };
  const clickHandler = () => {
    if (favorited) {
      unfavorite(slug);
    } else {
      favorite(slug);
    }
    changeArticle(articles, article, slug, !favorited);
  };
  return (
    <button
      disabled={!isAuth}
      onClick={clickHandler}
      type="button"
      className={cn("favorite", { favorited: favorited })}
    >
      <span className="favorite__icon"></span>
      <span className="favorite__count">{favoritesCount}</span>
    </button>
  );
};

export default Favorite;
